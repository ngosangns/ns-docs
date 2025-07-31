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

- Thi chứng chỉ Vue: [https://certification.vuejs.org](https://certification.vuejs.org)
- Test Vue code online: [http://vue-live.surge.sh](http://vue-live.surge.sh)
- Build full-stack scaffold Vue - Nuxt: [https://sidebase.io](https://sidebase.io)

# 3. Libraries và Công cụ

## 3.1. Form

### 3.1.1. Form Validation

- **Vee-validate:** [https://vee-validate.logaretm.com](https://vee-validate.logaretm.com)
    - Thư viện validation mạnh mẽ, dễ sử dụng, tích hợp tốt với Vue.
    - Phù hợp cho các dự án vừa và lớn.
- **Vuelidate-next:** [https://vuelidate-next.netlify.app](https://vuelidate-next.netlify.app)
    - Validation đơn giản, dựa trên model.
    - Thích hợp cho các dự án nhỏ và vừa, hoặc khi cần validation đơn giản.
- **vue-tiny-validate:** [https://vue-tiny-validate.js.org](https://vue-tiny-validate.js.org)
    - Thư viện validation nhỏ gọn.
    - Phù hợp cho các dự án nhỏ, hoặc khi muốn giảm thiểu bundle size.
- **vorms:** [https://github.com/Mini-ghost/vorms](https://github.com/Mini-ghost/vorms)
    - Một lựa chọn khác cho validation form, đáng để xem xét.

### 3.1.2. Form Generator / Builder

- **vue-flow-form:** [https://github.com/ditdot-dev/vue-flow-form](https://github.com/ditdot-dev/vue-flow-form)
    - Tạo form theo dạng flow (tuần tự các bước).
    - Thích hợp cho các khảo sát, wizard...
- **form-create:** [https://github.com/xaboy/form-create](https://github.com/xaboy/form-create)
    - Generator form mạnh mẽ, có thể tạo form động từ cấu hình JSON.
    - Phù hợp cho các dự án lớn, cần tạo form phức tạp.
- **blitzar:** [https://github.com/cycraft/blitzar](https://github.com/cycraft/blitzar)
    - Một lựa chọn khác cho form generator.
- **Vue form builder:** [https://builder.vueform.com](https://builder.vueform.com)
    - Công cụ kéo thả để tạo form trực quan.
    - Thích hợp cho người không chuyên về code, hoặc cần tạo form nhanh chóng.

## 3.2. State Management

- **Pinia:** [https://pinia.vuejs.org](https://pinia.vuejs.org)
    - Giải pháp quản lý state chính thức của Vue, đơn giản và dễ sử dụng.
    - Nên dùng cho hầu hết các dự án.

## 3.3. Routing

- **Vue Router:** [https://router.vuejs.org](https://router.vuejs.org)
    - Router chính thức của Vue.
    - Cần thiết cho các ứng dụng SPA (Single Page Application).
- **vue-router-better-scroller:** [https://github.com/antfu/vue-router-better-scroller](https://github.com/antfu/vue-router-better-scroller)
    - Cải thiện scroll behavior của Vue Router.

## 3.4. UI Components và Design Systems

- **Design Systems (Tổng hợp):**
    - **Nuxt UI:** [https://github.com/nuxt/ui](https://github.com/nuxt/ui) - Tích hợp tốt với Nuxt.
    - **UI Libs:** [https://ui-libs.vercel.app](https://ui-libs.vercel.app) - Tổng hợp nhiều thư viện UI.
    - **Varlet:** [https://varlet.gitee.io/varlet-ui](https://varlet.gitee.io/varlet-ui) - Material Design, mobile-first.
    - **Vuestic UI:** [https://vuestic.dev](https://vuestic.dev)
    - **Naive UI:** [https://www.naiveui.com](https://www.naiveui.com)
    - **Equal:** [https://quatrochan.github.io/Equal](https://quatrochan.github.io/Equal)
    - **Vuesax:** [https://vuesax.com](https://vuesax.com)
    - **Quasar:** [https://quasar.dev](https://quasar.dev) - Framework đầy đủ tính năng, hỗ trợ nhiều nền tảng.
    - **Element Plus:** [https://element-plus.org](https://element-plus.org)
    - **Buefy:** [https://buefy.org](https://buefy.org) - Dựa trên Bulma.
    - **Vue Storefront UI:** [https://docs.storefrontui.io/v1](https://docs.storefrontui.io/v1) - Cho e-commerce.
    - **Maz-UI:** [https://louismazel.github.io/maz-ui-3](https://louismazel.github.io/maz-ui-3)
    - **Indielayer:** [https://indielayer.com](https://indielayer.com)
    - **Vueye:** [https://vueye.netlify.app](https://vueye.netlify.app)
    - **Chakra UI Vue:** [https://next.vue.chakra-ui.com](https://next.vue.chakra-ui.com)
    - **Vunix:** [https://vunix.dewib.com](https://vunix.dewib.com)
    - **Inkline:** [https://www.inkline.io](https://www.inkline.io)
    - **Radix Vue:** [https://github.com/radix-vue/radix-vue](https://github.com/radix-vue/radix-vue) - Unstyled components, headless.
    - **PrimeVue:** [https://primevue.org](https://primevue.org)
    - **Vue Data UI:** [https://github.com/graphieros/vue-data-ui](https://github.com/graphieros/vue-data-ui) - Cho dashboard.
    - https://github.com/una-ui/una-ui
- **Material Design:**
    - **Vuetify:** [https://next.vuetifyjs.com](https://next.vuetifyjs.com) - Framework Material Design phổ biến.
    - **Vue Material:** [https://www.creative-tim.com/vuematerial](https://www.creative-tim.com/vuematerial)
    - **Varlet (Mobile):** [https://varlet.gitee.io/varlet-ui/#/en-US/index](https://varlet.gitee.io/varlet-ui/#/en-US/index)
- **UI Components (Đặc biệt):**
    - **Notification:** [https://github.com/smastrom/notivue](https://github.com/smastrom/notivue)
    - **Toast:** [https://github.com/jerrywu001/vue3-toastify](https://github.com/jerrywu001/vue3-toastify)
    - **Multiple-select dropdown:** [https://github.com/shentao/vue-multiselect](https://github.com/shentao/vue-multiselect)
    - **Calendar:**
        - **Qalendar:** [https://github.com/tomosterlund/qalendar](https://github.com/tomosterlund/qalendar)
        - **Gantt Schedule Timeline Calendar:** [https://github.com/neuronetio/gantt-schedule-timeline-calendar](https://github.com/neuronetio/gantt-schedule-timeline-calendar)
    - **Text editor:** [https://github.com/vueup/vue-quill](https://github.com/vueup/vue-quill) - Dựa trên Quill.
    - **Telephone input:** [https://github.com/jackocnr/intl-tel-input](https://github.com/jackocnr/intl-tel-input)

## 3.5. Table và Data Grid

- **Sortable element:** [https://github.com/MaxLeiter/sortablejs-vue3](https://github.com/MaxLeiter/sortablejs-vue3)
    - Vue 3 wrapper cho SortableJS, kéo thả và sắp xếp các phần tử DOM.
- **Datagrid table:** [https://handsontable.com](https://handsontable.com)
    - Bảng dữ liệu giống Excel trên web, nhiều tính năng như chỉnh sửa, validation, định dạng, công thức.
- **nuxt-lego:** [https://github.com/zernonia/nuxt-lego](https://github.com/zernonia/nuxt-lego)
    - Module Nuxt.js giúp xây dựng UI theo kiểu "Lego".
- **vue-devui:** [https://github.com/DevCloudFE/vue-devui](https://github.com/DevCloudFE/vue-devui)
    - Bộ component UI cho Vue.js, tập trung vào trải nghiệm người dùng và tùy chỉnh.
- **G2Plot:** [https://g2plot.antv.antgroup.com/en/api/plot-api](https://g2plot.antv.antgroup.com/en/api/plot-api)
    - Thư viện biểu đồ trực quan, dễ dàng tùy chỉnh.
    - **Vue support:** [https://g2plot-vue.opd.cool](https://g2plot-vue.opd.cool)
- **arco-design-vue:** [https://github.com/arco-design/arco-design-vue](https://github.com/arco-design/arco-design-vue)
    - Bộ component UI chất lượng cao, thiết kế hiện đại, dễ sử dụng.

## 3.6. Testing

- **Vitest:** [https://vitest.dev](https://vitest.dev) - Testing framework hiện đại, tương thích với Vite.
- **Cypress:** [https://www.cypress.io](https://www.cypress.io) - End-to-end testing.

## 3.7. HTTP Requests

- **vue-request:** [https://github.com/attojs/vue-request](https://github.com/attojs/vue-request) - Hook cho phép quản lý HTTP request dễ dàng.

## 3.8. I18n (Internationalization)

- **vue-i18n:** [https://vue-i18n.intlify.dev](https://vue-i18n.intlify.dev) - Thư viện i18n chính thức của Vue.
- **fluent-vue:** [https://fluent-vue.demivan.me](https://fluent-vue.demivan.me) - Dựa trên Project Fluent.

## 3.9. Utilities

- **vueuse:** [https://vueuse.org](https://vueuse.org) - Bộ sưu tập các composition API hữu ích.
- **vue-bind-once:** [https://github.com/danielroe/vue-bind-once](https://github.com/danielroe/vue-bind-once) - Binding data một lần duy nhất.

## 3.10. Khác

- **vue-composable:** [https://github.com/pikax/vue-composable](https://github.com/pikax/vue-composable) - Bộ sưu tập các composable functions.
- **Resource:** [https://madewithvuejs.com](https://madewithvuejs.com) - Tổng hợp tài nguyên Vue.
- **React In Vue - Vue in React:** [https://github.com/devilwjp/veaury](https://github.com/devilwjp/veaury)
- **Vue query:**
    - [https://github.com/DamianOsipiuk/vue-query](https://github.com/DamianOsipiuk/vue-query)
    - [https://github.com/robsontenorio/vue-api-query](https://github.com/robsontenorio/vue-api-query)
- **vue-promised:** [https://github.com/posva/vue-promised](https://github.com/posva/vue-promised) - Promise cho template.
- **floating-vue:** [https://github.com/Akryum/floating-vue](https://github.com/Akryum/floating-vue) - Tạo component floating.
- **tresjs:** [https://github.com/tresjs/tres](https://github.com/tresjs/tres) - Three.js trong Vue.
- **NativeScript-Vue:** [https://nativescript-vue.org](https://nativescript-vue.org) - Build native app.
- **fullpage.js:** [https://github.com/alvarotrigo/fullpage.js](https://github.com/alvarotrigo/fullpage.js) - Full page scroll.
- **vue-mathlive:** [https://github.com/arnog/vue-mathlive](https://github.com/arnog/vue-mathlive) - Math field.

## 3.11. CSS

- **pinceau:** [https://github.com/Tahul/pinceau](https://github.com/Tahul/pinceau) - CSS compiler.

# 4. Tools - Online tools

- **Histoire:** [https://histoire.dev](https://histoire.dev) - Tạo document.
- **Vue Devtools:** Có sẵn trên trình duyệt.

# 5. Design system for mobile

- **Framework7:** [https://github.com/framework7io/framework7](https://github.com/framework7io/framework7)

# 6. Interview

- [[Các câu hỏi phỏng vấn VueJS]]

# 7. Template

- **nuxtwind-daisy:** [https://github.com/ossphilippines/nuxtwind-daisy](https://github.com/ossphilippines/nuxtwind-daisy)

## 7.1. Admin template

- **admin-one-vue-tailwind:** [https://github.com/justboil/admin-one-vue-tailwind](https://github.com/justboil/admin-one-vue-tailwind)
- **vue-element-admin:** [https://github.com/PanJiaChen/vue-element-admin](https://github.com/PanJiaChen/vue-element-admin)

# 8. Cheatsheets

- [[a7978e66607de2a0a15ae189170905cc_MD5.pdf]]
- [[a2126912e6a3660def96854a2556a69b_MD5.pdf]]
- [[2cc516a21766643487dbcaefff662671_MD5.pdf]]
- [[94cec6868efda6719d7bb7967acc612e_MD5.pdf]]
- [[0a2ec5d4b31fa6b91e31bd3e79d687d8_MD5.pdf]]
- [[127588ffa1fa07890f59e6c573f561c2_MD5.pdf]]