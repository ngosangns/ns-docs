---
area: technology
domain: design-patterns
type: guide
title: Materialized View Pattern
description: Explains generating prepopulated, read-only views over source data to speed up complex queries, with event-driven or scheduled refresh and eventual-consistency trade-offs.
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - design-patterns
  - azure
  - data
  - performance
resource: https://learn.microsoft.com/en-us/azure/architecture/patterns/materialized-view
---

# Materialized View Pattern

Generate precomputed or preformatted views of data from one or more data stores when the source data isn't in an ideal format for specific query operations. This pattern supports efficient querying, fast data extraction, and improved application performance.

## Summary

- **Problem:** Data stores (especially NoSQL) are usually optimized for writes rather than reads. When a complex query needs to combine data from several entities or compute aggregate values, performance suffers badly if raw data has to be processed every time.
- **Solution:** Create a "view" that holds the results of complex queries and store it physically (materialized). The view contains only the data required for a specific query or a set of related queries.
- **Characteristics of a materialized view:**
  - **Disposable:** The view can be deleted and completely rebuilt from the source data at any time.
  - **Read-only:** The application never updates the materialized view directly; it only reads from it.
  - **Precomputed:** It can include computed columns, transformation results, or the results of joins across multiple tables/partitions.
- **Refresh mechanisms:**
  - **Event-driven:** Update the view as soon as the source data changes (often combined with the CQRS or Event Sourcing patterns).
  - **Scheduled:** Update periodically (for example, hourly or daily) if the data doesn't need to be highly real time.
- **Benefits:**
  - Significantly improves query performance for complex reports or dashboards.
  - Reduces load on the primary data stores.
  - Simplifies application code because complex join/aggregation logic doesn't have to run on the client side.

## When to Use This Pattern

- When the source data is hard to query directly (unstructured, semi-structured, or distributed data).
- When you need temporary views to serve reports, the UI, or data extraction.
- When you need to support offline scenarios by caching the view data locally.
- When you need to grant access to subsets of data for security reasons (you don't want to expose all the source data).

## When Not to Use This Pattern

- The source data is simple and easy to query with good performance.
- The source data changes so quickly that the cost of updating the view exceeds the benefit.
- The system requires immediate (strong) consistency. Materialized views typically follow an **eventual consistency** model.

## Relationship with Other Patterns

- **CQRS:** Often used to separate the read side (using a materialized view) from the write side.
- **Event Sourcing:** A materialized view is the only practical way to get the current state of an entity from a sequence of events.

---

_Source: [Microsoft Learn - Materialized View Pattern](https://learn.microsoft.com/en-us/azure/architecture/patterns/materialized-view)_

> **See also:** [CQRS Pattern](/Technology/System Design/Practices/Azure Design Patterns/CQRS Pattern) · [Event Sourcing Pattern](/Technology/System Design/Practices/Azure Design Patterns/Event Sourcing Pattern) · [Index Table Pattern](/Technology/System Design/Practices/Azure Design Patterns/Index Table Pattern)
