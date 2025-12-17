---
relates:
  - "[[Solution sao lưu lịch sử chỉnh sửa]]"
  - "[[Microservices]]"
  - "[[AI support for coding - MCP - Agent]]"
---

# 1. Tổng quan về Thiết kế Hệ thống

## 1.1. Các Nguyên tắc Cơ bản

### 1.1.1. Đánh đổi (Trade-offs)

#### 1.1.1.1. Đánh đổi giữa tính nhất quán và tính sẵn sàng

Bài viết giải thích về định lý CAP (Consistency, Availability, Partition tolerance) và sự đánh đổi giữa tính nhất quán (dữ liệu luôn đồng bộ trên mọi nút) và tính sẵn sàng (hệ thống luôn phản hồi yêu cầu). Trong một hệ thống phân tán, không thể đảm bảo cả ba yếu tố cùng lúc, thường phải chọn giữa C và A khi xảy ra phân vùng mạng (P).
Nguồn: https://viblo.asia/p/danh-doi-giua-tinh-nhat-quan-va-tinh-san-sang-tradeoff-between-consistency-and-availability-5OXLAvlxVGr

## 1.2. Các Vấn đề Thường Gặp và Giải Pháp trong Thiết kế Hệ thống

Dưới đây là 8 vấn đề phổ biến trong thiết kế hệ thống và các giải pháp thường được áp dụng:

1. Caching – Tăng tốc độ đọc

   - Vấn đề: Lượng truy vấn đọc lớn gây quá tải cơ sở dữ liệu (DB).
   - Giải pháp: Sử dụng các hệ thống caching như Redis hoặc Memcached để lưu trữ dữ liệu từ các truy vấn phổ biến, giảm tải cho DB và tăng tốc độ phản hồi.

2. Async Write & LSM-Tree DB – Xử lý ghi hiệu quả

   - Vấn đề: Lượng ghi dữ liệu cao làm nghẽn DB, ảnh hưởng đến hiệu năng.
   - Giải pháp: Áp dụng cơ chế ghi bất đồng bộ (asynchronous write) thông qua hàng đợi tin nhắn (message queue) như Kafka, RabbitMQ. Sử dụng các loại DB được tối ưu cho việc ghi dữ liệu như Cassandra, RocksDB (sử dụng cấu trúc Log-Structured Merge-Tree - LSM-Tree).

3. Redundancy & Failover – Tăng tính sẵn sàng

   - Vấn đề: Hệ thống có một điểm lỗi duy nhất (Single Point of Failure - SPOF) khi chỉ có một máy chủ hoặc một thành phần quan trọng.
   - Giải pháp: Triển khai cơ chế nhân bản dữ liệu (replication) và chuyển đổi dự phòng tự động (automatic failover) giữa máy chủ chính (master) và các máy chủ bản sao (replica) để đảm bảo hệ thống vẫn hoạt động khi có sự cố.

4. Load Balancer – Phân phối tải

   - Vấn đề: Máy chủ bị quá tải khi lưu lượng truy cập (traffic) tăng cao.
   - Giải pháp: Sử dụng Bộ cân bằng tải (Load Balancer) như Nginx, AWS Application Load Balancer (ALB) để phân phối đều các yêu cầu của người dùng đến nhiều máy chủ, tránh tình trạng quá tải cho bất kỳ máy chủ đơn lẻ nào.

5. CDN (Content Delivery Network) – Giảm độ trễ

   - Vấn đề: Người dùng ở vị trí địa lý xa máy chủ chính gặp phải độ trễ cao khi truy cập nội dung.
   - Giải pháp: Sử dụng Mạng phân phối nội dung (CDN) như Cloudflare, AWS CloudFront để lưu trữ bản sao của các tệp tĩnh (hình ảnh, video, CSS, JavaScript) tại các máy chủ biên gần người dùng, giúp giảm độ trễ và tăng tốc độ tải trang.

6. Block/Object Storage – Quản lý file lớn

   - Vấn đề: Lưu trữ các tệp tin lớn trực tiếp trong DB làm tăng kích thước DB, làm chậm truy vấn và gây khó khăn cho việc quản lý.
   - Giải pháp: Sử dụng các dịch vụ lưu trữ khối (Block Storage) như Amazon EBS hoặc lưu trữ đối tượng (Object Storage) như Amazon S3 cho các tệp tin lớn. Metadata của các tệp này (ví dụ: đường dẫn, tên tệp, kích thước) có thể được lưu trong DB.

7. Centralized Logging – Quản lý log hiệu quả

   - Vấn đề: Khó khăn trong việc tìm kiếm và phân tích log lỗi khi hệ thống bao gồm nhiều máy chủ.
   - Giải pháp: Sử dụng một hệ thống quản lý log tập trung như ELK stack (Elasticsearch, Logstash, Kibana) hoặc EFK stack (Elasticsearch, Fluentd, Kibana) để thu thập, lưu trữ, tìm kiếm và phân tích log từ tất cả các thành phần của hệ thống tại một nơi.

8. Sharding & Index – Tối ưu truy vấn
   - Vấn đề: Truy vấn (query) chậm trên các DB có kích thước lớn.
   - Giải pháp:
     - Tạo chỉ mục (index) cho các trường dữ liệu thường xuyên được sử dụng trong điều kiện truy vấn để tăng tốc độ tìm kiếm.
     - Áp dụng kỹ thuật sharding (phân mảnh dữ liệu) để chia DB lớn thành nhiều phần nhỏ hơn (shards), mỗi shard được lưu trữ trên một nút (node) riêng biệt, giúp phân tán tải và cải thiện hiệu năng truy vấn.

![[a3b4c5d6-e7f8-091a-2b3c-4d5e6f708192.png]]

## 1.3. Tài liệu và Công cụ Tham khảo

- Bách khoa toàn thư về thiết kế hệ thống: Tổng hợp kiến thức, khái niệm, giải pháp cho các vấn đề phổ biến và ví dụ thực tế. Rất hữu ích cho việc chuẩn bị phỏng vấn thiết kế hệ thống.
  - Nguồn: https://github.com/donnemartin/system-design-primer
- System Design the big archive: [[e0f1a2b3-c4d5-6789-9a0b-c1d2e3f4a5b6.pdf]]
- System Design and architecture: [[d6e7f809-1a2b-3c4d-5e6f-708192a3b4c5.pdf]]
- Prophecy Product Design Cheatsheet: [[b4c5d6e7-f809-1a2b-3c4d-5e6f708192a3.pdf]]
- Software Architect & Architecture: Mindset, nhiệm vụ và những thứ bạn cần biết: Video thảo luận về vai trò của Kiến trúc sư Phần mềm, tư duy cần có, các nhiệm vụ chính và kiến thức cần thiết.
  - Nguồn: https://www.youtube.com/watch?v=AVhNryY5ujI
- System Architect (SA) là gì? Cách trở thành SA: Video giải thích vai trò của Kiến trúc sư Hệ thống, công việc và lộ trình để trở thành SA.
  - Nguồn: https://www.youtube.com/watch?v=v0CcoWqqZho
- Chuyện anh thợ xây P1: BUILD a write-heavy application: Phần 1 của series, tập trung xây dựng ứng dụng có lượng ghi dữ liệu lớn.
  - Nguồn: https://viblo.asia/p/chuyen-anh-tho-xay-p1-build-a-write-heavy-application-V3m5WQrEZO7#_code-thieu-nhi-thi-cung-phai-kiem-tra-dang-hoang-3
- Chuyện anh thợ xây P2: batch operation và công nghệ bê gạch:
  - Nguồn: https://viblo.asia/p/chuyen-anh-tho-xay-p2-batch-operation-va-cong-nghe-be-gach-RQqKL61Ml7z
- Chuyện anh thợ xây P3: Chuyện cái bộ đếm view:
  - Nguồn: https://viblo.asia/p/chuyen-anh-tho-xay-p3-chuyen-cai-bo-dem-view-5OXLAYrZLGr

# 2. Kiến trúc Phần mềm

## 2.1. Các Mẫu Kiến trúc Phổ biến

### 2.1.1. Clean Architecture

Clean Architecture là một mẫu kiến trúc phần mềm được đề xuất bởi Robert C. Martin (Uncle Bob), tập trung vào việc phân tách các mối quan tâm (separation of concerns) bằng cách chia ứng dụng thành các lớp đồng tâm. Các lớp bên trong (ví dụ: Entities, Use Cases) không phụ thuộc vào các lớp bên ngoài (ví dụ: Frameworks, UI, DB). Điều này giúp hệ thống dễ kiểm thử, dễ bảo trì và độc lập với các chi tiết triển khai.

- Các lớp chính:
  - Entity (Domain Layer): Nơi triển khai các khái niệm của DDD như Aggregates, Value Objects, Entities, Domain Services.
  - Use Cases (Application Layer): Chứa logic nghiệp vụ cụ thể của ứng dụng.
  - Interface Adapters (Infrastructure Layer): Chứa các triển khai của repositories, presenters, controllers, gateways.
  - Frameworks & Drivers: Lớp ngoài cùng, chứa các chi tiết cụ thể về framework, UI, database, thiết bị ngoại vi.
