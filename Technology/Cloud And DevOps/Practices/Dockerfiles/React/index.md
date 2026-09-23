# Concepts

- [Alpine Nginx](Technology/Cloud%20And%20DevOps/Practices/Dockerfiles/React/Alpine%20Nginx.md) - A React/Vite Dockerfile that compiles a minimal Nginx from source on Alpine with pre-compressed assets and security headers, plus a comparison and the full Dockerfiles of all five React approaches.
- [BusyBox Httpd](Technology/Cloud%20And%20DevOps/Practices/Dockerfiles/React/BusyBox%20Httpd.md) - A React/Vite Dockerfile that serves gzip-precompressed static files with BusyBox httpd on the 92.5 KB lipanski/docker-static-website base image.
- [Distroless Nginx](Technology/Cloud%20And%20DevOps/Practices/Dockerfiles/React/Distroless%20Nginx.md) - A React/Vite Dockerfile that compiles a fully static, UPX-compressed Nginx and ships it in a FROM scratch image under 6MB with gzip and Brotli assets.
- [Go FastHTTP](Technology/Cloud%20And%20DevOps/Practices/Dockerfiles/React/Go%20FastHTTP.md) - A React/Vite Dockerfile that embeds the built static files into a single UPX-compressed Go FastHTTP binary and runs it from a scratch image.
- [Optimization Techniques](Technology/Cloud%20And%20DevOps/Practices/Dockerfiles/React/Optimization%20Techniques.md) - An index of five Dockerfile optimization approaches for React SPAs, from simple BusyBox httpd to custom-built Nginx and a Go FastHTTP binary.
- [Scratch Nginx](Technology/Cloud%20And%20DevOps/Practices/Dockerfiles/React/Scratch%20Nginx.md) - A React/Vite Dockerfile that builds a minimal dynamically linked Nginx, copies only its shared libraries into a scratch image, and uses a static C healthcheck binary.
