---
tags:
  - area/technology
  - domain/frontend
  - topic/javascript
  - type/resource
  - lang/vi
---

# Frontend - Front-end

## Nền tảng & Khái niệm

### Web APIs

- **Tài liệu**: MDN Web API, Viblo, caniuse.com, webstatus.dev, rumarchive.com
- **Long Animation Frames API**: Phát hiện frames chậm >50ms, gây jank
- **StorageManager API**: Quản lý persistence, ước tính dung lượng (`navigator.storage`)
- **WebGPU**: API đồ họa mới, kế nhiệm WebGL, hỗ trợ Vulkan/Metal/Direct3D 12
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

- Patterns.dev: Design, rendering, performance patterns

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

### Components Chuyên biệt

- **Table**: RevoGrid (Excel-like)
- **Slider**: Tiny-slider
- **Upload**: Dropzone
- **Icons**: Flag Icons, Animated Icons
- **Charts**: Charts.css, D3.js, Chart.js, Ant Design Charts, Rete.js
- **Fonts**: Bunny Fonts, Google Fonts, Monaspace
- **Text Editor**: Slate, Froala, MDXEditor, Summernote, TinyMCE, Lexical, Quill, Tiptap, Monaco Editor
- **Math Editor**: MathLive
- **Map**: Tiny World Map, Leaflet
- **File Manager**: elFinder
- **Drag & Drop**: Swapy
- **Color Picker**: iro.js

### Công cụ Phát triển UI

- **Storybook**: Phát triển components cô lập

### HTML/Page Builders

- **GrapesJS**, **EasyFrontend**, **Builder.io**, **DevDojo HTML Builder**

## JavaScript Libraries

### Frameworks

- **SolidJS**: Framework khai báo, hiệu quả

### Đồ họa & Animation

- **Paper.js**: Đồ họa vector reactive
- **PixiJS**: HTML5 engine, WebGL 2D renderer
- **Transition/Animation**: Barba.js, Lax.js

### Utilities

- **Hotkeys**: Hotkeys.js
- **HTMX**: Mở rộng HTML (AJAX, CSS Transitions, WebSockets, SSE)
- **Date**: Date-fns
- **Scroll**: Body-scroll-lock-upgrade, fullPage.js
- **Bot Detection**: BotD (FingerprintJS)
- **Image**: Perspective.js
- **Database**: RxDB (NoSQL client-side)
- **Web Components**: Polymer
- **i18n**: i18next
- **jQuery Plugins**: Selectize.js

### Mobile Development

- **Capacitor**: Ứng dụng mobile native với HTML/CSS/JS

## Templates & Resources

### Admin Templates

- **Metronic**: Template admin đa dạng
- **Tabler**: UI Kit Dashboard HTML, mã nguồn mở, Bootstrap
