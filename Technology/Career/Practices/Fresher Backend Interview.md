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

**Unicorn product company - interview conducted in Vietnamese with a backend tech lead and an HR manager (1h40m)**

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
