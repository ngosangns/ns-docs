---
tags:
  - area/technology
  - domain/frontend
  - topic/react
  - type/resource
  - lang/vi
---

# React - Next.js

## Resources

- Tổng quan hệ sinh thái React 2024
- Khóa học Next.js chính thức
- Hướng dẫn Docker hóa Next.js
- So sánh quản lý state trong React
- Các hook mới React 19

## Hooks

- So sánh `useEffect` và `useLayoutEffect`

### useActionState

- Hook quản lý trạng thái của các hành động bất đồng bộ trong React
- Theo dõi trạng thái của hành động:
  - `pending`: Hành động đang được thực thi
  - `fulfilled`: Hành động đã hoàn thành thành công
  - `rejected`: Hành động đã thất bại
- **Lợi ích**:
  - Đơn giản hóa việc quản lý trạng thái của các hành động
  - Cải thiện trải nghiệm người dùng bằng cách cung cấp phản hồi trực quan về trạng thái
  - Giảm thiểu lỗi trong ứng dụng
- **Trường hợp sử dụng**:
  - Gửi biểu mẫu
  - Gọi API
  - Tải dữ liệu
  - Các tác vụ bất đồng bộ khác

### useId

- Hook tạo ra các ID duy nhất ổn định giữa các lần render
- Đảm bảo tính duy nhất của ID trong các component, đặc biệt hữu ích trong các trường hợp render động
- **Lợi ích**:
  - Tránh xung đột ID trong DOM
  - Đảm bảo tính nhất quán giữa các lần render
  - Cải thiện khả năng truy cập (accessibility)
- **Trường hợp sử dụng**:
  - Kết nối các phần tử HTML với nhau (ví dụ: `<label>` và `<input>`)
  - Tạo ID duy nhất cho các phần tử trong danh sách động
  - Tạo ID cho các component được render nhiều lần

### useWindowDimensions (@microui-kit/use-window-dimensions)

- Hook lấy chính xác kích thước màn hình
- Đặc biệt hữu ích trên mobile khi thanh địa chỉ và điều hướng ẩn/hiện
- **Tùy chọn `isSetProperty`**:
  - Thêm CSS variables `var(--app-width)` và `var(--app-height)` vào thẻ `<html>`
  - Sử dụng trong CSS ở mọi nơi

## Optimization

- Tối ưu với `useMemo` và `useCallback`
- Hai lỗi re-rendering phổ biến
- Công cụ khởi tạo dự án full-stack React: refine.new

## Docker & Deployment

- **Dockerfile Optimization Techniques**: Phân tích chi tiết 5 kỹ thuật tối ưu Dockerfile cho React SPA (BusyBox httpd, Distroless Nginx, Scratch Nginx, Go FastHTTP, Alpine Nginx) - [[./Dockerfile Optimization Techniques]]

## Design Systems

- **shadcn/ui**: Components tái sử dụng, Radix UI + Tailwind CSS
- **RetroUI**: Thư viện component React phong cách NeoBrutalism, xây dựng trên shadcn/ui + Tailwind CSS. Copy-paste ready, hỗ trợ TypeScript. Cài đặt qua `npx shadcn add @retroui/<component>`. Có bản Pro với 100+ premium blocks và templates - https://www.retroui.dev/
- **Neobrutalism Components**: Bộ component UI phong cách neobrutalism, dựa trên shadcn/ui + Tailwind CSS. Tuân thủ WAI-ARIA, open source (MIT). Components: buttons, badges, alerts, forms, cards, carousels, OTP input, breadcrumbs, resizable panels - https://www.neobrutalism.dev/
- **Semi Design**, **Arco Design**, **Tamagui**, **Aceternity UI**, **Magic UI**, **Tremor**, **Mantine**, **9ui**, **seraui**, **Nurui**, **ReUI**, **Blocks**, **basecoat**
- **Icons**: animateicons
- **Components**: xyflow (React Flow)

## SSR - Server-side Rendering

- **Fastify Vite React**: Tích hợp Fastify, Vite và React cho SSR

### Next.js Rendering Patterns

- **ISG**: Incremental Static Generation - Thêm nội dung động vào trang tĩnh
- **ISR**: Incremental Static Regeneration - Tái tạo trang tĩnh theo thời gian

### React cho Hai Máy tính (React for Two Computers)

- **Khái niệm**: React có thể hoạt động trên hai máy tính khác nhau, tập trung vào React Server Components
- **Sự khác biệt giữa thẻ và lời gọi hàm**:
  - Thẻ (tags) thường đại diện cho danh từ, mô tả cấu trúc
  - Lời gọi hàm (function calls) thường là động từ, mô tả hành động
  - Thẻ giống như bản thiết kế (blueprints), lời gọi hàm giống như công thức (recipes)
