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

Xem thêm ví dụ thực tế về triển khai IoT trong [[Technology/Smart Home.md|Smart Home]].

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

## Communication Protocols

### Wireless Protocols

#### Short-range

- **WiFi (802.11)**: Băng thông cao, phù hợp cho devices cần nhiều data, tiêu thụ điện năng cao
- **Bluetooth/BLE**: Tiết kiệm pin, phù hợp cho wearables và devices di động
- **Zigbee**: Mesh network, tiết kiệm pin, phù hợp cho smart home, nhưng có thể phức tạp với proprietary protocols
- **Z-Wave**: Tương tự Zigbee, nhưng có license fee
- **RF433**: Đơn giản, rẻ, pin lâu, tầm xa tốt, phù hợp cho buttons và sensors đơn giản (xem [[Technology/Smart Home.md|Smart Home]])

#### Long-range

- **LoRaWAN**: Tầm xa vài km, tiết kiệm pin, phù hợp cho smart city và agriculture
- **NB-IoT**: Cellular-based, phù hợp cho devices cần coverage rộng
- **Sigfox**: Low-power, long-range, phù hợp cho simple sensors

### Wired Protocols

- **Ethernet**: Đáng tin cậy, băng thông cao, có thể dùng PoE (Power over Ethernet)
- **RS-485**: Serial communication, phù hợp cho industrial applications
- **Modbus**: Industrial protocol phổ biến

## Hardware Platforms

### Microcontrollers

#### ESP32/ESP8266

- WiFi và Bluetooth tích hợp
- Rẻ, dễ phát triển
- Phù hợp cho smart home và DIY projects
- Có thể dùng ESPHome để tạo custom firmware (xem [[Technology/Smart Home.md|Smart Home]])

#### Arduino

- Ecosystem lớn, nhiều shields và libraries
- Phù hợp cho prototyping và education
- Cần thêm module WiFi/Bluetooth nếu cần connectivity

#### Raspberry Pi

- Full Linux OS
- Phù hợp cho gateway, edge computing, và home automation hubs
- Có thể chạy Home Assistant (xem [[Technology/Smart Home.md|Smart Home]])

#### STM32

- ARM Cortex-M, hiệu năng cao
- Phù hợp cho industrial và embedded applications

### Single-board Computers

- **Raspberry Pi**: Phổ biến nhất cho IoT gateways
- **BeagleBone**: Phù hợp cho industrial applications
- **Jetson Nano**: Phù hợp cho AI/ML tại edge

## IoT Platforms và Tools

### Open-source Platforms

#### Home Assistant

- Platform tự host cho smart home
- Hỗ trợ nhiều integrations
- Có thể mở rộng với custom add-ons
- Xem chi tiết triển khai trong [[Technology/Smart Home.md|Smart Home]]

#### ESPHome

- Tạo custom firmware cho ESP8266/ESP32 bằng YAML
- Tích hợp tốt với Home Assistant
- Dễ dàng thêm custom C++ code khi cần

#### OpenHAB

- Tương tự Home Assistant, nhưng dùng Java
- Hỗ trợ nhiều protocols và devices

### Cloud Platforms

#### AWS IoT Core

- Device management, message broker
- Rules engine để xử lý data
- Integration với các AWS services khác

#### Google Cloud IoT

- Device management và data ingestion
- Integration với BigQuery, Cloud Functions

#### Azure IoT Hub

- Device management, bi-directional communication
- Integration với Azure services

#### ThingsBoard

- Open-source IoT platform
- Device management, data visualization, rule engine

## Security Considerations

### Các vấn đề bảo mật chính

#### Device Security

- Default passwords và credentials yếu
- Firmware không được update
- Lack of encryption
- Physical tampering

#### Network Security

- Unencrypted communication
- Weak authentication
- DDoS attacks
- Man-in-the-middle attacks

#### Data Security

- Privacy concerns với personal data
- Data breaches
- Unauthorized access

### Best Practices

- **Encryption**: Sử dụng TLS/SSL cho communication
- **Authentication**: Strong passwords, certificates, OAuth
- **Regular updates**: Keep firmware và software up-to-date
- **Network segmentation**: Tách IoT devices vào separate network
- **Local-first**: Ưu tiên local processing thay vì cloud khi có thể (xem [[Technology/Smart Home.md|Smart Home]])

## Messaging Protocols

### MQTT (Message Queuing Telemetry Transport)

- **Lightweight**: Phù hợp cho devices có tài nguyên hạn chế
- **Pub/Sub model**: Devices publish messages và subscribe topics
- **QoS levels**: 0 (at most once), 1 (at least once), 2 (exactly once)
- **Retained messages**: Broker lưu last message cho mỗi topic
- **Will messages**: Gửi message khi device disconnect bất thường
- Phù hợp cho: sensors, remote monitoring, real-time data

### CoAP (Constrained Application Protocol)

