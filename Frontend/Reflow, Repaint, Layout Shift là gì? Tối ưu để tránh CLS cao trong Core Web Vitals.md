---
relates:
  - "[[Frontend - Front-end]]"
---
Nguồn: https://viblo.asia/p/reflow-repaint-layout-shift-la-gi-toi-uu-de-tranh-cls-cao-trong-core-web-vitals-aNj4vkD8J6r

# 1. Vì sao bạn cần hiểu Reflow, Repaint và Layout Shift?

Khi xây dựng giao diện web, đặc biệt là các ứng dụng SPA hay các trang thương mại điện tử, bạn thường tối ưu hình ảnh, bundle nhỏ gọn, code chia nhỏ... Nhưng có một thứ tinh tế mà đôi khi chúng ta bỏ qua: **trải nghiệm người dùng khi trang đang render**.

Các hiện tượng như:

- Giao diện bị “nhảy” khi ảnh vừa tải xong
- Văn bản tự động bị đẩy xuống vì banner xuất hiện chậm
- Người dùng định click thì nút trượt sang chỗ khác

Tất cả đều liên quan đến **Reflow**, **Repaint**, và **Layout Shift**. Và những điều này ảnh hưởng trực tiếp đến **CLS – Cumulative Layout Shift**, một chỉ số quan trọng trong Core Web Vitals của Google.

# 2. Reflow là gì?

**Reflow (hay còn gọi là Layout)** là quá trình trình duyệt tính toán lại kích thước và vị trí của các phần tử trên trang.

Reflow xảy ra khi:

- Thêm, xóa hoặc thay đổi phần tử DOM
- Thay đổi các thuộc tính CSS như `width`, `font-size`, `position`, `display`...
- Thay đổi nội dung text
- Kích thước cửa sổ trình duyệt thay đổi (resize)

Ví dụ:

```js
element.style.width = "200px";
```

Thao tác này yêu cầu trình duyệt tính toán lại bố cục các phần tử liên quan – đó chính là Reflow.

> Reflow rất tốn kém tài nguyên. Một thay đổi nhỏ có thể ảnh hưởng đến nhiều phần tử, đặc biệt trong layout phức tạp.

# 3. Repaint là gì?

**Repaint** là quá trình vẽ lại phần tử trên màn hình mà **không cần tính toán lại layout**.

Repaint xảy ra khi:

- Thay đổi màu sắc (`background-color`, `color`)
- Thay đổi `visibility`
- Đổ bóng, viền, opacity…

Ví dụ:

```js
element.style.backgroundColor = "blue";
```

Không cần tính lại bố cục, chỉ cần tô lại màu => Repaint.

> So với Reflow, Repaint nhẹ hơn. Tuy nhiên nếu diễn ra liên tục (ví dụ animation không tối ưu), vẫn gây drop FPS và lag.

# 4. Layout Shift là gì?

**Layout Shift** xảy ra khi một phần tử bất ngờ thay đổi vị trí trên màn hình **mà người dùng không tương tác gì cả**. Khi điều này xảy ra quá nhiều hoặc quá trễ, trải nghiệm người dùng sẽ bị ảnh hưởng mạnh mẽ.

Đây chính là thứ mà **CLS – Cumulative Layout Shift** đo lường.

Một số nguyên nhân phổ biến:

- Ảnh chưa có kích thước trước khi tải => ảnh “đẩy” phần tử khác xuống
- Font hiển thị muộn => văn bản bị dịch chuyển (FOIT/FOUT)
- Quảng cáo, popup render trễ => đẩy nội dung đi
- Sử dụng JavaScript thêm nội dung bất ngờ vào DOM

# 5. Cách đo CLS (Cumulative Layout Shift)

CLS đo bằng công thức:

```text
CLS = Tổng Layout Shift Score = Impact Fraction * Distance Fraction
```

Nói đơn giản:

- **Impact Fraction**: bao nhiêu phần trăm vùng màn hình bị thay đổi
- **Distance Fraction**: khoảng cách phần tử đã bị dịch chuyển bao nhiêu

> Google khuyến nghị: **CLS < 0.1** để đạt tiêu chuẩn tốt cho Core Web Vitals.

# 6. Cách giảm Reflow và Repaint không cần thiết

1. **Tránh thao tác DOM liên tục**

```js
// KHÔNG nên
for (let i = 0; i < 100; i++) {
  document.body.style.margin = `${i}px`;
}

// NÊN
document.body.style.margin = "100px";
```

2. **Dùng class thay vì thay đổi style trực tiếp**

```js
element.classList.add("expanded"); // Gọn hơn, dễ maintain
```

3. **Đọc và ghi DOM riêng biệt**

```js
const height = element.offsetHeight; // Đọc layout
element.style.height = height + 10 + "px"; // Ghi layout

// Gộp nhiều thay đổi vào cùng một frame
requestAnimationFrame(() => {
  // Thay đổi nhiều thứ tại đây
});
```

# 7. Cách tối ưu để tránh CLS cao

## 7.1. Luôn đặt chiều cao cố định cho ảnh

```html
<img src="/logo.png" width="200" height="100" alt="Logo" />
```

Hoặc dùng CSS:

```css
img { 
  aspect-ratio: 2 / 1;
}
```

> Next.js dùng `next/image` sẽ tự động xử lý việc này.

## 7.2. Tránh font nhảy – preload font sớm

```html
<link rel="preload" href="/fonts/custom.woff2" as="font" type="font/woff2" crossorigin="anonymous" />
```

Hoặc dùng `font-display: swap` để tránh chặn render quá lâu.

## 7.3. Đặt chỗ sẵn cho component động (banner, quảng cáo...)

Nếu biết chiều cao của một thành phần sẽ xuất hiện muộn, hãy dành sẵn khoảng trống trong layout:

```css
.banner-placeholder {
  min-height: 120px;
}
```

## 7.4. Tránh chèn DOM bất ngờ từ JS

Hạn chế `setTimeout` để render component động sau vài giây. Nếu cần animation, dùng `opacity`, `transform` để transition mượt mà mà không gây layout shift.

# 8. Tổng kết

Reflow, Repaint và Layout Shift là ba yếu tố quan trọng ảnh hưởng trực tiếp đến trải nghiệm người dùng – và đặc biệt là chỉ số CLS trong Core Web Vitals.

Việc hiểu cách trình duyệt hoạt động giúp bạn:

- Tối ưu hiệu suất mà không cần chỉ nhìn vào Lighthouse
- Tránh “trượt điểm” SEO vì lỗi UX
- Làm chủ frontend một cách chuyên nghiệp hơn