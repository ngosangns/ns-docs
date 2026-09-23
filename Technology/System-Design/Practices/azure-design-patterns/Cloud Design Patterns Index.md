---
area: technology
domain: system-design
type: note
title: Cloud Design Patterns Index
description: Các Mẫu Thiết Kế Đám Mây (Cloud Design Patterns)
timestamp: "2026-06-19T13:43:26.116Z"
tags:
  - technology
  - system-design
resource: https://learn.microsoft.com/en-us/azure/architecture/patterns/
---

# Các Mẫu Thiết Kế Đám Mây (Cloud Design Patterns)

Các kiến trúc sư thiết kế khối lượng công việc bằng cách tích hợp các dịch vụ nền tảng, chức năng và mã nguồn để đáp ứng cả yêu cầu chức năng và phi chức năng. Các mẫu thiết kế đám mây cung cấp giải pháp cho nhiều thách thức phổ biến trong hệ thống phân tán.

## Tại sao cần các mẫu thiết kế đám mây?

Hệ thống phân tán thường gặp phải các giả định sai lầm (fallacies of distributed computing) như:

- Mạng luôn tin cậy.
- Độ trễ bằng không.
- Băng thông vô hạn.
- Mạng luôn an toàn.
- Cấu trúc mạng không thay đổi.

Các mẫu thiết kế giúp nâng cao nhận thức về những vấn đề này, cung cấp chiến lược bù đắp và giảm thiểu rủi ro.

## Danh mục các mẫu thiết kế (Pattern Catalog)