- Nguyên tắc phụ thuộc: Các phụ thuộc chỉ hướng vào trong.
- Tham khảo:
  - Bài viết gốc của Uncle Bob: https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html
  - Clean Architecture with Typescript - YouTube: https://www.youtube.com/playlist?list=PLN3ZW2QI7gLfQ4oEkDWw0DZVIjvAjO140
  - Ứng dụng Clean Architecture cho service Golang REST API (200lab.io): https://200lab.io/blog/ung-dung-clean-architecture-service-golang-rest-api
  - Clean Architecture with GoFiber: https://github.com/gofiber/recipes/tree/master/clean-architecture
  - Ví dụ Go Clean Architecture: https://github.com/manuelkiessling/go-cleanarchitecture
  - Ví dụ Go Clean Architecture REST API: https://github.com/AleksK1NG/Go-Clean-Architecture-REST-API
  - Simple blog using Clean Architecture, and SOLID principles: Bài viết trình bày cách xây dựng một ứng dụng blog đơn giản sử dụng Clean Architecture và các nguyên tắc SOLID.
    - Nguồn: https://dev.to/dyarleniber/hexagonal-architecture-and-clean-architecture-with-examples-48oi

### 2.1.2. Hexagonal Architecture (Ports and Adapters Architecture)

Kiến trúc Lục giác (Hexagonal Architecture), hay còn gọi là Ports and Adapters, tập trung vào việc tách biệt logic nghiệp vụ cốt lõi (application core) khỏi các yếu tố bên ngoài (UI, database, third-party services). Giao tiếp giữa lõi ứng dụng và thế giới bên ngoài được thực hiện thông qua các "ports" (là các interface định nghĩa cách tương tác) và "adapters" (là các triển khai cụ thể của ports cho từng công nghệ hoặc dịch vụ).

- Ra đời trước Clean Architecture và có thể là nguồn cảm hứng cho Clean Architecture.
- Gồm có Port và Adapter:
  - Port: Là interface định nghĩa các phương thức làm việc với các nguồn dữ liệu hoặc dịch vụ bên ngoài như HTTP, RPC, Database.
  - Adapter: Là triển khai cụ thể của Port.
- Tham khảo:
  - Giới thiệu Hexagonal và so sánh với Clean Architecture: https://www.youtube.com/watch?v=gVZM61e-uJw
  - Simple blog using Clean Architecture, and SOLID principles: Bài viết cũng đề cập đến Hexagonal Architecture.
    - Nguồn: https://dev.to/dyarleniber/hexagonal-architecture-and-clean-architecture-with-examples-48oi
  - Domain Driven Hexagon: Một boilerplate kết hợp DDD và Hexagonal Architecture.
    - Nguồn: https://github.com/Sairyss/domain-driven-hexagon

### 2.1.3. Microservices

Kiến trúc Microservices cấu trúc một ứng dụng thành một tập hợp các dịch vụ nhỏ, độc lập, có thể triển khai riêng lẻ và giao tiếp với nhau thông qua các API được định nghĩa rõ ràng.

#### 2.1.3.1. Các Mẫu Thiết kế Microservice

##### 2.1.3.1.1. Anti-corruption Layer pattern

Là một mẫu thiết kế được sử dụng để tách biệt và cô lập các thành phần của hệ thống hiện tại khỏi các hệ thống hoặc dịch vụ bên ngoài (thường là hệ thống legacy hoặc của bên thứ ba) mà có thể không tin cậy, không ổn định hoặc có mô hình dữ liệu khác biệt. Lớp này đóng vai trò như một bộ chuyển đổi, đảm bảo rằng mô hình miền (domain model) của hệ thống hiện tại không bị "ô nhiễm" bởi các hệ thống bên ngoài.
![[9c0d1e2f-3a4b-5c6d-7e8f-9a0b1c2d3e4f.png]]

##### 2.1.3.1.2. Compensating Transaction pattern

Là một mẫu thiết kế để quản lý và khôi phục trạng thái của hệ thống sau khi một giao dịch phân tán (distributed transaction) hoặc một chuỗi các thao tác gặp lỗi. Khi một thao tác trong chuỗi thất bại, các "compensating transactions" được thực thi để hoàn tác các thao tác đã thành công trước đó, nhằm đảm bảo tính nhất quán dữ liệu (eventual consistency) hoặc đưa hệ thống về trạng thái an toàn.
![[0d1e2f3a-4b5c-6d7e-8f9a-0b1c2d3e4f5a.png]]

##### 2.1.3.1.3. Sidecar Pattern

Sidecar pattern là một mẫu thiết kế trong đó một ứng dụng phụ (sidecar) được triển khai cùng với ứng dụng chính để mở rộng hoặc tăng cường chức năng mà không cần thay đổi mã nguồn của ứng dụng chính. Thường được sử dụng trong môi trường container như Kubernetes để cung cấp các tính năng như logging, monitoring, service discovery, proxying.

- Tham khảo:
  - Kubernetes Patterns - Structural Patterns: Sidecar Containers: https://viblo.asia/p/kubernetes-patterns-structural-patterns-sidecar-containers-QpmlezJm5rd
  - Sidecar pattern - Azure Architecture Center: https://learn.microsoft.com/en-us/azure/architecture/patterns/sidecar

### 2.1.4. Event-Driven Architecture (EDA)

Kiến trúc Hướng sự kiện (EDA) là một mẫu kiến trúc phần mềm thúc đẩy việc sản xuất, phát hiện, tiêu thụ và phản ứng với các sự kiện. Một sự kiện là một thay đổi trạng thái quan trọng. EDA cho phép các thành phần hệ thống découplage cao, dễ dàng mở rộng và phản ứng linh hoạt với các thay đổi.

- Tham khảo:
  - Tổng quan về Kiến trúc Hướng sự kiện: https://viblo.asia/p/kien-truc-huong-su-kien-event-driven-architecture-zXRJ8n2dVGq
  - Microservices cùng với CQRS và Event Sourcing: https://viblo.asia/p/microservices-cung-voi-cqrs-va-event-sourcing-1Je5EDnYlnL

#### 2.1.4.1. Event Sourcing

Event Sourcing là một mẫu lưu trữ trạng thái của ứng dụng dưới dạng một chuỗi các sự kiện theo thứ tự thời gian. Thay vì lưu trữ trạng thái hiện tại của một thực thể, hệ thống lưu trữ tất cả các thay đổi (sự kiện) đã dẫn đến trạng thái đó. Trạng thái hiện tại có thể được tái tạo bằng cách áp dụng lại tất cả các sự kiện.

- Tham khảo:
  - Event Sourcing pattern - Azure Architecture Center: https://learn.microsoft.com/en-us/azure/architecture/patterns/event-sourcing
  - Microservices Pattern: Event sourcing: https://microservices.io/patterns/data/event-sourcing.html
  - Event Sourcing - A Light Introduction: https://technology.lastminute.com/event-sourcing-a-light-introduction
  - Tản mạn về DDD trong Microservices, CQRS và Event Sourcing: https://batnamv.medium.ninja/t%E1%BA%A3n-m%E1%BA%A1n-v%E1%BB%81-ddd-trong-microservices-cqrs-v%C3%A0-event-sourcing-8741e87cc424

### 2.1.5. Domain-Driven Design (DDD)

Domain-Driven Design (DDD) là một phương pháp tiếp cận phát triển phần mềm tập trung vào việc mô hình hóa miền nghiệp vụ (domain) phức tạp. Các khái niệm chính bao gồm Ubiquitous Language, Bounded Context, Entities, Value Objects, Aggregates, Repositories, Domain Services. DDD giúp xây dựng các hệ thống phản ánh đúng logic nghiệp vụ và dễ dàng phát triển, bảo trì.

- Tham khảo:
  - Khái niệm cơ bản về Domain Driven Design (DDD): https://viblo.asia/p/khai-niem-co-ban-ve-domain-driven-design-ddd-Do754qL4KM6
  - Phát triển code bằng Behavior-Driven Development (BDD) - Part 1 (BDD thường đi kèm với DDD): https://viblo.asia/p/phat-trien-code-bang-behavior-driven-development-bdd-part-1-gGJ59ey95X2
  - Domain Driven Design Aggregates: https://www.jamesmichaelhickey.com/domain-driven-design-aggregates
  - Thư viện Go DDD: https://github.com/chrisngyn/go-ddd-library
  - Ví dụ Golang Advance DDD: https://github.com/Nghiait123456/GolangAdvance/tree/master/DomainDrivenDesign
  - Tản mạn về DDD trong Microservices, CQRS và Event Sourcing: https://batnamv.medium.ninja/t%E1%BA%A3n-m%E1%BA%A1n-v%E1%BB%81-ddd-trong-microservices-cqrs-v%C3%A0-event-sourcing-8741e87cc424
