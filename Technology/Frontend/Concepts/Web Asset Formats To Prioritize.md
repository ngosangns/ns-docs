---
area: technology
domain: web-formats
type: guide
title: Web Asset Formats To Prioritize
description: "Which file formats to ship for images, video, audio, fonts, and text in 2026, ranked by Chrome's support and Accept-header preference, with fallbacks for Safari and Firefox."
timestamp: "2026-10-25T00:00:00.000Z"
tags:
  - technology
  - frontend
  - web-formats
  - avif
  - webp
  - av1
  - web-performance
resource: https://caniuse.com/avif
---

# Web Asset Formats To Prioritize

Chrome's format support sets the floor for what a team can ship, not the ceiling for what every visitor can play. In October 2026 Chrome decodes AVIF, WebP, JPEG XL, AV1, Opus, FLAC, WOFF2, and zstd, but Safari and older in-app WebViews lag on several of them, so every modern format needs a fallback.

This note ranks the file extensions worth using per asset type, starting from Chrome's own request preferences and current caniuse data. The JPEG XL versus AVIF detail is in [JPEG XL](/Technology/Frontend/Concepts/JPEG XL).

## Chrome's own preference order

For an `<img>` request, the browser states its preference in the `Accept` header:

| Browser           | `Accept` for images                                                               |
| ----------------- | --------------------------------------------------------------------------------- |
| Chrome 121+       | `image/avif,image/webp,image/apng,image/*,*/*;q=0.8`                              |
| Firefox 158+      | `image/avif,image/jxl,image/webp,image/png,image/svg+xml,image/*;q=0.8,*/*;q=0.5` |
| Safari (Big Sur+) | `image/webp,image/png,image/svg+xml,image/*;q=0.8,video/*;q=0.8,*/*;q=0.5`        |

Read left to right, Chrome asks for AVIF first, then WebP, then APNG, then anything. That is the short answer to "which formats Chrome prefers". Two consequences:

- **Firefox is the only browser that names `image/jxl` in `Accept`.** Chrome supports JPEG XL from 155 but its image header, as documented for Chrome 121+, still starts with AVIF and reaches JXL only through the `image/*` wildcard.
- **Safari does not name AVIF at all.** It decodes AVIF from 16.4 but requests `image/*`, so a CDN that negotiates on exact MIME tokens will never choose AVIF for Safari. Test the negotiation rule, not just the codec support.

For `<video>`, `<audio>`, `<script>`, and `<link>`, Chrome sends `*/*`. Accept-header negotiation cannot pick a codec or a compressed bundle there; the choice has to be in the markup (`<source type>`) or the server config.

## At a glance

| Asset                                      | Serve first                     | Fallback                   | Chrome since     |
| ------------------------------------------ | ------------------------------- | -------------------------- | ---------------- |
| Photos, screenshots, transparency          | AVIF                            | WebP → JPEG or PNG         | 85               |
| Icons, logos, UI shapes                    | SVG                             | PNG at 2x                  | all              |
| Lossless, JPEG migration, maximum fidelity | JPEG XL                         | PNG                        | 155              |
| Short animation                            | Video (MP4 or WebM)             | Animated WebP → APNG → GIF | WebP 32, APNG 59 |
| Video                                      | AV1 in MP4 or WebM              | H.264 in MP4               | 70               |
| Audio                                      | Opus in WebM                    | AAC in MP4 → MP3           | 33               |
| Fonts                                      | WOFF2                           | WOFF                       | 36               |
| HTML, CSS, JS, JSON, SVG                   | Brotli                          | gzip                       | all              |
| Versioned JS and CSS                       | Brotli plus a shared dictionary | Brotli                     | 130              |

## Images

**AVIF is the default raster format.** Chrome 85+, Edge 121+, Firefox 93+, Safari 16.4+ on macOS 13+ (iOS 16+), and 96.35% of global traffic. It is usually smaller than WebP at the same visual quality, with the widest gap on photos and screenshots, and it carries alpha and HDR. Two costs: encoding is slow, so variants belong in the build pipeline, and progressive preview does not render in Firefox or Safari. Chrome has progressive AVIF; Firefox is still working on it.

**WebP is the fallback, not the default.** 97.18% global, Chrome 32+, Firefox 65+, Safari 16+ for full support including animation. Older Safari renders still WebP but not everything the format can carry. Keeping WebP under AVIF costs one extra encode and covers the tail.

**SVG wins for icons and logos.** It is resolution-independent, usually smaller than a PNG sprite, and supported everywhere. Sanitize uploaded SVG, because the same flexibility allows script injection.

**JPEG XL is a specialist.** Use it for lossless images, byte-for-byte JPEG transcoding, and very high fidelity; AVIF remains smaller for ordinary lossy photos, and the full comparison is in the JPEG XL note. Safari renders JXL stills but not animation, and Edge's support is claimed in release notes but was not working in hands-on testing in October 2026.

