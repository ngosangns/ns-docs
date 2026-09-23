---
area: technology
domain: react
type: resource
title: React Next
description: A curated reference for the React and Next.js ecosystem covering hooks, optimization, design systems, rendering patterns, libraries and a developer roadmap.
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - react
  - nextjs
  - frontend
resource: https://www.retroui.dev/
---

# React Next

## Resources

- React ecosystem overview 2024
- Official Next.js course
- Guide to dockerizing Next.js
- Comparison of state management in React
- New hooks in React 19

## Hooks

- Comparing `useEffect` and `useLayoutEffect`

### useActionState

- A hook that manages the state of asynchronous actions in React
- Tracks the state of an action:
  - `pending`: the action is being executed
  - `fulfilled`: the action completed successfully
  - `rejected`: the action failed
- **Benefits**:
  - Simplifies managing the state of actions
  - Improves user experience by giving visual feedback on state
  - Reduces bugs in the application
- **Use cases**:
  - Form submission
  - API calls
  - Data loading
  - Other asynchronous tasks

### useId

- A hook that generates unique IDs that are stable across renders
- Ensures ID uniqueness across components, especially useful with dynamic rendering
- **Benefits**:
  - Avoids ID collisions in the DOM
  - Ensures consistency between renders
  - Improves accessibility
- **Use cases**:
  - Linking HTML elements together (e.g. `<label>` and `<input>`)
  - Generating unique IDs for elements in dynamic lists
  - Generating IDs for components rendered multiple times

### useWindowDimensions (@microui-kit/use-window-dimensions)

- A hook that returns accurate screen dimensions
- Especially useful on mobile, where the address bar and navigation bar show and hide
- **`isSetProperty` option**:
  - Adds the CSS variables `var(--app-width)` and `var(--app-height)` to the `<html>` tag
  - Use them anywhere in CSS

## Optimization

- Optimizing with `useMemo` and `useCallback`
- Two common re-rendering mistakes
- Tool for bootstrapping full-stack React projects: refine.new

## Docker And Deployment

- **Dockerfile Optimization Techniques**: a detailed analysis of 5 Dockerfile optimization techniques for a React SPA (BusyBox httpd, Distroless Nginx, Scratch Nginx, Go FastHTTP, Alpine Nginx) - [Dockerfile Optimization Techniques](/Technology/Cloud And DevOps/Practices/Dockerfiles/React/Optimization Techniques)

## Design Systems

