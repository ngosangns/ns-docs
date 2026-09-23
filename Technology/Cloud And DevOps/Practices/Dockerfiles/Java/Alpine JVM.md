---
area: technology
domain: docker
type: guide
title: Alpine JVM
description: A Java/Spring Boot Dockerfile on Alpine JRE with JVM tuning, graceful shutdown, a curl healthcheck, and OCI labels, balancing image size against maintainability.
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - docker
  - java
  - spring-boot
  - dockerfile
resource: http://127.0.0.1:8080/health
---

# Alpine JVM

## Techniques

- **Base image**: `eclipse-temurin:21-jre-alpine-3.22` (Alpine JRE)
- **Build image**: `eclipse-temurin:21-jdk-alpine-3.22`
- **Non-root user**: Creates an app user to run the application
- **JVM optimization**: Many JVM flags to tune performance
- **Graceful shutdown**: Graceful shutdown configured for Spring Boot
- **Healthcheck**: Uses curl for the healthcheck
- **OCI labels**: Complete metadata labels

## Advantages

- **Small size**: The Alpine base image is smaller than Debian
- **Tuned JVM**: Many flags to optimize memory and GC
- **Security**: Non-root user, minimal base image
- **Graceful shutdown**: Supports graceful shutdown via SIGTERM
- **Maintainable**: Easy to debug and maintain on Alpine
- **OCI compliant**: Full labels for traceability

## Disadvantages

- **Musl libc**: May cause compatibility issues with some libraries
- **No jlink**: Uses the full JRE, not as optimized as a custom JRE
- **Curl dependency**: curl must be installed for the healthcheck
- **Larger than distroless**: Still bigger than distroless images

## Use Cases

- Production environments that need a balance between size and maintainability
- When debugging capabilities are needed
- Applications that need JVM tuning
- When shell access is wanted for troubleshooting

## Dockerfile

```dockerfile
# Build-time arguments
ARG BUILD_JDK_IMAGE=eclipse-temurin:21-jdk-alpine-3.22
ARG RUNTIME_IMAGE=eclipse-temurin:21-jre-alpine-3.22

# ---------- Stage: builder ----------
FROM ${BUILD_JDK_IMAGE} AS builder

# Set non-interactive environment & reproducible timezone
ENV TZ=UTC \
  LANG=C.UTF-8 \
  LC_ALL=C.UTF-8 \
  GRADLE_USER_HOME=/cache/.gradle

WORKDIR /workspace

# Copy Gradle wrapper and descriptors
COPY gradlew .
COPY gradle/ gradle/
COPY build.gradle ./

RUN chmod +x ./gradlew

# Resolve dependencies using BuildKit cache mount
RUN --mount=type=cache,target=/cache/.gradle \
  ./gradlew --no-daemon dependencies || true

# Copy application source
COPY src/ src/

RUN --mount=type=cache,target=/cache/.gradle \
  ./gradlew --no-daemon clean bootJar -x test \
  -Dspring-framework.version=6.2.11 \
  -Dcommons-lang3.version=3.18.0 \
  -Dtomcat.version=10.1.47

# ---------- Stage: runtime ----------
FROM ${RUNTIME_IMAGE} AS runtime

ARG VERSION
ARG VCS_REF
ARG BUILD_DATE
ARG LICENSE="MIT License"
ARG SOURCE="contest-submission"

# OCI Labels (metadata)
LABEL org.opencontainers.image.title="spring-boot-template" \
  org.opencontainers.image.description="Spring Boot Java application built for Dockerfile Contest 2025" \
  org.opencontainers.image.url="${SOURCE}" \
  org.opencontainers.image.source="${SOURCE}" \
  org.opencontainers.image.version="${VERSION}" \
  org.opencontainers.image.revision="${VCS_REF}" \
  org.opencontainers.image.licenses="${LICENSE}" \
  org.opencontainers.image.created="${BUILD_DATE}" \
  org.opencontainers.image.authors="Dung Cao"

# Create non-root user
RUN addgroup -S app && adduser -S app -G app

WORKDIR /app

# Copy application jar
COPY lib/applicationinsights.json applicationinsights.json
COPY --from=builder --chown=app:app /workspace/build/libs/*.jar app.jar

# Install curl for healthcheck
RUN apk add --no-cache curl \
  && rm -rf /var/cache/apk/*

# Expose HTTP port
EXPOSE 8080

# Healthcheck
HEALTHCHECK --interval=10s --timeout=3s --start-period=10s --retries=3 \
  CMD curl -fsS http://127.0.0.1:8080/health || exit 1

# JVM optimization
ENV JAVA_OPTS="\
  -XX:+UseContainerSupport \
  -XX:MaxRAMPercentage=75.0 \
  -Djava.security.egd=file:/dev/./urandom \
  -Dserver.shutdown=graceful \
  -Dspring.lifecycle.timeout-per-shutdown-phase=10s \
  -Dfile.encoding=UTF-8 \
  -XX:+ExitOnOutOfMemoryError \
  -XX:+UseG1GC \
  -XX:+HeapDumpOnOutOfMemoryError \
  -XX:HeapDumpPath=/tmp \
  "

# Graceful termination signal
STOPSIGNAL SIGTERM

# Switch to non-root user
USER app

# --- Entry point ---
ENTRYPOINT ["sh", "-c", "exec java ${JAVA_OPTS} -jar /app/app.jar"]
```

## Code Highlights

```dockerfile
# JVM optimization flags
ENV JAVA_OPTS="\
  -XX:+UseContainerSupport \
          # Respect container memory limits
  -XX:MaxRAMPercentage=75.0 \
          # Use 75% of container memory
  -XX:+UseG1GC \
          # G1 garbage collector
  -XX:+ExitOnOutOfMemoryError \
          # Fail fast on OOM
  -Dserver.shutdown=graceful \
          # Graceful shutdown
  "

# Graceful shutdown
STOPSIGNAL SIGTERM
```

> **See also:** [Optimization Techniques](/Technology/Cloud And DevOps/Practices/Dockerfiles/Java/Optimization Techniques) · [Ultra Optimized](/Technology/Cloud And DevOps/Practices/Dockerfiles/Java/Ultra Optimized) · [Distroless JLink](/Technology/Cloud And DevOps/Practices/Dockerfiles/Java/Distroless JLink)
