---
aliases:
  - FE
relates:
  - "[[Javascript - Typescript]]"
  - "[[Vue - Nuxt]]"
  - "[[React - Next]]"
  - "[[SolidJS]]"
  - "[[Angular]]"
  - "[[Flutter]]"
  - "[[Reflow, Repaint, Layout Shift là gì? Tối ưu để tránh CLS cao trong Core Web Vitals]]"
tags:
  - area/technology
  - domain/frontend
  - topic/javascript
  - topic/typescript
  - topic/vue
  - topic/nuxt
  - topic/react
  - topic/nextjs
  - topic/solidjs
  - topic/angular
  - topic/flutter
  - topic/web-performance
  - type/resource
  - lang/vi
  - reflow-repaint-layout-shift-la-gi-toi-uu-de-tranh-cls-cao-trong-core-web-vitals
---

# 1. Nền tảng và Khái niệm Cốt lõi

## 1.1. Web APIs

- Danh sách Web API trong browser: https://developer.mozilla.org/en-US/docs/Web/API
- 12 khái niệm Web API's NÊN biết: https://viblo.asia/p/12-khai-niem-web-apis-nen-biet-2oKLnGjXVQO
- Long Animation Frames API:
  - **Long Animation Frames API** là một API Web mới được thiết kế để giúp các nhà phát triển web xác định và phân tích các khung hình hoạt họa (animation frames) **chạy chậm hoặc bị drop**, gây ảnh hưởng đến trải nghiệm người dùng, đặc biệt trong các ứng dụng có nhiều chuyển động (animations, scroll, drag, v.v.).
  - Mục đích:
    - Phát hiện các khung hình mất nhiều thời gian để render – thường trên 50ms, khiến trang web bị giật (jank) hoặc không mượt.
    - Cung cấp thông tin chi tiết để **gỡ lỗi hiệu suất animation**.
    - Giúp bạn xác định được **nguyên nhân gây chậm**, ví dụ: script nặng, layout phức tạp, v.v.
  - Cách hoạt động:
    - Long Animation Frames API sử dụng một callback được gọi mỗi khi một animation frame **vượt quá thời gian giới hạn** (thường là 50ms – vượt chuẩn 60FPS). Nó hoạt động **tương tự như Long Tasks API**, nhưng tập trung vào **animation frames** thay vì tất cả các task.
- StorageManager: Là một interface của [Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Storage_API) cung cấp giao diện để quản lý quyền `persistence` (duy trì) và ước tính dung lượng lưu trữ có sẵn.
  - Cách truy cập: Bạn có thể lấy tham chiếu đến interface này bằng cách sử dụng `navigator.storage` hoặc `WorkerNavigator.storage`.
  - Các phương thức Instance
    - **`StorageManager.estimate()`**: Trả về một Promise giải quyết thành một đối tượng chứa số liệu về usage (sử dụng) và quota (hạn ngạch) cho origin của bạn.
    - **`StorageManager.getDirectory()`**: Được sử dụng để lấy tham chiếu đến một đối tượng FileSystemDirectoryHandle cho phép truy cập vào một thư mục và nội dung của nó, được lưu trữ trong origin private file system. Trả về một Promise giải quyết với một đối tượng FileSystemDirectoryHandle.
    - **`StorageManager.persist()`**: Trả về một Promise giải quyết thành true nếu user agent có thể duy trì bộ nhớ của trang web của bạn.
    - **`StorageManager.persisted()`**: Trả về một Promise giải quyết thành true nếu quyền persistence đã được cấp cho bộ nhớ của trang web của bạn.
- Prompt API cho extension: https://developer.chrome.com/docs/extensions/ai/prompt-api?hl=vi
- Translator API: https://developer.mozilla.org/en-US/docs/Web/API/Translator
- HTML Selects Are Actually Styleable Now: https://salehmubashar.com/blog/html-selects-are-actually-styleable-now

