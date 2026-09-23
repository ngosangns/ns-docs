---
area: technology
domain: interview
type: cheatsheet
title: Top 10 System Design And Microservices Questions
description: Ten common system design and microservices interview questions with hints on what to clarify and how to structure an answer.
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - interview
  - system-design
  - microservices
---

# Top 10 System Design And Microservices Questions

**Note**: The questions and hints are for reference only; build your own complete answers.

## System Design

### CAP Theorem

- **How to present**: See a YouTube video
- **Note**: Learn the difference between Consistency in CAP and Consistency in ACID

### Slow Queries on a Large Table

- **Approach**: Clarify what the data means and how large the table is
- **How to present**: Go from simple to complex

### Design a TinyURL System

- **Common question**: Answers vary widely
- **Points to clarify**:
  - Length of the short URL
  - Whether duplicate checking is required (does the same URL submitted multiple times return the same short URL?)
  - Which DB to use
  - How to handle collisions

## Microservices

### Compare Monolithic and Microservices

- **Hint**: Name the factors that drive each advantage and disadvantage

### Why Split the Services This Way?

- **Hard question**: Many candidates mention Domain-Driven Design
- **Note**: You need to understand the business and how to model it

### Service X Goes Down While Processing an Order

- **Approach**: Make sure the order continues executing when service X comes back up
- **Hint**: Use a message queue that can persist messages

### Service A Needs User Data from Service B (Different Schema)

- **Approach**: Depends on the consistency and data-correctness requirements
- **Solutions**: An adapter layer, or syncing data from B to A
- **Note**: Check the real data in prod and non-prod; don't rely entirely on documentation

### Frontend Sends an Order Request Through the API Gateway

- **Flow**: Frontend → API Gateway → Service A → Message Queue → Service B
- **Problem**: How do you return the response to the frontend?
- **Hint**: There are many ways; evaluate performance and scalability

### High p(95) Response Time

- **Causes**: Review the flow design, especially the points that talk to third parties
- **Process**: Use monitoring and distributed tracing to locate the issue
- **Solutions**: Optimize code and queries, and allocate more resources to the service

## Other

### The Hardest Technical Problem You Have Faced

- **Frequently asked**: Prepare carefully
- **Hint**: Pick and thoroughly prepare your 3 hardest problems
- **Note**: The complexity should match your current level or the level you are aiming for

> **See also:** [Interview Senior Engineer](/Technology/Career/Practices/Interview Senior Engineer) · [Interview Notes](/Technology/Career/Concepts/Interview Notes)
