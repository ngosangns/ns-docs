---
tags:
  - area/technology
  - domain/devops
  - topic/aws
  - type/resource
  - lang/vi
---

# 1. Resources

- [[Lộ trình thi cert AWS Solutions Architect Assoc]]
- AWS Docs GPT: https://www.awsdocsgpt.com
- AWS Well-Architected - Build secure, efficient cloud applications: https://aws.amazon.com/architecture/well-architected/?wa-lens-whitepapers.sort-by=item.additionalFields.sortDate&wa-lens-whitepapers.sort-order=desc&wa-guidance-whitepapers.sort-by=item.additionalFields.sortDate&wa-guidance-whitepapers.sort-order=desc&awsm.page-wa-lens-whitepapers=1
- Quá trình ôn thi lấy chứng chỉ AWS
- Ứng dụng Serverless thực tế trên AWS (Part 1) - Viblo: https://viblo.asia/p/ung-dung-serverless-thuc-te-tren-aws-part-1-OeVKB93A5kW
  - Amazon RDS Proxy - Quản lý các connection pool cho database: Amazon RDS Proxy | Highly Available Database Proxy | Amazon Web Services - https://aws.amazon.com/rds/proxy
  - AWS AppSync - Dùng cho GraphQL và Pub/sub: AWS AppSync | API GraphQL và Pub/Sub phi máy chủ | Amazon Web Services - https://aws.amazon.com/vi/appsync
  - AWS Step Functions - Lên luồng cho các tác vụ tự động: https://aws.amazon.com/vi/step-functions
  - AWS API Gateway - Kiểm tra cache và log trước khi request đi vào http API: Amazon API Gateway | API Management | Amazon Web Services - https://aws.amazon.com/api-gateway
  - Amazon Cognito - Dịch vụ quản lý đăng ký, đăng nhập, user cho ứng dụng: Amazon Cognito – Đăng nhập và đăng ký cho người dùng đơn giản và bảo mật | Amazon Web Services (AWS) - https://aws.amazon.com/vi/cognito
  - Amazon Lightsail: Máy chủ riêng ảo và Lưu trữ web–Amazon Lightsail—Amazon Web Services - https://aws.amazon.com/vi/lightsail
- AWS STUDY GROUP: https://awsstudygroup.com
- Triển khai dự án 500k requests/month trên AWS với chi phí 0.82$/month: https://hieudd.substack.com/p/a-year-of-running-a-hotel-booking
- So sánh AWS S3 vs Cloudflare R2: https://viblo.asia/p/so-sanh-r2-cloudflare-va-s3-aws-lua-chon-nao-la-tot-nhat-obA46wXDJKv
- AWS Cloud Design Patterns: https://docs.aws.amazon.com/prescriptive-guidance/latest/cloud-design-patterns/introduction.html

# 2. Lambda

- Nên sử dụng chip ARM để tối ưu hiệu năng (tăng 19%) và giảm chi phí (giảm 34%).
- Chi tiết về kỹ thuật trong Lambda: https://viblo.asia/p/vu-tru-trong-aws-lambda-XL6lAe8plek
- Dựng project Golang với AWS Lambda: ➤ AWS Lambda in GoLang — The Ultimate Guide (softkraft.co) - https://www.softkraft.co/aws-lambda-in-golang
- https://blog.canopas.com/golang-serverless-deployment-using-aws-cloudformation-4dee745cbf28

# 3. DynamoDB

- PartiQL - SQL interface: https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/ql-reference.html#ql-reference.what-is
  - Cách sử dụng: https://mpn.btnguyen2k.me/cms/programming/go-golang-dynamodb-sql
- Read methods:
  - BatchGetItem — retrieves up to 100 items from one or more tables
  - GetItem— retrieves a single item from a table with the given primary key
  - Query — retrieves all items that have a specific partition key
  - Scan — retrieves all items in the specified table or index
  - TransactGetItems — atomically retrieves multiple items from one or more tables
