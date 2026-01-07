---
tags:
  - area/technology
  - domain/security
  - type/resource
  - lang/vi
---

# Authentication Security

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
