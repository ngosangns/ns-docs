---
area: technology
domain: frontend
type: resource
title: Frontend Overview
description: A broad map of the frontend landscape covering Web APIs, architecture models, build tools, performance, design systems, UI libraries, JavaScript libraries and templates.
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - frontend
  - javascript
resource: https://viblo.asia/p/gioi-thieu-ve-web-components-07LKXxkpKV4
---

# Frontend Overview

## Foundations And Concepts

### Web APIs

- **Documentation**: MDN Web API, Viblo, caniuse.com, webstatus.dev, rumarchive.com
- **Long Animation Frames API**: detects slow frames (>50ms) that cause jank
- **StorageManager API**: manages persistence and estimates storage quota (`navigator.storage`)
- **WebGPU**: a new graphics API, successor to WebGL, supporting Vulkan/Metal/Direct3D 12
- **WebRTC**: an open-source technology for real-time communication (audio, video, data) between browsers over P2P
  - **Main components**: Signaling Server, STUN/TURN Server, RTCPeerConnection, MediaStream, RTCDataChannel
  - **Use cases**: video call, voice call, screen sharing, file sharing, real-time gaming
  - See details: [WebRTC](/Technology/Frontend/Concepts/WebRTC) #webrtc #real-time #p2p #video-call
- **Other APIs**: Prompt API, Translator API, styleable HTML Selects

### Storage

- **Types**: Local Storage, IndexedDB, Session Storage, Cookies, Cloud Storage
- **Pattern**: Storage Strategy Pattern with `IStorageStrategy` and `StorageManager`

### Web Components

- Introduction: https://viblo.asia/p/gioi-thieu-ve-web-components-07LKXxkpKV4

### Architecture Models

- **SPA**: Single-Page Application (React, Angular, Vue.js)
- **SSR**: Server-Side Rendering (Next.js, Nuxt.js) - good SEO, fast loading
- **SSG**: Static Site Generation - fast, highly secure
- **ISG**: Incremental Static Generation - adds dynamic content to static pages
- **ISR**: Incremental Static Regeneration - regenerates static pages over time

### Workers

- **Service Worker**: background worker, proxy between web and network, caching, push notifications, offline mode
- **Web Worker**: handles heavy tasks, no DOM access, communicates via message passing

### Documentation

- **Patterns.dev**: a free online resource on design patterns, rendering patterns, and performance patterns for frontend
  - **Design Patterns**: JavaScript (Singleton, Proxy, Prototype, Observer, Module, Mixin, Mediator/Middleware, Flyweight, Factory), React (Container/Presentational, HOC, Render Props, Hooks, Compound), Vue (Components, Async Components, Composables, Container/Presentational)
  - **Rendering Patterns**: Client-side Rendering (CSR), Server-side Rendering (SSR), Static Rendering, Incremental Static Generation (ISG), Progressive Hydration, Streaming SSR, React Server Components
  - **Performance Patterns**: Loading Optimization (Static/Dynamic Import, Import On Visibility/Interaction), Code Splitting (Route Based, Bundle Splitting), PRPL Pattern, Tree Shaking, Preloading (Preload/Prefetch), Third-party Optimization, List Virtualization, JavaScript Compression, Animating View Transitions
  - Provides e-books and online docs that can be read and downloaded for offline use
  - Website: https://www.patterns.dev/ #design-patterns #rendering #performance #frontend
