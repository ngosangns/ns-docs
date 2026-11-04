---
area: technology
domain: frontend
type: tool
title: Prestige UI
description: "Prestige UI (vora-aryan/Prestige-UI, MIT) is a shadcn registry of animated React components for Tailwind CSS v4 and Motion. Checked 4 November 2026 on main da6c605. The README lists 20 free items in the repo. prestigeui.com/pricing says those stay free and All Access is a one-time $49 launch price through 5 November 2026, paid with Polar. This check did not run the shadcn CLI or buy a license."
timestamp: "2026-11-04T00:00:00.000Z"
tags:
  - technology
  - frontend
  - react
  - tailwind
  - shadcn
  - animation
resource: https://github.com/vora-aryan/Prestige-UI
sources:
  - id: github
    resource: https://github.com/vora-aryan/Prestige-UI
    author: human:vora-aryan
  - id: site
    resource: https://prestigeui.com
  - id: pricing
    resource: https://prestigeui.com/pricing
---

# Prestige UI

[Prestige UI](https://github.com/vora-aryan/Prestige-UI) is a set of animated React components and blocks for Tailwind CSS and Motion. The README says you install them with the shadcn CLI or copy the source. The site is [prestigeui.com](https://prestigeui.com). Checked 4 November 2026 on `main` at `da6c605fbe2d92dbc9b2824abcebdc7c7e96e3f1`. This note did not clone the repo, did not run the shadcn CLI, and did not buy a license.

## Who publishes it

The GitHub API the same day reported owner `vora-aryan` (user id 148983316), not a fork, created 26 October 2026, pushed 26 October 2026 at 13:08 UTC, default branch `main`, language TypeScript, 20 stars, 1 fork, 0 open issues, and 0 subscribers. `updated_at` is 4 November 2026, later than `pushed_at`, so that timestamp is not a newer commit. The description is "Animated React components and blocks for Tailwind CSS and Motion. Install with the shadcn CLI." Topics are animation, motion, nextjs, react, shadcn, shadcn-ui, tailwindcss, and ui-components. The homepage field is `https://prestigeui.com`. There are no GitHub releases.

`HEAD` is "Add the free Prestige UI components and blocks.", authored by Aryan Vora on 26 October 2026 at 13:03 UTC. The commits list returned HTTP 403 from the rate limit, so this check did not count every commit. The repo was created and pushed in the same minute as that commit.

`LICENSE` is the MIT text. The copyright line is "Copyright (c) 2026 Prestige UI". GitHub's license API returns SPDX `MIT`.

## Where the code lives

The root of `main` contains `.github`, `LICENSE`, `README.md`, `components`, `lib`, and `styles`. There is no root `package.json`. A recursive tree listing has 32 blobs. `components/prestigeui/` holds the React files. `lib/utils.ts` is the shared helper. `styles/prestigeui.css` is the extra stylesheet.

The README says this repo holds the free items, 20 components and blocks, and that live previews live on the site. The table on that commit has 20 rows. Seventeen point at `/components/` and three point at `/blocks/`. The block rows are `footer-wordmark`, `auth-otp`, and `cta-bloom`. The tree also has shared files the README names. Files ending in `-ui.tsx` belong to a family, and `prestige-brand.tsx` is the placeholder logo. Counted shared files are `auth-ui.tsx`, `cta-ui.tsx`, `footer-ui.tsx`, `illustration-ui.tsx`, `marquee-ui.tsx`, `navbar-ui.tsx`, and `prestige-brand.tsx`.

## How you install a free item

The README gives two CLI forms.

```bash
npx shadcn@latest add https://prestigeui.com/r/gradient-button.json
```

Or register `@prestige` as `https://prestigeui.com/r/{name}.json` and then `npx shadcn@latest add @prestige/gradient-button`. The README says the CLI installs dependencies, the shared `cn` helper, and any CSS an item needs. Those commands were not run.

Manual install in the same README requires React 19 and Tailwind CSS v4, then `npm install clsx lucide-react motion tailwind-merge`. You copy `lib/utils.ts` and the files you need. Imports use the `@/` alias. Shine Button and the item the README calls Basic Marquee also need `styles/prestigeui.css` in global CSS. The table name for the marquee row is `infinite-marquee`. This check did not open the stylesheet.

Public registry JSON fetched the same day agrees in part. `gradient-button.json` has an empty `dependencies` array and one registry dependency, `fonts.json`. `shine-button.json` is the same shape. `auth-otp.json` depends on `motion` and `lucide-react`, and its files include `auth-otp.tsx`, `auth-ui.tsx`, and `prestige-brand.tsx`. `utils.json` depends on `clsx` and `tailwind-merge`. `fonts.json` points at `font-outfit.json` and `font-instrument-serif.json`. So the CLI dependency line is not the same list on every item.

## What the site charges

`https://prestigeui.com/pricing`, read 4 November 2026, says components are free and All Access unlocks every Pro block and template. The free column is $0 forever, no account, and it includes all 20 free components, live previews, the shadcn CLI, and source you own after install. All Access is one payment of $49, labeled a launch price that goes up after 5 November 2026. The page does not print the later price. It names Polar as checkout. It says there is no subscription, that a license key arrives by email, and that the key goes in `.env.local` before the `@prestige` registry can install Pro blocks. This check did not pay and did not open a Pro JSON file.

The same page lists Pro block groups with these counts. Hero 10, Pricing 16, Testimonials 20, Auth 9, Footer 4. Those numbers are the page's. They were not counted against a catalog.

The README says Pro blocks and templates, including heroes, pricing, bento grids, AI blocks, and backgrounds, are on the pricing page and are not the files in this repo.

## What this check did not do

No clone, no `npm install`, no `shadcn add`, and no browser session through the component previews. The commits API was rate-limited after the default-branch commit was read. Pro block source was not downloaded.

## See also

- [Looseleaf](/Technology/Frontend/Tools/Looseleaf) is another copy-and-own shadcn registry. Its surfaces are drawn SVG, not Motion sweeps.
