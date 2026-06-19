---
area: technology
domain: backend-database
topic: mysql
type: resource
title: Mysql
description: MySQL
timestamp: '2026-06-19T13:43:26.148Z'
tags:
  - technology
  - backend-database
  - mysql
resource: https://dev.mysql.com/doc/
---
# MySQL

## Tổng quan

MySQL là một open-source relational database management system (RDBMS) phổ biến nhất thế giới, được sử dụng rộng rãi trong web applications.

## Đặc điểm

- **Open-source**: GPL license
- **High performance**: Optimized for read-heavy workloads
- **Scalable**: Support cho large databases
- **Reliable**: ACID compliance với InnoDB storage engine
- **Easy to use**: Simple installation và administration
- **Wide adoption**: LAMP stack, WordPress, Drupal, etc.

## Use cases

- Web applications (LAMP/LEMP stack)
- Content management systems
- E-commerce platforms
- Logging applications
- Data warehousing (với proper tuning)

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
- Không hỗ trợ transactions
- Nhanh hơn cho read-heavy workloads

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
- **FULLTEXT**: Text search (MyISAM và InnoDB 5.6+)
- **SPATIAL**: Geospatial data

### Best practices

- Index columns trong WHERE clause
- Index columns trong JOIN conditions
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

- Master: Handle writes
- Slaves: Handle reads, replicate from master
- Asynchronous replication

### Group Replication

- Multi-master replication
- Automatic failover
- Transactional consistency

## Best practices

- Use InnoDB cho production
- Proper indexing
- Connection pooling
- Regular backups (mysqldump, xtrabackup)
- Query optimization với EXPLAIN
- Security: SSL, least privilege principle

## Resources

- [MySQL Documentation](https://dev.mysql.com/doc/)
- [MySQL Tutorial](https://www.mysqltutorial.org/)
- [MySQL Performance Blog](https://www.percona.com/blog/)
