---
relates:
  - "[[Network]]"
  - "[[Kho chung IT]]"
tags:
  - area/technology
  - domain/devops
  - topic/aws
  - topic/network
  - topic/vpc
  - topic/cloud
  - type/resource
  - lang/vi
  - network
  - kho-chung-it
  - vpc-region
  - aws
  - subnet
---
Trong thiết kế mạng trên AWS, **Vùng VPC (VPC Region)** là phạm vi địa lý nơi bạn triển khai và quản lý mạng ảo (**Virtual Private Cloud - VPC**) của mình. Mỗi VPC được tạo ra trong một Region (ví dụ như Singapore, Tokyo, hay Sydney), và chỉ tồn tại trong duy nhất một Region đó. Một Region bao gồm nhiều Availability Zone (AZ - vùng khả dụng) độc lập về vật lý.

# 1. VPC trong thiết kế AWS network là gì?

## 1.1. Chi tiết về Vùng VPC trong thiết kế mạng AWS

1. **VPC (Virtual Private Cloud)**  
    Là một mạng ảo riêng tư mà bạn tự định nghĩa và kiểm soát hoàn toàn trong AWS. Bạn có thể tùy chỉnh các thành phần như:
    - Địa chỉ IP nội bộ (CIDR Block)
    - Subnets (mạng con)
    - Route Tables (bảng định tuyến)
    - Security Groups và Network ACLs (quản lý truy cập mạng)
    - Internet Gateway, NAT Gateway, VPN Gateways
2. **Vùng (Region)**  
    Là vị trí địa lý vật lý nơi đặt các Data Center của AWS. Mỗi Region bao gồm nhiều Availability Zones (AZ). Ví dụ:
    - `ap-southeast-1`: Singapore
    - `ap-northeast-1`: Tokyo
    - `us-east-1`: Bắc Virginia (Hoa Kỳ)
3. **Mối quan hệ giữa VPC và Region**
    - Mỗi VPC thuộc về **một Region duy nhất** và không thể trải dài trên nhiều Region.
    - Tuy nhiên, mỗi VPC có thể trải dài trên nhiều Availability Zones trong cùng một Region để cung cấp độ sẵn sàng cao (High Availability).
4. **Thiết kế liên quan tới Vùng VPC**  
    Một số lưu ý khi thiết kế VPC:
    - Mỗi Region nên có ít nhất một VPC riêng biệt để đảm bảo hiệu suất và khả năng dự phòng.
    - Nếu bạn muốn kết nối các VPC ở nhiều Region, bạn phải sử dụng **VPC peering liên Region**, VPN, Transit Gateway hoặc AWS Direct Connect.

## 1.2. Ví dụ minh họa

- Bạn tạo một VPC với CIDR block `10.0.0.0/16` tại Region **Singapore (ap-southeast-1)**. Trong Region này, bạn sẽ tạo các subnet nhỏ hơn như `10.0.1.0/24`, `10.0.2.0/24` nằm ở các AZ khác nhau.

## 1.3. Kết luận ngắn gọn

- **Vùng VPC (VPC Region)** là phạm vi địa lý nơi bạn triển khai mạng ảo VPC trong AWS. Một VPC chỉ tồn tại trong duy nhất một Region và có thể mở rộng qua nhiều AZ trong Region đó.

---

# 2. VPC - AZ - subnet

## 2.1. **VPC (Virtual Private Cloud)**

### 2.1.1. Khái niệm:

- **VPC** (Virtual Private Cloud) là một mạng riêng ảo bạn tự tạo và quản lý trong AWS. VPC cho phép bạn triển khai và quản lý các tài nguyên AWS (như máy chủ ảo EC2, cơ sở dữ liệu RDS, Lambda,…) trong một môi trường mạng được bảo mật và kiểm soát bởi bạn.

### 2.1.2. Thành phần chính của VPC:

- **CIDR Block (IP range)**:  
    Là dải địa chỉ IP bạn chỉ định cho mạng VPC của bạn (ví dụ: `10.0.0.0/16`).
- **Internet Gateway (IGW)**:  
    Là cổng giúp VPC có thể kết nối ra Internet.
- **Route Table**:  
    Bảng định tuyến giúp điều hướng lưu lượng mạng bên trong và ngoài VPC.
