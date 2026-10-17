---
area: technology
domain: utility-tools
type: resource
title: Deterministic Avatars
description: RoboHash, DiceBear, and Peek turn a string into a stable avatar. RoboHash composites licensed artwork over HTTP or Python, published DiceBear is 10.7 with 61 styles while 11 is still a release candidate, and Peek is a small MIT SVG face with an optional React 19 component.
timestamp: "2026-10-15T00:00:00.000Z"
tags:
  - technology
  - utility-tools
  - avatars
  - identicon
resource: https://www.dicebear.com/
---

# Deterministic Avatars

[RoboHash](https://robohash.org/), [DiceBear](https://www.dicebear.com/), and [Peek](https://github.com/doan-labs/peek) each turn a string into a picture that comes out the same on the next call. None of them stores an uploaded photo. They differ in artwork, license, and whether the picture is a hosted URL or a local function. Checked 2026-10-15.

| | RoboHash | DiceBear | Peek |
| --- | --- | --- | --- |
| What you pass | Any text in the URL or in Python | A `seed` string | A `name` string |
| Output | PNG, JPG, or BMP assembled from parts | SVG, or PNG, JPG, WebP, AVIF from the HTTP API | SVG string, or a React component |
| Published code | PyPI `robohash` 2.0; GitHub tag `v2.1` | npm `@dicebear/core` 10.7.0 | npm `@doan-labs/peek` 1.1.0 |
| Code license | MIT, copyright 2011 | MIT, Florian Körner | MIT, Doan Labs. The name and mark are not in that grant |
| Artwork | Separate license per set | Separate license per style | The face is the library |

The public RoboHash and DiceBear URLs are best-effort. Both projects tell high-volume or production use to run a copy. Peek does not call a server to draw the face.

## RoboHash

[e1ven/Robohash](https://github.com/e1ven/Robohash) is the source of [robohash.org](https://robohash.org/). Checked 2026-10-15: created 2011-07-05, default branch `main`, 1,357 stars, 201 forks, 2 open issues, last push 2026-09-01. The only GitHub release listed is `v2.1`, published 2025-06-11. `pyproject.toml` on `main` and PyPI both say version 2.0. The PyPI summary repeats the site's "leading" line. This note does not treat that as a comparison.

The README says the picture is assembled from parts using bits of a SHA hash, and that this is a gut-check that a hash looks wrong, not a secure display of the hash.

Embed:

```html
<img src="https://robohash.org/YOUR-TEXT.png" />
```

The extension picks the format (`png`, `jpg`, or a bitmap). `?ignoreext=false` includes the extension in the hashed text. `?size=200x200` sets the pixel size. `?bgset=bg1` or `bg2` adds a background chosen from the hash. `bgset=any` is also accepted. Directory form works too: `https://robohash.org/set_set3/bgset_bg1/3.14159?size=500x500`.

`?gravatar=yes` uses a Gravatar when one exists for the email in the path. `?gravatar=hashed` expects the path to already be the hashed email.

Sets, from the README table on `main`:

| Set | Subject | Author | License named in the README |
| --- | --- | --- | --- |
| set1 | Classic robots | Zikri Kader | CC-BY-3.0, CC-BY-4.0 |
| set2 | Monsters | Hrvoje Novakovic | CC-BY-3.0 |
| set3 | Robot heads | Julian Peter Arias | CC-BY-3.0 |
| set4 | Cats | David Revoy | CC-BY-4.0 |
| set5 | Human avatars (Avataaars) | Pablo Stanley | Free for personal and commercial use |
| set6 | Cosmic apes | OceanSlim | CC0 |

The same README's URL-parameter list still says set1–set5. The sets table and the public site both document set6. The site says a specific set, or a list such as `?sets=1,3`, should stay put, and that `set=any` will include sets added later, so an existing picture can change. set6 uses extra symlinks for weighted rarity. Apes with laser eyes and teardrop tattoos are described as exceptionally rare.

The Python code is MIT. The README asks for a credit when you embed the images, host a copy, or reuse the art. Example wording on the site: "Robots lovingly delivered by Robohash.org". The artwork stays under the set licenses above. Author email in `pyproject.toml` is `robo@robohash.org`.

The public site is described as best-effort, not a commercial service. On errors or "too many requests", back off exponentially. For volume, the README says to self-host.

```bash
docker pull ghcr.io/e1ven/robohash:latest
docker run -p 8080:8080 ghcr.io/e1ven/robohash:latest
```

That listens at `http://localhost:8080`. A local image is `docker build -t robohash .` from a clone, then the same port mapping.

```bash
pip install robohash
```

`robohash[web]` adds Tornado. `python -m robohash.webfront` defaults to port 80. `PORT=8080` changes it. Python requirement in `pyproject.toml` is `>=3.8`, with Pillow and natsort. `Robohash(text).assemble(...)` takes `roboset`, `color` (set1 only), `format`, `bgset`, `sizex`, and `sizey`.

The README calls the project mostly feature-complete and in maintenance mode. Critical bugs may be fixed. New features are not the plan, and pull requests may sit unreviewed. Forking is explicitly encouraged.

## DiceBear

[dicebear/dicebear](https://github.com/dicebear/dicebear) is an avatar library by Florian Körner. Site: [dicebear.com](https://www.dicebear.com/). Checked 2026-10-15: created 2017-03-21, 9,856 stars, 428 forks, 4 open issues, last push 2026-10-11. GitHub's default branch is `11.x`. npm `latest` for `@dicebear/core` is 10.7.0. npm `next` is `11.0.0-rc.2`. The newest GitHub release is `v10.7.0`, published 2026-08-26. Node engines on both the `v10.7.0` core package and `src/js/core/package.json` at `11.x` are `>=22`.

The public site and its HTTP API docs are written for 10.7.0. They count 61 styles and show `https://api.dicebear.com/10.x/lorelei/svg?seed=Felix`. The `11.x` README says 63 styles and seven language ports that must emit the same SVG bytes as JavaScript. The unreleased section of `CHANGELOG.md` on `11.x` says `@dicebear/styles` `11.0.0-rc.3` adds `cats` and `dogs`, taking the collection from 61 to 63, and that the docs sidebar icons come from an 11.x API which is the first to serve those two. Those two styles are not in the 10.x HTTP API documented on the live site. Treat `11.x` as pre-release until it replaces npm `latest`.

The 10.x libraries named on the site are JavaScript (`@dicebear/core`), PHP (`dicebear/core`), Python (`dicebear-core`), Rust (`dicebear-core`), Go, Dart (`dicebear_core`), and C# (`DiceBear.Core`), plus `npx dicebear`. The `11.x` README points Go at `github.com/dicebear/dicebear-go/v11`. Its changelog says `11.0.0-rc.1` still used `/v10` and could not be fetched as a Go module. A 10.x call looks like this:

```js
import { Avatar, Style } from '@dicebear/core';
import definition from '@dicebear/styles/lorelei.json' with { type: 'json' };

const avatar = new Avatar(new Style(definition), { seed: 'Felix', size: 128 });
avatar.toString();
avatar.toDataUri();
```

The CLI form in the `11.x` changelog is `dicebear create lorelei`, not a bare style name. `dicebear lorelei --seed 'Felix'` is the form the public homepage still prints.

Related repos named in the `11.x` README: [dicebear/styles](https://github.com/dicebear/styles), [dicebear/schema](https://github.com/dicebear/schema), [dicebear/api](https://github.com/dicebear/api), and [dicebear/studio](https://github.com/dicebear/studio) (the Figma plugin). The editor is [editor.dicebear.com](https://editor.dicebear.com/).

### Style licenses

The library code is MIT, including commercial use. Each style keeps its artist's license. The [license overview](https://www.dicebear.com/licenses/) is the list to follow. On 2026-10-15 it groups the 61 published styles as CC0, CC BY 4.0, MIT, or the artist's own wording. CC BY 4.0 requires attribution and a note when you change the work. Icons is MIT and is based on Bootstrap Icons. Avataaars and Bottts, including their neutral variants, are Pablo Stanley's and are described there as free for personal and commercial use under terms on avataaars.com and bottts.com, not under CC or MIT. Lorelei is a CC0 remix of Lisa Wischofsky's Lorelei. The page says its summaries are orientation, not legal advice.

### HTTP API

No account. The docs for 10.7.0 say the public API is free for non-commercial use, and that commercial use or a higher limit should be a self-hosted copy. Stated limits are 50 requests per second for SVG and 10 for PNG, JPG, WebP, and AVIF. Over the limit the response is HTTP 429. The same page says those limits can change without notice, that a later design change can alter a picture even when the project tries not to, and that uptime is not guaranteed.

```
https://api.dicebear.com/10.x/<style>/svg?seed=user-8f3a2c
```

Encode a seed that contains spaces or reserved characters. `https://api.dicebear.com/10.x` returns the style names as JSON. `definition.json` and `options.json` exist on the public 10.x API. On a self-hosted instance they are off until `DEFINITION=1` and `OPTIONS=1`. List options are comma-separated. The public API does not accept `idRandomization`, `fontFamily`, `fontWeight`, or `title`.

| URL segment | Status in the 10.7.0 HTTP API docs | End of life |
| --- | --- | --- |
| `10.x` | Active | None |
| `9.x` | Active | None |
| `8.x` through `5.x` | Deprecated | 2028-04-30 |

After that date the hosted API for 5.x–8.x is planned to shut down. A self-hosted copy can keep serving an old major.

```bash
docker run --tmpfs /run --tmpfs /tmp -p 3000:3000 -i -t dicebear/api:4
```

Image `dicebear/api` on Docker Hub, default port 3000. The API repo is TypeScript on Fastify. The homepage also publishes weekly request, traffic, and npm figures. This note does not repeat them. They were not remeasured.

## Peek

[doan-labs/peek](https://github.com/doan-labs/peek) is "a string in, a face out." Site: [peek.doan-labs.com](https://peek.doan-labs.com/). Checked 2026-10-15: created 2026-09-30, default branch `main`, TypeScript, 17 stars, 3 forks, 0 open issues, last push 2026-10-09. npm `@doan-labs/peek` latest is 1.1.0, published 2026-10-09, matching `packages/peek/package.json`. Earlier publishes the same week: 0.1.0 and 1.0.0 on 2026-10-05. The changelog says 0.1.0 shipped with no license and to use 1.0.0 or later.

```bash
npm install @doan-labs/peek
```

React 19 or newer is an optional peer. `<Peek>` needs it. `toSvg` and `identify` have no runtime dependency. The package README says animation respects reduced motion.

```tsx
import { Peek } from '@doan-labs/peek'

<Peek name="Linh" expression="happy" animate gaze="pointer" />
```

```js
import { toSvg } from '@doan-labs/peek/svg'
import { identify } from '@doan-labs/peek/identity'

toSvg('Linh', { size: 96, expression: 'happy' })
identify('Linh')
```

The name is trimmed, internal spaces are collapsed, and it is lowercased, so `Linh` and ` linh ` are the same face. Identity is hashed per axis. State is not hashed.

| Axis | Choices at `peek@1` |
| --- | --- |
| `face` | diamond, semicircle, circle, triangle |
| `color` | lavender, fog, clay, mint, butter, rose, aqua |
| `eyes` | oval, bead, ring |
| `brows` | arch, bar, wedge, dash |
| `mouth` | poly, round, line, box |
| `cheeks` | oval, dots, lines |
| `trait` | square, fin, ring, dot, peak |

Those lengths multiply to 20,160, which is the "looks at peek@1" figure on the intro page. An explicit axis prop replaces only that axis. Expression and gaze are caller state. Expressions: `normal`, `happy`, `sad`, `angry`, `sleepy`, `curious`, `surprised`, `excited`, `confused`, `bored`, `attentive`. Default `normal`. `gaze` is `[x, y]` in -1..1, or `'pointer'` when `animate` is set. `toSvg` can record a static expression and gaze. `animate` and pointer tracking stay in the React component and are not in the exported SVG.

Accessories arrived in 1.1.0. Three slots, one value each, default `none`, so a `peek@1` face does not gain an outfit by upgrading. `identify(name).headwear` is `none` at `peek@1`. Eyewear: `none`, `glasses`, `sunglasses`. Headwear: `none`, `bow`, `cap`, `sprout`. Neckwear: `none`, `tie`. The docs count 3 × 4 × 2 = 24 wardrobe combinations, including wearing nothing. Those combinations are extra props. They are not picked by `identify`. The docs say not to use `Math.random()` while rendering, because the server and the browser could dress the same name differently. Store the slot values if a later list of accessories should not move an existing outfit.

`version={1}` keeps the current faces. Omitting it means latest. The docs say a change that would move an existing face ships as a new style version. Other props from the README: `size` defaults to 64, `frame` is `ink`, `bone`, `paper`, or `none` (default `ink`), `square` defaults to true (false clips to a circle), `title` defaults to the name and `false` hides it, `riso` adds print grain from 120px.

The repo is a Bun workspaces monorepo (`packageManager` `bun@1.4.0`). `packages/peek` is the library. `apps/web` is the site. `bun run dev` serves the site on port 5173. The root `deploy` script builds and runs `wrangler deploy`.

## Which one

Use RoboHash when the picture should be a URL of a robot, monster, cat, person, or ape, and a short attribution line is acceptable. Pin `set` or `sets`. Do not use `set=any` if the picture must survive a new set.

Use DiceBear when you need many visual styles, the same SVG from more than one language, or a URL. Read the style's license before shipping it. For a commercial product or for a picture that must not change when the hosted API does, generate locally or run `dicebear/api` yourself. Stay on 10.7 until 11 is the release you mean to take.

Use Peek when one illustrated face family is enough, the SVG must be computed in the app, and a React 19 component with expression and gaze is useful. Pass `version={1}` if later releases must not redraw people who already have a face.

> **See also:** [Online Tools](/Technology/Tools And Utilities/Tools/Online Tools)
