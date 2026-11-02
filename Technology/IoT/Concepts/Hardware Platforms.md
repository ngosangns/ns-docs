---
area: technology
domain: iot
type: guide
title: Hardware Platforms
description: Overview of microcontrollers and single-board computers commonly used for IoT projects and what each is best suited for.
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - iot
  - hardware
---

# Hardware Platforms

Common IoT boards are grouped into microcontrollers and single-board computers. ESP32 and ESP8266 have built-in WiFi and Bluetooth, are called cheap and easy to develop for, and suit smart home and DIY projects. Arduino has many shields and libraries for prototyping and education, and it needs an extra WiFi or Bluetooth module for connectivity. Raspberry Pi runs a full Linux OS for gateways, edge computing, and home automation hubs that can run Home Assistant. It is also listed as the most popular IoT gateway. STM32 is ARM Cortex-M, called high performance, for industrial and embedded applications. BeagleBone suits industrial applications, and Jetson Nano suits AI and ML at the edge.

## Microcontrollers

### ESP32/ESP8266

- Built-in WiFi and Bluetooth
- Cheap and easy to develop for
- Suited to smart home and DIY projects
- Can use ESPHome to build custom firmware (see [Smart Home](/Technology/IoT/Concepts/Smart Home))

### Arduino

- Large ecosystem with many shields and libraries
- Suited to prototyping and education
- Needs an extra WiFi/Bluetooth module if connectivity is required

### Raspberry Pi

- Full Linux OS
- Suited to gateways, edge computing, and home automation hubs
- Can run Home Assistant (see [Smart Home](/Technology/IoT/Concepts/Smart Home))

### STM32

- ARM Cortex-M, high performance
- Suited to industrial and embedded applications

## Single-board Computers

- **Raspberry Pi**: The most popular choice for IoT gateways
- **BeagleBone**: Suited to industrial applications
- **Jetson Nano**: Suited to AI/ML at the edge

> **See also:** [Development Tools](/Technology/IoT/Tools/Development Tools) · [Edge Computing](/Technology/IoT/Concepts/Edge Computing) · [Development Workflow](/Technology/IoT/Concepts/Development Workflow)
