---
area: technology
domain: golang
type: guide
title: Layered Design In Go IRI
description: Explains layered package design in Go, why it follows from the ban on circular imports, and a prioritized list of refactorings for breaking circular dependencies.
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - golang
  - architecture
  - design
---

# Layered Design In Go IRI

Layered Design in Go

- How the author designs Go programs, based on the language's principles and limitations.
- The author looked for existing design methodologies but found none that fit the way they work completely.

## Basic Requirements

- Go has an important and often underrated rule: packages are not allowed to reference each other circularly. This is strictly forbidden and causes a compile error.
- Packages are Go's main mechanism for information hiding, through exported and unexported fields and identifiers.
- Putting everything in a single package is possible. However, this sacrifices the ability to use information hiding to maintain invariants. At larger scale, some other discipline is needed to replace it. So the "one big package" approach is ruled out in this discussion.
- Go uses the `main` package containing the `main` function as the entry point of an executable program.
- The package import structure in Go is a directed acyclic graph (DAG), in which packages are nodes and imports are directed edges. Each executable program has a special "top node".

## Layered Design in Go

- Because circular references are banned, there are always packages that import no other package in the application.
- These packages are placed in the bottom layer.
- Then, packages that import only packages from the bottom layer are placed in the next layer.
- This process repeats until all packages are layered by the depth of their import stack.
- The result is that all package imports point downwards in this layer graph.
- The bottom layers typically contain very basic things such as a package providing metrics, a package tuning logging, or data structures.
- These basic packages are composed into higher-level functionality, for example header handling or information about users (permissions, metadata).
- Those are in turn composed into objects at still higher layers, until the desired application functionality is reached.
- In this context, "higher level packages" literally means packages that appear "higher" in the graph than the packages they import. This differs from the usual meaning of "higher level" as "higher level of abstraction". Although a package that provides a higher level of abstraction is usually a higher-level package in the graph, a higher-level package can simply be one that uses a lower-level package without abstracting it (for example, a crawler that uses `net/http`).

## Descriptive, Not Prescriptive

- This description of package layering based on imports is not prescriptive.
- It is required.
- You can draw the graph and layer every Go module this way. It is a mathematical consequence of the rules about how packages may import each other. It describes reality in Go.
- This means any other prescriptive design for a Go program must sit on top of this layered structure. It has no alternative.
- For example: you can follow an MVC architecture or a Hexagonal architecture, but you must do it on top of Go layering (MVC on top of Go layering, hexagonal architecture on top of Go layering).
- Putting all the components of an architecture (for example MVC) into a single package for convenience or to make them work increases the chance of creating reference cycles with other packages.
- Different design methodologies are not equally compatible when applied on top of this layering constraint. Methodologies that imply the possibility of circular imports tend to scale poorly in Go.

## What's the Best Prescription?

- The author's personal view is that "none" is best. The layered design described above is already a perfectly reasonable and complete design approach.
- It fits well with concepts from Functional Programming, especially purifiable subcomponents and the ability to compose the purification of multiple components. This supports testing without depending on external state.
- The author's favorite advantage of this approach is that for any package, there is only a limited, well-defined number of packages you need to understand in order to understand that package, even when considering the transitive closure of imports.
- It is impossible to write code that requires understanding the whole codebase to understand it, because you cannot accidentally create a reference cycle to all the important code.
- As code grows, this approach strongly encourages packages to use and import only what they truly need, because otherwise they can easily end up in an import cycle at some point.
- Higher-level designs (local prescriptions) can be useful in specific parts of the codebase (for example web handlers, database-heavy applications, plugin architectures). Isolate them in the places where they make sense; do not try to impose them at the top level for the whole Go program.

## Avoiding Circular Dependencies

