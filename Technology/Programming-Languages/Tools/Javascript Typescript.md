---
area: technology
domain: programming-languages
topic: javascript
type: resource
title: Javascript Typescript
description: JavaScript / TypeScript
timestamp: "2026-06-19T13:43:26.126Z"
tags:
  - technology
  - programming-languages
  - javascript
resource: https://medium.com/globant/javascript-optimization-techniques-20d8d167dadd
---

# JavaScript / TypeScript

Ghi chú tổng hợp theo kiểu “hub”: vừa dùng để ôn nền tảng, vừa dùng làm checklist khi build dự án.

## Mục lục

- [Quick reference](#quick-reference)
- [1) JavaScript](#1-javascript)
  - [1.1 Nền tảng](#11-nền-tảng)
  - [1.2 Bất đồng bộ & Event loop](#12-bất-đồng-bộ--event-loop)
  - [1.3 Module, bundling, tree-shaking](#13-module-bundling-tree-shaking)
  - [1.4 Performance & Memory](#14-performance--memory)
  - [1.5 Patterns & code quality](#15-patterns--code-quality)
  - [1.6 ES mới (cập nhật)](#16-es-mới-cập-nhật)
- [2) TypeScript](#2-typescript)
  - [2.1 Type system cốt lõi](#21-type-system-cốt-lõi)
  - [2.2 Narrowing, guards, assertions](#22-narrowing-guards-assertions)
  - [2.3 Generics & utility types](#23-generics--utility-types)
  - [2.4 Advanced types (mapped/conditional/infer)](#24-advanced-types-mappedconditionalinfer)
  - [2.5 Pragmatic TS cho dự án](#25-pragmatic-ts-cho-dự-án)
- [3) Tooling & Runtime](#3-tooling--runtime)
  - [3.1 Lint/Format/Typecheck](#31-lintformattypecheck)
  - [3.2 Testing](#32-testing)
  - [3.3 Build & Bundlers](#33-build--bundlers)
  - [3.4 Runtimes](#34-runtimes)
  - [3.5 Monorepo](#35-monorepo)
- [4) Libraries (tham khảo nhanh)](#4-libraries-tham-khảo-nhanh)
- [5) Phỏng vấn & bài tập](#5-phỏng-vấn--bài-tập)
- [6) Tài nguyên](#6-tài-nguyên)

---

## Quick reference

### JS: mental model (rất hay dùng)

- **Value vs reference**: primitives copy-by-value, objects copy-by-reference (reference được copy).
- **Equality**: `Object.is` vs `===` vs `==` (chỉ dùng `==` khi hiểu rõ coercion).
- **`this`**: quyết định bởi call-site; arrow function “bắt” `this` lexical.
- **Async**: microtask (Promise/`queueMicrotask`) chạy trước macrotask (`setTimeout`).
- **Module**: ESM có tree-shaking tốt hơn; CJS khó tối ưu hơn.

### TS: rules of thumb

- Prefer `unknown` > `any` (ép type ở biên, không truyền `any` lan rộng).
- Prefer **union + narrowing** > “type assertions” bừa (`as X`).
- Prefer `satisfies` để **check shape** mà vẫn giữ literal types.
- Type ở “boundary”: input/output (API, DB, file, UI events).
- Tách **domain types** (đúng nghĩa nghiệp vụ) khỏi **transport types** (DTO).

---

## 1) JavaScript

### 1.1 Nền tảng

#### Data types

- Primitives: `string | number | bigint | boolean | symbol | undefined | null`.
- Reference: `object` (bao gồm array, function, date, map, set...).
- Pitfalls:
  - `typeof null === 'object'`.
  - `NaN !== NaN` (dùng `Number.isNaN`).
  - `0.1 + 0.2 !== 0.3` (floating point).

#### Scope, hoisting, closure

- `var` hoist + function scope, dễ bug. Prefer `let/const`.
- Closure = function “nhớ” lexical environment tại nơi khai báo.

```js
function makeCounter() {
  let n = 0
  return () => ++n
}

const inc = makeCounter()
inc() // 1
inc() // 2
```

#### `this` (nhớ theo call-site)

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

Rules nhanh:

- `new Fn()` -> `this` là instance.
- `obj.fn()` -> `this` là `obj`.
- `fn.call(ctx)` / `apply` / `bind` -> `this` là `ctx`.
- Arrow: `this` lexical (không bind lại được).

---

### 1.2 Bất đồng bộ & Event loop

#### Cấu trúc runtime

- **Call stack**: nơi chạy synchronous code.
- **Web APIs / Node APIs**: timer, I/O, fetch...
- **Task queues**:
  - **Macrotask queue**: `setTimeout`, `setInterval`, message channel, I/O callbacks...
  - **Microtask queue**: `Promise.then/catch/finally`, `queueMicrotask`, `MutationObserver`.
- Quy tắc: sau mỗi macrotask, engine “drain” hết microtask.

```js
console.log(1)

setTimeout(() => console.log(2), 0)

Promise.resolve().then(() => console.log(3))

console.log(4)
// 1 4 3 2
```

#### Promise patterns

- `Promise.all` fail-fast.
- `Promise.allSettled` lấy kết quả từng cái.
- `Promise.race` theo ai nhanh nhất.
- `Promise.any` theo ai resolve đầu tiên (reject hết mới fail).

#### Abort & timeout

Prefer `AbortController` (fetch + các API hỗ trợ abort). Timeout thường là “abort sau N ms”.

---

### 1.3 Module, bundling, tree-shaking

#### ESM vs CJS

- ESM: `import/export`, static analysis tốt → tree-shaking.
- CJS: `require/module.exports`, dynamic → khó tree-shake.

#### Dynamic import

```js
// code splitting
const { heavy } = await import("./heavy.js")
heavy()
```

#### Side effects

- Một file import chỉ để chạy code top-level có thể phá tree-shaking.
- Với package, cân nhắc `sideEffects: false` (nhưng phải thật sự không side effects).

---

### 1.4 Performance & Memory

#### Kỹ thuật thường dùng

- Memoization (cache theo input) — chú ý invalidation.
- Debounce / throttle (UI events).
- Lazy loading / code splitting.
- Web Workers cho CPU-bound.
- Tránh memory leak:
  - remove event listeners
  - clear timers
  - tránh giữ reference “mãi mãi” trong closures/global caches
  - WeakMap/WeakSet cho cache theo object key

#### Profiling checklist (web)

- Network: cache headers, compression, HTTP/2/3.
- JS: bundle size, parsing, long tasks.
- Render: layout thrashing, forced reflow.
- Memory: detached DOM nodes.

Nguồn tham khảo: https://medium.com/globant/javascript-optimization-techniques-20d8d167dadd

#### Node.js Performance: V8 Memory Management & GC Tuning

##### V8 Engine trong Node.js

- **V8 Engine**: Engine JavaScript của Google, thực thi mã JavaScript nhanh chóng bằng cách biên dịch trực tiếp thành mã máy
- Cung cấp tính năng **Garbage Collection (GC)** để quản lý bộ nhớ tự động
- GC giúp thu hồi bộ nhớ không còn sử dụng, nhưng nếu không được tối ưu có thể gây ra tắc nghẽn hiệu suất

##### Quản lý bộ nhớ và GC trong V8

- Hiểu cách V8 quản lý bộ nhớ và GC là cần thiết để tối ưu hóa hiệu suất ứng dụng Node.js
- GC không được tối ưu có thể gây ra:
  - Tắc nghẽn hiệu suất (performance bottlenecks)
  - Độ trễ cao trong ứng dụng
  - Sử dụng bộ nhớ không hiệu quả

##### Phương pháp tối ưu hóa

- **Sử dụng công cụ phân tích hiệu suất**:
  - `v8-profiler-next`: Tạo ảnh chụp nhanh heap để phân tích bộ nhớ
  - `cpupro`: Phân tích CPU và xác định tắc nghẽn hiệu suất
  - Giúp xác định rò rỉ bộ nhớ và các vấn đề về hiệu suất

- **Tối ưu hóa mã nguồn**:
  - Sử dụng các chức năng tích hợp của V8 một cách hiệu quả
  - Tránh lưu trữ quá nhiều dữ liệu trong phiên (session)
  - Sử dụng mô-đun cụm (cluster module) để xử lý song song
  - Tối ưu hóa việc sử dụng Buffer khi làm việc với dữ liệu nhị phân

- **Cập nhật phiên bản Node.js**:
  - Sử dụng phiên bản mới nhất và ổn định của Node.js
  - Tận dụng các cải tiến về hiệu suất và bảo mật
  - Mỗi phiên bản mới thường có cải thiện về GC và quản lý bộ nhớ

- **Tối ưu hóa quản lý bộ nhớ**:
  - Giảm thiểu rò rỉ bộ nhớ bằng cách quản lý lifecycle của objects
  - Sử dụng Buffer một cách hợp lý khi làm việc với dữ liệu nhị phân
  - Tránh giữ reference không cần thiết đến objects lớn

##### Kết luận

- Tối ưu hóa hiệu suất Node.js đòi hỏi hiểu biết sâu về V8 Engine, quản lý bộ nhớ và GC
- Áp dụng các phương pháp tối ưu hóa phù hợp để đảm bảo ứng dụng hoạt động hiệu quả và ổn định
- Sử dụng các công cụ profiling để xác định và giải quyết các vấn đề về hiệu suất

Nguồn tham khảo: https://blog.platformatic.dev/optimizing-nodejs-performance-v8-memory-management-and-gc-tuning

---

### 1.5 Patterns & code quality

#### Design patterns (thực tế hay gặp)

- Module pattern / Revealing module.
- Factory / Builder.
- Observer (events).
- Strategy (đổi thuật toán theo config).
- Adapter (bọc API khác).
- Decorator (bọc hành vi).

#### JSDoc (JS projects hoặc TS-lite)

- Dùng JSDoc để bật type inference trong JS + IDE autocomplete.
- Trang chủ: https://jsdoc.app

Ví dụ:

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

### 1.6 ES mới (cập nhật)

ES2024 (ES15) đáng chú ý:

- `Promise.withResolvers()`
- `Object.groupBy()` / `Map.groupBy()`
- `Atomics.waitAsync()`
- `String.prototype.isWellFormed()` / `String.prototype.toWellFormed()`
- `ResizableArrayBuffer`, `GrowableSharedArrayBuffer`

Nguồn:

- https://viblo.asia/p/5-tinh-nang-javascript-moi-tuyet-voi-trong-es15-2024-GAWVpMzX405
- https://medium.com/@yourfuse/javascript-whats-new-with-ecmascript-2024-es15-ef056d2f4bf1

---

## 2) TypeScript

### 2.1 Type system cốt lõi

#### `any` vs `unknown` vs `never`

- `any`: tắt type-check (lan nhanh, khó kiểm soát).
- `unknown`: “chưa biết”, phải narrow trước khi dùng.
- `never`: không thể xảy ra (exhaustiveness checks).

```ts
function assertNever(x: never): never {
  throw new Error(`Unexpected: ${x}`)
}
```

#### `interface` vs `type`

- `interface`: tốt cho “shape” object + declaration merging.
- `type`: mạnh khi union/conditional/mapped/template literal.
- Quy ước thực tế: `interface` cho public contracts, `type` cho unions/utility.

---

### 2.2 Narrowing, guards, assertions

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

### 2.3 Generics & utility types

Utility types hay dùng:

- `Partial<T>`, `Required<T>`, `Readonly<T>`
- `Pick<T, K>`, `Omit<T, K>`
- `Record<K, V>`
- `ReturnType<F>`, `Parameters<F>`
- `Awaited<T>`

Tip: bắt đầu từ “data model” rồi mới derive types.

---

### 2.4 Advanced types (mapped/conditional/infer)

#### `satisfies`

Giữ literal types nhưng vẫn kiểm tra shape.

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

Tham khảo nâng cao:

- https://dev.to/mattlewandowski93/15-advanced-typescript-tips-and-tricks-you-might-not-know-12kk
- https://viblo.asia/p/20-bi-kip-typescript-ma-moi-lap-trinh-vien-deu-nen-biet-obA46wMGJKv
- https://medium.com/@sm_hemel/advanced-typescript-you-need-to-know-5d1fa043b35f

---

### 2.5 Pragmatic TS cho dự án

#### `tsconfig` (gợi ý hướng “an toàn”)

- Bật `strict: true`.
- Cân nhắc bật thêm: `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes` (cẩn thận khi migrate).
- Tránh `skipLibCheck: false` nếu repo lớn/CI chậm; chọn theo trade-off.

#### Boundary typing

- Parse + validate dữ liệu vào (API request, DB rows, env vars).
- Trả về types “sạch” cho domain.
- TS không thay thế runtime validation.

#### Decorator vs HOC (ghi chú)

- HOC (React) là pattern ở level component.
- Decorator (TS/JS) là syntax/pattern bọc class/method.

Nguồn: https://viblo.asia/p/tai-sao-co-higher-order-component-hoc-khi-da-co-decorator-pattern-AZoJjX17VY7?fbclid=IwAR32QGcKM393UNB3mUpJ6DIcvO4oiJLaK1umt6b9rJcyNanvVk48PzmdbEQ

---

## 3) Tooling & Runtime

### 3.1 Lint/Format/Typecheck

- ESLint (rules, quality gate)
- Prettier (format)
- TypeScript (typecheck)
- Optional: `tsc --noEmit` trong CI.
- Fallow (static analysis / codebase intelligence): https://github.com/fallow-rs/fallow
  - Một binary Rust, không cần TS compiler/Node runtime; phân tích repo như một dependency graph. Deterministic, không có AI trong analyzer.
  - Tìm: unused files/exports/types/deps (kiểu Knip), circular deps, duplication (JS/TS + CSS, Vue/Svelte/Astro), complexity hotspots + health score 0–100, vi phạm architecture boundaries (preset `bulletproof`, `layered`, `hexagonal`, `feature-sliced`), design-system styling drift.
  - `npx fallow` (full pipeline), `npx fallow audit` (PR gate chỉ fail trên finding mới do change gây ra — hợp với codebase legacy), `fallow dead-code --trace file.ts:symbol` (chứng minh symbol unused trước khi xoá), `fallow fix --dry-run`, `fallow recommend` (đề xuất config).
  - 100+ framework plugins tự detect entry points; có LSP + MCP server + agent skill, output `--format json`. Tuỳ chọn `--type-aware`. MIT; lớp trả phí Fallow Runtime thêm evidence từ production traffic. Docs: https://docs.fallow.tools

Checklist CI tối thiểu:

- `lint` (eslint)
- `typecheck` (tsc)
- `test` (unit/integration)
- `build`

---

### 3.2 Testing

- Unit: Vitest/Jest.
- E2E: Playwright/Cypress.
- API contract: tRPC / OpenAPI (tuỳ lựa chọn stack).

Tip:

- Test pure functions trước.
- Với async: ưu tiên fake timers khi cần, tránh sleep thật.

---

### 3.3 Build & Bundlers

#### ByteDance Web Infra (Rspack ecosystem)

1. Tổng quan: bộ công cụ build hiệu năng cao (Rust-based) cho web/monorepo.
2. Rspack: https://www.rspack.dev/
3. Rsbuild: https://rsbuild.dev/
4. Rspress: https://rspress.dev/
5. Rslib: build libraries (tích hợp trong Rsbuild).
6. Rsdoctor: https://rsdoctor.dev/
7. Awesome Rspack: https://github.com/rspack-contrib/awesome-rspack

---

### 3.4 Runtimes

#### Bun

- Runtime + bundler + transpiler + task runner + npm client.
- Trang chủ: https://bun.sh

---

### 3.5 Monorepo

#### Lerna

- Trang chủ: https://lerna.js.org
- Tham khảo:
  - https://dev.to/vcpablo/vuejs-building-a-monorepo-using-lerna-1h1c
  - https://github.com/vcpablo/vuejs-lerna-monorepo

#### Nx

- **Tổng quan**: Công cụ tối ưu hóa quy trình xây dựng và mở rộng CI, giúp giảm thời gian hoàn thành PR
- **Tính năng chính**:
  - Tối ưu hóa builds và task scheduling
  - Remote caching để tăng tốc CI/CD
  - Task distribution trên nhiều máy
  - Tự động phát hiện test flakiness
  - Hỗ trợ monorepo với dependency graph thông minh
- **Sử dụng**:
  - Tạo workspace mới: `npx create-nx-workspace`
  - Thêm vào workspace hiện có: `npx nx init`
  - Kết nối với Nx Cloud: `npx nx connect`
- **GitHub**: https://github.com/nrwl/nx
- **Website**: https://nx.dev

Gợi ý thêm (tuỳ nhu cầu):

- pnpm workspaces/yarn workspaces (quản lý deps)
- changesets (versioning)
- turborepo/nx (task pipeline)

---

## 4) Libraries (tham khảo nhanh)

### HTTP client

- Alova: https://github.com/alovajs/alova

### Service Workers & Edge computing

- WinterJS: https://github.com/wasmerio/winterjs

### Xử lý dữ liệu

- SheetJS: https://github.com/SheetJS/sheetjs

### Đồ hoạ / computational design

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

## 5) Phỏng vấn & bài tập

### Câu hỏi hay gặp (JS)

- Hoisting, TDZ, scope.
- `this`, bind/call/apply.
- Closure, memory leak.
- Promise, async/await, microtask vs macrotask.
- Module system, tree-shaking.
- Deep/shallow copy, equality.

Nguồn: https://viblo.asia/p/top-30-cau-hoi-phong-van-javascript-cuc-chat-cho-nam-2024-EoW4oX29Jml

### Bài tập tự luyện (gợi ý)

- Viết `debounce`, `throttle`.
- Viết `retry(fn, { retries, backoff })`.
- Parse querystring, serialize.
- Implement event emitter.
- TS: discriminated union cho state machine.

---

## 6) Tài nguyên

### Event loop

- https://viblo.asia/p/javascript-chay-bat-dong-bo-nhu-the-nao-gDVK2JW0KLj
- https://viblo.asia/p/event-loop-trong-javascript-microtask-macrotask-promise-va-cac-cau-hoi-phong-van-pho-bien-GyZJZjrbJjm

### Tổng hợp JavaScript nâng cao

- https://viblo.asia/s/javascript-nang-cao-WR5JRQ1Q4Gv
