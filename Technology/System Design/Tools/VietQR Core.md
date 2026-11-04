---
area: technology
domain: payments
type: tool
title: VietQR Core
description: "Independent MIT .NET library at Ngochiendev/vietqr-core that builds a NAPAS247 VietQR string in process and can render PNG, WebP, or SVG. Checked 4 November 2026 on main 1b92450. NuGet VietQR.Core 1.0.8 was published 31 October 2026. The deeplink package calls the author's gateway. The vietqr.io notice names a library called vietqr-core and does not link this repository."
timestamp: "2026-11-04T00:00:00.000Z"
tags:
  - technology
  - payments
  - dotnet
  - vietqr
resource: https://github.com/Ngochiendev/vietqr-core
sources:
  - id: github
    resource: https://github.com/Ngochiendev/vietqr-core
    author: human:Ngochiendev
  - id: nuget-core
    resource: https://www.nuget.org/packages/VietQR.Core
  - id: vietqr-notice
    resource: https://www.vietqr.io/thong-bao-cap-nhat
---

# VietQR Core

[VietQR Core](https://github.com/Ngochiendev/vietqr-core) is a C# library that turns a bank BIN, an account or card number, an optional amount, and an optional transfer note into a NAPAS247 payload, then can draw that payload as PNG, WebP, or SVG. The string itself is built in the calling process. Checked 4 November 2026 on `main` at `1b924505`. This note did not clone the repo, did not run `dotnet`, and did not call the public demo.

The library does not watch a bank account and does not mark an order paid. That job is still the matcher in [Bank Transfer Payment](/Technology/System Design/Practices/Bank Transfer Payment). The portal already listed in the system-design notes is [vietqr.net](https://vietqr.net). This repository is a third thing.

## Who publishes it

The GitHub API the same day reported owner `Ngochiendev`, created 28 October 2026, pushed 4 November 2026, default branch `main`, language C#, license MIT, 66 stars, 48 forks, and 0 open issues. The repository page showed 62 commits. `Directory.Build.props` sets company `Ngochiendev` and copyright 2026 Ngochiendev. NuGet author on `VietQR.Core` is Hien Dev. The project URL on the 1.0.8 catalog entry is this GitHub repository.

`DISCLAIMER.md` says the names and logos VietQR, NAPAS, and NAPAS247 belong to NAPAS, and that the code is an independent tool shipped as-is. The file also cites the State Bank QR base standard, the NAPAS VietQR format terms version 1.0 from September 2021, and EMVCo merchant-presented QR.

The page [Thông báo cập nhật VietQR Payment Kit](https://www.vietqr.io/thong-bao-cap-nhat) is titled VietQR Kit by Casso. It dates a change to 12:00 on 14 October 2026. It says only `api.vietqr.io/v2/generate` stops on 1 January 2027, that the endpoint keeps working through 31 December 2026, and that Quicklink, the portal, and the other VietQR APIs stay up. It tells the reader to switch to a library named `vietqr-core` and generate the code on their own system. The page does not link a GitHub repository or a NuGet id. This repository was created 14 days after that announcement date. Treat the shared name as a name collision to check, not as a statement that NAPAS or Casso maintain `Ngochiendev/vietqr-core`.

Two other public packages use a similar name. `vanvixi/vietqr.dart` publishes the Dart package `vietqr_core`. `vietqr/vietqr-node` is a JavaScript client that takes a client id and an API key. Neither is this .NET library.

## Where the code lives

The solution has three projects under `src`.

| Project | Role | Package checked 4 November 2026 |
| --- | --- | --- |
| `VietQR.Core` | EMV payload, bank catalog, PNG, WebP, and SVG render, parse and decode. | NuGet `VietQR.Core` 1.0.8, listed, published 31 October 2026. Targets `net6.0`, `net8.0`, `net9.0`, and `net10.0`. |
| `VietQR.Deeplink.Client` | HTTP client that asks a gateway for a bank-app link. | NuGet `VietQR.Deeplink.Client` 1.0.6, listed, published 3 November 2026. GitHub release `client-v1.0.6` the same day. |
| `VietQR.Api` | ASP.NET host with Swagger. README says `dotnet run --project src/VietQR.Api` and `http://localhost:5000/swagger`. | Not packed as the library. Not run for this note. |

`src/VietQR.Core/VietQR.Core.csproj` on `main` still says `<Version>1.0.1</Version>`. It imports `version.props` only when that file exists. A fetch of `version.props` on `main` returned 404. The published 1.0.8 package is ahead of the version string in that csproj. `net6.0` and `net8.0` are always in `TargetFrameworks`. `net9.0` and `net10.0` are added when the SDK is at least 9.0.100. The 1.0.8 nupkg lists all four.

Direct references in that csproj are `QRCoder` 1.8.1, `SkiaSharp` 4.153.1 with the macOS, Win32, and Linux native-asset packages at the same version, `ZXing.Net` 0.16.9, and `Microsoft.Extensions` abstractions plus options at 8.0.0. PNG and WebP rendering go through Skia. The root README says `VietQrSvgRenderer.Render` is plain C# and does not need the Skia native library. This note did not open that renderer file.

Install lines from the README are `dotnet add package VietQR.Core` and `dotnet add package VietQR.Deeplink.Client`.

## How a payload is built

`VietQr` in `src/VietQR.Core/Emv/VietQr.cs` writes EMV TLV. The constants on that file are the payload format `000201`, static initiation `010211`, dynamic initiation `010212`, NAPAS AID `A000000727`, service code `QRIBFTTA` for an account, service code `QRIBFTTC` for a card, currency tag `5303704` for VND, and country `5802VN`. Tag 63 is the CRC16. The deeplink client calls `VietQr.VerifyCRC` and refuses to post a string that fails it.

`VietQrPayload.Create` takes a 6-digit BIN, an account or card id, an optional amount, an optional description, and a service type. The README default service type is account. Card transfers need `VietQrServiceType.Card` so the service code is `QRIBFTTC`. An empty amount is a static QR. The payer types the amount in the banking app. A positive amount is a dynamic QR.

The account or card id must be non-empty and at most 25 characters. Longer input throws `ArgumentException`. `SetAdditionalData` strips Vietnamese diacritics, then slices three tag 62 subfields to 25 characters each. Subfield 01 is the bill number, 05 is the reference label, and 08 is the purpose, which is the transfer note. Each slice is also capped by the room left under a 99-character inner field. Setting a bill number or a reference label flips the payload to dynamic unless the caller already overrode the initiation method. The root README table says the description allows 95 characters on tag 62.08. The method that writes tag 62.08 slices at 25. Trust the method.

Merchant name, tag 59, is sliced at 25 characters and uppercased without diacritics. Merchant city, tag 60, is sliced at 15. The comment default is `HANOI`.

The embedded catalog is `VietQR.Core.Resources.banks.json`, loaded by `EmbeddedBankCatalog` with no network call. On `main` the `data` array has 76 objects and 76 distinct `bin` values. Lookup is by BIN, `code`, or `shortName`. The README's "76+" matches that file. This count is every row, not a count of rows whose `transferSupported` flag is true.

Image options in the README default to template `compact`, format PNG, size 500, and quality 100. The documented template names are `compact`, `print`, and `qr_only`. Size applies to `qr_only`. The showcase labels one picture `card`. That picture is the card service type, and the options table does not list a template named `card`. `CustomCenterLogo` replaces the center mark. `CenterLogoRatio` defaults to 0.18 and the README bounds it from 0.05 to 0.35.

The README's latency row says the hosted generate API is about 100 ms and this library is about 1 to 5 ms. The Casso notice says their own generate path improved from about 500 ms to 100 ms. Neither number was measured for this note. The README's claim that WebP is about 30 to 40 percent smaller than PNG was not measured either.

## What still leaves the process

Generating and rendering with `VietQR.Core` does not need a network call. The bank list, logos, and fonts are embedded resources.

`VietQR.Deeplink.Client` is a different path. `VietQrDeeplinkClient.CreateIntentAsync` resolves a base URL, then POSTs the app code and the full QR string to `{base}/v1/intents`. `GetSupportedAppsAsync` GETs `{base}/v1/apps`. Defaults in `VietQrDeeplinkOptions` turn discovery on, cache the result for 12 hours, and time out at 10 seconds. The discovery URL is the raw file `vietqr-discovery.json` on this repo's `main`. On 4 November 2026 that file contained one field, `gateway`, set to `https://vietqr.hiendev.io.vn`. `DefaultGateway` is the same host. A call therefore sends the QR payload, which includes the account or card id, the amount, and the transfer note, to the author's gateway unless you set `BaseUrl` yourself.

The root README also offers that host as a public demo for `GET /api/v1/vietqr-core/generate` and `POST /api/v1/vietqr-core/deeplink/intents`. Using the demo sends the same payment fields off your network. The sample intent response in the README shows `expiresInSeconds` of 300 and a short URL on that host. That expiry is the sample, not a value re-checked in source. The GitHub release `client-v1.0.3` says it added a table of 43 supported bank apps. This note did not recount that table. Release `client-v1.0.2` says it changed the deeplink gateway domain.

## Gotchas

A QR from this library only asks the payer's bank app to start a transfer. Settlement still depends on the bank, and your order system still has to see the incoming credit. Keep a unique transfer note short enough to survive the 25-character slice after diacritics are removed, and store the bank reference when you reconcile, as [Bank Transfer Payment](/Technology/System Design/Practices/Bank Transfer Payment) already describes.

The NuGet id `VietQR.Core` and the notice's phrase `vietqr-core` are not proof of an official handover. Read `DISCLAIMER.md` before you ship the embedded NAPAS and VietQR logos. The disclaimer says those marks stay with NAPAS.

`main` can move past the newest nupkg. Core's csproj version string is 1.0.1 while NuGet latest is 1.0.8. Pin the package version you actually tested.

> **See also:** [Bank Transfer Payment](/Technology/System Design/Practices/Bank Transfer Payment)
