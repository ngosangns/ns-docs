---
area: technology
domain: algorithms
type: resource
title: Segment Tree
description: Cây phân đoạn (Segment Tree)
timestamp: "2026-06-19T13:43:26.161Z"
tags:
  - technology
  - algorithms
resource: https://vnoi.info/wiki/algo/data-structures/segment-tree-basic.md
---

# Cây phân đoạn (Segment Tree)

## Tổng quan

Cây phân đoạn (Segment Tree) là cấu trúc dữ liệu cho phép thực hiện các truy vấn và cập nhật trên một đoạn phần tử của mảng một cách hiệu quả với độ phức tạp O(log n).

## Các bài toán cơ bản ứng dụng Cây phân đoạn

### Bài toán 1: Dãy con tăng dài nhất (LIS)

- **Mô tả**: Tìm dãy con tăng ngặt dài nhất trong một dãy số
- **Phương pháp**:
  - Sử dụng kỹ thuật rời rạc hóa để nén các giá trị trong mảng về một phạm vi nhỏ hơn nhưng vẫn giữ nguyên thứ tự tương đối
  - Dùng cây phân đoạn để lưu trữ và truy vấn độ dài dãy con tăng dài nhất kết thúc tại mỗi phần tử
  - Cập nhật và truy vấn cây phân đoạn để tìm giá trị lớn nhất trong các đoạn phù hợp, từ đó tính toán LIS

### Bài toán 2: Tìm giá trị nhỏ nhất trên đoạn

- **Mô tả**: Cho mảng A, thực hiện truy vấn tìm giá trị nhỏ nhất trên đoạn [l, r]
- **Phương pháp**:
  - Xây dựng cây phân đoạn để quản lý giá trị nhỏ nhất trên các đoạn
  - Thực hiện truy vấn tìm giá trị nhỏ nhất trên đoạn [l, r] một cách hiệu quả

## Lazy Propagation (Cập nhật lười)

### Vấn đề đặt ra

Khi cần cập nhật một đoạn phần tử trong mảng (thay vì chỉ cập nhật một phần tử), việc cập nhật từng phần tử riêng lẻ có thể dẫn đến độ phức tạp cao O(n log n).

### Ý tưởng kỹ thuật

- Thay vì cập nhật từng phần tử, ta chỉ cập nhật các nút quản lý đoạn lớn nhất trong cây phân đoạn (các nút gần gốc nhất) mà tổng hợp của các đoạn đó đúng bằng đoạn cần cập nhật
- Lưu lại một giá trị ở các nút đó - gọi là giá trị lazy update - dùng để đánh dấu rằng các nút thuộc đoạn này đều sẽ phải được cập nhật bằng một giá trị tương ứng
- Các nút con sẽ chỉ được cập nhật lại chính xác khi thực sự cần thiết (khi truy vấn hoặc khi cần giá trị thực tế)

### Cách thực hiện

- Mỗi nút trong cây phân đoạn lưu thêm một giá trị `lazy` để ghi nhận cập nhật chờ xử lý
- Khi cần cập nhật một đoạn, chỉ cập nhật giá trị `lazy` tại các nút tương ứng mà không cập nhật ngay giá trị thực tế
- Khi truy vấn hoặc cần giá trị thực tế, thực hiện "đẩy" (propagate) giá trị `lazy` xuống các nút con và cập nhật giá trị thực tế

### Lợi ích

- Giảm độ phức tạp của các thao tác cập nhật đoạn từ O(n log n) xuống O(log n)
- Tối ưu hóa hiệu suất khi xử lý các bài toán có nhiều truy vấn cập nhật đoạn

### Ví dụ minh họa

Với mảng A = [9, 2, 6, 3, 1, 5, 7], khi cần cập nhật đoạn [1, 6]:

- Thay vì đi vào cập nhật tất cả các nút chứa các phần tử thuộc đoạn [1, 6]
- Ta sẽ chỉ cập nhật hai nút lớn nhất là [1, 4] và [5, 6] (hợp nhất lại vừa đủ bằng đoạn [1, 6])
- Các nút con sẽ được cập nhật khi cần thiết

## Tài liệu tham khảo

- [VNOI - Segment Tree Basic](https://vnoi.info/wiki/algo/data-structures/segment-tree-basic.md)
- [CP-Algorithms - Segment Tree](https://cp-algorithms.com/data_structures/segment_tree.html)
