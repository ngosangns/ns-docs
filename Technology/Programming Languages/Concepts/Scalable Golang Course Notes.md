---
area: technology
domain: golang
type: note
title: Scalable Golang Course Notes
description: Curriculum outline of Viet Tran's scalable Golang course, covering language features, APIs, databases, async jobs, deployment, gRPC, microservices, and DevOps.
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - golang
  - backend
  - microservices
  - grpc
---

# Scalable Golang Course Notes

Viet Tran's (Việt Trần) scalable Golang course.

## Go Language: Key Features

- Effective Go: conventions for clean, standard Go source code.
- Go channels: communication between goroutines (concurrency).
- Buffered channels in Go.
- The defer and recover mechanisms in Go.
- Using interfaces in Go.
- Slices, buffers, and JSON decode / encode in Go.

## Project Analysis

- Establish requirements and user stories from the UI.
- Analyze features, flows, and the APIs that are needed.
- Analyze the modules needed in the service.
- **Bonus**: splitting modules for microservices.

## Database Setup

- Install and connect to a database service: MySQL / PostgreSQL.
- Create the data tables based on the analysis results.
- Set up relationships between tables.
- Techniques for primary keys and indexes to get the best query performance.
- **Bonus**: experience designing databases for high performance.

## Writing APIs in Go (Basic)

- Learn REST API conventions.
- Basic APIs: Create-Read-Update-Delete (CRUD).
- CRUD APIs across multiple tables and transactions.
- Authentication with JWT, and how to use JWT to authenticate users.

## Writing APIs in Go (Advanced)

- Using middleware: pre-processing, authorization, crash recovery.
- File uploads: processing and storing with cloud storage (AWS S3) and a CDN.
- API communication between modules.
- Aggregating and linking data across modules.
- Bonus: designs that reduce coupling between modules, speed up processing, and prevent memory leaks.

## Async Handlers and Side-Effect Handling in Go

- How to build async jobs in Go.
- Handling timeouts and retries for async jobs.
- Synchronizing data with async jobs.
- Pub / Sub in Go.
- Building an async job queue and message broker.

## Deployment and Monitoring

- Logging system in Go.
- Automatic DB connection recovery (resilience).
- Using environment variables in Go.
- Build and deploy with Docker.
- Using nginx (as a Docker container) as a reverse proxy.
- **Bonus**: Monitoring and tracing.

## Using gRPC to Scale Services

- Introduction to gRPC.
- Programming with Protobuf 3.
- Creating basic services with gRPC.
- gRPC streaming.
- Using gRPC Gateway to additionally support REST APIs.
- **Bonus**: practical experience handling gRPC in the real world.

## Microservices Basics (New Livestream Course)

- Understanding stateless services.
- Splitting and deploying multiple microservices behind an API Gateway.
- Using Redis and NATS to scale services.
- Experience handling common problems in microservices.
- Clean Architecture, connecting services with gRPC.
- Using ServiceContext to manage ENV and plugins.

## Other Skills

- Backend and systems thinking.
- Basic algorithms and data structures.
- Building a GitHub profile.
- Project management and teamwork.
- Application architecture and common design patterns in Go.
- Building a CV to apply for Golang positions (with trainee review and mock interviews).

## DevOps Basics (New Livestream Course)

- Experience scaling a system to **100K CCU** (concurrent users).
- **Monitoring** system metrics.
- Architecture that is easy to split into **microservices**.
- **Distributed tracing** to find bottlenecks in the system.
- Basic **logging** system.

> **See also:** [Golang Scheduler](/Technology/Programming Languages/Concepts/Golang Scheduler) · [Layered Design In Go IRI](/Technology/Programming Languages/Concepts/Layered Design In Go IRI)
