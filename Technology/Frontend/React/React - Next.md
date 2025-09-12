---
tags:
  - design
  - detailed
  - frontend
  - frontend-development
  - hooks
  - kinh
  - next
  - optimization
  - react
  - resources
  - systems
  - tutorial
  - vietnamese
  - web-development
---

# 1. Resources

- Tổng quan hệ sinh thái React 2024: https://dev.to/avinashvagh/react-ecosystem-in-2024-418k
- Khóa học Next.js chính thức: https://nextjs.org/learn
- Hướng dẫn Docker hóa ứng dụng Next.js: https://medium.com/@renanleonel/dockerizing-next-js-a3d9c51c0182
- So sánh các giải pháp quản lý state trong React: https://200lab.io/blog/react-state-managent
- Các hook mới được giới thiệu trong React 19: https://viblo.asia/p/react-19-beta-da-duoc-phat-hanh-GyZJZdAGVjm

# 2. Hooks

- So sánh `useEffect` và `useLayoutEffect` qua kinh nghiệm thực tế: https://viblo.asia/p/useeffect-vs-uselayouteffect-trong-react-kinh-nghiem-thuc-te-W13VMykDVY7

# 3. Optimization

- Tối ưu hóa hiệu suất ứng dụng React với `useMemo` và `useCallback`: https://viblo.asia/p/toi-uu-hoa-hieu-suat-voi-usememo-va-usecallback-o-Rk74a1nA4eO

# 4. Kinh nghiệm

- Hai lỗi re-rendering phổ biến khi xây dựng ứng dụng React: https://hudy9x.substack.com/p/two-simple-re-rendering-pitfalls
- Công cụ khởi tạo dự án full-stack React: https://refine.new
- [[Top 50 React interview quetions]]

# 5. Design Systems

Các hệ thống component UI phổ biến và đáng chú ý:

- shadcn/ui: https://github.com/shadcn/ui
	- shadcnregistry: https://shadcnregistry.com
