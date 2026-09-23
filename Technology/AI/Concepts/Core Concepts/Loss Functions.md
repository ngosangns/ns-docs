---
area: technology
domain: loss-functions
type: guide
title: Loss Functions
description: Explains cross entropy as the standard classification loss in deep learning, along with entropy, KL divergence, and maximum likelihood estimation.
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - loss-functions
  - deep-learning
---

# Loss Functions

## Cross Entropy

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
