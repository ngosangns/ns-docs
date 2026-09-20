---
area: technology
domain: security
topic: tools
type: resource
title: Security Tools
description: Security tools-utilities
timestamp: '2026-06-19T13:43:26.126Z'
tags:
  - technology
  - security
  - tools
resource: https://www.hashicorp.com/en/products/vault
---
# Security tools-utilities

## 1. Secret Management
Các công cụ quản lý bí mật (API keys, passwords, certificates) một cách tập trung và an toàn.

- **HashiCorp Vault**: Công cụ tiêu chuẩn để quản lý bí mật, mã hóa dữ liệu khi lưu trữ và cung cấp bí mật động với TTL. [Website](https://www.hashicorp.com/en/products/vault)
- **Google Secret Manager**: Dịch vụ quản lý bí mật trên Google Cloud Platform. [Website](https://cloud.google.com/security/products/secret-manager)
- **AWS Secrets Manager**: Dịch vụ quản lý bí mật trên Amazon Web Services. [Website](https://aws.amazon.com/secrets-manager)

## 2. Vulnerability Scanning & Auditing
Công cụ quét lỗ hổng bảo mật cho mã nguồn, package và container.

- **osv-scanner**: Công cụ quét lỗ hổng của Google sử dụng cơ sở dữ liệu osv.dev. Hỗ trợ quét thư mục mã nguồn, container và kiểm tra giấy phép. [GitHub](https://github.com/google/osv-scanner)
- **npq**: Cài đặt npm package an toàn bằng cách kiểm tra các lỗ hổng trước khi cài đặt. [GitHub](https://github.com/lirantal/npq)
- **HarborGuard**: Nền tảng hiện đại để quét bảo mật container, tích hợp nhiều công cụ quét khác nhau. [GitHub](https://github.com/HarborGuard/HarborGuard)

## 3. Cryptography Libraries
Các thư viện cung cấp các thuật toán mã hóa an toàn và dễ sử dụng.

- **Tink**: Thư viện mã hóa đa ngôn ngữ và đa nền tảng của Google, giúp triển khai mã hóa an toàn và tránh các lỗi phổ biến. [GitHub](https://github.com/tink-crypto)

## 4. Security Analytics & Monitoring
Giám sát hành vi người dùng và phát hiện gian lận trong ứng dụng.

- **Tirreno**: Nền tảng phân tích bảo mật mã nguồn mở giúp bảo vệ sản phẩm khỏi các mối đe dọa tài khoản và gian lận bằng cách theo dõi sự kiện chi tiết trong ứng dụng. [Website](https://www.tirreno.com/)

## 5. Penetration Testing & Exploitation
Công cụ hỗ trợ kiểm thử xâm nhập và khai thác lỗi.

- **DroneSploit**: Framework pentesting dành riêng cho máy bay không người lái (drone), giao diện tương tự Metasploit. [GitHub](https://github.com/dronesploit/dronesploit)
- **HExHTTP**: Công cụ tạo ra các biến thể của HTTP request để kiểm tra lỗi Header Exploitation ở phía backend. [GitHub](https://github.com/c0dejump/HExHTTP)

## 6. Security & Pentesting (bổ sung)

- https://github.com/KeygraphHQ/shannon — Autonomous white-box AI pentester that analyzes source code and executes real exploits against web apps/APIs.
- https://github.com/LarsenCundric/port-whisperer — Beautiful CLI tool to inspect, manage, and kill processes listening on local ports with framework detection.
- https://github.com/Eljakani/ward — Security scanner built specifically for Laravel; checks .env, config, dependencies (live CVEs), and 40+ YAML rules.
- https://github.com/slimtoolkit/slim — CNCF Sandbox toolkit to inspect, minify, and secure Docker containers; auto-generates Seccomp/AppArmor profiles.
- https://github.com/sherlock-project/sherlock — Hunt down social media accounts by username across 400+ social networks; popular OSINT reconnaissance tool.
- https://github.com/nvidia/skillspector — NVIDIA security scanner for AI agent skills; detects vulnerabilities and malicious patterns (64 patterns across 16 categories) via static + optional LLM analysis before you install a skill.
- https://github.com/trailofbits/skills — Trail of Bits Claude Code skills marketplace for security research, vulnerability detection, and audit workflows; smart-contract auditing, static analysis, fuzzing, crypto side-channel checks, and more.
- https://github.com/zhaoxuya520/reverse-skill — Skill router pack for reverse engineering, authorized penetration testing, and security research; AI-powered routing, on-demand toolchain bootstrapping, and a self-evolving knowledge base for Claude Code, Kiro, Cursor, Cline, and other AI coding clients.
- https://github.com/flipperdevices/flipperzero-firmware — Official firmware source for the Flipper Zero, the portable multi-tool for hardware hacking, RF/NFC/RFID/infrared experimentation, and pentesting.
- https://github.com/PentesterFlow/agent — Terminal-based AI agent for professional pentesters and bug hunters; automates recon-to-report with human-in-the-loop control, built-in skills for IDOR/SSRF/SSTI/JWT/GraphQL/race conditions, Burp Suite integration, local learning across sessions, 20+ slash commands, and support for Ollama/LM Studio/Kimi/Groq/OpenRouter/DeepSeek/Gemini backends.
- https://github.com/uphiago/recon-skills — Collection of 212 field-validated attack/recon skills distilled from real engagements across 600+ companies in 28 industries; organized into recon, redteam, meta, chains, auth, and infra categories, designed for AI agent integration (e.g. Claude Code).
- https://github.com/weirdmachine64/GhidraGPT — Ghidra plugin that integrates LLMs (GPT, Claude, Gemini, Cohere, Mistral, DeepSeek, Grok, and local models via Ollama) to automate reverse engineering: renames variables, infers types, adds comments, explains logic, and flags vulnerabilities with streamed responses.
- https://github.com/cr0hn/dockerscan — All-in-one Docker security scanner; scans images for vulnerabilities and leaked secrets, audits container/host configuration (root containers, exposed Docker socket), analyzes Docker network exposure, and aligns with CIS Benchmark/NIST SP 800-190.
- https://github.com/evyatarmeged/Raccoon — High-performance recon and vulnerability scanning tool (3.2k+ stars); DNS enumeration, WHOIS/TLS lookups, port scanning with Nmap scripts, subdomain enumeration, URL fuzzing with SecLists wordlists, WAF detection, Tor/proxy routing, and async performance via Python asyncio.
- https://github.com/openai/codex-security — OpenAI's Codex Security CLI and TypeScript SDK for finding, validating, and fixing security vulnerabilities.