---
area: technology
domain: diagrams
type: tool
title: Pele
description: Pele (obsidianmd/pele, MIT, by kepano) renders Mermaid diagrams to SVG with a small synchronous TypeScript library that has no runtime dependencies and themes through CSS variables. It targets Mermaid 12.1.0 syntax with its own layout and look. Weeks old, 1.8.0.
timestamp: "2026-10-22T00:00:00.000Z"
tags:
  - technology
  - diagrams
  - mermaid
  - svg
  - typescript
  - obsidian
resource: https://github.com/obsidianmd/pele
---

# Pele

[Pele](https://github.com/obsidianmd/pele) ([pele.run](https://pele.run)) turns [Mermaid](https://mermaid.js.org) text into SVG. It is a replacement renderer, not a wrapper: the parsers, layout and drawing are its own. The repo's `AGENTS.md` says it exists to render Mermaid for Obsidian. Checked 2026-10-22 against the README, `package.json`, `SECURITY.md`, `CONTRIBUTING.md`, `AGENTS.md`, the `src/diagrams` tree and the GitHub API. I did not install it, run the benchmarks, or compare its output with Mermaid.js.

|                |                                                                                                        |
| -------------- | ------------------------------------------------------------------------------------------------------ |
| Author         | `kepano` (Steph Ango, Obsidian). He has 236 commits; the next contributors have 3 or fewer             |
| License        | MIT. The specs in `tests/compat` and their grammar files come from Mermaid, also MIT                   |
| Created        | 2026-10-05                                                                                             |
| Latest release | 1.8.0 (2026-10-20); 1.7.0 on 2026-10-19 and 1.6.0 on 2026-10-17, so releases come every day or two     |
| GitHub         | 2,862 stars, 83 forks, 31 open issues                                                                  |
| Requirements   | Node 20+ to use the npm package. Node 22+ for `bench:mermaid`. The docs site needs Node 24 and pnpm 12 |

## What it does

- Synchronous `render(text)` returns `{ svg }`. It needs no DOM, and identical input plus the same text measurer gives identical SVG (stated in `AGENTS.md`).
- `mount(element, text)` is the browser helper. It renders into an element, reads fonts from CSS, and adapts the layout to the container width.
- Zero runtime dependencies. Dev and website dependencies are allowed.
- Theming is plain CSS variables (`--pele-bg`, `--pele-fg`, `--pele-accent`, `--pele-font`, `--pele-radius`, and `--pele-series-1` to `-8` for charts). Colors follow theme changes without re-rendering.
- The main entry includes every diagram type. `pele/core` with `register()` and `pele/diagrams/<type>` imports individual types, and `pele/lazy` offers `renderAsync()` that loads types on demand. A `pele.global.js` build is on jsDelivr for script-tag use.
- `src/diagrams/` has about 33 type folders, including the usual ones (flowchart, sequence, class, state, ER, Gantt, pie, mindmap, git graph, timeline, sankey, xychart) and newer or less common ones such as architecture, block, C4, kanban, packet, radar, treemap, venn, wardley, ishikawa, swimlane and railroad. I did not check this list against Mermaid 12.1.0's own list of types.

```ts
import { render } from "pele"

const { svg } = render(`flowchart LR
  A[Mermaid text] --> B[SVG]`)
```

## Compatibility with Mermaid

The README says Pele targets Mermaid 12.1.0 syntax "with its own layout and visual style". So SVG output will not match Mermaid.js pixel for pixel. Parsers are tested against ported Mermaid parser specs (`tests/compat/<type>/`, with skipped cases recorded in `SKIPPED.md` beside them) and with differential fuzzing. The tests compare accepted syntax and parsed data, not rendered output. I did not read the skip lists, so I cannot say how much of Mermaid's syntax is left out.

## Security

`SECURITY.md` and the README say Pele escapes diagram text, filters links and styles, and limits source and output size. For untrusted diagrams the docs advise:

- Show error messages with `textContent`, because they can contain diagram text.
- Supply icons only from a set you trust, since icon markup is inserted without filtering.
- Treat internal links as note names, since their values are not filtered as URLs.
- Keep `options` and `options.config` under your control, and pass `links: false` and `images: false` to stop network requests from images.
- Pass a `sanitize` function to `mount()` to use your own SVG sanitizer.
- For a time limit, render in a worker you can terminate. Rendering itself has no timeout.

Vulnerabilities are reported privately through GitHub security advisories.

## Speed and size claims

The repo name, the description ("faster than you'd run from a volcano") and the `bench` scripts imply a speed and bundle-size advantage over Mermaid.js. `npm run bench:mermaid` times both in headless Chrome and compares bundle sizes, but the README states no numbers and I did not run it. Treat "faster and smaller" as the author's claim until you measure on your own diagrams.

## Caveats

- Weeks old and very fast-moving, with a single main author. Pin the version.
- Contribution policy (`CONTRIBUTING.md`): AI use is "neither encouraged nor prohibited", but PRs must be human-tested and reviewed, and low-effort AI submissions get closed.
- The GitHub API reports the license as NOASSERTION, but `package.json` and the `LICENSE` text both say MIT.
- Not checked: output quality on large or edge-case diagrams, accessibility of the SVG, the playground, and Obsidian's own integration.

## Ondine

[Ondine](/Technology/Tools And Utilities/Tools/Ondine) (`wevm/ondine`) also turns Mermaid text into SVG. Checked 2026-10-23 against Ondine's `LICENSE`, `diagrams.rs`, docs, `pnpm-workspace.yaml`, `test/vectors/README.md`, this README, and the Pele and Ondine GitHub APIs. Ondine's `LICENSE` on `main` says portions are ported from Pele under MIT, copyright 2026 kepano. That notice is not in the `LICENSE` inside the npm `ondine@0.0.3` tarball. Pele's README describes a synchronous TypeScript `render` with no runtime dependencies and `--pele-*` variables, targeting Mermaid 12.1.0 with its own layout. Ondine's docs describe a Rust compiler that emits SVG ahead of time, then a small mount runtime and `--ondine-*` variables. Ondine's benchmark page and pnpm catalog pin Pele 1.6.0 and Mermaid 12.1.0. Pele's latest GitHub release on this date is 1.8.0 (2026-10-20). Ondine's test vectors README says the vectors were copied from Pele at `458322a` (2026-10-17). I did not compare the SVG.

See also [Diagram Tools](/Technology/Tools And Utilities/Tools/Diagram Tools).
