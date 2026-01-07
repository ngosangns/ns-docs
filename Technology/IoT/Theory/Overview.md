---
tags:
  - area/technology
  - domain/iot
  - type/resource
  - lang/vi
---

# IoT (Internet of Things)

## Tổng quan

**Internet of Things (IoT)** là mạng lưới các thiết bị vật lý được kết nối internet, có khả năng thu thập và trao đổi dữ liệu. Các thiết bị này có thể là sensors, actuators, hoặc các thiết bị thông minh khác được nhúng với phần mềm, sensors và kết nối mạng.

Xem thêm ví dụ thực tế về triển khai IoT trong [[Smart-Home]].

## Kiến trúc IoT

### 4 tầng chính

#### 1. Perception Layer (Cảm biến)

- Sensors và actuators
- Thu thập dữ liệu từ môi trường
- Chuyển đổi tín hiệu vật lý thành dữ liệu số

#### 2. Network Layer (Mạng)

- Kết nối các thiết bị với nhau và với cloud
- Protocols: WiFi, Bluetooth, Zigbee, LoRaWAN, RF433, Cellular (4G/5G)
- Gateway devices để bridge giữa local network và internet

#### 3. Processing Layer (Xử lý)

- Edge computing: xử lý dữ liệu tại thiết bị hoặc gateway
- Cloud computing: xử lý và lưu trữ dữ liệu trên cloud
- Data analytics và machine learning

#### 4. Application Layer (Ứng dụng)

- User interfaces
- Dashboards và monitoring
- Automation và control logic
- APIs cho third-party integrations