**Animation belongs in a video element.** An MP4 or WebM is smaller and better controlled than any animated image. If it has to be an `<img>`, the order is animated WebP (Chrome 32+), then APNG (Chrome 59+), then GIF. Animated AVIF decodes in Chrome 113+ and Firefox 113+, but support elsewhere is uneven, so it is not a safe default.

```html
<picture>
  <source srcset="anh.avif" type="image/avif" />
  <source srcset="anh.webp" type="image/webp" />
  <img src="anh.jpg" width="1200" height="800" alt="Mô tả ảnh" loading="lazy" />
</picture>
```

Keep every source at the same dimensions and aspect ratio, and put width and height on the fallback `<img>` so the layout does not shift.

## Video

| Codec and container | Chrome | Notes                                                                                                      |
| ------------------- | ------ | ---------------------------------------------------------------------------------------------------------- |
| AV1 in MP4 or WebM  | 70+    | Best compression, royalty-free. Slow to encode, and software decoding above 1080p is heavy.                |
| VP9 in WebM         | all    | Good middle ground. Safari 16+ (iOS 17.4+), without alpha.                                                 |
| H.264 in MP4        | all    | 97.49% global, hardware everywhere, larger files. Always keep it as the fallback.                          |
| HEVC in MP4         | 107+   | Hardware decoding only. Safari has full support, but licensing and platform gaps rule it out as a default. |

AV1 reaches 95.97% through Chrome 70+, Edge 121+, and Firefox 67+, but Safari only decodes it in hardware on M3 Macs and A17 Pro or newer iPhones. That is why the H.264 file stays in the build.

```html
<video controls playsinline preload="metadata" poster="poster.avif">
  <source src="clip.webm" type="video/webm; codecs=av01,opus" />
  <source src="clip.mp4" type="video/mp4; codecs=avc1.640028,mp4a.40.2" />
</video>
```

The browser takes the first source it can play, so the `codecs` parameter matters: without it, a browser may claim the container and then fail on the codec.

## Audio

- **Opus in WebM** is the best quality per byte and the lowest latency: Chrome 33+, Firefox 15+, 97.26% global. Safari plays Opus only in a CAF container, with full support from iOS 18.4, so it cannot be the only source.
- **AAC in MP4** is the universal fallback and the recommendation for general streaming. Chrome decodes the Main profile only.
- **FLAC** is lossless and well supported (Chrome 56+, Firefox 51+, Safari 13+, 97.26%). One trap: `HTMLMediaElement.canPlayType("audio/flac")` can return an empty string even when playback works, so do not gate playback on that check.
- **MP3** is the legacy fallback and still decodes everywhere.

```html
<audio controls preload="metadata">
  <source src="track.webm" type="audio/webm; codecs=opus" />
  <source src="track.m4a" type="audio/mp4" />
  <source src="track.mp3" type="audio/mpeg" />
</audio>
```

## Fonts

WOFF2 is the only font format worth shipping to modern targets: Chrome 36+, Firefox 39+, Safari 12+, 97.27% global. It wraps Brotli-compressed OpenType, so it is noticeably smaller than the same face served as TTF or OTF. Use WOFF only for legacy targets.

Prefer a variable font over five static weights: one file, one request, and every weight in between. Subset to the glyphs the site actually uses, self-host instead of loading a third-party stylesheet, and use `font-display: swap` so text is readable before the font arrives.

```css
@font-face {
  font-family: "Inter";
  src: url("/fonts/inter-var.woff2") format("woff2");
  font-weight: 100 900;
  font-display: swap;
}
```

## Text compression

- **Brotli** is the default for HTML, CSS, JavaScript, JSON, and SVG. Precompress static files at build time at high quality; every modern browser accepts `br`.
- **zstd** (Chrome 123+, Edge 123+, Firefox 126+, Safari 26.0+ partial, 85.6% global) wins when compressing on the fly, because it is much faster than Brotli at a similar ratio. Serve it as an extra option only, with Brotli or gzip behind it.
- **gzip** stays as the universal fallback.
- **Compression Dictionary Transport** (Chrome 130+) adds delta compression with `dcb` (Brotli) and `dcz` (zstd), using a dictionary the browser already downloaded to compress the next version of a file. For versioned JS bundles and HTML templates the saving is much larger than ordinary compression. It is Chromium-only and needs server and CDN support, so treat it as an enhancement.

Never re-compress JPEG, PNG, WebP, AVIF, JPEG XL, WOFF2, MP4, or WebM; they are already compressed, and a second pass wastes CPU while usually growing the file. SVG and JSON are text and do compress. Send `Vary: Accept-Encoding`, plus `Available-Dictionary` when using dictionary transport.

## Where Chrome is ahead

