---
tags:
  - algorithms
  - algorithms--data-structures
  - challenges
  - cheatsheet
  - computer-science
  - courses
  - data
  - data-structures
  - golang
  - notation
  - notes
  - resources
  - sort
  - structures
  - vietnamese
---

# 1. Resources

![[0a1b2c3d-4e5f-6789-9a0b-c1d2e3f4a5b6.jpg]]

- Bảng thưa (Sparse Table): https://viblo.asia/p/bang-thua-sparse-table-MkNLrZPlLgA?fbclid=IwAR1M39YW3PQ8NMKQ-_euPZmT9O1nUDoyWCHrUX8FspFMsSrw6wzm3ocESbA
- [[Tổng hợp các nguồn ôn luyện thuật toán & Coding interview]]
- [[Note ebook Thuật toán của thầy Lê Minh Hoàng]]
- [[Cách giải các bài thuật toán]]
- [[Mục lục thuật toán]]
- Có thể giảm nhẹ thuật toán bằng cách chỉnh sửa tập data input
- Khi cần phân tách các thành phần của một tập dữ liệu có cấu trúc giống nhau có thể sử dụng tree, node
- Tổng hợp các nguồn ôn luyện thuật toán & Coding interview: https://app.cloverapp.com/page/82a37546-fad0-4662-ae86-c8d96ad55163
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

## 1.1. Sort

- Sắp xếp với thời gian tuyến tính: https://viblo.asia/p/sap-xep-voi-thoi-gian-tuyen-tinh-E1XVOZ6GLMz

# 2. Courses

- https://github.com/trekhleb/javascript-algorithms
- [[Algorithms & Data Structures CheatSheet]]
- Introduction to Data Structures and Algorithms: https://learn.viblo.asia/en/courses/introduction-to-data-structures-and-algorithms-JAPdR6qdGy
- Advanced Data Structures and Algorithms: https://learn.viblo.asia/en/courses/cau-truc-du-lieu-va-giai-thuat-nang-cao-qM7e5yBe2v
- https://github.com/thealgorithms

# 3. Challenges

- Viblo Code - https://code.viblo.asia

# 4. Độ phức tạp thuật toán - Big O notation

- Định nghĩa: Là số phép toán cần thực hiện dựa trên biến số là số lượng dữ liệu đầu vào
- Thường được sử dụng để đánh giá cho trường hợp xấu nhất
- Thường được ký hiệu là: $Θ(f(N))$
- $f(N)$ thường được rút gọn theo biến có hệ số lớn nhất và bỏ đi hằng số: Ví dụ:

$$
f(N)=2x^2+2x+2 \Rightarrow f(N)=x^2
$$

Bảng ví dụ chứa số phép toán cần thực hiện của mỗi thuật toán so sánh với $Θ(n)$:

![[6a7b8c9d-0e1f-2a3b-4c5d-6e7f8a9b0c1d.png]]

# 5. Giải thuật đệ quy

- Hàm _f_ là một hàm đệ quy khi mà nó trả về kết quả đầu ra là kết quả của một hàm _f_ với input khác với những input trước đó. Ví dụ:

  ```go
  func recursive(a int) {
  	// TODO: implement break conditions
  	return recursive(a + 1)
  }
  ```

- Mỗi lần hàm đệ quy sử dụng chính nó phải sử dụng input khác với những input trước đó nếu không thì hàm đệ quy sẽ không bao giờ dừng lại

# 6. Sort

| Tên thuật toán | Nên dùng khi                       | Ưu / nhược điểm           | Big O           |
| -------------- | ---------------------------------- | ------------------------- | --------------- |
| Bubble Sort    | Array nhỏ                          |                           | n^2             |
| Insertion Sort | Array nhỏ, gần như đã được sắp xếp |                           | n^2             |
| Heap Sort      |                                    | Không ổn định             | nlogn           |
| Quick Sort     |                                    | Không ổn định             | nlogn → n^2     |
| RadixSort      | Sắp xếp số nguyên                  | Không thể sắp xếp số thực | nlog(max value) |

![[f6e7d8c9-a0b1-2c3d-4e5f-6a7b8c9d0e1f.png]]

# 7. Bao lồi

***Bao lồi*** là một vấn đề rất thường xuyên xuất hiện trong các bài tập hình học tính toán của lập trình thi đấu.

Xét một tập điểm trên mặt phẳng tọa độ Oxy, bao lồi của tập điểm là ***tập lồi nhỏ nhất*** (theo diện tích, thể tích,...) mà chứa tất cả các điểm đó. Nói cách khác, bao lồi của một tập điểm là đa giác nhỏ nhất chứa tất cả các điểm đó.

Một cách trực quan, nếu coi mỗi điểm như một chiếc đinh đóng trên tấm gỗ, bao lồi của tập điểm đó sẽ có viền ngoài là một sợi dây sau khi bị kéo căng vào những chiếc đinh ở các phía.

![[8b9c0d1e-2f3a-4b5c-6d7e-8f9a0b1c2d3e.png]]

Các thuật toán tìm Bao lồi thông dụng:

- Graham
- Motonone Chain

# 8. Bloom filter

Bloom filter là một cấu trúc dữ liệu xác suất, giúp kiểm tra xem một phần tử có thuộc một tập hợp hay không. Nó đặc biệt hữu ích trong các ứng dụng cần kiểm tra nhanh chóng và sử dụng ít bộ nhớ. Bloom filter có một số đặc điểm chính sau:

1. **Không có lỗi âm**: Nếu Bloom filter cho biết một phần tử không thuộc tập hợp, thì chắc chắn phần tử đó không có trong tập hợp.
2. **Có thể có lỗi dương**: Nếu Bloom filter cho biết một phần tử thuộc tập hợp, thì có khả năng là nó không thực sự có trong tập hợp. Tỷ lệ lỗi dương này phụ thuộc vào số lượng hàm băm và kích thước của mảng bit trong Bloom filter.
3. **Sử dụng nhiều hàm băm**: Bloom filter sử dụng nhiều hàm băm khác nhau để ánh xạ một phần tử vào nhiều vị trí trong mảng bit.
4. **Không hỗ trợ xóa**: Sau khi thêm một phần tử vào Bloom filter, không thể chắc chắn loại bỏ phần tử đó mà không làm sai lệch kết quả kiểm tra cho các phần tử khác.

Bloom filter có nhiều ứng dụng thực tế trong các hệ thống và phần mềm khác nhau, đặc biệt là trong các tình huống cần kiểm tra thành viên của một tập hợp lớn một cách nhanh chóng và hiệu quả về mặt bộ nhớ. Dưới đây là một số ứng dụng phổ biến của Bloom filter:

1. **Bộ nhớ đệm (Caching)**
   - **Giảm tải cơ sở dữ liệu**: Bloom filter có thể được sử dụng để kiểm tra xem một khóa (key) có tồn tại trong bộ nhớ đệm hay không trước khi truy vấn cơ sở dữ liệu. Nếu Bloom filter cho biết khóa không tồn tại, hệ thống có thể bỏ qua việc truy vấn cơ sở dữ liệu, giảm tải và cải thiện hiệu suất.
   - **Bộ nhớ đệm web (Web Cache)**: Bloom filter giúp nhanh chóng xác định xem một URL đã được lưu trong bộ nhớ đệm hay chưa.
2. **Hệ thống phát hiện thư rác (Spam Detection)**
   - Bloom filter có thể được sử dụng trong các hệ thống phát hiện thư rác để kiểm tra nhanh chóng xem một địa chỉ email hay một phần nội dung có xuất hiện trong danh sách đen (blacklist) hay không.
3. **Hệ thống tìm kiếm và cơ sở dữ liệu phân tán**
   - **Hadoop và Bigtable**: Bloom filter được sử dụng để tối ưu hóa các hệ thống phân tán như Hadoop HBase và Google Bigtable. Trong các hệ thống này, Bloom filter giúp giảm số lượng đọc đĩa bằng cách kiểm tra trước xem một phần tử có khả năng nằm trong một khối dữ liệu cụ thể hay không.
   - **Cơ sở dữ liệu NoSQL**: Nhiều cơ sở dữ liệu NoSQL, như Cassandra, sử dụng Bloom filter để tránh việc truy vấn các tệp dữ liệu không liên quan, cải thiện tốc độ truy vấn.
4. **Định tuyến gói tin trong mạng (Packet Routing)**
   - Bloom filter có thể được sử dụng trong các giao thức định tuyến để kiểm tra nhanh xem một gói tin đã được truyền qua một nút mạng cụ thể hay chưa, giúp tránh việc truyền lại các gói tin không cần thiết.
5. **Lọc yêu cầu DNS (DNS Query Filtering)**

   - Các máy chủ DNS có thể sử dụng Bloom filter để kiểm tra xem một tên miền đã được truy vấn trước đó hay chưa, giúp cải thiện hiệu suất và giảm thời gian phản hồi.

6. **Phát hiện và loại bỏ dữ liệu trùng lặp (Duplicate Detection)**
   - Bloom filter được sử dụng trong các hệ thống xử lý dữ liệu lớn để nhanh chóng phát hiện các mục dữ liệu trùng lặp mà không cần lưu trữ toàn bộ dữ liệu.
7. **Hệ thống đề xuất và tìm kiếm gần đúng (Approximate Membership Query)**
   - Bloom filter được sử dụng trong các hệ thống đề xuất (recommendation systems) và tìm kiếm gần đúng (approximate search) để lọc sơ bộ các kết quả, sau đó áp dụng các thuật toán chính xác hơn.
8. **Lọc nội dung trong các hệ thống chống lạm dụng (Content Filtering)**
   - Các nền tảng trực tuyến có thể sử dụng Bloom filter để kiểm tra xem một từ khóa hoặc cụm từ đã bị cấm có xuất hiện trong nội dung người dùng gửi lên không, giúp nhanh chóng lọc ra nội dung vi phạm.
9. **Ứng dụng trong mật mã học (Cryptography)**
   - Bloom filter được sử dụng trong một số giao thức mật mã để kiểm tra thành viên trong tập hợp một cách hiệu quả và bảo mật.
10. **Kiểm tra mật khẩu vi phạm (Password Breach Detection)**
    - Bloom filter có thể được sử dụng để kiểm tra nhanh chóng xem một mật khẩu người dùng nhập vào có nằm trong danh sách mật khẩu bị rò rỉ trước đó không, giúp tăng cường bảo mật hệ thống.

Bloom filter là một công cụ mạnh mẽ trong việc xử lý các tập hợp dữ liệu lớn, đặc biệt là khi cần tối ưu hóa hiệu suất và tiết kiệm bộ nhớ. Tuy nhiên, do có khả năng xảy ra lỗi dương (false positive), nên cần cẩn thận khi sử dụng nó trong các ứng dụng yêu cầu độ chính xác tuyệt đối.