- **HTML Standard** (https://html.spec.whatwg.org/): the official HTML Living Standard documentation from WHATWG
  - Covers: semantics, structure, APIs, elements, microdata, user interaction, loading web pages, web application APIs, communication, web workers, worklets, web storage, HTML/XML syntax, rendering
  - Available in multiple formats: one-page version, multipage version, version for web devs, PDF version
  - Has translations: Japanese, Chinese
  - Has tests: web-platform-tests
  - Has an FAQ and chat on Matrix

## Architecture And Management

### Micro Frontend

- Concept: extending microservices to the frontend
- **Library**: qiankun
- **Articles**: Shared Dependencies, first steps with micro frontends

### Mono-repo

- **Nx**, **Lerna**

## Build And Development Tools

### Compilers And Bundlers

- **SWC**: Speedy Web Compiler - compilation, bundling, minification, WebAssembly

### Builders

- **Rsbuild**, **Vite**

### Static Site Generators

- **Astro**, **Quartz** (digital garden)

## Performance

### Overview

- Frontend performance patterns, Core Web Vitals

### Core Web Vitals

- **CLS**: Cumulative Layout Shift
- **INP**: Interaction to Next Paint - `requestIdleCallback()`, lazy rendering

### JavaScript Optimization

- Defer/Async/Inline, `rel="preload"`

### Research

- Speeding up the JavaScript ecosystem (Marvin Hagemeister), canvas engines comparison, CSS Wrapped 2023

## UI/UX And Design Systems

### Design Systems

- **CSS Frameworks**: Bulma, Shoelace, UIkit, Pico.css, Tachyons
- **Design Systems**: Fluent Design, Material Design, Primer, Atlassian, Oku UI, Zag, DynaUI, Magic UI, VS Code Elements, LayUI, Material Web Components
- **ag-ui**: UI protocol framework - https://github.com/ag-ui-protocol/ag-ui #UI #protocol
- **Magentic UI**: a user interface library developed by Microsoft, focused on building modern, easy-to-use UI components - [GitHub](https://github.com/microsoft/magentic-ui) #UI #library #microsoft

### Tailwind CSS

- **Documentation**: cheat sheets (Nerdcave, Flowbite), official docs
- **Tools**: Multitool
- **Components**: Tailwind UI, Headless UI, Tailblocks, Flowbite, Meraki UI, HyperUI, Preline UI, Konsta UI, Pines, Tailspark, Windstatic, TW-Elements, Mamba UI
- **Page Builders**: Tailblocks, Tails

### Bootstrap

- **FastBootstrap**

### CSS-in-JS And Styling

- **CVA**: Class Variance Authority
- **Linaria**: build-time CSS-in-JS
- **Panda CSS**: build-time CSS-in-JS

### UI Component Libraries

- **DaisyUI**, **UI verse**, **LDRS**, **Particles.js**, **Bit**, **Omi**, **Vant**, **Liquid Glass**
- **ReUI**: an open-source collection of UI components and animations built with React, TypeScript, Tailwind CSS, and Motion. Pairs beautifully with shadcn/ui - [GitHub](https://github.com/keenthemes/reui) #React #UI #components #TailwindCSS #Motion
- **Modern UI**: a collection of reusable UI components built with Radix UI and Tailwind CSS, ready for Next.js 15, inspired by Shadcn UI
  - **Key features:**
    - Simple installation of components and hooks via CLI (`npx @modern-core/ui add <component>`)
    - Supports Next.js and Vite with automatic framework detection
    - Automatic Tailwind CSS setup
    - Smart dependency management
    - TypeScript support
    - Version management for components
    - Automatic path alias configuration
    - Custom import paths for hooks and utilities
  - **Theme support**: Default theme and Blue theme with custom Tailwind configuration
  - **Component installation**: installs both UI components and custom hooks
  - **Version management**: check, install, and update specific versions
  - [GitHub](https://github.com/thangdevalone/modern-ui) | [Website](https://modern-ui.org) | [NPM](https://www.npmjs.com/package/@modern-core/ui) #React #UI #components #RadixUI #TailwindCSS #Next.js15 #shadcn-ui

### Specialized Components

- **Table**: RevoGrid (Excel-like)
- **Slider**: Tiny-slider
- **Upload**: Dropzone
- **Icons**: Flag Icons, Animated Icons
- **SVG Logos**: **SVGL** - a library of beautiful SVG logos, built with SvelteKit and Tailwind CSS
  - Provides a diverse collection of SVG logos optimized for the web
  - Tech used: SvelteKit and Svelte 5, TypeScript, Tailwind CSS, Content-Collections, Shiki
  - Supports multiple formats: simple logos, logos with wordmark, logos supporting light and dark mode, full logos with all properties
  - Contribution requirements: make sure you have the right to use the logo, optimize the SVG for the web and keep the `viewBox` attribute, and keep each SVG file under 21KB
  - [Website](https://svgl.app) | [GitHub](https://github.com/pheralb/svgl) #SVG #logos #Sveltekit

- **Charts**: Charts.css, D3.js, Chart.js, Ant Design Charts
- **Fonts**: Bunny Fonts, Google Fonts, Monaspace
- **Text Editor**: Slate, Froala, MDXEditor, Summernote, TinyMCE, Lexical, Quill, **Tiptap** - a rich text editor based on ProseMirror, flexible and extensible - [GitHub](https://github.com/ueberdosis/tiptap), **Milkdown** - a plugin-based WYSIWYG markdown framework - [GitHub](https://github.com/Milkdown/milkdown) #markdown #WYSIWYG, Monaco Editor
- **Math Editor**: MathLive
- **Map**: Tiny World Map, Leaflet
- **File Manager**: elFinder
- **Drag & Drop**: Swapy
- **Color Picker**: iro.js

### UI Development Tools

- **Storybook**: develop components in isolation

### HTML/Page Builders

- **GrapesJS**, **EasyFrontend**, **Builder.io**, **DevDojo HTML Builder**
- **Frappe Builder**: a visual builder for creating beautiful web pages easily and publishing them instantly - [GitHub](https://github.com/frappe/builder) #page-builder #visual-builder

## JavaScript Libraries

### Frameworks

- **SolidJS**: a declarative, efficient framework
- **Slint**: a cross-platform UI framework for building high-performance graphical interfaces in a declarative language - [GitHub](https://github.com/slint-ui/slint)

### Graphics And Animation

- **Paper.js**: reactive vector graphics
- **PixiJS**: HTML5 Creation Engine - the fastest, most flexible 2D WebGL and WebGPU renderer for the web. Supports WebGL and WebGPU renderers, asset loader, mouse and multi-touch, text rendering, primitive and SVG drawing, dynamic textures, masking, filters, blend modes - [GitHub](https://github.com/pixijs/pixijs) #WebGL #WebGPU #rendering
- **Anime.js**: a lightweight JavaScript animation library supporting CSS, SVG, DOM, and JavaScript properties. A simple yet powerful API for complex animation effects - [GitHub](https://github.com/juliangarnier/anime) #animation #javascript
- **Transition/Animation**: Barba.js, Lax.js

### Visual Programming

- **Rete**: an open-source framework for building node-based editors (visual programming) in the browser. Lets you create visual programming interfaces with nodes and connections between them - [GitHub](https://github.com/retejs/rete) #visual-programming #node-editor
- **FARA**: Microsoft's reactive framework - [GitHub](https://github.com/microsoft/fara) #reactive #framework #microsoft

### Utilities

- **Hotkeys**: Hotkeys.js
- **HTMX**: extends HTML (AJAX, CSS Transitions, WebSockets, SSE). Gives access to powerful HTML features to build dynamic web apps without complex JavaScript. Supports HTTP requests such as GET, POST, PUT, DELETE directly from HTML attributes - [GitHub](https://github.com/bigskysoftware/htmx) #html #ajax #websockets
- **Date**: Date-fns
- **Scroll**: Body-scroll-lock-upgrade, fullPage.js
- **Bot Detection**: BotD (FingerprintJS)
- **Image**: Perspective.js
- **Database**: RxDB (client-side NoSQL)
- **Web Components**: Polymer
- **i18n**: i18next
- **jQuery Plugins**: Selectize.js
- **Geospatial**: h3 - a hierarchical geospatial indexing system for encoding and analyzing spatial data - [GitHub](https://github.com/h3js/h3)
- **Real-time State Sync**: Livestore - synchronizes application state in real time between client and server - [GitHub](https://github.com/livestorejs/livestore)

### Mobile Development

- **Capacitor**: native mobile apps with HTML/CSS/JS

## Templates And Resources

### Admin Templates

- **Metronic**: a versatile admin template
- **Tabler**: open-source HTML dashboard UI kit, Bootstrap

## UI/UX Design Intelligence

### UI UX Pro Max

**UI UX Pro Max** (https://ui-ux-pro-max-skill.nextlevelbuilder.io/) is a design intelligence skill for Claude Code that provides a searchable database of UI styles, color palettes, font pairings, chart types, and UX guidelines.

- **Key features:**
  - **Design Styles**: 57+ UI styles (Glassmorphism, Neumorphism, Minimalism, Brutalism, Aurora UI, etc.) with colors, effects, and framework compatibility
  - **Color Palettes**: 95+ color systems for SaaS, E-commerce, Healthcare, Fintech, etc. Includes Primary, Secondary, CTA, Background, Text, Border
  - **Typography**: 56+ font pairings with Google Fonts integration, Tailwind configs, mood-based recommendations
  - **Chart Types**: 24 chart types with library suggestions (Chart.js, Recharts, D3.js) and accessibility notes
  - **Landing Patterns**: 29 conversion-optimized page structures with CTA placement strategies and color recommendations
  - **UX Guidelines**: best practices and anti-patterns for animation, accessibility, z-index, loading states, performance

- **Supported tech stacks:**
  - React, Next.js, Vue, Svelte, SwiftUI, React Native, Flutter, Tailwind
  - Framework-specific best practices, patterns, and code examples

- **Workflow:**
  1. User prompt → AI reasoning (analyzes the product, style, typography, color, landing, and UX domains)
  2. Search design database → finds and recommends suitable options
  3. Generate code → produces code with the chosen colors, fonts, and styles
  4. Quality checklist → checks SVG icons, hover feedback, dark mode contrast, responsive layout
  5. Final result → production-ready UI

- **Highlights:**
  - Open source
  - Claude Code compatible
  - Production ready
  - Searchable database
  - AI-powered design recommendations

> **See also:** [React Next](/Technology/Frontend/Tools/React Next) · [WebRTC](/Technology/Frontend/Concepts/WebRTC) · [Reflow Repaint And CLS Optimization](/Technology/Frontend/Practices/Reflow Repaint And CLS Optimization)
