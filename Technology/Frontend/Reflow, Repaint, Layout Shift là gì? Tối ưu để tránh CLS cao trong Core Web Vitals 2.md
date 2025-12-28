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

# 1. Tổng quan về Reflow, Repaint và Layout Shift

Reflow, Repaint và Layout Shift là các khái niệm quan trọng trong quá trình trình duyệt hiển thị một trang web. Hiểu rõ chúng giúp tối ưu hiệu suất trang web, đặc biệt là giảm Cumulative Layout Shift (CLS) trong Core Web Vitals.

- Reflow (hoặc Layout): Là quá trình trình duyệt tính toán vị trí và kích thước của tất cả các phần tử trên trang web. Reflow xảy ra khi có sự thay đổi về cấu trúc DOM, nội dung, kiểu dáng (CSS) ảnh hưởng đến bố cục trang. Đây là một quá trình tốn kém về mặt hiệu năng.

- Repaint: Là quá trình trình duyệt vẽ lại các phần tử trên màn hình. Repaint xảy ra khi có sự thay đổi về kiểu dáng không ảnh hưởng đến bố cục (ví dụ: thay đổi màu sắc, độ trong suốt). Repaint ít tốn kém hơn Reflow.

- Layout Shift: Xảy ra khi một phần tử hiển thị trên trang web thay đổi vị trí đột ngột, gây khó chịu cho người dùng. CLS đo lường tổng mức độ của các layout shift không mong muốn này.

# 2. Nguyên nhân gây ra Reflow, Repaint và Layout Shift

- Thay đổi DOM: Thêm, xóa hoặc sửa đổi các phần tử HTML.
- Thay đổi CSS: Thay đổi các thuộc tính CSS ảnh hưởng đến bố cục (ví dụ: width, height, margin, padding).
- Hình ảnh và quảng cáo không có kích thước xác định: Khi hình ảnh hoặc quảng cáo được tải, chúng có thể đẩy các phần tử khác xuống, gây ra layout shift.
- Font chữ tải chậm: Khi font chữ tùy chỉnh được tải, nó có thể thay đổi kích thước của văn bản, gây ra layout shift.
- Chèn nội dung động: Chèn nội dung mới vào trang (ví dụ: thông báo, biểu mẫu) mà không có đủ không gian dự trữ.

# 3. Tối ưu để tránh CLS cao

## 3.1. Đặt kích thước rõ ràng cho hình ảnh và video

Luôn sử dụng thuộc tính `width` và `height` cho thẻ `<img>` và `<video>`. Điều này giúp trình duyệt dự đoán được không gian cần thiết, tránh layout shift khi hình ảnh/video được tải.

Sử dụng CSS `aspect-ratio` để đảm bảo tỷ lệ khung hình được duy trì khi kích thước thay đổi.

## 3.2. Dự trữ không gian cho quảng cáo

Quảng cáo thường là nguyên nhân chính gây ra CLS. Dự trữ một khoảng không gian đủ lớn cho quảng cáo trước khi nó được tải. Sử dụng placeholder hoặc skeleton UI.

## 3.3. Tránh chèn nội dung động vào giữa nội dung hiện có

Nếu cần chèn nội dung động (ví dụ: thông báo, biểu mẫu), hãy chèn nó ở đầu hoặc cuối trang, hoặc trong một container riêng biệt.

## 3.4. Sử dụng font chữ hệ thống hoặc tối ưu tải font chữ

Sử dụng font chữ hệ thống (ví dụ: Arial, Helvetica) để tránh flash of unstyled text (FOUT) hoặc flash of invisible text (FOIT). Nếu sử dụng font chữ tùy chỉnh, hãy tải chúng một cách tối ưu (ví dụ: sử dụng `font-display: swap;`).

## 3.5. Tránh thay đổi kích thước các phần tử hiện có

Hạn chế thay đổi kích thước của các phần tử đã hiển thị trên trang, đặc biệt là khi người dùng đang tương tác với chúng.

## 3.6. Sử dụng `transform` thay vì `top`, `left`

Khi thực hiện các hiệu ứng animation hoặc transition, sử dụng thuộc tính `transform` (ví dụ: `translate`, `scale`, `rotate`) thay vì `top`, `left`. `transform` không gây ra reflow.

## 3.7. Sử dụng `content-visibility: auto`

Thuộc tính CSS `content-visibility: auto` cho phép trình duyệt bỏ qua việc render các phần tử không nằm trong viewport, giúp cải thiện hiệu suất tải trang ban đầu.

# 4. Công cụ hỗ trợ

- Chrome DevTools: Sử dụng Performance panel để phân tích reflow, repaint và layout shift.
- WebPageTest: Đo lường CLS và các Core Web Vitals khác.
- Lighthouse: Đề xuất các giải pháp để cải thiện CLS.
