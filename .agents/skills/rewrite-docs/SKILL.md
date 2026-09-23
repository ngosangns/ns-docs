---
name: rewrite-docs
description: Rewrite and restructure a folder of markdown docs in this vault to the vault's English standard — translate Vietnamese content into natural English, normalize frontmatter (area/domain/type/title/description), reorganize files into a kind-based taxonomy with English filenames, regenerate index.md navigation, and update log.md. Use whenever the user asks to rewrite, translate, restructure, clean up, or normalize a docs folder or section (e.g. "rewrite Life/", "translate this folder to English", "restructure Technology/"), or when a folder still has Vietnamese filenames/content, numbered-heading artifacts, or legacy frontmatter that should match the post-Travel-rewrite standard.
---

# Rewrite a docs folder

This vault (an OKF knowledge bundle) was partially converted from Vietnamese notes into English. Commit `529f69f` ("docs(travel): rewrite Travel section in English and restructure") is the canonical example of what "done" looks like — read `git show 529f69f` whenever you need a concrete before/after reference. This skill applies that same treatment to any other folder (`Life/`, `Technology/`, `inbox/`, subfolders, ...).

The goal is not a mechanical translation. It is a re-organization: the old folders grew organically, so files mix several topics, sit in the wrong category, duplicate each other, or are thin stubs. A good rewrite produces a structure where each file has one clear job and each folder groups files by _kind_ of content.

## Workflow

### 1. Survey

