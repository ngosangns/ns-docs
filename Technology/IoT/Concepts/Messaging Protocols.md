---
area: technology
domain: iot
type: guide
title: Messaging Protocols
description: Comparison of application-layer messaging protocols for IoT (MQTT, CoAP, HTTP, AMQP) with their features and best-fit scenarios.
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - iot
  - mqtt
---

# Messaging Protocols

MQTT, CoAP, HTTP, and AMQP are the application-layer options here, each with a best fit. MQTT is lightweight pub/sub for constrained devices, sensors, remote monitoring, and real-time data. QoS 0, 1, and 2 mean at most once, at least once, and exactly once. The broker stores the last message for each topic, and a will is sent on an abnormal disconnect. CoAP is UDP-based and RESTful, can use DTLS, and fits low-power devices and simple REST APIs. HTTP and HTTPS suit devices with enough resources, via REST or webhooks, with an ESP32 POST and GET example in Smart Home. AMQP is heavier than MQTT, for complex routing and reliability.

## MQTT (Message Queuing Telemetry Transport)

- **Lightweight**: Suited to resource-constrained devices
- **Pub/Sub model**: Devices publish messages and subscribe to topics
- **QoS levels**: 0 (at most once), 1 (at least once), 2 (exactly once)
- **Retained messages**: The broker stores the last message for each topic
- **Will messages**: Sent when a device disconnects abnormally
- Best for: sensors, remote monitoring, real-time data

## CoAP (Constrained Application Protocol)

- RESTful protocol for constrained devices
- UDP-based, can be used with DTLS for security
- Request/Response model similar to HTTP
- Best for: low-power devices, simple REST APIs

## HTTP/HTTPS

- Ubiquitous and easy to implement
- Suited to devices with enough resources
- Can use REST APIs or webhooks
- Example: an ESP32 sending HTTP POST/GET requests in [Smart Home](/Technology/IoT/Concepts/Smart Home)

## AMQP (Advanced Message Queuing Protocol)

- Enterprise-grade messaging
- Suited to complex routing and reliability requirements
- Heavier than MQTT and needs more resources

> **See also:** [Communication Protocols](/Technology/IoT/Concepts/Communication Protocols) · [Data Formats](/Technology/IoT/Concepts/Data Formats) · [Testing Tools](/Technology/IoT/Resources/Testing Tools)
