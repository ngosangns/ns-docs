---
area: technology
domain: jvm
type: guide
title: JVM Anatomy
description: "How a .class file becomes a running application: loading and class identity, linking and verification, initialization, interpreter/JIT/AOT, threads and happens-before, heap allocation and GC roots, and JVMTI/JMX/JFR monitoring."
timestamp: "2026-10-25T00:00:00.000Z"
tags:
  - technology
  - java
  - jvm
  - classloading
  - jit
  - gc
  - virtual-threads
resource: https://www.youtube.com/watch?v=BeMi8K0AFAc
---

# JVM Anatomy

> **Source**: JetBrains, "JVM Anatomy 101", speaker Nikita Lipsky, uploaded 2023-10-30, 55:48. The description says the talk covers "the generalities of the JVM" rather than a specific implementation, and describes Lipsky as an initiator of Excelsior JET, a JVM with an AOT compiler; at the time of the talk he worked on Compose Multiplatform, after compilers and runtimes at Huawei. Checked 2026-10-25: 68,137 views.
>
> Chapters: 03:06 class file and bytecode · 08:55 classloading · 18:35 execution engine · 24:50 reflection, indy, JNI · 28:05 threading and synchronization · 34:25 memory and GC · 49:34 manageability and monitoring.

A `.class` file is not yet a program. It becomes one through a fixed pipeline: the bytes are loaded and given a runtime identity, linked and verified, initialized on first active use, and then executed by an engine that mixes interpretation with compiled code. Threads, the heap and the garbage collector decide how that code behaves under load, and the monitoring interfaces decide what an operator can see.

## The Pipeline

| Stage                  | What happens                                        | Where it fails                                                 |
| ---------------------- | --------------------------------------------------- | -------------------------------------------------------------- |
| Class file             | Bytecode, constant pool, metadata, attributes       | Malformed file: `ClassFormatError`                             |
| Loading                | Bytes become a runtime class with a defining loader | Class not found, linkage error                                 |
| Linking – verification | Bytecode is checked for type safety                 | `VerifyError` before any code runs                             |
| Linking – preparation  | Static fields get default values and space          | —                                                              |
| Linking – resolution   | Symbolic references resolved, often lazily          | `NoClassDefFoundError`, `NoSuchMethodError`                    |
| Initialization         | `<clinit>` runs at first active use                 | Exception in static initializer: `ExceptionInInitializerError` |
| Execution              | Interpreter, JIT, optional AOT code                 | Deoptimization, compilation stalls                             |
| Runtime services       | Threads, heap, GC, monitoring                       | Contention, leaks, long pauses                                 |

## Loading And Class Identity

The classloading engine turns a byte array into a runtime type. The identity of that type is not its package and class name alone. JVMS Chapter 5 states that after creation a class "is determined not by its name alone, but by a pair: its binary name and its defining loader."

Consequences:

- Two loaders defining the same bytes produce two distinct runtime types. Objects cannot be cast between them, and their static fields are separate.
- The **initiating loader** starts the load; the **defining loader** records the class. Identity uses the defining one.
- The **runtime package** is the package name plus the defining loader, which is why access rules can differ for two classes with the same package name.

This explains the classic `ClassCastException: com.example.Foo cannot be cast to com.example.Foo` in plugin containers, application servers and shaded jars: the two `Foo` classes came from different defining loaders. The same mechanism is what lets a container isolate two versions of a library in one process.

## Linking: Verification, Preparation, Resolution

Linking has three parts:

- **Verification** checks that the bytecode is type-safe. At every control-flow merge point, the operand stack height and the types on the stack and in the local variable array must agree across all paths that reach it. Modern class files carry `StackMapTable` frames for this type-checking pass.
- **Preparation** allocates storage for static fields and assigns their default values (`0`, `false`, `null`). Initializer code has not run yet.
- **Resolution** replaces symbolic references with direct ones, and may be lazy: a reference can be resolved only when an instruction first reaches it.

Verification matters because bytecode is not always produced by `javac`. Other JVM languages, bytecode generators and instrumentation agents can emit any sequence of instructions. The verifier is the boundary that stops a malformed class from corrupting the process.

The lecture's example: a method pushes two ints, runs `iadd` (which pops two values and pushes one), then jumps back to index 0. At method entry the operand stack height is 0; on the back edge it is 1. The heights disagree at the same instruction, verification fails with `VerifyError`, and none of that class's code executes.

