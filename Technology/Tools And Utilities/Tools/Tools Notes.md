---
area: technology
domain: utility-tools
type: resource
title: Tools Notes
description: "Open-source business applications and a short list of terminal user-interface clients."
timestamp: "2026-10-07T00:00:00.000Z"
tags:
  - technology
  - business-apps
  - tools
  - business
  - tui
resource: https://github.com/twentyhq/twenty
---

# Tools Notes

## Business Applications

- https://github.com/brightbeanxyz/brightbean-studio — Open-source, self-hostable social media management platform for scheduling and publishing across 10+ platforms.
- https://github.com/gitroomhq/postiz-app — Agentic social media scheduling and publishing tool.
- https://github.com/twentyhq/twenty — #1 open-source CRM; customizable objects, kanban/table views, workflow automation, and role-based permissions.
- https://github.com/kargulstudio/sales-crm — Sales CRM (Kargul Studio, MIT): Next.js 16, React 19, Tailwind 4, and Zustand UI for a company pipeline (table, owner/stage/activity filters, detail sheet, owner profile, notifications, CSV export). Data is 18 static companies in `data/companies.ts`, held in memory only; `package.json` has no database or auth. README is still titled "Kargul Starter" and tells you to read CONVENTIONS.md, which issue #1 says is missing. Renamed from kargul-starter on 2026-10-06. `SITE_URL` defaults to https://example.com. GitHub on 2026-10-07: created 2026-10-04, 1,590 stars, 333 forks, 3 watchers, no description.
- https://github.com/kargulstudio/workflow-editor — Workflow editor (Kargul Studio, no LICENSE file): Next.js 16, React 19, Tailwind 4, and Zustand UI for email automations. Custom canvas (drag, snap, connect, undo/redo), not React Flow. Steps are trigger, send email, update subscription, webhook, wait, delay, true/false branch, and enroll. Seven seed automations in `data/automations.ts`, held in memory only; `package.json` has no database, auth, or graph library. Run once animates a test subscriber and picks branches with `Math.random`; webhook logs say 200 without a request. Connect MCP copies a static `@buzzing/mcp` config and stays "Not connected". Export downloads JSON, CSV, or Markdown; the JSON blurb says re-import, but the page only downloads or copies. The share link and enroll cURL point at buzzing.email, and the app has no importer or that API. Overview charts are generated in `overview-data.ts`. README is still titled "Kargul Starter"; `CONVENTIONS.md` returns 404. `package.json` name is still `kargul-starter`. `SITE_NAME` is "Buzzing Your Inbox"; `SITE_URL` defaults to https://example.com. GitHub homepage is https://workflow-editor-kargul.vercel.app/. GitHub on 2026-10-07: created 2026-09-15, HEAD `f2471b3` on 2026-09-16, 410 stars, 62 forks, 1 watcher, no description, no license.
- https://github.com/makeplane/plane — Open-source Jira/Linear/Monday/ClickUp alternative; modern project management with work items, cycles, modules, custom views, AI-enabled pages, and analytics. Self-hostable (Docker/Kubernetes) or cloud.
- https://github.com/xbtlin/ai-berkshire — AI-era value-investing research framework for Claude Code/Codex; blends the methodologies of Buffett, Munger, Duan Yongping, and Li Lu via multi-agent adversarial analysis, with financial-rigor tooling (precise decimal math, market-cap/valuation verification, Benford's law checks) and slash commands for research, checklists, and news attribution.
- https://github.com/every-app/open-seo — Open-source, pay-as-you-go alternative to Semrush/Ahrefs (keyword research, rank tracking, competitor insights, backlinks, site audits, AI visibility); built AI-agent-first with an MCP server and Agent Skills for Claude Code and other agents, bring-your-own DataForSEO key, self-hostable via Docker or Cloudflare.
- https://github.com/ever-co/ever-gauzy — Ever Gauzy: open-source Business Management Platform (ERP/CRM/HRM/ATS/PM); time tracking, invoicing/billing, payroll, accounting, and issue tracking in one self-hostable TypeScript app (AGPL-3.0).

> **See also:** [Online Tools](/Technology/Tools And Utilities/Tools/Online Tools) · [Developer Tools And Environments](/Technology/Tools And Utilities/Tools/Developer Tools And Environments)

## Terminal UI Tools

### Resources

- Awesome TUI: https://github.com/rothgar/awesome-tuis
- Cointop: https://github.com/cointop-sh/cointop
- Youtube: https://github.com/mps-youtube/yewtube
- IRC client:
  - https://github.com/irssi/irssi
- Discord:
  - https://github.com/ayn2op/discordo
- Telegram:
  - https://github.com/d99kris/nchat
- File manager:
  - https://github.com/gokcehan/lf
- Kafka:
  - https://github.com/sauljabin/kaskade
- Database:
- Text editor:
  - https://github.com/helix-editor/helix

> **See also:** [Developer Tools And Environments](/Technology/Tools And Utilities/Tools/Developer Tools And Environments) · [Git And GitHub](/Technology/Tools And Utilities/Tools/Git And GitHub)
