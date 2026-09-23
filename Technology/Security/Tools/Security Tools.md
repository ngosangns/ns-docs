---
area: technology
domain: security
type: resource
title: Security Tools
description: A curated list of tools for secret management, vulnerability scanning, cryptography, security analytics, pentesting and PII detection.
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - security
  - tools
resource: https://www.hashicorp.com/en/products/vault
---

# Security Tools

## Secret Management

Tools for managing secrets (API keys, passwords, certificates) centrally and securely.

- **HashiCorp Vault**: The standard tool for managing secrets, encrypting data at rest and providing dynamic secrets with a TTL. [Website](https://www.hashicorp.com/en/products/vault)
- **Google Secret Manager**: Secret management service on Google Cloud Platform. [Website](https://cloud.google.com/security/products/secret-manager)
- **AWS Secrets Manager**: Secret management service on Amazon Web Services. [Website](https://aws.amazon.com/secrets-manager)

## Vulnerability Scanning & Auditing

Tools that scan source code, packages and containers for security vulnerabilities.

- **osv-scanner**: Google's vulnerability scanner built on the osv.dev database. Supports scanning source directories and containers, and license checks. [GitHub](https://github.com/google/osv-scanner)
- **npq**: Installs npm packages safely by checking for vulnerabilities before installation. [GitHub](https://github.com/lirantal/npq)
- **HarborGuard**: A modern platform for container security scanning that integrates multiple scanners. [GitHub](https://github.com/HarborGuard/HarborGuard)

## Cryptography Libraries

Libraries that provide secure, easy-to-use cryptographic algorithms.

- **Tink**: Google's multi-language, cross-platform cryptography library that helps implement encryption safely and avoid common mistakes. [GitHub](https://github.com/tink-crypto)

## Security Analytics & Monitoring

Monitoring user behavior and detecting fraud in applications.

- **Tirreno**: An open-source security analytics platform that protects products from account threats and fraud by tracking detailed in-app events. [Website](https://www.tirreno.com/)

## Penetration Testing & Exploitation

Tools that support penetration testing and exploitation.

- **DroneSploit**: A pentesting framework dedicated to drones, with a Metasploit-like interface. [GitHub](https://github.com/dronesploit/dronesploit)
- **HExHTTP**: Generates HTTP request variants to test for backend Header Exploitation flaws. [GitHub](https://github.com/c0dejump/HExHTTP)

## Security & Pentesting (Additional)

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

## PII Detection & Data Privacy

Tools that detect/mask personally identifiable information (PII) in text data.

- https://huggingface.co/openai/privacy-filter — OpenAI's token-classification model for detecting/masking PII in text (account number, address, email, person name, phone, URL, date, secret). It is a transformer with 1.5B total / 50M active parameters (grouped-query attention + sparse MoE) that uses constrained Viterbi decoding so that labeled spans stay coherent instead of predicting each token independently. Runs locally in the browser/on a laptop, with a 128K-token context; precision/recall can be tuned at runtime and the model can be fine-tuned per domain. Apache 2.0; trained mainly on English (limited multilingual robustness). Note: it is only one supporting layer, not a complete anonymization solution — false positives/negatives still occur, especially with rare names or text outside the training distribution.

> **See also:** [Authentication Security](/Technology/Security/Practices/Authentication Security) · [CVE-2026-40175 Axios IMDS Bypass](/Technology/Security/Write Ups/CVE-2026-40175 Axios IMDS Bypass)
