---
area: technology
domain: programming-languages
type: note
---

# 4. Ultra-optimized: Custom JRE + Spring Boot Layers + tini

> **Xem thêm:** [[java-dockerfile-optimization-techniques|Dockerfile Optimization Techniques cho Java]]

### Kỹ thuật

- **Base image**: `alpine:3.21` (minimal Alpine)
- **Build image**: `eclipse-temurin:21-jdk-alpine`
- **Custom JRE với jlink**: Tạo minimal JRE chỉ với modules cần thiết
- **Spring Boot layers**: Extract JAR thành layers để tối ưu Docker layer caching
- **tini init system**: Sử dụng tini cho proper signal handling
- **Static JRE modules**: Hardcode modules thay vì dùng jdeps
- **Multi-stage build**: 3 stages (builder, extracted, runtime)
- **Non-root user**: UID/GID 1654 (CIS compliance)
- **SHA256 pinning**: Pin base images với SHA256 digests

### Ưu điểm

- **Kích thước cực nhỏ**: Custom JRE + Alpine + layers = rất nhỏ
- **Layer caching tối ưu**: Spring Boot layers giúp cache hiệu quả
- **Proper signal handling**: tini đảm bảo graceful shutdown
- **Security**: Non-root user, minimal base, SHA256 pinning
- **Performance**: JVM flags tối ưu cho containers
- **Compliance**: CIS Docker Benchmark compliant

### Nhược điểm

- **Build time rất dài**: Phải build custom JRE, extract layers
- **Phức tạp nhất**: Nhiều stages, nhiều optimizations
- **Hardcoded modules**: Phải maintain list modules manually
- **Khó debug**: Minimal image, ít tools
- **Maintenance overhead**: Nhiều moving parts cần maintain

### Use cases

- Production environments cần tối ưu tối đa
- High-scale deployments cần minimize resource usage
- Compliance requirements (CIS, security standards)
- Khi kích thước image là critical factor

### Dockerfile

