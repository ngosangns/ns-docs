---
area: technology
domain: programming-languages
type: note
---
# Dockerfile Optimization Techniques cho Java/Spring Boot Applications

## Tổng quan

Phân tích chi tiết 4 kỹ thuật tối ưu Dockerfile cho Java/Spring Boot applications, từ đơn giản đến cực kỳ tối ưu về kích thước, bảo mật và hiệu năng.

---

## 1. Distroless với Custom JRE (jlink) và jdeps

### Kỹ thuật

- **Base image**: `gcr.io/distroless/base-debian12` (distroless)
- **Build image**: `eclipse-temurin:21-jdk`
- **Custom JRE**: Sử dụng `jlink` để tạo JRE tối thiểu chỉ chứa modules cần thiết
- **Dependency analysis**: Sử dụng `jdeps` để phân tích dependencies tự động
- **Multi-stage build**: 3 stages (build, healthcheck, runtime)
- **Layer extraction**: Extract JAR để phân tích dependencies
- **Gradle cache mount**: Sử dụng BuildKit cache mount cho Gradle dependencies

### Ưu điểm

- **Kích thước nhỏ**: Custom JRE chỉ chứa modules cần thiết, giảm ~100MB so với full JRE
- **Bảo mật cao**: Distroless = không có shell, package manager, hoặc tools
- **Tự động phân tích**: `jdeps` tự động xác định modules cần thiết
- **Gradle caching**: BuildKit cache mount giúp build nhanh hơn
- **Compression**: JRE được compress với zip-9
- **Healthcheck**: Sử dụng wget từ busybox cho healthcheck

### Nhược điểm

- **Build time dài**: Phải build custom JRE, phân tích dependencies
- **Phức tạp**: Nhiều stages, nhiều bước xử lý
- **Khó debug**: Không có shell trong distroless image
- **jdeps limitations**: Có thể không phát hiện hết dependencies (cần test kỹ)
- **Maintenance**: Phải rebuild JRE khi upgrade Java version

### Use cases

- Production environments cần bảo mật cao
- Microservices cần kích thước image nhỏ
- Khi muốn tối ưu memory footprint
- Compliance requirements (CIS Docker Benchmark)

### Dockerfile

```dockerfile
# Build stage
FROM eclipse-temurin:21-jdk AS build

WORKDIR /app

# Copy gradle wrapper and properties first for better caching
COPY gradlew gradlew.bat build.gradle ./
COPY gradle/ gradle/

# Download Gradle distribution (cached)
RUN --mount=type=cache,target=/root/.gradle ./gradlew --version

# Copy source code
COPY src/ src/

# Build the application
RUN --mount=type=cache,target=/root/.gradle ./gradlew --no-daemon clean bootJar \
    -Dspring-framework.version=6.2.11 \
    -Dtomcat.version=10.1.47

# Extract the application dependencies
RUN jar xf build/libs/spring-boot-template.jar

# Analyze the dependencies contained into the fat jar
RUN jdeps --ignore-missing-deps -q  \
  --recursive  \
  --multi-release 21  \
  --print-module-deps  \
  --class-path 'BOOT-INF/lib/*'  \
  build/libs/spring-boot-template.jar > deps.info

# Create the custom JRE
RUN jlink \
  --verbose \
  --add-modules $(cat deps.info) \
  --compress zip-9 \
  --no-header-files \
  --no-man-pages \
  --output /custom_jre

# Healthcheck stage
FROM busybox:1.36.0-musl AS healthcheck

# Runtime stage
FROM gcr.io/distroless/base-debian12
ENV JAVA_HOME=/opt/java/openjdk
ENV PATH="$JAVA_HOME/bin:$PATH"
COPY --from=build /custom_jre $JAVA_HOME

# Copy wget for healthcheck
COPY --from=healthcheck /bin/wget /usr/bin/wget

WORKDIR /app

# Copy application insights config
COPY lib/applicationinsights.json ./

# Copy the built JAR
COPY --from=build /app/build/libs/spring-boot-template.jar /app.jar

# Add labels
LABEL org.opencontainers.image.source="https://github.com/hmcts/spring-boot-template" \
  org.opencontainers.image.version="0.0.1" \
  org.opencontainers.image.licenses="MIT"

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD ["/usr/bin/wget", "--quiet", "--output-document=/dev/null", "http://localhost:8080/health"]

CMD ["java", "-jar", "/app.jar"]
```

### Code highlights

