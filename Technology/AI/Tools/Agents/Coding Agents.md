---
area: technology
domain: coding-agents
type: resource
title: Coding Agents
description: Curated overview of AI coding agents, CLIs, VS Code extensions, IDEs, and app builders such as OpenCode, Devin, Cosine, Dyad, and Kilo.
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - coding-agents
  - agents
resource: https://ai-tools-registry.vercel.app/
---

# Coding Agents

## Resources

- [AI Tools Registry | A registry distributing AI Tools and components using shadcn.](https://ai-tools-registry.vercel.app/)

## Tools

- SQL query generator with database schema context: https://github.com/sqlchat/sqlchat
- [eli64s/readme-ai: README file generator, powered by AI.](https://github.com/eli64s/readme-ai)
- **NLWeb**: Open-source platform for building conversational interfaces for websites, with native MCP (Model Context Protocol) support
  - Lets you interact with a website in natural language, returning JSON that uses Schema.org
  - Every NLWeb instance also acts as an MCP server with an `ask` method for asking natural-language questions
  - Leverages Schema.org and RSS (used by over 100 million websites) as a semantic layer for the web
  - Cross-platform: Windows, macOS, Linux
  - Vector stores: Qdrant, Snowflake, Milvus, Azure AI Search, Elasticsearch, Postgres, Cloudflare AutoRAG
  - LLMs: OpenAI, DeepSeek, Gemini, Anthropic, Inception, HuggingFace
  - [GitHub](https://github.com/nlweb-ai/NLWeb) #MCP #natural-language #Schema.org #conversational-interface
- Generating website interfaces:
  - [https://library.relume.io](https://library.relume.io/) #webUI
  - **same.new**: Website UI generation tool - [Website](https://same.new/) #webUI
  - Figma-like tool: https://github.com/onlook-dev/onlook
- Agent File: Agent File (.af) is an open format for serializing the state of an AI agent that has persistent memory and behavior. It packages the agent's components (system prompt, memory, tool configuration, language model settings) into a single file.
  - Key functions:
    - State serialization: Saves the full configuration, memory, history, and tools.
    - Sharing and portability: Use across environments and frameworks.
    - Checkpoint & version control: Track and save multiple versions.
    - Flexible import/export: Supports SDKs (Python, Node.js) and a REST API.
    - Ready-made sample agents: For example MemGPT, a research agent, and customer support.
  - Pros:
    - Has a roadmap for extension (multi-agent, passage storage, new schemas).
  - Cons:
    - Depends on framework support (currently mainly Letta).
    - Secrets are stripped on export and must be handled separately at deployment.
  - Use cases:
    - Complex agents that need continuous save/restore (such as MemGPT).
    - Sharing agents with the AI community.
    - Checkpoints and version control during development.

## CLI

- Gemini CLI: https://github.com/google-gemini/gemini-cli
- Claude Code
  - https://z.ai
- Rovo Dev
- [QwenLM/qwen-code: qwen-code is a coding agent that lives in digital world.](https://github.com/QwenLM/qwen-code)
- [charmbracelet/crush: The glamourous AI coding agent for your favourite terminal 💘](https://github.com/charmbracelet/crush)
- **OpenCode**: Open-source AI coding agent, similar to Claude Code but 100% open source
  - **Key features:**
    - 100% open source, not tied to any provider
    - Supports many models: Claude, OpenAI, Google, or local models
    - Supports LSP (Language Server Protocol) out of the box
    - Focused on the TUI (Terminal User Interface), built by neovim users
    - Client/server architecture: can run on your computer and be controlled remotely (for example from a mobile app)
  - **Agents:**
    - **build**: The default agent, with full access for development work
    - **plan**: A read-only agent for code analysis and exploration; denies file edits by default and asks for permission before running bash commands
    - **general**: A subagent for complex searches and multi-step tasks, invoked with `@general` in messages
  - **Installation:**
    - `curl -fsSL https://opencode.ai/install | bash`
    - Or via package managers: npm, brew, scoop, choco, paru, mise, nix
  - **Desktop App (BETA):** Available for macOS, Windows, Linux
  - **Differences from Claude Code:**
    - Provider-agnostic: not locked into a specific provider
    - Focus on the TUI and terminal experience
    - Flexible client/server architecture
  - [GitHub](https://github.com/anomalyco/opencode) #codingAgent #AI #open-source #TUI #LSP

## VS Code Extensions

- https://www.gocodeo.com
- [Roo Code – Your AI-Powered Dev Team in VS Code](https://roocode.com/)
- [TabbyML/tabby: Self-hosted AI coding assistant](https://github.com/TabbyML/tabby)
- [continuedev/continue: ⏩ Ship faster with Continuous AI. Build and run custom agents across your IDE, terminal, and CI](https://github.com/continuedev/continue)
- **Kilo**: All-in-one agentic engineering platform, #1 on OpenRouter - [VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=Kilo.kilo) | [GitHub](https://github.com/Kilo-Org/kilocode) | [Website](https://kilo.ai/)

## IDE

- [Kiro: The AI IDE for prototype to production](https://kiro.dev/)
- Cursor
- Winsurf
- Zed Editor

## Local Agent

- [All-Hands-AI/OpenHands: 🙌 OpenHands: Code Less, Make More](https://github.com/All-Hands-AI/OpenHands)

## Other Tools

- ClonewebX - Advanced web interface cloning
- Create a sandbox to run agents: [daytonaio/daytona: Daytona is a Secure and Elastic Infrastructure for Running AI-Generated Code](https://github.com/daytonaio/daytona)

## Devin AI

**Devin** is billed as **"the world's first AI software engineer"**, developed by the American startup **Cognition AI**. It was first introduced on **March 12, 2024** by Scott Wu, CEO of Cognition AI.

**Fully autonomous:** Unlike other AI assistants that only help with coding, Devin can **work independently** when given a task.

**Full development workflow:** Devin can:

- Write code on its own
- Fix bugs (debugging)
- Deploy applications
- Complete software programming projects automatically

**Supporting programmers:** Devin is designed to assist programmers during software development, helping real engineers **cut down on working time**.

Devin represents a **breakthrough innovation** in artificial intelligence, opening up the possibility of automating many steps in the software development process and potentially changing how programmers work worldwide.

## Paper to Agent

- **Paper2Agent**: Tool that converts academic papers into executable AI agents - [GitHub](https://github.com/jmiao24/Paper2Agent) #paper #agent #academic #research
- **HumanLayer**: Tool that helps AI coding agents solve hard problems in complex codebases. Provides the best way for AI coding agents to handle complex codebases - [GitHub](https://github.com/humanlayer/humanlayer) #codingAgent #AI #codebase #development

## Cosine AI

**Cosine** (https://cosine.sh/) is a coding agent built for enterprises, focused especially on complex codebases and high-security environments.

- **Key features:**
  - Autonomous coding agent for enterprise codebases
  - Supports on-premise deployment (air-gapped or VPC)
  - Uses the Genie 2 model (a proprietary model), reaching a 72% pass rate on the SWE-Lancer benchmark
  - Handles many tasks in parallel (bug fixes, features, refactors)
  - Integrates with GitHub, Jira, Slack
  - Automatically creates PRs; developers only need to review and merge

- **Use cases:**
  - Asynchronous, multi-threaded feature development
  - Comprehensive bug scanning and fixing, writing tests
  - Large-scale refactoring and library updates
  - Researching legacy or third-party codebases ("research mode")
  - Assigning tasks directly from Jira, Linear, Trello, Asana, GitHub, Slack
  - Automatically creating and updating documentation
  - Optimizing and maintaining CI/CD pipelines
  - Fixing security issues and improving compliance
  - Migrating and modernizing frameworks, services, libraries

- **Security & compliance:**
  - SOC 2 attested, ISO 27001 aligned
  - Customer IP is protected; no training on shared models
  - Audit logs and fine-grained access controls
  - Integration with identity providers (IdP)
  - Zero data leakage, private deployments
  - Supports strict regulations: FINRA, HIPAA, ITAR, GDPR
  - Red-team tested, encryption everywhere

- **Deployment options:**
  - Fully air-gapped, on-premise: installed entirely on the customer's infrastructure with no external dependencies
  - In your VPC: deployed inside a VPC, running entirely in the customer's cloud behind a firewall
  - Option to fine-tune on internal codebases, frameworks, or languages (for example COBOL, Fortran) to support legacy systems

## Dyad

**Dyad** (https://www.dyad.sh/) is an open-source AI app builder that runs locally, flexible and free of lock-in.

- **Key features:**
  - Open-source AI app builder that runs locally
  - No lock-in: the source code is on your machine and you can use your favorite IDE (VS Code, Cursor, and so on)
  - Supports any AI model, including free tiers (Gemini 3, GPT-5, Claude Sonnet 4.5, and so on)
  - Supabase integration (Auth, Database, Server Functions) for building full-stack apps
  - Runs local models with Ollama for complete privacy
  - Fast, smooth experience: edit, preview, and undo with real-time feedback
  - 19k+ GitHub stars, 1M+ downloads, 4.9/5 reviews

- **Plans:**
  - **Dyad Free**: Local, open-source AI App Builder, no sign-up, bring your own API key, community support
  - **Dyad Pro** ($20/month): Exclusive Pro modes for large codebases, 200 AI credits/month, full Dyad Academy access
  - **Dyad Max** ($79/month): 900 AI credits/month, prioritized access to office hours, reload credits anytime

- **Pros:**
  - Privacy: runs locally, data never leaves your machine
  - Speed: instant, responsive interactions
  - Flexibility: no lock-in to a vendor, model, or platform
  - Open source: always free and powerful

## Kilo

**Kilo** (https://kilo.ai/) is an all-in-one agentic engineering platform and the most popular open-source coding agent. It currently ranks #1 on OpenRouter with 750k+ Kilo Coders and processes 6.1 trillion tokens per month.

- **Key features:**
  - **Code Generation**: Generates code from natural language
  - **Task Automation**: Automates repetitive coding tasks
  - **Automated Refactoring**: Automatically refactors and improves existing code
  - **MCP Server Marketplace**: Easily find and use MCP servers to extend the agent's capabilities
  - **Multi Mode**:
    - **Architect**: Planning
    - **Coder**: Writing code
    - **Debugger**: Debugging
    - Create your own custom modes
  - **Self-checking**: Checks its own work
  - **Terminal commands**: Runs terminal commands
  - **Browser automation**: Automates the browser
  - **Latest AI models**: Supports 500+ AI models including Gemini 3 Pro, Claude 4.5 Sonnet & Opus, GPT-5
  - **API keys optional**: Can be used without API keys (with bonus credits)

- **Installation:**
  - Install the extension from the VS Code Marketplace
  - Create an account to access 500+ AI models with transparent pricing (matching provider rates)
  - Bonus: $20 credits on the first top-up

- **Documentation & support:**
  - [GitHub](https://github.com/Kilo-Org/kilocode) - Apache-2.0 license
  - [Documentation](https://kilo.ai/docs)
  - Discord community
  - GitHub Discussions
  - Reddit community

- **Pros:**
  - Open source and the most popular in the community
  - Supports many AI models, no lock-in
  - MCP Server Marketplace for easy extension
  - Flexible multi mode for different use cases
  - Transparent pricing that matches provider rates
  - Strong self-checking and automation

- **Use cases:**
  - Generate code from natural-language descriptions
  - Automate repetitive coding tasks
  - Refactor and improve an existing codebase
  - Debug and fix bugs
  - Browser automation for testing
  - Custom workflows with custom modes

> **See also:** [AI Coding Productivity Tools](/Technology/AI/Tools/Agents/AI Coding Productivity Tools) · [Agents Overview](/Technology/AI/Tools/Agents/Agents Overview) · [Kit Comparison](/Technology/AI/Tools/Agents/Claude Code Kits/Kit Comparison)