```dockerfile
# syntax=docker/dockerfile:1.7

# =============================================================================
# STAGE 1: Application builder with optimized caching
# ============================================================================
FROM eclipse-temurin:21-jdk-alpine@sha256:89517925fa675c6c4b770bee7c44d38a7763212741b0d6fca5a5103caab21a97 AS builder

# Install build dependencies (minimal)
RUN apk add --no-cache binutils && \
  rm -rf /var/cache/apk/*

WORKDIR /build

# Copy Gradle wrapper and dependency definition files first
# This layer will be cached until these files change
COPY gradle/ gradle/
COPY gradlew build.gradle ./

# Download dependencies with BuildKit cache mount for faster subsequent builds
RUN --mount=type=cache,id=gradle-cache,target=/root/.gradle,sharing=locked \
  chmod +x gradlew && \
  ./gradlew dependencies --no-daemon --parallel --console=plain

# Copy only production source code (exclude tests, docs, etc.)
COPY src/main/ src/main/

# Build optimized JAR with cache mount
RUN --mount=type=cache,id=gradle-cache,target=/root/.gradle,sharing=locked \
  ./gradlew bootJar --no-daemon --parallel --console=plain -x test && \
  mkdir -p /app && \
  mv build/libs/spring-boot-template.jar /app/app.jar

# Extract Spring Boot layers for optimal Docker layer caching
WORKDIR /app
RUN java -Djarmode=layertools -jar app.jar extract --destination /app/extracted

# Create minimal custom JRE with jlink (reduces size by >100MB)
# Only include Java modules actually needed by Spring Boot
RUN $JAVA_HOME/bin/jlink \
  --add-modules java.base,java.compiler,java.desktop,java.instrument,java.management,java.management.rmi,java.naming,java.net.http,java.prefs,java.rmi,java.scripting,java.security.jgss,java.security.sasl,java.sql,jdk.httpserver,jdk.jfr,jdk.unsupported \
  --strip-debug \
  --no-man-pages \
  --no-header-files \
  --compress=zip-9 \
  --output /jre-minimal

# =============================================================================
# STAGE 3: Minimal runtime image
# ============================================================================
FROM alpine:3.21@sha256:5405e8f36ce1878720f71217d664aa3dea32e5e5df11acbf07fc78ef5661465b

# Install only critical runtime dependencies
# ca-certificates: for HTTPS connections
# tini: proper init system for PID 1
# tzdata: timezone support
# curl: for healthcheck
RUN apk upgrade --no-cache && \
  apk add --no-cache \
  ca-certificates \
  tzdata \
  tini \
  curl && \
  rm -rf /var/cache/apk/* /tmp/*

# Create non-root user for security (CIS Docker Benchmark compliance)
RUN addgroup -g 1654 -S appgroup && \
  adduser -u 1654 -S appuser -G appgroup

# Copy minimal custom JRE from builder
COPY --from=builder --chown=1654:1654 /jre-minimal /opt/java

# Set up application directory with proper ownership
WORKDIR /app

# Copy Spring Boot layers in optimal order (least to most frequently changed)
# This maximizes Docker layer cache efficiency
COPY --from=builder --chown=1654:1654 /app/extracted/dependencies/ ./
COPY --from=builder --chown=1654:1654 /app/extracted/spring-boot-loader/ .
COPY --from=builder --chown=1654:1654 /app/extracted/snapshot-dependencies/ .
COPY --from=builder --chown=1654:1654 /app/extracted/application/ .

# Switch to non-root user (security best practice)
USER 1654:1654

# Set JAVA_HOME and PATH
ENV JAVA_HOME=/opt/java \
  PATH="/opt/java/bin:${PATH}"

# Optimal JVM flags for containerized Spring Boot applications
# - UseContainerSupport: respect container memory limits
# - MaxRAMPercentage: use max 75% of container memory for heap
# - UseG1GC: best GC for containers with predictable pause times
# - UseStringDeduplication: reduce memory footprint
# - ExitOnOutOfMemoryError: fail fast on OOM
# - TieredCompilation with level 1: faster startup, good for short-lived containers
ENV JAVA_TOOL_OPTIONS="-XX:+UseContainerSupport \
  -XX:MaxRAMPercentage=75.0 \
  -XX:InitialRAMPercentage=50.0 \
  -XX:+UseG1GC \
  -XX:MaxGCPauseMillis=100 \
  -XX:+UseStringDeduplication \
  -XX:+ParallelRefProcEnabled \
  -XX:+DisableExplicitGC \
  -XX:+ExitOnOutOfMemoryError \
  -Djava.security.egd=file:/dev/./urandom \
  -Djava.awt.headless=true"

# Application server port
EXPOSE 8080

# Comprehensive OCI labels for traceability and compliance
LABEL org.opencontainers.image.title="Spring Boot Template" \
  org.opencontainers.image.description="HMCTS Spring Boot Template - Optimized for Contest 2025" \
  org.opencontainers.image.vendor="HMCTS Reform Programme" \
  org.opencontainers.image.authors="HMCTS <hmcts@justice.gov.uk>" \
  org.opencontainers.image.source="https://github.com/hmcts/spring-boot-template" \
  org.opencontainers.image.version="0.0.1" \
  org.opencontainers.image.revision="contest-2025" \
  org.opencontainers.image.licenses="MIT" \
  org.opencontainers.image.base.name="docker.io/library/alpine:3.21" \
  org.opencontainers.image.base.digest="sha256:5405e8f36ce1878720f71217d664aa3dea32e5e5df11acbf07fc78ef5661465b" \
  maintainer="HMCTS Reform Team" \
  com.hmcts.app.name="spring-boot-template" \
  com.hmcts.build.date="2025-10-27"

# Health check using Spring Boot Actuator /health endpoint
# Using curl for lightweight health checks
HEALTHCHECK --interval=30s --timeout=5s --start-period=60s --retries=3 \
  CMD curl -f http://localhost:8080/health || exit 1

# Use tini as init system for proper signal handling
# Ensures graceful shutdown and zombie process reaping
ENTRYPOINT ["/sbin/tini", "--"]

# Run Spring Boot application
# Using exec form to ensure proper signal propagation
CMD ["java", "org.springframework.boot.loader.launch.JarLauncher"]
```

### Code highlights

```dockerfile
# Extract Spring Boot layers để tối ưu Docker layer caching
RUN java -Djarmode=layertools -jar app.jar extract --destination /app/extracted

# Copy layers theo thứ tự từ ít thay đổi đến nhiều thay đổi
COPY --from=builder /app/extracted/dependencies/ ./        # Ít thay đổi nhất
COPY --from=builder /app/extracted/spring-boot-loader/ .
COPY --from=builder /app/extracted/snapshot-dependencies/ .
COPY --from=builder /app/extracted/application/ .        # Thay đổi nhiều nhất

# Custom JRE với hardcoded modules
RUN $JAVA_HOME/bin/jlink \
  --add-modules java.base,java.compiler,java.desktop,...
  --strip-debug \
  --compress=zip-9 \
  --output /jre-minimal

# tini init system cho proper signal handling
ENTRYPOINT ["/sbin/tini", "--"]
CMD ["java", "org.springframework.boot.loader.launch.JarLauncher"]
```

