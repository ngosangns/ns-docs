# ngosangns Knowledge Base

A personal knowledge base organized as an **Open Knowledge Format (OKF) v0.1 Knowledge Bundle**. Each non-reserved markdown file is a **Concept** (YAML frontmatter + body, with a required `type`); every directory has an `index.md` for navigation; the bundle root keeps a `log.md` change history; and internal cross-links use bundle-relative form (`/Concept_Id`).

## Layout

| Path                                                       | Purpose                                                                                                                                                                                                             |
| ---------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `English/`, `Life/`, `Technology/`, `Travel/`, `inbox/`, … | Concept directories (knowledge content).                                                                                                                                                                            |
| `Attachments/`                                             | Binary resources (images, PDFs) referenced by Concepts.                                                                                                                                                             |
| `index.md` (per directory)                                 | Generated navigation; the root `index.md` declares `okf_version: "0.1"`.                                                                                                                                            |
| `log.md`                                                   | Newest-first change history at the bundle root.                                                                                                                                                                     |
| `scripts/`                                                 | Node.js tooling — see [`scripts/README.md`](scripts/README.md).                                                                                                                                                     |
| `scripts/okf-core/`                                        | Shared core library (parse, traverse, resolve links, index).                                                                                                                                                        |
| `web/`                                                     | Custom SolidJS static site generator that publishes the vault (folder explorer, full-text search, backlinks, tags). Builds via `scripts/okf-core` directly, so link resolution stays consistent with `links:check`. |
| `.kiro/specs/okf-redesign/`                                | Requirements, design and tasks for the OKF redesign.                                                                                                                                                                |

## Quick start

```bash
npm install        # install js-yaml + dev deps (fast-check)
npm test           # run the test suite (unit + property + integration)
```

## Common tasks

```bash
# Verify the bundle conforms to OKF v0.1 (non-zero exit on errors)
node scripts/okf-conformance.js --json     # npm run conformance:check

# Preview a migration without writing, then apply with a backup
node scripts/okf-migrate.js --dry-run --report-broken
node scripts/okf-migrate.js --apply --backup

# Enrich recommended metadata (description/tags/resource) + attachment links
node scripts/okf-enrich.js --dry-run
node scripts/okf-enrich.js --apply

# Generate per-directory index.md files (preview, then write)
node scripts/okf-index.js --dry-run
node scripts/okf-index.js --apply          # npm run index:generate -- --apply

# Record a change in log.md
node scripts/okf-log.js add --kind=Update --message="…"

# Maintenance
npm run links:check        # report unresolved links (warnings, exits 0)
npm run frontmatter:validate
npm run stats
npm run tags:stats
npm run notes:orphaned

# Web (SolidJS site, web/)
npm run web:setup          # one-time: install the site's build dependencies
npm run web:build          # build static site into web/dist
npm run web:serve          # serve locally, live-reload on note edits
npm run web:deploy         # deploy web/dist to Cloudflare Pages
```

## Conventions

- Every Concept needs a non-empty `type`. Recommended fields: `title`, `description`, `resource`, `tags`, `timestamp`.
- Unknown frontmatter keys are preserved by all tooling.
- Migration is non-destructive and idempotent; destructive actions require an explicit `--apply`, and `--backup` snapshots before writing.
- Broken links are tolerated as warnings, never hard failures.

See [`scripts/README.md`](scripts/README.md) for the full tooling reference and the `okf-core` API, and [`.kiro/specs/okf-redesign/`](.kiro/specs/okf-redesign/) for the design rationale.
