---
area: technology
domain: algorithms
type: resource
title: Algorithm Development
description: Algorithm Development
timestamp: "2026-06-19T13:43:26.161Z"
tags:
  - technology
  - algorithms
---

# Algorithm Development

## Mục lục

- [Chọn thuật toán](#chọn-thuật-toán)
- [Kiểm lỗi chương trình](#kiểm-lỗi-chương-trình)
- [Tối ưu chương trình](#tối-ưu-chương-trình)

## Chọn thuật toán

### Các đặc trưng của thuật toán

- **Tính đơn nghĩa**:
  - Người ta phân loại thuật toán ra làm hai loại:
    - **Đơn định** (Deterministic): Với cùng 1 đầu vào sẽ có 1 đầu ra tương ứng. Kết quả không thay đổi sau nhiều lần chạy. Ví dụ hàm tính tổng của _a + b_
    - **Ngẫu nhiên** (Randomized): Với cùng 1 đầu vào sẽ cho ra kết quả khác nhau sau mỗi lần chạy. Ví dụ hàm random một số nằm giữa _a_ và _b_
  - Một thuật toán chỉ được thuộc một trong hai loại trên
- **Tính dừng**: Thuật toán không được rơi vào quá trình vô hạn, phải dừng lại và cho kết quả sau một số hữu hạn bước
- **Tính đúng**: Sau khi thực hiện tất cả các bước của thuật toán theo đúng quá trình đã định, ta phải được kết quả mong muốn với mọi bộ dữ liệu đầu vào. Kết quả đó được kiểm chứng bằng yêu cầu bài toán
- **Tính phổ dụng**: Thuật toán phải dễ sửa đổi để thích ứng được với bất kỳ bài toán nào trong một lớp các bài toán và có thể làm việc trên các dữ liệu khác nhau
- **Tính khả thi**:
  - **Kích thước phải đủ nhỏ**: Ví dụ: Một thuật toán sẽ có tính hiệu quả bằng 0 nếu lượng bộ nhớ mà nó yêu cầu vượt quá khả năng lưu trữ của hệ thống máy tính
  - **Thuật toán phải chuyển được thành chương trình**: Ví dụ một thuật toán yêu cầu phải biểu diễn được số vô tỉ với độ chính xác tuyệt đối là không hiện thực với các hệ thống máy tính hiện nay
  - **Thuật toán phải được máy tính thực hiện trong thời gian cho phép**, điều này khác với lời giải toán (Chỉ cần chứng minh là kết thúc sau hữu hạn bước). Ví dụ như xếp thời khoá biểu cho một học kỳ thì không thể cho máy tính chạy tới học kỳ sau mới ra được

## Kiểm lỗi chương trình

- Có ba loại lỗi:
  - **Lỗi cú pháp**: Lỗi này hay gặp nhất nhưng lại dễ sửa nhất, chỉ cần nắm vững ngôn ngữ lập trình là đủ. Một người được coi là không biết lập trình nếu không biết sửa lỗi cú pháp
  - **Lỗi cài đặt**: Việc cài đặt thể hiện không đúng thuật toán đã định, đối với lỗi này thì phải xem lại tổng thể chương trình, kết hợp với các chức năng gỡ rối để sửa lại cho đúng
  - **Lỗi thuật toán**: Lỗi này ít gặp nhất nhưng nguy hiểm nhất, nếu nhẹ thì phải điều chỉnh lại thuật toán, nếu nặng thì có khi phải loại bỏ hoàn toàn thuật toán sai và làm lại từ đầu
- Xây dựng các bộ test:
  - Các bộ test nên đặt trong file văn bản
  - Bắt đầu với các bộ test nhỏ, có thể tự làm thủ công
  - Tiếp theo làm những bộ test chứa các giá trị đặc biệt, những giá trị dễ sai
  - Các bộ test phải đa dạng, tránh sự lặp đi lặp lại các bộ test tương tự
  - Nên có một vài bộ test lớn để kiểm tra tính chịu đựng của chương trình
  - Lưu ý rằng chương trình chạy qua được hết các test không có nghĩa là chương trình đó đã đúng. Bởi có thể ta chưa xây dựng được bộ test làm cho chương trình chạy sai

## Tối ưu chương trình

- Một chương trình đã chạy đúng không có nghĩa là việc lập trình đã xong, ta phải sửa đổi lại một vài chi tiết để chương trình có thể chạy nhanh hơn, hiệu quả hơn. Thông thường, trước khi kiểm thử thì ta nên đặt mục tiêu viết chương trình sao cho đơn giản, miễn sao chạy ra kết quả đúng là được, sau đó khi tối ưu chương trình, ta xem lại những chỗ nào viết chưa tốt thì tối ưu lại mã lệnh để chương trình ngắn hơn, chạy nhanh hơn. Không nên viết tới đâu tối ưu mã đến đó, bởi chương trình có mã lệnh tối ưu thường phức tạp và khó kiểm soát
- Việc tối ưu chương trình nên dựa trên các tiêu chuẩn sau:
  - **Tính tin cậy**: Mỗi bước tối ưu phải kiểm tra lại xem thuật toán có chạy đúng như dự định hay không
  - **Tính uyển chuyển**: Chương trình phải dễ sửa đổi. Bởi ít có chương trình nào viết ra đã hoàn hảo ngay được mà vẫn cần phải sửa đổi lại. Chương trình viết dễ sửa đổi sẽ làm giảm bớt công sức của lập trình viên khi phát triển chương trình
  - **Tính trong sáng**: Chương trình viết ra phải dễ đọc dễ hiểu, để sau một thời gian dài quay lại có thể dễ dàng đọc hiểu từ đó dễ dàng tìm được lỗi sai (nếu có) và cải tiến chúng. Tính trong sáng của chương trình phụ thuộc rất nhiều vào công cụ lập trình và phong cách lập trình
  - **Tính hữu hiệu**: Chương trình phải chạy nhanh và ít tốn bộ nhớ, tức là tiết kiệm được cả về không gian và thời gian. Để có một chương trình hữu hiệu, cần phải có giải thuật tốt và những tiểu xảo khi lập trình. Tuy nhiên, việc áp dụng quá nhiều tiểu xảo có thể khiến chương trình trở nên rối rắm, khó hiểu khi sửa đổi. Tiêu chuẩn hữu hiệu nên dừng lại ở mức chấp nhận được, không quan trọng bằng ba tiêu chuẩn trên. Bởi phần cứng phát triển rất nhanh, yêu cầu hữu hiệu không cần phải đặt ra quá nặng
