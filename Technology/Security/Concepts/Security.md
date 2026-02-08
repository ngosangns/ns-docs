---
tags:
  - area/technology
  - domain/security
  - type/resource
  - lang/vi
---

# Bảo mật (Security)

Bảo mật thông tin là quá trình bảo vệ dữ liệu và hệ thống thông tin khỏi sự truy cập, sử dụng, tiết lộ, gián đoạn, sửa đổi hoặc phá hủy trái phép.

## Các tiêu chuẩn và tài liệu tham khảo

- **OWASP Top 10**: Danh sách các lỗ hổng bảo mật ứng dụng web phổ biến nhất - [OWASP Foundation](https://owasp.org/www-project-top-ten/).
- **Node.js Security Cheat Sheet**: Các quy tắc bảo mật cho ứng dụng Node.js - [OWASP CheatSheet](https://cheatsheetseries.owasp.org/cheatsheets/Nodejs_Security_Cheat_Sheet.html).

## Các chủ đề chính

### 1. Quản lý bí mật (Secret Management)
Quản lý các thông tin nhạy cảm như API keys, mật khẩu CSDL, và chứng chỉ số một cách tập trung và an toàn thay vì lưu trực tiếp trong code hoặc file cấu hình.
- **HashiCorp Vault**: Công cụ tiêu chuẩn cho doanh nghiệp - Xem chi tiết tại [[Security Tools|Security Tools]].

### 2. Mật mã học (Cryptography)
Sử dụng các thuật toán toán học để bảo vệ dữ liệu.
- **Symmetric Encryption**: Mã hóa đối xứng (cùng một key để mã hóa và giải mã).
- **Asymmetric Encryption**: Mã hóa bất đối xứng (sử dụng Public/Private key) như [[RSA]].

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
