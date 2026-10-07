---
area: technology
domain: utility-tools
type: tool
title: OpenGym
description: openGym (DuarteSantos8/openGym, AGPL-3.0) is a self-hosted workout and body-weight tracker with passkeys, offline sync, and an optional bring-your-own AI coach; its exercise images are third-party and are not under that license.
timestamp: "2026-10-07T00:00:00.000Z"
tags:
  - technology
  - utility-tools
  - self-hosted
  - fitness
  - health
resource: https://github.com/DuarteSantos8/openGym
---

# OpenGym

[openGym](https://github.com/DuarteSantos8/openGym) is a self-hosted gym and body-weight tracker. The site is [opengym.duarte-santos.ch](https://opengym.duarte-santos.ch). The [live demo](https://opengym.duarte-santos.ch/demo/) is the same app with example data. The GitHub account is DuarteSantos8. Checked 2026-10-07: created 2026-07-18, default branch `main`, language JavaScript, 6,405 stars, 855 forks, 172 open issues, last push 2026-10-06.

The repo license is AGPL-3.0 for openGym's own code. Exercise images sit under a different license, in [License](#license). The README says there is no account on someone else's server, no subscription, no ads, and no telemetry. Those four points are README statements.

## What you log

The README's exercise library is 1,324 exercises with animated demos, searchable and filterable by muscle and by the equipment you own. Four starter plans load as ordinary editable routines: Push/Pull/Legs, Upper/Lower, Full Body, and 5×5. A session can use supersets, warm-up sets, drop sets, rest-pause, timed holds, and cardio by time and speed. A custom exercise can carry your own photo, GIF, or short video. The README says location data is stripped on the device before upload.

Progression rules named in the README: linear, Greyskull LP, double progression through a rep range, or adding time. Stats include an estimated 1RM per exercise. v1.3.9 adds Structural Balance ratios (Poliquin, Thibaudeau, ATG). A muscle map has three modes: volume, still recovering, and untrained. There is a body-weight chart against a goal line. Saved workouts can be edited, back-filled from paper, or moved to another date. The README says records are re-read from the corrected history.

Imports named in the README: FitNotes, Strong (CSV), Hevy (CSV or an API key), and Apple Health weight. Export is one JSON file. A plan can be shared as a small file or printed as a PDF. The README says 17 languages, including right-to-left Arabic, and that exercise names and instructions are translated for most of them.

Sign-in defaults to passkeys (Face ID, Touch ID, fingerprint). `PASSWORD_LOGIN` adds name-and-password sign-in and stays off unless you set it. A new device pairs with a one-time code or a QR code. `INVITE_ONLY` and the admin dashboard are optional and off by default. `ALLOW_GUEST` ("Continue without account") defaults to on.

## Install

Docker with Compose. From the README:

```bash
git clone https://github.com/DuarteSantos8/openGym
cd openGym
cp .env.example .env
docker compose pull
docker compose up -d
```

Open http://localhost:8080 and create a profile. `WEB_PORT` defaults to 8080, `RP_ID` to `localhost`, and `ORIGIN` to `http://localhost:8080`. Passkeys from a phone need HTTPS, and `RP_ID` plus `ORIGIN` have to match the URL you open. Guides: [docs/SELF_HOSTING.md](https://github.com/DuarteSantos8/openGym/blob/main/docs/SELF_HOSTING.md), [docs/SELF_HOSTING_HTTPS.md](https://github.com/DuarteSantos8/openGym/blob/main/docs/SELF_HOSTING_HTTPS.md), [docs/SELF_HOSTING_KUBERNETES.md](https://github.com/DuarteSantos8/openGym/blob/main/docs/SELF_HOSTING_KUBERNETES.md), [docs/MOBILE.md](https://github.com/DuarteSantos8/openGym/blob/main/docs/MOBILE.md).

`docker compose pull` uses `registry.gitlab.com/duartesantos8/opengym/api` and `.../web`. The same tags also exist as `ghcr.io/duartesantos8/opengym-api` and `ghcr.io/duartesantos8/opengym-web`. `docker compose up -d --build` builds on the host. The README says the host does not need Node either way. The first start downloads the exercise media once, about 140 MB.

The same codebase builds a Capacitor app that can run with no server, data staying on the phone. Android: a signed APK on each GitHub release. The README says openGym is deliberately not on the Play Store. iPhone: the README says Apple does not allow installs outside the App Store, so the paths it names are a self-hosted PWA added from Safari, or an Xcode build onto your own device.

## Stack and data

| Piece | Role |
| --- | --- |
| `frontend/` | React 19 and Vite (React Router, Zustand), built to static files inside Docker |
| `api/` | Plain `node:http`. The README names two dependencies: `@simplewebauthn/server` and `web-push` |
| `web/` | nginx serves the app and proxies `/api`, so the app is one origin, which passkeys require |
| `frontend/src/lib/` | Training logic as pure functions, with tests beside them |
| `api/openapi.yaml` | HTTP API. A browsable copy is at [opengym.duarte-santos.ch/api.html](https://opengym.duarte-santos.ch/api.html) |

Sync, from the README: each profile is one document with a server revision. The device sends the revision it last saw. If another device wrote in between, the server returns 409 with the current document, and the device merges and retries. A banner shows when the app is offline. Nothing that has not reached the server is discarded on disconnect or sign-out. The v1.3.9 notes describe the bug that sentence closes: after the server refused a sign-in, the app could unpair the phone silently and keep the user on screen.

| File under `./data` | Contents |
| --- | --- |
| `db.json` | Profiles and public passkey data |
| `state-<user>.json` | That user's plan, workouts, body weight, and settings |
| `audit.log` | Admin activity. No IP address unless `AUDIT_IP` is turned on |
| `secret` | Session-cookie signing key |

The README says a backup of `./data` is a backup of everything, and that passkey private keys stay on the device (secure hardware or a password manager). Push keys are generated on first run into `./data/vapid.json`.

## License

openGym's own code is GNU AGPL v3.0 ([LICENSE](https://github.com/DuarteSantos8/openGym/blob/main/LICENSE)). You can self-host, use, modify, and share it. If you run a modified version as a network service, you have to offer that version's source under the same license.

The exercise media is not covered by that license. Metadata and instruction text come from [ExerciseDB v1](https://exercisedb.dev/) through [hasaneyldrm/exercises-dataset](https://github.com/hasaneyldrm/exercises-dataset) under MIT. The images and animations are third-party content under neither MIT nor the AGPL. The README says ownership is disputed: the dataset attributes them to [Gym visual](https://gymvisual.com/), while [ExerciseDB/AscendAPI](https://exercisedb.io/faq) claims to own them. openGym does not redistribute them (the instance downloads them on first start) and does not relicense them. Other third-party notices, including the body-diagram geometry, are in [NOTICE.md](https://github.com/DuarteSantos8/openGym/blob/main/NOTICE.md).

## Optional coach and MCP

Both are off unless you turn them on. The [AI coach](https://github.com/DuarteSantos8/openGym/blob/main/docs/AI_COACH.md) drafts a week of routines and later suggests changes from what you logged. You approve every change. It uses your own provider key: Anthropic, OpenAI, Gemini, or any OpenAI-compatible endpoint, including Ollama. `API_TARGET=coach` builds the API image with the Claude Agent SDK and the Codex CLI. The default is `API_TARGET=default`. `COACH_DISABLED=1` forces the coach off for the instance.

The MCP server in [mcp/README.md](https://github.com/DuarteSantos8/openGym/blob/main/mcp/README.md) is read-only and local, so an assistant such as Claude Desktop can answer questions about training history. It is not part of the Docker build.

The README says the project is developed with [Claude Code](https://claude.com/claude-code) and that the repo carries `CLAUDE.md`. It also says a person decides what is reviewed, merged, and released, that pull requests run the frontend, API, and MCP test suites in CI, and that a default install calls no AI service.

## Current release

The latest GitHub release on 2026-10-07 is [v1.3.9](https://github.com/DuarteSantos8/openGym/releases/tag/v1.3.9), published 2026-09-28, built from `e6c920eb`. The release name covers editing history, two Discord reports, password sign-in, and thirty-nine community pull requests. GitHub mirrors the GitLab release of the same tag. Images `1.3.9`, `1.3`, and `latest` are linux/amd64 and linux/arm64, on both the GitLab registry and GHCR. The Android asset is `openGym-1.3.9.apk`. The release notes call it 16.2 MB and ARM only, and say it is signed with the same certificate as every release since v1.2.7.

Upgrade lines from that release: v1.3.8 data opens as it is. The paired-phone fixes are in the app, not the server, so a phone still on v1.3.8 can still get stuck. "Sign out everywhere" unpairs phones. Each one then shows Pair again and keeps its data.

`main` was pushed on 2026-10-06, after that tag, so the branch can contain commits that are not in v1.3.9.

## Roadmap

The README presents this table as a plan, with a release roughly every two weeks. It is not a list of shipped versions. Full text: [ROADMAP.md](https://github.com/DuarteSantos8/openGym/blob/main/ROADMAP.md).

| Release | Planned | Theme |
| --- | --- | --- |
| v1.3.10 | Oct 2026 | Session queue and rotation |
| v1.3.11 | Nov 2026 | Programmes and phases |
| v1.3.12 and v1.3.13 | Nov to Dec 2026 | Progression engine: AMRAP, %1RM, 5/3/1 |
| v1.3.14 | Dec 2026 | Cardio, exercise alternatives, groups |
| v1.4.0 | Jan 2027 | Database storage, called the one compatibility break |
| v1.4.1 to v1.4.3 | Jan to Feb 2027 | Search, OIDC login, trainer role |
| v1.4.4 to v1.4.7 | Mar to Apr 2027 | iOS app, Health Connect, catalogue, skins |

## Where the code lives

GitHub is the project home. [gitlab.com/DuarteSantos8/opengym](https://gitlab.com/DuarteSantos8/opengym) is a mirror. A GitHub Actions workflow updates it on every push to `main` and every release tag, because that CI builds the signed APK, the multi-arch images, and the SBOMs. The README says nothing is merged on GitLab by hand. In the changelog, `!NN` is a GitLab merge request from August and September 2026, when the project lived there.

Discord: [discord.gg/e62jY6fwVb](https://discord.gg/e62jY6fwVb). Questions that should stay searchable go to [GitHub Discussions](https://github.com/DuarteSantos8/openGym/discussions). The README says login trouble is almost always an `RP_ID` / `ORIGIN` mismatch.
