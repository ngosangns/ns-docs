---
tags:
  - area/technology
  - domain/iot
  - type/resource
  - lang/vi
---

# Security Considerations

## Các vấn đề bảo mật chính

### Device Security

- Default passwords và credentials yếu
- Firmware không được update
- Lack of encryption
- Physical tampering

### Network Security

- Unencrypted communication
- Weak authentication
- DDoS attacks
- Man-in-the-middle attacks

### Data Security

- Privacy concerns với personal data
- Data breaches
- Unauthorized access

## Best Practices

- **Encryption**: Sử dụng TLS/SSL cho communication
- **Authentication**: Strong passwords, certificates, OAuth
- **Regular updates**: Keep firmware và software up-to-date
- **Network segmentation**: Tách IoT devices vào separate network
- **Local-first**: Ưu tiên local processing thay vì cloud khi có thể (xem [[Smart-Home]])
