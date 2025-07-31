---
relates:
  - "[[Machine learning - Deep Learning - AI - ML - DL]]"
---
# 1. Kỹ thuật Prompt Cơ Bản (Text-Based Prompting)

Những kỹ thuật này tập trung vào việc xây dựng prompt để đưa ra các yêu cầu hoặc hướng dẫn cho LLM:

### 1.1.1. Zero-Shot Prompting

> Đưa ra yêu cầu trực tiếp mà không cần cung cấp ví dụ.

**Ví dụ:**

> "Dịch câu này sang tiếng Pháp: ‘Xin chào.’"

### 1.1.2. Few-Shot Prompting

> Cung cấp một vài ví dụ trước khi yêu cầu mô hình xử lý.

**Ví dụ:**

> "2 + 2 = 4, 4 + 5 = 9, 8 + 0 = ?, Hãy tính tổng 7 + 3."

### 1.1.3. Exemplar Selection

Một số yếu tố quan trọng trong việc chọn ví dụ:

- **Sắp xếp (Ordering):** Thứ tự ví dụ ảnh hưởng đến kết quả.
- **Số lượng (Quantity):** Tăng số ví dụ có thể giúp cải thiện hiệu suất, nhưng hiệu quả có thể giảm sau 20 ví dụ.
- **Tương tự (Similarity):** Chọn ví dụ gần giống với yêu cầu hiện tại.
- **Đa dạng (Diversity):** Đôi khi cần sự đa dạng để mô hình không bị lệ thuộc vào mẫu.

### 1.1.4. Instruction Selection

> Chọn hướng dẫn phù hợp (cụ thể hay chung chung).

### 1.1.5. Emotion Prompting

> Thêm yếu tố cảm xúc vào yêu cầu để mô hình hiểu ngữ cảnh tốt hơn.

**Ví dụ:**

> "Hãy viết như đây là điều quan trọng nhất trong cuộc đời tôi."

### 1.1.6. Role Prompting

> Định nghĩa vai trò cụ thể cho mô hình.

**Ví dụ:**

> "Bạn là một chuyên gia tâm lý. Hãy đưa ra lời khuyên."

### 1.1.7. Style Prompting

> Yêu cầu mô hình viết theo phong cách cụ thể.

**Ví dụ:**

> "Hãy viết một bài thơ như Nguyễn Du."

---

# 2. Kỹ thuật Tạo Suy Luận (Thought Generation)

Đây là các kỹ thuật giúp LLM suy luận theo từng bước để đưa ra câu trả lời logic:

### 2.1.1. Chain-of-Thought (CoT) Prompting

> Khuyến khích mô hình diễn giải suy nghĩ từng bước.

**Ví dụ:**

> Thêm “Hãy giải thích từng bước” vào câu lệnh.

### 2.1.2. Zero-Shot CoT

> Không cần ví dụ nhưng yêu cầu mô hình tự suy luận.

### 2.1.3. Least-to-Most Prompting

> Chia bài toán lớn thành các phần nhỏ và giải từng phần.

### 2.1.4. Tree-of-Thought

> Dùng mô hình để tạo cây suy luận, đánh giá từng nhánh và chọn giải pháp tốt nhất.

### 2.1.5. Plan-and-Solve Prompting

> Yêu cầu lập kế hoạch trước khi giải bài toán.

### 2.1.6. Skeleton-of-Thought

> Tạo dàn ý trả lời, sau đó giải quyết từng phần.

---

# 3. Kỹ thuật Tối Ưu Prompt

Những kỹ thuật này tập trung vào việc cải thiện chất lượng prompt:

### 3.1.1. Prompt Paraphrasing

> Diễn đạt lại prompt với từ ngữ khác mà không thay đổi ý nghĩa.

### 3.1.2. AutoPrompt

> Dùng thuật toán để tự động tối ưu hóa các "trigger words".

### 3.1.3. Prompt Optimization

> Tối ưu hóa prompt qua phản hồi từ mô hình và con người.

---

# 4. Kỹ thuật Prompt Đa Ngôn Ngữ (Multilingual Prompting)

Dùng cho các bài toán liên quan đến nhiều ngôn ngữ:

### 4.1.1. Translate First Prompting

> Dịch câu hỏi sang tiếng Anh trước khi đưa vào mô hình.

### 4.1.2. Cross-Lingual Self Consistent Prompting

> Tạo các đường dẫn suy luận bằng nhiều ngôn ngữ để tăng độ chính xác.

---

# 5. Kỹ thuật Prompt Đa Phương Thức (Multimodal Prompting)

Áp dụng cho các bài toán liên quan đến nhiều loại dữ liệu như hình ảnh, âm thanh, video:

### 5.1.1. Image Prompting

> Yêu cầu mô hình mô tả hình ảnh hoặc xử lý bài toán trực quan.

### 5.1.2. Multimodal Chain-of-Thought

> Kết hợp CoT với dữ liệu hình ảnh hoặc âm thanh.

---

# 6. Kỹ thuật Nâng Cao (Agent-Based Prompting)

Dùng LLM như một agent có khả năng tự kiểm tra và sử dụng công cụ ngoài:

### 6.1.1. Tool Use Agents

> Mô hình sử dụng công cụ bên ngoài (như máy tính, API) để hoàn thành yêu cầu.

### 6.1.2. Code-Generation Agents

> Sử dụng LLM để viết mã và tự thực thi.

### 6.1.3. Retrieval Augmented Generation (RAG)

> Lấy thông tin từ nguồn bên ngoài để tăng độ chính xác.

---

# 7. Kỹ thuật Answer Engineering

Tập trung vào việc tối ưu hóa cách trình bày câu trả lời:

### 7.1.1. Answer Shape

> Định dạng câu trả lời (bảng, danh sách, CSV).

### 7.1.2. Answer Extractor

> Trích xuất thông tin chính xác từ đầu ra của mô hình.

---

## 7.2. Lưu ý

- **Tính ứng dụng:** Kết hợp nhiều kỹ thuật để đạt kết quả tốt hơn.
- **Thử nghiệm:** Hãy thực hành trên các bài toán thực tế để nắm rõ hiệu quả từng phương pháp.
- **Không ngừng học hỏi:** Các kỹ thuật mới luôn được phát triển, nên cập nhật liên tục!