## Initialization

Passing verification does not run static initializers. A class or interface is initialized immediately before its first active use, which JLS §12.4.1 defines as:

- Creating an instance (`new`).
- Invoking a static method declared by the class.
- Assigning a static field declared by the class.
- Using a static field that is not a constant variable.

A `static final` field of a primitive type or `String`, initialized with a constant expression, is a constant variable. Its value is inlined at compile time, so reading it does **not** initialize the declaring class. That is a common surprise when a static initializer seems never to run.

## Execution Engine

The execution engine turns bytecode into hardware operations. Implementations mix three techniques:

- **Interpreter**: executes bytecode one instruction at a time. HotSpot's Template Interpreter maps each opcode to a short machine-code template, so dispatch is fast but every instruction still pays interpretation overhead.
- **JIT compiler**: profiles running code, finds hot methods and loops, and compiles them to native code. Optimization costs compile time, and the compiled code can be better than a static compiler's because it knows the actual types and branches. HotSpot uses tiered compilation (C1 for quick, less optimized code; C2 for aggressive optimization) and can deoptimize when an assumption breaks.
- **AOT compiler**: compiles bytecode to native code before the program starts. The scope of what can be compiled ahead of time is implementation-dependent.

AOT does not remove the need for a runtime. From his Excelsior JET experience, Lipsky lists the services an AOT-compiled application still needs: memory management, garbage collection, thread scheduling, reflection, exception handling and monitoring. HotSpot's own experimental `jaotc` AOT compiler was removed in JDK 17 because maintaining it was too costly (JEP 410). Current ahead-of-time options are different trade-offs: GraalVM Native Image builds a closed-world executable with its own runtime, while Project Leyden explores AOT caches for class loading and linking rather than replacing the JVM.

## Threads And Happens-Before

At the thread layer:

- A **platform thread** is a thin wrapper around an OS thread, a 1:1 mapping.
- A **virtual thread** (Java 21, JEP 444) is scheduled by the JVM onto a small pool of carrier threads using M:N scheduling and a work-stealing `ForkJoinPool`. Virtual threads improve throughput for blocking I/O; they do not make CPU-bound work faster.

When threads share memory, the CPU and the JIT compiler may reorder reads and writes that have no synchronization relationship. The Java Memory Model defines **happens-before** to say which writes a read is guaranteed to see.

The volatile example from the talk: Thread 1 writes plain data (`shared.data = getData()`), then writes `volatile boolean ready = true`. Thread 2 reads `ready` and sees `true`. JLS §17.4.4 says a write to a volatile field happens-before every subsequent read of that field. Because the data write precedes the flag write in program order, Thread 2 is guaranteed to see the data as well.

Two limits are easy to miss:

- `volatile` gives visibility and ordering, not atomicity. `count++` on a volatile field is still a read-modify-write race.
- The guarantee depends on the write order. If the flag is written before the data, the reader can see `ready == true` with stale data.

## Heap, Allocation And GC Roots

`new` allocates on the shared Java heap. Real implementations make the fast path very cheap:

- **Bump-the-pointer**: allocate by moving a pointer through a free region.
- **TLAB** (Thread-Local Allocation Buffer): give each thread a private slice of the heap, so most allocations need no global lock. Larger objects may fall back to a slower shared path.
- **Escape analysis**: the JIT can prove an object never escapes and eliminate the allocation entirely.

The collector finds live objects by reachability from **GC roots**. The lecture lists three sources:

- Static fields of loaded classes.
- Live object references in method frames on every thread's stack, including local variables and the operand stack.
- JNI references that keep native-code objects alive.

That list is illustrative, not exhaustive. Implementations also treat class loaders, JNI global references, monitors and JVM-internal structures as roots. Anything unreachable from the roots is garbage; a cycle of objects that references only itself is still collectable, because tracing follows reachability rather than reference counts.

Parallel collectors use multiple GC threads during a stop-the-world pause. Concurrent collectors run some phases alongside application threads. Which phases run, and how long the pauses are, is decided by each collector's algorithm: G1 has been the HotSpot default since JDK 9, while ZGC and Shenandoah target much shorter pauses with different throughput trade-offs.

## Metadata And Monitoring

The JVM exposes three distinct observation surfaces:

