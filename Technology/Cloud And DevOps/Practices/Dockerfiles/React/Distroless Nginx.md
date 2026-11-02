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

Distroless Nginx shows how to serve a React and Vite build from a scratch image under 6MB. The build has five stages. One stage compiles nginx with static linking and no unneeded modules, then strips the binary and compresses it with UPX LZMA. Another stage compresses every text asset with both gzip and Brotli in parallel, and a rootfs stage assembles a minimal filesystem with the config, mime types, and a nobody user. The final image copies the binary and that filesystem, then runs as UID 65534 with a healthcheck. The note sets out the trade-offs. You get HTTP/2, SSL/TLS, and no shell for an attacker to use, but builds are long, the setup is complex, and debugging without a shell is hard. It ends with the key build flags.

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

Compiling nginx from source makes the build long, and the flags must be maintained by hand. Static linking, stripped symbols, and UPX LZMA push the scratch image under 6MB. Brotli sits beside gzip and is about 20 percent better on text assets. With no shell, debugging is hard, and UPX can slow startup a little.

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
