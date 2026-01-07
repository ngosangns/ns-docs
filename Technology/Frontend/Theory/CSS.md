---
tags:
  - area/technology
  - domain/frontend
  - topic/css
  - type/resource
  - lang/vi
---

# CSS (Cascading Style Sheets)

CSS là ngôn ngữ dùng để tìm và định dạng các thành phần của trang web (HTML). Nó cho phép tách biệt nội dung (HTML) và cách trình bày, bao gồm bố cục, màu sắc và phông chữ.

## Các khái niệm cốt lõi

- **Selectors**: Cách xác định các phần tử HTML để áp dụng style (ID, Class, Element, Attribute, v.v.).
- **Box Model**: Mọi phần tử đều được coi là một hình hộp, bao gồm: `content`, `padding`, `border`, và `margin`.
- **Specificity**: Quy tắc phân cấp độ ưu tiên khi có nhiều style cùng áp dụng cho một phần tử.
- **Flexbox & Grid**: Các hệ thống layout hiện đại giúp xây dựng giao diện linh hoạt và phức tạp.

## Tính năng CSS nâng cao

### CSS Anchor Positioning

Định vị phần tử tương đối so với một phần tử "neo" khác mà không cần phụ thuộc vào quan hệ cha-con trong DOM.

- **Thuộc tính quan trọng**: `anchor-name`, `position-anchor`, `anchor()`.
- **Ví dụ**: `anchor-name: --my-anchor; position: absolute; top: anchor(--my-anchor bottom);`

### CSS Scroll-Driven Animations

Cho phép tạo ra các hiệu ứng hoạt ảnh dựa trên vị trí cuộn trang của người dùng thay vì dựa trên thời gian thực.

- **Thành phần**: `animation-timeline`, `scroll()`, `view()`.
- **Ứng dụng**: Thanh tiến trình cuộn trang, hiệu ứng xuất hiện khi phần tử vào khung nhìn.

### Hàm light-dark()

Hàm CSS hiện đại giúp dễ dàng chỉ định giá trị màu sắc khác nhau cho chế độ sáng (light) và tối (dark) mà không cần viết lại toàn bộ `@media (prefers-color-scheme: dark)`.

- **Cú pháp**: `color: light-dark(black, white);`

## Tài liệu liên quan

### Công cụ & Thư viện

Xem danh sách các framework, thư viện animation và linter tại:

- [[CSS Tools|CSS Tools & Libraries]]
