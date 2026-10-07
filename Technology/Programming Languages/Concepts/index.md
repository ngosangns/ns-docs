# Concepts

- [Async Discussion](Technology/Programming%20Languages/Concepts/Async%20Discussion.md) - Notes comparing how asynchronous execution works in JavaScript (call stack and callback queue) and in PHP (Fibers as green threads).
- [Concepts Notes](Technology/Programming%20Languages/Concepts/Concepts%20Notes.md) - Notes on the Go runtime scheduler and the operating-system scheduler article it builds on.
- [Defer Async Inline](Technology/Programming%20Languages/Concepts/Defer%20Async%20Inline.md) - Explains how browsers execute inline, `defer`, `async`, and module scripts, and when to choose each for page performance and correct execution order.
- [Layered Design In Go IRI](Technology/Programming%20Languages/Concepts/Layered%20Design%20In%20Go%20IRI.md) - Explains layered package design in Go, why it follows from the ban on circular imports, and a prioritized list of refactorings for breaking circular dependencies.
- [Race Conditions In Go](Technology/Programming%20Languages/Concepts/Race%20Conditions%20In%20Go.md) - A Go race condition is shared state whose result depends on unsynchronized interleaving; a data race is the memory-access case, and the usual fixes are a small mutex, an atomic, or a single owner behind a channel, checked with go test -race.
- [Scalable Golang Course Notes](Technology/Programming%20Languages/Concepts/Scalable%20Golang%20Course%20Notes.md) - Curriculum outline of Viet Tran's scalable Golang course, covering language features, APIs, databases, async jobs, deployment, gRPC, microservices, and DevOps.