- **shadcn/ui**: reusable components, Radix UI + Tailwind CSS
- **RetroUI**: a NeoBrutalism-style React component library built on shadcn/ui + Tailwind CSS. Copy-paste ready, TypeScript support. Install via `npx shadcn add @retroui/<component>`. A Pro version offers 100+ premium blocks and templates - https://www.retroui.dev/
- **Neobrutalism Components**: a neobrutalism-style UI component set based on shadcn/ui + Tailwind CSS. WAI-ARIA compliant, open source (MIT). Components: buttons, badges, alerts, forms, cards, carousels, OTP input, breadcrumbs, resizable panels - https://www.neobrutalism.dev/
- **React Bits**: animated, interactive, customizable React components you copy-paste into your project. The free version (open source, [DavidHDev/react-bits](https://github.com/DavidHDev/react-bits)) has 200+ components: text animation, backgrounds, UI, micro interactions; each component comes in 4 variants: JS-CSS, JS-TW, TS-CSS, TS-TW. Install via shadcn or jsrepo, e.g. `npx shadcn@latest add @react-bits/BlurText-TS-TW`. Site: https://reactbits.dev/. The paid [React Bits Pro](https://pro.reactbits.dev/) adds marketing blocks, application UI, templates, and an agent kit; it installs the same shadcn way (`npx shadcn@latest add @reactbits-pro/hero-7`), and the source lives in your own repo.
- **Semi Design**, **Arco Design**, **Tamagui**, **Aceternity UI**, **Magic UI**, **Tremor**, **Mantine**, **9ui**, **seraui**, **Nurui**, **ReUI**, **Blocks**, **basecoat**
- **Icons**: animateicons
- **Components**: xyflow (React Flow)

## SSR - Server-Side Rendering

- **Fastify Vite React**: integrates Fastify, Vite, and React for SSR

### Next.js Rendering Patterns

- **ISG**: Incremental Static Generation - adds dynamic content to static pages
- **ISR**: Incremental Static Regeneration - regenerates static pages over time

### React For Two Computers

- **Concept**: React can run across two different computers, with a focus on React Server Components
- **Difference between tags and function calls**:
  - Tags usually represent nouns, describing structure
  - Function calls usually represent verbs, describing actions
  - Tags are like blueprints; function calls are like recipes
- **Splitting work between two computers**:
  - Part of the work can be done on the first computer (server)
  - The rest is then handed to the second computer (client) to continue
  - This allows optimizing performance and user experience
- **Challenges**:
  - Ensuring the two runtime environments are completely separate
  - Not sharing state or global variables between server and client
  - Ensuring consistency between server-side and client-side rendering
- **Benefits**:
  - Optimizes performance by running part of the logic on the server
  - Reduces load on the client and improves page load time
  - Supports React Server Components to render part of a component on the server

> https://overreacted.io/react-for-two-computers/

### Static Site Generators

- **Nextra**: an SSG based on Next.js

## Visual Builder

- **Plasmic**

## Framework

- **Refine**: a React framework for internal tools, admin panels, dashboards

## Libraries

- **React in Vue / Vue in React**: veaury
- **Build CRUD app**: refine
- **Toolkit for Nextjs**: Blitz.js (Zero-API)
- **Runtime CSS-in-JS**: kuma-ui (zero-runtime)
- **React-scan**: performance analysis
- **Animation**: GSAP, [React Bits](https://reactbits.dev/), **motion** (motiondivision/motion) - a modern animation library for React and JavaScript: https://github.com/motiondivision/motion
- **Cursor Animation**: Cursify - cursor animation library for React and Next.js - https://github.com/ui-layouts/cursify
- **Gesture**: **use-gesture** (pmndrs/use-gesture) - a library providing hooks to recognize and handle gestures such as drag, touch, and scroll in React apps: https://github.com/pmndrs/use-gesture
- **i18n**: react-i18next
- **State management**: Recoil, React Signify
- **Chart**: Victory, Tremor, Recharts, Visx (Airbnb)
- **Rich text editor**: Hackernoon, Plate (Slate.js)
- **PDF Highlighter**: **react-pdf-highlighter-plus** - a modern React library for highlighting and annotating PDFs with many features: text highlights, area highlights, freetext notes, images/signatures, freehand drawing, and exporting the annotated PDF - [GitHub](https://github.com/QuocVietHa08/react-pdf-highlighter-plus) #pdf #annotation #highlight
  - **Highlight types**: Text, Area, Freetext (draggable, editable), Image/Signature, Freehand drawing
  - **Features**: zoom support, coordinate systems (viewport/scaled), PDF export with annotations, context-based API
  - **Main components**: `PdfLoader`, `PdfHighlighter`, `TextHighlight`, `AreaHighlight`, `FreetextHighlight`, `ImageHighlight`, `DrawingHighlight`
  - **Hooks**: `usePdfHighlighterContext()`, `useHighlightContainerContext()`
- **Lint and optimize**: Million.dev
- **Grid Layout**: **react-grid-layout** - a library for draggable, resizable grid layouts with responsive breakpoints for React - [GitHub](https://github.com/react-grid-layout/react-grid-layout) #grid #layout #drag-drop
- **Maps**: **mapcn** (AnmolSaini16/mapcn) - a library of beautiful map components, zero config, one-command setup. Built on MapLibre GL, styled with Tailwind, compatible with shadcn/ui. Features: theme-aware (light/dark mode), markers and popups, routes, controls (zoom, compass, locate, fullscreen) - [GitHub](https://github.com/AnmolSaini16/mapcn) #maps #maplibre #shadcn
- **Component systems**: originui, magicui, cuicui, mantine, dotUI, tailus-ui, [React Bits](https://reactbits.dev/), heroui, starwind-ui, animate-ui
- **Sora UI**: a "motion-first" animated component registry for React/Next.js, copy-paste like shadcn; a major redesign of Animate UI. Stack: React 19, Tailwind CSS v4, Base UI/Radix UI, Motion + GSAP. It has 4 layers: Motion (building blocks and effects), Icons (an animated Lucide icon set), Catalog (showcases, page layouts), UI (base components with Motion + Tailwind built in). There is an official MCP server so AI agents can understand component behavior, constraints, and metadata. MIT - [GitHub](https://github.com/SoraLabsOSS/ui) · [Docs](https://ui.soralabs.studio) #animation #components #motion #shadcn #mcp
- **Novu**: multi-channel notification platform (In-App, Email, SMS, Push, Chat)
- **Graphics**: react-three-fiber (Three.js renderer)
- **NextAuth.js**: an authentication solution for Next.js and React, supporting many sign-in methods such as OAuth, email, and more - [GitHub](https://github.com/nextauthjs/next-auth) #authentication #nextjs #oauth

## Compilers

- **Million.js**: an optimizing compiler, 70% faster

## React Developer Roadmap

### 🔴 Must Know

- **HTML**: Basic, Semantic, Forms, Graphics, Multimedia, APIs
- **JavaScript**: Syntax, DOM Manipulation, IIFE, Scope, Hoisting, Closures, Callbacks, Promises, Async & Await
- **Build Tools**: npm/yarn/pnpm, Webpack/Browserify/Rollup/Parcel, npm scripts
- **State Management**: Redux (Component State, Async Actions, Helpers, Data Persistence)
- **API Clients**: Fetch/axios (REST), Apollo/Relay/urql (GraphQL)

### 🟡 Recommended

- **Styling**: Sass/PostCSS, Bootstrap/Materialize/Bulma, Styled Components, material-ui/react-bootstrap/chakra-ui
- **Type Checkers**: PropTypes, TypeScript
- **Routing**: React Router
- **Utility Libraries**: Lodash, Moment, classnames
- **Testing**: jest (Unit), Karma (Integration), Cypress/Puppeteer (E2E)
- **Internationalization**: React Intl, React i18next
- **Mobile**: React Native

### 🔵 Good to Know

- **CSS Preprocessors**: Less, Stylus
- **CSS in JS**: Radium, Emotion, Aphrodite
- **UI Frameworks**: semantic-ui-react, react-bulma
- **Redux**: Redux Saga/Thunk, Rematch, Reselect, Redux Persist
- **Type Checkers**: Flow
- **Routing**: Router5, Redux-First Router, Reach Router
- **API Clients**: SuperAgent
- **Utility**: Numeral, RxJS, ImmutableJS, Ramda
- **Testing**: Enzyme, Mocha, Chai, Sinon, AVA, Tape, Selenium, Cucumber, Nightwatch
- **Mobile**: Cordova
- **Desktop**: Proton Native, Electron, React Native Windows
- **AR/VR**: React 360, Viro React

> **See also:** [Vue And Nuxt](/Technology/Frontend/Tools/Vue And Nuxt) · [CSS Tools](/Technology/Frontend/Tools/CSS Tools) · [Frontend Overview](/Technology/Frontend/Resources/Frontend Overview)
