# 1. Cốt lõi & Thực thi

PHP hoạt động như thế nào trong môi trường web và các cách thực thi khác nhau.

## 1.1. SAPI (Server API)

SAPI là lớp giao tiếp giữa PHP và các ứng dụng máy chủ khác (như web server). Các SAPI phổ biến bao gồm:

* CLI (Command Line Interface): Chạy PHP script từ dòng lệnh.
* CGI (Common Gateway Interface): Một chuẩn cũ, mỗi request tạo một process PHP mới. Hiệu năng thấp.
* FastCGI: Cải tiến của CGI. Các process PHP được giữ lại để xử lý nhiều request, giảm chi phí khởi tạo.
    * PHP-FPM (FastCGI Process Manager): Là trình quản lý tiến trình FastCGI phổ biến nhất cho PHP, thường dùng với [[Nginx]]. Nó quản lý pool các worker process, khởi động/dừng chúng, và xử lý kết nối.
		* *Luồng hoạt động (Nginx + PHP-FPM):* Browser -> Nginx -> (FastCGI protocol) -> PHP-FPM -> PHP xử lý -> PHP-FPM -> (FastCGI protocol) -> Nginx -> Browser.
		* *Tài nguyên:* [Tối ưu Nginx và PHP-FPM](https://viblo.asia/p/thu-thuat-cau-hinh-toi-uu-cho-nginx-va-php-fpm-1VgZv4e25Aw)
* Apache Module (`mod_php`): PHP được nhúng trực tiếp vào process của Apache.
    * *Ưu điểm:* Giao tiếp trực tiếp, cấu hình đơn giản hơn.
    * *Nhược điểm:* PHP chạy cùng user với Apache, có thể ảnh hưởng bảo mật. Khi Apache dùng Worker MPM (threads), cần bản PHP Thread-Safe (TS).
* Các Web Server tích hợp sẵn PHP: Như [[FrankenPHP]] (module Caddy), Litespeed (LSAPI).

## 1.2. Web Servers phổ biến

* [[Nginx]]: Hiệu năng cao, xử lý tốt nhiều kết nối đồng thời, thường kết hợp với PHP-FPM.
* Apache HTTP Server: Lâu đời, nhiều module, linh hoạt. Có thể dùng `mod_php` hoặc FastCGI (với `mod_proxy_fcgi` và PHP-FPM).
* Caddy: Hiện đại, tự động HTTPS, cấu hình đơn giản. Có thể dùng FastCGI hoặc [[FrankenPHP]].
* Litespeed Web Server: Tương thích Apache, hiệu năng cao, có LSAPI (thay thế PHP-FPM) và Litespeed Cache.

## 1.3. Thread Safety (TS) vs Non-Thread Safe (NTS)

* Thread-Safe (TS): Cần thiết khi PHP chạy trong môi trường đa luồng (multi-threaded) của web server, ví dụ Apache với Worker MPM dùng `mod_php`. Nó đảm bảo tài nguyên được quản lý an toàn giữa các thread.
* Non-Thread Safe (NTS): Sử dụng khi mỗi request được xử lý bởi một process riêng biệt, ví dụ khi dùng PHP-FPM (mô hình multi-process) hoặc chạy PHP CLI. Thường nhanh hơn một chút do không có cơ chế quản lý thread.
* Lưu ý: Extension `pthreads` đã không còn được bảo trì. Cân nhắc [[#6. Các Runtime & Mô hình nâng cao|mô hình bất đồng bộ]] hoặc `ext-parallel` / `amphp/parallel` nếu cần xử lý song song.

## 1.4. Standard PHP Library (SPL)

Một tập hợp các interface và class được thiết kế để giải quyết các vấn đề chung (ví dụ: cấu trúc dữ liệu, iterator).
* [Tài liệu SPL](https://www.php.net/manual/en/book.spl.php)
* Ví dụ: `SplPriorityQueue` (hàng đợi ưu tiên), `ArrayIterator`, `SplFixedArray`.

# 2. Tối ưu Hiệu năng

Các kỹ thuật và công cụ giúp tăng tốc độ thực thi mã PHP.

## 2.1. OPCache

* Cơ chế: Lưu trữ bytecode (mã PHP đã được biên dịch) vào bộ nhớ chia sẻ (shared memory). Khi có request mới, PHP có thể lấy bytecode từ cache thay vì đọc và biên dịch lại file mã nguồn từ đĩa.
* Lợi ích: Giảm đáng kể I/O đĩa và thời gian xử lý CPU, tăng tốc độ ứng dụng rõ rệt.
* Trạng thái: Được tích hợp sẵn và khuyến nghị bật trong môi trường production từ PHP 5.5+.

## 2.2. Just-In-Time (JIT) Compilation

* Cơ chế: Biên dịch các phần "nóng" (hot code - thường là các vòng lặp hoặc hàm được gọi nhiều lần) của bytecode thành mã máy (machine code) gốc trong quá trình thực thi. Mã máy chạy nhanh hơn bytecode.
* Loại JIT trong PHP 8+:
	* Tracing JIT: Tối ưu các chuỗi lệnh (trace) được thực thi thường xuyên. Phù hợp cho các tác vụ tính toán nặng, CPU-bound.
	* Function JIT: Biên dịch toàn bộ hàm khi nó được gọi (ít dùng hơn).
* Tác động: Lợi ích rõ rệt nhất cho các ứng dụng tính toán nặng, CLI scripts, long-running processes. Ít ảnh hưởng hơn đến các ứng dụng web I/O-bound điển hình (nơi thời gian chờ database, network chiếm phần lớn).
* [JIT In-depth](https://php.watch/articles/jit-in-depth)

# 3. Hệ sinh thái - Frameworks & Thư viện

Các bộ khung và thư viện giúp xây dựng ứng dụng nhanh chóng và hiệu quả.

## 3.1. Frameworks

* Full-stack:
    * [[Laravel]]: Phổ biến nhất, hệ sinh thái lớn, cú pháp đẹp, nhiều tính năng (ORM Eloquent, Template Blade, Queue, Artisan CLI...).
    * [[Symfony]]: Mạnh mẽ, linh hoạt, tập trung vào các component tái sử dụng. Nền tảng của nhiều framework khác (bao gồm cả Laravel).
    * Spiral Framework: Hiện đại, tập trung vào RoadRunner, DI Container mạnh mẽ, Data Mapper ORM (Cycle). [spiral.dev](https://spiral.dev)
    * CakePHP: Lâu đời, tuân thủ quy ước (convention over configuration).
* Microframeworks:
    * Slim: Nhẹ nhàng, tập trung vào routing và middleware, tốt cho API. [slimframework.com](https://www.slimframework.com/)
    * Lumen: Microframework từ Laravel (hiện ít được ưu tiên phát triển).
* API Frameworks:
    * API Platform: Xây dựng API REST/GraphQL hiện đại, tích hợp tốt với Symfony/Doctrine. [api-platform.com](https://api-platform.com/)
* Async / High-Performance: (Thường dựa trên event-loop, coroutine)
    * Swoole: Extension C cung cấp khả năng lập trình bất đồng bộ, coroutine, server HTTP/WebSocket... [swoole.co.uk](https://www.swoole.co.uk/)
    * Hyperf: Framework microservice dựa trên Swoole, nhiều component (DI, ORM, RPC...). [hyperf.io](https://hyperf.io/)
    * Revolt PHP: Framework event-loop và lập trình reactive. [revolt.run](https://revolt.run/)
    * Framework X: Xây dựng trên RevoltPHP, đơn giản, hiệu năng cao. [framework-x.org](https://framework-x.org/)
    * Tempest: Framework hiện đại, tập trung vào DX. [tempestphp.com](https://tempestphp.com/)

## 3.2. ORM (Object-Relational Mapping)

* Doctrine: Mạnh mẽ, đầy đủ tính năng, sử dụng pattern Data Mapper. Phổ biến trong hệ sinh thái Symfony. [doctrine-project.org](https://www.doctrine-project.org/)
* Eloquent: Pattern Active Record, tích hợp sẵn trong Laravel, dễ sử dụng.
* Cycle ORM: Data Mapper hiện đại, tập trung vào hiệu năng và quản lý state rõ ràng. Thường dùng với Spiral. [cycle-orm.dev](https://cycle-orm.dev/)
    * `Damn, I've just switched to Cycle ORM from Doctrine thinking I'll be saving a few extra CPU cycles...` (Ghi chú cá nhân)

## 3.3. Template Engines

* Blade: Tích hợp trong Laravel, cú pháp đơn giản, mạnh mẽ.
* Twig: Phổ biến trong Symfony, an toàn, linh hoạt, nhiều tính năng.
* Plates: Template engine gốc PHP, không cần cú pháp đặc biệt.
* Latte: Tập trung vào an toàn (context-aware escaping).
* XHP (Historical): Component hóa HTML trong PHP, nguồn gốc từ Facebook/HHVM. [github.com/hhvm/xhp-lib](https://github.com/hhvm/xhp-lib)

## 3.4. Thư viện hữu ích (Ví dụ)

* HTTP Client: Guzzle, Symfony HTTP Client
* Routing: FastRoute, Symfony Routing
* Dependency Injection Container: PHP-DI, Symfony DI, Laravel Container
* Event Dispatcher: Symfony EventDispatcher, League Event
* Data Handling: Doctrine Collections, Laravel Collections
* Date/Time: Carbon
* Image Manipulation: Intervention Image, Glide
* Testing: [[#4.3. Testing|PHPUnit, Pest, Mockery]]
* Debugging: [[#4.2. Debugging|Symfony VarDumper, Whoops]]
* Security:
    * JWT: `lcobucci/jwt`, [A quick guide to JWTs in PHP](https://akrabat.com/a-quick-guide-to-jwts-in-php)
    * XSS Filtering: `ezyang/htmlpurifier`
* Async/Parallel: `amphp/parallel`, RevoltPHP libraries
* Queue/Worker: Symfony Messenger, Laravel Queues, `kodoku-san/job-queue`
* PDF Generation: `dompdf/dompdf`, `mpdf/mpdf`
* Unique ID Generation: `ramsey/uuid`, `vinkla/hashids` (từ numeric ID)
* Code Highlighting: `tempestphp/highlight`
* Chunk Uploading: `ankitpokhrel/tus-php`
* Kafka Client: `arnaud-lb/php-rdkafka`
* Workflow/Job Builder: `laravel-workflow/laravel-workflow` + `laravel-workflow/waterline` (UI)
* Cachet - Status page system: https://github.com/cachethq/cachet

# 4. Hệ sinh thái - Công cụ & Phát triển

Các công cụ hỗ trợ quá trình viết code, kiểm thử, triển khai và quản lý dự án PHP.

## 4.1. Quản lý gói (Package Management)

* Composer: Công cụ quản lý dependency tiêu chuẩn cho PHP.
    * Packagist: Kho lưu trữ package chính thức ([packagist.org](https://packagist.org/)).
    * Private Repositories:
        * Satis: Tạo repository tĩnh từ `composer.json`. [getcomposer.org/doc/articles/handling-private-packages.md#satis](https://getcomposer.org/doc/articles/handling-private-packages.md#satis)
        * Private Packagist: Dịch vụ trả phí, đầy đủ tính năng. ([packagist.com](https://packagist.com/))
    * Phân tích Dependency: `shipmonk-rnd/composer-dependency-analyser`

## 4.2. Debugging

* Xdebug: Extension mạnh mẽ cho debugging, profiling, code coverage. Tích hợp với IDE.
* Built-in: `var_dump()`, `print_r()`, `error_log()`.
* Libraries: Symfony VarDumper (cung cấp hàm `dump()` và `dd()` đẹp hơn), Whoops (trang lỗi chi tiết).
* PHP Slow Log: Ghi log các script chạy chậm (cấu hình trong `php-fpm.conf`). [[#8.1. Debug với PHP Slow Log|Xem thêm]]
* System Tracing: `strace` (Linux) để theo dõi system calls của process PHP. [[#8.2. Trace lỗi hệ thống với strace|Xem thêm]]
* APM (Application Performance Monitoring): New Relic, Datadog, Tideways.

## 4.3. Testing

* Unit Testing:
    * PHPUnit: Framework testing phổ biến nhất. [phpunit.de](https://phpunit.de/)
    * Pest: Lớp trừu tượng trên PHPUnit, cú pháp đẹp hơn, tập trung vào DX. [pestphp.com](https://pestphp.com/)
* Mocking: Mockery, Prophecy (tích hợp PHPUnit).
* Integration/Functional Testing: Thường dùng PHPUnit hoặc Pest kết hợp với các thư viện HTTP client hoặc browser testing (Symfony Panther, Laravel Dusk).

## 4.4. Static Analysis & Linting

* PHPStan: Tìm lỗi trong code mà không cần chạy. [phpstan.org](https://phpstan.org/)
* Psalm: Tương tự PHPStan, phát triển bởi Vimeo. [psalm.dev](https://psalm.dev/)
* PHP_CodeSniffer: Kiểm tra và sửa lỗi coding style (PSR-1, PSR-12...).

## 4.5. Documentation

* phpDocumentor: Tạo tài liệu từ comment trong code (DocBlocks). [phpdoc.org](https://docs.phpdoc.org/)

## 4.6. Deployment

* Manual: FTP/SFTP, Git push.
* Tools: Deployer (PHP tool), Capistrano (Ruby tool), Envoyer (Laravel service).
* Serverless: Bref (chạy PHP trên AWS Lambda). [bref.sh](https://bref.sh/)

## 4.7. Development Environments

* Local Machine:
    * macOS: Herd, Valet, PHP Monitor ([phpmon.app](https://phpmon.app/)).
    * Windows: Laragon, XAMPP, WAMP.
    * Linux: Cài đặt trực tiếp Nginx/Apache + PHP-FPM.
* [[Docker]]: Tạo môi trường đóng gói, nhất quán.
    * Official PHP Images: [hub.docker.com/_/php](https://hub.docker.com/_/php)
    * Pre-built Stacks: `serversideup/docker-php`, `archielite/docker-php`.
    * [Setup Docker với FrankenPHP](https://www.youtube.com/watch?v=q6FQaaFZVy4)

## 4.8. Code Upgrading

* Rector: Công cụ tự động refactor và nâng cấp code PHP. [getrector.org](https://getrector.org/)

# 5. Chuẩn & Thực hành tốt nhất (Best Practices)

Các quy tắc và khuyến nghị giúp viết code PHP chất lượng, dễ bảo trì và an toàn.

## 5.1. PSR (PHP Standards Recommendations)

Được đề xuất bởi PHP-FIG (Framework Interoperability Group) nhằm chuẩn hóa các khía cạnh của lập trình PHP.
* [Trang chủ PSR](https://www.php-fig.org/psr/)
* Các PSR quan trọng:
    * PSR-1: Basic Coding Standard: Quy tắc cơ bản về file, namespace, class name...
    * PSR-12: Extended Coding Style: Chuẩn style code chi tiết (thay thế PSR-2).
    * PSR-4: Autoloader: Chuẩn về cách tự động nạp class từ file.
    * PSR-3: Logger Interface: Interface chuẩn cho thư viện logging.
    * PSR-7: HTTP Message Interface: Interface chuẩn cho HTTP request/response.
    * PSR-11: Container Interface: Interface chuẩn cho Dependency Injection Container.
    * PSR-15: HTTP Server Request Handlers: Chuẩn về middleware.
    * PSR-16: Simple Cache: Interface chuẩn cho caching đơn giản.
    * PSR-18: HTTP Client: Interface chuẩn cho HTTP client.

## 5.2. Security Best Practices

* Input Validation: Luôn kiểm tra và làm sạch dữ liệu đầu vào từ người dùng (GET, POST, headers...).
* Output Escaping: Chống XSS bằng cách escape dữ liệu trước khi hiển thị trên HTML (dùng `htmlspecialchars` hoặc các hàm tương ứng của template engine).
* Prepared Statements: Chống SQL Injection bằng cách sử dụng prepared statements (PDO, Doctrine DBAL, Eloquent...).
* CSRF Protection: Sử dụng token để ngăn chặn Cross-Site Request Forgery.
* Password Hashing: Sử dụng `password_hash()` và `password_verify()`.
* Dependency Security: Cập nhật thư viện thường xuyên, sử dụng `composer audit`.
* Error Reporting: Tắt hiển thị lỗi chi tiết trên production.

## 5.3. General Principles

* SOLID Principles: Áp dụng các nguyên tắc thiết kế hướng đối tượng.
* DRY (Don't Repeat Yourself): Tránh lặp code.
* KISS (Keep It Simple, Stupid): Giữ cho giải pháp đơn giản nhất có thể.
* Viết code dễ đọc: Đặt tên biến/hàm rõ ràng, comment khi cần thiết.
* Sử dụng Dependency Injection: Giúp code linh hoạt, dễ test.

## 5.4. Nguồn học hỏi

* PHP The Right Way: Tổng hợp các best practice, chuẩn và công cụ. [phptherightway.com](https://phptherightway.com/)

# 6. Các Runtime & Mô hình nâng cao

Các cách tiếp cận khác ngoài mô hình request-response truyền thống của PHP.

## 6.1. Application Servers / Process Managers

* RoadRunner: Server ứng dụng hiệu năng cao viết bằng Go. Nó giữ ứng dụng PHP trong bộ nhớ và giao tiếp qua RPC/pipes, tránh việc bootstrap lại ứng dụng cho mỗi request. Tích hợp tốt với Spiral Framework. [roadrunner.dev](https://roadrunner.dev/)
* Swoole: [[#3.1. Frameworks|Xem mục Frameworks]]. Có thể chạy như một server độc lập.
* FrankenPHP: Module Caddy viết bằng Go, nhúng PHP interpreter. Hỗ trợ worker mode (giống RoadRunner), early hints, HTTP/2, HTTP/3. [frankenphp.dev](https://frankenphp.dev/)

## 6.2. Asynchronous PHP

* Sử dụng event loop và coroutine/promises để xử lý các tác vụ I/O (network, file system) mà không block tiến trình chính.
* Thư viện/Framework: [[#3.1. Frameworks|Swoole, RevoltPHP, AmpHP]].
* Lợi ích: Xử lý được nhiều kết nối đồng thời hơn trên cùng tài nguyên phần cứng, phù hợp cho WebSocket, long-polling, microservices.
* [[Concurrency with PHP and Laravel.pdf]] (Tài liệu tham khảo)

## 6.3. Compiled Extensions (Phalcon/Zephir)

* Phalcon: Framework được viết bằng C và biên dịch thành PHP extension.
    * *Ưu điểm:* Nạp vào RAM một lần, hiệu năng rất cao, ít tốn bộ nhớ.
    * *Nhược điểm:* Cần quyền cài extension trên server, khó debug hơn PHP thuần.
    * [Performance of Phalcon](https://blog.phalcon.io/post/high-load-micro-service)
* Zephir: Ngôn ngữ trung gian (pha trộn C và PHP) dùng để viết PHP extension, được tạo ra bởi đội Phalcon.

## 6.4. Historical: HHVM & HackLang

* HHVM (HipHop Virtual Machine): Runtime PHP/Hack do Facebook phát triển, sử dụng JIT. Từng nhanh hơn PHP Zend Engine đáng kể.
* Hack: Ngôn ngữ dựa trên PHP do Facebook tạo ra, bổ sung static typing, generics...
* Hiện trạng: HHVM không còn tập trung hỗ trợ PHP nữa mà chỉ dành cho Hack. PHP 7+ và đặc biệt là PHP 8+ với JIT đã thu hẹp khoảng cách hiệu năng đáng kể.

## 6.5. Process Control Extensions

* PHP cung cấp các extension để tương tác với process hệ thống (ví dụ: `pcntl`, `posix`).
* [Tài liệu Process Control](https://www.php.net/manual/en/refs.fileprocess.process.php)

# 7. Mẹo & Thủ thuật (Tips & Tricks)

Các kỹ thuật và mẹo hữu ích trong quá trình làm việc với PHP.

## 7.1. Debug với PHP Slow Log

* Mục đích: Tìm ra các script PHP chạy chậm, gây tắc nghẽn hệ thống.
* Cách làm:
    1.  Cấu hình trong `php-fpm.conf` (hoặc file pool tương ứng, ví dụ `www.conf`):

```
request_slowlog_timeout = 5s ; (Ví dụ: log script chạy quá 5 giây)
slowlog = /var/log/php/slow.log ; (Đường dẫn file log)
```

    1.  Khởi động lại PHP-FPM.
    2.  Theo dõi file log để xem stack trace của các script chậm.

## 7.2. Trace lỗi hệ thống với `strace`

* Mục đích: Khi gặp lỗi khó hiểu (502 Bad Gateway, Connection Reset by Peer...) mà log PHP/web server không đủ thông tin, `strace` giúp theo dõi các lời gọi hệ thống (system calls) mà process PHP thực hiện (đọc/ghi file, network, memory...).
* Cách làm (Ví dụ):
    1.  Tìm PID của process PHP-FPM worker đang gặp vấn đề (dùng `ps aux | grep php-fpm`).
    2.  Chạy `strace -p <PID> -o /tmp/php_trace.log -s 1024 -f`
        * `-p <PID>`: Attach vào process có PID cụ thể.
        * `-o <file>`: Ghi output vào file.
        * `-s <size>`: Kích thước chuỗi tối đa hiển thị.
        * `-f`: Theo dõi cả các process con (forked).
    3.  Phân tích file log (thường khá khó đọc) để tìm các lỗi liên quan đến system calls (ví dụ: không thể kết nối socket, lỗi đọc/ghi file...).

## 7.3. Chuyển Array sang CSV

* Sử dụng hàm `fputcsv()` để ghi một mảng vào file theo định dạng CSV một cách an toàn (tự xử lý escaping dấu phẩy, ngoặc kép...).
    ```php
    $list = [
        ['aaa', 'bbb', 'ccc'],
        ['123', '456', '789'],
        ['"aaa"', 'b,bb', 'c"cc'],
    ];

    $fp = fopen('file.csv', 'w');

    foreach ($list as $fields) {
        fputcsv($fp, $fields);
    }

    fclose($fp);
    ```

## 7.4. Hàng đợi ưu tiên (Priority Queue)

* Sử dụng lớp `SplPriorityQueue` từ SPL để quản lý các phần tử theo mức độ ưu tiên. Phần tử có độ ưu tiên cao hơn sẽ được lấy ra trước.
    ```php
    $queue = new SplPriorityQueue();

    $queue->insert('Task A', 1); // Priority 1
    $queue->insert('Task B', 3); // Priority 3
    $queue->insert('Task C', 2); // Priority 2

    // Lấy phần tử theo thứ tự ưu tiên (cao nhất trước)
    while (!$queue->isEmpty()) {
        echo $queue->extract() . "\n"; // Output: Task B, Task C, Task A
    }
    ```

## 7.5. Starter Kit / Boilerplate (Ví dụ)

Một bộ khung tối giản để bắt đầu dự án nhanh:
* Framework/Routing: Slim ([github.com/slimphp/Slim](https://github.com/slimphp/Slim))
* Dependency Injection: PHP-DI ([github.com/PHP-DI/PHP-DI](https://github.com/PHP-DI/PHP-DI))
* ORM/Database: Doctrine DBAL (cho query builder) hoặc Cycle ORM (nếu cần ORM đầy đủ)
* Testing: PHPUnit ([github.com/sebastianbergmann/phpunit](https://github.com/sebastianbergmann/phpunit))
* Template Engine: Plates hoặc Twig
* Resources: [Bắt đầu với Slim 4](https://viblo.asia/p/bat-dau-voi-framework-slim-4-part-1-E375z6xb5GW)

# 8. Tài nguyên tham khảo (Resources)

Các liên kết hữu ích khác.

## 8.1. Chính thức

* PHP Documentation: [php.net/manual/en/](https://www.php.net/manual/en/)
* PHP-FIG (PSRs): [php-fig.org/psr/](https://www.php-fig.org/psr/)

## 8.2. Học tập & Cộng đồng

* PHP The Right Way: [phptherightway.com](https://phptherightway.com/)
* PHP Watch: [php.watch](https://php.watch/) (Tin tức, bài viết chuyên sâu)
* Viblo (Tiếng Việt): [viblo.asia](https://viblo.asia/)
* VOZ PHP Forum (Tiếng Việt): [voz.vn/t/php-hoi-nhom-php.742392](https://voz.vn/t/php-hoi-nhom-php.742392)
* Laracasts: [laracasts.com](https://laracasts.com/) (Tập trung vào Laravel nhưng có nhiều kiến thức PHP chung)

## 8.3. Bài viết / Chủ đề cụ thể

* Build Your Own Service Container: [Ryan Chandler](https://ryangjchandler.co.uk/posts/build-your-own-container-in-php)
* JWT Guide: [akrabat.com](https://akrabat.com/a-quick-guide-to-jwts-in-php)
* Concurrency PDF: [[Concurrency with PHP and Laravel.pdf]]

## 8.4. Các giải pháp dựng sẵn (CMS/CRM/POS...)

* Ecommerce CMS: EC-CUBE ([github.com/EC-CUBE/ec-cube](https://github.com/EC-CUBE/ec-cube))
* Admin Panel: OpenAdmin ([github.com/open-admin-org/open-admin](https://github.com/open-admin-org/open-admin))
* POS: Stock Manager Advance ([codecanyon.net](https://codecanyon.net/item/stock-manager-advance-with-all-modules/23045302))
* Personal CRM: MonicaHQ ([github.com/monicahq/monica](https://github.com/monicahq/monica))
