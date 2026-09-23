---
area: technology
domain: design-patterns
type: guide
title: External Configuration Store Pattern
description: Explains moving configuration out of the deployment package into a centralized store to avoid redeploys and share settings, with Azure App Configuration and Key Vault options.
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - design-patterns
  - azure
  - configuration
resource: https://learn.microsoft.com/en-us/azure/architecture/patterns/external-configuration-store
---

# External Configuration Store Pattern

This pattern moves configuration information out of the application deployment package into a centralized location. This makes configuration data easier to manage and control, and lets configuration be shared across multiple applications or application versions.

## Context and Problem

Most applications store configuration in files that ship with the deployment. This approach has several problems:

- **Downtime:** Every configuration change usually forces you to redeploy the application, causing unnecessary service interruption.
- **Hard to share:** Local configuration files are limited to a single application, making it hard to share common settings (such as connection strings and queue URLs) across related services.
- **Complex management:** It is very hard to synchronize configuration changes across many running instances, so instances end up using different settings during an update.
- **Lack of versioning:** Many configuration systems don't support managing multiple configuration versions for different environments (dev, staging, production) out of the box.

## Solution

Store configuration in an external store and provide an interface to read and update it quickly.

- **Storage:** Can be a cloud storage service, a database, or a dedicated configuration service.
- **Access:** The application reads configuration at startup and usually caches it to optimize performance.
- **Change notification:** The system can notify the application when configuration changes so it updates automatically without a restart.

## Issues and Considerations

- **Performance and availability:** Choose a store with good performance and high availability. Use caching in the application to reduce latency and to handle the case where the configuration store is temporarily unreachable.
- **Versioning:** Design the schema to support multiple configuration versions per environment or per release.
- **Security:** Protect configuration data from unauthorized access. Clearly separate read and write permissions. Encrypt sensitive information (such as passwords and API keys).
- **Fallback:** Ship the application with a fallback set of configuration (last known good values) to use if the external configuration system fails while the application is starting up.

## When to Use This Pattern

- When you need to share configuration among multiple applications and instances.
- When you want to change application behavior at runtime without redeploying or restarting.
- When you need a centralized configuration management system to simplify administration and monitoring.
- When you need to support complex data types (images, documents) that standard configuration systems don't handle.

## When Not to Use This Pattern

- Simple applications whose configuration rarely changes.
- When depending on an external service adds too much risk to the application's availability.

## Solutions on Azure

### A. Azure App Configuration

This is Azure's dedicated service for this pattern:

- Supports namespaced key-values.
- Includes **Feature Management** (feature flags).
- Supports snapshots so configuration can be rolled back easily.
- Integrates out of the box with .NET, Java Spring, Python, and JavaScript libraries.

### B. Azure Key Vault

Often used alongside it to store secure configuration (secrets, certificates), while Azure App Configuration stores ordinary configuration.

---

_Source: [Azure Architecture Center - External Configuration Store pattern](https://learn.microsoft.com/en-us/azure/architecture/patterns/external-configuration-store)_

> **See also:** [Edge Workload Configuration Pattern](/Technology/System Design/Practices/Azure Design Patterns/Edge Workload Configuration Pattern) · [Valet Key Pattern](/Technology/System Design/Practices/Azure Design Patterns/Valet Key Pattern) · [Cache Aside Pattern](/Technology/System Design/Practices/Azure Design Patterns/Cache Aside Pattern)
