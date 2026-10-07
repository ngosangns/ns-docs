---
area: technology
domain: genai
type: tool
title: NovelKit
description: NovelKit (novelkit.cc) is a Vietnamese long-form fiction studio; the public V2 Lite repo is a local single-operator pipeline under a source-available non-commercial, no-derivatives license, and it is not NovelAI.
timestamp: "2026-10-07T00:00:00.000Z"
tags:
  - technology
  - genai
  - fiction
  - agents
resource: https://novelkit.cc/
---

# NovelKit

[NovelKit](https://novelkit.cc/) is a long-form fiction production system aimed at Vietnamese licensed catalogs. The English homepage (checked 2026-10-07) calls it a studio-grade engine: a story bible and world rulebook, six specialists, and a quality gate before a chapter is written into canon. It is a different product from [NovelAI](https://novelai.net/). The site's own comparison page, [novelkit.cc/vs/novelai](https://novelkit.cc/vs/novelai), says so. The path [novelkit.cc/novel-ai](https://novelkit.cc/novel-ai) is NovelKit's Novel AI Gallery, a list of fiction produced through NovelKit.

Two surfaces share the name:

| Surface | What it is | Checked |
| --- | --- | --- |
| [novelkit.cc](https://novelkit.cc/) | Marketing site for the full studio. Links [studio.novelkit.cc](https://studio.novelkit.cc/) and [drama.novelkit.cc](https://drama.novelkit.cc/). Partnership mail on the homepage is `Mrdee0428@gmail.com`. Footer: content copyright stays with the user or partner under that project's contract. | Homepage `/` and `/en`, 2026-10-07. Studio was not signed into. |
| [danielnguyen0428/Novelkit_v2_lite](https://github.com/danielnguyen0428/Novelkit_v2_lite) | Public local-first studio. README says this Lite repo is for trying the workflow, and that the full product and catalog partnership live at novelkit.cc. | Default branch `main`, tree `0a8833ae`, GitHub record updated 2026-09-01. 3 stars, 1 fork. Created 2026-08-28. |

Copyright on the Lite license is Daniel Nguyen (`danielnguyen0428`). Permission requests for that repo go to `danielnguyen0428@gmail.com`. Provenance id in `PROVENANCE.json`: `NOVELKIT-V2-LITE-DN0428-20260828-12A133B9E572`. Product version string: `2.0.0-lite`. `telemetry` is `false`.

## What the homepage describes

The English page frames the system as a control plane, not a chat box. One seam, `delegate_tool`, sits between the surface and the specialists. The orchestrator is named Lãng Khách. Specialists do not call each other. A chapter command enters one queue from the CLI, an API, or cron. A passing review is what gets written into canon. A fail goes back to rewrite.

Six roles on the page:

Character Architect
: Character profiles and relationships.

World Builder
: World and genre rules.

Plot Weaver
: Chapter outline along an arc map.

Prose Writer
: Draft plus recall.

Quality Auditor
: Scores the draft. The page prints `REVIEW_PASS_SCORE=85` and `SOFT_FAIL=70`.

Lãng Khách
: Sync and the gate.

Two modes share one DAG. Legacy (`full_plan` / rolling) is outline, write, `self_check`, review. The page says Legacy still runs when every long-form flag is off. Compass adds volumes (Cuốn) and acts (Hồi): `bootstrap.compass`, then `advance_expansion` for the next act, capped at `target_chapters`, then the same chapter loop. At an act boundary the page names `arc_summary`. At a volume boundary it names `volume_summary` and `update_compass`. P13 gating: chapter N is ready only when N is at most `expanded_through_chapter`. On Legacy, the page says gating is always true.

The page stacks five layers. L1 is a thin surface (CLI, FastAPI, cron, React Studio) that decides nothing. L2 is the Hermes agent loop into `delegate_tool`. L3 is `PipelineEngine` plus `PipelineStateStore` plus an AutoNovel adapter. L4 is custom `novelkit_*` tools plus two single-select plugins, `context_engine` and `memory`. L5 is a file-first canon: `PROJECT_DNA`, database, outlines, chapters, reviews, summaries, memory, `style_vault`, logs, `.commits`.

Memory on the page is five layers A through E and eight itemized categories in a per-novel SQLite: `character_state`, `story_facts`, `world_rules`, `timeline`, `open_loops`, `reader_promises`, `relationships`, `minor_cast`. Rotation is at 3,500 words. The page says this is structured memory, and that relationships are inferred at query time rather than stored as a graph database. Context ranking prefers canon over derivatives even when the derivative scores higher (the page labels this P5).

Genre row on the homepage: Tiên Hiệp, Ngôn Tình, Xuyên Không, Hệ Thống, Đô Thị, Khoa Huyễn. The Lite README's six packs are Tiên Hiệp, Đô Thị, Ngôn Tình, Khoa Huyễn, Xuyên Không, and Meta Genre. The sixth name does not match. Treat them as two published lists.

These figures appear as homepage claims, with no measurement, sample, or log attached on the pages read on 2026-10-07: 200 or more chapters a week, 300 or more chapters a series, and prose "on par with real authors" after the gate "strips out" AI-flavor. The gate thresholds 85 and 70 are repeated in the Lite README as the pass score and the soft-fail score. That repetition is a design constant. It is not a published quality study.

The page also says 24 correctness properties, P1 through P24, each with a Hypothesis test under `tests/`. It names P1, P3, P4, P12, and P13 for DAG order, P5 through P7 for canon and authority, P2, P8, P11, and P24 for idempotency and migration, and P15 through P19 for long-form continuity. Those tests were not run for this note.

The homepage says the tool layer is 14 `novelkit_*` tools. The Lite tree below registers 15.

## Public Lite repo

`ARCHITECTURE.md` in that tree limits Lite to four rules: bind HTTP to `127.0.0.1` by default, one operator with no login, a bring-your-own OpenAI-compatible provider, and file-first canon. SQLite holds operational metadata. It does not replace the workspace files. There is no Redis, Celery, PostgreSQL, OAuth, billing, or public catalog in Lite. The architecture doc says adding those would change the product boundary. The README says multi-user, billing, a public catalog, and cloud deployment belong to the full NovelKit service.

`delegate.py` says a real Hermes deployment maps this call onto Hermes' `delegate_tool`. In the Lite package the function is a registry lookup so the package can be tested alone. `bootstrap.py` calls the two plugins "single-select Hermes plugins". The homepage's "runs on Hermes infrastructure" is the deployment the site is selling. The public repo is the isolated package, not that hosted control plane.

`bootstrap.py` registers these 15 tools: `novelkit_pipeline`, `novelkit_gate`, `novelkit_language_guard`, `novelkit_ai_flavor`, `novelkit_cool_point`, `novelkit_strand`, `novelkit_style_coherence`, `novelkit_reference`, `novelkit_dna`, `novelkit_sync`, `novelkit_diagnostics`, `novelkit_compass`, `novelkit_recall`, `novelkit_steer`, `novelkit_graph`. The same file imports `plugins.memory.novelkit_memory` and `plugins.context_engine.novelkit_context`. `ARCHITECTURE.md` says HTTP health currently sees 20 capability entries.

Studio stack in that doc: React 18, TypeScript, Vite, FastAPI, one Uvicorn process. A run is a daemon thread plus a row in `run_jobs`. One novel has one writing run at a time. A conflict returns `alreadyRunning`. Startup marks leftover `queued`, `running`, or `pausing` jobs failed with `process_restarted`. API keys are Fernet-encrypted in SQLite and need `.secrets/master.key`. The client does not get the key back. Only the prompt and context for that call go to the provider the operator configured.

Requirements from the README: Python 3.11 or newer, Node.js 20.19 or newer or 22.12 or newer, and npm. `./setup.sh` then `./run-local.sh` serves [http://127.0.0.1:8000/studio](http://127.0.0.1:8000/studio). Paths: `.data/novelkit-lite.db`, `.secrets/master.key`, `storage/users/.../novels/<uuid>/` for Studio novels, and `workspaces/` as a compatibility root for the older CLI.

The license file is `LicenseRef-NovelKit-V2-Lite-NC-ND-1.0`, effective 2026-08-28. It allows unmodified use and verbatim redistribution for personal, educational, research, evaluation, or other non-commercial use. Commercial use, modification, derivative works, and putting the code into another product or a paid service need prior written permission. Silence is not permission. The license does not claim the user's novels, prompts, or notes. It says it is source-available and not an OSI-approved open-source license. Installing, local configuration, user content, and backups of user data are not by themselves a derivative of the software.

## Other repositories named NovelKit

These are different projects. None of them is the novelkit.cc studio.

| Repository | What the GitHub description says |
| --- | --- |
| [thiendiepdt/novelkit](https://github.com/thiendiepdt/novelkit) | Web and desktop toolkit for converters and translators of Chinese web novels. |
| [t59688/novel-kit](https://github.com/t59688/novel-kit) | Spec-driven AI toolkit for million-word novels. |
| [K-02-b/novelkit](https://github.com/K-02-b/novelkit) | Workbench that translates Chinese web novels into idiomatic English. |
| [iaj6/novelkit](https://github.com/iaj6/novelkit) | Agent-drafted novels published as a small press. |

A nearby vault entry with the same job and a different design is [ainovel-cli](https://github.com/kentjuno/ainovel-cli), listed in [Content And Multimedia Tools](/Technology/AI/Tools/GenAI/Content And Multimedia Tools): one coordinator and a single LLM loop, from Architect to Writer to Editor.
