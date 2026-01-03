---
tags:
  - area/technology
  - domain/tools
  - type/resource
  - lang/vi
---

# 1. Resources

- Thiết kế hệ thống logging: https://viblo.asia/p/thiet-ke-he-thong-logging-vlZL98gBJQK
- Các cách thiết kế hệ thống logging trong microservice: https://viblo.asia/p/log-tap-trung-la-gi-tai-sao-can-trong-microservices-phan-1-018J2yNe4YK

# 2. Các logging collection service

- **Fluent Bit**: Fluent Bit là phiên bản nhẹ của Fluentd, được tối ưu hóa cho hiệu suất và sử dụng ít tài nguyên. Fluentd cung cấp nhiều tính năng hơn và phù hợp cho các hệ thống lớn và phức tạp.
- **Fluentd**: Fluentd hỗ trợ nhiều plugin hơn so với Fluent Bit, giúp dễ dàng mở rộng các chức năng như parsing, formatting, hay output. Fluent Bit vẫn hỗ trợ nhiều plugin, nhưng ít hơn so với Fluentd.
- **Logstash**: Logstash là một phần của Elastic Stack và được thiết kế để xử lý, lọc, và định dạng log trước khi gửi đến Elasticsearch hoặc các hệ thống khác. Logstash có hệ thống plugin phong phú và có khả năng xử lý phức tạp hơn với nhiều tùy chọn về filter, input, và output.
