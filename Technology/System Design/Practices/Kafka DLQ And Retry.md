---
area: technology
domain: kafka
type: note
title: Kafka DLQ And Retry
description: Notes from a Golang Vietnam thread on Kafka consumer DLQ and retry design, covering which errors to retry, where delay lives, when to replay or drop, ordering, backpressure, and delivery semantics.
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - kafka
  - dlq
  - retry
resource: https://www.facebook.com/groups/golang.org.vn/posts/4197137210508787/
---

# Kafka DLQ And Retry

> **Source**: [Golang Vietnam, 10/04/2026](https://www.facebook.com/groups/golang.org.vn/posts/4197137210508787/). The asker posted anonymously. The thread has 29 comments; only the technical ones are kept below. Comments that only praised or only said "noted" were dropped.
>
> Follows the same backoff thread as [Retry And Circuit Breaker](/Technology/System Design/Practices/System Design Notes/Retry And Circuit Breaker).

Kafka has no built-in DLQ for ordinary consumers. The application **copies** the record to another topic itself (the Kafka community often calls it a dead letter topic, DLT), then commits the offset on the original topic. The record isn't "moved". If publishing to the DLQ fails after the offset was committed, the record vanishes. The commit must come after a durable write to the DLQ or to some other holding place.

## The Question in the Thread

When a consumer hits a message it can't process, it pushes it to a DLQ. Then what? How many retries, what backoff, a retry topic or something else?

The asker added details about their system: the errors are mostly lost database connections, registry errors, and connection pool exhaustion. They retry in memory a few times, then push to the DLQ, and nothing reads the DLQ yet. It's event tracking, about 100,000 messages/hour (an average of about 28 messages/second). Old events can lose their value. They are also stuck on message ordering.

## Which Errors to Retry

Separate them before counting attempts:

- Transient errors: timeout, connection refused, exhausted pool, a momentary registry blip. These go away once the downstream recovers. Retry with a budget.
- Persistent errors: wrong schema, failed validation, business-rule violations (an invalid amount, a payload that can't be parsed because of a bug). Retrying verbatim fails the same way.

Tùng Nguyễn calls the second group a skip queue: take it off the main path and keep it aside to examine why it failed. The message bytes must be preserved. If you delete it outright, then even after fixing the parser the next day there is nothing left to rerun.

Cong Nguyen pasted an answer explicitly labeled "opus answered". The parts of it that hold up: deserialization and validation errors go to the DLQ immediately; only timeout and connection refused are retried; the DLQ record's headers keep the original topic, partition, offset, failure reason, retry count, and timestamp. The figure "3–5 attempts, exponential backoff with jitter" is a commonly used budget, not a Kafka constant. That answer also noted that Go clients (Sarama, kafka-go, confluent-kafka-go) have to build this path themselves, while Spring Kafka ships with retry topics and a dead-letter publisher.

## Delay Does Not Belong in the Main Consumer's Poll Loop

Kafka doesn't schedule individual messages. To wait 1s, 30s, or 5 minutes, publish to a retry topic (one topic per tier, or one topic with a due-at timestamp) and commit the original offset so the main consumer moves on.

The Opus answer said the retry consumer checks the timestamp and then `pause`s/`sleep`s until it's due. A `sleep` inside the poll loop holds the whole partition: every record behind it on that partition waits too, including healthy ones. With per-key ordering (ordered → shipped → delivered), one stuck message blocks the later steps of that same key. The way to keep the delay without blocking the main path is a retry-topic consumer, or a scheduler, that reads exactly its own delay tier.

Three in-process retries (Nguyễn Trung with a payment-speaker callback; Phúc Mars after pulling messages into an internal queue) only survive as long as the process does. If the process dies after the offset was committed, the in-RAM retry is lost. That budget is valid for a blip within a single handling attempt; attempts after a restart must re-read from Kafka or from the DLQ.

## Replay Is a Decision

Nguyễn Trung (a bank, with a speaker callback that reads out amounts): after 3 failures on the main flow the message goes to the DLQ. A 15-minute job healthchecks the callback, and when it's healthy it consumes the whole DLQ and fires again. The healthcheck is only right for the class "callback is down". 4xx errors, oversized payloads, and wrong fields will fail again identically. Attach the error class to the header and only auto-replay the outage class.

In the same speaker example: the callback dies during the day and comes back at night, then the job drains the DLQ and the speaker blares in the middle of the night. For side effects the user can see, a late replay is a product bug. In that case, record it and give operators a screen. Expired event-tracking data should drop the old events, not replay them to the end.

Automatically pushing the DLQ back to the main topic and failing again into the DLQ is a retry storm. Nguyễn Trung described the assumption "only about 5% fail" collapsing on the day the rate hits 90%: each replay round multiplies the load on exactly the thing that is dying. Stop when the budget runs out. A lot of messages in the DLQ is a sign that the producing system is sick, not a sign the DLQ consumer needs to run faster.

Phúc Mars: an admin decides whether to retry, and if so, into a dedicated retry topic. Their path is to consume, push into an in-process channel, batch, retry 3 times, then DLQ. The point to pin down in that design is when to commit the offset: commit after the batch is already somewhere durable.

## Ordering

An order's state (ordered, shipped, delivered) shares one key. If you drop a message in the middle and let later ones through, the state is wrong. Tùng Nguyễn says you can skip messages in the DLQ when exact order is needed. The cost is losing a state transition. There are two options that keep the message: hold that specific key until the gap can be patched, or move that key alone to a waiting lane. Holding the whole partition is only worthwhile when one partition equals one key.

## Backpressure and Semantics

Duc Anh Nguyen, replying under the Opus answer: when the app or database is congested, reduce the batch size, and increase it again when the system is healthy. This masks a slow downstream (which fits the exhausted pool and dead database the asker is hitting). It doesn't classify poison messages. A circuit that stops consuming until the pool recovers is still better than firing 100,000 messages/hour at an already exhausted pool.

The same reply mentioned at-least-once versus exactly-once. A Kafka consumer is at-least-once by default: commit only after processing, so a crash in the middle means re-reading. Exactly-once means a transactional producer plus a `read_committed` consumer on the consume-transform-produce path, not a flag named "exactly one". Replaying the speaker callback could announce twice. Replaying a counting event could count twice. The handler and the replay path must be idempotent with respect to that specific business logic.

## When There Is No Spec Yet

Nguyễn Trung: if there are no business rules yet, store the messages in a DB looked up by key, keep them for a few days, with no long retention and no replay logic yet. That's a parking spot, not a retry design. A DLQ is still a store: retention, ACLs, and a common envelope (service name, protocol, error code, id) so multiple teams can read it. Large or sensitive payloads are better kept in a controlled DLQ than spilled in full into logs.

## What to Do for the Asker's Case

For database, registry, and pool errors: retry with backoff and a cap, reduce the batch when the pool is exhausted, and commit only after processing has finished or the record has been durably written to the DLQ. Expired event-tracking data: drop it rather than feed it into the replay loop. Out-of-order messages per key: isolate the key rather than skip one and process the following step. The DLQ needs somewhere to be read (depth alerts, header inspection, manual replay or drop); otherwise it's just a place where records fall and sit silent.

> **See also:** [Retry And Circuit Breaker](/Technology/System Design/Practices/System Design Notes/Retry And Circuit Breaker) · [Outbox Pattern](/Technology/System Design/Practices/Outbox Pattern) · [Hedged Request](/Technology/System Design/Practices/Hedged Request)
