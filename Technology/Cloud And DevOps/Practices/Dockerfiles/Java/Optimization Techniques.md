---
area: technology
domain: docker
type: guide
title: Optimization Techniques
description: An overview of four Dockerfile optimization approaches for Java/Spring Boot applications, compared by image size, security, and performance.
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - docker
  - java
  - spring-boot
  - dockerfile
---

# Optimization Techniques

## Overview

A detailed analysis of four Dockerfile optimization techniques for Java/Spring Boot applications, ranging from simple to extremely optimized in terms of size, security, and performance.

## Contents

| #   | Technique                                                                                                                          | Description                                  | Size   |
| --- | ---------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- | ------ |
| 1   | [Distroless with Custom JRE (jlink) and jdeps](/Technology/Cloud And DevOps/Practices/Dockerfiles/Java/Distroless JLink)           | Custom JRE + auto dependency analysis        | ~150MB |
| 2   | [Auto-dependency Update with Java Healthcheck](/Technology/Cloud And DevOps/Practices/Dockerfiles/Java/Auto Dependency)            | Auto update dependencies + Java healthcheck  | ~200MB |
| 3   | [Alpine with JVM Optimization](/Technology/Cloud And DevOps/Practices/Dockerfiles/Java/Alpine JVM)                                 | Alpine + JVM tuning + graceful shutdown      | ~180MB |
| 4   | [Ultra-optimized: Custom JRE + Spring Boot Layers + tini](/Technology/Cloud And DevOps/Practices/Dockerfiles/Java/Ultra Optimized) | Custom JRE + layers + tini + full compliance | ~80MB  |

---

## Comparison of Techniques

| Criterion            | Distroless + jdeps | Auto-update     | Alpine + JVM Opt | Ultra-optimized    |
| -------------------- | ------------------ | --------------- | ---------------- | ------------------ |
| **Image size**       | Small (~150MB)     | Medium (~200MB) | Medium (~180MB)  | Very small (~80MB) |
| **Build time**       | Long               | Very long       | Medium           | Very long          |
| **Security**         | Excellent          | Good            | Good             | Excellent          |
| **Maintainability**  | Hard               | Very hard       | Easy             | Hard               |
| **Debug capability** | No shell           | No shell        | Has shell        | Limited            |
| **Performance**      | Good               | Good            | Very good        | Excellent          |
| **Layer caching**    | Good               | Good            | Good             | Excellent          |
| **Compliance**       | Good               | Good            | Good             | Excellent          |

---

## Common Optimization Techniques

### Multi-stage Build

- **Purpose**: Reduce the final image size by removing build dependencies
- **How**: Separate the builder stage from the production stage
- **Benefit**: The final image contains only runtime dependencies
- **Best practice**: Use at least 2 stages (build + runtime)

### Layer Caching

- **Purpose**: Optimize build time by caching layers that do not change
- **How**: Copy the Gradle wrapper and build.gradle first, install dependencies, and only then copy the source code
- **Benefit**: When source code changes, dependencies do not need to be reinstalled
- **Best practice**: Copy files from least frequently changed to most frequently changed

### BuildKit Cache Mount

- **Purpose**: Cache Gradle dependencies between builds
- **How**: `RUN --mount=type=cache,target=/root/.gradle`
- **Benefit**: Dependencies are cached, so builds are much faster
- **Best practice**: Use `sharing=locked` for parallel builds

### Custom JRE with jlink

- **Purpose**: Shrink the JRE by including only the required modules
- **How**: Use `jdeps` to analyze dependencies, then `jlink` to create the custom JRE
- **Benefit**: Reduces the JRE size from ~300MB to ~50-100MB
- **Trade-off**: Longer build time, and the module list must be maintained

### Spring Boot Layers

- **Purpose**: Optimize Docker layer caching by splitting the JAR into layers
- **How**: `java -Djarmode=layertools -jar app.jar extract`
- **Benefit**: When application code changes, the dependencies layer does not need to be rebuilt
- **Best practice**: Copy layers from least frequently changed to most frequently changed

### Non-root User

- **Purpose**: Improve security by running the application as a non-root user
- **How**: Create a user with `adduser`, then use the `USER` directive
- **Benefit**: Smaller attack surface, compliance with the CIS Docker Benchmark
- **Best practice**: Use a specific UID/GID (not a random one)

### JVM Optimization Flags

- **Purpose**: Optimize JVM performance in containers
- **Key flags**:
  - `-XX:+UseContainerSupport`: Respect container memory limits
  - `-XX:MaxRAMPercentage=75.0`: Use 75% of container memory for the heap
  - `-XX:+UseG1GC`: G1 garbage collector (good for containers)
  - `-XX:+ExitOnOutOfMemoryError`: Fail fast on OOM
