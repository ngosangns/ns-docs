---
area: technology
domain: css
type: resource
title: CSS Tools
description: A curated list of CSS libraries, linters, animation libraries, build tools, zero-runtime CSS-in-JS options, themes and icon sets.
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - css
  - frontend
resource: https://github.com/vanilla-extract-css/vanilla-extract
---

# CSS Tools

A CSS stack often needs a reset, an animation layer, a linter and a build step that removes unused rules. This list collects those pieces by category, including Normalize.css, MVP.css and PurgeCSS for base styles. Readers also get animation libraries, lightningcss and postcss for processing, zero-runtime CSS-in-JS options such as vanilla-extract, a Windows 98 theme and a pure CSS icon set.

## Libraries

- **Normalize.css**: normalizes default styles across browsers.
- **MVP.css**: automatically styles semantic HTML tags without needing classes.
- **PurgeCSS**: removes unused CSS, reducing the final file size.

## Linter

- **stylelint**: a powerful, modern linter that helps avoid errors and enforce conventions in stylesheets.

## Animation Libraries

- **animate.css**: a ready-to-use CSS animation library.
- **anime.js**: a powerful JavaScript library for building complex animations.
- **Hover.css**: a collection of hover effects built with CSS3.

## CSS Builders And Processors

- **lightningcss**: an extremely fast CSS builder, optimizer, and minifier written in Rust.
- **postcss**: transforms CSS with JavaScript plugins (such as Autoprefixer).

## CSS-in-JS (Zero Runtime)

- **vanilla-extract**: write CSS in TypeScript with type safety, generating static CSS files at build time - [GitHub](https://github.com/vanilla-extract-css/vanilla-extract)
- **pigment-css**: a zero-runtime CSS-in-JS framework from the MUI team that extracts styles into separate CSS files - [GitHub](https://github.com/mui/pigment-css)

## Themes And Design Systems

- **98.css**: a design system for building UIs in the classic Windows 98 style.

## Icons

- **css.gg**: a collection of 700+ icons written in pure CSS.

## Learning Resources And Updates

- **CSS Wrapped 2023**: a page summarizing the most important CSS features and updates of the year.

These entries split a stylesheet stack into separate jobs. Normalize.css evens out default styles across browsers. MVP.css styles semantic HTML without classes. PurgeCSS then removes unused CSS so the shipped file is smaller. stylelint is the linter that flags errors and enforces conventions. Animation sits apart from that base. animate.css is a ready CSS animation library. Hover.css is a set of CSS3 hover effects. anime.js is the JavaScript library for more complex motion. lightningcss is a fast Rust builder, optimizer, and minifier. postcss transforms CSS with JavaScript plugins such as Autoprefixer. vanilla-extract writes CSS in TypeScript and emits static CSS at build time. pigment-css comes from the MUI team and extracts styles into separate CSS files. 98.css is the design system for a Windows 98 look. css.gg supplies more than 700 icons written in pure CSS. CSS Wrapped 2023 summarizes the important CSS features of that year.

> **See also:** [React Next](/Technology/Frontend/Tools/React Next) · [Vue And Nuxt](/Technology/Frontend/Tools/Vue And Nuxt) · [Reflow Repaint And CLS Optimization](/Technology/Frontend/Practices/Reflow Repaint And CLS Optimization)
