# Cotrans - Collaborative Online Manga Translation Platform

## Định nghĩa

**Cotrans** là collaborative online image/manga translation platform được build trên manga-image-translator. Cung cấp web UI, browser extension, và worker-based architecture cho collaborative translation. Hosted tại cotrans.touhou.ai.

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

| Feature           | Description                      |
| ----------------- | -------------------------------- |
| Collaborative     | Nhiều người dùng cùng translate  |
| Web UI            | Vue.js frontend                  |
| Browser extension | Chrome/Firefox extension         |
| Userscript        | Direct browser injection         |
| Worker-based      | Scalable processing architecture |
| Protobuf          | Efficient communication          |

## Tech Stack

| Component       | Technology                      |
| --------------- | ------------------------------- |
| Frontend        | Vue.js, TypeScript              |
| Gateway         | Cloudflare Workers              |
| Processing      | Python (manga-image-translator) |
| Communication   | Protobuf                        |
| Package Manager | pnpm                            |

## Cài đặt

### Sử dụng online

Truy cập [cotrans.touhou.ai](https://cotrans.touhou.ai) - không cần install.

### Self-host

```bash
pnpm install
# Docker-based microservices setup
# Xem repository cho chi tiết
```

## Ưu điểm

| Ưu điểm                     | Mô tả                       |
| --------------------------- | --------------------------- |
| No install needed           | Dùng trực tiếp qua web      |
| Collaborative               | Nhiều người dùng cùng lúc   |
| Browser extension           | Dễ integrate vào workflow   |
| Scalable                    | Worker-based architecture   |
| Uses manga-image-translator | Leverages flagship pipeline |

## Nhược điểm

| Nhược điểm                          | Mô tả                        |
| ----------------------------------- | ---------------------------- |
| GPL-3.0                             | Copyleft license             |
| Complex self-host                   | Microservices setup phức tạp |
| Dependent on manga-image-translator | Cùng limitations             |
| Hosting costs                       | Cần server resources         |

## Sử dụng khi nào

- **Quick translation**: Không muốn install, dùng web
- **Collaborative projects**: Team cùng translate manga
- **Browser workflow**: Muốn translate trực tiếp trong browser
- **Touhou community**: Built by và cho Touhou community

---

**Tài liệu tham khảo**:

- [VoileLabs/cotrans](https://github.com/VoileLabs/cotrans)
- [cotrans.touhou.ai](https://cotrans.touhou.ai)