- - [[b0c1d2e3-f4a5-6789-9a0b-c1d2e3f4a5b6.pdf]]
- - [[9c8a9b0c-1d2e-3f45-a6b7-c8d9e0f1234a.pdf]]

### 2.1.6. Command Query Responsibility Segregation (CQRS)

Command Query Responsibility Segregation (CQRS) là một mẫu kiến trúc tách biệt các thao tác ghi (Commands) và đọc (Queries) dữ liệu. Điều này cho phép tối ưu hóa riêng biệt cho từng loại thao tác, sử dụng các mô hình dữ liệu, cơ sở dữ liệu, và chiến lược mở rộng khác nhau nếu cần.

- Tham khảo:
  - Simple demo về kiến trúc CQRS với Spring Boot: https://viblo.asia/p/simple-demo-ve-kien-truc-cqrs-voi-spring-boot-1Je5EdLGlnL
  - Command Query Responsibility Segregation (CQRS) – Craftsmanship: https://edwardthienhoang.wordpress.com/2018/01/26/command-query-responsibility-segregation-cqrs
  - Tản mạn về DDD trong Microservices, CQRS và Event Sourcing: https://batnamv.medium.ninja/t%E1%BA%A3n-m%E1%BA%A1n-v%E1%BB%81-ddd-trong-microservices-cqrs-v%C3%A0-event-sourcing-8741e87cc424

### 2.1.7. LMAX Architecture

Kiến trúc LMAX được thiết kế cho các hệ thống giao dịch tài chính tần suất cao, yêu cầu độ trễ cực thấp và khả năng xử lý lưu lượng giao dịch lớn.

- Đặc điểm chính:
  - Real-time: Xử lý giao dịch ngay lập tức.
  - Event-driven: Sự kiện được đưa vào hàng đợi và xử lý tuần tự.
  - Single-thread: Sử dụng một luồng duy nhất để xử lý sự kiện, tránh xung đột và đảm bảo tính nhất quán. Tận dụng tối ưu hóa để đạt hiệu suất cao.
  - Entity-driven: Tập trung vào các đối tượng thực thể trong hệ thống.
- Tham khảo:
  - The LMAX Architecture - Martin Fowler: https://martinfowler.com/articles/lmax.html

### 2.1.8. VIPER

VIPER là một mẫu kiến trúc ứng dụng cho iOS, nhằm phân tách rõ ràng các trách nhiệm của các thành phần: View, Interactor, Presenter, Entity, và Router.

- View: Hiển thị giao diện và nhận tương tác người dùng.
- Interactor: Chứa logic nghiệp vụ liên quan đến các thực thể dữ liệu (Entities).
- Presenter: Nhận dữ liệu từ Interactor, định dạng và chuẩn bị dữ liệu cho View. Nhận sự kiện từ View và điều hướng đến Interactor hoặc Router.
- Entity: Đại diện cho các đối tượng dữ liệu của ứng dụng.
- Router: Xử lý việc điều hướng giữa các màn hình.
- So sánh: Tương tự MVC, nhưng Controller được chia thành Presenter và Interactor. Routing là một lớp riêng.
- Tham khảo:
  - Architecting iOS Apps with VIPER: https://viblo.asia/p/architecting-ios-apps-with-viper-7prv31xoMKod

### 2.1.9. MVP (Model-View-Presenter)

Model-View-Presenter (MVP) là một mẫu kiến trúc giao diện người dùng.

- Model: Chứa dữ liệu và logic nghiệp vụ.
- View: Hiển thị dữ liệu (từ Model) và chuyển các lệnh của người dùng (events) tới Presenter để xử lý.
- Presenter: Đóng vai trò trung gian, nhận sự kiện từ View, tương tác với Model để lấy hoặc cập nhật dữ liệu, sau đó cập nhật lại View. View và Presenter thường có mối quan hệ 1-1.
- So sánh: Tương tự MVC, nhưng View nhận request đầu tiên, và Controller được thay thế bằng Presenter.
- Tham khảo:
  - MVP Pattern for Android: https://viblo.asia/p/mvp-pattern-for-android-1qm6RWzOveJE

### 2.1.10. So sánh MVC, MVP, MVVM

Các mô hình kiến trúc giao diện người dùng phổ biến bao gồm:

- MVC (Model-View-Controller): Controller xử lý input, tương tác với Model, và chọn View để hiển thị.
- MVP (Model-View-Presenter): Presenter xử lý input từ View, tương tác với Model, và cập nhật View. View thường thụ động hơn.
- MVVM (Model-View-ViewModel): ViewModel phơi bày dữ liệu và lệnh cho View, View liên kết (bind) với các thuộc tính của ViewModel. Thường sử dụng data binding.
- Tham khảo:
  - MVC, MVP, MVVM là gì? Thông tin cần biết về các mô hình lập trình: https://wiki.matbao.net/mvc-mvp-mvvm-la-gi-thong-tin-can-biet-ve-cac-mo-hinh-lap-trinh

## 2.2. Nguyên tắc Thiết kế

### 2.2.1. SOLID

SOLID là tập hợp 5 nguyên tắc thiết kế cơ bản trong lập trình hướng đối tượng, giúp tạo ra phần mềm dễ hiểu, linh hoạt và dễ bảo trì.

- S - Single Responsibility Principle (Nguyên tắc Đơn trách nhiệm): Mỗi lớp chỉ nên chịu trách nhiệm về một nhiệm vụ cụ thể.
- O - Open/Closed Principle (Nguyên tắc Đóng/Mở): Các thực thể phần mềm (lớp, module, hàm) nên có thể mở rộng (cho hành vi mới) nhưng đóng (không sửa đổi mã nguồn hiện có).
- L - Liskov Substitution Principle (Nguyên tắc Thay thế Liskov): Các đối tượng của lớp con có thể thay thế các đối tượng của lớp cha mà không làm thay đổi tính đúng đắn của chương trình.
- I - Interface Segregation Principle (Nguyên tắc Phân tách Interface): Client không nên bị buộc phải phụ thuộc vào các interface mà chúng không sử dụng. Nên tạo các interface nhỏ, cụ thể thay vì một interface lớn, chung chung.
- D - Dependency Inversion Principle (Nguyên tắc Đảo ngược Phụ thuộc):
  - Module cấp cao không nên phụ thuộc vào module cấp thấp. Cả hai nên phụ thuộc vào abstraction (interface).
  - Abstraction không nên phụ thuộc vào chi tiết. Chi tiết nên phụ thuộc vào abstraction.
- Tham khảo:
  - SOLID by Việt Trần: https://www.youtube.com/watch?v=_dTJeiticT

### 2.2.2. DRY (Don't Repeat Yourself) / DIE (Duplication Is Evil)

- DRY (Đừng lặp lại chính mình): Nguyên tắc này nhấn mạnh việc tránh lặp lại mã hoặc logic trong chương trình. Thay vào đó, nên sử dụng hàm, lớp, hoặc module để tái sử dụng. Giúp giảm thiểu lỗi và tăng tính bảo trì.
- DIE (Sự trùng lặp là xấu xa): Tương tự DRY, tập trung vào việc tránh sao chép mã giữa các thành phần khác nhau. Sao chép mã có thể dẫn đến lỗi không đồng bộ và khó khăn trong bảo trì.

### 2.2.3. Aspect-Oriented Programming (AOP)

Lập trình Hướng Khía cạnh (AOP) là một mô hình lập trình cho phép tách biệt các mối quan tâm xuyên suốt (cross-cutting concerns) như logging, security, transaction management, caching ra khỏi logic nghiệp vụ chính của ứng dụng. Các "khía cạnh" (aspects) này được định nghĩa riêng và "dệt" (weave) vào mã nguồn tại các điểm xác định (join points).

- Tham khảo:
  - Giới thiệu Aspect Oriented Programming (AOP) - GP Coder: https://gpcoder.com/5112-gioi-thieu-aspect-oriented-programming-aop

### 2.2.4. Command Bus

Command Bus là một mẫu thiết kế giúp tách biệt việc gửi yêu cầu (command) khỏi việc xử lý yêu cầu đó. Nó hoạt động như một kênh trung gian nhận các đối tượng command và điều phối chúng đến các handler tương ứng để thực thi.

- Lợi ích:
  - Hiển thị rõ các use case: Command bus thường được sử dụng trong Service Layer, giúp tài liệu hóa các use case thực tế của dự án.
  - Khả năng tái sử dụng cao: Nghiệp vụ được đóng gói trong command và handler, có thể tái sử dụng từ nhiều entry point (HTTP, console, message queue).
  - Khả năng mở rộng cao: Dễ dàng thêm các middleware vào command bus để xử lý các tác vụ chung (logging, validation, transaction).
  - Dễ viết test: Mỗi command và handler đại diện cho một use case duy nhất, dễ dàng cô lập dependencies để kiểm thử.

