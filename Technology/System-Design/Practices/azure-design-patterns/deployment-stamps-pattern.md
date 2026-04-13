---
area: technology
domain: system-design
type: note
lang: vi
created: '2026-04-13'
modified: '2026-04-13'
---

# Mẫu thiết kế Deployment Stamps (Tem triển khai)

Mẫu thiết kế Deployment Stamps (còn gọi là Scale Unit, Service Unit hoặc Cell) liên quan đến việc cung cấp, quản lý và giám sát một nhóm tài nguyên không đồng nhất để lưu trữ và vận hành nhiều khối lượng công việc hoặc khách hàng (tenants).

## 1. Ngữ cảnh và Vấn đề
Khi triển khai một ứng dụng trên đám mây, một thực thể (instance) duy nhất có thể gặp phải các giới hạn:
- **Giới hạn quy mô (Scale limits):** Các dịch vụ có giới hạn tự nhiên về số lượng kết nối, tên miền, hoặc tài nguyên tính toán.
- **Chi phí không tuyến tính:** Việc nâng cấp một tài nguyên lên mức cực cao (scale up) có thể đắt hơn nhiều so với việc nhân bản nhiều tài nguyên nhỏ (scale out).
- **Cô lập khách hàng:** Một số khách hàng lớn yêu cầu tài nguyên riêng biệt để đảm bảo hiệu năng và bảo mật, không muốn chia sẻ với khách hàng khác.
- **Hạn chế về địa lý:** Quy định về chủ quyền dữ liệu hoặc yêu cầu độ trễ thấp đòi hỏi dữ liệu phải được đặt ở các vùng địa lý cụ thể.

## 2. Giải pháp (Deployment Stamps)
Chia tài nguyên thành các "Scale Units" (đơn vị mở rộng) và triển khai nhiều bản sao của chúng gọi là các **Stamps**.
- Mỗi Stamp lưu trữ và phục vụ một tập hợp con các khách hàng (tenants).
- Các Stamp hoạt động độc lập với nhau, có thể được triển khai và cập nhật riêng lẻ.
- Một vùng địa lý có thể chứa một hoặc nhiều Stamp để cho phép mở rộng theo chiều ngang.

## 3. Các thành phần chính
- **Stamps:** Một nhóm các tài nguyên (VM, Database, App Service,...) được định nghĩa trong một template (IaC).
- **Dịch vụ định tuyến lưu lượng (Traffic Routing):** Một thành phần trung tâm giúp xác định yêu cầu của khách hàng nào sẽ được chuyển đến Stamp nào (thường sử dụng Azure Front Door hoặc API Management kết hợp với cơ sở dữ liệu ánh xạ).

## 4. Lợi ích
- **Khả năng mở rộng gần như tuyến tính:** Có thể phục vụ số lượng khách hàng không giới hạn bằng cách thêm các Stamp mới.
- **Hạn chế vùng ảnh hưởng (Blast Radius):** Nếu một Stamp bị lỗi, chỉ các khách hàng trong Stamp đó bị ảnh hưởng, các Stamp khác vẫn hoạt động bình thường.
- **Triển khai an toàn:** Có thể cập nhật phiên bản mới cho một vài Stamp trước (Canary deployment) để kiểm tra trước khi áp dụng cho toàn bộ hệ thống.
- **Đáp ứng yêu cầu pháp lý:** Dễ dàng đặt dữ liệu của khách hàng tại các quốc gia cụ thể để tuân thủ luật pháp địa phương.

## 5. Các vấn đề và Cân nhắc
- **Tự động hóa:** Do tính chất nhân bản nhiều bản sao giống hệt nhau, việc sử dụng IaC (Bicep, Terraform, ARM Templates) là bắt buộc để tránh sai sót con người.
- **Vận hành liên Stamp:** Các câu hỏi như "tổng số khách hàng của toàn hệ thống là bao nhiêu?" trở nên khó trả lời hơn. Cần một kho dữ liệu trung tâm (Data Warehouse) để tổng hợp báo cáo từ tất cả các Stamp.
- **Di chuyển khách hàng:** Việc chuyển một khách hàng từ Stamp này sang Stamp khác rất phức tạp, đòi hỏi logic ứng dụng để di chuyển dữ liệu và cập nhật ánh xạ định tuyến.
- **Chi phí:** Duy trì nhiều bản sao hạ tầng làm tăng chi phí vận hành cố định.

## 6. Khi nào nên sử dụng
- Khi hệ thống đạt đến giới hạn quy mô của một instance duy nhất.
- Khi cần cô lập các nhóm khách hàng vì lý do bảo mật hoặc hiệu năng.
- Ứng dụng đa quốc gia cần đặt dữ liệu tại địa phương.
- Khi muốn tăng độ tin cậy bằng cách cô lập lỗi.

## 7. Ví dụ trên Azure
- **Azure Front Door:** Định tuyến người dùng đến vùng gần nhất hoặc Stamp cụ thể.
- **Azure API Management:** Đóng vai trò là gateway để tra cứu ánh xạ Tenant -> Stamp và chuyển tiếp yêu cầu.
- **Azure Cosmos DB:** Lưu trữ bảng ánh xạ toàn cầu (mapping table) giữa khách hàng và Stamp.

---
*Nguồn: [Azure Architecture Center - Deployment Stamps pattern](https://learn.microsoft.com/en-us/azure/architecture/patterns/deployment-stamp)*
