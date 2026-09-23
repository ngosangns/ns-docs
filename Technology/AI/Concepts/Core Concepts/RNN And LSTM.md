---
area: technology
domain: rnn
type: guide
title: RNN And LSTM
description: Explains how recurrent neural networks process sequences, why they suffer from vanishing gradients, and how LSTM gates fix long-term memory.
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - rnn
  - lstm
  - deep-learning
---

# RNN And LSTM

## RNN (Recurrent Neural Network)

### Introduction

RNNs are designed to process sequential data such as text, time series, and speech by maintaining a hidden state that remembers earlier information.

### RNN Architecture

- **Sequential processing**: An RNN processes each element of the sequence in order, using the hidden state to store information from previous steps
- **Recurrence**: At each step, the hidden state is updated from the current input and the previous hidden state
- **Output generation**: An RNN can produce an output at every step, such as predicting the next word in a sentence

### Mathematical Formulas

- **Hidden state update**: `h_t = activation(W * x_t + U * h_{t-1} + b)`
  - `h_t`: Hidden state at time step t
  - `x_t`: Input at time step t
  - `W`, `U`: Weight matrices
  - `b`: Bias
- **Output computation**: `y_t = V * h_t + c`
  - `y_t`: Output at time step t
  - `V`: Weight matrix for the output
  - `c`: Bias for the output

### Challenges

- **Vanishing Gradient**: On long sequences, gradients tend to shrink toward 0 during backpropagation, making it hard to learn long-term dependencies
- **Exploding Gradient**: In some cases, gradients can grow very large and destabilize training
- **Limited memory**: RNNs struggle to remember long-term information because of the vanishing gradient problem

## LSTM (Long Short-Term Memory)

### Introduction

LSTM is a variant of RNN designed to overcome the vanishing gradient problem, allowing it to remember long-term information more effectively.

### LSTM Architecture

- **Cell State**: Stores long-term information and can carry it across many time steps without decay
- **Hidden State**: Stores short-term information and is used to produce the output

### The Three Main Gates

#### Forget Gate

- **Function**: Decides which information to discard from the cell state
- **Mechanism**: Uses a sigmoid function to produce a value between 0 and 1, where 0 means "forget completely" and 1 means "keep completely"

#### Input Gate

- **Function**: Decides which information from the input is stored in the cell state
- **Mechanism**:
  - Uses a sigmoid function to decide which values will be updated
  - Uses a tanh function to create new candidate values that can be added to the cell state

#### Output Gate

- **Function**: Decides which part of the cell state is used to produce the output
- **Mechanism**: Uses a sigmoid function to decide which part of the cell state to output, then multiplies it with the cell state after it has passed through a tanh function

### How LSTM Works

1. **Updating the cell state**:
   - The forget gate decides which information from the old cell state to discard
   - The input gate decides which new information to add
   - The two are combined to produce the new cell state

2. **Producing the output**:
   - The output gate decides which part of the cell state is used
   - A new hidden state and the output are produced based on the output gate's decision

### Advantages Over RNN

- **Stable gradients**: The gating mechanism lets gradients flow across many time steps without vanishing or exploding
- **Long-term memory**: The cell state lets LSTM store and carry information across many time steps
- **Long-term dependencies**: More effective than RNN at handling long-term dependencies in sequential data
- **Wide applicability**: Used in many problems such as machine translation, speech recognition, sentiment analysis, and time series prediction

> **See also:** [Transformer Architecture](/Technology/AI/Concepts/Core Concepts/Transformer Architecture) · [Attention Mechanism](/Technology/AI/Concepts/Core Concepts/Attention Mechanism) · [Loss Functions](/Technology/AI/Concepts/Core Concepts/Loss Functions)