### 2.2.5. Event Loop pattern

Event Loop là một mẫu thiết kế lập trình đồng thời (concurrency model) được sử dụng trong nhiều môi trường như Node.js, trình duyệt web (JavaScript), và các framework GUI. Nó cho phép xử lý các tác vụ không đồng bộ (asynchronous) và I/O không chặn (non-blocking I/O) một cách hiệu quả bằng cách sử dụng một luồng chính duy nhất để quản lý hàng đợi sự kiện và thực thi các callback. Khi một tác vụ I/O (ví dụ: đọc file, gọi API) được bắt đầu, luồng chính không chờ đợi nó hoàn thành mà tiếp tục xử lý các sự kiện khác. Khi tác vụ I/O hoàn tất, một sự kiện được thêm vào hàng đợi và callback tương ứng sẽ được thực thi bởi event loop.

## 2.3. Mục tiêu và Lưu ý khi Xây dựng Kiến trúc

- Mục tiêu của các mẫu kiến trúc là giúp phân tách các công việc trong dự án ra các lớp riêng biệt, tăng tính module hóa và giảm sự phụ thuộc lẫn nhau.
- Một kiến trúc tốt cần đáp ứng:
  - Dễ thay đổi: Có khả năng thích ứng với các yêu cầu mới hoặc thay đổi mà không cần sửa đổi quá nhiều.
  - Dễ mở rộng: Có khả năng thêm các tính năng mới một cách dễ dàng.
- Các quy tắc nên tuân thủ:
  - Khi cập nhật các use case (phương thức), nên tạo ra phương thức mới thay vì cập nhật phương thức cũ đã hoạt động (Open/Closed Principle). Chỉ xoá phương thức cũ khi không còn module nào sử dụng nó.
  - Layer bên trong không nên biết đến công việc của layer bên ngoài (Dependency Rule trong Clean Architecture).
  - Layer bên ngoài chịu sự ảnh hưởng input/output bởi layer bên trong nhưng không nên biết chi tiết công việc của layer bên trong.
  - Các layer không nên biết về công việc của nhau trừ khi thông qua các interface đã định nghĩa.

## 2.4. Tài liệu và Ví dụ

### 2.4.1. Clean Code

Viết mã sạch là nền tảng cho một kiến trúc tốt.

- Tham khảo:
  - Tóm tắt cuốn Clean Code của Uncle Bob - Viblo: https://viblo.asia/p/tom-tat-cuon-clean-code-cua-uncle-bob-6J3Zg07MlmB
  - [[Clean Code notes]]
  - Clean Code in Typescript: https://github.com/labs42io/clean-code-typescript
- - [[0d9a0b1c-2e3f-4a56-b7c8-d9e0f1a2345b.pdf]]

### 2.4.2. Design Patterns

Các mẫu thiết kế là các giải pháp đã được kiểm chứng cho các vấn đề thường gặp trong thiết kế phần mềm.

- Tham khảo:
  - Design Pattern in PHP: Kho lưu trữ ví dụ các mẫu thiết kế bằng PHP.
    - Nguồn: https://github.com/DesignPatternsPHP/DesignPatternsPHP
  - Design Pattern by Việt Trần: 23 Classic Design Patterns with Go (Golang) - YouTube Playlist.
    - Nguồn: https://www.youtube.com/playlist?list=PLOsM_3jFFQRmNCt68hxCdxi8i_fUx2wTZ
    - GitHub: https://github.com/viettranx/go-design-pattern
  - Design Pattern by Tips Javascript:
    - Nguồn: https://github.com/anonystick/learning-design-patterns

### 2.4.3. Ví dụ về Kiến trúc

- Tomato Architecture: Một kiến trúc ứng dụng dựa trên Clean Architecture và DDD.
  - Nguồn: https://github.com/sivaprasadreddy/tomato-architecture
- Porto Architecture: Một kiến trúc phần mềm hiện đại cho các ứng dụng PHP.
  - Nguồn: https://github.com/Mahmoudz/Porto

## 2.5. Ví dụ về Tech Stacks

![[6d5a6b7c-8e9f-0a12-b3c4-d5e6f7a8901b.jpg]]

## 2.6. Mẹo

- Tách utils ra submodule: Sử dụng Git Submodule để quản lý các thư viện dùng chung, module tiện ích dưới dạng các dự án riêng biệt, giúp tái sử dụng code và quản lý phiên bản dễ dàng hơn.
  - Tham khảo: https://topdev.vn/blog/git-submodules-va-ung-dung-trong-viec-chia-se-tai-nguyen-dung-chung/#:~:text=Git%20Submodule%20l%C3%A0%20m%E1%BB%99t%20t%C3%ADnh,kho%20l%C6%B0u%20tr%E1%BB%AF%20Git%20kh%C3%A1c.

# 3. Giải pháp Kỹ thuật Chi tiết

## 3.1. Xác thực và Phân quyền (Authentication and Authorization)

### 3.1.1. JWT (JSON Web Tokens)

- JWT: Huỷ hàng loạt token, đã bao giờ bạn nghĩ đến?: Thảo luận về vấn đề hủy (revoke) JSON Web Tokens (JWT), đặc biệt là hủy hàng loạt token, và các giải pháp khả thi do JWT vốn là stateless (ví dụ: sử dụng blacklist, short-lived tokens kết hợp refresh tokens).
  - Nguồn: https://viblo.asia/p/jwt-huy-hang-loat-token-da-bao-gio-ban-nghi-den-EvbLbxGv4nk?fbclid=IwAR0-7dicLCxg0aSjZqgnHoPvk__tl0zP5gr3EPSxE0uX5yu9VdqsRfg6St0

## 3.2. Tối ưu Hóa (Optimization)

### 3.2.1. Tối ưu Bộ nhớ (Memory Optimization)

- Tối ưu ứng dụng với cấu trúc dữ liệu cơ bản và bitwise: Hướng dẫn cách tối ưu hóa ứng dụng bằng việc sử dụng hiệu quả các cấu trúc dữ liệu cơ bản và các phép toán bitwise (bitwise operations) để tiết kiệm bộ nhớ và tăng tốc độ xử lý.
  - Nguồn: https://200lab.io/blog/cau-truc-du-lieu-toi-uu-ung-dung-cua-ban-nhu-the-nao

### 3.2.2. Tối ưu Hiệu năng (Performance Optimization)

- Performance Optimization Guideline: Cung cấp một bộ hướng dẫn (guideline) về tối ưu hóa hiệu năng cho ứng dụng, bao gồm các phương pháp và điểm cần lưu ý ở các tầng khác nhau của hệ thống (frontend, backend, database).
  - Nguồn: https://viblo.asia/s/performance-optimization-guideline-DVK2jDQ2KLj

### 3.2.3. Caching

- Bài toán "Super fast API" với Golang và Mongodb: Trình bày giải pháp xây dựng API siêu nhanh sử dụng Golang và MongoDB, tập trung vào các kỹ thuật tối ưu hóa và caching.
  - Nguồn: https://viblo.asia/p/bai-toan-super-fast-api-voi-golang-va-mongodb-3Q75wmA7ZWb
- Caching đại pháp: Tổng hợp các kiến thức và kỹ thuật về caching, một trong những phương pháp quan trọng để cải thiện hiệu năng hệ thống (ví dụ: cache strategies, cache eviction policies, types of caches).
  - Nguồn: https://viblo.asia/s/caching-dai-phap-QqKLvpNbl7z

## 3.3. Xử lý Dữ liệu và Tác vụ (Data and Task Processing)

### 3.3.1. Background Jobs / Hàng đợi (Queues)

- Nghệ thuật xử lý background job: Chia sẻ kinh nghiệm và các kỹ thuật trong việc thiết kế và xử lý các tác vụ nền (background jobs) một cách hiệu quả, đảm bảo độ tin cậy và khả năng mở rộng. Bao gồm việc lựa chọn message queue, xử lý lỗi, retry mechanism.
  - Nguồn: https://viblo.asia/s/nghe-thuat-xu-ly-background-job-0gdJzvqnJz5 (Link này được dùng cho nhiều mục, giả định là bài tổng quan)
  - Nguồn khác (có thể liên quan đến View/Email): https://viblo.asia/p/nghe-thuat-xu-ly-background-job-07LKXjqJlV4

### 3.3.2. Xử lý Log (Logging)

- Dùng Discord làm logger: Hướng dẫn một cách sáng tạo về việc sử dụng Discord (thông qua webhook) như một công cụ để ghi log (logger) cho ứng dụng, tiện lợi cho việc theo dõi nhanh các sự kiện quan trọng hoặc lỗi.
  - Nguồn: https://www.youtube.com/watch?v=c6-ZDgz7SCo
- - [[e2f3a4b5-c6d7-49e0-9f1a-2b3c4d5e6f70.pdf]]

