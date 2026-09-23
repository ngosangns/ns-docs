---
area: technology
domain: kubernetes
type: resource
title: Kubernetes
description: Kubernetes reading list and tools, including Tilt and the Model PVC Provisioning (MPP) approach for shipping large AI models to K8s.
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - kubernetes
  - devops
  - mlops
resource: https://medium.com/spacelift/26-top-kubernetes-tools-for-2024-6809b2f0d5d4
---

# Kubernetes

## Resources

- 26 Top Kubernetes Tools for 2024: https://medium.com/spacelift/26-top-kubernetes-tools-for-2024-6809b2f0d5d4
- Ingress: manages inbound traffic from outside the cluster.
- Kubernetes Example - Building a simple microservices system: https://viblo.asia/p/kubernetes-example-xay-dung-he-thong-microservices-don-gian-pgjLNKyAV32
- Tools for securing k8s: https://viblo.asia/p/bao-mat-ung-dung-tren-kubernetes-he-dieu-hanh-may-khong-danh-cho-nguoi-mong-mo-Yym40GddV91

## Tools

- https://tilt.dev: An open-source tool that helps software teams easily set up and manage development environments for microservices applications running on Kubernetes. It automates the steps from a source code change to deploying the application, speeding up development and reducing errors.

## MLOps - Model PVC Provisioning (MPP)

### Challenges of Deploying AI Services on Kubernetes

- Large image sizes (tens of GB) make building, storing, and deploying difficult
- Long startup time and heavy network use when downloading the model at runtime
- Startup failures are common because the image is so large

### Traditional Deployment Approaches

- **Code + Model = Image**: Put both code and model in the same image, producing a large image that is hard to manage
- **Download the model at startup**: The service downloads the model when the pod is created, causing long startup time and heavy network use

### The Model PVC Provisioning (MPP) Solution

#### Deployment Architecture

- Use a Model Registry to store and manage model versions
- Use the MPP Tool to download the model and store it in a Persistent Volume Claim (PVC)
- Mount the PVC into the pod so the AI service can use the model through the `MODEL_PATH` environment variable

#### Advantages of MPP

- Solves the image size and startup time problems
- Optimizes model handoff between environments
- Allows sharing a model across multiple services in the same namespace
- Makes it easy to swap models by updating the environment variable
- Reduces image size and build time

#### Disadvantages of MPP

- A more complex deployment process, requiring a StorageClass for the PVC and deployment of the MPP tool
- Requires coordination and effort from teams to change the current process

---

**Source**: [[MLOps] Model PVC Provisioning (MPP) - A way to ship large AI image to K8s - Viblo](https://viblo.asia/p/mlops-model-pvc-provisioning-mpp-a-way-to-ship-large-ai-image-to-k8s-3kY4gdKqJAe)

> **See also:** [Simplify EKS Cluster Management With ACK And Kro](/Technology/Cloud And DevOps/Write Ups/Simplify EKS Cluster Management With ACK And Kro) · [DevOps Tools](/Technology/Cloud And DevOps/Tools/DevOps Tools) · [CI CD Tools](/Technology/Cloud And DevOps/Tools/CI CD Tools)
