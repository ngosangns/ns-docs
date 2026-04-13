# ClaudeKit CLI - CLI & Web Dashboard cho ClaudeKit Projects

## Định nghĩa

**ClaudeKit CLI** (`ck`) là command-line tool và web dashboard để quản lý ClaudeKit projects. Cung cấp 16 CLI commands, React web dashboard, hook diagnostics, projects registry, và tích hợp GitHub. Đây là commercial product của [ClaudeKit.cc](https://claudekit.cc).

## Thông tin cơ bản

| Thông tin     | Giá trị                   |
| ------------- | ------------------------- |
| **Stars**     | 95                        |
| **Forks**     | 41                        |
| **Languages** | TypeScript 99.1%          |
| **License**   | MIT                       |
| **Version**   | v3.41.4                   |
| **Product**   | ClaudeKit.cc (commercial) |

## Cài đặt

```bash
npm install -g claudekit-cli
# or: bun add -g claudekit-cli
# or: yarn global add claudekit-cli
# or: pnpm add -g claudekit-cli

ck --version
```

## Architecture

```
claudekit-cli/
├── src/              # Modular domain-driven architecture (122 modules)
├── bin/              # CLI entry point
├── scripts/          # Build & utility scripts
├── docs/             # Comprehensive documentation
├── __tests__/        # Test suite
├── tests/            # Integration tests
├── plans/templates/  # Project templates
└── backlog/          # Development backlog
```

## Core Features

### 1. CLI Commands (16)

| Command        | Chức năng                        |
| -------------- | -------------------------------- |
| `ck new`       | Create new project from template |
| `ck init`      | Initialize/update project        |
| `ck config`    | Web dashboard (React UI)         |
| `ck projects`  | Projects registry management     |
| `ck setup`     | Setup ClaudeKit                  |
| `ck skills`    | Manage skills                    |
| `ck agents`    | Manage agents                    |
| `ck commands`  | Manage commands                  |
| `ck migrate`   | Migrate skills structure         |
| `ck doctor`    | Full health check                |
| `ck versions`  | List available versions          |
| `ck update`    | Update CLI                       |
| `ck uninstall` | Remove installation              |
| `ck watch`     | GitHub issue monitoring daemon   |
| `ck content`   | Automated content generation     |

### 2. Web Dashboard

```bash
ck config              # Local only (127.0.0.1)
ck config --host 0.0.0.0 --no-open  # LAN access
```

Interactive React UI cho configuration và project management.

### 3. Hook Diagnostics Dashboard

Inspect recent Claude hook activity và failures từ `ck config` across global và project scopes.

### 4. Projects Registry

Centralized registry tại `~/.claudekit/projects.json` với file locking.

### 5. Multi-Tier Authentication

```
1. GitHub CLI (gh auth token)
2. Environment Variables (GITHUB_TOKEN)
3. Config File (~/.claudekit/config.json)
4. OS Keychain (secure storage)
5. User Prompt (with save option)
```

### 6. GitHub Issue Watcher (`ck watch`)

Autonomous daemon monitor GitHub issues, analyze với Claude, generate plans, và create PRs.

Features: issue lifecycle management (10 statuses), Claude-powered brainstorming/planning, automatic PR creation, rate limiting, multi-repo support.

### 7. Content Generation (`ck content`)

Scans git activity, generates social media content với Claude, publishes to X/Twitter và Facebook.

11-phase pipeline: scan -> filter -> classify -> context -> create -> validate -> review -> photo -> publish -> engage -> analyze.

### 8. Doctor Command

```bash
ck doctor              # Full health check
ck doctor --verbose    # Verbose mode
ck doctor --report     # Shareable diagnostic report
ck doctor --fix        # Auto-fix issues
ck doctor --check-only # CI mode
ck doctor --json       # Machine-readable output
```

Health checks: System, ClaudeKit, Auth, Project, Modules.

### 9. Skills Migration

Auto-detect structure changes (flat -> categorized):

- SHA-256 hash comparison cho customization detection
- Backup before migration, rollback on failure

## Available Kits

| Kit       | Description                         |
| --------- | ----------------------------------- |
| engineer  | Engineering toolkit (v1.0.0+)       |
| marketing | Content automation toolkit (v1.0.0) |

## Configuration

```json
// ~/.claudekit/config.json
{
  "github": {
    "token": "stored_in_keychain"
  },
  "defaults": {
    "kit": "engineer",
    "dir": "."
  }
}
```

## Architecture Highlights

- **Modular**: 122 focused modules (< 100 lines each)
- **Facade pattern**: Mỗi domain expose public API
- **Phase handlers**: Complex commands use orchestrator + phase handlers
- **Self-documenting**: kebab-case file names

## Tech Stack

| Component           | Technology |
| ------------------- | ---------- |
| Language            | TypeScript |
| Development Runtime | Bun        |
| Published Runtime   | Node.js    |
| Web Dashboard       | React      |
| Testing             | Bun test   |

## Ưu điểm

| Ưu điểm            | Mô tả                                   |
| ------------------ | --------------------------------------- |
| Web dashboard      | Visual configuration management         |
| Hook diagnostics   | Debug hook issues easily                |
| Multi-tier auth    | Flexible authentication                 |
| Skills migration   | Auto-detect và preserve customizations  |
| Doctor command     | Comprehensive health check với auto-fix |
| GitHub watcher     | Autonomous issue management             |
| Content generation | Automated social media pipeline         |
| Cross-platform     | macOS, Linux, Windows                   |

## Nhược điểm

| Nhược điểm          | Mô tả                            |
| ------------------- | -------------------------------- |
| Commercial product  | Cần purchase kit từ ClaudeKit.cc |
| Private repo access | Cần GitHub PAT cho download      |
| Bun dependency      | Bun needed cho development       |
| Smaller community   | 95 stars                         |
| Limited free tier   | Chỉ có starter kit miễn phí      |

## Sử dụng khi nào

- **ClaudeKit users**: Quản lý ClaudeKit projects qua CLI/dashboard
- **Project scaffolding**: Cần new project templates
- **Hook debugging**: Cần visual hook diagnostics
- **GitHub automation**: Cần autonomous issue/PR management
- **Content generation**: Cần automated social media pipeline

---

**Tài liệu tham khảo**:

- [mrgoonie/claudekit-cli](https://github.com/mrgoonie/claudekit-cli)
- [npm: claudekit-cli](https://www.npmjs.com/package/claudekit-cli)
- [ClaudeKit.cc](https://claudekit.cc)