```dockerfile
# Phân tích dependencies tự động
RUN jdeps --ignore-missing-deps -q  \
  --recursive  \
  --multi-release 21  \
  --print-module-deps  \
  --class-path 'BOOT-INF/lib/*'  \
  build/libs/spring-boot-template.jar > deps.info

# Tạo custom JRE chỉ với modules cần thiết
RUN jlink \
  --verbose \
  --add-modules $(cat deps.info) \
  --compress zip-9 \
  --no-header-files \
  --no-man-pages \
  --output /custom_jre
```

---

## 2. Auto-dependency Update với Java Healthcheck

### Kỹ thuật

- **Base image**: `hmctspublic.azurecr.io/base/java:21-distroless` (custom distroless)
- **Build image**: `gradle:8.14.3-jdk21-alpine`
- **Auto dependency update**: Tự động update dependencies và plugins trong build time
- **Dependency analysis**: Sử dụng `dependencyUpdates` plugin để check updates
- **Java healthcheck**: Compile Java class cho healthcheck thay vì external tool
- **Multi-stage build**: 2 stages (builder, runtime)
- **Gradle caching**: Cache Gradle dependencies

### Ưu điểm

- **Auto security updates**: Tự động update dependencies để fix vulnerabilities
- **Flexible updates**: Có thể configure plugins và dependencies cần update
- **Java-native healthcheck**: Không cần external tools (wget, curl)
- **Alpine build**: Build image nhỏ hơn
- **Maintainable**: Dễ maintain với auto-update mechanism

### Nhược điểm

- **Build time rất dài**: Phải check và update dependencies mỗi lần build
- **Rủi ro breaking changes**: Auto-update có thể gây breaking changes
- **Phức tạp**: Logic update phức tạp với sed scripts
- **Khó debug**: Logic update có thể fail silently
- **Không production-ready**: Auto-update trong build không phù hợp production

### Use cases

- Development environments
- CI/CD pipelines với automated security scanning
- Projects cần thường xuyên update dependencies
- Khi muốn tự động hóa dependency management

### Dockerfile

