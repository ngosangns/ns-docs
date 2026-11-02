---
area: technology
domain: cloud-tools
type: resource
title: Tools Notes
description: "Tools for mesh networking and file transfer, a Google File System reading link, and the Cachet status page."
timestamp: "2026-10-03T00:00:00.000Z"
tags:
  - technology
  - networking
  - cloud-devops
  - gcp
  - devops
  - monitoring
resource: https://github.com/juanfont/headscale
---

# Tools Notes

This note is a short link list of tools, kept as a place to drop a link with a one-line reason to care. The file transfer and networking section holds a self-hosted Tailscale control server, a peer-to-peer transfer tool, a messaging system, and two ways to expose a local service through Cloudflare Tunnels. One of those is the quick tunnel, which needs no account or DNS record. A separate section keeps a Google Cloud Platform reading on the Google File System. The last section lists Cachet, an open source status page. Read the one-line descriptions to pick a tool, then follow the link and check the project yourself. Each entry stands alone, and the list is meant to grow as new tools turn up.

## File Transfer And Networking

- https://github.com/juanfont/headscale — Open source, self-hosted implementation of the Tailscale control server; run your own mesh VPN coordination server instead of relying on Tailscale's hosted service.
- https://github.com/tonyantony300/alt-sendme — Peer-to-peer file transfer tool using Iroh; no cloud storage, end-to-end encrypted, resumable, cross-platform.
- https://github.com/nats-io/nats-server — CNCF cloud and edge native messaging system; 40+ client languages, runs from cloud to Raspberry Pi.
- https://github.com/tuanngocptn/nport — Free ngrok alternative using Cloudflare Tunnels; instant HTTP/HTTPS tunnels with custom subdomains, no account required.
- https://try.cloudflare.com/ — Cloudflare Quick Tunnels: `cloudflared tunnel --url http://localhost:8000` instantly creates a public HTTPS URL (`*.trycloudflare.com`) for a locally running service — no account, DNS record, or open inbound port needed. `cloudflared` only opens an outbound connection to the nearest edge, so the router receives no inbound traffic; HTTPS and DDoS protection are automatic and the real IP stays hidden. Tunnels are ephemeral and die with the process, so there is nothing to clean up. Add `--output json` so scripts or coding agents can read the URL. Good for sharing previews, receiving webhooks, browser testing, or giving an agent a real endpoint. This is the foundation behind [nport](https://github.com/tuanngocptn/nport) above.

> **See also:** [VPN Proxy Firewall](/Technology/Cloud And DevOps/Tools/VPN Proxy Firewall) · [NAT And Port](/Technology/Cloud And DevOps/Concepts/Network/NAT And Port)

## Google Cloud Platform

### Resources

- Google File System (storing files the way Google does): https://viblo.asia/p/google-file-system-gfs-luu-tru-file-nhu-google-x7Z4DAgoJnX

> **See also:** [VPC And Availability Zones](/Technology/Cloud And DevOps/Concepts/Network/VPC And Availability Zones) · [Kubernetes](/Technology/Cloud And DevOps/Tools/Kubernetes)

## Server Monitoring

- Cachet: cachethq/cachet: 🚦 The open-source status page system. (github.com) - https://github.com/cachethq/cachet

> **See also:** [DevOps Tools](/Technology/Cloud And DevOps/Tools/DevOps Tools) · [VPS Hosting](/Technology/Cloud And DevOps/Tools/VPS Hosting)