### 1.1.1. WebGPU

WebGPU là một API (Application Programming Interface) đồ họa web mới được thiết kế để truy cập và tận dụng các chức năng của GPU (Graphics Processing Unit) trong các ứng dụng web[2][6]. Đây được coi là người kế nhiệm mạnh mẽ của WebGL, mang các tính năng tiên tiến của API GPU hiện đại[4].

#### 1.1.1.1. Tính năng và ưu điểm chính

- **Giảm tải công việc JavaScript**: WebGPU có khả năng rút gọn đáng kể khối lượng công việc của JavaScript cho cùng một đồ họa[1][5]
- **Tính linh hoạt cao**: Cung cấp tính linh hoạt cao hơn trong lập trình GPU[3]
- **Đa chức năng**: Cho phép thực hiện cả hoạt động kết xuất đồ họa và tính toán trên GPU[6][8]

#### 1.1.1.2. Hỗ trợ trong Chrome

WebGPU hiện đã có sẵn trong Chrome[3] và được Google thông báo sẽ được bật mặc định trong Chrome 113[7]. Điều này cho thấy sự cam kết của Google trong việc đưa công nghệ này đến với người dùng.

#### 1.1.1.3. Khả năng ứng dụng

WebGPU hỗ trợ nhiều ngôn ngữ lập trình bao gồm JavaScript, Rust, C++, và C, đồng thời sử dụng các công nghệ nền tảng như Vulkan, Metal, hoặc Direct3D 12 để xử lý đồ họa, game, cũng như các ứng dụng AI và machine learning[10].

References:  
[1]: https://developer.chrome.com/docs/web-platform/webgpu/overview?hl=vi  
[2]: https://codelabs.developers.google.com/your-first-webgpu-app?hl=vi  
[3]: https://hoanghamobile.com/tin-tuc/google-chrome-cung-cap-tinh-nang-moi-webgpu-giup-ho-tro-cac-web-gaming-va-do-hoa/?srsltid=AfmBOoou7aHlHzLENBJ9ll62RQI55GHXW2EqWL59jjcRq9538hE8oRzR  
[4]: https://developer.chrome.com/blog/supercharge-web-ai-testing?hl=vi  
[5]: https://quantrimang.com/lang-cong-nghe/webgpu-chrome-197125  
[6]: https://detect.expert/vi/blog/webgpu-technology-in-antifraud-systems-and-methods/  
[7]: https://laodong.vn/cong-nghe/google-mang-webgpu-vao-trinh-duyet-de-ho-tro-game-thu-1177424.ldo  
[8]: https://vnreview.vn/threads/google-chinh-thuc-phat-hanh-webgpu-ky-nguyen-cua-cac-trinh-duyet-lon-dang-den.18150/  
[9]: https://laptopaz.vn/google-chrome-ra-mat-cong-nghe-moi-dem-lai-su-dot-pha-cho-do-hoa-web.html  
[10]: https://en.wikipedia.org/wiki/WebGPU

## 1.2. Các thành phần tiềm năng

- **`IStorageStrategy`:** Interface định nghĩa các hoạt động lưu trữ cấp thấp (ví dụ: `LocalStorageStrategy`, `IndexedDBStrategy`, `FileSystemStrategy`).
- **`StorageManager`:** Lớp chính phối hợp các chiến lược lưu trữ.
- **Quản lý Cache:** Tích hợp bộ nhớ đệm để cải thiện hiệu suất.
- **Xử lý lỗi:** Cơ chế mạnh mẽ để xử lý các lỗi lưu trữ.
- **Mã hóa/Giải mã:** Tùy chọn mã hóa dữ liệu trước khi lưu trữ và giải mã khi đọc.

## 1.3. Các loại hình lưu trữ có thể hỗ trợ

