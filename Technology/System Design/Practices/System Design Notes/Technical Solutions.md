---
area: technology
domain: system-design
type: resource
title: Technical Solutions
description: A curated catalog of detailed technical solutions and case studies, from JWT revocation, caching, and background jobs to TinyURL, ID generation, rate limiting, migrations, and scaling for traffic spikes.
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - system-design
  - case-study
resource: https://viblo.asia/p/jwt-huy-hang-loat-token-da-bao-gio-ban-nghi-den-EvbLbxGv4nk?fbclid=IwAR0-7dicLCxg0aSjZqgnHoPvk__tl0zP5gr3EPSxE0uX5yu9VdqsRfg6St0
---

# Technical Solutions

## Authentication and Authorization

### JWT (JSON Web Tokens)

- JWT: Have you ever thought about mass token revocation?: a discussion of the problem of revoking JSON Web Tokens (JWT), especially mass revocation, and feasible solutions given that JWT is inherently stateless (e.g. using a blacklist, or short-lived tokens combined with refresh tokens).
  - Source: https://viblo.asia/p/jwt-huy-hang-loat-token-da-bao-gio-ban-nghi-den-EvbLbxGv4nk?fbclid=IwAR0-7dicLCxg0aSjZqgnHoPvk__tl0zP5gr3EPSxE0uX5yu9VdqsRfg6St0

## Optimization

### Memory Optimization

- Optimizing your application with basic data structures and bitwise operations: a guide to optimizing applications by making effective use of basic data structures and bitwise operations to save memory and speed up processing.
  - Source: https://200lab.io/blog/cau-truc-du-lieu-toi-uu-ung-dung-cua-ban-nhu-the-nao

### Performance Optimization

- Performance Optimization Guideline: a set of guidelines for optimizing application performance, including methods and points to watch at different layers of the system (frontend, backend, database).
  - Source: https://viblo.asia/s/performance-optimization-guideline-DVK2jDQ2KLj

### Caching

- The "Super fast API" problem with Golang and MongoDB: presents a solution for building a super fast API using Golang and MongoDB, focusing on optimization and caching techniques.
  - Source: https://viblo.asia/p/bai-toan-super-fast-api-voi-golang-va-mongodb-3Q75wmA7ZWb
- Caching đại pháp (The Grand Art of Caching): a compilation of knowledge and techniques about caching, one of the important methods for improving system performance (e.g. cache strategies, cache eviction policies, types of caches).
  - Source: https://viblo.asia/s/caching-dai-phap-QqKLvpNbl7z

## Data and Task Processing

### Background Jobs / Queues

- The art of handling background jobs: shares experience and techniques for designing and processing background jobs effectively, ensuring reliability and scalability. Covers choosing a message queue, error handling, and retry mechanisms.
  - Source: https://viblo.asia/s/nghe-thuat-xu-ly-background-job-0gdJzvqnJz5 (this link is used for several entries; assumed to be the overview article)
  - Another source (possibly related to View/Email): https://viblo.asia/p/nghe-thuat-xu-ly-background-job-07LKXjqJlV4
- [Task Scheduler System Design](/Technology/System Design/Practices/Task Scheduler System Design): a summary of an article on designing a Task Scheduler system from an interview with a Meta Staff Engineer, covering requirements discussion, scalability, fault tolerance, and best practices. Source: https://medium.com/@bugfreeai/system-design-interview-with-a-meta-staff-engineer-designing-a-task-scheduler-1a5041b4860e

### Logging

- Using Discord as a logger: a creative guide to using Discord (via webhook) as a logging tool for an application, convenient for quickly tracking important events or errors.
  - Source: https://www.youtube.com/watch?v=c6-ZDgz7SCo
- - [e2f3a4b5-c6d7-49e0-9f1a-2b3c4d5e6f70.pdf](/Attachments/e2f3a4b5-c6d7-49e0-9f1a-2b3c4d5e6f70.pdf)

### Data Compression (zip, gzip)

#### How Discord Cut Websocket Traffic by 40%

Discord reduced websocket traffic by 40% by:

- Switching from zlib to the zstandard streaming compression algorithm. Streaming zstandard is superior in speed, memory usage, and compression ratio.
- Changing the logic for updating data from server to client (passive sessions) to minimize redundant data.
  ![](/Attachments/4d5e6f70-8192-a3b4-c5d6-e7f8091a2b3c.png)

