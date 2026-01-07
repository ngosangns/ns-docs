---
tags:
  - area/technology
  - domain/frontend
  - topic/angular
  - type/resource
  - lang/vi
---

# Angular

## Resources

- Change detection trong Angular
- Understand Angular detection
- Dynamic Module (NestJS concepts)

### Blogs & Articles

- [Angular.love](https://angular.love/)
- [Cory Rylan - Angular Developer Expert](https://coryrylan.com/)

## Change Detection

### Khái niệm

- Cơ chế theo dõi và đồng bộ hóa giao diện với model khi có sự thay đổi
- Được kích hoạt bởi:
  - Sự kiện DOM (click, hover, ...)
  - Yêu cầu AJAX
  - Timers (setTimeout(), setInterval())

### View và Component

- Mỗi component liên kết với một view
- Angular tổ chức ứng dụng dưới dạng cây views
- Mỗi view có thể chứa các views con

### Trạng thái của View

- **FirstCheck**: Lần kiểm tra đầu tiên
- **ChecksEnabled**: Cho phép kiểm tra
- **Errored**: Lỗi
- **Destroyed**: Đã bị hủy
- Change Detection bị bỏ qua nếu:
  - `ChecksEnabled` là `false`
  - View ở trạng thái `Errored` hoặc `Destroyed`

### ViewRef và ChangeDetectorRef

- `ViewRef`: Mô tả một view, có phương thức `detectChanges()`
- `ChangeDetectorRef`: Cho phép kiểm soát quá trình Change Detection trong component

### Quy trình Change Detection

1. Gán `ViewState.firstCheck` phù hợp
2. Kiểm tra và cập nhật thuộc tính input của child component/directive
3. Cập nhật trạng thái thay đổi của child view
4. Thực hiện Change Detection trên các embedded view
5. Gọi lifecycle hook `OnChanges` nếu bindings thay đổi
6. Gọi `OnInit` và `ngDoCheck` trên child component
7. Cập nhật danh sách truy vấn `ContentChildren`
8. Gọi lifecycle hooks `AfterContentInit` và `AfterContentChecked`
9. Cập nhật DOM interpolations nếu thuộc tính thay đổi
10. Thực hiện Change Detection trên child view
11. Cập nhật danh sách truy vấn `ViewChildren`
12. Gọi lifecycle hooks `AfterViewInit` và `AfterViewChecked`

### Tối ưu hiệu suất

- Sử dụng `ChangeDetectionStrategy.OnPush` để chỉ thực hiện Change Detection khi có sự thay đổi rõ ràng về dữ liệu đầu vào (`@Input`)

### Nguồn tham khảo

- [Tìm hiểu về Change Detection trong Angular - Viblo](https://viblo.asia/p/tim-hieu-ve-change-detection-trong-angular-djeZ18EjKWz)
- [Angular Change Detection - Daniel Wiehl](https://danielwiehl.github.io/edu-angular-change-detection/)

## Libraries

- **rx-angular**: Reactive Extensions for Angular
- **Web APIs for Angular**: ng-web-apis
- **i18n**: angular-i18next
- **Awesome Angular**: Curated list of Angular resources

## State Management

- **Signals**
- **RxJS**
- **ngrx**: Redux style
- **rx-angular**

## Tools

- **HMR**: Hot Module Replacement (`@angularclass/hmr`)

## Design Components

- **fundamental-ngx**: SAP design components
