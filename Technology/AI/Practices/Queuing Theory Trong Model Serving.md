---
area: technology
domain: ai-ml
topic: mlops
type: case-study
title: Queuing Theory Trong Model Serving
description: Queuing Theory trong Model Serving - Debug Latency
timestamp: '2026-06-19T13:43:26.165Z'
tags:
  - technology
  - ai-ml
  - mlops
resource: https://en.wikipedia.org/wiki/Queueing_theory
---
# Queuing Theory trong Model Serving - Debug Latency

## Tóm tắt vấn đề

### Bối cảnh

- **Hệ thống**: Model serving - deploy AI models vào production
- **Mục tiêu**: Tối ưu latency và throughput trên GPU
  - Latency: Phải giới hạn ở mức nhất định (yêu cầu kinh doanh)
  - Throughput: Quyết định số GPU cần mua (càng cao càng tiết kiệm)

### Vấn đề bí ẩn

- **Dev system**: Ghi lại traffic từ production và replay với các throughput khác nhau để đo p99 latency
- **Kết quả**: p99 latency ở hệ thống replay **chỉ bằng một nửa** của p99 latency ở production với cùng một throughput
- **Nỗ lực debug**: Rà soát dữ liệu, code, đưa ra nhiều giả thuyết nhưng không giải thích được sự khác biệt

## Phát hiện nguyên nhân

### Quan sát từ profiling

- Khi phân tích CUDA kernels, phát hiện các kernels của các request khác nhau được **luân phiên xen kẽ** với nhau
- **Insight**: GPU chỉ chạy được các kernel một cách tuần tự
- Khi có 2 request được xử lý cùng lúc → latency của mỗi request bị kéo dài ra
- **Kết luận**: Traffic pattern rất quan trọng, không chỉ phụ thuộc vào throughput

### Ví dụ minh họa

**Giả sử**: 10 qps (query per second), trung bình 100ms một request, trong 400ms nhận 4 requests, GPU xử lý mỗi request đơn lẻ trong 50ms

**Hệ thống 1 - Fixed intervals:**

- Đều đặn mỗi 100ms nhận được request mới
- GPU có thể xử lý mỗi request trong 50ms (50ms còn lại idle)
- **Latency**: 50ms

**Hệ thống 2 - Burst traffic:**

- 4 requests đến cùng một lúc
- GPU phải xử lý 4 request cùng lúc, các kernel được xử lý luân phiên
- **Latency**: 50ms × 4 = 200ms

## Giải pháp

### Queuing Theory

- Traffic ở các hệ thống thực tế thường theo **Poisson process** với **Poisson distribution**
- Replay system ban đầu dùng **fixed intervals** → không phản ánh đúng traffic pattern thực tế

### Implementation

- Cài đặt lại replay code theo **Poisson distribution** thay vì fixed intervals
- **Kết quả**: Sai số chênh lệch giữa production và replay chỉ còn **< 5%**

## Bài học

1. **Kiến thức nền tảng toán và thống kê** rất quan trọng trong thực tế
2. **Traffic pattern** ảnh hưởng lớn đến latency, không chỉ phụ thuộc vào throughput
3. Khi benchmark/replay traffic, cần mô phỏng đúng **distribution** của traffic thực tế
4. **Queuing theory** là công cụ hữu ích để hiểu và tối ưu hệ thống

## Tài liệu tham khảo

- [Queueing Theory](https://en.wikipedia.org/wiki/Queueing_theory)
- [Poisson Point Process](https://en.wikipedia.org/wiki/Poisson_point_process)
- Central Limit Theorem (để hiểu tại sao traffic thực tế theo Poisson distribution)