---
area: technology
domain: iot
type: resource
lang: vi
created: '2026-04-13'
modified: '2026-04-13'
---

# Messaging Protocols

## MQTT (Message Queuing Telemetry Transport)

- **Lightweight**: Phù hợp cho devices có tài nguyên hạn chế
- **Pub/Sub model**: Devices publish messages và subscribe topics
- **QoS levels**: 0 (at most once), 1 (at least once), 2 (exactly once)
- **Retained messages**: Broker lưu last message cho mỗi topic
- **Will messages**: Gửi message khi device disconnect bất thường
- Phù hợp cho: sensors, remote monitoring, real-time data

## CoAP (Constrained Application Protocol)

- RESTful protocol cho constrained devices
- UDP-based, có thể dùng với DTLS cho security
- Request/Response model tương tự HTTP
- Phù hợp cho: low-power devices, simple REST APIs

## HTTP/HTTPS

- Phổ biến, dễ implement
- Phù hợp cho devices có đủ resources
- Có thể dùng REST APIs hoặc webhooks
- Ví dụ: ESP32 gửi HTTP POST/GET trong [[Technology/IoT/Concepts/smart-home]]

## AMQP (Advanced Message Queuing Protocol)

- Enterprise-grade messaging
- Phù hợp cho complex routing và reliability requirements
- Nặng hơn MQTT, cần nhiều resources