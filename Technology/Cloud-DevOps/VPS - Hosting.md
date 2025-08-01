---
relates:
  - "[[Linux]]"
  - "[[Backend - Back-end]]"
tags:
  - ufw
  - docker
  - firewall
  - security
  - linux
---
# 1. Quản lý Firewall với UFW và Docker

Tags: #ufw #docker #firewall #security #linux #ufw-docker

## 1.1. UFW (Uncomplicated Firewall)

### 1.1.1. Giới thiệu

UFW là một giao diện dòng lệnh thân thiện với người dùng để quản lý `iptables` (netfilter firewall) trên Linux. Mục tiêu của UFW là đơn giản hóa quá trình cấu hình tường lửa, giúp người dùng dễ dàng cho phép hoặc chặn các kết nối đến/đi từ máy chủ.

### 1.1.2. Chức năng chính

- Quản lý các quy tắc (rules) cho phép (allow) hoặc từ chối (deny) các kết nối dựa trên cổng (port), giao thức (protocol), địa chỉ IP nguồn/đích.
- Hỗ trợ các ứng dụng được định nghĩa sẵn (application profiles).
- Dễ dàng bật/tắt tường lửa.

## 1.2. Vấn đề tương thích giữa UFW và Docker

### 1.2.1. Cách Docker quản lý mạng

Docker có cơ chế quản lý mạng riêng. Khi bạn expose một port của container (ví dụ: `docker run -p 80:80 nginx`), Docker sẽ tự động thêm các quy tắc vào `iptables` (cụ thể là trong chain `DOCKER`) để chuyển tiếp lưu lượng từ cổng trên host đến cổng tương ứng của container.

### 1.2.2. Xung đột với UFW

Các quy tắc `iptables` do Docker tạo ra thường được chèn vào trước các quy tắc của UFW hoặc có độ ưu tiên cao hơn. Điều này dẫn đến việc:
- UFW không thể kiểm soát các port được Docker expose.
- Ngay cả khi bạn dùng `ufw deny <port>` hoặc `ufw default deny incoming`, các port do Docker mở vẫn có thể truy cập từ bên ngoài.
- Đây là một rủi ro bảo mật tiềm ẩn, vì các dịch vụ không mong muốn có thể bị lộ ra ngoài.

## 1.3. Giải pháp: ufw-docker

### 1.3.1. Giới thiệu

`ufw-docker` là một công cụ (thường là một script) được thiết kế để giải quyết vấn đề tương thích giữa UFW và Docker. Nó giúp UFW "nhận biết" và quản lý đúng cách các port được expose bởi Docker container.
- Repository phổ biến: `https://github.com/chaifeng/ufw-docker`

### 1.3.2. Cách hoạt động (khái quát)

`ufw-docker` thường can thiệp vào cách Docker tương tác với `iptables`. Nó điều chỉnh các quy tắc `iptables` để đảm bảo rằng lưu lượng truy cập đến các port của Docker phải đi qua các quy tắc của UFW trước.
Cụ thể, nó có thể:
- Sửa đổi chain `DOCKER-USER` trong `iptables` để UFW có thể áp dụng chính sách.
- Đảm bảo rằng các quy tắc mặc định của UFW (ví dụ: `deny incoming`) được áp dụng cho cả các port của Docker, trừ khi được cho phép rõ ràng trong UFW.

### 1.3.3. Cài đặt (ví dụ với script từ chaifeng)

1.  Tải script:
    ```bash
    sudo wget -O /usr/local/bin/ufw-docker https://github.com/chaifeng/ufw-docker/raw/master/ufw-docker
    sudo chmod +x /usr/local/bin/ufw-docker
    ```
2.  Cấu hình UFW để quản lý Docker (sau khi cài đặt `ufw-docker`):
    Chỉnh sửa file `/etc/ufw/after.rules` và thêm vào cuối file, trước dòng `COMMIT` cuối cùng:
    ```
    # BEGIN UFW AND DOCKER
    *filter
    :DOCKER-USER - [0:0]
    -A DOCKER-USER -j RETURN -s 10.0.0.0/8
    -A DOCKER-USER -j RETURN -s 172.16.0.0/12
    -A DOCKER-USER -j RETURN -s 192.168.0.0/16

    -A DOCKER-USER -p udp -m udp --sport 53 --dport 1024:65535 -j RETURN

    -A DOCKER-USER -j UFW_DEFAULT_INPUT_DENY_FORWARD
    -A DOCKER-USER -j DROP

    COMMIT
    # END UFW AND DOCKER
    ```
    Lưu ý: Các dải IP `10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16` là các dải IP private phổ biến, có thể cần điều chỉnh tùy theo cấu hình mạng của bạn. Dòng UDP cho DNS là để cho phép container phân giải tên miền.

