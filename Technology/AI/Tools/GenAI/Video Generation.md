---
area: technology
domain: ai-ml
type: resource
---
# Video Generation

## Video Generation Tools

- **Chuyển văn bản thành video**:
  - [runwayml.com](http://runwayml.com/) #text2video
- **Tìm video bằng text**: [twelvelabs.io](http://twelvelabs.io/) #videoSearch
- [Tạo video bằng các tool AI](https://super.myninja.ai/agents/b70180c0-e099-4561-9da4-3f3e0f5d6710)
- **v-express** - Công nghệ nhép miệng theo voice: [GitHub](https://github.com/tiankuan93/ComfyUI-V-Express) #lipSync #ComfyUI
- **Emote Portrait Alive**: Chuyển hình ảnh + âm thanh của một người thành video của người đó - [Website](https://humanaigc.github.io/emote-portrait-alive) #emote
- **LivePortrait**: Biến ảnh của nhân vật nào đó thành video với biểu cảm của input video khác - [Hugging Face](https://huggingface.co/spaces/KwaiVGI/LivePortrait) #livePortrait
- **Wan 2.2 Animate**: Mô hình AI lớn với 14 tỷ tham số, sử dụng kiến trúc Mixture-of-Experts, cho phép tạo video nhân vật chất lượng cao từ một hình ảnh tham chiếu duy nhất. Hỗ trợ thay thế diễn viên trong video, giữ nguyên cảnh và chuyển động camera, tái tạo chính xác biểu cảm khuôn mặt, chuyển động cơ thể - [Website](https://wan2animate.com/) #video #animation #character #MoE
- **OmniHuman-1**: Khung AI đa phương thức, cho phép tạo video con người chân thực từ một hình ảnh tĩnh và tín hiệu chuyển động như âm thanh hoặc video. Tạo ra video với đồng bộ hóa môi và cử chỉ chính xác, hỗ trợ tạo video toàn thân động. Dựa trên Diffusion Transformer - [Website](https://www.omnihuman1.org/) #video #human #multimodal #diffusion

---

## V-JEPA 2 (Video Joint Embedding Predictive Architecture 2)

### Tổng quan
- **V-JEPA 2**: World model tự giám sát (self-supervised foundation world model) được train trên video.
- Đạt state-of-the-art trong visual understanding và prediction.
- Cho phép **zero-shot robot control** trong môi trường mới.
- Bước tiếp theo hướng tới tầm nhìn về AI sử dụng world model để:
  - Hiểu thực tế vật lý
  - Dự đoán kết quả
  - Lập kế hoạch chiến lược hiệu quả
  - Tất cả với minimal supervision

### Khả năng chính
#### Hiểu thế giới (World Understanding)
- Hiểu chuyển động (motion understanding) xuất sắc.
- Khả năng visual reasoning hàng đầu khi kết hợp với language modeling.

#### Dự đoán (Prediction)
- Có thể dự đoán về cách thế giới sẽ phát triển.
- Đặt state-of-the-art mới trong việc dự đoán hành động từ các tín hiệu ngữ cảnh (contextual cues).

#### Lập kế hoạch cho Robot Control
- Xây dựng trên khả năng hiểu và dự đoán.
- Có thể được sử dụng cho **zero-shot robot planning** để tương tác với các đối tượng không quen thuộc trong môi trường mới.
- Train trên 62 giờ dữ liệu robot từ Droid dataset.
- Deploy trên robot arm trong môi trường mới.
- Bằng cách chỉ định tasks như goal images, mô hình hoàn thành các tasks như: Reaching, Grasping, Pick-and-place.
- **Task-agnostic**: Có thể được train mà không cần dữ liệu robot rộng rãi hoặc demonstrations cụ thể cho task.

### Kiến trúc mô hình
1. **Pre-training (Self-supervised learning)**: Encoder và predictor được pre-train qua self-supervised learning từ visual data.
2. **Fine-tuning**: Fine-tune trên một lượng nhỏ dữ liệu robot, cho phép lập kế hoạch hiệu quả mà không cần extensive expert robot demonstrations.

### Tầm nhìn và Ứng dụng
- **Robotic Assistants**: Mở ra kỷ nguyên mới cho robotics, xử lý công việc nhà và các tasks phức tạp.
- **Wearable Assistants**: Hỗ trợ cá nhân điều hướng môi trường bận rộn, cảnh báo chướng ngại vật và mối nguy hiểm.

### Tài nguyên
- **Website**: [https://ai.meta.com/vjepa/](https://ai.meta.com/vjepa/)
- **World Models khác**: [[Code World Model]]