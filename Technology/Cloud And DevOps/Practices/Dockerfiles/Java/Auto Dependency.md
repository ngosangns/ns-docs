---
area: technology
domain: docker
type: guide
title: Auto Dependency
description: A Java Dockerfile that automatically upgrades Gradle plugins and dependencies at build time and uses a compiled Java class as the healthcheck on a distroless runtime.
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - docker
  - java
  - gradle
  - dockerfile
resource: http://localhost:8080/health
---

# Auto Dependency

## Techniques

- **Base image**: `hmctspublic.azurecr.io/base/java:21-distroless` (custom distroless)
- **Build image**: `gradle:8.14.3-jdk21-alpine`
- **Auto dependency update**: Automatically updates dependencies and plugins at build time
- **Dependency analysis**: Uses the `dependencyUpdates` plugin to check for updates
- **Java healthcheck**: Compiles a Java class for the healthcheck instead of using an external tool
- **Multi-stage build**: 2 stages (builder, runtime)
- **Gradle caching**: Caches Gradle dependencies

## Advantages

- **Automatic security updates**: Dependencies are updated automatically to fix vulnerabilities
- **Flexible updates**: Which plugins and dependencies to update is configurable
- **Java-native healthcheck**: No external tools (wget, curl) required
- **Alpine build**: Smaller build image
- **Maintainable**: Easy to maintain thanks to the auto-update mechanism

## Disadvantages

- **Very long build time**: Dependencies must be checked and updated on every build
- **Risk of breaking changes**: Auto-updates can introduce breaking changes
- **Complex**: The update logic relies on intricate sed scripts
- **Hard to debug**: The update logic can fail silently
- **Not production-ready**: Auto-updating during the build is unsuitable for production

## Use Cases

- Development environments
- CI/CD pipelines with automated security scanning
- Projects that need frequent dependency updates
- When you want to automate dependency management

## Dockerfile

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
    sed -i "/dependencies\s*{/a\    implementation group: '$GROUP', name: '$ESC_NAME', version: '$ESC_NEW'" build.gradle; \
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

## Code Highlights

```dockerfile
# Auto-update dependencies with sed scripts
RUN REPORT_FILE="build/dependencyUpdates/report.txt" && \
    for plugin in $PLUGINS_TO_UPGRADE; do \
    # Parse and update each plugin
    done

# Java healthcheck class - no external tools needed
RUN cat > /app/health/HealthCheck.java <<'EOF'
import java.net.HttpURLConnection;
// ... healthcheck logic
EOF
```

> **See also:** [Optimization Techniques](/Technology/Cloud And DevOps/Practices/Dockerfiles/Java/Optimization Techniques) · [Distroless JLink](/Technology/Cloud And DevOps/Practices/Dockerfiles/Java/Distroless JLink)
