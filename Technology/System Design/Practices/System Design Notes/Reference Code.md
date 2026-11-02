---
area: technology
domain: system-design
type: resource
title: Reference Code
description: A pointer to a sample backend blog application on GitHub for studying application architecture.
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - system-design
  - backend
resource: https://github.com/dyarleniber/simple-blog-application-backend-challenge
---

# Reference Code

This note points at a simple blog application backend challenge, kept as an example of a backend blog application. The readme describes a Simple Blog API built with TypeScript and MongoDB. It uses Clean Architecture and SOLID principles. The repository title also names TDD and design patterns.

Users can create, read, update, and delete blog posts and comments. Login and signup use JWT. A user must be authenticated to create, update, or delete posts and comments. A CI workflow on GitHub Actions tests the source, builds a coverage report, and uploads it to Coveralls.

- Simple blog application backend challenge: an example of a backend blog application.
  - Source: https://github.com/dyarleniber/simple-blog-application-backend-challenge

The code is split into Domain, Application, Infrastructure, and Main. Domain holds entities and business logic. Application holds use cases and interfaces. Infrastructure holds repositories, adapters, controllers, middlewares, and validators. Main composes controllers, middlewares, and use cases by injecting dependencies, and it does not use a dependency injection container. Tests use Jest.

> **See also:** [Overview](/Technology/System Design/Practices/System Design Notes/Overview) · [Software Architecture](/Technology/System Design/Practices/System Design Notes/Software Architecture)