3.  Khởi động lại UFW và Docker:
    ```bash
    sudo systemctl restart ufw
    sudo systemctl restart docker
    ```
    Hoặc nếu UFW chưa được enable:
    ```bash
    sudo ufw enable
    sudo systemctl restart docker
    ```

### 1.3.4. Sử dụng

Sau khi cài đặt và cấu hình `ufw-docker`:
- Để expose một port của Docker container ra ngoài, bạn cần cho phép port đó trong UFW:
  ```bash
  sudo ufw allow <port_number>
  ```
  Ví dụ, nếu container expose port 8080, bạn cần chạy `sudo ufw allow 8080`.
- Các quy tắc UFW khác (ví dụ: `ufw allow from <ip_address> to any port <port_number>`) sẽ hoạt động như mong đợi với các port của Docker.

## 1.4. Lưu ý quan trọng

- Thứ tự: Nên cài đặt và cấu hình UFW cơ bản trước, sau đó mới cài đặt `ufw-docker` và thực hiện các điều chỉnh cần thiết.
- Kiểm tra: Luôn kiểm tra kỹ lưỡng các port đang mở từ một máy bên ngoài (sử dụng `nmap` hoặc công cụ tương tự) sau khi cấu hình để đảm bảo tường lửa hoạt động đúng như mong muốn.
- Cập nhật: Theo dõi repository của `ufw-docker` để biết các bản cập nhật hoặc vá lỗi bảo mật.
- Hiểu `iptables`: Có kiến thức cơ bản về `iptables` sẽ giúp hiểu rõ hơn cách `ufw-docker` hoạt động và khắc phục sự cố nếu có.
- Khởi động lại dịch vụ: Sau khi thay đổi cấu hình UFW hoặc cài đặt `ufw-docker`, việc khởi động lại cả UFW (`sudo ufw reload` hoặc `sudo systemctl restart ufw`) và Docker (`sudo systemctl restart docker`) là cần thiết để áp dụng thay đổi.

# 2. Tools / Frameworks / Platforms

## 2.1. Nixopus (Nền tảng Quản lý VPS)

- **Tổng quan & Mục đích Cốt lõi:**
    - Nền tảng được thiết kế để đơn giản hóa việc quản lý Máy chủ Riêng ảo (VPS)
    - Mục tiêu: Hợp lý hóa quy trình làm việc cho kỹ sư DevOps, quản trị viên hệ thống, nhà phát triển
- **Các Chức năng & Tính năng Chính:**
    - Triển khai Ứng dụng Một cú nhấp chuột
    - Thiết bị đầu cuối Dựa trên Web Tích hợp
    - Trình quản lý Tệp Trực quan
    - Giám sát Thời gian thực: CPU, RAM, sử dụng vùng chứa
    - Quản lý TLS Tích hợp
    - Tích hợp GitHub cho CI/CD
    - Quản lý Proxy qua Caddy
    - Tích hợp Thông báo: Slack, Discord, Email
    - Các công cụ triển khai toàn diện
    - Giao diện thân thiện với người dùng
    - Tùy chọn cài đặt có thể tùy chỉnh
    - Triển khai Tự lưu trữ
- **Các Trường hợp Sử dụng Chính:**
    - Quản lý VPS Đơn giản hóa: Cho chuyên gia DevOps, quản trị viên hệ thống, nhà phát triển
    - Triển khai Ứng dụng Nhanh chóng: Triển khai ứng dụng lên máy chủ ảo nhanh chóng
    - Giám sát & Bảo trì Máy chủ: Khả năng giám sát và công cụ bảo trì
    - Tự động hóa CI/CD: Tích hợp với GitHub
- **Ưu điểm & Điểm mạnh:**
    - Đơn giản hóa Quy trình làm việc: Công cụ tích hợp (triển khai một cú nhấp chuột, trình quản lý tệp, thiết bị đầu cuối dựa trên web)
    - Tăng cường Hiệu quả: Giám sát thời gian thực, tích hợp CI/CD
    - Kiểm soát Tập trung: Giao diện tập trung để quản lý nhiều khía cạnh của VPS
    - Hỗ trợ DevOps: Tích hợp GitHub, quản lý proxy

