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
