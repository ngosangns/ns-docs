---
area: technology
domain: software-architecture
type: guide
title: Software Architecture
description: A survey of software architecture patterns (Clean, Hexagonal, Microservices, EDA, DDD, CQRS, LMAX, MVC family) and design principles (SOLID, DRY, AOP, Command Bus), with references and examples.
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - software-architecture
  - design-patterns
  - ddd
  - microservices
resource: https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html
---

# Software Architecture

## Common Architecture Patterns

### Clean Architecture

Clean Architecture is a software architecture pattern proposed by Robert C. Martin (Uncle Bob), focused on separation of concerns by dividing the application into concentric layers. The inner layers (e.g. Entities, Use Cases) do not depend on the outer layers (e.g. Frameworks, UI, DB). This makes the system easy to test, easy to maintain, and independent of implementation details.

- Main layers:
  - Entity (Domain Layer): where DDD concepts such as Aggregates, Value Objects, Entities, and Domain Services are implemented.
  - Use Cases (Application Layer): contains the application-specific business logic.
  - Interface Adapters (Infrastructure Layer): contains implementations of repositories, presenters, controllers, and gateways.
  - Frameworks & Drivers: the outermost layer, containing the specifics of frameworks, UI, database, and peripherals.
- Dependency rule: dependencies only point inward.
- References:
  - Uncle Bob's original article: https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html
  - Clean Architecture with Typescript - YouTube: https://www.youtube.com/playlist?list=PLN3ZW2QI7gLfQ4oEkDWw0DZVIjvAjO140
  - Applying Clean Architecture to a Golang REST API service (200lab.io): https://200lab.io/blog/ung-dung-clean-architecture-service-golang-rest-api
  - Clean Architecture with GoFiber: https://github.com/gofiber/recipes/tree/master/clean-architecture
  - Go Clean Architecture example: https://github.com/manuelkiessling/go-cleanarchitecture
  - Go Clean Architecture REST API example: https://github.com/AleksK1NG/Go-Clean-Architecture-REST-API
  - Simple blog using Clean Architecture, and SOLID principles: an article showing how to build a simple blog application using Clean Architecture and the SOLID principles.
    - Source: https://dev.to/dyarleniber/hexagonal-architecture-and-clean-architecture-with-examples-48oi

### Hexagonal Architecture (Ports and Adapters Architecture)

Hexagonal Architecture, also called Ports and Adapters, focuses on separating the core business logic (the application core) from external elements (UI, database, third-party services). Communication between the application core and the outside world goes through "ports" (interfaces that define how to interact) and "adapters" (concrete implementations of ports for each technology or service).

- Predates Clean Architecture and may have been its inspiration.
- Consists of Ports and Adapters:
  - Port: an interface defining the methods for working with external data sources or services such as HTTP, RPC, and databases.
  - Adapter: a concrete implementation of a Port.
- References:
  - Introduction to Hexagonal and comparison with Clean Architecture: https://www.youtube.com/watch?v=gVZM61e-uJw
  - Simple blog using Clean Architecture, and SOLID principles: the article also covers Hexagonal Architecture.
    - Source: https://dev.to/dyarleniber/hexagonal-architecture-and-clean-architecture-with-examples-48oi
  - Domain Driven Hexagon: a boilerplate combining DDD and Hexagonal Architecture.
    - Source: https://github.com/Sairyss/domain-driven-hexagon

### Microservices

Microservices architecture structures an application as a collection of small, independent services that can be deployed individually and communicate with each other through well-defined APIs.

#### Microservice Design Patterns

##### Anti-corruption Layer Pattern

A design pattern used to separate and isolate the components of the current system from external systems or services (usually legacy or third-party systems) that may be untrustworthy, unstable, or have a different data model. This layer acts as a translator, ensuring the current system's domain model is not "polluted" by external systems.
![](/Attachments/9c0d1e2f-3a4b-5c6d-7e8f-9a0b1c2d3e4f.png)

##### Compensating Transaction Pattern

A design pattern for managing and restoring system state after a distributed transaction or a sequence of operations fails. When an operation in the sequence fails, "compensating transactions" are executed to undo the operations that previously succeeded, in order to ensure data consistency (eventual consistency) or bring the system back to a safe state.
![](/Attachments/0d1e2f3a-4b5c-6d7e-8f9a-0b1c2d3e4f5a.png)

##### Sidecar Pattern

The Sidecar pattern is a design pattern in which a secondary application (the sidecar) is deployed alongside the main application to extend or enhance functionality without changing the main application's source code. It is commonly used in container environments such as Kubernetes to provide features like logging, monitoring, service discovery, and proxying.