### 3.3.3. Nén Dữ liệu (Data Compression - zip, gzip)

#### 3.3.3.1. Cách Discord giảm 40% lưu lượng Websocket

Discord đã giảm 40% lưu lượng websocket bằng cách:

- Áp dụng thuật toán nén streaming zstandard thay cho zlib. Streaming zstandard vượt trội hơn về tốc độ, sử dụng bộ nhớ và tỷ lệ nén.
- Thay đổi logic cập nhật dữ liệu từ server về client (passive session) giúp giảm thiểu những dữ liệu dư thừa.
  ![[4d5e6f70-8192-a3b4-c5d6-e7f8091a2b3c.png]]

### 3.3.4. Upload File Lớn (Large File Upload)

- Tăng tốc quá trình upload file lớn với kỹ thuật phân mảnh và tải lên đa luồng: Giới thiệu kỹ thuật phân mảnh tệp (file chunking) và tải lên đa luồng (multi-threaded upload) để tăng tốc độ quá trình upload các file có dung lượng lớn, đồng thời cải thiện khả năng phục hồi khi có lỗi.
  - Nguồn: https://viblo.asia/p/tang-toc-qua-trinh-upload-file-lon-voi-ky-thuat-phan-manh-va-tai-len-da-luong-38X4EPbdVN2?fbclid=IwAR21dFUUPrOdtnWzT4BXtuMwnbB0ExVyUPZ9vsmqjgWGs8zhoaO1Q6v2fc8

### 3.3.5. Đồng bộ hóa Dữ liệu (Data Syncing)

- Loro - Syncing / conflict free / automatic merging: Loro là một thư viện CRDT (Conflict-free Replicated Data Type) hiệu suất cao cho việc đồng bộ hóa trạng thái cục bộ và hợp nhất tự động mà không có xung đột. Hỗ trợ cả backend ([[Backend - Back-end]]) và frontend ([[Frontend - Front-end]]).
  - Nguồn: https://github.com/loro-dev/loro

### 3.3.6. Metadata

- The Reddit Media Metadata Store: Bài đăng trên subreddit r/RedditEng thảo luận về hệ thống lưu trữ metadata cho media của Reddit, bao gồm kiến trúc và các lựa chọn công nghệ.
  - Nguồn: https://www.reddit.com/r/RedditEng/comments/1avlywv/the_reddit_media_metadata_store

### 3.3.7. Sao lưu Dữ liệu (Data Backup)

- [[Chiến lược backup dữ liệu 3-2-1]]

## 3.4. Giao tiếp và Thông báo (Communication and Notification)

### 3.4.1. OTP (One-Time Password)

- OTP và các khía cạnh bảo mật cần phải đảm bảo: Phân tích về One-Time Password (OTP), cơ chế hoạt động (ví dụ: TOTP, HOTP) và các khía cạnh bảo mật quan trọng cần lưu ý khi triển khai hệ thống OTP để đảm bảo an toàn (ví dụ: chống brute-force, thời gian hiệu lực, kênh gửi an toàn).
  - Nguồn: https://viblo.asia/p/otp-va-cac-khia-canh-bao-mat-can-phai-dam-bao-r1QLxxagLAw

### 3.4.2. Thông báo (Notifications)

- Bí thuật xử lý ngữ pháp notification như Facebook: Chia sẻ kỹ thuật xử lý ngữ pháp cho các thông báo (notifications) một cách linh hoạt và tự nhiên, tùy theo ngữ cảnh và số lượng đối tượng, tương tự như cách Facebook hiển thị thông báo.
  - Nguồn: https://viblo.asia/p/bi-thuat-xu-ly-ngu-phap-notification-nhu-facebook-m2vJPwxo4eK
- Con chim xanh Duolingo và bài toán gửi 4 triệu notification trong 5s: Phân tích case study của Duolingo về thách thức gửi một lượng lớn thông báo (4 triệu trong 5 giây) và các giải pháp kỹ thuật mà họ đã áp dụng (ví dụ: tối ưu hóa batch processing, sử dụng message queues, lựa chọn cơ sở hạ tầng phù hợp).
  - Nguồn: https://viblo.asia/p/con-chim-xanh-duolingo-va-bai-toan-gui-4-trieu-notification-trong-5s-qPoL7RraJvk

### 3.4.3. Chat / Real-time Communication

- Chat chit và bức tranh về realtime communication: Cung cấp cái nhìn tổng quan về giao tiếp thời gian thực (real-time communication), các công nghệ (ví dụ: WebSockets, WebRTC, SSE) và kiến trúc thường được sử dụng để xây dựng ứng dụng chat.
  - Nguồn: https://viblo.asia/p/chat-chit-va-buc-tranh-ve-realtime-communication-maGK7vRA5j2
- Go Random Chat: Kho lưu trữ GitHub cho một ứng dụng chat ngẫu nhiên được xây dựng bằng Go.
  - Nguồn: https://github.com/minghsu0107/go-random-chat

### 3.4.4. Email

- Nghệ thuật xử lý background job (có thể áp dụng cho gửi email hàng loạt):
  - Nguồn: https://viblo.asia/p/nghe-thuat-xu-ly-background-job-07LKXjqJlV4

## 3.5. Các Hệ thống Đặc thù (Specific Systems)

### 3.5.1. Thương mại Điện tử (E-commerce)

- Design System: Payment System cơ bản - 3k RPS: Video hướng dẫn thiết kế một hệ thống thanh toán (Payment System) cơ bản có khả năng xử lý khoảng 3000 yêu cầu mỗi giây (RPS), bao gồm các thành phần chính, luồng xử lý và các cân nhắc về bảo mật, độ tin cậy.
  - Nguồn: https://www.youtube.com/watch?v=zI6w11T0_hY
- Ngàn lẻ một lỗi thường gặp trong ứng dụng web về tài chính và cách phòng tránh: Series bài viết liệt kê các lỗi thường gặp trong quá trình phát triển ứng dụng web liên quan đến lĩnh vực tài chính (ví dụ: lỗi làm tròn, xử lý race condition trong giao dịch, bảo mật dữ liệu nhạy cảm) và cung cấp các giải pháp, cách phòng tránh.
  - Phần 1: https://viblo.asia/p/ngan-le-mot-loi-thuong-gap-trong-ung-dung-web-ve-tai-chinh-va-cach-phong-tranh-phan-1-5OXLAomw4Gr
  - Phần 2: https://viblo.asia/p/ngan-le-mot-loi-thuong-gap-trong-ung-dung-web-ve-tai-chinh-va-cach-phong-tranh-phan-2-38X4ENmAJN2?fbclid=IwAR3FZtO-o3z5tT6H_KreLb76su31lv9cv8Ra5-0jGdTRCw1deUy1YVO4LV8
  - Phần 3: https://viblo.asia/p/ngan-le-mot-loi-thuong-gap-trong-ung-dung-web-ve-tai-chinh-va-cach-phong-tranh-phan-3-W13VMeZ5VY7
- Arcturus — Inventory Processing System - Tiki Engineering: Bài viết từ đội ngũ kỹ sư Tiki chia sẻ về Arcturus, hệ thống xử lý tồn kho (Inventory Processing System) của họ, bao gồm kiến trúc và các thách thức kỹ thuật.
  - Nguồn: https://engineering.tiki.vn/arcturus-inventory-processing-system/?fbclid=IwAR2B533HipyuGC86RZtL8MsN9_Ke5ARs5mkJoa11H9z19jx8rCIuTBQLfjk
- Thiết Kế Hệ Thống Airbnb - Viblo: Phân tích và hướng dẫn cách thiết kế một hệ thống tương tự Airbnb, bao gồm các thành phần chính (quản lý người dùng, nhà cho thuê, đặt phòng, tìm kiếm, thanh toán), luồng dữ liệu và các cân nhắc về scalability, availability.
  - Nguồn: https://viblo.asia/p/thiet-ke-he-thong-airbnb-x7Z4DYX2JnX?fbclid=IwAR1a_7ab055VuHj2UJ2-CX77aj-5W3G1avwf6PG3Dau3b2Aq6XZGnSrBB8w
- Thiết Kế Hệ Thống Bán Vé (Ticketing System Design): Hướng dẫn các bước và yếu tố cần xem xét khi thiết kế một hệ thống bán vé trực tuyến, từ quản lý sự kiện, loại vé, số lượng, đặt vé, xử lý thanh toán đến chống gian lận.
  - Nguồn: https://viblo.asia/p/thiet-ke-he-thong-ban-ve-ticketing-system-design-GyZJZnjZJjm
- [[Thanh toán chuyển khoản ngân hàng]]
- VietQR-Portal: Cổng thông tin chính thức về VietQR, một chuẩn QR Code chung cho thanh toán tại Việt Nam. - Nguồn: https://vietqr.net
  ![[bddf3546-c720-4313-9046-36d8c4a97019.png]]

### 3.5.2. Mạng Xã hội (Social Networks)

