---
area: technology
domain: system-design
topic: system-design
type: resource
title: Kien Truc Phan Mem
description: Kiến trúc Phần mềm
timestamp: '2026-06-19T13:43:26.107Z'
tags:
  - technology
  - system-design
resource: https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html
---

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
![](/Attachments/9c0d1e2f-3a4b-5c6d-7e8f-9a0b1c2d3e4f.png)

##### 2.1.3.1.2. Compensating Transaction pattern

Là một mẫu thiết kế để quản lý và khôi phục trạng thái của hệ thống sau khi một giao dịch phân tán (distributed transaction) hoặc một chuỗi các thao tác gặp lỗi. Khi một thao tác trong chuỗi thất bại, các "compensating transactions" được thực thi để hoàn tác các thao tác đã thành công trước đó, nhằm đảm bảo tính nhất quán dữ liệu (eventual consistency) hoặc đưa hệ thống về trạng thái an toàn.
![](/Attachments/0d1e2f3a-4b5c-6d7e-8f9a-0b1c2d3e4f5a.png)

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
- - [b0c1d2e3-f4a5-6789-9a0b-c1d2e3f4a5b6.pdf](/Attachments/b0c1d2e3-f4a5-6789-9a0b-c1d2e3f4a5b6.pdf)
- - [9c8a9b0c-1d2e-3f45-a6b7-c8d9e0f1234a.pdf](/Attachments/9c8a9b0c-1d2e-3f45-a6b7-c8d9e0f1234a.pdf)

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
  - [Clean Code Notes](/Technology/System-Design/Concepts/Clean Code Notes)
  - Clean Code in Typescript: https://github.com/labs42io/clean-code-typescript
- - [0d9a0b1c-2e3f-4a56-b7c8-d9e0f1a2345b.pdf](/Attachments/0d9a0b1c-2e3f-4a56-b7c8-d9e0f1a2345b.pdf)

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

![](/Attachments/6d5a6b7c-8e9f-0a12-b3c4-d5e6f7a8901b.jpg)

## 2.6. Mẹo

- Tách utils ra submodule: Sử dụng Git Submodule để quản lý các thư viện dùng chung, module tiện ích dưới dạng các dự án riêng biệt, giúp tái sử dụng code và quản lý phiên bản dễ dàng hơn.
  - Tham khảo: https://topdev.vn/blog/git-submodules-va-ung-dung-trong-viec-chia-se-tai-nguyen-dung-chung/#:~:text=Git%20Submodule%20l%C3%A0%20m%E1%BB%99t%20t%C3%ADnh,kho%20l%C6%B0u%20tr%E1%BB%AF%20Git%20kh%C3%A1c.

> **Xem thêm:** [Tổng hợp System Design & Design Patterns](/Technology/System-Design/Practices/Solutions System Designs Design Patterns)
