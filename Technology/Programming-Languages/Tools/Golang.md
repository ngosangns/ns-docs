---
tags:
  - area/technology
  - domain/programming-languages
  - topic/golang
  - type/resource
  - lang/vi
---

# 1. Tổng Quan và Kiến Thức Cơ Bản

## 1.1. Tài liệu học tập và Roadmap

1. Tài liệu tiếng Việt
   - The Little Go Book (Tiếng Việt): https://github.com/quangnh89/the-little-go-book/blob/master/vi/go.md (Sách cơ bản về Go, bản dịch tiếng Việt)
2. Khóa học
   - [[Khóa học Golang scalable của Việt Trần]]
3. Roadmap
   - Golang Developer Roadmap: https://github.com/Alikhll/golang-developer-roadmap (Lộ trình chi tiết để trở thành một nhà phát triển Go)
4. Sách (Books)
   - Go in Action: [[2d1a2b3c-4e5f-6a78-b9c0-d1e2f3a4567b.pdf]] (Sách đi sâu vào các khía cạnh thực tế của Go)
   - 100 Go Mistakes and How to Avoid Them: [[e7f8091a-2b3c-4d5e-6f70-8192a3b4c5d6.pdf]] (Tổng hợp các lỗi thường gặp và cách phòng tránh)
   - Build Web Application with Golang (Deployment Chapter): https://astaxie.gitbooks.io/build-web-application-with-golang/content/en/12.3.html (Hướng dẫn xây dựng ứng dụng web với Go, tập trung vào triển khai)
5. Bài viết (Articles)
   - Go Internals: https://github.com/teh-cmc/go-internals (Tìm hiểu sâu về cách Go hoạt động bên trong)
   - Clean Go Article: https://github.com/Pungyeon/clean-go-article (Bài viết về cách viết mã Go sạch sẽ)
   - Golang Learning by chieund: https://github.com/chieund/golang_learning (Tổng hợp tài liệu học Golang)
   - ZaloPay Go Advanced: https://zalopay-oss.github.io/go-advanced (Các chủ đề Go nâng cao từ ZaloPay)
   - Most Popular GoLang Frameworks: https://toul.medium.com/most-popular-golang-frameworks-d823317a8a55 (Giới thiệu các framework Go phổ biến)
   - Mastering Go channel: https://hackthedeveloper.com/go-channel (Hướng dẫn chi tiết về channel trong Go)
   - GolangAdvance by Nghiait123456: https://github.com/Nghiait123456/GolangAdvance (Tài liệu Go nâng cao)
   - A Comprehensive Guide to Authentication and Authorization in Go: https://medium.com/@abhinavv.singh/a-comprehensive-guide-to-authentication-and-authorization-in-go-golang-6f783b4cea18 (Hướng dẫn toàn diện về xác thực và ủy quyền trong Go)
   - Go Concurrency Guide: https://github.com/luk4z7/go-concurrency-guide (Hướng dẫn về lập trình đồng thời trong Go)
   - A Guide to Input Validation in Go with Validator V10: https://dev.to/kittipat1413/a-guide-to-input-validation-in-go-with-validator-v10-56bp (Hướng dẫn validate input sử dụng Validator V10)
   - Phong vấn Golang: Garbage Collection là gì?: https://viblo.asia/p/phong-van-golang-garbage-collection-la-gi-2oKLnmWyJQO (Giải thích về cơ chế Garbage Collection trong Go, thường gặp trong phỏng vấn)
   - [[Layered Design in Go - iRi]]
