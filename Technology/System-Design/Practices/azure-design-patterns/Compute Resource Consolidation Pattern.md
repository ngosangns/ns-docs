---
area: technology
domain: system-design
type: note
title: Compute Resource Consolidation Pattern
description: Mẫu thiết kế Compute Resource Consolidation (Hợp nhất tài nguyên tính toán)
timestamp: "2026-06-19T13:43:26.123Z"
tags:
  - technology
  - system-design
resource: https://learn.microsoft.com/en-us/azure/architecture/patterns/compute-resource-consolidation
---

# Mẫu thiết kế Compute Resource Consolidation (Hợp nhất tài nguyên tính toán)

Mẫu thiết kế này giúp hợp nhất nhiều tác vụ hoặc hoạt động vào một đơn vị tính toán duy nhất. Điều này giúp tăng mức độ sử dụng tài nguyên, giảm chi phí và giảm bớt gánh nặng quản lý cho các ứng dụng chạy trên đám mây.

## 1. Ngữ cảnh và Vấn đề

Trong một ứng dụng đám mây, thường có nhiều loại hoạt động khác nhau. Ban đầu, các kiến trúc sư thường áp dụng nguyên tắc "separation of concerns" (tách biệt các mối quan tâm) và chia các hoạt động này thành các đơn vị tính toán riêng biệt để triển khai (ví dụ: các App Service hoặc VM riêng lẻ).

- **Vấn đề:** Mặc dù giúp thiết kế logic sạch sẽ, nhưng việc có quá nhiều đơn vị tính toán sẽ làm tăng chi phí vận hành (hosting costs) vì mỗi đơn vị đều tiêu tốn tài nguyên ngay cả khi nhàn rỗi hoặc tải thấp.
- **Quản lý:** Việc quản lý một số lượng lớn các thực thể độc lập trở nên phức tạp và kém hiệu quả.

## 2. Giải pháp

Hợp nhất nhiều tác vụ vào một đơn vị tính toán (computational unit) duy nhất.

- **Gom nhóm theo đặc tính:** Tìm các tác vụ có hồ sơ tương tự về khả năng mở rộng (scalability), vòng đời (lifetime) và yêu cầu xử lý để nhóm chúng lại với nhau.
- **Tận dụng tính đàn hồi:** Đám mây cho phép tăng/giảm số lượng instance của đơn vị tính toán dựa trên tổng tải của tất cả các tác vụ bên trong.
- **Ví dụ:** Thay vì chạy 5 App Service nhỏ cho 5 dịch vụ ít dùng, hãy chạy chúng trên một App Service Plan duy nhất để tận dụng hết tài nguyên đã trả tiền.

## 3. Các vấn đề và Cân nhắc

- **Mở rộng (Scalability):** Tránh nhóm các tác vụ có yêu cầu mở rộng trái ngược nhau (ví dụ: một tác vụ cần scale cực nhanh do traffic lớn và một tác vụ chỉ quét hàng đợi định kỳ).
- **Vòng đời (Lifetime):** Hạ tầng đám mây đôi khi tái khởi động (recycle) môi trường ảo. Nếu có tác vụ chạy rất lâu, cần có cơ chế lưu trạng thái (check-pointing) để tiếp tục sau khi khởi động lại.
- **Bảo mật:** Các tác vụ trong cùng một đơn vị tính toán thường chia sẻ cùng một ngữ cảnh bảo mật. Cần sự tin tưởng cao giữa các tác vụ.
- **Xung đột tài nguyên (Contention):** Tránh việc hai tác vụ cùng ngốn CPU hoặc cùng ngốn RAM chạy trên một đơn vị, vì chúng sẽ tranh giành tài nguyên của nhau. Tốt nhất là kết hợp một tác vụ ngốn CPU với một tác vụ ngốn RAM.
- **Độ phức tạp:** Việc gộp nhiều logic vào một nơi làm mã nguồn phức tạp hơn, khó debug và kiểm thử hơn.

## 4. Khi nào nên sử dụng

- Khi các tác vụ chạy riêng lẻ không hiệu quả về chi phí (thời gian nhàn rỗi nhiều).
- Khi các tác vụ có yêu cầu về tài nguyên và thời gian chạy tương đồng.
- Khi muốn đơn giản hóa việc giám sát và quản lý hạ tầng.

## 5. Khi nào KHÔNG nên sử dụng

- Các tác vụ cực kỳ quan trọng đòi hỏi khả năng chịu lỗi cao và cô lập tuyệt đối.
- Các tác vụ xử lý dữ liệu nhạy cảm đòi hỏi ngữ cảnh bảo mật riêng biệt.
- Các tác vụ có yêu cầu mở rộng rất khác nhau.

## 6. Lựa chọn trên nền tảng Azure

- **Azure App Service & Functions:** Chạy nhiều App/Function trên cùng một **App Service Plan**.
- **Azure Container Apps:** Triển khai nhiều container vào cùng một **Environment**.
- **Azure Kubernetes Service (AKS):** Nhóm các ứng dụng vào các **Node Pools** dựa trên yêu cầu CPU/RAM.
- **Virtual Machines:** Sử dụng **Virtual Machine Scale Sets** để quản lý tài nguyên dùng chung.

---

_Nguồn: [Azure Architecture Center - Compute Resource Consolidation pattern](https://learn.microsoft.com/en-us/azure/architecture/patterns/compute-resource-consolidation)_
