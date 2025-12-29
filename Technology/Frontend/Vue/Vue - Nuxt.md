---
tags:
  - cheatsheet
  - frontend
  - frontend-development
  - libraries
  - nuxt
  - reactive
  - tips
  - validating
  - vietnamese
  - vue
  - web-development
  - area/technology
  - domain/frontend
  - topic/vue
  - topic/nuxt
  - type/resource
  - lang/vi
---

# Vue - Nuxt

## Mẹo Vue - Nuxt

### Validating

- Kiểm tra validate nhiều thành phần: Dùng `Array.every()` để kiểm tra tất cả validate đúng
- Hiện/ẩn nút "Save changes":
  - Ít nhất một property thay đổi: `Array.some()`
  - Toàn bộ validate đúng: `Array.every()`

### Reactive

- Class Component Decorator - biến non-reactive:
  - Khai báo biến trong method
  - Khai báo property không gán giá trị ban đầu, chỉ gán trong method

## Khác

- Thi chứng chỉ Vue: certification.vuejs.org
- Test Vue code online: vue-live.surge.sh
- Build full-stack scaffold: sidebase.io

## Libraries & Công cụ

### Form

- **Form Validation**:
  - **Vee-validate**: Mạnh mẽ, dễ sử dụng, tích hợp tốt (dự án vừa và lớn)
  - **Vuelidate-next**: Đơn giản, dựa trên model (dự án nhỏ và vừa)
  - **vue-tiny-validate**: Nhỏ gọn (dự án nhỏ)
  - **vorms**: Lựa chọn khác
- **Form Generator/Builder**:
  - **vue-flow-form**: Form flow (wizard, khảo sát)
  - **form-create**: Generator mạnh, tạo form động từ JSON
  - **blitzar**: Lựa chọn khác
  - **Vue form builder**: Kéo thả trực quan

### State Management

- **Pinia**: Quản lý state chính thức của Vue

### Routing

- **Vue Router**: Router chính thức
- **vue-router-better-scroller**: Cải thiện scroll behavior

### UI Components & Design Systems

- **Design Systems**: Nuxt UI, UI Libs, Varlet, Vuestic UI, Naive UI, Equal, Vuesax, Quasar, Element Plus, Buefy, Vue Storefront UI, Maz-UI, Indielayer, Vueye, Chakra UI Vue, Vunix, Inkline, Radix Vue, PrimeVue, Vue Data UI, una-ui
- **Material Design**: Vuetify, Vue Material, Varlet (Mobile)
- **UI Components đặc biệt**:
  - **Notification**: notivue
  - **Toast**: vue3-toastify
  - **Multiple-select**: vue-multiselect
  - **Calendar**: Qalendar, Gantt Schedule Timeline Calendar
  - **Text editor**: vue-quill (Quill)
  - **Telephone input**: intl-tel-input

### Table & Data Grid

- **Sortable element**: sortablejs-vue3
- **Datagrid table**: handsontable.com (Excel-like)
- **nuxt-lego**: Module Nuxt.js xây dựng UI kiểu "Lego"
- **vue-devui**: Bộ component UI
- **G2Plot**: Thư viện biểu đồ trực quan
- **arco-design-vue**: Bộ component UI chất lượng cao

### Testing

- **Vitest**: Testing framework hiện đại, tương thích Vite
- **Cypress**: End-to-end testing

### HTTP Requests

- **vue-request**: Hook quản lý HTTP request

### I18n

- **vue-i18n**: Thư viện i18n chính thức
- **fluent-vue**: Dựa trên Project Fluent

### Utilities

- **vueuse**: Bộ sưu tập composition API
- **vue-bind-once**: Binding data một lần
- **vue-composable**: Bộ sưu tập composable functions
- **Resource**: madewithvuejs.com
- **React In Vue - Vue in React**: veaury
- **Vue query**: vue-query, vue-api-query
- **vue-promised**: Promise cho template
- **floating-vue**: Tạo component floating
- **tresjs**: Three.js trong Vue
- **NativeScript-Vue**: Build native app
- **fullpage.js**: Full page scroll
- **vue-mathlive**: Math field

### CSS

- **pinceau**: CSS compiler

## Tools - Online tools

- **Histoire**: Tạo document
- **Vue Devtools**: Có sẵn trên trình duyệt

## Design system for mobile

- **Framework7**

## Interview

- [[Các câu hỏi phỏng vấn VueJS]]

## Template

- **nuxtwind-daisy**
- **Admin template**: admin-one-vue-tailwind, vue-element-admin

## Cheatsheets

- (PDF references)
