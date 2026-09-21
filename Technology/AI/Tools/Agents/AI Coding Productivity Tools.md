---
area: technology
domain: ai-ml
topic: agents
type: resource
title: AI Coding Productivity Tools
description: Agent skills, context engineering, context compression, browser automation cho agent, và các công cụ tăng năng suất coding-agent khác
timestamp: '2026-09-20T00:00:00.000Z'
tags:
  - technology
  - ai-ml
  - agents
  - coding-agents
resource: https://github.com/kaitranntt/ccs
---
# AI Coding Productivity Tools

- https://github.com/kaitranntt/ccs — Multi-provider profile and runtime manager for Claude Code, Codex, Ollama, GLM, and other AI CLIs.
- https://github.com/SawyerHood/dev-browser — Sandboxed browser automation tool for AI agents; QuickJS WASM scripts with full Playwright API.
- https://github.com/ScrapeGraphAI/Scrapegraph-ai — Python web scraping library that uses LLMs and graph logic to build extraction pipelines for websites and local documents (HTML, XML, JSON, Markdown) without hand-written CSS selectors.
- https://github.com/NanmiCoder/MediaCrawler — Multi-platform social media data collection tool (for learning/research); scrapes posts and comments from Xiaohongshu, Douyin, Kuaishou, Bilibili, Weibo, Tieba, and Zhihu using Playwright login-state automation (no JS reverse-engineering), with keyword/post/creator crawling, login caching, IP proxy pool, and a WebUI.
- https://github.com/StevenTran0410/CodeSpectra — Desktop app that reads a codebase and produces an evidence-backed onboarding report powered by local LLMs.
- https://github.com/SuperClaude-Org/SuperClaude_Framework — Meta-programming framework that turns Claude Code into a structured dev platform with 30 slash commands.
- https://github.com/gsd-build/get-shit-done — Lightweight meta-prompting, context engineering, and spec-driven development system for AI coding agents; helps reduce context rot across Claude Code, Codex, Cursor, and more.
- https://github.com/open-gsd/gsd-core — "Git. Ship. Done." context-engineering and spec-driven development framework; drives coding agents through a discuss → plan → execute → verify → ship phase loop using fresh-context subagents to fight context rot.
- https://github.com/hoangnb24/repository-harness — Repository-level operating harness that turns any repo into an agent-ready workspace; adds AGENTS.md, product contracts, feature intake, story packets, a test matrix, decision records, and a Rust CLI tool registry.
- https://github.com/AlexsJones/llmfit — Terminal tool that right-sizes LLM models to your hardware; detects specs, scores fit, and suggests quantizations (Rust TUI + CLI).
- https://github.com/duysolo/codebaxing — MCP server for semantic code search; index your codebase and query with natural language across 28 languages.
- https://github.com/google/magika — Fast, accurate AI-powered file type detection for content-based MIME/type classification.
- https://github.com/garrytan/gstack — Turns Claude Code into a virtual engineering team with 23 specialist slash commands (CEO, eng manager, QA, security, release engineer).
- https://github.com/lightpanda-io/browser — Headless browser built from scratch in Zig for AI agents and automation; CDP-compatible, ~16x less memory than Chrome.
- https://github.com/h4ckf0r0day/obscura — Lightweight, stealthy headless browser for AI agents and web scraping; written in Rust with V8, CDP-compatible drop-in for headless Chrome, built-in anti-detection, and an MCP server.
- https://github.com/Tencent/BrowserSkill — Lets AI agents use your real, logged-in browser without interrupting your work; CLI + extension for browser automation across any shell-capable AI agent.
- https://github.com/greensock/gsap-skills — Official GSAP AI skills (Agent Skills format) that teach coding agents correct GSAP usage: core API, timelines, ScrollTrigger, plugins, and React/Vue/Svelte patterns.
- https://github.com/SoraLabsOSS/skills — SoraLabs agent skills for motion design (Claude Code, Cursor, Codex): `animating-icons` (SVG icon animation with 12 gesture families, vector morphing, and icon-to-icon transitions, with verification scripts that measure accuracy instead of eyeballing) and `motion-meaning` (classifies motion as communicative vs decorative and picks a reduced-motion strategy that keeps functionality intact). Install via `/plugin marketplace add SoraLabsOSS/skills` or `npx skills add SoraLabsOSS/skills`; MIT. Companion to Sora UI.
- https://github.com/rtk-ai/rtk — CLI proxy reducing LLM token usage by 60-90% on dev commands; single Rust binary with auto-rewrite hooks for major AI tools.
- https://github.com/TrNgTien/vfs — Virtual Function Signatures tool reducing agent token usage by ~98% via AST-based code signature extraction.
- https://github.com/yichuan-w/LEANN — Ultra-compact vector index for personal RAG; 97% storage savings via graph-based recomputation, runs fully local.
- https://github.com/codeaholicguy/ai-devkit — Universal CLI toolkit for AI agent skills; structured AI-assisted development workflows across Cursor, Claude Code, Codex, and more.
- https://github.com/Git-on-my-level/codex-autorunner — Low-opinion agent coordination harness for Codex; helps run longer, more complex implementations with existing coding agents.
- https://skillsmp.com/ — Agent Skills Marketplace with smart search, occupation-based filtering, quality indicators, and API access across 900k+ skills.
- https://github.com/vercel/chat — Unified TypeScript SDK for building chat bots across Slack, Teams, Google Chat, Discord, Telegram, GitHub, Linear, and WhatsApp.
- https://github.com/vercel/ai — The AI SDK from Vercel; free, open-source TypeScript toolkit for building AI-powered apps and agents with a unified provider API and React/Next.js/Vue/Svelte/Node.js integrations.
- https://github.com/DietrichGebert/ponytail — Provider-neutral agent skill that makes AI coding agents write minimal, necessary code (YAGNI ladder) without sacrificing validation, security, or accessibility; works with 14+ agents including Kiro.
- https://github.com/DenisSergeevitch/agents-best-practices — Provider-neutral Agent Skill for designing, auditing, and refactoring agentic harnesses; covers the model-tool-observation loop, typed tools, permissions, budgets, memory/compaction, and launch gates.
- https://github.com/chopratejas/headroom — Context compression layer for AI agents; compresses tool outputs, logs, RAG chunks, files, and history (60–95% fewer tokens) before they reach the LLM, as library/proxy/MCP, local-first and reversible.
- https://github.com/headroomlabs-ai/headroom — Same Headroom context-compression project (looks like it moved to the headroomlabs-ai org); compresses tool outputs, logs, files, and RAG chunks before they reach the LLM, 60-95% fewer tokens, as library/proxy/MCP server.
- https://github.com/teamchong/pxpipe — Local proxy that cuts Claude Code token usage by rendering dense text context (system prompts, tool docs, old history) as PNG images, exploiting cheaper image token pricing for up to 70% cost reduction.
- https://github.com/addyosmani/agent-skills — Production-grade engineering skills for AI coding agents; 24 lifecycle skills (spec, plan, build, test, review, ship) with verification gates and anti-rationalization, works with Claude Code, Cursor, Kiro, and more.
- https://github.com/daymade/claude-code-skills — Professional Claude Code skills marketplace with 60+ production-ready skills (skill-creator, doc/media tooling, troubleshooting doctors, research, finance) installable via the plugin marketplace.
- https://github.com/agentfinder — Agent Finder; searchable directory of AI resources (293+ skills/agents) implementing the Agentic Resource Discovery (ARD) specification for programmatic agent resource discovery.
- https://github.com/anthropics/skills — Anthropic's official public repository of Agent Skills; installable via the Claude Code plugin marketplace (document skills, example skills, claude-api, and more).
- https://github.com/alirezarezvani/claude-skills — Massive collection of 337+ Claude Code/agent skills, 30+ agents, and 70+ custom commands across engineering, marketing, product, compliance, research, and finance; works with Claude Code, Codex, Gemini CLI, Cursor, and 8+ more agents.
- https://github.com/JuliusBrussee/caveman — Claude Code skill that cuts ~65–75% of tokens by having the agent communicate in compressed "caveman" speech while keeping full technical accuracy; supports multiple intensity levels.
- https://www.onorca.dev/ — Orca: free, open-source agent development environment/IDE for running multiple AI coding agents (Claude Code, Codex, etc.) in parallel, each in an isolated git worktree, with terminals, a browser in design mode, diffs, and CLI tools built in.
- https://github.com/herdrdev/herdr — Terminal-based runtime that manages coding agent sessions (Claude Code, Cursor, etc.) across local and remote machines; keeps agents running in a background server through disconnections, with a unified multi-machine interface and agent-native features like spawning panes and inter-agent communication.
- https://github.com/howznguyen/pi-delegate-mcp — MCP server that turns the "pi" coding agent into a steerable background worker; delegate a task, redirect it mid-run, and keep its context out of your own.
- https://github.com/langchain-ai/openwiki — CLI that writes and maintains agent-facing documentation for your codebase.
