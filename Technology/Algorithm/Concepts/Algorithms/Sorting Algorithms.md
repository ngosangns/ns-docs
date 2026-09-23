---
area: technology
domain: algorithms
topic: golang
type: resource
title: Sorting Algorithms
description: Sorting Algorithms
timestamp: "2026-06-19T13:43:26.161Z"
tags:
  - technology
  - algorithms
  - golang
resource: https://viblo.asia/p/sap-xep-voi-thoi-gian-tuyen-tinh-E1XVOZ6GLMz
---

# Sorting Algorithms

## Tổng quan

- Sắp xếp với thời gian tuyến tính: https://viblo.asia/p/sap-xep-voi-thoi-gian-tuyen-tinh-E1XVOZ6GLMz

## So sánh các thuật toán sắp xếp

| Tên thuật toán | Nên dùng khi                       | Ưu / nhược điểm           | Big O           |
| -------------- | ---------------------------------- | ------------------------- | --------------- |
| Bubble Sort    | Array nhỏ                          |                           | n^2             |
| Insertion Sort | Array nhỏ, gần như đã được sắp xếp |                           | n^2             |
| Heap Sort      |                                    | Không ổn định             | nlogn           |
| Quick Sort     |                                    | Không ổn định             | nlogn → n^2     |
| RadixSort      | Sắp xếp số nguyên                  | Không thể sắp xếp số thực | nlog(max value) |

![](/Attachments/f6e7d8c9-a0b1-2c3d-4e5f-6a7b8c9d0e1f.png)
