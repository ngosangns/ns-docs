---
relates:
  - "[[Backend - Back-end]]"
  - "[[Kho chung IT]]"
tags:
  - node-js
  - frameworks
  - orms
  - libraries
  - runtime
---

# 1. Node.js Overview

Node.js is a powerful JavaScript runtime built on Chrome's V8 JavaScript engine. It is widely used for building scalable network applications due to its event-driven, non-blocking I/O model.

## 1.1. Frameworks

Node.js supports a variety of frameworks that simplify the development of web applications. Here are some popular ones:

- **Express**: A minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.
- **Koa**: Developed by the team behind Express, Koa aims to be a smaller, more expressive, and more robust foundation for web applications and APIs.
- **Meteor**: An open-source platform for web, mobile, and desktop used to build top-quality web apps in a fraction of the time.
- **Fastify**: A web framework highly focused on providing the best developer experience with the least overhead and a powerful plugin architecture.
- **Socket.io**: Enables real-time, bidirectional, and event-based communication between the browser and the server.
- **AdonisJS**: A fully-featured web framework inspired by Laravel, providing a rich set of tools and libraries.
- **FeathersJS**: A framework for real-time applications and REST APIs with a flexible plugin architecture.
- **Hapi.js**: A rich framework for building applications and services in Node.js.

[honojs/hono: Web framework built on Web Standards](https://github.com/honojs/hono)

## 1.2. ORMs (OBJECT RELATIONAL MAPPER)

- Provides a way to work interact with data from within your code without writing raw SQL queries
- Simplifies database interaction, increases productivity and readability
- Allows the application to be independent of the database

| **PRISMA**     | \* Type-safe database client                 |
| -------------- | -------------------------------------------- |
|                | \* Supports many databases                   |
|                | \* Easy relation API                         |
| **MONGOOSE**   | \* ORM/ODM for MongoDB & Node.js             |
|                | \* Create models & schemas                   |
|                | \* Middleware support                        |
| **SEQUELIZE**  | \* ORM for Node.js & MySQL                   |
|                | \* Supports all SQL-based databases          |
|                | \* Migrations, model associations, hooks     |
| **SQLAlchemy** | \* ORM for Python                            |
|                | \* Supports MySQL, Postgres, SQLite & Oracle |
|                | \* Rich API for complex queries              |

### 1.2.1. Additional Frameworks

- **Intent**: A Laravel-like framework for Node.js, designed to provide a similar development experience: [Intent GitHub](https://github.com/intentjs/intent)

## 1.3. Libraries

- **Redis Client**: A high-performance Redis client for Node.js: [ioredis GitHub](https://github.com/redis/ioredis)
- **Environment Variables**: Manage environment variables with ease: [dotenvx GitHub](https://github.com/dotenvx/dotenvx)
- **Telegraf**: A powerful library for building Telegram bots: [Telegraf GitHub](https://github.com/telegraf/telegraf)

### 1.3.1. Validators

- https://github.com/colinhacks/zod
- https://github.com/hapijs/joi
- https://github.com/fabian-hiller/valibot
- https://github.com/samchon/typia
- https://github.com/validatorjs/validator.js

### 1.3.2. Database and ORM

- **Knex**: A SQL query builder for Node.js, designed to be flexible and portable: [Knex GitHub](https://github.com/knex/knex)
- **Prisma**: A next-generation ORM that makes working with databases easy: [Prisma GitHub](https://github.com/prisma/prisma)

## 1.4. Runtime

Node.js can be extended with different runtimes to optimize performance for specific use cases:

- **LLRT (Low Latency Runtime)**: An experimental, lightweight JavaScript runtime designed to address the growing demand for fast and efficient serverless applications: [LLRT GitHub](https://github.com/awslabs/llrt)

## 1.5. Tools

- **Request Body Validator**: A tool for validating request bodies in Node.js applications: [Vine GitHub](https://github.com/vinejs/vine)
