---
area: technology
domain: javascript
type: tool
title: Tsc Ts
description: tsc-ts (vercel-labs/tsc-ts, npm tsc-ts 0.0.5, Apache-2.0) is a Vercel Labs experiment that ports the TypeScript 7.0.2 compiler (typescript-go / tsgo) back into TypeScript and compiles it to a native executable with scriptc. It takes the same arguments as tsc, adds a stdin/stdout --api server and a tsc-ts/api programmatic API, and claims its scanner, parser, binder, checker, emit, and build modes match tsgo on TypeScript's test corpus.
timestamp: "2026-10-21T00:00:00.000Z"
tags:
  - technology
  - javascript
  - typescript
  - tooling
  - compiler
resource: https://github.com/vercel-labs/tsc-ts
---

# Tsc Ts

[tsc-ts](https://github.com/vercel-labs/tsc-ts) ([tsc-ts.dev](https://tsc-ts.dev)) is a Vercel Labs experiment: the TypeScript 7.0.2 compiler, which Microsoft wrote in Go as [typescript-go](https://github.com/microsoft/typescript-go) (tsgo), ported back into TypeScript and compiled to a native executable with [scriptc](https://scriptc.dev). The repo description is "TypeScript written in TypeScript".

Checked 2026-10-21 against the repo README, `packages/tsc-ts/README.md`, `CHANGELOG.md` for 0.0.5, and the npm registry. Nothing was installed or run.

- **Status:** experimental. npm `tsc-ts` is at **0.0.5** (published 2026-10-20). Releases run `v0.0.1` (2026-10-17) through `v0.0.5` (2026-10-20). The npm package was first published 2026-10-07.
- **Repo:** created 2026-10-07, last push 2026-10-20, 370 stars, 5 forks. Primary language TypeScript. License **Apache-2.0**, with [THIRD_PARTY_NOTICES.md](https://github.com/vercel-labs/tsc-ts/blob/main/THIRD_PARTY_NOTICES.md) covering TypeScript-Go.
- **Upstream pin:** the port tracks tsgo at **7.0.2**. `npm run fetch:upstream` clones that commit. The root `package.json` pins `scriptc` and `@scriptc/threads` at **0.3.6**; the README says the build fails on any other version. The workspace itself typechecks with TypeScript **5.9**.

## What it is

The compiler lives in `packages/tsc-ts/src/compiler`, written as idiomatic TypeScript rather than a line-by-line Go translation. Each stage is compared with tsgo on TypeScript's test corpus (about 12,500 files, 17,000 units after multi-file cases are split). The README's status table says every compared stage matches tsgo:

| Part | Compared with tsgo | README status |
| --- | --- | --- |
| Scanner | tokens, values, errors, rescans, JSDoc | all files match |
| Parser and AST | tree, diagnostics, API source file encoding | all units match |
| Binder | symbols, tables, flow graph, name resolution | all units match |
| Module resolution | results, package IDs, `--traceResolution` | all requests match |
| `tsconfig.json` and programs | `--showConfig`, `--listFilesOnly`, `--explainFiles` | all cases match |
| Command line and options | output, errors, exit codes, `--locale` | all cases match |
| Diagnostics catalog | messages, 13 translations, output formats | all match |
| JavaScript emit | emitted files, 39 option sets | all compared units match |
| Declaration emit | `.d.ts` and `.d.ts.map`, declaration errors | all units match |
| `--build`, `--incremental` | output, `.tsbuildinfo`, emitted files, `--watch` | all scenarios match |
| Type checker | diagnostics per file | all files match |

Corpus scripts are `packages/tsc-ts/scripts/*-corpus.mjs`. `packages/tsgo` holds reference builds of tsgo (its command line and per-stage drivers) that the tests compare against.

Two packages and one docs app:

| Path | Role |
| --- | --- |
| `packages/tsc-ts` | The compiler, the `tsc-ts` CLI, and the `--api` server. |
| `packages/tsgo` | tsgo reference builds used as the test oracle. |
| `apps/web` | Compiler guides, run with `npm run dev:web` / `npm run build:web`. |

Tasks run through Turborepo. Lint and format are oxlint and oxfmt, not ESLint and Prettier.

## Install and use

```sh
npm install -D tsc-ts
npx tsc-ts -p tsconfig.json
npx tsc-ts --noEmit src/index.ts
```

The `tsc-ts` package (bin `tsc-ts` → `bin/tsc-ts.js`) runs a native executable from a per-platform optional dependency. Do not install with `--omit=optional` or `--no-optional`, or the binary is missing.

| Platform | Package |
| --- | --- |
| macOS, Apple silicon | `@tsc-ts/darwin-arm64` |
| macOS, Intel | `@tsc-ts/darwin-x64` |
| Linux arm64, glibc 2.34+ | `@tsc-ts/linux-arm64-gnu` |
| Linux arm64, musl | `@tsc-ts/linux-arm64-musl` |
| Linux x64, glibc 2.34+ | `@tsc-ts/linux-x64-gnu` |
| Linux x64, musl | `@tsc-ts/linux-x64-musl` |
| Windows x64 | `@tsc-ts/win32-x64-msvc` |

Arguments are the same as `tsc`. The default `lib.*.d.ts` files ship next to the executable; `TSC_TS_LIB_DIR` points at another directory.

### Checkers

`--checkers N` type-checks on N threads. With neither `--checkers` nor `--singleThreaded`, the native executable uses one checker per CPU it may run on, capped at 16 and at least tsgo's four. It uses fewer than the CPU count, but never fewer than four, when the estimated peak of more checkers would not fit in 85% of machine memory. `TSC_TS_CHECKERS=fixed` keeps tsgo's four. Checkers past the fourth stop taking files, one at a time, once process memory reaches that share.

The native build shares one program across threads and also parses and binds files on them. Files that share costly declarations (a large generated schema and the few files that import it) stay on one checker. Under Node.js every thread would build its own copy of the program, so tsc-ts checks on one thread unless `--checkers` is set. `--incremental`, `--watch`, and `--build` always check on one thread. Diagnostics match the single-checker run.

### Memory

The native executable never frees syntax trees, types, signatures, or symbols; it keeps them until exit, which skips the cost of tracking them during a one-shot build. A long-running process grows with every rebuild or project update.

Native `--watch` (including with `--build`) runs in a child process. When a change arrives and that process holds more than 2.5 times the memory it held after its first build, a new process replaces it and builds the change, reporting what the old process would have. `TSC_TS_WATCH_MEMORY` sets the limit in megabytes; `TSC_TS_WATCH_MEMORY=0` turns replacement off. A `--api` process grows with each project update and has to be restarted to reclaim memory.

## API server

`tsc-ts --api` serves the same API as TypeScript 7.0.2's `tsc --api`, over stdin and stdout, so a tool that already drives `tsc --api` (scriptc is the one named) can run `tsc-ts` instead. The Node entry after a workspace build is:

```sh
node packages/tsc-ts/dist/tsc-ts/src/main.js --api --cwd path/to/project
```

The server is checked response by response against `tsc --api` 7.0.2, and scriptc builds the same programs with either. It runs on the tsc-ts compiler, natively or under Node.

Language service methods that are supported: `getCompletionsAtPosition`, `getJsDocTags`, `getDocumentationComment`, `getReferencesToSymbolInFile`, `getReferencedSymbolsForNode`, and `getSignatureUsages`. Completions that need auto imports (global identifiers, import statements, exhaustive `switch` cases) report `completion list needs auto imports`, same as `tsc --api`. Profiling methods `startCPUProfile`, `stopCPUProfile`, and `saveHeapProfile` are not supported.

## Programmatic API

`tsc-ts/api` describes programs, checkers, nodes, symbols, types, and signatures in TypeScript, using the names and numbering of TypeScript 7's `typescript/unstable/sync` API. That covers the node interfaces, `Symbol`, `Type` and its kinds, `Signature`, `IndexInfo`, `TypePredicate`, `Diagnostic`, `Program`, `TypeChecker`, `CompilerOptions`, and the enums `SyntaxKind`, `NodeFlags`, `ModifierFlags`, `TokenFlags`, `SymbolFlags`, `TypeFlags`, `ObjectFlags`, `ElementFlags`, `SignatureFlags`, `SignatureKind`, `IndexKind`, `TypePredicateKind`, `TypeFormatFlags`, `NodeBuilderFlags`, `ScriptTarget`, `ModuleKind`, `ModuleResolutionKind`, `ModuleDetectionKind`, `ScriptKind`, `LanguageVariant`, `JsxEmit`, `NewLineKind`, `DiagnosticCategory`, and `InternalSymbolName`.

```ts
import { createProgramFromConfigFile, SyntaxKind, walkPreorder } from "tsc-ts/api"

const program = createProgramFromConfigFile("tsconfig.json", {
  getCurrentDirectory: () => process.cwd(),
  useCaseSensitiveFileNames: () => process.platform === "linux",
  getDefaultLibraryDirectory: () => "/path/to/lib",
})
const checker = program.getTypeChecker()
for (const file of program.getSourceFiles()) {
  if (program.isSourceFileDefaultLibrary(file)) continue
  walkPreorder(file, (node) => {
    if (node.kind === SyntaxKind.Identifier) {
      console.log(checker.typeToString(checker.getTypeAtLocation(node)!))
    }
  })
}
program.dispose()
```

- Child lists are `NodeList` objects: `node.arguments.nodes` holds the nodes, `pos` and `end` the range. `symbolName(symbol)` matches TypeScript 7 (`__call`, `export=`).
- `createProgram({ rootNames, options, host })` builds from root names; `createProgramFromConfigFile` from a `tsconfig.json`; `parseConfigFile` returns options, root files, and diagnostics. A program loads files on the calling thread.
- The host's `getDefaultLibraryDirectory()` must name the directory of TypeScript 7's `lib.*.d.ts` (the platform packages ship them under `lib`). `readFile`, `fileExists`, `directoryExists`, `realpath`, and `getAccessibleEntries` are optional and fall back to disk.
- Diagnostics, text and positions included, are what `tsc --api` returns for the same project. `getTypeChecker()` is a query checker, separate from the one that reports program diagnostics, so queries do not change them. Nodes, symbols, types, and signatures are tsc-ts's own objects, one per entity, so `===` and `Map` keys work.
- `parseSourceFile`, `getPreEmitDiagnostics`, `forEachChild`, `walkPreorder`, and the usual position and modifier helpers behave as TypeScript 7's. `getSourceFileOfNode` and `getTextOfNode` stand in for `node.getSourceFile()` and `node.getText()`.
- A compiler exception surfaces as `InternalCompilerError` (`cause` is the original). The checker may be inconsistent afterward, so dispose the program. `program.dispose()` frees checkers; later calls throw `DisposedProgramError`.
- The published package has a JavaScript build plus declaration files for Node, and the TypeScript sources of the API and compiler under the `source` export condition for compilers that build from source. A test builds a program on `tsc-ts/api` natively and checks it answers the same as the Node build.

0.0.5 is the release that added this API (`createProgram`, `Program`, `TypeChecker`, `parseSourceFile`, node functions, `getPreEmitDiagnostics`, `dispose()`).

## Build from source

Requirements from the README: Node.js 24+ and npm, Go 1.26, and a scriptc host (macOS, Linux, or Windows) with `clang` available for linking.

```sh
npm ci
npm run fetch:upstream          # clone tsgo at the pinned commit
npm run build                   # Node build of tsc-ts plus the docs site
npm run build:oracle            # tsgo reference builds in packages/tsgo/dist
npm run build:native -w tsc-ts  # packages/tsc-ts/dist/tsc
npm run pack:npm -w tsc-ts      # packages/tsc-ts/dist/npm/*.tgz
```

`npm run build:native:dev -w tsc-ts` is the unoptimized, faster native build. `TSC_TS_BIN=packages/tsc-ts/dist/tsc` points the tests that need a native binary at one. `npm test` compares tsc-ts with tsgo; `npm run bench -w tsc-ts` times it against tsgo and TypeScript's JavaScript compiler.

## 0.0.5, beyond the API

From `CHANGELOG.md`, not re-measured here:

- An incremental rebuild of a composite program (any project with references) checks and emits affected files on checker threads. The changelog's TypeScript 5.8 example, after an edit to `core.ts`: `-p src/compiler` 1.96 s → 0.85 s, `-b src/tsc` 1.01 s → 0.88 s, with the same outputs, declaration files, and build info.
- With `noEmitOnError`, the main thread takes each file's declaration diagnostics from the checker thread that emitted it instead of running the declaration transform again. Changelog figure for a typescript-eslint `-b` clean build: 5.39 s → 3.23 s, peak RSS down 20%.
- The parser frees its copy of a file's text as soon as it is done. Changelog figure for TypeScript 5.8 `src/compiler`, single-threaded: emit peak 330 MB → 312 MB, check 333 MB → 318 MB.
- A numeric enum member is no longer assignable to a string member of the same enum (`enum M { A, B = 'b' }; const x: M.B = M.A` reports TS2322), matching TypeScript 7.0.2.
- With `skipLibCheck` off, default library files are checked with the same checker as the other files, matching 7.0.2. The changelog says Excalidraw no longer reports TS2430 twice, and that a one-file program which checks its libraries now takes 0.19 s (0.05 s before; TypeScript 7.0.2: 0.26 s).

## Where it sits

tsc-ts is not a replacement for the TypeScript you install as `typescript`. It is a native port of the Go compiler (tsgo 7.0.2), still at 0.0.x and labeled an experiment, meant to be dropped in where something already calls `tsc` or `tsc --api`. The interesting part for tooling is the `--api` server and `tsc-ts/api`: same request names as TypeScript 7's unstable sync API, but nodes and types are tsc-ts objects, and a long-running `--api` or `--watch` process keeps growing until it is restarted or replaced.

> **See also:** [JavaScript TypeScript](/Technology/Programming Languages/Tools/JavaScript TypeScript) · [Nodejs](/Technology/Programming Languages/Tools/Nodejs)
