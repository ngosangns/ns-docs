---
area: technology
domain: programming-languages
type: note
---

# Dockerfile Optimization Techniques cho Java/Spring Boot Applications

## Tổng quan

Phân tích chi tiết 4 kỹ thuật tối ưu Dockerfile cho Java/Spring Boot applications, từ đơn giản đến cực kỳ tối ưu về kích thước, bảo mật và hiệu năng.

## Mục lục

| #   | Kỹ thuật                                                                                     | Mô tả                                        | Kích thước |
| --- | -------------------------------------------------------------------------------------------- | -------------------------------------------- | ---------- |
| 1   | [[java-dockerfile-distroless-jlink\|Distroless với Custom JRE (jlink) và jdeps]]             | Custom JRE + auto dependency analysis        | ~150MB     |
| 2   | [[java-dockerfile-auto-dependency\|Auto-dependency Update với Java Healthcheck]]             | Auto update dependencies + Java healthcheck  | ~200MB     |
| 3   | [[java-dockerfile-alpine-jvm\|Alpine với JVM Optimization]]                                  | Alpine + JVM tuning + graceful shutdown      | ~180MB     |
| 4   | [[java-dockerfile-ultra-optimized\|Ultra-optimized: Custom JRE + Spring Boot Layers + tini]] | Custom JRE + layers + tini + full compliance | ~80MB      |
