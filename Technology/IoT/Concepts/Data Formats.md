---
area: technology
domain: iot
type: resource
title: Data Formats
description: Data Formats
timestamp: '2026-06-19T13:43:26.134Z'
tags:
  - technology
  - iot
---
# Data Formats

## JSON

- Human-readable, dễ parse
- Phù hợp cho HTTP APIs
- Ví dụ: ESP32 gửi JSON payload trong [Smart Home](/Technology/IoT/Concepts/Smart Home)

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