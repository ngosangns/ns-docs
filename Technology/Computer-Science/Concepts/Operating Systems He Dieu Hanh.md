---
area: technology
domain: computer-science
type: resource
title: Operating Systems He Dieu Hanh
description: OS và các cơ chế time slicing và scheduling
timestamp: "2026-06-19T13:43:26.145Z"
tags:
  - technology
  - computer-science
---

# OS và các cơ chế time slicing và scheduling

- Cơ chế time slicing là một phương pháp trong lập lịch mà mỗi tiến trình hoặc luồng được cấp một khoảng thời gian nhất định để chạy, sau đó, điều khiển chuyển sang tiến trình hoặc luồng khác. Mục tiêu của time slicing là đảm bảo công bằng và hiệu quả trong việc chia sẻ tài nguyên CPU giữa các tiến trình và luồng mà không làm cho một tiến trình chiếm dụng tài nguyên quá mức.
- Scheduling là quá trình quyết định tiến trình hoặc luồng nào sẽ được thực thi tiếp theo trên CPU.
  - Có nhiều thuật toán lập lịch khác nhau, và mỗi thuật toán có những đặc điểm và mục tiêu lập lịch khác nhau. Một số thuật toán phổ biến bao gồm:
    - **First Come First Serve (FCFS)**: Thực thi tiến trình đến khi hoàn thành trước.
    - **Shortest Job Next (SJN)**: Thực hiện tiến trình có thời gian thực thi ngắn nhất trước.
    - **Priority Scheduling**: Ưu tiên thực hiện tiến trình có độ ưu tiên cao hơn.
    - **Round Robin**: Sử dụng cơ chế time slicing, mỗi tiến trình có cơ hội chạy trong một khoảng thời gian nhất định trước khi chuyển sang tiến trình khác.
