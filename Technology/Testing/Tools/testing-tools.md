---
area: technology
domain: testing
topic: tools
type: resource
lang: vi
created: '2026-04-13'
modified: '2026-04-13'
---

# Testing tools-utilities

## 1. API & Integration Testing

- **Keploy**: Agent hỗ trợ kiểm thử API, tích hợp và end-to-end (E2E) cho nhà phát triển.
  - Tự động tạo test cases từ API calls thực tế.
  - Tạo mocks/stubs cho APIs.
  - Giảm thời gian viết test thủ công.
  - [GitHub](https://github.com/keploy/keploy) #API-testing #integration-testing #E2E #mocks
- **Appium**: Framework mã nguồn mở để tự động hóa kiểm thử ứng dụng mobile (iOS, Android) và desktop. [GitHub](https://github.com/appium/appium)

## 2. Performance & Load Testing

- **K6**: Công cụ mã nguồn mở viết bằng Go, script bằng JavaScript để kiểm thử hiệu năng API, microservices và website.
  - Hỗ trợ: HTTP/1.1, HTTP/2, gRPC, WebSocket.
  - Các loại test: Load, Stress, Spike, Soak testing.
  - Tích hợp tốt với Prometheus và Grafana.
  - [Trang chủ](https://k6.io/) | [Hướng dẫn nhập môn](https://techmaster.vn/posts/38352/k6-performance-testing-nhap-mon)

## 3. Architecture Testing & Static Analysis

- **ArchUnit (Java)**: Thư viện kiểm tra các quy tắc kiến trúc ứng dụng Java thông qua unit tests. [GitHub](https://github.com/TNG/ArchUnit)
- **SonarQube**: Nền tảng phân tích tĩnh mã nguồn để phát hiện bugs, lỗ hổng bảo mật và các vấn đề về cấu trúc (code smells). [Website](https://www.sonarqube.org/)
- **Structure101 / Lattix**: Các công cụ chuyên sâu để phân tích và hiển thị trực quan các mối quan hệ phụ thuộc trong mã nguồn.

## 4. Web & Browser Testing

- **Browserstack**: Nền tảng đám mây cho phép kiểm thử website và ứng dụng trên hàng ngàn thiết bị và trình duyệt thực.
- **Lightpanda Browser**: Một trình duyệt headless mã nguồn mở được tối ưu cho việc tự động hóa và scraping. [GitHub](https://github.com/lightpanda-io/browser)
- **OpenReplay**: Giải pháp session replay và phân tích sản phẩm có thể tự host, giúp tái hiện lỗi và hiểu hành vi người dùng. [GitHub](https://github.com/openreplay/openreplay)

## 5. Dependency Analysis

- **Doxygen / Graphviz**: Công cụ tự động tạo tài liệu và biểu đồ hóa các mối quan hệ giữa các thành phần trong mã nguồn.