- Write methods:
  - BatchWriteItem — puts or deletes multiple items in one or more tables
  - DeleteItem — deletes a single record in a table by primary key
  - PutItem—creates or replaces an old item with a new one
  - TransactWriteItems — synchronous write operation on items from one or more tables (no two actions can target the same record)
  - UpdateItem— edits an existing item’s attributes or adds a new item to the table if it does not already exist
  - Put vs Update: There is no difference when an item does not exist. Both methods create a new item. When an existing item found, Put replaces it with the new one, Update alters the item’s attributes

![[3c2a3b4c-5d6e-7f80-91a2-b3c4d5e6f708.png]]

# 4. EventBridge

- Một Vài Lưu Ý Khi Lập Lịch Hàng Tháng với EventBridge: https://viblo.asia/p/mot-vai-luu-y-khi-lap-lich-hang-thang-voi-eventbridge-PwlVmbGP45Z

# 5. EKS

- Automate cluster infrastructure with EKS Auto Mode: https://docs.aws.amazon.com/eks/latest/userguide/automode.html

## 5.1. EKS Hybrid Nodes

**Nguồn**: https://aws.amazon.com/vi/blogs/containers/a-deep-dive-into-amazon-eks-hybrid-nodes/

### 5.1.1. Tổng quan

- Tính năng mới của Amazon EKS được ra mắt tại re:Invent 2024, hiện đã GA
- Cho phép sử dụng hạ tầng on-premises và edge hiện có như nodes trong Amazon EKS clusters
- Tạo trải nghiệm quản lý Kubernetes thống nhất trên cloud, on-premises và edge
- Use cases: modernization, machine learning (ML), media streaming, manufacturing workloads
- Giải quyết vấn đề: thay vì phải tự quản lý Kubernetes on-premises (phức tạp, tốn công vận hành), có thể kết nối on-premises/edge capacity như nodes vào managed EKS control plane trên cloud

### 5.1.2. Kiến trúc và yêu cầu

- **Kết nối mạng**: Cần connectivity giữa on-premises network và Amazon VPC của EKS cluster
  - Có thể dùng: AWS Direct Connect, AWS Site-to-Site VPN, hoặc VPN solution riêng
- **Infrastructure**: "Bring your own infrastructure" approach
  - Chịu trách nhiệm provisioning và quản lý infrastructure, OS cho hybrid nodes
  - Có thể dùng bare metal servers hoặc virtualized infrastructure
  - OS hỗ trợ: Amazon Linux 2023, Ubuntu, Red Hat Enterprise Linux (RHEL)
- **Cài đặt**: Sử dụng EKS Hybrid Nodes CLI (`nodeadm`) trên mỗi on-premises host
  - Có thể tích hợp vào golden OS images để tự động bootstrap
- **Xác thực**: Sử dụng temporary IAM credentials từ:
  - AWS Systems Manager hybrid activations (khuyến nghị)
  - IAM Roles Anywhere

### 5.1.3. Networking

- **Node và Pod networks**: Phải sử dụng IPv4 RFC-1918 CIDRs
  - `RemoteNodeNetwork`: Cần thiết cho EKS control plane ↔ kubelet communication (logs, exec, port-forward)
  - `RemotePodNetwork`: Cần thiết cho EKS control plane ↔ webhook communication (khuyến nghị cấu hình)
- **VPC routing**: Routing table phải có routes cho RemoteNodeNetwork và RemotePodNetwork đến gateway (Transit Gateway hoặc VGW)
- **Security groups**: Phải có inbound/outbound rules cho RemoteNodeNetwork và RemotePodNetwork
- **On-premises**:
  - Firewall: Cho phép inbound từ EKS control plane, outbound cho RemoteNodeNetwork và RemotePodNetwork
  - Router: Phải route được traffic đến RemoteNodeNetwork và RemotePodNetwork
  - CNI: Overlay network CIDR phải giống RemotePodNetwork (hoặc node CIDR = RemoteNodeNetwork nếu dùng host networking)

### 5.1.4. Tính năng hỗ trợ

