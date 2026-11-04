---
area: technology
domain: utility-tools
type: tool
title: RustGIS
description: "RustGIS (opengeos/RustGIS, Apache-2.0) is a GIS with a desktop app, a CLI, a browser build, and a Python package that share one command registry. Checked 4 November 2026 on main 19a47ea, which still sets workspace version 0.5.0. GitHub release v0.5.0 and PyPI rustgis 0.5.0 were published 31 October 2026. docs/architecture.md says the engine runs without GDAL, while SQLite, a Zstandard decoder, and optional GDAL, DuckDB, and geolibre programs sit outside that claim."
timestamp: "2026-11-04T00:00:00.000Z"
tags:
  - technology
  - utility-tools
  - gis
  - rust
  - geospatial
resource: https://github.com/opengeos/RustGIS
sources:
  - id: github
    resource: https://github.com/opengeos/RustGIS
    author: human:giswqs
  - id: pypi
    resource: https://pypi.org/project/rustgis/
  - id: architecture
    resource: https://github.com/opengeos/RustGIS/blob/main/docs/architecture.md
---

# RustGIS

[RustGIS](https://github.com/opengeos/RustGIS) is a GIS from the GitHub organization opengeos. The same engine drives a desktop app, `rustgis-cli`, a WebAssembly app at [web.rustgis.app](https://web.rustgis.app), and the PyPI package `rustgis`. Docs site is [rustgis.app](https://rustgis.app). Checked 4 November 2026 on `main` at `19a47ea244f1680ef2460ea9bdc8ae1833edbf4a`. This note did not clone the repo, did not run Cargo, did not install the Python package, and did not open the web app.

The README calls every ribbon button a command id. `docs/architecture.md` says the ribbon, shortcuts, command search, CLI, and Python all call `Session::run`. UI-only commands use the `ui.*` prefix and live in `crates/ui-egui`. Plugin commands use `plugin:<plugin>/<command>`.

## Who publishes it

The GitHub API the same day reported owner `opengeos`, created 10 October 2026, pushed 4 November 2026 at 10:02 UTC, default branch `main`, language Rust, license Apache-2.0, 2296 stars, 337 forks, 97 open issues, and 21 subscribers. Homepage is `https://rustgis.app`. Topics are geospatial, gis, remote-sensing, rust, and rust-lang. The public description is "A fast, free and open-source GIS in pure Rust." That speed wording is the project's own line. This check did not measure it.

PyPI `rustgis` 0.5.0 lists author email Qiusheng Wu, `giswqs@gmail.com`, requires Python 3.12 or newer, and uses classifier Development Status 3, Alpha. The GitHub release `v0.5.0` was published 31 October 2026 at 22:30 UTC by `giswqs`, on commit `a5603d1b2906b1c204b6b97c2eb01ac094a20adf`. PyPI uploaded the 0.5.0 files the same evening, starting 22:42 UTC. Earlier PyPI versions are 0.2.0 on 13 October, 0.3.0 on 16 October, and 0.4.0 on 25 October 2026. The release has 31 assets, including desktop packages for Windows, macOS, and Linux, six Python wheels, an sdist, `RustGIS-0.5.0-web.zip`, and `SHA256SUMS`.

`HEAD` on 4 November 2026 is newer than that tag. The commit subject starts "feat(data): open a Shapefile by its .shp address". The workspace `Cargo.toml` on that commit still sets `version` to `0.5.0`, edition 2024, `rust-version` 1.90, and license Apache-2.0.

The README disclaimer says RustGIS is primarily built with Claude Opus 5.5 under human direction and review, and that users should check results. The README citation block names a Zenodo concept DOI, 10.5281/zenodo.23633281. This check did not open Zenodo.

The same organization also publishes `rustgis-web`, `rustgis-plugins`, and `rustgis-preview`. Those names showed up on the organization repository list. This note did not audit them, and it did not search every other owner for the name RustGIS.

## Where the code lives

The workspace members are `crates/*`, `apps/*`, and `xtask`. Default members are the crates, `apps/rustgis`, `apps/rustgis-cli`, and `xtask`.

`docs/architecture.md` and the README architecture table agree on these layers.

| Layer | Crate | Job in the architecture doc |
| --- | --- | --- |
| L0 | `rustgis-geom` | Coordinates, extents, Web Mercator, geodesic distance and area, scale |
| L1 | `rustgis-data` | Features, attributes, file readers, SQL where clauses, rasters, and live database providers |
| L2 | `rustgis-map`, `rustgis-analysis` | Layers, symbology, labeling, camera, basemaps, and geoprocessing |
| L2 | `rustgis-tiles` | XYZ, TMS, WMS, vector tiles, PMTiles, MBTiles, MapLibre styles, tile cache |
| L3 | `rustgis-render` | tiny-skia drawing, label placement, PNG export, fonts |
| L3 | `rustgis-plugins` | WebAssembly plugins, and on the desktop also process plugins |
| L3 | `rustgis-geolibre` | GeoLibre tools as geoprocessing tools |
| L4 | `rustgis-engine` | Session, undo, command registry, sample project |
| L5 | `rustgis-assistant` | Chat agent that acts through commands |
| L6 | `rustgis-ui-egui` | Ribbon front end |

`Cargo.toml` also depends on `rustgis-keychain`. The architecture doc's layer table does not list that crate. The Secrets section says only `rustgis-keychain` talks to the OS credential store. Apps named in the table are `rustgis`, `rustgis-cli`, `rustgis-web`, and `rustgis-python`.

Workspace lints set `unsafe_code` to forbid. The architecture doc says `cargo xtask ci` runs formatting, clippy, tests, and a layering check. This check did not run that command.

A comment on `[profile.web]` says whole-program LTO makes the WebAssembly about a sixth smaller. That figure is the comment. This check did not build the web target or measure the binary.

## How a command runs

A command is a `CommandSpec` with an id, a label, a ribbon location, a shortcut, parameters, an enabled check, and a `run` function. Mutating commands snapshot the project for undo. The architecture doc says undo covers project state, and does not roll back a file that was already written.

The README quick start, not executed here, shows three entry points. `cargo run --release -p rustgis` starts the desktop app. `rustgis-cli run` sends JSON command payloads. Python does `rustgis.Session(sample=True)` and then `s.run(...)`. The README says a project file uses the `.rgis` suffix and that the desktop app can open it.

The README features table is long. It names vector and raster readers, maps and layouts, web services, editing, analysis, an AI assistant, plugins, and a 20-language interface. The "over 1,000 GeoLibre and Whitebox tools" line and the "20 languages" badge are README claims. This check did not count tools or locale files.

The README privacy paragraph says files stay on the machine unless the user asks for the network. Named network uses are web basemaps, plugins, the GeoLibre tools, and an AI model the user picks. The assistant section names Anthropic, OpenAI, Gemini, OpenRouter, Ollama, and any OpenAI-compatible model, plus `rustgis-cli mcp`.

## What pure Rust leaves out

`docs/architecture.md`, section Pure Rust, says the engine and apps are written in Rust and run without GDAL, PROJ, or another GIS library installed. The same section then lists exceptions.

Optional programs, called when they are installed on the desktop, are GDAL for extra raster formats, DuckDB for queries, and the `geolibre` program for the GeoLibre tools. In the browser, the doc says those GeoLibre tools run through geolibre-rust's WASI runner instead. `docs/installation.md` says process plugins, GDAL formats, and DuckDB need the desktop app or `rustgis-cli`.

Dependencies that compile C into the build, from that same Pure Rust section, are the Zstandard decoder `zstd-sys` on desktop and browser, SQLite through `rusqlite` on desktop, TLS libraries `aws-lc-sys` and `ring` on desktop, and GeographicLib geodesic code for the azimuthal equidistant projection on desktop. `docs/installation.md` says a from-source build needs Rust 1.90 or later, a C compiler, and `curl` for the sample data. The web build needs clang for the Zstandard decoder.

`Cargo.toml` comments match the desktop split. GeoParquet and FlatGeobuf are described there as more portable. GeoPackage uses bundled SQLite and is desktop only. PostGIS, MySQL, and SQL Server use the Rust clients `postgres`, `mysql`, and `tiberius` with rustls.

## Gotchas

`main` on 4 November 2026 is past the `v0.5.0` tag and still prints version `0.5.0` in the workspace file. A build from `main` and the 31 October release are not the same commit.

PyPI marks the package Alpha. The repository was created on 10 October 2026.

WebAssembly plugins are sandboxed. The architecture doc says process plugins use the same host protocol and are not sandboxed.

`docs/installation.md` says the macOS app is signed and notarized, and that the Windows `setup.exe`, `.msi`, and portable zip on the release page are not signed. The `.msix` on the release page is unsigned. The Store build is the signed one. Store id in the README and the install doc is `9ppjw8h561lq`. winget id `OpenGeos.RustGIS` is documented as x64 only.

The install doc also says `ghcr.io/opengeos/rustgis` serves the web app, tag `latest` or `edge` tracks `main`, and release images start at 0.5.0. `ghcr.io/opengeos/rustgis-cli` does not include GDAL, DuckDB, or GeoLibre. This check did not pull those images.

The README says screenshots were rendered by `cargo run -p rustgis-ui-egui --example ui_shot`. This check did not run that example.

## What this check did not do

No clone, no `cargo` build or test, no `pip install`, no browser session on rustgis.app or web.rustgis.app, no plugin sandbox source read, no tool count, and no locale count. Package-manager install lines are copied from `docs/installation.md` and were not run.