- **Security Group (SG)**:  
    Firewall ở cấp độ instance (EC2) để kiểm soát lưu lượng ra vào của từng instance.
- **Network ACL (NACL)**:  
    Firewall ở cấp subnet, áp dụng cho toàn bộ subnet trong VPC.
- **NAT Gateway**:  
    Cho phép các máy chủ trong mạng private subnet kết nối ra Internet để cập nhật hay tải về phần mềm, nhưng không cho phép Internet truy cập trực tiếp vào subnet đó.

### 2.1.3. Ví dụ trực quan:

- Một VPC với CIDR `10.0.0.0/16` có thể chứa:
    - Subnet public: `10.0.1.0/24`
    - Subnet private: `10.0.2.0/24`

## 2.2. **Availability Zone (AZ)**

### 2.2.1. Khái niệm:

- **Availability Zone (AZ)** là các trung tâm dữ liệu vật lý tách biệt nằm trong một Region. Mỗi Region AWS bao gồm nhiều AZ, giúp đảm bảo độ khả dụng cao và khả năng chịu lỗi.

### 2.2.2. Đặc điểm chính:

- Các AZ trong cùng một Region được kết nối bởi đường truyền mạng tốc độ rất cao, độ trễ thấp.
- Mỗi AZ có nguồn điện, mạng, và hệ thống làm mát riêng biệt nhằm tránh bị ảnh hưởng nếu có sự cố xảy ra tại một AZ.
- Bạn nên thiết kế hệ thống trải dài trên nhiều AZ để tăng khả năng sẵn sàng (High Availability).

### 2.2.3. Ví dụ minh họa:

Ví dụ Region Singapore (`ap-southeast-1`) bao gồm các AZ như:

- `ap-southeast-1a`
- `ap-southeast-1b`
- `ap-southeast-1c`

Nếu AZ `ap-southeast-1a` gặp sự cố, AZ khác vẫn hoạt động bình thường, duy trì dịch vụ luôn online.

## 2.3. **Subnet**

### 2.3.1. Khái niệm:

- **Subnet** là một mạng con trong VPC, chứa một tập hợp các địa chỉ IP con được chia từ CIDR của VPC. Subnet là nơi bạn đặt các tài nguyên AWS như EC2, RDS, Lambda…

### 2.3.2. Phân loại subnet:

- **Public Subnet**:  
    Có route tới Internet thông qua **Internet Gateway (IGW)**, giúp máy chủ có thể được truy cập trực tiếp từ Internet.
    
- **Private Subnet**:  
    Không được phép truy cập trực tiếp từ Internet. Các máy chủ trong subnet này muốn truy cập Internet phải đi qua **NAT Gateway** hoặc NAT Instance.
    
- **Isolated Subnet**:  
    Hoàn toàn bị cô lập, không có route ra Internet.
    

### 2.3.3. Ví dụ về subnet:

Giả sử bạn có VPC CIDR `10.0.0.0/16` và chia thành:

- Public Subnet: `10.0.1.0/24` (đặt IGW, web server)
- Private Subnet: `10.0.2.0/24` (đặt database)

Điều này giúp Database nằm ở subnet private sẽ không bị truy cập trực tiếp từ bên ngoài, tăng tính bảo mật.

## 2.4. Tổng hợp ví dụ cụ thể

|Thành phần|Ví dụ cụ thể|Vai trò chính|
|---|---|---|
|**VPC**|CIDR: `10.0.0.0/16`|Tạo môi trường mạng riêng ảo|
|**AZ**|`ap-southeast-1a`, `ap-southeast-1b`, `ap-southeast-1c`|Cung cấp độ sẵn sàng cao, chịu lỗi tốt|
|**Subnet**|`10.0.1.0/24 (Public)`, `10.0.2.0/24 (Private)`|Phân chia mạng và kiểm soát truy cập|

## 2.5. ⚡️ **Tóm tắt nhanh:*

| Khái niệm  | Giải thích nhanh gọn                                          |
| ---------- | ------------------------------------------------------------- |
| **VPC**    | Mạng ảo riêng tư bạn tự cấu hình, quản lý trong AWS           |
| **AZ**     | Các trung tâm dữ liệu độc lập vật lý bên trong mỗi Region     |
| **Subnet** | Các mạng nhỏ bên trong VPC để phân chia tài nguyên và bảo mật |
