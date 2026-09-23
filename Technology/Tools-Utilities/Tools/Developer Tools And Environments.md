---
area: technology
domain: tools
type: resource
title: Developer Tools And Environments
description: Dev environment manager, benchmark, debugging, monitoring, và các công cụ phát triển phần mềm khác
timestamp: "2026-09-20T00:00:00.000Z"
tags:
  - technology
  - tools
  - developer-tools
resource: https://github.com/marixdev/lstack
---

# Developer Tools And Environments

- https://github.com/crizant/probe — Fast, native, local-first API client (Postman/Insomnia alternative) for macOS, Windows, and Linux; built in Rust with GPUI (GPU-rendered, no Electron/WebView). Ships two interfaces over the same core: an agent/CI-friendly CLI (human-readable output plus deterministic versioned JSON) and a desktop app. Uses OpenCollection YAML as workspace format, stores collections on the filesystem (Git-friendly), and needs no account or cloud service. Releases are unsigned, so macOS Gatekeeper / Windows SmartScreen warn on first launch.
- https://github.com/marixdev/lstack — Local PHP development stack manager for Windows/Linux (Electron); virtual hosts, SSL, databases, and project templates.
- https://www.servbay.com/ — ServBay: AI-native local development environment for macOS 12+ and Windows 10+ (XAMPP/MAMP/Laragon/Laravel Herd alternative). Runs multiple versions side by side of PHP, Node.js, Python, Go, Java, .NET, Ruby, and Rust, plus MySQL, MariaDB, PostgreSQL, MongoDB, Redis, Memcached, and SQLite. Built-in SSL, local DNS/custom domains, an SMTP/POP3 mail server, Ollama local models, an AI gateway for multiple providers (keys stored encrypted locally), and an MCP server so agents like Claude Code, Cursor, or Codex can manage services, sites, and databases. Free tier covers 5 sites / 5 DNS records; Pro costs $9.90/mo or $59/yr (unlimited sites, mail server, PKI, backups); Team costs $39.90/mo or $399/yr (10 seats).
- https://envkit.net/ — EnvKit: free desktop app for Windows 10/11 and macOS (Apple Silicon) that bundles a local PHP/Node dev stack into one control panel (Laragon/Herd-style). Choose nginx or Apache, run multiple PHP versions with per-site isolation and on-demand Xdebug, and use MySQL/MariaDB, PostgreSQL, Redis, MongoDB, and Mailpit. It creates a local CA for trusted HTTPS on `*.test` domains, and services start automatically when a site is accessed. Also supports Laravel Reverb, cron jobs, dump interception, N+1 query detection, admin UIs (phpMyAdmin, pgweb, mongo-express), bulk import from Laragon, and MCP control from an AI assistant. No account needed; binaries ship via [Env-Kit/envkit-releases](https://github.com/Env-Kit/envkit-releases), and it is not clearly open source.
- https://github.com/maycuatroi1/drf-performance-benchmark — Reproducible benchmark suite for Django REST Framework covering serialization, pagination, caching, and WSGI vs ASGI.
- https://github.com/alper-han/CrossMacro — Cross-platform mouse and keyboard macro recorder and player with editor, text expansion, shortcuts, and scheduling.
- https://github.com/livewire/blaze — Drop-in Blade component optimizer for Laravel; compiles templates into PHP functions for 91–97% rendering overhead reduction.
- https://github.com/gridex/gridex — Native macOS/Windows database IDE in Swift/AppKit; connects to PostgreSQL, MySQL, SQLite, and Redis with a keyboard-driven UI.
- https://github.com/floci-io/floci — Free local AWS emulator for development and testing cloud services offline.
- https://github.com/millionco/react-doctor — React codebase health scanner; 0-100 score on security, performance, dead code, and architecture issues.
- https://github.com/microsoft/RustTraining — Microsoft's Rust training books; beginner to expert level with bridge courses from C++, C#, Python.
- https://github.com/maderix/ANE — Reverse-engineered Apple Neural Engine training; backpropagation on ANE via private APIs for research.
- https://github.com/netdata/netdata — Open-source, real-time infrastructure monitoring platform; per-second metrics, zero-config auto-discovery, edge-based ML anomaly detection, 800+ integrations, and an MCP server (CNCF).
- https://github.com/ctrlplanedev/ctrlplane — Open-source release governance control plane that sits above existing CI/CD, GitOps, and IaC tooling; enforces promotion sequencing, policy gates, and rollout visibility for multi-cloud, multi-region, multi-service deployments.
- https://github.com/liriliri/chii — Remote debugging tool like weinre, but using the latest Chrome DevTools frontend to inspect and debug pages on remote/mobile devices.
- https://github.com/liriliri/eruda — Console for mobile browsers; an on-page DevTools panel for inspecting elements, console, network, resources, and more on mobile web.
- https://github.com/podman-container-tools/buildah — Tool that facilitates building OCI container images; daemonless, scriptable image builds without requiring a running Docker daemon.
- https://github.com/ThisIs-Developer/Markdown-Viewer — Fast, GitHub-style Markdown editor and previewer with live preview, Mermaid diagrams, LaTeX math, syntax highlighting, PDF export, and multi-tab support; runs in-browser, via Docker, or as a desktop app.
- https://github.com/orailnoor/DroidDesk — Turns an Android phone into a real Linux desktop using Termux, Termux X11, TUR, and Proot; runs VS Code, Firefox, LibreOffice, Blender, and more over X11 or VNC.
- https://github.com/heyputer/puter — Advanced, open-source, self-hostable "internet computer": a web-based desktop environment with built-in apps (notepad, spreadsheet, camera), cloud storage, an app marketplace, and AI integration, accessible from any device.
- https://github.com/caobahuong/kafka-connect-dynamic-filter — Kafka Connect SMT for filtering Debezium CDC records with dynamic JSON rules sourced from Redis, a Kafka topic, or a file; rules update on the next record with no connector restart or downtime.
- https://horizon.nckrtl.com/ — Horizon New Dawn: modernized UI replacement for Laravel Horizon queue monitoring; adds advanced filtering, instance/supervisor controls, batch management, and failure recovery via a single composer package with no config changes.
- https://github.com/welldone-software/why-did-you-render — Monkey-patches React to notify you about potentially avoidable re-renders, helping track down unnecessary component updates; also works with React Native.
- https://github.com/endojs/endo — Distributed secure JavaScript sandbox based on SES (Secure ECMAScript), for safely running untrusted code with object-capability security.
- https://github.com/RFS-ADRENO/zca-js — Unofficial Zalo API client for JavaScript.
- https://github.com/certimate-go/certimate — Open-source, self-hosted SSL certificate ACME tool (Go); automates the full issuance/deployment/renewal/monitoring cycle visually, with support for major cloud providers, Let's Encrypt, ZeroSSL, and Google Trust Services.
- https://openship.io/ — Open-source deployment platform (self-hostable or cloud); push code and it handles builds, config, and deploys, with built-in Postgres/Redis/email/object storage services, multi-language support, and no vendor lock-in since apps run as standard Docker containers.