- **Benefit**: Better memory management, predictable performance

### Graceful Shutdown

- **Purpose**: Ensure the application shuts down gracefully when it receives SIGTERM
- **How**:
  - Spring Boot: `-Dserver.shutdown=graceful`
  - Use tini: `ENTRYPOINT ["/sbin/tini", "--"]`
  - `STOPSIGNAL SIGTERM`
- **Benefit**: In-flight requests are not lost, and shutdown is clean

### Healthcheck

- **Purpose**: Monitor application health
- **Options**:
  - External tool: `wget`, `curl` (must be installed)
  - Java class: Compile a Java class for the healthcheck
  - Spring Boot Actuator: the `/health` endpoint
- **Best practice**: Use `--start-period` to give the app time to start

### SHA256 Pinning

- **Purpose**: Ensure reproducible builds and security
- **How**: Pin base images with `@sha256:...`
- **Benefit**: Avoids supply chain attacks and gives reproducible builds
- **Best practice**: Always pin base images in production

### OCI Labels

- **Purpose**: Metadata for traceability and compliance
- **How**: Use `org.opencontainers.image.*` labels
- **Benefit**: Easier image tracing and compliance with standards
- **Best practice**: Include version, source, license, and authors

### Distroless Images

- **Purpose**: Minimize the attack surface by removing the shell and tools
- **How**: Use `gcr.io/distroless/*` or `scratch`
- **Benefit**: Extremely secure, with no shell to exploit
- **Trade-off**: Hard to debug, and external tools are needed for the healthcheck

---

## When to Use Which Technique

### Distroless + jdeps

- Production environments that need high security
- Microservices that need small images
- When you want automatic dependency analysis

### Auto-update

- Development environments
- CI/CD pipelines with automated security scanning
- Projects that need frequent dependency updates
- **Should not be used in production**

### Alpine + JVM Opt

- Production environments that need a balance between size and maintainability
- When debugging capabilities are needed
- Applications that need JVM tuning
- When you want shell access

### Ultra-optimized

- Production environments that need maximum optimization
- High-scale deployments
- Compliance requirements
- When image size is a critical factor

---

## Security Considerations

- **Non-root user**: Always run the application as a non-root user
- **SHA256 pinning**: Pin base images to avoid supply chain attacks
- **Minimal base**: Use distroless or Alpine to reduce the attack surface
- **No unnecessary tools**: Remove unneeded tools (shell, package manager)
- **Security scanning**: Scan images with security scanners (Trivy, Snyk)
- **Dependency updates**: Update dependencies regularly to fix vulnerabilities

---

## Performance Considerations

- **JVM flags**: Tune JVM flags for containers
- **Memory management**: Use `UseContainerSupport` and `MaxRAMPercentage`
- **GC tuning**: Choose an appropriate GC (G1GC for containers)
- **Layer caching**: Optimize layer ordering to maximize cache hits
- **BuildKit cache**: Use cache mounts for Gradle dependencies

---

## Build Optimization

- **BuildKit cache mounts**: Cache Gradle dependencies between builds
- **Layer ordering**: Copy files from least frequently changed to most frequently changed
- **Parallel operations**: Use `--parallel` where possible
- **Skip tests**: `-x test` in production builds (run tests separately)
- **Cleanup**: Remove build artifacts right after the build finishes

---

## Best Practices Summary

1. **Always use multi-stage builds**
2. **Pin base images with SHA256**
3. **Use a non-root user**
4. **Optimize layer caching**
5. **Use BuildKit cache mounts**
6. **JVM optimization flags for containers**
7. **Graceful shutdown with tini**
8. **Healthcheck for monitoring**
9. **OCI labels for traceability**
10. **Security scanning before deployment**

---

## References

- [Spring Boot Docker Best Practices](https://spring.io/guides/gs/spring-boot-docker/)
- [jlink Documentation](https://docs.oracle.com/en/java/javase/21/docs/specs/man/jlink.html)
- [jdeps Documentation](https://docs.oracle.com/en/java/javase/21/docs/specs/man/jdeps.html)
- [Docker Best Practices](https://docs.docker.com/develop/dev-best-practices/)
- [CIS Docker Benchmark](https://www.cisecurity.org/benchmark/docker)

> **See also:** [Distroless JLink](/Technology/Cloud And DevOps/Practices/Dockerfiles/Java/Distroless JLink) · [Alpine JVM](/Technology/Cloud And DevOps/Practices/Dockerfiles/Java/Alpine JVM) · [Ultra Optimized](/Technology/Cloud And DevOps/Practices/Dockerfiles/Java/Ultra Optimized)
