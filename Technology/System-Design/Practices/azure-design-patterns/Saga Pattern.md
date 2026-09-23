---
area: technology
domain: system-design
type: note
title: Saga Pattern
description: Saga Pattern
timestamp: "2026-06-19T13:43:26.124Z"
tags:
  - technology
  - system-design
resource: https://learn.microsoft.com/en-us/azure/architecture/patterns/saga
---

```ngosangns-knowledge-base/technology/system-design/azure-design-patterns/Saga Pattern.md#L1-37
# Saga Distributed Transactions Pattern (Mô hình Giao dịch Phân tán Saga)

## Tóm tắt
Mô hình Saga giúp duy trì tính nhất quán của dữ liệu trong các hệ thống phân tán bằng cách điều phối các giao dịch trên nhiều dịch vụ. Một Saga là một chuỗi các giao dịch cục bộ (local transactions), trong đó mỗi dịch vụ thực hiện hoạt động của mình và kích hoạt bước tiếp theo thông qua sự kiện hoặc tin nhắn. Nếu một bước thất bại, Saga sẽ thực hiện các giao dịch bù (compensating transactions) để hoàn tác các bước đã hoàn thành.

## Các điểm chính
- **Mục đích**: Đảm bảo tính nhất quán dữ liệu (eventual consistency) trong kiến trúc microservices mà không cần sử dụng giao dịch phân tán kiểu truyền thống (như 2PC - Two-Phase Commit).
- **Thành phần chính**:
    - **Compensable transactions**: Các giao dịch có thể hoàn tác.
    - **Pivot transaction**: Điểm không thể quay đầu. Sau bước này, các giao dịch bù không còn phù hợp, và hệ thống phải hoàn thành các bước tiếp theo.
    - **Retryable transactions**: Các giao dịch sau điểm pivot, cần đảm bảo tính lũy đẳng (idempotent) để có thể thử lại cho đến khi thành công.
- **Hai phương pháp triển khai**:
    - **Choreography (Vũ đạo)**: Các dịch vụ tự trao đổi sự kiện với nhau mà không cần bộ điều phối trung tâm. Phù hợp cho quy trình đơn giản, ít dịch vụ.
    - **Orchestration (Chỉ huy)**: Có một bộ điều phối trung tâm (Orchestrator) quản lý luồng công việc, ra lệnh cho các dịch vụ và xử lý phục hồi lỗi. Phù hợp cho quy trình phức tạp.
- **Vấn đề cần lưu ý**:
    - **Tính phức tạp**: Debug và theo dõi luồng Saga rất khó khăn khi số lượng dịch vụ tăng lên.
    - **Dữ liệu bất thường**: Do thiếu tính cô lập (Isolation) giữa các dịch vụ, có thể xảy ra các vấn đề như: *Lost updates* (mất cập nhật), *Dirty reads* (đọc dữ liệu chưa commit), *Fuzzy reads*.
    - **Chiến lược đối phó**: Sử dụng khóa ở cấp ứng dụng (Semantic lock), cập nhật giao hoán (Commutative updates), hoặc kiểm tra lại giá trị trước khi cập nhật.

## Khi nào sử dụng
- Cần đảm bảo nhất quán dữ liệu trong hệ thống phân tán mà không muốn bị ràng buộc chặt chẽ (tight coupling).
- Cần có khả năng hoàn tác (rollback/compensate) nếu một thao tác trong chuỗi thất bại.

## Mối liên hệ
- **Compensating Transaction Pattern**: Cung cấp cơ chế hoàn tác các bước đã thực hiện.
- **Retry Pattern**: Giúp xử lý các lỗi tạm thời trong các bước có thể thử lại.
- **Choreography Pattern**: Một trong hai cách triển khai chính của Saga.

## Tài liệu tham khảo
- [Microsoft Learn - Saga Pattern](https://learn.microsoft.com/en-us/azure/architecture/patterns/saga)
```
