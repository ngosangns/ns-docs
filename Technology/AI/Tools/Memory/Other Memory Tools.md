---
area: technology
domain: memory
type: resource
title: Other Memory Tools
description: A curated list of additional memory and knowledge-graph tools for AI coding agents that do not have their own notes.
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - memory
  - code-intelligence
resource: https://byterover.dev/
---

# Other Memory Tools

This page is a short catch-all list for memory and knowledge graph tools that do not have a note of their own. Each entry gives the name, a link where one exists, and a sentence on what the tool does. The list covers Cipher from Byterover, a memory layer for coding agents, and Beads, a memory upgrade for the same audience. It also points to Google's managed memory service, to Supermemory as a memory API platform, to Tencent's local long-term memory system, and to a tool that turns a codebase into an interactive graph. Readers get a quick orientation before going to the comparison page, which covers the tools documented in depth.

- [campfirein/cipher](https://github.com/campfirein/cipher) — Byterover Cipher, an open-source memory layer built specifically for coding agents, compatible via MCP with Cursor, Windsurf, Claude Code, Cline, Claude Desktop, Gemini CLI, AWS Kiro, VS Code, Roo Code, Trae, Amp Code, and Warp.
- [steveyegge/beads](https://github.com/steveyegge/beads) — Beads, a memory upgrade for coding agents.
- Vertex AI Agent Engine Memory Bank — Google Cloud's managed memory service for AI agents.
- Supermemory.ai — a Memory API platform that builds a persistent memory layer (a second "digital brain"): semantic/AI search, broad content support (text, URLs, PDFs, images, video), integrations with Notion/Google Drive/CRM/Zapier/Chrome extension, a canvas UI plus writing assistant, and cloud/on-premises/on-device deployment.
- [TencentCloud/TencentDB-Agent-Memory](https://github.com/TencentCloud/TencentDB-Agent-Memory) — Tencent's fully local long-term memory system; a 4-tier progressive pipeline (L0→L3 Persona) combining FTS5 + EmbeddingGemma hybrid recall, with no external API dependency.
- [Egonex-AI/Understand-Anything](https://github.com/Egonex-AI/Understand-Anything) — turns any codebase, knowledge base, or docs into an interactive knowledge graph; a multi-agent Tree-sitter + LLM pipeline with a visual dashboard, working on Claude Code, Codex, Cursor, Copilot, Kiro, and many other agents.

The list splits along deployment and audience rather than along features. Cipher, Beads and Understand-Anything aim at coding agents. Cipher connects through MCP and names Cursor, Windsurf, Claude Code, Cline and Warp among its clients. Understand-Anything runs on Claude Code, Codex, Cursor, Copilot and Kiro. Vertex AI Agent Engine Memory Bank is Google Cloud's managed service for AI agents. TencentDB-Agent-Memory stays fully local and needs no external API. Supermemory ships as cloud, on-premises or on-device. How each tool stores and recalls content also differs. Supermemory accepts text, URLs, PDFs, images and video, and adds a canvas UI plus a writing assistant. Tencent runs a 4-tier pipeline from L0 to a Persona layer and combines FTS5 with EmbeddingGemma for hybrid recall. Understand-Anything builds its graph with a multi-agent Tree-sitter and LLM pipeline and shows it in a visual dashboard. The comparison page and the dedicated notes cover the tools documented in depth.

> **See also:** [Memory Tool Comparison](/Technology/AI/Tools/Memory/Memory Tool Comparison) · [Mem0](/Technology/AI/Tools/Memory/Mem0) · [Graph Comparison](/Technology/AI/Tools/Memory/Graph Comparison)
