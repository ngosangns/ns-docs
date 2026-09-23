---
area: technology
domain: instagram
type: case-study
title: Instagram Like Photo System Design
description: A system design walkthrough of an Instagram-like photo-sharing service covering requirements, capacity estimates, database design, newsfeed generation with hybrid push/pull, caching, and key generation.
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - instagram
  - newsfeed
  - caching
resource: https://viblo.asia/p/thiet-ke-don-gian-mot-he-thong-anh-nhu-instagram-GAWVpZd5J05
---

# Instagram Like Photo System Design

> Summary of the article: https://viblo.asia/p/thiet-ke-don-gian-mot-he-thong-anh-nhu-instagram-GAWVpZd5J05

## Summary

### System Requirements

**Functional requirements:**

- Users can upload/download/view photos
- Search photos by title
- Users can follow other users
- The system generates a newsfeed of top photos from the people they follow

**Non-functional requirements:**

- High availability
- Acceptable latency: 200ms for News Feed Generation
- High reliability: a very low rate of lost photos/videos

### Capacity Estimation

- 500 million users, 1 million DAU
- 2 million new photos/day (~23 photos/second)
- Average photo size: ~200KB
- Storage needed: 400GB/day
- Total storage over 5 years: 730TB

### System Design

**Basic architecture:**

- Object storage (S3) for photos
- Database servers for photo metadata
- A read-heavy system (more reads than writes)

### Database Design

**Main tables:**

**Photo Table:**

- photo_id (PK)
- user_id
- photo_path
- photo_latitude, photo_longitude
- user_latitude, user_longitude
- created_at

**User Table:**

- user_id (PK)
- name, email, dob
- created_at, last_login

**UserFollow Table:**

- follower_id (PK)
- following_id (PK)

**Database choices:**

- An RDBMS (MySQL) can be used for relational queries
- A distributed NoSQL column store (Cassandra) is preferable for scaling
- Photo metadata is stored in a key-value store keyed by photo_id
- Cassandra supports replication and delayed deletion (keep data for a few days before permanently deleting it)

### Newsfeed Generation

**Process:**

1. Get the list of users being followed
2. Fetch the metadata of the 100 most recent photos from each
3. Send all the photos to the ranking algorithm
4. Return the top 100 photos for the newsfeed

**Pre-generating the newsfeed:**

- Use dedicated servers to generate the newsfeed ahead of time and store it in a `newsfeed` table
- When it needs regenerating, query the newsfeed table for the latest timestamp, then generate from that point

**Newsfeed delivery approaches:**

1. **Pull Model:**
   - The client pulls data from the server periodically or manually
   - Problem: new data doesn't appear immediately, and many API calls return empty

2. **Push Model:**
   - The server pushes new data as soon as it exists
   - Problem: popular users have many followers → the server must push many updates → overload

3. **Hybrid Model (best practice):**
   - Users with many followers (>1000) → use the Pull model
   - Users with few followers (<1000) → use the Push model
   - The server pushes updates at a fixed frequency, letting heavy users pull data

### Caching and Load Balancing

**CDN:**

- Use a geographically distributed CDN to bring content closer to users
- Serves photos at global scale

**Metadata caching:**

- Memcache to cache high-traffic DB rows
- Cache 20% of daily read traffic (applying the 80-20 rule: 20% of photos generate 80% of traffic)

### Key Generation

**Problem:**

- Auto-increment IDs can become a bottleneck at scale

**Solutions:**

1. **Two DB approach:**
   - DB1: generates even IDs (auto-increment-increment = 2, offset = 1)
   - DB2: generates odd IDs (auto-increment-increment = 2, offset = 2)
   - A load balancer in front of the two DBs ensures availability

2. **Key Generation Service (KGS):**
   - A standalone service that generates random 6-character keys
   - Pre-generates them and stores them in a key-DB

## Best Practices

### Database Design

- **Use NoSQL for metadata at scale:** Cassandra or key-value stores suit large systems better than an RDBMS
- **Delayed deletion:** keep data for a few days before permanently deleting it to support recovery
- **Replication:** use replication to ensure reliability

### Newsfeed Strategy

- **Pre-computation:** generate the newsfeed ahead of time instead of computing in real time
- **Hybrid push/pull:**
  - Push for users with few followers (<1000)
  - Pull for users with many followers (>1000)
  - Reduces server load for celebrity accounts

### Caching Strategy

- **80-20 rule:** cache the 20% of popular content that generates 80% of traffic
- **Multi-layer caching:**
  - CDN for static content (photos)
  - Memcache for metadata (DB rows)

### Key Generation

- **Avoid a single point of failure:** don't use a single auto-increment DB
- **Distributed ID generation:**
  - Multiple DBs with different offsets
  - Or a dedicated Key Generation Service

### System Architecture

- **Separation of concerns:**
  - Separate object storage for photos (S3)
  - Separate database for metadata
- **Read-heavy optimization:** optimize for read operations since reads outnumber writes

### Scalability

- **Geographic distribution:** a CDN to serve global users
- **Horizontal scaling:** use distributed systems (Cassandra, multiple DBs)
- **Load balancing:** balance load across all services

### Reliability

- **Data redundancy:** database replication
- **Delayed deletion:** a recovery mechanism
- **High availability:** multiple servers, load balancers

## Article Review

**Strengths:**

- Covers all the main aspects: requirements, capacity estimation, database design, newsfeed, caching
- Offers concrete solutions to scaling problems
- The hybrid push/pull model is a practical and effective approach
- Takes the 80-20 rule into account for caching

**Areas for improvement:**

- Lacks detail on the newsfeed ranking algorithm
- Doesn't mention image processing (resizing, compression)
- No detail on search functionality
- Lacks discussion of consistency models
- Doesn't mention monitoring and observability

**Conclusion:**
The article gives a good overview of designing a photo-sharing system, especially strong on newsfeed strategy and caching. It suits beginners learning system design, but needs more detail on other aspects to reach a production-ready design.

> **See also:** [YouTube Architecture](/Technology/System Design/Practices/YouTube Architecture) · [Search Engine](/Technology/System Design/Practices/Search Engine) · [Top K Problem Heavy Hitters](/Technology/System Design/Practices/Top K Problem Heavy Hitters)
