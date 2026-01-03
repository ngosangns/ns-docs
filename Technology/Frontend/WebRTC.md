---
tags:
  - area/technology
  - domain/frontend
  - topic/webrtc
  - type/resource
  - lang/vi
---

# WebRTC - Web Real-Time Communication

> Nguồn: [Hướng dẫn xây dựng Video Call Webapp đơn giản với WebRTC - Ronin Hub](https://roninhub.com/tai-lieu/bai-viet/huong-dan-xay-dung-video-call-webapp-don-gian-voi-webrtc)

## 1. Giới thiệu về WebRTC

### WebRTC là gì?

WebRTC (Web Real-Time Communication) là một công nghệ mã nguồn mở cho phép truyền thông theo thời gian thực (real-time) giữa các trình duyệt web và ứng dụng di động thông qua giao thức peer-to-peer (P2P), không cần cài đặt plugin hay phần mềm bổ sung.

### Kiến trúc WebRTC

Kiến trúc WebRTC bao gồm các thành phần chính sau:

1. **Signaling Server**
   - Đóng vai trò trung gian kết nối giữa các peer
   - Hỗ trợ trao đổi thông tin về kết nối như địa chỉ IP, ports, và khả năng media
   - Không trực tiếp xử lý dữ liệu media

2. **NAT (Network Address Translation)**
   - Chuyển đổi địa chỉ IP private thành public để có thể giao tiếp qua Internet
   - Là một trong những thách thức chính trong việc thiết lập kết nối P2P

3. **STUN/TURN Server**
   - **STUN (Session Traversal Utilities for NAT)**: Giúp peer xác định địa chỉ IP public và loại NAT
   - **TURN (Traversal Using Relays around NAT)**: Làm relay server khi không thể thiết lập kết nối P2P trực tiếp

4. **Peers (End-points)**
   - Các thiết bị đầu cuối (máy tính, điện thoại) tham gia vào cuộc gọi
   - Trực tiếp trao đổi media streams (audio, video, data) qua kết nối P2P

## 2. Các thành phần kỹ thuật chính của WebRTC

### 2.1. MediaStream (getUserMedia)

- Cho phép truy cập vào camera và microphone của thiết bị
- Tạo luồng media (audio/video) để truyền tải
- Hỗ trợ các constraints để cấu hình chất lượng media

### 2.2. RTCPeerConnection

- Xử lý việc thiết lập kết nối P2P giữa các clients
- Quản lý việc truyền tải media streams
- Xử lý mã hóa và giải mã dữ liệu
- Quản lý băng thông và chất lượng kết nối

### 2.3. RTCDataChannel

- Cho phép truyền tải dữ liệu tùy ý giữa các peers
- Hỗ trợ cả reliable và unreliable data transmission
- Thích hợp cho chat, file sharing, game data, etc.

## 3. Sequence Diagram

Quy trình kết nối WebRTC:

1. Client A yêu cầu media stream (camera/mic)
2. Client A tạo RTCPeerConnection và tạo offer
3. Client A gửi offer qua Signaling Server
4. Signaling Server chuyển offer đến Client B
5. Client B nhận offer, tạo answer
6. Client B gửi answer qua Signaling Server
7. Signaling Server chuyển answer đến Client A
8. Cả hai client trao đổi ICE candidates
9. Thiết lập kết nối P2P và bắt đầu truyền media

## 4. Hướng dẫn xây dựng Video Call Webapp

### 4.1. Cấu trúc project

Project sử dụng Spring Boot 3 làm backend với 2 dependencies chính:

- **Spring Web**: Xử lý HTTP requests và WebSocket
- **WebSocket**: Hỗ trợ kết nối real-time cho signaling

Cấu trúc project bao gồm:

- Backend: Application class, WebSocket configuration, Socket handler để xử lý signaling
- Frontend: HTML file và JavaScript file để xử lý WebRTC client-side

### 4.2. Backend với Spring Boot

#### Application Class

Class chính khởi động Spring Boot application, sử dụng annotation `@SpringBootApplication` để tự động cấu hình và khởi chạy server.

#### WebSocket Configuration

Cấu hình WebSocket để hỗ trợ signaling giữa các clients:

- Sử dụng `@EnableWebSocket` để kích hoạt hỗ trợ WebSocket trong ứng dụng
- Đăng ký endpoint "/socket" để clients có thể kết nối
- Cho phép CORS để các client từ domain khác có thể kết nối

#### Socket Handler

Xử lý WebSocket connections và routing messages giữa các clients:

- Quản lý danh sách các WebSocket sessions đang kết nối
- Xử lý các events từ clients: offer, answer, candidate
- Chuyển tiếp messages giữa các peers thông qua signaling server
- Đảm bảo messages được gửi đến đúng peer đích

### 4.3. Frontend với JavaScript

#### Khởi tạo WebSocket và RTCPeerConnection

Client cần thiết lập hai kết nối chính:

- **WebSocket connection**: Kết nối đến signaling server để trao đổi thông tin signaling (offer, answer, ICE candidates)
- **RTCPeerConnection**: Đối tượng chính của WebRTC để quản lý kết nối P2P, cấu hình với STUN server để xác định địa chỉ IP public

#### Lấy media stream từ camera/mic

Sử dụng `getUserMedia` API để truy cập camera và microphone của thiết bị:

- Yêu cầu quyền truy cập từ người dùng
- Tạo media stream với audio và video
- Gán stream vào video element để hiển thị local video
- Thêm các tracks từ stream vào RTCPeerConnection để có thể truyền tải

#### Xử lý ICE candidates

ICE (Interactive Connectivity Establishment) candidates là các địa chỉ mạng có thể dùng để kết nối:

- Khi RTCPeerConnection tìm thấy candidate mới, event `onicecandidate` được trigger
- Client gửi candidate này qua WebSocket đến signaling server
- Signaling server chuyển tiếp candidate đến peer khác
- Peer nhận được candidate và thêm vào RTCPeerConnection để thiết lập kết nối

#### Xử lý media stream từ peer

Khi kết nối P2P được thiết lập thành công:

- Event `ontrack` được trigger khi nhận được media stream từ peer
- Gán stream vào video element để hiển thị remote video
- Stream này chứa audio và video từ peer khác

#### Xử lý signaling: offer, answer, candidate

Quy trình signaling để thiết lập kết nối:

1. **Handle Offer**:
   - Khi nhận được offer từ peer, client thiết lập remote description
   - Tạo answer và thiết lập local description
   - Gửi answer qua WebSocket đến signaling server

2. **Handle Answer**:
   - Khi nhận được answer, client thiết lập remote description
   - Kết nối P2P được thiết lập thành công

3. **Handle Candidate**:
   - Khi nhận được ICE candidate, client thêm candidate vào RTCPeerConnection
   - Giúp tìm đường kết nối tốt nhất giữa hai peers

#### Tạo cuộc gọi

Để bắt đầu cuộc gọi:

- Client tạo offer bằng cách gọi `createOffer()` trên RTCPeerConnection
- Thiết lập local description với offer vừa tạo
- Gửi offer qua WebSocket đến signaling server
- Signaling server chuyển tiếp offer đến peer khác để bắt đầu quy trình kết nối

## 5. Tổng kết và hướng phát triển

### Tổng kết

Bài viết này giúp xây dựng ứng dụng gọi video cơ bản với WebRTC bằng cách:

- Sử dụng Spring Boot làm signaling server
- Thực hiện kết nối P2P giữa hai clients
- Truyền tải luồng audio/video

### Hướng phát triển

1. **Quản lý phòng (Room Management)**
   - Tạo và quản lý các phòng chat
   - Cho phép nhiều người tham gia cùng một phòng

2. **Bảo mật**
   - Thêm xác thực người dùng
   - Mã hóa đầu cuối (end-to-end encryption)
   - Quản lý phiên đăng nhập

3. **Tính năng chat**
   - Chat text song song với video call
   - Chia sẻ file
   - Emoji và stickers

4. **Xử lý lỗi và phục hồi**
   - Tự động kết nối lại khi mất kết nối
   - Xử lý các trường hợp lỗi

5. **Tính năng nâng cao**
   - Chia sẻ màn hình
   - Ghi âm/video

## Tài liệu tham khảo

- **Code tham khảo**: https://github.com/ronin-engineer-88/webrtc-demo
- **Bài viết gốc**: https://roninhub.com/tai-lieu/bai-viet/huong-dan-xay-dung-video-call-webapp-don-gian-voi-webrtc
- **System Design VN**: https://fb.com/groups/systemdesign.vn
- **Tài liệu khác**: https://roninhub.com/tai-lieu