| Feature                           | Chrome | Others                                                   |
| --------------------------------- | ------ | -------------------------------------------------------- |
| JPEG XL decoding                  | 155    | Firefox 158; Safari 17+ partial; Edge claimed but broken |
| AVIF                              | 85     | Safari 16.4+, Firefox 93+                                |
| Animated AVIF                     | 113    | Firefox 113+; Safari uneven                              |
| Progressive AVIF                  | yes    | Firefox in progress; Safari no preview pass              |
| zstd content encoding             | 123    | Firefox 126+, Safari 26.0+ partial                       |
| Shared-dictionary compression     | 130    | Chromium-only                                            |
| WebP, the format Chrome developed | 32     | Safari 16+ for full support                              |
| APNG                              | 59     | Firefox and Safari both decode it                        |

This column is why a Chrome-only prototype can adopt JXL and zstd early. It is also exactly where a Safari or Firefox visitor is most likely to see a broken asset, so those bets need testing outside Chrome.

## Serving rules

- **MIME type decides, not the extension.** Serve `image/avif`, `image/webp`, `image/jxl`, `image/svg+xml`, `font/woff2`, `video/webm`, `video/mp4`, `audio/webm`, and `audio/mp4`. An `.avif` sent as `application/octet-stream` will not render.
- **Do not trust a naive CDN negotiator.** Chrome asks for AVIF, WebP, APNG; Firefox names JXL; Safari omits AVIF and relies on `image/*`. An exact-token matcher will skip AVIF for Safari and JXL for Chrome. Check the CDN's rule against all three headers.
- **Codec choice for media lives in markup.** `Accept` is `*/*` for `<video>` and `<audio>`, so `<source type="...; codecs=...">` is the only signal the browser gets.
- **Precompute variants.** AVIF and AV1 encoding is expensive; doing it per request adds latency and CPU cost.
- **Test the fallback chain, not just Chrome.** Open the page in Safari and Firefox, throttle the network, and confirm the chosen file and the reserved space before the image loads ([Reflow Repaint And CLS Optimization](/Technology/Frontend/Practices/Reflow Repaint And CLS Optimization)).

## Check before repeating

- **"Chrome supports it, so every browser does."** AVIF is at 96.35% and WebP at 97.18%, not 100%. Older in-app WebViews are the usual stragglers.
- **"WebP is universally supported."** Full support, including animation, starts at Safari 16; earlier Safari handles only part of the format.
- **"JPEG XL replaces AVIF."** No. AVIF is still smaller for lossy photos; JXL wins lossless, transcoding, and very high fidelity. See [JPEG XL](/Technology/Frontend/Concepts/JPEG XL).
- **"zstd replaces Brotli."** Safari is only partial from 26.0 and global support is 85.6%; Brotli remains the safe default.
- **"AVIF for everything."** Encoding is slow, animation support is uneven, and progressive preview is Chrome-only.
- **"HEVC is safe in Chrome."** Chrome 107+ decodes it only in hardware, and not on every platform.
- **"FLAC can be feature-detected with `canPlayType`."** It can return an empty string while playback still works.
- **"GIF is dead."** Animated WebP and APNG are smaller, but GIF still decodes everywhere; convert only when the size matters.
- **"Compress all responses."** Already-compressed images, fonts, and video only waste CPU.

## Sources

- [caniuse: AVIF](https://caniuse.com/avif)
- [caniuse: WebP](https://caniuse.com/webp)
- [caniuse: AV1](https://caniuse.com/av1)
- [caniuse: WebM](https://caniuse.com/webm)
- [caniuse: MP4/H.264](https://caniuse.com/mp4)
- [caniuse: Opus](https://caniuse.com/opus)
- [caniuse: FLAC](https://caniuse.com/flac)
- [caniuse: WOFF2](https://caniuse.com/woff2)
- [caniuse: zstd content encoding](https://caniuse.com/zstd)
- [caniuse: HEVC/H.265](https://caniuse.com/hevc)
- [MDN: Image file type and format guide](https://developer.mozilla.org/en-US/docs/Web/Media/Guides/Formats/Image_types)
- [MDN: Web video codec guide](https://developer.mozilla.org/en-US/docs/Web/Media/Guides/Formats/Video_codecs)
- [MDN: Web audio codec guide](https://developer.mozilla.org/en-US/docs/Web/Media/Guides/Formats/Audio_codecs)
- [MDN: Default Accept values](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Content_negotiation/List_of_default_Accept_values)
- [MDN: Compression Dictionary Transport](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Compression_dictionary_transport)
- [Chrome for Developers: Shipping JPEG XL in Chrome, 2026-10-06](https://developer.chrome.com/blog/jpeg-xl-in-chrome)
- [Chrome for Developers: Supercharge compression efficiency with shared dictionaries](https://developer.chrome.com/blog/shared-dictionary-compression)
- [web.dev: Choose the right image format](https://web.dev/articles/choose-the-right-image-format)

> **See also:** [JPEG XL](/Technology/Frontend/Concepts/JPEG XL) · [Reflow Repaint And CLS Optimization](/Technology/Frontend/Practices/Reflow Repaint And CLS Optimization) · [Modern CSS Platform Features](/Technology/Frontend/Concepts/Modern CSS Platform Features)
