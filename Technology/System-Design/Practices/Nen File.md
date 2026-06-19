---
area: technology
domain: system-design
type: resource
title: Nen File
description: Tùy vào file bạn định nén là gì.
timestamp: '2026-06-19T13:43:26.109Z'
tags:
  - technology
  - system-design
---
Tùy vào file bạn định nén là gì.
Chứ media như phim, ảnh, game các thứ nó không nén được bao nhiêu đâu.
Text thì mới dễ nén và nén được nhiều.
Chọn nén thế nào thì bạn phải tự đem nhu cầu của bạn ra cân đo đong đếm, bạn muốn nén nhanh, hay nén nhiều. Và cả thời gian giải nén lâu hay nhanh nữa.
File bạn nén thuộc dạng đóng gói 1 lần, xong tải ở nhiều nơi, dùng nhiều lần, hay là dispoable nén file, gửi đi, bên kia kéo về giải nén rồi bỏ, ...
Nếu xác định được rồi thì mình khuyên như sau:

- Chỉ dùng RAR khi bạn có nhu cầu đến cái recovery record. Cái này giúp bạn khi tải lỗi, nó sẽ có error correction khắc phục phần nào. Nén thua lzma, đôi khi thua cả zstd mà giải nén lâu hơn. Nén tốt hơn zip nhưng tính compatibility không cao.
- Muốn nén chặt nhất có thể thì dùng thuật toán LZMA2, đuôi 7z. Hoặc đóng gói hết file vào tar (7-zip cũng có tính năng này), rồi nén file tar đó method LZMA2 đuôi xz.
  Tuy nhiên, cái này nén khá tốn bộ nhớ và thời gian.
- Muốn tương thích nhiều thiết bị nhất thì dùng zip.
- Nén text thì khuyên dùng đuôi gz hoặc br, method là gzip hoặc brotli. Nén 1 file thì có thể chọn gzip đuôi gz luôn, còn nhiều file thì đóng nó vào tar, rồi đem tar nén gz hoặc br.
- Thời gian nén vừa, mức nén ổn, giải nén nhanh thì khuyên dùng method zstd, đuôi 7z, hoặc là đóng gói tar, rồi nén zstd, đuôi zst.
- Mấy cái level thì chung quy đến 90% là mức càng cao nén càng lâu, càng tốn bộ nhớ và cho file nén càng chặt thôi, tự cân bằng nhu cầu. (10% còn lại là edge cases).
- Word size thì thông thường cứ max mà triển.
- Dict size thì cái này phải tự benchmark theo từng kiểu data nén, vì hiệu suất của cái này nó như đồ thị quả chuông, tăng dần đến 1 điểm xong bị thoải đi. Cơ mà mình khuyên là dù mốc đỉnh đồ thị có là bao nhiêu, thì ko nên set quá 128MB, hại máy giải nén, mà máy nén cũng phung phí tài nguyên để nén vô ích.
- Cái solid thì cân nhắc theo nhu cầu giải nén.
  Nếu bạn muốn giải nén là bung cả cục, không thiếu gì thì chọn solid. Còn nếu bạn muốn có trường hợp đôi khi chỉ giải nén vài file nhất định, thì chỉnh dung lượng tùy nhu cầu (cái này mình cũng ko biết recommend size thế nào).
  Đại khái thì khi solid, bạn sẽ đóng tảng thành 1 cục và nén, nó sẽ có hiệu quả nén tốt hơn, khi muốn lấy file phải bung cả cục. Kiểu có chuỗi file 1, 2, 3, 4, ... mà muốn lấy file 3 thì vẫn phải đi qua 1, 2.
  Chỉnh kích thước thì nó sẽ tách ra thành các khối có kích thước đó rồi nén, khi chạy tới file sẽ tiện hơn. No solid là rạch ròi từng file, nén từng cái 1 rồi đóng gói. Cái no solid này zip dùng, có hiệu quả read random access cao, nhưng compression thấp.

---

P/s: Winrar chỉ có nén zip, rar4, rar (rar5), giải nén được nhiều thứ.
7-zip đóng được tar, nén được nhiều kiểu như zip, 7z, lzma, zst, tar.bz2, tar.gz, tar.xz, tar.zstd, lz4, lz5, ... Giải nén được RẤT NHIỀU THỨ, bao gồm rar (chỉ ko nén đc thôi, do độc quyền, phương thức giải nén thì mã nguồn mở, nhưng license ko cho phép reverse engineering ra phương pháp nén).

Xét tính năng thì vote 7zip > Peazip >>>>> WinRAR. (WinRAR chỉ có đúng 1 cái mà mấy cái kia ko có là Recovery Record, còn lại 2 cái kia đều có hết, thậm chí còn làm tốt hơn)
Cơ mà vote UI thì ngược lại. =))