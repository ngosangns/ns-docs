---
area: technology
domain: llm
type: note
title: Tang Jie Advanced Machine Learning
description: Notes on Tang Jie's 2026 Advanced Machine Learning course at Tsinghua, its assignments, and his statements on what comes after the chatbot era.
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - llm
  - tsinghua
  - zhipu
resource: https://www.sohu.com/a/1077377896_115060
---

# Tang Jie Advanced Machine Learning

> **Source**: Bianews, 09/17/2026, republished on [Sohu](https://www.sohu.com/a/1077377896_115060) and [Phoenix](https://tech.ifeng.com/c/8wUruDb30rN). The same assignment list appears at [快科技](https://tech.ifeng.com/c/8wVjdWJ9m5i) (Kuai Keji) and [HKET](https://inews.hket.com/article/4195430/). His statements about PCs and Zhipu's capability ladder are in [21世纪经济报道 (21st Century Business Herald), 09/18/2026](https://www.163.com/dy/article/L7583PLT05199NPP.html).
>
> The assignment list is relayed by the press from students in the class, not from an official syllabus PDF.

## The Speaker

Tang Jie (唐杰) is a professor in the Department of Computer Science at Tsinghua University, and co-founder and chief scientist of Zhipu AI (English brand Z.AI, the GLM series). He holds no executive title; 21世纪经济报道 calls him one of the company's de facto controllers. Calling him the boss is a shorthand for that role.

## The Course

The course is 《高级机器学习》 (Advanced Machine Learning), 16 weeks. First session around 09/17/2026: the 112-seat room was full, with people standing beyond the seats. He said up front that the assignments would be heavy, to filter people out. The course name is still machine learning; the 16 weeks of content already revolve around one large-model pipeline.

HKET sums the pipeline up in one thread: base model, scaling, synthetic data, preference and RL, then the role of agents, continual learning, and AI training AI.

## Assignments

Students walk the whole pipeline themselves, in groups of 2–3:

1. Write a tokenizer and transformer from scratch and train a **0.1B** (100 million parameter) model end to end.
2. Write a Triton attention kernel and measure the gains in training and inference across multiple GPUs.
3. Clean a corpus from a raw dump, fit a scaling law, then extrapolate.
4. On the same base model, run a controlled comparison of **SFT**, **DPO**, and **RLVR** (reinforcement learning from verifiable rewards).
5. Build a verifiable environment along with a harness, train an agent for a long task, and encourage a self-judge loop (the model grades its own output).

Submit an English report in NeurIPS format. Live demo in week 16. Assignments count for 40% of the grade, the major project for 60%. All four sections — problem, motivation, method, results — are required.

A widely shared Sohu article adds a week-by-week schedule: the Triton kernel must be 12% faster than FlashAttention, a scaling law off by more than 5% must be redone, and week 14 compares LoRA / QLoRA / Adapter. The outlets that cite the five-item list above don't have those thresholds, and their fourth item is SFT / DPO / RLVR. The schedule article's headline also says "0.1亿 parameters" (0.1 亿, i.e. 10 million), off by a factor of ten from 0.1B. Keep the five-item list and the 0.1B size.

## Statements at the Opening Session

The lines the outlets quote directly: AGI and ASI are the models' next goals; the basic chat race is over; the work of 2026 is to push intelligence higher, so models remember on their own, evolve on their own, and finish long tasks on their own.

The line "the knowledge-based chatbot race has hit its ceiling" lumps together two different things. What he calls nearly done is the chat product. In January 2026, at a [forum in Haidian](https://www.163.com/dy/article/KJ162U2A0530NLC9.html), he said that within a DeepSeek-style paradigm the chat-era problem is basically solved, what remains is mostly engineering, and the next paradigm is to have every user's AI do one real job. In December 2025, on Weibo, he still wrote that more data, more parameters, and more saturated compute remain the most effective way to improve a base model. Scaling the base model's knowledge, in his words at that point, was still running.

Multimodality is not in the outlets' quoted line from 09/17. Since early 2026 he has called **multimodal sensory integration** the focus of the year: with it, AI can do long tasks inside a computer (GUI interaction) and, through robotics, enter the physical world. Memory, continual learning, and self-judge are the thread he has raised since the December 2025 Weibo post and an internal letter in July 2026: context, RAG, and parameters correspond to successive layers of memory; a model has to know for itself whether its output is right or wrong before it has a goal to improve toward.

## One to Two Years and the Personal Computer

21世纪经济报道 relays a judgment he gave at the same class: within one to two years, AI will take over all operations on a PC. This is a judgment as recorded by the press, with no definition of "all" and no measurement benchmark. Describing it as "nearly complete" is softer than the wording 全面接管 (full takeover) in the article.

## Capability Ladder

In the same news cycle, Zhipu published a capability ladder at an investor session: **Chat → Coding → Agent → Co-work → Autonomous AI**. At the Co-work rung, the model enters real workflows and is paid per delivered task; the threshold is that a professional receives the result and doesn't have to redo it from scratch. The press says one month after GLM-5.3 launched, industry Co-work orders exceeded 1 billion RMB. That figure is a management claim, not an audited report, in this article.

The chain "knowledge → coding → digital world → physical world" is the retelling author's compression: knowledge corresponds to pretraining, coding to Coding, the digital world to agents on a computer, and the physical world to the embodied line through robotics since January 2026. The 09/17 reports don't record a four-rung sentence like that verbatim. The ladder as written down is Chat, Coding, Agent, Co-work, Autonomous AI.

> **See also:** [LLM Overview](/Technology/AI/Concepts/LLM And Generative AI/LLM Overview) · [Fine Tuning Techniques](/Technology/AI/Concepts/LLM And Generative AI/Fine Tuning/Fine Tuning Techniques) · [Agents Overview](/Technology/AI/Tools/Agents/Agents Overview)
