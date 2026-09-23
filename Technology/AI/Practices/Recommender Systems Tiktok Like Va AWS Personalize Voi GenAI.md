---
area: technology
domain: ai-ml
type: resource
title: Recommender Systems Tiktok Like Va AWS Personalize Voi GenAI
description: Recommender Systems - TikTok-like và AWS Personalize với GenAI
timestamp: "2026-06-19T13:43:26.166Z"
tags:
  - technology
  - ai-ml
resource: https://medium.com/data-science-collective/1-building-a-tiktok-like-recommender-a64563262c1a
---

# Recommender Systems - TikTok-like và AWS Personalize với GenAI

> - https://medium.com/data-science-collective/1-building-a-tiktok-like-recommender-a64563262c1a
> - https://blog.cloudmentor.pro/blog/aws-mla/solution-personalize-customer

## 1. Xây dựng hệ thống gợi ý giống TikTok

### Giới thiệu

Bài viết trình bày cách xây dựng hệ thống gợi ý cá nhân hóa theo thời gian thực cho các mặt hàng thời trang của H&M, áp dụng kiến trúc 4 giai đoạn và mô hình hai tháp (two-tower model). Mục tiêu là tạo ra một hệ thống có thể xử lý hàng triệu mặt hàng và cung cấp gợi ý phù hợp cho người dùng.

### Mô hình hai tháp (Two-Tower Model)

Mô hình hai tháp là một kiến trúc deep learning bao gồm hai mạng nơ-ron được huấn luyện song song:

#### Bộ mã hóa truy vấn khách hàng (Query/Customer Encoder)

- Chuyển đổi các đặc trưng của khách hàng thành một vector nhúng dày đặc (dense embedding vector)
- Xử lý nhiều loại đặc trưng khác nhau:
  - **Thông tin nhân khẩu học:** Tuổi, giới tính, địa điểm, v.v.
  - **Hành vi lịch sử:** Lịch sử mua hàng, lượt xem, tương tác trước đó
  - **Đặc trưng ngữ cảnh:** Thời gian, thiết bị, vị trí địa lý

#### Bộ mã hóa mặt hàng (Item Encoder)

- Chuyển đổi các đặc trưng của mặt hàng thành các vector nhúng trong cùng không gian vector với nhúng của khách hàng
- Xử lý các đặc trưng của sản phẩm:
  - **Thẻ (Tags):** Phân loại, danh mục, nhãn hiệu
  - **Mô tả:** Thông tin chi tiết về sản phẩm
  - **Đánh giá:** Điểm số, nhận xét từ người dùng

#### Lợi ích của mô hình hai tháp

- **Hiệu quả ở quy mô lớn:** Các nhúng của mặt hàng có thể được tính toán trước và lưu trữ trong cơ sở dữ liệu hoặc chỉ mục tìm kiếm gần đúng (ANN - Approximate Nearest Neighbor)
- **Truy vấn nhanh:** Chỉ cần tính toán nhúng của khách hàng một lần, sau đó tìm kiếm các mặt hàng tương tự trong không gian vector
- **Cá nhân hóa:** Mỗi khách hàng có vector nhúng riêng, phản ánh sở thích và hành vi của họ

### Kiến trúc hệ thống gợi ý 4 giai đoạn

Hệ thống gợi ý được chia thành 4 giai đoạn để tối ưu hóa hiệu suất và độ chính xác:

#### Giai đoạn 1: Tạo ứng viên (Candidate Generation)

- **Mục đích:** Xử lý một tập hợp lớn các mặt hàng và truy xuất một tập hợp con phù hợp cho các bước xếp hạng và lọc sau này
- **Phương pháp:** Sử dụng mô hình hai tháp để tìm kiếm các mặt hàng tương tự trong không gian vector
- **Quy mô:** Từ hàng triệu mặt hàng xuống còn hàng trăm hoặc hàng nghìn ứng viên

#### Giai đoạn 2: Lọc (Filtering)

- **Mục đích:** Áp dụng các bộ lọc để loại bỏ các mặt hàng không cần thiết trước khi xếp hạng
- **Các loại bộ lọc:**
  - **Bộ lọc kinh doanh:** Loại bỏ sản phẩm hết hàng, không phù hợp với chính sách
  - **Bộ lọc người dùng:** Loại bỏ sản phẩm người dùng đã mua, đã xem gần đây
  - **Bộ lọc đa dạng:** Đảm bảo danh sách gợi ý có sự đa dạng về loại sản phẩm

