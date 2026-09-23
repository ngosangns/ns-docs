---
area: technology
domain: webrtc
type: guide
title: WebRTC
description: An overview of WebRTC covering its core APIs, signaling, connection setup, NAT traversal, security, libraries and best practices for real-time browser communication.
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - webrtc
  - frontend
resource: https://webrtc.org/
---

# WebRTC

## Overview

WebRTC (Web Real-Time Communication) is a technology that lets browsers and applications stream audio, video, and data directly to each other without plugins or native apps.

## Characteristics

- **P2P communication**: direct connection between peers
- **No plugins**: native browser support
- **Secure**: DTLS and SRTP encryption
- **Low latency**: real-time communication
- **Cross-platform**: works on browsers and mobile
- **Open source**: free and an open standard

## Use Cases

- Video conferencing
- Voice calls (VoIP)
- Live streaming
- File sharing
- Screen sharing
- IoT device communication
- Online gaming

## Core Components

### MediaStream (getUserMedia)

- Access the camera and microphone
- Capture the screen

```javascript
navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(stream => {
  videoElement.srcObject = stream
})
```

### RTCPeerConnection

- Core interface for P2P connections
- Handles audio, video, and data
- Manages NAT traversal

```javascript
const pc = new RTCPeerConnection()
pc.addStream(stream)
```

### RTCDataChannel

- Bidirectional data transfer
- Low latency
- Ordered or unordered delivery

```javascript
const channel = pc.createDataChannel("chat")
channel.send("Hello!")
```

## Signaling

WebRTC does not define a signaling mechanism, but one is needed to:

- Exchange session descriptions (SDP)
- Exchange ICE candidates
- Coordinate communication

### Common Signaling Methods

- WebSocket
- SSE (Server-Sent Events)
- HTTP polling
- SIP over WebSocket

## Connection Establishment

### Create Offer

```javascript
const offer = await pc.createOffer()
await pc.setLocalDescription(offer)
// Send offer to remote peer via signaling server
```

### Create Answer

```javascript
await pc.setRemoteDescription(offer)
const answer = await pc.createAnswer()
await pc.setLocalDescription(answer)
// Send answer back via signaling server
```

### ICE Candidate Exchange

```javascript
pc.onicecandidate = event => {
  if (event.candidate) {
    // Send candidate to remote peer
  }
}
```

## NAT Traversal

### STUN (Session Traversal Utilities for NAT)

- Discovers the public IP and port
- Works with 70-80% of NATs

### TURN (Traversal Using Relays around NAT)

- Relay server for media
- Fallback when P2P fails
- Higher latency, more bandwidth

### ICE (Interactive Connectivity Establishment)

- Automatically selects the best path
- Tries STUN first, then TURN if needed

## Security

- **DTLS**: Datagram TLS for data channels
- **SRTP**: Secure Real-time Transport Protocol for media
- **End-to-end encryption**: media is encrypted between peers

## Libraries And Frameworks

- **Simple-Peer**: simplified WebRTC wrapper
- **PeerJS**: complete P2P framework
- **Jitsi Meet**: open-source video conferencing
- **Twilio**: commercial WebRTC platform
- **Agora**: real-time engagement platform

## Best Practices

- Handle connection failures gracefully
- Implement reconnection logic
- Test on different networks (corporate, mobile, etc.)
- Monitor bandwidth and quality
- Use TURN servers for corporate networks
- Implement proper error handling

## Resources

- [WebRTC Official](https://webrtc.org/)
- [WebRTC Samples](https://webrtc.github.io/samples/)
- [MDN WebRTC Documentation](https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API)

> **See also:** [Frontend Overview](/Technology/Frontend/Resources/Frontend Overview) · [Web And Desktop Frameworks](/Technology/Frontend/Tools/Web And Desktop Frameworks)
