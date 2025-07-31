---
relates:
  - "[[Frontend - Front-end]]"
---
# 1. JavaScript
## 1.1. Khái niệm cốt lõi & Nâng cao
### 1.1.1. Cơ chế bất đồng bộ

- Giải thích: Call stack, event loop, callback queue (macrotask), job queue (microtask).
- Nguồn: https://viblo.asia/p/javascript-chay-bat-dong-bo-nhu-the-nao-gDVK2JW0KLj
- Chi tiết Event Loop, Microtask, Macrotask, Promise:
	- Giải thích: Sự khác biệt và thứ tự ưu tiên giữa microtask (ví dụ: `Promise.then`, `queueMicrotask`) và macrotask (ví dụ: `setTimeout`, `setInterval`, I/O).
	- Nguồn: https://viblo.asia/p/event-loop-trong-javascript-microtask-macrotask-promise-va-cac-cau-hoi-phong-van-pho-bien-GyZJZjrbJjm
### 1.1.2. Tính năng mới ECMAScript (ES)

- ES2024 (ES15): `Promise.withResolvers()`, `Object.groupBy()`, `Map.groupBy()`, `Atomics.waitAsync()`, `String.prototype.isWellFormed()`, `String.prototype.toWellFormed()`, `ResizableArrayBuffer`, `GrowableSharedArrayBuffer`.
- Nguồn:
	- https://viblo.asia/p/5-tinh-nang-javascript-moi-tuyet-voi-trong-es15-2024-GAWVpMzX405
	- https://medium.com/@yourfuse/javascript-whats-new-with-ecmascript-2024-es15-ef056d2f4bf1
### 1.1.3. Kỹ thuật tối ưu hóa

- Nội dung: Memoization, debouncing, throttling, lazy loading, Virtual DOM, tree shaking, code splitting, Web Workers, tránh rò rỉ bộ nhớ, tối ưu vòng lặp/điều kiện, cấu trúc dữ liệu hiệu quả, minify, nén mã.
- Nguồn: https://medium.com/globant/javascript-optimization-techniques-20d8d167dadd
### 1.1.4. JSDoc

- Mô tả: Công cụ tạo tài liệu API cho mã JavaScript từ comments.
- Trang chủ: https://jsdoc.app
### 1.1.5. Chủ đề nâng cao (Tổng hợp)

- Nội dung: Scope, closure, hoisting, `this`, prototype, class, async/await, event loop, quản lý bộ nhớ, design patterns.
- Nguồn: https://viblo.asia/s/javascript-nang-cao-WR5JRQ1Q4Gv

### 1.1.6. Câu hỏi phỏng vấn

- Nội dung: Kiểu dữ liệu, scope, closure, hoisting, `this`, promises, async/await, event loop, DOM, ES6+, lỗi.
- Nguồn: https://viblo.asia/p/top-30-cau-hoi-phong-van-javascript-cuc-chat-cho-nam-2024-EoW4oX29Jml

# 2. TypeScript

## 2.1. Kiến thức & Kỹ thuật

### 2.1.1. Mẹo và thủ thuật nâng cao

- Nội dung: Toán tử `satisfies`, template literal types, conditional types, mapped types, utility types (`Omit`, `Pick`, `Partial`, etc.), `infer`, `unknown` vs `any`, type guards, assertion functions, `const` assertions.
- Nguồn: https://dev.to/mattlewandowski93/15-advanced-typescript-tips-and-tricks-you-might-not-know-12kk
### 2.1.2. Bí kíp về Types

- Nội dung: Utility Types, Conditional Types, Mapped Types, Template Literal Types, `infer`, `keyof`, `typeof`, Indexed Access Types, `as const`, Type Predicates, `unknown`, `never`, Discriminated Unions, Branding/Nominal Typing, `satisfies`.
- Nguồn:
	- https://viblo.asia/p/20-bi-kip-typescript-ma-moi-lap-trinh-vien-deu-nen-biet-obA46wMGJKv
	- https://medium.com/@sm_hemel/advanced-typescript-you-need-to-know-5d1fa043b35f
### 2.1.3. So sánh HOC và Decorator Pattern

- Thảo luận: Sự khác biệt, trường hợp sử dụng của Higher Order Components và Decorator Pattern trong JS/TS.
- Nguồn: https://viblo.asia/p/tai-sao-co-higher-order-component-hoc-khi-da-co-decorator-pattern-AZoJjX17VY7?fbclid=IwAR32QGcKM393UNB3mUpJ6DIcvO4oiJLaK1umt6b9rJcyNanvVk48PzmdbEQ

## 2.2. Thư viện & Công cụ liên quan

### 2.2.1. tRPC

- Mô tả: Xây dựng API typesafe end-to-end không cần sinh mã hay schema riêng.
- GitHub: https://github.com/trpc/trpc

### 2.2.2. reflect-metadata

