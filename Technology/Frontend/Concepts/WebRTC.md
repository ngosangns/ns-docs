---
area: technology
domain: frontend
topic: webrtc
type: resource
title: Webrtc
description: WebRTC
timestamp: "2026-06-19T13:43:26.144Z"
tags:
  - technology
  - frontend
  - webrtc
resource: https://webrtc.org/
---

# WebRTC

## Tổng quan

WebRTC (Web Real-Time Communication) là một công nghệ cho phép truyền tải audio, video, và data trực tiếp giữa browsers và applications mà không cần plugins hay native apps.

## Đặc điểm

- **P2P communication**: Direct connection giữa peers
- **No plugins**: Native browser support
- **Secure**: DTLS và SRTP encryption
- **Low latency**: Real-time communication
- **Cross-platform**: Works on browsers và mobile
- **Open source**: Free và open standard

## Use cases

- Video conferencing
- Voice calls (VoIP)
- Live streaming
- File sharing
- Screen sharing
- IoT device communication
- Online gaming

## Core Components

### 1. MediaStream (getUserMedia)

- Access camera và microphone
- Capture screen

```javascript
navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(stream => {
  videoElement.srcObject = stream
})
```

### 2. RTCPeerConnection

- Core interface cho P2P connection
- Handle audio, video, và data
- Manage NAT traversal

```javascript
const pc = new RTCPeerConnection()
pc.addStream(stream)
```

### 3. RTCDataChannel

- Bidirectional data transfer
- Low latency
- Ordered hoặc unordered delivery

```javascript
const channel = pc.createDataChannel("chat")
channel.send("Hello!")
```

## Signaling

WebRTC không định nghĩa signaling mechanism, nhưng cần để:

- Exchange session descriptions (SDP)
- Exchange ICE candidates
- Coordinate communication

### Common signaling methods

- WebSocket
- SSE (Server-Sent Events)
- HTTP polling
- SIP over WebSocket

## Connection Establishment

### 1. Create Offer

```javascript
const offer = await pc.createOffer()
await pc.setLocalDescription(offer)
// Send offer to remote peer via signaling server
```

### 2. Create Answer

```javascript
await pc.setRemoteDescription(offer)
const answer = await pc.createAnswer()
await pc.setLocalDescription(answer)
// Send answer back via signaling server
```

### 3. ICE Candidate Exchange

```javascript
pc.onicecandidate = event => {
  if (event.candidate) {
    // Send candidate to remote peer
  }
}
```

## NAT Traversal

### STUN (Session Traversal Utilities for NAT)

- Discover public IP và port
- Works với 70-80% of NATs

### TURN (Traversal Using Relays around NAT)

- Relay server for media
- Fallback khi P2P fails
- Higher latency, more bandwidth

### ICE (Interactive Connectivity Establishment)

- Tự động selection của best path
- Thử STUN trước, TURN nếu cần

## Security

- **DTLS**: Datagram TLS cho data channels
- **SRTP**: Secure Real-time Transport Protocol cho media
- **End-to-end encryption**: Media encrypted between peers

## Libraries & Frameworks

- **Simple-Peer**: Simplified WebRTC wrapper
- **PeerJS**: Complete P2P framework
- **Jitsi Meet**: Open-source video conferencing
- **Twilio**: Commercial WebRTC platform
- **Agora**: Real-time engagement platform

## Best practices

- Handle connection failures gracefully
- Implement reconnection logic
- Test trên different networks (corporate, mobile, etc.)
- Monitor bandwidth và quality
- Use TURN servers cho corporate networks
- Implement proper error handling

## Resources

- [WebRTC Official](https://webrtc.org/)
- [WebRTC Samples](https://webrtc.github.io/samples/)
- [MDN WebRTC Documentation](https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API)
