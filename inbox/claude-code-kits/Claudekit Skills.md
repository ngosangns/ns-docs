# ClaudeKit Skills - Agent Skills Collection cho Claude Code

## Định nghĩa

**ClaudeKit Skills** là bộ sưu tập Agent Skills cho Claude Code, gồm 30+ specialized skills bao phủ AI/ML, web development, DevOps, databases, document processing, debugging, và problem-solving. Cũng là Claude Code Plugin Marketplace cho seamless installation.

## Thông tin cơ bản

| Thông tin       | Giá trị                                    |
| --------------- | ------------------------------------------ |
| **Stars**       | 2k                                         |
| **Forks**       | 391                                        |
| **Languages**   | Python 87.1%, JavaScript 12.1%, Shell 0.8% |
| **License**     | MIT                                        |
| **Marketplace** | Claude Code Plugin Marketplace             |

## Cài đặt

### Marketplace (Recommended)

```
/plugin marketplace add mrgoonie/claudekit-skills
/plugin install ai-ml-tools@claudekit-skills
/plugin install web-dev-tools@claudekit-skills
/plugin install devops-tools@claudekit-skills
```

### Manual (Legacy)

```bash
git clone https://github.com/mrgoonie/claudekit-skills
cp -r claudekit-skills/.claude/* /path/to/your/project/.claude/
```

## Skills Catalog

### Authentication & Security

| Skill       | Mô tả                                                                          |
| ----------- | ------------------------------------------------------------------------------ |
| better-auth | TypeScript auth framework: email/password, OAuth, 2FA, passkeys, multi-tenancy |

### AI & Agent Development

| Skill               | Mô tả                                                                             |
| ------------------- | --------------------------------------------------------------------------------- |
| context-engineering | Context engineering cho AI agents: degradation, optimization, memory, multi-agent |
| google-adk-python   | Google Agent Development Kit: tools, multi-agent, workflows, Vertex AI deployment |

### Backend Development

| Skill               | Mô tả                                                                            |
| ------------------- | -------------------------------------------------------------------------------- |
| backend-development | Node.js, Python, Go, Rust + NestJS, FastAPI, Django + PostgreSQL, MongoDB, Redis |

### AI & Machine Learning

| Skill               | Mô tả                                                                     |
| ------------------- | ------------------------------------------------------------------------- |
| ai-multimodal       | Gemini API: audio (9.5h), images, video (6h), documents, image generation |
| context-engineering | Agent context optimization                                                |

### Design & Aesthetics

| Skill           | Mô tả                                                                    |
| --------------- | ------------------------------------------------------------------------ |
| aesthetic       | Beautiful interfaces: visual hierarchy, color theory, micro-interactions |
| frontend-design | Distinctive, production-grade frontend interfaces                        |

### Web Development

| Skill                | Mô tả                                               |
| -------------------- | --------------------------------------------------- |
| web-frameworks       | Next.js (App Router, RSC), Turborepo, RemixIcon     |
| ui-styling           | shadcn/ui + Radix UI + Tailwind CSS                 |
| frontend-development | React/TypeScript: Suspense, TanStack Router, MUI v7 |
| threejs              | 3D web apps: WebGL/WebGPU, shaders, VR/XR, physics  |

### Browser Automation & Testing

| Skill           | Mô tả                                                                    |
| --------------- | ------------------------------------------------------------------------ |
| chrome-devtools | Puppeteer: automation, screenshots, performance, scraping                |
| web-testing     | Playwright, Vitest, k6: E2E/unit/integration/load/security/accessibility |

### Cloud Platforms & DevOps

| Skill  | Mô tả                                             |
| ------ | ------------------------------------------------- |
| bunny  | Bunny.net: CDN, Edge Storage, Stream, DNS, WAF    |
| devops | Cloudflare Workers/R2/D1/KV, Docker, Google Cloud |

### Databases

| Skill     | Mô tả                                                           |
| --------- | --------------------------------------------------------------- |
| databases | MongoDB + PostgreSQL: schemas, queries, migrations, replication |

### Development Tools

| Skill            | Mô tả                                                  |
| ---------------- | ------------------------------------------------------ |
| claude-code      | Complete guide to Claude Code features                 |
| mcp-builder      | Build MCP servers in Python/TypeScript                 |
| mcp-management   | Discover, analyze, execute MCP tools/prompts/resources |
| repomix          | Package repos into single AI-friendly files            |
| media-processing | FFmpeg + ImageMagick: 100+ formats                     |

