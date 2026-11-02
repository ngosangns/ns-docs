---
area: technology
domain: iot
type: resource
title: Development Tools
description: Curated list of firmware development tools and edge AI projects for building IoT devices.
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - iot
  - firmware
---

# Development Tools

These tools cover firmware development and edge AI for IoT devices. PlatformIO is a cross-platform IDE for embedded development. Arduino IDE is a simple option for beginners. ESP-IDF is the official framework for ESP32. ESPHome uses YAML-based configuration for ESP8266 and ESP32.

RuView is a WiFi sensing platform that uses ESP32 CSI signals for real-time human pose estimation, vital signs, and presence detection without cameras. Needle is an on-device foundation model shipped as one binary, with a laddered design for very small devices.

## Firmware Development

- **PlatformIO**: Cross-platform IDE for embedded development
- **Arduino IDE**: Simple option for beginners
- **ESP-IDF**: Official framework for ESP32
- **ESPHome**: YAML-based configuration for ESP8266/ESP32 (see [Smart Home](/Technology/IoT/Concepts/Smart Home))

## Edge AI

- https://github.com/ruvnet/RuView — WiFi sensing platform using ESP32 CSI signals for real-time human pose estimation, vital signs, and presence detection without cameras.
- https://github.com/cactus-compute/needle — on-device foundation model for mobiles, wearables, robots, smart home, automotive, and microcontrollers. The whole model is a single 8–29 MB binary (Simple Attention Network) that trades general chat ability for tool calling, structured extraction, and text embedding; laddered architecture lets subnetworks down to 2 layers deploy on very small devices. `pip install cactus-needle`, Apache-2.0.

> **See also:** [Hardware Platforms](/Technology/IoT/Concepts/Hardware Platforms) · [Development Workflow](/Technology/IoT/Concepts/Development Workflow) · [Testing Tools](/Technology/IoT/Resources/Testing Tools)
