---
tags:
  - cac
  - cau
  - general
  - hoi
  - laravel
  - phong
  - van
  - vietnamese
  - service-container
  - artisan
  - validation
  - soft-delete
---

- Laravel Beauty: Tìm hiểu về Service container: https://viblo.asia/p/laravel-beauty-tim-hieu-ve-service-container-3KbvZ1wLGmWB
- Dependency Injection hoạt động thế nào trong Laravel?: https://viblo.asia/p/dependency-injection-hoat-dong-the-nao-trong-laravel-3Q75wD3JKWb
- Tìm hiểu về Service Container trong Laravel: https://viblo.asia/p/tim-hieu-ve-service-container-trong-laravel-Qbq5QLw3lD8
- Tìm hiểu Service Provider trong Laravel: https://viblo.asia/p/tim-hieu-service-provider-trong-laravel-bWrZngBrlxw

---

1. Làm thế nào chúng ta có thể tắt bảo vệ CRSF cho một Route cụ thể?
    Chúng ta có thể thêm URL cụ thể hoặc Route trong biến $except trong file `app\Http\Middleware\VerifyCsrfToken.php`

    ```php
    class VerifyCsrfToken extends BaseVerifier { protected $except = < "Pass here your URL", >; }
    ```

2. Facade trong laravel là gì? Làm sao để sử dụng nó?

    Facade là 1 kiểu class, class này cung cấp 1 static interface cho services. Facade giúp truy cập 1 service trực tiếp từ container. Nó được định nghĩa trong `Illuminate\Support\Facades`, nhờ đó chúng ta có thể dễ dàng sử dụng.

    ```php
    use Illuminate\Support\Facades\Cache;

    Route::get("/cache", function () {
    		return Cache::get("PutkeyNameHere");
    });
    ```

3. Làm thế nào để tạo 1 helper trong Laravel?

    - Tạo một `app/helpers.php` trong thư mục ứng dụng
    - Sau đó thêm `"files": <"app/helpers.php">` trong biến autoload của file `composer.json`.
    - Sau đó update composer bằng `composer dump-autoload` và `composer update`.

1. Một Artisan là gì?

    Artisan là một kiểu command line interface sử dụng trong Laravel. Nó cung cấp rất nhiều lệnh hữu ích cho bạn trong khi phát triển ứng dụng của bạn. Một số lệnh artisan phổ biến

5. Service container là gì?

    Service Container là một công cụ mạnh mẽ được sử dụng để quản lý các class dependencies và thực hiện dependency injection. Nó còn được gọi là container IoC.

6. Làm thế nào chúng ta có thể cấu hình một Mail trong Laravel?

    Laravel cung cấp API rõ ràng và đơn giản trên thư viện phổ biến SwiftMailer với các drivers cho SMTP, Mailgun, SparkPost, Amazon SES và gửi email. Laravel đang cho phép gửi Mail quickly thông qua các dịch vụ local hoặc trên nền tảng đám mây.

7. Auth là gì? Làm sao để sử dụng chúng?

    Laravel Auth là quá trình xác định thông tin đăng nhập của người dùng với cơ sở dữ liệu. Laravel quản lý nó với sự trợ giúp của các sessions, Các sessions lấy tham số đầu vào như tên người dùng và mật khẩu, để nhận dạng người dùng. Nếu các cài đặt khớp nhau thì người dùng được cho là đã được xác thực. Auth là chức năng được xây dựng do Laravel cung cấp; chúng ta phải sử dụng lệnh php artisan make: authAuth được sử dụng để xác định thông tin đăng nhập của người dùng với cơ sở dữ liệu.

![[Untitled 7.png]]

**Validation trong laravel và cách sử dụng ?**

Validation là một điều quan trọng nhất trong khi thiết kế một ứng dụng. Nó xác nhận dữ liệu đến. Nó sử dụng ValidatesRequests cung cấp một phương thức thuận tiện để xác thực các yêu cầu HTTP đến với các quy tắc xác thực mạnh mẽ.Dưới đây là một số Quy tắc xác thực có sẵn trong Laravel được liệt kê:

AlphaImageDate FormatIP AddressURLNumericEmailSizeMin , MaxUnique with database

**Soft delete trong Laravel**

**Soft delete** là một tính năng của Laravel giúp khi Model muốn xóa mềm một bản ghi. Tức là bản khi không thực sự bị xóa khỏi cơ sở dữ liệu. Thay vào đó, 1 cột deleted_at sẽ được thiết lập. Khi bật soft deletes cho 1 model. Chúng ta phải chỉ định thuộc tính softDelete trong model chúng ta sử dụng dụng namespace use Illuminate\\Database\\Eloquent\\SoftDeletes; và chúng ta có thể sử dụng use SoftDeletes;trong model của chúng ta.

