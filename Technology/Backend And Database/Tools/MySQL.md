---
area: technology
domain: mysql
type: tool
title: MySQL
description: Guide to MySQL, the popular open-source RDBMS, covering storage engines, data types, CRUD, indexing, views, procedures, triggers, replication, and best practices.
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - mysql
  - sql
  - database
resource: https://dev.mysql.com/doc/
---

# MySQL

## Overview

MySQL is the world's most popular open-source relational database management system (RDBMS), widely used in web applications.

## Features

- **Open-source**: GPL license
- **High performance**: Optimized for read-heavy workloads
- **Scalable**: Supports large databases
- **Reliable**: ACID compliance with the InnoDB storage engine
- **Easy to use**: Simple installation and administration
- **Wide adoption**: LAMP stack, WordPress, Drupal, etc.

## Use Cases

- Web applications (LAMP/LEMP stack)
- Content management systems
- E-commerce platforms
- Logging applications
- Data warehousing (with proper tuning)

## Storage Engines

### InnoDB (Default)

- ACID compliance
- Row-level locking
- Foreign key support
- Transaction support
- Crash recovery

### MyISAM (Legacy)

- Table-level locking
- Full-text indexing
- No transaction support
- Faster for read-heavy workloads

### Others

- **MEMORY**: In-memory tables
- **CSV**: CSV format files
- **ARCHIVE**: Compressed storage
- **NDB**: MySQL Cluster

## Data Types

### Numeric

- INT, TINYINT, SMALLINT, MEDIUMINT, BIGINT
- FLOAT, DOUBLE, DECIMAL

### String

- CHAR, VARCHAR
- TEXT, TINYTEXT, MEDIUMTEXT, LONGTEXT
- BLOB types
- ENUM, SET

### Date/Time

- DATE, TIME, DATETIME, TIMESTAMP
- YEAR

### JSON (MySQL 5.7+)

```sql
CREATE TABLE users (
  id INT PRIMARY KEY,
  profile JSON
);

INSERT INTO users VALUES (1, '{"name": "John", "age": 30}');

SELECT * FROM users WHERE JSON_EXTRACT(profile, '$.age') > 25;
```

## CRUD Operations

```sql
-- Create
INSERT INTO users (name, email) VALUES ('John', 'john@example.com');

-- Read
SELECT * FROM users WHERE age > 18;
SELECT name, email FROM users ORDER BY name LIMIT 10;

-- Update
UPDATE users SET age = 31 WHERE name = 'John';

-- Delete
DELETE FROM users WHERE id = 1;
```

## Indexing

### Types

- **PRIMARY KEY**: Unique identifier
- **UNIQUE**: Unique values
- **INDEX**: Regular index
- **FULLTEXT**: Text search (MyISAM and InnoDB 5.6+)
- **SPATIAL**: Geospatial data

### Best Practices

- Index columns in the WHERE clause
- Index columns in JOIN conditions
- Avoid over-indexing
- Consider composite indexes

## Advanced Features

### Views

```sql
CREATE VIEW active_users AS
SELECT * FROM users WHERE status = 'active';
```

### Stored Procedures

```sql
DELIMITER //
CREATE PROCEDURE GetUserCount()
BEGIN
  SELECT COUNT(*) FROM users;
END //
DELIMITER ;
```

### Triggers

```sql
CREATE TRIGGER before_user_update
BEFORE UPDATE ON users
FOR EACH ROW
BEGIN
  SET NEW.updated_at = NOW();
END;
```

## Replication

### Master-Slave Replication

- Master: Handles writes
- Slaves: Handle reads and replicate from the master
- Asynchronous replication

### Group Replication

- Multi-master replication
- Automatic failover
- Transactional consistency

## Best Practices

- Use InnoDB in production
- Proper indexing
- Connection pooling
- Regular backups (mysqldump, xtrabackup)
- Query optimization with EXPLAIN
- Security: SSL, principle of least privilege

## Resources

- [MySQL Documentation](https://dev.mysql.com/doc/)
- [MySQL Tutorial](https://www.mysqltutorial.org/)
- [MySQL Performance Blog](https://www.percona.com/blog/)

> **See also:** [Storage Engines](/Technology/Backend And Database/Concepts/Core Concepts/Storage Engines) · [SQL Optimization](/Technology/Backend And Database/Concepts/Core Concepts/SQL Optimization) · [PostgreSQL](/Technology/Backend And Database/Tools/PostgreSQL)
