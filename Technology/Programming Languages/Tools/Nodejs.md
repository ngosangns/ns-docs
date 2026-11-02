---
area: technology
domain: nodejs
type: resource
title: Nodejs
description: Curated list of Node.js web frameworks, ORMs, libraries, an experimental low-latency runtime, and a request validator.
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - nodejs
  - javascript
  - backend
resource: https://github.com/intentjs/intent
---

# Nodejs

Node.js backends usually begin with a framework choice, and the list below compares the common options. The framework entries run from minimal routers to full-featured ones inspired by Laravel. A section on ORMs explains what a mapper adds and names the popular choices for SQL databases and MongoDB. Helper libraries, an experimental low latency runtime and a request body validator fill out the rest. Express is the minimal, flexible baseline. Koa is smaller and more expressive, and it comes from the Express team. Fastify trades weight for performance, low overhead and a plugin architecture. AdonisJS and Intent sit at the other end, both inspired by Laravel. Socket.io and FeathersJS cover real time work, and Hapi.js adds a richer structure for applications and services.

> **Note**: This file covers Node.js frameworks and is not directly related to databases.

## Frameworks

- **Express**: Minimal, flexible web framework
- **Koa**: Smaller, more expressive, robust foundation (by Express team)
- **Meteor**: Open-source platform for web/mobile/desktop
- **Fastify**: High performance, low overhead, powerful plugin architecture
- **Socket.io**: Real-time, bidirectional, event-based communication
- **AdonisJS**: Full-featured framework inspired by Laravel
- **FeathersJS**: Framework for real-time apps and REST APIs
- **Hapi.js**: Rich framework for building applications and services
- **Intent**: Laravel-like framework for Node.js - [GitHub](https://github.com/intentjs/intent)

## ORMs (Object Relational Mapper)

- Provides database interaction without raw SQL
- Simplifies database operations, increases productivity
- Makes application database-independent

### Popular ORMs

- **Prisma**: Type-safe database client, supports many databases, easy relation API
- **Mongoose**: ORM/ODM for MongoDB & Node.js, create models & schemas, middleware support
- **Sequelize**: ORM for Node.js & MySQL, supports all SQL-based databases, migrations, associations, hooks
- **SQLAlchemy**: ORM for Python, supports MySQL/Postgres/SQLite/Oracle, rich API

## Libraries

- **ioredis**: High-performance Redis client - [GitHub](https://github.com/redis/ioredis)
- **dotenvx**: Manage environment variables - [GitHub](https://github.com/dotenvx/dotenvx)
- **Telegraf**: Powerful Telegram bot library - [GitHub](https://github.com/telegraf/telegraf)
- **Knex**: SQL query builder, flexible and portable - [GitHub](https://github.com/knex/knex)
- **Prisma**: Next-generation ORM - [GitHub](https://github.com/prisma/prisma)
- **jsdom**: A JavaScript implementation of various web standards, for use with Node.js. Implements WHATWG DOM and HTML standards - [GitHub](https://github.com/jsdom/jsdom)

Three of the named ORMs are Prisma, Mongoose, and Sequelize. Prisma is a type-safe client with a relation API. Mongoose targets MongoDB with models, schemas, and middleware. Sequelize targets SQL, with migrations, associations, and hooks. Beside those, the library list adds ioredis, Knex, dotenvx, Telegraf, and jsdom.

## Runtime

- **LLRT (Low Latency Runtime)**: Experimental, lightweight JavaScript runtime for fast serverless applications - [GitHub](https://github.com/awslabs/llrt)

## Tools

- **Vine**: Request body validator - [GitHub](https://github.com/vinejs/vine)

> **See also:** [JavaScript TypeScript](/Technology/Programming Languages/Tools/JavaScript TypeScript) · [Defer Async Inline](/Technology/Programming Languages/Concepts/Defer Async Inline)
