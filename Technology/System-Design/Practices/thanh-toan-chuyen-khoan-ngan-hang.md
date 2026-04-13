---
area: technology
domain: system-design
type: resource
---
# 1. Thanh toán chuyển khoản ngân hàng

Xin chào các cao thủ

Hổm có sếp nào hỏi về vụ đặt đồ ăn, chuyển khoản thành công thì đơn hàng tự đổi trạng thái.Trong group thì cao thủ rất nhiều, em thì cũng gà gà thôi, nhưng bữa có va nhau với tụi code này rồi. Nên xin mạn phép chia sẻ 1 cách rõ ràng nhất, hi vọng giúp được các bác nào chưa biết

## 1.1. **VỀ CƠ CHẾ HOẠT ĐỘNG**

**1.** **Đầu tiên: Bác quy định cú pháp chuyển tiền cho khách**.Ví dụ quán ăn bác tên là: Laratech, thì cú pháp nên là: LARATECH179 (179 là mã đơn) lúc đặt hàng xong bác show lên cho người dùng thấy cú pháp, hoặc bác lên VietQR gọi link tạo mã QR thanh toán với cú pháp mình chọn, có cả số tiền, rất khoẻ.

**2. Tiếp theo, bác crobjob lấy lịch sử giao dịch bank liên tục.**

Cron 1 phút 1 lần là êm, mỗi giao dịch đều có mã tham chiếu, và đoạn description của giao dịch, trong description này có cú pháp chuyển tiền

- Rất tiếc là bank không có field cú pháp chuyển tiền riêng đâu bác, nó gom 1 cục vào trong description, viết dài thoòng
- Việc của bác là viết 1 regex phân tích cú pháp, lấy ra tiền tố và mã đơn dựa vào description.

Phải phân tích tiền tố là LARATECH vì giao dịch nhận tiền đâu chỉ riêng thanh toán đồ ăn, nhiều khi con bồ của bác cho tiền bác nữa

- Có mã đơn, có số tiền, thời gian các kiểu, thì bác update DB, lưu transactions các kiểu rứa là xong.
- Và tất nhiên phải có 1 field lưu mã tham chiếu của ngân hàng trả về để còn so sánh xem cái nào tồn tại rồi

## 1.2. **VỀ CÁI VỤ BANK**

Như bác tứn nói, có nhiều cách lắm

**1.** **Bác sử dụng bên thứ 3, sẽ có nhiều dạng**

- Bên thứ 3 họ sẽ ký hợp đồng với bank, sử dụng API của bank, làm API cho mình đóng tiền rồi dùng.
- Dùng auto trên điện thoại, kiểu nó bắt dùng androind, cài 1 app, app này đọc tin nhắn giao dịch bank và bla…..

⇒ Kiểu này tốn tiền mỗi tháng, lâu lâu cũng delay mệt mỏi lắm, và fải cấp thông tin tài khoản ngân hàng cho họ nói chung cũng hơi thốn

**2. Dùng thẳng API ngân hàng, API web của họ**

- TP bank, bên này ko cần captcha, nhưng dev rất nóng tính, sơ hở là khoá, khoá cả device id chứ ko chỉ IP đâu bác⇒ Nếu dùng bên này, bác fải giả lập các thông số sao cho giống trình duyệt thật, nói chung là tự nhiên nhất, em nhắc lại là dev rất nóng tính
- MB bank, bên này có captcha, bác fải viết 1 service vượt captcha, mà captcha nó fải học hỏi các kiểu, nói chung phiền và rắc rối  tốt nhất bác mua giải captcha, 1đ trên 1 lượt giải, rất rẻ

- VCB cũng như MBbank ạ
- Và còn nhiều bank khác  Vietin đồ đó

⇒ Cách này cần biết code tí, tốn 1 xíu tiền nhưng an toàn tài khoản

Và đặc biệt, cần sử dụng tốt refreshToken chứ cứ login liên tục, lấy accessToken hoài , vừa tốn tiền captcha, mà dev bank nó nóng tánh nó khoá đăng nhập

=> Ngân hàng họ cũng cung cấp các API cho doanh nghiệp, nhưng lằng nhằng và mệt mỏi lắm ạ

**3. Và cách cuối, cách tế nhị nhất, nhưng ngon nhất**

- Dùng các API ko public của ngân hàng, như API trên di động của họ, API SMS của họ Rất nhiều ngân hàng có, có cả Momo kìa

⇒ An toàn, ko tốn tiền, ko delay, nhưng ko ai dám chỉ miếng cơm mà share lung tung dev bank họ đổi url là ăn \*ứt cả thôn ngay3 cách này e đều làm cả rồi, bác cần tên của bên thứ 3, cần code, hoặc cần url API thì nhắn e share. E ko muốn nhắc tên các bên thứ 3 trên này ạ.

Còn riêng cách thứ 3 thì e xin lỗi e ko share được ạ. Hồi xưa e cũng vật vã lắm, nên hi vọng giúp được mấy bác phần nào. Và e hi vọng mấy anh Dev bank trong này bình tĩnh đừng nóng tính ạ