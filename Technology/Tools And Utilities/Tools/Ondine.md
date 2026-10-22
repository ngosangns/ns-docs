---
area: technology
domain: diagrams
type: tool
title: Ondine
description: Ondine (wevm/ondine, Rust) biên dịch sơ đồ Mermaid thành SVG từ trước, kèm CLI, plugin Vite cho file .mmd, ondine/remark và WASM tùy chọn. Repo tạo 18/10/2026, npm 0.0.3, 371 sao lúc kiểm tra 23/10/2026. LICENSE trên main là MIT của weth, LLC và ghi phần port từ Pele; LICENSE trong gói npm 0.0.3 không ghi tên chủ bản quyền.
timestamp: "2026-10-23T00:00:00.000Z"
tags:
  - technology
  - diagrams
  - mermaid
  - svg
  - rust
resource: https://github.com/wevm/ondine
---

# Ondine

[Ondine](https://github.com/wevm/ondine) ([ondine.sh](https://ondine.sh)) biên dịch chữ [Mermaid](https://mermaid.js.org) thành SVG. README ghi tagline "Mermaid diagrams, compiled with Rust". Mô tả repo trên GitHub API là "Fast and simple diagrams." Mô tả trong `package.json` và trên npm là "Monochrome Mermaid diagrams, compiled with Rust."

Đối chiếu ngày 23/10/2026. Đã đọc README, `LICENSE` trên `main`, `package.json`, `CHANGELOG.md`, `Cargo.toml`, `rust-toolchain.toml`, catalog trong `pnpm-workspace.yaml`, `crates/compiler/src/diagrams.rs`, `test/vectors/README.md`, phần đầu `test/oracles/README.md` và `test/oracles/Divergences.ts`, `bench/size.md` (không chép số), `.changeset/pele-license.md`, cây file trên API, GitHub API (repo, release, tag, issue, contributor, org), registry npm và file `LICENSE` trong tarball `ondine-0.0.3.tgz`. Trên ondine.sh đã đọc trang chủ, Why Ondine, FAQ, Benchmarks, Getting Started, Mounting, Theming, CLI, In-Browser Compilation và trang Flowchart. Không cài package, không chạy CLI, test hay benchmark, không mở SVG đã render.

|                   |                                                                                                                                                    |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| Tổ chức           | GitHub org `wevm`, mô tả "TypeScript tools for the frontier", blog wevm.dev. Cùng org có `wevm/viem` và `wevm/wagmi`                               |
| Commit            | `jxom` 124, `claude` 63 (hồ sơ GitHub: tên Claude, company `@anthropics`), `github-actions[bot]` 3                                                 |
| Tạo repo          | 2026-10-18T05:51:05Z. Push cuối 2026-10-22T01:50:34Z                                                                                               |
| GitHub            | 371 sao, 17 fork. `open_issues_count` là 3. Search API: 0 issue mở, 3 pull request mở                                                             |
| npm               | `ondine` latest 0.0.3, đăng 2026-10-20T10:47:09Z. Package xuất hiện từ 2026-10-19T18:36:42Z                                                        |
| Ngôn ngữ          | Rust theo GitHub API. `rust-toolchain.toml` kênh 1.97.0, target `wasm32-unknown-unknown`. Cargo edition 2024, `rust-version` 1.97.0              |
| Trang             | https://ondine.sh                                                                                                                                  |

## Cách đưa vào trang

README và Getting Started mô tả các lối vào sau. Mình đọc tài liệu, chưa chạy.

- Biên dịch trước. Vite, CLI, script Node hoặc image Worker tạo SVG. Trang nhận SVG rồi gắn vào DOM.
- Plugin `ondine/vite` biên dịch import `.mmd` và `.mermaid` lúc build.
- CLI `ondine` (bin trong package). Trang CLI mô tả ghi SVG cạnh file nguồn, `--out-dir`, `--ascii`, `--print`, `--svg`, `--worker`, `--restore`, `--check`. File `.md` thì đổi fence `mermaid` thành ảnh. `--llms-full`, `--schema`, `--mcp`, `mcp add` và `skills add` nằm trên trang CLI và trong CHANGELOG 0.0.3.
- `ondine/compiler` có `render` cho Node, script build và server.
- `ondine/remark` thay fence `mermaid` bằng SVG lúc build Markdown hoặc MDX.
- `ondine/compiler/wasm` là compiler trong trình duyệt hoặc edge, người gọi tự đưa module. Trang browser gọi đây là tùy chọn, cho nguồn chỉ có lúc chạy.
- Ảnh cho README: `https://ondine.sh/svg?source=`, `https://ondine.sh/png?source=`, hoặc đường dẫn payload zlib rồi base64url. Trang chủ và CLI nói URL quá 4.096 ký tự thì lỗi. `?scheme=dark` và `?scheme=auto` chọn nền. Mục API trên trang chủ gọi host này là Cloudflare Worker. Repo có `site/wrangler.jsonc`; mình chưa mở file đó.
- Theme bằng biến `--ondine-*` trên `<svg>` hoặc tổ tiên. Trang Theming liệt kê `--ondine-bg`, `--ondine-fg`, `--ondine-line`, `--ondine-border`, `--ondine-muted`, `--ondine-surface`, `--ondine-surface-alt`, `--ondine-accent`, `--ondine-critical`, `--ondine-series-1` đến `-8`, `--ondine-font`, `--ondine-stroke`, `--ondine-radius`, `--ondine-title-weight`, `--ondine-heading-weight`, `--ondine-bold-weight`. FAQ nói theme của Mermaid và `%%{init}%%` không đổi màu Ondine.
- `mount` từ package `ondine` nhét SVG đã biên dịch vào một element. Trang Mounting nói hàm này không import compiler.

Trên main, `package.json` ghi dependency `incur` là `catalog:`, và catalog trong `pnpm-workspace.yaml` ghim `incur` 0.7.1. Bản npm 0.0.3 ghi dependency `incur` 0.7.1. Peer trên bản npm đó, cả hai đều optional: `vite` `^8.3.4` và `@resvg/resvg-wasm` 2.6.2. Catalog trên main ghim cùng hai phiên bản đó. Trang CLI nói `--print` cần peer resvg và một font monospace của máy. `packageManager` trên main là pnpm 11.25.0. Crate Rust trong workspace để `publish = false`, version Cargo `0.0.0`. Bản phát hành mình thấy trên npm là package JavaScript.

CHANGELOG trên main:

- 0.0.1: initial release.
- 0.0.2: thêm `--ascii`.
- 0.0.3: CLI dựng lại trên Incur, giữ đối số cũ, thêm các cờ agent ở trên. Render lỗi hoặc `--check` ghi thêm một dòng tóm tắt ra stdout.

Registry còn `0.0.0-stage` (mô tả "Temporary package placeholder") và `0.0.0` (mô tả "Placeholder"), cùng ngày 19/10/2026, trước 0.0.1.

Release GitHub chỉ có một bản, và là prerelease: tag `preview-aa76ae2f8f9d`, đăng 2026-10-18T06:17:45Z, tên "Melee 0.0.0-preview.aa76ae2f8f9d", asset `melee-0.0.0-preview.aa76ae2f8f9d.tgz`. Thân release nói đây là preview compiler-first, tương thích Mermaid đầy đủ vẫn đang được kiểm, và package này không phải bản đăng npm. Không có release GitHub cho 0.0.1, 0.0.2 hay 0.0.3.

## Loại sơ đồ

Trang chủ ondine.sh có một trang cho mỗi loại dưới đây. `diagrams.rs` hàm `find` đăng ký 33 khóa cho cùng các loại đó. Ba khóa không phải chữ thường của tiêu đề là `gitGraph`, `quadrantChart` và `treeView`. Các khóa còn lại là chữ thường, ví dụ `er`, `journey`, `xychart`, `agentflow`.

- Agent Flow, Architecture, Block, C4, Class, Cynefin, Entity Relationship, Event Modeling, Flowchart, Gantt, Git Graph, Info, Ishikawa, Kanban, Mindmap, Packet, Pie Chart, Quadrant Chart, Radar, Railroad, Requirement, Sankey, Sequence, State, Swimlane, Timeline, Tree View, Treemap, Use Case, User Journey, Venn, Wardley Map, XY Chart.

Trang chủ ghi Mermaid đánh dấu beta với Agent Flow, Architecture, Cynefin, Ishikawa, Radar, Railroad, Swimlane, Tree View, Treemap, Use Case, Venn và Wardley Map. Đó là chữ của trang docs về nhãn của Mermaid. Trang Flowchart mình mở không có mục trạng thái riêng của Ondine. Mình chưa mở hết 33 trang loại.

FAQ nói loại chưa port thì compiler ném `RenderError` mã `unsupported-diagram`. Mình chưa thấy trang docs liệt kê một loại Mermaid nằm ngoài 33 tên trên, và chưa đối chiếu danh sách loại của Mermaid 12.1.0.

Why Ondine nói Ondine nhắm cú pháp đủ của Mermaid 12.1.0, mỗi loại nhận và từ chối cùng đầu vào với Mermaid và dựng cùng model. README, mục Philosophy, nói mọi sơ đồ nhận cùng đầu vào với Mermaid. Catalog pnpm ghim `mermaid` 12.1.0. Coi các câu đó là lời của tác giả. File trong repo nói hẹp hơn:

- `test/oracles/README.md` nói parser được so với Mermaid 12.1.0: cùng quyết định nhận hoặc từ chối và cùng loại phát hiện trên mọi loại; cùng model với 31 loại. Info không có model. Event modeling chỉ tính trạng thái lúc vẽ. Use case dùng parser Chevrotain viết tay trong `mermaid`, nên chỉ suite end-to-end phủ loại đó. Bảng đếm trong file là một lần chạy mặc định ngày 19/10/2026. Mình không chạy lại và không chép bảng.
- Đầu `Divergences.ts` gọi file này là bản ghi chỗ Ondine cố ý parse khác Mermaid 12.1.0. Suite chỉ chấp nhận lệch khi một mục trong file giải thích được. Mình đọc đầu file, chưa đọc hết các mục.

Layout và nét vẽ là của Ondine. FAQ nói khác Mermaid là có chủ đích: viền vuông, cạnh orthogonal bo tròn. FAQ cũng nói SVG thoát chuỗi người viết, không script, không event handler, không tham chiếu ra ngoài, theo mức strict của Mermaid. Mình chưa đọc renderer để kiểm câu an toàn đó.

## Kích thước và tốc độ

Các số dưới đây là chữ trên ondine.sh hoặc README. Mình không đo.

README, Why Ondine, Getting Started và Mounting nói runtime gắn SVG là 210 byte gzip. Trang Benchmarks, bảng "Diagram Size", nói trang chỉ tải runtime `ondine` để mount, kích thước từ bundle esbuild đã minify: gzip 127 byte, brotli 93 byte. Hai chỗ cùng nói về runtime mount và đưa hai số gzip khác nhau. Mình không chọn số nào.

Cùng trang Benchmarks so Ondine với Pele 1.6.0 và Mermaid 12.1.0, 612 vector của 33 loại, Chromium headless 141, commit `1c9f5d6`, máy 4 nhân Intel Xeon 2.10 GHz. Warm render là trung bình mỗi sơ đồ sau khi thư viện đã tải, Ondine dùng module tối ưu tốc độ. Cold render là từ lúc tải thư viện trong trang mới tới sơ đồ đầu, trung bình 33 loại, Ondine dùng module tối ưu kích thước của đúng loại đó. Pele tải qua `pele/lazy`. Mermaid gọi `mermaid.render`.

|        | Ondine | Pele   | Mermaid |
| ------ | ------ | ------ | ------- |
| Warm   | 54.9µs | 151µs  | 36.8ms  |
| Cold   | 34ms   | 55.6ms | 300ms   |
| Gzip   | 127    | 248064 | 1506327 |
| Brotli | 93     | 200236 | 1252410 |

Trang browser nói phần khác, là compiler WASM chứ không phải runtime mount: glue JavaScript khoảng 1 kB gzip, `all.wasm` khoảng 630 kB gzip, entry inline base64 khoảng 830 kB gzip. `bench/size.md` là nhật ký đo module WASM của flowchart. Mình không chạy lại và không lấy số trong file đó làm kích thước sản phẩm.

## So với Pele

[Pele](/Technology/Tools And Utilities/Tools/Pele) (`obsidianmd/pele`) cũng đổi chữ Mermaid thành SVG. Đối chiếu README Pele và GitHub API ngày 23/10/2026: Pele là thư viện TypeScript, `render` đồng bộ, README nói không dependency runtime, theme bằng biến `--pele-*`, nhắm cú pháp Mermaid 12.1.0 với layout riêng. Release GitHub mới nhất của Pele trong lần gọi API này là 1.8.0, đăng 2026-10-20.

Ondine là Rust. Docs mô tả biên dịch SVG từ trước rồi mới mount. Theme là `--ondine-*`. Trang Benchmarks và catalog pnpm ghim so sánh với Pele 1.6.0, tức một bản Pele cũ hơn 1.8.0. `test/vectors/README.md` nói vector được chép nguyên từ Pele tại commit `458322a5b8abb1ae57ddf127c32017ab9fb14a92` (17/10/2026), và ghim Pele 1.6.0 làm mốc cho model đã parse, chất lượng layout, tốc độ và kích thước.

`LICENSE` trên `main` của Ondine có đoạn MIT thứ hai: một phần phần mềm được port từ Pele, copyright 2026 kepano. File `LICENSE` trong tarball npm 0.0.3 không có đoạn đó. Changeset `.changeset/pele-license.md` vẫn nằm trên main, nội dung "Added Pele's copyright and license notice to the published LICENSE", và CHANGELOG chưa ghi mục này trong 0.0.3.

Mình không so SVG của hai bên.

## Giấy phép

Ba nguồn không nói một câu:

- GitHub API, trường license: `Other`, SPDX `NOASSERTION`.
- `LICENSE` trên `main`: MIT, "Copyright (c) 2025-present weth, LLC", rồi notice Pele ở trên. `package.json` và Cargo workspace cũng ghi MIT. npm metadata của 0.0.3 ghi license MIT.
- `package/LICENSE` trong `ondine-0.0.3.tgz`: vẫn là MIT, dòng copyright là "Copyright (c) 2025-present" và không có tên chủ sở hữu, không có notice Pele.

Issue đóng số 6 có tiêu đề "Include Pele's license notice in the published package". Mình chưa đọc thân issue.

Ba pull request đang mở lúc kiểm tra: số 9 "chore: update node", số 8 "chore: version packages", số 5 "Reverse oxidation". Mình chưa đọc diff.

## Chưa làm

- Không cài, không chạy CLI, test oracle, fuzz hay `pnpm bench:compare`.
- Chưa đọc hết `Divergences.ts`, chưa mở hết trang từng loại sơ đồ, chưa đối chiếu danh sách loại với repo Mermaid.
- Chưa kiểm SVG thật, khả năng truy cập, và câu FAQ về escape và không có script.
- Chưa mở `site/wrangler.jsonc`. Hồ sơ GitHub của `jxom` không ghi tên.

Xem thêm [Pele](/Technology/Tools And Utilities/Tools/Pele) và [Diagram Tools](/Technology/Tools And Utilities/Tools/Diagram Tools).
