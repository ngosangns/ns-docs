---
tags:
  - area/technology
  - domain/algorithms
  - type/resource
  - lang/vi
---

# Mật mã RSA

> Tài liệu này được tạo từ loạt bài viết về RSA trên Viblo:
>
> - Phần 1: https://viblo.asia/p/mat-ma-rsa-phan-1-pgjLNm27J32
> - Phần 2: https://viblo.asia/p/mat-ma-rsa-phan-2-3kY4gE0kLAe
> - Phần 3: https://viblo.asia/p/mat-ma-rsa-phan-3-y37LdD1mLov
> - Phần 4: https://viblo.asia/p/mat-ma-rsa-phan-4-r1QLx6EO4Aw
> - Phần 5: https://viblo.asia/p/mat-ma-rsa-phan-5-GAWVpa95405
> - Phần 6: https://viblo.asia/p/mat-ma-rsa-phan-6-GAWVpamY405
> - Phần 7: https://viblo.asia/p/mat-ma-rsa-phan-7-r1QLx6Kp4Aw

## I. Tổng quan về mật mã bất đối xứng (Asymmetric Ciphers)

### 1. Khó khăn của mật mã đối xứng

- **Vấn đề trao đổi khóa bí mật**: Việc trao đổi secret key trước khi truyền thông tin tiềm ẩn nguy cơ bị đánh cắp giá trị secret key này
- **Vấn đề quản lý khóa**: Khi số lượng người truyền tin tăng lên (n người đôi một gửi thư cho nhau), cần tới n(n-1)/2 secret key khác nhau, gây khó khăn cho việc lưu trữ và quản lý key
- **Tính bảo mật**: Cần đảm bảo tính bí mật của secret key, nếu bị lộ thì toàn bộ hệ thống bị phá vỡ

### 2. Mật mã bất đối xứng

- **Khái niệm**: Sử dụng một cặp khóa gồm public key (khóa công khai) và private key (khóa bí mật)
- **Public key**: Cho phép tất cả mọi người biết giá trị, được công khai
- **Private key**: Chỉ có người giải mã mới được sở hữu, phải giữ bí mật
- **Tên gọi khác**: Public-key cryptography
- **Cơ chế hoạt động**:
  - Người gửi sử dụng public key của người nhận để mã hóa thông điệp
  - Người nhận sử dụng private key của mình để giải mã thông điệp
  - Ai cũng có thể mã hóa thông điệp, nhưng chỉ giá trị private key tương ứng mới có thể giải mã

### 3. So sánh mật mã đối xứng và bất đối xứng

| Đặc điểm     | Mật mã đối xứng                                    | Mật mã bất đối xứng                              |
| ------------ | -------------------------------------------------- | ------------------------------------------------ |
| Secret key   | Sử dụng cùng một secret key cho mã hóa và giải mã  | Mã hóa dùng public key, giải mã dùng private key |
| Tốc độ       | Nhanh                                              | Chậm hơn so với mật mã đối xứng                  |
| Độ an toàn   | Thấp hơn do cần đảm bảo tính bí mật của secret key | Cao hơn do sử dụng cặp public key và private key |
| Quản lý khóa | Khó khăn khi số lượng người tham gia tăng          | Dễ dàng hơn, mỗi người chỉ cần một cặp khóa      |

- **Kết hợp sử dụng**: Trong thực tế, thông điệp đầu tiên chứa secret key của mật mã đối xứng được truyền tải thông qua mã hóa bất đối xứng, sau đó các lần trao đổi thông tin sau sẽ sử dụng mật mã đối xứng để tối ưu tốc độ mà vẫn đảm bảo tính an toàn

## II. Mật mã RSA - Giới thiệu

- **Lịch sử**: Được phát minh vào năm 1977 tại Học viện Công nghệ Massachusetts (MIT) bởi ba nhà nghiên cứu Ron Rivest, Adi Shamir và Len Adleman
- **Tên gọi**: RSA được ghép lại bằng các chữ cái đầu của ba tác giả
- **Vị trí**: Là loại mã hóa tiêu biểu cho mật mã bất đối xứng và được sử dụng rộng rãi hiện nay
- **Quy trình tổng quát**:
  - Mã hóa: C = E(P, PubK) - với P là plaintext, C là ciphertext, PubK là public key
  - Giải mã: P = D(C, PriK) - với PriK là private key
  - Khác với mật mã AES, RSA sử dụng hai loại key khác nhau cho mã hóa và giải mã