#### Giai đoạn 3: Xếp hạng (Ranking)

- **Mục đích:** Gán điểm cho mỗi cặp "mặt hàng ứng viên, khách hàng" dựa trên mức độ phù hợp
- **Phương pháp:** Sử dụng mô hình ranking phức tạp hơn để tính toán điểm số chính xác
- **Đầu vào:** Vector nhúng của khách hàng và vector nhúng của mặt hàng
- **Đầu ra:** Điểm số phù hợp (relevance score)

#### Giai đoạn 4: Sắp xếp (Re-ranking)

- **Mục đích:** Sắp xếp các mặt hàng dựa trên điểm xếp hạng và logic kinh doanh khác
- **Yếu tố ảnh hưởng:**
  - Điểm số từ mô hình ranking
  - Logic kinh doanh (ưu tiên sản phẩm mới, sản phẩm bán chạy)
  - Đa dạng hóa (đảm bảo không quá nhiều sản phẩm cùng loại)
  - Cân bằng giữa exploration và exploitation

### Ứng dụng vào trường hợp của H&M

#### Dữ liệu

- Sử dụng bộ dữ liệu "H&M Personalized Fashion Recommendations"
- Bao gồm thông tin về:
  - **Khách hàng:** Thông tin nhân khẩu học, hành vi mua sắm
  - **Mặt hàng:** Thông tin sản phẩm, danh mục, hình ảnh
  - **Giao dịch:** Lịch sử mua hàng, lượt xem, tương tác

#### Mô hình

- Áp dụng mô hình hai tháp để tạo nhúng cho khách hàng và mặt hàng
- Huấn luyện mô hình trên dữ liệu lịch sử để học các mẫu tương tác

#### Triển khai

- Sử dụng kiến trúc 4 giai đoạn để cung cấp gợi ý cá nhân hóa theo thời gian thực
- Tối ưu hóa cho việc xử lý hàng triệu mặt hàng và hàng triệu người dùng

### Kết luận

Hệ thống gợi ý giống TikTok sử dụng mô hình hai tháp và kiến trúc 4 giai đoạn để cung cấp gợi ý cá nhân hóa hiệu quả ở quy mô lớn. Kiến trúc này cho phép hệ thống xử lý hàng triệu mặt hàng và cung cấp gợi ý phù hợp cho từng người dùng trong thời gian thực.

---

## 2. Xây dựng hệ thống gợi ý tích hợp AI tạo sinh cho ngành tiếp thị

### Câu chuyện khách hàng

Một tập đoàn kinh doanh về điện, gas và thiết bị điện gia dụng lớn nhất ở Kansai, Nhật Bản, muốn xây dựng hệ thống đề xuất thông minh tương tự như các sàn thương mại điện tử như TikTok, Shopee, Amazon.

#### Yêu cầu hệ thống

- **Đề xuất real-time:** Có thể đề xuất theo thời gian thực để tăng trải nghiệm người dùng
- **Hỗ trợ người dùng không đăng ký:** Đối với các người dùng không đăng ký tài khoản cũng có thể sử dụng
- **Không quan tâm hạ tầng:** Khách hàng không muốn quan tâm, quản lý về mặt hạ tầng ứng dụng, mã nguồn
- **Tập trung kinh doanh:** Chỉ tập trung về chiến lược kinh doanh bán hàng
- **Khả năng mở rộng:** Hệ thống có thể scale up-down linh hoạt trong các big sale event, release sản phẩm mới

### Tổng quan hệ thống

#### Hạ tầng

- **Nền tảng:** Triển khai trên môi trường AWS
- **Kiến trúc:** Multi-region, multi-AZ (Multi-Availability Zone)
- **Quản lý:** Sử dụng ControlTower để quản lý account doanh nghiệp

#### Front-end

- **Công nghệ:** ReactJS để build UI web/app
- **Tích hợp:** Amazon Amplify để quản lý authentication, hosting, và các dịch vụ frontend

#### Back-end

- **Công nghệ:** Java Spring để code logic API
- **Containerization:** Build thành các images, push image lên ECR (Elastic Container Registry)
- **Deployment:** Deploy với ECS Fargate (serverless container platform)
- **Auto-scaling:** Tích hợp auto scaling dựa trên chỉ số CPU từ A đến Z

