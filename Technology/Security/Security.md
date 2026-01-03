---
tags:
  - area/technology
  - domain/security
  - type/resource
  - lang/vi
---

# 1. Resources

- Kiểm tra xem mình có bị lộ mật khẩu không, và nguồn bị lộ:
  - https://haveibeenpwned.com
  - https://dehashed.com
- Snort - Công cụ Phát Hiện Xâm Nhập (IDS)
  - Giới thiệu về Snort - Công cụ Phát Hiện Xâm Nhập (IDS): https://viblo.asia/p/gioi-thieu-ve-snort-cong-cu-phat-hien-xam-nhap-ids-MG24Bk9RJz3
- Polaris Web Protection & Cyber Security: https://polarisec.com/web-protection
- Secure coding for developers: https://viblo.asia/s/secure-coding-for-developers-dbZN76EalYM
- IDOR là gì và ứng dụng bạn code có bị lỗi IDOR không?: https://viblo.asia/p/idor-la-gi-va-ung-dung-ban-code-co-bi-loi-idor-khong-gAm5yrJqKdb

# 2. OSWAP

- Bảo mật cho ứng dụng API theo OWASP TOP 10 (Part 1): https://viblo.asia/p/bao-mat-cho-ung-dung-api-theo-owasp-top-10-part-1-GyZJZN8EJjm
- Bảo mật cho ứng dụng API theo OWASP TOP 10 (Part 2): https://viblo.asia/p/bao-mat-cho-ung-dung-api-theo-owasp-top-10-part-2-2oKLn2lZLQO
- Bảo mật cho ứng dụng API theo OWASP TOP 10 (End): https://viblo.asia/p/bao-mat-cho-ung-dung-api-theo-owasp-top-10-end-EbNVQZXo4vR

# 3. Secret manager

- Hashicorp Vault: https://www.hashicorp.com/en/products/vault
- Google Secret Manger: https://cloud.google.com/security/products/secret-manager
- AWS Secret Manager: https://aws.amazon.com/secrets-manager

## 3.1. HashiCorp Vault

- **Giới thiệu**: Công cụ mã nguồn mở giúp quản lý bí mật và dữ liệu nhạy cảm một cách an toàn, tập trung. Đặc biệt hữu ích khi số lượng dịch vụ trong tổ chức tăng lên và vấn đề quản lý bí mật trở nên phức tạp hơn
- **Tính năng chính**:
  - Mã hóa dữ liệu khi lưu trữ để đảm bảo an toàn
  - Hỗ trợ nhiều phương thức xác thực như token, LDAP, AppRole
  - Quản lý truy cập thông qua chính sách (policies) để kiểm soát quyền truy cập
  - Hỗ trợ nhiều backend bí mật và lưu trữ như MySQL, Postgres, S3
  - Tạo bí mật động với TTL (Time To Live) và lease tích hợp
  - Ghi lại dấu vết kiểm toán (audit trail) cho mọi tương tác
  - Tương tác qua giao diện web, CLI, REST API và thư viện ngôn ngữ
- **Thiết lập cho môi trường phát triển**: Sử dụng Docker để khởi động Vault ở chế độ dev, phù hợp cho mục đích học tập và thử nghiệm
- **Lợi ích**: Giúp các tổ chức quản lý bí mật một cách an toàn, đặc biệt phù hợp cho các thách thức kiến trúc microservices
- Nguồn: https://viblo.asia/p/managing-secrets-in-nodejs-with-hashicorp-vault-quan-ly-bi-mat-trong-nodejs-voi-hashicorp-vault-obA46EWgVKv

# 4. Tools