- **Bộ nhớ cục bộ (Local Storage):** Dữ liệu nhỏ, không đồng bộ, dễ sử dụng.
- **IndexedDB:** Dữ liệu có cấu trúc lớn hơn, hoạt động không đồng bộ, hỗ trợ giao dịch.
- **Web SQL Database (Không còn khuyến khích):** API cơ sở dữ liệu dựa trên SQL trong trình duyệt.
- **Session Storage:** Tương tự Local Storage nhưng dữ liệu bị xóa khi tab đóng.
- **Cookies:** Dữ liệu rất nhỏ, được gửi với mỗi yêu cầu HTTP.
- **Hệ thống tệp (Node.js):** Đối với ứng dụng phía máy chủ.
- **Bộ nhớ đám mây (Cloud Storage):** S3, Google Cloud Storage, Azure Blob Storage (thông qua API hoặc SDK).

## 1.4. Ví dụ cấu trúc lớp (TypeScript)

```typescript
// interfaces/IStorageStrategy.ts
export interface IStorageStrategy {
  save(key: string, data: any): Promise<void>;
  load(key: string): Promise<any | null>;
  delete(key: string): Promise<void>;
  exists(key: string): Promise<boolean>;
  listKeys(): Promise<string[]>;
  clear(): Promise<void>;
}

// strategies/LocalStorageStrategy.ts
export class LocalStorageStrategy implements IStorageStrategy {
  private prefix: string;

  constructor(prefix: string = "app_") {
    this.prefix = prefix;
  }

  private getKey(key: string): string {
    return `${this.prefix}${key}`;
  }

  async save(key: string, data: any): Promise<void> {
    try {
      localStorage.setItem(this.getKey(key), JSON.stringify(data));
    } catch (error) {
      console.error("Error saving to local storage:", error);
      throw error;
    }
  }

  async load(key: string): Promise<any | null> {
    try {
      const item = localStorage.getItem(this.getKey(key));
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error("Error loading from local storage:", error);
      return null;
    }
  }

  async delete(key: string): Promise<void> {
    localStorage.removeItem(this.getKey(key));
  }

  async exists(key: string): Promise<boolean> {
    return localStorage.getItem(this.getKey(key)) !== null;
  }

  async listKeys(): Promise<string[]> {
    const keys: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith(this.prefix)) {
        keys.push(key.substring(this.prefix.length));
      }
    }
    return keys;
  }

  async clear(): Promise<void> {
    for (let i = localStorage.length - 1; i >= 0; i--) {
      const key = localStorage.key(i);
      if (key && key.startsWith(this.prefix)) {
        localStorage.removeItem(key);
      }
    }
  }
}

// StorageManager.ts
import { IStorageStrategy } from "./interfaces/IStorageStrategy";
import { LocalStorageStrategy } from "./strategies/LocalStorageStrategy";

export class StorageManager {
  private strategy: IStorageStrategy;

  constructor(strategy?: IStorageStrategy) {
    this.strategy = strategy || new LocalStorageStrategy(); // Default to LocalStorage
  }

  setStrategy(strategy: IStorageStrategy): void {
    this.strategy = strategy;
  }

  async save(key: string, data: any): Promise<void> {
    return this.strategy.save(key, data);
  }

  async load(key: string): Promise<any | null> {
    return this.strategy.load(key);
  }

  async delete(key: string): Promise<void> {
    return this.strategy.delete(key);
  }

  async exists(key: string): Promise<boolean> {
    return this.strategy.exists(key);
  }

  async listKeys(): Promise<string[]> {
    return this.strategy.listKeys();
  }

  async clear(): Promise<void> {
    return this.strategy.clear();
  }
}

// Usage Example
// const storage = new StorageManager(); // Uses LocalStorage by default
// storage.save('mySettings', { theme: 'dark', notifications: true })
//   .then(() => console.log('Settings saved!'))
//   .catch(err => console.error(err));

// storage.load('mySettings')
//   .then(settings => console.log('Loaded settings:', settings))
//   .catch(err => console.error(err));
```

