---
area: technology
domain: algorithms
type: resource
---
# Giải thuật Euclid mở rộng (Extended Euclidean Algorithm)

> Tài liệu này được tạo từ bài viết trên Viblo:
>
> - https://viblo.asia/p/giai-thuat-euclid-mo-rong-extended-euclidean-algorithm-va-phuong-trinh-axbyc-AZoJjgxeLY7

## Phương trình ax + by = c

- **Định nghĩa**: Phương trình với các hệ số nguyên a, b, c và cần tìm nghiệm nguyên (x, y)
- **Điều kiện có nghiệm**:
  - Đặt d = gcd(a, b) (ước chung lớn nhất của a và b)
  - Tồn tại các số nguyên x, y sao cho ax + by = d
  - Điều kiện cần và đủ để phương trình ax + by = c có nghiệm nguyên là d phải là ước của c
  - Nếu d không chia hết c, thì phương trình không có nghiệm nguyên

## Thuật toán Euclid tìm ƯCLN

- **Nguyên lý hoạt động**:
  - Giả sử a > b, chia a cho b được số dư r
  - Tiếp tục tìm ƯCLN của cặp số (b, r)
  - Lặp lại quá trình cho đến khi số dư bằng 0
  - Số chia cuối cùng chính là ƯCLN của a và b
- **Đặc điểm**:
  - Thuật toán hiệu quả về tốc độ và hiệu suất
  - Độ phức tạp thời gian là O(log min(a, b))
  - Là nền tảng cho giải thuật Euclid mở rộng

## Giải thuật Euclid mở rộng

- **Mục đích**: Tìm nghiệm của phương trình Diophantine ax + by = c
- **Quy trình**:
  - Gọi d = gcd(a, b)
  - Trước tiên, tìm nghiệm của phương trình ax + by = d
  - Nếu phương trình này có nghiệm (x₀, y₀), thì (c/d × x₀, c/d × y₀) là nghiệm của phương trình ax + by = c
  - Quá trình bao gồm việc chia liên tiếp và sử dụng công thức truy hồi để tính các giá trị x và y
- **Cơ chế hoạt động**:
  - Trong quá trình thực hiện thuật toán Euclid, đồng thời tính toán các hệ số x và y
  - Sử dụng công thức truy hồi dựa trên các bước chia trong thuật toán Euclid
  - Kết quả cuối cùng cho ta cả giá trị d = gcd(a, b) và các hệ số x, y thỏa mãn ax + by = d

## Ứng dụng trong mật mã RSA

- **Vấn đề**: Trong thuật toán RSA, sau khi chọn số mũ công khai e, cần tìm số mũ bí mật d thỏa mãn: d × e ≡ 1 (mod φ(n))
- **Chuyển đổi**:
  - Phương trình d × e ≡ 1 (mod φ(n)) có thể viết lại thành d × e + k × φ(n) = 1 với k là số nguyên
  - Đây chính là dạng phương trình ax + by = c với a = e, b = φ(n), c = 1
- **Điều kiện có nghiệm**:
  - Điều kiện có nghiệm của phương trình là gcd(e, φ(n)) = 1
  - Điều này giải thích lý do cần chọn e thỏa mãn điều kiện nguyên tố cùng nhau với φ(n)
- **Cách tính**:
  - Sử dụng giải thuật Euclid mở rộng để tìm d sao cho d × e ≡ 1 (mod φ(n))
  - Kết quả d chính là số nghịch đảo modulo của e theo φ(n)
  - Giá trị d này được sử dụng làm private exponent trong RSA

## Tổng kết

- Giải thuật Euclid mở rộng là công cụ mạnh mẽ để giải phương trình Diophantine ax + by = c
- Có ứng dụng quan trọng trong mật mã học, đặc biệt là trong việc tính toán số nghịch đảo modulo
- Kết hợp hiệu quả giữa việc tìm ƯCLN và tìm nghiệm của phương trình tuyến tính
- Là nền tảng toán học cho nhiều thuật toán mã hóa hiện đại
