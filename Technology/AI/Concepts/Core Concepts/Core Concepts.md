---
area: technology
domain: core-concepts
type: resource
title: Core Concepts
description: "Short notes on attention, cross-entropy loss, and native vision transformers."
timestamp: "2026-10-03T00:00:00.000Z"
tags:
  - technology
  - attention
  - transformer
  - llm
  - loss-functions
  - deep-learning
  - vision-transformer
  - computer-vision
resource: https://viblo.asia/p/local-attention-trong-mo-hinh-hoc-sau-MkNLrWkbVgA
---

# Core Concepts

## Attention Mechanism

- [Transformer Architecture](/Technology/AI/Concepts/Core Concepts/Transformer Architecture): A detailed analysis of the Transformer architecture, the attention mechanism, and its impact on modern AI. Covers the encoder-decoder architecture, multi-head attention, and variants such as BERT, GPT, and Vision Transformers #transformer #attention #LLM
- Local attention (Vietnamese article on Viblo): https://viblo.asia/p/local-attention-trong-mo-hinh-hoc-sau-MkNLrWkbVgA #attention

> **See also:** [Transformer Architecture](/Technology/AI/Concepts/Core Concepts/Transformer Architecture) · [RNN And LSTM](/Technology/AI/Concepts/Core Concepts/RNN And LSTM)

## Loss Functions

### Cross Entropy

- **Concept**: The most common loss function for classification problems in deep learning
- **Entropy**: Measures the uncertainty in a probability distribution
  - High entropy = uniform, uncertain distribution
  - Low entropy = concentrated, more certain distribution
- **Cross Entropy**: Measures the difference between two probability distributions
  - Commonly used to compare the model's predicted distribution with the actual distribution (ground truth)
  - The lower the cross entropy, the closer the model's prediction is to reality
- **KL Divergence (Kullback-Leibler Divergence)**: Measures the "distance" between two probability distributions
  - Closely related to cross entropy
  - Cross Entropy = Entropy + KL Divergence
- **MLE (Maximum Likelihood Estimation)**: A statistical method for optimizing model parameters
  - Maximizes the probability of observing the data
  - Minimizing cross entropy is equivalent to maximizing likelihood
- **Advantages of cross entropy**:
  - Solid statistical foundation
  - Simple and effective to optimize
  - Good gradients, helping the model learn quickly and stably
  - Well suited to multi-class classification problems

> **See also:** [RNN And LSTM](/Technology/AI/Concepts/Core Concepts/RNN And LSTM) · [Transfer Learning](/Technology/AI/Concepts/Core Concepts/Transfer Learning)

## Vision Transformers

### NaViT (Native Vision Transformer)

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

> **See also:** [Transformer Architecture](/Technology/AI/Concepts/Core Concepts/Transformer Architecture) · [Object Detection](/Technology/AI/Concepts/Computer Vision/Computer Vision#object-detection)
