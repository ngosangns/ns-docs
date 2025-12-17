---
tags:
  - bai
  - general
  - liet
  - quay
  - quick-reference
  - sinh
  - toan
  - vietnamese
---

# 1. **Chỉnh hợp, tổ hợp**

- **Số chỉnh hợp lặp chập _k_ của set gồm _n_ phần tử: $n^k$**
  - Ví dụ 1 chỉnh hợp lặp chập _k_: $112(k=3)$
- **Số chỉnh hợp không lặp chập _k_ của set gồm _n_ phần tử:**
  $$
  n(n-1)(n-2)...(n-(k+1))=\frac{n!}{(n-k)!}
  $$
  - Ví dụ 1 chỉnh hợp không lặp chập _k_: $123(k=3)$
- **Hoán vị: Là số chỉnh hợp không lặp chập _k_ của set gồm _n_ phần tử khi $k=n$**
  - Ví dụ 1 hoán vị: $1234(n=k=4)$
- **Tổ hợp: Một tổ hợp chập _k_ của một set X gồm _n_ phần tử là một tập hợp các set con Y với mỗi set con có _k_ phần tử**
  - Các hoán vị của một set con thuộc _Y_ cũng chính là chỉnh hợp không lặp chập _k_ của set _X_
  - Số hoán vị của một set con thuộc _Y_ là $k!$
  - Số set con thuộc _Y = (số chỉnh hợp không lặp chập k của set X / $k!$)_
  - Ví dụ 1 set con thuộc _Y_: $(1,2,3)=(3,2,1)$

---

# 2. Phương pháp sinh

- Thuật toán sinh:
  ```
  〈Xây dựng cấu hình đầu tiên〉;
  repeat
  〈Đưa ra cấu hình đang có〉;
  〈Từ cấu hình đang có sinh ra cấu hình kế tiếp nếu còn〉;
  until 〈hết cấu hình〉;
  ```
- Kết quả của phương pháp sinh gọi là **Từ điển**
- Thứ tự từ điển toàn phần là loại từ điển mà kết quả sau lớn hơn kết quả trước, cần thỏa mãn các yêu cầu sau:
  - **Tính phổ biến**: Hoặc là _a ≤ b_, hoặc _b ≤ a_
  - **Tính phản xạ**: _a ≤ a_
  - **Tính phản đối xứng**: Nếu _a ≤ b_ và _b ≤ a_ thì bắt buộc _a = b_
  - **Tính bắc cầu**: Nếu có _a ≤ b_ và _b ≤ c_ thì _a ≤ c_
- So sánh 2 từ điển:
  - Xét _a[1..n]_ và _b[1..n]_ là hai dãy độ dài _n_, trên các phần tử của _a_ và _b_ đã có quan hệ thứ tự toàn phần _≤_. Khi đó:
    - _a < b_ nếu như tồn tại một số nguyên dương _k: 1 ≤ k < n_ để:
      ```
      a[1]   = b[1]
      a[2]   = b[2]
      ...
      a[k-1] = b[k-1]
      a[k]   = b[k]
      a[k+1] < b[k+1]
      ```
    - _a = b_ nếu _a[i] = b[i]_ với _∀i: 1 ≤ i ≤ n_
    - Nếu độ dài hai dãy _a_ và _b_ không bằng nhau, người ta cũng xác định được thứ tự từ điển. Bằng cách thêm vào cuối dãy _a_ hoặc dãy _b_ những phần tử đặc biệt gọi là phần tử _∅_ để độ dài của _a_ và _b_ bằng nhau, và coi những phần tử _∅_ này nhỏ hơn tất cả các phần tử khác, ta lại đưa về xác định thứ tự từ điển của hai dãy cùng độ dài. Ví dụ:
      ```
      <1, 2, 3, 4> < <5, 6>
      <a, b, c>    < <a, b, c, d>
      'calculator' < 'computer'
      ```
- Một số ví dụ từ điển trong ebook:
  - Sinh các dãy nhị phân độ dài n
  - Liệt kê các tập con k phần tử
  - Liệt kê các hoán vị

---

# 3. Thuật toán quay lui

- Thuật toán quay lui dùng để giải bài toán liệt kê các cấu hình
- Mỗi cấu hình được xây dựng bằng cách xây dựng từng phần tử, mỗi phần tử được chọn bằng cách thử tất cả các khả năng
- Ví dụ của thuật toán quay lui áp dụng vào bài toán liệt kê các chỉnh hợp lặp:
  ```
  procedure Try(i: Integer);
  begin
  	for 〈mọi giá trị V có thể gán cho x[i]〉 do
  		begin
  			〈Thử cho x[i] := V〉;
  			if 〈x[i] là phần tử cuối cùng trong cấu hình〉 then
  				〈Thông báo cấu hình tìm được〉
  			else
  				begin
  					〈Ghi nhận việc cho x[i] nhận giá trị V (nếu cần)〉;
  					Try(i + 1); {Gọi đệ quy để chọn tiếp x[i+1]}
  					〈Nếu cần, bỏ ghi nhận việc thử x[i] := V để thử giá trị khác〉;
  				end;
  		end;
  end;
  ```
- Một số bài toán áp dụng thuật toán quay lui trong ebook:
  - Bài toán phân tích số
  - Bài toán xếp hậu
- Kỹ thuật đánh giá nhánh cận trong tiến trình quay lui
  - Giúp loại bỏ sớm các phương án chắc chắn không tối ưu hoặc không có nghiệm trong đó
  - Kỹ thuật nhánh cận thêm vào cho thuật toán quay lui khả năng đánh giá theo từng bước
  - Một số bài toán liên quan trong ebook:
    - Bài toán người du lịch
    - Dãy ABC