- When a circular dependency occurs, the first thing to do is analyze deeply to find exactly where the cycle originates.
- Import cycles should be minimized in any language, because they make the codebase harder to understand.
- Don't stop at "package A depends circularly on package B"; trace down to the smallest pieces of structure and specific functionality that cause the cycle. Do this in fine detail, because the fix may involve splitting code along the boundaries you discover.
- Usually, an import cycle error appears when new code adds a new dependency that closes a loop. This new code is called the "new circular code". The most easily changed piece of code that causes the loop is called the "breakable link".
- The cycle is usually caused by a much smaller piece than the whole package.
- Applying the refactorings below often improves conceptual clarity and yields a more robust design. It also often reduces the size of the package's exported public interface.
- The solutions are listed in order of preference:
  1. Move The Functionality:
     - This is the most important solution when it is applicable, though not the most common.
     - After analysis, you may find that the part causing the cycle is simply in the wrong place. It may belong together with the new code that causes the cycle.
     - This may involve splitting up an existing conglomeration of functionality.
     - Don't only move whole types; you may be slicing up code, a field here, a field there. You may even need to split a seemingly atomic field in two, though that is rare. The analysis needs to be very granular.
     - This is the best solution not only because it breaks the cycle but also because it gives the strongest result for the package's conceptual clarity. Moving a concept that does not belong with the "breakable link" completely to its proper place is a big long-term win.
  2. Create A Third Package For The Shared Bit:
     - If one package needs something that lives in another package and causes the circular dependency, consider moving that thing into a new third package that both original packages can import.
     - A common example: a simple data type like `Username` is initially put into the package that needs it. As the program grows, another package also needs to reference `Username`, causing a cycle. `Username` (usually a validated string) can almost certainly be moved into its own package.
     - The hesitation to do this usually comes from the feeling that having an entire package for a single data type is bad design.
     - However, the author recommends doing it. In their experience, most of the time this new package will not hold a single data type forever and will quickly grow. Think of packages not only as snapshots in time but in terms of their evolution. Often, this new package is the first example of a new, non-trivial concept that the package will soon express in a more complex and complete way.
  3. A New Third Package That Composes The Circular Packages:
     - Similar to the previous case, but in the opposite direction.
     - If two packages depend on each other circularly for some purpose, you can extract that dependency and turn it into something that uses those two packages to accomplish the task that required the cycle.
     - This is used less often once you are used to designing native Go architecture. Architectures based on OO inheritance tend to lead to deep circular dependencies.
     - ORM example: `Category` and `BlogPost` are in different packages, with a many-to-many relationship. The `.Save()` operation on each type ends up depending on the other type, creating a cycle.
     - Solution: make `Category` and `BlogPost` "dumber". Drop the idea that they know how to save themselves. Make `Category` and `BlogPost` plain data structures. A higher package connects them via the many-to-many relationship. An even higher package "knows" how to load them from the DB and save the changes.
     - (This does not work well with an ORM, and it is one of many reasons the author avoids ORMs. An ORM makes every object "know" about the DB, causing the "you wanted a banana but got a gorilla holding the banana and the entire jungle" problem, the want-banana-get-jungle problem. Layered design in Go is uncomfortable with this approach because the more "jungle" there is, the easier it is to get circular dependencies. Go nearly forces you to let `Banana` and `Gorilla` exist independently, and to express relationships in higher-level packages. Although it is not fully enforced, fighting against this will be difficult.)
  4. Interface To Break The Dependency:
     - If the cycle is caused by referencing a concrete type whose methods the cycle-causing code calls, you can break the cycle by having one side of the circular reference accept an interface instead of the concrete type.
     - Example: instead of a function accepting `users.DBList` (a concrete type), define a `UserList` interface with an `Exists` method and have the function accept `UserList`.
     - This is not always a complete solution. If the interface needs values from the cycle-causing package as arguments or returns them as parameters, a circular reference may remain. However, even in those cases, the interface can still be part of the solution.
     - You may need to create a new method that the interface can implement. For example: if the circular reference tries to access an exported field of another struct, you can unexport that field and wrap it behind a method, just so an interface can be used to break the circular reference chain.
     - This solution is lower on the list because it still creates a relationship between the two packages, albeit a looser one. It may hint at an inappropriate mixing of concepts (for example "user" and "admin" in the example). Splitting the package into clean parts that do not mix concepts still gives superior results.
     - Sometimes the interface solution is necessary when the project has matured and needs to connect things that previously seemed separate.
  5. Copy The Dependency:
     - Apply the Go proverb: "A little copying is better than a little dependency". It is commonly used when you don't want to import a large library just to use a few lines of code.
     - It can also apply to your own codebase. If you import an entire separate package just to use a very small piece of code, and that code truly belongs in that package, you may simply copy those lines into the package that is caught in the cycle.
     - This solution is also lower on the list. Overusing it leads to Don't Repeat Yourself (DRY) problems.
     - However, in the author's experience, about half the time this solution is forced, the copied code ends up diverging significantly (and correctly), showing that they were never really the same thing to begin with.
  6. Maybe They Shouldn't Be Two Separate Packages:
     - Finally, if none of the solutions above is feasible (despite your effort), perhaps because the cycle is too large, the answer is that the code is showing this should really be just one package.
     - The author likes to split everything into many packages, but sometimes gets too enthusiastic and tries to separate things that shouldn't be.
     - If this happens often, you may need more practice. But it should happen at least occasionally; otherwise you may not be trying hard enough to split things up.
     - The larger the combined package would be, the more you should try to find another way to break the circular dependency. Ultimately, though, it is a cost/benefits decision.

