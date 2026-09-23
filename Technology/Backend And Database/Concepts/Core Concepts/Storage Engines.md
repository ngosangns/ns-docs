---
area: technology
domain: mysql
type: guide
title: Storage Engines
description: Comparison of MySQL storage engines (MyISAM, InnoDB, MEMORY) and a deep dive into InnoDB pages, rows, row-size limits, and off-page storage formats.
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - mysql
  - database
  - storage-engine
resource: https://viblo.asia/p/su-khac-nhau-giua-2-storage-engine-myisam-va-innodb-bJzKmgVPl9N
---

# Storage Engines

## Storage Engines

### MyISAM

- Table-level locking, not ACID, no foreign keys, good full-text search, read-intensive
- [Reference](https://viblo.asia/p/su-khac-nhau-giua-2-storage-engine-myisam-va-innodb-bJzKmgVPl9N)

### InnoDB

- Row-level locking, full ACID, foreign keys, full-text search since 5.6, default since 5.5, write-intensive
- [Reference](https://viblo.asia/p/su-khac-nhau-giua-2-storage-engine-myisam-va-innodb-bJzKmgVPl9N)

### MEMORY

- Table-level locking, stored in RAM, hash index by default, for temporary data

## Pages and Rows in InnoDB

### Page

- The basic storage unit in InnoDB
- The default size is 16KB, and it can be changed to 4KB, 8KB, 32KB, or 64KB
- All table data is stored in pages

### Row

- Each table consists of many rows, and each row is stored in a page
- A page can hold many rows
- MySQL works with pages rather than directly with rows; when querying data, MySQL fetches the pages that contain the required rows for processing

### Row Length Limit

- The maximum length of a row cannot exceed half of a page
- With the default 16KB page, the longest row is about 8KB
- With a 64KB page, the longest row is just under 32KB
- This limit avoids wasted space and improves data access efficiency

### Off-page Storage (When a Row Exceeds the Maximum Size)

- When a row exceeds the allowed size, variable-length columns (VARCHAR, VARBINARY, BLOB, or TEXT) are stored outside the main page
- There are two off-page storage formats:

#### COMPACT/REDUNDANT

- The first 768 bytes of the column are stored in the main page (the page holding the original row)
- The remainder beyond 768 bytes is stored in overflow pages
- A 20-byte pointer is added to record the actual column length and point to the list of overflow pages
- Advantage: fast access for small data (under 768 bytes)
- Disadvantage: uses a lot of space on the main page

#### DYNAMIC/COMPRESSED

- The entire column data is moved to overflow pages from the start
- The main page stores only a 20-byte pointer to the overflow pages
- Advantages: saves space on the main page, lets a page hold more rows, and is efficient for large columns
- Disadvantage: access can be slower because overflow pages must be read

- [Reference](https://viblo.asia/p/mysql-page-va-row-trong-innodb-EoW4oaw7Lml)

> **See also:** [MySQL](/Technology/Backend And Database/Tools/MySQL) · [SQL Optimization](/Technology/Backend And Database/Concepts/Core Concepts/SQL Optimization) · [Full Text Search](/Technology/Backend And Database/Concepts/Techniques And Architecture/Full Text Search)