## III. Mật mã RSA - Thực hiện

### 1. Kiến thức chuẩn bị

#### 1.1. Số nguyên tố (Prime Number)

- **Định nghĩa**: Số tự nhiên lớn hơn 1 chỉ có hai ước dương là 1 và chính nó
- **Ví dụ**: 2, 3, 5, 7, 11, 13, 17, 19, 23, ...

#### 1.2. Hai số nguyên tố cùng nhau (Coprime Numbers)

- **Định nghĩa**: Hai số tự nhiên có ước chung lớn nhất (GCD) là 1
- **Ký hiệu**: gcd(a, b) = 1
- **Ví dụ**: gcd(8, 15) = 1 vì 8 và 15 không có ước chung nào ngoài 1

#### 1.3. Hàm số Euler φ(n)

- **Định nghĩa**: Số lượng số nguyên dương nhỏ hơn hoặc bằng n và nguyên tố cùng nhau với n
- **Tính chất**:
  - Nếu p là số nguyên tố: φ(p) = p - 1
  - Nếu p và q là hai số nguyên tố khác nhau: φ(p × q) = (p - 1) × (q - 1)
  - Nếu n = p^k với p là số nguyên tố: φ(n) = p^k - p^(k-1)

#### 1.4. Đồng dư Modular (Modular Congruence)

- **Định nghĩa**: Hai số nguyên a và b được gọi là đồng dư theo modulo n nếu hiệu của chúng chia hết cho n
- **Ký hiệu**: a ≡ b (mod n) nghĩa là (a - b) chia hết cho n
- **Tính chất**:
  - Nếu a ≡ b (mod n) và c ≡ d (mod n), thì a + c ≡ b + d (mod n)
  - Nếu a ≡ b (mod n) và c ≡ d (mod n), thì a × c ≡ b × d (mod n)

#### 1.5. Định lý Fermat nhỏ (Fermat's Little Theorem)

- **Nội dung**: Nếu p là số nguyên tố và a là số nguyên không chia hết cho p, thì a^(p-1) ≡ 1 (mod p)
- **Ứng dụng**: Là cơ sở toán học cho nhiều thuật toán mã hóa

#### 1.6. Định lý Euler

- **Nội dung**: Nếu a và n là hai số nguyên tố cùng nhau, thì a^φ(n) ≡ 1 (mod n)
- **Quan hệ với Fermat**: Định lý Fermat là trường hợp đặc biệt của định lý Euler khi n là số nguyên tố

### 2. Sinh khóa RSA

Quy trình sinh khóa RSA gồm 5 bước:

1. **Chọn hai số nguyên tố lớn p và q**
   - p và q phải là số nguyên tố
   - p và q nên có độ dài tương đương để đảm bảo an toàn
   - p và q phải khác nhau

2. **Tính n = p × q**
   - n được gọi là modulus
   - n là một phần của cả public key và private key

3. **Tính φ(n) = (p - 1) × (q - 1)**
   - φ(n) là giá trị của hàm Euler tại n
   - Giá trị này phải được giữ bí mật

4. **Chọn số e sao cho 1 < e < φ(n) và gcd(e, φ(n)) = 1**
   - e được gọi là public exponent
   - e thường được chọn là số nhỏ để tăng tốc độ mã hóa (ví dụ: 3, 17, 65537)
   - e phải nguyên tố cùng nhau với φ(n)

5. **Tính d sao cho d × e ≡ 1 (mod φ(n))**
   - d được gọi là private exponent
   - d là số nghịch đảo modulo của e theo φ(n)
   - Có thể tính d bằng thuật toán Euclid mở rộng

**Kết quả**:

- **Public key**: (n, e) - có thể công khai
- **Private key**: (n, d) - phải giữ bí mật

### 3. Mã hóa và giải mã

#### 3.1. Mã hóa

- **Công thức**: C = m^e mod n
- **Trong đó**:
  - m: plaintext (thông điệp gốc) - phải là số nguyên nhỏ hơn n
  - e: public exponent
  - n: modulus
  - C: ciphertext (bản mã)
- **Quy trình**: Người gửi sử dụng public key (n, e) của người nhận để mã hóa thông điệp

#### 3.2. Giải mã

