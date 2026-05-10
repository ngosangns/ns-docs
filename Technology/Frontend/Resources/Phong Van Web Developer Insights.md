---
area: technology
domain: frontend
topic: javascript
type: resource
---
# Phỏng vấn Web Developer - Insights

> **Nguồn**: Phỏng vấn David Walsh với Web Developer tại Pornhub (10/2019)  
> **Link gốc**: https://davidwalsh.name/pornhub-interview

## Development Process

### Placeholders & Content

- Không sử dụng placeholder images/videos khi phát triển
- Tập trung vào code và functionality
- Team đã quen với nội dung sau thời gian làm việc

### Video Player Development

- Player được chia thành 2 thành phần:
  - Core player: triển khai chức năng cơ bản và events
  - Development trong môi trường cách ly (clean room)
- Tích hợp quảng cáo và third-party code thực tế để phát hiện lỗi sớm
- Làm việc với bên quảng cáo để tự kích hoạt events khi cần

## Performance Monitoring

### Hệ thống đo lường

- **Video player metrics**: Hiệu suất phát video và mức độ sử dụng
- **RUM (Real User Monitoring)**: Đo hiệu năng toàn trang từ bên thứ ba
- **WebPageTest private instances**:
  - Chạy script tests tại AWS data centers
  - Xem xét sự kiện tại thời điểm cụ thể
  - Xem "waterfall" từ các vị trí và providers khác nhau

## Video Player

### Quản lý

- Có team riêng chuyên trách phát triển video player
- Ưu tiên: giám sát hiệu năng và độ hiệu quả liên tục
- Sử dụng đầy đủ công cụ: browser performance tools, web page tests, metrics
- Đảm bảo ổn định qua quy trình QA kỹ lưỡng

### Tính năng

- Tích hợp quảng cáo trước video
- Đánh dấu các khoảnh khắc nổi bật
- Thay đổi tốc độ phát
- Nhiều tính năng khác

## Technology Stack Evolution

### CSS

- Từ CSS thuần → LESS và Mixins
- Grid system linh hoạt với media queries
- `<picture>` element cho nhiều độ phân giải và kích thước màn hình

### JavaScript

- Loại bỏ dần jQuery và jQueryUI
- Quay lại vanilla JavaScript (lập trình hướng đối tượng hiệu quả)
- Thử nghiệm các framework mới

### Web APIs được sử dụng

- **IntersectionObserver**: Lazy loading images tối ưu
- **Picture-in-Picture API**: Thử nghiệm floating video (để thu thập feedback)

## Web APIs cần cải thiện

### Beacon API

- Gặp vấn đề trên iOS
- Không hoạt động đúng với sự kiện `pageHide`

### Fetch API

- Không hỗ trợ theo dõi tiến trình tải về (download progress)
- Không cung cấp cách để intercept các request

### WebRTC

- Simulcast layers vẫn bị giới hạn
- Kể cả khi dùng để chia sẻ màn hình, nếu độ phân giải không đủ lớn

### Service Workers

- `navigator.serviceWorker.register` không bị chặn bởi bất kỳ Fetch event handler nào trong Service Worker

## WebXR/VR

- Đang nghiên cứu WebXR và spatial computing
- Nền tảng lớn đầu tiên hỗ trợ VR, computer vision, và virtual performers
- Tiếp tục thúc đẩy công nghệ mới và open web
- Vẫn trong giai đoạn khám phá nội dung và nền tảng cho môi trường mới

## Desktop vs Mobile

### Khác biệt chính

- Giới hạn bởi hệ điều hành và loại trình duyệt
- iOS và Android có tập hợp quyền truy cập và tính năng khác nhau

### Ví dụ cụ thể

- **iOS**: Một số thiết bị không cho phép custom video player khi fullscreen, bắt buộc dùng native QuickTime player
- **Android**: Cho phép toàn quyền kiểm soát, có thể triển khai đầy đủ tính năng trong Fullscreen mode
- **HLS streaming**: IE và Edge kén chọn về chất lượng HLS. Trong một số trường hợp phải chặn higher qualities để tránh video bị giật và lỗi hình ảnh

## Browser Support

- Đã ngừng hỗ trợ các phiên bản IE cũ hơn IE11
- Đã ngừng sử dụng Flash cho video player
- Tập trung chủ yếu: Chrome, Firefox, Safari

## Technical Stack

### Backend

- **Web Server**: Nginx
- **Language**: PHP
- **Database**: MySQL
- **Caching**: Memcached và/hoặc Redis
- **Tùy chọn**: Varnish, ElasticSearch, Node.js, Go, Vertica

### Frontend

- **JavaScript**: Vanilla JavaScript (đang loại bỏ jQuery)
- **Framework**: Thử nghiệm Vue.js

## Product Differentiation

### Khác biệt giữa các trang web người lớn

- **Thư viện nội dung**: Mỗi thương hiệu có nét riêng
- **UX và tính năng**: Trải nghiệm người dùng khác biệt
- **Thuật toán**: Nhiều thuật toán khác nhau để phân phối và đề xuất nội dung độc đáo

## Team & Collaboration

### Team size

- Kích thước team ở mức trung bình so với quy mô sản phẩm

### Collaboration

- Làm việc chặt chẽ với: Backend developers, QA testers, Product managers
- Giao tiếp: Trao đổi trực tiếp tại bàn làm việc, MS Teams, Email

## Work Environment

### Văn hóa

- Không khí thoải mái và thân thiện
- Không khác biệt lớn so với agency khác
- Quy mô lớn hơn nhiều so với các nơi làm việc trước đó

### Động lực

- Thách thức công nghệ hấp dẫn
- Hàng triệu người tương tác với tính năng do mình xây dựng
- Sự ổn định nghề nghiệp (ngành không bao giờ biến mất)

### Stigma

- Tự hào về sản phẩm
- Người thân biết và tò mò
- Chủ đề thú vị để trò chuyện

## Key Takeaways

- Đi đầu trong xu hướng và thay đổi lớn trong công nghệ
- Công việc luôn thú vị và đầy thử thách
- Cảm giác phấn khích khi xây dựng trải nghiệm cho sản phẩm có lượng truy cập khổng lồ
- Source code chứa nhiều kiến thức quý giá về tối ưu hiệu năng và thủ thuật thông minh