---
area: technology
domain: golang
type: guide
title: Race Conditions In Go
description: A Go race condition is shared state whose result depends on unsynchronized interleaving; a data race is the memory-access case, and the usual fixes are a small mutex, an atomic, or a single owner behind a channel, checked with go test -race.
timestamp: "2026-10-07T00:00:00.000Z"
tags:
  - technology
  - golang
  - concurrency
---

# Race Conditions In Go

Starting a goroutine is one keyword. That does not by itself create a race. A race condition appears when more than one execution flow uses the same state, at least one of them writes, and the result depends on an order the program does not control.

The code compiles. Unit tests can pass. A local run can look fine for thousands of iterations. Under concurrent production traffic the same code can drop counts, overwrite state, or return a result that depends on which request arrived a moment earlier.

## A lost update

`counter++` is not one atomic step. It reads the value, adds one, and writes the result back.

```go
var counter int

for i := 0; i < 1000; i++ {
    go func() {
        counter++
    }()
}
```

One thousand goroutines do not guarantee `counter == 1000`. Two of them can both read `10`, both compute `11`, and both store `11`. One increment is gone. That is a lost update.

The same shape shows up in an HTTP handler. `net/http` runs each request in its own goroutine:

```go
var totalRequests int

func handler(w http.ResponseWriter, r *http.Request) {
    totalRequests++
    fmt.Fprintln(w, totalRequests)
}
```

If many requests overlap, several goroutines read and write `totalRequests` together. The printed count can be lower than the number of requests that actually arrived. The pattern is request, goroutine, shared state, then read-modify-write with nothing serializing the three steps.

## Data race and race condition

A **data race** is a memory rule. Two or more goroutines access the same location at the same time, at least one access is a write, and no synchronization orders them. Two unsynchronized `counter++` calls are a data race.

A **race condition** is wider. The result depends on timing or on the order of concurrent steps. A check followed by an action is the usual backend case:

```text
read balance
if balance >= 100
withdraw 100
```

Two requests can both see a balance that still covers the withdrawal, then both withdraw. The logic is wrong even when you would not describe the bug as "two writes to one integer with no lock." In a Go service the first thing to hunt is still a data race on shared memory, because that is what the race detector can see.

## Why they disappear while you look

A normal bug has a stable path: this input, this function, this failure. A race depends on schedule. Order A, B, C can be fine. Order B, A, C can be wrong. Ten thousand local runs can miss it, and production traffic can hit it.

A `fmt.Println` or a debugger changes timing. The bug can vanish while you inspect it. That is why races are hard to reproduce, not why they are harmless. The failure mode is often a wrong answer, not a crash.

## The race detector

Go ships a detector for data races on the paths a test or a process actually runs:

```bash
go test -race ./...
go run -race main.go
```

```go
func main() {
    var counter int
    var wg sync.WaitGroup
    for i := 0; i < 1000; i++ {
        wg.Add(1)
        go func() {
            defer wg.Done()
            counter++
        }()
    }
    wg.Wait()
    fmt.Println(counter)
}
```

`go run -race` on that program reports the concurrent accesses and the stacks involved. Run `go test -race ./...` in CI for packages that share state across goroutines. The detector is not a proof. It only reports races on executions that happened during that run. It also slows the program, so it belongs in tests, not on the production hot path as a permanent flag.

## Mutex

`sync.Mutex` makes a critical section exclusive:

```go
var (
    mu      sync.Mutex
    counter int
)

func increment() {
    mu.Lock()
    defer mu.Unlock()
    counter++
}
```

One goroutine holds the lock. The others block in `Lock` until `Unlock`.

Keep the section small. This holds the lock across work that does not touch `counter`:

```go
mu.Lock()
defer mu.Unlock()
// HTTP call, database query, file read, then counter++
```

Every other goroutine waits for that whole stretch. Lock only the update:

