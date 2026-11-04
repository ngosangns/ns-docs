---
area: technology
domain: programming-languages
type: tool
title: ESLint Config Inspector
description: "ESLint Config Inspector (eslint/config-inspector, Apache-2.0, npm @eslint/config-inspector 3.5.0) is a local page that shows an ESLint flat config. Checked 4 November 2026 on main 03bc97da, a README sponsor edit after the 16 September 2026 release. The README starts it with pnpx at http://localhost:7777. src/cli.ts defaults the host to 127.0.0.1, the port to 7777, and opens a browser. Peer ESLint is ^8.50.0 or ^9.0.0 or ^10.0.0. This check did not run the inspector."
timestamp: "2026-11-04T00:00:00.000Z"
tags:
  - technology
  - programming-languages
  - javascript
  - eslint
  - tooling
resource: https://github.com/eslint/config-inspector
sources:
  - id: github
    resource: https://github.com/eslint/config-inspector
    author: human:eslint
  - id: npm
    resource: https://www.npmjs.com/package/@eslint/config-inspector
  - id: cli
    resource: https://github.com/eslint/config-inspector/blob/main/src/cli.ts
---

# ESLint Config Inspector

[ESLint Config Inspector](https://github.com/eslint/config-inspector) is a visual tool for an ESLint flat config. The README says you run it from a project that has `eslint.config.js`, then open a local page and read the resolved config. Checked 4 November 2026 on `main` at `03bc97da7f2241b2b31f39cf504fcf8432767bc4`. This note did not clone the repo, did not install the package, and did not start the server.

## Who publishes it

The GitHub API the same day reported the ESLint organization, not a fork, created 29 March 2024, pushed 4 November 2026 at 08:13 UTC, default branch `main`, language TypeScript, 1392 stars, 61 forks, 13 open issues, and 6 subscribers. The description is "A visual tool for inspecting and understanding your ESLint flat configs." Topics are devframe, devtools, eslint, eslint-flat-config, and visual-inspector. The homepage field is the npm page for `@eslint/config-inspector`. License SPDX is `Apache-2.0`.

`HEAD` is "docs: Update README sponsors", authored by GitHub Actions Bot on 4 November 2026 at 08:13 UTC. The commit API lists one file, `README.md`. `package.json` on that commit is still version `3.5.0`.

GitHub release `v3.5.0` was published 16 September 2026. npm `latest` is the same version, published 16 September 2026 at 05:25 UTC. The registry created the package on 29 March 2024. Maintainer names on the `3.5.0` document are `openjsfoundation` and `eslintbot`. The unpacked tarball metadata says 51 files and 1776856 bytes.

`LICENSE` on `main` is the Apache License 2.0 text. `package.json` and the npm document both say `Apache-2.0`.

## Where the code lives

The root of `main` includes `app`, `src`, `shared`, `tests`, `bin.mjs`, `package.json`, `nuxt.config.ts`, and `uno.config.ts`. `bin.mjs` is four lines. It imports `./dist/cli.mjs`. The package `bin` field points both `@eslint/config-inspector` and `eslint-config-inspector` at `./bin.mjs`.

The README names the stack. pnpm manages packages. Nuxt and Vue are the app. [devframe](https://devfra.me) is the dev server, the RPC transport, and the static build. UnoCSS does the styling, with attributify mode. ESLint lints and formats. `package.json` scripts match that. `dev` is `nuxt dev`. `build` is `nuxt build && tsdown`. `start` is `node bin.mjs`.

Workspace dependencies in `package.json` use the pnpm `catalog:` protocol. The published `3.5.0` tarball pins `cac` `^7.0.0`, `jiti` `^2.7.0`, `ansis` `^4.4.0`, `chokidar` `^5.0.0`, `devframe` `^1.0.0`, `tinyglobby` `^0.2.17`, and `@devframes/agentic` `^1.0.0`. This check did not open the workspace catalog, so those ranges are the published package, not a diff against `main`.

`engines.node` is `^20.19.0 || ^22.13.0 || >=24`. The peer dependency is `eslint` at `^8.50.0 || ^9.0.0 || ^10.0.0`. The README describes the tool as a viewer for flat configs. It does not say which of those ESLint majors enable flat config.

## How a session starts

The README says to go to the project root and run `pnpx @eslint/config-inspector`, then visit `http://localhost:7777`. It says changes to the config file update automatically. Run `pnpx @eslint/config-inspector --help` for options. Those commands were not run.

`src/cli.ts` on the same commit defines three commands with `cac`. The default command is "Start dev inspector". Its defaults are host `process.env.HOST` or `127.0.0.1`, port `process.env.PORT` or `7777`, `--open` true, `--files` true, and `--stats` false. `--no-open` turns the browser open off. `--config` selects a config file. `--basePath` is the base directory for globs, and the option text says it defaults to the config file's directory when omitted.

`build` writes a static SPA. The default output directory is `dist/__eslint-config-inspector`. `--base` defaults to `/`. `--stats` defaults to false, and the option text says a true value runs stats analysis and includes it in the build. The README says this build is a snapshot of the current ESLint config.

`mcp` is a third command. The source string says it starts an MCP server for coding agents over stdio, and it marks that command experimental. The README usage section read here does not mention `mcp`.

## Gotchas

`--files` defaults to true on both the dev server and the static build. The option text says that includes matched file paths in the payload. A deployed snapshot can therefore contain those paths. This check did not inspect a generated payload.

`--open` defaults to true, so a normal start asks the tool to open a browser. The README prints `localhost`, while the CLI default host is `127.0.0.1`.

`pnpm dev` is the Vue hot-reload loop. The README says the payload fetch fails unless the inspector is already running. The command it gives for the inspector during development is `pnpm cli:dev`.

The peer range includes ESLint 8.50, 9, and 10. This check did not load a config from each major.

## What this check did not do

No clone, no `pnpm install`, no `pnpx`, and no browser session on port 7777 or on the StackBlitz link in the README. The sponsor logos after the license heading were not copied. The workspace catalog was not opened.

## See also

- [JavaScript TypeScript](/Technology/Programming Languages/Tools/JavaScript TypeScript) is the language hub. This note is the flat-config viewer.
