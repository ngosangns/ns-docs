---
area: technology
domain: programming-languages
type: tool
title: Rul
description: "Rul (rul-lang/rul, .rl) is a dependency-free Rust engine in which an AI agent emits a 128-bit-per-node SSA dataflow graph of f64 columnar ops, a single forward pass verifies it, three execution tiers run it, and a 991-line emitter writes a standalone Linux x86-64 ELF with no LLVM or libc. The 192 B program and 817 B ELF are real; the 5.78 ns/node and 6.38 µs headline figures did not reproduce (19.4 ns/node, 19.7 µs on Apple silicon), and the 'language' has 15 opcodes, no control flow, and a stub I/O op."
timestamp: "2026-10-28T00:00:00.000Z"
tags:
  - technology
  - programming-languages
  - compilers
  - ai-agents
  - simd
  - binary-format
  - rust
resource: https://github.com/rul-lang/rul
---

# Rul

[Rul](https://github.com/rul-lang/rul) (`.rl`, "Rule-Carrying Unified Linear Graph") is a **columnar dataflow format plus execution engine** written as one dependency-free Rust crate, pitched as a programming language for autonomous AI agents. The thesis: humans and LLMs should not write text source at all; the agent emits a fixed 16-byte frame per instruction carrying algorithm, schedule hint and safety witness, a single forward pass verifies the graph, and a hand-written x86-64 emitter writes a standalone Linux executable. Creator is Tran Trong Tri (Tymon Tran).

The repo was created 2026-10-28 with six commits over two days. Checked the same day by reading `src/` (8,542 lines), building with `cargo build --release`, running `cargo test --release` and `rul-bench` on an Apple-silicon Mac.

|                  |                                                                                                   |
| ---------------- | ------------------------------------------------------------------------------------------------- |
| License          | MIT OR Apache-2.0                                                                                 |
| Created / pushed | 2026-10-27 / 2026-10-28, 6 commits                                                                |
| GitHub           | 11 stars, 2 forks                                                                                 |
| Language         | Rust 2021, **zero dependencies**, 8,542 lines                                                     |
| Paper            | self-published whitepaper, DOI [10.5281/zenodo.23722094](https://doi.org/10.5281/zenodo.23722094) |
| Extra            | `.ots` OpenTimestamps on spec/whitepaper; spec partly written in Vietnamese                       |

## What it actually is

A 15-opcode bytecode over `f64` / `i64` / bool-mask columns: `ArenaInput`, `ConstF64`, `ArenaSlice`, `ArenaMutate`, `Add`, `Sub`, `Mul`, `CmpGt`, `SelectZero`, `FilterCompact`, `ReduceSum`, `ReduceMax`, `Gather`, `RingEnqueue`, `AssertContract`. A `.rl` image is a 64-byte header, 16-byte arena descriptors, 16-byte proof entries, then 16-byte `NodeFrame`s.

That is a **fused filter/map/reduce query kernel IR**, not a general-purpose language. There is no control flow, no functions, no user-defined types, no strings, and no real I/O: `RingEnqueue` returns its operand unchanged, and `GpuDma` is only an enum label. The 10-million-row demo is seven nodes — header, one arena descriptor and 112 bytes of frames — which is why the program is 192 B.

The practical interface is not binary either. All five `rul-mcp` tools take `.rls` **text** (`rls_source`), and the crate ships a `.rls` assembler plus a symbolic builder with `"$name"` anchors, so "the AI never emits syntax" means "the AI emits a much smaller syntax".

## The four pieces that are real

- **Verifier** (`src/verifier.rs`) — one forward loop that enforces `in_a < idx` (topology, hence termination), shape/type agreement, per-arena token versions (`ReadLease` / `AffineConsume`), `ProofEntry` bounds for slice/gather, and the header capability mask. Measured **19.38 ns/node** (193.84 µs for 10,000 nodes) here; the README claims 5.78 ns/node on x86-64 and the whitepaper says ~46 ns/node, so the three sources disagree.
- **Three execution tiers** (`src/engine.rs`) — a reference interpreter, columnar stencils, and a tile-fused engine with L1 zone-map skipping and `std::thread::scope` parallelism. "Zero intermediate heap" means no materialised columns between stages; each tile still runs over a per-node register file (`vec![[f64; 4096]; node_count]`).
- **AOT emitter** (`src/aot.rs`, 991 lines) — writes an `ET_EXEC` ELF64 with a single `PT_LOAD`, raw `syscall` instructions and AVX2 `YMM` sequences, no libc, no linker, no LLVM. It only accepts a graph ending in exactly one `ReduceSum`/`ReduceMax`, and takes the scalar path when a `Gather` or `FilterCompact` is present.
- **Autotuner and diagnostics** — `autotune_schedule` sweeps policies against the interpreter and returns a reward score; failures come back as structured frames rather than text spans.

On macOS the emitted ELF exits with 126, so 3 of 15 tests fail there (`test_aot_*` and the 10-pipeline suite) and `rul-bench` aborts after printing its table. 12 of 15 pass.

## Measured benchmark

`rul-bench`, 10M `f64` (80 MB SoA), median of 15 runs:

| Implementation                         | Median    | Effective BW | vs 8-acc |
| -------------------------------------- | --------- | ------------ | -------- |
| [A] Legacy AoS + `collect()`           | 432.39 ms | 0.19 GB/s    | 0.05x    |
| [B] Idiomatic Rust SoA                 | 83.55 ms  | 0.96 GB/s    | 0.27x    |
| [C] "Hand-written C" 8-accumulator SoA | 22.58 ms  | 3.54 GB/s    | 1.00x    |
| [D] Rul Tier 2 fused SIMD, 1 core      | 9.26 ms   | 8.64 GB/s    | 2.44x    |
| [E] Rul Tier 2 auto-multicore          | 2.97 ms   | 26.93 GB/s   | 7.60x    |
| [F] Rul Tier 2 multicore + L1 zone map | 1.57 ms   | 50.97 GB/s   | 14.39x   |

Read the last row carefully:

- **[F] processes a sorted copy of the column; [A]–[E] process the unsorted one.** Zone-map tile skipping genuinely works, but it is not the same work, so the 14x is not a like-for-like speedup.
- **[C] is `run_handwritten_c_8acc_soa`, a Rust function in the same bench file**, branchless via `mask * (x * x)`; there is no external C build to compare against.
- Per-row spread (min..max) is 3–6x on a laptop, and the README's x86 numbers (5.91 ms / 25.04 / 51.53 GB/s) differ from both the whitepaper and this run.
- "3,000x smaller binary" and "10,000x faster than Go" compare a 192-byte seven-node graph and a 817-byte ELF against whole programs that carry a runtime.

## Assessment

**Genuine work:** a verifier, three execution tiers that agree, a `.rls` assembler, an MCP server and a from-scratch ELF emitter — all in under 9k lines with no dependencies. As a compact reference implementation of a proof-carrying vector pipeline it is worth reading.

**Oversold framing:** calling a 15-opcode columnar IR a "programming language" is rhetorical, and "zero syntax" is contradicted by the `.rls` text its own MCP tools accept. "Proof-carrying" here means per-node bounds and ownership annotations, not a proof system in the sense of proof-carrying code (Necula, 1996). Safety claims hold only because the op set is too small to express the bugs they claim to prevent.

**No related work.** Every ingredient has prior art — vectorized and columnar execution with min/max pruning (MonetDB/X100, DuckDB, Parquet/ORC zone maps), kernel fusion (Halide, TVM), SSA bytecode (LLVM IR, eBPF, WASM), tiny static executables (TCC, Cosmopolitan). None is cited or compared. A Zenodo DOI is an upload, not peer review, and the `.ots` files prove _when_ the text existed, not that it is correct.

**Numbers drift** between README, whitepaper and the code's own bench output; regenerate them from a single run before quoting anything.

> **See also:** [C And Cpp](/Technology/Programming Languages/Tools/C And Cpp)
