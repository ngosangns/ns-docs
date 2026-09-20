---
area: technology
domain: cloud-devops
type: resource
title: File Transfer And Networking
description: Mesh VPN, tunnel, P2P file transfer, và messaging infrastructure
timestamp: '2026-09-20T00:00:00.000Z'
tags:
  - technology
  - cloud-devops
  - networking
resource: https://github.com/juanfont/headscale
---
# File Transfer And Networking

- https://github.com/juanfont/headscale — Open source, self-hosted implementation of the Tailscale control server; run your own mesh VPN coordination server instead of relying on Tailscale's hosted service.
- https://github.com/tonyantony300/alt-sendme — Peer-to-peer file transfer tool using Iroh; no cloud storage, end-to-end encrypted, resumable, cross-platform.
- https://github.com/nats-io/nats-server — CNCF cloud and edge native messaging system; 40+ client languages, runs from cloud to Raspberry Pi.
- https://github.com/tuanngocptn/nport — Free ngrok alternative using Cloudflare Tunnels; instant HTTP/HTTPS tunnels with custom subdomains, no account required.
- https://try.cloudflare.com/ — Cloudflare Quick Tunnels: `cloudflared tunnel --url http://localhost:8000` tạo ngay public HTTPS URL (`*.trycloudflare.com`) cho service chạy local — không cần account, DNS record, hay mở inbound port. `cloudflared` chỉ mở outbound connection tới edge gần nhất nên router không nhận traffic vào; tự động HTTPS + DDoS protection, IP thật không lộ. Tunnel ephemeral, chết theo process, không phải dọn dẹp. Thêm `--output json` để script hoặc coding agent đọc được URL. Hợp cho share preview, nhận webhook, browser test, hoặc cấp endpoint thật cho agent. Đây là nền tảng phía sau [nport](https://github.com/tuanngocptn/nport) ở trên.