```go
mu.Lock()
counter++
mu.Unlock()
```

Leave the network and the database outside the lock. On a busy service a wide lock turns concurrency into a queue.

## Atomics

A single counter, gauge, flag, or sequence number can use `sync/atomic` instead of a mutex:

```go
var counter atomic.Int64

counter.Add(1)
n := counter.Load()
counter.Store(100)
```

`Add`, `Load`, and `Store` are safe for concurrent use on that value. They do not replace a mutex when several fields must change together. If a struct update is "all of these fields or none," a mutex around the whole update is the clearer tool. Atomic is not a faster mutex for every case.

## One owner and a channel

The other design is to stop sharing the variable. One goroutine owns the state. Everyone else sends it a message:

```text
goroutines --> channel --> owner goroutine --> counter++
```

```go
for range incrementCh {
    counter++
}
```

Callers send `incrementCh <- struct{}{}` instead of writing `counter` themselves. This pays off when the state has real logic and the operations must run one at a time. For a bare increment, a mutex or an atomic is less machinery.

Go's proverb is "do not communicate by sharing memory; share memory by communicating." It does not ban mutexes. A mutex is the right tool when shared memory is the simple design.

## Check, then act

A quota, a coupon, an inventory row, a payment, a rate limit, or "this user may create one resource" is often this sequence:

```go
if count < 1 {
    createResource()
    count++
}
```

Two requests can both read `count == 0` and both create a resource. The bug is the gap between the check and the act, not only the `++`.

Those two steps have to be one serialized section: the same mutex, the same owner goroutine, or a single database statement. An in-process mutex does not cover two processes or two replicas. That case needs a transaction, a unique constraint, or some other shared serializer.

## Maps and other shared values

A race is not limited to `var counter int`. The same question applies to a map, a slice, a struct, a cache, a singleton, and connection state.

```go
var users = map[string]string{}

func addUser(id, name string) {
    users[id] = name
}
```

A plain Go map does not allow concurrent writes. Those writes are a data race, and the runtime can stop the process with a concurrent-map fatal error. Protect the map with `sync.Mutex` or `sync.RWMutex`, or use `sync.Map` when the access pattern fits that type. `sync.Map` is not a default replacement for every `map`.

`sync.RWMutex` fits many readers and few writers. Readers take `RLock`. A writer still needs an exclusive `Lock`, and a read that must not race with a write cannot use a shared lock for the whole check-then-act.

## What to reach for

Ask who owns the state before picking a primitive.

| Tool | Use it when |
| --- | --- |
| Less shared mutable state | Several goroutines would otherwise write the same values |
| `sync.Mutex` | A shared value, or several fields that change together |
| `sync.RWMutex` | Many readers, few writers, and the read is not a check-then-act |
| `atomic` | One integer, flag, or sequence |
| Channel to an owner | Operations on that state must be serialized as messages |
| `sync.Once` | Initialization that must run one time |
| `sync.WaitGroup` | Waiting until a set of goroutines finishes |
| `context.Context` | Cancel and deadline across goroutines |

`time.Sleep` is not one of these. This does not wait for the goroutine. It hopes the goroutine finishes inside one second:

```go
go doSomething()
time.Sleep(time.Second)
```

Wait with a `WaitGroup`, a channel, or a `Context`. Protect data with a mutex or an atomic.

## What to ask in review

When goroutines share state:

- Who reads it, and who writes it?
- Can those accesses overlap?
- Is the operation atomic, or is there a gap between check and act?
- If it is not atomic, which lock, atomic, or owner goroutine covers both steps?
- Does that protection still hold when more than one process runs the code?

`go test -race ./...` answers the data-race part for the paths the tests run. It does not design the ownership.

> **See also:** [Concepts Notes](/Technology/Programming Languages/Concepts/Concepts Notes) · [Scalable Golang Course Notes](/Technology/Programming Languages/Concepts/Scalable Golang Course Notes)
