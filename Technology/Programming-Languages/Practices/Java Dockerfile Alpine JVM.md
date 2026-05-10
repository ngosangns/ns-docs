---
area: technology
domain: programming-languages
type: note
---

# 3. Alpine với JVM Optimization

> **Xem thêm:** [[Java Dockerfile Optimization Techniques|Dockerfile Optimization Techniques cho Java]]

### Kỹ thuật

- **Base image**: `eclipse-temurin:21-jre-alpine-3.22` (Alpine JRE)
- **Build image**: `eclipse-temurin:21-jdk-alpine-3.22`
- **Non-root user**: Tạo app user để chạy application
- **JVM optimization**: Nhiều JVM flags để tối ưu performance
- **Graceful shutdown**: Cấu hình graceful shutdown cho Spring Boot
- **Healthcheck**: Sử dụng curl cho healthcheck
- **OCI labels**: Đầy đủ metadata labels

### Ưu điểm

- **Kích thước nhỏ**: Alpine base image nhỏ hơn Debian
- **JVM tối ưu**: Nhiều flags để tối ưu memory và GC
- **Security**: Non-root user, minimal base image
- **Graceful shutdown**: Hỗ trợ graceful shutdown với SIGTERM
- **Maintainable**: Dễ debug và maintain với Alpine
- **OCI compliant**: Đầy đủ labels cho traceability

### Nhược điểm

- **Musl libc**: Có thể có compatibility issues với một số libraries
- **Không có jlink**: Sử dụng full JRE, không tối ưu như custom JRE
- **Curl dependency**: Cần install curl cho healthcheck
- **Larger than distroless**: Vẫn lớn hơn distroless images

### Use cases

- Production environments cần cân bằng giữa size và maintainability
- Khi cần debug capabilities
- Applications cần JVM tuning
- Khi muốn có shell access cho troubleshooting

### Dockerfile

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

### Code highlights

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
