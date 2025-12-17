---
relates:
  - "[[Frontend - Front-end]]"
tags:
  - css
  - frontend
  - front-end
  - libraries
  - animations
  - area/technology
  - domain/frontend
  - topic/css
  - type/resource
  - lang/vi
---
# 1. CSS

## 1.1. Tài nguyên

- **CSS Wrapped: 2023!**: Tóm tắt các tính năng và cập nhật CSS mới nhất. [Đọc thêm](https://developer.chrome.com/blog/css-wrapped-2023)

## 1.2. Thư viện

- **Normalize.css**: Thư viện chuẩn hóa kiểu mặc định cho các thuộc tính CSS. [GitHub](https://github.com/necolas/normalize.css)
- **MVP.css**: Cung cấp kiểu dáng tự động cho các thẻ HTML ngữ nghĩa. [GitHub](https://github.com/andybrewer/mvp)
- **PurgeCSS**: Công cụ loại bỏ CSS không sử dụng. [GitHub](https://github.com/FullHuman/purgecss)

## 1.3. Linter

- **stylelint**: CSS linter mạnh mẽ giúp thực thi các quy ước nhất quán. [GitHub](https://github.com/stylelint/stylelint)

## 1.4. Thư viện hoạt ảnh

- **animate.css**: Thư viện tập trung vào các hoạt ảnh. [GitHub](https://github.com/animate-css/animate.css)
- **anime.js**: Thư viện JavaScript tạo các hoạt ảnh phức tạp. [GitHub](https://github.com/juliangarnier/anime)
- **Hover.css**: Bộ sưu tập các hiệu ứng CSS3 hover. [GitHub](https://github.com/IanLunn/Hover)

## 1.5. CSS Builders

- **lightningcss**: Trình xây dựng và tối ưu hóa CSS nhanh chóng. [GitHub](https://github.com/parcel-bundler/lightningcss)
- **postcss**: Công cụ chuyển đổi CSS bằng các plugin JavaScript. [GitHub](https://github.com/postcss/postcss)

## 1.6. Chủ đề

- **98.css**: Hệ thống thiết kế tạo giao diện bắt chước giao diện người dùng kiểu cũ. [GitHub](https://github.com/jdan/98.css)

## 1.7. Biểu tượng

- **css.gg**: Bộ sưu tập các biểu tượng CSS thuần túy. [GitHub](https://github.com/astrit/css.gg)

## 1.8. Các tính năng CSS nâng cao

### 1.8.1. Định vị neo CSS (CSS Anchor Positioning)

Định vị neo CSS cho phép các phần tử được định vị tương đối so với một phần tử neo.

- **Thuộc tính chính**:
  - `anchor-name`: Xác định phần tử neo.
  - `anchor-position`: Định vị các phần tử tương đối so với neo.
  - `@position-fallback`: Cung cấp các chiến lược dự phòng.

- **Ví dụ**:

  ```css
  .anchor-element {
    anchor-name: --my-anchor;
  }

  .positioned-element {
    position: anchor(--my-anchor);
    anchor-position: right;
  }
  ```

### 1.8.2. Hoạt ảnh điều khiển bằng cuộn CSS (CSS Scroll-Driven Animations)

Hoạt ảnh điều khiển bằng cuộn cho phép các hoạt ảnh được điều khiển bởi vị trí cuộn.

- **Thành phần chính**:
  - `animation-timeline`: Xác định dòng thời gian hoạt ảnh.
  - `scroll()`: Tạo hoạt ảnh dựa trên cuộn.
  - `view()`: Tạo hoạt ảnh dựa trên tiến trình xem.

- **Ví dụ**:

  ```css
  .scroll-animate {
    animation: slideIn linear;
    animation-timeline: scroll();
    animation-range: 0 100vh;
  }

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(100px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  ```

### 1.8.3. light-dark()

Hàm `light-dark()` trong CSS cho phép chuyển đổi giữa các chế độ sáng và tối.

- **Ví dụ**:

  ```css
  body {
    background-color: light-dark(#fff, #000);
    color: light-dark(#000, #fff);
  }
  ```

Các tính năng CSS nâng cao này tăng cường giao diện web với các hành vi động và tương tác mà không cần dựa vào JavaScript.
