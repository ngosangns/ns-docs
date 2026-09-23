---
area: technology
domain: networking
type: resource
title: File Transfer And Networking
description: Curated tools for mesh VPNs, tunnels, peer-to-peer file transfer and messaging infrastructure.
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - networking
  - cloud-devops
resource: https://github.com/juanfont/headscale
---

# File Transfer And Networking

- https://github.com/juanfont/headscale — Open source, self-hosted implementation of the Tailscale control server; run your own mesh VPN coordination server instead of relying on Tailscale's hosted service.
- https://github.com/tonyantony300/alt-sendme — Peer-to-peer file transfer tool using Iroh; no cloud storage, end-to-end encrypted, resumable, cross-platform.
- https://github.com/nats-io/nats-server — CNCF cloud and edge native messaging system; 40+ client languages, runs from cloud to Raspberry Pi.
- https://github.com/tuanngocptn/nport — Free ngrok alternative using Cloudflare Tunnels; instant HTTP/HTTPS tunnels with custom subdomains, no account required.
- https://try.cloudflare.com/ — Cloudflare Quick Tunnels: `cloudflared tunnel --url http://localhost:8000` instantly creates a public HTTPS URL (`*.trycloudflare.com`) for a locally running service — no account, DNS record, or open inbound port needed. `cloudflared` only opens an outbound connection to the nearest edge, so the router receives no inbound traffic; HTTPS and DDoS protection are automatic and the real IP stays hidden. Tunnels are ephemeral and die with the process, so there is nothing to clean up. Add `--output json` so scripts or coding agents can read the URL. Good for sharing previews, receiving webhooks, browser testing, or giving an agent a real endpoint. This is the foundation behind [nport](https://github.com/tuanngocptn/nport) above.

> **See also:** [VPN Proxy Firewall](/Technology/Cloud And DevOps/Tools/VPN Proxy Firewall) · [NAT And Port](/Technology/Cloud And DevOps/Concepts/Network/NAT And Port)
