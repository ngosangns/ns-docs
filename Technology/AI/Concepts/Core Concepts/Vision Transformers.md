---
area: technology
domain: vision-transformer
type: guide
title: Vision Transformers
description: Describes NaViT (Native Vision Transformer) and its Patch n' Pack method, which lets ViT handle images of varying size and aspect ratio efficiently.
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - vision-transformer
  - computer-vision
  - transformer
---

# Vision Transformers

## NaViT (Native Vision Transformer)

- **Problems with the traditional ViT (Vision Transformer)**:
  - Requires fixed-size input images
  - Loses aspect ratio information when resizing
  - High computational cost when processing high-resolution images
  - Cannot exploit the natural information in images of varying sizes
- **NaViT (Native Vision Transformer)**: An improved solution that can process multi-resolution images
  - Natively handles images with different sizes and aspect ratios
  - Removes the need for complex preprocessing (resize, crop)
  - Reduces computational cost by making better use of resources
  - Preserves the original aspect ratio information of images
- **The Patch n' Pack method**:
  - Combines short patch sequences from several different images into a single sequence
  - Similar to the example packing technique in NLP
  - Improves training efficiency by making better use of compute resources
  - Enables efficient batch processing of images with different sizes

> **See also:** [Transformer Architecture](/Technology/AI/Concepts/Core Concepts/Transformer Architecture) · [Object Detection](/Technology/AI/Concepts/Computer Vision/Object Detection)