## 1.5. Web Components

- Giới thiệu về web components: https://viblo.asia/p/gioi-thieu-ve-web-components-07LKXxkpKV4

## 1.6. Các Mô hình Kiến trúc Ứng dụng

- SPA (Single-Page Application)
  - Định nghĩa: Ứng dụng web tải nội dung động trên một trang duy nhất, không cần tải lại toàn bộ trang từ máy chủ.
  - Công nghệ thường dùng: React, Angular, Vue.js.
- SSR (Server-Side Rendering)
  - Định nghĩa: Máy chủ tạo HTML hoàn chỉnh cho trang và gửi cho client.
  - Lợi ích: Tốt cho SEO, cải thiện thời gian tải trang ban đầu.
  - Công nghệ thường dùng: Next.js (React), Nuxt.js (Vue.js).
- SSG (Static Site Generation)
  - Định nghĩa: Tạo HTML cho tất cả các trang trong quá trình build.
  - Lợi ích: Tốc độ tải nhanh, bảo mật cao.
- ISG (Incremental Static Generation)
  - Định nghĩa: Cải tiến của SSG, cho phép tạo và thêm nội dung động vào các trang tĩnh đã build trong quá trình chạy.
  - Công nghệ: Next.js.
- ISR (Incremental Static Regeneration)
  - Định nghĩa: Cho phép chỉ định khoảng thời gian để xác minh lại và tái tạo các trang tĩnh. Khi trang hết hạn, máy chủ sẽ tạo phiên bản mới ở chế độ nền.
  - Công nghệ: Next.js.

## 1.7. Workers

- Service Worker
  - Định nghĩa: Worker chạy nền, hoạt động như proxy giữa web và mạng.
  - Chức năng: Caching, thông báo đẩy, offline mode.
  - Đặc điểm: Chạy độc lập với trình duyệt, ngay cả khi tab đóng.
- Web Worker
  - Định nghĩa: Worker chạy tác vụ nặng trong luồng riêng, không làm treo UI.
  - Chức năng: Xử lý tính toán phức tạp, dữ liệu lớn.
  - Đặc điểm: Không truy cập trực tiếp DOM, giao tiếp qua message passing.

## 1.8. Tài liệu tham khảo chung

- Patterns.dev: Nguồn tài liệu miễn phí về design, rendering, và performance patterns cho ứng dụng web.
  - https://www.patterns.dev
- Nơi kiểm tra một API nào đó có được hỗ trợ bởi đa số các trình duyệt hay không:
  - https://caniuse.com
  - https://webstatus.dev
- Nơi kiểm tra các thông số phổ biến của browser:
  - https://rumarchive.com/insights

# 2. Kiến trúc Dự án Nâng cao

## 2.1. Micro Frontend

- Khái niệm: Mở rộng ý tưởng microservice cho phát triển frontend.
  - https://micro-frontends.org
- Thư viện và Công cụ
  - qiankun: Giải pháp hoàn chỉnh cho micro frontends.
    - https://github.com/umijs/qiankun
- Bài viết liên quan
  - Giải quyết vấn đề về Shared Dependencies trong kiến trúc Microfrontend: https://viblo.asia/p/giai-quyet-van-de-ve-shared-dependencies-trong-kien-truc-microfrontend-m2vJPN58VeK
  - Chập chững làm quen với Microfrontend: https://viblo.asia/s/chap-chung-lam-quen-voi-microfrontend-MkNLr8p84gA

## 2.2. Quản lý Mono-repo

- Nx
  - https://github.com/nrwl/nx
- Lerna

# 3. Công cụ Phát triển và Xây dựng Dự án

## 3.1. Compilers và Bundlers