- **Công thức**: m = C^d mod n
- **Trong đó**:
  - C: ciphertext (bản mã)
  - d: private exponent
  - n: modulus
  - m: plaintext (thông điệp gốc)
- **Quy trình**: Người nhận sử dụng private key (n, d) của mình để giải mã thông điệp

#### 3.3. Chứng minh tính đúng đắn

- Dựa trên định lý Euler: m^φ(n) ≡ 1 (mod n)
- Vì d × e ≡ 1 (mod φ(n)), nên d × e = k × φ(n) + 1 với k là số nguyên
- Khi giải mã: C^d ≡ (m^e)^d ≡ m^(e×d) ≡ m^(k×φ(n)+1) ≡ m (mod n)

### 4. Xử lý thông điệp dạng văn bản

- **Vấn đề**: RSA chỉ có thể mã hóa số nguyên, không thể mã hóa trực tiếp văn bản
- **Giải pháp**: Chuyển đổi văn bản thành số nguyên trước khi mã hóa
  - Có thể sử dụng mã hóa ASCII hoặc Unicode
  - Có thể chia nhỏ thông điệp thành các khối có kích thước phù hợp với n
- **Padding**: Sử dụng các kỹ thuật padding (như OAEP, PKCS#1) để tăng tính an toàn

### 5. Thực hiện trong Python

- **Sinh số nguyên tố**: Sử dụng hàm `getPrime()` từ thư viện PyCryptodome để tạo số nguyên tố ngẫu nhiên có độ dài N bytes
- **Tính toán modulo**: Sử dụng hàm `pow(base, exponent, modulus)` để tính lũy thừa theo modulo hiệu quả, tránh tính toán số quá lớn
- **Số nghịch đảo modulo**: Tìm số d sao cho d × e ≡ 1 (mod φ(n)) bằng thuật toán Euclid mở rộng (Extended Euclidean Algorithm)
- **Thư viện**: PyCryptodome cung cấp các hàm tiện ích cho việc thực hiện RSA

## IV. Một số kỹ thuật tấn công RSA - Phân tích số n

### 1. Tấn công khi n không phải tích của hai số nguyên tố lớn

- **Vấn đề**: Nếu n không phải tích của hai số nguyên tố lớn, việc tính φ(n) trở nên dễ dàng hơn
- **Hậu quả**: Khi biết φ(n), có thể tính được d từ e, làm giảm độ an toàn của hệ thống RSA
- **Giải pháp**: Luôn đảm bảo p và q là hai số nguyên tố lớn và có độ dài tương đương

### 2. Tấn công khi n là bình phương của một số nguyên tố

- **Vấn đề**: Nếu n = p² (p là số nguyên tố), thì φ(n) = p × (p - 1)
- **Hậu quả**: Việc tìm p trở nên dễ dàng hơn, ảnh hưởng đến tính bảo mật
- **Giải pháp**: Đảm bảo p và q là hai số nguyên tố khác nhau

### 3. Tấn công Fermat

- **Điều kiện**: Khi hai số nguyên tố p và q gần nhau (chênh lệch nhỏ)
- **Phương pháp**: Sử dụng phương pháp Fermat để phân tích n thành p và q nhanh chóng
- **Cơ chế**:
  - Tìm số nguyên x sao cho x² - n là một số chính phương
  - Nếu tìm được, có thể phân tích n = (x - y)(x + y) với y² = x² - n
- **Giải pháp**: Chọn p và q có độ chênh lệch đủ lớn, không nên quá gần nhau

### 4. Tấn công bằng phương pháp phân tích thừa số

- **Các phương pháp phổ biến**:
  - Trial division: Thử chia n cho các số nguyên tố nhỏ
  - Pollard's rho algorithm: Thuật toán xác suất để tìm thừa số
  - Quadratic sieve: Phương pháp phân tích số lớn
  - General number field sieve (GNFS): Phương pháp mạnh nhất cho số rất lớn
- **Giải pháp**: Sử dụng số nguyên tố đủ lớn (thường ít nhất 1024 bit, khuyến nghị 2048 bit trở lên)

## V. Một số kỹ thuật tấn công RSA khác

### 1. Tấn công khi e nhỏ

- **Vấn đề**: Nếu e được chọn quá nhỏ và bản mã c cũng nhỏ (m^e < n), có thể giải mã bằng cách tính căn bậc e của c
- **Cơ chế**: Khi m^e < n, thì c = m^e (không có modulo), nên m = ∛c hoặc m = √c tùy giá trị e
- **Giải pháp**:
  - Chọn e đủ lớn (thường dùng 65537)
  - Sử dụng padding để đảm bảo m^e luôn lớn hơn n

### 2. Tấn công khi d nhỏ

- **Vấn đề**: Nếu d được chọn quá nhỏ, có thể sử dụng thuật toán Wiener để tìm d
- **Thuật toán Wiener**: Dựa trên việc xấp xỉ liên phân số (continued fraction) của e/n
- **Điều kiện**: Thuật toán hoạt động hiệu quả khi d < n^(1/4)/3
- **Giải pháp**: Đảm bảo d đủ lớn, hoặc sử dụng các kỹ thuật sinh khóa an toàn hơn

### 3. Tấn công khi sử dụng cùng n với nhiều e khác nhau

- **Vấn đề**: Nếu cùng một n được sử dụng với nhiều e khác nhau, có thể tấn công bằng phương pháp Trung Hoa (Chinese Remainder Theorem)
- **Cơ chế**:
  - Nếu cùng một thông điệp m được mã hóa với nhiều e khác nhau nhưng cùng n
  - Có thể sử dụng định lý phần dư Trung Hoa để tìm m
- **Giải pháp**: Mỗi người dùng phải có n riêng, không nên chia sẻ n

### 4. Tấn công khi sử dụng cùng e cho nhiều n khác nhau

- **Vấn đề**: Nếu cùng một e được sử dụng cho nhiều n khác nhau và cùng một thông điệp m
- **Cơ chế**: Có thể sử dụng định lý phần dư Trung Hoa để tìm m nếu có đủ số lượng bản mã
- **Giải pháp**: Sử dụng padding ngẫu nhiên để đảm bảo mỗi lần mã hóa tạo ra bản mã khác nhau

### 5. Tấn công dựa trên thời gian (Timing Attack)

- **Vấn đề**: Phân tích thời gian thực hiện các phép toán để suy ra thông tin về khóa bí mật
- **Cơ chế**: Thời gian thực hiện phép toán phụ thuộc vào giá trị của bit trong khóa
- **Giải pháp**: Sử dụng các kỹ thuật chống timing attack như constant-time operations

### 6. Tấn công dựa trên lỗi phần cứng (Hardware Fault Attack)

- **Vấn đề**: Khai thác các lỗi phần cứng để tìm thông tin về khóa bí mật
- **Cơ chế**: Phân tích kết quả sai do lỗi phần cứng để suy ra thông tin về khóa
- **Giải pháp**: Sử dụng các kỹ thuật kiểm tra lỗi và sửa lỗi

### 7. Tấn công dựa trên kênh bên (Side-channel Attack)

- **Vấn đề**: Sử dụng thông tin từ các kênh bên như tiêu thụ năng lượng, âm thanh, hoặc bức xạ điện từ
- **Cơ chế**: Phân tích các tín hiệu vật lý để suy ra thông tin về khóa bí mật
- **Giải pháp**: Sử dụng các kỹ thuật bảo vệ chống side-channel attack

## VI. Ứng dụng của RSA

### 1. Chữ ký số (Digital Signature)

- **Mục đích**: Đảm bảo tính toàn vẹn và xác thực của thông điệp
- **Quy trình tạo chữ ký**:
  1. Người gửi tạo hàm băm (hash) của thông điệp: H = hash(M)
  2. Mã hóa giá trị băm bằng private key của người gửi: S = H^d mod n
  3. Gửi thông điệp kèm chữ ký số cho người nhận: (M, S)
- **Quy trình xác minh chữ ký**:
  1. Người nhận giải mã chữ ký bằng public key của người gửi: H' = S^e mod n
  2. Tính hàm băm của thông điệp nhận được: H = hash(M)
  3. So sánh hai giá trị băm: Nếu H = H', chữ ký hợp lệ; ngược lại, chữ ký không hợp lệ
- **Lợi ích**:
  - Xác thực người gửi: Chỉ người có private key mới tạo được chữ ký hợp lệ
  - Đảm bảo tính toàn vẹn: Nếu thông điệp bị thay đổi, chữ ký sẽ không hợp lệ
  - Không thể chối bỏ: Người gửi không thể phủ nhận đã gửi thông điệp

### 2. Trao đổi khóa (Key Exchange)

- **Mục đích**: Trao đổi khóa bí mật giữa hai bên một cách an toàn
- **Quy trình trao đổi khóa**:
  1. Người gửi tạo một khóa đối xứng (symmetric key) K
  2. Mã hóa khóa K bằng public key của người nhận: C = K^e mod n
  3. Gửi khóa đã mã hóa cho người nhận
  4. Người nhận giải mã bằng private key của mình để lấy khóa K: K = C^d mod n
  5. Sử dụng khóa K cho các phương thức mã hóa đối xứng nhanh hơn
- **Lợi ích**:
  - Kết hợp ưu điểm của cả hai loại mật mã: An toàn của mật mã bất đối xứng và tốc độ của mật mã đối xứng
  - Được sử dụng trong các hệ thống mật mã lai (hybrid cryptosystems)
  - Ví dụ: TLS/SSL sử dụng RSA để trao đổi khóa, sau đó sử dụng AES để mã hóa dữ liệu

### 3. Mã hóa dữ liệu

- **Mục đích**: Mã hóa dữ liệu để đảm bảo tính bảo mật
- **Ứng dụng**:
  - Mã hóa email: Sử dụng RSA để mã hóa email, đảm bảo chỉ người nhận mới có thể đọc được nội dung
  - Mã hóa file: Mã hóa các file quan trọng bằng RSA
  - Bảo mật giao tiếp: Mã hóa các thông điệp trong giao tiếp
- **Lưu ý**: Do tốc độ chậm, RSA thường chỉ được dùng để mã hóa khóa đối xứng hoặc dữ liệu nhỏ, không nên dùng để mã hóa dữ liệu lớn trực tiếp

### 4. Xác thực

- **Mục đích**: Xác thực danh tính của các bên tham gia giao tiếp
- **Ứng dụng**:
  - Xác thực server: Trong TLS/SSL, server sử dụng chứng chỉ số (digital certificate) chứa public key RSA để xác thực danh tính
  - Xác thực client: Client có thể sử dụng private key để chứng minh danh tính
  - Đăng nhập không cần mật khẩu: Sử dụng cặp khóa RSA thay cho mật khẩu

## VII. Thực hành và Lưu ý

### 1. Cài đặt và sử dụng

- **Thư viện Python**: PyCryptodome cung cấp các hàm tiện ích cho việc thực hiện RSA
- **Các thao tác cơ bản**:
  - Tạo cặp khóa
  - Mã hóa và giải mã
  - Tạo và xác minh chữ ký số
  - Trao đổi khóa

### 2. Best Practices

- **Độ dài khóa**: Sử dụng khóa ít nhất 2048 bit cho các ứng dụng hiện đại, 4096 bit cho các ứng dụng yêu cầu bảo mật cao
- **Padding**: Luôn sử dụng padding (OAEP hoặc PKCS#1) khi mã hóa, không mã hóa trực tiếp
- **Sinh số nguyên tố**: Sử dụng các phương pháp sinh số nguyên tố an toàn, không sử dụng số nguyên tố yếu
- **Bảo vệ private key**: Private key phải được bảo vệ cẩn thận, có thể sử dụng mật khẩu để mã hóa private key
- **Cập nhật**: Thường xuyên cập nhật các thư viện và thuật toán để đảm bảo an toàn

### 3. Hạn chế của RSA

- **Tốc độ**: RSA chậm hơn so với mật mã đối xứng, không phù hợp để mã hóa dữ liệu lớn
- **Kích thước khóa**: Khóa RSA lớn hơn so với khóa đối xứng tương đương
- **Tính toán**: Yêu cầu tính toán phức tạp, tiêu tốn tài nguyên
- **Bảo mật**: Phụ thuộc vào độ khó của bài toán phân tích thừa số, có thể bị phá vỡ bởi máy tính lượng tử trong tương lai

### 4. Tương lai của RSA

- **Máy tính lượng tử**: Máy tính lượng tử có thể phá vỡ RSA bằng thuật toán Shor
- **Các giải pháp thay thế**: Các thuật toán mã hóa kháng lượng tử (post-quantum cryptography) đang được phát triển
- **Chuẩn hóa**: NIST đang tiêu chuẩn hóa các thuật toán mã hóa kháng lượng tử để thay thế RSA trong tương lai
