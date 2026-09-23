---
area: technology
domain: programming-languages
topic: golang
type: resource
title: Khoa Hoc Golang Scalable Cua Viet Tran
description: Khóa học Golang scalable của Việt Trần
timestamp: "2026-06-19T13:43:26.132Z"
tags:
  - technology
  - programming-languages
  - golang
---

# Khóa học Golang scalable của Việt Trần

# NGÔN NGỮ GOLANG - KEY FEATURE

- Go effective, các quy ước để có source go đẹp và chuẩn.
- Go channel: Giao tiếp giữa các Goroutines (concurrent).
- Buffer Channel trong Golang.
- Cơ chế Defer, Recover trong Golang.
- Sử dụng Interface trong Golang.
- Slice, buffer, json decode / encode trong Golang.

# **PHÂN TÍCH DỰ ÁN**

- Thiết lập requirement, user story từ giao diện.
- Phân tích chức năng, flow và các APIs cần có.
- Phân tích modules cần có trong service.
- **Bonus**: phân chia modules cho microservices.

# **THIẾT LẬP DATABASE**

- Cài đặt và kết nối database service: MySQL / PostgreSQL.
- Từ kết quả phân tích, thiết lập các bảng dữ liệu.
- Thiết lập các mối quan hệ giữa các bảng dữ liệu.
- Kỹ thuật đánh khoá chính và index để có kết quả truy xuất tốt nhất.
- **Bonus**: kinh nghiệm thiết kế database đảm bảo hiệu năng cao.

# **VIẾT API (CƠ BẢN) TRONG GOLANG**

- Tìm hiểu REST API convention.
- Các API cơ bản: Create-Read-Update-Delete (CRUD) cơ bản.
- Các API CRUD trên nhiều bảng và transaction.
- Authen với JWT, cách sử dụng JWT để xác thực người dùng.

# **VIẾT API (MỞ RỘNG) TRONG GOLANG**

- Sử dụng middleware: tiền xử lý, xác thực quyền hạn, bắt lỗi crash.
- Upload files: xử lý, lưu trữ với các cloud storage (AWS S3) và CDN.
- Giao tiếp API giữa các module.
- Tổng hợp và link data các module.
- Bonus: Cách thiết kế giảm lệ thuộc giữa các module, tăng tốc xử lý, chống leak memory.

# **ASYNC HANDLERS, XỬ LÝ SIDE EFFECT TRONG GOLANG**

- Cách xây dựng async job trong Golang.
- Giải quyết timeout, retry cho async job.
- Đồng bộ dữ liệu với các async job.
- Pub / Sub trong Golang.
- Xây dựng async job queue & message broker.

# **TRIỂN KHAI (DEPLOY) & MONITORING**

- Log system trong Golang.
- Cơ chế tự động phục hồi kết nối DB (resilience).
- Cách sử dụng environment trong Golang.
- Build & Deploy với Docker.
- Sử dụng nginx (container Docker) làm reverse proxy.
- **Bonus**: Monitoring & Tracing.

# **SỬ DỤNG GRPC ĐỂ TĂNG TẢI SERVICE**

- Giới thiệu gRPC.
- Lập trình Protobuf 3.
- Tạo các service sử dụng gRPC cơ bản.
- gRPC streaming.
- Sử dụng gRPC Gateway để hỗ trợ thêm REST API.
- **Bonus**: Các kinh nghiệm xử lý gRPC trong thực tế.

# **MICROSERVICE CƠ BẢN (KHOÁ LIVESTREAM MỚI)**

- Hiểu rõ về Stateless service.
- Phân tách và deploy nhiều Microservices với API Gateway.
- Sử dụng Redis và NATs để tăng tải các services.
- Một số kinh nghiệm xử lý các vấn đề trong Microservice.
- Kiến trúc Clean Architecture, kết nối các services với gRPC.
- Sử dụng ServiceContext để quản lý ENV và các plugins.

# **CÁC KỸ NĂNG KHÁC**

- Tư duy backend và hệ thống.
- Thuật toán & cấu trúc dữ liệu cơ bản.
- Xây dựng profile Github.
- Quản lý dự án, teamwork.
- Kiến trúc ứng dụng và các design pattern thường gặp trong Golang.
- Xây dựng CV để ứng tuyển vị trí Golang (có hỗ trợ review trainee, interview thử).

# **DEVOPS CƠ BẢN (KHOÁ LIVESTREAM MỚI)**

- Kinh nghiệm tăng tải hệ thống **100K CCU**.
- **Monitoring** các chỉ số hệ thống.
- Kiến trúc dễ dàng phân tách **Microservices**.
- **Distributed Tracing** để tìm nút thắc cổ chai trong hệ thống.
- Hệ thống **logging** cơ bản.
