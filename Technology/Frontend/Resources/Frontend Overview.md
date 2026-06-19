---
area: technology
domain: frontend
topic: javascript
type: resource
title: Frontend Overview
description: Frontend - Front-end
timestamp: '2026-06-19T13:43:26.143Z'
tags:
  - technology
  - frontend
  - javascript
resource: https://viblo.asia/p/gioi-thieu-ve-web-components-07LKXxkpKV4
---
# Frontend - Front-end

## Nền tảng & Khái niệm

### Web APIs

- **Tài liệu**: MDN Web API, Viblo, caniuse.com, webstatus.dev, rumarchive.com
- **Long Animation Frames API**: Phát hiện frames chậm >50ms, gây jank
- **StorageManager API**: Quản lý persistence, ước tính dung lượng (`navigator.storage`)
- **WebGPU**: API đồ họa mới, kế nhiệm WebGL, hỗ trợ Vulkan/Metal/Direct3D 12
- **WebRTC**: Công nghệ mã nguồn mở cho phép truyền thông real-time (audio, video, data) giữa các trình duyệt qua P2P
  - **Thành phần chính**: Signaling Server, STUN/TURN Server, RTCPeerConnection, MediaStream, RTCDataChannel
  - **Use cases**: Video call, voice call, screen sharing, file sharing, real-time gaming
  - Xem chi tiết: [Webrtc](/Technology/Frontend/Concepts/Webrtc) #webrtc #real-time #p2p #video-call
- **APIs khác**: Prompt API, Translator API, HTML Selects styleable

### Storage

- **Loại**: Local Storage, IndexedDB, Session Storage, Cookies, Cloud Storage
- **Pattern**: Storage Strategy Pattern với `IStorageStrategy` và `StorageManager`

### Web Components

- Giới thiệu: https://viblo.asia/p/gioi-thieu-ve-web-components-07LKXxkpKV4

### Mô hình Kiến trúc

- **SPA**: Single-Page Application (React, Angular, Vue.js)
- **SSR**: Server-Side Rendering (Next.js, Nuxt.js) - SEO tốt, tải nhanh
- **SSG**: Static Site Generation - Tốc độ nhanh, bảo mật cao
- **ISG**: Incremental Static Generation - Thêm nội dung động vào trang tĩnh
- **ISR**: Incremental Static Regeneration - Tái tạo trang tĩnh theo thời gian

### Workers

- **Service Worker**: Worker nền, proxy web-mạng, caching, push notifications, offline mode
- **Web Worker**: Xử lý tác vụ nặng, không truy cập DOM, giao tiếp qua message passing

### Tài liệu

- **Patterns.dev**: Tài nguyên trực tuyến miễn phí về design patterns, rendering và performance patterns cho frontend
  - **Design Patterns**: JavaScript (Singleton, Proxy, Prototype, Observer, Module, Mixin, Mediator/Middleware, Flyweight, Factory), React (Container/Presentational, HOC, Render Props, Hooks, Compound), Vue (Components, Async Components, Composables, Container/Presentational)
  - **Rendering Patterns**: Client-side Rendering (CSR), Server-side Rendering (SSR), Static Rendering, Incremental Static Generation (ISG), Progressive Hydration, Streaming SSR, React Server Components
  - **Performance Patterns**: Loading Optimization (Static/Dynamic Import, Import On Visibility/Interaction), Code Splitting (Route Based, Bundle Splitting), PRPL Pattern, Tree Shaking, Preloading (Preload/Prefetch), Third-party Optimization, List Virtualization, JavaScript Compression, Animating View Transitions
  - Cung cấp sách điện tử và tài liệu trực tuyến, có thể đọc và tải về offline
  - Website: https://www.patterns.dev/ #design-patterns #rendering #performance #frontend