### Large File Upload

- Speeding up large file uploads with chunking and multi-threaded upload: introduces file chunking and multi-threaded upload to speed up uploading large files while also improving recovery from errors.
  - Source: https://viblo.asia/p/tang-toc-qua-trinh-upload-file-lon-voi-ky-thuat-phan-manh-va-tai-len-da-luong-38X4EPbdVN2?fbclid=IwAR21dFUUPrOdtnWzT4BXtuMwnbB0ExVyUPZ9vsmqjgWGs8zhoaO1Q6v2fc8

### Data Syncing

- Loro - Syncing / conflict free / automatic merging: Loro is a high-performance CRDT (Conflict-free Replicated Data Type) library for syncing local state and merging automatically without conflicts. Supports both backend (see [Backend Overview](/Technology/Backend And Database/Resources/Backend Overview)) and frontend (see [Frontend Overview](/Technology/Frontend/Resources/Frontend Overview)).
  - Source: https://github.com/loro-dev/loro

### Metadata

- The Reddit Media Metadata Store: a post on the r/RedditEng subreddit discussing Reddit's media metadata storage system, including its architecture and technology choices.
  - Source: https://www.reddit.com/r/RedditEng/comments/1avlywv/the_reddit_media_metadata_store

### Data Backup

- [3 2 1 Backup Strategy](/Technology/System Design/Practices/3 2 1 Backup Strategy)

## Communication and Notification

### OTP (One-Time Password)

- OTP and the security aspects you must ensure: an analysis of One-Time Passwords (OTP), how they work (e.g. TOTP, HOTP), and the important security aspects to watch when implementing an OTP system to keep it safe (e.g. brute-force protection, validity period, secure delivery channel).
  - Source: https://viblo.asia/p/otp-va-cac-khia-canh-bao-mat-can-phai-dam-bao-r1QLxxagLAw

### Notifications

- The secret to handling notification grammar like Facebook: shares techniques for handling grammar in notifications flexibly and naturally depending on context and the number of subjects, similar to how Facebook displays notifications.
  - Source: https://viblo.asia/p/bi-thuat-xu-ly-ngu-phap-notification-nhu-facebook-m2vJPwxo4eK
- The Duolingo owl and the problem of sending 4 million notifications in 5s: a case study of Duolingo's challenge of sending a huge number of notifications (4 million in 5 seconds) and the technical solutions they applied (e.g. optimized batch processing, message queues, choosing suitable infrastructure).
  - Source: https://viblo.asia/p/con-chim-xanh-duolingo-va-bai-toan-gui-4-trieu-notification-trong-5s-qPoL7RraJvk

### Chat / Real-time Communication

- Chat chit và bức tranh về realtime communication (Chit-chat and the picture of realtime communication): an overview of real-time communication, the technologies (e.g. WebSockets, WebRTC, SSE), and architectures commonly used to build chat applications.
  - Source: https://viblo.asia/p/chat-chit-va-buc-tranh-ve-realtime-communication-maGK7vRA5j2
- Go Random Chat: a GitHub repository for a random chat application built with Go.
  - Source: https://github.com/minghsu0107/go-random-chat

### Email

- The art of handling background jobs (can be applied to bulk email sending):
  - Source: https://viblo.asia/p/nghe-thuat-xu-ly-background-job-07LKXjqJlV4

## Specific Systems

### E-commerce

- Design System: a basic Payment System – 3k RPS: a video guide to designing a basic Payment System capable of handling about 3000 requests per second (RPS), including the main components, processing flow, and considerations for security and reliability.
  - Source: https://www.youtube.com/watch?v=zI6w11T0_hY
- A thousand and one common mistakes in financial web applications and how to avoid them: a series of articles listing common mistakes made when developing web applications in the finance domain (e.g. rounding errors, handling race conditions in transactions, protecting sensitive data) and providing solutions and ways to avoid them.
  - Part 1: https://viblo.asia/p/ngan-le-mot-loi-thuong-gap-trong-ung-dung-web-ve-tai-chinh-va-cach-phong-tranh-phan-1-5OXLAomw4Gr
  - Part 2: https://viblo.asia/p/ngan-le-mot-loi-thuong-gap-trong-ung-dung-web-ve-tai-chinh-va-cach-phong-tranh-phan-2-38X4ENmAJN2?fbclid=IwAR3FZtO-o3z5tT6H_KreLb76su31lv9cv8Ra5-0jGdTRCw1deUy1YVO4LV8
  - Part 3: https://viblo.asia/p/ngan-le-mot-loi-thuong-gap-trong-ung-dung-web-ve-tai-chinh-va-cach-phong-tranh-phan-3-W13VMeZ5VY7
