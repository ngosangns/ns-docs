---
area: technology
domain: iot
type: guide
title: Data Formats
description: Comparison of payload serialization formats for IoT, from human-readable JSON to compact binary formats like CBOR.
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - iot
---

# Data Formats

## JSON

- Human-readable, easy to parse
- Suited to HTTP APIs
- Example: an ESP32 sending a JSON payload in [Smart Home](/Technology/IoT/Concepts/Smart Home)

## MessagePack

- Binary format, more compact than JSON
- Suited to bandwidth-limited connections

## Protocol Buffers

- Efficient binary serialization
- Strong typing, schema evolution
- Suited to high-performance applications

## CBOR (Concise Binary Object Representation)

- Binary format similar to JSON
- Suited to CoAP and constrained devices

> **See also:** [Messaging Protocols](/Technology/IoT/Concepts/Messaging Protocols) · [Communication Protocols](/Technology/IoT/Concepts/Communication Protocols)
