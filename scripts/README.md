# Knowledge Base Tooling (`scripts/`)

Node.js tooling that treats this vault as an **Open Knowledge Format (OKF) v0.1 Knowledge Bundle**. Every non-reserved markdown file is a **Concept** (frontmatter + body, `type` required); `index.md` files provide per-directory navigation; `log.md` records change history; and internal cross-links are normalized to bundle-relative form (`/Concept_Id`).

All tools share a single core library, **`okf-core/`**, so parsing, traversal, link resolution and indexing behave identically everywhere.

## Requirements

- Node.js (uses the built-in `node:test` runner)
- Dependencies: `js-yaml` (frontmatter), `fast-check` (property-based tests, dev)

Install with `npm install`.

## Concepts and terminology

- **Concept** — a non-reserved `.md` file: `{ id, absPath, relPath, data, body, hadFrontmatter }`.
- **Concept_Id** — bundle-relative path, `/` separators, no `.md`, no leading `/` (e.g. `English/Grammar/Passive Voice`).
- **Reserved_File** — `index.md` or `log.md` (not a Concept).
- **Bundle_Relative_Link** — internal link beginning with `/`, referencing a Concept by id.
- **Diagnostic** — `{ file, level: "error" | "warning", rule, message }`.

---

## `okf-core/` — shared core library

`require("./okf-core")` exposes the full public surface:

| Export | Purpose |
| --- | --- |
| `walkBundle(root)` | Strict walk → `{ root, concepts, indexFiles, logFiles, attachments, index }`. Throws on unparseable YAML. |
| `walkBundleTolerant(root)` | Per-file-tolerant walk → `{ root, concepts, reservedFiles }`; bad files flagged `parseError: true`. |
| `loadBundle(root)` | Convenience: strict walk, falling back to tolerant → `{ concepts, index, degraded }`. |
| `parseConcept(absPath, root)` | Read + parse a single Concept. |
| `parseFrontmatter(raw)` | `{ data, body, hadFrontmatter }`; throws on invalid YAML; preserves unknown keys. |
| `serializeConcept(concept)` | Inverse of parse; round-trips frontmatter + body. |
| `conceptIdOf(absPath, root)` | Derive a Concept_Id (pure, idempotent). |
| `isReservedFile(relPath)` | True for `index.md` / `log.md` (case-insensitive). |
| `conceptKeys` / `addToIndex` / `buildIndex` | Multi-key Concept lookup index used for link resolution. |
| `normalizeLink(raw, sourceId, index)` | Normalize a link to a Bundle_Relative_Link, or `null`. |
| `resolveTarget(raw, sourceId, index)` | Resolve a link to a Concept, or `null`. |
| `toPosix` / `relPathOf` / `isIgnoredPath` / `isMarkdown` | Path helpers. |

Internal modules: `constants.js` (`RESERVED_FILES`, `OKF_KEYS`, `IGNORED_PATHS`, `TYPE_RULES`), `paths.js`, `id.js`, `frontmatter.js`, `walk.js`, `links.js`.

Traversal excludes `IGNORED_PATHS`: `.git`, `node_modules`, `.wrangler`, `web/dist`.

```js
const okf = require("./scripts/okf-core")
const { concepts } = okf.loadBundle(process.cwd())
for (const c of concepts) {
  if (!c.data.type) console.log("Missing type:", c.relPath)
}
```

---

## OKF CLI tools

### `okf-migrate.js` — migrate the vault to OKF

Non-destructive and idempotent. Infers missing `type`, fills recommended fields, and rewrites cross-links to bundle-relative form.

```bash
node scripts/okf-migrate.js [rootDir] [--dry-run] [--apply] \
  [--only=frontmatter|links] [--backup] [--report-broken]
```

- `--dry-run` (default) previews without writing; `--apply` writes changes.
- `--backup` (apply only) snapshots before writing; aborts if the backup fails.
- `--only=frontmatter|links` restricts the change type.
- `--report-broken` lists unresolved links (`sourceId → target`).
- Broken links are tolerated (warnings), never failures. Runs a conformance check on completion.

### `okf-conformance.js` — verify OKF v0.1 conformance

```bash
node scripts/okf-conformance.js [rootDir] [--json] [--strict]
# npm: conformance:check, conformance:strict
```

- Emits Diagnostics. `conformant` is true iff there are no `error`-level diagnostics.
- `--json` prints the full `ConformanceReport`.
- Exit code is non-zero when any `error` exists; `--strict` also fails on warnings.
- Rules: `type-required` (error), `frontmatter-parse` (error), `recommended-field-missing` (warning), `timestamp-format` (warning), `tags-format` (warning), `index-no-frontmatter` (error), `index-root-frontmatter` (error).
- `resource` is treated as **optional** (OKF allows omitting it for abstract concepts), so a missing `resource` does not produce a warning.

