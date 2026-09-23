---
area: technology
domain: testing
type: resource
title: Testing Tools
description: A curated list of tools for API and integration testing, load testing, architecture checks, browser testing and dependency analysis.
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - testing
  - tools
resource: https://github.com/keploy/keploy
---

# Testing Tools

## API & Integration Testing

- **Keploy**: An agent that supports API, integration and end-to-end (E2E) testing for developers.
  - Automatically generates test cases from real API calls.
  - Creates mocks/stubs for APIs.
  - Reduces the time spent writing tests manually.
  - [GitHub](https://github.com/keploy/keploy) #API-testing #integration-testing #E2E #mocks
- **Appium**: An open-source framework for automating tests of mobile (iOS, Android) and desktop applications. [GitHub](https://github.com/appium/appium)

## Performance & Load Testing

- **K6**: An open-source tool written in Go, scripted in JavaScript, for performance testing APIs, microservices and websites.
  - Supports: HTTP/1.1, HTTP/2, gRPC, WebSocket.
  - Test types: Load, Stress, Spike, Soak testing.
  - Integrates well with Prometheus and Grafana.
  - [Homepage](https://k6.io/) | [Introductory guide (Vietnamese)](https://techmaster.vn/posts/38352/k6-performance-testing-nhap-mon)

## Architecture Testing & Static Analysis

- **ArchUnit (Java)**: A library that checks the architectural rules of Java applications through unit tests. [GitHub](https://github.com/TNG/ArchUnit)
- **SonarQube**: A static code analysis platform that detects bugs, security vulnerabilities and structural problems (code smells). [Website](https://www.sonarqube.org/)
- **Structure101 / Lattix**: Specialized tools for analyzing and visualizing dependency relationships in source code.

## Web & Browser Testing

- **Browserstack**: A cloud platform for testing websites and applications on thousands of real devices and browsers.
- **Lightpanda Browser**: An open-source headless browser optimized for automation and scraping. [GitHub](https://github.com/lightpanda-io/browser)
- **OpenReplay**: A self-hostable session replay and product analytics solution that helps reproduce bugs and understand user behavior. [GitHub](https://github.com/openreplay/openreplay)

## Dependency Analysis

- **Doxygen / Graphviz**: Tools that automatically generate documentation and diagram the relationships between components in source code.

> **See also:** [Developer Tools And Environments](/Technology/Tools And Utilities/Tools/Developer Tools And Environments) · [Security Tools](/Technology/Security/Tools/Security Tools)
