---
area: technology
domain: backend
topic: database
type: resource
---
# Apache Pinot

Cơ sở dữ liệu phân tán mã nguồn mở, được tạo ra tại LinkedIn vào giữa năm 2010, open-source vào năm 2015, tặng cho Apache Foundation vào năm 2019.

## Đặc điểm

- Thiết kế cho phân tích dữ liệu thời gian thực (OLAP - Online Analytical Processing)
- **Khả năng mở rộng**: Mở rộng theo chiều ngang bằng cách chia nhỏ dữ liệu thành các phân vùng và phân phối trên nhiều nút
- **Truy vấn nhanh**: Sử dụng định dạng lưu trữ dạng cột (columnar storage), chỉ đọc các cột liên quan đến truy vấn, giảm thiểu lượng dữ liệu cần xử lý
- **Xử lý thời gian thực**: Hỗ trợ ingestion và truy vấn dữ liệu real-time với độ trễ thấp

## Kỹ thuật tối ưu hóa

- **Inverted Index**: Cấu trúc dữ liệu giúp tìm kiếm nhanh, giống như mục lục sách, cho phép nhanh chóng xác định tệp phân đoạn và hàng chứa dữ liệu cho từng giá trị cụ thể
- **Bloom Filter**: Công cụ kiểm tra nhanh xem một phần tử có khả năng nằm trong tập hợp dữ liệu hay không, giúp bỏ qua các tệp phân đoạn không chứa dữ liệu cần tìm, tiết kiệm thời gian và tài nguyên
- **Data Sorting**: Sắp xếp dữ liệu theo cột thường được truy vấn để giảm thiểu số lượng tệp phân đoạn được truy cập

## Case Study: Uber Job Counting

- **Bài toán**: Đếm số lượng chuyến đi của từng tài xế trong các khoảng thời gian khác nhau (ngày, tuần, tháng) với hơn 150 triệu người dùng và gần 10 tỷ chuyến đi/năm
- **Thách thức**:
  - Lượng dữ liệu khổng lồ, hàng triệu chuyến đi mỗi ngày
  - Yêu cầu truy vấn và phân tích dữ liệu thời gian thực với độ trễ thấp
  - Dữ liệu được lưu trữ trên các máy chủ khác nhau
- **Giải pháp với Apache Pinot**:
  - Sử dụng inverted index cho các cột `provider_id` và `requester_id` để tăng tốc độ truy vấn
  - Bật bloom filter cho từng tệp phân đoạn dựa trên `provider_id` và `requester_id` để loại bỏ các tệp không liên quan
  - Sắp xếp dữ liệu theo cột `provider_id` để các chuyến đi của cùng một tài xế trong cùng một ngày được đặt trong cùng một tệp phân đoạn, giảm số lượng tệp cần truy cập
- **Xử lý request đột biến**: Áp dụng kỹ thuật "jitter" (độ nhiễu) - thêm khoảng thời gian ngẫu nhiên vào thời gian chờ giữa các lần thử lại khi gặp lỗi, giúp các yêu cầu không dồn dập cùng lúc, giảm tải cho hệ thống
- [Tài liệu](https://viblo.asia/p/job-counting-bai-toan-hoc-bua-ma-uber-giai-quyet-trong-tich-tac-018J2KDRLYK)
- [Bài viết từ Uber](https://www.uber.com/en-VN/blog/job-counting-at-scale/)

## Resources

- [Website](https://pinot.apache.org/)
