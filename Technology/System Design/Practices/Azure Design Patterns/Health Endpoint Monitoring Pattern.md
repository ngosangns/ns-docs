---
area: technology
domain: design-patterns
type: guide
title: Health Endpoint Monitoring Pattern
description: Explains exposing application health-check endpoints that external monitoring tools poll to verify dependencies, response codes, and latency, plus security and caching considerations.
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - design-patterns
  - azure
  - monitoring
  - observability
resource: https://learn.microsoft.com/en-us/azure/architecture/patterns/health-endpoint-monitoring
---

# Health Endpoint Monitoring Pattern

This pattern uses functional checks inside the application, exposed through endpoints that external tools can access, to verify that applications and services are running normally.

## Summary

- **How it works:** The application exposes an endpoint (for example, `/health`) that performs internal checks and returns a status code (HTTP status code) along with detailed information about the system's health.
- **Components checked:**
  - Connectivity and response time of the database or cloud storage.
  - Status of external services or resources the application depends on.
  - TLS certificate checks (expiry).
  - DNS latency and DNS record checks.
- **Criteria evaluated by the monitoring tool:**
  - **Response code:** Usually HTTP 200 (OK) when healthy.
  - **Content:** Verify specific content to make sure there are no hidden errors (even when the returned code is 200).
  - **Response time:** Measure network latency and processing time to detect performance degradation trends.
- **Security notes:**
  - Protect these endpoints from public access to avoid DoS attacks or leaking sensitive information.
  - Use approaches such as authentication, non-standard ports/paths (obscurity), or IP restriction.
- **Implementation strategy:**
  - **Granularity:** You can have multiple endpoints for different priority levels (core services vs. background tasks).
  - **Caching:** Consider caching the check results if the checks are resource-intensive, so the monitoring tool itself doesn't overload the system.
  - **Monitoring locations:** Run the checks from several geographic locations to get an accurate view of the real user experience.

## When to Use This Pattern

- To monitor the availability and correct operation of websites and web applications.
- To monitor middle-tier or shared services in order to isolate faults.
- To complement existing instrumentation (performance counters, error logs) and detect when the application is completely unresponsive.

## When Not to Use This Pattern

- It cannot fully replace detailed logging and auditing.
- It is unnecessary for very simple systems where availability isn't a top priority.

## Integration in Azure

- **Azure Monitor / Application Insights:** Automatically collect request rates, response times, and failure rates.
- **Azure Traffic Manager / Front Door:** Use "health probes" to steer users away from unhealthy endpoints.

---

_Source: [Microsoft Learn - Health Endpoint Monitoring Pattern](https://learn.microsoft.com/en-us/azure/architecture/patterns/health-endpoint-monitoring)_

> **See also:** [Circuit Breaker Pattern](/Technology/System Design/Practices/Azure Design Patterns/Circuit Breaker Pattern) · [Geode Pattern](/Technology/System Design/Practices/Azure Design Patterns/Geode Pattern) · [Gateway Routing Pattern](/Technology/System Design/Practices/Azure Design Patterns/Gateway Routing Pattern)
