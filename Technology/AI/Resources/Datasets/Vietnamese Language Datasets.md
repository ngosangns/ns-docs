---
area: technology
domain: dataset
type: resource
title: Vietnamese Language Datasets
description: Summary of the Viettel and NVIDIA Vietnamese LLM datasets, covering the curated corpus, the instruction set, and the function-calling benchmark.
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - dataset
  - vietnamese
  - nlp
  - llm
resource: https://www.facebook.com/groups/machinelearningcoban/posts/2067772090346854/
---

# Vietnamese Language Datasets

Summary of a post about the collaboration between Viettel and NVIDIA to build Vietnamese large language models.

**Source:** [Facebook Post - Machine Learning cơ bản](https://www.facebook.com/groups/machinelearningcoban/posts/2067772090346854/)

## Overview

- Collaboration between Viettel and NVIDIA to build Vietnamese large language models
- Goal: support the Vietnamese AI research and development community
- Shares the model-building methodology and high-quality Vietnamese datasets

## Vietnamese Curated Dataset

- **Scale:** 15 billion tokens
- **Data sources:**
  - Wikipedia
  - OSCAR
  - C4
  - binhvq-news
  - Self-crawled data
- **Processing tool:** NeMo Curator
- **Processing pipeline:**
  - Deduplication
  - Content filtering
- **Published on:** Hugging Face
- **Link:** https://huggingface.co/datasets/VTSNLP/vietnamese_curated_dataset
- **Detailed documentation:** A blog post on NVIDIA Developer provides source code and an analysis of how the data changes at each processing stage
- **Blog link:** https://developer.nvidia.com/blog/processing-high-quality-vietnamese-language-data-with-nvidia-nemo-curator

## Vietnamese Instruct General Dataset

- **Scale:** 4.5 million instruction samples
- **Task types:**
  - Summarization
  - Question answering
  - Translation
  - Reasoning
  - Content generation
- **Construction methods:**
  - Data synthesis
  - Translation from multiple sources
  - Data generation
  - Quality checking with Gemini
- **Published on:** Hugging Face
- **Link:** https://huggingface.co/datasets/VTSNLP/instruct_general_dataset

## Vietnamese Function Calling Test

- **Purpose:** A benchmark for evaluating the effectiveness and accuracy of LLMs on the Function Calling task in Vietnamese
- **Background:** Built after developing the Llama-3.2-3B-Instruct-Frog model, focusing on the general nature of the Function Calling task
- **Characteristics:**
  - Hand-built, diverse, and fully independent of the development of the Frog model
  - Designed to be diverse and close to real-world use
  - 100% of the functions are unseen relative to earlier public training datasets, so that comparisons between models are reliable
- **Data scale:**
  - **Number of samples:** 2,899 single-turn function calling samples
  - **Number of functions:** 159 functions
  - **Number of domains:** 10 domains
- **Domains:**
  - Banking
  - Insurance
  - Travel
  - Education
  - Health
  - Recruitment
  - Vehicle control
  - Shopping
  - Work
  - Car Services
- **Current evaluation results:**
  - Llama-3.2-3B-Instruct-Frog: Function name accuracy 95.79%, Exact Match accuracy 51.05%
  - Llama-3.2-3B-Instruct-Frog-Pro: Function name accuracy 98.12%, Exact Match accuracy 56.38%
  - Gemini-1.5-Pro: Function name accuracy 96.96%, Exact Match accuracy 55.16%
  - Gemini-1.5-Flash: Function name accuracy 97.10%, Exact Match accuracy 51.64%
  - Gemini-1.5-Flash-8B: Function name accuracy 97.38%, Exact Match accuracy 64.75%
  - GPT-4o: Function name accuracy 94.38%, Exact Match accuracy 52.88%
- **Published on:** Hugging Face
- **Link:** https://huggingface.co/datasets/phamhai/Vietnamese-Function-Calling-Test
- **Note:** The dataset was released so the community can contribute and evaluate other models

## References

- NVIDIA blog on building the Vietnamese Curated Dataset: https://developer.nvidia.com/blog/processing-high-quality-vietnamese-language-data-with-nvidia-nemo-curator

> **See also:** [Vietnamese NLP Resources](/Technology/AI/Resources/Vietnamese NLP Resources) · [Media Datasets](/Technology/AI/Resources/Datasets/Media Datasets)
