---
area: technology
domain: system-design
type: note
---
```ngosangns-obsidian/technology/system-design/azure-design-patterns/Quarantine Pattern.md#L1-50
# Quarantine Pattern (Mô hình Cách ly)

Sử dụng các quy trình xác thực để kiểm tra các thành phần phần mềm của bên thứ ba (third-party artifacts) trong chuỗi cung ứng trước khi cho phép sử dụng chúng trong hệ thống. Mô hình này hoạt động như một "sidecar" vận hành cho quá trình phát triển, giúp ngăn chặn các lỗ hổng bảo mật tiềm ẩn từ các nguồn bên ngoài.

## Tóm tắt nội dung (Bullet List)

- **Vấn đề:** Các giải pháp đám mây thường phụ thuộc vào phần mềm bên thứ ba (mã nguồn mở, container images, OS images). Nếu tích hợp trực tiếp mà không kiểm tra, hệ thống có thể bị xâm nhập hoặc mất tính ổn định do lỗ hổng bảo mật hoặc sự không tương thích.
- **Giải pháp:** Thiết lập một quy trình xác thực độc lập. Các thành phần bên ngoài được đưa vào một môi trường cách ly (quarantine) để trải qua các kiểm tra nghiêm ngặt trước khi được đánh dấu là "tin cậy" (trusted).
- **Quy trình hoạt động:**
    - **Yêu cầu (Request):** Người dùng yêu cầu sử dụng một thành phần bên ngoài. Thành phần này ban đầu bị chặn (block).
    - **Nhập dữ liệu (Ingestion):** Quy trình cách ly lấy thành phần từ nguồn bên ngoài đưa vào khu vực kiểm tra.
    - **Xác thực (Verification):** Thực hiện các kiểm tra như quét lỗ hổng (CVE scanning), phát hiện mã độc (malware detection), kiểm tra bản quyền, hoặc đánh giá SBOM (Software Bill of Materials).
    - **Công bố (Publishing):** Nếu vượt qua kiểm tra, thành phần được đẩy vào kho lưu trữ nội bộ an toàn và được đánh dấu là "tin cậy". Nếu thất bại, nó sẽ bị loại bỏ hoặc không cho phép sử dụng.
    - **Báo cáo (Signaling):** Thông báo kết quả cho người yêu cầu kèm theo báo cáo chi tiết về mức độ rủi ro.
- **Đặc điểm:**
    - Quy trình này không thay đổi cấu trúc của thành phần phần mềm.
    - Đảm bảo sự phân đoạn (segmentation) giữa tài nguyên tin cậy và không tin cậy.
    - Cần được tự động hóa để đảm bảo tính nhất quán và hiệu quả.

## Khi nào nên sử dụng

- Khi hệ thống tích hợp nhiều thành phần phát triển bên ngoài (container images từ DockerHub, thư viện từ NuGet/npm, module Terraform, OS images từ nhà cung cấp).
- Khi đội ngũ phát triển coi rủi ro từ phần mềm bên thứ ba là đáng kể và cần được giảm thiểu để bảo vệ dữ liệu.
- Khi cần chuẩn hóa các quy tắc xác thực phần mềm trong toàn tổ chức.

## Khi nào không nên sử dụng

- Thành phần phần mềm được tạo ra nội bộ bởi chính đội ngũ phát triển hoặc các đối tác chiến lược đã được tin tưởng tuyệt đối.
- Khi rủi ro của việc không xác thực thấp hơn nhiều so với chi phí xây dựng và vận hành quy trình cách ly.

## Ví dụ thực tế trên Azure
Một đội ngũ muốn sử dụng image từ một registry công cộng:
1. Yêu cầu được gửi qua một ứng dụng tùy chỉnh trên **Azure Web Apps**.
2. Image được nhập vào một **Azure Container Registry (ACR)** đóng vai trò là "vùng cách ly".
3. Một **Azure Function** điều phối các công cụ quét bảo mật (như Microsoft Defender cho Containers) để kiểm tra image.
4. Nếu an toàn, image được đẩy sang **Trusted ACR** để các cụm Kubernetes thực tế có thể pull về sử dụng.

---
*Nguồn tham khảo: [Microsoft Learn - Quarantine Pattern](https://learn.microsoft.com/en-us/azure/architecture/patterns/quarantine)*
