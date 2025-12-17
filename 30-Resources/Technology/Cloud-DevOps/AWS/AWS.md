---
relates:
  - "[[SaaS]]"
  - "[[Azure]]"
  - "[[Google Cloud Platform - GCP]]"
tags:
  - saas
  - azure
  - google-cloud-platform-gcp
  - lambda
  - dynamodb
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

![[Untitled.png]]

# 4. EventBridge

- Một Vài Lưu Ý Khi Lập Lịch Hàng Tháng với EventBridge: https://viblo.asia/p/mot-vai-luu-y-khi-lap-lich-hang-thang-voi-eventbridge-PwlVmbGP45Z

# 5. EKS

- Automate cluster infrastructure with EKS Auto Mode: https://docs.aws.amazon.com/eks/latest/userguide/automode.html

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

# 8. Practices

- Zendesk cắt giảm 80% chi phí lưu trữ nhờ chuyển đổi cơ sở dữ liệu:
	- Vietnamese: https://sydexa.com/blog/zendesk-cat-giam-80percent-chi-phi-luu-tru-nho-chuyen-djoi-co-so-du-lieu-66d48d15f0d5216d0c6b2da0
	- English: https://zendesk.engineering/moving-from-dynamodb-to-tiered-storage-with-mysql-s3-cb3dc9bf813a