```dockerfile
# Stage 1 — Build application using Gradle
FROM gradle:8.14.3-jdk21-alpine AS builder

WORKDIR /app

# Caching wrapper and build configuration before build
COPY gradlew ./
COPY gradle gradle
COPY build.gradle build.gradle

# Caching gradle/download
RUN ./gradlew --no-daemon help

# Copy src code
COPY src/main src/main

# Check dependency need to update
RUN ./gradlew --no-daemon dependencyUpdates -Drevision=release

# Auto update for auto vulnerability fixing
RUN REPORT_FILE="build/dependencyUpdates/report.txt" && \
    echo "=== Parsing $REPORT_FILE ===" && \
    \
    PLUGINS_TO_UPGRADE=${PLUGINS_TO_UPGRADE:-"org.springframework.boot org.sonarqube com.github.ben-manes.versions uk.gov.hmcts.java"} && \
    EXTS_TO_UPGRADE=${EXTS_TO_UPGRADE:-"org.apache.logging.log4j ch.qos.logback"} && \
    DEPENDENCIES_FORCE_UPDATE=${DEPENDENCIES_FORCE_UPDATE:-"org.apache.commons:commons-lang3:3.19.0"} && \
    \
    escape_sed() { printf '%s\n' "$1" | sed 's/[.[\*^$/&]/\\&/g'; } && \
    \
    # --- Plugin updates ---
    for plugin in $PLUGINS_TO_UPGRADE; do \
    LINE=$(grep -A1 "$plugin" "$REPORT_FILE" | grep '\[\[.* ->.*\]\]' | head -1 || true); \
    OLD_VERSION=$(echo "$LINE" | sed -E 's/.*\[\[.* -> .*\]\]/\1/' || true); \
    NEW_VERSION=$(echo "$LINE" | sed -E 's/.*\[.* -> (.*)\].*/\1/' || true); \
    if [ -n "$NEW_VERSION" ] && [ "$NEW_VERSION" != "$OLD_VERSION" ]; then \
    echo "===== Upgrading plugin $plugin: $OLD_VERSION → $NEW_VERSION"; \
    ESC_OLD=$(escape_sed "$OLD_VERSION"); \
    ESC_NEW=$(escape_sed "$NEW_VERSION"); \
    sed -i "s#id '$plugin' version '$ESC_OLD'#id '$plugin' version '$ESC_NEW'#g" build.gradle; \
    fi; \
    done && \
    \
    # --- ext{} version updates ---
    for prefix in $EXTS_TO_UPGRADE; do \
    LINE=$(grep -A1 "$prefix" "$REPORT_FILE" | grep '\[\[.* ->.*\]\]' | head -1 || true); \
    OLD_VERSION=$(echo "$LINE" | sed -E 's/.*\[\[.* -> .*\]\]/\1/' || true); \
    NEW_VERSION=$(echo "$LINE" | sed -E 's/.*\[.* -> (.*)\].*/\1/' || true); \
    if [ -n "$NEW_VERSION" ] && [ "$NEW_VERSION" != "$OLD_VERSION" ]; then \
    echo "===== Upgrading prefix $prefix: $OLD_VERSION → $NEW_VERSION"; \
    ESC_OLD=$(escape_sed "$OLD_VERSION"); \
    ESC_NEW=$(escape_sed "$NEW_VERSION"); \
    sed -i "s\"$ESC_OLD\"/\"$ESC_NEW\"/g" build.gradle; \
    fi; \
    done && \
    \
    # --- Force dependency updates with explicit GAV ---
    for dep in $DEPENDENCIES_FORCE_UPDATE; do \
    GROUP=$(echo "$dep" | cut -d':' -f1); \
    NAME=$(echo "$dep" | cut -d':' -f2); \
    NEW_VERSION=$(echo "$dep" | cut -d':' -f3); \
    if [ -z "$GROUP" ] || [ -z "$NAME" ] || [ -z "$NEW_VERSION" ]; then \
    echo "======  Invalid DEPENDENCIES_FORCE_UPDATE format for $dep, expected group:name:version"; \
    continue; \
    fi; \
    echo "====== Forcing dependency update: $GROUP:$NAME → $NEW_VERSION"; \
    ESC_GROUP=$(escape_sed "$GROUP"); \
    ESC_NAME=$(escape_sed "$NAME"); \
    ESC_NEW=$(escape_sed "$NEW_VERSION"); \
    if grep -q "$ESC_GROUP" build.gradle | grep -q "$ESC_NAME"; then \
    # Replace existing dependency version
    sed -i "s#group: '$ESC_GROUP', name: '$ESC_NAME', version: '[^']*'#group: '$ESC_GROUP', name: '$ESC_NAME', version: '$ESC_NEW'#g" build.gradle; \
    else \
    # Insert new dependency inside dependencies { }
    echo "====== Adding new dependency $GROUP:$NAME:$NEW_VERSION"; \
    sed -i "/dependencies\s*{/a\    implementation group: '$GROUP', name: '$NAME', version: '$NEW_VERSION'" build.gradle; \
    fi; \
    done && \
    \
    echo "Version upgrade complete!" && \
    cat build.gradle

# Build the application JAR after dependency check
RUN ./gradlew --no-daemon bootJar

# Generate java healthcheck class
RUN mkdir -p /app/health && cat > /app/health/HealthCheck.java <<'EOF'
import java.net.HttpURLConnection;
import java.net.URL;
import java.time.Instant;

public class HealthCheck {
    public static void main(String[] args) {
        String healthUrl = "http://localhost:8080/health";
        try {
            URL url = new URL(healthUrl);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setConnectTimeout(2000);
            conn.setReadTimeout(2000);
            conn.setRequestMethod("GET");

            int code = conn.getResponseCode();
            if (code == 200) {
                System.out.println(Instant.now() + "Healthcheck OK (" + code + ")");
                System.exit(0);
            } else {
                System.err.println(Instant.now() + "Healthcheck failed (" + code + ")");
                System.exit(1);
            }
        } catch (Exception e) {
            System.err.println(Instant.now() + " Healthcheck error: " + e.getMessage());
            System.exit(1);
        }
    }
}
EOF

# Compile HealthCheck.java file
RUN javac /app/health/HealthCheck.java

# Stage 2 — Runtime image (auto-updated base)
FROM hmctspublic.azurecr.io/base/java:21-distroless

WORKDIR /app

# Copy compiled app
COPY --from=builder /app/build/libs/*.jar app.jar

# Copy complied healthcheck class
COPY --from=builder /app/health/HealthCheck.class /app/HealthCheck.class

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]

HEALTHCHECK --interval=15s --timeout=5s --start-period=10s --retries=3 \
    CMD ["java", "HealthCheck"]
```

### Code highlights

```dockerfile
# Auto-update dependencies với sed scripts
RUN REPORT_FILE="build/dependencyUpdates/report.txt" && \
    for plugin in $PLUGINS_TO_UPGRADE; do \
    # Parse và update từng plugin
    done

# Java healthcheck class - không cần external tools
RUN cat > /app/health/HealthCheck.java <<'EOF'
import java.net.HttpURLConnection;
// ... healthcheck logic
EOF
```

---

## 3. Alpine với JVM Optimization

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

---

## 4. Ultra-optimized: Custom JRE + Spring Boot Layers + tini

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
