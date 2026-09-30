---
area: technology
domain: agents
type: tool
title: Unreal Agent
description: Open-source AI editor copilot plugin for Unreal Engine 5.6 that runs as a dockable in-editor chat tab, drives the editor via Python execution, scene queries, viewport screenshots, and optional MCP/Replicate tools.
timestamp: "2026-10-01T00:00:00.000Z"
tags:
  - technology
  - agents
  - unreal-engine
  - ai-tools
  - game-development
resource: https://github.com/TREE-Ind/Unreal-Agent
---

# Unreal Agent

[Unreal Agent](https://github.com/TREE-Ind/Unreal-Agent) (plugin name `UnrealGPT`, by TREE Industries, Apache-2.0) is an AI-powered editor copilot for Unreal Engine 5.6. It runs inside the editor as a dockable tab, talks to OpenAI's Responses API (default model `gpt-5.1`), and can inspect and modify the project — not just answer questions — by executing Python editor scripts, querying the scene, and capturing viewport screenshots.

## Core Features

- **In-editor chat** — dockable `UnrealGPT` tab under `Window → UnrealGPT`; `Ctrl+Enter` to send; drag-and-drop Content Browser assets into chat for structured asset context; attach local images as vision input.
- **Capture Context** — one-click button that streams a JSON scene summary (actors, transforms, components) plus a viewport screenshot so the agent reasons about what it sees before acting.
- **Voice input** — microphone button records audio, transcribed via OpenAI Whisper (`whisper-1`), inserted into the input for review.
- **Action-based agent** — the model is instructed to change the project for you (create/modify actors, Blueprints, batch Content Browser ops) via `python_execute`, then verify with `scene_query` and `viewport_screenshot`.
- **MCP support (optional)** — connects to external MCP servers over stdio or HTTP/SSE, configured in Project Settings; `mcp_list_tools` / `mcp_call` / `mcp_read_resource` / `mcp_get_prompt` tools.
- **Replicate generation (optional)** — `replicate_generate` tool produces images, 3D, audio, music, speech, video via Replicate's Predictions API; shipped Python helper `unrealgpt_mcp_import.py` imports generated files as `Texture2D`, `StaticMesh`, `SoundWave`.

## Agent Toolset

| Tool                         | Purpose                                                                                                      |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------ |
| `python_execute`             | Run arbitrary Python in the editor process; standard JSON `result` contract (`status`, `message`, `details`) |
| `scene_query`                | Search actors by class/name/label/component filters; returns compact JSON with name, class, location         |
| `viewport_screenshot`        | Capture active viewport as PNG (base64), displayed inline in chat                                            |
| `reflection_query`           | Inspect a `UClass`'s properties and functions so the model writes correct Python against UE types            |
| `file_search` / `web_search` | Native OpenAI Responses tools; `file_search` targets a UE 5.6 Python API vector store                        |
| `replicate_generate`         | Optional content generation via Replicate                                                                    |
| `mcp_*` tools                | Optional external MCP server integration                                                                     |
| Computer Use                 | Stubbed in codebase, currently disabled for safety                                                           |

## Safety Guardrails

- Tool-loop protection with max tool-call iteration count.
- Tool result size limits to avoid blowing up context.
- Configurable execution timeout for risky Python code; `Max Context Tokens` cap on request payloads.
- Individual tools can be toggled in settings (Python execution, screenshots, scene summary, Replicate, MCP).

## Setup Notes

- Requires **UE 5.6.0**; developed/tested on Windows. Install as `YourProject/Plugins/UnrealGPT` or engine-wide under `Engine/Plugins/Developer/`.
- Enable the **Python Editor Script Plugin** — `python_execute` depends on it.
- Configure under **Edit → Project Settings → Plugins → UnrealGPT**: API key (OpenAI-compatible; `Base URL Override` allows proxies/self-hosted gateways), model, tool toggles, Replicate token, timeouts.
- Needs access to the `responses` endpoint, `audio/transcriptions` for Whisper, and `web_search`/`file_search` if used. The `file_search` vector store ID is hardcoded in `UnrealGPTAgentClient.cpp` — bring-your-own store requires a source edit and rebuild.

## Architecture

- Two modules: `UnrealGPT` (runtime, minimal skeleton) and `UnrealGPTEditor` (UI, agent client, tools, voice input, settings).
- Chat UI in `SUnrealGPTWidget`: toolbar, scrollable history with message bubbles and color-coded tool cards, multiline input with voice/attach buttons, reasoning strip.
- Uses bundled Geist / Geist Mono fonts, falling back to editor fonts.

> **See also:** [Agents Overview](/Technology/AI/Tools/Agents/Agents%20Overview.md) · [Agent Infrastructure And Platforms](/Technology/AI/Tools/Agents/Agent%20Infrastructure%20And%20Platforms.md)
