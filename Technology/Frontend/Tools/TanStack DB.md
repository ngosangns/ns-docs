---
area: technology
domain: frontend
type: tool
title: TanStack DB
description: "TanStack DB (TanStack/db, MIT, npm @tanstack/db 1.0.0-rc.1.3) is a client store that keeps typed collections, live queries, and optimistic mutations in the app process. Checked 4 November 2026 on main 8feab6ea. The README still marks the project beta. docs/overview.md says live queries update through the d2ts differential-dataflow library, and the 0.7 ms figure there was not remeasured."
timestamp: "2026-11-04T00:00:00.000Z"
tags:
  - technology
  - frontend
  - tanstack
  - typescript
  - client-store
resource: https://github.com/TanStack/db
sources:
  - id: github
    resource: https://github.com/TanStack/db
    author: human:TanStack
  - id: npm
    resource: https://www.npmjs.com/package/@tanstack/db
  - id: overview
    resource: https://github.com/TanStack/db/blob/main/docs/overview.md
---

# TanStack DB

[TanStack DB](https://github.com/TanStack/db) is a TypeScript client store from the TanStack organization. Docs live at [tanstack.com/db](https://tanstack.com/db). A collection holds typed objects. A live query reads one collection or joins several. An `insert`, `update`, or `delete` applies in the client first, then the handler writes to the server. Checked 4 November 2026 on `main` at `8feab6ea3eaae4456f738da39fa93508ddd5cc01`. This note did not clone the repo, did not install a package, and did not run the tests.

`docs/overview.md` says the library extends TanStack Query. It is a different repository from TanStack Store, which the README lists as its own project. Optional SQLite packages persist collection rows. They do not turn this library into a database server.

## Who publishes it

The GitHub API the same day reported owner `TanStack`, created 11 March 2025, pushed 4 November 2026 at 05:34 UTC, default branch `main`, language TypeScript, license MIT, 3976 stars, 278 forks, 147 open issues, and 13 subscribers. The public description is "The reactive client store for your API." `HEAD` that morning is `docs: regenerate API documentation (#2351)`, authored by `github-actions[bot]`.

`packages/db/package.json` on that commit names `@tanstack/db`, version `1.0.0-rc.1.3`, author Kyle Mathews, license MIT. The npm `latest` document for `@tanstack/db` is the same version. Its published dependency `@tanstack/db-ivm` is pinned to `1.0.0-rc.1.2`. The workspace file uses `workspace:*` for that dependency. `LICENSE` copyright is 2025 Kyle Mathews. npm maintainers listed on that document are `tannerlinsley`, `alemtuzlak`, and `kevinvandy`.

The README badge and the opening note both say the project is beta, and they point at the 0.1 release post. The published core version is already a 1.0 release candidate. `docs/overview.md` links a guide named Migrating to the 1.0 RC.

GitHub releases are per package. `@tanstack/query-db-collection@1.5.1` was published 3 November 2026 at 03:58 UTC and is not marked a prerelease. `@tanstack/vue-db@1.0.0-rc.1.3` was published the same day at 23:49 UTC and is a prerelease. On the checked commit, `packages/query-db-collection/package.json` is version `1.5.1` and its peer dependency on `@tanstack/db` is `^1.0.0-rc.0`.

## Where the code lives

The `packages` directory on that commit lists 28 folders. `docs/installation.md` says each framework package re-exports the core `@tanstack/db` package.

Framework packages named there are `@tanstack/react-db` for React 18 or newer, `@tanstack/preact-db` for Preact 10 or newer, `@tanstack/solid-db`, `@tanstack/svelte-db`, `@tanstack/vue-db` for Vue 3.3.0 or newer, and `@tanstack/angular-db` for Angular 16 or newer. Vanilla JavaScript installs `@tanstack/db`.

Collection and persistence packages named in that install page include `@tanstack/query-db-collection`, `@tanstack/electric-db-collection`, `@tanstack/trailbase-db-collection`, `@tanstack/powersync-db-collection`, `@tanstack/rxdb-db-collection`, `@tanstack/browser-db-sqlite-persistence`, and `@tanstack/offline-transactions`. LocalStorage, local-only, and IndexedDB collections ship inside `@tanstack/db`. The same `packages` tree also has SQLite wrappers for Capacitor, Cloudflare Durable Objects, Electron, Expo, Node, React Native, and Tauri, plus `db-ivm`, `convex-db-collection`, and test packages. This check did not open each `package.json`.

Core dependencies in `packages/db/package.json` are `@standard-schema/spec` `^1.1.0`, `@tanstack/db-ivm`, and `@tanstack/pacer-lite` `^0.2.1`. TypeScript is a peer at `>=4.7`.

## How a query runs

`docs/overview.md` splits the model into three pieces.

A collection is a typed set of objects. The load path is separate from the component that reads it. Built-in sources in that page are TanStack Query, ElectricSQL, TrailBase, RxDB, PowerSync, IndexedDB, localStorage, and an in-memory local-only collection. A schema, when present, must be a Standard Schema such as Zod, Valibot, ArkType, or Effect. The page says a schema validates input, can transform types, and fills defaults. If a schema is set, the collection does not also take an explicit type parameter.

The same page names three sync modes. Eager is the default and is described as fitting under about 10,000 mostly static rows. On-demand loads what the query asks for and is described as fitting sets over about 50,000 rows. Progressive loads the query subset first and syncs the rest in the background. Those row counts are the guide's advice. This check did not measure them.

A live query reads collections and returns another collection. `useLiveQuery` subscribes while a component is mounted. `useLiveSuspenseQuery` suspends until the first result, and the page says `data` is then defined. `createLiveQueryCollection` builds a query outside a component, and the caller starts and stops it. The page says the engine is [d2ts](https://github.com/electric-sql/d2ts), a TypeScript port of differential dataflow, so a change updates the result incrementally. It also says one row update in a sorted 100,000-item collection completes in about 0.7 ms on an M1 Pro MacBook. That number is the documentation. This check did not run the benchmark.

A mutation calls `onInsert`, `onUpdate`, or `onDelete`. The page says the optimistic overlay sits on top of synced data until the handler resolves. If the handler throws, the overlay rolls back. `createOptimisticAction` and `createTransaction` cover mutations that are not a single insert, update, or delete.

The React sample in that page wraps the tree in `DbProvider` around a `DbClient`. A component reads the collection with `useDbClient().collection(...)`.

## Gotchas

The README still says beta while npm `@tanstack/db` is `1.0.0-rc.1.3`. Package versions do not share one number. `@tanstack/query-db-collection` is `1.5.1` on the same commit.

The published core `1.0.0-rc.1.3` depends on `@tanstack/db-ivm` `1.0.0-rc.1.2`. The workspace file does not pin that number. This check did not diff the two packages.

`docs/overview.md` says React Native does not provide `crypto.randomUUID()`, and the app must import `react-native-random-uuid` at startup. That package was not installed here.

The "sub-millisecond" and "blazing fast" lines in the README and overview are the project's wording. The only concrete timing in the overview is the 0.7 ms example above, and it was not remeasured.

## What this check did not do

No clone, no `npm install`, no test run, and no browser session on tanstack.com/db. Collection adapter source files were not opened. The 28 folder count is the GitHub contents listing for `packages` on `8feab6ea`.
