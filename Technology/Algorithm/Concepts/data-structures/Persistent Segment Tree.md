---
area: technology
domain: algorithms
topic: data-structures
type: resource
title: Persistent Segment Tree
description: Persistent Segment Tree
timestamp: "2026-06-19T13:43:26.161Z"
tags:
  - technology
  - algorithms
  - data-structures
resource: https://viblo.asia/p/du-hanh-thoi-gian-cung-persistent-segment-tree-n1j4lkvAVwl
---

# Persistent Segment Tree

> https://viblo.asia/p/du-hanh-thoi-gian-cung-persistent-segment-tree-n1j4lkvAVwl

## Giới thiệu

- Persistent Segment Tree (PST) cho phép truy vấn hiệu quả trên các đoạn dữ liệu và "nhìn lại" bất kỳ trạng thái nào của dữ liệu trong quá khứ
- Mở rộng từ Segment Tree, cho phép truy vấn và cập nhật trên các phiên bản trước đó của dữ liệu mà không làm mất thông tin

## Segment Tree

- Cấu trúc dữ liệu cho phép xử lý các truy vấn trên một đoạn của mảng một cách hiệu quả
- Hoạt động dựa trên nguyên lý "chia để trị"

## Tính Bất Biến (Persistence)

- Lưu giữ lịch sử của dữ liệu, cho phép truy cập lại các trạng thái trước đó mà không ảnh hưởng đến trạng thái hiện tại
- Mỗi phiên bản của cây được lưu trữ độc lập

## Kết Hợp Segment Tree và Tính Bất Biến

- Tạo ra PST bằng cách kết hợp Segment Tree với tính bất biến
- Cho phép truy vấn và cập nhật hiệu quả mà vẫn giữ được lịch sử dữ liệu

## Path Copying

- Kỹ thuật sao chép thông minh chỉ các nút cần thiết trong cây khi cập nhật
- Giúp tiết kiệm bộ nhớ và tăng hiệu quả so với việc sao chép toàn bộ cây

## Ứng Dụng Thực Tế

- Quản lý phiên bản dữ liệu
- Undo/redo trong phần mềm
- Các hệ thống lưu trữ dữ liệu lịch sử
- Các bài toán trong lập trình thi đấu yêu cầu truy vấn và cập nhật dữ liệu theo thời gian
