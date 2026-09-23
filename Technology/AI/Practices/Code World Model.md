---
area: technology
domain: llm
type: resource
title: Code World Model
description: Overview of Meta's Code World Model (CWM), a 32B-parameter language model that simulates code execution, with benchmark results and download links.
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - llm
resource: https://ai.meta.com/research/publications/cwm
---

# Code World Model

## Overview

- **Code World Model (CWM)**: Meta's 32-billion-parameter language model
- It does more than predict the next line of code:
  - Simulates the execution of Python functions
  - Reproduces agentic interactions in a Bash environment
- **Significance**: AI that doesn't just write code but also thinks ahead, simulates, and plans the way a human would

## Results

- **68.6%** on LiveCodeBench v5
- **76%** on AIME24
- **65.8%** on SweBench Verified (with test-time scaling)

## Applications and Potential

- Test how a world model improves code generation
- Build AI agents that can reason and plan
- Bring coding AI closer to how humans actually think
- Open up an "open lab" for the research community

## Other World Models

- A self-supervised world model trained on video, enabling zero-shot robot control and visual understanding

## Resources

- **Tech Report**: https://ai.meta.com/research/publications/cwm
- **Model Weights**: https://ai.meta.com/.../models-and-libraries/cwm-downloads/
- **HuggingFace**: https://huggingface.co/facebook/cwm
- **HuggingFace SFT**: https://huggingface.co/facebook/cwm-sft
- **HuggingFace Pretrain**: https://huggingface.co/facebook/cwm-pretrain
- **Inference Code**: https://github.com/facebookresearch/cwm

> **See also:** [LLM Overview](/Technology/AI/Concepts/LLM And Generative AI/LLM Overview) · [Coding Agents](/Technology/AI/Tools/Agents/Coding Agents)
