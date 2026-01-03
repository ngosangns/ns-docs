---
tags:
  - area/technology
  - domain/programming-languages
  - topic/rust
  - type/resource
  - lang/vi
---

# 1. Ghi chú về Rust

## 1.1. Thư viện (Libraries)

### 1.1.1. Mạng và Web

- teloxide - Một framework thanh lịch để xây dựng bot Telegram bằng Rust: https://github.com/teloxide/teloxide #Telegram #Bot #Rust
- Actix - Một framework actor mạnh mẽ cho Rust, thường dùng để xây dựng ứng dụng web hiệu năng cao và các hệ thống đồng thời: https://github.com/actix/actix #ActorModel #Web #Performance #Rust
- Tokio - Một runtime bất đồng bộ cho ngôn ngữ lập trình Rust, là nền tảng cho hầu hết các ứng dụng mạng và I/O bất đồng bộ: https://github.com/tokio-rs/tokio #Async #Concurrency #Networking #Rust
- axum - Một framework web công thái học và module hóa được xây dựng trên Tokio và Tower, tập trung vào sự đơn giản và an toàn kiểu: https://github.com/tokio-rs/axum #WebFramework #Async #Rust
- reqwest - Một HTTP client tiện lợi và mạnh mẽ cho Rust, hỗ trợ cả hoạt động đồng bộ và bất đồng bộ: https://github.com/seanmonstar/reqwest #HTTPClient #Networking #Rust
- [rustmailer/rustmailer: A self-hosted IMAP/SMTP middleware designed for developers](https://github.com/rustmailer/rustmailer)

### 1.1.2. Dữ liệu và Serialization

- Serde - Một framework để serialize (tuần tự hóa) và deserialize (giải tuần tự hóa) cấu trúc dữ liệu Rust một cách hiệu quả và tổng quát: https://github.com/serde-rs/serde #Serialization #Deserialization #DataFormat #Rust
- sqlx - Một toolkit SQL không đồng bộ an toàn kiểu cho Rust, cho phép kiểm tra query tại thời điểm biên dịch với cơ sở dữ liệu (PostgreSQL, MySQL, SQLite): https://github.com/launchbadge/sqlx #Database #SQL #Async #Rust

### 1.1.3. AI và Giao thức

- mcp-rust-sdk - Một thư viện Rust triển khai Model Context Protocol (MCP), được thiết kế cho giao tiếp liền mạch giữa các mô hình Trí tuệ Nhân tạo (AI) và môi trường runtime của chúng: https://github.com/Derek-X-Wang/mcp-rust-sdk #AI #Protocol #SDK #Rust

### 1.1.4. Xử lý lỗi

- anyhow - Thư viện để xử lý lỗi ứng dụng một cách linh hoạt, cung cấp một kiểu lỗi `anyhow::Error` dễ sử dụng để bao bọc các lỗi khác nhau: https://github.com/dtolnay/anyhow #ErrorHandling #Rust
- thiserror - Thư viện giúp tạo các kiểu lỗi tùy chỉnh một cách dễ dàng bằng cách sử dụng `derive macro`, hữu ích cho việc định nghĩa lỗi cụ thể trong thư viện: https://github.com/dtolnay/thiserror #ErrorHandling #Rust

## 1.2. Công cụ (Tools)

### 1.2.1. Quản lý dự án và Build

- Cargo - Trình quản lý gói và hệ thống build của Rust. Đây là công cụ cốt lõi để quản lý dependencies (thư viện phụ thuộc), biên dịch mã, chạy kiểm thử (tests), và xuất bản các crate (gói thư viện Rust): https://doc.rust-lang.org/cargo/ #PackageManager #BuildSystem #Rust
- cross - Công cụ giúp đơn giản hóa việc biên dịch chéo (cross-compile) các dự án Rust cho nhiều kiến trúc và hệ điều hành mục tiêu khác nhau: https://github.com/cross-rs/cross #CrossCompilation #BuildTool #Rust

### 1.2.2. Chất lượng mã và Môi trường phát triển

- Rustfmt - Một công cụ để tự động định dạng mã Rust theo các quy tắc về phong cách (style guidelines) chuẩn của cộng đồng, giúp mã nguồn thống nhất và dễ đọc: https://github.com/rust-lang/rustfmt #Formatter #CodeStyle #Rust
- Clippy - Một bộ sưu tập các lint (công cụ phân tích tĩnh) để phát hiện các lỗi phổ biến, các đoạn mã có thể kém tối ưu, và cải thiện phong cách viết mã Rust của bạn: https://github.com/rust-lang/rust-clippy #Linter #CodeQuality #Rust
- rust-analyzer - Một máy chủ ngôn ngữ (language server) cho Rust, cung cấp các tính năng thông minh cho IDE và trình soạn thảo mã như tự động hoàn thành (autocompletion), đi đến định nghĩa (goto definition), tìm kiếm tham chiếu (find references), và chẩn đoán lỗi thời gian thực: https://rust-analyzer.github.io/ #IDETooling #LanguageServer #Development #Rust

# 2. Framework

## 2.1. Nannou

Nannou là một framework mã nguồn mở dành cho lập trình sáng tạo (creative coding) bằng ngôn ngữ Rust. Mục tiêu của Nannou là giúp các nghệ sĩ và nhà phát triển dễ dàng biểu đạt ý tưởng sáng tạo của họ thông qua mã nguồn đơn giản, nhanh, đáng tin cậy và có tính di động cao.

Nannou được lấy cảm hứng từ các framework nổi tiếng như Processing, OpenFrameworks và Cinder, nhưng được thiết kế dành riêng cho Rust, nhằm tận dụng các ưu điểm của Rust trong việc phát triển ứng dụng sáng tạo.

Các tính năng chính của Nannou bao gồm:

- Hỗ trợ phát triển ứng dụng đồ họa, sketching, giao diện người dùng, âm thanh, shader, và nhiều hơn nữa.
- Bao gồm nhiều thư viện con như nannou_audio (xử lý âm thanh), nannou_egui (giao diện người dùng), nannou_isf (shader), nannou_laser (thiết bị LASER), nannou_mesh (xử lý lưới đồ họa), nannou_osc (giao tiếp OSC), và nannou_wgpu (hỗ trợ GPU).
- Cung cấp các ví dụ phong phú giúp người dùng nhanh chóng làm quen và phát triển dự án.
- Có các công cụ hỗ trợ tạo dự án mới và đóng gói ứng dụng.

Dự án đang trong giai đoạn phát triển sớm và luôn chào đón sự đóng góp từ cộng đồng.

Tóm lại, Nannou là một bộ công cụ lập trình sáng tạo mạnh mẽ và hiện đại dành cho Rust, giúp nghệ sĩ và lập trình viên dễ dàng tạo ra các sản phẩm nghệ thuật số và tương tác.

Thông tin chi tiết và mã nguồn có thể tham khảo trực tiếp trên GitHub của dự án tại: https://github.com/nannou-org/nannou.
