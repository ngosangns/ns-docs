---
tags:
  - area/technology
  - domain/frontend
  - topic/performance
  - type/resource
  - lang/vi
---

# Reflow, Repaint, Layout Shift

Nguồn: https://viblo.asia/p/reflow-repaint-layout-shift-la-gi-toi-uu-de-tranh-cls-cao-trong-core-web-vitals-aNj4vkD8J6r

## Tại sao cần hiểu?

- Ảnh hưởng trực tiếp đến **CLS (Cumulative Layout Shift)** trong Core Web Vitals
- Giao diện "nhảy", văn bản bị đẩy, nút trượt khi click
- Ảnh hưởng SEO và UX

## Reflow (Layout)

- **Định nghĩa**: Trình duyệt tính toán lại kích thước và vị trí phần tử
- **Xảy ra khi**: Thêm/xóa/thay đổi DOM, thay đổi CSS (width, font-size, position, display), thay đổi text, resize window
- **Ví dụ**: `element.style.width = "200px"`
- **Lưu ý**: Rất tốn tài nguyên, một thay đổi nhỏ có thể ảnh hưởng nhiều phần tử

## Repaint

- **Định nghĩa**: Vẽ lại phần tử mà không tính toán lại layout
- **Xảy ra khi**: Thay đổi màu sắc (background-color, color), visibility, opacity, shadow, border
- **Ví dụ**: `element.style.backgroundColor = "blue"`
- **Lưu ý**: Nhẹ hơn Reflow nhưng nếu liên tục vẫn gây drop FPS

## Layout Shift

- **Định nghĩa**: Phần tử thay đổi vị trí đột ngột mà người dùng không tương tác
- **Đo lường**: CLS = Impact Fraction × Distance Fraction
- **Nguyên nhân**: Ảnh không có kích thước, font tải muộn (FOIT/FOUT), quảng cáo/popup render trễ, JavaScript thêm nội dung bất ngờ
- **Tiêu chuẩn**: CLS < 0.1 (Google khuyến nghị)

## Tối ưu Reflow & Repaint

- **Tránh thao tác DOM liên tục**: Gộp thay đổi, dùng class thay vì style trực tiếp
- **Đọc và ghi DOM riêng biệt**: Gộp nhiều thay đổi vào `requestAnimationFrame`
- **Dùng class**: `element.classList.add("expanded")`

## Tối ưu CLS

- **Đặt kích thước ảnh**: `width` và `height` hoặc CSS `aspect-ratio`
- **Preload font**: `<link rel="preload">` hoặc `font-display: swap`
- **Dự trữ không gian**: Placeholder cho banner, quảng cáo (`min-height`)
- **Tránh chèn DOM bất ngờ**: Hạn chế `setTimeout`, dùng `opacity`, `transform` cho animation
