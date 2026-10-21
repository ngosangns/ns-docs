---
area: technology
domain: frontend
type: tool
title: OrganUI
description: OrganUI (organui/organui, MIT) is a shadcn-compatible registry of editable React components for healthcare and life sciences. It has 42 three.js organ models, a molecule viewer, a DNA helix, an ECG trace, a dermatome map, a CT/MRI slice viewer and more, with explicit "not for clinical use" disclaimers. Weeks old, v0.4.0.
timestamp: "2026-10-22T00:00:00.000Z"
tags:
  - technology
  - frontend
  - react
  - shadcn
  - healthcare
  - threejs
resource: https://github.com/organui/organui
---

# OrganUI

[OrganUI](https://github.com/organui/organui) ([organui.com](https://organui.com)) is a component registry in the style of [shadcn/ui](https://ui.shadcn.com): you install source files into your project with the shadcn CLI and own them afterwards. Its subject is medicine and biology: anatomy, imaging, molecules, clinical widgets. Checked 2026-10-22 against the README, `docs/architecture.md`, `AGENTS.md`, `SECURITY.md`, `THIRD_PARTY_NOTICES.md`, `registry.json`, the `packages/` layout and the GitHub API. The default branch is `master`. I did not install any item, open the site, or run the viewers.

|                |                                                                                                                  |
| -------------- | ---------------------------------------------------------------------------------------------------------------- |
| Author         | `yamz8` (56 of the commits; no other human contributor listed above 2)                                           |
| License        | MIT for the code. Third-party models keep their own licenses (below)                                             |
| Created        | 2026-09-22                                                                                                       |
| Latest release | v0.4.0 (2026-10-21); v0.3.0 on 2026-10-19 and v0.2.0 on 2026-10-19                                               |
| GitHub         | 72 stars, 5 forks, 5 open issues                                                                                 |
| Requirements   | React 19, Tailwind CSS 4, a shadcn project using one of the Base UI styles (not Radix). `three` for the 3D items |

## What is in the registry

| Group                             | Items                                                                                                                                         | Notes                                                                                                 |
| --------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| Clinical widgets (`registry:ui`)  | `anatomy-tree`, `body-map`, `vital-signs`, `lab-results`, `ecg-trace`, `medication-schedule`, `dermatome-map`, `image-viewer`, `growth-chart` | SVG or canvas, built on shadcn primitives                                                             |
| 3D anatomy (`registry:component`) | `organ-viewer` plus 42 organs (`heart`, `brain`, `spinal-cord`, `nerves`, ...) and `cell`                                                     | A shared three.js viewer. Each organ is a thin item that depends on `organ-viewer`                    |
| Molecular                         | `molecule-viewer`, `dna-helix`                                                                                                                | The viewer parses PDB and mmCIF itself; the helix is drawn from a sequence                            |
| Blocks                            | `explorer-01`, `explorer-02`, `explorer-03`                                                                                                   | Whole layouts: viewer plus anatomy panel, tree sidebar with hide/isolate, one viewer switching organs |

Install, from the README:

```sh
bunx shadcn@4.22.1 add @organui/heart
bunx shadcn@4.22.1 add https://organui.com/r/molecule-viewer.json
bunx shadcn@4.22.1 add organui/organui/anatomy-tree     # straight from the GitHub repo
```

`@organui` is in shadcn's registry directory, so no `components.json` entry is needed for the first form. Icons are `IconPlaceholder` calls, which the CLI swaps for the project's own icon library, so no icon package is imposed.

## Design points worth knowing

- **Source distribution, not an npm runtime.** `architecture.md` says future versioned runtime packages should only appear if a shared, stable contract is justified. A fix reaches you only when you re-run `shadcn add` for that item (`SECURITY.md`).
- **Organ models are not in the repo.** Most organ `src` URLs point to jsDelivr, pinned to a full commit of a separate "explorer" repository. The sources named are BodyParts3D (CC BY-SA 2.1 JP or CC BY 4.0), Z-Anatomy (CC BY-SA 4.0), HuBMAP (CC BY 4.0) and a CC0 skin model. Organs with no source there, starting with `nerves`, are built in-repo and served as GLB from organui.com. The GLB loads at runtime from those hosts and keeps its own license, and the viewer shows the credit by default. If you ship a product, check the share-alike terms of CC BY-SA models yourself, and consider self-hosting the files instead of relying on a third-party CDN.
- **Explicit non-clinical scope.** The README says `ecg-trace` is "not for diagnostic use" (its wave detector is a heuristic labelling aid for clean rhythms), `dermatome-map` is "a simplified illustration, and not a clinical tool", and `image-viewer` is "not a medical device". Its DICOM reader handles only uncompressed single-frame grayscale files.
- **No bundled WHO data.** `growth-chart` takes reference tables as input. It ships no growth data because WHO's standards need WHO's permission for commercial reuse. A parser helper reads tables in WHO's anthro layout that you supply.
- **Accessibility.** The tree uses a roving tab stop, separate `aria-selected` and `aria-checked`, and accessible names that start with the visible state text (WCAG 2.5.3 "label in name"). The docs say keyboard checks are automated in real consumer apps, but "a screen-reader usability audit is still outside the verified scope".
- **Scale limits.** The anatomy tree is for small and medium in-memory datasets: no virtualization, lazy loading, multi-select or drag and drop.
- **Tooling.** Bun monorepo with Turborepo, a Next.js 16 docs site, and a Playwright suite against installed consumer apps. `AGENTS.md` tells coding agents to leave browser tests to CI because WebGL in software rendering makes a laptop unusable.

## Caveats

- Weeks old, a single main author, 0.x versions, and releases every day or two. Expect breaking changes and re-installs.
- Items work only with Base UI shadcn styles. A project on the Radix style needs migration first.
- Third-party model licenses and the runtime CDN fetch are the biggest practical issues for a product team.
- The architecture doc is detailed, but I did not check its claims by running tests. Rendering quality and performance of the 42 organ models are unverified here.
- Medical content is simplified illustration. Do not use it for diagnosis or clinical decision-making.
