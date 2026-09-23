---
area: technology
domain: caching
type: cheatsheet
title: Conclusions And QA
description: Conclusions, best-practice summary, implementation checklist, and community Q&A on a distributed in-memory cache for heavy-read APIs, covering Redis Pub/Sub sync, race conditions, warm-up, and Redis versus Memcached at scale.
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - caching
  - redis
  - distributed-systems
resource: https://github.com/huykn/distributed-cache
---

# Conclusions And QA

## Conclusions and Recommendations

### When to Use It

✅ **Good fit:**

- Heavy-read APIs with a high read-to-write ratio
- Use cases that accept eventual consistency
- Need for ultra-low latency
- Limited budget (cost-effective scaling required)

❌ **Poor fit:**

- Financial transactions
- Real-time data that requires 100% accuracy
- Use cases that require strong consistency
- Data too large to fit in memory

### Best Practices Summary

1. **Serialization:** Serialize in the Write Service, cache bytes in the Read Service
2. **HTTP:** Use native `net/http` for performance-critical endpoints
3. **Caching:** HTTP 304 with an ETag computed in the Write Service
4. **Memory:** Set a max item count, use LFU/LRU, warm up smartly
5. **Sync:** Redis Pub/Sub with multiple channels, monitor health
6. **Race condition:** TTL + CQRS + versioning
7. **Lifecycle:** Health check, smart warm-up, singleflight pattern
8. **Monitoring:** Track hit rate, memory usage, Redis health

### Implementation Checklist

- [ ] Implement serialization optimization (bytes caching)
- [ ] Switch to native `net/http` for the Read Service
- [ ] Implement HTTP 304 caching with ETag
- [ ] Set up Redis Pub/Sub with multiple channels
- [ ] Implement an LFU/LRU eviction policy
- [ ] Set a max item count for the cache
- [ ] Implement a health check endpoint
- [ ] Implement a smart warm-up strategy
- [ ] Implement the singleflight pattern for cache misses
- [ ] Set up monitoring (hit rate, memory, Redis health)
- [ ] Implement a fallback mechanism (direct Redis call)
- [ ] Handle connection loss (flush cache, retry)
- [ ] Test race condition scenarios
- [ ] Load test with expected traffic

## References