#### Data/Machine Learning

- **Recommendation Engine:** AWS Personalize
- **Data Processing:** AWS Databrew (visual data preparation tool)

### Quy trình triển khai giải pháp Machine Learning (5 bước)

#### Bước 1: Thu thập dữ liệu (Gathering data/Data collection)

Hệ thống chia dữ liệu thành 3 bộ dữ liệu chính:

##### UserEvent/Interactions (Dữ liệu tương tác người dùng)

- **Vai trò:** Cực kỳ quan trọng trong việc bán hàng, đặc biệt là lĩnh vực thương mại điện tử
- **Nội dung:** Thu thập dữ liệu tương tác của người dùng:
  - Lượt xem sản phẩm
  - Lượt nhấp vào sản phẩm
  - Lượt mua sản phẩm
  - Thêm vào giỏ hàng
  - Các hành vi tương tác khác
- **Quy trình thu thập:**
  1. Thư viện JavaScript "Click Stream Events" trên web/app thu thập dữ liệu
  2. Dữ liệu gửi lên thông qua API Gateway
  3. Đưa vào Kinesis Data Streams (real-time streaming)
  4. Kinesis Data Firehose (batch processing và delivery)
  5. Cuối cùng lưu trữ trên S3

##### Item metadata (Metadata sản phẩm)

- **Nội dung:** Thông tin chi tiết về sản phẩm:
  - Tên sản phẩm
  - Mô tả
  - Giá
  - Phân loại
  - Hình ảnh
  - Các thuộc tính khác
- **Nguồn:** Export từ database RDS thành file CSV

##### User metadata (Metadata người dùng)

- **Nội dung:** Thông tin cá nhân của người dùng:
  - Tên
  - Tuổi
  - Email
  - Location (vị trí địa lý)
  - Các thông tin nhân khẩu học khác
- **Nguồn:** Export từ database RDS thành file CSV

#### Bước 2: Xử lý dữ liệu (Data pre-processing)

##### AWS Databrew

- **Mô tả:** Visual data preparation tool, không cần code
- **Tính năng:** Hơn 250 pre-built transformations
- **Chức năng:**
  - Thực hiện ETL (Extract, Transform, Load) dữ liệu
  - Loại bỏ các giá trị empty (rỗng)
  - Loại bỏ duplicate (trùng lặp)
  - Reformat data (chuyển đổi định dạng: string -> int, long, v.v.)
- **Lợi ích:** Nhanh, gọn, lẹ, không cần viết code Python

##### Phân tích và báo cáo

- Phân tích data tạo biểu đồ dựa vào số liệu
- Export PDF và share data cho các bên liên quan review

##### Lưu trữ dữ liệu

- **Vị trí:** Datasets được lưu multi-region ở AWS S3
- **Bảo mật:**
  - Bật S3 versioning (lưu trữ các phiên bản của file)
  - Sử dụng KMS (Key Management Service) mã hóa dữ liệu theo best practice của AWS
- **Tối ưu chi phí:** Tích hợp S3 lifecycle để tiết kiệm chi phí (chuyển sang storage class rẻ hơn sau một thời gian)

#### Bước 3: Xây dựng mô hình & huấn luyện mô hình (Model training) với AWS Personalize

Sau khi import datasets vào Personalize, Amazon Personalize cung cấp các công thức (recipes), là các thuật toán được thiết kế sẵn để giải quyết các use-case người dùng.

Hệ thống sử dụng 4 thuật toán built-in tương ứng với 4 model cho từng use-case:

##### USER_PERSONALIZATION

- **Mục đích:** Đề xuất các sản phẩm/dịch vụ cho người dùng từ danh mục sản phẩm
- **Ứng dụng:** Sử dụng ở homepage để tăng tính cá nhân hóa trải nghiệm người dùng
- **Ví dụ:** Khi người dùng đăng nhập lần 2-3, trang chủ sẽ ưu tiên hiển thị các sản phẩm phù hợp với sở thích của user dựa trên lịch sử tương tác trước đó
- **Thuật toán:** HRNN (Hierarchical Recurrent Neural Network)
  - Thiết kế để xử lý dữ liệu lịch sử người dùng có thứ tự theo thời gian
  - Sử dụng các mạng nơ-ron hồi tiếp (Recurrent Neural Networks – RNNs)
  - Dự đoán hành vi của người dùng dựa trên chuỗi tương tác trước đó

