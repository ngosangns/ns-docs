---
area: technology
domain: computer-science
type: resource
title: CPU Performance Hieu Suat CPU
description: Độ trễ trong bộ xử lý trung tâm và ổ cứng - Tối ưu hóa hiệu suất hệ thống
timestamp: "2026-06-19T13:43:26.145Z"
tags:
  - technology
  - computer-science
resource: https://viblo.asia/p/tim-hieu-ve-do-tre-trong-bo-xu-ly-trung-tam-va-o-cung-toi-uu-hoa-hieu-suat-he-thong-BQyJKvyw4Me
---

# Độ trễ trong bộ xử lý trung tâm và ổ cứng - Tối ưu hóa hiệu suất hệ thống

- **Độ trễ trong hệ thống**:
  - Truy xuất từ ổ đĩa chậm hơn 80 lần so với RAM, SSD vẫn chậm hơn 4 lần so với RAM
  - Thứ tự độ trễ từ nhanh đến chậm: L1 Cache CPU (0.5 ns), L2 Cache (7 ns), RAM (100 ns), SSD (1,000,000 ns cho 1MB), Disk (20,000,000 ns cho 1MB)
  - Hiểu rõ độ trễ giúp tối ưu hóa hiệu suất hệ thống bằng cách ưu tiên sử dụng các tầng bộ nhớ nhanh hơn
- **Dự đoán nhánh trong CPU (Branch Prediction)**:
  - CPU hiện đại sử dụng bộ dự đoán nhánh để xử lý hiệu quả các lệnh rẽ nhánh, giảm thiểu lãng phí chu kỳ CPU
  - Giúp CPU có thể dự đoán trước hướng đi của chương trình và tải sẵn các lệnh cần thiết
- **Ảo tưởng về bộ nhớ chung (Shared Memory)**:
  - Các process/thread sử dụng vùng nhớ chung để tương tác, nhưng cần quản lý việc đọc/ghi dữ liệu và tránh tranh chấp tài nguyên
  - Việc chia sẻ bộ nhớ giữa các process/thread có thể dẫn đến tranh chấp tài nguyên và giảm hiệu suất nếu không được quản lý đúng cách
- **False Sharing**:
  - Khi nhiều lõi CPU làm việc với các biến khác nhau nhưng cùng nằm trên một cache line, dẫn đến việc phải đồng bộ giữa các lõi, gây giảm hiệu suất
  - Đây là một vấn đề tinh vi trong lập trình đa luồng cần được chú ý để tối ưu hóa hiệu suất
- Nguồn: https://viblo.asia/p/tim-hieu-ve-do-tre-trong-bo-xu-ly-trung-tam-va-o-cung-toi-uu-hoa-hieu-suat-he-thong-BQyJKvyw4Me