### `okf-enrich.js` — fill recommended metadata from content

Complements `okf-migrate`: derives genuine values so the bundle has no recommended-field warnings.

```bash
node scripts/okf-enrich.js [rootDir] [--dry-run] [--apply]
```

- `description` — first meaningful body line (skips frontmatter, code fences, images, generic headings like "Resources"); falls back to the title.
- `tags` — derived from legacy `area`/`domain`/`topic`/`status`/`category` frontmatter plus the top-level directory; never fabricated beyond what the note declares.
- `resource` — the first `http(s)` URL in the body, when present (left absent otherwise).
- Attachment `![[file]]` / `[[file]]` references are rewritten to bundle-relative markdown (`![](/Attachments/…)` for images, `[name](/Attachments/…)` otherwise).

### `okf-index.js` — generate `index.md` navigation

```bash
node scripts/okf-index.js [rootDir] [--dry-run] [--apply]
```

- Root `index.md` carries only `okf_version: "0.1"`; non-root index files have no frontmatter.
- Bullets: `* [Title](relative-url) - description` (description omitted when empty).
- Never overwrites an `index.md` that is hand-authored as a Concept (warns instead).

### `okf-log.js` — maintain `log.md` (newest-first)

```bash
node scripts/okf-log.js add --kind=Update|Creation|Deprecation --message="..." [logPath]
```

- Entries live under `## YYYY-MM-DD` UTC headings, newest first.
- Invalid `--kind` is rejected and the log is left unchanged; writes are atomic with rollback on failure.

---

## Maintenance scripts

All read through `okf-core`, so they share one parse/link model.

| Script | npm alias | Purpose |
| --- | --- | --- |
| `check-links.js` | `links:check`, `links:broken` | Report unresolved internal links as warnings. Always exits 0. `--broken` lists only broken links. |
| `validate-frontmatter.js` | `frontmatter:validate`, `frontmatter:missing` | Delegates to conformance. Missing `type` → error; missing `tags` → warning. `--missing` lists files missing required frontmatter. |
| `generate-index.js` | `index:generate` | Delegates to `okf-index` (dry-run by default; `--apply` to write). |
| `find-orphaned.js` | `notes:orphaned` | List Concepts not linked from anywhere. |
| `stats.js` | `stats` | Counts: concepts, frontmatter, links, tags, size by directory. |
| `tags-stats.js` | `tags:stats`, `tags:list` | Tag frequency and breakdown from frontmatter `tags`. |
| `find-duplicates.js` | `duplicates:find` | Detect duplicate content. |
| `find-unused-attachments.js` | `attachments:unused`, `attachments:clean` | Find (and optionally remove) unreferenced attachments. |
| `check-images.js` | `images:check`, `images:broken` | Validate image references. |
| `backup.js` | `backup` | Snapshot the workspace (used by `okf-migrate --backup`). |
| `export.js` | `export` | Export the vault. |

## Web (Quartz site)

The vault is published with [Quartz](https://quartz.jzhao.xyz), vendored in
`web/quartz/`. Quartz reads the vault root directly (`-d ../..`); infrastructure
folders are excluded via `ignorePatterns` in `web/quartz/quartz.config.yaml`.

| npm alias | Purpose |
| --- | --- |
| `web:setup` | One-time: install Quartz npm deps + community plugins (pinned by `web/quartz/quartz.lock.json`). |
| `web:build` | Build the static site into `web/quartz/public`. |
| `web:serve` | Build, serve locally and rebuild on changes. |
| `web:deploy` | Build and deploy to Cloudflare Pages. |

## Testing

```bash
npm test    # node --test scripts/__tests__/**/*.test.js
```

The suite covers unit tests, integration tests (migrate → conformance), and one property-based test (`fast-check`, ≥100 iterations) per Correctness Property:

1. Type guaranteed after migrate
2. Unknown keys preserved
3. Frontmatter round-trip
4. Migrate idempotency
5. Internal links become bundle-relative
6. Broken links tolerated
7. Reserved files carry no frontmatter (except root `okf_version`)
8. Log headings stay newest-first
9. Conformance implies non-empty `type`

## CI integration

Use conformance as a gate:

```bash
node scripts/okf-conformance.js --json   # non-zero exit on any error
```

`check-links` reports broken links as warnings and always exits 0, so it never blocks CI on its own.
