---
area: technology
domain: javascript
type: guide
title: Defer Async Inline
description: Explains how browsers execute inline, `defer`, `async`, and module scripts, and when to choose each for page performance and correct execution order.
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - javascript
  - browser
  - performance
---

# Defer Async Inline

## How Browsers Execute JavaScript: Understanding `defer`, `async`, and `inline`

When you embed JavaScript in HTML, **where and when the browser executes the script** directly affects **page load performance**, **user experience**, and **code execution order**.

The three common ways to embed a script are:

- **Inline script**
- **Script with `defer`**
- **Script with `async`**

Understanding the differences between them is an important skill for a frontend developer.

---

## What Is an Inline Script?

An inline script is JavaScript written directly in the HTML file, usually inside a `<script>` tag with no `src` attribute.

Example:

```html
<script>
  console.log("Hello from inline script")
</script>
```

### Characteristics

- **Executes immediately** when the browser's parser reaches it.
- **Blocks rendering of the rest of the HTML** until the script finishes executing.
- Cannot be cached, because it lives directly in the HTML.

### When to Use It

- Small scripts that run very fast (under 1–2 ms).
- Configuration variables needed early (such as `window.__ENV__ = {...}`).
- Tracking code that must run first (such as the Google Tag Manager snippet).

---

## Scripts with the `defer` Attribute

Example:

```html
<script defer src="/main.js"></script>
```

### Characteristics

- **Downloads in parallel with HTML parsing.**
- **Executes only after the entire HTML has been parsed.**
- **Preserves order** among scripts with `defer`.

The browser will:

1. Start parsing the HTML.
2. Encounter `<script defer>` and download the JS file in parallel.
3. Continue parsing the HTML.
4. Once the HTML parser finishes → execute the `defer` scripts in order.

> The big advantage of `defer` is that it **does not block rendering** and **preserves order**.

---

## Scripts with the `async` Attribute

Example:

```html
<script async src="/analytics.js"></script>
```

### Characteristics

- **Downloads in parallel with the HTML**, **executes as soon as it finishes downloading**, and **does not wait for the HTML parser to finish.**
- **Does not guarantee order** among async scripts.

That means:

- If `analytics.js` finishes downloading before `ads.js`, it runs first, regardless of the order in which you declared them.
- While an `async` script runs, HTML parsing is **paused** → this can cause slight layout jank.

> Use `async` when the script is **independent** and does not depend on DOM content or other scripts.

---

## Comparing `inline`, `defer`, and `async`

| Type             | Parallel download | Blocks HTML parser | Runs after HTML parser | Preserves order |
| ---------------- | ----------------- | ------------------ | ---------------------- | --------------- |
| Inline           | ❌                | ✅                 | ❌                     | ✅              |
| `<script defer>` | ✅                | ❌                 | ✅                     | ✅              |
| `<script async>` | ✅                | ❌ (briefly)       | ❌                     | ❌              |

---

## Which One to Use When

| Situation                                    | Recommended approach |
| -------------------------------------------- | -------------------- |
| Script depends on the DOM (manipulates DOM)  | `defer`              |
| Independent tracking, analytics, ads scripts | `async`              |
| Small configuration variables needed early   | `inline`             |
| Large JS libraries such as React, Vue        | `defer`              |

---

## Bonus: What Does `type="module"` Do?

Since HTML5, you can use:

```html
<script type="module" src="/app.js"></script>
```

It is automatically **treated as `defer`**, so:

- It does not block the HTML parser.
- It executes after the HTML has been parsed.
- It supports `import/export`.

> `type="module"` is a good fit when you use ES Modules and modern bundlers such as Vite, Webpack, or Next.js.

---

## Conclusion

Understanding `defer`, `async`, and `inline` helps you:

- Control the **script execution order**
- **Optimize page load performance**
- Avoid bugs caused by scripts running before the DOM is ready

> **See also:** [JavaScript TypeScript](/Technology/Programming Languages/Tools/JavaScript TypeScript) · [Async Discussion](/Technology/Programming Languages/Concepts/Async Discussion)
