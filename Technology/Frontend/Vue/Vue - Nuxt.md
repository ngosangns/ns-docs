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

# 1. Mẹo Vue - Nuxt

## 1.1. Validating

- Khi kiểm tra validate của nhiều thành phần con khác nhau, cần đảm bảo tất cả các validate đều đúng. Sử dụng `Array.every()` để kiểm tra một mảng các flag validate.
- Khi kiểm tra hiện/ẩn nút "Save changes":
    - Cần ít nhất một property thay đổi: `Array.some()`
    - Toàn bộ validate phải đúng: `Array.every()`

## 1.2. Reactive

- Khi làm việc với Class Component Decorator, để một biến trở thành *non-reactive*:
    - Khai báo biến trong method.
    - Khai báo biến như property nhưng không gán giá trị ban đầu, chỉ gán trong method.

# 2. Khác

- Thi chứng chỉ Vue: https://certification.vuejs.org
- Test Vue code online: http://vue-live.surge.sh
- Build full-stack scaffold Vue - Nuxt: https://sidebase.io

# 3. Libraries và Công cụ

## 3.1. Form

### 3.1.1. Form Validation

- **Vee-validate:** https://vee-validate.logaretm.com
    - Thư viện validation mạnh mẽ, dễ sử dụng, tích hợp tốt với Vue.
    - Phù hợp cho các dự án vừa và lớn.
- **Vuelidate-next:** https://vuelidate-next.netlify.app
    - Validation đơn giản, dựa trên model.
    - Thích hợp cho các dự án nhỏ và vừa, hoặc khi cần validation đơn giản.
- **vue-tiny-validate:** https://vue-tiny-validate.js.org
    - Thư viện validation nhỏ gọn.
    - Phù hợp cho các dự án nhỏ, hoặc khi muốn giảm thiểu bundle size.
- **vorms:** https://github.com/Mini-ghost/vorms
    - Một lựa chọn khác cho validation form, đáng để xem xét.

### 3.1.2. Form Generator / Builder

- **vue-flow-form:** https://github.com/ditdot-dev/vue-flow-form
    - Tạo form theo dạng flow (tuần tự các bước).
    - Thích hợp cho các khảo sát, wizard...
- **form-create:** https://github.com/xaboy/form-create
    - Generator form mạnh mẽ, có thể tạo form động từ cấu hình JSON.
    - Phù hợp cho các dự án lớn, cần tạo form phức tạp.
- **blitzar:** https://github.com/cycraft/blitzar
    - Một lựa chọn khác cho form generator.
- **Vue form builder:** https://builder.vueform.com
    - Công cụ kéo thả để tạo form trực quan.
    - Thích hợp cho người không chuyên về code, hoặc cần tạo form nhanh chóng.

## 3.2. State Management

- **Pinia:** https://pinia.vuejs.org
    - Giải pháp quản lý state chính thức của Vue, đơn giản và dễ sử dụng.
    - Nên dùng cho hầu hết các dự án.

## 3.3. Routing

- **Vue Router:** https://router.vuejs.org
    - Router chính thức của Vue.
    - Cần thiết cho các ứng dụng SPA (Single Page Application).
- **vue-router-better-scroller:** https://github.com/antfu/vue-router-better-scroller
    - Cải thiện scroll behavior của Vue Router.

## 3.4. UI Components và Design Systems

- **Design Systems (Tổng hợp):**
    - **Nuxt UI:** https://github.com/nuxt/ui - Tích hợp tốt với Nuxt.
    - **UI Libs:** https://ui-libs.vercel.app - Tổng hợp nhiều thư viện UI.
    - **Varlet:** https://varlet.gitee.io/varlet-ui - Material Design, mobile-first.
    - **Vuestic UI:** https://vuestic.dev
    - **Naive UI:** https://www.naiveui.com
    - **Equal:** https://quatrochan.github.io/Equal
    - **Vuesax:** https://vuesax.com
    - **Quasar:** https://quasar.dev - Framework đầy đủ tính năng, hỗ trợ nhiều nền tảng.
    - **Element Plus:** https://element-plus.org
    - **Buefy:** https://buefy.org - Dựa trên Bulma.
    - **Vue Storefront UI:** https://docs.storefrontui.io/v1 - Cho e-commerce.
    - **Maz-UI:** https://louismazel.github.io/maz-ui-3
    - **Indielayer:** https://indielayer.com
    - **Vueye:** https://vueye.netlify.app
    - **Chakra UI Vue:** https://next.vue.chakra-ui.com
    - **Vunix:** https://vunix.dewib.com
    - **Inkline:** https://www.inkline.io
    - **Radix Vue:** https://github.com/radix-vue/radix-vue - Unstyled components, headless.
    - **PrimeVue:** https://primevue.org
    - **Vue Data UI:** https://github.com/graphieros/vue-data-ui - Cho dashboard.
    - https://github.com/una-ui/una-ui
- **Material Design:**
    - **Vuetify:** https://next.vuetifyjs.com - Framework Material Design phổ biến.
    - **Vue Material:** https://www.creative-tim.com/vuematerial
    - **Varlet (Mobile):** https://varlet.gitee.io/varlet-ui/#/en-US/index