- SWC (Speedy Web Compiler)
  - https://github.com/swc-project/swc
  - Tính năng:
    - Biên dịch (Compilation)
    - Đóng gói (Bundling) với `swcpack`
    - Tối ưu hóa mã (Minification)
    - Chuyển đổi với WebAssembly
    - Tích hợp webpack qua `swc-loader`
    - Cải thiện hiệu suất Jest với `@swc/jest`
    - Hỗ trợ Plugin tùy chỉnh

## 3.2. Builders

- Rsbuild
- Vite

## 3.3. Static Site Generators (SSG)

- Nextra: SSG dựa trên Next.js.
  - https://nextra.site
- Astro
  - https://github.com/withastro/astro
- Quartz: Trình tạo site tĩnh cho digital garden, tương tự cách tổ chức ghi chú với Foam.
  - https://github.com/jackyzha0/quartz

# 4. Tối ưu Hiệu năng và Trải nghiệm Người dùng

## 4.1. Tổng quan về Tối ưu Front-end

- Các phương pháp tối ưu front-end: https://thanhle.blog/blog/frontend-performance-pattern-en
- Frontend Performance (Viblo Series): https://viblo.asia/s/frontend-performance-E1XVOE0NJMz

## 4.2. Core Web Vitals và Tối ưu Rendering

- [[Reflow, Repaint, Layout Shift là gì? Tối ưu để tránh CLS cao trong Core Web Vitals]]
- Tối Ưu Cumulative Layout Shift (CLS) Để Cải Thiện Trải Nghiệm Người Dùng: https://viblo.asia/p/toi-uu-cumulative-layout-shift-cls-de-cai-thien-trai-nghiem-nguoi-dung-MG24BkbEJz3
- Interaction to Next Paint (INP): https://codetot.vn/interaction-to-next-paint-inp
  - Kỹ thuật tối ưu:
    - Sử dụng `requestIdleCallback()` để xử lý tác vụ khi luồng chính rảnh.
    - Lazy rendering cho các phần tử ngoài màn hình.

## 4.3. Tối ưu Tải JavaScript

- [[Defer - Async - Inline, cách browser thực thi JavaScript]]
- Tăng tốc website của bạn với `rel="preload"`

## 4.4. Nghiên cứu và Kỹ thuật Tối ưu Khác

- Tăng tốc hệ sinh thái JavaScript (Loạt bài viết của Marvin Hagemeister)
  - Phần 1: https://marvinh.dev/blog/speeding-up-javascript-ecosystem
  - Phần 2: https://marvinh.dev/blog/speeding-up-javascript-ecosystem-part-2
  - Phần 3: https://marvinh.dev/blog/speeding-up-javascript-ecosystem-part-3
  - Phần 4: https://marvinh.dev/blog/speeding-up-javascript-ecosystem-part-4
  - Phần 5: https://marvinh.dev/blog/speeding-up-javascript-ecosystem-part-5
  - Phần 6: https://marvinh.dev/blog/speeding-up-javascript-ecosystem-part-6
  - Phần 7: https://marvinh.dev/blog/speeding-up-javascript-ecosystem-part-7
  - Phần 8: https://marvinh.dev/blog/speeding-up-javascript-ecosystem-part-8
- So sánh hiệu năng thư viện đồ họa
  - https://github.com/slaylines/canvas-engines-comparison
- CSS Wrapped 2023: https://developer.chrome.com/blog/css-wrapped-2023

# 5. Giao diện Người dùng (UI) và Thiết kế

## 5.1. Hệ thống Thiết kế (Design Systems)