- **Add-ons và features**:
  - CoreDNS
  - kube-proxy
  - Amazon Managed Service for Prometheus agent-less scrapers
  - AWS Distro for Open Telemetry
  - CloudWatch Observability Agent
  - IAM Roles for Service Accounts (IRSA)
  - EKS Pod Identities
- **Pod networking CNI**: Cilium và Calico được hỗ trợ
- **Ingress và load balancing**: Hầu hết các Kubernetes options đều có thể sử dụng

### 5.1.5. Prerequisites

- Hybrid network connectivity giữa on-premises và AWS
- Infrastructure (physical hoặc virtual machines)
- OS tương thích với hybrid nodes
- AWS CLI version 2.22.8+ hoặc 1.36.13+
- eksctl CLI
- IAM permissions: `iam:CreatePolicy`, `iam:CreateRole`, `iam:AttachRolePolicy`, `ssm:CreateActivation`, `eks:CreateCluster`

### 5.1.6. Lợi ích

- Giảm complexity và operational overhead so với self-managed Kubernetes on-premises
- Trải nghiệm vận hành nhất quán với EKS clusters trên cloud
- Sử dụng cùng features, integrations, tools như EKS trên cloud
- Phù hợp cho các use case cần low latency, data dependency, data sovereignty, regulatory compliance

### 5.1.7. Partners

- **ISVs**: AccuKnox, Aqua, CIQ, Dynatrace, HashiCorp, Kong, Kubecost, NetApp, New Relic, Nirmata, PerfectScale, Pulumi, Solo.io, Spectro Cloud, Sysdig, Tetrate
- **IHVs**: AMD, Continent 8 Technologies, Dell Technologies
- **OSVs**: CIQ (Ctrl IQ)
- Nhiều ISVs đã validate solutions qua Conformitron framework

# 6. Tools

