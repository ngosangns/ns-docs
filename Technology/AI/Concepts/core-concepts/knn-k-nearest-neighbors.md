---
area: technology
domain: ai-ml
topic: machine-learning
type: resource
---
# KNN - K-Nearest Neighbors

## KNN đối phó với Outlier

KNN hoạt động bằng cách tìm các điểm dữ liệu gần nhất để đưa ra quyết định. Các điểm outlier có thể ảnh hưởng đến kết quả của mô hình.

### 1. Lọc outlier trước khi huấn luyện (Preprocessing)

- **Z-score**: Phát hiện điểm nào có giá trị quá xa so với trung bình
- **IQR (Interquartile Range)**: Đo lường sự phân tán và loại bỏ những điểm ngoài vùng IQR
- Loại bỏ outliers giúp dữ liệu sạch hơn, KNN hoạt động hiệu quả hơn

### 2. Điều chỉnh giá trị K

- Tăng giá trị K: Thuật toán xem xét nhiều láng giềng hơn, giảm thiểu tác động của một vài điểm ngoại lai
- Lưu ý: Tăng K quá nhiều có thể khiến mô hình trở nên "quá đơn giản" và giảm độ chính xác
- Cần kiểm tra và chọn K phù hợp

### 3. Trọng số cho các láng giềng gần hơn (Weighted KNN)

- Trọng số hóa các láng giềng gần hơn, khiến chúng có ảnh hưởng lớn hơn đến kết quả dự đoán
- Những điểm outlier thường ở xa các điểm dữ liệu chính, nên trọng số giúp giảm bớt ảnh hưởng của chúng

### 4. Thử nghiệm với các biến thể KNN

- **Robust KNN**: Các phiên bản nâng cao có cơ chế giảm thiểu ảnh hưởng của outlier
- Giúp có được kết quả chính xác hơn mà không cần phải loại bỏ quá nhiều dữ liệu

### 5. Khám phá các khoảng cách khác

- **Euclidean distance**: Phổ biến nhất
- **Manhattan distance**: Có thể giúp giảm sự ảnh hưởng của outlier
- **Minkowski distance**: Một lựa chọn khác
- Thay đổi khoảng cách có thể giúp giảm sự ảnh hưởng của những điểm outlier và giúp mô hình chính xác hơn

## Tóm lại

- KNN có thể gặp vấn đề với các điểm outlier
- Chiến lược xử lý:
  - Lọc dữ liệu (preprocessing)
  - Điều chỉnh K
  - Trọng số cho láng giềng gần
  - Sử dụng các biến thể KNN (Robust KNN)
  - Thử nghiệm các loại khoảng cách khác nhau
- Việc thử nghiệm và tinh chỉnh mô hình là một phần quan trọng trong việc tối ưu hóa hiệu suất