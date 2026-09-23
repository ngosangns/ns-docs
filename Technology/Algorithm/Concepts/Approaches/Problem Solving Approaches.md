---
area: technology
domain: algorithms
topic: algorithms
type: resource
title: Problem Solving Approaches
description: Problem Solving Approaches
timestamp: "2026-06-19T13:43:26.161Z"
tags:
  - technology
  - algorithms
resource: https://vnoi.info/wiki/translate/topcoder/How-to-Find-a-Solution.md
---

# Problem Solving Approaches

## Mục lục

- [Nguồn tham khảo](#nguồn-tham-khảo)
- [Các cách tiếp cận](#các-cách-tiếp-cận)
- [TODO](#todo)

## Nguồn tham khảo

- Nghệ thuật giải bài (vnoi.info): https://vnoi.info/wiki/translate/topcoder/How-to-Find-a-Solution.md
- https://viblo.asia/p/cac-cach-tiep-can-trong-giai-thuat-huong-dan-de-hieu-cho-lap-trinh-vien-oK9Vy6rq4QR

## Các cách tiếp cận

### Brute Force (Duyệt Hết Tất Cả)

- Thử tất cả các khả năng có thể để tìm đáp án đúng
- Phù hợp khi dữ liệu ít hoặc chưa có phương pháp tối ưu hơn
- Nhược điểm là chậm khi dữ liệu lớn

### Greedy (Tham Lam)

- Tại mỗi bước, chọn phương án tốt nhất hiện tại mà không quan tâm đến tương lai
- Áp dụng khi bài toán có thể giải quyết bằng từng bước nhỏ và lựa chọn trước đó không ảnh hưởng nhiều đến sau này
- Lưu ý: không phải lúc nào cũng cho kết quả tối ưu

### Divide and Conquer (Chia Để Trị)

- Chia bài toán lớn thành các phần nhỏ, giải từng phần rồi kết hợp kết quả
- Hữu ích khi bài toán có thể chia nhỏ mà vẫn giữ nguyên bản chất và việc kết hợp kết quả dễ dàng

### Dynamic Programming (Quy Hoạch Động)

- Lưu kết quả của các bước đã làm để tránh tính toán lại
- Sử dụng khi bài toán có phần lặp lại nhiều lần và có thể chia nhỏ thành các phần liên quan

### Backtracking (Quay Lui)

- Thử một lựa chọn, nếu không phù hợp thì quay lại và thử lựa chọn khác
- Dùng khi muốn tìm tất cả các cách giải hoặc có nhiều khả năng nhưng có thể loại bớt những cách không hợp lý

### Branch and Bound (Nhánh Cận)

- Tương tự Backtracking nhưng có thêm cận trên và cận dưới để loại bớt nhánh không cần thiết
- Áp dụng khi cần tìm giải pháp tối ưu và có thể xác định trước phạm vi tìm kiếm

### Graph Algorithms (Thuật Toán Đồ Thị)

- Duyệt qua các đỉnh và cạnh để tìm lời giải
- Sử dụng khi bài toán có thể biểu diễn bằng đồ thị

### Bit Manipulation (Xử Lý Bit)

- Dùng các phép toán trên bit để xử lý dữ liệu nhanh hơn
- Hữu ích khi làm việc với số nhị phân hoặc tối ưu bộ nhớ

### Machine Learning Approach (Học Máy)

- Dùng dữ liệu để học quy luật thay vì viết thuật toán cố định
- Áp dụng khi bài toán quá phức tạp để viết thuật toán hoặc cần dự đoán dựa trên dữ liệu có sẵn

## TODO

- Viết thêm 1 bảng các dấu hiệu để áp dụng 1 thuật toán vào bài toán
