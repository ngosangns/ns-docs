---
area: technology
domain: generative-ai
type: guide
title: Google 5 Day Gen AI Intensive Course
description: Day-by-day summary of Google and Kaggle's free self-paced 5-Day Gen AI Intensive course, covering LLMs, embeddings, agents, domain-specific LLMs, and MLOps.
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - generative-ai
  - llm
  - kaggle
  - google
resource: https://www.kaggle.com/learn-guide/5-day-genai
---

# Google 5 Day Gen AI Intensive Course

> **Source**: [5-Day Gen AI Intensive Course with Google](https://www.kaggle.com/learn-guide/5-day-genai) — Kaggle Learn Guide (the original ran live 03/31–04/04/2025 and is now a self-paced guide)

## Overview

A free 5-day course run by Google in partnership with Kaggle, providing foundational knowledge of Generative AI. Each day includes: 1 summary podcast, 1 whitepaper for further reading, and (on most days) a few hands-on codelabs in Kaggle Notebooks; there is also a livestream Q&A with Google experts for each topic. It requires a Kaggle account (with phone verification to run codelabs) and an AI Studio account (to get a Gemini API key).

## Day 1 — Foundational LLMs & Prompt Engineering

- **Theory**: the history of LLM development — from the transformer architecture to fine-tuning techniques, inference acceleration, and reasoning models. Whitepapers: _"Foundational Large Language Models & Text Generation"_ and _"Prompt Engineering"_.
- **Codelabs**: getting familiar with the Gemini API (how parameters affect the prompt), and how to evaluate LLM output with an autorater + structured output.
- **Optional material**: a case study of a bank using advanced prompt engineering to automate its financial advisory process; a recording of the livestream with Google speakers (Warren Barkley, Logan Kilpatrick, Kieran Milan, Anant Nawalgaria, Irina Sigler, Mat Velloso).

## Day 2 — Embeddings and Vector Stores/Databases

- **Theory**: the conceptual foundations of embeddings and vector databases — how embeddings are generated, vector search algorithms, real-world applications combined with LLMs, and the tradeoffs between approaches. Whitepaper: _"Embeddings and Vector Stores/Databases"_.
- **Codelabs**: build a RAG question-answering system over custom documents; explore text similarity through embeddings; build a Keras neural network classifier using embeddings.
- **Optional**: livestream with Andre Araujo, Patricia Florissi, Alan Li, Anant Nawalgaria, Xiaoqi Ren, Chuck Sugnet, Howard Zhou.

## Day 3 — Generative AI Agents

- **Theory**: the core components of an AI agent, the iterative agent development process, advanced agent architectures (multi-agent systems), and how to evaluate agents. Main whitepaper: _"Generative AI Agents"_; advanced (optional) whitepaper: _"Agents Companion"_.
- **Codelabs**: have a chatbot use function calling to "talk" to a database through a SQL tool (with an example using the Gemini 2.0 Live API); build a café order-taking agent with **LangGraph**.
- **Optional**: a case study of a regulatory reporting solutions provider using an agentic GenAI system to automate "ticket-to-code" in software development, achieving 2.5x productivity; livestream with Alan Blount, Antonio Gulli, Steven Johnson, Jaclyn Konzelmann, Patrick Marlow, Anant Nawalgaria, Julia Wiesinger.

## Day 4 — Domain-Specific LLMs

- **Theory**: how to build and apply industry-specific LLMs such as **SecLM** (cybersecurity) and **MedLM/Med-PaLM** (healthcare), with talks from the researchers who created them. Whitepaper: _"Solving Domain-Specific Problems Using LLMs"_.
- **Codelabs**: feed real-time data into the model through Google Search and then visualize it with a charting tool via the Live API; fine-tune a custom Gemini model on your own labeled data for a specific task.
- **Optional**: livestream with Donny Cheung, Scott Coull, Ewa Dominowska, Chris Grier, Anant Nawalgaria, Karthik Raman.

## Day 5 — MLOps for Generative AI

- **Theory**: how to adapt MLOps practices to Generative AI, and how to use the **Vertex AI** toolset for foundation models/GenAI applications (including AgentOps for agent-style applications). Whitepaper: _"MLOps for Generative AI"_.
- **No dedicated codelab** — instead, the livestream is a live code walkthrough/demo of the `goo.gle/agent-starter-pack` repo (reading the repo beforehand is encouraged).
- **Optional**: livestream with Sokratis Kartakis, Gabriela Hernandez Larios, Ivan Nardini, Anant Nawalgaria, Elia Secchi, Michael Styer, Saurabh Tiwary.

## Bonus and After the Course

- **Bonus notebook**: introduces some additional Gemini API capabilities not covered in the main 5 days (no accompanying whitepaper/podcast).
- After completion, Kaggle suggests continuing with the **"AI Agents Intensive"** guide for deeper, more hands-on work with AI agents.

## Quick Summary by Day

| Day | Topic                                     | Hands-on highlights                                                        |
| --- | ----------------------------------------- | -------------------------------------------------------------------------- |
| 1   | Foundational LLMs & Prompt Engineering    | Gemini API, prompt techniques, evaluation with an autorater                |
| 2   | Embeddings & Vector Stores/DB             | RAG QA system, text similarity, Keras classifier with embeddings           |
| 3   | Generative AI Agents                      | Function calling + SQL, order-taking agent with LangGraph                  |
| 4   | Domain-Specific LLMs (SecLM, Med-PaLM...) | Google Search grounding + visualization, fine-tuning a custom Gemini model |
| 5   | MLOps for GenAI                           | Vertex AI tooling, agent-starter-pack, AgentOps                            |

> **See also:** [LLM Learning Resources](/Technology/AI/Resources/LLM Learning Resources) · [LLM Overview](/Technology/AI/Concepts/LLM And Generative AI/LLM Overview) · [Agents Overview](/Technology/AI/Tools/Agents/Agents Overview)