| Mẫu thiết kế (Pattern)                                                                                                     | Tóm tắt (Summary)                                                                                                             | Trụ cột Well-Architected                                   |
| -------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| [Ambassador](/Technology/System-Design/Practices/azure-design-patterns/Ambassador Pattern)                                 | Tạo các dịch vụ trợ giúp gửi yêu cầu mạng thay mặt cho dịch vụ hoặc ứng dụng khách (client).                                  | Độ tin cậy, Bảo mật                                        |
| [Anti-Corruption Layer](/Technology/System-Design/Practices/azure-design-patterns/Anti Corruption Layer Pattern)           | Triển khai một lớp façade hoặc adapter giữa một ứng dụng hiện đại và một hệ thống cũ (legacy).                                | Vận hành xuất sắc                                          |
| [Asynchronous Request-Reply](/Technology/System-Design/Practices/azure-design-patterns/Asynchronous Request Reply Pattern) | Tách rời xử lý backend khỏi host frontend khi backend cần xử lý bất đồng bộ nhưng frontend vẫn cần phản hồi rõ ràng.          | Hiệu suất                                                  |
| [Backends for Frontends](/Technology/System-Design/Practices/azure-design-patterns/Backends For Frontends Pattern)         | Tạo các dịch vụ backend riêng biệt cho các ứng dụng hoặc giao diện frontend cụ thể.                                           | Độ tin cậy, Bảo mật, Hiệu suất                             |
| [Bulkhead](/Technology/System-Design/Practices/azure-design-patterns/Bulkhead Pattern)                                     | Cô lập các thành phần của ứng dụng vào các nhóm (pool) để nếu một nhóm lỗi, các nhóm khác vẫn hoạt động.                      | Độ tin cậy, Bảo mật, Hiệu suất                             |
| [Cache-Aside](/Technology/System-Design/Practices/azure-design-patterns/Cache Aside Pattern)                               | Nạp dữ liệu theo yêu cầu vào bộ nhớ đệm (cache) từ kho dữ liệu.                                                               | Độ tin cậy, Hiệu suất                                      |
| [Choreography](/Technology/System-Design/Practices/azure-design-patterns/Choreography Pattern)                             | Để các dịch vụ tự quyết định khi nào và làm thế nào để xử lý một nghiệp vụ thay vì phụ thuộc vào bộ điều phối trung tâm.      | Vận hành xuất sắc, Hiệu suất                               |
| [Circuit Breaker](/Technology/System-Design/Practices/azure-design-patterns/Circuit Breaker Pattern)                       | Xử lý các lỗi có thể mất một khoảng thời gian không xác định để khắc phục khi kết nối với dịch vụ từ xa.                      | Độ tin cậy, Hiệu suất                                      |
| [Claim Check](/Technology/System-Design/Practices/azure-design-patterns/Claim Check Pattern)                               | Chia một thông báo lớn thành một "phiếu nhận" (claim check) và nội dung (payload) để tránh làm quá tải bus tin nhắn.          | Độ tin cậy, Bảo mật, Chi phí, Hiệu suất                    |
| [Compensating Transaction](/Technology/System-Design/Practices/azure-design-patterns/Compensating Transaction Pattern)     | Hoàn tác công việc được thực hiện bởi một chuỗi các bước tạo thành một hoạt động nhất quán cuối cùng (eventually consistent). | Độ tin cậy                                                 |
| **Competing Consumers**                                                                                                    | Cho phép nhiều người tiêu dùng đồng thời xử lý các tin nhắn nhận được trên cùng một kênh truyền thông.                        | Độ tin cậy, Chi phí, Hiệu suất                             |
| **Compute Resource Consolidation**                                                                                         | Hợp nhất nhiều tác vụ hoặc hoạt động vào một đơn vị tính toán duy nhất.                                                       | Chi phí, Vận hành xuất sắc, Hiệu suất                      |
| **CQRS**                                                                                                                   | Tách biệt các hoạt động đọc dữ liệu khỏi các hoạt động cập nhật dữ liệu bằng cách sử dụng các giao diện riêng biệt.           | Hiệu suất                                                  |
| **Deployment Stamps**                                                                                                      | Triển khai nhiều bản sao độc lập của các thành phần ứng dụng, bao gồm cả kho dữ liệu.                                         | Vận hành xuất sắc, Hiệu suất                               |
| **Event Sourcing**                                                                                                         | Sử dụng một kho lưu trữ chỉ thêm (append-only) để ghi lại toàn bộ chuỗi sự kiện mô tả các hành động đối với dữ liệu.          | Độ tin cậy, Hiệu suất                                      |
| **External Configuration Store**                                                                                           | Di chuyển thông tin cấu hình ra khỏi gói triển khai ứng dụng đến một vị trí tập trung.                                        | Vận hành xuất sắc                                          |
| **Federated Identity**                                                                                                     | Ủy quyền xác thực cho một nhà cung cấp danh tính bên ngoài.                                                                   | Độ tin cậy, Bảo mật, Hiệu suất                             |
| **Gateway Aggregation**                                                                                                    | Sử dụng một cổng (gateway) để gộp nhiều yêu cầu riêng lẻ thành một yêu cầu duy nhất.                                          | Độ tin cậy, Bảo mật, Vận hành xuất sắc, Hiệu suất          |
| **Gateway Offloading**                                                                                                     | Đẩy các chức năng dịch vụ chung hoặc chuyên biệt (như SSL, Auth) sang một proxy cổng.                                         | Độ tin cậy, Bảo mật, Chi phí, Vận hành xuất sắc, Hiệu suất |
| **Gateway Routing**                                                                                                        | Định tuyến yêu cầu đến nhiều dịch vụ bằng cách sử dụng một điểm cuối (endpoint) duy nhất.                                     | Độ tin cậy, Vận hành xuất sắc, Hiệu suất                   |
| **Geode**                                                                                                                  | Triển khai các dịch vụ backend trên các nút phân tán về mặt địa lý để phục vụ yêu cầu từ bất kỳ vùng nào.                     | Độ tin cậy, Hiệu suất                                      |
| **Health Endpoint Monitoring**                                                                                             | Triển khai các kiểm tra chức năng trong ứng dụng mà các công cụ bên ngoài có thể truy cập định kỳ.                            | Độ tin cậy, Vận hành xuất sắc, Hiệu suất                   |
| **Index Table**                                                                                                            | Tạo chỉ mục trên các trường trong kho dữ liệu mà các truy vấn thường xuyên tham chiếu.                                        | Độ tin cậy, Hiệu suất                                      |
| **Leader Election**                                                                                                        | Điều phối các hành động trong ứng dụng phân tán bằng cách bầu chọn một thực thể làm lãnh đạo.                                 | Độ tin cậy                                                 |
| **Materialized View**                                                                                                      | Tạo các khung nhìn (view) dữ liệu được điền sẵn khi dữ liệu gốc không phù hợp cho các truy vấn phức tạp.                      | Hiệu suất                                                  |
| **Messaging Bridge**                                                                                                       | Xây dựng bộ phận trung gian để cho phép giao tiếp giữa các hệ thống tin nhắn không tương thích.                               | Chi phí, Vận hành xuất sắc                                 |
| **Pipes and Filters**                                                                                                      | Chia nhỏ một tác vụ xử lý phức tạp thành một chuỗi các thành phần riêng biệt có thể tái sử dụng.                              | Độ tin cậy                                                 |
| **Priority Queue**                                                                                                         | Ưu tiên các yêu cầu gửi đến dịch vụ để các yêu cầu có ưu tiên cao hơn được xử lý nhanh hơn.                                   | Độ tin cậy, Hiệu suất                                      |
| **Publisher/Subscriber**                                                                                                   | Cho phép ứng dụng thông báo sự kiện cho nhiều người tiêu dùng một cách bất đồng bộ.                                           | Độ tin cậy, Bảo mật, Chi phí, Vận hành xuất sắc, Hiệu suất |
| **Quarantine**                                                                                                             | Đảm bảo tài sản bên ngoài đáp ứng mức chất lượng trước khi được đưa vào quy trình làm việc.                                   | Bảo mật, Vận hành xuất sắc                                 |
| **Queue-Based Load Leveling**                                                                                              | Sử dụng hàng đợi làm bộ đệm giữa tác vụ và dịch vụ để làm mịn các tải nặng không liên tục.                                    | Độ tin cậy, Chi phí, Hiệu suất                             |
| [Rate Limiting](/Technology/System-Design/Practices/azure-design-patterns/Rate Limiting Pattern)                           | Tránh hoặc giảm thiểu lỗi quá tải bằng cách kiểm soát mức tiêu thụ tài nguyên.                                                | Độ tin cậy                                                 |
| [Retry](/Technology/System-Design/Practices/azure-design-patterns/Retry Pattern)                                           | Cho phép ứng dụng xử lý các lỗi tạm thời bằng cách thử lại các thao tác bị lỗi.                                               | Độ tin cậy                                                 |
| [Saga](/Technology/System-Design/Practices/azure-design-patterns/Saga Pattern)                                             | Quản lý tính nhất quán của dữ liệu giữa các microservices trong các kịch bản giao dịch phân tán.                              | Độ tin cậy                                                 |
| [Scheduler Agent Supervisor](/Technology/System-Design/Practices/azure-design-patterns/Scheduler Agent Supervisor Pattern) | Điều phối một tập hợp các hành động trên các dịch vụ và tài nguyên phân tán.                                                  | Độ tin cậy, Hiệu suất                                      |
| [Sequential Convoy](/Technology/System-Design/Practices/azure-design-patterns/Sequential Convoy Pattern)                   | Xử lý một tập hợp các tin nhắn liên quan theo thứ tự xác định mà không làm tắc nghẽn các nhóm khác.                           | Độ tin cậy                                                 |
| [Sharding](/Technology/System-Design/Practices/azure-design-patterns/Sharding Pattern)                                     | Chia một kho dữ liệu thành một tập hợp các phân vùng ngang hoặc shards.                                                       | Độ tin cậy, Chi phí                                        |
| [Sidecar](/Technology/System-Design/Practices/azure-design-patterns/Sidecar Pattern)                                       | Triển khai các thành phần vào một tiến trình hoặc container riêng biệt để cung cấp sự cô lập và đóng gói.                     | Bảo mật, Vận hành xuất sắc                                 |
| [Static Content Hosting](/Technology/System-Design/Practices/azure-design-patterns/Static Content Hosting Pattern)         | Triển khai nội dung tĩnh lên dịch vụ lưu trữ đám mây để phân phối trực tiếp cho khách hàng.                                   | Chi phí                                                    |
| [Strangler Fig](/Technology/System-Design/Practices/azure-design-patterns/Strangler Fig Pattern)                           | Di chuyển dần dần một hệ thống cũ bằng cách thay thế từng phần chức năng bằng các ứng dụng/dịch vụ mới.                       | Độ tin cậy, Chi phí, Vận hành xuất sắc                     |
| [Throttling](/Technology/System-Design/Practices/azure-design-patterns/Throttling Pattern)                                 | Kiểm soát mức tiêu thụ tài nguyên của ứng dụng, người dùng hoặc dịch vụ.                                                      | Độ tin cậy, Bảo mật, Chi phí, Hiệu suất                    |
| [Valet Key](/Technology/System-Design/Practices/azure-design-patterns/Valet Key Pattern)                                   | Sử dụng token hoặc khóa để cung cấp cho khách hàng quyền truy cập trực tiếp và hạn chế vào tài nguyên.                        | Bảo mật, Chi phí, Hiệu suất                                |

---

_Nguồn: [Azure Architecture Center - Cloud Design Patterns](https://learn.microsoft.com/en-us/azure/architecture/patterns/)_
