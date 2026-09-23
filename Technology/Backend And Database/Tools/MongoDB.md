---
area: technology
domain: mongodb
type: tool
title: MongoDB
description: Guide to MongoDB, the document-oriented NoSQL database, covering its data model, CRUD operations, indexing, aggregation, replication, sharding, and best practices.
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - mongodb
  - nosql
  - database
resource: https://docs.mongodb.com/
---

# MongoDB

## Overview

MongoDB is a document-oriented NoSQL database that stores data as JSON-like documents instead of tables and rows.

## Features

- **Document-oriented**: Data is stored as BSON (Binary JSON)
- **Schema-less**: Flexible schema design
- **Scalable**: Horizontal scaling with sharding
- **High availability**: Replica sets provide automatic failover
- **Rich query language**: Supports aggregation, text search, and geospatial queries
- **Multi-document ACID transactions**: Since version 4.0+

## Use Cases

- Content management systems
- Real-time analytics
- Mobile applications
- IoT applications
- Catalogs and inventories
- Personalization engines

## Data Model

### Documents

```javascript
{
  _id: ObjectId("..."),
  name: "John Doe",
  email: "john@example.com",
  address: {
    street: "123 Main St",
    city: "New York"
  },
  tags: ["customer", "premium"]
}
```

### Collections

- Equivalent to tables in SQL
- Do not enforce a schema
- Each document can have a different structure

## CRUD Operations

### Create

```javascript
db.users.insertOne({ name: "John", age: 30 })
db.users.insertMany([{ name: "Jane" }, { name: "Bob" }])
```

### Read

```javascript
db.users.find({ age: { $gte: 18 } })
db.users.findOne({ email: "john@example.com" })
```

### Update

```javascript
db.users.updateOne({ name: "John" }, { $set: { age: 31 } })
```

### Delete

```javascript
db.users.deleteOne({ name: "John" })
db.users.deleteMany({ status: "inactive" })
```

## Indexing

- Single field indexes
- Compound indexes
- Multikey indexes (for arrays)
- Text indexes
- Geospatial indexes
- TTL indexes

## Aggregation Framework

```javascript
db.orders.aggregate([{ $match: { status: "completed" } }, { $group: { _id: "$customerId", total: { $sum: "$amount" } } }, { $sort: { total: -1 } }])
```

## Replication

### Replica Set

- Primary node: Handles all write operations
- Secondary nodes: Replicate data from the primary and handle reads
- Automatic failover when the primary fails

## Sharding

- Horizontal scaling
- The shard key determines data distribution
- The balancer automatically redistributes data

## Best Practices

- Design the schema around query patterns
- Use indexes for frequently queried fields
- Use replica sets in production
- Monitor with MongoDB Compass or Atlas
- Take regular backups

## Resources

- [MongoDB Documentation](https://docs.mongodb.com/)
- [MongoDB University](https://university.mongodb.com/)
- [MongoDB Best Practices](https://docs.mongodb.com/manual/administration/production-notes/)

> **See also:** [NoSQL Databases](/Technology/Backend And Database/Concepts/Database Types/NoSQL Databases) · [Sharding Partitioning](/Technology/Backend And Database/Concepts/Techniques And Architecture/Sharding Partitioning) · [Redis](/Technology/Backend And Database/Tools/Redis)
