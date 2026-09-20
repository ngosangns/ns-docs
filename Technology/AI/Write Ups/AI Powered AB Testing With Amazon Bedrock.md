---
area: technology
domain: ai-ml
topic: agents
type: case-study
title: AI Powered AB Testing With Amazon Bedrock
description: Ghi chú/tổng hợp kiến trúc công cụ kiểm thử A/B thích ứng dùng Amazon Bedrock + MCP để gán biến thể theo ngữ cảnh người dùng
timestamp: '2026-09-20T00:00:00.000Z'
tags:
  - technology
  - ai-ml
  - agents
  - aws
  - bedrock
  - mcp
  - ab-testing
resource: https://awsstudygroup.com/2026/04/03/xay-dung-cong-cu-kiem-thu-a-b-duoc-ho-tro-boi-ai-su-dung-amazon-bedrock
---

# AI-Powered A/B Testing với Amazon Bedrock — Ghi chú

> **Nguồn**: [Xây dựng công cụ kiểm thử A/B được hỗ trợ bởi AI sử dụng Amazon Bedrock](https://awsstudygroup.com/2026/04/03/xay-dung-cong-cu-kiem-thu-a-b-duoc-ho-tro-boi-ai-su-dung-amazon-bedrock) — Vijit Vashishtha & Koshal Agrawal, AWS Study Group, 18/03/2026

## Vấn đề của A/B testing truyền thống

Gán biến thể ngẫu nhiên + đợi hàng tuần để đủ ý nghĩa thống kê có 4 hạn chế: bỏ qua tín hiệu sớm, hội tụ chậm, nhiễu cao (gán sai nhu cầu người dùng), và cần phân đoạn thủ công sau khi có dữ liệu.

Ví dụ minh họa: thử 2 CTA "Mua ngay" (A) vs "Mua ngay – Miễn phí vận chuyển" (B). B thắng sớm, nhưng phân tích sâu hơn lộ ra: thành viên thân thiết cao cấp (đã có free shipping) thấy khó chịu với thông điệp B, khách từ trang coupon thích B, người dùng mobile thích A vì CTA ngắn. Random assignment cần thời gian dài để trung bình hóa các hiệu ứng phân mảng này.

## Kiến trúc giải pháp

Stack: **Amazon CloudFront + WAF** (CDN, chống DDoS/SQLi) → **VPC Origin** → **ALB nội bộ** → **ECS Fargate** (FastAPI) → **Amazon Bedrock** (Claude Sonnet, native tool use) qua **Model Context Protocol (MCP)** để truy cập dữ liệu hành vi → **DynamoDB** (5 bảng: experiments, events, assignments, profiles, batch jobs) + **S3** (frontend tĩnh, event logs), tất cả qua VPC Endpoints (không ra internet công khai).

## Chiến lược gán kết hợp (hybrid assignment)

- **User mới** → gán theo **hash** (`sha256(user_id)` → chọn variant theo index) — nhanh, miễn phí, không cần AI vì chưa có dữ liệu hành vi để phân tích.
- **User quay lại** → gọi **Amazon Bedrock** (`bedrock_client.converse` với `toolConfig` trỏ vào MCP tool registry) để ra quyết định dựa trên ngữ cảnh.

Đây là điểm mấu chốt: AI chỉ tạo giá trị khi có dữ liệu hành vi để phân tích; user mới dùng hash để có trải nghiệm nhất quán trong lúc hệ thống thu thập tín hiệu.

## Prompt 2 tầng cho Bedrock

- **System prompt**: định nghĩa vai trò ("chuyên gia tối ưu A/B testing"), liệt kê 11 MCP tool khả dụng, và ràng buộc cứng — luôn gọi `get_user_assignment` trước tiên, chỉ đổi variant đã gán khi có bằng chứng cải thiện ≥30%, output **chỉ** là JSON hợp lệ (không kèm giải thích ngoài field `reasoning`).
- **User prompt**: nhồi ngữ cảnh cụ thể cho quyết định — device/page/referrer/variant trước đó, engagement score, conversion likelihood, interaction style, danh sách variant, số liệu hiệu suất lịch sử, và khung quyết định 5 bước.

Model tự quyết định cần gọi tool nào dựa trên tình huống (multi-turn: gọi tool → nhận `toolResult` → tiếp tục → JSON quyết định cuối), thay vì hard-code luồng lấy dữ liệu như ML truyền thống.

## Vì sao dùng Bedrock thay vì ML truyền thống

1. **Tool orchestration linh hoạt**: MCP để model tự chọn tool cần gọi theo ngữ cảnh (user mới → tương tự người dùng; user cũ → hồ sơ cá nhân) thay vì feature engineering cứng.
2. **Lý luận đa yếu tố có giải thích**: field `reasoning` tổng hợp thiết bị, similar users, engagement, hiệu suất lịch sử thành một câu giải thích — ML cổ điển chỉ ra xác suất mà không giải thích tương tác giữa các yếu tố.
3. **Xử lý tín hiệu xung đột**: khi conversion rate tổng thể ủng hộ A nhưng similar-user cluster + device lại ủng hộ B, model cân nhắc trade-off tường minh thay vì chỉ tối ưu một metric.
4. **Không cần training pipeline**: hoạt động ngay từ ngày 1 (dùng similar-user patterns có sẵn), cải thiện dần theo dữ liệu tích lũy — không cần thu thập training set, feature engineering, retrain định kỳ, hay A/B test chính model ML.

## MCP tools chính

- **`get_similar_users()`** — collaborative filtering: tìm cluster tương tự, tính similarity score (0–1) từ engagement (30%), interaction style (20%), content preference (20%), conversion likelihood (15%), visual preference (15%); ngưỡng similar là >0.5.
- **`get_user_profile()`** — đọc bảng `PersonalizationProfile`: các tín hiệu hành vi (engagement, conversion likelihood, CTA responsiveness, reading depth, social/urgency sensitivity), preferences (interaction style, attention span, visual preference), performance data, device context.
- **`get_variant_performance()`** — số liệu real-time từ bảng `Experiment` (impressions, clicks, conversions, conversion rate, confidence) + historical time-series từ bảng `Events`.
- Sau mỗi quyết định, hệ thống ghi ngược `last_selected_variant`, `confidence_score`, `behavior_tags` vào profile để cải thiện quyết định sau.

## Confidence score

Điểm tin cậy (0–1) là **đánh giá tổng hợp** (không phải công thức cố định) dựa trên: lượng dữ liệu hành vi sẵn có, mức độ nhất quán giữa các tín hiệu, quy mô/độ đồng nhất của cluster similar-users, ý nghĩa thống kê của performance data, độ trưởng thành của profile. Thang tham khảo: 0.9–1.0 rất đáng tin cậy, 0.7–0.89 cao, 0.5–0.69 trung bình, 0.3–0.49 thấp, <0.3 không đủ dữ liệu.

## Ví dụ đối chiếu 2 user

- **User cũ, thành viên thân thiết, mobile**: có profile confidence cao (0.87) → model dựa chủ yếu vào lịch sử cá nhân + similar-user cluster xác nhận thêm → chọn A (concise CTA) với confidence 0.86, vì free-shipping message là dư thừa với loyalty member.
- **User mới từ trang coupon**: profile confidence rất thấp (0.12) nhưng referrer + 39 similar new-users từ coupon site cho tín hiệu mạnh → chọn B (incentive messaging) với confidence 0.91 dù thiếu lịch sử cá nhân — bù bằng ngữ cảnh + similar-user evidence.

Điểm chính: hệ thống tự động chuyển trọng số giữa "lịch sử cá nhân" và "similar-user patterns" tùy vào dữ liệu sẵn có, thay vì áp cùng một logic cho mọi user.

## Hướng mở rộng

Dynamic variant generation (Bedrock tự sinh nội dung CTA thay vì chọn từ set cố định), multi-armed bandits (kết hợp AI personalization với phân bổ traffic tự động), cross-experiment learning, real-time optimization qua Kinesis, auto-discovery segment bằng clustering.

## Lộ trình triển khai đề xuất

1. Deploy hạ tầng qua CloudFormation, bắt đầu 100% hash-based assignment để có baseline.
2. Bật AI selection dần cho returning users, thử với traffic nhỏ trước.
3. Mở rộng MCP tools theo nhu cầu nghiệp vụ (inventory, pricing, customer service history...).
4. Giám sát qua CloudWatch: latency gán biến thể, chi phí Bedrock API, conversion metrics, cảnh báo bất thường.
5. Triển khai dần các tính năng nâng cao (dynamic variant, bandits, cross-experiment learning) khi hệ thống trưởng thành.

Mã nguồn tham chiếu (FastAPI backend, React frontend, CloudFormation templates, MCP server) có trên GitHub — "A/B Testing Engine" (link trong bài gốc).
