---
area: technology
domain: system-design
type: note
lang: vi
created: '2026-04-13'
modified: '2026-04-13'
---

# Mẫu thiết kế Federated Identity (Danh tính liên kết)

Mẫu thiết kế Federated Identity thực hiện việc ủy quyền xác thực cho một nhà cung cấp danh tính bên ngoài (Identity Provider - IdP). Điều này giúp đơn giản hóa quá trình phát triển, giảm bớt gánh nặng quản trị người dùng và cải thiện trải nghiệm người dùng của ứng dụng.

## 1. Ngữ cảnh và Vấn đề
Người dùng thường phải làm việc với nhiều ứng dụng khác nhau từ các tổ chức khác nhau. Việc sử dụng các thông tin đăng nhập riêng biệt cho từng ứng dụng dẫn đến:
- **Trải nghiệm rời rạc:** Người dùng dễ quên mật khẩu khi có quá nhiều tài khoản.
- **Lỗ hổng bảo mật:** Khi một nhân viên rời công ty, việc quên hủy tài khoản trên nhiều ứng dụng khác nhau là rủi ro lớn.
- **Quản lý phức tạp:** Quản trị viên phải quản lý thông tin đăng nhập, cấp lại mật khẩu cho từng ứng dụng riêng lẻ.

## 2. Giải pháp
Tách biệt việc xác thực người dùng khỏi mã nguồn ứng dụng và giao phó việc đó cho một nhà cung cấp danh tính đáng tin cậy.
- **Identity Provider (IdP):** Các dịch vụ như Microsoft Entra ID (Azure AD), Google, Facebook, hoặc hệ thống thư mục nội bộ công ty (AD FS).
- **Claims-based Access Control:** IdP xác thực người dùng và trả về một token chứa các "claims" (khẳng định) về danh tính, vai trò hoặc quyền hạn của người dùng.
- **Security Token Service (STS):** Có thể chuyển đổi hoặc bổ sung thêm thông tin vào token trước khi gửi về ứng dụng.

## 3. Lợi ích
- **Single Sign-On (SSO):** Người dùng chỉ cần đăng nhập một lần để truy cập vào nhiều ứng dụng khác nhau.
- **Giảm gánh nặng quản trị:** Ứng dụng không cần lưu trữ mật khẩu hay cung cấp tính năng "quên mật khẩu". Việc quản lý tài khoản thuộc về IdP.
- **Bảo mật cao hơn:** Ứng dụng không bao giờ nhìn thấy mật khẩu thực sự của người dùng, chỉ nhận được các token đã được ký số.
- **Khả năng mở rộng:** Dễ dàng tích hợp với các đối tác kinh doanh hoặc cho phép người dùng đăng nhập bằng tài khoản mạng xã hội.

## 4. Các vấn đề và Cân nhắc
- **Điểm yếu duy nhất (Single Point of Failure):** Nếu IdP bị lỗi, người dùng không thể đăng nhập vào ứng dụng. Cần chọn IdP có độ sẵn sàng cao.
- **Home Realm Discovery:** Nếu hệ thống hỗ trợ nhiều IdP, cần có cơ chế để xác định người dùng nên được chuyển hướng đến IdP nào (ví dụ: dựa trên email domain).
- **Thông tin người dùng:** Các nhà cung cấp mạng xã hội (như Facebook) có thể chỉ cung cấp email và tên, ứng dụng có thể cần duy trì thêm thông tin riêng để ánh khớp.
- **Xác thực vs. Ủy quyền:** Phân biệt rõ việc xác thực (là ai) và ủy quyền (được làm gì). IdP xử lý xác thực, nhưng ứng dụng vẫn chịu trách nhiệm về việc kiểm soát quyền truy cập dựa trên các claims nhận được.

## 5. Khi nào nên sử dụng
- **SSO trong doanh nghiệp:** Cho phép nhân viên dùng tài khoản công ty để đăng nhập vào các app SaaS (như Office 365, Salesforce).
- **Hợp tác liên tổ chức (B2B):** Xác thực cho nhân viên của các công ty đối tác mà không cần tạo tài khoản trong thư mục của mình.
- **Ứng dụng SaaS:** Cung cấp dịch vụ cho nhiều khách hàng, mỗi khách hàng muốn dùng hệ thống danh tính riêng của họ.
- **Ứng dụng tiêu dùng (B2C):** Cho phép người dùng đăng nhập bằng tài khoản Google, Facebook để giảm rào cào đăng ký.

## 6. Ví dụ trên Azure
- **Microsoft Entra ID (trước là Azure AD):** IdP phổ biến nhất cho doanh nghiệp trên Azure.
- **Azure AD B2C:** Dịch vụ dành riêng cho việc quản lý danh tính khách hàng, hỗ trợ liên kết với nhiều mạng xã hội.
- **AD FS (Active Directory Federation Services):** Giải pháp on-premises để liên kết danh tính nội bộ với các ứng dụng đám mây.

---
*Nguồn: [Azure Architecture Center - Federated Identity pattern](https://learn.microsoft.com/en-us/azure/architecture/patterns/federated-identity)*
