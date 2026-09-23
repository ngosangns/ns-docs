# Concepts

- [Alpine Optimized](Technology/Cloud%20And%20DevOps/Practices/Dockerfiles/Python/Alpine%20Optimized.md) - A Python FastAPI Dockerfile on Alpine that strips libraries, bytecode, and unused stdlib modules to get an image under 110MB with a non-root user.
- [Optimization Techniques](Technology/Cloud%20And%20DevOps/Practices/Dockerfiles/Python/Optimization%20Techniques.md) - An index of Dockerfile optimization approaches for Python applications, comparing distroless, Alpine, wheel-based offline, and UV plus tini builds.
- [UV Alpine Tini](Technology/Cloud%20And%20DevOps/Practices/Dockerfiles/Python/UV%20Alpine%20Tini.md) - A simple, maintainable Python Dockerfile using UV on Alpine with tini as init, plus a cross-Dockerfile comparison, best practices, and conclusion for the Python series.
- [UV Distroless](Technology/Cloud%20And%20DevOps/Practices/Dockerfiles/Python/UV%20Distroless.md) - A multi-arch Python Dockerfile that installs dependencies with UV and runs on a distroless Debian 12 base with manually copied shared libraries for high security and small size.
- [Wheel Offline](Technology/Cloud%20And%20DevOps/Practices/Dockerfiles/Python/Wheel%20Offline.md) - A Python Dockerfile that builds all dependencies into wheels in a builder stage, auto-patches vulnerable versions, and installs them offline in a slim runtime.
