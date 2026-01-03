---
tags:
  - area/technology
  - domain/devops
  - type/resource
  - lang/vi
---

# 1. Resources

- TĂNG CƯỜNG BẢO VỆ CHO HỆ THỐNG MẠNG NỘI BỘ SỬ DỤNG DMZ: https://viblo.asia/p/tang-cuong-bao-ve-cho-he-thong-mang-noi-bo-su-dung-dmz-EoDGQOElkbV
- DevOps training: Cẩm nang debug networking: https://viblo.asia/p/devops-training-cam-nang-debug-networking-y3RL1QovLao
- [anderspitman/awesome-tunneling: List of ngrok/Cloudflare Tunnel alternatives and other tunneling software and services. Focus on self-hosting.](https://github.com/anderspitman/awesome-tunneling)

# 2. Load balancer / Reverse proxy

## 2.1. HAProxy

- HAProxy - The Reliable, High Perf. TCP/http Load Balancer: https://www.haproxy.org
- Hướng dẫn sử dụng HAProxy cho load balancing ứng dụng: https://viblo.asia/p/huong-dan-su-dung-haproxy-cho-load-balancing-ung-dung-4P856jp95Y3
- Tìm hiểu về Load balancing server với HAproxy: https://viblo.asia/p/tim-hieu-ve-load-balancing-server-voi-haproxy-ByEZkoDxZQ0

## 2.2. Envoy

- https://github.com/envoyproxy/envoy

# 3. Debugger

## 3.1. ProxyPin (Công cụ bắt giữ lưu lượng HTTP(S))

- **Tổng quan & Mục đích Cốt lõi:**
  - Phần mềm nguồn mở, miễn phí để bắt giữ, kiểm tra, ghi lại lưu lượng HTTP(S).
  - Đa nền tảng: Windows, Mac, Android, iOS, Linux.
  - Giao diện người dùng thân thiện (Flutter), hỗ trợ lưu lượng ứng dụng Flutter.
- **Các Chức năng & Tính năng Chính:**
  - Kết nối Mã quét Di động: Đơn giản hóa cấu hình proxy trên thiết bị di động qua quét mã QR.
  - Lọc Tên miền: Chặn lưu lượng cụ thể, giảm nhiễu.
  - Chức năng Tìm kiếm Yêu cầu: Tìm kiếm yêu cầu dựa trên từ khóa, loại phản hồi.
  - Hỗ trợ Kịch bản: Viết kịch bản JavaScript để xử lý yêu cầu/phản hồi.
  - Ghi lại Yêu cầu: Chuyển hướng, thay thế tin nhắn yêu cầu/phản hồi, sửa đổi yêu cầu/phản hồi.
  - Chặn Yêu cầu: Chặn yêu cầu dựa trên URL.
  - Quản lý Lịch sử: Tự động lưu dữ liệu lưu lượng, xuất/nhập định dạng HAR.
  - Các Công cụ Bổ sung: Mục yêu thích, hộp công cụ (mã hóa phổ biến, tạo mã QR, biểu thức chính quy).
  - Hỗ trợ HTTP2 và Zstd: Cập nhật gần đây bao gồm hỗ trợ HTTP2 và giải mã zstd.
  - Mã hóa/Giải mã AES trong Hộp công cụ: Hộp công cụ hỗ trợ mã hóa/giải mã AES.
- **Các Trường hợp Sử dụng Chính:**
  - Chặn & Gỡ lỗi Lưu lượng HTTP(S): Kiểm tra, sửa đổi, gỡ lỗi lưu lượng mạng từ ứng dụng, đặc biệt là di động.
  - Phân tích Lưu lượng Ứng dụng Flutter: Tối ưu hóa để bắt giữ/phân tích lưu lượng từ ứng dụng Flutter.
  - Kiểm tra Bảo mật: Kiểm tra bảo mật ứng dụng bằng cách chặn/ghi lại yêu cầu/phản hồi.
  - Phát triển & Kiểm tra API: Kiểm tra và thao tác các cuộc gọi API.
- **Ưu điểm & Điểm mạnh:**
  - Hỗ trợ Đa nền tảng Toàn diện: Windows, Mac, Android, iOS, Linux.
  - Giao diện Người dùng Trực quan: UI dựa trên Flutter "đẹp và dễ sử dụng".
  - Tích hợp Di động Độc đáo: Kết nối mã quét di động đơn giản hóa thiết lập gỡ lỗi di động.
  - Thao tác Lưu lượng Mạnh mẽ: Kịch bản, ghi lại yêu cầu, chặn.9
  - Phát triển & Cập nhật Tích cực: Cập nhật gần đây (HTTP2, zstd, AES).
  - Đánh giá Người dùng Tích cực: "Phần mềm bắt giữ lưu lượng tốt nhất trên iOS", "proxy gỡ lỗi tuyệt vời".
  - Tập trung vào Quyền riêng tư: Không thu thập/chia sẻ dữ liệu, dữ liệu được mã hóa trong quá trình truyền.
- **Nhược điểm & Hạn chế:**
  - Rủi ro Proxy Chung (Không cụ thể cho ProxyPin): Các đoạn trích thảo luận về rủi ro chung của _bất kỳ_ máy chủ proxy nào (bảo mật, tốc độ chậm, truy cập hạn chế, chi phí).
