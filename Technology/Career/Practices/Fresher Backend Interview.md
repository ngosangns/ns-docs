---
area: technology
domain: interview
type: case-study
title: Fresher Backend Interview
description: Questions from a fresher backend interview at a unicorn product company, covering Java, data structures, Firebase, networking, and concurrency.
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - interview
  - backend
  - java
---

# Fresher Backend Interview

**Unicorn product company, interview conducted in Vietnamese with a backend tech lead and an HR manager (1h40m).** This note lists the questions from that session, grouped by topic. It opens with OOP and Java core, covering polymorphism, pass-by-value against pass-by-reference, and int against Integer. Data structures follow with dynamic arrays and singly linked lists. The project section covers whiteboard diagrams, Next.js, and servlets, including the questions the author could not answer. Later sections cover Firebase Realtime Database and Google Provider, Redux against LocalStorage, WebSocket against HTTP, React Native, and a concurrency exercise about a thread pool for 1000 requests. Read it as a question bank. Try each answer aloud before you check the bullets.

## OOP & Java Core

- **Polymorphism**: Explain it → interface
- **Pass-by-value vs pass-by-reference in Java**: Java has no pass-by-reference; give an example and the printed result
- **int vs Integer**: Compare them, and where each is stored in memory

## Data Structures

- **Dynamic array vs singly linked list**:
  - Storage mechanism
  - Performance: retrieve, add, delete, search
  - Why lookup by index is faster than in a linked list: the element at an index is computed from the stored byte address instead of being traversed

## Project

- **How it works**: Draw diagrams of the apps you built on a whiteboard; they keep asking until you get stuck, then skip
- **Next.js**: Server-side mechanism (could not answer)
- **Servlet**: (could not answer)

## Firebase

- **Firebase Realtime Database**:
  - Based on a JSON tree data structure; each node is a reference, and each reference holds key-value pairs
  - Communicates through the Firebase SDK or libraries
  - Connects via websocket or HTTP long polling
- **Firebase Google Provider**:
  - Sends a request to the provider with the app ID, permission scopes, and parameters
  - Generates an authentication token based on the selected account
  - Calls the APIs related to the provider

## State Management

- **Redux vs LocalStorage**:
  - Redux stores both the store and the application context
  - LocalStorage stores only data

## Networking

- **WebSocket**: How it works, compared with HTTP

## Mobile

- **React Native**: How devices receive the transmitted data, and by what means

## Concurrency

- **Java concurrency**:
  - Design a thread pool for 1000 requests
  - What to do when a redeploy brings a 1001st request
  - How to handle the data and how to deal with losses

> **See also:** [Fresher Java Interview](/Technology/Career/Resources/Fresher Java Interview) · [Interview Questions](/Technology/Career/Resources/Interview Questions)
