---
area: technology
domain: docker
type: guide
title: Distroless Nginx
description: A React/Vite Dockerfile that compiles a fully static, UPX-compressed Nginx and ships it in a FROM scratch image under 6MB with gzip and Brotli assets.
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - docker
  - react
  - nginx
  - distroless
  - dockerfile-optimization
---

# Distroless Nginx

## Techniques

- **Base image**: `scratch` (distroless)
- **Custom nginx build**: Compiles nginx itself with static linking
- **UPX compression**: Compresses the nginx binary with UPX LZMA
- **Multi-stage**: 5 stages (builder, nginx-builder, compressor, rootfs, final)
- **Dual compression**: Gzip + Brotli for static assets
- **Parallel compression**: Uses `xargs -P` to compress in parallel
- **Symbol stripping**: Strips the binary to reduce size
- **Multi-arch support**: Can build for multiple architectures

## Advantages

- **Extremely small size**: <6MB final image (after UPX)
- **Optimized binary**: Static linking, stripped symbols, UPX compression
- **Dual compression**: Supports both gzip and Brotli (~20% better than gzip)
- **Performance**: Nginx with minimal modules, optimized for static files
- **Security**: Distroless means no shell, package manager, or tools
- **HTTP/2 support**: Supports HTTP/2 and SSL/TLS
- **Parallel compression**: Uses multiple cores to compress faster

## Disadvantages

- **Long build time**: nginx must be compiled from source
- **Complex**: Many stages and lots of configuration
- **Hard to debug**: No shell in a distroless image
- **Maintenance**: The nginx build must be maintained by hand when updates arrive
- **UPX overhead**: May slightly affect startup time

## Use Cases

- Production environments that need minimal size
- Container orchestration with resource constraints
- Edge deployments
- When HTTP/2 and SSL/TLS support are needed

## Code Highlights

```dockerfile
# Static linking with optimization flags
--with-cc-opt='-static -Os -ffunction-sections -fdata-sections' \
--with-ld-opt='-static -Wl,--gc-sections'

# UPX compression
upx --best --lzma /usr/local/nginx/sbin/nginx

# Parallel compression
find dist -type f ... | xargs -0 -P"$(nproc)" -I {} sh -c 'gzip -9 -k -f "{}" && brotli -q 11 -f "{}"'
```

> **See also:** [Scratch Nginx](/Technology/Cloud And DevOps/Practices/Dockerfiles/React/Scratch Nginx) · [Alpine Nginx](/Technology/Cloud And DevOps/Practices/Dockerfiles/React/Alpine Nginx) · [Optimization Techniques](/Technology/Cloud And DevOps/Practices/Dockerfiles/React/Optimization Techniques)