- Bulma: Framework CSS hiện đại dựa trên Flexbox: https://bulma.io
- Shoelace: Bộ sưu tập Web Components chuyên nghiệp: https://shoelace.style
- UIkit: Framework nhẹ và module cho phát triển web nhanh: https://getuikit.com
- Fluent Design System (Microsoft): https://www.microsoft.com/design/fluent
- Material Design (Google): https://material.io
- Primer Design System (GitHub): https://primer.style
- Atlassian Design System: https://atlassian.design
- Oku UI: Bộ components mã nguồn mở: https://oku-ui.com
- Zag: UI components không phụ thuộc framework, dựa trên state machines: https://github.com/chakra-ui/zag
- DynaUI: https://www.dynaui.design
- Magic UI: https://magicui.design
- Visual Studio Code Elements: Components giao diện giống VS Code: https://github.com/vscode-elements/elements
- Pico.css: CSS framework tối giản cho HTML semantic: https://github.com/picocss/pico
- Tachyons: CSS toolkit cho thiết kế nhanh: https://tachyons.io
- LayUI: Classic modular front-end UI framework: https://github.com/layui/layui
- [material-components/material-web: Material Design Web Components](https://github.com/material-components/material-web)

## 5.2. Frameworks CSS

## 5.3. Tailwind CSS

- Tài liệu
  - Tailwind CSS Cheat Sheet (Nerdcave): https://nerdcave.com/tailwind-cheat-sheet
  - Tailwind CSS Cheat Sheet (Flowbite): https://flowbite.com/tools/tailwind-cheat-sheet
  - Documentation (Tailwind CSS): https://tailwindcss.com/docs/installation
- Công cụ
  - Multitool for TailwindCSS: https://github.com/brandonmcconnell/multitool-for-tailwindcss
- Components và Templates
  - Tổng hợp: https://github.com/unlight/tailwind-components
  - Tailwind UI: https://tailwindui.com/components
  - Headless UI: Components UI không định kiểu, dễ tùy chỉnh.
    - https://headlessui.com
  - Tailblocks: https://tailblocks.cc
  - Tailwind Components: https://tailwindcomponents.com/components
  - Tailwind Awesome: https://www.tailwindawesome.com/?price=free&type=all
  - Flowbite: https://flowbite.com/docs/component
  - Meraki UI: https://merakiui.com/components
  - Tailwind Starter Kit: https://www.creative-tim.com/learning-lab/tailwind-starter-kit/documentation/download
  - Kutty: https://kutty.netlify.app/components
  - HyperUI: https://www.hyperui.dev
  - Tailwind UI Kit: https://tailwinduikit.com/components
  - Tailwind Toolbox: https://www.tailwindtoolbox.com
  - Tailwind Kit: https://www.tailwind-kit.com/components
  - Component Land: https://componentland.com/components
  - Besoeasy Tailwind: https://tailwind.besoeasy.com
  - Xtend UI: https://xtendui.com
  - Tailwind Elements: https://tailwind-elements.com
  - Preline UI: https://preline.co
  - Konsta UI: Components Mobile First cho Tailwind CSS.
    - https://konstaui.com
  - Pines (DevDojo): https://devdojo.com/pines
  - Tailspark: Hơn 300 components và templates TailwindCSS.
    - https://tailspark.co
  - Windstatic: https://windstatic.com
  - TW-Elements (MDB): https://github.com/mdbootstrap/TW-Elements
  - Mamba UI: https://github.com/Microwawe/mamba-ui
- Page Builders với Tailwind CSS
  - Tailblocks: https://tailblocks.cc
  - Tails (DevDojo): https://devdojo.com/tails

## 5.4. Bootstrap

- FastBootstrap: Components cho Bootstrap.
  - https://fastbootstrap.com/components

## 5.5. CSS-in-JS và Styling Utilities

- CVA (Class Variance Authority): Tạo class CSS an toàn kiểu.
  - https://github.com/joe-bell/cva
- Linaria: Viết CSS với JS, tạo style tại build time.
  - https://github.com/callstack/linaria
- Panda CSS: CSS-in-JS với style được tạo tại build time.
  - https://github.com/chakra-ui/panda

## 5.6. Thư viện UI Components

## 5.7. Bộ sưu tập Components Tổng hợp

- DaisyUI: Plugin cho Tailwind CSS, cung cấp components: https://daisyui.com/docs/install
- Shadcn UI: Components tái sử dụng, xây dựng với Radix UI và Tailwind CSS: https://github.com/shadcn-ui/ui
  - Shadcn Studio: Công cụ trực quan cho Shadcn UI.
    - https://github.com/themeselection/shadcn-studio
- UI verse: Bộ sưu tập UI elements.
  - https://uiverse.io
- Free loading animations (LDRS)
  - https://uiball.com/ldrs
- Particles.js: Tạo hiệu ứng hạt chuyển động.
  - https://github.com/VincentGarreau/particles.js
- Bit: Xây dựng và quản lý components tái sử dụng: https://github.com/teambit/bit
- Omi: Framework Web Components thế hệ mới: https://github.com/Tencent/omi
- Vant: Bộ UI components cho mobile: https://github.com/youzan/vant
- Shadcn cho any stack: https://github.com/hunvreus/basecoat
- Liquid Glass: https://aethercss.lovable.app/

## 5.8. Components Chuyên biệt

- Bảng (Table)
  - RevoGrid: Data grid component giống Excel.
    - https://revolist.github.io/revogrid
- Slider
  - Tiny-slider: Slider nhỏ gọn, không phụ thuộc thư viện.
    - http://ganlanyuan.github.io/tiny-slider
- Upload File (Drag and drop)
  - Dropzone: Thư viện kéo thả file.
    - https://github.com/dropzone/dropzone
- Icons
  - Flag Icons: Bộ sưu tập cờ quốc gia dạng SVG.
    - https://github.com/lipis/flag-icons
  - Animated Icons: Hơn 500 icon động chất lượng cao.
    - https://animatedicons.co
- Biểu đồ (Charts)
  - Charts.css: CSS framework cho biểu đồ HTML.
    - https://github.com/ChartsCSS/charts.css
  - D3.js: Thư viện JavaScript mạnh mẽ cho trực quan hóa dữ liệu.
    - https://github.com/d3/d3
  - Visx (Airbnb): Bộ sưu tập primitives cho trực quan hóa React.
    - https://github.com/airbnb/visx
  - Chart.js: Thư viện biểu đồ HTML5 đơn giản, linh hoạt.
    - https://github.com/chartjs/Chart.js
  - Ant Design Charts: Thư viện biểu đồ dựa trên G2.
    - https://github.com/ant-design/ant-design-charts
  - Rete.js: Framework JavaScript cho visual programming (biểu đồ kết nối trực quan).
    - https://github.com/retejs/rete
- Fonts
  - Bunny Fonts: https://fonts.bunny.net
  - Google Fonts: https://fonts.google.com
  - Monaspace (GitHub Next): https://github.com/githubnext/monaspace
- Text Editor (WYSIWYG)
  - Slate: Framework tùy biến cao để xây dựng rich text editor.
    - https://github.com/ianstormtaylor/slate
  - Froala Editor: https://froala.com/wysiwyg-editor
  - MDXEditor: https://github.com/mdx-editor/editor
  - Summernote: https://github.com/summernote/summernote
  - TinyMCE: https://github.com/tinymce/tinymce
  - Lexical (Facebook): https://github.com/facebook/lexical
  - Quill: https://github.com/quilljs/quill
  - Tiptap: https://github.com/ueberdosis/tiptap
  - [Monaco Editor](https://microsoft.github.io/monaco-editor/)
- Math Editor
  - MathLive: https://github.com/arnog/mathlive
- Bản đồ (Map)
  - Tiny World Map: https://github.com/tinyworldmap/tiny-world-map
  - Leaflet: Thư viện JavaScript mã nguồn mở cho bản đồ tương tác.
    - https://github.com/Leaflet/Leaflet
- Quản lý File (File Managers)
  - elFinder: https://github.com/Studio-42/elFinder
- Kéo thả (Drag & Drop)
  - Swapy: https://github.com/TahaSh/swapy
- Color picker:
  - https://github.com/jaames/iro.js

## 5.9. Công cụ Hỗ trợ Phát triển UI

## 5.10. Quản lý Components Tách biệt

- Storybook: Công cụ phát triển UI components một cách cô lập.
  - https://storybook.js.org

## 5.11. HTML Builders / Page Builders

- GrapesJS: Framework mã nguồn mở để xây dựng trình tạo template web.
  - https://github.com/GrapesJS/grapesjs
- EasyFrontend
  - https://easyfrontend.com
- Builder.io
  - https://builder.io
- DevDojo HTML Builder
  - https://devdojo.com

# 6. Thư viện JavaScript

## 6.1. Frameworks JavaScript

- SolidJS: Framework JavaScript khai báo, hiệu quả để xây dựng giao diện người dùng.
  - https://www.solidjs.com

## 6.2. Thư viện Đồ họa và Animation

- Paper.js: Framework đồ họa vector và reactive.
  - http://paperjs.org
- PixiJS: Engine tạo nội dung số HTML5, renderer 2D WebGL nhanh và linh hoạt.
  - https://github.com/pixijs/pixijs
- Transition / Animation
  - Barba.js: Tạo hiệu ứng chuyển trang mượt mà.
    - https://github.com/barbajs/barba
  - Lax.js: Hiệu ứng cuộn nâng cao.
    - https://github.com/alexfoxy/lax.js

## 6.3. Tiện ích Chung

- Hotkey handling
  - Hotkeys.js: Thư viện JavaScript nhẹ để bắt sự kiện bàn phím.
    - https://github.com/jaywcjlove/hotkeys-js
- HTMX: Công cụ mở rộng HTML, cho phép truy cập AJAX, CSS Transitions, WebSockets và Server Sent Events trực tiếp trong HTML.
  - https://github.com/bigskysoftware/htmx
- Date Utilities
  - Date-fns: Bộ công cụ hiện đại cho thao tác ngày tháng (tương tự Lodash cho dates).
    - https://github.com/date-fns/date-fns
- Scroll Lock
  - Body-scroll-lock-upgrade: Khóa cuộn trang.
    - https://github.com/rick-liruixin/body-scroll-lock-upgrade
- One-page Scroll
  - fullPage.js: Tạo website cuộn một trang (one-page scroll).
    - https://alvarotrigo.com/fullPage
- Bot Detection
  - BotD (FingerprintJS): Phát hiện bot.
    - https://github.com/fingerprintjs/BotD
- Image Transformation
  - Perspective.js: Biến đổi ảnh chữ nhật thành tứ giác bất kỳ trên canvas.
    - https://github.com/wanadev/perspective.js
- Database
  - RxDB: Cơ sở dữ liệu NoSQL phía client, hỗ trợ đồng bộ với backend.
    - https://github.com/pubkey/rxdb
- Web Components (Thư viện hỗ trợ)
  - Polymer: Thư viện JavaScript giúp tạo Web Components tùy chỉnh.
    - https://github.com/Polymer/polymer
- Quốc tế hóa (i18n)
  - i18next: Framework quốc tế hóa phổ biến.
    - https://github.com/i18next/i18next
- JQuery Plugins
  - Selectize.js: Mở rộng cho textbox và `<select>`.
    - https://github.com/selectize/selectize.js

## 6.4. Phát triển Mobile với Web Tech

- Capacitor: Xây dựng ứng dụng mobile native với HTML, CSS, JS.
  - https://viblo.asia/p/capacitor-xam-luoc-the-gioi-mobile-chi-voi-html-css-js-gAm5y0xLldb

# 7. Mẫu Giao diện và Tài nguyên Khác

## 7.1. Admin Templates

- Metronic: Template admin đa dạng cho nhiều công nghệ.
  - https://keenthemes.com/metronic
- Tabler: UI Kit Dashboard HTML miễn phí, mã nguồn mở, xây dựng trên Bootstrap.
  - https://github.com/tabler/tabler
