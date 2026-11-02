---
area: technology
domain: postgres
type: tool
title: PostgreSQL
description: Guide to PostgreSQL, the extensible open-source RDBMS, covering data types, JSON/JSONB, arrays, full-text search, index types, window functions, CTEs, and best practices.
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - postgres
  - sql
  - database
resource: https://www.postgresql.org/docs/
---

# PostgreSQL

PostgreSQL is an open-source relational database built for extensibility and SQL compliance. This note gathers the parts that matter when you pick it for a project or work in it daily. It opens with the feature list and the use cases that fit, from financial systems and GIS to data warehousing and scientific computing. The data type section runs from basic integers and timestamps to JSON, arrays, UUIDs, and network addresses. Short SQL examples cover JSONB queries, arrays, and full-text search. Indexing explains when B-tree, Hash, GiST, GIN, and BRIN pay off. Window functions, CTEs, and stored procedures follow. It ends with operating habits such as connection pooling, vacuuming, backups, and pg_stat_statements monitoring.

## Overview

PostgreSQL is an open-source relational database management system (RDBMS) with an emphasis on extensibility and SQL compliance.

## Features

- **ACID compliant**: Guarantees data integrity
- **Extensible**: Custom data types, operators, and functions
- **Advanced indexing**: B-tree, Hash, GiST, SP-GiST, GIN, BRIN
- **Full-text search**: Built-in text search capabilities
- **JSON support**: JSON and JSONB data types
- **Concurrency**: MVCC (Multi-Version Concurrency Control)
- **Replication**: Streaming replication, logical replication
- **Partitioning**: Table partitioning for large datasets

## Use Cases

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

- **B-tree**: Default, good for equality and range queries
- **Hash**: Equality comparisons only
- **GiST**: Generalized Search Tree (geospatial, full-text)
- **GIN**: Generalized Inverted Index (arrays, JSONB, full-text)
- **BRIN**: Block Range Indexes (large, naturally ordered tables)

Each index type answers a different query shape. B-tree is the default and handles equality and range lookups, so it covers most columns. Hash serves equality comparisons only. GiST fits geospatial and full-text data. GIN suits arrays, JSONB, and full-text search. BRIN targets large tables that are naturally ordered, and partitioning, listed among the features, is the other lever for datasets that grow. The features list names SP-GiST too, but the indexing section explains only the five types here. Pick the type from the filter the query actually runs, then keep VACUUM and ANALYZE regular as the best practices section asks.

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

## Best Practices

- Use connection pooling (PgBouncer)
- Proper indexing strategy
- Regular VACUUM and ANALYZE
- Back up with pg_dump or continuous archiving
- Monitor with pg_stat_statements
- Security: SSL, row-level security

## Resources

- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [PostgreSQL Tutorial](https://www.postgresqltutorial.com/)
- [PG Exercises](https://pgexercises.com/)

> **See also:** [MySQL](/Technology/Backend And Database/Tools/MySQL) · [SQL Databases](/Technology/Backend And Database/Concepts/Database Types/SQL Databases) · [SQL Optimization](/Technology/Backend And Database/Concepts/Core Concepts/SQL Optimization)