- Arcturus — Inventory Processing System - Tiki Engineering: an article from Tiki's engineering team about Arcturus, their Inventory Processing System, including the architecture and technical challenges.
  - Source: https://engineering.tiki.vn/arcturus-inventory-processing-system/?fbclid=IwAR2B533HipyuGC86RZtL8MsN9_Ke5ARs5mkJoa11H9z19jx8rCIuTBQLfjk
- Airbnb System Design - Viblo: an analysis and guide to designing an Airbnb-like system, including the main components (user management, listings, booking, search, payment), data flow, and considerations for scalability and availability.
  - Source: https://viblo.asia/p/thiet-ke-he-thong-airbnb-x7Z4DYX2JnX?fbclid=IwAR1a_7ab055VuHj2UJ2-CX77aj-5W3G1avwf6PG3Dau3b2Aq6XZGnSrBB8w
- Ticketing System Design: a guide to the steps and factors to consider when designing an online ticketing system, from event management, ticket types, quantities, and booking to payment processing and fraud prevention.
  - Source: https://viblo.asia/p/thiet-ke-he-thong-ban-ve-ticketing-system-design-GyZJZnjZJjm
- [Bank Transfer Payment](/Technology/System Design/Practices/Bank Transfer Payment)
- VietQR-Portal: the official portal for VietQR, a common QR Code standard for payments in Vietnam. - Source: https://vietqr.net

### Social Networks

- Misskey: the GitHub repository of Misskey, an open-source, decentralized social networking platform with many rich features.
  - Source: https://github.com/misskey-dev/misskey

### Video Streaming (HLS)

- HLS (HTTP Live Streaming): a live video streaming protocol based on HTTP, developed by Apple. HLS splits video into small segments, letting clients request these segments over HTTP and adapt to varying network conditions by switching between streams of different quality.

### Recommendation Systems / Suggestion Algorithms

- Collaborative-Filtering: a GitHub repository providing guidance and sample code for the Collaborative Filtering algorithm, a popular technique in recommendation systems based on the behavior of similar users or similar items.
  - Source: https://github.com/Longcodedao/Collaborative-Filtering

### Geography-based Solutions

- The problem of batching orders to optimize delivery time: a discussion in the J2Team Community Facebook group about optimizing how orders are grouped to minimize delivery time, a real-world logistics problem that may involve route optimization algorithms (e.g. the Traveling Salesman Problem).
  - Source: https://www.facebook.com/groups/j2team.community/permalink/2303868619945245/

### URL Shortening (TinyURL)

Design a URL shortening system like TinyURL.

- Requirements:
  - Take a long URL and return a short URL.
  - When the short URL is visited, redirect to the original long URL.
  - The short URL must be unique.
  - Ability to customize the short URL (optional).
  - Click analytics (optional).
- Main components:
  - Application Service: handles logic, creating the short code, and storage.
  - Database: stores the mapping between short URLs and long URLs.
    - NoSQL (e.g. Cassandra, DynamoDB) can be used for fast reads and writes and high scalability.
    - Key: short code, Value: long URL.
  - ID Generator: creates a unique short code.
    - Approach 1: Base62 encoding of an incrementing integer (needs a synchronization mechanism to avoid duplicates in a distributed system, e.g. using Zookeeper, or a dedicated ID-generating service).
    - Approach 2: generate a UUID, then hash it and take a portion.
    - Approach 3: pre-generate a large number of IDs and store them in the DB.
  - Load Balancer: distributes load across the application services.
  - Caching: cache frequently accessed short URLs to reduce DB load.
- Flow:
  - Creating a short URL: user submits long URL -> Load Balancer -> Application Service -> ID Generator creates a short code -> Application Service saves (short code, long URL) to the DB -> returns the short URL to the user.
  - Redirecting: user visits the short URL -> Load Balancer -> Application Service -> looks up the corresponding long URL in the Cache, falling back to the DB if absent -> returns an HTTP 301/302 redirect to the long URL.
