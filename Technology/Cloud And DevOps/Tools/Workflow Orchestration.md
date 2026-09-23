---
area: technology
domain: workflow-orchestration
type: resource
title: Workflow Orchestration
description: Open-source workflow and data-pipeline orchestration platforms, covering Kestra and Apache NiFi with their features and requirements.
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - workflow-orchestration
  - devops
  - data-pipeline
resource: https://github.com/kestra-io/kestra
---

# Workflow Orchestration

## Kestra

- **Kestra**: An open-source platform for building, scheduling, and monitoring complex workflows - https://github.com/kestra-io/kestra

## Apache NiFi

- **Apache NiFi**: An open-source data processing and distribution system that automates data pipelines for cybersecurity, observability, event streams, and generative AI - https://github.com/apache/nifi
  - **Key features:**
    - Browser UI: design, control, and monitor workflows through a web interface
    - Scalable Processing: prioritizes throughput/latency, guarantees delivery with retries, horizontal scaling
    - Provenance Tracking: searchable history, data lineage from source to destination
    - Extensible Design: plugin interfaces for Processors and Controller Services, supports Python processors, REST API
    - Security: single sign-on (OpenID Connect/SAML 2), role-based access control, TLS/SFTP encryption
  - **Requirements:** Java 21, Python 3.10+ (optional)
  - **Use cases:** Data pipeline automation, ETL workflows, real-time data processing, data distribution

> **See also:** [CI CD Tools](/Technology/Cloud And DevOps/Tools/CI CD Tools) · [DevOps Tools](/Technology/Cloud And DevOps/Tools/DevOps Tools)
