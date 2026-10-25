---
area: technology
domain: image-formats
type: guide
title: JPEG XL
description: "JPEG XL for the web: ISO/IEC 18181, VarDCT and Modular, lossless JPEG transcoding, browser support from Chrome 155 and Firefox 158, the picture fallback, and what the October 2026 benchmarks actually show against AVIF."
timestamp: "2026-10-25T00:00:00.000Z"
tags:
  - technology
  - frontend
  - image-formats
  - jpeg-xl
  - avif
  - web-performance
resource: https://developer.chrome.com/blog/jpeg-xl-in-chrome
---

# JPEG XL

JPEG XL (`.jxl`) is an ISO/IEC 18181 image format from the JPEG committee, built from Google's PIK and Cloudinary's FUIF, and royalty-free. It aims to replace or sit beside JPEG, PNG, and GIF, and competes with WebP and AVIF. October 2026 is when it became a practical web format: Chrome 155 and Firefox 158 ship decoding on by default, and Safari has partial support since 17.

A Vietnamese summary of the format circulated with several claims that the benchmarks do not support — decode speed, the size advantage, and progressive decoding are all narrower than stated. Those points are corrected under [Check before repeating](#check-before-repeating).

## Format

- **Two coding modes**: VarDCT for lossy, Modular for lossless, in the same container.
- **Depth and color**: up to 32-bit, HDR, wide color gamut.
- **Alpha, animation, and frame layers** are part of the spec.
- **Progressive decoding**: the image sharpens in passes, and the encoder can send the salient parts first ([Google Open Source Blog, 2021](https://opensource.googleblog.com/2021/09/using-saliency-in-progressive-jpeg-xl-images.html)).
- **Lossless JPEG transcoding**: an existing JPEG becomes a `.jxl` about 9–20% smaller and restores byte-for-byte. Useful when migrating a photo library without touching pixels.

## Browser support, October 2026

| Browser                                            | Status                                                                                                                                                                           |
| -------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Chrome 155, stable 2026-10-06, desktop and Android | Decodes `.jxl`. The decoder is `jxl-rs`, a pure Rust implementation, chosen for memory safety.                                                                                   |
| Firefox 158, 2026-10-13                            | On by default on all platforms; the default `Accept` header now includes `image/jxl`.                                                                                            |
| Safari 17.0+                                       | Partial: still images only, no animated sequences, no progressive previews.                                                                                                      |
| Edge                                               | Edge 155 release notes claim JPEG XL decoding, but hands-on testing on 2026-10-09 found it not working, and caniuse still lists Edge as unsupported. Check before relying on it. |
| iOS browsers                                       | All use WebKit, so they behave like Safari.                                                                                                                                      |

Chrome recommends trying both AVIF and JPEG XL per image rather than standardizing on one.

## Shipping it on a site

Serve `.jxl` as `image/jxl` and keep fallbacks, because Safari's support is partial and Edge is not there yet:

```html
<picture>
  <source srcset="anh.jxl" type="image/jxl" />
  <source srcset="anh.avif" type="image/avif" />
  <source srcset="anh.webp" type="image/webp" />
  <img src="anh.jpg" alt="Mô tả ảnh" loading="lazy" />
</picture>
```

The browser takes the first source it supports, so the order matters. Two traps:

- **Safari will pick the JXL source** and render only the still frame. Do not ship an animated `.jxl` as the only source.
- **The server and CDN must actually emit `image/jxl`.** An image pipeline that re-encodes or renames files can break the source without any browser error.

## Which format wins in practice

Jake Archibald benchmarked the current encoders on 2026-10-15, after JXL landed in the major browsers. The results are less flattering than the format's marketing:

| Case                          | Result                                                                                                                                                             |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Lossy photos                  | AVIF almost always smaller. JXL (jixel) is typically 15–25% larger at default effort, 6–20% at maximum effort. Outliers exist both ways.                           |
| Screenshots and illustrations | AVIF much smaller; JXL is 30–90% larger at default effort.                                                                                                         |
| Transparency                  | AVIF much smaller; libjxl JXL is 31–44% larger.                                                                                                                    |
| Lossless                      | JPEG XL is the clear winner; lossless WebP is 9–17% larger and lossless AVIF 30–120% larger.                                                                       |
| Decode speed                  | AVIF faster: JXL takes 2–3x as long at medium quality. At very high quality Chrome can sometimes decode JXL faster, and transcoded JPEGs decode as fast or faster. |
| Progressive                   | JXL previews work in Chrome and Firefox; Safari shows only the final image. AVIF also has progressive rendering, currently Chrome-only, in progress for Firefox.   |
| HDR                           | JXL supports HDR, but browser decoders do not support gain maps, which AVIF handles better today.                                                                  |

The recommendation from that benchmark: default to AVIF 4:4:4, and reach for JPEG XL (encoded with jixel) when the image is lossless, very high fidelity, a transcoded JPEG, or when AVIF produced an unusually large file. Encoder choice matters: jixel usually beats libjxl on size but can game perceptual metrics, and its high-effort lossless output can be too slow to decode.

## Check before repeating

- **"Decode is much faster than AVIF."** Not at normal quality: AVIF decodes 2–3x faster. JXL wins only at very high quality or when decoding a lossless JPEG transcode.
- **"30–60% smaller than JPEG."** Chrome says 30–50%, jpegxl.info says about 60% at the same visual quality. Both compare against JPEG, not AVIF; against AVIF, JXL is usually the larger file for lossy photos.
- **"Progressive decoding is a big edge over AVIF/WebP."** It was. AVIF now has progressive rendering in Chrome, with Firefox in progress, so the edge is smaller than the format's early write-ups suggest.
- **"HDR support."** True in the format, weaker in browsers: gain maps are not supported by browser decoders, which matters for HDR photos.
- **"Supports layers."** The spec and the project site list layers/frame composition; that is not the same as an editable layered document, and browser decoders do not expose anything beyond displaying the frames.
- **The `<picture>` order.** `type="image/jxl"` is enough for detection, but Safari's partial support means the fallback chain will not rescue animated JXL.

## Sources

- [Chrome for Developers: Shipping JPEG XL in Chrome, 2026-10-06](https://developer.chrome.com/blog/jpeg-xl-in-chrome)
- [Jake Archibald: JPEG XL vs AVIF for web use-cases, 2026-10-15](https://jakearchibald.com/2026/jpeg-xl-vs-avif/)
- [caniuse: JPEG XL](https://caniuse.com/jpegxl)
- [jpegxl.info](https://jpegxl.info/)
- [Google Open Source Blog: Using saliency in progressive JPEG XL images](https://opensource.googleblog.com/2021/09/using-saliency-in-progressive-jpeg-xl-images.html)
- [BetaNews: Firefox 158 adds JPEG XL by default](https://betanews.com/article/firefox-158-jpeg-xl-smooth-scrolling/)
- [PiunikaWeb: Edge 155 JPEG XL support hands-on](https://piunikaweb.com/2026/10/09/microsoft-edge-155-jpeg-xl-support/)

> **See also:** [Web Asset Formats To Prioritize](/Technology/Frontend/Concepts/Web Asset Formats To Prioritize) · [Reflow Repaint And CLS Optimization](/Technology/Frontend/Practices/Reflow Repaint And CLS Optimization) · [Modern CSS Platform Features](/Technology/Frontend/Concepts/Modern CSS Platform Features)
