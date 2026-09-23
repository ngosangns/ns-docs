---
area: technology
domain: distributed-cache
type: case-study
title: 1M RPS Voucher System
description: Case study of issuing vouchers at 1M req/s by pre-distributing them into pod RAM, with the trade-offs and the comment Q&A on fraud, Redis HA, and history.
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - distributed-cache
  - voucher
  - redis
  - golang
resource: https://www.facebook.com/groups/sydexa/posts/2257228024767400/
---

# 1M RPS Voucher System

> **Source**: [1M Write/s: Kiến Trúc 5$/h deploy aws@sing](https://www.facebook.com/groups/sydexa/posts/2257228024767400/) — Khúc Ngọc Huy, Vietnam System Design Community, 2026-02-22. POC: [heavy-write-api](https://github.com/huykn/distributed-cache/tree/main/examples/heavy-write-api/poc).
>
> Follows the same thread as distributed cache for heavy-read workloads (see [Overview And Architecture](/Technology/Backend And Database/Practices/Distributed Cache/Overview And Architecture)). The Q&A part comes from all expanded comments (sorted by Newest, including replies). Facebook counted 45 comments; the praise has been dropped.

## The Problem

New Year's Eve 2017–2018, issuing vouchers for a marketing event. The constraints the author set:

- 1M req/s across 20 pods (50k req/s per pod), roughly 50 million active users
- `/spin` P99 under 5ms
- Each voucher is issued only once
- A pod restart does not lose state; a dead pod is detected and another pod takes over its range within about a minute
- Per-user spin history

The Redis Cluster / DynamoDB / serverless quotes the team heard were about USD 100k/month. The version the author built for that night is described as about USD 5/hour of additional cost: 20 pods + 1 worker on Kubernetes, 1 Redis, 1 MySQL, Singapore region. The author calls this a "scrappy" version, built because it was overlooked in the sizing meeting, and says that today he would spend more to be safer. The public code is a port from Java to Go, and the author says it still has bugs.

The USD 5/hour figure is the cost the author computed for exactly that cluster over the few hours of the event, not a full production bill (control plane, NAT, egress, multi-AZ, on-call staff).

## Ideas That Hold Up

The hot path must not write to the database. 1M durable writes per second, one voucher each, is not a problem for a single Redis or a single MySQL. The approach is to invert the workload before the peak:

1. A worker (a single instance, not on the hot path) reads vouchers from MySQL, pre-encodes them into bytes, packs them, pushes them into Redis, and then publishes each pack to each pod's own channel.
2. Each pod holds only a disjoint ID range. Pod 0 holds `[1, 500k]`, pod 1 holds `[500001, 1M]`, and later pods follow by `podIndex`. With 500k IDs per pod and 20 pods, the inventory is 10M rows, matching the POC README. No distributed lock is needed to prevent two pods from issuing the same code, because the ranges do not overlap.
3. `/spin` only does `atomic.AddInt64` to get the next index, then reads the `atomic.Value` already in RAM. Since indexes differ, two goroutines never receive the same slot. When that minute's range runs out it returns empty; the client understands to wait for the next minute, rather than receiving a 429.
4. Spin history writes are batched in RAM and flushed in bulk. Redis pressure drops from one write per spin to about a few hundred writes per second per pod. The article says batch 1000; the README says flush every second or every 100 items. Both describe the same idea: no write-per-spin.
5. Redeem is separate from spin. `/spin` returns a code. If the code is marked as a winner, the client calls `/claim`. Only `/claim` checks Redis to see whether the code has already been claimed, and then records it. This is the eventual consistency point, not strong proof at spin time.
6. Surviving pod loss: a pod writes a heartbeat about every 2 seconds into a fixed Redis slot. After 10 seconds of silence the worker marks it dead. A new pod takes the same index, reads the checkpoint (minute index, fragments, counter) from Redis, and continues serving. A deliberate shutdown must drain the claim queue and only then save state. Dũng Nguyễn's comment describes exactly this flow; Sơn Hoàng's comment is right on the Redis side: sentinel or cluster for Redis HA, and losing an entire DC is a different problem.

Round-robin load balancing is still fine if vouchers are fungible: any user can win a code from any pod. Per-user history lives in Redis, not in the pod.

## Mechanisms Worth Keeping

**Pack ID, not Snowflake.** The author calls this layout Snowflake because of an association with the Instagram Snowflake article (2017). The actual layout is a self-packed 64-bit number, encoded in Base36:

- bit 63: winning flag
- bits 31–62: voucher id, 32 bits, pointing back to the MySQL key
- bits 0–30: random PIN, 31 bits

`DecodeBase36` followed by bit shifting tells you whether the code was generated as a winning code, without reading MySQL for that step alone. The expression `(id >> 31) & 0xFFFFFFFF` extracts exactly the 32 id bits and does not pull in bit 63, since after shifting, bit 63 falls outside the 32-bit mask.

This flag does not prove the code has not been claimed, and it does not prevent forgery. Anyone who can modify bit 63 can create a bit-level "winning" code. The 31-bit PIN (about 2 billion values) is not a signature. At 1M req/s this space can be brute-forced if `/claim` has no per-user limit and does not check the code against the set of issued codes. Real uniqueness lies in two other places: non-overlapping ID ranges plus the atomic index at issue time, and the claim record in Redis at redemption time.

**A 60-minute array instead of a map with TTL.** `MinuteStores[time.Now().Minute()]` avoids the hashing and allocation of a `map`. Minute 59 wraps around to minute 0. The hard part, which the author confirms took a lot of time, is moving the unissued vouchers of minute `now-1` to a future minute and recording the broken ID segments (fragments) so they can be restored. NTP skew between pods shifts the minute buckets.

**A mutex is not what makes 50k req/s impossible.** If the critical section is just incrementing a number, a mutex can also handle 50k times per second. Atomics are still right for this hot path because there is no convoy and no lock is held while returning the HTTP response. The statement "a mutex lets only one goroutine be served at a time" is true only while the lock is held, not for the whole request.

## What Not to Take at Face Value

- The title "1M write/s" is a business framing. The implementation deliberately does not write on `/spin`. Comparing it with Alibaba's 11.11 payment peak of about 544k TPS (OceanBase, durable transactions with balances) compares two different workloads. The comment raising that record is a correct reminder: popping from RAM does not prove a payment system. See [OceanBase Alibaba Singles Day](/Technology/Backend And Database/Practices/OceanBase Alibaba Singles Day).
- "Zero I/O, zero serialization, near-zero GC, CPU under 1ms" is the goal of the pop segment. HTTP still allocates and still has network I/O. The POC README records the atomic-plus-parse CPU at about 100ns, while the article says per-spin CPU is under 1ms and P99 under 5ms. These numbers are what the author measured on the POC, not a load report from the New Year's Eve night. The article also says the 2017–2018 production ran with no downtime; that is a recollection, and the public code is a later port.
- The 1M req/s ceiling is a protocol ceiling: beyond it, return empty and the client comes back next minute. The README says `/spin` scales linearly with the number of pods (50k each) if the ranges and budget are re-divided. Adding pods without re-dividing the inventory and raising the ceiling does not increase the number of codes issued. The two statements do not contradict if you read the 1M ceiling as a product decision, not a limit of `atomic.AddInt64`.
- Memory. 10 minutes × 1M req/s = 600M spins; the article says only about 1M codes are winning codes, so about 600M codes must be generated to dilute them. The README, on the other hand, says the MySQL table has 10M rows and working RAM is about 1–6MB per pod. 50k codes × 20 bytes only gives 1MB; 50k req/s over one minute is 3 million codes, on the order of tens of MB per minute per pod if the bytes are kept as is. 600M codes are not held in RAM at once: the worker stuffs them in minute by minute. The README's 6MB figure does not match 50k req/s if a whole minute is held.
- The data-loss window when a pod dies midway. Index and history are durable only at the checkpoint cadence and bulk flush, not per spin. The author pins down the loss: on graceful shutdown the new pod reads the backed-up state, not MySQL; if it dies before it can save, it loses at most the range the worker delivered that the pod has not finished consuming, i.e. about 1 minute, 50k items. `/claim` can only patch codes that have reached Redis.
- Redis dies, the system dies. The public POC is a single Redis. In the 2018 version, the author told his boss he did not use sentinel: he split into several workers, each with its own Redis instance, so when an instance dies that range is lost while other instances keep issuing. Sentinel/cluster is Sơn Hoàng's suggestion, not a design that was run.
- Calling this design AP in CAP is only partly right. `/spin` prefers answering over durability. `/claim` depends on Redis. Do not use this pattern for charging money, reserving a single-slot seat, or any ledger that needs exactly-once at request time.

## Q&A from the Comments

### One User Getting Many Codes

Nguyễn Anh Bình and Ngô Toàn asked about the same hole: `/spin` only does `atomic.AddInt64` to pop, does not re-read history, and does not know whether this user has already spun. One user (or a swarm of fake users) calling continuously will drain the roughly 50k winning codes per minute of a pod. Through round-robin, the same user hitting 20 pods gets up to 20 codes.

The author confirms the hot path does not block this. A sliding-window rate limit hammering Redis at 1M req/s would force a big infrastructure launch. The approach that was used: treat requests on the hot path as not attackers, keep counters in each pod's RAM, batch and push to Kafka, let Apache Flink handle fraud, and then reclaim the vouchers into the pool to be reissued or discarded. This is a trade-off, not a mechanism for every scenario. For a `/spin` code that was returned but not yet written to Redis, the client calls `/claim` to re-check.

Ngô Toàn followed up: batch reclamation still lets others get their codes pulled away, and after a recall does the index have to move back to match the amount reclaimed? The author does not move the index back. Data and the decision belong to the issuing side: it can drop the reclaimed portion, or generate a new unfragmented pool and open an extended round.

Hung Pham suggested pinning a user to one pod at the load balancer using IP and HMAC. The author does not accept this approach; he points to the fraud pipeline in Bình's comment.

### `CurrentIdx` When Traffic Exceeds 50k/pod

Bình pointed out that `atomic.AddInt64` increments the index even when the spin cannot issue a code. 80k req/s for 60 seconds pushes the index to 4.8M while Total is only 3M, and he worried the counter drifting across minutes would make the pod lose vouchers until restart.

The author answers operationally, not in terms of the variable: the number of items popped per minute is fixed, excess requests get an empty response so the client tries next minute, and if you want to be safe, raise the pod count to 20+n instead of keeping 20. In the POC's model, each minute has a `MinuteStore` with its own `CurrentIdx`; migrating to the next minute resets the index of the destination store. This minute's index does not burn the next minute's inventory. What Bình worries about only happens if a single shared counter is used across all minutes. Neither the article nor the comments say that production in 2018 split the stores by minute exactly as in the POC.

### Redis or Pod Dies

GenuinePanda4255: this is allocating in advance and then reading RAM, trading HA for speed, and recovery is where the discussion should be.

The author: the backbone is Redis, and if Redis goes down the system goes down. In 2018 he said so, and he says today he would build it sturdier, at more cost. He has seen Redis slow and time out, but never seen Redis on AWS die outright; if power is lost there is nothing left to discuss. With the load computed in the article, he believes Redis does not die. The new pod does not go into MySQL to fetch data: it receives the backed-up state. Graceful shutdown handles the common case. The worst is a freeze before saving, losing at most one minute of delivered items, about 50k items. User history can be delayed; he disagrees with the framing that history loses data.

Panda pushed back on the limits of that approach: each pod has one range, and when a pod dies that range is dead until a new pod comes up, longer if it has to read the DB and write Redis; enabling active-active for the 20 pods helps but costs money; history never has integrity. Dũng Nguyễn described the POC correctly: Redis checkpoint, worker healthcheck, mark dead, new pod loads state. Sơn Hoàng: for Redis HA use sentinel or cluster, which still trades durability for speed, and losing a whole datacenter is another matter. The author repeated the 2018 answer he gave his boss: no sentinel, but multiple workers each with its own Redis. When one instance dies only that instance's range is lost.

### User History and P99

Sơn Hoàng: average latency drops, but P99 is tied to Redis and prone to bursts when flushes happen all at once on a time cadence. Issuing tokens is not hard; retrieving history is harder because the number of per-user keys is huge.

The author accepts that history is delayed. The hot path is spin, and history has few requests. Events deliberately stretch the scenario to throttle clients. The history key is a single `MSET` per user; use a sorted set if ordering is needed.

### Preload Lives in Pod RAM, Not Redis

Joseph Nguyen asked whether preload goes into Redis first, how long warm-up takes, and what happens when a pod dies.

The author: the solution is several parts added together, and preload is into RAM on each pod. When a pod dies, the map for that minute is back in no more than 60 seconds. He gave no warm-up time in minutes.

### Auth and Precomputed Rewards

ThrillingSeahorse5597 asked whether auth has to scale to this load, and whether rewards are precomputed so the user just fetches the result.

The author: both are true. Auth at this layer is a separate problem that he did not solve in the post. Rewards are indeed precomputed, and the user just receives a result that is already in place.

### 544k TPS and the Numbers

One comment brought up the Alipay/Alibaba 11.11 peak of about 544k TPS for comparison. The author only said that the two are different in nature. See [OceanBase Alibaba Singles Day](/Technology/Backend And Database/Practices/OceanBase Alibaba Singles Day): that 544k is a durable transaction with a balance, not a single pop from RAM.

Vo Minh Luan demanded traces by URI, requests over time, and p95/p99 before he would believe it. The author said he is sharing, not proving; the POC code is public. The 1M req/s and P99 figures in the post are therefore still the author's own numbers, with no dashboard attached.

The question "where is the race condition" was not explained by the author. The real race is not in `atomic.AddInt64` (each goroutine gets its own index). It lies in the gap between when the code has been returned and when the batch reaches Redis, and in the absence of a per-user lock on the hot path.

## When to Use It

Use it when the issued goods are generated in advance, each code is issued exactly once, answering within a few milliseconds matters more than updating the ledger within the same request, and the client can tolerate "sold out, try next minute".

Do not use it when each request is a transaction that cannot be replayed, when codes must be unguessable, or when losing a pod must not allow re-issuing a code already given to a user. Those cases need a durable conditional write on the claim path (a `SET` that succeeds only if the key does not exist yet), and the hot path may only return the code after that record exists. The USD 5/hour version deliberately does not do that step on `/spin`.

> **See also:** [OceanBase Alibaba Singles Day](/Technology/Backend And Database/Practices/OceanBase Alibaba Singles Day) · [1M CCU System Optimization](/Technology/Backend And Database/Practices/1M CCU System Optimization)
