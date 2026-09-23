---
area: technology
domain: manga-translation
type: tool
title: Cotrans
description: Cotrans is a collaborative online manga translation platform built on manga-image-translator, offering a web UI, browser extension and worker-based backend.
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - manga-translation
  - ocr
resource: https://github.com/VoileLabs/cotrans
---

# Cotrans

## Definition

**Cotrans** is a collaborative online image/manga translation platform built on manga-image-translator. It provides a web UI, a browser extension, and a worker-based architecture for collaborative translation. Hosted at cotrans.touhou.ai.

- **Repository**: https://github.com/VoileLabs/cotrans
- **Website**: https://cotrans.touhou.ai
- **License**: GPL-3.0

## Key Metrics

- **Stars**: 270
- **Forks**: 24
- **Language**: TypeScript (primary), Python, Rust
- **Architecture**: Microservices (Gateway + Image Processing Workers)

## Architecture

```
┌─────────────────────────────────────────────────┐
│                 Cotrans Platform                  │
├─────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────────────────┐  │
│  │  Frontend   │  │  Browser Extension      │  │
│  │  (Vue.js)   │  │  (Userscript)           │  │
│  └──────┬──────┘  └───────────┬─────────────┘  │
│         └──────────┬──────────┘                 │
│                    ▼                            │
│         ┌─────────────────────┐                │
│         │  Gateway Worker     │                │
│         │  (Cloudflare)       │                │
│         └──────────┬──────────┘                │
│                    ▼                            │
│         ┌─────────────────────┐                │
│         │  Image Processing   │                │
│         │  Worker (Python)    │                │
│         │  manga-image-trans  │                │
│         └─────────────────────┘                │
└─────────────────────────────────────────────────┘
```

## Key Features

| Feature           | Description                       |
| ----------------- | --------------------------------- |
| Collaborative     | Multiple users translate together |
| Web UI            | Vue.js frontend                   |
| Browser extension | Chrome/Firefox extension          |
| Userscript        | Direct browser injection          |
| Worker-based      | Scalable processing architecture  |
| Protobuf          | Efficient communication           |

## Tech Stack

| Component       | Technology                      |
| --------------- | ------------------------------- |
| Frontend        | Vue.js, TypeScript              |
| Gateway         | Cloudflare Workers              |
| Processing      | Python (manga-image-translator) |
| Communication   | Protobuf                        |
| Package Manager | pnpm                            |

## Installation

### Use online

Go to [cotrans.touhou.ai](https://cotrans.touhou.ai) - no installation needed.

### Self-host

```bash
pnpm install
# Docker-based microservices setup
# See the repository for details
```

## Pros

| Pro                         | Description                     |
| --------------------------- | ------------------------------- |
| No install needed           | Use it directly on the web      |
| Collaborative               | Many users at the same time     |
| Browser extension           | Easy to integrate into workflow |
| Scalable                    | Worker-based architecture       |
| Uses manga-image-translator | Leverages the flagship pipeline |

## Cons

| Con                                 | Description                     |
| ----------------------------------- | ------------------------------- |
| GPL-3.0                             | Copyleft license                |
| Complex self-host                   | Complicated microservices setup |
| Dependent on manga-image-translator | Shares the same limitations     |
| Hosting costs                       | Needs server resources          |

## When to Use

- **Quick translation**: you don't want to install anything, just use the web
- **Collaborative projects**: a team translating manga together
- **Browser workflow**: you want to translate directly in the browser
- **Touhou community**: built by and for the Touhou community

---

**References**:

- [VoileLabs/cotrans](https://github.com/VoileLabs/cotrans)
- [cotrans.touhou.ai](https://cotrans.touhou.ai)

> **See also:** [Manga Image Translator](/Technology/AI/Tools/Manga Translator/Manga Image Translator) · [Translator Comparison](/Technology/AI/Tools/Manga Translator/Translator Comparison) · [Manga Translator Others](/Technology/AI/Tools/Manga Translator/Manga Translator Others)
