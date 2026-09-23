---
area: technology
domain: security
type: guide
title: Valet Key Pattern
description: Give clients a short-lived, scoped token for direct access to a storage resource so data transfer bypasses the application server.
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - security
  - storage
  - azure
  - cloud-design-patterns
resource: https://learn.microsoft.com/en-us/azure/architecture/patterns/valet-key
---

# Valet Key Pattern

## Summary

The Valet Key pattern uses a token that gives the client direct but restricted access to a specific resource (such as a file in a storage service or a queue). This offloads data transfer from the application server, optimizes cost, and maximizes scalability.

## Key Points

- **Purpose**:
  - Minimize the consumption of compute resources (CPU, RAM, bandwidth) on the application server when handling large files.
  - Let clients upload/download data directly to and from storage while still keeping it secure.
- **How it works**:
  1. The client sends an access request to the main application.
  2. The main application authenticates the request and generates a **Valet Key** (for example: a Shared Access Signature, SAS, in Azure).
  3. The token carries restrictions on: **time** (short validity), **scope** (only one specific file/container), and **permissions** (read-only, write-only, or create-only).
  4. The client uses this token to operate directly against the storage service.
- **Benefits**:
  - **Better performance**: Removes the application server as an intermediary (proxy) step.
  - **Cost optimization**: Reduces the number of server instances needed to handle the data flow.
  - **Security**: No need to share the storage's long-term credentials with the client application.

## Considerations

- **Validity period**: Keep the token's expiry as short as possible to minimize risk if the token leaks.
- **Least privilege**: Grant only the permissions that are truly needed (for example: allow only `Create` to avoid overwriting existing files).
- **Data validation**: Because data is pushed directly to storage, the application server needs a way to validate or virus-scan it after the upload completes.
- **Secure communication**: Always distribute the token over HTTPS.

## When to Use

- When the application must handle a large volume of file upload or download operations.
- When you want to optimize bandwidth and cost for large files.
- When the application runs in environments with limited compute resources.

## Examples

- **Azure Storage SAS**: Generate a SAS token for Blob Storage so users can upload images directly from the browser.
- **Service Bus SAS**: Grant an IoT device permission to send messages to one specific Topic.

## Relationships

- **Gatekeeper Pattern**: Can be combined to act as an intermediate protection layer that authenticates requests before a Valet Key is issued.
- **Static Content Hosting Pattern**: Uses the Valet Key to protect static content that should not be fully public.

## References

- [Microsoft Learn - Valet Key Pattern](https://learn.microsoft.com/en-us/azure/architecture/patterns/valet-key)

> **See also:** [Static Content Hosting Pattern](/Technology/System Design/Practices/Azure Design Patterns/Static Content Hosting Pattern) · [Gatekeeper Pattern](/Technology/System Design/Practices/Azure Design Patterns/Gatekeeper Pattern) · [Claim Check Pattern](/Technology/System Design/Practices/Azure Design Patterns/Claim Check Pattern)
