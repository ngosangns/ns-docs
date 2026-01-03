---
tags:
  - area/technology
  - domain/system-design
  - type/resource
  - lang/vi
---

:)) với restrict về qui mô và reloading time thì em ko dám đề cập, vì các project em làm ko strictly vs lớn như vậy, nhưng em cũng xin được góp 1 tí ak

- ý tưởng xử lí :

++ Gọi bản đầu tiên là version 1- fullSave 1

++ Mỗi lần sửa tiếp theo thì lưu vào bảng version nội dung sửa và vị trí sửa

++ đặt Rule khi user thoát khỏi tài liệu hoặc sau bao nhiều bản sửa ( 5,10 ...) hoặc khi lượng change nhiều nntn thì tạo 1 bản fullSave mới gồm các phần sửa trước

++ 1 change được tính khi autosave hoặc user tự save ( 5s thì chỉ cần tính theo autosave)

- trong database, có 2 bảng thông tin ,

* 1 là thông tin cơ bản của document (id(PK), version hiện tại (FK), chủ đề , owner, time này nọ)

* 2 là bảng thông tin về version sẽ gồm

++ version id (PK)

++ id document gốc (FK)

++ id version trước (tùy vào id rule, nếu đặt dựa trên id document gốc thì ko cần nhưng mà sẽ mất thêm 1 phần để giải ra version trước)

++ change : link đến file json chứa các kiểu thông tin như ( kiểu đổi : modify,add, delete ; vị trí đổi, nội dung đổi ) HOẶC 1 form nội dung khác nhưng em dùng thấy json ok hơn , có hàm hỗ trợ lẹ

++ fullSave version id : id bản fullsave gần nhất

++ fullsave content: đây là bản đầy đủ hiện tại của document , nếu chưa đúng rule dể tạo fullsave thì đây là null

++ thông tin khác : thời gian sửa , ai sửa ....

- > Để reconstruct được 1 version ko phải là bản fullsave thì dựa trên id bản fullsave gần nhất và các id version trước( lí do 1 version có lưu id version trước )

-> về cache strategy thì sẽ lưu bản fullsave gần nhất và các bản change, cho đến khi 1 bản fullsave khác được tạo ra

---

Em chủ yếu vào đây để học hỏi mọi người thui, không có kiến thức gì nhiều về System Desgin. Nhưng em có biết một chút về thuật toán, khi e học về Persistent Segment Tree - một kiểu segment tree, mà khi t có một số thay đổi ở node, t sẽ không copy y xì những thằng ở node cũ sang node mới, thay vào đó chỉ cần tạo ra node mới đối với những thằng khác nhau, còn những thằng giống nhau thì vẫn trỏ về node cũ. Đấy là một chút thông tin tý tẹo. Mong rằng đọc qua cái idea này anh chị có thể có ý tưởng gì đó ạ.

![[9e0f1a2b-3c4d-5e6f-7081-92a3b4c5d6e7.png]]

Thường text editor thì nó dùng Rope data structure, tất nhiên là thực tế thì nó sẽ tuỳ biến để hỗ trợ nhiều tính năng như change detect, diff,...

mình có đọc về git internal thì git cũng theo cơ chế này, nội dung thay đổi được đánh dấu vào các blob