- **HTML Standard** (https://html.spec.whatwg.org/): Tài liệu chính thức về HTML Living Standard từ WHATWG
  - Bao gồm: Semantics, structure, APIs, elements, microdata, user interaction, loading web pages, web application APIs, communication, web workers, worklets, web storage, HTML/XML syntax, rendering
  - Có nhiều format: One-page version, multipage version, version for web devs, PDF version
  - Có translations: Tiếng Nhật, Tiếng Trung
  - Có tests: web-platform-tests
  - Có FAQ và chat trên Matrix

## Kiến trúc & Quản lý

### Micro Frontend

- Khái niệm: Mở rộng microservice cho frontend
- **Thư viện**: qiankun
- **Bài viết**: Shared Dependencies, chập chững làm quen

### Mono-repo

- **Nx**, **Lerna**

## Build & Development Tools

### Compilers & Bundlers

- **SWC**: Speedy Web Compiler - compilation, bundling, minification, WebAssembly

### Builders

- **Rsbuild**, **Vite**

### Static Site Generators

- **Astro**, **Quartz** (digital garden)

## Performance

### Tổng quan

- Frontend Performance patterns, Core Web Vitals

### Core Web Vitals

- **CLS**: Cumulative Layout Shift
- **INP**: Interaction to Next Paint - `requestIdleCallback()`, lazy rendering

### Tối ưu JavaScript

- Defer/Async/Inline, `rel="preload"`

### Nghiên cứu

- Speeding up JavaScript ecosystem (Marvin Hagemeister), canvas engines comparison, CSS Wrapped 2023

## UI/UX & Design Systems

### Design Systems

- **CSS Frameworks**: Bulma, Shoelace, UIkit, Pico.css, Tachyons
- **Design Systems**: Fluent Design, Material Design, Primer, Atlassian, Oku UI, Zag, DynaUI, Magic UI, VS Code Elements, LayUI, Material Web Components
- **ag-ui**: UI protocol framework - https://github.com/ag-ui-protocol/ag-ui #UI #protocol
- **Magentic UI**: Thư viện giao diện người dùng do Microsoft phát triển, tập trung vào việc tạo ra các thành phần UI hiện đại và dễ sử dụng - [GitHub](https://github.com/microsoft/magentic-ui) #UI #library #microsoft

### Tailwind CSS

- **Tài liệu**: Cheat sheets (Nerdcave, Flowbite), Official Docs
- **Công cụ**: Multitool
- **Components**: Tailwind UI, Headless UI, Tailblocks, Flowbite, Meraki UI, HyperUI, Preline UI, Konsta UI, Pines, Tailspark, Windstatic, TW-Elements, Mamba UI
- **Page Builders**: Tailblocks, Tails

### Bootstrap

- **FastBootstrap**

### CSS-in-JS & Styling

- **CVA**: Class Variance Authority
- **Linaria**: CSS-in-JS build time
- **Panda CSS**: CSS-in-JS build time

### UI Components Libraries

- **DaisyUI**, **UI verse**, **LDRS**, **Particles.js**, **Bit**, **Omi**, **Vant**, **Liquid Glass**
- **ReUI**: Bộ sưu tập mã nguồn mở các thành phần giao diện người dùng và hiệu ứng động được xây dựng bằng React, TypeScript, Tailwind CSS và Motion. Pairs beautifully with shadcn/ui - [GitHub](https://github.com/keenthemes/reui) #React #UI #components #TailwindCSS #Motion
- **Modern UI**: Bộ sưu tập các thành phần giao diện người dùng có thể tái sử dụng, được xây dựng với Radix UI và Tailwind CSS, sẵn sàng cho Next.js 15, lấy cảm hứng từ Shadcn UI
  - **Tính năng chính:**
    - Cài đặt component và hooks đơn giản qua CLI (`npx @modern-core/ui add <component>`)
    - Hỗ trợ Next.js và Vite với tự động phát hiện framework
    - Tự động thiết lập Tailwind CSS
    - Quản lý dependency thông minh
    - Hỗ trợ TypeScript
    - Quản lý version cho components
    - Cấu hình path aliases tự động
    - Import paths tùy chỉnh cho hooks và utilities
  - **Theme support**: Default theme và Blue theme với cấu hình Tailwind tùy chỉnh
  - **Component installation**: Cài đặt cả UI components và custom hooks
  - **Version management**: Kiểm tra, cài đặt và cập nhật version cụ thể
  - [GitHub](https://github.com/thangdevalone/modern-ui) | [Website](https://modern-ui.org) | [NPM](https://www.npmjs.com/package/@modern-core/ui) #React #UI #components #RadixUI #TailwindCSS #Next.js15 #shadcn-ui

### Components Chuyên biệt

- **Table**: RevoGrid (Excel-like)
- **Slider**: Tiny-slider
- **Upload**: Dropzone
- **Icons**: Flag Icons, Animated Icons
- **SVG Logos**: **SVGL** - Thư viện chứa các logo SVG đẹp mắt, được xây dựng bằng Sveltekit và Tailwind CSS
  - Cung cấp bộ sưu tập logo SVG đa dạng, tối ưu hóa cho web
  - Công nghệ sử dụng: Sveltekit và Svelte 5, TypeScript, Tailwind CSS, Content-Collections, Shiki
  - Hỗ trợ nhiều định dạng: logo đơn giản, logo kèm wordmark, logo hỗ trợ light & dark mode, logo đầy đủ với tất cả properties
  - Yêu cầu khi đóng góp: đảm bảo có quyền sử dụng logo, tối ưu hóa SVG cho web và giữ lại thuộc tính `viewBox`, kích thước mỗi file SVG không vượt quá 21KB
  - [Website](https://svgl.app) | [GitHub](https://github.com/pheralb/svgl) #SVG #logos #Sveltekit

- **Charts**: Charts.css, D3.js, Chart.js, Ant Design Charts
- **Fonts**: Bunny Fonts, Google Fonts, Monaspace
- **Text Editor**: Slate, Froala, MDXEditor, Summernote, TinyMCE, Lexical, Quill, **Tiptap** - Trình soạn thảo văn bản phong phú dựa trên ProseMirror, linh hoạt và có thể mở rộng - [GitHub](https://github.com/ueberdosis/tiptap), **Milkdown** - Khung công tác WYSIWYG markdown dựa trên plugin - [GitHub](https://github.com/Milkdown/milkdown) #markdown #WYSIWYG, Monaco Editor
- **Math Editor**: MathLive
- **Map**: Tiny World Map, Leaflet
- **File Manager**: elFinder
- **Drag & Drop**: Swapy
- **Color Picker**: iro.js

### Công cụ Phát triển UI

- **Storybook**: Phát triển components cô lập

### HTML/Page Builders

- **GrapesJS**, **EasyFrontend**, **Builder.io**, **DevDojo HTML Builder**
- **Frappe Builder**: Trình xây dựng trực quan giúp tạo các trang web đẹp mắt một cách dễ dàng và xuất bản chúng ngay lập tức - [GitHub](https://github.com/frappe/builder) #page-builder #visual-builder

## JavaScript Libraries

### Frameworks

- **SolidJS**: Framework khai báo, hiệu quả
- **Slint**: UI framework đa nền tảng, cho phép phát triển giao diện đồ họa hiệu suất cao bằng ngôn ngữ khai báo - [GitHub](https://github.com/slint-ui/slint)

### Đồ họa & Animation

- **Paper.js**: Đồ họa vector reactive
- **PixiJS**: HTML5 Creation Engine - Bộ render 2D WebGL và WebGPU nhanh nhất, linh hoạt nhất cho web. Hỗ trợ WebGL & WebGPU renderers, asset loader, mouse & multi-touch, text rendering, primitive và SVG drawing, dynamic textures, masking, filters, blend modes - [GitHub](https://github.com/pixijs/pixijs) #WebGL #WebGPU #rendering
- **Anime.js**: Thư viện JavaScript nhẹ để tạo hoạt ảnh, hỗ trợ các thuộc tính CSS, SVG, DOM và JavaScript. API đơn giản và mạnh mẽ cho các hiệu ứng animation phức tạp - [GitHub](https://github.com/juliangarnier/anime) #animation #javascript
- **Transition/Animation**: Barba.js, Lax.js

### Visual Programming

- **Rete**: Framework mã nguồn mở để xây dựng trình chỉnh sửa node-based (visual programming) trong trình duyệt. Cho phép tạo các giao diện lập trình trực quan với các node và kết nối giữa chúng - [GitHub](https://github.com/retejs/rete) #visual-programming #node-editor
- **FARA**: Framework reactive của Microsoft - [GitHub](https://github.com/microsoft/fara) #reactive #framework #microsoft

### Utilities

- **Hotkeys**: Hotkeys.js
- **HTMX**: Mở rộng HTML (AJAX, CSS Transitions, WebSockets, SSE). Cho phép truy cập các tính năng mạnh mẽ của HTML để tạo ra các ứng dụng web động mà không cần JavaScript phức tạp. Hỗ trợ các yêu cầu HTTP như GET, POST, PUT, DELETE trực tiếp từ các thuộc tính HTML - [GitHub](https://github.com/bigskysoftware/htmx) #html #ajax #websockets
- **Date**: Date-fns
- **Scroll**: Body-scroll-lock-upgrade, fullPage.js
- **Bot Detection**: BotD (FingerprintJS)
- **Image**: Perspective.js
- **Database**: RxDB (NoSQL client-side)
- **Web Components**: Polymer
- **i18n**: i18next
- **jQuery Plugins**: Selectize.js
- **Geospatial**: h3 - Hệ thống phân chia địa lý đa cấp, mã hóa và phân tích dữ liệu không gian - [GitHub](https://github.com/h3js/h3)
- **Real-time State Sync**: Livestore - Đồng bộ hóa trạng thái ứng dụng theo thời gian thực giữa máy khách và máy chủ - [GitHub](https://github.com/livestorejs/livestore)

### Mobile Development

- **Capacitor**: Ứng dụng mobile native với HTML/CSS/JS

## Templates & Resources

### Admin Templates

- **Metronic**: Template admin đa dạng
- **Tabler**: UI Kit Dashboard HTML, mã nguồn mở, Bootstrap

## UI/UX Design Intelligence

### UI UX Pro Max

**UI UX Pro Max** (https://ui-ux-pro-max-skill.nextlevelbuilder.io/) là design intelligence skill cho Claude Code, cung cấp database có thể tìm kiếm về UI styles, color palettes, font pairings, chart types, và UX guidelines.

- **Tính năng chính:**
  - **Design Styles**: 57+ UI styles (Glassmorphism, Neumorphism, Minimalism, Brutalism, Aurora UI, etc.) với colors, effects, và framework compatibility
  - **Color Palettes**: 95+ color systems cho SaaS, E-commerce, Healthcare, Fintech, etc. Bao gồm Primary, Secondary, CTA, Background, Text, Border
  - **Typography**: 56+ font pairings với Google Fonts integration, Tailwind configs, mood-based recommendations
  - **Chart Types**: 24 chart types với library suggestions (Chart.js, Recharts, D3.js) và accessibility notes
  - **Landing Patterns**: 29 conversion-optimized page structures với CTA placement strategies và color recommendations
  - **UX Guidelines**: Best practices và anti-patterns cho animation, accessibility, z-index, loading states, performance

- **Tech Stacks hỗ trợ:**
  - React, Next.js, Vue, Svelte, SwiftUI, React Native, Flutter, Tailwind
  - Framework-specific best practices, patterns, và code examples

- **Workflow:**
  1. User prompt → AI reasoning (phân tích product, style, typography, color, landing, UX domains)
  2. Search design database → Tìm kiếm và đề xuất phù hợp
  3. Generate code → Tạo code với colors, fonts, styles đã chọn
  4. Quality checklist → Kiểm tra SVG icons, hover feedback, dark mode contrast, responsive layout
  5. Final result → Production-ready UI

- **Tính năng:**
  - Open source
  - Claude Code compatible
  - Production ready
  - Searchable database
  - AI-powered design recommendations