- [c0dejump/HExHTTP: Header Exploitation HTTP](https://github.com/c0dejump/HExHTTP) - Tạo ra các biến thể của HTTP request để kiểm tra backend
- [lirantal/npq: safely install npm packages by auditing them pre-install stage](https://github.com/lirantal/npq)
- [HarborGuard/HarborGuard: Modern container security scanning platform with multi-tool integration.](https://github.com/HarborGuard/HarborGuard)
- [google/osv-scanner](https://github.com/google/osv-scanner) - Vulnerability scanner written in Go which uses the data provided by osv.dev. Supports scanning source directories, containers, license checking, and offline scanning. Provides guided remediation for vulnerabilities.
- **DroneSploit**: Framework kiểm thử bảo mật (pentesting) dành cho máy bay không người lái (drone), cung cấp giao diện dòng lệnh tương tự như Metasploit
  - Tập hợp các kỹ thuật và khai thác (exploits) tập trung vào việc hack drone
  - Dễ dàng cài đặt và sử dụng thông qua lệnh `pip3 install dronesploit`
  - Dựa trên sploitkit framework
  - Khi khởi động, một số module có thể bị vô hiệu hóa nếu thiếu các yêu cầu cần thiết (ví dụ: `aircrack-ng` chưa được cài đặt), có thể kiểm tra bằng lệnh `show issues`
  - Được trình bày tại Black Hat Europe Arsenal 2019
  - [GitHub](https://github.com/dronesploit/dronesploit) #pentesting #drone #security #framework

# 5. Security Analytics

## 5.1. Tirreno

- **Giới thiệu**: Nền tảng phân tích bảo mật mã nguồn mở, giúp hiểu, giám sát và bảo vệ sản phẩm khỏi các mối đe dọa tài khoản, gian lận và lạm dụng
- **Tính năng chính**:
  - **Theo dõi sự kiện chi tiết**: Capture tất cả các sự kiện như logins/logouts, thay đổi dữ liệu, truy cập trang, API calls, cùng với user context và application errors để có cái nhìn toàn diện về hoạt động
  - **Giám sát liên tục**: Monitor hành vi người dùng gần như real-time, chọn từ danh sách các loại sự kiện liên quan để phát hiện proactiv các mối đe dọa bảo mật, tấn công tài khoản và lạm dụng
  - **Single user view**: Xem chi tiết hoạt động của từng user, phân tích behavior patterns, risk scores, connected identities và activity timelines để điều tra các hoạt động đáng ngờ
  - **User risk assessment**: Thiết lập security rules để tự động nhận diện hoạt động độc hại và đánh giá rủi ro phù hợp với yêu cầu bảo mật cụ thể
  - **Case management và auto-decision**: Tự động suspend hoặc gửi đến manual review các tài khoản có sự kiện rủi ro, team có thể điều tra và đưa ra quyết định dựa trên security analytics
  - **Field audit trail**: Tự động theo dõi các thay đổi trên các field quan trọng, bao gồm những gì đã thay đổi và khi nào, giúp đơn giản hóa audit và compliance
- **Đặc điểm**:
  - **In-app security**: Khác với SIEMs hoặc WAFs truyền thống, tirreno phát hiện mối đe dọa ngay trong ứng dụng
  - **Data sovereignty**: Có thể deploy on-premises, đảm bảo chủ quyền dữ liệu
  - **Simple integration**: Dễ tích hợp như các công cụ web analytics, không cần route traffic hay thay đổi stack hiện có
  - **Product-agnostic**: Phân tích bảo mật linh hoạt, thích ứng với mọi thách thức bảo mật từ insider threats đến fraud prevention
- Nguồn: https://www.tirreno.com/ #security-analytics #open-source #monitoring

# 6. Cryptography

- **Tink**: Thư viện mã hóa đa ngôn ngữ và đa nền tảng được phát triển bởi Google, cung cấp các API mã hóa an toàn, dễ sử dụng đúng cách và khó bị lạm dụng. Hỗ trợ nhiều ngôn ngữ lập trình và được thiết kế để giúp các nhà phát triển triển khai mã hóa một cách dễ dàng và an toàn - [GitHub](https://github.com/tink-crypto) #cryptography #encryption

- **Format-Preserving Encryption (FPE)**: Thuật toán mã hóa giữ nguyên định dạng của dữ liệu sau khi mã hóa
  - **Khái niệm**: Mã hóa dữ liệu nhạy cảm mà không làm thay đổi định dạng hay cấu trúc ban đầu (số lượng ký tự, nhóm chữ số, v.v.)
  - **Khác biệt với mã hóa truyền thống**:
    - Mã hóa truyền thống thay đổi hoàn toàn cấu trúc dữ liệu (ví dụ: số thẻ tín dụng "1234 5678 9012 3456" có thể trở thành "f1a9c2b5e3d8")
    - FPE giữ nguyên định dạng (ví dụ: số thẻ tín dụng 16 chữ số vẫn là 16 chữ số sau khi mã hóa)
  - **Cách hoạt động**:
    - Xác định định dạng dữ liệu ban đầu (số lượng ký tự, loại ký tự, cấu trúc)
    - Áp dụng thuật toán mã hóa đặc biệt để tạo ra dữ liệu mã hóa tuân thủ định dạng ban đầu
    - Đảm bảo dữ liệu mã hóa có cùng cấu trúc với dữ liệu gốc
  - **Ứng dụng**:
    - Bảo vệ số thẻ tín dụng trong hệ thống thanh toán (giữ nguyên định dạng 16 chữ số)
    - Mã hóa thông tin cá nhân nhạy cảm (số CMND, số điện thoại, email) mà vẫn giữ nguyên định dạng
    - Xử lý dữ liệu lớn trong cơ sở dữ liệu cần giữ nguyên định dạng để truy vấn
    - Bảo mật trong các dịch vụ đám mây mà không cần thay đổi kiểu dữ liệu
  - **Phương pháp cài đặt**:
    - **FFX (Format-Preserving Encryption with Feistel Structure)**: Sử dụng cấu trúc Feistel, chia dữ liệu thành các phần và xử lý qua nhiều vòng
    - **FF1 và FF3**: Hai biến thể được chuẩn hóa, hoạt động trên các loại dữ liệu có cấu trúc khác nhau
  - **Lợi ích**:
    - Bảo mật cao mà không làm thay đổi cấu trúc dữ liệu
    - Tương thích với các hệ thống hiện có, không cần thay đổi mã nguồn hoặc quy trình
    - Tiết kiệm chi phí (không cần tái cấu trúc hệ thống)
    - Tuân thủ các quy định bảo mật như PCI DSS
  - **Hạn chế**:
    - Độ bảo mật có thể không cao bằng mã hóa truyền thống (như AES) nếu không được cấu hình đúng cách
    - Yêu cầu nhiều tài nguyên tính toán, đặc biệt khi xử lý lượng dữ liệu lớn
  - Nguồn: https://viblo.asia/p/thuat-toan-ma-hoa-format-preserving-encryption-aNj4vPGqL6r #cryptography #encryption #fpe

# 7. Authentication Security

> **Lưu ý**: Không phải dự án nào cũng cần thực hiện tất cả các chức năng dưới đây. Cân nhắc kỹ dựa vào quy mô dự án và tham khảo từ Senior/SA có kinh nghiệm.

## 7.1. Login

- **Input validation**
  - Kiểm tra định dạng email/username và password trước khi gửi lên server
- **Password security**
  - Bắt buộc mật khẩu mạnh (tối thiểu 8 ký tự, chữ hoa, chữ thường, số, ký tự đặc biệt)
  - Hash password bằng bcrypt, Argon2, scrypt (không lưu plain text)
- **Session management**
  - Tạo session phía server và gửi session ID qua cookie (nếu dùng session)
  - Regenerate session ID sau khi đăng nhập thành công (tránh session fixation)
  - Hạn chế thời gian sống của session
- **Token-based auth (JWT)**
  - Tạo access token và refresh token sau khi xác thực
  - Gửi về client để lưu trữ
- **Secure cookies**
  - Đặt HttpOnly, Secure, SameSite khi lưu token/session ID trong cookie
- **CSRF protection**
  - Kết hợp CSRF token nếu dùng cookie để lưu auth info
- **Two-Factor Authentication (2FA)**
  - Hỗ trợ xác thực 2 bước qua email/SMS hoặc app (Google Authenticator)
- **"Remember me" support**
  - Lưu refresh token/token sống lâu để duy trì đăng nhập giữa các phiên
- **Account lockout policy**
  - Tạm khóa tài khoản sau X lần đăng nhập sai liên tiếp (ví dụ: 5 lần) để ngăn brute force
- **Rate limiting**
  - Giới hạn số lần login trong một khoảng thời gian
- **CAPTCHA**
  - Thêm CAPTCHA sau vài lần login sai liên tục
- **Device Fingerprinting**
  - Thu thập đặc điểm thiết bị (user-agent, canvas, WebGL, timezone, ...)
  - Hash thành device ID
  - Phát hiện thiết bị lạ => Gửi email cảnh báo, yêu cầu xác minh OTP
- **GeoIP Tracking**
  - Phát hiện đăng nhập từ IP quốc gia lạ
  - Gửi email cảnh báo, yêu cầu xác minh OTP
- **Frontend error feedback**
  - Hiển thị lỗi cụ thể (sai mật khẩu, tài khoản không tồn tại, tài khoản bị khóa, ...)
- **Logging**
  - Ghi log tất cả hành vi đăng nhập thành công/thất bại (id, email, thời điểm, IP, thiết bị, ...)

## 7.2. Logout

- **Session invalidation**
  - Xóa session phía server hoàn toàn để ngăn reuse session đã hết hạn
- **CSRF protection**
  - Yêu cầu CSRF token hợp lệ khi gọi API logout
- **Token revocation (JWT)**
  - Đánh dấu token không hợp lệ (revoked) qua blacklist trong Redis
  - Hoặc đặt thời gian sống rất ngắn cho token và dùng refresh token
- **Clear cookies**
  - Xóa toàn bộ cookies chứa thông tin xác thực (access token, refresh token, session ID, ...) ở phía client
- **Redirect**
  - Điều hướng đến trang đăng nhập hoặc trang chủ sau khi logout thành công
- **Frontend state cleanup**
  - Xóa dữ liệu người dùng khỏi state/Redux/Context/... để tránh hiển thị thông tin nhạy cảm
- **Invalidate refresh token**
  - Hủy hoặc xóa refresh token khỏi cơ sở dữ liệu
- **Logout tất cả sessions (tùy chọn)**
  - Cho phép logout toàn bộ thiết bị, một thiết bị cụ thể, hoặc chỉ thiết bị hiện tại
- **Frontend error feedback**
  - Try catch để thông báo lỗi cho người dùng nếu logout thất bại
- **Logging**
  - Ghi lại tất cả hành vi logout thành công/thất bại (id, email, thời điểm, IP, thiết bị, ...)

## 7.3. Forgot Password

- **Email/username verification**
  - Kiểm tra email/username có tồn tại trong hệ thống trước khi gửi link reset
- **Rate limiting và abuse protection**
  - Giới hạn số lần yêu cầu quên mật khẩu từ một IP hoặc cho một email
- **Generate secure token**
  - Tạo token ngẫu nhiên, đủ độ dài (32-64 ký tự), khó đoán, dùng một lần
- **Token expiration**
  - Token reset phải có thời hạn ngắn (ví dụ: 15 phút)
- **Gửi email reset link**
  - Gửi email chứa link reset dạng `https://example.com/reset-password?token=...`
- **Lưu trữ token**
  - Lưu token vào database kèm thời gian hết hạn, gắn với user (nếu không dùng JWT)
- **Form reset password**
  - Kiểm tra token còn hợp lệ
  - Mật khẩu mới phải đủ mạnh (kèm xác nhận lại)
  - Có xác thực CSRF nếu dùng cookie
- **Token one-time usage**
  - Vô hiệu hóa token ngay sau khi reset mật khẩu thành công
- **Password security**
  - Mật khẩu mới bắt buộc mạnh (tối thiểu 8 ký tự, chữ hoa, chữ thường, số, ký tự đặc biệt)
  - Hash password bằng bcrypt, Argon2, scrypt (không lưu plain text)
- **Thông báo sau khi reset**
  - Gửi email thông báo khi mật khẩu đã được thay đổi
- **Logout tất cả sessions (tùy chọn)**
  - Cho phép logout tất cả session hiện tại sau khi reset mật khẩu
- **Frontend error feedback**
  - Thông báo lỗi cụ thể (token hết hạn, mật khẩu quá yếu, ...)
- **Logging**
  - Ghi lại hành vi reset mật khẩu thành công/thất bại (id, email, thời điểm, IP, thiết bị, ...)

## 7.4. Register

- **Input validation**
  - Kiểm tra định dạng email, độ mạnh mật khẩu, username không chứa ký tự đặc biệt
  - Xác nhận 2 lần nhập mật khẩu khớp nhau (cả client và server)
- **Duplicate check**
  - Kiểm tra email/username đã tồn tại trong hệ thống chưa
- **Password security**
  - Bắt buộc mật khẩu mạnh (tối thiểu 8 ký tự, chữ hoa, chữ thường, số, ký tự đặc biệt)
  - Hash password bằng bcrypt, Argon2, scrypt (không lưu plain text)
- **Email verification**
  - Gửi email xác thực tài khoản (kèm link hoặc mã xác nhận)
- **Rate limiting & bot protection**
  - Giới hạn số lần đăng ký từ một IP
  - Kết hợp CAPTCHA/reCAPTCHA để ngăn bot tạo tài khoản ảo
- **Username/email normalization**
  - Chuyển email về dạng chuẩn (lowercase, bỏ khoảng trắng đầu/cuối, ...)
- **Set default user role/status**
  - Gán role mặc định (ví dụ: user) và trạng thái unverified nếu chưa xác minh email
- **Tạo các thực thể liên quan**
  - Tạo profile, cart, favorites, ... tùy theo nghiệp vụ ứng dụng
- **Gửi welcome email**
  - Gửi email chào mừng kèm hướng dẫn xác minh, sử dụng, hỗ trợ, ...
- **Secure session/token issuance**
  - Tự động đăng nhập người dùng sau khi đăng ký thành công (tạo session hoặc cấp access token)
- **CSRF protection**
  - Bảo vệ form đăng ký bằng CSRF token nếu dùng cookie
- **Email/phone confirmation reminder UI**
  - Hiển thị thông báo yêu cầu xác minh tài khoản kèm button gửi lại mã xác thực/email
- **Terms of Service & Privacy Policy agreement**
  - Bắt buộc người dùng đồng ý với điều khoản sử dụng và chính sách bảo mật
- **Frontend error feedback**
  - Thông báo lỗi cụ thể (mật khẩu quá yếu, tài khoản đã tồn tại, ...)
- **Logging**
  - Ghi lại hành vi đăng ký (id, email, thời điểm, IP, thiết bị, ...)

## 7.5. Lưu ý thực tế khi triển khai

- **Thay đổi IP (đổi mạng wifi, chuyển 3G/4G)**
  - Trao đổi với người có kinh nghiệm để xem xét trường hợp nào cần thông báo cho người dùng
- **VPN**
  - Cho phép người dùng xác nhận "Đó là tôi" nếu dùng VPN gây nhầm lẫn
- **Private mode**
  - Fingerprint có thể bị lỗi => fallback về IP + user-agent nếu cần
- **Quyền riêng tư**
  - Thông báo rõ cho người dùng về thu thập fingerprint/IP trong Privacy Policy
- **UX mượt mà**
  - Không ép xác minh quá nhiều, tránh gây khó chịu cho người dùng