- References:
  - Kubernetes Patterns - Structural Patterns: Sidecar Containers: https://viblo.asia/p/kubernetes-patterns-structural-patterns-sidecar-containers-QpmlezJm5rd
  - Sidecar pattern - Azure Architecture Center: https://learn.microsoft.com/en-us/azure/architecture/patterns/sidecar

### Event-Driven Architecture (EDA)

Event-Driven Architecture (EDA) is a software architecture pattern that promotes the production, detection, consumption of, and reaction to events. An event is a significant change of state. EDA lets system components be highly decoupled, easy to scale, and able to react flexibly to change.

- References:
  - Overview of Event-Driven Architecture: https://viblo.asia/p/kien-truc-huong-su-kien-event-driven-architecture-zXRJ8n2dVGq
  - Microservices with CQRS and Event Sourcing: https://viblo.asia/p/microservices-cung-voi-cqrs-va-event-sourcing-1Je5EDnYlnL

#### Event Sourcing

Event Sourcing is a pattern that stores application state as a chronologically ordered sequence of events. Instead of storing the current state of an entity, the system stores all the changes (events) that led to that state. The current state can be rebuilt by replaying all the events.

- References:
  - Event Sourcing pattern - Azure Architecture Center: https://learn.microsoft.com/en-us/azure/architecture/patterns/event-sourcing
  - Microservices Pattern: Event sourcing: https://microservices.io/patterns/data/event-sourcing.html
  - Event Sourcing - A Light Introduction: https://technology.lastminute.com/event-sourcing-a-light-introduction
  - Tản mạn về DDD trong Microservices, CQRS và Event Sourcing (Musings on DDD in Microservices, CQRS and Event Sourcing): https://batnamv.medium.ninja/t%E1%BA%A3n-m%E1%BA%A1n-v%E1%BB%81-ddd-trong-microservices-cqrs-v%C3%A0-event-sourcing-8741e87cc424

### Domain-Driven Design (DDD)

Domain-Driven Design (DDD) is a software development approach focused on modeling a complex business domain. Key concepts include Ubiquitous Language, Bounded Context, Entities, Value Objects, Aggregates, Repositories, and Domain Services. DDD helps build systems that faithfully reflect business logic and are easy to evolve and maintain.

- References:
  - Basic concepts of Domain Driven Design (DDD): https://viblo.asia/p/khai-niem-co-ban-ve-domain-driven-design-ddd-Do754qL4KM6
  - Developing code with Behavior-Driven Development (BDD) - Part 1 (BDD often goes hand in hand with DDD): https://viblo.asia/p/phat-trien-code-bang-behavior-driven-development-bdd-part-1-gGJ59ey95X2
  - Domain Driven Design Aggregates: https://www.jamesmichaelhickey.com/domain-driven-design-aggregates
  - Go DDD library: https://github.com/chrisngyn/go-ddd-library
  - Golang Advance DDD example: https://github.com/Nghiait123456/GolangAdvance/tree/master/DomainDrivenDesign
  - Musings on DDD in Microservices, CQRS and Event Sourcing: https://batnamv.medium.ninja/t%E1%BA%A3n-m%E1%BA%A1n-v%E1%BB%81-ddd-trong-microservices-cqrs-v%C3%A0-event-sourcing-8741e87cc424
- - [b0c1d2e3-f4a5-6789-9a0b-c1d2e3f4a5b6.pdf](/Attachments/b0c1d2e3-f4a5-6789-9a0b-c1d2e3f4a5b6.pdf)
- - [9c8a9b0c-1d2e-3f45-a6b7-c8d9e0f1234a.pdf](/Attachments/9c8a9b0c-1d2e-3f45-a6b7-c8d9e0f1234a.pdf)

### Command Query Responsibility Segregation (CQRS)

Command Query Responsibility Segregation (CQRS) is an architecture pattern that separates data write operations (Commands) from read operations (Queries). This allows each type of operation to be optimized separately, using different data models, databases, and scaling strategies if needed.

- References:
  - Simple demo of the CQRS architecture with Spring Boot: https://viblo.asia/p/simple-demo-ve-kien-truc-cqrs-voi-spring-boot-1Je5EdLGlnL
  - Command Query Responsibility Segregation (CQRS) – Craftsmanship: https://edwardthienhoang.wordpress.com/2018/01/26/command-query-responsibility-segregation-cqrs
  - Musings on DDD in Microservices, CQRS and Event Sourcing: https://batnamv.medium.ninja/t%E1%BA%A3n-m%E1%BA%A1n-v%E1%BB%81-ddd-trong-microservices-cqrs-v%C3%A0-event-sourcing-8741e87cc424