##### RELATED_ITEM

- **Mục đích:** Gợi ý các sản phẩm tương đồng với sản phẩm đang xem
- **Ứng dụng:** Apply ở detail page (trang chi tiết sản phẩm)
- **Ví dụ:** Nếu khách hàng thường mua các bếp điện, hệ thống sẽ đề xuất các bếp điện mới, bếp gas, v.v. cùng loại mà người dùng chưa xem
- **Thuật toán:** Cosine Similarity
  - Phương pháp phổ biến để đo lường độ tương đồng giữa hai vectơ
  - Vectơ thường biểu diễn các mục dựa trên các đặc trưng của chúng
  - Cosine Similarity là một giá trị từ -1 (hoàn toàn không tương đồng) đến 1 (hoàn toàn tương đồng), với 0 thể hiện sự độc lập

##### PERSONALIZED_RANKING

- **Mục đích:** Xếp hạng danh sách các sản phẩm đề xuất cho user khi user tìm kiếm một sản phẩm bất kỳ
- **Cơ sở:** Dựa trên lượt đánh giá/tương tác
- **Ví dụ:** Khi user tìm kiếm 1 chiếc bếp điện, hệ thống sẽ xếp hạng các kết quả tìm kiếm dựa trên mức độ phù hợp với sở thích và hành vi của user

##### USER_SEGMENTATION

- **Mục đích:** Phân khúc khách hàng dựa trên các đặc điểm
- **Cơ sở phân khúc:**
  - Đặc điểm nhân khẩu học (demographic)
  - Hành vi mua sắm (purchasing behavior)
  - Tâm lý khách hàng (customer psychology)
- **Thuật toán:** kNN (k-Nearest Neighbors)
- **Ứng dụng:** Sử dụng trong chiến lược marketing để nhắm mục tiêu đúng đối tượng

#### Bước 4: Đánh giá và triển khai mô hình (Model Evaluation & Deployment)

##### Đánh giá mô hình

Hệ thống sử dụng 2 phương pháp đánh giá:

**Phần 1:** Đánh giá tự động bằng các chỉ số

- **F1 Score:** Đạt mức tối đa (1.000)
- **Ý nghĩa:** Mô hình có cả precision và recall đạt mức tối đa (1.000)
- Precision: Độ chính xác của các đề xuất (tỷ lệ đề xuất đúng)
- Recall: Độ bao phủ (tỷ lệ các sản phẩm phù hợp được đề xuất)

**Phần 2:** Đánh giá từ bộ test case

- Hơn 300 test case từ khách hàng định nghĩa
- Test chạy thực tế (test chạy bằng cơm) để đảm bảo chất lượng

##### Triển khai mô hình (Deploy model)

- **Nền tảng:** Sau khi model được deploy trên SageMaker Endpoint của AWS
- **Truy cập:** User/application có thể invoke API endpoint để lấy kết quả
- **Kiến trúc:**
  - Client -> API Gateway
  - Sử dụng Lambda để invoke SageMaker Endpoint API
  - Trả về kết quả đề xuất cho client

#### Bước 5: Giám sát mô hình (Monitor Model)

- **Logging:** Log được lưu trữ trên CloudWatch
- **Visualization:** Gửi log từ CloudWatch đến Grafana được host trên EC2
- **Dashboard:** Tạo Dashboard theo dõi:
  - Hiệu suất Model (model performance metrics)
  - Số lượng yêu cầu API (API request volume)
  - Các chỉ số quan trọng khác

### Tích hợp AI tạo sinh (Generative AI Integration)

Sau khi Generative AI bùng nổ 2023-2024, nhu cầu sử dụng GenAI tạo ra cho ngành quảng cáo và tiếp thị (Advertising and Marketing Industry) ngày càng được ưu chuộng.

#### Mục tiêu

Tạo nội dung quảng cáo (ad copy) tự động dựa trên:

- Hình ảnh sản phẩm từ database
- Thông tin về sản phẩm/dịch vụ
- Đối tượng/mục tiêu của chiến dịch quảng cáo (đã được xử lý và thu thập ở mục USER_SEGMENTATION - phân khúc khách hàng)

