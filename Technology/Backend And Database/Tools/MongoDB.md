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

MongoDB stores records as BSON documents, so a collection can hold entries with different shapes. This note starts from that data model, then moves through create, read, update, and delete calls with short shell examples. Index types come next, including compound, multikey, text, geospatial, and TTL. A single aggregation example groups completed orders by customer and sorts by total. Replication and sharding are explained through replica sets, automatic failover, and shard keys, and multi-document transactions arrive from version 4.0. The note ends with production advice and links to the official docs, MongoDB University, and production notes.

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

Replication and sharding answer different problems, and the note treats them in separate sections for that reason. A replica set answers availability. The primary handles all write operations, the secondaries replicate its data and handle reads, and automatic failover takes over when the primary fails. Sharding answers size. It scales horizontally, the shard key determines data distribution, and the balancer redistributes data on its own. The shard key is the decision that matters most, because it decides where each document lands. The best practices list carries both concerns. Design the schema around query patterns first, then use indexes for fields that queries hit often. Run replica sets in production, monitor with MongoDB Compass or Atlas, and take regular backups.

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
