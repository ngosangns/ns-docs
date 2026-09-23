---
area: technology
domain: docker
type: guide
title: Go FastHTTP
description: A React/Vite Dockerfile that embeds the built static files into a single UPX-compressed Go FastHTTP binary and runs it from a scratch image.
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - docker
  - react
  - go
  - fasthttp
  - dockerfile-optimization
---

# Go FastHTTP

## Techniques

- **Base image**: `scratch`
- **Go server**: FastHTTP (high-performance HTTP server)
- **Embedded files**: Uses `//go:embed` to embed static files into the binary
- **Single binary**: Everything in one file, no separate web server needed
- **UPX compression**: Compresses the binary with UPX ultra-brute LZMA
- **Static linking**: CGO_ENABLED=0 to produce a static binary

## Advantages

- **Extremely small size**: A single binary, possibly <5MB after UPX
- **High performance**: FastHTTP is much faster than Nginx for simple use cases
- **Simple**: No web server configuration needed
- **SPA routing**: Handles SPA routing automatically (falls back to index.html)
- **No dependencies**: No external files or libraries needed
- **Easy deployment**: Just copy one file

## Disadvantages

- **No HTTP/2**: FastHTTP does not natively support HTTP/2
- **Limited features**: Fewer features than Nginx (caching, rate limiting, etc.)
- **Go dependency**: The Go code must be maintained
- **No gzip_static**: Compression logic must be implemented in code
- **Less battle-tested**: FastHTTP is used less widely than Nginx

## Use Cases

- Microservices with high performance requirements
- Internal APIs that need to serve static files
- When you want to minimize size as far as possible
- When Nginx's advanced features are not needed

## Code Highlights

```dockerfile
# Embed files into the binary
//go:embed dist
var distFiles embed.FS

# Build with optimization
CGO_ENABLED=0 GOOS=linux go build -ldflags="-s -w" -trimpath -o server main.go
strip server
upx --ultra-brute --lzma server
```

> **See also:** [Optimization Techniques](/Technology/Cloud And DevOps/Practices/Dockerfiles/React/Optimization Techniques) · [BusyBox Httpd](/Technology/Cloud And DevOps/Practices/Dockerfiles/React/BusyBox Httpd) · [Scratch Nginx](/Technology/Cloud And DevOps/Practices/Dockerfiles/React/Scratch Nginx)