- Considerations:
  - Scalability: shard the DB by short code, stateless application services.
  - Availability: DB replication, multiple application service instances.
  - Latency: caching, choosing a suitable DB.
- Source: https://www.threads.net/@viettranx89/post/C_ZdnH-B9DI
  ![](/Attachments/1a2b3c4d-5e6f-7081-92a3-b4c5d6e7f809.png)
  ![](/Attachments/2b3c4d5e-6f70-8192-a3b4-c5d6e7f8091a.png)
- Protip from the source: approach the problem as an MVP first, solve the core design, and only then expand. Clarify the constraints on actors (locks, race conditions, chosen protocol) before thinking about scalability.

### Distributed Counter

For use cases like counting views, likes, and votes, there are several approaches (an integer counter in an RDBMS, a message queue, INCR in Redis, HyperLogLog).
When high scalability is required and strong consistency is not (eventual consistency with low latency is acceptable), you can use a Conflict-free Replicated Data Type (CRDT).

- CRDTs allow data replicas to be updated independently and then merged without conflicts.
- References:
  - CRDT analysis and use cases: https://www.infoq.com/articles/database-merge-replication-crdt/
  - More reading on CRDTs: https://crdt.tech/resources
  - CRDT in Redis (Active-Active replication): https://redis.io/active-active/

### Search & Autocomplete

#### Practice from Twitter

A blog post from Twitter (X) Engineering about the efforts and solutions used to ensure the stability and scalability of their search system.

- Source: https://blog.x.com/engineering/en_us/topics/infrastructure/2022/stability-and-scalability-for-search

#### Discussion of Autocomplete Solutions

![](/Attachments/0f1a2b3c-4d5e-6f70-8192-a3b4c5d6e7f8.png)

- Some ideas:
  - Use Spark Graph, HDFS, and Cloud Hadoop to implement a Trie.
  - Shard the data: each cluster stores some prefixes, with a proxy for routing. The challenge is splitting so requests are evenly distributed.
  - Sync data to a shared DWH, and use Spark/Hadoop to query + caching.
  - Use Elasticsearch (GitHub uses it too).
- Discussion source: https://www.facebook.com/groups/sydexa/permalink/1775084429648431/

#### Prefixy - A Prefix Search Service for Autocomplete

Prefixy is a scalable prefix search service designed to power autocomplete features.

- Article: https://medium.com/@prefixyteam/how-we-built-prefixy-a-scalable-prefix-search-service-for-powering-autocomplete-c20f98e2eff1
- GitHub repo: https://github.com/prefixy/prefixy

#### Other Libraries

- typeahead.js: a fast, full-featured autocomplete library.
  - Source: https://github.com/twitter/typeahead.js

### ID Generation

- Building GHTK's ID generation system - 100 million IDs / second: a video from Giao Hàng Tiết Kiệm (GHTK) about how they built an ID generation system capable of producing 100 million IDs per second. Key factors include uniqueness, ordering (optional), scalability, and high performance. - Source: https://www.youtube.com/watch?v=bSyFHY3a3_s
  ![](/Attachments/3c4d5e6f-7081-92a3-b4c5-d6e7f8091a2b.png)

## Operations and Monitoring

### System Monitoring

- A day of analytics: measuring CCU in real time: shares practical experience measuring the number of concurrent users (CCU) in real time, an important factor in analytics and system monitoring. - Source: https://viblo.asia/p/1-ngay-lam-analytic-do-luong-ccu-theo-thoi-gian-thuc-4P856L0BZY3
  ![](/Attachments/a3b4c5d6-e7f8-49a0-9b1c-2d3e4f5a6b7c.jpg)

### Rate Limiting

- Decoding Rate Limiting: the shield protecting APIs from network attacks: explains Rate Limiting, an important technique for protecting APIs from abuse and denial-of-service (DoS) attacks and ensuring system stability. Covers the algorithms (Token Bucket, Leaky Bucket) and how to implement them.
  - Source: https://viblo.asia/p/giai-ma-rate-limiting-la-chan-bao-ve-api-khoi-cac-cuoc-tan-cong-mang-gwd432WbVX9

### Benchmarking

Tools for measuring system performance and load.

