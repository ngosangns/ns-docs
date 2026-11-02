---
area: technology
domain: docker
type: guide
title: BusyBox Httpd
description: A React/Vite Dockerfile that serves gzip-precompressed static files with BusyBox httpd on the 92.5 KB lipanski/docker-static-website base image.
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - docker
  - react
  - busybox
  - dockerfile-optimization
---

# BusyBox Httpd

BusyBox Httpd is the smallest option in this set of React and Vite image builds. A Node Alpine stage installs dependencies and builds the app, then compresses the static files with gzip level 9. The production stage is the lipanski/docker-static-website base at 92.5 KB and serves those files with BusyBox httpd. BusyBox sends the .gz files automatically when the client supports gzip, so there is almost no configuration to write. The note also covers layer caching and a BuildKit cache mount for the pnpm store, both of which keep rebuilds short. It then weighs the limits. There is no Brotli, no HTTP/2, no SSL/TLS, and only simple routing, so a reverse proxy is needed for HTTPS. Small static sites, internal tools, prototypes, and demos fit best.

## Techniques

- **Base image**: `lipanski/docker-static-website` (92.5 KB base)
- **Web server**: BusyBox httpd
- **Multi-stage build**: Builder stage (Node Alpine) + Production stage (BusyBox)
- **Pre-compression**: Gzip level 9 for all static files
- **Layer caching**: Package files are copied separately to optimize the cache
- **Cache mount**: Uses a BuildKit cache mount for the pnpm store

## Advantages

- **Extremely small size**: The base image is only 92.5 KB
- **Simple**: No complex configuration needed
- **Automatic gzip**: BusyBox httpd automatically serves .gz files when the client supports them
- **Fast builds**: Few dependencies and short build time
- **Security**: Minimal attack surface thanks to the tiny base image

## Disadvantages

- **Limited features**: BusyBox httpd has fewer features than Nginx
- **No Brotli support**: Only gzip is supported
- **No HTTP/2**: HTTP/1.1 only
- **No SSL/TLS**: A reverse proxy is needed for HTTPS
- **No advanced routing**: Limited ability to configure complex routing

## Use Cases

- Simple static sites
- Internal tools that do not need HTTPS
- Prototypes and demos
- When image size matters more than features

Node Alpine only builds the app and gzip-compresses html, css, and js at level 9. The runtime is lipanski/docker-static-website at 92.5 KB, and BusyBox httpd serves the compressed file when the client accepts gzip. Copying package files, plus a BuildKit cache mount for the pnpm store, keeps rebuilds short. The health file says OK. You give up Brotli, HTTP/2, TLS, and complex routing, so HTTPS needs a reverse proxy. This fits a small static site, an internal tool, a prototype, or a demo.

## Code Highlights

```dockerfile
# Pre-compress with gzip level 9
find dist -type f \( \
  -name "*.html" -o -name "*.css" -o -name "*.js" \
  \) -exec sh -c 'gzip -9 "{}"' \;

# Minimal health check
echo "OK" > dist/health
```

> **See also:** [Optimization Techniques](/Technology/Cloud And DevOps/Practices/Dockerfiles/React/Optimization Techniques) · [Alpine Nginx](/Technology/Cloud And DevOps/Practices/Dockerfiles/React/Alpine Nginx) · [Go FastHTTP](/Technology/Cloud And DevOps/Practices/Dockerfiles/React/Go FastHTTP)
