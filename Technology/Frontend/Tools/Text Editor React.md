---
area: technology
domain: frontend
type: tool
title: Text Editor React
description: Text Editor React (HuyPhan1232203/Text-editor-react, MIT, Phan Nhật Huy) is a Word-like TipTap 3 editor built with React 19 - real A4 pages from a published pagination extension, tables split across pages, comments, Yjs-over-WebRTC sharing with the key in the URL fragment, and PDF export through the print dialog or a Puppeteer backend.
timestamp: "2026-10-25T00:00:00.000Z"
tags:
  - technology
  - frontend
  - react
  - tiptap
  - prosemirror
  - yjs
resource: https://github.com/HuyPhan1232203/Text-editor-react
---

# Text Editor React

[Text Editor React](https://github.com/HuyPhan1232203/Text-editor-react) ([live demo](https://text-editor-react-neon.vercel.app/)) is a browser editor that tries to behave like Word or Google Docs: A4 sheets with real page breaks, a toolbar of document formatting, comments in the margin, link-based real-time collaboration, and PDF export. It is also the home of [`tiptap-a4-pagination`](https://www.npmjs.com/package/tiptap-a4-pagination), the pagination engine published as a separate MIT package. Checked 2026-10-25 on `main` (commit `c2b4e44`) and on npm.

|              |                                                                                                                       |
| ------------ | --------------------------------------------------------------------------------------------------------------------- |
| Author       | Phan Nhật Huy; MIT © Phan Nhật Huy, single contributor (90 commits)                                                   |
| Created      | 2025-12-25; last push 2026-10-24; app version 0.3.3                                                                   |
| GitHub       | 51 stars, 7 forks, 0 open issues; topics: collaboration, emoji, pagination, reactjs, table, text-editor               |
| npm          | `tiptap-a4-pagination` **0.2.0** first published 2026-10-22, ~279 downloads/week (16–22 Oct 2026)                     |
| Stack        | React 19.2, TypeScript 5.9, TipTap 3.13/3.14, Yjs + y-webrtc + y-indexeddb, Radix UI, Tailwind CSS 4, Rolldown Vite 7 |
| Requirements | Node.js 20+, pnpm 10 or 11                                                                                            |
| CI           | GitHub Actions: install, `pnpm lint`, `pnpm test` (Vitest), `pnpm build`, then builds the pagination package          |

## What it is

An app, not a component library: there is no `<Editor>` to install. The reusable part is the pagination extension; everything else is a reference implementation of a document editor, from the toolbar and slash menu to comments and sharing. The feature surface is wide:

- **Page layout**: A4 sheets, portrait or landscape, margins in mm, 50–200% zoom or fit-to-width, thumbnails and a heading outline in the sidebar.
- **Writing**: slash menu, Google Docs-style toolbar, find and replace with match case and one-step replace-all, images with drag-resize and text wrap, tables with merges and cell styling, checklists, KaTeX math, code blocks with highlighting, emoji as text, smart typography, block drag handle, word count.
- **Comments**: select text, `Ctrl/Cmd+Alt+M`, cards in the margin next to the anchored text, replies, resolve, delete (undoable).
- **Sharing**: one click creates a room and copies a link; peers edit together with named cursors and presence.
- **In and out**: paste from Google Docs, open `.docx` via mammoth, print-based PDF export or one-click export through a separate Puppeteer service, autosave to IndexedDB.
- **UI**: English and Vietnamese strings, switchable in the status bar.

## How the pagination works

This is the part worth reading the source for. Page breaks are **ProseMirror decorations**, not document nodes, so `getHTML()` and `getJSON()` stay clean and the content model never sees a page.

1. **Measure.** After each layout change, top-level blocks are measured from the DOM: height, margins, whether the block floats, and for tables the offset of the first row, the height of each row group and the column count. Every measurement is divided by the element's on-screen scale, so a zoomed page (CSS `transform: scale()`) produces the same breaks at 50% and 200%.
2. **Compute.** [`computeBreaks`](https://github.com/HuyPhan1232203/Text-editor-react/blob/main/packages/tiptap-a4-pagination/src/layout.ts) is a pure function over those numbers — no DOM access, and it has its own unit tests. It walks the blocks with a `pageEnd` cursor and inserts a break before the first block that crosses the bottom of the current page, sizing the spacer so the next block starts exactly at the top of the next page.
3. **Split tables.** A table is not pushed to the next page as a whole unless its first row group does not fit. Instead the break goes **between row groups**, never inside rows joined by a `rowspan`, and the spacer is a `<tr>` that bleeds across the full sheet. A static copy of the header row (with measured cell widths) is repeated after each break.
4. **Render.** Each break becomes a widget decoration of the right height, with the gray gap drawn at the page edge. Decorations are mapped through every transaction, so editing above a break keeps the breaks in place.
5. **Re-run.** A `ResizeObserver` on the editor plus `requestAnimationFrame` re-measures on doc changes and on height changes (images and fonts loading). `editor.storage.pagination.pageCount` exposes the count for the surrounding page element's `minHeight`.

```tsx
const layout = createPageLayout({ size: "A4", marginTop: 25.4, marginBottom: 25.4 }) // mm

const editor = useEditor({
  extensions: [StarterKit, Pagination.configure({ pageSelector: ".page" })]
})
useEffect(() => editor?.commands.setPageLayout(layout), [editor])
```

**Where it stops.** A single block taller than a page simply overflows — splitting one long paragraph across pages is still on the roadmap. And every change re-measures and re-lays out the whole document; incremental pagination from the first changed block is also on the roadmap. Both are acceptable for documents of a few dozen pages, not for a 300-page book.

## Sharing without a server

Collaboration is Yjs plus two providers: `y-indexeddb` for local persistence and `y-webrtc` for peer-to-peer sync. **Share** copies the current document into a new room's IndexedDB store, then navigates to `/?room=<10 chars>#key=<24 chars>`.

- **The link is the permission.** No accounts. The room key lives in the URL fragment, which browsers never send to a server, and it is passed to y-webrtc as the room password, so peers without it cannot complete the handshake. The document itself never goes through the signaling server — only encrypted connection offers do, and the media/data channel is WebRTC's own DTLS.
- **No server holds the document.** If you open a shared link while nobody else is online, you get your own last copy of that room from IndexedDB, or an empty document on a first visit. The current version arrives when another member connects.
- **Signaling is a separate concern.** By default peers meet through the public `wss://y-webrtc-eu.fly.dev`, a free community service with no uptime guarantee. The repo ships [`signaling/`](https://github.com/HuyPhan1232203/Text-editor-react/tree/main/signaling), a 113-line Node server speaking the y-webrtc protocol (room topics, 30-second ping timeout, `GET /` returns `okay`), and the app reads `VITE_SIGNALING_URLS` at build time.
- **No TURN.** Two peers behind symmetric NAT or an aggressive corporate firewall may never connect; the README points at the provider's `peerOpts` for TURN.
- **No revocation or at-rest encryption.** Anyone with the full link can edit forever, and each browser stores its copy unencrypted in IndexedDB. For permissions, always-on persistence or many users, the README suggests swapping y-webrtc for Hocuspocus or y-websocket; the Yjs + TipTap collaboration layer stays the same.

Comments are stored in the same Yjs document, in two maps: `comments` for threads and `commentMessages` for messages, kept apart so two simultaneous replies both survive. The anchored text is a mark from a custom comment extension.

## Import and export

- **Google Docs paste** keeps headings, lists, checklists, tables and indents through a custom paste handler (with tests).
- **`.docx` import** loads mammoth on demand, converts to HTML with a style map for underline, strike, title, subtitle and quote, then clears the previous document's header and footer inside the same undo step.
- **PDF, default path**: clone the rendered DOM, turn every break spacer into `break-before: page` on the block that follows it, drop editor-only elements (caret widgets, resize handles, spacers, gap cursor), inline the computed styles, repeat table headers, and print a hidden iframe. The printed breaks are then the browser's own, while KaTeX output survives because the clone comes from the rendered DOM.
- **PDF, optional backend**: [`PDF-export-Puppeteer`](https://github.com/HuyPhan1232203/PDF-export-Puppeteer) under Docker, pointed at by `VITE_PDF_API_URL`.
- **DOCX export** does not exist yet; it is first on the roadmap.

## The published extension

`tiptap-a4-pagination` is TipTap 3 only (`@tiptap/core` and `@tiptap/pm` as peer dependencies), MIT, with `Pagination`, `createPageLayout`, the exported pure `computeBreaks`, `elementScale`, and one CSS file. It handles A4, A5, Letter and Legal at any orientation; the app itself only exposes orientation and margins. The package README claims ~5 KB and no dependencies beyond TipTap; the package source is 744 lines of TypeScript including its tests.

## Things to know before adopting

- **Young and single-author.** The extension is at 0.2.0 and was published on 2026-10-22; the app is 0.3.3. One contributor, and the author also offers paid custom editor work — good for support, but there is no plugin ecosystem or long release history to rely on.
- **It is a demo, not a product.** No accounts, no server persistence, no access control beyond the link, no DOCX export.
- **Printing is coupled to the decorations.** The PDF path reads the spacer positions to place `break-before: page`, and re-inserts repeated table headers itself. Change the pagination, the CSS or the print path and the PDF stops matching the screen.
- **Full re-layout per change.** Fine for ordinary documents, and the roadmap already names incremental pagination as the fix.

## Sources

- [HuyPhan1232203/Text-editor-react](https://github.com/HuyPhan1232203/Text-editor-react) — README, `package.json`, `packages/tiptap-a4-pagination/src/{layout,pagination}.ts`, `src/lib/{share,comments}.ts`, `src/utils/{printPDF,exportPDF,importDocx}.ts`, `signaling/server.js`, `.github/workflows/ci.yml`.
- [tiptap-a4-pagination on npm](https://www.npmjs.com/package/tiptap-a4-pagination), [live demo](https://text-editor-react-neon.vercel.app/), [author's pagination article on dev.to](https://dev.to/huy_phan_173c933272803418/how-i-built-word-style-a4-pages-for-tiptap-without-touching-the-document-778).
- Not verified: the ~5 KB package size (not built here) and the demo's behaviour in a browser (only the HTTP 200).

> **See also:** [React Next](/Technology/Frontend/Tools/React Next) · [Frontend Overview](/Technology/Frontend/Resources/Frontend Overview) · [TanStack Hotkeys](/Technology/Frontend/Tools/TanStack Hotkeys)
