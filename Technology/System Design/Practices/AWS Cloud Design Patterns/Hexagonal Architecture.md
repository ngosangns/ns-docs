---
area: technology
domain: software-architecture
type: guide
title: Hexagonal Architecture
description: Describes the Hexagonal Architecture (Ports and Adapters) pattern for loosely coupled, independently testable applications, including how to apply it on AWS Lambda.
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - software-architecture
  - aws
  - design-patterns
---

# Hexagonal Architecture

Hexagonal Architecture, also known as the **Ports and Adapters** pattern, is designed to create loosely coupled architectures. It lets application components be tested independently, without depending on data stores or the user interface (UI).

## Key Components

- **Core (business logic)**: Sits at the center and holds the core business rules (domain logic). It knows nothing about the outside world (database, web, and so on).
- **Ports**: Technology-agnostic interfaces. They are the entry or exit points of the application.
- **Adapters**: Concrete implementations for a specific technology. For example, a REST adapter that receives requests from the web, or a DynamoDB adapter that stores data.

## Advantages

- **High testability**: Business logic is easy to unit test by mocking the ports, without running the whole infrastructure.
- **Flexible and technology-independent**: You can change the database (for example, from MySQL to DynamoDB) or the interface (from REST to GraphQL) without modifying the business logic.
- **Reduces technical debt**: Keeps the system easier to maintain and extend over time.

## Implementation on AWS Lambda

In a serverless environment such as AWS Lambda, there is a tendency to write business logic and database connection code in the same function. Applying this architecture helps by providing:

- **Domain Model**: Classes that contain only business logic (for example, checking for overlapping bookings).
- **Input Port**: An interface that coordinates the execution of the logic.
- **Adapter**: A concrete class that uses `boto3` to interact with DynamoDB, plugged into the port through Dependency Injection.

## When to Use

- When you want to fully decouple the application from infrastructure so it is easy to test.
- When the same business logic is used by different kinds of clients (mobile, web, CLI).
- When infrastructure components (UI, database) need frequent technology updates.

## Challenges

- **Complexity**: Separating the code requires many intermediate layers (adapters), which can increase the amount of code to maintain.
- **Latency**: Passing through multiple layers can add a small delay, though it is usually negligible.

> **See also:** [Strangler Fig](/Technology/System Design/Practices/AWS Cloud Design Patterns/Strangler Fig) · [Event Sourcing](/Technology/System Design/Practices/AWS Cloud Design Patterns/Event Sourcing)
