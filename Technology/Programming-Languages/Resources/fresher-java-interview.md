---
area: technology
domain: programming-languages
topic: java
type: resource
---
# 1. Fresher Java Interview

**Chia sẻ quá trình phỏng vấn ở vị trí Fresher Java Backend Developer ở một công ty Fintech nọ: ( nửa tháng trước )**

**Vòng 1**: scan CV (pass thì sang vòng 2)
**Vòng 2**: phỏng vấn qua điện thoại bà HR test sơ về OOP và test tiếng Anh (pass thì đợi team review CV để sang vòng 3 face-to-face)
**Vòng 3**: lên văn phòng phỏng vấn với HR và techlead ngồi chung với tệp câu hỏi như sau ( em chỉ nhớ được 95% số câu hỏi hôm đó thôi) (Phỏng vấn tiếng Việt nha các thým)

- Greeting giới thiệu chung bản thân
- Giới thiệu overview về quá trình học tập đi làm
- OOP:
  - So sánh abstract class vs interface class
  - So sánh abstract vs inheritance
  - test case triển khai logic method trong class đó có đc ko? tại sao lại như vậy?
  - iml interface hay extend abtract class có cần override lại method ko? trường hợp nào ko cần?
  - extend class từ cha có cần impl lại method ko
  - so sánh @Overriding vs @Overloadding annotation vs method
- Java core:
  - nêu các interface collections cơ bản overview
  - so sánh list vs set ( hiệu năng, nguyên lí, usecase, why use)
  - so sánh linkedlist vs arraylist ( hiệu năng, nguyên lí, usecase, why use )
  - so sánh arraylist vs dynamic array bình thường ( usecase )
  - khác nhau giữa Integer và int là gì ( loại, Instance or variable, memory saving ...)
  - tham trị & tham chiếu ( equals() vs == so sánh kiểu nào, phân biệt tại sao và dùng khi nào trường hợp nào )
  - làm việc với java file chưa ( bảo chưa xong skip )
  - từ khóa static trong java (usecase, why use -> method dùng static để chi)
  - hỏi gì nữa á mà cũng dễ mà quên cmnr
- Design pattern
  - MVC là gì, giải thích từng khâu
  - phân loại các loại design pattern
  - biết design pattern nào trình bày ra: singleton, DI, repository, factory, MVC
- Database
  - connect to database như nào? bao gồm cái gì?
  - biết bao nhiêu loại join + trình bày ( inner, left vs right)
  - so sánh và khái niệm mongodb vs mysql
- Others:
  - Dùng bean trong spring như nào, tại sao phải dùng bean ( xml + annotation, nói thêm về execute spring app là đẹp )
  - So sánh get vs post, post với put
  - Tại sao lại dùng post để create hay dùng put để update, có thể dùng ngược lại tính năng ko ( quả này trả lời đc 1 nửa )
  - Tại sao có get vs post là ok rồi mà còn sinh ra mấy cái put delete đồ nữa
  - dùng framework nào quản lý database ( hibernate vs jdbc ) so sánh 2 tụi nó vs usecase
  - quản lý transaction/cache như nào ? dùng cái gì ?
  - firebase sdk overview
  - hỏi về các tool/GUI đã dùng như mysqlworkbench, sourcetree, trello,...
  - hỏi mình quản lý git như nào, có template nào ko
  - hỏi về concurrency & multithread ( mới tìm hiểu event sourcing xong thì đc hỏi hehe )
  - test case nhiều req cùng lúc mà ko muốn đồng bộ ( theo thứ tự ) thì sao ( queue + event sourcing hehe -> trình bày ra tí ) ?
  - hỏi dùng thymeleaf lần nào chưa + chưa thì FE như nào ( trl reactjs thì ngta hỏi sơ sơ overview là xong )
  - authen vs author trước h dùng cách nào ( giài thích sơ và đã làm với nó như nào bằng cách nào là ok )
  - sau đó hỏi học spring security chưa ( mới học xong khoá học free xong sau ổng hỏi sơ sơ overview đại loại khái niệm là xong )
  - có viết test ko ( trl có viết unitest sau đó hỏi viết như nào xong hỏi mockmvc thì bảo mới tìm hiểu chưa apply )

P/s: em học ĐTVT cuối năm 3 ( cũng có thể nói là hơi trái ngành tí xíu )

---

Tiện đây trư cũng share luôn một số câu hỏi đợt phỏng vấn cỡ 2 tháng trước ở 1 công ty outsource ở HCM

**Fresher Java Backend**

**Vòng 1:** CV sceening
**Vòng 2:** IQ test + phỏng vấn tiếng anh với HR. Chủ yếu là giao tiếp bình thường.
**Vòng 3:** PV với 2 anh lead

- Đầu tiên là giới thiệu bản thân, các đồ án đã làm trên trường và hỏi về các công nghệ sử dụng cũng như cách khai triển, dùng nó vào việc gì
- OOP:
  - Khái niệm tính kế thừa , cho ví dụ cụ thể về tính kế thừa
  - Tính đa hình trong java (nói về khái niệm, 2 loại đa hình trong Java)
  - Overloading vs Overriding
  - Abstract class vs Interface
- Java core
  - Một số khai báo cụ thể về từ khoá static (đại khái dùng từ khoá lên method, variable trong case này có được không/mục đích sử dụng)
  - Tương tự như trên với từ khoá final
  - so sánh ArrayList, LinkedList, sử dụng khi nào
  - Set, Map là gì, HashSet, HashMap là gì, khi nào sử dụng
  - Em hiểu thế nào về kiểu nguyên thuỷ trong java
- Design Pattern:
  - Mô hình MVC
  - Cho ví dụ về 1 trang login, em hãy mô tả cách mô hình MVC vận hành khi một người dùng sử dụng trang login để đăng nhập
- Database:
  - Phân biệt mệnh đề Where và Having
  - Các loại join trong CSDL, sau đó trả lời một ví dụ cụ thể ( khi áp dụng loại join này cho 2 bảng có data như này cho ra kết quả gì)
  - Transaction là gì, thường sử dụng để làm gì? Khi một transaction fail thì chuyện gì xảy ra?
- Linh tinh:
  - Các HTTP Methods hay sử dụng, khái niệm, phân biệt
  - Khi triển khai controller, ở phần login em sử dụng POST hay GET, tại sao? Có thể dùng GET được không?
  - Cho một số đoạn code, viết kết quả ra giấy sau khi chạy những đoạn code này
  - Hỏi thêm 1 số câu về JPA, Hibernate mà trư không nhớ rõ