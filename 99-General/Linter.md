---
relates:
  - "[[Backend - Back-end]]"
  - "[[Frontend - Front-end]]"
  - "[[Microservices]]"
  - "[[Kho chung IT]]"
---
# 1. ESLint

# 2. OXC

Github: https://github.com/oxc-project/oxc

**Oxc** (Oxidation Compiler) is a comprehensive collection of high-performance JavaScript and TypeScript tools written in Rust. It aims to provide fast, reliable, and scalable tooling for JavaScript ecosystems, including parsing, linting, formatting, transforming, minifying, and module resolution.

## 2.1. Key Features and Components

### 2.1.1. Parser and AST

- Oxc includes its own JavaScript and TypeScript parser supporting JSX and TSX.
- The parser is one of the fastest Rust-based parsers available, outperforming competitors like swc (3x faster) and Biome (5x faster).
- Uses memory arena allocation and compact string storage for performance.
- The AST design is more precise than estree, removing ambiguous nodes and aligning closely with ECMAScript specifications (e.g., distinct types for identifiers).
- Parser delegates scope binding and symbol resolution to a semantic analyzer for efficiency.

### 2.1.2. Linter (oxlint)

- Comes with 93 rules enabled by default out of 430+ total.
- Requires no configuration to start; can be run immediately with `npx oxlint@latest`.
- Extremely fast, 50-100x faster than ESLint, scales with CPU cores.
- Binary size is about 5MB, much smaller than ESLint plus plugins.
- Can be used standalone without Node.js, suitable for CI environments.

### 2.1.3. Resolver (oxc_resolver)

- Handles JavaScript module resolution, crucial for multi-file analysis and bundling.
- Production-ready and used by projects like Rolldown.

### 2.1.4. Transformer (oxc-transform)

- Transforms modern ECMAScript to older versions for compatibility.
- Supports TypeScript and React transformations.
- Available for experimentation.

### 2.1.5. Minifier

- Aims to deliver fast minification without sacrificing compression quality.
- Prototype in progress, porting test cases from popular minifiers (Google Closure Compiler, terser, esbuild).
- Targets faster minification times with high compression.

### 2.1.6. Formatter

- Research ongoing to create a flexible, less opinionated formatter alternative to Prettier.
- Prototype is under development.

### 2.1.7. Isolated Declarations

- Emits TypeScript declarations without using the TypeScript compiler.
- Benchmark shows it is at least 20x faster than the official TypeScript compiler.

## 2.2. Performance Highlights

- Parser is the fastest Rust-based JavaScript/TypeScript parser.
- Linter is massively faster than ESLint, benefiting from multi-threading and efficient AST traversal.
- Rust compilation speed is optimized to minimize developer workflow impact.
- Linter can lint thousands of files in under a second to a few seconds depending on size.

## 2.3. Usage and Integration

- Rust crates available individually and as an umbrella crate `oxc`.
- Node.js bindings via N-API for parser and transformer.
- WebAssembly packages available for parser.
- Used by notable projects and companies such as Rolldown, Nova engine, Preact, Shopify, ByteDance, Shopee, Biome, and swc-node.

## 2.4. Development and Testing

- Strong emphasis on correctness and reliability.
- Extensive test infrastructure includes:
  - Conformance testing with Test262, Babel, TypeScript.
  - Fuzzing.
  - Linter snapshot diagnostics.
  - Idempotency testing.
  - Code coverage.
  - End-to-end testing on top 3000 npm packages.

## 2.5. Community and Contribution

- Open source under the MIT License.
- Over 15k stars and 221 contributors.
- Encourages contributions via GitHub issues, Discord, and social media.
- Provides learning resources such as tutorials and articles on JavaScript parsing and compiler performance.

## 2.6. Sponsorship and Credits

- Sponsored via GitHub Sponsors and Open Collective.
- Mentored and inspired by projects like Biome, Ruff, quick-lint-js, elm-review.
- Special thanks to key contributors for bootstrapping and design.

This summary encapsulates the main aspects of the oxc project, its tools, performance, usage, and community engagement as described on the GitHub repository[1].
