---
tags:
  - android
  - cheat
  - coding
  - coroutines
  - engineer
  - frameworks
  - golang
  - kotlin
  - libraries
  - programming
  - programming-languages
  - quick-reference
  - resources
  - runcatching
  - sheet
  - trick
  - vietnamese
  - kotlin-coroutines
  - android-engineer
  - run-catching
---
# 1. Resources

## 1.1. Kotlin Coroutines cheat sheet nâng cao dành cho Android Engineer

- https://viblo.asia/p/kotlin-coroutines-cheat-sheet-nang-cao-danh-cho-android-engineer-0gdJzDggVz5
- Kotlin Flow cheat sheet phần 1 - Channel: https://viblo.asia/p/kotlin-flow-cheat-sheet-phan-1-channel-2oKLnno1LQO
- Kotlin Flow cheat sheet phần 2 - Flow: https://viblo.asia/p/kotlin-flow-cheat-sheet-phan-2-flow-Yym40YGoJ91
- Kotlin Flow cheat sheet phần 3 - SharedFlow và StateFlow: https://viblo.asia/p/kotlin-flow-cheat-sheet-phan-3-sharedflow-va-stateflow-aAY4q73DLPw
- Flow trong Kotlin: [Giới thiệu về Flow trong Kotlin - Viblo](https://viblo.asia/p/gioi-thieu-ve-flow-trong-kotlin-AWVpX8DoV05)

# 2. Libraries / Frameworks

- Koin - Dependency injector: https://github.com/InsertKoinIO/koin
	- [[Dagger & Koin]]

# 3. Trick lỏ

## 3.1. Quản lý lỗi hiệu quả với `runCatching`

- Thay thế `try-catch` truyền thống trong Kotlin bằng cách sử dụng hàm `runCatching` để quản lý lỗi một cách hiệu quả và idiom hơn.
- Vấn đề của `try-catch` truyền thống
    - Dài dòng và khó đọc: Khi có nhiều block `try-catch` lồng nhau hoặc liên tiếp.
    - Kém linh hoạt: Không dễ dàng tích hợp với các phong cách lập trình hàm (functional programming) hoặc chaining method.
    - Dễ bỏ qua xử lý lỗi: Dễ dẫn đến các block `catch` rỗng hoặc xử lý lỗi không đầy đủ.
- Giới thiệu `runCatching` và `Result`
    - `runCatching` là một hàm trong Kotlin Standard Library, giúp thực thi một block code và bắt các ngoại lệ (exceptions) xảy ra trong đó.
    - Nó trả về một đối tượng `Result<T>`, là một sealed class với hai trạng thái:
        - `Success(value: T)`: Chứa kết quả thành công.
        - `Failure(exception: Throwable)`: Chứa ngoại lệ (exception) đã xảy ra.
- Lợi ích của việc sử dụng `runCatching`
    - Code ngắn gọn và sạch sẽ hơn: Giảm boilerplate code so với `try-catch`.
    - Hỗ trợ lập trình hàm: Cho phép chuỗi các hoạt động (chaining operations) trên kết quả.
    - Xử lý lỗi tường minh: Buộc người lập trình phải cân nhắc các trường hợp lỗi, khuyến khích xử lý lỗi tốt hơn.
    - Tách biệt mối quan tâm: Logic nghiệp vụ nằm trong block `runCatching`, còn logic xử lý lỗi nằm ở bên ngoài trên đối tượng `Result`.
- Các hàm hữu ích của đối tượng `Result`
    - Kiểm tra trạng thái:
        - `isSuccess`: Trả về `true` nếu là `Success`.
        - `isFailure`: Trả về `true` nếu là `Failure`.
    - Truy cập giá trị:
        - `getOrNull()`: Trả về giá trị nếu là `Success`, ngược lại trả về `null`.
        - `getOrElse { defaultValue }`: Trả về giá trị nếu là `Success`, ngược lại trả về giá trị mặc định.
    - Thực thi dựa trên trạng thái:
        - `onSuccess { value -> /* do something */ }`: Thực thi block code nếu là `Success`.
        - `onFailure { exception -> /* do something */ }`: Thực thi block code nếu là `Failure`.
    - Chuyển đổi kết quả:
        - `map { transform(value) }`: Chuyển đổi giá trị của `Success`. Nếu là `Failure`, truyền lỗi đi tiếp.
        - `recover { transform(exception) }`: Phục hồi từ trạng thái `Failure` bằng cách biến đổi ngoại lệ thành một giá trị thành công.
    - Kết hợp xử lý:
        - `fold(onSuccess: (T) -> R, onFailure: (Throwable) -> R)`: Thực thi một trong hai block `onSuccess` hoặc `onFailure` và trả về một giá trị duy nhất.
- Khi nào nên và không nên dùng `runCatching`
    - Nên dùng: Cho các hoạt động có thể ném ra ngoại lệ như I/O, parsing dữ liệu, gọi API, xử lý các tài nguyên bên ngoài... nơi bạn muốn kiểm soát tác dụng phụ (side effects) của việc có lỗi.
    - Không nên dùng:
        - Để kiểm soát luồng (flow control) của chương trình. Ví dụ, việc kiểm tra tính hợp lệ của input nên được thực hiện bằng validation rõ ràng thay vì dựa vào bắt ngoại lệ.
        - Với các lỗi nghiêm trọng (unrecoverable errors) mà ứng dụng không thể phục hồi được.