---
area: technology
domain: javascript
type: guide
title: JavaScript TypeScript
description: Hub of JavaScript and TypeScript notes covering language fundamentals, the event loop, performance, the type system, tooling, libraries, and interview prep.
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - javascript
  - typescript
  - tooling
resource: https://medium.com/globant/javascript-optimization-techniques-20d8d167dadd
---

# JavaScript TypeScript

A "hub"-style collection of notes: used both to review the fundamentals and as a checklist when building projects.

## Contents

- [Quick reference](#quick-reference)
- [JavaScript](#javascript)
  - [Fundamentals](#fundamentals)
  - [Async and the Event Loop](#async-and-the-event-loop)
  - [Modules, Bundling, Tree-Shaking](#modules-bundling-tree-shaking)
  - [Performance and Memory](#performance-and-memory)
  - [Patterns and Code Quality](#patterns-and-code-quality)
  - [New ES Features (Updated)](#new-es-features-updated)
- [TypeScript](#typescript)
  - [Core Type System](#core-type-system)
  - [Narrowing, Guards, Assertions](#narrowing-guards-assertions)
  - [Generics and Utility Types](#generics-and-utility-types)
  - [Advanced Types (mapped/conditional/infer)](#advanced-types-mappedconditionalinfer)
  - [Pragmatic TS for Projects](#pragmatic-ts-for-projects)
- [Tooling and Runtime](#tooling-and-runtime)
  - [Lint/Format/Typecheck](#lintformattypecheck)
  - [Testing](#testing)
  - [Build and Bundlers](#build-and-bundlers)
  - [Runtimes](#runtimes)
  - [Monorepo](#monorepo)
- [Libraries (Quick Reference)](#libraries-quick-reference)
- [Interview and Exercises](#interview-and-exercises)
- [Resources](#resources)

---

## Quick reference

### JS: mental model (used very often)

- **Value vs reference**: primitives are copied by value, objects are copied by reference (the reference is what gets copied).
- **Equality**: `Object.is` vs `===` vs `==` (only use `==` when you fully understand coercion).
- **`this`**: determined by the call site; arrow functions "capture" the lexical `this`.
- **Async**: microtasks (Promise/`queueMicrotask`) run before macrotasks (`setTimeout`).
- **Modules**: ESM tree-shakes better; CJS is harder to optimize.

### TS: rules of thumb

- Prefer `unknown` > `any` (cast at the boundary, don't let `any` spread).
- Prefer **union + narrowing** > careless "type assertions" (`as X`).
- Prefer `satisfies` to **check shape** while keeping literal types.
- Type the "boundary": input/output (API, DB, file, UI events).
- Separate **domain types** (true to the business meaning) from **transport types** (DTOs).

---

## JavaScript

### Fundamentals

#### Data types

- Primitives: `string | number | bigint | boolean | symbol | undefined | null`.
- Reference: `object` (including array, function, date, map, set...).
- Pitfalls:
  - `typeof null === 'object'`.
  - `NaN !== NaN` (use `Number.isNaN`).
  - `0.1 + 0.2 !== 0.3` (floating point).

#### Scope, hoisting, closure

- `var` hoists and is function-scoped, which is bug-prone. Prefer `let/const`.
- A closure = a function that "remembers" the lexical environment where it was declared.

```js
function makeCounter() {
  let n = 0
  return () => ++n
}

const inc = makeCounter()
inc() // 1
inc() // 2
```

#### `this` (remember: it follows the call site)

```js
const obj = {
  x: 1,
  getX() {
    return this.x
  }
}

const f = obj.getX
f() // undefined (strict mode)
obj.getX() // 1
```

Quick rules:

- `new Fn()` -> `this` is the instance.
- `obj.fn()` -> `this` is `obj`.
- `fn.call(ctx)` / `apply` / `bind` -> `this` is `ctx`.
- Arrow: `this` is lexical (cannot be re-bound).

---

### Async and the Event Loop

#### Runtime structure

- **Call stack**: where synchronous code runs.
- **Web APIs / Node APIs**: timers, I/O, fetch...
- **Task queues**:
  - **Macrotask queue**: `setTimeout`, `setInterval`, message channel, I/O callbacks...
  - **Microtask queue**: `Promise.then/catch/finally`, `queueMicrotask`, `MutationObserver`.
- Rule: after each macrotask, the engine "drains" all microtasks.

```js
console.log(1)

setTimeout(() => console.log(2), 0)

Promise.resolve().then(() => console.log(3))

console.log(4)
// 1 4 3 2
```

#### Promise patterns

- `Promise.all` is fail-fast.
- `Promise.allSettled` gets the result of each one.
- `Promise.race` takes whichever finishes first.
- `Promise.any` takes the first to resolve (fails only if all reject).

#### Abort & timeout

Prefer `AbortController` (fetch and other APIs that support abort). A timeout is usually "abort after N ms".

---

### Modules, Bundling, Tree-Shaking

#### ESM vs CJS

- ESM: `import/export`, good static analysis → tree-shaking.
- CJS: `require/module.exports`, dynamic → hard to tree-shake.

#### Dynamic import

```js
// code splitting
const { heavy } = await import("./heavy.js")
heavy()
```

#### Side effects

- A file that is imported only to run top-level code can break tree-shaking.
- For packages, consider `sideEffects: false` (but only if there really are no side effects).

---

### Performance and Memory

#### Commonly used techniques

- Memoization (cache by input) — watch out for invalidation.
- Debounce / throttle (UI events).
- Lazy loading / code splitting.
- Web Workers for CPU-bound work.
- Avoiding memory leaks:
  - remove event listeners
  - clear timers
  - avoid holding references "forever" in closures/global caches
  - WeakMap/WeakSet for caches keyed by object

#### Profiling checklist (web)

- Network: cache headers, compression, HTTP/2/3.
- JS: bundle size, parsing, long tasks.
- Render: layout thrashing, forced reflow.
- Memory: detached DOM nodes.

Reference: https://medium.com/globant/javascript-optimization-techniques-20d8d167dadd

#### Node.js Performance: V8 Memory Management & GC Tuning

##### The V8 Engine in Node.js

- **V8 Engine**: Google's JavaScript engine, which executes JavaScript quickly by compiling it directly to machine code
- Provides **Garbage Collection (GC)** for automatic memory management
- GC reclaims memory that is no longer in use, but if not tuned it can cause performance bottlenecks

##### Memory Management and GC in V8

- Understanding how V8 manages memory and GC is essential for optimizing Node.js application performance
- Untuned GC can cause:
  - Performance bottlenecks
  - High latency in the application
  - Inefficient memory usage

##### Optimization Approaches

- **Use profiling tools**:
  - `v8-profiler-next`: Creates heap snapshots for memory analysis
  - `cpupro`: Analyzes CPU and identifies performance bottlenecks
  - Helps identify memory leaks and performance problems

- **Optimize source code**:
  - Use V8's built-in features effectively
  - Avoid storing too much data in sessions
  - Use the cluster module for parallel processing
  - Optimize Buffer usage when working with binary data

- **Update the Node.js version**:
  - Use the latest stable version of Node.js
  - Take advantage of performance and security improvements
  - Each new version usually improves GC and memory management

- **Optimize memory management**:
  - Minimize memory leaks by managing the lifecycle of objects
  - Use Buffers sensibly when working with binary data
  - Avoid holding unnecessary references to large objects

##### Conclusion

- Optimizing Node.js performance requires a deep understanding of the V8 Engine, memory management, and GC
- Apply suitable optimization methods to keep applications efficient and stable
- Use profiling tools to identify and resolve performance problems

Reference: https://blog.platformatic.dev/optimizing-nodejs-performance-v8-memory-management-and-gc-tuning

---

### Patterns and Code Quality

#### Design patterns (commonly seen in practice)

- Module pattern / Revealing module.
- Factory / Builder.
- Observer (events).
- Strategy (swap algorithms via config).
- Adapter (wrap another API).
- Decorator (wrap behavior).

#### JSDoc (JS projects or TS-lite)

- Use JSDoc to enable type inference in JS + IDE autocomplete.
- Homepage: https://jsdoc.app

Example:

```js
/**
 * @param {number} a
 * @param {number} b
 */
function add(a, b) {
  return a + b
}
```

---

### New ES Features (Updated)

Notable ES2024 (ES15) features:

- `Promise.withResolvers()`
- `Object.groupBy()` / `Map.groupBy()`
- `Atomics.waitAsync()`
- `String.prototype.isWellFormed()` / `String.prototype.toWellFormed()`
- `ResizableArrayBuffer`, `GrowableSharedArrayBuffer`

Sources:

- https://viblo.asia/p/5-tinh-nang-javascript-moi-tuyet-voi-trong-es15-2024-GAWVpMzX405
- https://medium.com/@yourfuse/javascript-whats-new-with-ecmascript-2024-es15-ef056d2f4bf1

---

## TypeScript

### Core Type System

#### `any` vs `unknown` vs `never`

- `any`: turns off type-checking (spreads quickly, hard to control).
- `unknown`: "not yet known", must be narrowed before use.
- `never`: cannot happen (exhaustiveness checks).

```ts
function assertNever(x: never): never {
  throw new Error(`Unexpected: ${x}`)
}
```

#### `interface` vs `type`

- `interface`: good for object "shapes" + declaration merging.
- `type`: powerful for unions/conditional/mapped/template literal types.
- Practical convention: `interface` for public contracts, `type` for unions/utilities.

---

### Narrowing, Guards, Assertions

#### Narrowing

- `typeof`, `instanceof`, `in`, truthy checks.
- Discriminated unions.

```ts
type Result = { ok: true; data: string } | { ok: false; error: string }

function handle(r: Result) {
  if (!r.ok) return r.error
  return r.data
}
```

#### Type guards

```ts
function isString(x: unknown): x is string {
  return typeof x === "string"
}
```

#### Assertion functions

```ts
function assertNonNull<T>(x: T): asserts x is NonNullable<T> {
  if (x == null) throw new Error("Expected non-null")
}
```

---

### Generics and Utility Types

Commonly used utility types:

- `Partial<T>`, `Required<T>`, `Readonly<T>`
- `Pick<T, K>`, `Omit<T, K>`
- `Record<K, V>`
- `ReturnType<F>`, `Parameters<F>`
- `Awaited<T>`

Tip: start from the "data model" and only then derive types.

---

### Advanced Types (mapped/conditional/infer)

#### `satisfies`

Keeps literal types while still checking the shape.

```ts
const routes = {
  home: "/",
  user: "/users/:id"
} satisfies Record<string, string>
```

#### Conditional types + `infer`

```ts
type UnwrapPromise<T> = T extends Promise<infer U> ? U : T
type A = UnwrapPromise<Promise<number>> // number
```

#### Template literal types

```ts
type EventName = `user:${"created" | "deleted"}`
```

Advanced references:

- https://dev.to/mattlewandowski93/15-advanced-typescript-tips-and-tricks-you-might-not-know-12kk
- https://viblo.asia/p/20-bi-kip-typescript-ma-moi-lap-trinh-vien-deu-nen-biet-obA46wMGJKv
- https://medium.com/@sm_hemel/advanced-typescript-you-need-to-know-5d1fa043b35f

---

### Pragmatic TS for Projects

#### `tsconfig` (suggestions leaning toward "safe")

- Enable `strict: true`.
- Consider also enabling: `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes` (be careful when migrating).
- Avoid `skipLibCheck: false` if the repo is large or CI is slow; choose based on the trade-off.

#### Boundary typing

- Parse + validate incoming data (API requests, DB rows, env vars).
- Return "clean" types to the domain.
- TS does not replace runtime validation.

#### Decorator vs HOC (note)

- HOC (React) is a component-level pattern.
- Decorator (TS/JS) is a syntax/pattern that wraps a class/method.

Source: https://viblo.asia/p/tai-sao-co-higher-order-component-hoc-khi-da-co-decorator-pattern-AZoJjX17VY7?fbclid=IwAR32QGcKM393UNB3mUpJ6DIcvO4oiJLaK1umt6b9rJcyNanvVk48PzmdbEQ

---

## Tooling and Runtime

### Lint/Format/Typecheck

- ESLint (rules, quality gate)
- Prettier (format)
- TypeScript (typecheck)
- Optional: `tsc --noEmit` in CI.
- Fallow (static analysis / codebase intelligence): https://github.com/fallow-rs/fallow
  - A single Rust binary, needs no TS compiler/Node runtime; analyzes the repo as a dependency graph. Deterministic, with no AI in the analyzer.
  - Finds: unused files/exports/types/deps (Knip-style), circular deps, duplication (JS/TS + CSS, Vue/Svelte/Astro), complexity hotspots + a 0–100 health score, architecture boundary violations (presets `bulletproof`, `layered`, `hexagonal`, `feature-sliced`), design-system styling drift.
  - `npx fallow` (full pipeline), `npx fallow audit` (a PR gate that fails only on new findings caused by the change — suits legacy codebases), `fallow dead-code --trace file.ts:symbol` (prove a symbol is unused before deleting it), `fallow fix --dry-run`, `fallow recommend` (suggests config).
  - 100+ framework plugins auto-detect entry points; has an LSP + MCP server + agent skill, and `--format json` output. Optional `--type-aware`. MIT; the paid Fallow Runtime layer adds evidence from production traffic. Docs: https://docs.fallow.tools

Minimum CI checklist:

- `lint` (eslint)
- `typecheck` (tsc)
- `test` (unit/integration)
- `build`

---

### Testing

- Unit: Vitest/Jest.
- E2E: Playwright/Cypress.
- API contract: tRPC / OpenAPI (depending on the stack you choose).

Tips:

- Test pure functions first.
- For async: prefer fake timers when needed, avoid real sleeps.

---

### Build and Bundlers

#### ByteDance Web Infra (Rspack ecosystem)

1. Overview: a high-performance (Rust-based) build toolset for web/monorepos.
2. Rspack: https://www.rspack.dev/
3. Rsbuild: https://rsbuild.dev/
4. Rspress: https://rspress.dev/
5. Rslib: build libraries (integrated into Rsbuild).
6. Rsdoctor: https://rsdoctor.dev/
7. Awesome Rspack: https://github.com/rspack-contrib/awesome-rspack

---

### Runtimes

#### Bun

- Runtime + bundler + transpiler + task runner + npm client.
- Homepage: https://bun.sh

---

### Monorepo

#### Lerna

- Homepage: https://lerna.js.org
- References:
  - https://dev.to/vcpablo/vuejs-building-a-monorepo-using-lerna-1h1c
  - https://github.com/vcpablo/vuejs-lerna-monorepo

#### Nx

- **Overview**: A tool that optimizes the build process and scales CI, helping reduce PR completion time
- **Key features**:
  - Optimized builds and task scheduling
  - Remote caching to speed up CI/CD
  - Task distribution across multiple machines
  - Automatic detection of test flakiness
  - Monorepo support with a smart dependency graph
- **Usage**:
  - Create a new workspace: `npx create-nx-workspace`
  - Add to an existing workspace: `npx nx init`
  - Connect to Nx Cloud: `npx nx connect`
- **GitHub**: https://github.com/nrwl/nx
- **Website**: https://nx.dev

Additional suggestions (as needed):

- pnpm workspaces/yarn workspaces (dependency management)
- changesets (versioning)
- turborepo/nx (task pipeline)

---

## Libraries (Quick Reference)

### HTTP client

- Alova: https://github.com/alovajs/alova

### Service Workers & Edge computing

- WinterJS: https://github.com/wasmerio/winterjs

### Data processing

- SheetJS: https://github.com/SheetJS/sheetjs

### Graphics / computational design

- thi-ng/umbrella: https://github.com/thi-ng/umbrella

### Validation

- Typia: https://github.com/samchon/typia
- Superstruct: https://github.com/ianstormtaylor/superstruct
- Zod: https://github.com/colinhacks/zod

### Error Handling

- neverthrow: TypeScript library for type-safe error handling using Result type instead of throwing exceptions - https://github.com/supermacro/neverthrow

### Logging

- Winston: https://github.com/winstonjs/winston
- Pino: https://github.com/pinojs/pino

### Web frameworks

- Hono: https://github.com/honojs/hono

### TypeScript meta / DI / typesafe API

- tsyringe (DI): https://github.com/microsoft/tsyringe
- tRPC: https://github.com/trpc/trpc
- reflect-metadata: https://github.com/rbuckton/reflect-metadata

### Developer tools

- Scaffold: https://github.com/AmanVarshney01/create-better-t-stack
- tsplot (visualize TS classes): https://github.com/JanUnld/tsplot
- Danger (PR automation): https://danger.systems

---

## Interview and Exercises

### Common questions (JS)

- Hoisting, TDZ, scope.
- `this`, bind/call/apply.
- Closures, memory leaks.
- Promises, async/await, microtask vs macrotask.
- Module system, tree-shaking.
- Deep/shallow copy, equality.

Source: https://viblo.asia/p/top-30-cau-hoi-phong-van-javascript-cuc-chat-cho-nam-2024-EoW4oX29Jml

### Self-practice exercises (suggestions)

- Write `debounce`, `throttle`.
- Write `retry(fn, { retries, backoff })`.
- Parse and serialize a querystring.
- Implement an event emitter.
- TS: a discriminated union for a state machine.

---

## Resources

### Event loop

- https://viblo.asia/p/javascript-chay-bat-dong-bo-nhu-the-nao-gDVK2JW0KLj
- https://viblo.asia/p/event-loop-trong-javascript-microtask-macrotask-promise-va-cac-cau-hoi-phong-van-pho-bien-GyZJZjrbJjm

### Advanced JavaScript collection

- https://viblo.asia/s/javascript-nang-cao-WR5JRQ1Q4Gv

> **See also:** [Nodejs](/Technology/Programming Languages/Tools/Nodejs) · [Defer Async Inline](/Technology/Programming Languages/Concepts/Defer Async Inline) · [Async Discussion](/Technology/Programming Languages/Concepts/Async Discussion)