- Semi Design (DouyinFE): https://github.com/DouyinFE/semi-design
- Arco Design: https://github.com/arco-design/arco-design
- Tamagui: https://github.com/tamagui/tamagui
- Aceternity UI: https://ui.aceternity.com/components
- Magic UI: https://github.com/magicuidesign/magicui
- Tremor: https://github.com/tremorlabs/tremor
- https://github.com/mantinedev/ui.mantine.dev
- https://github.com/borabaloglu/9ui
- [seraui/seraui: A helpful UI library for design engineers. Use cool animations and components with just a copy and paste. Free and open source](https://github.com/seraui/seraui)
- [afsar-dev/Nurui: 🔥💯 Nur UI is a modern React and Next.js based UI component library. It streamlines front-end development with powerful features like CLI scaffolding, automatic TypeScript-to-JavaScript conversion, and live component previews by v0.dev.](https://github.com/afsar-dev/Nurui)

## 5.1. Icons

- [Avijit07x/animateicons: A sleek React library for animated SVG icons that move with purpose. Transform static designs into engaging user experiences with smooth, performant animations.](https://github.com/Avijit07x/animateicons)

# 6. SSR - Server-side Rendering

- Fastify Vite React: Bản phát hành tích hợp Fastify, Vite và React cho SSR. https://github.com/fastify/fastify-vite/releases/tag/react-v1.0.0

# 7. Visual builder

- https://github.com/plasmicapp/plasmic

# 8. Framework

- https://github.com/refinedev/refine: A React Framework for building internal tools, admin panels, dashboards & B2B apps with unmatched flexibility

# 9. Libraries

Danh sách các thư viện hữu ích trong hệ sinh thái React/Next.js:

* React In Vue - Vue in React (veaury): Cho phép nhúng component React vào Vue và ngược lại. Hữu ích cho việc chuyển đổi dự án hoặc tái sử dụng component. Xem thêm [[Vue - Nuxt]].
* Build CRUD app (refine): Framework React giúp xây dựng nhanh các ứng dụng CRUD, dashboard, admin panel với các hook, component và tích hợp backend sẵn có.
* Toolkit for Nextjs (Blitz.js): Framework fullstack dựa trên Next.js, cung cấp trải nghiệm "Zero-API", đơn giản hóa việc xây dựng ứng dụng web hoàn chỉnh.
* Runtime CSS-in-JS (kuma-ui): Thư viện CSS-in-JS "zero-runtime", xử lý CSS tại thời điểm build, cho phép viết CSS trực tiếp trong component mà không ảnh hưởng hiệu năng runtime.
* React-scan: Công cụ phân tích hiệu năng, giúp phát hiện component render chậm, render không cần thiết và các vấn đề khác.
* Animation:
	* https://github.com/greensock/GSAP
	* https://github.com/DavidHDev/react-bits
* i18n (react-i18next): Framework quốc tế hóa phổ biến cho React, dựa trên i18next, giúp quản lý bản dịch và định dạng.
* State management:
    * Recoil: Thư viện quản lý state từ Meta, tiếp cận linh hoạt, gần gũi với React hooks (atoms, selectors).
    * React Signify: (Cần tìm hiểu thêm) - Một thư viện quản lý state khác cho React.
* Chart:
    * Victory: Bộ component React để xây dựng biểu đồ tương tác, tùy chỉnh.
    * Tremor: Bộ component UI React để xây dựng dashboard nhanh chóng, bao gồm các loại biểu đồ.
    * Recharts: Thư viện biểu đồ composable cho React, xây dựng trên D3.js, linh hoạt.
* Rich text editor:
    * Hackernoon rich text editor: Trình soạn thảo rich text mã nguồn mở, tập trung vào Markdown, giao diện sạch.
    * Plate: Framework xây dựng trình soạn thảo rich text mạnh mẽ, linh hoạt, mở rộng cao trong React (dựa trên Slate.js).
* Lint and optimize React component:
    * Million.dev: Công cụ tối ưu hiệu năng component React bằng cách tạo Virtual DOM nhẹ và nhanh hơn.
* Component systems: (Các bộ sưu tập component UI dựng sẵn)
    * originui: Bộ component UI cho React.
    * magicui: Bộ sưu tập component React/Next.js với hiệu ứng đẹp mắt (thường dùng Tailwind CSS).
    * cuicui: Bộ component UI cho React.
    * mantine: Bộ component và hook UI đầy đủ tính năng, tùy chỉnh cao.
    * dotUI: Bộ component UI cho React.
    * tailus-ui: Bộ sưu tập component UI xây dựng trên Tailwind CSS.
    * react-bits: Tập hợp các component, hook và pattern hữu ích.
    * heroui: Bộ component UI miễn phí xây dựng bằng Tailwind CSS.
    * starwind-ui: Bộ component UI cho React, xây dựng trên Tailwind CSS.
    * https://github.com/animate-ui/animate-ui
- Novu là một nền tảng mã nguồn mở giúp các nhà phát triển dễ dàng triển khai và quản lý hệ thống thông báo đa kênh cho ứng dụng web và di động ([GitHub](https://github.com/novuhq/novu")). Novu cung cấp một API thống nhất cho phép gửi thông báo qua nhiều kênh khác nhau như:
	- In-App (trong ứng dụng)
	- Email
	- SMS
	- Push Notification
	- Chat (Slack, Discord, Microsoft Teams, v.v.)
	- Thay vì tích hợp riêng lẻ với từng nhà cung cấp dịch vụ thông báo (như SendGrid, Twilio, Firebase, v.v.), Novu cho phép bạn kết nối tất cả thông qua một API duy nhất, giúp đơn giản hóa quá trình phát triển và bảo trì hệ thống thông báo.

# 10. Compilers

- Million.js: Trình biên dịch tối ưu hóa cực nhanh và nhẹ, giúp component React nhanh hơn tới 70%. https://github.com/aidenybai/million


# 11. 🛣️ React Developer Roadmap

> Legend:  
> 🔴 Must know
> 🟡 Recommended
> 🔵 Good to know
> ⚪ Backdated/Alternative

## 11.1. 🔴 HTML

- Learn Basic HTML
- Semantic HTML
- HTML Forms
- HTML Graphics
- HTML Multimedia
- HTML APIs
    - Web Storage API
    - Geolocation API

## 11.2. 🔴 JavaScript

- Learn Syntax and Basic Operations
- DOM Manipulation
- IIFE (Immediately Invoked Function Expression)
- Scope
- Hoisting
- Closures
- Callbacks
- Promises
- Async & Await

## 11.3. 🔴 Build Tools

### 11.3.1. 📦 Package Managers

- 🔴 npm
- 🔴 yarn
- 🔴 pnpm

### 11.3.2. 📦 Module Bundlers

- 🔴 Webpack
- 🔴 Browserify
- 🔴 Rollup
- 🔴 Parcel
- ⚪ Fusebox

### 11.3.3. 🔧 Task Runners

- 🔴 npm scripts
- ⚪ gulp
- ⚪ Grunt

## 11.4. 🟢 Styling

### 11.4.1. 🎨 CSS Preprocessors

- 🟡 Sass/CSS
- 🔵 PostCSS
- 🔵 Less
- 🔵 Stylus

### 11.4.2. 📦 CSS Frameworks

- 🔴 Bootstrap
- 🟡 Materialize
- 🟡 Bulma
- 🟡 Semantic UI

### 11.4.3. 🧩 CSS in JS

- 🟢 Styled Components
- 🔵 Radium
- 🔵 Emotion
- 🔵 Aphrodite

### 11.4.4. 🧱 UI Frameworks

- 🟡 material-ui
- 🟡 react-bootstrap
- 🟡 chakra-ui
- 🔵 semantic-ui-react
- 🔵 react-bulma

## 11.5. 🔴 State Management

### 11.5.1. 🔴 Redux

- 🔴 Component State
- 🔴 Async Actions
    - 🟡 Redux Saga
    - 🟡 Redux Thunk
    - 🔵 Redux Better Promise
    - 🔵 Redux Observable
- 🔵 Helpers
    - 🔵 Rematch
    - 🔵 Reselect
- 🔵 Data Persistence
    - 🔵 Redux Persist
    - 🔵 Redux Phoenix

### 11.5.2. 🟡 MobX

## 11.6. 🟢 Type Checkers

- 🟡 PropTypes
- 🟢 TypeScript
- 🔵 Flow

## 11.7. 🟢 Routing

- 🔴 React Router
- 🔵 Router5
- 🔵 Redux-First Router
- 🔵 Reach Router

## 11.8. 🔴 API Clients

### 11.8.1. 🔴 REST

- 🔴 Fetch
- 🔵 SuperAgent
- 🔴 axios

### 11.8.2. 🟡 GraphQL

- 🟡 Apollo
- 🔵 Relay
- 🔵 urql

## 11.9. 🟢 Utility Libraries

- 🟡 Lodash
- 🟡 Moment
- 🔵 classnames
- 🔵 Numeral
- 🔵 RxJS
- 🔵 ImmutableJS
- 🔵 Ramda

## 11.10. 🟢 Testing

### 11.10.1. 🧪 Unit Testing

- 🟡 jest
- 🔵 Enzyme
- 🔵 Mocha
- 🔵 Chai
- 🔵 Sinon
- 🔵 AVA
- 🔵 Tape

### 11.10.2. 🧩 Integration Testing

- 🔵 Karma

### 11.10.3. 🧪 End-to-End Testing

- 🔵 Selenium
- 🔵 Cypress
- 🔵 Puppeteer
- 🔵 Cucumber
- 🔵 Nightwatch

## 11.11. 🟢 Internationalization

- 🔵 React Intl
- 🟡 React i18next

## 11.12. 🟡 Mobile Application

- 🟡 React Native
- 🔵 Cordova

## 11.13. 🟡 Desktop Application

- 🟡 Proton Native
- 🟡 Electron
- 🔵 React Native Windows

## 11.14. 🟡 React AR/VR

- 🟡 React 360
- 🔵 Viro React