Sau đó chúng ta sẽ sử dụng truy vấn delete() thì các bản ghi sẽ không xóa khỏi cơ sở dữ liệu của chúng ta. Sau đó deleted_at đã được thiết lập trên bản ghi.

**Thuộc tính fillable trong Model là gì?**

Nó là một mảng chứa tất cả các trường của bảng có thể được tạo trực tiếp bản ghi mới trong bảng Cơ sở dữ liệu của bạn.

class User extends Model { protected $fillable = ['username', 'password', 'phone']; }

Việc khai báo $fillable sẽ giúp ta Mass Assignment khi tạo một bản ghi mới trong Laravel.

**Thuộc tính guarded trong một mô hình là gì?**

Ngược với fillable. Khi một trường được chỉ định guarded. Nó sẽ khoogn được mass assignable

class User extends Model { protected $guarded = ['user_type']; }

**Laravel có hỗ trợ caching?**

Có, nó hỗ trợ caching như Memcached và Redis. Theo mặc định, laravel được cấu hình với caching lưu trữ các đối tượng được lưu nối tiếp, được lưu trong các tệp. Thông thường chúng ta có thể sử dụng Memcached hoặc Redis cho các dự án lớn.

**Sự khác nhau giữa {{ $username }} và {!! $username !!}**

{{ $username }} chỉ được sử dụng để hiển thị nội dung văn bản nhưng {!! $username !!} được sử dụng để hiển thị nội dung với các thẻ HTML nếu tồn tại.

**Cookie và session có gì khác nhau ?**

COOKIE là một tập tin nhỏ được server nhúng vào máy tính của người dùng. Nếu lần đầu tiên trình duyệt truy cập vào website nó sẽ gửi một COOKIE đến trình duyệt của người dùng, và mỗi khi người dùng tiếp tục yêu cầu một trang web từ website này thì COOKIE với các thông tin thu nhập từ phía người dùng trên website này sẽ được sẽ gửi trả về server của website.

SESSION cũng giống như COOKIE nhưng SESSION được lưu trữ hoàn toàn trên server, do vậy tính bảo mật cao hơn cookie, các website hiện này thường dùng session để lưu thông tin của người dùng khi họ đăng nhập. Chu kỳ sống của SESSION do webserver qui định, ta có thể điều chỉnh chu kỳ này khi cấu hình webserver, tại server sẽ có 1 PHP SESSID tương ứng được tạo ra, các PHP SESSID sẽ được lưu trong một tập tin văn bản ở tại vị trí được qui định trong file php.ini ở dòng session.save_path.

**Sự khác nhau giữ emty() và isset()**

Empty() check biến có giá trị là rỗng hoặc mảng rỗng,null,0.

Còn isset() thì chỉ check sự tồn tại của biến, và biến có giá trị null không .

Empty bao quát hơn isset

**Có mấy cách query trong laravel, bạn hay sử dụng cách nào, vì sao?**

Có 2 cách truy vấn trong laravel, đó là Eloquent và Query builder

Eloquent và Query builder đều là công cụ truy vấn của laravel giúp cho coder dễ dàng thao tác với database

Eloquent, các thao tác với database đều cần thông qua model, và hỗ trợ rất nhiều hàm làm cho việc truy vấn đơn giản hơn, hỗ trợ những relationship giúp cho

code dễ đọc và đẹp hơn,

Query buider, thao tác với db thông qua lớp DB, Nó có thể được sử dụng để thực thi hầu hết những thao tác về database trong ứng dụng

So sánh:

Query builder và Eloquent đều sử dụng : 'PDO parameter binding' nên sẽ giúp chúng ta tránh được lỗi sql injection.

Có thể dùng tất cả hàm của query buider trong eloquent, nhưng không thể làm ngược lại

Nhưng eloquent không thể thực hiện được những truy vấn quá phức tạp

Tùy vào câu truy vấn mà ta có thể lựa chọn cách dùng eloquent hay query builder, Tôi thì hay sử dụng eloquent nhưng lai query buider, tức là vẫn dùng model để thao tác với database

Nhưng câu truy vấn thì vẫn sự dụng hàm của eloquent và query builder, với những câu truy vấn phức tạp cần chèn sql thuần thì cần sài hàm DB::raw()

![[Untitled 1 2.png]]

![[Untitled 2 1.png]]

![[Untitled 3 1.png]]