---

## So sánh các kỹ thuật

| Tiêu chí             | Distroless + jdeps | Auto-update         | Alpine + JVM Opt    | Ultra-optimized |
| -------------------- | ------------------ | ------------------- | ------------------- | --------------- |
| **Kích thước image** | Nhỏ (~150MB)       | Trung bình (~200MB) | Trung bình (~180MB) | Rất nhỏ (~80MB) |
| **Build time**       | Dài                | Rất dài             | Trung bình          | Rất dài         |
| **Bảo mật**          | Cực tốt            | Tốt                 | Tốt                 | Cực tốt         |
| **Maintainability**  | Khó                | Rất khó             | Dễ                  | Khó             |
| **Debug capability** | Không có shell     | Không có shell      | Có shell            | Hạn chế         |
| **Performance**      | Tốt                | Tốt                 | Rất tốt             | Cực tốt         |
| **Layer caching**    | Tốt                | Tốt                 | Tốt                 | Cực tốt         |
| **Compliance**       | Tốt                | Tốt                 | Tốt                 | Cực tốt         |

---

## Kỹ thuật tối ưu chung

### 1. Multi-stage Build

- **Mục đích**: Giảm kích thước final image bằng cách loại bỏ build dependencies
- **Cách làm**: Tách builder stage và production stage
- **Lợi ích**: Final image chỉ chứa runtime dependencies
- **Best practice**: Sử dụng ít nhất 2 stages (build + runtime)

### 2. Layer Caching

- **Mục đích**: Tối ưu build time bằng cách cache các layers không thay đổi
- **Cách làm**: Copy Gradle wrapper và build.gradle trước, install dependencies, sau đó mới copy source code
- **Lợi ích**: Khi source code thay đổi, không cần reinstall dependencies
- **Best practice**: Copy files theo thứ tự từ ít thay đổi đến nhiều thay đổi

### 3. BuildKit Cache Mount

- **Mục đích**: Cache Gradle dependencies giữa các lần build
- **Cách làm**: `RUN --mount=type=cache,target=/root/.gradle`
- **Lợi ích**: Dependencies được cache, build nhanh hơn nhiều
- **Best practice**: Sử dụng `sharing=locked` cho parallel builds

### 4. Custom JRE với jlink

- **Mục đích**: Giảm kích thước JRE bằng cách chỉ include modules cần thiết
- **Cách làm**: Sử dụng `jdeps` để phân tích dependencies, sau đó `jlink` để tạo custom JRE
- **Lợi ích**: Giảm kích thước JRE từ ~300MB xuống ~50-100MB
- **Trade-off**: Build time tăng, phải maintain list modules

### 5. Spring Boot Layers

- **Mục đích**: Tối ưu Docker layer caching bằng cách tách JAR thành layers
- **Cách làm**: `java -Djarmode=layertools -jar app.jar extract`
- **Lợi ích**: Khi application code thay đổi, không cần rebuild dependencies layer
- **Best practice**: Copy layers theo thứ tự từ ít thay đổi đến nhiều thay đổi

### 6. Non-root User

- **Mục đích**: Tăng security bằng cách chạy application với non-root user
- **Cách làm**: Tạo user với `adduser`, sau đó `USER` directive
- **Lợi ích**: Giảm attack surface, compliance với CIS Docker Benchmark
- **Best practice**: Sử dụng UID/GID cụ thể (không phải random)

### 7. JVM Optimization Flags

- **Mục đích**: Tối ưu JVM performance trong containers
- **Flags quan trọng**:
  - `-XX:+UseContainerSupport`: Respect container memory limits
  - `-XX:MaxRAMPercentage=75.0`: Use 75% of container memory for heap
  - `-XX:+UseG1GC`: G1 garbage collector (tốt cho containers)
  - `-XX:+ExitOnOutOfMemoryError`: Fail fast on OOM
- **Lợi ích**: Better memory management, predictable performance

### 8. Graceful Shutdown

- **Mục đích**: Đảm bảo application shutdown gracefully khi nhận SIGTERM
- **Cách làm**:
  - Spring Boot: `-Dserver.shutdown=graceful`
  - Sử dụng tini: `ENTRYPOINT ["/sbin/tini", "--"]`
  - `STOPSIGNAL SIGTERM`