- Mô tả: Polyfill cho API Reflection Metadata, dùng với Decorators để thêm metadata.
- GitHub: https://github.com/rbuckton/reflect-metadata

# 3. Công cụ Xây dựng & Môi trường Runtime

## 3.1. Hệ sinh thái ByteDance Web Infra

1. Giới thiệu: Bộ công cụ xây dựng web hiệu suất cao từ ByteDance, giải quyết vấn đề thời gian build cho monorepo lớn.
2. Rspack
	- Mô tả: Bundler web hiệu suất cao dựa trên Rust, tương thích Webpack.
	- Trang chủ: https://www.rspack.dev/
3. Rsbuild
	- Mô tả: Công cụ build dựa trên Rspack, cung cấp trải nghiệm phát triển out-of-the-box.
	- Trang chủ: https://rsbuild.dev/
4. Rspress
	- Mô tả: Trình tạo trang web tĩnh nhanh và mạnh mẽ, dựa trên Rspack.
	- Trang chủ: https://rspress.dev/
5. Rslib
	- Mô tả: Công cụ xây dựng thư viện, tích hợp trong Rsbuild.
6. Rsdoctor
	- Mô tả: Công cụ phân tích và chẩn đoán lỗi build cho Rspack/Webpack.
	- Trang chủ: https://rsdoctor.dev/
7. Awesome Rspack
	- Mô tả: Danh sách tổng hợp tài nguyên, plugin, công cụ cho Rspack.
	- GitHub: https://github.com/rspack-contrib/awesome-rspack

## 3.2. Runtimes & Bundlers khác

### 3.2.1. Bun

- Mô tả: Runtime JavaScript đa năng, nhanh chóng (bundler, transpiler, task runner, npm client).
- Trang chủ: https://bun.sh

## 3.3. Quản lý Monorepo

### 3.3.1. Lerna

- Mô tả: Công cụ quản lý dự án JavaScript với nhiều package (monorepo).
- Trang chủ: https://lerna.js.org
- Tài liệu tham khảo:
	- Hướng dẫn Vue.js monorepo với Lerna: https://dev.to/vcpablo/vuejs-building-a-monorepo-using-lerna-1h1c
	- Ví dụ dự án: https://github.com/vcpablo/vuejs-lerna-monorepo

# 4. Thư viện (Libraries)

## 4.1. HTTP Client

1. Alova
	- Mô tả: Thư viện request nhẹ, tập trung vào chiến lược request, quản lý trạng thái, cache cho Vue, React, Svelte.
	- GitHub: https://github.com/alovajs/alova

## 4.2. Service Workers & Edge Computing

1. WinterJS
	- Mô tả: Runtime JavaScript siêu nhanh cho service workers, xây dựng trên Wasmer, tương thích API Cloudflare Workers.
	- GitHub: https://github.com/wasmerio/winterjs

## 4.3. Xử lý Dữ liệu

1. SheetJS
	- Mô tả: Đọc, ghi, thao tác với nhiều định dạng bảng tính (Excel XLSX, XLS, CSV).
	- GitHub: https://github.com/SheetJS/sheetjs

## 4.4. Đồ họa & Thiết kế Tính toán

1. thi-ng/umbrella
	- Mô tả: Bộ sưu tập 180+ gói ES6 TypeScript đa nền tảng cho thiết kế tính toán, xử lý dữ liệu, đồ họa.
	- GitHub: https://github.com/thi-ng/umbrella

## 4.5. Validation (Kiểm tra dữ liệu)

1. Typia
	- Mô tả: Validator và serializer siêu nhanh cho TypeScript, không runtime reflection.
	- GitHub: https://github.com/samchon/typia
2. Superstruct
	- Mô tả: Thư viện xác thực dữ liệu JS/TS đơn giản, linh hoạt.
	- GitHub: https://github.com/ianstormtaylor/superstruct
3. Zod
	- Mô tả: Thư viện khai báo và xác thực schema dựa trên TypeScript, tập trung vào DX.
	- GitHub: https://github.com/colinhacks/zod

# 5. Frameworks

## 5.1. Web Frameworks

1. Hono
	- Mô tả: Framework web siêu nhanh, nhẹ, đa nền tảng (Cloudflare Workers, Fastly, Deno, Bun, Node.js).
	- GitHub: https://github.com/honojs/hono

# 6. Công cụ Phát triển (Development Tools)

## 6.1. Scaffold a project

- https://github.com/AmanVarshney01/create-better-t-stack

## 6.2. Phân tích & Trực quan hóa Mã

1. tsplot
	- Mô tả: Tạo sơ đồ quan hệ class từ mã nguồn TypeScript.
	- GitHub: https://github.com/JanUnld/tsplot

## 6.3. CI & Code Review

1. Danger
	- Mô tả: Tự động hóa kiểm tra trong quá trình review code (PRs) bằng quy tắc JS/TS.
	- Trang chủ: https://danger.systems



