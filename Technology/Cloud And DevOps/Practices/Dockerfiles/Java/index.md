# Concepts

- [Alpine JVM](Technology/Cloud%20And%20DevOps/Practices/Dockerfiles/Java/Alpine%20JVM.md) - A Java/Spring Boot Dockerfile on Alpine JRE with JVM tuning, graceful shutdown, a curl healthcheck, and OCI labels, balancing image size against maintainability.
- [Auto Dependency](Technology/Cloud%20And%20DevOps/Practices/Dockerfiles/Java/Auto%20Dependency.md) - A Java Dockerfile that automatically upgrades Gradle plugins and dependencies at build time and uses a compiled Java class as the healthcheck on a distroless runtime.
- [Distroless JLink](Technology/Cloud%20And%20DevOps/Practices/Dockerfiles/Java/Distroless%20JLink.md) - A Java Dockerfile that builds a minimal custom JRE with jlink and jdeps and runs it on a distroless base image with a busybox wget healthcheck.
- [Optimization Techniques](Technology/Cloud%20And%20DevOps/Practices/Dockerfiles/Java/Optimization%20Techniques.md) - An overview of four Dockerfile optimization approaches for Java/Spring Boot applications, compared by image size, security, and performance.
- [Ultra Optimized](Technology/Cloud%20And%20DevOps/Practices/Dockerfiles/Java/Ultra%20Optimized.md) - The most heavily optimized Java Dockerfile, combining a hand-picked jlink JRE, Spring Boot layered JARs, tini, SHA256-pinned Alpine, and a non-root CIS-compliant user.
