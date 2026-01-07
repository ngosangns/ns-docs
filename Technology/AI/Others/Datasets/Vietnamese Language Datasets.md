---
tags:
  - area/technology
  - domain/ai-ml
  - topic/javascript
  - type/resource
  - lang/vi
---

# Vietnamese Language Datasets

Tóm tắt từ bài viết về hợp tác giữa Viettel và NVIDIA trong việc xây dựng mô hình ngôn ngữ lớn tiếng Việt.

**Nguồn:** [Facebook Post - Machine Learning cơ bản](https://www.facebook.com/groups/machinelearningcoban/posts/2067772090346854/)

## Tổng quan

- Hợp tác giữa Viettel và NVIDIA nhằm xây dựng mô hình ngôn ngữ lớn tiếng Việt
- Mục tiêu hỗ trợ cộng đồng nghiên cứu và phát triển AI Việt Nam
- Chia sẻ phương pháp xây dựng mô hình và các bộ dữ liệu tiếng Việt chất lượng cao

## Vietnamese Curated Dataset

- **Quy mô:** 15 tỷ tokens
- **Nguồn dữ liệu:**
  - Wikipedia
  - OSCAR
  - C4
  - binhvq-news
  - Dữ liệu tự crawl
- **Công cụ xử lý:** NeMo Curator
- **Quy trình xử lý:**
  - Loại bỏ dữ liệu trùng lặp
  - Lọc nội dung
- **Nơi công khai:** Hugging Face
- **Link:** https://huggingface.co/datasets/VTSNLP/vietnamese_curated_dataset
- **Tài liệu chi tiết:** Bài blog trên NVIDIA Developer cung cấp mã nguồn và phân tích về sự thay đổi của dữ liệu qua từng giai đoạn xử lý
- **Link blog:** https://developer.nvidia.com/blog/processing-high-quality-vietnamese-language-data-with-nvidia-nemo-curator

## Vietnamese Instruct General Dataset

- **Quy mô:** 4,5 triệu mẫu instruction
- **Các tác vụ đa dạng:**
  - Tóm tắt
  - Hỏi đáp
  - Dịch
  - Suy luận
  - Sinh nội dung
- **Phương pháp xây dựng:**
  - Tổng hợp dữ liệu
  - Dịch từ nhiều nguồn
  - Sinh dữ liệu
  - Kiểm tra chất lượng bằng Gemini
- **Nơi công khai:** Hugging Face
- **Link:** https://huggingface.co/datasets/VTSNLP/instruct_general_dataset

## Vietnamese Function Calling Test

- **Mục đích:** Bộ benchmark để đánh giá hiệu quả và độ chính xác của các model LLM trong nhiệm vụ Function Calling cho tiếng Việt
- **Bối cảnh:** Được xây dựng sau khi phát triển model Llama-3.2-3B-Instruct-Frog, tập trung vào tính tổng quát của nhiệm vụ Function Calling
- **Đặc điểm:**
  - Được xây dựng thủ công, đa dạng và hoàn toàn độc lập với việc phát triển model Frog
  - Đảm bảo tính đa dạng, sát thực tế
  - 100% là các unseen function với các bộ dữ liệu huấn luyện công khai trước đó để đảm bảo việc đánh giá giữa các mô hình là tin cậy
- **Quy mô dữ liệu:**
  - **Số lượng mẫu:** 2,899 single-turn function calling samples
  - **Số lượng functions:** 159 functions
  - **Số domains:** 10 domains
- **Các domains bao gồm:**
  - Banking (Ngân hàng)
  - Insurance (Bảo hiểm)
  - Travel (Du lịch)
  - Education (Giáo dục)
  - Health (Sức khỏe)
  - Recruitment (Tuyển dụng)
  - Vehicle control (Điều khiển phương tiện)
  - Shopping (Mua sắm)
  - Work (Công việc)
  - Car Services (Dịch vụ xe hơi)
- **Kết quả đánh giá hiện tại:**
  - Model Llama-3.2-3B-Instruct-Frog: Function name accuracy 95.79%, Exact Match accuracy 51.05%
  - Model Llama-3.2-3B-Instruct-Frog-Pro: Function name accuracy 98.12%, Exact Match accuracy 56.38%
  - Gemini-1.5-Pro: Function name accuracy 96.96%, Exact Match accuracy 55.16%
  - Gemini-1.5-Flash: Function name accuracy 97.10%, Exact Match accuracy 51.64%
  - Gemini-1.5-Flash-8B: Function name accuracy 97.38%, Exact Match accuracy 64.75%
  - GPT-4o: Function name accuracy 94.38%, Exact Match accuracy 52.88%
- **Nơi công khai:** Hugging Face
- **Link:** https://huggingface.co/datasets/phamhai/Vietnamese-Function-Calling-Test
- **Ghi chú:** Dataset được release để cộng đồng cùng đóng góp và đánh giá các model khác

## Tài liệu tham khảo

- Blog NVIDIA về quá trình xây dựng Vietnamese Curated Dataset: https://developer.nvidia.com/blog/processing-high-quality-vietnamese-language-data-with-nvidia-nemo-curator