### Document Processing

| Skill | Mô tả                                                 |
| ----- | ----------------------------------------------------- |
| docx  | Word documents: tracked changes, comments, formatting |
| pdf   | PDF: extract, create, merge, split, forms             |
| pptx  | PowerPoint: layouts, animations, speaker notes        |
| xlsx  | Excel: formulas, formatting, data analysis, charts    |

### Debugging & Problem-Solving

| Skill                          | Mô tả                                      |
| ------------------------------ | ------------------------------------------ |
| defense-in-depth               | Validate at every layer                    |
| root-cause-tracing             | Trace bugs backward through call stack     |
| systematic-debugging           | 4-phase framework                          |
| verification-before-completion | Evidence before claims                     |
| collision-zone-thinking        | Force unrelated concepts together          |
| inversion-exercise             | Flip core assumptions                      |
| meta-pattern-recognition       | Spot patterns in 3+ domains                |
| simplification-cascades        | One insight eliminates multiple components |

### Other

| Skill               | Mô tả                                     |
| ------------------- | ----------------------------------------- |
| sequential-thinking | Step-by-step reasoning                    |
| mermaidjs-v11       | 24+ diagram types                         |
| shopify             | Shopify apps, themes, checkout extensions |
| payment-integration | SePay, Polar, Stripe, Paddle, Creem.io    |
| docs-seeker         | Documentation discovery via llms.txt      |
| code-review         | Code review feedback handling             |
| skill-creator       | Guide for creating skills                 |

## Plugin Categories (Marketplace)

| Category              | Skills                                     |
| --------------------- | ------------------------------------------ |
| ai-ml-tools           | AI/ML with Gemini API, context engineering |
| web-dev-tools         | React, Next.js, Tailwind CSS               |
| devops-tools          | Cloudflare, Docker, GCP, Databases         |
| backend-tools         | Node.js, Python, Go, Authentication        |
| document-processing   | Word, PDF, PowerPoint, Excel               |
| debugging-tools       | Systematic debugging frameworks            |
| problem-solving-tools | Advanced thinking techniques               |
| platform-tools        | Bunny.net, Shopify, payments, MCP          |
| meta-tools            | Skill creation, code review                |
| media-tools           | FFmpeg, ImageMagick                        |
| research-tools        | Documentation discovery                    |
| specialized-tools     | Sequential thinking, diagrams              |

## Tech Stack

| Component   | Technology                   |
| ----------- | ---------------------------- |
| Primary     | Python                       |
| Secondary   | JavaScript, Shell            |
| Integration | Claude Code Agent Skills API |

## Ưu điểm

| Ưu điểm                    | Mô tả                            |
| -------------------------- | -------------------------------- |
| Comprehensive              | 30+ skills bao phủ nhiều domains |
| Marketplace install        | Seamless installation & updates  |
| Document processing        | Word, PDF, PPTX, XLSX skills     |
| Problem-solving frameworks | Systematic debugging & thinking  |
| AI/ML integration          | Gemini API multimodal support    |
| Payment integration        | 5 payment providers              |
| Free tier                  | Nhiều skills useful miễn phí     |

## Nhược điểm

| Nhược điểm        | Mô tả                                                  |
| ----------------- | ------------------------------------------------------ |
| Commercial upsell | Advanced skills cần ClaudeKit.cc purchase              |
| Python-heavy      | 87% Python, JavaScript developers may prefer TS-native |
| Quality varies    | Một số skills detailed hơn những số khác               |
| No hooks/agents   | Chỉ skills, không có hooks hay agents                  |
| Manual updates    | Legacy install không có auto-update                    |

## Sử dụng khi nào

- **Skill-focused workflows**: Cần specialized domain knowledge
- **Document processing**: Cần Word/PDF/PPTX/XLSX automation
- **Payment integration**: Cần SePay, Stripe, Paddle, etc.
- **AI multimodal**: Cần Gemini API cho audio/video/image
- **Debugging frameworks**: Cần systematic problem-solving

---

**Tài liệu tham khảo**:

- [mrgoonie/claudekit-skills](https://github.com/mrgoonie/claudekit-skills)
- [ClaudeKit.cc](https://claudekit.cc)
- [Agent Skills Docs](https://docs.claude.com/en/docs/agents-and-tools/agent-skills/overview)