- AWS IAM Policy Visualizer: https://bourabdelhadi.github.io/awsviz
- [AWS Lambda Power Tuning](https://github.com/alexcasalboni/aws-lambda-power-tuning) - Benchmark nhiều mức cấu hình memory (từ 128MB đến 10GB) để xác định:
  - Thời gian thực thi (duration)
  - Chi phí tương ứng
  - Điểm tối ưu giữa hiệu suất và giá

# 7. AI

## 7.1. Services

- Computer vision:
  - Amazon Rekognition
  - Amazon Textract
- Chat interface:
  - Amazon Lex
- Speech:
  - Amazon Polly
  - Amazon Transcribe
- Fraud Detecting:
  - Amazon Fraud Detector
- Language:
  - Amazon Comprehend
  - Amazon Translate
- Amazon Personalize
- Amazon SageMaker
  - Nền tảng tích hợp cho dữ liệu, phân tích và AI, cung cấp trải nghiệm phát triển thống nhất
  - Cho phép xây dựng, huấn luyện và triển khai các mô hình học máy (ML) và mô hình nền tảng (FMs) trên hạ tầng hiệu suất cao và chi phí hiệu quả
  - Cung cấp các công cụ chuyên dụng cho toàn bộ vòng đời AI: IDE hiệu suất cao, đào tạo phân tán, suy luận, AI ops, quản trị và quan sát
  - Hỗ trợ xây dựng ứng dụng AI tổng quát tùy chỉnh với dữ liệu riêng của doanh nghiệp
  - Tích hợp với Amazon Q Developer để tăng tốc phát triển AI, giúp khám phá dữ liệu, xây dựng và đào tạo mô hình ML, tạo truy vấn SQL và chạy pipeline dữ liệu thông qua ngôn ngữ tự nhiên
  - SageMaker Unified Studio: Môi trường phát triển tích hợp cho tất cả dữ liệu và công cụ cho phân tích và AI
  - Hỗ trợ kiến trúc lakehouse, thống nhất truy cập dữ liệu trên các hồ dữ liệu Amazon S3, kho dữ liệu Amazon Redshift và các nguồn dữ liệu bên thứ ba hoặc liên kết
  - Đảm bảo bảo mật doanh nghiệp với quản trị tích hợp trong suốt vòng đời dữ liệu và AI
- Amazon Kinesis Data Streams:
  - Thu thập và xử lý **luồng dữ liệu theo thời gian thực** (real-time).
  - Dữ liệu từ các nguồn như PC, mobile, game servers sẽ được gửi vào Kinesis.
  - Cho phép nhiều consumers (như Flink, Lambda, hoặc custom app) đọc dữ liệu đồng thời.
- Amazon Managed Service for Apache Flink
  - Xử lý dữ liệu **streaming theo thời gian thực** bằng cách sử dụng **Apache Flink** (một engine stream mạnh mẽ).
  - Thực hiện các thao tác như filter, aggregation, windowing… trên dữ liệu từ Kinesis Data Streams.
  - Có thể gửi kết quả ra CloudWatch, SNS, hoặc S3.
- Amazon Kinesis Data Firehose
  - Dịch vụ **delivery dữ liệu**: nhận dữ liệu từ Kinesis, xử lý nhẹ (transform) và lưu vào các storage như Amazon S3, Redshift, Elasticsearch, hoặc Splunk.
  - Tự động **batch, compress, encrypt** và **lưu trữ dữ liệu** theo định dạng tối ưu.
- AWS Glue
  - **ETL (Extract, Transform, Load)**: chuẩn hoá và xử lý dữ liệu đã lưu trong S3.
  - Cung cấp **Data Catalog** để định nghĩa schema, chuẩn bị dữ liệu cho phân tích.
  - Hữu ích khi cần xử lý batch hoặc data warehouse.
- Amazon Athena
  - Truy vấn dữ liệu trong Amazon S3 bằng **ngôn ngữ SQL** mà không cần cài đặt hạ tầng.
  - Rất phù hợp để phân tích nhanh dữ liệu log, game event, transaction…
- Amazon QuickSight
  - Dịch vụ **BI (Business Intelligence)** dùng để tạo dashboards và báo cáo trực quan.
  - Kết nối với Athena hoặc dữ liệu S3/Glue để **hiển thị dữ liệu phân tích** cho Admins, LiveOps.
  - Hỗ trợ phân tích realtime hoặc batch.
- Amazon EC2 (Elastic Compute Cloud)
  - Cung cấp **máy chủ ảo linh hoạt** để chạy các ứng dụng quan trọng như SAP và hệ thống thương mại điện tử.
  - Cho phép tùy chỉnh cấu hình CPU, RAM, dung lượng lưu trữ, hệ điều hành.
- Amazon EC2 Auto Scaling
  - Tự động **tăng hoặc giảm số lượng EC2 instances** dựa trên nhu cầu tài nguyên (CPU, RAM, traffic…).
  - Đảm bảo hiệu năng cao trong các giai đoạn cao điểm (Black Friday, chiến dịch khuyến mãi).
  - Giúp tiết kiệm chi phí khi nhu cầu giảm.
- Amazon EC2 Spot Instances
  - Cung cấp phiên bản EC2 với giá **giảm tới 90%** so với giá theo yêu cầu (on-demand).
  - Dùng cho các tác vụ không cần chạy liên tục (batch jobs, xử lý nền) để tối ưu chi phí hạ tầng.
- Amazon EKS (Elastic Kubernetes Service)
  - Dịch vụ **Kubernetes được quản lý** của AWS.
  - Cho phép triển khai các ứng dụng container hóa một cách dễ dàng, bảo mật và có khả năng mở rộng tốt.
  - Quản lý cluster Kubernetes mà không cần lo về control plane hay bảo mật mạng.
- Amazon Aurora
  - **Cơ sở dữ liệu quan hệ hiệu suất cao**, tương thích với MySQL và PostgreSQL.
  - Cung cấp tính năng tự động sao lưu, phục hồi sự cố, và khả năng mở rộng linh hoạt.
  - Hiệu năng gấp 5 lần MySQL tiêu chuẩn với chi phí thấp hơn Oracle hoặc SQL Server.
- Amazon CloudWatch
  - Giám sát **log, metrics, sự kiện** và hiệu năng của toàn bộ hệ thống.
  - Cấu hình cảnh báo tự động khi có lỗi hoặc vượt ngưỡng.
  - Giao diện đồ họa trực quan để theo dõi hệ thống real-time.
- AWS Security Hub
  - Tập trung kết quả từ các dịch vụ bảo mật khác (GuardDuty, Config, Inspector…) để đánh giá **mức độ an toàn** của hệ thống.
  - Tự động phát hiện các **lỗi cấu hình, lỗ hổng bảo mật**, và đưa ra khuyến nghị xử lý.
- Amazon GuardDuty
  - Dịch vụ **phát hiện mối đe dọa thông minh**, dựa trên machine learning và phân tích hành vi.
  - Phát hiện các hoạt động bất thường, truy cập trái phép, hoặc IP độc hại.
  - Tích hợp chặt chẽ với Security Hub để quản lý cảnh báo trung tâm.
- AWS Backup
  - Tự động sao lưu dữ liệu từ Amazon EC2, EBS, RDS, Aurora, DynamoDB…
  - Đảm bảo khả năng **khôi phục dữ liệu nhanh chóng** khi có sự cố (mất dữ liệu, lỗi người dùng…).
  - Hỗ trợ tuân thủ chính sách backup và lưu trữ lâu dài.
- Amazon Cognito
  - Quản lý người dùng và xác thực truy cập cho hệ thống web và mobile.
  - Hỗ trợ đăng nhập qua email, mạng xã hội (Google, Facebook), và SSO (Single Sign-On).
  - Cho phép phân quyền truy cập linh hoạt dựa trên vai trò (RBAC).
- CloudTrail: Track user activity and API usage on AWS and in hybrid and multicloud environments.

# 8. API Gateway

## 8.1. Routing Rules (Quy tắc định tuyến động)

- **Tính năng**: Quy tắc định tuyến động cho tên miền tùy chỉnh
- **Cách hoạt động**:
  - Định tuyến dựa trên giá trị của tiêu đề HTTP
  - Định tuyến dựa trên đường dẫn cơ sở (base path)
  - Kết hợp cả tiêu đề HTTP và đường dẫn
- **Use cases**:
  - Phiên bản hóa API (API versioning)
  - Triển khai dần dần (gradual deployment)
  - Kiến trúc dựa trên cell (cell-based architecture)
  - Thử nghiệm A/B (A/B testing)
  - Lựa chọn backend động (dynamic backend selection)
- **Lợi ích**:
  - Loại bỏ nhu cầu tạo hoặc thay đổi đường dẫn URL
  - Chuyển đổi giữa các phiên bản API mượt mà hơn
  - Tích hợp liền mạch với các khả năng hiện có của API Gateway
  - Hỗ trợ cả REST API công khai và riêng tư
- **Nguồn**: https://aws.amazon.com/vi/blogs/compute/dynamically-routing-requests-with-amazon-api-gateway-routing-rules

# 9. Practices

- Zendesk cắt giảm 80% chi phí lưu trữ nhờ chuyển đổi cơ sở dữ liệu:
  - Vietnamese: https://sydexa.com/blog/zendesk-cat-giam-80percent-chi-phi-luu-tru-nho-chuyen-djoi-co-so-du-lieu-66d48d15f0d5216d0c6b2da0
  - English: https://zendesk.engineering/moving-from-dynamodb-to-tiered-storage-with-mysql-s3-cb3dc9bf813a

# 10. Terraform

## 10.1. Terraform AWS Cloud Control Provider cho AWS Batch

- **Nguồn**: https://awsstudygroup.com/2025/06/17/su-dung-terraform-aws-cloud-control-provider-de-quan-ly-tai-nguyen-aws-batch-2/
- **Hai loại Terraform provider cho AWS**:
  - **Terraform AWS Provider (nguyên bản)**:
    - Dự án mã nguồn mở với pull request từ cộng đồng
    - Code thủ công để gọi trực tiếp qua AWS SDK
    - Review và tích hợp pull request mất nhiều thời gian
  - **Terraform AWS Cloud Control (AWSCC) Provider**:
    - Ra mắt chính thức giữa năm 2024 bởi HashiCorp
    - Hoạt động với AWS Cloud Control API - tập hợp API chung để quản lý vòng đời dịch vụ AWS
    - Được tự động tạo ra dựa trên Cloud Control API do AWS phát hành
    - Tính năng và dịch vụ mới nhất từ AWS được hỗ trợ ngay lập tức
- **AWS Batch job definitions**:
  - Trước đây chưa được AWS Cloud Control API hỗ trợ như managed resource
  - Hiện tại đã được hỗ trợ trong Cloud Control API
  - Có thể sử dụng AWSCC provider để quản lý tất cả Batch resources
  - Có thể sử dụng cả hai provider trong cùng một stack
- **So sánh AWS Provider vs AWSCC Provider cho Batch compute environment**:
  - **AWS Provider**:
    - Sử dụng `compute_environment_name_prefix` thay vì `compute_environment_name`
    - Prefix cho phép xử lý blue/green deployment: tạo CE mới, chuyển job queue association, xóa CE cũ
    - Sử dụng `instance_type` (số ít) - khác với Batch API
  - **AWSCC Provider**:
    - Sử dụng `compute_environment_name` (không có prefix)
    - Tuân theo Batch API chính xác
    - Sử dụng `instance_types` (số nhiều) - phản ánh đúng API
    - Có thêm argument `replace_compute_environment` (mặc định false)
      - Nếu false: CE sử dụng service-linked role có thể cập nhật nhiều attributes hơn mà không cần thay thế CE (infrastructure update)
      - Nếu true: bị giới hạn ở tập nhỏ hơn các attributes có thể cập nhật
    - Nếu cần thay thế CE: phải tự quản lý thứ tự thao tác (tạo CE mới, liên kết job queue, vô hiệu hóa và xóa CE cũ)
- **Ưu điểm của AWSCC Provider**:
  - Tính năng mới được hỗ trợ ngay lập tức (ví dụ: configurable namespaces, persistent volume claims, container mount sub-path support, pod annotations cho Batch trên EKS)
  - Không cần chờ pull request từ cộng đồng và review từ maintainer
- **Nhược điểm của AWSCC Provider**:
  - Tài liệu về resources khá ít, chỉ có thông tin về kiểu của resource arguments
  - Cần tham khảo tài liệu AWS Cloud Control resource type để biết arguments đại diện cho gì
  - Tạo ra một chút developer friction khi sử dụng
- **Khuyến nghị**:
  - Thận trọng khi refactoring các Terraform-managed resources hiện có
  - Đối với resources mới hoặc resources có cập nhật thường xuyên (như AWS Batch job definitions): nên sử dụng AWSCC provider
  - Có thể sử dụng cả hai provider song song trong cùng một stack

# 11. EC2 Cost Optimization - Automatic Shutdown

**Nguồn**: https://aws.amazon.com/vi/blogs/publicsector/reduce-it-costs-by-implementing-automatic-shutdown-for-amazon-ec2-instances/

## 11.1. Tổng quan

- Giảm chi phí IT bằng cách tự động shutdown EC2 instances khi không sử dụng
- Đặc biệt hữu ích cho các trường đại học/cao đẳng khi instances chạy ngoài giờ hoặc không hoạt động
- Có 2 phương pháp chính:
  - **Method 1**: Sử dụng CloudWatch alarms để shutdown dựa trên mức độ hoạt động
  - **Method 2**: Sử dụng Lambda + EventBridge cho scheduled và batch processing

## 11.2. Method 1: CloudWatch Alarms cho Dynamic Instance Shutdown

- **Mục đích**: Tự động quản lý instances dựa trên mức độ hoạt động
- **Cách hoạt động**:
  - Tạo CloudWatch alarm trên EC2 console
  - Cấu hình alarm khi CPU utilization <= 3% trong 1 giờ (chỉ báo không hoạt động)
  - Kích hoạt action "Stop" khi alarm trigger
- **Cấu hình alarm**:
  - Group samples by: Average
  - Type of data to sample: CPU Utilization
  - Alarm when: <=
  - Percent: 3
  - Consecutive period: 1
  - Period: 1 Hour
- **Lưu ý**:
  - Có thể vô tình stop instances đang chạy background tasks với CPU thấp
  - Nên xem xét thêm metrics khác như network activity hoặc custom application metrics
  - Review workload patterns trước khi implement

## 11.3. Method 2: Lambda + EventBridge cho Scheduled và Batch Processing

- **Mục đích**: Quản lý nhiều instances với scheduled shutdown và batch processing
- **Kiến trúc**:
  - EventBridge schedule trigger Lambda function
  - Lambda function tìm và stop các instances có tag phù hợp
- **Các bước triển khai**:
  1. **Tạo Lambda function**:
     - Runtime: Python 3.13
     - Code tìm instances có tag `AutoStop = True`
     - Stop các instances đang running
  2. **Cấu hình IAM permissions**:
     - `ec2:StopInstances`
     - `ec2:DescribeInstances`
  3. **Tạo EventBridge schedule**:
     - Recurring schedule với cron expression (ví dụ: `0 17 * * ? *` để trigger lúc 17:00 mỗi ngày)
     - Target: Lambda function đã tạo
  4. **Tag EC2 instances**:
     - Thêm tag `AutoStop = True` cho các instances cần tự động shutdown
- **Ưu điểm**:
  - Quản lý nhiều instances cùng lúc
  - Linh hoạt với scheduled shutdown
  - Có thể batch processing dựa trên tags

## 11.4. Kết quả thực tế

- Giảm hơn 30% chi phí EC2 trong tháng đầu tiên
- Cải thiện resource allocation
- Tăng cường sustainability practices bằng cách giảm compute usage không cần thiết

## 11.5. Best Practices

- **Regular review**: Định kỳ review automatic shutdown settings để đảm bảo phù hợp với usage patterns
- **Communication**: Đảm bảo tất cả team members biết về automatic shutdown policies
- **Exceptions handling**: Implement process để tạm thời exclude instances khỏi automatic shutdown trong critical periods
- **Monitoring and logging**: Cấu hình logging đầy đủ để track shutdown events
- **Cost analysis**: Phân tích cost savings thường xuyên để demonstrate ROI

## 11.6. Cleanup

Khi không cần nữa, xóa các resources:

- CloudWatch alarms
- EC2 instances dùng cho testing
- Lambda function
- EventBridge schedule
- IAM roles/policies tạo riêng cho tutorial này

## 11.7. Tài liệu tham khảo

- AWS Well-Architected Framework - Cost Optimization pillar
- Cost Optimization with AWS
- Amazon EC2 Cost and Capacity Optimization
- Instance Scheduler on AWS (advanced solution)
- Amazon CloudWatch alarms user guide
- AWS Lambda Developer Guide
- Amazon EventBridge User Guide

# 12. Serverless Custom Retry Mechanism cho Stateless Queue Consumers

**Nguồn**: https://aws.amazon.com/vi/blogs/architecture/create-a-serverless-custom-retry-mechanism-for-stateless-queue-consumers/

## 12.1. Tổng quan

- Giải pháp retry mechanism tùy chỉnh cho serverless queue processors (như AWS Lambda) khi xử lý messages từ SQS
- Xử lý các trường hợp downstream services bị lỗi tạm thời hoặc throttling
- Sử dụng kết hợp: **Lambda**, **Amazon SQS**, **Amazon EventBridge Scheduler**
- Phù hợp cho các workflow không quản lý state bởi service bổ sung

## 12.2. Kiến trúc và cách hoạt động

- **Core concept**: Khi Lambda function gặp lỗi khi xử lý message, nó tạo EventBridge schedule để đưa message trở lại SQS queue tại thời điểm tương lai
- **Flow**:
  1. Lambda function consume message từ SQS
  2. Nếu có lỗi khi xử lý → raise exception
  3. Catch block bắt exception và gọi EventBridge Scheduler API
  4. Tạo schedule với destination SQS queue và timestamp retry
  5. Message được đưa trở lại queue tại thời điểm đã định
- **Retry timing control**:
  - Hỗ trợ exponential backoff
  - Hỗ trợ linear retry intervals
  - Có thể điều chỉnh delay dựa trên: error type, số lần retry trước đó, custom backoff schemes
- **Idempotency và tracking**:
  - Sử dụng SQS message attributes để track retries
  - Mỗi lần retry, thêm timestamp mới vào array trong message body
  - Kiểm tra số lần retry để quyết định có tiếp tục retry hay gửi vào DLQ

## 12.3. Dead Letter Queue (DLQ)

- Tích hợp DLQ để tránh retry vô hạn
- Lambda function gửi message vào DLQ khi:
  - Vượt quá maximum retry limit
  - Gặp error scenarios cần dừng sớm
- DLQ lưu trữ các messages failed để review, reprocess hoặc correct thủ công

## 12.4. Considerations và Best Practices

- **Partial failures**:
  - Xử lý trường hợp chỉ một phần steps hoàn thành
  - Có thể sử dụng compensating action hoặc rollback để maintain data consistency
- **Retry limits**:
  - Cân bằng giữa resource usage và resilience
  - Quá nhiều retries → tăng chi phí và slowdown
  - Set retry limits phù hợp dựa trên: failure rates, SLAs, business consequences
- **Timing precision**:
  - EventBridge Scheduler có granularity 1 phút
  - Có thêm latency giữa queue và function
  - Mechanism không hoàn toàn precise → cần điều chỉnh cho time-sensitive applications
- **Scaling**:
  - Monitor và adjust: Lambda concurrency, queue retention period
  - Đảm bảo optimal performance và cost với variable message volumes
- **Security**:
  - Nếu downstream service trong VPC → Lambda cũng phải trong VPC
  - Access EventBridge Scheduler qua AWS PrivateLink từ VPC
  - IAM roles với least privilege:
    - Lambda function role: permission tạo EventBridge schedule, `iam:PassRole` cho scheduler
    - Scheduler role: permission đặt message vào source queue
    - Lambda function: permission đặt message vào DLQ, receive messages từ source queue

## 12.5. Monitoring và Troubleshooting

- **Key metrics cần monitor**:
  - Số lần invocations của Lambda functions
  - Error rates
  - Runtimes
  - DLQ usage
- **CloudWatch**:
  - Setup alarms khi metrics vượt thresholds
  - Proactive detection và resolution
- **Logging**:
  - Log message attributes, retry attempts, error details
  - Examine logs cho error patterns, retry patterns, downstream service issues

## 12.6. Future Enhancements

- **Dynamic retry intervals**:
  - Điều chỉnh retry intervals dựa trên downstream service health hoặc error types
  - Real-time health monitoring
  - Trade-off: thêm complexity có thể gây failure của retry process
- **External configuration**:
  - Tích hợp với DynamoDB hoặc Parameter Store (AWS Systems Manager)
  - Centralized và dynamic retry configurations
  - Modify retry strategies mà không cần redeploy Lambda code
- **Advanced error analysis**:
  - Comprehensive reporting
  - Error pattern analysis
  - Correlate failures với downstream service health
  - Insights cho root cause analysis và proactive remediation

## 12.7. Lợi ích

- Fine-grained control over retry intervals
- Hỗ trợ exponential backoff và các retry strategies khác
- Tích hợp seamless với DLQ và EventBridge Scheduler
- Có thể reuse cho stateless queue consumers khác, không chỉ Lambda
- Enable robust, fault-tolerant serverless systems
