---
area: technology
domain: ai-ml
type: resource
title: 3D Models
description: 3D & Models
timestamp: "2026-06-19T13:43:26.162Z"
tags:
  - technology
  - ai-ml
resource: https://avaturn.me
---

# 3D & Models

## 3D Generation

- Tạo avatar 3D: [https://avaturn.me](https://avaturn.me/) #avatar
- Tạo mô hình từ hình ảnh / video: [https://rerun.io](https://rerun.io/) #3dmodel
- **Hunyuan3D-2.1**: Chuyển đổi hình ảnh thành các tài sản 3D chất lượng cao với vật liệu PBR sẵn sàng cho sản xuất - [GitHub](https://github.com/Tencent-Hunyuan/Hunyuan3D-2.1) #3D #image2text #PBR #Tencent

---

## Motion & Animation Generation

### Tencent HY-Motion 1.0

Mô hình chuyển đổi văn bản thành chuyển động (Text to Animation) thế hệ mới từ Tencent.

- **Kiến trúc**: Xây dựng trên kiến trúc Diffusion Transformer (DiT) và Flow Matching với quy mô hàng tỷ tham số.
- **Trạng thái**: Hiện đang là Top 1 HuggingFace (tại thời điểm ra mắt).
- **Project Page**: [https://hunyuan.tencent.com/motion](https://hunyuan.tencent.com/motion)
- **Github**: [https://github.com/Tencent-Hunyuan/HY-Motion-1.0](https://github.com/Tencent-Hunyuan/HY-Motion-1.0)
- **Hugging Face**: [https://huggingface.co/tencent/HY-Motion-1.0](https://huggingface.co/tencent/HY-Motion-1.0)
- **Technical report**: [https://arxiv.org/pdf/2512.23464](https://arxiv.org/pdf/2512.23464)

---

## CAD / Parametric Modeling

### ForgeCAD

CAD "AI-native": mô hình parametric được viết bằng JavaScript (`*.forge.js`) thay vì dựng tay trong GUI, nên AI coding agent có thể sinh và sửa model trực tiếp.

- **Model as code**: `param()` tạo slider, primitives + boolean (`union`/`subtract`), `fillet()`, pattern, thư viện part chuẩn (`lib.bolt()`, `lib.nut()` sinh ren xoắn thật), và SDF (`sdf.gyroid()`) cho lattice/hình hữu cơ — tất cả trong cùng một ngôn ngữ.
- **Validation loop**: cài dưới dạng native CLI (`forgecad run bracket.forge.js`), chạy deterministic checks và xuất report trước khi gia công.
- **Export**: STEP, STL, 3MF.
- **Use case**: sản phẩm in 3D, chi tiết cơ khí, assembly/joint/collider cho robotics simulation, và sinh biến thể model làm AI training data cho spatial reasoning.
- Website: https://forgecad.io/ #CAD #parametric #3D #robotics #agent
