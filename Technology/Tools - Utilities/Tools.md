---
tags:
  - area/technology
  - domain/tools
  - type/resource
  - lang/vi
---

- Quản lý tài chính cá nhân - Maybe finance: https://github.com/maybe-finance/maybe
- Quản lý task: https://github.com/mattermost-community/focalboard
- **xpipe**: Cho phép truy cập toàn bộ hạ tầng máy chủ từ máy tính cá nhân - https://github.com/xpipe-io/xpipe #server #infrastructure
- **Kilocode**: Công cụ phát triển phần mềm mã nguồn mở, hỗ trợ lập trình viên trong việc viết mã hiệu quả và chất lượng - [GitHub](https://github.com/Kilo-Org/kilocode) #development #tool
- **Bitchat**: Ứng dụng nhắn tin Bluetooth riêng tư, không cần kết nối internet, cho phép người dùng giao tiếp thông qua các thiết bị Bluetooth gần đó - [GitHub](https://github.com/permissionlesstech/bitchat) #messaging #bluetooth #privacy

## Android Tools

- **Magisk**: Công cụ root mã nguồn mở cho Android, cho phép người dùng tùy chỉnh và kiểm soát thiết bị của mình mà không làm thay đổi phân vùng hệ thống. Magisk cung cấp các mô-đun để mở rộng chức năng và duy trì tính toàn vẹn của hệ thống - [GitHub](https://github.com/topjohnwu/Magisk) #Android #root #customization

## Graphics & Visualization Tools

- **DeTikZify**: Công cụ tổng hợp chương trình đồ họa cho các hình vẽ và phác thảo khoa học sử dụng TikZ. Giúp tự động hóa việc tạo các hình vẽ khoa học từ mô tả văn bản - [GitHub](https://github.com/potamides/DeTikZify) #TikZ #graphics #scientific-drawing
- **Chandra**: Công cụ xử lý và trực quan hóa dữ liệu - [GitHub](https://github.com/datalab-to/chandra) #data-visualization #data-processing

## Development Tools

- **rig**: Công cụ giúp tạo ra các môi trường ảo cho việc phát triển phần mềm, cho phép quản lý và triển khai các ứng dụng một cách linh hoạt và hiệu quả - [GitHub](https://github.com/0xPlaygrounds/rig) #development #virtual-environments
- **repomix**: Công cụ giúp kết hợp và quản lý nhiều kho lưu trữ GitHub, cho phép người dùng theo dõi và đồng bộ hóa các thay đổi một cách hiệu quả - [GitHub](https://github.com/yamadashy/repomix) #git #repository #management
- **vibe-kanban**: Bảng Kanban quản lý các tác vụ của các agent lập trình AI, cho phép chạy nhiều agent song song và thực hiện code review hiệu quả
  - Chạy song song các agent lập trình AI như Claude Code, Gemini CLI, Codex, Amp mà không gặp xung đột
  - Cung cấp giao diện Kanban trực quan để theo dõi tiến độ của các agent
  - Tích hợp với GitHub để tạo pull request trực tiếp từ các tác vụ
  - Cài đặt và chạy nhanh chóng thông qua lệnh `npx vibe-kanban`
  - [GitHub](https://github.com/BloopAI/vibe-kanban) #ai #kanban #code-review #development #agents

## Webhook & Event Infrastructure

### Outpost (Hookdeck)

> https://hookdeck.com/blog/outpost-open-source-webhooks-event-destinations-infrastructure?ref=dailydev

- Hạ tầng webhook mã nguồn mở, tự lưu trữ (self-hosted) cho webhook đầu ra và điểm đến sự kiện
- Cho phép các nền tảng SaaS và API gửi sự kiện đến các đích do khách hàng định nghĩa
- Được xây dựng bởi Hookdeck, viết bằng Go
- Phân phối dưới giấy phép Apache 2.0
- Tính năng:
  - Đảm bảo giao hàng ít nhất một lần (at-least-once delivery)
  - Hỗ trợ đa tenant (multi-tenant)
  - API RESTful
  - SDKs cho Go, TypeScript và Python
  - Cổng thông tin cho nhà phát triển để xem nhật ký giao hàng, quản lý điểm cuối, xoay vòng thông tin xác thực và phát lại sự kiện
  - Tích hợp với OpenTelemetry để hỗ trợ theo dõi, đo lường và ghi nhật ký tiêu chuẩn hóa
  - Xử lý lỗi giao hàng bằng cách kích hoạt thông báo và tự động vô hiệu hóa điểm đến khi cần thiết
- Hỗ trợ các đích sự kiện:
  - Webhooks
  - Hookdeck Event Gateway
  - AWS SQS
  - RabbitMQ
  - GCP Pub/Sub
  - Amazon EventBridge
  - Kafka
- Tương thích ngược 100% với các triển khai webhook hiện có
- Tối ưu hóa cho hiệu suất cao và chi phí thấp
- Có thể triển khai trên nhiều môi trường khác nhau như Docker hoặc Kubernetes
- Tự host và phân phối, không cần phụ thuộc vào dịch vụ bên thứ ba

## No-code / Low-code Platforms

- **Lovable.dev**: Nền tảng xây dựng ứng dụng và trang web bằng AI, không cần mã hóa. Cho phép tạo ứng dụng web và mobile thông qua giao diện trực quan với sự hỗ trợ của AI - [Website](https://lovable.dev/) #nocode #ai #platform
- **Rork**: Nền tảng cho phép tạo ứng dụng di động bằng AI trong vài phút - [Website](https://rork.com/) #nocode #mobile #ai #app-builder

## Media Download Tools

- **Cobalt.tools**: Công cụ tải xuống media (audio/video) từ nhiều nền tảng trực tuyến
  - Hỗ trợ tải xuống từ nhiều dịch vụ khác nhau
  - Tính năng tự động tắt âm thanh và khả năng dán và tải xuống nội dung
  - Giao diện web đơn giản, yêu cầu JavaScript để hoạt động
  - Website: https://cobalt.tools/ #media-download #audio #video

## Graphics & Design Tools

### Stitch by Google

- **Stitch**: Công cụ thiết kế sử dụng AI do Google phát triển, hỗ trợ tạo ra các thiết kế sáng tạo và hiệu quả
  - Sử dụng AI để tự động hóa quá trình thiết kế
  - Giúp tạo ra các thiết kế một cách nhanh chóng và hiệu quả
  - Website: https://stitch.withgoogle.com/ #design #AI #Google

### SVGL

> https://github.com/pheralb/svgl

- Thư viện chứa các logo SVG đẹp mắt, được xây dựng bằng Sveltekit và Tailwind CSS
- Cung cấp bộ sưu tập logo SVG đa dạng, tối ưu hóa cho web
- Công nghệ sử dụng:
  - Sveltekit và Svelte 5 cho phát triển web hiệu quả
  - TypeScript cho type safety
  - Tailwind CSS cho styling
  - Content-Collections để quản lý dữ liệu type-safe
  - Shiki cho syntax highlighting
- Hỗ trợ nhiều định dạng logo:
  - Logo đơn giản
  - Logo kèm wordmark
  - Logo hỗ trợ light & dark mode
  - Logo đầy đủ với tất cả properties
- Yêu cầu khi đóng góp:
  - Đảm bảo có quyền sử dụng logo trước khi thêm vào thư viện
  - Tối ưu hóa SVG cho web, giữ lại thuộc tính `viewBox`
  - Kích thước mỗi file SVG không vượt quá 21KB
- Website: https://svgl.app
- GitHub: https://github.com/pheralb/svgl

## Virtualization & Infrastructure Tools

### OSX-PROXMOX

- **Tổng quan**: Hướng dẫn và công cụ để cài đặt macOS trên bất kỳ máy tính nào thông qua Proxmox
- **Tính năng**:
  - Hướng dẫn chi tiết cài đặt macOS trên Proxmox
  - Hỗ trợ virtualizing macOS trên các nền tảng không phải Apple hardware
  - Tối ưu hóa cho việc chạy macOS trong môi trường ảo hóa
- **Use cases**:
  - Phát triển ứng dụng macOS trên hardware không phải Apple
  - Testing và development môi trường macOS
  - Tạo macOS virtual machines cho mục đích học tập và phát triển
- **GitHub**: https://github.com/0xSojalSec/OSX-PROXMOX #macOS #Proxmox #virtualization

## Networking Tools

### tunnelto

- **Tổng quan**: Công cụ cho phép bạn phơi bày máy chủ web cục bộ của mình ra internet thông qua một URL công khai
- **Tính năng**:
  - Dễ dàng thiết lập và sử dụng
  - Hỗ trợ nhiều giao thức và cổng
  - Bảo mật với mã hóa end-to-end
  - Không cần cấu hình phức tạp
- **Use cases**:
  - Thử nghiệm và demo ứng dụng local
  - Truy cập từ xa vào các ứng dụng đang phát triển
  - Testing webhooks và integrations
  - Chia sẻ ứng dụng local với team hoặc client
- **GitHub**: https://github.com/agrinman/tunnelto #tunnel #networking #development
- **Website**: https://tunnelto.dev

## Desktop Environments

### Fynedesk

- **Tổng quan**: Môi trường desktop đầy đủ cho Linux/Unix được xây dựng bằng Fyne
- **Tính năng**:
  - Giao diện người dùng hiện đại và linh hoạt
  - Hỗ trợ quản lý cửa sổ và ứng dụng
  - Xây dựng trên thư viện Fyne
- **Use cases**: Desktop environment cho Linux/Unix, thay thế các desktop environment truyền thống
- **GitHub**: https://github.com/FyshOS/fynedesk #desktop #Linux #Fyne #GUI

## Secrets Management Tools

### Shelve.cloud

- **Tổng quan**: Nền tảng quản lý bí mật (secrets management) tập trung và bảo mật, mã nguồn mở và miễn phí sử dụng, hỗ trợ tự host
- **Tính năng chính**:
  - Quản lý API keys, tokens và biến môi trường
  - Phát hiện sự không nhất quán giữa các môi trường, ngăn chặn lỗi runtime do thiếu biến
  - Quản lý nhóm với vai trò rõ ràng (Owner, Admin, Member)
  - Tích hợp GitHub: đồng bộ hóa bí mật cho GitHub Actions, đồng bộ với repository, tự động hóa CI/CD
  - Giao diện lệnh với Command center (Cmd+K/Ctrl+K) để tìm kiếm, điều hướng và thực hiện hành động nhanh chóng
  - CLI để quản lý secrets và tích hợp vào workflow phát triển
- **Bảo mật**: Mã hóa bằng AES-256, kiểm tra bởi cộng đồng (open source)
- **Lợi ích**: Tập trung hóa quản lý secrets, giảm lỗi runtime do thiếu biến môi trường, tăng năng suất với CLI và command center, miễn phí và mã nguồn mở, linh hoạt với khả năng tự host
- Website: https://shelve.cloud/ #secrets-management #devops #CI/CD

## Debugging và Profiling Tools

### Valgrind

- **Tổng quan**: Framework phân tích động cung cấp nhiều công cụ để phát hiện lỗi quản lý bộ nhớ, lỗi luồng, và phân tích hiệu suất chương trình
- **Website**: https://valgrind.org
- **Nền tảng hỗ trợ**:
  - X86/Linux, AMD64/Linux
  - ARM32/Linux, ARM64/Linux
  - ARM/Android
  - Nhiều nền tảng khác
- **Các công cụ chính**:
  - **Memcheck**: Phát hiện lỗi quản lý bộ nhớ (memory leaks, use-after-free, uninitialized memory access, buffer overflows)
  - **Helgrind**: Phát hiện lỗi luồng (race conditions, deadlocks, data races trong multi-threaded programs)
  - **Cachegrind**: Profiler bộ nhớ cache và dự đoán nhánh, giúp tối ưu hóa hiệu suất
  - **Callgrind**: Profiler chi tiết hơn Cachegrind, cung cấp thông tin về call graph
  - **Massif**: Heap profiler, theo dõi việc sử dụng heap memory theo thời gian
  - **DHAT**: Heap profiler khác, tập trung vào việc phát hiện memory leaks và inefficient memory usage
- **Cách sử dụng**:
  - Chạy chương trình với Valgrind: `valgrind --tool=<tool_name> <program>`
  - Ví dụ với Memcheck: `valgrind --tool=memcheck --leak-check=full ./my_program`
  - Ví dụ với Helgrind: `valgrind --tool=helgrind ./my_program`
- **Lưu ý**:
  - Valgrind chạy chương trình trong một virtual machine, làm chậm đáng kể (10-50x)
  - Chủ yếu dùng cho debugging và profiling, không phù hợp cho production
  - Hữu ích cho việc phát hiện memory leaks, race conditions, và tối ưu hóa hiệu suất
