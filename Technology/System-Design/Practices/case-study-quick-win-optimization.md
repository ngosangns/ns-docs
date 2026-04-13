---
area: technology
domain: system-design
topic: performance
type: case-study
---
# Case Study: Quick Win Optimization - Sửa tí xíu mà được quá trời

> **Nguồn:** [Tối ưu hệ thống kiểu... lười: Sửa tí xíu mà được quá trời - Viblo](https://viblo.asia/p/toi-uu-he-thong-kieu-luoi-sua-ti-xiu-ma-duoc-qua-troi-Nj4vgpg2J6r) > **Tác giả:** Minh Monmen

## Tổng quan

Bài viết chia sẻ về những thay đổi nhỏ nhưng mang lại hiệu quả lớn trong quá trình tối ưu hệ thống. Hai case studies chính:

## Case Study 1: Giảm 70% CPU - Thay đổi 1 dòng code

### Bối cảnh

- Hệ thống: Vài tỷ requests/ngày
- Chuyển đổi từ NodeJS sang Golang
- Kết quả ban đầu: CPU chỉ giảm 10% (không đạt kỳ vọng)
- Request A chiếm 60-70% số request của hệ thống
- Request A đã được cache hoàn toàn trong memory, không phát sinh query DB
- Latency đã đạt p99 < 10ms (giảm ~96% so với NodeJS là 200ms)

### Vấn đề

- Mục tiêu: Giảm CPU (không phải latency)
- Request A có body rất nhỏ hoặc trống (status 204, 304)
- Phát hiện: Thứ tự xử lý không tối ưu

### Giải pháp

- **Thay đổi thứ tự xử lý:** Kiểm tra điều kiện để trả về response sớm TRƯỚC khi xử lý các logic phức tạp
- Cụ thể: Di chuyển việc kiểm tra điều kiện để return response sớm lên trước các operation tốn CPU
- Chỉ cần thay đổi 1 dòng code (thứ tự), kéo theo vài dòng type thay đổi

### Kết quả

- **Giảm 70% CPU** cho request A
- Nguyên nhân: Tránh được các operation tốn CPU không cần thiết khi request có thể return sớm

### Bài học

- Thứ tự xử lý logic rất quan trọng
- Early return pattern có thể giảm đáng kể CPU usage
- Với hệ thống lớn, mọi optimization nhỏ đều có tác động lớn

## Case Study 2: Giảm 63% Data Transfer - Chuyển CORS header lên Cloudflare

### Bối cảnh

- Hệ thống: 1 tỷ requests/ngày
- Request body nhỏ hoặc trống (status 204, 304)
- Mỗi request chỉ khoảng vài trăm bytes đến 1KB

### Vấn đề

- CORS headers được thêm vào mỗi response:
  ```
  access-control-allow-origin: *
  access-control-allow-methods: GET,POST,DELETE,PUT,PATCH,OPTIONS
  access-control-allow-headers: DNT,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range,Authorization
  access-control-max-age: 86400
  ```
- Header này chiếm ~300 bytes mỗi request
- Với hệ thống lớn: 300 bytes × 1 tỷ req/ngày × 30 ngày = **810$/tháng** chỉ cho CORS headers

### Giải pháp

- Chuyển toàn bộ xử lý CORS header và CORS preflight request lên **Cloudflare**
- Sử dụng tính năng **Cloudflare Snippet** (giống mini version của Cloudflare Worker)
- Yêu cầu: Domain phải đăng ký gói Pro (20$/tháng) của Cloudflare
- Setup: Chỉ mất khoảng 5 phút

### Kết quả

- **Giảm 63% data transfer out** (chỉ còn 1/3 so với trước)
- Tiết kiệm hàng ngàn đô data transfer cost
- Cloudflare xử lý CORS ở edge, không tốn bandwidth từ origin server

### Bài học

- Với hệ thống lớn, mọi byte đều quan trọng
- Edge computing có thể giảm đáng kể data transfer
- Cloudflare Snippet là giải pháp cost-effective cho các tác vụ đơn giản như thêm headers

## Các case studies khác được đề cập (chưa chi tiết)

- **Giảm 90% băng thông Redis** (từ 1Gbps về 100Mbps) sau khi tăng thời gian của memory cache
- **Giảm 99% tải cho Redis** (20k RPS về 200 RPS) sau khi thêm bloomfilter vào việc check blacklist
- **Giảm 100% random 5xx** (15k req/day) sau khi sửa keep-alive timeout của NodeJS

## Phương pháp tiếp cận

Những quick wins này không phải may mắn mà đến từ:

1. **Monitoring toàn diện**
   - Xây dựng hệ thống monitoring chi tiết và đầy đủ
   - Phát hiện bất kỳ điểm bất thường nào

2. **Ưu tiên hóa vấn đề**
   - Sắp xếp, thiết đặt mức độ ưu tiên dựa trên ảnh hưởng
   - Tập trung vào critical path (điểm có ảnh hưởng lớn nhất)

3. **Rà soát tỉ mỉ**
   - Không bỏ qua những khả năng đơn giản
   - Đặc biệt quan trọng trong hệ thống lớn
   - Những thay đổi nhỏ có thể có tác động lớn khi scale lên

## Kết luận

- Có rất nhiều thay đổi đơn giản nhưng hiệu quả lớn
- Nguyên nhân thường đến từ những điều nhỏ nhặt mà người ta thường bỏ qua
- Đầu tư bài bản vào monitoring và phương pháp tiếp cận có hệ thống là chìa khóa