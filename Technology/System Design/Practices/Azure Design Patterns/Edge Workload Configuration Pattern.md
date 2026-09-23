---
area: technology
domain: design-patterns
type: guide
title: Edge Workload Configuration Pattern
description: Describes how to manage and distribute configuration to edge workloads that must keep running offline, comparing an external configuration controller with an internal configuration provider.
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - design-patterns
  - azure
  - edge
  - iot
  - configuration
resource: https://learn.microsoft.com/en-us/azure/architecture/patterns/edge-workload-configuration
---

# Edge Workload Configuration Pattern

This pattern addresses the challenge of managing and distributing configuration for applications running at the edge, where there is great diversity in devices and protocols and a need to keep operating even when the cloud connection is lost.

## Context and Problem

In industrial digital transformation, manufacturing companies often build reusable software solutions. On the shop floor, however:

- There are many different kinds of devices and systems, requiring different configurations of protocols, drivers, and data formats.
- Sometimes multiple instances of the same workload run with different configurations at the same site.
- Configuration can change frequently (many times a day) without you wanting to redeploy the entire software.

## Characteristics of Edge Configuration

- **Layered configuration:** Configuration can come from multiple sources such as source code, the CI/CD pipeline, the cloud tenant, or configuration specific to the edge location.
- **Offline access:** To ensure business continuity, configuration must be accessible at the edge even without an internet connection.
- **Tracking and auditing:** Every configuration change needs to be closely tracked for troubleshooting and compliance.

## Solution Variants

### A. External Configuration Controller

A configuration controller sits outside the main workload.

- **How it works:** A cloud controller pushes configuration down to the edge controller, which then applies it to the workload.
- **Benefits:** The workload doesn't need to know about the configuration system (suited to packaged/third-party software). Configuration for multiple workloads can be changed at once.

### B. Internal Configuration Provider

The workload actively pulls configuration from a provider.

- **How it works:** The workload uses a unique ID to request the configuration that matches its environment.
- **Benefits:** Fewer intermediary components, which simplifies the architecture if you control the workload's source code.

## Issues and Considerations

- **Offline editing complexity:** Allowing configuration edits at the edge while the cloud connection is down adds significant complexity (user authentication, conflict resolution on reconnect).
- **History storage:** Store old configuration versions in the cloud so you can roll back when a new configuration causes errors.
- **Tie-in with observability:** Configuration changes should be recorded in the monitoring system to help operators correlate system faults with configuration changes.
- **Size limits:** If you use technologies such as the IoT Edge Module Twin, be aware of data size limits (typically 32 KB). For large configurations, use Blob Storage or split the data.

## When to Use This Pattern

- When you need to configure workloads outside the software release cycle.
- When multiple parties (developers, ops, factory managers) need to read and update configuration.
- When configuration must be available even when the cloud connection is lost.

## Implementation Examples on Azure

- **Azure IoT Edge:** Uses **Module Twins** to push and receive configuration.
- **Azure IoT Hub:** Acts as the central cloud configuration controller.
- **Azure Cosmos DB:** Stores configuration history and state for thousands of edge devices.
- **Azure Blob Storage:** Stores large configuration files or complex machine learning models that must be distributed to the edge.

---

_Source: [Azure Architecture Center - Edge Workload Configuration pattern](https://learn.microsoft.com/en-us/azure/architecture/patterns/edge-workload-configuration)_

> **See also:** [External Configuration Store Pattern](/Technology/System Design/Practices/Azure Design Patterns/External Configuration Store Pattern) · [Sidecar Pattern](/Technology/System Design/Practices/Azure Design Patterns/Sidecar Pattern)