- [GitHub Repository](https://github.com/huykn/distributed-cache)
- [Example: Heavy-Read API](https://github.com/huykn/distributed-cache/tree/main/examples/heavy-read-api)
- [Voucher issuing at 1M req/s](/Technology/Backend And Database/Practices/1M RPS Voucher System) — turning hot-path writes into RAM reads
- [Example: Stale Data Prevention](https://github.com/huykn/distributed-cache/tree/develop/examples/stale-data-prevention)
- [Redis Client-Side Caching](https://redis.io/docs/latest/develop/reference/client-side-caching/)
- [Memproxy Library](https://github.com/QuangTung97/memproxy)

---

**Note:** This is a summary drawn from real-world discussions of the distributed in-memory cache architecture. Apply the best practices according to the context and requirements of each specific system.

---

## Community Discussion and Q&A

### Comparison with Redis Client-Side Caching

**Q:** This feels similar to the local cache mechanism of a Redis client, right?  
**Ref:** [Redisson Cache API](https://redisson.pro/docs/cache-api-implementations/)

**A:** Yes, but there are differences:

- The demo has pub/sub on a configurable channel
- In production, multiple channels are used for different purposes:
  - Invalidation by tag
  - Invalidation by user group
  - Other use cases depending on business logic

**Q:** When using this pub/sub, do you need to worry about messages being lost during broadcast? Redis does not guarantee delivery. With multiple instances, a few of them may not receive a message from pub/sub.

**A:**

- You have to monitor things
- There is a health check on the pod itself: if a pod is down, traffic is no longer routed to it
- The system falls under AP in the CAP theorem
- At 1M req/s, a 0.5-1s skew between instances is not a concern

**Q:** I haven't looked at it in detail, but on a quick read it is quite similar to Redis client-side caching, specifically broadcasting mode. [Redis Client-Side Caching](https://redis.io/docs/latest/develop/reference/client-side-caching/)

**A:**

1. The Redis caching part is correct. However, the demo has pub/sub on a configurable channel, and in production it is used across multiple channels for different jobs (for example, invalidation by tag or by user group).
2. The demo needs to cover 3 scenarios, so an unmarshal step exists. The previous post also shared how to track the whole lifecycle of a request from the user to the system -> the insight (metrics) at each endpoint is very clear -> it can answer whether or not to hash the ETag from the write service.
3. We benchmark a lot, and adding a framework (for example fiber) means running through the framework's middleware, which adds overhead. To reach the current level of optimization, CQRS is applied heavily: the write service still uses a framework, while the read side is optimized for its specific problem. Frameworks are not bad, and this is not advocating dropping them; it is about using the right move at the right place.

### Warm-up and Seeding Data

**Q:** When the service starts, how does it seed data into the in-memory cache (load everything from the DB/Redis)? Could the production data to seed ever be too large to fit in the pod's memory (for example, Shopee's product catalog)? If only part of it is loaded, how does invalidation work?

**A:**

- In practice, you do not cache all data in a single service's memory
- Example: by the time this post is sent to you as a notification, its cache has already been built for you to view
- There are many ways to do it, depending on the specific case
- A smarter approach is to build a zhash scoring to decide what to add to the cache when a new pod/service starts

**Q:** The author does not mention total keys and size, or warm-up when bootstrapping a pod?

**A:** That depends on each service's strategy. For example, build a zhash scoring to decide what to add to the cache when a new pod/service starts.

### Redis vs Memcached at Large Scale

**Q:** What are the total data size and number of keys in the cache? Redis runs fine with small data, but from 16GB upward it becomes extremely unstable. Also, most large systems in the world that store data in a cache use Memcached or something similar rather than Redis. For example, Twitter does not use Redis for key-value caching but still uses Twemcache (a fork of Memcached).

**A:**

- The Redis here runs on a low-spec configuration, M7i.large
- Example: this post on Facebook is not delivered to all Facebook users -> it is only pushed to the caches of people who care -> and not even to every member of the group
- The cache here is like "setting the table and waiting for guests to arrive" -> so the whole system is never cached in Redis or in pod RAM
- How to cache optimally, and when to shard Redis, depends on many variables
- The 16GB figure also depends on the circumstances
- Another example: create a map and insert 10M records, then read them back and it will be slow -> the root cause is hash collisions -> splitting into 100 maps makes it fast again

**Q:** Then you haven't studied systems like FB yet. Its cache holds up to 1000 billion keys on a memcached cluster, and its average hit rate is extremely high, around 99% to 99.5%.

**Why a high hit rate is needed:**

- A single Facebook screen has to check a lot of things and get a lot of keys from the cache (on average probably 1000 key gets per screen)
- If you do a batch multiget of 100 keys and each key has a 99% probability of hitting, the hit rate of the whole batch is only about 64%
- Facebook has to do that 10 times over
- Reference video: [Facebook Caching](https://youtu.be/m4_7W4XzRgk?si=ydshs8240cPyaEso)
- A library that achieves such a hit rate: [memproxy](https://github.com/QuangTung97/memproxy)

**Facebook example:**

- A screen showing full information also takes around 500-1000 keys from memcached before it can render
- 16GB on memcached is normal; large systems can reach petabytes of RAM
- The average key-value size at FB is only 200 bytes
- In the example post, there is a cache key for each of:
  - The like count on each comment
  - The like count on the post
  - The information of a comment
  - The list of people who liked a comment
  - The list of people who liked the post
  - Each user comes with associated info such as name, id, avatar...
  - Checking whether you are blocked by the commenter and vice versa
- => That is why it has to multiget many keys for one screen
- There is no such thing as "pre-prepared" data
- Every time you open FB, every API has to load and recompute everything
- Its caching systems withstand tens of billions of cache operations per second

**Why Redis is not good with a lot of RAM:**

- It does not use a slab allocator to manage fragmentation => easy to OOM at large memory sizes
- It does not support multithreaded access to memory => very hard to use the full bandwidth of the CPU cache and RAM
- Server CPUs increasingly trend toward more cores, but each core is slower

**A:** Thanks for the effort. In practice, I have never operated a service with a Redis cache size up to 16GB; it usually gets sharded before growing that large.

**Q:** Sharding to scale is mandatory for large systems. But within a single node, you should prefer multithreading over splitting out a separate Redis instance per core.

**Reasons:**

- With sharding, every multiget has to connect to more and more servers to fetch the information
- Example: a multiget of 100 keys across 10 shards must connect to 10 servers to get all 100 keys
- If you only need to connect to 1 server using 10 threads to handle it, there is only 1 connection
- Overhead such as TCP and Ethernet headers gets heavier as the number of cache servers grows
- => At large scale, people prefer memcached

**At FB's scale:**

- Connection issues are very heavy => UDP must be used instead of TCP to reduce per-connection overhead
- However, the overhead of a single packet is still large
- => Scaling by sharding at FB even hits a limit: splitting into more shards makes the system slower, because it has to get from too many servers at once
- FB's solution: use replication combined with sharding

**A:**

- The point is to use the right move at the right place. Redis being single-threaded is actually a feature for some problems
- Everything has trade-offs; applying the right move at the right place is what matters
- There is no silver bullet that suits everything
- This post is about handling 1M req/s with only 20 pods on k8s and 1 modest Redis node -> this is a real-world problem
- If the 20 pods had to call memcache, memcache would need to scale up to withstand 1M hits/s, so what would the cost be? Plus, probably 40 pods would be needed to absorb the traffic -> all the infrastructure would have to carry a lot more load

**Q:** This is a memcached node that Instagram once used to handle traffic. [Instagram Memcached](https://x.com/rbranson/status/430914617909317633) - from when this person was working on infra there. Just 8 cores were enough to handle all that. My earlier library benchmarked up to about 5 million gets/s on a small node.

### Race Conditions and the Cache Aside Pattern

**Q:** Have you used your own library in real production, and what is the peak traffic in operations per second? I ask because your library is very likely to suffer from many race conditions and lost events. I don't know whether the business side accepts that kind of inconsistency.

**A:**

- The library was rebuilt from a Java one I have used since 2018, and for this Go version I use similar logic for a production system currently handling 1M+ req/s
- For the service I manage, there has been no event loss
- I know event loss is possible; it is a trade-off. So I am aware of it and make sure it does not happen
- I will use this lib in my own production in the next phase. I promise to maintain it fully

**Q:** Using Redis Stream without losing events is very hard to believe. Do you work in securities/stock trading? If your service does not require high consistency, it is probably fine. Ordinary caching without leases always has a race condition with the cache aside pattern. In our case, a wrong stock value for just a few tens of minutes was enough for customers to complain.

**A:**

- With Redis, events can basically be lost when the network drops or when something related to it is updated
- In practice, we monitor its uptime regularly, with alerts if there is a problem
- Options: on connection loss, take the pod/node down and return 503; or retry when Redis reconnects; or have a separate monitor process call Redis's client list command, for example
- It depends on the scenario of each service and system
- For race conditions there are ways to guard against them: for example, only update if the time_update is newer than the existing one
- The main thing is to know what the problem is so you can anticipate and prevent it
- If a stock price freezes, for example, add a TTL or call a fallback? Call Redis, as in the demo code

**Q:** If you don't use a transactional outbox, you can lose events no matter how many retries you do. And for leases, using versioning or last_update_at won't solve it either, because it is a completely different problem.

**Q:** In our earlier caching work we did not use TTL, and the hit rate was above 99.5%. So whenever there was a discrepancy from a missing event, the client knew immediately.

**A:** Where do you host? On AWS I don't think its uptime is that bad. Also, this is a local cache; if the data is updated, it should have a TTL. And for stock-style display, I would not serve an API but use events, for example MQTT.

**Q:** Do you use the cache aside pattern here?

**Logic:**

1. Get from the cache
2. If found, use it directly
3. If not found, get from the DB or elsewhere
4. Then set the value just fetched back into the cache

If you only do it this way, there is a race condition, whether in memory or with memcached/redis. Even if your replication stream runs stably (for example using CDC), the race condition is still not fully eliminated. Without a TTL, stale data can stay there forever.

**The race condition goes like this:**

1. You get from the cache, and the cache returns not found
2. You go to the DB to fetch the data, and the DB returns the old value v1
3. The value in the DB is updated to the new value v2
4. Your replication stream sets the new value on the cache = v2
5. However, the cache value is then set back to v1 from the value fetched in step 2
   => Your cache is stuck at v1 while the DB is at v2

**A:** You are right about the race condition. However, in this demo's actual implementation, I handle it based on the following:

**Accepting the trade-off (CAP Theorem):**

- The system leans toward AP and accepts eventual consistency
- Data being out of sync for a short period is a risk that has been considered

**Mitigation mechanisms:**

1. Use a short TTL for frequently changing data -> nothing stays stale "forever"
2. Combine with CQRS: the Write Service or cache warm-up workers take primary responsibility for pushing out the latest data (v2), reducing how often the Read service has to fill the cache itself -> which lowers the probability of stale data

**Solutions:**

- Completely eliminating this race condition 100% requires more complex techniques such as versioning
- For the scope of the current problem, TTL + CQRS is judged sufficient to balance complexity and performance
- Redis also has SET NX -> which also reduces stale data

**Q:** I am talking about your in-memory part, the part where you wrap another vendor's cache library. I don't see a TTL passed in there. And as I said, simple versioning does not solve this race condition. Also, using TTL to avoid staleness is not considered eventual consistency. To me it is called bounded staleness. If the system stops with no new updates and no new events but the data is still wrong, it cannot be considered eventual consistency.

**A:**

- Maybe that lib supports so many kinds of things that you could not notice everything
- What the local cache implementation is can be customized through an interface
- Built-in options include LRU and LFU, and /examples has them all
- TTL is used depending on the case -> as I said, use it when the cache is updated frequently
- In addition, the write service fires an invalidate event when there is a change -> the trade-off is accepting constant eviction
- Whether versioning can handle it, I will code a demo here: [stale-data-prevention](https://github.com/huykn/distributed-cache/tree/develop/examples/stale-data-prevention) -> this is prevention only; I understand it can still happen -> and if you determine that, you can add a TTL on top
- This tech stack and core concept has been used in real production with 50M+ users and 1M+ req/s

### Sharding and Routing

**Q:** I don't see the author share the routing part that sends requests to the right service holding the local cache.

**A:** It looks like there is no sharding; every pod holds everything.

**Q:** I just explored it and saw the same. Other solutions, when their data volume grows, must add sharding + fine-grained routing by key id, and deploying that is quite tricky.

**Q:** The strongest point of this approach is local-first, and the author seems to have accepted the cost that comes with choosing it. And if traffic is spread evenly across many keys, eviction (LFU/LRU) will happen constantly -> many local misses. Adding routing would also add a lot of complexity, from key distribution to rebalancing.

**A:**

- Sharding + routing + rebalancing is the hardest part, both in implementation and in deployment
- Other teams still use ordinary caches; if you want state-of-the-art caching, you can use memcached
- Latency can never match an in-memory lookup, but memcached has been stress-tested on many other systems
- The biggest trade-off is internal network bandwidth

**Q:** Why do we need a local cache, boss?

**A:** To cut network latency from the service => cache, sir.

**Q:** This approach is too simple, not Excellent Engineering at all, boss.

### API Gateway (APISIX)

**Q:** You use APISIX? Can you share some personal impressions of using it? How does it compare to nginx?

**A:**

- The APISIX we use is about 30% faster than NGINX in practice
- 304 handling has to be managed yourself

**Q:** Ah, I googled it but wanted to hear from someone with real hands-on experience. Thanks for the feedback. APISIX is written in Java, so it is surprising that it is that much faster than nginx, which is written in C.

**A:**

- I think you are mistaken; APISIX is not written in Java
- Java is not always slow; enterprises use Java a lot
- And you can set up a docker compose and benchmark it yourself

**Q:** Right, I got APISIX's language wrong.

### Memory Management

**Q:** In short, every GET request is served straight from memory, with Redis only as a fallback on cache miss. So memory must be large and controlled. What strategy does your system use to manage memory?

**A:**

- As in the demo, you can set a limit on the number of items held in the pod/service's RAM
- For the strategy, depending on the service you choose either LRU or LFU
- Or, if you are simply caching some category, 100k items or so, the built-in map is fine
- The demo code lets you use whichever type you like

**Q:** So in the end the core is still leveraging Redis Pub/Sub to update the in-memory cache, right?

**A:** Basically, yes.

### Pod Lifecycle and Thundering Herd

**Q:** Quick question: with this setup, when a new read pod is scaled up or restarted, its local cache is empty, and if it happens to hit a storm of requests with mass cache misses, things blow up, right? Do you apply any mechanism to know the pod is ready before it receives traffic from the load balancer? Also, while pulling from Redis to sync the cache, if an update event arrives, how is the processing order prioritized so that data does not go stale?

**A:**

- There are many ways to implement this in practice
- As you said, it is a thundering herd (loosely translated: "lightning strike of love" in Vietnamese wordplay). Golang has a mechanism called singleflight, and other languages have equivalents, such as Java's synchronized functions
- When a pod starts and we want to load the cache, we wait on its health check until the build finishes before sending traffic in
- A smarter approach is to build a zhash scoring to decide what to add to the cache when a new pod starts

**Q:** Do you use a single Redis or a Redis cluster? Redis is not really safe for pub/sub; it should only be used when your data is not too critical. If you use Redis this way, why not use Redis's Master-Slave model? Data from the gateway could be written straight to the Master, or pushed into Kafka, then a Writer writes to the Master and it syncs to the Slaves, and Readers only read from the Slaves, with no need to implement a local cache on top.

**A:** You are right too -> but it cannot be as fast as the demo that way. What the demo shows is low cost while still hitting 1M req/s.

**Q:** Using Redis as pubsub will become a system bottleneck if write traffic increases. Second, I haven't seen any mention of a cache warm-up mechanism when initializing new pods; what about peak time, when a mass scale-up may be needed? Next is the cache data size: if the data is large, keeping all of it in every pod raises costs considerably when scaling, and warm-up also takes time; otherwise traffic gets pushed back to the backup store, Redis, which itself is not efficient with very large data sizes and needs sharding.

**A:**

- You are right. The demo post uses a low-spec, single-instance Redis configuration
- Building a smart cache depends heavily on each service's problem, and nobody caches all data in the cache
- Example: when this post is delivered to you, the moment the notification arrives its cache is already there to serve you

### IO-bound Reduction

**Q:** Item 2 mentions eliminating cpu-bound and io-bound. Boss, how exactly does this reduce io-bound?

**A:**

- A simple example: if you create an API that calls Redis and returns immediately, it takes roughly <5ms, right?
- But when benchmarked at around 1k CCU, its p99 will be ~50ms
- Why the difference? The answer is partly IO-bound
- When too many requests are waiting for Redis responses while the processing threads of a pod (the instance node running the API) are limited, for example only able to handle 200 while the other 800 have to wait
- Note: Redis is still very fast, while the pod's resources are limited

### Redis Pub/Sub Failure Handling

**Q:** I have a question: when using Redis pub/sub, if Redis has an issue and cannot publish events, causing data loss and other pods unable to listen, is there any way to fix it?

**A:**

- If the producer side cannot send, there is nothing to discuss
- What matters is when a message has been sent but some consumer pod is not ready to listen at that moment; that message is effectively lost
- To solve this, you can look into Redis Stream

**Q:** I think once the connection to Redis is lost, everything fails anyway. So it is more reasonable to prepare what the fallback is. For example, in my demo I call back into Redis to fetch the data.

**A:**

- Realistically, when running on AWS we set up uptime monitoring + alerts, but it rarely fails
- It is like a LAN; if it fails, the instance hosting that Redis fails because:
  1. It is getting hammered too hard
  2. The OS hosting it was auto-restarted for an update
- Still, you must understand its weaknesses (trade-offs) to prepare a plan:
  - If Redis is down, the pod/node hosting your API service goes down with it and no longer serves clients
  - Or, if it keeps serving, it retries connecting to Redis after, say, 1s
  - Or, if the local cache misses, it additionally calls Redis to fetch the data

**Q:** Your fallback is one approach. But when Redis is not completely dead and is instead gasping, many much harder cases arise.

**A:**

- It is a trade-off. If you don't want it gasping, you have to run multiple nodes that back each other up
- The trade-off here is just money
- However, our system runs at 1M+ req/s on AWS and has not shown the gasping behavior you describe

### Architecture Overview

**Flow:**

```
Seller posts a product
↓
Write Service
(converts data to bytes)
↓
Redis Pub/Sub
(broadcasts to everyone)
↓
┌─────┬─────┬─────┐
│Pod 1│Pod 2│Pod 3│ ← Each pod stores it in its own RAM
└─────┴─────┴─────┘
↓
Buyer views the product
(served straight from RAM, no DB/Redis)
```

**Explanation:**

- **Write Service:** When a seller posts a product, the Write Service serializes the object into bytes and publishes an event to Redis Pub/Sub
- **Redis Pub/Sub:** Broadcasts the event to all Reader Pods
- **Reader Pods:** Each pod receives the event and updates the local cache in its own RAM
- **Read Request:** When a buyer views a product, the request is handled by a Reader Pod, which gets data directly from RAM (no DB/Redis)

**Fallback Mechanism:**

- If the data is not in RAM (cache miss), the fallback calls Redis to fetch it
- This fallback is prone to a **thundering herd** (many requests miss the cache at once and all call Redis)
- Solution: use the **singleflight pattern** (in Go) or an equivalent in other languages (for example, synchronized functions in Java) so that only one request actually calls Redis while the others wait for its result

> **See also:** [In Memory Cache Best Practices](/Technology/Backend And Database/Practices/Distributed Cache/In Memory Cache Best Practices) · [1M RPS Voucher System](/Technology/Backend And Database/Practices/1M RPS Voucher System)
