---
area: technology
domain: iot
type: resource
lang: vi
created: '2026-04-13'
modified: '2026-04-13'
---

# Data Formats

## JSON

- Human-readable, dễ parse
- Phù hợp cho HTTP APIs
- Ví dụ: ESP32 gửi JSON payload trong [[Technology/IoT/Concepts/smart-home]]

## MessagePack

- Binary format, nhỏ gọn hơn JSON
- Phù hợp cho bandwidth-limited connections

## Protocol Buffers

- Efficient binary serialization
- Strong typing, schema evolution
- Phù hợp cho high-performance applications

## CBOR (Concise Binary Object Representation)

- Binary format tương tự JSON
- Phù hợp cho CoAP và constrained devices