- **UI Components (Đặc biệt):**
    - **Notification:** https://github.com/smastrom/notivue
    - **Toast:** https://github.com/jerrywu001/vue3-toastify
    - **Multiple-select dropdown:** https://github.com/shentao/vue-multiselect
    - **Calendar:**
        - **Qalendar:** https://github.com/tomosterlund/qalendar
        - **Gantt Schedule Timeline Calendar:** https://github.com/neuronetio/gantt-schedule-timeline-calendar
    - **Text editor:** https://github.com/vueup/vue-quill - Dựa trên Quill.
    - **Telephone input:** https://github.com/jackocnr/intl-tel-input

## 3.5. Table và Data Grid

- **Sortable element:** https://github.com/MaxLeiter/sortablejs-vue3
    - Vue 3 wrapper cho SortableJS, kéo thả và sắp xếp các phần tử DOM.
- **Datagrid table:** https://handsontable.com
    - Bảng dữ liệu giống Excel trên web, nhiều tính năng như chỉnh sửa, validation, định dạng, công thức.
- **nuxt-lego:** https://github.com/zernonia/nuxt-lego
    - Module Nuxt.js giúp xây dựng UI theo kiểu "Lego".
- **vue-devui:** https://github.com/DevCloudFE/vue-devui
    - Bộ component UI cho Vue.js, tập trung vào trải nghiệm người dùng và tùy chỉnh.
- **G2Plot:** https://g2plot.antv.antgroup.com/en/api/plot-api
    - Thư viện biểu đồ trực quan, dễ dàng tùy chỉnh.
    - **Vue support:** https://g2plot-vue.opd.cool
- **arco-design-vue:** https://github.com/arco-design/arco-design-vue
    - Bộ component UI chất lượng cao, thiết kế hiện đại, dễ sử dụng.

## 3.6. Testing

- **Vitest:** https://vitest.dev - Testing framework hiện đại, tương thích với Vite.
- **Cypress:** https://www.cypress.io - End-to-end testing.

## 3.7. HTTP Requests

- **vue-request:** https://github.com/attojs/vue-request - Hook cho phép quản lý HTTP request dễ dàng.

## 3.8. I18n (Internationalization)

- **vue-i18n:** https://vue-i18n.intlify.dev - Thư viện i18n chính thức của Vue.
- **fluent-vue:** https://fluent-vue.demivan.me - Dựa trên Project Fluent.

## 3.9. Utilities

- **vueuse:** https://vueuse.org - Bộ sưu tập các composition API hữu ích.
- **vue-bind-once:** https://github.com/danielroe/vue-bind-once - Binding data một lần duy nhất.

## 3.10. Khác

- **vue-composable:** https://github.com/pikax/vue-composable - Bộ sưu tập các composable functions.
- **Resource:** https://madewithvuejs.com - Tổng hợp tài nguyên Vue.
- **React In Vue - Vue in React:** https://github.com/devilwjp/veaury
- **Vue query:**
    - https://github.com/DamianOsipiuk/vue-query
    - https://github.com/robsontenorio/vue-api-query
- **vue-promised:** https://github.com/posva/vue-promised - Promise cho template.
- **floating-vue:** https://github.com/Akryum/floating-vue - Tạo component floating.
- **tresjs:** https://github.com/tresjs/tres - Three.js trong Vue.
- **NativeScript-Vue:** https://nativescript-vue.org - Build native app.
- **fullpage.js:** https://github.com/alvarotrigo/fullpage.js - Full page scroll.
- **vue-mathlive:** https://github.com/arnog/vue-mathlive - Math field.

## 3.11. CSS

- **pinceau:** https://github.com/Tahul/pinceau - CSS compiler.

# 4. Tools - Online tools

- **Histoire:** https://histoire.dev - Tạo document.
- **Vue Devtools:** Có sẵn trên trình duyệt.

# 5. Design system for mobile

- **Framework7:** https://github.com/framework7io/framework7

# 6. Interview

- [[Các câu hỏi phỏng vấn VueJS]]

# 7. Template

- **nuxtwind-daisy:** https://github.com/ossphilippines/nuxtwind-daisy

## 7.1. Admin template

- **admin-one-vue-tailwind:** https://github.com/justboil/admin-one-vue-tailwind
- **vue-element-admin:** https://github.com/PanJiaChen/vue-element-admin

# 8. Cheatsheets

- [[6c5a6b7c-8d9e-0f12-a3b4-c5d6e7f8091a.pdf]]
- [[5c4a5b6c-7d8e-9f01-a2b3-c4d5e6f70819.pdf]]
- [[d3c4b5a6-e7f8-49a0-9b1c-2d3e4f5a6b7c.pdf]]
- [[b3c4d5e6-f7a8-49b0-9c1d-2e3f4a5b6c7d.pdf]]
- [[b0e3f8c5-0f3a-4d88-9d9e-93b7c7c2f0a1.pdf]]
- [[1f2e3d4c-5b6a-4789-8c0d-e1f2a3b4c5d6.pdf]]