#### Quy trình tích hợp GenAI

##### Bước 1: Người dùng cung cấp dữ liệu đầu vào

- **Hình ảnh sản phẩm:** Chọn hình ảnh sản phẩm muốn quảng cáo, hình ảnh được lưu trong S3
- **Loại dịch vụ quảng cáo:** Chọn loại dịch vụ:
  - Mail Marketing
  - SMS
  - Web Content
  - Post SNS (Social Network Service)
  - Các loại khác
- **Đối tượng mục tiêu:** Chọn nhóm người dùng được phân khúc từ Amazon Personalize

##### Bước 2: Xử lý dữ liệu qua AWS AppSync

- **AWS AppSync:** Có thể dễ dàng xây dựng các API GraphQL mà không cần quản lý cơ sở hạ tầng
- **WebSocket Subscription:** Dữ liệu đầu vào từ người dùng được gửi đến hệ thống qua AWS AppSync, thông qua kết nối websocket subscription
- **Real-time Updates:** Cho phép cập nhật kết quả theo thời gian thực khi xử lý dữ liệu

##### Bước 3: Xử lý hình ảnh bằng Amazon Rekognition

- **Amazon Rekognition:** Dịch vụ phân tích các đối tượng, cảnh vật, và ngữ cảnh trong hình ảnh của AWS
- **Chức năng phân tích:**
  - **Image labels:** Các nhãn hình ảnh (xác định các đối tượng, cảnh vật trong ảnh)
  - **Dominant colors:** Màu sắc chủ đạo trong hình ảnh
- **Mục đích:** Giúp hệ thống hiểu được nội dung của hình ảnh (ví dụ: ảnh có hoa, người chạy bộ, thức ăn, v.v.) và sử dụng thông tin này để tạo ra nội dung quảng cáo **chính xác** và có **ý nghĩa**

##### Bước 4: Tạo nội dung quảng cáo (Ad Copy) bằng Amazon Bedrock

- **Amazon Bedrock:** Nền tảng xử lý mô hình ngôn ngữ AI của AWS
- **LLM Model:** Sử dụng Titan Image Generator G1 v2
- **Quy trình:**
  1. Nhận dữ liệu phân tích hình ảnh từ Rekognition
  2. Kết hợp với thông tin sản phẩm/dịch vụ
  3. Kết hợp với đối tượng mục tiêu
  4. Tạo prompt (lời nhắc) cho mô hình ngôn ngữ (LLM)
  5. Amazon Bedrock tạo nội dung quảng cáo tự động dựa trên prompt

##### Bước 5: Kết quả được xuất bản

- **Gửi về người dùng:** Nội dung quảng cáo được tạo ra sẽ được gửi về phía người dùng qua AWS AppSync
- **Lưu trữ:** Lưu nội dung vào hệ thống chiến dịch để quảng cáo

#### Tính năng mở rộng: Switch Models

- **Khái niệm:** Tự do chuyển đổi giữa các model hàng đầu của OpenAI, IBM, AWS, v.v.
- **Nguyên tắc:** Mô hình giá càng cao chất lượng output cho ra sản phẩm càng tốt
- **Lợi ích:**
  - Mỗi model đã được training data riêng biệt
  - Mỗi model sẽ có một cách "thể hiện riêng"
  - Mang tính đột phá, thú vị
  - Linh hoạt trong việc lựa chọn model phù hợp với từng use-case

### Lợi ích và hiệu quả của hệ thống GenAI

#### Tự động hóa quy trình

- **Trước đây:** Sử dụng nội dung thuần text
- **Hiện tại:** Hệ thống tạo ra nội dung quảng cáo bao gồm:
  - Hình ảnh
  - Text
  - Màu sắc phù hợp
- **Kết quả:** Nội dung quảng cáo chính xác và phù hợp hơn

#### Tối ưu chi phí và thời gian

##### Quy trình truyền thống

- **Nhân lực cần thiết:**
  - Designer
  - Copywriter
  - Marketing team
- **Thời gian:** Tối thiểu 1 tuần cho các khâu:
  - Lên ý tưởng
  - Thiết kế
  - Phát triển
  - Đánh giá
- **Kết quả:** 1 bài PR/video về sản phẩm mới

##### Quy trình với GenAI

