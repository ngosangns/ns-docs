---
area: technology
domain: programming-languages
type: note
---

# 1. Distroless với Custom JRE (jlink) và jdeps

> **Xem thêm:** [[java-dockerfile-optimization-techniques|Dockerfile Optimization Techniques cho Java]]

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
