---
area: technology
domain: backend-database
topic: mongodb
type: resource
title: Mongodb
description: MongoDB
timestamp: "2026-06-19T13:43:26.148Z"
tags:
  - technology
  - backend-database
  - mongodb
resource: https://docs.mongodb.com/
---

# MongoDB

## Tổng quan

MongoDB là một document-oriented NoSQL database, lưu trữ dữ liệu dạng JSON-like documents thay vì tables và rows.

## Đặc điểm

- **Document-oriented**: Dữ liệu lưu dạng BSON (Binary JSON)
- **Schema-less**: Flexible schema design
- **Scalable**: Horizontal scaling với sharding
- **High availability**: Replica sets cho automatic failover
- **Rich query language**: Hỗ trợ aggregation, text search, geospatial queries
- **Multi-document ACID transactions**: Từ version 4.0+

## Use cases

- Content management systems
- Real-time analytics
- Mobile applications
- IoT applications
- Catalogs và inventories
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

- Tương đương tables trong SQL
- Không enforce schema
- Mỗi document có thể có cấu trúc khác nhau

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

- Primary node: Handle all write operations
- Secondary nodes: Replicate data from primary, handle reads
- Automatic failover khi primary fails

## Sharding

- Horizontal scaling
- Shard key quyết định data distribution
- Balancer tự động redistribute data

## Best practices

- Thiết kế schema theo query patterns
- Sử dụng indexes cho frequently queried fields
- Replica sets cho production
- Monitoring với MongoDB Compass hoặc Atlas
- Regular backups

## Resources

- [MongoDB Documentation](https://docs.mongodb.com/)
- [MongoDB University](https://university.mongodb.com/)
- [MongoDB Best Practices](https://docs.mongodb.com/manual/administration/production-notes/)