- RESTful protocol cho constrained devices
- UDP-based, có thể dùng với DTLS cho security
- Request/Response model tương tự HTTP
- Phù hợp cho: low-power devices, simple REST APIs

### HTTP/HTTPS

- Phổ biến, dễ implement
- Phù hợp cho devices có đủ resources
- Có thể dùng REST APIs hoặc webhooks
- Ví dụ: ESP32 gửi HTTP POST/GET trong [[Technology/Smart Home.md|Smart Home]]

### AMQP (Advanced Message Queuing Protocol)

- Enterprise-grade messaging
- Phù hợp cho complex routing và reliability requirements
- Nặng hơn MQTT, cần nhiều resources

## Use Cases

### Smart Home

- Home automation và control
- Energy management
- Security và monitoring
- Xem chi tiết triển khai trong [[Technology/Smart Home.md|Smart Home]]

### Industrial IoT (IIoT)

- Predictive maintenance
- Asset tracking
- Quality control
- Supply chain optimization

### Smart City

- Traffic management
- Waste management
- Environmental monitoring
- Public safety

### Agriculture

- Precision farming
- Livestock monitoring
- Irrigation control
- Weather monitoring

### Healthcare

- Remote patient monitoring
- Wearable health devices
- Medication adherence
- Hospital asset tracking

### Retail

- Inventory management
- Customer analytics
- Smart shelves
- Supply chain tracking

## Edge Computing

### Lợi ích

- **Low latency**: Xử lý tại chỗ, không cần gửi lên cloud
- **Bandwidth savings**: Giảm lượng data cần truyền
- **Privacy**: Data không rời khỏi local network
- **Reliability**: Hoạt động ngay cả khi mất kết nối internet
- **Cost**: Giảm cloud storage và processing costs

### Edge Devices

- **Gateways**: Raspberry Pi, industrial gateways
- **Edge servers**: Mini data centers tại edge
- **Fog computing**: Intermediate layer giữa edge và cloud

### Use Cases cho Edge

- Real-time control (như button presses trong [[Technology/Smart Home.md|Smart Home]])
- Local automation rules
- Data filtering và aggregation trước khi gửi cloud
- Offline operation

## Data Formats

### JSON

- Human-readable, dễ parse
- Phù hợp cho HTTP APIs
- Ví dụ: ESP32 gửi JSON payload trong [[Technology/Smart Home.md|Smart Home]]

### MessagePack

- Binary format, nhỏ gọn hơn JSON
- Phù hợp cho bandwidth-limited connections

### Protocol Buffers

- Efficient binary serialization
- Strong typing, schema evolution
- Phù hợp cho high-performance applications

### CBOR (Concise Binary Object Representation)

- Binary format tương tự JSON
- Phù hợp cho CoAP và constrained devices

## Development Workflow

### Prototyping

1. Chọn hardware platform (ESP32, Arduino, Raspberry Pi)
2. Setup development environment
3. Viết firmware/software
4. Test locally

### Integration

1. Kết nối với IoT platform (Home Assistant, AWS IoT, etc.)
2. Setup communication protocols
3. Implement authentication và security
4. Test end-to-end flow

### Deployment

1. Flash firmware lên devices
2. Configure network settings
3. Register devices với platform
4. Setup monitoring và logging

### Maintenance

1. Monitor device health
2. Update firmware khi cần
3. Handle errors và edge cases
4. Scale system khi cần

## Development Tools

### Firmware Development

- **PlatformIO**: Cross-platform IDE cho embedded development
- **Arduino IDE**: Đơn giản cho beginners
- **ESP-IDF**: Official framework cho ESP32
- **ESPHome**: YAML-based config cho ESP8266/ESP32 (xem [[Technology/Smart Home.md|Smart Home]])

### Testing

- **MQTT clients**: MQTT.fx, MQTT Explorer để test messaging
- **Serial monitors**: Để debug firmware
- **Network analyzers**: Wireshark để analyze network traffic

### Simulation

- **Node-RED**: Visual programming cho IoT flows
- **Cayenne**: Drag-and-drop IoT builder
- **AWS IoT Device Simulator**: Simulate devices trên AWS

## Best Practices cho IoT Development

### Design Principles

- **Local-first**: Xử lý tại edge khi có thể
- **Fail-safe**: Devices nên hoạt động offline khi có thể
- **Security by design**: Bảo mật từ đầu, không phải sau
- **Scalability**: Thiết kế để dễ mở rộng
- **Standardization**: Dùng standard protocols khi có thể

### Performance Optimization

- **Power management**: Sleep modes, wake-on-event
- **Data compression**: Giảm bandwidth usage
- **Caching**: Cache data tại edge để giảm cloud calls
- **Debouncing**: Xử lý duplicate events (như trong [[Technology/Smart Home.md|Smart Home]])

### Monitoring và Debugging

- **Logging**: Structured logging với levels
- **Metrics**: Track device health, connectivity, errors
- **Alerts**: Notify khi có issues
- **Dashboards**: Visualize data và system status
