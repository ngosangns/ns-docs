---
tags:
  - area/technology
  - domain/iot
  - type/resource
  - lang/vi
---

# Smart Home

> Tóm tắt từ: https://blog.ngxson.com/building-my-smart-home-part-1 và https://blog.ngxson.com/building-my-smart-home-part-2

## Part 1: Home Assistant

### Tổng quan

- Hệ thống smart home sử dụng **Home Assistant** (hassio) chạy trên Raspberry Pi
- Thiết kế theo mô hình phân lớp giống OSI model để dễ tổ chức và mở rộng

### Kiến trúc 6 lớp

#### Layer 1: Electrical wiring (220V system)

- Hệ thống điện cao áp làm nền tảng
- Một số ổ cắm bóng đèn luôn được cấp điện để điều khiển qua WiFi thay vì công tắc truyền thống
- Vẫn giữ lại vị trí cho công tắc tường để:
  - Dễ dàng revert về setup tiêu chuẩn nếu bán nhà
  - Có thể dùng làm mount cho wireless buttons

#### Layer 2: Low-voltage wiring (12V, 5V, 3.3V, signals)

- Tích hợp 5V USB power trong một số ổ cắm
- Cáp Ethernet khắp căn hộ, hướng tới Power-over-Ethernet (PoE)
- Dây riêng cho một số sensors (ví dụ: door lock sensor)

#### Layer 3: Network layer (LAN, WLAN, RF433, etc.)

- Chủ yếu sử dụng WiFi và **RF433** cho các thiết bị
- RF433 xử lý tất cả các nút bấm (wall-mounted hoặc portable)
- **Lý do chọn RF433 thay vì Zigbee:**
  - Zigbee bị các nhà sản xuất phức tạp hóa với proprietary protocols
  - Zigbee hubs và devices đắt (10€-20€ cho một wall switch)
  - RF433 đơn giản, rẻ (3€-10€ mỗi module), đáng tin cậy, tầm xa tốt, pin lâu (10+ năm)
  - Nhược điểm: không có gateway sẵn cho hassio, nhưng có thể tự build

#### Layer 4: Transport layer (TCP, UDP, Serial, etc.)

- Hầu hết devices dùng HTTP POST/GET cho độ tin cậy
- ESP32 dùng UDP để giảm latency (không có handshake overhead), phù hợp cho real-time inputs như button presses

#### Layer 5: Data layer (schemas, parsing)

- Sensors và buttons gửi events đến custom server dạng JSON
- Post-processing xử lý caching và debouncing, sau đó push lên hassio qua webhooks hoặc REST APIs
- Ví dụ payload từ ESP32:
  ```json
  {
    "event": "rf433_recv",
    "code": 12345678,
    "bits": 24
  }
  ```

#### Layer 6: Automation layer (hassio configs)

- Nơi chứa tất cả rules và automations trong Home Assistant

### Raspberry Pi Setup

- Raspberry Pi 4 (4GB RAM) làm trung tâm hệ thống
- Dùng 128GB USB 3.2 SSD thay vì microSD card (đáng tin cậy và nhanh hơn, vẫn rẻ)
- Cài đặt Home Assistant OS

### Home Assistant Configuration

#### Network Configuration

- Pi kết nối WiFi (không dùng Ethernet để có thể di chuyển)
- Gán static IP để truy cập ổn định
- Setup Cloudflare Tunnel để expose hassio qua internet (không cần VPN)

#### Integrations

- **WiZ lights:** rẻ, màu sắc và độ sáng tốt, có **local API** hoạt động tốt với hassio

#### Custom addons

- Tạo custom addon để xử lý RF433 devices và sensors
- UDP server lắng nghe messages từ ESP32 devices
- Sử dụng Node.js base image
- Logic: nhận UDP packets, parse JSON payload, gửi events đến hassio qua webhooks

## Part 2: ESPHome & RF433

### ESPHome

- Platform open-source đơn giản hóa việc tạo custom firmware cho ESP8266 và ESP32
- Cho phép define device configuration bằng YAML files, dễ tích hợp với hassio
- Có thể viết custom C++ code cho các tính năng đặc biệt

### First ESPHome Node

- **Mục đích:**
  1. Phát hiện cửa có khóa hay không bằng infrared proximity sensor (LM393)
  2. Điều khiển interphone, mô phỏng nhấn phím bằng optocoupler (PC817) để mở cửa từ xa
- **Logic:**
  - Khi proximity sensor phát hiện lock pin → bật green LED
  - Khi không phát hiện lock pin → bật red LED
  - Khi bật "Interphone Auto Unlock" trong hassio → mỗi 10 giây sẽ mô phỏng: pick up → wait → unlock → wait → hang up

### RF433 Gateway Implementation

#### Receiving RF433 codes

- Sử dụng ESPHome với RF433 receiver module
- ESP32 nhận RF433 codes và gửi UDP messages đến hassio add-on
- Add-on aggregate messages, debounce, sau đó gửi webhooks đến hassio
- Có thể test bằng cách gửi UDP messages và nhấn buttons trên RF433 remote

#### Custom hassio add-on

- Dockerfile sử dụng Node.js 22.11.0
- Config sử dụng `host_network: true` để nhận UDP packets
- Logic: lắng nghe UDP packets, parse JSON, gửi webhooks đến hassio

#### Sending RF433 codes from hassio

- Sử dụng stdio input của add-on (hơi hacky nhưng hoạt động)
- Add-on lắng nghe lines từ stdin
- Khi nhận line bắt đầu với `send_rf433`, parse code và gửi qua UDP đến ESPHome node
- Từ hassio có thể tạo script để gửi command đến add-on qua stdin

### Kết luận

- ESPHome nodes chịu trách nhiệm nhận và gửi RF433 codes
- Custom hassio add-on aggregate messages và debounce trước khi gửi webhooks
- Hệ thống cho phép điều khiển smart home devices qua RF433 một cách đáng tin cậy và rẻ