- **Lợi ích**: Không mất requests đang xử lý, clean shutdown

### 9. Healthcheck

- **Mục đích**: Monitor application health
- **Các cách**:
  - External tool: `wget`, `curl` (cần install)
  - Java class: Compile Java class cho healthcheck
  - Spring Boot Actuator: `/health` endpoint
- **Best practice**: Sử dụng `--start-period` để cho app time khởi động

### 10. SHA256 Pinning

- **Mục đích**: Đảm bảo reproducible builds và security
- **Cách làm**: Pin base images với `@sha256:...`
- **Lợi ích**: Tránh supply chain attacks, reproducible builds
- **Best practice**: Luôn pin base images trong production

### 11. OCI Labels

- **Mục đích**: Metadata cho traceability và compliance
- **Cách làm**: Sử dụng `org.opencontainers.image.*` labels
- **Lợi ích**: Dễ trace images, compliance với standards
- **Best practice**: Include version, source, license, authors

### 12. Distroless Images

- **Mục đích**: Minimal attack surface bằng cách loại bỏ shell và tools
- **Cách làm**: Sử dụng `gcr.io/distroless/*` hoặc `scratch`
- **Lợi ích**: Cực kỳ secure, không có shell để exploit
- **Trade-off**: Khó debug, cần external tools cho healthcheck

---

## Khi nào dùng kỹ thuật nào?

### 1. Distroless + jdeps

- Production environments cần bảo mật cao
- Microservices cần kích thước nhỏ
- Khi muốn tự động phân tích dependencies

### 2. Auto-update

- Development environments
- CI/CD pipelines với automated security scanning
- Projects cần thường xuyên update dependencies
- **Không nên dùng trong production**

### 3. Alpine + JVM Opt

- Production environments cần cân bằng giữa size và maintainability
- Khi cần debug capabilities
- Applications cần JVM tuning
- Khi muốn có shell access

### 4. Ultra-optimized

- Production environments cần tối ưu tối đa
- High-scale deployments
- Compliance requirements
- Khi kích thước image là critical factor

---

## Security Considerations

- **Non-root user**: Luôn chạy application với non-root user
- **SHA256 pinning**: Pin base images để tránh supply chain attacks
- **Minimal base**: Sử dụng distroless hoặc Alpine để giảm attack surface
- **No unnecessary tools**: Loại bỏ tools không cần thiết (shell, package manager)
- **Security scanning**: Scan images với security scanners (Trivy, Snyk)
- **Dependency updates**: Thường xuyên update dependencies để fix vulnerabilities

---

## Performance Considerations

- **JVM flags**: Tối ưu JVM flags cho containers
- **Memory management**: Sử dụng `UseContainerSupport` và `MaxRAMPercentage`
- **GC tuning**: Chọn GC phù hợp (G1GC cho containers)
- **Layer caching**: Tối ưu layer ordering để maximize cache hits
- **BuildKit cache**: Sử dụng cache mounts cho Gradle dependencies

---

## Build Optimization

- **BuildKit cache mounts**: Cache Gradle dependencies giữa các lần build
- **Layer ordering**: Copy files theo thứ tự từ ít thay đổi đến nhiều thay đổi
- **Parallel operations**: Sử dụng `--parallel` khi có thể
- **Skip tests**: `-x test` trong production builds (chạy tests riêng)
- **Cleanup**: Xóa build artifacts ngay sau khi build xong

---

## Best Practices Summary

1. **Luôn sử dụng multi-stage build**
2. **Pin base images với SHA256**
3. **Sử dụng non-root user**
4. **Tối ưu layer caching**
5. **Sử dụng BuildKit cache mounts**
6. **JVM optimization flags cho containers**
7. **Graceful shutdown với tini**
8. **Healthcheck cho monitoring**
9. **OCI labels cho traceability**
10. **Security scanning trước khi deploy**

---

## References

- [Spring Boot Docker Best Practices](https://spring.io/guides/gs/spring-boot-docker/)
- [jlink Documentation](https://docs.oracle.com/en/java/javase/21/docs/specs/man/jlink.html)
- [jdeps Documentation](https://docs.oracle.com/en/java/javase/21/docs/specs/man/jdeps.html)
- [Docker Best Practices](https://docs.docker.com/develop/dev-best-practices/)
- [CIS Docker Benchmark](https://www.cisecurity.org/benchmark/docker)
