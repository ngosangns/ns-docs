---
tags:
  - area/technology
  - domain/programming-languages
  - topic/php
  - type/resource
  - lang/vi
---

# 1. LoadMissing

**loadMissing()** là một phương thức trong Laravel Eloquent được sử dụng để eager load realtion chỉ khi relation đó chưa được load. Điều này đặc biệt hữu ích khi bạn đang làm việc với một model hoặc một tập hợp các model, và không chắc liệu các relation đã được eager load hay chưa. Nó sẽ giúp bạn tránh thực hiện gọi load() lên nhiều lần, gây lãng phí các truy vấn. Trong nhiều trường hợp, khi các mối quan hệ đã được eager load trước đó, sử dụng load() có thể dẫn đến các truy vấn không cần thiết. loadMissing() chỉ thực hiện truy vấn để load các relation chưa được truy vấn trước đó, giúp tối ưu hóa performance.

# 2. Push

Thi thoảng bạn sẽ muốn lưu Model và cả Relation đi cùng với nó. Phương thức save() sẽ chỉ lưu model mà thôi. Đây là lúc bạn sẽ cần tới push()

# 3. WithDefault

Trong Laravel Eloquent, phương thức **withDefault()** được sử dụng để gán một giá trị mặc định cho các mối quan hệ belongsTo, hasOne, hasOneThourh hoặc morphOne khi relation đó không tồn tại trong cơ sở dữ liệu. Thay vì trả về null khi relation không được tìm thấy, bạn có thể sử dụng withDefault() để trả về một đối tượng mặc định cho relation này.

withDefault() sẽ hữu dụng khi:

- Khi bạn có relation belongsTo hoặc các relation tương tự mà không phải lúc nào cũng có giá trị trong cơ sở dữ liệu (ví dụ: một bài viết có thể không có tác giả).
- Khi bạn muốn tránh lỗi truy cập thuộc tính từ một giá trị null và thay vào đó trả về một đối tượng mặc định với các thuộc tính đã được định nghĩa.
- Khi bạn muốn trả về giá trị mặc định mà không cần phải kiểm tra thủ công xem relation có tồn tại hay không.
