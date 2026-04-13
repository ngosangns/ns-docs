---
area: technology
domain: system-design
type: note
---
```ngosangns-obsidian/technology/system-design/azure-design-patterns/Geode Pattern.md#L1-51
# Geode Pattern (Mô hình Geode)

**Geode (Geographical Nodes)** là mô hình triển khai một tập hợp các dịch vụ backend vào các nút địa lý (nodes), trong đó mỗi nút có thể phục vụ bất kỳ yêu cầu nào từ bất kỳ khách hàng nào ở bất kỳ khu vực nào.

## Tóm tắt nội dung (Bullet List)

- **Cơ chế hoạt động (Active-Active):** Triển khai dịch vụ tại nhiều khu vực địa lý khác nhau. Mỗi "geode" là một bản sao đầy đủ, tự vận hành và không phụ thuộc vào các geode khác.
- **Đưa tính toán đến gần dữ liệu (Bring compute to data):** Thay vì đưa dữ liệu về một trung tâm xử lý duy nhất, mô hình này đặt tài nguyên tính toán ngay tại nơi lưu trữ dữ liệu đã được sao chép toàn cầu.
- **Thành phần chính:**
    - **Global Load Balancer:** Điều hướng lưu lượng truy cập qua con đường ngắn nhất (ví dụ: Azure Front Door, Traffic Manager).
    - **Geo-replicated Data Store:** Sử dụng cơ sở dữ liệu có khả năng sao chép đa vùng và hỗ trợ đọc-ghi ở mọi nơi (ví dụ: Azure Cosmos DB).
    - **Edge Network:** Kết nối và phân phối lưu lượng hiệu quả.
- **Đặc điểm của một Geode:**
    - Chứa đầy đủ các loại tài nguyên cần thiết để xử lý yêu cầu.
    - Không có phụ thuộc bên ngoài footprint của chính nó.
    - Ghép nối lỏng lẻo (loosely coupled) thông qua mạng lưới biên và nền tảng sao chép.
- **Lợi ích:**
    - **Giảm độ trễ:** Người dùng được phục vụ bởi node gần nhất.
    - **Tăng tính khả dụng:** Nếu một vùng gặp sự cố, các vùng khác vẫn hoạt động bình thường và tiếp quản lưu lượng.
    - **Khả năng mở rộng:** Dễ dàng thêm các geode mới để tăng quy mô toàn cầu.
- **Lưu ý khi triển khai:**
    - Cần chiến lược DevOps hiện đại để đảm bảo các geode là đồng nhất.
    - Ưu tiên công nghệ Serverless để tối ưu chi phí (chỉ trả tiền khi có yêu cầu).
    - Phải quản lý bảo mật chặt chẽ (secrets, ingress points) tại mỗi node.
    - Theo dõi (monitoring) là cực kỳ quan trọng do tính chất phân tán cao.

## Khi nào nên sử dụng

- Khi hệ thống có lượng người dùng lớn trải rộng trên phạm vi toàn cầu.
- Khi dịch vụ yêu cầu tính sẵn sàng và khả năng phục hồi cực cao (survive regional outages).
- Phù hợp cho các ứng dụng cloud-native mới.

## Khi nào không nên sử dụng

- Có các ràng buộc về nơi lưu trú dữ liệu (data residency) khiến các node không thể giống nhau hoàn toàn.
- Ứng dụng yêu cầu trạng thái tạm thời (temporary state) gắn chặt với một session cụ thể.
- Hệ thống đơn giản, không cần phân tán địa lý.
- Cố gắng nâng cấp từ các hệ thống cũ (legacy) - việc chuyển đổi sang Geode thường rất khó khăn.

---
*Nguồn tham khảo: [Microsoft Learn - Geode Pattern](https://learn.microsoft.com/en-us/azure/architecture/patterns/geodes)*