### LMAX Architecture

The LMAX architecture is designed for high-frequency financial trading systems, which require extremely low latency and the ability to handle a large volume of transactions.

- Key characteristics:
  - Real-time: processes transactions immediately.
  - Event-driven: events are placed in a queue and processed sequentially.
  - Single-thread: uses a single thread to process events, avoiding conflicts and ensuring consistency. Takes advantage of optimizations to reach high performance.
  - Entity-driven: focuses on the entity objects in the system.
- References:
  - The LMAX Architecture - Martin Fowler: https://martinfowler.com/articles/lmax.html

### VIPER

VIPER is an application architecture pattern for iOS that clearly separates the responsibilities of its components: View, Interactor, Presenter, Entity, and Router.

- View: displays the UI and receives user interaction.
- Interactor: contains the business logic related to the data entities (Entities).
- Presenter: receives data from the Interactor, formats and prepares data for the View. Receives events from the View and routes them to the Interactor or Router.
- Entity: represents the application's data objects.
- Router: handles navigation between screens.
- Comparison: similar to MVC, but the Controller is split into Presenter and Interactor. Routing is a separate layer.
- References:
  - Architecting iOS Apps with VIPER: https://viblo.asia/p/architecting-ios-apps-with-viper-7prv31xoMKod

### MVP (Model-View-Presenter)

Model-View-Presenter (MVP) is a user interface architecture pattern.

- Model: holds data and business logic.
- View: displays data (from the Model) and forwards the user's commands (events) to the Presenter for handling.
- Presenter: acts as the intermediary, receiving events from the View, interacting with the Model to fetch or update data, and then updating the View. The View and Presenter usually have a 1-1 relationship.
- Comparison: similar to MVC, but the View receives the request first, and the Controller is replaced by the Presenter.
- References:
  - MVP Pattern for Android: https://viblo.asia/p/mvp-pattern-for-android-1qm6RWzOveJE

### Comparing MVC, MVP, and MVVM

Common user interface architecture models include:

- MVC (Model-View-Controller): the Controller handles input, interacts with the Model, and chooses the View to display.
- MVP (Model-View-Presenter): the Presenter handles input from the View, interacts with the Model, and updates the View. The View is usually more passive.
- MVVM (Model-View-ViewModel): the ViewModel exposes data and commands to the View, and the View binds to the ViewModel's properties. Usually uses data binding.
- References:
  - What are MVC, MVP, MVVM? What you need to know about these programming models: https://wiki.matbao.net/mvc-mvp-mvvm-la-gi-thong-tin-can-biet-ve-cac-mo-hinh-lap-trinh

## Design Principles

### SOLID

SOLID is a set of 5 fundamental design principles in object-oriented programming that help produce software that is easy to understand, flexible, and maintainable.

- S - Single Responsibility Principle: each class should be responsible for only one specific task.
- O - Open/Closed Principle: software entities (classes, modules, functions) should be open for extension (new behavior) but closed for modification (of existing source code).
- L - Liskov Substitution Principle: objects of a subclass can replace objects of the parent class without changing the correctness of the program.
- I - Interface Segregation Principle: clients should not be forced to depend on interfaces they do not use. Create small, specific interfaces instead of one large, general one.
- D - Dependency Inversion Principle:
  - High-level modules should not depend on low-level modules. Both should depend on abstractions (interfaces).
  - Abstractions should not depend on details. Details should depend on abstractions.
- References:
  - SOLID by Việt Trần: https://www.youtube.com/watch?v=_dTJeiticT

### DRY (Don't Repeat Yourself) / DIE (Duplication Is Evil)

