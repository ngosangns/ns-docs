---
tags:
  - area/technology
  - domain/computer-science
  - type/resource
  - lang/vi
---

# 1. OS và các cơ chế time sclicing và scheduling

- Cơ chế time slicing là một phương pháp trong lập lịch mà mỗi tiến trình hoặc luồng được cấp một khoảng thời gian nhất định để chạy, sau đó, điều khiển chuyển sang tiến trình hoặc luồng khác. Mục tiêu của time slicing là đảm bảo công bằng và hiệu quả trong việc chia sẻ tài nguyên CPU giữa các tiến trình và luồng mà không làm cho một tiến trình chiếm dụng tài nguyên quá mức.
- Scheduling là quá trình quyết định tiến trình hoặc luồng nào sẽ được thực thi tiếp theo trên CPU.
  - Có nhiều thuật toán lập lịch khác nhau, và mỗi thuật toán có những đặc điểm và mục tiêu lập lịch khác nhau. Một số thuật toán phổ biến bao gồm:
    - **First Come First Serve (FCFS)**: Thực thi tiến trình đến khi hoàn thành trước.
    - **Shortest Job Next (SJN)**: Thực hiện tiến trình có thời gian thực thi ngắn nhất trước.
    - **Priority Scheduling**: Ưu tiên thực hiện tiến trình có độ ưu tiên cao hơn.
    - **Round Robin**: Sử dụng cơ chế time slicing, mỗi tiến trình có cơ hội chạy trong một khoảng thời gian nhất định trước khi chuyển sang tiến trình khác.

# 2. Độ trễ trong bộ xử lý trung tâm và ổ cứng - Tối ưu hóa hiệu suất hệ thống

- **Độ trễ trong hệ thống**:
  - Truy xuất từ ổ đĩa chậm hơn 80 lần so với RAM, SSD vẫn chậm hơn 4 lần so với RAM
  - Thứ tự độ trễ từ nhanh đến chậm: L1 Cache CPU (0.5 ns), L2 Cache (7 ns), RAM (100 ns), SSD (1,000,000 ns cho 1MB), Disk (20,000,000 ns cho 1MB)
  - Hiểu rõ độ trễ giúp tối ưu hóa hiệu suất hệ thống bằng cách ưu tiên sử dụng các tầng bộ nhớ nhanh hơn
- **Dự đoán nhánh trong CPU (Branch Prediction)**:
  - CPU hiện đại sử dụng bộ dự đoán nhánh để xử lý hiệu quả các lệnh rẽ nhánh, giảm thiểu lãng phí chu kỳ CPU
  - Giúp CPU có thể dự đoán trước hướng đi của chương trình và tải sẵn các lệnh cần thiết
- **Ảo tưởng về bộ nhớ chung (Shared Memory)**:
  - Các process/thread sử dụng vùng nhớ chung để tương tác, nhưng cần quản lý việc đọc/ghi dữ liệu và tránh tranh chấp tài nguyên
  - Việc chia sẻ bộ nhớ giữa các process/thread có thể dẫn đến tranh chấp tài nguyên và giảm hiệu suất nếu không được quản lý đúng cách
- **False Sharing**:
  - Khi nhiều lõi CPU làm việc với các biến khác nhau nhưng cùng nằm trên một cache line, dẫn đến việc phải đồng bộ giữa các lõi, gây giảm hiệu suất
  - Đây là một vấn đề tinh vi trong lập trình đa luồng cần được chú ý để tối ưu hóa hiệu suất
- Nguồn: https://viblo.asia/p/tim-hieu-ve-do-tre-trong-bo-xu-ly-trung-tam-va-o-cung-toi-uu-hoa-hieu-suat-he-thong-BQyJKvyw4Me

# 3. Signal Processing - Xử lý tín hiệu

## 3.1. Fourier Transform (Biến Đổi Fourier)

- **Khái niệm**: Công cụ giúp phân tích một tín hiệu thành tổng của các sóng sin và cosin với các tần số khác nhau
- **Nguyên lý**: Bất kỳ tín hiệu nào cũng có thể được biểu diễn như một tổng của các sóng sin và cosin với các tần số khác nhau
- **Chuyển đổi miền**:
  - Chuyển tín hiệu từ **miền thời gian** (thay đổi theo thời gian) sang **miền tần số** (cho thấy các tần số nào đang xuất hiện)
  - Ví dụ: Một bài hát là sự kết hợp của nhiều nốt nhạc khác nhau (tần số cao, thấp), Fourier Transform giúp tách từng nốt nhạc ra để xem đóng góp của nó
- **Ứng dụng**:
  - Xử lý âm thanh: Phân tích bài hát để xem có bao nhiêu âm trầm (tần số thấp), âm trung, âm cao (tần số cao)
  - Xử lý hình ảnh: Phân tích và xử lý hình ảnh
  - Phân tích dữ liệu trong khoa học và kỹ thuật
  - Viễn thông và truyền tín hiệu

## 3.2. Discrete Fourier Transform (DFT) - Biến Đổi Fourier Rời Rạc

- **Khái niệm**: Phiên bản rời rạc của Biến Đổi Fourier, được sử dụng khi làm việc với dữ liệu số
- **Đặc điểm**:
  - Làm việc với dữ liệu rời rạc (discrete data) như các mẫu âm thanh được ghi lại bởi máy tính hoặc điện thoại
  - Xử lý các điểm dữ liệu riêng lẻ thay vì tín hiệu liên tục
- **Ứng dụng thực tế**:
  - Vẽ tranh với DFT: Sử dụng DFT để tái tạo hình vẽ từ các hệ số Fourier
    - Mỗi hệ số Fourier tương ứng với một vòng tròn (epicycle)
    - Vòng tròn có bán kính = độ lớn của hệ số (magnitude)
    - Vòng tròn quay với tốc độ tỷ lệ với tần số k
    - Điểm cuối cùng của chuỗi vòng tròn vẽ ra đường cong gốc
  - Visualization: Minh họa mối quan hệ giữa miền thời gian và miền tần số một cách trực quan
- **Fast Fourier Transform (FFT)**: Thuật toán tối ưu để tính toán DFT một cách hiệu quả, giảm độ phức tạp tính toán
- Nguồn: https://viblo.asia/p/fourier-transform-la-gi-ve-tranh-voi-discrete-fourier-transform-kNLr3deOVgA #signal-processing #fourier-transform #DFT
