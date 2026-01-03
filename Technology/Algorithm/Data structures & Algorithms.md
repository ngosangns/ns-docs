---
tags:
  - area/technology
  - domain/algorithms
  - topic/golang
  - type/resource
  - lang/vi
---

# Data structures & Algorithms

## Mục lục

- [Resources](#resources)
- [Ghi chú](#ghi-chú)
- [Courses](#courses)
- [Challenges](#challenges)
- [Big-O notation](#big-o-notation)
- [Đệ quy](#đệ-quy)
- [Sorting](#sorting)
- [Hình học tính toán](#hình-học-tính-toán)
- [Bloom filter](#bloom-filter)

## Resources

![[0a1b2c3d-4e5f-6789-9a0b-c1d2e3f4a5b6.jpg]]

- Bảng thưa (Sparse Table): https://viblo.asia/p/bang-thua-sparse-table-MkNLrZPlLgA?fbclid=IwAR1M39YW3PQ8NMKQ-_euPZmT9O1nUDoyWCHrUX8FspFMsSrw6wzm3ocESbA
- [[Tổng hợp các nguồn ôn luyện thuật toán & Coding interview]]
- [[Note ebook Thuật toán của thầy Lê Minh Hoàng]]
- [[Cách giải các bài thuật toán]]
- [[Mục lục thuật toán]]
- Thuật toán Dijkstra - Tìm đường đi ngắn nhất: https://chidokun.github.io/2021/09/dijkstra-algorithm
- LeetCode: Dễ dàng nhận biết 5 dạng bài Dynamic Programming: https://viblo.asia/p/leetcode-de-dang-nhan-biet-5-dang-bai-dynamic-programming-x7Z4Dn90LnX
- Algorithms & Data Structures Full Crash Course - https://www.youtube.com/watch?v=jQqQpPMYPXs
  - Binary Search Tree: https://www.youtube.com/watch?v=mQMpamkUgW8
  - Graph:
    - Tính chất: https://www.youtube.com/watch?v=sY3kvaA9Xok
    - Phân loại: https://www.youtube.com/watch?v=L1tj-q1eQxM
    - Thể hiện trong lập trình: https://www.youtube.com/watch?v=vrD0n8hJGXQ
    - Các bài toán hay gặp: https://www.youtube.com/watch?v=NLl6YF0wzvk
    - Depth First Search: https://www.youtube.com/watch?v=wyt7HxulLS4
    - Breadth First Search - Áp dụng trong bài toán tìm đường: https://www.youtube.com/watch?v=JvZVRYwjRng
- Playlist thực hành giải các bài thuật toán by TopCoder: https://www.youtube.com/playlist?list=PLWYOT8C61ll3k_tgJetHkHGtePJ3zn098
  - Các trang học thuật toán: https://www.youtube.com/watch?v=jH9w5NKWlzA
- Bài giải các challenges bằng Go: https://github.com/aQuaYi/LeetCode-in-Go
- Giới thiệu về loạt thuật toán mật mã học: https://viblo.asia/s/cryptography-p0-gioi-thieu-ve-loat-bai-viet-ve-mat-ma-hoc-obA46emMVKv
- Modular math in Cryptography: https://viblo.asia/p/modular-math-in-cryptography-module-trong-mat-ma-hoc-BQyJKaEwVMe
- [Định Lý Thặng Dư Trung Hoa - Viblo](https://viblo.asia/p/dinh-ly-thang-du-trung-hoa-chinese-remainder-theorem-AoJe8wjA41j)

## Ghi chú

- Có thể giảm nhẹ thuật toán bằng cách chỉnh sửa tập data input
- Khi cần phân tách các thành phần của một tập dữ liệu có cấu trúc giống nhau có thể sử dụng tree, node
- Tổng hợp các nguồn ôn luyện thuật toán & Coding interview: https://app.cloverapp.com/page/82a37546-fad0-4662-ae86-c8d96ad55163

## Courses

- https://github.com/trekhleb/javascript-algorithms
- [[Algorithms & Data Structures CheatSheet]]
- Introduction to Data Structures and Algorithms: https://learn.viblo.asia/en/courses/introduction-to-data-structures-and-algorithms-JAPdR6qdGy
- Advanced Data Structures and Algorithms: https://learn.viblo.asia/en/courses/cau-truc-du-lieu-va-giai-thuat-nang-cao-qM7e5yBe2v
- https://github.com/thealgorithms

## Challenges

- Viblo Code - https://code.viblo.asia

## Big-O notation

- Định nghĩa: là số phép toán cần thực hiện dựa trên kích thước input
- Thường dùng để đánh giá trường hợp xấu nhất
- Ký hiệu thường gặp: $Θ(f(N))$
- Rút gọn: giữ bậc lớn nhất, bỏ hằng số (ví dụ)

$$
f(N)=2x^2+2x+2 \Rightarrow f(N)=x^2
$$

![[6a7b8c9d-0e1f-2a3b-4c5d-6e7f8a9b0c1d.png]]

## Đệ quy

- Một hàm là đệ quy khi đầu ra phụ thuộc vào lời gọi chính nó với input khác trước đó
- Mỗi lần gọi lại phải tiến gần tới điều kiện dừng, nếu không sẽ không bao giờ dừng

```go
func recursive(a int) {
	// TODO: implement break conditions
	return recursive(a + 1)
}
```

## Sorting

- Sắp xếp với thời gian tuyến tính: https://viblo.asia/p/sap-xep-voi-thoi-gian-tuyen-tinh-E1XVOZ6GLMz

| Tên thuật toán | Nên dùng khi                       | Ưu / nhược điểm           | Big O           |
| -------------- | ---------------------------------- | ------------------------- | --------------- |
| Bubble Sort    | Array nhỏ                          |                           | n^2             |
| Insertion Sort | Array nhỏ, gần như đã được sắp xếp |                           | n^2             |
| Heap Sort      |                                    | Không ổn định             | nlogn           |
| Quick Sort     |                                    | Không ổn định             | nlogn → n^2     |
| RadixSort      | Sắp xếp số nguyên                  | Không thể sắp xếp số thực | nlog(max value) |

![[f6e7d8c9-a0b1-2c3d-4e5f-6a7b8c9d0e1f.png]]

## Hình học tính toán

### Bao lồi

Bao lồi là một vấn đề rất thường xuyên xuất hiện trong các bài tập hình học tính toán của lập trình thi đấu.

Xét một tập điểm trên mặt phẳng tọa độ Oxy, bao lồi của tập điểm là tập lồi nhỏ nhất (theo diện tích, thể tích,...) mà chứa tất cả các điểm đó. Nói cách khác, bao lồi của một tập điểm là đa giác nhỏ nhất chứa tất cả các điểm đó.

Một cách trực quan, nếu coi mỗi điểm như một chiếc đinh đóng trên tấm gỗ, bao lồi của tập điểm đó sẽ có viền ngoài là một sợi dây sau khi bị kéo căng vào những chiếc đinh ở các phía.

![[8b9c0d1e-2f3a-4b5c-6d7e-8f9a0b1c2d3e.png]]

Các thuật toán tìm bao lồi thông dụng:

- Graham
- Monotone Chain

## Bloom filter

Bloom filter là một cấu trúc dữ liệu xác suất, giúp kiểm tra xem một phần tử có thuộc một tập hợp hay không. Nó đặc biệt hữu ích trong các ứng dụng cần kiểm tra nhanh chóng và sử dụng ít bộ nhớ.

### Đặc điểm

1. Không có lỗi âm: nếu Bloom filter cho biết không thuộc thì chắc chắn không có
2. Có thể có lỗi dương: nếu Bloom filter cho biết thuộc thì có thể nhầm
3. Sử dụng nhiều hàm băm để ánh xạ 1 phần tử vào nhiều bit
4. Không hỗ trợ xóa chính xác (bản cơ bản)

### Ứng dụng phổ biến

1. Bộ nhớ đệm (caching)
2. Hệ thống phát hiện thư rác (spam detection)
3. Hệ thống tìm kiếm và cơ sở dữ liệu phân tán
4. Định tuyến gói tin trong mạng (packet routing)
5. Lọc yêu cầu DNS (DNS query filtering)
6. Phát hiện và loại bỏ dữ liệu trùng lặp (duplicate detection)
7. Tìm kiếm gần đúng (approximate membership query)
8. Lọc nội dung trong các hệ thống chống lạm dụng (content filtering)
9. Một số ứng dụng trong mật mã học (cryptography)
10. Kiểm tra mật khẩu vi phạm (password breach detection)
