---
area: technology
domain: backend
topic: laravel
type: resource
---
# Các câu hỏi phỏng vấn Laravel

## Resources

- Laravel Beauty: Service container
- Dependency Injection trong Laravel
- Service Container trong Laravel
- Service Provider trong Laravel

## Câu hỏi

### CSRF Protection

- **Tắt CSRF cho Route**: Thêm URL/Route vào `$except` trong `app\Http\Middleware\VerifyCsrfToken.php`

### Facade

- **Định nghĩa**: Class cung cấp static interface cho services, truy cập service trực tiếp từ container
- **Sử dụng**: Định nghĩa trong `Illuminate\Support\Facades`

### Helper

- **Tạo helper**: Tạo `app/helpers.php`, thêm vào `composer.json` autoload, chạy `composer dump-autoload`

### Artisan

- **Định nghĩa**: Command line interface trong Laravel, cung cấp nhiều lệnh hữu ích

### Service Container

- **Định nghĩa**: Công cụ quản lý class dependencies và dependency injection (IoC container)

### Mail Configuration

- **Cấu hình**: API trên SwiftMailer với drivers (SMTP, Mailgun, SparkPost, Amazon SES)

### Auth

- **Định nghĩa**: Xác định thông tin đăng nhập với database, quản lý qua sessions
- **Sử dụng**: `php artisan make:auth`

### Validation

- **Định nghĩa**: Xác nhận dữ liệu đến, sử dụng `ValidatesRequests`
- **Quy tắc**: Alpha, Image, Date, Format, IP Address, URL, Numeric, Email, Size, Min/Max, Unique with database

### Soft Delete

- **Định nghĩa**: Xóa mềm bản ghi, không xóa khỏi database, thiết lập `deleted_at`
- **Sử dụng**: `use Illuminate\Database\Eloquent\SoftDeletes;` và `use SoftDeletes;` trong model

### Fillable

- **Định nghĩa**: Mảng chứa các trường có thể tạo trực tiếp bản ghi mới (Mass Assignment)

### Guarded

- **Định nghĩa**: Ngược với fillable, trường được chỉ định guarded không được mass assignable

### Caching

- **Hỗ trợ**: Memcached và Redis
- **Mặc định**: File cache (serialized objects)

### Blade Syntax

- **{{ $username }}**: Hiển thị nội dung văn bản (escape HTML)
- **{!! $username !!}**: Hiển thị nội dung với thẻ HTML

### Cookie vs Session

- **Cookie**: File nhỏ server nhúng vào máy người dùng, gửi mỗi request
- **Session**: Lưu trữ trên server, bảo mật cao hơn, có PHP SESSID

### empty() vs isset()

- **empty()**: Check biến rỗng, mảng rỗng, null, 0
- **isset()**: Check sự tồn tại của biến và biến có giá trị null không
- **So sánh**: empty bao quát hơn isset

### Query trong Laravel

- **2 cách**: Eloquent và Query Builder
- **Eloquent**: Thao tác qua model, hỗ trợ relationship, code dễ đọc
- **Query Builder**: Thao tác qua lớp DB, thực thi hầu hết thao tác database
- **So sánh**:
  - Cả hai dùng PDO parameter binding (tránh SQL injection)
  - Có thể dùng tất cả hàm query builder trong eloquent, không ngược lại
  - Eloquent không thể thực hiện truy vấn quá phức tạp
- **Cách dùng**: Tùy câu truy vấn, có thể dùng eloquent kết hợp query builder, dùng `DB::raw()` cho SQL thuần