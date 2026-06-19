---
area: technology
domain: system-design
type: note
title: Sharding Pattern
description: Sharding Pattern
timestamp: '2026-06-19T13:43:26.124Z'
tags:
  - technology
  - system-design
resource: https://learn.microsoft.com/en-us/azure/architecture/patterns/sharding
---
```ngosangns-knowledge-base/technology/system-design/azure-design-patterns/Sharding Pattern.md#L1-43
# Sharding Pattern (Mô hình Phân mảnh dữ liệu)

## Tóm tắt
Mô hình Sharding chia nhỏ một kho dữ liệu thành một tập hợp các phân vùng ngang (horizontal partitions) gọi là các shard. Mỗi shard có cùng lược đồ (schema) nhưng chứa một tập hợp con dữ liệu riêng biệt. Điều này giúp cải thiện khả năng mở rộng, giảm tranh chấp tài nguyên và tối ưu hóa hiệu suất khi lưu trữ và truy cập khối lượng dữ liệu lớn.

## Các chiến lược Sharding
1.  **Chiến lược Tra cứu (Lookup strategy)**:
    - Sử dụng một bản đồ (map) để định tuyến yêu cầu đến shard chứa dữ liệu dựa trên shard key.
    - Cho phép kiểm soát tốt việc phân bổ dữ liệu và dễ dàng tái cân bằng (rebalancing) thông qua các phân vùng ảo (virtual partitions).
2.  **Chiến lược Phạm vi (Range strategy)**:
    - Nhóm các mục liên quan vào cùng một shard và sắp xếp chúng theo shard key (ví dụ: theo tháng/năm).
    - Rất hiệu quả cho các truy vấn theo phạm vi (range queries).
    - Tuy nhiên, dễ dẫn đến tình trạng "hotspots" nếu dữ liệu mới thường xuyên tập trung vào một phạm vi nhất định.
3.  **Chiến lược Băm (Hash strategy)**:
    - Sử dụng hàm băm trên shard key để quyết định vị trí lưu trữ.
    - Giúp phân bổ dữ liệu và tải trọng đồng đều hơn, giảm thiểu hotspots.
    - Khó khăn trong việc thực hiện truy vấn theo phạm vi và tái cân bằng shard.

## Các điểm chính và lưu ý
- **Shard Key**: Phải chọn một thuộc tính tĩnh, không thay đổi và đảm bảo tính duy nhất. Việc chọn shard key phù hợp là yếu tố quan trọng nhất để đạt hiệu suất tối ưu.
- **Tính nhất quán**: Duy trì tính toàn vẹn tham chiếu và nhất quán giữa các shard rất khó khăn. Thường phải chấp nhận mô hình *nhất quán sau cùng* (eventual consistency).
- **Truy vấn đa shard (Cross-shard queries)**: Các truy vấn truy cập vào nhiều shard sẽ kém hiệu quả hơn. Cần tránh các phép join dữ liệu giữa các shard. Có thể sử dụng các tác vụ song song (fan-out queries) để cải thiện tốc độ nhưng tăng độ phức tạp.
- **Tái cân bằng (Rebalancing)**: Khi dữ liệu tăng trưởng không đều, cần có chiến lược để di chuyển dữ liệu giữa các shard mà không gây gián đoạn hệ thống.

## Khi nào sử dụng
- Khi kho dữ liệu cần mở rộng vượt quá khả năng của một nút lưu trữ đơn lẻ.
- Khi cần giảm tranh chấp và cải thiện hiệu suất phản hồi cho một lượng lớn người dùng đồng thời.
- Khi cần lưu trữ dữ liệu gần với người dùng về mặt địa lý để giảm độ trễ.

## Mối liên hệ
- **Index Table Pattern**: Dùng để hỗ trợ truy vấn dữ liệu dựa trên các thuộc tính không phải là shard key.
- **Materialized View Pattern**: Giúp tổng hợp và tóm tắt dữ liệu từ nhiều shard để tăng tốc độ truy vấn.
- **Data Partitioning Guidance**: Sharding là một dạng phân vùng dữ liệu theo chiều ngang.

## Tài liệu tham khảo
- [Microsoft Learn - Sharding Pattern](https://learn.microsoft.com/en-us/azure/architecture/patterns/sharding)
