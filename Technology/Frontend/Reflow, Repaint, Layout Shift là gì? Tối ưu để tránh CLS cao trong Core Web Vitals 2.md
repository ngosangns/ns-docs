---
relates:
  - "[[Frontend - Front-end]]"
tags:
  - frontend
  - front-end
  - reflow
  - repaint
  - layout-shift
---

# Reflow, Repaint, Layout Shift (Tóm tắt)

## Tổng quan

- **Reflow (Layout)**: Tính toán lại vị trí và kích thước phần tử - tốn kém
- **Repaint**: Vẽ lại phần tử không ảnh hưởng layout - nhẹ hơn
- **Layout Shift**: Phần tử thay đổi vị trí đột ngột - đo bằng CLS

## Nguyên nhân

- Thay đổi DOM, CSS ảnh hưởng layout
- Hình ảnh/quảng cáo không có kích thước xác định
- Font chữ tải chậm
- Chèn nội dung động không có không gian dự trữ

## Tối ưu CLS

- **Kích thước rõ ràng**: `width`, `height` cho `<img>` và `<video>`, dùng `aspect-ratio`
- **Dự trữ không gian**: Placeholder/skeleton UI cho quảng cáo
- **Tránh chèn giữa nội dung**: Chèn ở đầu/cuối hoặc container riêng
- **Tối ưu font**: Font hệ thống hoặc `font-display: swap`
- **Tránh thay đổi kích thước**: Hạn chế resize phần tử đã hiển thị
- **Dùng transform**: Thay vì `top`, `left` cho animation
- **content-visibility: auto**: Bỏ qua render phần tử ngoài viewport

## Công cụ

- **Chrome DevTools**: Performance panel
- **WebPageTest**: Đo CLS và Core Web Vitals
- **Lighthouse**: Đề xuất giải pháp cải thiện CLS
