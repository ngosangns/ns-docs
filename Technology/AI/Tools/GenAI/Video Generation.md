---
area: technology
domain: video-generation
type: resource
title: Video Generation
description: Curated AI video generation tools (text-to-video, lip sync, portrait animation) plus notes on Meta's V-JEPA 2 world model.
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - video-generation
  - world-models
resource: http://runwayml.com/
---

# Video Generation

## Video Generation Tools

- **Text to video**:
  - [runwayml.com](http://runwayml.com/) #text2video
- **Search videos by text**: [twelvelabs.io](http://twelvelabs.io/) #videoSearch
- [Create videos with AI tools](https://super.myninja.ai/agents/b70180c0-e099-4561-9da4-3f3e0f5d6710)
- **v-express** - Voice-driven lip-sync technology: [GitHub](https://github.com/tiankuan93/ComfyUI-V-Express) #lipSync #ComfyUI
- **Emote Portrait Alive**: Turns a person's image + audio into a video of that person - [Website](https://humanaigc.github.io/emote-portrait-alive) #emote
- **LivePortrait**: Turns a photo of a character into a video with the expressions of another input video - [Hugging Face](https://huggingface.co/spaces/KwaiVGI/LivePortrait) #livePortrait
- **Wan 2.2 Animate**: A large AI model with 14 billion parameters using a Mixture-of-Experts architecture, enabling high-quality character video generation from a single reference image. Supports replacing actors in a video while preserving the scene and camera motion, and accurately reproduces facial expressions and body movement - [Website](https://wan2animate.com/) #video #animation #character #MoE
- **OmniHuman-1**: A multimodal AI framework that generates realistic human video from a single still image and motion signals such as audio or video. Produces video with accurate lip sync and gestures, and supports dynamic full-body video generation. Based on a Diffusion Transformer - [Website](https://www.omnihuman1.org/) #video #human #multimodal #diffusion

---

## V-JEPA 2 (Video Joint Embedding Predictive Architecture 2)

### Overview

- **V-JEPA 2**: A self-supervised foundation world model trained on video.
- Achieves state-of-the-art results in visual understanding and prediction.
- Enables **zero-shot robot control** in new environments.
- A next step toward a vision of AI that uses world models to:
  - Understand physical reality
  - Predict outcomes
  - Plan effective strategies
  - All with minimal supervision

### Key Capabilities

#### World Understanding

- Excellent motion understanding.
- Leading visual reasoning ability when combined with language modeling.

#### Prediction

- Can predict how the world will evolve.
- Sets a new state of the art in anticipating actions from contextual cues.

#### Planning for Robot Control

- Builds on its understanding and prediction abilities.
- Can be used for **zero-shot robot planning** to interact with unfamiliar objects in new environments.
- Trained on 62 hours of robot data from the Droid dataset.
- Deployed on a robot arm in new environments.
- By specifying tasks as goal images, the model completes tasks such as Reaching, Grasping, and Pick-and-place.
- **Task-agnostic**: Can be trained without extensive robot data or task-specific demonstrations.

### Model Architecture

1. **Pre-training (Self-supervised learning)**: The encoder and predictor are pre-trained through self-supervised learning on visual data.
2. **Fine-tuning**: Fine-tuned on a small amount of robot data, enabling effective planning without extensive expert robot demonstrations.

### Vision and Applications

- **Robotic Assistants**: Opens a new era for robotics, handling household chores and complex tasks.
- **Wearable Assistants**: Helps people navigate busy environments, warning of obstacles and hazards.

### Resources

- **Website**: [https://ai.meta.com/vjepa/](https://ai.meta.com/vjepa/)
- **Other World Models**: [Code World Model](/Technology/AI/Practices/Code World Model)

> **See also:** [Image Generation](/Technology/AI/Tools/GenAI/Image Generation) · [Content And Multimedia Tools](/Technology/AI/Tools/GenAI/Content And Multimedia Tools) · [Code World Model](/Technology/AI/Practices/Code World Model)
