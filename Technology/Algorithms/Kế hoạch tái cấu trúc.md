---
tags:
  - algorithms
  - restructure
  - plan
---

# Kế hoạch tái cấu trúc thư mục Algorithms

## Mục lục

- [Mục tiêu](#mục-tiêu)
- [Nguyên tắc](#nguyên-tắc)
- [Danh sách file (vai trò đề xuất)](#danh-sách-file-vai-trò-đề-xuất)
- [Tiêu đề dự kiến theo từng file](#tiêu-đề-dự-kiến-theo-từng-file)
- [Kế hoạch chuyển nội dung](#kế-hoạch-chuyển-nội-dung)
- [Checklist rà soát sau khi tái cấu trúc](#checklist-rà-soát-sau-khi-tái-cấu-trúc)

## Mục tiêu

- Dễ tìm: có 1 file “mục lục” làm điểm vào, link qua các ghi chú liên quan
- Dễ đọc: mỗi file có 1 H1, có mục lục nội bộ, nhóm nội dung theo H2/H3
- Giảm rối: tách “resources” (link) và “notes” (kiến thức) rõ ràng
- Giảm trùng: cùng một khái niệm chỉ có 1 nơi làm “nguồn chính”, chỗ khác chỉ link

## Nguyên tắc

- Mỗi file chỉ có 1 chủ đề chính
- Mỗi file chỉ có 1 tiêu đề H1
- Ưu tiên H2 cho mục lớn, H3 cho mục con
- Mục lục nội bộ đặt ngay sau phần mở đầu
- Nội dung “dạng danh sách link” gom vào 1 mục “Resources” để khỏi lẫn với ghi chú

## Danh sách file (vai trò đề xuất)

- [[Mục lục thuật toán]]: điểm vào, phân loại, link qua các ghi chú trong thư mục
- [[Data structures & Algorithms]]: resources + ghi chú nền tảng (Big-O, đệ quy, sort, v.v.)
- [[Algorithms & Data Structures CheatSheet]]: cheatsheet code (TS/JS) cho DS/Algorithms
- [[Cấu trúc dữ liệu & giải thuật]]: tư duy chọn DS/giải thuật + kiểm lỗi + tối ưu
- [[Bài toán liệt kê]]: sinh cấu hình, quay lui, nhánh cận
- [[Cách giải các bài thuật toán]]: phương pháp tiếp cận bài toán + checklist áp dụng
- [[Note ebook Thuật toán của thầy Lê Minh Hoàng]]: hub note cho ebook, link sang các note tách ra
- [[Post score algorithm - Trending algorithm]]: ghi chú ứng dụng (ranking/trending)

## Tiêu đề dự kiến theo từng file

### Mục lục thuật toán

- Quick links
- Data Structures
- Algorithms
- Kỹ thuật giải bài
- Ứng dụng
- Topics ngoài phạm vi (nếu vẫn muốn giữ: ML/CV/NLP)

### Data structures & Algorithms

- Resources
- Courses
- Challenges
- Big-O notation
- Đệ quy
- Sorting
- Hình học tính toán
- Cấu trúc dữ liệu xác suất

### Algorithms & Data Structures CheatSheet

- Arrays
- Searching
- Sorting
- Linked Lists (Queue/Stack/Doubly)
- Recursion
- Trees (DFS/BFS/BST/LCA)
- Heap / Priority Queue
- Trie
- Graphs (Adjacency, BFS/DFS, Dijkstra)
- Maps
- LRU Cache

### Cấu trúc dữ liệu & giải thuật

- Chọn cấu trúc dữ liệu để biểu diễn bài toán
- Chọn thuật toán
- Kiểm lỗi chương trình
- Tối ưu chương trình

### Bài toán liệt kê

- Chỉnh hợp, tổ hợp, hoán vị
- Phương pháp sinh (từ điển)
- Thuật toán quay lui
- Nhánh cận (đánh giá)

### Cách giải các bài thuật toán

- Nguồn tham khảo
- Checklist tìm lời giải
- Dấu hiệu nhận biết kỹ thuật/giải thuật (TODO)
- Liên kết liên quan

### Note ebook Thuật toán của thầy Lê Minh Hoàng

- Trạng thái đọc
- Các note đã tách
- Ghi chú thêm

### Post score algorithm - Trending algorithm

- Resources
- Công thức tổng quát
- Diễn giải biến số
- Ví dụ tính toán

## Kế hoạch chuyển nội dung

- Giữ nguyên nội dung gốc, chỉ “gói lại” bằng tiêu đề và mục lục để dễ tra cứu
- Nếu có đoạn đang nằm sai file:
  - Nội dung “resources/link” ưu tiên đưa về mục Resources trong file phù hợp
  - Nội dung “kiến thức nền tảng” ưu tiên để ở [[Data structures & Algorithms]]
  - Nội dung “code snippet DS/Algo” ưu tiên để ở [[Algorithms & Data Structures CheatSheet]]

## Checklist rà soát sau khi tái cấu trúc

- Mỗi file có đúng 1 H1
- Mục lục nội bộ hoạt động (link anchor trong Obsidian)
- Link wiki [[...]] không bị gãy (đúng tên file)
- Không còn section bị trùng hoặc rơi vào “misc”