- DRY (Don't Repeat Yourself): this principle emphasizes avoiding repeated code or logic in a program. Instead, use functions, classes, or modules for reuse. It helps reduce bugs and improve maintainability.
- DIE (Duplication Is Evil): similar to DRY, focused on avoiding copying code between different components. Copied code can lead to inconsistencies and makes maintenance difficult.

### Aspect-Oriented Programming (AOP)

Aspect-Oriented Programming (AOP) is a programming paradigm that lets you separate cross-cutting concerns such as logging, security, transaction management, and caching from the application's core business logic. These "aspects" are defined separately and "woven" into the source code at specified points (join points).

- References:
  - Introduction to Aspect Oriented Programming (AOP) - GP Coder: https://gpcoder.com/5112-gioi-thieu-aspect-oriented-programming-aop

### Command Bus

The Command Bus is a design pattern that separates sending a request (command) from handling that request. It acts as an intermediary channel that receives command objects and dispatches them to the corresponding handlers for execution.

- Benefits:
  - Makes use cases explicit: the command bus is usually used in the Service Layer, which documents the project's actual use cases.
  - High reusability: business logic is encapsulated in commands and handlers, and can be reused from multiple entry points (HTTP, console, message queue).
  - High extensibility: it is easy to add middleware to the command bus to handle common concerns (logging, validation, transactions).
  - Easy to test: each command and handler represents a single use case, making it easy to isolate dependencies for testing.

### Event Loop Pattern

The Event Loop is a concurrency model design pattern used in many environments such as Node.js, web browsers (JavaScript), and GUI frameworks. It lets you handle asynchronous tasks and non-blocking I/O efficiently by using a single main thread to manage an event queue and execute callbacks. When an I/O task (e.g. reading a file, calling an API) is started, the main thread does not wait for it to complete but continues processing other events. When the I/O task finishes, an event is added to the queue and the corresponding callback is executed by the event loop.

## Goals and Notes When Building an Architecture

- The goal of architecture patterns is to help separate the work in a project into distinct layers, increasing modularity and reducing mutual dependencies.
- A good architecture needs to be:
  - Easy to change: able to adapt to new or changing requirements without too many modifications.
  - Easy to extend: new features can be added easily.
- Rules to follow:
  - When updating use cases (methods), create a new method instead of updating an old method that already works (Open/Closed Principle). Only delete the old method when no module uses it anymore.
  - Inner layers should not know about the work of outer layers (the Dependency Rule in Clean Architecture).
  - Outer layers are affected in input/output by inner layers but should not know the details of what the inner layers do.
  - Layers should not know about each other's work except through defined interfaces.

## References and Examples

### Clean Code

Writing clean code is the foundation of a good architecture.

- References:
  - Summary of Uncle Bob's Clean Code book - Viblo: https://viblo.asia/p/tom-tat-cuon-clean-code-cua-uncle-bob-6J3Zg07MlmB
  - [Clean Code Notes](/Technology/System Design/Concepts/Clean Code Notes)
  - Clean Code in Typescript: https://github.com/labs42io/clean-code-typescript
- - [0d9a0b1c-2e3f-4a56-b7c8-d9e0f1a2345b.pdf](/Attachments/0d9a0b1c-2e3f-4a56-b7c8-d9e0f1a2345b.pdf)

### Design Patterns

Design patterns are proven solutions to common problems in software design.

- References:
  - Design Pattern in PHP: a repository of design pattern examples in PHP.
    - Source: https://github.com/DesignPatternsPHP/DesignPatternsPHP
  - Design Pattern by Việt Trần: 23 Classic Design Patterns with Go (Golang) - YouTube Playlist.
    - Source: https://www.youtube.com/playlist?list=PLOsM_3jFFQRmNCt68hxCdxi8i_fUx2wTZ
    - GitHub: https://github.com/viettranx/go-design-pattern
  - Design Pattern by Tips Javascript:
    - Source: https://github.com/anonystick/learning-design-patterns

### Architecture Examples

- Tomato Architecture: an application architecture based on Clean Architecture and DDD.
  - Source: https://github.com/sivaprasadreddy/tomato-architecture
- Porto Architecture: a modern software architecture for PHP applications.
  - Source: https://github.com/Mahmoudz/Porto

## Tech Stack Examples

![](/Attachments/6d5a6b7c-8e9f-0a12-b3c4-d5e6f7a8901b.jpg)

## Tips

- Split utils into a submodule: use Git Submodule to manage shared libraries and utility modules as separate projects, which makes code reuse and version management easier.
  - Reference: https://topdev.vn/blog/git-submodules-va-ung-dung-trong-viec-chia-se-tai-nguyen-dung-chung/#:~:text=Git%20Submodule%20l%C3%A0%20m%E1%BB%99t%20t%C3%ADnh,kho%20l%C6%B0u%20tr%E1%BB%AF%20Git%20kh%C3%A1c.

> **See also:** [Clean Code Notes](/Technology/System Design/Concepts/Clean Code Notes) · [Technical Solutions](/Technology/System Design/Practices/System Design Notes/Technical Solutions) · [Development Documentation](/Technology/System Design/Tools/Development Documentation)
