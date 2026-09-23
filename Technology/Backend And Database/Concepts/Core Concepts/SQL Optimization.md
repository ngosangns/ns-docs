---
area: technology
domain: sql
type: guide
title: SQL Optimization
description: Practical SQL query tuning guide covering execution order, indexing, keyset pagination, prepared statements, CTEs, and a MariaDB slow-pagination case study.
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - sql
  - database
  - optimization
resource: https://viblo.asia/p/mit-dac-va-biet-tuot-noi-chuyen-ve-nhung-loi-don-trong-toi-uu-sql-zXRJ8rqOVGq
---

# SQL Optimization

## SELECT Execution Order

1. FROM and JOIN
2. WHERE
3. GROUP BY
4. HAVING
5. SELECT
6. DISTINCT
7. ORDER BY
8. LIMIT/OFFSET

## SQL Query Optimization

### Resources

- [Mít đặc và biết tuốt về tối ưu SQL](https://viblo.asia/p/mit-dac-va-biet-tuot-noi-chuyen-ve-nhung-loi-don-trong-toi-uu-sql-zXRJ8rqOVGq) (Everything about SQL optimization)
- [12 lý do khiến MySQL truy vấn chậm](https://viblo.asia/p/12-ly-do-khien-mysql-truy-van-cham-part-2-EvbLbxXv4nk) (12 reasons MySQL queries are slow)
- [Performance Tuning SQL](https://viblo.asia/p/performance-tuning-sql-tai-sao-code-sql-cua-ong-ben-canh-lai-chay-nhanh-hon-minh-nhi-5pPLkxnyVRZ) (Why your neighbor's SQL runs faster than yours)

## Optimization Techniques

- Use explicit column names instead of SELECT \*
- Consider removing DISTINCT when it is not needed
- Convert sub-queries into JOINs when possible
- Use UNION ALL instead of UNION
- Avoid OR across conditions on different columns
- Paging: use LIMIT/OFFSET or cursor-based pagination
- Put results in a cache
- Add indexes for WHERE/JOIN/ORDER BY
- Use full-text search for text search
- Deferred Join: JOIN against a subset that has already been filtered and limited

## Keyset Pagination (Query by Last ID)

- **Overview**: Keyset pagination is an efficient pagination method for large datasets. It uses a unique key to locate where the next page starts
- **Comparison with offset pagination**:
  - Offset pagination uses OFFSET and LIMIT, but becomes inefficient on large datasets because the database must scan past many records
  - Keyset pagination uses the value of a key column (usually the ID) to determine the start of the next page, which makes queries faster and more stable
- **How it works**: A WHERE condition on the key column value marks where the next page starts, combined with LIMIT to cap the number of returned results
- **Advantages**:
  - Better query performance on large datasets
  - Shorter response times
  - Avoids duplicated or missing rows when data changes during pagination
- **Disadvantages**:
  - Cannot jump to an arbitrary page
  - Requires a key column with a clear ordering and unique values
- **Applications**: Suited to systems with large data volumes that need efficient pagination, such as social networks, e-commerce sites, and APIs that list products, posts, or users

## Prepared Statements

- Use bind variables instead of string concatenation
- **Benefits**: Better performance (the execution plan is reused) and security (protection against SQL injection)
- [Reference](https://viblo.asia/p/bi-mat-lon-nhat-ve-tang-toc-do-cau-lenh-sql-ve-muc-mili-giay-cuc-hieu-qua-result-cache-WR5JRvMQJGv)

## Avoid SELECT \*

- Increases network traffic, CPU usage, and memory usage
- Hinders optimization; covering indexes cannot be used effectively

## Obfuscated Conditions

- Comparing a numeric column with a numeric string
- Applying a function to an indexed column in WHERE
- Combining columns that have no suitable index

## Common Table Expressions (CTE)

- Define a named, temporary result set
- **Recursive CTE**: For hierarchical and tree data
  - Anchor member: initialization
  - Recursive member: expansion
  - [Reference](https://data-fun.com/mysql-common-table-expression-with)
  - [Recursive CTE](https://kysuit.net/mysql/a-definitive-guide-to-mysql-recursive-cte)

## Case Study: MariaDB Performance Issue with Large Data Types

- **Problem**: A query took 50 seconds when paginating with a large OFFSET on a table with 500K+ records
- **Problem query**: `SELECT * FROM posts WHERE deleted_at IS NULL ORDER BY group_id DESC, post_number DESC LIMIT 15 OFFSET 418000`
- **Root causes**:
  - The `content` field (LONGTEXT) was loaded into memory during ORDER BY, consuming RAM and CPU
  - The large OFFSET forced the database to scan through 80% of the index rows
  - SELECT \* loaded every column even when not needed
- **Solution**:
  - Split the table: a metadata table (id, group_id, post_number) and a separate content table
  - SELECT only the necessary fields instead of SELECT \*
  - Improved from 50 seconds to 1.5 seconds
- **Lessons**:
  - Design the schema carefully: analyze query flows and data volume before building
  - Normalization: move large fields (LONGTEXT, BLOB) into separate tables to avoid unnecessary loading
  - Understand data types: TEXT/BLOB are heavier than VARCHAR/INT, especially when sorting or searching
  - Indexes are not a silver bullet: understand how the database engine works, since an index can slow down INSERT/UPDATE
  - Pagination with a large OFFSET is very bad: prefer keyset/cursor-based pagination
  - Database partitioning: can improve performance on large data
  - Monitoring: use Prometheus and Grafana to watch the system from the start
  - Caching: use Redis for static or rarely changing data
  - Consider storing text in files instead of the database for some use cases

> **See also:** [Storage Engines](/Technology/Backend And Database/Concepts/Core Concepts/Storage Engines) · [Sharding Partitioning](/Technology/Backend And Database/Concepts/Techniques And Architecture/Sharding Partitioning) · [MySQL](/Technology/Backend And Database/Tools/MySQL)