- Misskey: Kho lưu trữ GitHub của Misskey, một nền tảng mạng xã hội phi tập trung, mã nguồn mở với nhiều tính năng phong phú.
  - Nguồn: https://github.com/misskey-dev/misskey

### 3.5.3. Streaming Video (HLS)

- HLS (HTTP Live Streaming): Là một giao thức truyền phát video trực tiếp dựa trên HTTP được phát triển bởi Apple. HLS chia video thành các đoạn nhỏ, cho phép client yêu cầu các đoạn này qua HTTP và thích ứng với các điều kiện mạng khác nhau bằng cách chuyển đổi giữa các luồng có chất lượng khác nhau.

### 3.5.4. Hệ thống Gợi ý (Recommendation Systems / Suggestion Algorithms)

- Collaborative-Filtering: Kho lưu trữ GitHub cung cấp hướng dẫn và mã nguồn ví dụ cho thuật toán Lọc Cộng tác (Collaborative Filtering), một kỹ thuật phổ biến trong các hệ thống gợi ý dựa trên hành vi của người dùng tương tự hoặc các mục tương tự.
  - Nguồn: https://github.com/Longcodedao/Collaborative-Filtering

### 3.5.5. Xử lý Địa lý (Geography-based Solutions)

- Bài toán ghép đơn hàng tối ưu thời gian đi giao: Một thảo luận trên Facebook group J2Team Community về bài toán tối ưu hóa việc ghép đơn hàng để giảm thiểu thời gian giao hàng, một vấn đề thực tế trong logistics, có thể liên quan đến thuật toán tối ưu đường đi (ví dụ: Traveling Salesman Problem).
  - Nguồn: https://www.facebook.com/groups/j2team.community/permalink/2303868619945245/

### 3.5.6. Rút gọn URL (URL Shortening - TinyURL)

Thiết kế hệ thống rút gọn URL như TinyURL.

- Yêu cầu:
  - Nhận một URL dài, trả về một URL ngắn.
  - Khi truy cập URL ngắn, chuyển hướng đến URL dài ban đầu.
  - URL ngắn phải là duy nhất.
  - Khả năng tùy chỉnh URL ngắn (optional).
  - Phân tích số lượt click (optional).
- Các thành phần chính:
  - Application Service: Xử lý logic, tạo mã ngắn, lưu trữ.
  - Database: Lưu trữ ánh xạ giữa URL ngắn và URL dài.
    - Có thể dùng NoSQL (ví dụ: Cassandra, DynamoDB) cho khả năng ghi và đọc nhanh, khả năng mở rộng cao.
    - Key: mã ngắn, Value: URL dài.
  - ID Generator: Tạo mã ngắn duy nhất.
    - Cách 1: Base62 encoding từ một số nguyên tăng dần (cần cơ chế đồng bộ để tránh trùng lặp trong hệ thống phân tán, ví dụ: dùng Zookeeper, hoặc một service sinh ID riêng).
    - Cách 2: Sinh UUID rồi hash và lấy một phần.
    - Cách 3: Pre-generate một lượng lớn ID và lưu vào DB.
  - Load Balancer: Phân phối tải cho application service.
  - Caching: Cache các URL ngắn thường xuyên truy cập để giảm tải cho DB.
- Luồng hoạt động:
  - Tạo URL ngắn: User gửi URL dài -> Load Balancer -> Application Service -> ID Generator tạo mã ngắn -> Application Service lưu (mã ngắn, URL dài) vào DB -> Trả URL ngắn cho user.
  - Chuyển hướng: User truy cập URL ngắn -> Load Balancer -> Application Service -> Tìm URL dài tương ứng trong Cache, nếu không có thì tìm trong DB -> Trả về HTTP 301/302 redirect đến URL dài.
- Cân nhắc:
  - Khả năng mở rộng (Scalability): Sharding DB theo mã ngắn, stateless application services.
  - Tính sẵn sàng (Availability): Replication DB, nhiều instance application service.
  - Độ trễ (Latency): Caching, chọn DB phù hợp.
- Nguồn: https://www.threads.net/@viettranx89/post/C_ZdnH-B9DI
  ![[1a2b3c4d-5e6f-7081-92a3-b4c5d6e7f809.png]]
  ![[2b3c4d5e-6f70-8192-a3b4-c5d6e7f8091a.png]]
- Protip từ nguồn: Nên tiếp cận vấn đề theo hướng MVP trước, giải quyết core design rồi hãy mở rộng. Làm rõ các ràng buộc về actors (lock, race condition, chosen protocol) trước khi tính đến scalability.

### 3.5.7. Bộ đếm Phân tán (Distributed Counter)

Đối với các trường hợp sử dụng như đếm số lượt xem, lượt thích, lượt vote, có nhiều cách tiếp cận (integer counter trong RDBMS, message queue, INCR trong Redis, HyperLogLog).
Khi yêu cầu khả năng mở rộng cao, không yêu cầu strong consistency (có thể eventual consistency với độ trễ thấp), có thể sử dụng Conflict-free Replicated Data Type (CRDT).

- CRDT cho phép các bản sao dữ liệu được cập nhật độc lập và sau đó hợp nhất mà không có xung đột.
- Tham khảo:
  - Phân tích và các use case của CRDT: https://www.infoq.com/articles/database-merge-replication-crdt/
  - Đọc thêm về CRDT: https://crdt.tech/resources
  - CRDT in Redis (Active-Active replication): https://redis.io/active-active/

### 3.5.8. Tìm kiếm (Search) & Tự động hoàn thành (Autocomplete)

#### 3.5.8.1. Thực tiễn từ Twitter

Bài blog từ Twitter (X) Engineering chia sẻ về các nỗ lực và giải pháp để đảm bảo tính ổn định và khả năng mở rộng cho hệ thống tìm kiếm của họ.

- Nguồn: https://blog.x.com/engineering/en_us/topics/infrastructure/2022/stability-and-scalability-for-search

#### 3.5.8.2. Thảo luận về giải pháp Autocomplete

![[0f1a2b3c-4d5e-6f70-8192-a3b4c5d6e7f8.png]]

- Một số ý tưởng:
  - Dùng Spark Graph, HDFS, Cloud Hadoop để implement Trie.
  - Shard dữ liệu: Mỗi cluster lưu một số prefix, có proxy để điều hướng. Thách thức là chia sao cho request đều.
  - Sync data về DWH chung, dùng Spark/Hadoop để query + caching.
  - Sử dụng Elasticsearch (GitHub cũng dùng).
- Nguồn thảo luận: https://www.facebook.com/groups/sydexa/permalink/1775084429648431/

#### 3.5.8.3. Prefixy - Dịch vụ tìm kiếm tiền tố cho Autocomplete

Prefixy là một dịch vụ tìm kiếm tiền tố (prefix search) có khả năng mở rộng, được thiết kế để cung cấp năng lượng cho các tính năng tự động hoàn thành (autocomplete).

- Bài viết: https://medium.com/@prefixyteam/how-we-built-prefixy-a-scalable-prefix-search-service-for-powering-autocomplete-c20f98e2eff1
- Github repo: https://github.com/prefixy/prefixy

#### 3.5.8.4. Thư viện khác

- typeahead.js: Thư viện autocomplete nhanh và đầy đủ tính năng.
  - Nguồn: https://github.com/twitter/typeahead.js

### 3.5.9. Hệ thống Sinh ID (ID Generation)

- Xây dựng hệ thống sinh ID của GHTK - 100 triệu ID / giây: Video từ Giao Hàng Tiết Kiệm (GHTK) chia sẻ về cách họ xây dựng hệ thống sinh ID có khả năng tạo ra 100 triệu ID mỗi giây. Các yếu tố quan trọng bao gồm tính duy nhất, thứ tự (tùy chọn), khả năng mở rộng và hiệu năng cao. - Nguồn: https://www.youtube.com/watch?v=bSyFHY3a3_s
  ![[3c4d5e6f-7081-92a3-b4c5-d6e7f8091a2b.png]]

## 3.6. Vận hành và Giám sát (Operations and Monitoring)

### 3.6.1. Giám sát Hệ thống (System Monitoring)

- 1 ngày làm analytic: Đo lường CCU theo thời gian thực: Chia sẻ kinh nghiệm thực tế về việc đo lường số lượng người dùng đồng thời (CCU - Concurrent Users) theo thời gian thực, một yếu tố quan trọng trong phân tích và giám sát hệ thống. - Nguồn: https://viblo.asia/p/1-ngay-lam-analytic-do-luong-ccu-theo-thoi-gian-thuc-4P856L0BZY3
  ![[a3b4c5d6-e7f8-49a0-9b1c-2d3e4f5a6b7c.jpg]]

### 3.6.2. Rate Limiting