## Differences From Other Approaches

- The author has trouble describing the differences precisely, having done this for so long that good design methodologies blur together.
- However, this approach produces at least one clear difference: each package ends up as something useful on its own terms.
- It avoids the want-banana-get-jungle problem.
- Even heavy Dependency Injection (DI) architectures can leave each service needing every possible dependency, so although they are purifiable in principle, nothing is really usable in isolation. If providing the dependencies still requires providing every service in the system, it is not truly severable.
- This architecture tends to force you to narrow everything down to just what it needs and nothing else.
- Example: an email classification system would need only the email and the related classification services; it would not need user information, their admin rights, the forums they manage, or the top posts in those forums. If it needed that information, it would be isolated behind interfaces that can be mocked or stubbed. If only a username is needed, you will usually be forced to do it through an interface for "yielding a name" rather than pulling in the entire users package and its dependencies.
- Many other approaches may claim their goal is to create useful, independently standing things, but in practice they still easily require the "jungle" to get the "banana". This approach tends to produce things that are practically useful independently.
- When you need to split parts out into microservices from a monolith, the process is almost automatic: just follow the dependencies and provide them. The system has already been pushed in this direction, so the split does not shock the codebase. This is a great way to design a "monolithic microservice" codebase.

## General Good Practice for Go Packages

- Beyond this design approach, a good thing for any Go package is to try to minimize the amount of exported stuff from the package.
- Use `godoc` to see what is being exported.
- Re-check each exported symbol to see whether it really needs to be exported.
- The thinner the interface, the better this approach works.
- Err on the side of keeping everything unexported, because exporting something later is very easy (just rename it). Unexporting something that was previously exported is harder (an IDE can warn you if it is still used).

## Trying This Approach

- There is an irreducible level at which you need to try this approach yourself to understand it, even in a language other than Go.
- If you try it in a language other than Go, you need a rule that forbids circular imports and makes them a compile or build error.
- Try it on a greenfield project. Refactoring an existing system built with another approach to move it to this one is tedious and difficult, but that is a general truth of refactoring, not specific to this approach.

> **See also:** [Scalable Golang Course Notes](/Technology/Programming Languages/Concepts/Scalable Golang Course Notes) · [Golang Scheduler](/Technology/Programming Languages/Concepts/Golang Scheduler)
