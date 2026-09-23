---
area: technology
domain: web-performance
type: guide
title: Reflow Repaint And CLS Optimization
description: Explains how reflow, repaint and layout shift work in the browser and how to optimize them to keep Cumulative Layout Shift low in Core Web Vitals.
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - web-performance
  - frontend
  - core-web-vitals
resource: https://viblo.asia/p/reflow-repaint-layout-shift-la-gi-toi-uu-de-tranh-cls-cao-trong-core-web-vitals-aNj4vkD8J6r
---

# Reflow Repaint And CLS Optimization

Source: https://viblo.asia/p/reflow-repaint-layout-shift-la-gi-toi-uu-de-tranh-cls-cao-trong-core-web-vitals-aNj4vkD8J6r

## Why Understand This?

- It directly affects **CLS (Cumulative Layout Shift)** in Core Web Vitals
- The UI "jumps", text gets pushed around, buttons slide away as you click
- It affects SEO and UX

## Reflow (Layout)

- **Definition**: the browser recalculates the size and position of elements
- **Happens when**: adding/removing/changing DOM nodes, changing CSS (width, font-size, position, display), changing text, resizing the window
- **Example**: `element.style.width = "200px"`
- **Note**: very expensive; one small change can affect many elements

## Repaint

- **Definition**: redrawing an element without recalculating layout
- **Happens when**: changing colors (background-color, color), visibility, opacity, shadow, border
- **Example**: `element.style.backgroundColor = "blue"`
- **Note**: lighter than reflow, but continuous repaints still drop FPS

## Layout Shift

- **Definition**: an element suddenly changes position without user interaction
- **Measurement**: CLS = Impact Fraction × Distance Fraction
- **Causes**: images without dimensions, late-loading fonts (FOIT/FOUT), ads/popups rendered late, JavaScript injecting content unexpectedly
- **Threshold**: CLS < 0.1 (recommended by Google)

## Optimizing Reflow And Repaint

- **Avoid continuous DOM manipulation**: batch changes and use classes instead of inline styles
- **Separate DOM reads and writes**: group multiple changes into `requestAnimationFrame`
- **Use classes**: `element.classList.add("expanded")`

## Optimizing CLS

- **Set image dimensions**: `width` and `height`, or CSS `aspect-ratio`
- **Preload fonts**: `<link rel="preload">` or `font-display: swap`
- **Reserve space**: placeholders for banners and ads (`min-height`)
- **Avoid unexpected DOM insertion**: limit `setTimeout`, and use `opacity` and `transform` for animation

> **See also:** [Frontend Overview](/Technology/Frontend/Resources/Frontend Overview) · [37 Tips From A Senior Frontend Developer](/Technology/Frontend/Resources/37 Tips From A Senior Frontend Developer)