- Giải mã Rate Limiting: Lá chắn bảo vệ API khỏi các cuộc tấn công mạng: Giải thích về Rate Limiting, một kỹ thuật quan trọng để bảo vệ API khỏi lạm dụng, tấn công từ chối dịch vụ (DoS) và đảm bảo sự ổn định của hệ thống. Bao gồm các thuật toán (Token Bucket, Leaky Bucket) và cách triển khai.
  - Nguồn: https://viblo.asia/p/giai-ma-rate-limiting-la-chan-bao-ve-api-khoi-cac-cuoc-tan-cong-mang-gwd432WbVX9

### 3.6.3. Benchmarking

Công cụ để đo lường hiệu năng và tải của hệ thống.

- Apache JMeter
- K6: https://k6.io
- wrk: https://github.com/wg/wrk

## 3.7. Công nghệ và Nền tảng (Technologies and Platforms)

### 3.7.1. Serverless

- A year of running a hotel booking application on AWS Serverless services for $0.8/month: Chia sẻ kinh nghiệm vận hành một ứng dụng đặt phòng khách sạn trên các dịch vụ Serverless của AWS (ví dụ: Lambda, API Gateway, DynamoDB) với chi phí cực thấp.
  - Nguồn: https://hieudd.substack.com/p/a-year-of-running-a-hotel-booking

### 3.7.2. Message Brokers (Kafka, RabbitMQ)

Các hệ thống hàng đợi tin nhắn (Message Queue) dùng để giao tiếp bất đồng bộ giữa các service.

- Zero Disk Architectures - stateless broker: Kiến trúc broker không trạng thái, sử dụng bộ nhớ ngoài (ví dụ S3) để lưu trữ trạng thái, giúp broker dễ dàng scale và phục hồi.
  - WarpStream
  - AutoMQ

### 3.7.3. Distributed Computing (Tính toán Phân tán)

- Hadoop: Một framework mã nguồn mở cho phép xử lý và lưu trữ các tập dữ liệu lớn theo mô hình phân tán.

### 3.7.4. Distributed Data Join & Mapping (Kết hợp và Ánh xạ Dữ liệu Phân tán)

- Hasura: Cung cấp GraphQL API tức thời trên các nguồn dữ liệu mới hoặc hiện có, giúp dễ dàng kết hợp dữ liệu từ nhiều nguồn.
- Krakend: Một API Gateway hiệu suất cao với middleware cho phép biến đổi, tổng hợp và lọc dữ liệu từ nhiều microservices.

### 3.7.5. Trí tuệ Nhân tạo (AI / Machine Learning)

- SaaS AI models: Replicate là một nền tảng cho phép chạy các mô hình AI/Machine Learning trong cloud mà không cần quản lý cơ sở hạ tầng. Cung cấp API để dễ dàng tích hợp các mô hình AI vào ứng dụng.
  - Nguồn: https://replicate.com
- Practice xây dựng LLM + RAG trên AWS: Bài đăng trên Facebook group AWS Study Group FCJ chia sẻ kinh nghiệm thực hành xây dựng mô hình ngôn ngữ lớn (LLM) kết hợp với Retrieval Augmented Generation (RAG) trên nền tảng AWS.
  - Nguồn: https://www.facebook.com/groups/awsstudygroupfcj/posts/1710057443092554/

## 3.8. Di chuyển và Hiện đại hóa Hệ thống (System Migration and Modernization)

### 3.8.1. Câu chuyện về Hiện đại hóa Từng bước (A Tale of Incremental Modernisation)

Một khách hàng lớn ở UK và Ireland vận hành hệ thống legacy trên Mainframe gặp khó khăn về chi phí, tốc độ thay đổi và nhân lực. Team Thoughtworks được yêu cầu thay thế và di chuyển hệ thống lên Cloud.

- Hành trình này sử dụng nhiều patterns: Dual Run, Event Interception, Legacy Mimic, Transitional Architecture, Change Data Capture (CDC), Dark Launching, Canary Release.
- Testing đóng vai trò rất quan trọng.
- Nguồn: https://martinfowler.com/articles/uncovering-mainframe-seams.html

### 3.8.2. Di chuyển Cơ sở dữ liệu

- Chuyển dữ liệu từ DB này sang DB khác - Bí mật đằng sau bài toán lưu trữ media của Canva và hành trình tìm đến DynamoDB: Chia sẻ về case study của Canva trong việc di chuyển và lưu trữ dữ liệu media, cụ thể là hành trình chuyển sang sử dụng DynamoDB, cùng với các thách thức và giải pháp.
  - Nguồn: https://viblo.asia/p/bi-mat-dang-sau-bai-toan-luu-tru-media-cua-canva-va-hanh-trinh-tim-den-dynamodb-3RlL5gPz4bB
- How Discord Stores Trillions of Messages (MongoDB -> ScyllaDB): Bài blog từ Discord giải thích cách họ lưu trữ hàng nghìn tỷ tin nhắn, bao gồm quyết định di chuyển từ MongoDB sang ScyllaDB để cải thiện hiệu năng và khả năng mở rộng.
  - Nguồn: https://discord.com/blog/how-discord-stores-trillions-of-messages

## 3.9. Quản lý Phiên bản (Versioning)

- Cách đặt tên version: Bài viết từ ByteByteGo giải thích ý nghĩa của các con số trong việc đặt tên phiên bản phần mềm, thường theo chuẩn Semantic Versioning (Major.Minor.Patch).
  - Major: Thay đổi không tương thích API.
  - Minor: Thêm chức năng mới, tương thích ngược.
  - Patch: Sửa lỗi, tương thích ngược.
  - Nguồn: https://blog.bytebytego.com/p/ep120-what-do-version-numbers-mean

## 3.10. Thu thập Dữ liệu Web (Web Crawling)

- Puppeteer: Một thư viện Node.js cung cấp API cấp cao để điều khiển trình duyệt Chrome/Chromium qua DevTools Protocol. Thường được sử dụng cho crawling, scraping, tự động hóa kiểm thử UI.

## 3.11. Xử lý Văn bản & Trình soạn thảo (Text & Editor)

- [[Solution sao lưu lịch sử chỉnh sửa]]

## 3.12. Mở rộng Hệ thống khi Lưu lượng Tăng đột biến (Scaling for Traffic Spikes)

- Chiến lược scale-out hiệu quả khi lượng truy cập gia tăng đột biến cho hệ thống Viblo: Chia sẻ chiến lược scale-out (mở rộng theo chiều ngang) hiệu quả cho hệ thống khi đối mặt với tình trạng lượng truy cập tăng đột biến, dựa trên kinh nghiệm của Viblo.
  - Nguồn: https://viblo.asia/p/chien-luoc-scale-out-hieu-qua-khi-luong-truy-cap-gia-tang-dot-bien-cho-he-thong-viblo-zOQJw5xNVMP

# 4. Cách retry ít gây down

Nhiều người sẽ chọn cách retry ngay lập tức khi có lỗi. Nhưng nếu tinh tế hơn, mình có thể triển khai cơ chế retry theo cấp số Fibonacci — ví dụ: retry sau 1 giây, tiếp theo là 3 giây, rồi 5 giây,...

Lý do là gì? Việc tăng dần thời gian giữa các lần retry giúp hệ thống có thời gian để phục hồi, đồng thời giảm áp lực đồng thời lên service đang gặp sự cố. Điều này giúp tránh tình trạng "service vừa lên lại chết" do bị dồn tải quá nhanh.

Thực tế, không nhiều anh em dùng Laravel queue mà viết worker riêng bằng Golang. Phần lớn (99%) dùng queue mặc định hoặc Horizon. Nhưng ít người để ý các yếu tố như: `backoff`, `unique`, `skipping job`, v.v.

Mình từng gặp tình huống thực tế: service A gọi đến service B. Khi B gặp sự cố, A liên tục retry mà không có kiểm soát, khiến B cứ lên được một lúc là lại sập tiếp. Giải pháp là khi B hoạt động trở lại, chỉ nên đẩy traffic dần dần bằng cách áp dụng cơ chế backoff thông minh trong retry — như vậy sẽ ổn định hệ thống hơn rất nhiều.

## 4.1. Khác (Miscellaneous)

- Đánh giá hiệu quả của quảng cáo: Bài viết từ đội ngũ kỹ sư Grab chia sẻ về Attribution Platform của họ, hệ thống dùng để đo lường và đánh giá hiệu quả của các chiến dịch quảng cáo.
  - Nguồn: https://engineering.grab.com/attribution-platform
- View (có thể liên quan đến cách hiển thị hoặc xử lý view count):
  - Nghệ thuật xử lý background job: https://viblo.asia/p/nghe-thuat-xu-ly-background-job-07LKXjqJlV4 (Link này có thể liên quan đến việc cập nhật view count bất đồng bộ)

# 5. Design patterns

