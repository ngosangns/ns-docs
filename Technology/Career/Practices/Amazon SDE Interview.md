---
tags:
  - area/technology
  - domain/career
  - topic/interview
  - type/resource
  - lang/vi
---

# Amazon SDE Interview

## Round 1 - SDE-1

### Tổng quan

- **Thời gian**: ~1 giờ
- **Hình thức**: Online qua Amazon Chime
- **Nội dung**:
  - 1 bài toán thuật toán
  - 1 số câu hỏi System Design
  - Câu hỏi về Amazon Leadership Principles

### Các lỗi thường gặp và bài học

#### 1. Binary Search & Edge Cases

- **Lỗi**: Chọn Heap thay vì Binary Search cho bài tìm k phần tử nhỏ nhất trong 2 mảng đã sắp xếp
  - Heap: O(k log k)
  - Binary Search: O(log(min(len(A), len(B))))
- **Bài học**:
  - Ôn tập kỹ Binary Search và xử lý edge cases trong mảng đã sắp xếp
  - Hỏi interviewer để làm rõ hướng tiếp cận trước khi code

#### 2. Code Quality

- **Lỗi**: Code có nhiều biến dư thừa, chưa tối ưu
- **Bài học**:
  - Đặt tên biến rõ ràng
  - Viết thuật toán tối ưu
  - Rà soát lại code trước khi chạy thử

#### 3. System Design

- **Lỗi**: Trả lời quá chung chung, chỉ đề cập REST API, thiếu các yếu tố quan trọng
- **Bài học**: Khi trả lời System Design cần đề cập:
  - Scalability
  - Caching (Redis)
  - Indexing (ElasticSearch)
  - Load balancing
  - Giải thích logic, dễ hiểu

#### 4. Leadership Principles

- **Lỗi**: Trả lời thiếu mạch lạc, không dùng STAR Format
- **Bài học**:
  - Sử dụng STAR Format (Situation - Task - Action - Result)
  - Amazon đánh giá cả kỹ thuật và tư duy làm việc
  - Chuẩn bị kỹ các câu chuyện theo STAR

### Bí kíp thành công

- Thành thạo: Binary Search, Heap, Two Pointers
- Code gọn gàng, tối ưu, đọc lại trước khi chạy
- System Design: nhắc đến scalability, caching, indexing
- Leadership Principles: chuẩn bị kỹ với STAR format