- Apache JMeter
- K6: https://k6.io
- wrk: https://github.com/wg/wrk

## Technologies and Platforms

### Serverless

- A year of running a hotel booking application on AWS Serverless services for $0.8/month: shares experience running a hotel booking application on AWS Serverless services (e.g. Lambda, API Gateway, DynamoDB) at extremely low cost.
  - Source: https://hieudd.substack.com/p/a-year-of-running-a-hotel-booking

### Message Brokers (Kafka, RabbitMQ)

Message queue systems used for asynchronous communication between services.

- Zero Disk Architectures - stateless broker: a stateless broker architecture that uses external storage (e.g. S3) to hold state, making the broker easy to scale and recover.
  - WarpStream
  - AutoMQ

### Distributed Computing

- Hadoop: an open-source framework for processing and storing large datasets in a distributed fashion.

### Distributed Data Join & Mapping

- Hasura: provides an instant GraphQL API over new or existing data sources, making it easy to combine data from multiple sources.
- Krakend: a high-performance API Gateway with middleware for transforming, aggregating, and filtering data from multiple microservices.

### AI / Machine Learning

- SaaS AI models: Replicate is a platform for running AI/Machine Learning models in the cloud without managing infrastructure. It provides an API to easily integrate AI models into applications.
  - Source: https://replicate.com
- Practice building LLM + RAG on AWS: a post in the AWS Study Group FCJ Facebook group sharing hands-on experience building a large language model (LLM) with Retrieval Augmented Generation (RAG) on the AWS platform.
  - Source: https://www.facebook.com/groups/awsstudygroupfcj/posts/1710057443092554/

## System Migration and Modernization

### A Tale of Incremental Modernisation

A large customer in the UK and Ireland running a legacy system on a Mainframe faced difficulties with cost, speed of change, and staffing. The Thoughtworks team was asked to replace it and migrate the system to the Cloud.

- The journey used many patterns: Dual Run, Event Interception, Legacy Mimic, Transitional Architecture, Change Data Capture (CDC), Dark Launching, Canary Release.
- Testing played a very important role.
- Source: https://martinfowler.com/articles/uncovering-mainframe-seams.html

### Database Migration

- Moving data from one DB to another - the secret behind Canva's media storage problem and its journey to DynamoDB: a case study of Canva migrating and storing media data, specifically the journey to DynamoDB, along with the challenges and solutions.
  - Source: https://viblo.asia/p/bi-mat-dang-sau-bai-toan-luu-tru-media-cua-canva-va-hanh-trinh-tim-den-dynamodb-3RlL5gPz4bB
- How Discord Stores Trillions of Messages (MongoDB -> ScyllaDB): a blog post from Discord explaining how they store trillions of messages, including the decision to migrate from MongoDB to ScyllaDB to improve performance and scalability.
  - Source: https://discord.com/blog/how-discord-stores-trillions-of-messages

## Versioning

- How to name versions: an article from ByteByteGo explaining what the numbers in software version naming mean, usually following Semantic Versioning (Major.Minor.Patch).
  - Major: incompatible API changes.
  - Minor: new functionality, backward compatible.
  - Patch: bug fixes, backward compatible.
  - Source: https://blog.bytebytego.com/p/ep120-what-do-version-numbers-mean

## Web Crawling

- Puppeteer: a Node.js library providing a high-level API to control Chrome/Chromium via the DevTools Protocol. Commonly used for crawling, scraping, and UI test automation.

## Text & Editor

- [Edit History Backup](/Technology/System Design/Practices/System Design Notes/Edit History Backup)

## Scaling for Traffic Spikes

- An effective scale-out strategy when traffic spikes for the Viblo system: shares an effective scale-out (horizontal scaling) strategy for a system facing sudden traffic surges, based on Viblo's experience.
  - Source: https://viblo.asia/p/chien-luoc-scale-out-hieu-qua-khi-luong-truy-cap-gia-tang-dot-bien-cho-he-thong-viblo-zOQJw5xNVMP

> **See also:** [Overview](/Technology/System Design/Practices/System Design Notes/Overview) · [Fundamentals](/Technology/System Design/Practices/System Design Notes/Fundamentals) · [Retry And Circuit Breaker](/Technology/System Design/Practices/System Design Notes/Retry And Circuit Breaker)