| Interface | What it is                                                                                            | Typical users                                     |
| --------- | ----------------------------------------------------------------------------------------------------- | ------------------------------------------------- |
| JVMTI     | Native tool interface for agents inside the process: breakpoints, class redefinition, heap inspection | Debuggers, profilers, instrumentation agents      |
| JMX       | Managed beans (MBeans), including platform MXBeans for memory, threads and GC                         | JConsole, VisualVM, custom dashboards             |
| JFR       | Low-overhead event recorder built into the JDK, open-sourced in JDK 11 (JEP 328)                      | JDK Mission Control, `jcmd`, production profiling |

JVMTI is the low-level native boundary. JMX is the managed-object boundary and is what most Java monitoring tools consume. JFR records events — allocations, GC pauses, lock contention, I/O — with low enough overhead to leave running in production.

The class metadata behind reflection, `invokedynamic` call sites and JNI also lives in this area. Metaspace holds class metadata, so a classloader leak shows up as growing Metaspace and eventually `OutOfMemoryError: Metaspace`.

## What To Measure

The lecture closes by asking which link usually needs the most careful measurement. A practical mapping:

| Symptom                           | Signal                                      | Tool                                                 |
| --------------------------------- | ------------------------------------------- | ---------------------------------------------------- |
| Threads blocked, throughput drops | Thread states, monitor enter events         | Thread dumps, JFR, async-profiler                    |
| Latency spikes with normal CPU    | GC pause times and frequency                | `-Xlog:gc*`, JFR GC events, `GarbageCollectorMXBean` |
| Memory grows and never returns    | Live set by class, dominator tree, GC roots | Heap dump, Eclipse MAT, `jmap`                       |
| High allocation rate              | Allocation samples, TLAB waste              | JFR allocation events                                |
| `OutOfMemoryError: Metaspace`     | Loaded class count, Metaspace usage         | `-Xlog:class+load`, JMX, heap dump                   |

A leak is usually a reference that keeps an object reachable from a root, not a missing `free`. The heap dump answers "who still points at this"; the GC log answers "how long the collector stops"; a thread dump answers "who is waiting on whom." Measure the link that matches the symptom instead of tuning flags by intuition.

## Check Before Repeating

- "A class is identified by its fully qualified name." It is the binary name plus the defining loader.
- "Verification happens as each instruction executes." It happens during linking, before the class is initialized or used.
- "Reading a static final constant initializes the class." Compile-time constants are inlined and do not trigger initialization.
- "AOT means there is no runtime." Memory management, GC, threads, reflection and monitoring still need runtime support.
- "volatile makes compound operations thread-safe." It provides visibility and ordering, not atomicity.
- "GC roots are only static fields and thread stacks." Those are the common examples; JNI references, class loaders and monitors also act as roots.
- "Virtual threads speed up CPU-bound code." They reduce the cost of blocking, not the cost of computation.

## Sources

- [JetBrains – JVM Anatomy 101 (Nikita Lipsky, 2023)](https://www.youtube.com/watch?v=BeMi8K0AFAc)
- [JVMS Chapter 5 – Loading, Linking, and Initializing](https://docs.oracle.com/javase/specs/jvms/se21/html/jvms-5.html)
- [JLS §12.4.1 – When Initialization Occurs](https://docs.oracle.com/javase/specs/jls/se21/html/jls-12.html)
- [JLS §17.4.4 – Synchronization Order](https://docs.oracle.com/javase/specs/jls/se21/html/jls-17.html)
- [JEP 444 – Virtual Threads](https://openjdk.org/jeps/444)
- [JEP 410 – Remove the Experimental AOT and JIT Compiler](https://openjdk.org/jeps/410)
- [JEP 328 – Flight Recorder](https://openjdk.org/jeps/328)

> **See also:** [Structured Concurrency In Java](/Technology/Programming Languages/Concepts/Structured Concurrency In Java) · [Race Conditions In Go](/Technology/Programming Languages/Concepts/Race Conditions In Go) · [Concurrency Parallelism And Multithreading](/Technology/System Design/Concepts/Concurrency Parallelism And Multithreading) · [Java Microservices](/Technology/Programming Languages/Practices/Java Microservices) · [Java Spring](/Technology/Programming Languages/Tools/Java Spring) · [Alpine JVM](/Technology/Cloud And DevOps/Practices/Dockerfiles/Java/Alpine JVM)
