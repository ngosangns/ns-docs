---
area: technology
domain: docker
type: guide
title: Distroless JLink
description: A Java Dockerfile that builds a minimal custom JRE with jlink and jdeps and runs it on a distroless base image with a busybox wget healthcheck.
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - docker
  - java
  - distroless
  - jlink
  - dockerfile
resource: https://github.com/hmcts/spring-boot-template
---

# Distroless JLink

This note walks through a Java Dockerfile that shrinks the runtime to a custom JRE on top of a distroless base. The build stage unpacks the fat jar, lets jdeps list the modules it needs, and hands that list to jlink. The result is a JRE with only the required modules, which the note estimates saves about 100MB against the full JRE. A busybox stage supplies wget for the healthcheck, since the distroless image ships no tools. The note lists the gains in size and security next to the costs. Builds are slower, jdeps can miss modules, and a Java upgrade means rebuilding the JRE.

## Techniques

- **Base image**: `gcr.io/distroless/base-debian12` (distroless)
- **Build image**: `eclipse-temurin:21-jdk`
- **Custom JRE**: Uses `jlink` to create a minimal JRE containing only the required modules
- **Dependency analysis**: Uses `jdeps` to analyze dependencies automatically
- **Multi-stage build**: 3 stages (build, healthcheck, runtime)
- **Layer extraction**: Extracts the JAR to analyze its dependencies
- **Gradle cache mount**: Uses a BuildKit cache mount for Gradle dependencies

## Advantages

- **Small size**: The custom JRE contains only the required modules, saving ~100MB compared with the full JRE
- **High security**: Distroless means no shell, package manager, or tools
- **Automatic analysis**: `jdeps` determines the required modules automatically
- **Gradle caching**: The BuildKit cache mount speeds up builds
- **Compression**: The JRE is compressed with zip-9
- **Healthcheck**: Uses wget from busybox for the healthcheck

## Disadvantages

- **Long build time**: The custom JRE must be built and dependencies analyzed
- **Complex**: Many stages and processing steps
- **Hard to debug**: No shell in a distroless image
- **jdeps limitations**: May not detect every dependency (test thoroughly)
- **Maintenance**: The JRE must be rebuilt when upgrading the Java version

## Use Cases

- Production environments that need high security
- Microservices that need small images
- When optimizing the memory footprint
- Compliance requirements (CIS Docker Benchmark)

The build uses Temurin 21, unpacks the fat jar, and asks jdeps for modules at multi-release 21. jlink then writes a JRE with only those modules, compressed with zip-9. That cut saves about 100MB against a full JRE. Distroless Debian 12 has no shell and no wget, so a busybox stage copies wget in for the healthcheck. A BuildKit cache mount keeps Gradle downloads between builds. jdeps can miss a module, and a Java upgrade means rebuilding the JRE.

## Dockerfile

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

## Code Highlights

```dockerfile
# Analyze dependencies automatically
RUN jdeps --ignore-missing-deps -q  \
  --recursive  \
  --multi-release 21  \
  --print-module-deps  \
  --class-path 'BOOT-INF/lib/*'  \
  build/libs/spring-boot-template.jar > deps.info

# Create a custom JRE with only the required modules
RUN jlink \
  --verbose \
  --add-modules $(cat deps.info) \
  --compress zip-9 \
  --no-header-files \
  --no-man-pages \
  --output /custom_jre
```

> **See also:** [Optimization Techniques](/Technology/Cloud And DevOps/Practices/Dockerfiles/Java/Optimization Techniques) · [Ultra Optimized](/Technology/Cloud And DevOps/Practices/Dockerfiles/Java/Ultra Optimized)
