---
area: technology
domain: backend
type: resource
title: Backend Overview
description: Curated backend engineering resources covering frameworks, libraries, web servers, ID schemes, authorization models, common concurrency bugs, and search, payment, and gateway tools.
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - backend
resource: https://github.com/gleam-lang/gleam
---

# Backend Overview

## Resources

- **Gleam**: Friendly language for building type-safe, scalable systems - [GitHub](https://github.com/gleam-lang/gleam)
- **Notes by anonystick**: [GitHub](https://github.com/anonystick/anonystick/blob/main/README.md)
- **Learning roadmap**: [Google Sheets](https://docs.google.com/spreadsheets/d/11AsPKmB6LYzMx4IhgKSz2oaDOIWPkJhDxjhgY7nKM1g/edit?pli=1#gid=0)
- **Solving deadlocks in distributed systems**: [Viblo](https://viblo.asia/p/giai-quyet-deadlock-cho-he-thong-phan-tan-bang-nhung-thuat-toan-pho-bien-EvbLbwrPVnk)
- **General-purpose API collection**: [GitHub](https://github.com/public-apis/public-apis)
- **Message queue benchmark**: [Kafka vs RabbitMQ vs Redis Streams](https://devops.vn/posts/bai-test-benchmark-giua-cac-message-queue-kafka-vs-rabbitmq-vs-redis-streams-ket-qua-khien-toi-phai-bat-ngo)

## Wilson Confidence Interval

- A statistical confidence interval for estimating a success rate
- Computes the lower bound of the success rate
- Works well with small samples and is not distorted by sample size
- Used in ranking, product ratings, and A/B testing

## Throughput

- **Latency**: the time it takes to process one request
- **Throughput**: the number of requests processed in a given period
- **Formula**: Throughput = IO Average size × IOPS
- **Example**: 1M requests/s at an average of 1kB/request → Throughput = 1GB/s
- Use a roofline chart to identify bottlenecks

## Web Server

- **Spin**: WASM web server for serverless applications - [GitHub](https://github.com/spinframework/spin)
- **Nginx**: [Quick introduction to nginx](https://viblo.asia/p/tim-hieu-nhanh-ve-nginx-phan-1-oK9VyKPxJQR)

## Libraries / Frameworks

- **AsyncAPI**: Swagger alternative - [GitHub](https://github.com/asyncapi/spec)
- **Atlas**: Migration tool for MongoDB - [Website](https://atlasgo.io)
- **TypeORM**: ORM for JavaScript/TypeScript - [Website](https://typeorm.io)
- **LMAX Disruptor**: High-performance, lock-free message processing
  - [GitHub](https://github.com/LMAX-Exchange/disruptor)
  - [Golang version](https://pkg.go.dev/github.com/smartystreets/go-disruptor)
- **Hotwire**: Build the front end from the back end - [Website](https://hotwired.dev)
- **i18n**: [GitHub](https://github.com/i18next/i18next)
- **Encore**: Open-source framework for building backend applications quickly and efficiently. Provides tools to build, deploy, and manage backend services, reducing development complexity with built-in support for cloud services and continuous deployment - [GitHub](https://github.com/encoredev/encore) #backend #framework
- **Hypervel**: Laravel-style PHP framework with native coroutine support, delivering very high performance for I/O-intensive applications - [GitHub](https://github.com/hypervel/hypervel) #php #framework #coroutine
- **Motia**: Multi-language backend framework that unifies APIs, background jobs, queues, workflows, streams, and AI agents in a single core, with built-in observability and state management - [GitHub](https://github.com/motiadev/motia) #backend #framework #multi-language
- **PocketBase**: Open-source backend written in Go, shipped as a single file. Includes an embedded database (SQLite) with realtime subscriptions, built-in file and user management, an admin dashboard UI, and a REST-ish API. Can be used as a standalone app or as a Go framework/toolkit - [GitHub](https://github.com/pocketbase/pocketbase) #backend #database #go #realtime

## Caching

See details: [Caching](/Technology/Backend And Database/Concepts/Caching)

## Common Bugs

### Data Race and Race Condition

- **Data race**: Two or more threads access the same variable and at least one of them writes
- **Race condition**: The result depends on the order in which operations execute
- **Solutions**: Locking, synchronization, atomic operations

### Deadlock

- Two or more processes wait on each other for resources
- **Solutions**: Timeouts or priority-based resolution

## Authorization

- **ACL**: Access Control List - a list of permissions per user/group
- **RBAC**: Role-Based Access Control - permissions based on roles
- **ABAC**: Attribute-Based Access Control - permissions based on attributes

## IDs

- **ULID**: Unix time + random string, sortable by time - [GitHub](https://github.com/ulid/spec)
- **Hashids**: Fake IDs for clients, resistant to brute force - [GitHub](https://github.com/vinkla/hashids)
- **NanoID**: Faster UUID-style ID generation - [GitHub](https://github.com/hidehalo/nanoid-php)
- **Snowflake**: Twitter's ID scheme, suited to replicated services

## Authentication

- [Understanding the OAuth 2.0 flow through animated GIFs](https://viblo.asia/p/hieu-ro-luong-oauth-20-qua-cac-hinh-anh-dong-gifs-GyZJZdxEVjm)

## Searching

- [Vector Search and RAG Tutorial](https://www.freecodecamp.org/news/vector-search-and-rag-tutorial-using-llms-with-your-data)
- [Search Engine and Vector Database](https://viblo.asia/s/search-engine-va-vector-database-GyZJZwllLjm)
- **Typesense**: Fast, easy-to-use open-source search engine, an alternative to Algolia and ElasticSearch. Supports typo tolerance, faceting, filtering, and sorting - [GitHub](https://github.com/typesense/typesense) #search-engine #open-source

## API

### Searching APIs

- [exa.ai](https://exa.ai/)
- [brightdata.com](https://brightdata.com/)
- [serper.dev](https://serper.dev/)

## Payment Processing

- **Hyperswitch**: Open-source payment solution that integrates multiple payment gateways through a single API - [GitHub](https://github.com/juspay/hyperswitch) #payment #gateway

## No-code Platforms

- **NocoBase**: Open-source platform for building data management applications without writing code, supporting CRUD generation and data relationship management - [GitHub](https://github.com/nocobase/nocobase) #nocode #platform

## API Gateway

- **KGateway**: Cloud-native API Gateway and AI Gateway that provides effective API management and routing - [GitHub](https://github.com/kgateway-dev/kgateway) #api-gateway #ai-gateway #cloud

> **See also:** [Caching](/Technology/Backend And Database/Concepts/Caching) · [Database Tools](/Technology/Backend And Database/Tools/Utilities/Database Tools) · [Redis](/Technology/Backend And Database/Tools/Redis)
