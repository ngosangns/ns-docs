---
area: technology
domain: programming-languages
topic: javascript
type: resource
---
# 1. Cách browser thực thi JavaScript: Hiểu rõ `defer`, `async`, và `inline`

Khi bạn nhúng JavaScript vào HTML, việc browser **thực thi script ở đâu và khi nào** sẽ ảnh hưởng trực tiếp đến **hiệu suất tải trang**, **trải nghiệm người dùng**, và **thứ tự thực thi code**.

3 phương pháp phổ biến để nhúng script là:

- **Inline script**
- **Script với `defer`**
- **Script với `async`**

Hiểu rõ sự khác nhau giữa chúng là kỹ năng quan trọng của một frontend developer.

---

# 2. Inline script là gì?

Inline script là đoạn JavaScript được viết trực tiếp trong file HTML, thường nằm trong thẻ `<script>` không có thuộc tính `src`.

Ví dụ:

```html
<script>
  console.log("Hello from inline script")
</script>
```

## 2.1. Đặc điểm:

- **Thực thi ngay lập tức** khi trình duyệt parser đến đoạn này.
- **Chặn quá trình render HTML tiếp theo** cho đến khi script thực thi xong.
- Không thể cache vì nằm trực tiếp trong HTML.

## 2.2. Khi nào nên dùng?

- Đoạn script nhỏ, chạy rất nhanh (dưới 1–2ms).
- Các biến cấu hình cần thiết sớm (như `window.__ENV__ = {...}`).
- Tracking code bắt buộc chạy đầu tiên (như Google Tag Manager snippet).

---

# 3. Script có thuộc tính `defer`

Ví dụ:

```html
<script defer src="/main.js"></script>
```

## 3.1. Đặc điểm:

- **Tải song song với quá trình phân tích HTML.**
- **Chỉ thực thi sau khi toàn bộ HTML đã được parser xong.**
- **Giữ thứ tự** giữa các script có `defer`.

Trình duyệt sẽ:

1. Bắt đầu phân tích HTML.
2. Gặp `<script defer>`, tải file JS song song.
3. Tiếp tục phân tích HTML.
4. Sau khi HTML parser xong → thực thi các script `defer` theo thứ tự.

> Ưu điểm lớn của `defer` là **không chặn render** và **giữ được thứ tự**.

---

# 4. Script có thuộc tính `async`

Ví dụ:

```html
<script async src="/analytics.js"></script>
```

## 4.1. Đặc điểm:

- **Tải song song với HTML**, **thực thi ngay khi tải xong**, **không chờ HTML parser hoàn tất.**
- **Không đảm bảo thứ tự** giữa các script async.

Tức là:

- Nếu `analytics.js` tải xong trước `ads.js`, nó sẽ chạy trước, bất kể thứ tự bạn khai báo.
- Trong lúc chạy `async`, việc parser HTML sẽ **tạm dừng** → có thể gây layout jank nhẹ.

> Sử dụng `async` khi script **độc lập**, không phụ thuộc vào nội dung DOM hoặc các script khác.

---

# 5. So sánh `inline`, `defer`, `async`

| Thuộc tính       | Tải song song | Chặn HTML parser | Thực thi sau HTML parser | Giữ thứ tự |
| ---------------- | ------------- | ---------------- | ------------------------ | ---------- |
| Inline           | ❌            | ✅               | ❌                       | ✅         |
| `<script defer>` | ✅            | ❌               | ✅                       | ✅         |
| `<script async>` | ✅            | ❌ (tạm)         | ❌                       | ❌         |

---

# 6. Khi nào dùng cái nào?

| Tình huống                                | Cách dùng đề xuất |
| ----------------------------------------- | ----------------- |
| Script phụ thuộc vào DOM (manipulate DOM) | `defer`           |
| Script tracking, analytics, ads độc lập   | `async`           |
| Biến cấu hình nhỏ cần sớm                 | `inline`          |
| Thư viện JS lớn như React, Vue            | `defer`           |

---

# 7. Bonus: Dùng `type="module"` có tác dụng gì?

Từ HTML5+, bạn có thể dùng:

```html
<script type="module" src="/app.js"></script>
```

Tự động **ngầm hiểu là `defer`**, nên:

- Không chặn HTML parser.
- Được thực thi sau khi HTML đã parser xong.
- Hỗ trợ `import/export`.

> `type="module"` thích hợp khi bạn dùng ES Modules và bundler hiện đại như Vite, Webpack, hoặc Next.js.

---

# 8. Kết luận

Hiểu được `defer`, `async`, và `inline` sẽ giúp bạn:

- Kiểm soát được **trình tự thực thi script**
- **Tối ưu hiệu suất tải trang**
- Tránh bug do script chạy trước khi DOM sẵn sàng