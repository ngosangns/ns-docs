---
area: technology
domain: prompt-engineering
type: cheatsheet
title: Prompt Guide
description: A taxonomy of prompting techniques with short examples, from zero-shot and few-shot prompting to chain-of-thought, multilingual, multimodal, agent-based, and answer engineering methods.
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - prompt-engineering
  - llm
---

# Prompt Guide

## Basic Prompting Techniques (Text-Based Prompting)

These techniques focus on building prompts that give requests or instructions to an LLM:

### Zero-Shot Prompting

> Make the request directly without providing examples.

**Example:**

> "Translate this sentence into French: 'Xin chào.'"

### Few-Shot Prompting

> Provide a few examples before asking the model to handle the task.

**Example:**

> "2 + 2 = 4, 4 + 5 = 9, 8 + 0 = ?, Compute the sum 7 + 3."

### Exemplar Selection

Some important factors when choosing examples:

- **Ordering:** The order of examples affects the result.
- **Quantity:** Adding more examples can improve performance, but the gain may fade after 20 examples.
- **Similarity:** Choose examples that closely resemble the current request.
- **Diversity:** Sometimes variety is needed so the model does not become dependent on a pattern.

### Instruction Selection

> Choose suitable instructions (specific or general).

### Emotion Prompting

> Add an emotional element to the request so the model understands the context better.

**Example:**

> "Write this as if it were the most important thing in my life."

### Role Prompting

> Define a specific role for the model.

**Example:**

> "You are a psychologist. Please give advice."

### Style Prompting

> Ask the model to write in a specific style.

**Example:**

> "Write a poem like Nguyễn Du."

---

## Thought Generation Techniques

These techniques help an LLM reason step by step to produce a logical answer:

### Chain-of-Thought (CoT) Prompting

> Encourage the model to explain its thinking step by step.

**Example:**

> Add "Explain step by step" to the prompt.

### Zero-Shot CoT

> No examples, but ask the model to reason on its own.

### Least-to-Most Prompting

> Break a large problem into smaller parts and solve each one.

### Tree-of-Thought

> Use the model to build a reasoning tree, evaluate each branch, and choose the best solution.

### Plan-and-Solve Prompting

> Ask for a plan before solving the problem.

### Skeleton-of-Thought

> Create an outline of the answer, then work out each part.

---

## Prompt Optimization Techniques

These techniques focus on improving prompt quality:

### Prompt Paraphrasing

> Rephrase the prompt in different words without changing its meaning.

### AutoPrompt

> Use algorithms to automatically optimize "trigger words".

### Prompt Optimization

> Optimize the prompt through feedback from the model and from humans.

---

## Multilingual Prompting

Used for problems involving multiple languages:

### Translate First Prompting

> Translate the question into English before feeding it to the model.

### Cross-Lingual Self Consistent Prompting

> Generate reasoning paths in multiple languages to increase accuracy.

---

## Multimodal Prompting

Applies to problems involving several data types such as images, audio, and video:

### Image Prompting

> Ask the model to describe an image or handle a visual problem.

### Multimodal Chain-of-Thought

> Combine CoT with image or audio data.

---

## Advanced Techniques (Agent-Based Prompting)

Use the LLM as an agent that can check itself and use external tools:

### Tool Use Agents

> The model uses external tools (such as a calculator or APIs) to complete the request.

### Code-Generation Agents

> Use the LLM to write code and execute it itself.

### Retrieval Augmented Generation (RAG)

> Fetch information from external sources to increase accuracy.

---

## Answer Engineering Techniques

Focus on optimizing how the answer is presented:

### Answer Shape

> Format the answer (table, list, CSV).

### Answer Extractor

> Extract precise information from the model's output.

---

## Notes

- **Applicability:** Combine several techniques to get better results.
- **Experimentation:** Practice on real problems to understand how well each method works.
- **Keep learning:** New techniques are always being developed, so keep up to date!

> **See also:** [Prompt Strategies](/Technology/AI/Concepts/LLM And Generative AI/Prompt Engineering/Prompt Strategies) · [ChatGPT Prompting](/Technology/AI/Concepts/LLM And Generative AI/Prompt Engineering/ChatGPT Prompting) · [LLM Overview](/Technology/AI/Concepts/LLM And Generative AI/LLM Overview)
