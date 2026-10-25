---
area: technology
domain: system-design
type: guide
title: Scaling A File Storage Backend
description: "A six-step evolution from a single file-storage server to a scalable backend: shared metadata, load balancing and autoscaling, service boundaries and gateway auth, direct upload with presigned URLs, asynchronous events, and caching, CDN, and rate limiting."
timestamp: "2026-10-25T00:00:00.000Z"
tags:
  - technology
  - system-design
  - scalability
  - object-storage
  - load-balancing
  - cdn
  - rate-limiting
---

# Scaling A File Storage Backend

A file-storage service can start with one server that keeps a map of file ID to path in memory. That design works until the process restarts, a second replica is added, or upload traffic starts competing with metadata reads. Each scaling step below removes one limit and introduces a new cost; the order matters more than the individual components.

The running example is a Google Drive-style service: users upload files, list them, download them, and expect thumbnails and notifications.

| Step                            | Limit it removes                                              | What it adds                                            |
| ------------------------------- | ------------------------------------------------------------- | ------------------------------------------------------- |
| 1. Shared metadata database     | State lost on restart; replicas cannot see each other's files | A shared failure domain and a network hop               |
| 2. Load balancer and autoscaler | One server's compute ceiling                                  | More moving parts and a database that still bottlenecks |
| 3. Service split and gateway    | Coupled release cycles; public exposure of every service      | Operational complexity, gateway as a new tier           |
| 4. Direct upload                | Bytes flowing through the app server                          | Orphaned objects and metadata that can lie              |
| 5. Event broker                 | Synchronous dependency on thumbnails and notifications        | Duplicate, delayed and failed messages                  |
| 6. Cache, CDN and rate limiting | Repeated reads and abusive traffic                            | Staleness, invalidation, and counter accuracy           |

## 1. Move Metadata Out Of The Process

The first server holds `file ID → path` in RAM. It has three problems:

- A restart loses the mapping.
- A second replica does not know what the first one wrote.
- The mapping competes with file bytes for the same memory.

Move metadata into a shared relational database. Compute becomes stateless: any instance can serve any request, and a restart still finds the metadata. "Stateless" here means the application process holds no durable business state; the database is still stateful.

The database is now a shared failure domain. If it is down, every request that needs metadata is down, no matter how many application replicas exist. The next steps assume the database has backups, a failover plan, and eventually read replicas. Compute scaling does not fix a storage bottleneck.

## 2. Scale Compute With A Load Balancer

Two directions:

- **Vertical scaling** gives the existing server more CPU and RAM. It is simple and has a hard ceiling, and it keeps a single node as both the performance limit and the failure unit.
- **Horizontal scaling** runs more stateless replicas against the shared database. It removes the single-node compute ceiling but moves contention to the database and the network.

In practice both are combined. A load balancer distributes requests across replicas and uses health checks to remove unhealthy nodes. Detection time depends on the check interval, timeout and failure threshold; a load balancer cannot route around a node it still believes is healthy.

Algorithm choice depends on the workload:

| Algorithm            | Good for                             | Weakness                                                                |
| -------------------- | ------------------------------------ | ----------------------------------------------------------------------- |
| Round robin          | Uniform, short requests              | Ignores request cost: a metadata read and a large upload count the same |
| Weighted round robin | Heterogeneous instance sizes         | Weights are static and need tuning                                      |
| Least connections    | Long-lived or variable-cost requests | Needs connection tracking; not perfect for short bursts                 |
| Sticky sessions      | Legacy in-memory session state       | Best-effort only; a failed node still loses the session                 |

Sticky sessions are a workaround, not a design. If a user must return to the same node, externalize the state instead so any replica can serve the next request.

An autoscaler watches load signals and adds or removes instances; the load balancer only distributes to instances that currently exist. Autoscaling reacts after the signal, so it lags a sudden spike, and it does nothing for a saturated shared database.

## 3. Split By Domain And Put A Gateway At The Edge

Splitting into services is justified when a heavy path (upload) degrades light paths, or when separate teams need independent release cycles. The usual split for this system is Files, Auth, Notifications, Realtime and Thumbnail. Each split adds deployment, versioning and tracing work, so split for a concrete reason rather than by default.

Keep services in a private network and expose a single entry point:

- The **API Gateway** routes requests and can aggregate responses from several services.
- Run several gateway instances behind a load balancer; a single gateway is a shared failure domain.
- For JWT with asymmetric signing, the gateway verifies the signature with the public key and checks expiry (`exp`) at the edge. Invalid tokens get HTTP 401. This avoids an Auth Service call on every request.
- The gateway performs **authentication**; each service performs **authorization** on the specific resource. A valid token does not mean the caller may read this file, and the gateway usually lacks the data to decide that. A denied action is HTTP 403, not 401.

JWT verification has limits: a signature check does not revoke a token before it expires. Short-lived access tokens plus a refresh flow, and a revocation list for high-risk actions, cover the gap. Gateway aggregation also adds coupling and latency; keep the gateway thin and let services own their responses where possible.

## 4. Send File Bytes Directly To Object Storage

Routing large uploads through the application server consumes bandwidth, holds worker threads, and runs into request timeouts. Move the bytes to object storage and keep only metadata in the relational database.

The direct-upload flow:

1. The client sends metadata (name, size, content type) to the gateway.
2. The Files Service writes a database row with a server-generated ID, then asks object storage for a short-lived presigned upload URL.
3. The service returns the URL with HTTP 200.
4. The client uploads the bytes directly to the bucket.

Presigned URLs are bearer tokens: anyone holding the link can use it until it expires, with the permissions of the credential that created it. On S3, a URL created with long-lived IAM credentials can last up to 7 days (the console caps it at 12 hours), and a URL created with temporary credentials expires when those credentials do. The URL can be reused until expiry.

