---
area: technology
domain: security
type: guide
title: Quarantine Pattern
description: Validate third-party software artifacts in an isolated pipeline before they are trusted and released into the internal supply chain.
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - security
  - supply-chain
  - azure
  - cloud-design-patterns
resource: https://learn.microsoft.com/en-us/azure/architecture/patterns/quarantine
---

# Quarantine Pattern

Use validation processes to check third-party software artifacts in the supply chain before allowing them into your system. This pattern acts as an operational "sidecar" for the development process, helping prevent potential security vulnerabilities from external sources.

## Summary

- **Problem:** Cloud solutions often depend on third-party software (open source, container images, OS images). If these are integrated directly without checks, the system can be compromised or destabilized by security vulnerabilities or incompatibilities.
- **Solution:** Set up an independent validation process. External artifacts are placed in an isolated environment (quarantine) and put through strict checks before being marked "trusted".
- **How the process works:**
  - **Request:** A user requests the use of an external artifact. The artifact is initially blocked.
  - **Ingestion:** The quarantine process pulls the artifact from the external source into the inspection area.
  - **Verification:** Runs checks such as vulnerability scanning (CVE scanning), malware detection, license checks, or SBOM (Software Bill of Materials) assessment.
  - **Publishing:** If it passes, the artifact is pushed into a secure internal repository and marked "trusted". If it fails, it is discarded or its use is not allowed.
  - **Signaling:** Notifies the requester of the result along with a detailed report on the level of risk.
- **Characteristics:**
  - The process does not alter the structure of the software artifact.
  - Ensures segmentation between trusted and untrusted resources.
  - Must be automated to guarantee consistency and efficiency.

## When to Use

- When the system integrates many externally developed components (container images from DockerHub, libraries from NuGet/npm, Terraform modules, OS images from vendors).
- When the development team considers the risk from third-party software significant and needs to mitigate it to protect data.
- When you need to standardize software validation rules across the organization.

## When Not to Use

- The software artifacts are produced internally by the development team itself or by strategic partners who are fully trusted.
- When the risk of not validating is much lower than the cost of building and operating a quarantine process.

## Azure Example

A team wants to use an image from a public registry:

1. The request is submitted through a custom application on **Azure Web Apps**.
2. The image is imported into an **Azure Container Registry (ACR)** that serves as the "quarantine zone".
3. An **Azure Function** orchestrates security scanning tools (such as Microsoft Defender for Containers) to inspect the image.
4. If it is safe, the image is pushed to a **Trusted ACR** so that production Kubernetes clusters can pull and use it.

---

_Source: [Microsoft Learn - Quarantine Pattern](https://learn.microsoft.com/en-us/azure/architecture/patterns/quarantine)_

> **See also:** [Gatekeeper Pattern](/Technology/System Design/Practices/Azure Design Patterns/Gatekeeper Pattern) · [Sidecar Pattern](/Technology/System Design/Practices/Azure Design Patterns/Sidecar Pattern) · [Valet Key Pattern](/Technology/System Design/Practices/Azure Design Patterns/Valet Key Pattern)
