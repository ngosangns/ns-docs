---
area: technology
domain: migration
type: guide
title: Strangler Fig
description: Describes the Strangler Fig pattern for incrementally migrating a monolith to microservices behind a proxy layer, with AWS implementations, benefits, and challenges.
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - migration
  - microservices
  - aws
  - design-patterns
---

# Strangler Fig

The Strangler Fig pattern helps migrate a monolithic application to a microservices architecture gradually, reducing risk and business disruption compared with replacing the whole system at once (a Big Bang migration).

## Core Idea

Inspired by the strangler fig tree in nature (which grows around a host tree and gradually replaces it), this pattern extracts features from the monolith one at a time into small services (microservices). Over time, the new system surrounds and completely replaces the old one.

## Key Components

- **Proxy layer**: Sits between users and the system and routes requests. If a feature has been moved to a microservice, the proxy calls the new service; if not, it still calls the old monolith.
- **Anti-Corruption Layer (ACL)**: When components inside the monolith need to call services that have been split out, the ACL acts as an adapter to ensure compatibility and avoid breaking the legacy logic.
- **Data synchronization**: Ensures that data in the monolith's database and the microservice's database stays consistent throughout the migration.

## When to Use

- You want to migrate a large, complex application without stopping operations to rewrite it from scratch.
- The risk of replacing everything at once is too high.
- The business needs new features even while the architecture is being transformed.
- You need to minimize the impact on end users.

## Implementation on AWS

- **Amazon API Gateway**: Acts as a powerful proxy layer, supporting path-based routing to redirect traffic.
- **AWS Lambda**: Commonly used to implement the small services split out of the monolith.
- **AWS Migration Hub Refactor Spaces**: Automates creating the routing infrastructure and managing the migration across multiple AWS accounts.
- **Polyglot persistence**: Lets each microservice use the database that fits it best (DynamoDB for key-value data, Aurora for relational data, ElastiCache for caching).

## Benefits

- **Reduced risk**: You can easily roll back if a migration step fails.
- **Continuous delivery**: Users can use new features as soon as they are extracted.
- **Team independence**: Teams can start owning and operating the new microservices independently.

## Challenges

- **Data management**: Synchronizing data between the old and new systems can be very complex.
- **Infrastructure complexity**: Requires managing the proxy layer and intermediate components (ACL).
- **Dependencies**: You need a solid understanding of domain boundaries (DDD) to avoid splitting services incorrectly and creating cross-dependencies.

> **See also:** [API Routing Path](/Technology/System Design/Practices/AWS Cloud Design Patterns/API Routing Path) · [Hexagonal Architecture](/Technology/System Design/Practices/AWS Cloud Design Patterns/Hexagonal Architecture)
