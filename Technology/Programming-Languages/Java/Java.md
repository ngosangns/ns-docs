---
relates:
  - "[[Fresher Back-end Interview]]"
  - "[[Backend - Back-end]]"
tags:
  - java
  - spring-boot
  - backend
  - java-concurrency
  - libraries
---
# 1. Resources

- Học Spring Boot bắt đầu từ đâu?: https://viblo.asia/p/hoc-spring-boot-bat-dau-tu-dau-6J3ZgN7WKmB
- Tổng quan về Collections trong Java: https://viblo.asia/p/tong-quan-ve-collections-trong-java-maGK7E0Dlj2
- Coursera | Online Courses & Credentials From Top Educators. Join for Free | Coursera: https://www.coursera.org/learn/google-cloud-java-spring/home/week/2
- Spring Boot 3 và Spring Security 6: https://viblo.asia/s/spring-boot-3-va-spring-security-6-gwd43EBXLX9
- Learn Spring Boot | Baeldung: https://www.baeldung.com/spring-boot
- Spring Persistence Tutorial | Baeldung: https://www.baeldung.com/persistence-with-spring-series
- Spring Security OAuth Guides | Baeldung: https://www.baeldung.com/spring-security-oauth
- Spring Security Authentication Tutorial | Baeldung: https://www.baeldung.com/spring-security-authentication-and-registration
- Security with Spring | Baeldung: https://www.baeldung.com/security-spring
- Spring Dependency Injection | Baeldung: https://www.baeldung.com/spring-dependency-injection
- [[Fresher Java Interview]]
- Lấy chứng chỉ Java: https://mylearn.oracle.com/ou/story/40805
- Cách Java Garbage Collector hoạt động: https://viblo.asia/p/co-gi-ben-trong-java-garbage-collector-AZoJjd3zVY7

## 1.1. Java deployment

- Deploy java với container thì dùng fat jar hoặc runnable java 1 endpoint bundle với web server như tomcat hoặc netty, còn khi dính J2EE thì mới sử dụng application servers như wildfly hoặc websphere thì khi đó deploy server bình thường ko đóng container
- Keylcloak, Kafka vẫn dùng java runtime bình thường, nên chọn phiên bản jdk open source như zulu hoặc termurin, nếu deploy bằng container thì dùng image có sẵn

## 1.2. Concurrency and Multithreading in Java

- **Non-Blocking / Async**
  - CompletableFuture
  - Flow API (Java 9+)
  - Reactive (External)

- **Parallelism**
  - Fork/Join Framework
  - Parallel Streams
  - Batch Execution

- **Visibility**
  - volatile
  - Java Memory Model
  - Atomic Classes
  - Concepts

- **Immutability**
  - final fields
  - Immutable Objects
  - Design Patterns
  - Collections

- **Atomicity**
  - CAS Mechanism
  - java.util.concurrent.atomic
  - Advanced

- **Mutual Exclusion**
  - synchronized
  - java.util.concurrent.locks
  - Concepts

- **Coordination**
  - Object class
  - java.util.concurrent tools
  - Blocking Queues

- **Task Management**
  - Runnable / Callable
  - Executor Framework
  - Future

# 2. Framework

- Micronaut: https://micronaut.io
- Vertx - The reactive framework: https://vertx.io
- Quarkus - based on Vertx: https://quarkus.io
- Netty - asynchronous event-driven network: https://netty.io
- Jhipster - Component generator framework: https://github.com/jhipster/generator-jhipster
- Dagger - Dependency Injector: https://github.com/google/dagger
	- [[Dagger & Koin]]

# 3. JDKs

- GraalVM - Ahead-of-time (AOT) - Build project thành binary executor thay vì Java bytecode (JIT): https://www.graalvm.org

# 4. Libraries

- Akka - Concurrency - Actor model programming: akka.io - http://akka.io
- Reactor - Non-blocking reactive foundation for JVM: https://github.com/reactor/reactor-core
- Latency and fault tolerance library: https://github.com/Netflix/Hystrix

## 4.1. Utils

- https://github.com/apache/commons-lang
- https://github.com/google/guava

## 4.2. Validation

- Bean Validation
- Hibernate

## 4.3. Connection pool

- Hikari

# 5. Notes

Một số thuật ngữ:
- Middleware → FilterChain.

# 6. Frameworks / Libraries

- Swagger: https://springdoc.org

# 7. Java Reactive - Non blocking

## 7.1. Database

- vertx postgresql driver: https://vertx.io/docs/vertx-pg-client/java
- R2DBC:
    - https://r2dbc.io
    - Spring: https://spring.io/projects/spring-data-r2dbc

# 8. Java Concurrency

- Java 21 – Virtual Thread cập nhập đáng giá kể từ Java 8 được nhiều chuyên gia ngóng chờ: https://viblo.asia/p/java-21-virtual-thread-cap-nhap-dang-gia-ke-tu-java-8-duoc-nhieu-chuyen-gia-ngong-cho-GAWVpyvD405
