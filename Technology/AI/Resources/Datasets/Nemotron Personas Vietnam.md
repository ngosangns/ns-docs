---
area: technology
domain: dataset
type: resource
title: Nemotron Personas Vietnam
description: NVIDIA's synthetic Vietnamese persona dataset built with NeMo Data Designer - 6M personas across 1M records (~5.4 GB), CC BY 4.0, grounded in GSO statistics.
timestamp: "2026-10-25T00:00:00.000Z"
tags:
  - technology
  - dataset
  - vietnamese
  - nlp
  - llm
resource: https://huggingface.co/datasets/nvidia/Nemotron-Personas-Vietnam
---

# Nemotron Personas Vietnam

Ghi chú về bộ dữ liệu personas tiếng Việt tổng hợp của NVIDIA trên Hugging Face. Đọc thẻ dataset, README và HF API ngày 25/10/2026.

**Source:** [nvidia/Nemotron-Personas-Vietnam](https://huggingface.co/datasets/nvidia/Nemotron-Personas-Vietnam)

## Tổng quan

- Bộ personas tiếng Việt tổng hợp do NVIDIA công bố, README gọi là "tập dữ liệu personas tiếng Việt quy mô lớn đầu tiên" (claim của NVIDIA, đọc trên thẻ ngày 25/10/2026).
- 6.000.000 personas tiếng Việt trong 1.000.000 bản ghi; mỗi bản ghi có 6 văn bản persona: 5 chuyên ngành (nghề nghiệp, thể thao, nghệ thuật, du lịch, ẩm thực) cộng 1 persona tổng hợp (README, đã kiểm chứng).
- Do NVIDIA Corporation cùng [FPT Smart Cloud](https://factory.fpt.ai) và Viện Quantum AI & Cyber Security (Tập đoàn FPT) tạo ra; FPT đóng góp chuyên môn nhân khẩu học địa phương, ground văn hóa, rà soát tại các thành phố trực thuộc trung ương và kiểm định chất lượng trong pipeline (README, đã kiểm chứng).
- Metadata HF (API, 25/10/2026): tạo ngày 04/06/2026, cập nhật lần cuối 16/10/2026, 19.643 lượt tải và 222 likes tại thời điểm kiểm tra (con số thay đổi theo thời gian).

## Quy mô

Đã kiểm chứng qua HF API (cardData) ngày 25/10/2026:

- 1.000.000 bản ghi, một split `train`, `size_categories: 1M<n<10M`.
- `dataset_size`: 5.438.142.588 bytes (~5,44 GB); `download_size`: 2.247.142.294 bytes (~2,25 GB, parquet nén).
- 11 file parquet `data/train-00000-of-00011.parquet` đến `data/train-00010-of-00011.parquet`, kèm 10 ảnh biểu đồ phân bố trong `images/` (ví dụ age distribution, occupation treemap).
- README ghi ~2 tỷ tokens tính bằng tokenizer GPT-3.5-turbo (tiktoken `cl100k_base`), trong đó 1,14 tỷ tokens personas; với tokenizer Qwen3.5 chỉ còn 1,01 tỷ (563 triệu tokens personas) (số của NVIDIA, chưa đo lại).

## Schema

21 cột, đã kiểm chứng qua HF API; tất cả string trừ `age` (int64):

- Nhân khẩu học: `sex` (Nam/Nữ), `age` (18–90), `marital_status`, `education_level`, `occupation`, `zone`, `region`, `country`.
- Văn bản persona: `persona`, `professional_persona`, `sports_persona`, `arts_persona`, `travel_persona`, `culinary_persona`.
- Kỹ năng và sở thích: `skills_and_expertise`, `skills_and_expertise_list`, `hobbies_and_interests`, `hobbies_and_interests_list`, `career_goals_and_ambitions`, `cultural_background`.
- Định danh: `uuid`.

Thống kê từ Dataset Viewer trên thẻ (25/10/2026, kiểm tra hai lần): `occupation` 144 giá trị, `region` 6, `education_level` 7, `marital_status` 4, `zone` 2, `country` 1 ("Việt Nam"). Sáu giá trị `region`: Đồng bằng sông Cửu Long, Đồng bằng sông Hồng, Đông Nam Bộ, Bắc Trung Bộ và Duyên hải miền Trung, Tây Nguyên, Trung du và miền núi phía Bắc.

## Cách tạo dữ liệu

- Tạo bằng [NeMo Data Designer](https://github.com/NVIDIA-NeMo/DataDesigner), hệ thống compound AI cấp doanh nghiệp của NVIDIA để tạo dữ liệu tổng hợp; dùng probabilistic graphical model (PGM) độc quyền, mô hình [SaoLa-Small-32B](https://marketplace.fptcloud.com/en/models/saola-small-32b) và các phương thức kiểm định, đánh giá có sẵn trong Data Designer (README, đã kiểm chứng).
- Ground theo thống kê chính thức của Tổng cục Thống kê (GSO): Niên giám Thống kê tóm tắt 2024, Tổng điều tra dân số và nhà ở 2024, Khảo sát mức sống hộ gia đình Việt Nam (VHLSS) 2024 — dữ liệu về giới tính, tỉnh thành, ngành, nghề nghiệp và học vấn (README, đã kiểm chứng).
- Bản đồ hành chính theo Quyết định 19/2025/QĐ-TTg (hiệu lực 01/07/2025, sau sáp nhập), phủ đủ 34 tỉnh, thành phố trực thuộc trung ương; README nhấn mạnh phủ cả 54 dân tộc (đã kiểm chứng nội dung README, chưa đối chiếu ngược với văn bản gốc của GSO).
- Chỉ chứa persona từ 18 tuổi trở lên (README; khớp min/max của `age` là 18/90 trên viewer).

## License và giới hạn

- CC BY 4.0 (HF API và README, đã kiểm chứng); README ghi miễn phí để huấn luyện nhiều loại mô hình, dùng được cả thương mại và phi thương mại, mọi dữ liệu là tổng hợp nên trùng với người thật chỉ là ngẫu nhiên.
- Không có tên riêng (first/last names) và trait tính cách; loại trừ persona đặc thù doanh nghiệp (ví dụ tài chính, y tế) (README, đã kiểm chứng).

## Mục đích sử dụng

Theo README (đã kiểm chứng):

- Hỗ trợ nhà phát triển Việt Nam xây dựng hệ thống [Sovereign AI](https://www.nvidia.com/en-us/lp/industries/global-public-sector/sovereign-ai-technical-overview/), phản ánh nhân khẩu học và bối cảnh văn hóa đặc thù từng vùng.
- Đa dạng hóa dữ liệu tổng hợp, giảm bias dữ liệu và mô hình, tăng đa dạng phản hồi tiếng Việt; dùng được cho huấn luyện và đánh giá LLM tiếng Việt.

## Cách tải

```python
from datasets import load_dataset

# Personas tiếng Việt – Vietnamese personas
nemotron_personas = load_dataset("nvidia/Nemotron-Personas-Vietnam", split="train")
```

Snippet nằm trong README của thẻ, chưa chạy thử.

## Các bộ Nemotron-Personas khác

Đã kiểm chứng tồn tại qua HF API (tìm `author=nvidia&search=Nemotron-Personas` ngày 25/10/2026), ngoài bản Việt Nam: USA (06/2025, en), Japan (09/2025, ja), India (10/2025, en/hi), Brazil (01/2026, pt), Singapore (01/2026, en), France (03/2026, fr), Korea (04/2026, ko), El Salvador (06/2026, es), Belgium (06/2026, nl/fr/de/en), UK (10/2026, en), Germany (10/2026, de) — năm trong ngoặc là tháng tạo trên HF và ngôn ngữ khai báo.

Chưa kiểm chứng: chưa tìm thấy bài blog NVIDIA hay paper nào được dẫn trong thẻ (README không dẫn paper, phần tìm blog NVIDIA chưa xác nhận được ngày 25/10/2026).

## References

- NeMo Data Designer: https://github.com/NVIDIA-NeMo/DataDesigner
- Sovereign AI technical overview của NVIDIA: https://www.nvidia.com/en-us/lp/industries/global-public-sector/sovereign-ai-technical-overview/

> **See also:** [Vietnamese Language Datasets](/Technology/AI/Resources/Datasets/Vietnamese Language Datasets)
