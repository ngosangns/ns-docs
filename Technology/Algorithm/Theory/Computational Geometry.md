---
tags:
  - area/technology
  - domain/algorithms
  - topic/golang
  - type/resource
  - lang/vi
---

# Computational Geometry (Hình học tính toán)

## Bao lồi (Convex Hull)

Bao lồi là một vấn đề rất thường xuyên xuất hiện trong các bài tập hình học tính toán của lập trình thi đấu.

Xét một tập điểm trên mặt phẳng tọa độ Oxy, bao lồi của tập điểm là tập lồi nhỏ nhất (theo diện tích, thể tích,...) mà chứa tất cả các điểm đó. Nói cách khác, bao lồi của một tập điểm là đa giác nhỏ nhất chứa tất cả các điểm đó.

Một cách trực quan, nếu coi mỗi điểm như một chiếc đinh đóng trên tấm gỗ, bao lồi của tập điểm đó sẽ có viền ngoài là một sợi dây sau khi bị kéo căng vào những chiếc đinh ở các phía.

![[8b9c0d1e-2f3a-4b5c-6d7e-8f9a0b1c2d3e.png]]

## Các thuật toán tìm bao lồi thông dụng

- Graham
- Monotone Chain

