---
area: technology
domain: reverse-proxy
type: tool
title: Reverse Proxy
description: Overview of reverse proxy types and a detailed profile of the Caddy web server, its automatic HTTPS, configuration model, installation and use cases.
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - reverse-proxy
  - caddy
  - devops
resource: https://viblo.asia/p/reverse-proxy-tu-thang-chuyen-phat-thanh-ong-quan-gia-PAoJeOArV1j
---

# Reverse Proxy

## Overview

- Types of reverse proxy and when to use them: https://viblo.asia/p/reverse-proxy-tu-thang-chuyen-phat-thanh-ong-quan-gia-PAoJeOArV1j

## Caddy

- **Caddy**: Fast and extensible multi-platform HTTP/1-2-3 web server with automatic HTTPS
  - **GitHub**: https://github.com/caddyserver/caddy
  - **Website**: https://caddyserver.com
  - **License**: Apache-2.0
  - **Key features:**
    - **Automatic HTTPS**: Automatically obtains and renews SSL/TLS certificates from Let's Encrypt and ZeroSSL
      - ZeroSSL and Let's Encrypt for public names
      - Fully-managed local CA for internal names & IPs
      - Supports Encrypted ClientHello (ECH)
      - Multi-issuer fallback
      - Can coordinate with other Caddy instances in a cluster
      - Stays up when other servers have problems with TLS/OCSP/certificates
    - **HTTP/1.1, HTTP/2, and HTTP/3** supported by default
    - **Flexible configuration:**
      - Caddyfile: simple, readable configuration
      - Native JSON config: powerful and detailed configuration
      - Dynamic configuration: change configuration through the JSON API without restarting
      - Config adapters: support many formats (JSON 5, YAML, TOML, NGINX config, etc.)
    - **Reverse proxy & load balancing**: Supports reverse proxying and load balancing
    - **Modular architecture**: Modular design, easily extended with plugins
    - **Production-ready**: Has served trillions of requests and managed millions of TLS certificates
    - **Scalable**: Proven to scale to hundreds of thousands of sites
    - **No external dependencies**: Runs anywhere with no external dependencies (not even libc)
    - **Memory safety**: Written in Go, offering better memory safety than other web servers
    - **Platform**: Multi-platform (Windows, macOS, Linux, etc.)
  - **Installation:**
    - Download from GitHub Releases: https://github.com/caddyserver/caddy/releases
    - Build from source with Go 1.25.0+
      - Development: `git clone` → `cd caddy/cmd/caddy/` → `go build`
      - With version info and plugins: use the xcaddy builder tool
    - Use xcaddy to build with custom plugins
  - **Structure:**
    - Caddy is a platform for running Go applications
    - Caddy "apps" are Go programs implemented as Caddy modules
    - Two main apps, `tls` and `http`, are built in
    - Apps automatically get documentation, graceful config changes via the API, and integration with other Caddy apps
  - **Use cases:**
    - Web server with automatic HTTPS
    - Reverse proxy for microservices
    - Load balancer
    - API gateway
    - Static file server
    - Development server with local HTTPS
  - **Advantages:**
    - Zero-config HTTPS: certificates are issued and renewed automatically
    - Simple configuration with the Caddyfile
    - High performance with HTTP/3 support
    - No restart needed when configuration changes (dynamic config)
    - Extensible through a plugin system
    - Production-ready and proven at large scale
    - Fun to use: developer-friendly design
  - **Documentation:**
    - Getting Started guide: https://caddyserver.com/docs/getting-started
    - Full documentation: https://caddyserver.com/docs/
    - Community forum: https://caddy.community

> **See also:** [HTTP HTTPS TLS SSL](/Technology/Cloud And DevOps/Concepts/Network/HTTP HTTPS TLS SSL) · [DevOps Tools](/Technology/Cloud And DevOps/Tools/DevOps Tools) · [VPN Proxy Firewall](/Technology/Cloud And DevOps/Tools/VPN Proxy Firewall)
