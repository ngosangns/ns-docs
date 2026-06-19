---
area: technology
domain: devops
topic: cicd
type: resource
title: CI CD Tools
description: CI/CD Tools
timestamp: '2026-06-19T13:43:26.145Z'
tags:
  - technology
  - devops
  - cicd
resource: https://viblo.asia/p/reusable-workflows-tai-su-dung-workflows-trong-github-actions-zOQJwowbJMP
---
# CI/CD Tools

## 1. Github Actions

- **Github Actions**: Nền tảng tự động hóa quy trình phát triển phần mềm tích hợp sẵn trong GitHub.
- **Reusable Workflows**: Tái sử dụng Workflows trong Github Actions - [Viblo](https://viblo.asia/p/reusable-workflows-tai-su-dung-workflows-trong-github-actions-zOQJwowbJMP)

## 2. General CI/CD Tools

- **Woodpecker**: Công cụ CI/CD đơn giản nhưng mạnh mẽ với khả năng mở rộng cao, kế thừa từ Drone CI - [GitHub](https://github.com/woodpecker-ci/woodpecker) #CI #CD #cicd
- **GitLab CI/CD**: Hệ thống CI/CD mạnh mẽ tích hợp sẵn trong GitLab, hỗ trợ pipeline phức tạp và tích hợp Kubernetes tốt.

## 3. Security & Code Quality in CI/CD

- **Semgrep**: Công cụ phân tích bảo mật tĩnh (SAST) nhanh, mã nguồn mở, hỗ trợ nhiều ngôn ngữ. Phát hiện các lỗi bảo mật, cấu hình sai và các mẫu mã nguồn nguy hiểm.
- **SonarQube**: Nền tảng tự động kiểm tra chất lượng mã nguồn, phát hiện bugs, lỗ hổng bảo mật và code smells.

## 4. Pipeline Examples & Blueprints

- **Node-EKS-CICD**: Pipeline CI/CD mẫu cho ứng dụng Node.js trên Amazon EKS.
  - **Công nghệ**: GitLab CI, Docker, Kubernetes, Helm, Prometheus, Grafana.
  - **Tính năng**: Quét bảo mật với Semgrep, phân tích chất lượng với SonarQube, triển khai tự động lên EKS.
  - [Source](https://gitlab.com/HlaliMedAmine/node-aks-cicd)