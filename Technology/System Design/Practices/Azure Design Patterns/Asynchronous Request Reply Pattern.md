---
area: technology
domain: design-patterns
type: guide
title: Asynchronous Request Reply Pattern
description: Explains how to decouple long-running backend processing from the frontend using HTTP 202 and a polling status endpoint, with an Azure Functions implementation outline.
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - design-patterns
  - azure
  - async
  - http
resource: https://learn.microsoft.com/en-us/azure/architecture/patterns/async-request-reply
---

# Asynchronous Request Reply Pattern

This pattern decouples backend processing from the frontend host. It is used when the backend must handle time-consuming (asynchronous) work, but the frontend still needs a clear and timely response about the status of the request.

## Context and Problem

In modern application development, APIs are usually designed to respond quickly (under 100 ms). However, some backend tasks can run for a long time (seconds, minutes, or hours).

- Making the client wait on a synchronous connection for that long is impractical (it causes timeouts and ties up resources).
- The client needs a mechanism to know that the request was received and to check the result later.

## Solution (Using HTTP Polling)

Instead of holding the connection open, the API responds immediately to acknowledge the request and provides a way to check its status:

1.  **Submit the request:** The client sends a synchronous request to the API.
2.  **Respond immediately:** The API validates the request and responds with **HTTP 202 (Accepted)**.
3.  **Status endpoint:** The response contains a `Location` header pointing to a URL the client can poll to check the result.
4.  **Backend processing:** The API pushes the work onto a queue or a backend processor to run in the background.
5.  **Status checks (polling):**
    - While processing: return **HTTP 200 (OK)** with "in progress" information.
    - When complete: return **HTTP 302 (Found)** or **303 (See Other)** to redirect to the final result, or return a success code (**200, 201, 204**).

## Key Elements of the HTTP 202 Response

| Header          | Description                                                                                            |
| :-------------- | :----------------------------------------------------------------------------------------------------- |
| **Location**    | The URL the client polls for status (the status endpoint).                                             |
| **Retry-After** | An estimate of how long the client should wait before polling again (to avoid overloading the server). |

## Issues and Considerations

- **Client complexity:** The client needs logic to poll and to handle the different status codes.
- **Cancellation:** Consider a mechanism that lets the client cancel a long-running task.
- **Data safety:** The URL in `Location` may need to be secured (for example, with a SAS token / Valet Key).
- **Streaming:** This pattern is not suitable if data must be streamed in real time.

## When to Use This Pattern

- Client-side code (such as a browser) can hardly provide a callback endpoint (webhook), or you don't want the complexity of WebSockets.
- Only the HTTP protocol is available and callbacks can't be fired because of firewall restrictions.
- You are integrating with legacy systems that don't support modern technologies such as WebSockets.

## Implementation Example (Azure Functions)

A typical solution consists of three functions:

1.  **AsyncProcessingWorkAcceptor:** Accepts the request, pushes it to Service Bus, and returns 202 with the status URL.
2.  **AsyncProcessingBackgroundWorker:** Picks up the message from the queue, does the actual processing, and writes the result to Blob Storage.
3.  **AsyncOperationStatusChecker:** Checks whether the result already exists in Blob Storage in order to respond to the client.

## Well-Architected Framework Alignment

- **Performance Efficiency:** Decoupling maximizes concurrency on the server and lets work be scheduled according to available processing capacity, making the system more scalable.

---

_Source: [Azure Architecture Center - Asynchronous Request-Reply pattern](https://learn.microsoft.com/en-us/azure/architecture/patterns/async-request-reply)_

> **See also:** [Queue Based Load Leveling Pattern](/Technology/System Design/Practices/Azure Design Patterns/Queue Based Load Leveling Pattern) · [Valet Key Pattern](/Technology/System Design/Practices/Azure Design Patterns/Valet Key Pattern) · [Competing Consumers Pattern](/Technology/System Design/Practices/Azure Design Patterns/Competing Consumers Pattern)