- **Chia sẻ công việc giữa hai máy tính**:
  - Một phần công việc có thể được thực hiện trên máy tính đầu tiên (server)
  - Sau đó chuyển phần còn lại sang máy tính thứ hai (client) để tiếp tục
  - Cho phép tối ưu hóa hiệu suất và trải nghiệm người dùng
- **Thách thức**:
  - Đảm bảo rằng hai môi trường chạy thời gian hoàn toàn tách biệt
  - Không chia sẻ trạng thái hoặc biến toàn cục giữa server và client
  - Đảm bảo tính nhất quán giữa server-side và client-side rendering
- **Lợi ích**:
  - Tối ưu hóa hiệu suất bằng cách chạy một phần logic trên server
  - Giảm tải cho client, cải thiện thời gian tải trang
  - Hỗ trợ React Server Components để render một phần component trên server

> https://overreacted.io/react-for-two-computers/

### Static Site Generators

- **Nextra**: SSG dựa trên Next.js

## Visual Builder

- **Plasmic**

## Framework

- **Refine**: React Framework cho internal tools, admin panels, dashboards

## Libraries

- **React In Vue - Vue in React**: veaury
- **Build CRUD app**: refine
- **Toolkit for Nextjs**: Blitz.js (Zero-API)
- **Runtime CSS-in-JS**: kuma-ui (zero-runtime)
- **React-scan**: Phân tích hiệu năng
- **Animation**: GSAP, react-bits, **motion** (motiondivision/motion) - Thư viện animation hiện đại cho React và JavaScript: https://github.com/motiondivision/motion
- **Cursor Animation**: Cursify - Cursor animation library for React and Next.js - https://github.com/ui-layouts/cursify
- **Gesture**: **use-gesture** (pmndrs/use-gesture) - Thư viện cung cấp các hook để nhận diện và xử lý các cử chỉ như kéo, chạm và cuộn trong ứng dụng React: https://github.com/pmndrs/use-gesture
- **i18n**: react-i18next
- **State management**: Recoil, React Signify
- **Chart**: Victory, Tremor, Recharts, Visx (Airbnb)
- **Rich text editor**: Hackernoon, Plate (Slate.js)
- **PDF Highlighter**: **react-pdf-highlighter-plus** - Thư viện React hiện đại để highlight và annotate PDF với nhiều tính năng: text highlights, area highlights, freetext notes, images/signatures, freehand drawing, và export PDF đã annotate - [GitHub](https://github.com/QuocVietHa08/react-pdf-highlighter-plus) #pdf #annotation #highlight
  - **Các loại highlight**: Text, Area, Freetext (draggable, editable), Image/Signature, Freehand drawing
  - **Tính năng**: Zoom support, coordinate systems (viewport/scaled), PDF export với annotations, context-based API
  - **Components chính**: `PdfLoader`, `PdfHighlighter`, `TextHighlight`, `AreaHighlight`, `FreetextHighlight`, `ImageHighlight`, `DrawingHighlight`
  - **Hooks**: `usePdfHighlighterContext()`, `useHighlightContainerContext()`
- **Lint and optimize**: Million.dev
- **Grid Layout**: **react-grid-layout** - Thư viện tạo bố cục lưới có thể kéo và thay đổi kích thước, hỗ trợ responsive breakpoints cho React - [GitHub](https://github.com/react-grid-layout/react-grid-layout) #grid #layout #drag-drop
- **Maps**: **mapcn** (AnmolSaini16/mapcn) - Thư viện component bản đồ đẹp, zero config, một lệnh setup. Xây dựng trên MapLibre GL, styled với Tailwind, tương thích với shadcn/ui. Tính năng: theme-aware (light/dark mode), markers & popups, routes, controls (zoom, compass, locate, fullscreen) - [GitHub](https://github.com/AnmolSaini16/mapcn) #maps #maplibre #shadcn
- **Component systems**: originui, magicui, cuicui, mantine, dotUI, tailus-ui, react-bits, heroui, starwind-ui, animate-ui
- **Novu**: Nền tảng thông báo đa kênh (In-App, Email, SMS, Push, Chat)
- **Xử lý đồ họa**: react-three-fiber (Three.js renderer)
- **NextAuth.js**: Giải pháp xác thực cho Next.js và React, hỗ trợ nhiều phương thức đăng nhập như OAuth, email và hơn thế nữa - [GitHub](https://github.com/nextauthjs/next-auth) #authentication #nextjs #oauth

## Compilers

- **Million.js**: Trình biên dịch tối ưu, nhanh hơn 70%

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