Size limits need care. A presigned `PUT` does not carry a size condition. S3 supports a POST policy with a `content-length-range` condition; without that, the service must validate the object size after upload and delete or quarantine oversized objects. Very large files use multipart upload with a presigned URL per part rather than one giant `PUT`.

Two consistency details are easy to miss:

- Write the metadata row as `pending` and mark it `ready` only after the upload is confirmed, either by an object-created event or an existence check. Otherwise the database can advertise a file whose bytes never arrived.
- Object keys matter. On S3, uploading to an existing key replaces the object, so a client-supplied name is a collision and overwrite risk. A server-generated key avoids it.

The application still owns metadata and permissions; it no longer carries the bytes.

## 5. Move Side Work To An Event Broker

Thumbnails, realtime updates and notifications should not make the upload wait. Put an event broker between the producer and the consumers:

- Object storage emits an event when the upload completes; the broker delivers it to consumers.
- Thumbnail, realtime and notification workers process independently.
- A thumbnail failure means a missing thumbnail, not a failed upload. The upload does not need to roll back.

Delivery is usually at-least-once. S3 event notifications are "designed to be delivered at least once" and typically arrive in seconds but can take a minute or longer. Consumers must therefore be idempotent: generate a thumbnail keyed by file version, and deduplicate notification sends.

Retries and a dead-letter queue keep one bad message from blocking the rest. Configure a retry budget with backoff, move messages that keep failing to a DLQ, and alert on DLQ depth. A DLQ without a reader is just a place where messages disappear quietly. The same failure rules as any distributed system apply; see [Designing For Distributed Failure](/Technology/System Design/Concepts/Designing For Distributed Failure).

## 6. Optimize Reads And Protect The Edge

Three additions handle read-heavy traffic and abuse.

**Cache-aside metadata in Redis.** On a read, check the cache; on a hit, return the metadata; on a miss, query the database and populate the cache. A hit avoids the database query, not the file download — the client still needs the bytes. Invalidate or update the cache when metadata changes, set a TTL as a safety net, and guard against a stampede when a hot key expires. See [Cache Aside Pattern](/Technology/System Design/Practices/Azure Design Patterns/Cache Aside Pattern).

**CDN for file bytes.** The first request for a file (a cold request) pulls it from the origin into a point of presence; later requests from nearby users are served from the edge. Private files need signed URLs or signed cookies rather than a public cache. Set cache-control deliberately, plan invalidation for replaced content, and keep range requests working for large files.

**Rate limiting at the gateway or edge.** Keep a counter in a key-value store keyed by IP or user ID; for example, 10 requests per minute, returning HTTP 429 when exceeded. Prefer user ID over IP where possible, because NAT puts many users behind one address. Fixed windows allow bursts at the boundary; sliding windows and token buckets smooth them. In a distributed setup, the counter increment must be atomic or the limit leaks across gateway instances, and responses should include `Retry-After`.

## What Breaks Next

The six steps do not make the system infinitely scalable. The next limits usually appear in this order:

- Metadata writes outgrow one database: read replicas help reads, then partitioning or sharding is needed for writes.
- Deletes and failed uploads leave orphaned objects: a lifecycle job and a reconciliation pass are needed.
- Cross-region users need data close to them: replication or multi-region storage, with the consistency questions that follow.
- Egress and storage cost grow faster than compute: storage tiers, compression and lifecycle rules matter.

## Check Before Repeating

- "Stateless means there is no state." It means the process holds no durable business state; the database and object store still do.
- "A presigned URL limits the upload size." A presigned `PUT` does not; use a POST policy with `content-length-range` or validate after upload.
- "The object event means the file is ready." Notifications are at-least-once and can be delayed, so track a `pending` to `ready` transition.
- "A cache hit means a fast download." It only avoids the metadata query; the bytes still come from storage or the CDN.
- "The gateway can enforce all authorization." It authenticates; resource-level authorization needs the service's data.
- "Horizontal scaling removes the bottleneck." It moves the bottleneck to the shared database or the network.
- "Sticky sessions make in-memory state safe." They are best-effort; a failed node still loses the state.

## Sources

- [AWS – Download and upload objects with presigned URLs](https://docs.aws.amazon.com/AmazonS3/latest/userguide/using-presigned-url.html)
- [AWS – Amazon S3 event notifications](https://docs.aws.amazon.com/AmazonS3/latest/userguide/EventNotifications.html)
- [AWS – Create a POST policy (content-length-range)](https://docs.aws.amazon.com/AmazonS3/latest/API/sigv4-HTTPPOSTConstructPolicy.html)
- [Azure Architecture Center – Cache-Aside pattern](https://learn.microsoft.com/en-us/azure/architecture/patterns/cache-aside)
- [Azure Architecture Center – Rate Limiting pattern](https://learn.microsoft.com/en-us/azure/architecture/patterns/rate-limiting-pattern)
- [RFC 7519 – JSON Web Token (JWT)](https://www.rfc-editor.org/rfc/rfc7519)
- [RFC 6585 – Additional HTTP Status Codes (429)](https://www.rfc-editor.org/rfc/rfc6585)

> **See also:** [Instagram Like Photo System Design](/Technology/System Design/Practices/Instagram Like Photo System Design) · [YouTube Architecture](/Technology/System Design/Practices/YouTube Architecture) · [Cache Aside Pattern](/Technology/System Design/Practices/Azure Design Patterns/Cache Aside Pattern) · [Rate Limiting Pattern](/Technology/System Design/Practices/Azure Design Patterns/Rate Limiting Pattern) · [Designing For Distributed Failure](/Technology/System Design/Concepts/Designing For Distributed Failure) · [Kafka DLQ And Retry](/Technology/System Design/Practices/Kafka DLQ And Retry)