- **Thời gian:** Chỉ mất khoảng 1 ngày
- **Kết quả:** Có thể tạo ra cả 100 bài/video PR sản phẩm
- **Lưu ý:** Dùng nhiều, trả tiền nhiều
- **Lợi ích:**
  - Nếu không phù hợp có thể tải về máy tùy chỉnh lại
  - Không sợ vi phạm bản quyền

##### So sánh chi phí

- **Chi phí truyền thống:** Tiền nuôi team designer/copywriter/marketing chắc chắn lớn hơn trả cho AWS
- **Chi phí GenAI:** Chỉ trả tiền cho dịch vụ AWS sử dụng
- **Lợi ích:** Nếu chiến dịch có hàng trăm sản phẩm thì thời gian release sản phẩm sẽ nhanh hơn rất nhiều nhưng vẫn **"đảm bảo chất lượng"** (nếu sử dụng các model hiện đại, tiên tiến)

#### Tăng trưởng doanh thu

Sau khi ứng dụng giải pháp ML cho:

- Đề xuất sản phẩm
- Chiến lược phân khúc người dùng cho thị trường marketing

**Kết quả:** Revenue tăng trưởng gần **230%** so với năm trước.

### Kết luận

Giải pháp xây dựng hệ thống gợi ý sản phẩm thông minh, tích hợp AI tạo sinh trong lĩnh vực quảng cáo và tiếp thị mang lại nhiều lợi ích:

1. **Cá nhân hóa trải nghiệm:** Hệ thống có thể đề xuất real-time, phục vụ cả người dùng không đăng ký
2. **Tự động hóa:** Giảm thiểu công việc thủ công, tăng tốc độ phát triển nội dung
3. **Tối ưu chi phí:** Giảm chi phí nhân lực và thời gian phát triển
4. **Tăng trưởng doanh thu:** Tăng trưởng đáng kể nhờ cá nhân hóa và tự động hóa
5. **Khả năng mở rộng:** Hệ thống có thể scale up-down linh hoạt theo nhu cầu

Đây là một giải pháp toàn diện, từ thu thập dữ liệu, xử lý, xây dựng mô hình, đến tích hợp AI tạo sinh, nhằm tăng trải nghiệm người dùng và tối ưu hóa chiến lược kinh doanh.

---

## So sánh hai phương pháp

### Điểm tương đồng

- Cả hai đều sử dụng mô hình deep learning để tạo embeddings cho người dùng và sản phẩm
- Đều áp dụng kiến trúc multi-stage để tối ưu hóa hiệu suất
- Đều hướng đến mục tiêu cá nhân hóa trải nghiệm người dùng

### Điểm khác biệt

| Tiêu chí             | TikTok-like Recommender  | AWS Personalize với GenAI                       |
| -------------------- | ------------------------ | ----------------------------------------------- |
| **Nền tảng**         | Custom implementation    | AWS managed services                            |
| **Mô hình**          | Two-tower model (custom) | Multiple recipes (HRNN, Cosine Similarity, kNN) |
| **Tích hợp GenAI**   | Không có                 | Có (Amazon Bedrock + Rekognition)               |
| **Quản lý hạ tầng**  | Cần tự quản lý           | Fully managed                                   |
| **Khả năng mở rộng** | Cần tự cấu hình          | Auto-scaling built-in                           |
| **Use-case**         | E-commerce fashion (H&M) | E-commerce + Marketing (Điện, gas, thiết bị)    |
| **Độ phức tạp**      | Cao (cần hiểu sâu về ML) | Thấp (sử dụng managed services)                 |

### Khi nào nên sử dụng phương pháp nào?

#### TikTok-like Recommender (Custom)

- Khi cần kiểm soát hoàn toàn mô hình và thuật toán
- Khi có team ML chuyên nghiệp
- Khi cần tùy chỉnh sâu vào kiến trúc mô hình
- Khi muốn tối ưu chi phí ở quy mô rất lớn (sau khi đã đầu tư ban đầu)

#### AWS Personalize với GenAI

- Khi muốn tập trung vào business logic thay vì infrastructure
- Khi cần triển khai nhanh chóng
- Khi muốn tích hợp sẵn với các dịch vụ AWS khác
- Khi cần tính năng GenAI để tạo nội dung marketing
- Khi muốn giảm thiểu rủi ro về hạ tầng và scaling
