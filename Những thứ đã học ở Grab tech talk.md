---
tags:
  - concise
  - general
  - grab
  - hoc
  - maintain
  - nhung
  - performance
  - quick-reference
  - talk
  - tech
  - thu
  - upgrade
  - vietnamese
---

# Lựa chọn công nghệ

- Nginx detail metric chỉ nằm trong bản enterprise thôi nên hạn chế dùng khi cần truy xuất lượng metric chi tiết.
- Không nên dùng Kong vì Luascript đã cũ và không có nhiều document trên mạng để tham khảo.
- Nên dùng opensource để tiết kiệm thời gian và hạn chế bug, có thể contribute cho openssource đó.
- Nên lựa chọn API gateway nào có khả năng viết custom logic tốt và có thể truy xuất nhiều metric.
- Envoy là process based. Mỗi request được handle bởi và chỉ một envoy process, liệu có thể chia sẻ bộ nhớ giữa các process hay không thì không rõ. **Tìm hiểu thêm**.
- Sử dụng microservice để tránh việc build lại toàn bộ chương trình khi deploy hay thay đổi.
- Dùng k8s có thể dẫn đến một vài sự cố network nếu không config kĩ. Thế nên api gateway hiện tại đang serve trực tiếp trên EC2 vì lí do stable.

# Thiết kế

- API gateway sẽ kiêm thêm vai trò authorization và authentication.
- Ta có thể chia một chương trình Golang ra làm nhiều file .so để khi code và deploy ta có thể cập nhật nhanh hơn (chỉ cập nhật những module nào có thay đổi). **Tìm hiểu việc giao tiếp giữa các file .so như thế nào.**

# Performance

- Khi share dữ liệu giữa các service, ta có thể share địa chỉ bộ nhớ thay vì copy bộ nhớ để giảm dung lượng. Nhược điểm là phải take care vấn đề lọt bộ nhớ. **Tìm hiểu thêm về việc truy xuất các trường như thế nào? Tố chức interface như thế nào?**
	- Trường hợp sync call: Không cần quan tâm garbage collector vì khi đó hàm chứa biến sẽ đợi giao tiếp xong mới remove.
	- Trường hợp async: Quên rồi. **Tìm hiểu cái này.**

# Maintain

- Cần có một đội theo dõi cập nhật thay đổi của opensource.

# Upgrade

- Khi viết lại một service nào đó, cần triển khai phiên bản mới dưới dạng "shadow" (thực hiện cùng một công việc với phiên bản cũ khi có request đến) và so sánh kết quả. Sau khi chắc chắn service mới có thể hoạt động ổn định thì mới tiến hành cập nhật thay thế phiên bản cũ.
- API gateway là thứ không thể chết. Thế nên luôn có 1 con API gateway dự phòng.
