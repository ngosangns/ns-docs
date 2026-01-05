---
tags:
  - area/technology
  - domain/devops
  - topic/cicd
  - type/usecase
  - lang/vi
---

# Node.js CI/CD Pipeline trên Amazon EKS

**Node-EKS-CICD** (https://gitlab.com/HlaliMedAmine/node-aks-cicd) - End-to-end CI/CD pipeline production-ready cho Node.js application trên Amazon EKS.

## Kiến trúc
- Developer push code → GitLab pipeline trigger
- CI thực hiện: build, tests, static analysis, security scanning
- Docker image được build và push lên Docker Hub
- Kubernetes manifests được update động
- Deployment được apply trên Amazon EKS
- Prometheus + Grafana cung cấp monitoring và dashboards

## Technologies & Tools
### Core Infrastructure
- **AWS EKS**: Kubernetes cluster cho scalable workloads
- **AWS Load Balancer Controller**: External traffic routing
- **Docker Hub**: Container registry

### CI/CD
- **GitLab Pipeline** với multi-stage jobs:
  - Build: Install dependencies, prepare artifacts
  - Test: Run automated tests
  - Security: Semgrep SAST scan
  - Quality: SonarQube full code analysis
  - Package: Build & push Docker image
  - Deploy: Apply Kubernetes manifests to EKS

### Security & Code Quality
- **Semgrep**: Static security analysis, phát hiện security risks, misconfigurations, vulnerable patterns
- **SonarQube**: Code quality analysis, bugs, vulnerabilities, duplications, maintainability index

### Monitoring
- **Prometheus**: Metrics collection
- **Grafana**: Custom DevOps dashboards cho CPU/Memory, Node & Pod metrics, Cluster state, Application behavior

## Pipeline Guarantees
- Continuous testing
- Early detection of vulnerabilities
- Prevention of low-quality code
- Fully automated deployments
- Rolling updates để tránh downtime

## Features
- Docker packaging với optimized Dockerfile
- Automatic image tagging với GitLab commit SHA
- Dynamic Kubernetes manifest updates
- High availability và intelligent pod scheduling
- Public exposure qua AWS Load Balancer
- Production-grade monitoring stack

## Use cases
- Enterprise-grade DevOps workflow
- Security-first pipeline
- Kubernetes-native deployment
- Full observability
- High-quality và stable application delivery