- List every `.md` under the target folder (`find <folder> -name "*.md"`).
- Read all of them. Build a content map: which topics each file covers, where content overlaps, where a section is filed in the wrong place, which files are stubs.
- Check `git log --oneline -- <folder>` for recent intent, and look at `log.md` for related past entries.
- Quick mechanical signals worth running on a large folder:
  - Vietnamese content: grep for the diacritics range `[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđĐ]` and count hits per file (a few hits = proper nouns, tens+ = untranslated body). On macOS use ripgrep/node — BSD `grep -P` does not exist.
  - Exact duplicates: `diff` same-named files in sibling dirs — they often differ only in `timestamp`, so diff the body, not the frontmatter.
  - Bodies wrapped in a stray code fence whose info string is a repo path (` ```ngosangns-knowledge-base/... `) — an import artifact to unwrap during rewrite.
  - Legacy frontmatter fields to fold away, e.g. `topic:` (its value is usually the right `domain`).

### 2. Plan the target taxonomy

Classify files by what they actually are, not by where they happen to sit. Travel's resulting taxonomy is a useful vocabulary:

- `Guides/` — how-to knowledge (packing checklist, tent setup, motorbike touring)
- `Destinations/` — place guides, split further by geography (`Vietnam/`, `International/`); a multi-file topic gets its own subfolder (`Northwest Vietnam/`)
- `Trips/` — dated trips, itineraries, event write-ups
- `Resources/` — curated link lists and references

Adapt the names to the folder being rewritten (e.g. `Concepts/`, `Practices/`, `Tools/`, `Write Ups/` already exist elsewhere in the vault — reuse existing taxonomy terms before inventing new ones). Present the plan to the user before doing large moves when the scope is ambiguous.

### 3. Rewrite each file

**Language.** Write natural, idiomatic English — do not translate word-for-word. Keep Vietnamese proper nouns (place names, dish names) and add a short English gloss in parentheses on first mention when it helps a non-Vietnamese reader: `Sống Lưng Khủng Long (Dinosaur Spine)`, `cốm nếp tan`. In link lists, translate the _descriptions_ to English too.

**Filename.** English Title Case with spaces, every word capitalized including conjunctions: `Key Destinations.md`, `Motorbike And Solo Travel.md`, `Tent And Tarp Setup.md`.

**Frontmatter.** Normalize to this shape:

```yaml
---
area: <top-level folder slug> # e.g. travel, life, technology — lowercase
domain: <topic slug> # the actual subject: ha-giang, northwest-vietnam, wardrobe — NOT a restatement of type
type: guide | resource | note | plan | case-study | cheatsheet | tutorial | tool | usecase
title: English Title Case # becomes the link text in generated index.md
description: One real sentence summary # becomes the "- description" in index.md — never just echo the title
timestamp: "YYYY-MM-DDT00:00:00.000Z" # bump to the rewrite date
tags:
  - <area>
  - <domain>
resource: <url> # only on link-list docs pointing at a primary external resource
---
```

Two subtleties the Travel commit fixed:

- `domain` names the _topic_, not the category — `domain: ha-giang`, not `domain: travel-resources`. For Technology-scale folders, the old `topic:` field usually already holds the right value (`llm`, `caching`, `postgres`) — promote it to `domain`, drop `topic`, and drop the generic section tag (`ai-ml`, `system-design`) from `tags`.
- `type` classifies the document's job: `guide` for instructional/field-guide content, `resource` for curated link lists and reference material, `plan` for itineraries/trip plans, `note` for loose notes. Reclassify files whose type doesn't match their content.

YAML gotcha that breaks `frontmatter:validate`: a bare `: ` inside a plain `description:` value (`description: Trade-offs: what to choose`) is a mapping indicator and fails to parse — either reword or quote the whole value (`description: "Trade-offs: what to choose"`).

**Body.**

- `# Title` matching the frontmatter title, then `##`/`###` hierarchy.
- Strip numbered-heading artifacts (`0.3.1.2.` style) — these came from pasted report sources.
- Drop stranded citation numbers left in prose (trailing digits like `...hoang sơ.24`) — they referenced a source list that no longer exists.
- Keep the information dense and factual; the old notes are often already good, they just need English and structure.

**Internal links.** Normalize cross-references to bundle-relative Concept form (`/Concept_Id` — path from vault root, no `.md`, no leading-dot, literal spaces — never `%20`). `scripts/okf-migrate.js --only=links` can do this mechanically. (The site renderer wraps spaced targets in `<>` before remark-parse — `web/src/content/markdown.ts` `wrapSpacedLinkTargets` — since bare-space destinations are not valid CommonMark links.)

**Backlinks.** The site computes backlinks automatically from forward links (`web/src/content/site-graph.ts` → `Backlinks.tsx` rail), so no authored "backlink" markup is needed — the convention is to end each Concept with a `> **See also:** [Title](/Path) · [Title](/Path)` blockquote footer listing the closest related docs (see any `Travel/` file for the shape). Inline prose links are welcome where a related concept is genuinely referenced.

### 4. Restructure — the moves

Apply these operations where the survey shows they're needed:

- **Split** a monolithic multi-topic file into per-topic files under a topic subfolder (e.g. the `Tay Bac` series → `Destinations/Vietnam/Northwest Vietnam/` with 7 files).
- **Distribute** one file's sections across several target files when its parts belong to different topics (`Tay Bac Ghi Chu` → Overview + Ha Giang + Community Notes).
- **Merge** scattered notes about the same topic into the canonical file (`Du Lich` → Hanoi + South Korea).
- **Extract** a section that sits in the wrong file into the file where it belongs (Ha Long food guide out of the company trip file; the Bảo Lộc notes out of Vung Tau into the Saigon–Da Lat routes file).
- **Reclassify** a file into the folder matching its type (an itinerary under `Resources/` moves to `Trips/` or `Planning/`).
- **Dissolve** stub files whose whole content fits better inside a related doc; delete the stub.

Use `git mv` for pure renames so history follows the file.

### 4b. Large folders — delegate the content rewrite

Past ~50 files, translating every file yourself is too slow. The 340-file Technology rewrite (commit `bfc18ca`) used this split and it worked well:

1. **You do the restructure first** — all renames, merges, dedupes, `git mv` — so delegated work lands on final paths. Capture the rename map (`git status --porcelain | grep '^R'`).
2. **Delegate content rewrite per subtree** to a headless CLI subagent (see the `claude-code` skill): one `claude -p --permission-mode acceptEdits` run per subtree, ~10–30 files each, a handful in parallel under an external `timeout`. Each prompt must carry the full standard — frontmatter shape and key order, the `type` vocabulary, numbered-heading/citation stripping, the code-fence unwrap, the link form, the `> **See also:**` footer — plus the explicit file list for that batch. Subagents are stateless; nothing is implied. Forbid: touching `index.md`, running git, renaming/creating/deleting files, editing outside the listed scope.
3. **Shared reference files must live inside the workspace.** A subagent sandbox could not read `/tmp/rename-map.txt` — embed the map in the prompt or drop it in the repo temporarily. Several batches fell back to fixing links by hand against the real tree, which worked but is less reliable.
4. **Read the anomaly reports.** Subagents surfaced real finds (misfiled content, duplicated links, a code-fence artifact set, an unsafe prompt example worth deleting). Spot-check a few rewritten files per batch — a Vietnamese-heavy one and a short one.
5. **Verify mechanically afterwards** (step 7), then fix the handful of leftovers yourself — expect a small residue, not zero.

### 5. Regenerate index.md

Every folder gets a generated `index.md` — `# Sections` for subfolders, `# Concepts` for files, one link per entry with the frontmatter `title` as link text and `description` after a dash. Bullets use `-` (the generator emits `-` to match what prettier leaves behind — `format:md` runs `npx prettier` vault-wide). Never hand-edit these; run:

```bash
npm run index:generate        # dry-run preview (default)
node scripts/generate-index.js --apply   # actually write
```

This is why `title`/`description` quality matters — they are the navigation text.

### 6. Update log.md

Add one `**Update** ...` line under today's `## YYYY-MM-DD` heading summarizing the moves (splits, merges, renames), matching the existing terse style. Mixed Vietnamese/English in log entries is normal here.

### 7. Verify

```bash
npm run conformance:check     # OKF conformance (frontmatter, structure)
npm run links:check           # internal link integrity
npm run frontmatter:validate  # frontmatter field sanity
npm run format:md             # markdown formatting (or format:md:check to preview)
git status                    # review the full move/rename/delete set
```

Fix any dangling links — a moved file leaves every inbound link stale. Note `links:check` only sees links inside files; also re-scan for leftovers the checkers miss: leftover Vietnamese lines beyond proper nouns, unparseable frontmatter (load each block with `js-yaml` — `frontmatter:validate` reports these as `frontmatter-parse` errors), bodies still wrapped in a ` ```ngosangns-knowledge-base ` fence, and remaining numbered headings.

### 8. Commit

Per `AGENTS.md`: commit directly on `main` and push to `origin/main`. Match the observed message style:

```
docs(<area>): rewrite <Section> section in English and restructure
```

## Before / after reference

Old (`Travel/Destinations/Domestic/Tay Bac Diem Den.md`): frontmatter `domain: travel-guide`, `type: resource`, `description` echoing the title; body of `0.3.1.` numbered headings in Vietnamese with citation numbers.

New (`Travel/Destinations/Vietnam/Northwest Vietnam/Key Destinations.md`): `domain: northwest-vietnam`, `type: guide`, descriptive English `description`, clean `##`/`###` English headings, proper nouns glossed, no numbering artifacts.

Run `git show 529f69f` for the full diff — it is the source of truth when a judgment call is unclear. For a large-folder example with delegated batches, see `git show bfc18ca` (Technology rewrite, ~340 files).