6. Blog và Hướng dẫn Thực Hành
   - Learn Building Modern Go applications - Three Dots Labs blog: https://threedots.tech (Blog về xây dựng ứng dụng Go hiện đại)
   - Practical Go: Real world advice for writing maintainable Go programs: https://dave.cheney.net/practical-go/presentations/qcon-china.html (Lời khuyên thực tế để viết chương trình Go dễ bảo trì)
   - [Building a High-Performance Concurrent Live Leaderboard in Go - DEV Community](https://dev.to/gkoos/building-a-high-performance-concurrent-live-leaderboard-in-go-3i6d)
7. Style Guide và Best Practices
   - Go Style: https://google.github.io/styleguide/go (Hướng dẫn về phong cách viết mã Go từ Google)
   - Project layout: https://github.com/golang-standards/project-layout (Cấu trúc thư mục dự án Go tiêu chuẩn)

## 1.2. Các Khái Niệm Cốt Lõi

1. Goroutines
   - Đặc điểm giúp Goroutines nhẹ hơn:
     - Kích thước stack nhỏ hơn (Smaller stack size): Goroutines bắt đầu với stack nhỏ (ví dụ 2KB) và có thể tự động tăng/giảm kích thước khi cần. Stack được sao chép sang vùng nhớ lớn hơn khi cần mở rộng.
     - Lập lịch hợp tác (Cooperative Scheduling): Go runtime có bộ lập lịch riêng (Go scheduler). Goroutines tự nguyện nhường quyền thực thi (yield) khi gặp các thao tác bloat.
     - Ghép kênh trên OS Threads (Multiplexing on OS Threads): Go scheduler thực hiện ghép (multiplex) nhiều goroutines (M) lên một số lượng nhỏ hơn các OS threads (N) (mô hình M:N).
     - I/O bất đồng bộ (Asynchronous I/O): Khi goroutine thực hiện thao tác I/O bloat, nó sẽ không làm bloat OS thread. Goroutine đó sẽ được đưa vào trạng thái chờ, và OS thread có thể chạy goroutine khác.
   - Coroutines for Go (Nghiên cứu của Russ Cox): https://research.swtch.com/coro (Bài viết nghiên cứu về khả năng triển khai coroutines trong Go)
2. Concurrency (Lập trình đồng thời)
   - **Giới thiệu**: Concurrency cho phép thực hiện nhiều tác vụ đồng thời, cải thiện hiệu suất chương trình
   - **CPU và OS Thread**: CPU thực thi các lệnh thông qua OS thread, đơn vị nhỏ nhất được hệ điều hành quản lý
   - **Concurrency vs. Parallelism**:
     - Concurrency: Thực hiện nhiều tác vụ đồng thời trên cùng một tài nguyên (một core CPU)
     - Parallelism: Thực hiện nhiều tác vụ song song trên nhiều tài nguyên (nhiều core CPU)
   - **OS Thread và Scheduling**: Hệ điều hành quản lý nhiều thread thông qua bộ lập lịch (scheduler), quyết định thread nào được chạy và phân bổ thời gian cho từng thread
   - **Goroutine và Scheduler của Golang**: Golang sử dụng goroutine, là các luồng nhẹ do runtime quản lý, giúp tạo và quản lý concurrency hiệu quả
   - **Channel trong Golang**: Kênh (channel) là phương tiện giao tiếp giữa các goroutine, cho phép truyền dữ liệu an toàn và đồng bộ
   - **Mutex và WaitGroup**: Mutex được sử dụng để tránh điều kiện race khi nhiều goroutine truy cập cùng một tài nguyên. WaitGroup giúp đồng bộ hóa các goroutine, chờ tất cả hoàn thành trước khi tiếp tục
   - Xử lý Race Condition:
     - Thiết kế để tránh chia sẻ dữ liệu: Ưu tiên thiết kế để mỗi goroutine làm việc với dữ liệu riêng. Chia sẻ bằng cách giao tiếp (qua channels) thay vì chia sẻ bộ nhớ.
     - Sử dụng `sync.Mutex` hoặc `sync.RWMutex`:
       - `Mutex`: Bảo vệ critical section, chỉ một goroutine truy cập tài nguyên tại một thời điểm.
       - `RWMutex`: Tối ưu cho đọc nhiều, ghi ít. Nhiều goroutine đọc đồng thời, một goroutine ghi.
     - Sử dụng `sync/atomic` package: Cho các phép toán nguyên tử đơn giản trên kiểu dữ liệu cơ bản.
     - Sử dụng `channels`: Để đồng bộ hóa và truyền dữ liệu giữa các goroutines.
   - Channels vs Mutex:
     - Channels:
       - Dùng khi truyền dữ liệu hoặc quyền sở hữu dữ liệu.
       - Phân phối đơn vị công việc.
       - Giao tiếp kết quả bất đồng bộ.
       - Đồng bộ hóa hai chiều.
     - Mutex:
       - Bảo vệ trạng thái chia sẻ (shared state) hoặc bộ đệm (cache).
       - Khi nhiều goroutines cần truy cập và sửa đổi cùng một vùng dữ liệu.
3. Garbage Collector (GC) - Bộ gom rác
   - A Guide to the Go Garbage Collector: https://tip.golang.org/doc/gc-guide (Hướng dẫn chính thức về GC của Go)
     - Hoạt động đồng thời (Concurrent), giảm thiểu "stop-the-world" (STW).
     - Thuật toán Tri-color mark-and-sweep.
     - Pacing algorithm: Tự động điều chỉnh tần suất chạy.
   - Cách sử dụng `SetMemoryLimit`: https://www.sobyte.net/post/2022-06/how-to-use-set-memorylimit (Giải thích về `GOMEMLIMIT` và `debug.SetMemoryLimit` để giới hạn bộ nhớ, tránh lỗi out-of-memory)
   - Phong vấn Golang: Garbage Collection là gì?: https://viblo.asia/p/phong-van-golang-garbage-collection-la-gi-2oKLnmWyJQO (Giải thích cơ chế GC, các giai đoạn mark-setup, marking, mark-termination, sweeping, write barrier)

### Chi tiết về Go Garbage Collector

#### Tổng quan

- Go tự động quản lý bộ nhớ cho các giá trị Go, lập trình viên không cần quan tâm đến việc cấp phát và giải phóng bộ nhớ thủ công
- GC là hệ thống tự động thu hồi bộ nhớ bằng cách xác định các phần bộ nhớ không còn được sử dụng
- GC trong Go là một implementation cụ thể của standard toolchain (gc compiler), không được đảm bảo bởi Go specification

#### Nơi lưu trữ giá trị Go

- **Stack allocation**: Các giá trị không có con trỏ trong biến local thường được cấp phát trên stack, không cần GC quản lý. Hiệu quả hơn vì compiler có thể xác định trước thời điểm giải phóng
- **Heap allocation (Escape to heap)**: Các giá trị có thời gian sống không thể xác định bởi compiler sẽ "escape" lên heap. GC quản lý các giá trị này
- Escape analysis: Quyết định giá trị nào escape dựa trên ngữ cảnh sử dụng và thuật toán escape analysis của compiler

#### Tracing Garbage Collection

- **Object**: Một đoạn bộ nhớ được cấp phát động chứa một hoặc nhiều giá trị Go
- **Pointer**: Địa chỉ bộ nhớ tham chiếu đến giá trị trong object. Bao gồm con trỏ `*T`, và các phần của built-in types như strings, slices, channels, maps, interface values
- **Object graph**: Đồ thị được tạo bởi objects và pointers giữa chúng
- **Roots**: Các con trỏ xác định objects chắc chắn đang được sử dụng (ví dụ: local variables, global variables)
- **Scanning**: Quá trình duyệt object graph từ roots để xác định memory đang được sử dụng
- **Reachable**: Object có thể được phát hiện bởi quá trình scanning
- **Mark-sweep technique**:
  - Mark phase: Đánh dấu các giá trị gặp phải là live
  - Sweep phase: Sau khi tracing hoàn tất, GC duyệt toàn bộ heap và giải phóng memory không được đánh dấu
- **Non-moving GC**: Go không di chuyển objects trong quá trình GC, khác với moving GC

#### GC Cycle

- GC hoạt động theo chu kỳ với 3 pha: **sweeping**, **off**, và **marking**
- **Mark phase**:
  - Xác định tất cả memory đang được sử dụng
  - Phải hoàn tất trước khi có thể giải phóng memory
- **Sweep phase**:
  - Giải phóng memory không còn được sử dụng
  - Tách biệt hoàn toàn với mark phase
- **Off phase**: GC không hoạt động khi không có công việc liên quan

#### GOGC và Pacing

- **GOGC**: Environment variable điều khiển overhead của GC (mặc định 100)
- **Heap target**: Mục tiêu tổng kích thước heap
  - Công thức: `Target heap = Live heap + (Live heap + GC roots) × GOGC / 100`
  - New heap memory = `(Live heap + GC roots) × GOGC / 100`
- **Trade-off**:
  - Tăng GOGC: Tăng memory overhead, giảm GC CPU cost
  - Giảm GOGC: Giảm memory overhead, tăng GC CPU cost
- **Pacing algorithm**: Tự động điều chỉnh tần suất GC dựa trên allocation rate và heap target

#### Tối ưu hóa GC

- **Giảm heap allocations**:
  - Sử dụng stack allocation khi có thể
  - Tái sử dụng memory với sync.Pool
  - Tránh escape không cần thiết
- **Cấu trúc dữ liệu tối ưu**:
  - Loại bỏ pointers không cần thiết: Pointer-free values được tách biệt, giảm cache pressure
  - Nhóm pointer fields ở đầu struct: GC dừng scanning tại con trỏ cuối cùng trong value
  - Sử dụng indices thay vì pointers khi có thể
- **Giảm allocation rate**: Giảm tốc độ cấp phát bộ nhớ sẽ giảm tần suất GC

#### Linux Transparent Huge Pages (THP)

- **Transparent Huge Pages**: Tính năng Linux thay thế các pages nhỏ bằng huge pages lớn hơn để cải thiện hiệu suất
- **Lợi ích**:
  - Ứng dụng với heap lớn (≥1 GiB): Cải thiện throughput lên đến 10%, overhead memory 1-2%
  - Ứng dụng với heap nhỏ: Có thể tăng memory usage lên đến 50% mà không có lợi ích đáng kể
- **Cấu hình khuyến nghị**:
  - `/sys/kernel/mm/transparent_hugepage/defrag`: Đặt `defer` hoặc `defer+madvise` để tránh stalls
  - `/sys/kernel/mm/transparent_hugepage/khugepaged/max_ptes_none`: Đặt `0` để tránh kernel undo công việc của Go runtime
  - Go 1.21+ không còn mutate huge page state, cần cấu hình thủ công
  - Có thể disable tại process level với `PR_SET_THP_DISABLE` hoặc `GODEBUG=disablethp=1` (Go 1.21.6+)

#### Công cụ phân tích

- **runtime/metrics**: Package cung cấp metrics về GC performance
- **runtime/trace**: Package để trace và phân tích GC behavior
- **go tool pprof**: Profiling tool để phân tích memory usage và GC costs
- **Compiler escape analysis**: Sử dụng `go build -gcflags=-m` để xem escape analysis

4. Pointers (Con trỏ)
   - Pointer là gì và ưu nhược điểm của nó: https://viblo.asia/p/phong-van-golang-pointer-la-gi-va-uu-nhuoc-diem-cua-no-yZjJY3qMVOE
     - Lưu trữ địa chỉ bộ nhớ của biến khác.
     - Ưu điểm: Thay đổi giá trị gốc, hiệu quả với struct lớn, biểu diễn giá trị "nil".
     - Nhược điểm: Lỗi nil pointer dereference, code khó theo dõi, nguy cơ race condition.
     - Lời khuyên: Chỉ sử dụng khi cần thiết.
5. Cấu trúc dự án cơ bản
   - Tham khảo: https://github.com/golang-standards/project-layout (Cấu trúc thư mục tiêu chuẩn cho dự án Go)
   - Hình ảnh minh họa: ![[c5d6e7f8-a9b0-1c2d-3e4f-5a6b7c8d9e0f.jpg]]
     - `/cmd`: Main applications.
     - `/internal`: Code private của ứng dụng.
     - `/pkg`: Public library code.
     - `/api`: Định nghĩa API (OpenAPI, Protobuf).
6. Input Validation
   - A Guide to Input Validation in Go with Validator V10: https://dev.to/kittipat1413/a-guide-to-input-validation-in-go-with-validator-v10-56bp (Sử dụng `go-playground/validator` để kiểm tra dữ liệu đầu vào)

## 1.3. Mẹo và Thủ Thuật

1. Cài đặt `protoc` và `protoc-gen-go`:

   ```
   go install google.golang.org/protobuf/cmd/protoc-gen-go@latest
   sudo apt install protobuf-compiler
   go install google.golang.org/grpc/cmd/protoc-gen-go-grpc@latest
   ```

   - `protobuf-compiler`: Trình biên dịch Protocol Buffers.
   - `protoc-gen-go`: Plugin sinh mã Go từ `.proto`.
   - `protoc-gen-go-grpc`: Plugin sinh mã gRPC client/server stub.

2. Xử lý optional và required fields với GORM:
   - Field optional: Dùng con trỏ (`*string`, `*int`). Giá trị `nil` nếu không cung cấp.
   - Field required: Không dùng con trỏ. GORM dùng zero value nếu không cung cấp.
3. Chọn loại API (REST vs GraphQL):
   - REST API: Dữ liệu nhất quán, dễ cache HTTP, có thể over/under-fetching.
   - GraphQL: Dữ liệu thay đổi nhanh, client linh hoạt, tránh over/under-fetching, một endpoint, phức tạp hơn về schema/resolver/caching.

# 2. Phát Triển Ứng Dụng

## 2.1. Web Frameworks và Routing

1. Tổng quan Frameworks
   - Most Popular GoLang Frameworks: https://toul.medium.com/most-popular-golang-frameworks-d823317a8a55 (Giới thiệu và so sánh các framework phổ biến)
2. Các Framework/Router phổ biến:
   - Gin: https://github.com/gin-gonic/gin (Hiệu năng cao, API tương tự Martini)
   - Echo: https://github.com/labstack/echo (Hiệu năng cao, mở rộng, tối giản)
   - Fiber: https://github.com/gofiber/fiber (Cảm hứng từ Express.js, xây dựng trên Fasthttp)
   - Chi: https://github.com/go-chi/chi (Router HTTP nhẹ, idiomatic, composable)
   - Gorilla Mux: https://github.com/gorilla/mux (Router mạnh mẽ và URL matcher)
   - Negroni: https://github.com/urfave/negroni (Middleware idiomatic, không phải framework hoàn chỉnh)
3. Framework chuyên biệt và các lựa chọn khác:
   - Fuego - OpenAPI: https://github.com/go-fuego/fuego (Tự động sinh OpenAPI 3 từ mã nguồn)
   - Goravel - Laravel like: https://github.com/goravel/goravel (Cấu trúc tương tự Laravel PHP)
   - Buffalo: https://gobuffalo.io (Môi trường phát triển web nhanh chóng, full-stack)
   - Iris: https://www.iris-go.com/docs (Framework web MVC hiệu năng cao, đầy đủ tính năng)
   - Kratos: https://go-kratos.dev (Framework microservice từ Bilibili, kiến trúc clean)
   - Go-Micro: https://github.com/go-micro/go-micro (Framework phát triển microservice pluggable)
   - Go-Zero: https://go-zero.dev (Framework web và RPC, nhiều công cụ code generation)
   - Ego: https://github.com/gotomicro/ego (Framework microservice tập trung vào game)
   - rk-boot: https://docs.rkdev.info (Framework microservice dựa trên Gin/gRPC)
   - Goyave: https://goyave.dev (Framework web mạnh mẽ, dễ sử dụng, clean code)
   - Create Go App: https://github.com/create-go-app/cli (CLI tạo dự án Go mới với backend, frontend, Docker)
   - GNet: https://github.com/panjf2000/gnet (Framework mạng event-driven hiệu năng cao)

## 2.2. Cơ sở dữ liệu và ORM

1. Drivers
   - PostgreSQL:
     - lib/pq: https://github.com/lib/pq (Driver PostgreSQL thuần Go)
     - pgx: https://github.com/jackc/pgx (Driver và toolkit PostgreSQL hiệu năng cao. Connection pool và pgx: https://freedium.cfd/https://medium.com/@neelkanthsingh.jr/understanding-database-connection-pools-and-the-pgx-library-in-go-3087f3c5a0c)
2. ORM (Object-Relational Mapper)
   - GORM: https://gorm.io (ORM đầy đủ tính năng)
     - GORM repository implement: https://github.com/aklinkert/go-gorm-repository (Ví dụ repository pattern với GORM)
   - Ent: https://entgo.io (ORM type-safe, code generation. Hướng dẫn: https://entgo.io/blog/2023/02/23/simple-cms-with-ent)
   - SQLBoiler: https://github.com/volatiletech/sqlboiler (ORM database-first, sinh mã từ schema DB)
   - Bun: https://github.com/uptrace/bun (ORM nhẹ, SQL-first approach)
3. Công cụ tạo mã SQL và Query Builders
   - sqlc: https://docs.sqlc.dev/en/latest/index.html (Sinh mã Go type-safe từ SQL. So sánh: https://dev.to/techschoolguru/generate-crud-golang-code-from-sql-and-compare-db-sql-gorm-sqlx-sqlc-560j)
   - Squirrel: https://github.com/Masterminds/squirrel (Fluent SQL generator)
   - Scany: https://github.com/georgysavva/scany (Scan kết quả truy vấn SQL vào struct)
4. Migration
   - Goose: https://github.com/pressly/goose (Công cụ migration cơ sở dữ liệu)
   - Atlas: https://github.com/ariga/atlas (Quản lý schema DB, declarative migration)
5. Caching
   - Ristretto: https://github.com/dgraph-io/ristretto (Cache hiệu năng cao, concurrent-safe)
6. Replication
   - GORM dbresolver: https://github.com/go-gorm/dbresolver (Plugin GORM hỗ trợ database replication)

## 2.3. Microservices

1. Kiến trúc
   - Clean Architecture:
     - Ví dụ: https://github.com/amitshekhariitbhu/go-backend-clean-architecture (Gin, MongoDB, JWT)
     - Ví dụ: https://github.com/viettranx/micro-clean-architecture-service-demo
   - Domain-Driven Design (DDD) examples:
     - https://github.com/viettranx/micro-clean-architecture-service-demo
     - Three Dots Labs blog: https://threedots.tech
   - Uber Go Style Guide: https://github.com/uber-go/guide (Hướng dẫn phong cách từ Uber)
   - Foody Common: https://github.com/dhyaniarun1993/foody-common (Thư viện chung cho microservices)
   - Enterprise Go Architecture: https://ldej.nl/post/enterprise-go-architecture/ (Kiến trúc enterprise với nhiều microservices)
     - **Cấu trúc thư mục:**
       - Root: `<bounded-context>`, `build-scripts`, `config`, `database` (migrations), `docs` (swagger), `infrastructure` (docker), `main.go`, `Makefile`
       - Bounded Context (DDD): `clients`, `constants`, `controller`, `db`, `error`, `mocks`, `models` (request/response), `repository`, `router`, `service`, `utils`
     - **Layered Architecture:**
       - Router: Tạo DB instance, gin router với middlewares (logging, cors, tracing, csrf, caching, oauth), inject dependencies, register routes
       - Controller: HTTP endpoints, translate JSON ↔ request/response objects, gọi service
       - Service: Business logic, kiểm tra constraints, có thể có nhiều dependencies (mail service, microservice khác), interface và implementation cùng file
       - Repository: Interface + implementation, lưu/đọc models từ DB, chỉ domain models vào/ra
     - **Configuration:**
       - Sử dụng `github.com/spf13/viper`
       - `app_config.json`: URLs, timeouts, feature toggles, environment configs
       - `.envrc`: Usernames, passwords, keys
       - `schema.json`: JSON schema validation cho config
     - **Testing & Mocking:**
       - Mocks: `github.com/golang/mock` cho service/repository
       - SQL mocking: `github.com/DATA-DOG/go-sqlmock`
       - BDD: `github.com/onsi/ginkgo`
     - **Database Migrations:**
       - Liquibase: Tạo và apply migrations, track migrations đã apply
     - **Web Framework:**
       - `github.com/gin-gonic/gin`: Router, JSON binding, path/query params
       - Lưu ý: `*gin.Context` được truyền qua các layer, có thể dẫn đến tight coupling
     - **Libraries:**
       - Kafka: `github.com/Shopify/sarama`
       - Logging: `github.com/sirupsen/logrus`
       - Tracing: `go.opencensus.io/trace`
     - **Swagger:**
       - `github.com/swaggo/swag`: Document endpoints với annotations
     - **External Services:**
       - ESB (Enterprise Service Bus): Edge node cho external communication, services chỉ giao tiếp trong hệ thống
2. Giao tiếp (Communication)
   - gRPC: https://grpc.io (Framework RPC hiệu năng cao)
     - gRPC-Gateway: https://github.com/grpc-ecosystem/grpc-gateway (Reverse-proxy RESTful JSON sang gRPC)
   - Apache Thrift: (Lựa chọn RPC khác)
3. Message Queue
   - NSQ: https://github.com/nsqio/nsq (Nền tảng message distributed thời gian thực)
   - Redis:
     - Go-Redis client: https://github.com/go-redis/redis
     - Sử dụng Redis cho message queue: https://viblo.asia/p/golang-redis-luu-don-gian-Az45bjNO5xY (Bài về key-value, Redis có Streams, Pub/Sub)
4. Frameworks và Nền tảng
   - Go-Kit: https://github.com/go-kit/kit (Toolkit xây dựng microservices)
     - Thành phần: Authentication, Circuit Breaker, Logging, Metrics, Rate Limiting, Service Discovery, Tracing, Transport.
     - Công cụ sinh mã: Microgen https://github.com/RecoLabs/microgen
   - ServiceWeaver: https://github.com/ServiceWeaver/weaver (Viết monolith, triển khai microservices)
5. Fault Tolerance và Resilience
   - Failsafe-Go: https://github.com/failsafe-go/failsafe-go (Thư viện Retry, Circuit Breaker, Timeout, Fallback, Rate Limiter, Bulkhead)

## 2.4. GraphQL

- gqlgen: https://github.com/99designs/gqlgen (Xây dựng máy chủ GraphQL, type-safe, sinh code từ schema)

## 2.5. Design Patterns (Mẫu thiết kế)

- Tổng hợp:
  - https://github.com/ismanf/golang-design-patterns
  - https://github.com/sensorario/go-design-patterns
- Concurrency:
  - https://github.com/lotusirous/go-concurrency-patterns
- 23 Classic Design Patterns với Golang (200Lab):
  - Nguồn: https://200lab.io/blog/series-23-classic-design-pattern
  - Design Pattern là giải pháp tái sử dụng cho các vấn đề thường gặp trong thiết kế phần mềm
  - Mặc dù được thiết kế cho ngôn ngữ hướng đối tượng, có thể áp dụng cho hầu hết các ngôn ngữ lập trình
  - Danh sách 23 Classic Design Patterns:
    1. **Strategy Pattern**: Cho phép chọn thuật toán tại runtime
    2. **Factory Method Pattern**: Tạo đối tượng mà không chỉ định class cụ thể
    3. **Abstract Factory Pattern**: Tạo các họ đối tượng liên quan
    4. **Flyweight Pattern**: Tối ưu bộ nhớ bằng cách chia sẻ dữ liệu chung
    5. **Composite Pattern**: Tổ chức đối tượng thành cấu trúc cây
    6. **Decorator Pattern**: Thêm hành vi động cho đối tượng
    7. **Chain of Responsibility Pattern**: Xử lý request qua chuỗi handlers
    8. **Singleton Pattern**: Đảm bảo chỉ có một instance duy nhất
    9. **Facade Pattern**: Cung cấp interface đơn giản cho hệ thống phức tạp
    10. **Prototype Pattern**: Tạo đối tượng mới bằng cách clone
    11. **Builder Pattern**: Xây dựng đối tượng phức tạp từng bước
    12. **Iterator Pattern**: Duyệt qua collection mà không expose cấu trúc
    13. **Option Function Pattern**: Cấu hình đối tượng với các options (idiomatic Go)
    14. **Bridge Pattern**: Tách abstraction khỏi implementation
    15. **Adapter Pattern**: Cho phép interface không tương thích hoạt động cùng nhau
    16. **Memento Pattern**: Lưu và khôi phục trạng thái đối tượng
    17. **Command Pattern**: Đóng gói request như một đối tượng
    18. **State Pattern**: Thay đổi hành vi khi trạng thái thay đổi
    19. **Observer Pattern**: Thông báo thay đổi cho nhiều observers
    20. **Proxy Pattern**: Cung cấp placeholder hoặc đại diện cho đối tượng
    21. **Template Method Pattern**: Định nghĩa skeleton của thuật toán
    22. **Visitor Pattern**: Thêm operations mới mà không thay đổi classes
    23. **Interpreter Pattern**: Định nghĩa ngữ pháp và interpreter
    24. **Mediator Pattern**: Giảm coupling giữa các components

## 2.6. Authentication và Authorization (Xác thực và Ủy quyền)

- A Comprehensive Guide: https://medium.com/@abhinavv.singh/a-comprehensive-guide-to-authentication-and-authorization-in-go-golang-6f783b4cea18
- Ory Fosite: https://github.com/ory/fosite (Framework OAuth 2.0 và OpenID Connect)

## 2.7. Cloud

- Go Cloud: https://github.com/google/go-cloud (API di động cho các dịch vụ đám mây)

# 3. Công Cụ và Thư Viện Hữu Ích

## 3.1. Linting và Formatting

- golangci-lint: https://github.com/golangci/golangci-lint (Chạy nhiều linter Go nhanh chóng)
- `go vet`: Kiểm tra lỗi đáng ngờ.
- `go run --race <entrypoint.go>` hoặc `go test -race`: Phát hiện race condition.

## 3.2. Testing

- Golang và Unit test: https://viblo.asia/p/golang-va-unit-test-63vKj2RyK2R (Hướng dẫn unit test)
- Keploy: https://github.com/keploy/keploy (Tạo test case và mock từ lời gọi API thực tế)
- Leaktest: https://github.com/fortytw2/leaktest (Phát hiện rò rỉ goroutine trong test)
- Mockery: https://github.com/vektra/mockery (Sinh mock cho interface)

## 3.3. Logging

- Zap: https://pkg.go.dev/go.uber.org/zap (Logging có cấu trúc, hiệu năng cao từ Uber)
- Logrus: https://github.com/sirupsen/logrus (Logging có cấu trúc, tương thích API log chuẩn)

## 3.4. Dependency Injection

- Wire: https://github.com/google/wire (Sinh code cho dependency injection, type-safe)

## 3.5. Feature Flags

- go-feature-flag: https://github.com/thomaspoignant/go-feature-flag (Giải pháp feature flag đơn giản)

## 3.6. Live Reload

- Air: https://github.com/cosmtrek/air (Live reload cho ứng dụng Go)

## 3.7. Custom Command

- Cobra: https://github.com/spf13/cobra (Tạo ứng dụng CLI và lệnh con)

## 3.8. Graceful Shutdown

- Tìm hiểu: https://anhlamweb.com/bai-viet-75/tim-hieu-ve-graceful-shutdown-graceful-shutdown-trong-golang (Khái niệm và cách triển khai)

## 3.9. Desktop UI

- go-gl/glfw: https://github.com/go-gl/glfw (Binding Go cho GLFW)
- [fyne-io/fyne: Cross platform GUI toolkit in Go inspired by Material Design](https://github.com/fyne-io/fyne)

## 3.10. WebRTC

- Pion WebRTC: https://github.com/pion/webrtc (Triển khai WebRTC thuần Go)

## 3.11. Chia sẻ Terminal dưới dạng ứng dụng web

- Gotty: https://github.com/yudai/gotty (Chia sẻ terminal (TTY) như ứng dụng web)
- Pterm: https://github.com/pterm/pterm (Làm đẹp output terminal, tạo TUI đơn giản)

## 3.12. Xử lý Thời Gian

- Now: https://github.com/jinzhu/now (Tiện ích xử lý thời gian)

## 3.13. Event bus

- https://github.com/kelindar/event

## 3.14. Build Container

- ko: https://github.com/ko-build/ko (Build và triển khai ứng dụng Go lên Kubernetes)

## 3.15. Crawling

- Colly: https://github.com/gocolly/colly (Framework scraping và crawling)
- **Goose**: Thư viện Go để trích xuất nội dung từ các trang web, thường được sử dụng trong việc thu thập dữ liệu web - [GitHub](https://github.com/block/goose) #crawling #scraping

## 3.16. Kiểm tra lỗ hổng

- govulncheck: https://pkg.go.dev/golang.org/x/vuln/cmd/govulncheck (Phân tích code, báo cáo lỗ hổng dependencies)
  - Hướng dẫn: https://go.dev/doc/tutorial/govulncheck

## 3.17. Circuit Breaker

- GoBreaker: https://github.com/sony/gobreaker (Triển khai Circuit Breaker)
- Failsafe-Go: https://github.com/failsafe-go/failsafe-go (Đã đề cập)

## 3.18. Rate Limiter

- goralim: https://github.com/0verread/goralim (Rate limiter đơn giản)
- Failsafe-Go: https://github.com/failsafe-go/failsafe-go (Đã đề cập)

## 3.19. Xử lý Excel

- Excelize: https://github.com/qax-os/excelize (Đọc và ghi file Microsoft Excel)

## 3.20. Web framework và Headless CMS

- FastSchema: https://github.com/fastschema/fastschema (Framework web và headless CMS bằng Go)

## 3.21. Build Terminal UI (TUI)

- tview: https://github.com/rivo/tview (Widget phong phú tạo TUI phức tạp)
- Bubble Tea: https://github.com/charmbracelet/bubbletea (Framework dựa trên The Elm Architecture cho TUI)

## 3.22. Golang to Javascript

- GopherJS: https://github.com/gopherjs/gopherjs (Biên dịch Go sang JavaScript) [[Javascript - Typescript]]

## 3.23. Git

- go-git: https://github.com/go-git/go-git (Triển khai Git thuần Go)

## 3.24. UUID

- shortuuid: https://github.com/lithammer/shortuuid (Tạo UUID ngắn gọn, an toàn cho URL)

## 3.25. OData

- godata: https://github.com/CiscoM31/godata (Triển khai OData Protocol)

## 3.26. Danh sách tổng hợp các thư viện Go

- awesome-go: https://github.com/avelino/awesome-go (Danh sách framework, thư viện, phần mềm Go)

# 4. Thực Hành và Phỏng Vấn

## 4.1. Dự án thực hành

- Build a simple bank service: https://github.com/techschool/simplebank (Xây dựng dịch vụ ngân hàng đơn giản)
- Event Sourced System with PostgreSQL: https://github.com/thanhfphan/eventstore (Hệ thống event sourcing với PostgreSQL)

## 4.2. Câu hỏi phỏng vấn

- Bộ câu hỏi phỏng vấn Golang: https://viblo.asia/p/100-cau-hoi-phong-van-back-end-golang-database-microservice-EvbLbw5bVnk (100 câu hỏi Backend Golang, Database, Microservice)
- Golang: Only things I know for the interview: https://medium.com/@ShivamSouravJha/golang-only-things-i-know-for-the-interview-4322d29d67a3 (Tóm tắt kiến thức Go cho phỏng vấn)

# 5. High Performance Go Workshop

**High Performance Go Workshop** (https://dave.cheney.net/high-performance-go-workshop/sydney-2019.html) - Workshop của Dave Cheney về tối ưu hiệu suất Go.

- **Mục tiêu:** Cung cấp các công cụ cần thiết để chẩn đoán và sửa các vấn đề hiệu suất trong ứng dụng Go

- **Nội dung chính:**
  - **1. The past, present, and future of Microprocessor performance**
    - Mechanical Sympathy: Hiểu cách hardware hoạt động
    - Six orders of magnitude: Hiểu về các cấp độ hiệu suất
    - Clock speeds, Heat, Dennard scaling
    - Amdahl's law, Dynamic Optimisations
    - Modern CPUs optimized for bulk operations
    - Memory latency vs capacity, Cache importance
    - "The free lunch is over": Không còn tự động tăng tốc từ hardware

  - **2. Benchmarking**
    - Benchmarking ground rules
    - Sử dụng testing package cho benchmarking
    - So sánh benchmarks với benchstat
    - Tránh benchmarking start up costs
    - Benchmarking allocations
    - Cẩn thận với compiler optimisations
    - Benchmark mistakes
    - Profiling benchmarks

  - **3. Performance measurement and profiling**
    - pprof: Công cụ profiling chính
    - Types of profiles
    - Collecting và analyzing profiles

  - **4. Compiler optimisations**
    - History of Go compiler
    - Escape analysis: Quyết định giá trị nào escape lên heap
    - Inlining: Tối ưu bằng cách inline functions
    - Dead code elimination
    - Prove pass: Chứng minh các điều kiện để tối ưu
    - Compiler intrinsics
    - Bounds check elimination

  - **5. Execution Tracer**
    - Execution tracer vs Profiling
    - Generating profiles với runtime/pprof
    - Using more than one CPU
    - Batching up work
    - Using workers
    - Using buffered channels
    - Mandelbrot microservice example

  - **6. Memory and Garbage Collector**
    - Garbage collector world view
    - GC design
    - Minimise allocations
    - Using sync.Pool để tái sử dụng memory

  - **7. Tips and tricks**
    - Goroutines: Best practices
    - Efficient network polling
    - Watch out for IO multipliers
    - Use streaming IO interfaces
    - Timeouts, timeouts, timeouts
    - Defer cost analysis
    - Make the fast path inlinable
    - Avoid Finalisers
    - Minimise cgo
    - Always use the latest released version of Go

- **Prerequisites:**
  - Go 1.13+ (workshop repository: https://github.com/davecheney/high-performance-go-workshop)
  - Graphviz (cho pprof visualization)
  - Google Chrome (cho execution tracer)
  - Code của bạn để profile và optimize

- **Key takeaways:**
  - Hiểu cách hardware và Go runtime hoạt động
  - Biết cách đo lường và profile code
  - Tối ưu compiler optimisations
  - Quản lý memory và GC hiệu quả
  - Best practices cho concurrency và performance