- Aggregator & Proxy: Design Patterns for Microservices — Aggregator Pattern & Proxy pattern | by Nisal Pubudu | Nerd For Tech | Medium - https://medium.com/nerd-for-tech/design-patterns-for-microservices-aggregator-pattern-99c122ac6b73
- SAGA: Distributed transaction - SAGA pattern - Transaction isolation (viblo.asia) - https://viblo.asia/p/distributed-transaction-saga-pattern-transaction-isolation-gGJ590MalX2
- Top 10 Microservices Design Patterns and Principles - Examples (javarevisited.blogspot.com): https://javarevisited.blogspot.com/2021/09/microservices-design-patterns-principles.html#axzz7pw6wS3gQ

## 5.1. Distributed transaction

- So sánh các mẫu Distributed Transaction trong microservices (grokking.org): [http://newsletter.grokking.org/issues/191-so-sanh-cac-m-u-distributed-transaction-trong-microservices-783202](http://newsletter.grokking.org/issues/191-so-sanh-cac-m-u-distributed-transaction-trong-microservices-783202)
- Distributed transaction - Two-phase commit (Viblo): [https://viblo.asia/p/distributed-transaction-two-phase-commit-naQZRBemZvx](https://viblo.asia/p/distributed-transaction-two-phase-commit-naQZRBemZvx)
- Blocking Retry, Two-Phase Commit (2PC) and Three-Phase Commit (3PC).
- Sử dụng Queues để xử lý Asynchronously trong Background, TCC. Compensation Matters.
- Local Message Table (Asynchronously Ensured)/Outbox Pattern, MQ Transaction.
- Saga Pattern, Event Sourcing, CQRS, Atomic Commitment.
- Parallel Commits, Transactional Replication, Consensus Algorithms.
- Timestamp Ordering, Optimistic Concurrency Control, Byzantine Fault Tolerance (BFT).
- Distributed Locking, Sharding, Multi-Version Concurrency Control (MVCC).
- Distributed Snapshots, Leader-Follower Replication
- Saga pattern with Orchestration & Choreography.
  - Sử dụng pattern Saga, có 2 loại đó là Choreography và Orchestration, điểm chung đều dùng message driven.
    - **Choreography - Event based**.
    - **Orchestration - Command based**.
- Parallel pipeline.
- Distributed locks with Redis: [https://redis.io/docs/manual/patterns/distributed-locks](https://redis.io/docs/manual/patterns/distributed-locks)
- Vấn đề 2 đơn hàng đến cùng lúc (liên quan đến Kafka và database): [https://www.facebook.com/groups/645391349250568/posts/1897008380755519](https://www.facebook.com/groups/645391349250568/posts/1897008380755519)

## 5.2. Outbox pattern

Trong các hệ thống phân tán (hay distributed system dưới dạng microservices), tình huống thường thấy là bạn sẽ cần write vào database của một service, sau đó bắn một event (sự kiện, hoặc còn gọi là message) lên hệ thống message broker (phổ biến là RabbitMQ, Kafka) để các service khác nhận và tiếp tục xử lý. Trong tình huống này, một trong hai hành động trên có thể thất bại. Ví dụ bạn chưa write thành công vào DB, nhưng message đã được gửi đi tới service khác, có thể gây sai lệch dữ liệu. Outbox Pattern là một hướng handle đơn giản cho vấn đề này.

### 5.2.1. CÁCH Outbox Pattern HOẠT ĐỘNG

- **Bước 1**: Trong transaction sẽ bao gồm hai hành động: ghi dữ liệu mới vào bảng chính (ví dụ: `orders`) và đồng thời lưu thông tin cần gửi (message) vào một bảng `outbox` trong cơ sở dữ liệu. Vì cùng một transaction, điều này đảm bảo tính ACID: hoặc là bạn ghi thành công cả 2 thao tác, hoặc là bạn không có gì cả.
- **Bước 2**: Sau khi transaction hoàn thành, một tiến trình riêng biệt sẽ đọc các bản ghi từ bảng `outbox`, gửi thông tin này tới message broker, sau đó đánh dấu bản ghi là đã được xử lý. Bạn sẽ thấy nó rất tương đồng như queue job database trên Laravel phải không. Tiến trình này có thể được triển khai như một cronjob, hoặc một deamon job lắng nghe các sự kiện thay đổi trực tiếp từ bảng `outbox`(CDC hay Change Data Capture).

### 5.2.2. Lợi ích của Outbox Pattern

- **Tính nhất quán**: Đảm bảo tính nhất quán giữa cơ sở dữ liệu và hệ thống message broker. Vì sử dụng transaction giữa thao tác cập nhật vào db và ghi vào outbox, chúng ta yên tâm sự nhất quán theo nguyên tắc ACID.
- **Khả năng chịu lỗi**: Nếu message broker gặp sự cố, hệ thống vẫn lưu trữ được các message chưa gửi trong bảng `outbox` và gửi chúng sau khi sự cố được khắc phục.
- **Mở rộng dễ dàng**: **Outbox Pattern** giúp dễ dàng mở rộng hệ thống với các microservices khác mà không làm gián đoạn hệ thống cốt lõi. Mình chỉ cần sửa một chút tiến trình quét bảng outbox để nó bắn thêm sang service khác khi cần tích hợp thêm service mới, sẽ đơn giản hơn và hạn chế tác động vào source code cũ.

_Author: Huy Nguyen_

# 6. Mã Nguồn Tham Khảo

- Simple blog application backend challenge: Một ví dụ về ứng dụng blog backend.
  - Nguồn: https://github.com/dyarleniber/simple-blog-application-backend-challenge

# 7. Tài liệu Đính kèm và Hình ảnh

## 7.1. Tài liệu PDF và Ghi chú liên quan

- [[Clean Code notes]]
- [[e0f1a2b3-c4d5-6789-9a0b-c1d2e3f4a5b6.pdf]] (Tài liệu tổng hợp từ ByteByteGo)
- [[d6e7f809-1a2b-3c4d-5e6f-708192a3b4c5.pdf]] (Tài liệu về thiết kế và kiến trúc hệ thống)
- [[b4c5d6e7-f809-1a2b-3c4d-5e6f708192a3.pdf]] (Bảng tóm tắt về thiết kế sản phẩm)
- [[DDD-Quickly-Vietnamese.pdf]] (Tài liệu DDD tiếng Việt)
- [[9c8a9b0c-1d2e-3f45-a6b7-c8d9e0f1234a.pdf]] (Sách tóm lược về DDD)
- [[0d9a0b1c-2e3f-4a56-b7c8-d9e0f1a2345b.pdf]] (Hướng dẫn về phong cách thiết kế đối tượng)
- [[e2f3a4b5-c6d7-49e0-9f1a-2b3c4d5e6f70.pdf]] (Tài liệu về logging trên Kubernetes cho PHP)
- [[Thanh toán chuyển khoản ngân hàng]] (Ghi chú về hệ thống thanh toán)
- [[Solution sao lưu lịch sử chỉnh sửa]] (Ghi chú về giải pháp sao lưu lịch sử)
- [[Chiến lược backup dữ liệu 3-2-1]] (Ghi chú về chiến lược backup)

## 7.2. Hình ảnh Minh họa

- Sơ đồ 8 vấn đề phổ biến trong System Design:
  ![[a3b4c5d6-e7f8-091a-2b3c-4d5e6f708192.png]]

- MVC, MVP, MVVM, VIPER patterns:
  ![[1c0d1e2f-3a4b-5c6d-7e8f-9a0b1c2d3e4f.png]]

- Hình ảnh đo lường CCU:
  ![[a3b4c5d6-e7f8-49a0-9b1c-2d3e4f5a6b7c.jpg]]

- Sơ đồ hệ thống thanh toán VietQR:
  ![[8c7a8b9c-0d1e-2f34-a5b6-c7d8e9f0123a.png]]

- Biểu đồ so sánh hiệu năng nén zstd và zlib của Discord:
  ![[4d5e6f70-8192-a3b4-c5d6-e7f8091a2b3c.png]]

- Sơ đồ/thảo luận về Autocomplete:
  ![[0f1a2b3c-4d5e-6f70-8192-a3b4c5d6e7f8.png]]

- Sơ đồ thiết kế TinyURL 1:
  ![[1a2b3c4d-5e6f-7081-92a3-b4c5d6e7f809.png]]

- Sơ đồ thiết kế TinyURL 2:
  ![[2b3c4d5e-6f70-8192-a3b4-c5d6e7f8091a.png]]

- Sơ đồ Anti-corruption Layer:
  ![[9c0d1e2f-3a4b-5c6d-7e8f-9a0b1c2d3e4f.png]]

- Sơ đồ Compensating Transaction:
  ![[0d1e2f3a-4b5c-6d7e-8f9a-0b1c2d3e4f5a.png]]

- Ví dụ Tech Stack:
  ![[6d5a6b7c-8e9f-0a12-b3c4-d5e6f7a8901b.jpg]]

- Sơ đồ hệ thống sinh ID GHTK:
  ![[3c4d5e6f-7081-92a3-b4c5-d6e7f8091a2b.png]]
