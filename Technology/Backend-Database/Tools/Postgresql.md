---
area: technology
domain: backend-database
topic: postgresql
type: resource
title: Postgresql
description: PostgreSQL
timestamp: '2026-06-19T13:43:26.148Z'
tags:
  - technology
  - backend-database
  - postgresql
resource: https://www.postgresql.org/docs/
---
# PostgreSQL

## Tổng quan

PostgreSQL là một open-source relational database management system (RDBMS) với sự nhấn mạnh vào extensibility và SQL compliance.

## Đặc điểm

- **ACID compliant**: Đảm bảo data integrity
- **Extensible**: Custom data types, operators, functions
- **Advanced indexing**: B-tree, Hash, GiST, SP-GiST, GIN, BRIN
- **Full-text search**: Built-in text search capabilities
- **JSON support**: JSON và JSONB data types
- **Concurrency**: MVCC (Multi-Version Concurrency Control)
- **Replication**: Streaming replication, logical replication
- **Partitioning**: Table partitioning cho large datasets

## Use cases

- Enterprise applications
- Financial systems
- Geographic information systems (GIS)
- Data warehousing
- Web applications
- Scientific computing

## Data Types

### Basic Types

- INTEGER, BIGINT, SMALLINT
- NUMERIC, REAL, DOUBLE PRECISION
- VARCHAR, CHAR, TEXT
- BOOLEAN
- DATE, TIME, TIMESTAMP, INTERVAL

### Advanced Types

- JSON, JSONB
- ARRAY
- UUID
- INET, CIDR (network addresses)
- GEOMETRY (PostGIS extension)

## Key Features

### JSON/JSONB

```sql
-- Store JSON
INSERT INTO events (data) VALUES ('{"user": "john", "action": "login"}');

-- Query JSON
SELECT * FROM events WHERE data->>'user' = 'john';
```

### Arrays

```sql
CREATE TABLE users (
  name TEXT,
  tags TEXT[]
);

INSERT INTO users VALUES ('John', ARRAY['admin', 'developer']);
```

### Full-text Search

```sql
SELECT * FROM articles
WHERE to_tsvector('english', content) @@ to_tsquery('english', 'postgresql');
```

## Indexing

- **B-tree**: Default, good for equality và range queries
- **Hash**: Equality comparisons only
- **GiST**: Generalized Search Tree (geospatial, full-text)
- **GIN**: Generalized Inverted Index (arrays, JSONB, full-text)
- **BRIN**: Block Range Indexes (large, naturally ordered tables)

## Advanced Features

### Window Functions

```sql
SELECT
  name,
  salary,
  AVG(salary) OVER (PARTITION BY department) as dept_avg
FROM employees;
```

### Common Table Expressions (CTE)

```sql
WITH recent_orders AS (
  SELECT * FROM orders WHERE order_date > CURRENT_DATE - INTERVAL '30 days'
)
SELECT * FROM recent_orders WHERE total > 1000;
```

### Stored Procedures

```sql
CREATE OR REPLACE FUNCTION get_user_count()
RETURNS INTEGER AS $$
BEGIN
  RETURN (SELECT COUNT(*) FROM users);
END;
$$ LANGUAGE plpgsql;
```

## Best practices

- Sử dụng connection pooling (PgBouncer)
- Proper indexing strategy
- Regular VACUUM và ANALYZE
- Backup với pg_dump hoặc continuous archiving
- Monitoring với pg_stat_statements
- Security: SSL, row-level security

## Resources

- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [PostgreSQL Tutorial](https://www.postgresqltutorial.com/)
- [PG Exercises](https://pgexercises.com/)
