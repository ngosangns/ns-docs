---
area: technology
domain: iot
type: guide
title: Communication Protocols
description: Overview of short-range, long-range, and wired connectivity protocols used in IoT and when to choose each.
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - iot
---

# Communication Protocols

Links are short-range, long-range, or wired. WiFi 802.11 moves a lot of data at high power. Bluetooth and BLE are battery-efficient for wearables and mobile devices. Zigbee is a battery-efficient mesh for the smart home. Proprietary protocols can complicate Zigbee. Z-Wave is similar to Zigbee but has a license fee. RF433 is simple and cheap, with long battery life and good range. It suits buttons and simple sensors, and that line points at Smart Home. LoRaWAN covers several km for smart city and agriculture. NB-IoT is the cellular option for wide coverage. Sigfox is low-power and long-range for simple sensors. Ethernet can use Power over Ethernet. RS-485 and Modbus are industrial protocols.

## Wireless Protocols

### Short-range

- **WiFi (802.11)**: High bandwidth, suited to devices that move a lot of data, but high power consumption
- **Bluetooth/BLE**: Battery-efficient, suited to wearables and mobile devices
- **Zigbee**: Mesh network, battery-efficient, suited to smart home, but can be complicated by proprietary protocols
- **Z-Wave**: Similar to Zigbee, but with a license fee
- **RF433**: Simple, cheap, long battery life, good range, suited to buttons and simple sensors (see [Smart Home](/Technology/IoT/Concepts/Smart Home))

### Long-range

- **LoRaWAN**: Range of several km, battery-efficient, suited to smart city and agriculture
- **NB-IoT**: Cellular-based, suited to devices that need wide coverage
- **Sigfox**: Low-power, long-range, suited to simple sensors

## Wired Protocols

- **Ethernet**: Reliable, high bandwidth, can use PoE (Power over Ethernet)
- **RS-485**: Serial communication, suited to industrial applications
- **Modbus**: Widely used industrial protocol

> **See also:** [Messaging Protocols](/Technology/IoT/Concepts/Messaging Protocols) · [Smart Home](/Technology/IoT/Concepts/Smart Home) · [Industrial IoT](/Technology/IoT/Practices/Industrial IoT)
