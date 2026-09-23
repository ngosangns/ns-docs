---
area: technology
domain: 3d-generation
type: resource
title: 3D Models
description: Tools and models for AI 3D asset generation, text-to-motion animation, and code-driven parametric CAD.
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - 3d-generation
  - animation
  - cad
resource: https://avaturn.me
---

# 3D Models

## 3D Generation

- Create 3D avatars: [https://avaturn.me](https://avaturn.me/) #avatar
- Build models from images / video: [https://rerun.io](https://rerun.io/) #3dmodel
- **Hunyuan3D-2.1**: Converts images into high-quality 3D assets with production-ready PBR materials - [GitHub](https://github.com/Tencent-Hunyuan/Hunyuan3D-2.1) #3D #image2text #PBR #Tencent

---

## Motion & Animation Generation

### Tencent HY-Motion 1.0

A next-generation text-to-motion (text-to-animation) model from Tencent.

- **Architecture**: Built on a Diffusion Transformer (DiT) and Flow Matching architecture with billions of parameters.
- **Status**: Ranked #1 on HuggingFace at the time of release.
- **Project Page**: [https://hunyuan.tencent.com/motion](https://hunyuan.tencent.com/motion)
- **Github**: [https://github.com/Tencent-Hunyuan/HY-Motion-1.0](https://github.com/Tencent-Hunyuan/HY-Motion-1.0)
- **Hugging Face**: [https://huggingface.co/tencent/HY-Motion-1.0](https://huggingface.co/tencent/HY-Motion-1.0)
- **Technical report**: [https://arxiv.org/pdf/2512.23464](https://arxiv.org/pdf/2512.23464)

---

## CAD / Parametric Modeling

### ForgeCAD

An "AI-native" CAD: parametric models are written in JavaScript (`*.forge.js`) instead of being built by hand in a GUI, so AI coding agents can generate and edit models directly.

- **Model as code**: `param()` creates sliders, plus primitives and booleans (`union`/`subtract`), `fillet()`, patterns, a standard part library (`lib.bolt()`, `lib.nut()` generate real helical threads), and SDF (`sdf.gyroid()`) for lattices and organic shapes — all in the same language.
- **Validation loop**: installs as a native CLI (`forgecad run bracket.forge.js`), runs deterministic checks, and emits a report before manufacturing.
- **Export**: STEP, STL, 3MF.
- **Use cases**: 3D-printed products, mechanical parts, assemblies/joints/colliders for robotics simulation, and generating model variants as AI training data for spatial reasoning.
- Website: https://forgecad.io/ #CAD #parametric #3D #robotics #agent

> **See also:** [Image Generation](/Technology/AI/Tools/GenAI/Image Generation) · [Video Generation](/Technology/AI/Tools/GenAI/Video Generation) · [Content And Multimedia Tools](/Technology/AI/Tools/GenAI/Content And Multimedia Tools)
