---
area: technology
domain: devops
type: resource
title: DevOps Tools
description: Curated DevOps tooling across GitOps and IaC, systemd and server management, self-hosted deployment platforms, incident management and Cloudflare helpers.
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - devops
  - tools
  - gitops
resource: https://github.com/fluxcd/flux2
---

# DevOps Tools

## Infrastructure as Code

- **Flux**: A GitOps tool that syncs Kubernetes clusters with configuration from Git/OCI and automatically applies new changes. Version 2 was rebuilt on the Kubernetes API, supports multi-tenancy and multiple Git repositories, and uses the GitOps Toolkit for continuous delivery. Flux is a CNCF graduated project and widely used (https://github.com/fluxcd/flux2)
- **Pulumi**: Infrastructure as Code in any programming language: https://github.com/pulumi/pulumi

## System Management

- **isd**: Interactive systemd manager - an interactive tool for managing systemd units more efficiently - [GitHub](https://github.com/kainctl/isd)

## Server Management

- **infra-caddy-guy**: A lightweight server management script suite, backed by Docker and the Caddy Web Server, that simplifies the work of infrastructure administrators
  - **Install**: `git clone https://github.com/nguyenanhung/infra-caddy-guy.git && cd infra-caddy-guy && ./bin/enable-shortcut`
  - **Supported stack**:
    - Docker, docker-compose, fzf
    - Caddy Web Server: sites, reverse proxy, load balancer, and basic authentication
    - Laravel Builder: start from scratch with the Laravel Framework Playbook, choosing version and worker
    - WordPress Builder: start from scratch with WordPress and choose theme and plugins
    - Static Site Server
    - Node.js Builder: start from scratch with the NestJS Playbook, choosing version and port
    - Node.js Application: simple, lightweight connection to the Caddy Web Server
    - PHP Application Routing
    - Security hardening (files, headers) for PHP, Node.js, SPA, static site, and reverse proxy applications
    - Quick setup of a Telegram Messenger MTProto proxy
    - Supported packages: redis, memcached, mongodb, mariadb, mysql, percona, postgresql, influxdb, rabbitmq, beanstalkd, gearmand, elasticsearch, mailhog, mailpit, phpmyadmin, adminer, uptime-kuma, n8n, minio
  - **OS support**: RHEL-based (CentOS, Almalinux, Rocky Linux, Red Hat), Fedora, Ubuntu/Debian, Amazon Linux 2 and 2023, macOS
  - **Features**:
    - Blue/Green Rolling Deployment
    - Amazon Web Services CLI (`awscli`) integration
    - Connect a container to the Caddy Web Server network: `docker network connect bear_caddy_net <container_name>`
  - [GitHub](https://github.com/nguyenanhung/infra-caddy-guy) #docker #caddy #infrastructure #server-management #iac

## Deployment Platforms

- **Nixopus**: An open-source alternative to Vercel, Heroku, and Netlify with a simplified workflow
  - **Key features:**
    - One-click application deployment
    - In-browser file management
    - Integrated terminal
    - Real-time monitoring
    - Simplified workflow compared with traditional platforms
  - **Note:** Currently in alpha and not ready for production
  - [GitHub](https://github.com/raghavyuva/nixopus) #deployment #platform #vercel-alternative #heroku-alternative
- **Coolify**: An open-source, self-hosted PaaS alternative to Vercel/Heroku/Netlify/Railway; deploys apps, databases, and services to your own servers over SSH (VPS, bare metal, Raspberry Pi, EC2, Hetzner...)
  - **Key features:**
    - Git integration (GitHub, GitLab, Bitbucket, Gitea), preview deployments for each pull request
    - Automatic SSL through Let's Encrypt, in-browser terminal
    - 280+ one-click services, runs any Docker-compatible app
    - Database backups to S3-compatible storage, webhooks/API for CI/CD
    - Teams with permissions, server monitoring, and notifications (Discord, Telegram, email)
  - **Pricing:** Self-hosting is free and fully featured; Coolify Cloud is \$5/month (includes 2 servers, \$3 for each additional server), and you still use your own servers, with Coolify hosting only the control plane
  - [Website](https://coolify.io/) · [GitHub](https://github.com/coollabsio/coolify) #deployment #paas #self-hosted #vercel-alternative #heroku-alternative
- **Dokploy**: An all-in-one deployment platform (self-hosted or cloud) for managing containerized applications and databases across multiple servers
  - **Build/deploy methods:** Dockerfile, Nixpacks, Heroku Buildpacks, Docker Compose (native), Docker Swarm cluster
  - **Key features:**
    - Multi-server deployment
    - Database management (MySQL, PostgreSQL, MongoDB, MariaDB, Redis) with automatic backups
    - Real-time CPU, memory, and network monitoring
    - RBAC, open-source templates for popular tools
    - MCP integration so AI agents can assist with deployment
  - **Pricing:** The open-source self-hosted edition is free; Cloud Hobby is \$4.50/server/month, Startup starts at \$15/month (3 servers), Enterprise (SSO/SAML, on-prem) is by contact
  - **Versus Coolify:** Dokploy leans toward Docker Compose/Swarm and multi-server setups; Coolify has a larger one-click service catalog and per-PR preview deployments
  - [Website](https://dokploy.com/) · [GitHub](https://github.com/dokploy/dokploy) #deployment #paas #self-hosted #docker-swarm #docker-compose

## Incident Management

- **Versus-Incident**: An incident management tool supporting multi-channel alerts, custom messages, and on-call integration
  - **Key features:**
    - Multi-channel alerts: supports many different alert channels
    - Custom messages: customize notification content and format
    - On-call integration: manage on-call schedules and notify on-call engineers
    - Compatible with any tool that supports webhook alerts
  - **Use cases:**
    - Managing and responding to production incidents
    - Automating alerting and notification workflows
    - Integrating with existing monitoring and alerting systems
  - [GitHub](https://github.com/VersusControl/versus-incident) #incident-management #on-call #alerts #webhook

## Cloudflare Tools

- **DockFlare**: Automate Cloudflare Tunnels with Docker Labels - [GitHub](https://github.com/ChrispyBacon-dev/DockFlare)
- **Cloudflare Snippet**: A feature like a mini version of Cloudflare Worker, used for simple tasks such as adding CORS headers. Requires the domain to be on the Pro plan (\$20/month), incurs no extra cost like Workers, and can significantly cut data transfer from the origin server by processing at the edge. See the case study: [Case Study Quick Win Optimization](/Technology/System Design/Practices/Case Study Quick Win Optimization)

> **See also:** [CI CD Tools](/Technology/Cloud And DevOps/Tools/CI CD Tools) · [VPS Hosting](/Technology/Cloud And DevOps/Tools/VPS Hosting) · [Reverse Proxy](/Technology/Cloud And DevOps/Tools/Reverse Proxy)
