---
area: technology
domain: css
type: guide
title: Modern CSS Platform Features
description: Experimental platform CSS features — responsive iframes via frame-sizing, scroll-marker-group carousels, text-decoration-inset underlines, and single-axis scroll containers with overflow auto clip.
timestamp: "2026-09-29T00:00:00.000Z"
tags:
  - technology
  - css
  - frontend
resource: https://developer.chrome.com/release-notes/153
---

# Modern CSS Platform Features

Four platform features that replace JavaScript or gradient hacks with declarative CSS. All are experimental and currently Chromium-only — gate them behind `@supports` and treat them as progressive enhancement.

## Responsive iframes: `frame-sizing` + `responsive-embedded-sizing`

Embedding a widget (comment thread, form, checkout) used to require the child to `postMessage` its height to the parent, which then set the iframe height in JS. Now the browser can do it:

```css
iframe.embed {
  width: 100%;
  frame-sizing: content-height; /* iframe height = embedded document's layout height */
}
```

The embedded document must opt in, because content size is cross-origin information:

```html
<meta name="responsive-embedded-sizing" content="allow-origins=*" />
```

Both sides opting in is the security model: a malicious parent could otherwise exfiltrate information about a cross-origin document by observing the laid-out iframe size. `allow-origins` restricts which parent origins may read the size; combine with the `Content-Security-Policy: frame-ancestors` header for defence in depth. Fenced frames are excluded from the feature.

- **Values**: `auto` (initial), `content-width`, `content-height`, `content-inline-size`, `content-block-size`. The logical variants resolve against the _iframe's_ `writing-mode`, not the embedded document's.
- **Applies to** replaced elements; not inherited; animation type discrete.
- **Dynamic resize**: the embedded document calls `window.requestResize()` to report an updated size (the size is otherwise set after `DOMContentLoaded` and again on `load`).
- **Spec**: CSS Box Sizing 4. MDN: [`frame-sizing`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/frame-sizing), [`<meta name="responsive-embedded-sizing">`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/meta/name/responsive-embedded-sizing).

## Scroll markers: `scroll-marker-group`

Generates carousel dots / table-of-contents markers from the scroll container itself — no JS, no duplicated markup.

```css
ul.carousel {
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scroll-marker-group: after; /* or before */
}
li::scroll-marker {
  content: " ";
}
::scroll-marker-group {
  display: flex;
  gap: 0.2em;
}
::scroll-marker:target-current {
  background: red;
}
```

- **Value**: `none | [ before | after ] || [ links | tabs ]`. `before`/`after` place the generated `::scroll-marker-group` pseudo-element as a sibling before/after the scroll container's children — in **both visual order and tab order**. Accessibility best practice: match the visual position with the tab order.
- **`links`** (default) — group role `navigation`, marker role `link`; **every marker is a tab stop, in order**; originating elements' roles are unaffected. Behaves like a navigation list.
- **`tabs`** — group role `tablist`, marker role `tab`; the group behaves as a single focusable component (focusgroup) and **only the active marker is a tab stop**, with arrow keys switching between markers; originating elements get an implicit `tabpanel` role, and inactive tab content is hidden from the accessibility tree (so no manual `interactivity: inert` is needed). Behaves like a tablist.
- **Active state**: `:target-current` matches the active marker; `:target-before` / `:target-after` match markers before/after it in flat tree order.
- **Existing markup**: `scroll-target-group: auto` turns an element containing `<a>` elements (e.g. a table of contents) into a marker group container, so `a:target-current` highlights the current section without pseudo-elements.
- **Spec**: CSS Overflow 5. MDN: [`scroll-marker-group`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/scroll-marker-group).

## Underline control: `text-decoration-inset`

Adjusts the start and end points of a text decoration, so an underline can be shorter, longer, or shifted relative to the text — the effect people previously faked with background gradients.

```css
a {
  text-decoration: underline 0.3em limegreen;
  text-decoration-inset: -10px; /* outset: longer than the text */
}
.shifted {
  text-decoration-inset: 1em -1em;
} /* start right, end left */
```

- **Value**: `<length-percentage>{1,2} | auto`. **Positive insets (shorter), negative outsets (longer).** One value applies to both start and end; two values are start then end.
- **`auto`** lets the browser inset the ends so two decorated boxes side by side do not read as one continuous decoration — important for Chinese proper-noun underlining (CLREQ), where adjacent proper nouns need separate underlines. `auto` is not the same as the initial `0`.
- Not inherited, and **not** a constituent of the `text-decoration` shorthand. Percentages resolve against the decorating box's inline size (or each box fragment when `box-decoration-break: clone`).
- **Spec**: CSS Text Decoration 4. MDN: [`text-decoration-inset`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/text-decoration-inset).

## Single-axis scroll containers: `overflow: auto clip`

`overflow` has long been easy to turn into an unwanted two-axis scroller. Historically, specifying a scrollable value on one axis forced the other axis to `hidden` — which is _still a scrollable value_, so you got a second scroller (or a scrollbar gutter) you did not want.

Chrome 153 (stable 2026-09-08; the feature was still listed as Beta/Dev/Canary at release-note time) extends `overflow` to accept a scrollable value together with `clip`:

```css
.panel {
  overflow: auto clip; /* x scrolls, y clips hard */
}
```

Benefits: `position: sticky` can be constrained by different ancestor scroll containers per axis, and the clipped axis stays put instead of becoming a hidden scroller.

**Detection** uses the new `named-feature()` function from CSS Conditional Rules 5:

```css
@supports named-feature(single-axis-scroll-container) {
  .panel {
    overflow: auto clip;
  }
}
```

`single-axis-scroll-container` is one of only two currently defined named features (the other is `anchor-position-follows-transforms`). The CSSWG intends to add to this list rarely.

### Gotcha: `min-width: auto` blows out instead of shrinking

`clip` is a **non-scrollable** overflow value (`visible` and `clip` are non-scrollable; `scroll`, `auto`, `hidden` are scrollable and make the box a scroll container). Per CSS Flexbox 1 §4.5 and CSS Grid 1 §6.6, a flex/grid item's automatic minimum size (`min-width`/`min-height: auto`) resolves to its **content-based minimum size** when its overflow in that axis is non-scrollable — and to zero only when the axis is a scroll container.

So a clipped axis keeps the content-based minimum: a nested table or dashboard inside a flex/grid item **bulges out instead of shrinking**, breaking the layout. Fix by zeroing the minimum explicitly:

```css
.panel > .nested-scroller {
  min-width: 0; /* or min-inline-size: 0 */
  min-height: 0; /* the clipped axis */
}
```

Related in the same Chrome 153 release: `scroll-axis-lock` lets you opt out of the browser's gesture axis-locking, for elements that should always be diagonally scrollable.

## Browser Support

All four features are experimental and Chromium-only as of 2026-09. Use `@supports` feature queries (`@supports (frame-sizing: content-height)`, `@supports named-feature(single-axis-scroll-container)`) and keep a working fallback — for iframes, the `postMessage` height handshake; for carousels, JS-driven markers.

> **See also:** [CSS Tools](/Technology/Frontend/Tools/CSS Tools) · [Frontend Overview](/Technology/Frontend/Resources/Frontend Overview) · [Reflow Repaint And CLS Optimization](/Technology/Frontend/Practices/Reflow Repaint And CLS Optimization)
