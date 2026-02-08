---
tags:
  - area/technology
  - domain/testing
  - type/resource
  - lang/vi
---

# 1. Resources

- Tự động thực hiện các hành động trên website: https://www.automa.site
- All things about unit test with Jest: https://viblo.asia/s/all-things-about-unit-test-with-jest-38X4E30XLN2

# 2. Các định nghĩa

- Acceptance Test được thực hiện để đảm bảo rằng phần mềm đã được phát triển đáp ứng các yêu cầu của khách hàng và có thể được chấp nhận sử dụng. AT thường được thực hiện bởi khách hàng hoặc người sử dụng cuối cùng.
- Functional Test được thực hiện để kiểm tra tính năng của phần mềm và đảm bảo rằng nó hoạt động đúng theo thiết kế và các yêu cầu kỹ thuật. FT thường được thực hiện bởi nhóm kiểm thử hoặc nhà phát triển phần mềm. Cả hai loại kiểm thử này đều quan trọng để đảm bảo chất lượng phần mềm và đáp ứng các yêu cầu của khách hàng.

---

Thông thường sẽ có ít nhất 3 Layers testing, 1 là Unit Test, 2 UI test, 3 là Integration Test.

![[7a8b9c0d-1e2f-3a4b-5c6d-7e8f9a0b1c2d.png]]

- Kịch bản test Behavior-Driven Development (BDD): Kịch bản BDD dựa trên cú pháp gồm 3 từ khóa chính đó là Given - when - then, từ đó chúng ta có thể tạo unit test dựa trên BDD ⇒ code dựa vào unit test. Ví dụ:

```jsx
Scenario: vay trả trong vòng 1 tháng
Given: ngày đi vay 23/09/2019
When: tôi muốn vay 10 triệu trong 1 tháng
Then: tôi mong đợi khoản vay sẽ được tạo với thông tin sau
| Payment date | Amount |
| 23/10/2019 | 10.000.000 VND |

Scenario: Tạo khoản vay 10 triệu đồng trong vòng 12 tháng
Given: ngày đi vay 23/09/2019
When: tôi muốn vay 10 triệu trong 12 tháng
Then: tôi mong đợi khoản vay sẽ được tạo với thông tin sau
| 23/10/2019 | 833.000 VND |
| 23/11/2019 | 833.000 VND |
.....
| 23/09/2020 | 837.000 VND |
```

# 3. Sharing "uống lộn thuốc" ở các hệ thống mình gặp

Tác giả: Viet Tran

Các ae SE mới thì hay bị mắc lỗi phân biệt Perf/Load/Stress test, bên cạnh đó là các chỉ số CCU, TPS, RPS, Read/Write,... dẫn đến các hiểu lầm và UỐNG LỘN THUỐC. Mà trong thời gian mình đi làm SA và Advisor thì chủ yếu là từ "lộn thuốc" mà mới không cứu được.

Thôi thì trước tiên mình nói cơ bản về cái Perf/Load/Stress Test đi:

Lý thuyết là: Load và Stress Test là subset (tập con) của Perf Test.

Thực tế là có khác nhau... một xíu. Mỗi loại có "thuốc" khác nhau dù cùng chung mục đích tăng tải hệ thống. Nhưng "uống lộn thuốc" tốn tiền và tiền cứu chữa còn đắt hơn ban đầu gấp nhiều lần.

Đây là 3 giai đoạn thường có khi nghĩ tới "đo tải": (thực ra à còn nhiều, mình sẽ để tấm hình lên đính kèm)

- Đo performance hệ thống khi không có tải (thậm chí là vol data thấp tới trung bình). VD rule là API Request/Aggregation phải phản hồi dưới 30ms không tính network. Pass cái này mới được tính là pass performance. Không pass thì khỏi đo tiếp Load/Stress, đi tối ưu lại sao cho pass cái đã, thường là mắc lỗi thuật toán tệ hoặc IO không đúng.

- Đo load: là đo ngưỡng tải tối đa của hệ thống, hay còn gọi là đo năng lực (capacity) hệ thống. Lỗi thường mắc là các ae hay đẩy tải quá to lúc đầu, mình hay gọi vui là "hãm hiếp" hệ thống. Thật ra là đẩy tải từ thấp lên cao và xem biểu hiện hệ thống cho tới khi xuất hiện các request bị dropped. Cái này chủ yếu là SE/SA luôn phải nắm được ngưỡng tải tối đa (peak) trước khi hệ thống vận hành thực tế cũng như có match yêu cầu ko. VD: 50k TPS khi team marketing chạy chiến dịch push sale lễ.

Cuối cùng mới là stress test, là check mấy cái fault tolerant, overload, resilient đồ các kiểu... Tức là để ít nhất biết được là những triệu chứng hoặc các vấn đề ở ngưỡng tải vượt mức như thế hệ thống sẽ như thế nào để từ đó chuẩn bị cho các chiến lược tối ưu, thay đổi về sau. Hoặc thậm chí có đạt cái yêu cầu tối thiểu hay không. Stress Test thường là mình phải đi làm ngược lại; limit resource hệ thống để nhanh chóng có được kết quả. Tại vì deploy stress test lớn rất tốn kém chứ không phải dễ.

Cuối cùng nhưng không kém phần quan trọng: không được bỏ qua đo tải thuần (không có cache). Mấy bạn hay quen tay làm luôn cache rồi đi đo nên gãy ở lúc invalidate cache nha. Lưu ý là nên tối ưu khi không cache thiệt là tốt rồi mới cache.

Cái loại thuốc mà hay bị mua về uống nhất tên là "Microservices" cho mọi tình huống. Top2 là thuốc "cache loạn cào cào", chỗ nào chậm ư, cứ đắp cache vô. Thần dược, dễ làm dễ trúng thưởng!! Chúc mừng, bạn đã quay vào ô "GO TO THE HELL", phần thưởng của bạn là một mớ hỗn loạn không biết phải fix từ đâu.

Mấy cái này là một phần mình chia sẻ trong lớp SA & Design System á!!! Mà lớp SA này full rồi nên không có quảng cáo đâu.

Giờ mới là quảng cáo nè! Lớp Golang thứ 11 (GO11) mình đang tuyển sinh á, nên ae muốn vô nghe và code Go thì cũng được.

Nói chứ ae đăng kí đi chứ team dí KPI mình quá hà huhu!!!!

# 4. Một số loại test

## 4.1. Functional Test (Kiểm thử chức năng)

Định nghĩa:  
Functional test là loại kiểm thử tập trung vào việc xác minh các chức năng của hệ thống phần mềm hoạt động đúng theo yêu cầu hoặc tài liệu đặc tả.

Các loại functional test phổ biến:

- Unit Test: Kiểm thử từng đơn vị nhỏ nhất của mã nguồn (hàm, lớp, module). Mục tiêu: đảm bảo logic từng phần nhỏ hoạt động đúng cách.
- Integration Test: Kiểm thử sự tương tác giữa các module, các thành phần khác nhau trong hệ thống. Mục tiêu: phát hiện lỗi khi các thành phần tích hợp với nhau.
- System Test: Kiểm thử toàn bộ hệ thống như một khối hoàn chỉnh.
- User Acceptance Test (UAT): Do người dùng thực hiện để xác nhận rằng phần mềm đáp ứng yêu cầu của họ.

> ✅ Tóm lại: Functional test kiểm tra cái gì hệ thống làm (what the system does).

## 4.2. Non-Functional Test (Kiểm thử phi chức năng)

Định nghĩa:  
Non-functional test là loại kiểm thử không tập trung vào chức năng cụ thể, mà nhằm đánh giá chất lượng hệ thống trong các điều kiện khác nhau như hiệu năng, bảo mật, khả năng chịu lỗi, độ tin cậy, khả năng mở rộng,…

Một số dạng non-functional test tiêu biểu:

| Loại kiểm thử           | Mô tả                                                                                                                 |
| ----------------------- | --------------------------------------------------------------------------------------------------------------------- |
| Performance Testing     | Kiểm tra hiệu suất hệ thống (tốc độ xử lý, thời gian phản hồi, thông lượng). Gồm: Load Test, Stress Test, Spike Test. |
| Security Testing        | Đánh giá mức độ an toàn của hệ thống (lỗ hổng, xác thực, phân quyền, bảo vệ dữ liệu).                                 |
| Reliability Testing     | Kiểm tra khả năng hoạt động ổn định của hệ thống trong thời gian dài.                                                 |
| Efficiency Testing      | Đánh giá mức độ sử dụng tài nguyên của hệ thống (CPU, RAM, băng thông...).                                            |
| Usability Testing       | Đánh giá tính dễ sử dụng, trải nghiệm người dùng.                                                                     |
| Scalability Testing     | Kiểm tra khả năng mở rộng khi số lượng người dùng/tải tăng lên.                                                       |
| Maintainability Testing | Kiểm tra mức độ dễ dàng trong việc bảo trì, cập nhật hệ thống.                                                        |
| Compatibility Testing   | Đảm bảo hệ thống hoạt động tốt trên nhiều môi trường: OS, trình duyệt, thiết bị…                                      |

> ✅ Tóm lại: Non-functional test kiểm tra hệ thống hoạt động như thế nào (how the system performs).

## 4.3. Tóm tắt so sánh nhanh Functional vs Non-Functional Test

| Tiêu chí               | Functional Test                  | Non-Functional Test                           |
| ---------------------- | -------------------------------- | --------------------------------------------- |
| Mục tiêu chính         | Kiểm tra chức năng cụ thể        | Đánh giá chất lượng hệ thống tổng thể         |
| Dựa trên               | Yêu cầu chức năng                | Yêu cầu phi chức năng (performance, bảo mật…) |
| Loại kiểm thử phổ biến | Unit, Integration, System, UAT   | Performance, Security, Reliability, etc.      |
| Câu hỏi đặt ra         | "Phần mềm có làm điều đó không?" | "Phần mềm làm điều đó như thế nào?"           |

## 4.4. Architecture Testing

Kiểm thử kiến trúc (Architecture Testing) là quá trình đánh giá xem thiết kế kiến trúc của hệ thống có được hiện thực đúng như mong đợi hay không, cũng như đảm bảo các thành phần của hệ thống và cách chúng tương tác tuân theo những nguyên tắc, quy tắc và ràng buộc đã đặt ra trong giai đoạn thiết kế.

Ta có thể dùng architecture testing để kiểm tra ở build time thay vì runtime.

### 4.4.1. Mục đích và Lợi ích

1. Đảm bảo tính tuân thủ kiến trúc (Architecture Conformance)
   - Xác minh xem mã nguồn (code) có tuân thủ các quy tắc kiến trúc đã đề xuất (VD: mô hình nhiều lớp, microservices, hướng dịch vụ, v.v.) hay không.
   - Phát hiện sớm các vi phạm cấu trúc (ví dụ: một lớp ở tầng “Business” không được phép truy cập trực tiếp sang tầng “Data” mà không qua tầng “Service”).
2. Duy trì khả năng mở rộng và bảo trì
   - Nếu các thành phần được tổ chức, phân tách một cách hợp lý (theo đúng kiến trúc), việc mở rộng hay thay đổi tính năng ít nguy cơ tạo ra “nợ kỹ thuật” (technical debt).
   - Hạn chế xuất hiện các phụ thuộc vòng (circular dependency) gây khó hiểu hoặc lỗi không mong muốn trong quá trình phát triển.
3. Tối ưu hiệu năng và bảo mật
   - Các nguyên tắc kiến trúc liên quan đến bảo mật (ví dụ: phân chia quyền hạn giữa các module, hạn chế truy cập trực tiếp cơ sở dữ liệu, sử dụng token/bearer cho microservice, v.v.) được xác thực xem có thực thi đúng không.
   - Kiểm soát và tối ưu luồng dữ liệu, tránh tắc nghẽn hoặc phân luồng (throughput) kém.
4. Giảm thiểu rủi ro sụp đổ hệ thống
   - Việc tuân thủ đúng kiến trúc có thể ngăn ngừa những lỗi nghiêm trọng xảy ra khi thành phần này không được thiết kế để tương tác trực tiếp với thành phần khác.
   - Giúp việc chuẩn đoán và khắc phục sự cố hiệu quả hơn (dễ dàng “khoanh vùng” vấn đề ở lớp/ tầng nào).

### 4.4.2. Quy trình Architecture Testing

Dưới đây là một quy trình tham khảo (có thể điều chỉnh tùy từng công ty/ dự án):

1. Xác định hoặc cập nhật mô tả kiến trúc
   - Đội ngũ kiến trúc sư (architects) và nhóm phát triển thống nhất về mô hình kiến trúc tổng thể (layered architecture, microservices, event-driven, hexagonal, v.v.) và thiết kế chi tiết (các module, thành phần, dịch vụ).
   - Tài liệu kiến trúc (hoặc “architecture blueprint”) nêu rõ các quy tắc, ràng buộc, mô hình giao tiếp (REST, message queue, v.v.), cùng tiêu chí đánh giá.
2. Lựa chọn công cụ và thiết lập kiểm thử
   - Sử dụng static analysis tools hoặc architecture conformance tools (VD: SonarQube, ArchUnit, v.v.) để quét và phân tích quan hệ phụ thuộc (dependency) giữa các lớp/ gói (packages).
   - Định nghĩa các tập luật (rule sets) về “ai có thể gọi ai” (VD: một module service không được phép gọi trực tiếp vào module controller).
3. Thiết kế kịch bản kiểm thử kiến trúc
   - Các kịch bản kiểm tra những điểm quan trọng, ví dụ:
     - “Module A không được phép truy cập trực tiếp Module B.”
     - “Tầng Service không được phép truy cập vào tầng DAO/Data Access nếu đi sai quy trình.”
   - Kiểm tra các mối liên kết (coupling) có hợp lý không; các module có bị trùng lặp chức năng (redundancy) không.
4. Thực hiện kiểm thử
   - Phân tích tĩnh (Static Analysis): Chạy các công cụ để dò quét cấu trúc mã nguồn, xây dựng biểu đồ phụ thuộc và so sánh với mô hình kiến trúc dự kiến.
   - Phân tích động (Dynamic Analysis) (nếu cần): Quan sát luồng thực thi và ghi lại thông tin tương tác runtime (VD: các cuộc gọi giữa microservices).
5. Đánh giá kết quả và Báo cáo
   - Tổng hợp các vi phạm kiến trúc (nếu có), phân loại theo mức độ nghiêm trọng (Critical, Major, Minor).
   - Đưa ra hành động sửa chữa: tái cấu trúc (refactoring), tách module, hạn chế thêm dependency không mong muốn.
6. Duy trì liên tục
   - Tích hợp kiểm thử kiến trúc vào quy trình CI/CD (Continuous Integration/Continuous Delivery).
   - Mỗi khi có pull request hoặc build, tự động chạy kiểm thử kiến trúc để đảm bảo không “tiêm” thêm vi phạm mới.

### 4.4.3. Các Tiêu Chí và Chỉ Số Đánh Giá

1. **Coupling** (liên kết) và **Cohesion** (độ gắn kết nội bộ)
   - Mục tiêu là hạn chế coupling giữa các thành phần khác nhau để dễ bảo trì; đồng thời đảm bảo mỗi thành phần có chức năng rõ ràng (cohesion cao).
2. **Cyclomatic Complexity** (độ phức tạp vòng lặp)
   - Mặc dù thường sử dụng trong phân tích mã (code), việc giảm độ phức tạp ở từng module cũng liên quan đến việc tổ chức kiến trúc tốt. Nếu một module quá phức tạp, có thể vi phạm nguyên tắc “Single Responsibility.”
3. **Số lượng (và cấp độ) các quan hệ phụ thuộc**
   - Bao nhiêu lớp trong tầng Business phụ thuộc vào tầng Data?
   - Có bất kỳ phụ thuộc vòng (circular dependency) nào không?
4. **Thống kê vi phạm & Xu hướng (Trend)**
   - Thường xuyên theo dõi “bao nhiêu vi phạm kiến trúc đã được phát hiện” qua các lần kiểm thử liên tiếp.
   - Nếu vi phạm liên tục tăng, cần xem lại quy trình code review hoặc cần đào tạo thêm về áp dụng kiến trúc.

### 4.4.4. Ví dụ Tình Huống (Use Case)

- **Kiến trúc Microservices**:
  - Mỗi service phụ trách một domain (bounded context) riêng.
  - Kiểm thử kiến trúc đảm bảo:
    - Service A không “xuyên” vào database của Service B.
    - Service A chỉ có thể giao tiếp với Service B qua REST API hoặc Message Queue.
    - Phân quyền (security) đúng theo thiết kế: Service B không chấp nhận request trực tiếp nếu không có token hợp lệ từ Service A.
- **Kiến trúc Layered (tầng)**:
  - Tầng “Controller” (trình bày) chỉ gọi sang “Service”.
  - “Service” gọi “Repository/DAO” để truy xuất dữ liệu.
  - Kiểm thử kiến trúc sẽ quét code để tìm xem có trường hợp “Controller” gọi thẳng “Repository” không; nếu có, đó là vi phạm cần khắc phục.

### 4.4.5. Tích hợp với Quy Trình Phát Triển

- **Giai đoạn Thiết kế ban đầu**:
  - Nhà phát triển cùng kiến trúc sư thống nhất mô hình, vạch ra “luật” (rules) hoặc best practices phải tuân theo.
- **Giai đoạn Code & Review**:
  - Mỗi developer tuân thủ hướng dẫn, kèm theo đó là review chéo (peer review).
  - Sử dụng các công cụ phân tích để phát hiện sớm sai sót.
- **Giai đoạn Tích hợp (CI/CD)**:
  - Mỗi lần code push lên repo, công cụ tự động chạy kiểm thử kiến trúc, thông báo vi phạm (nếu có) qua pipeline.
- **Giai đoạn Bảo trì**:
  - Khi hệ thống liên tục mở rộng, thường xuyên phải refactor. Kiểm thử kiến trúc đảm bảo ta không “phá vỡ” cấu trúc gốc hoặc tạo thêm “nợ kỹ thuật.”

### 4.4.6. Thách thức và Giải pháp

1. **Chi phí ban đầu cao**
   - Thiết lập các rule kiến trúc và tích hợp công cụ phân tích có thể đòi hỏi thời gian, nhưng đây là đầu tư dài hạn.
   - Nên bắt đầu với một tập luật tối thiểu, sau đó mở rộng dần.
2. **Khó thuyết phục đội ngũ phát triển**
   - Developer có thể thấy việc kiểm thử kiến trúc làm chậm tiến độ.
   - Cần truyền thông về lợi ích lâu dài: giảm lỗi nghiêm trọng, nâng cao chất lượng, giảm thời gian sửa chữa về sau.
3. **Kiến trúc thay đổi liên tục**
   - Trong các dự án Agile, kiến trúc có thể liên tục tiến hoá.
   - Cần cập nhật tài liệu kiến trúc và luật kiểm thử kịp thời để không cản trở quá trình phát triển.
4. **Khó khăn trong việc tùy biến công cụ**
   - Mỗi dự án có thể có những “lối mòn” riêng cần kiểm tra.
   - Cần lựa chọn công cụ hỗ trợ viết rule tùy chỉnh (vd: ArchUnit có thể viết bằng Java, rất linh hoạt).

### 4.4.7. Kết Luận

**Kiểm thử kiến trúc** đóng vai trò cốt lõi trong việc duy trì chất lượng phần mềm ở tầm cao (high-level). Nó giúp hệ thống luôn bám sát thiết kế ban đầu, hạn chế việc “phá vỡ” cấu trúc hay gây ra những mớ rối phụ thuộc chồng chéo. Qua đó, tổ chức có thể:

- **Giữ vững tính toàn vẹn của kiến trúc**: Bảo vệ các nguyên tắc thiết kế cốt lõi, tránh xói mòn qua thời gian.
- **Dễ dàng mở rộng và bảo trì**: Một hệ thống được thiết kế và tuân thủ kiến trúc tốt sẽ dễ phát triển thêm tính năng mới hoặc bảo trì mà không gây ảnh hưởng lớn đến các phần khác.
- **Nâng cao chất lượng chung**: Kết hợp với các kỹ thuật kiểm thử khác (unit test, integration test, performance test, v.v.), kiểm thử kiến trúc đảm bảo “chất lượng từ gốc đến ngọn” của sản phẩm phần mềm.

Việc áp dụng Architecture Testing nên được duy trì **liên tục** và **tự động hoá** nhằm phát hiện sớm và kịp thời xử lý mọi vi phạm kiến trúc, giữ cho dự án luôn ổn định và bền vững.

## 4.5. Mutation Testing

**Mutation Testing** (kiểm thử đột biến) là một kỹ thuật được sử dụng để đánh giá chất lượng của bộ kiểm thử (test suite). Thay vì kiểm tra tính đúng đắn của chính phần mềm, mutation testing tạo ra các phiên bản “đột biến” (mutant) của mã nguồn bằng cách thay đổi nhỏ trong mã, rồi kiểm tra xem bộ test có “phát hiện” (tức làm cho test fail) những thay đổi này hay không. Qua đó, ta đo lường được mức độ “nhạy” (sensitivity) của test suite đối với các lỗi tiềm ẩn.

Dưới đây là chi tiết các khía cạnh về **Mutation Testing**:

### 4.5.1. Mục tiêu chính

1. **Đo lường chất lượng bộ kiểm thử**
   - Mutation Testing trả lời câu hỏi: “Nếu ta chèn một lỗi nhỏ vào mã nguồn, liệu test suite có phát hiện được không?”
   - Nếu mutant không bị test suite làm “fail” (tức test vẫn pass), có nghĩa là bộ test chưa đủ mạnh để phát hiện lỗi này.
2. **Xác định những lỗ hổng (gaps) trong việc kiểm thử**
   - Nơi nào nhiều mutant “sống sót” (survive) thì nơi đó dễ xuất hiện các lỗi thật mà không bị phát hiện.
   - Giúp tập trung cải thiện test case cho những chức năng “ít được kiểm tra kỹ”.
3. **Tạo động lực cải thiện test**
   - Khi các developer thấy mutant chưa bị “kill” (chưa bị bắt), họ sẽ bổ sung hoặc điều chỉnh test để test fail (diệt mutant).
   - Điều này dần dần nâng cao tính toàn diện và chất lượng của test suite.

### 4.5.2. Quy trình tổng quát

1. **Tạo mutant**
   - Các công cụ mutation testing sẽ sao chép mã gốc rồi “đột biến” một chi tiết nhỏ, ví dụ:
     - Thay toán tử `+` thành `-`.
     - Đổi `>` thành `>=`.
     - Phản negation: `true` -> `false` hoặc ngược lại.
     - Xóa một đoạn mã nào đó, hoặc “nới lỏng” điều kiện logic.
   - Mỗi thay đổi nhỏ tạo ra một phiên bản mutant của code.
2. **Chạy test suite**
   - Với mỗi mutant, ta chạy toàn bộ test suite hiện có.
   - Nếu một test nào đó fail, mutant được coi là đã bị **“kill”**.
   - Nếu tất cả test pass, mutant **“sống sót”**.
3. **Báo cáo kết quả**
   - **Mutation Score (Điểm mutation)** = Soˆˊ mutant bị killTổng soˆˊ mutant\frac{\text{Số mutant bị kill}}{\text{Tổng số mutant}} \* 100%.
   - Một điểm số cao (gần 100%) thể hiện test suite chất lượng tốt.
   - Báo cáo cũng chỉ rõ mutant nào không bị kill, gợi ý chỗ cần bổ sung/ chỉnh sửa test.
4. **Cải thiện test case**
   - Những mutant sống sót thường chỉ ra các đường logic, ràng buộc hoặc trường hợp cạnh (edge case) mà test chưa bao quát.
   - Sau khi cải thiện test, ta có thể lặp lại quy trình để tiếp tục tối ưu chất lượng.

### 4.5.3. Phân loại và ví dụ về đột biến

#### 4.5.3.1. Nhóm đột biến toán tử (Operator Mutations)

- **Arithmetic Operator**: `+ -> -`, `* -> /`, `++ -> --`, …
  - Ví dụ: `int result = a + b;` bị thay thành `int result = a - b;`.
- **Relational Operator**: `== -> !=`, `> -> >=`, `< -> <=`, …
  - Ví dụ: `if (x > 0)` bị thay thành `if (x >= 0)`.

#### 4.5.3.2. Nhóm đột biến logic/ boolean (Logical/ Boolean Mutations)

- Đảo `&&` thành `||`, hoặc ngược lại.
- `true -> false`, `false -> true`.

#### 4.5.3.3. Nhóm đột biến điều kiện (Conditional Boundary Mutations)

- Nếu logic gốc là `if (x > 10)`, mutant thay thành `if (x >= 10)`.
- Loại đột biến này giúp phát hiện test chưa kiểm tra biên (boundary).

#### 4.5.3.4. Nhóm đột biến về gán giá trị (Assignment Mutations)

- Ví dụ: `x = y;` có thể thay thành `x = y + 1;` hoặc `x = 0;`.

#### 4.5.3.5. Nhóm đột biến xóa mã (Statement Deletion)

- Xóa bớt một dòng code (hoặc một nhánh) để xem test có phát hiện logic bị mất hay không.

Thông thường, các công cụ mutation testing có danh sách các “loại đột biến” (mutation operators) và tự động áp dụng chúng.

### 4.5.4. Công cụ phổ biến

1. **PIT (PITest) - Java**
   - Thường được sử dụng rộng rãi trong cộng đồng Java. Tích hợp với Maven, Gradle.
   - Tạo báo cáo mutation score, chỉ rõ mutant nào bị kill hoặc sống sót.

2. **MutPy - Python**
   - Công cụ mutation testing cho Python.
   - Hỗ trợ nhiều kiểu đột biến, dễ tích hợp vào pipeline CI.

3. **Stryker - JavaScript/TypeScript**
   - Hỗ trợ mutation testing cho JavaScript/TypeScript (và một số ngôn ngữ khác).
   - Tích hợp được với các framework test như Jest, Mocha, Jasmine, …

4. **MutationSharp (oO) - .NET/C#** (hoặc **Stryker.NET**)
   - Đột biến cho mã C#.
   - Tích hợp với các công cụ .NET test (xUnit, NUnit, MSTest).

### 4.5.5. Đánh giá kết quả (Mutation Score)

- **Kill, Survive, No Coverage**
  - “Kill”: Test làm fail mutant ⇒ test suite đã “bắt lỗi” thành công.
  - “Survive”: Test pass ⇒ lỗ hổng kiểm thử.
  - “No Coverage”: Thậm chí không có test nào chạy qua đoạn mã bị thay đổi ⇒ cần bổ sung test coverage cơ bản.
- **Mutation Score**
  - Tỷ lệ mutant bị kill càng cao → test suite càng mạnh.
  - Tuy nhiên, **100%** mutation score không phải lúc nào cũng đạt được hoặc cần thiết (vì thời gian chạy test có thể rất lâu, và đôi khi có những mutant “vô hại” hoặc không thực tế).
- **Phân tích triệt để**
  - Ngoài việc nhìn con số tổng, cần xem từng mutant survive và lý do vì sao.
  - Có thể mutant phản ánh một trường hợp khó xử lý hoặc edge case mà test chưa bao quát.

### 4.5.6. Lợi ích và hạn chế

#### 4.5.6.1. Lợi ích

1. **Cải thiện chất lượng test**
   - Phát hiện những lỗ hổng trong kịch bản test, buộc đội ngũ viết test phải chi tiết và logic hơn.

2. **Tăng sự tự tin vào test suite**
   - Khi test suite “kill” đa số mutant, bạn có thể tin tưởng rằng mã nguồn ít khả năng ẩn chứa các lỗi tương tự.

3. **Giảm rủi ro khi refactor**
   - Một test suite mạnh (theo tiêu chuẩn mutation testing) thường đảm bảo code thay đổi ít gây lỗi hoặc dễ phát hiện lỗi nếu có.

#### 4.5.6.2. Hạn chế

1. **Thời gian chạy lâu**
   - Với mỗi mutant, ta phải chạy toàn bộ test suite ⇒ Nếu dự án lớn, số lượng mutant nhiều ⇒ Tốn rất nhiều thời gian.
   - Có thể giải quyết bằng kỹ thuật tối ưu (ví dụ: chỉ tạo mutant ở những module thay đổi, hoặc chạy song song/ phân tán).
2. **Mutant vô nghĩa (Equivalent Mutants)**
   - Đôi khi thay đổi “đột biến” không làm thay đổi hành vi thực sự của chương trình ⇒ Dù test kỹ cũng không thể fail.
   - Việc xác định “Equivalent mutant” tốn công sức thủ công.
   - Có thể gây hiểu lầm rằng test yếu, trong khi thực tế lỗi này “không làm thay đổi logic”.
3. **Khó khăn về cấu hình và môi trường**
   - Các công cụ mutation testing có thể cần cấu hình phức tạp, nhất là khi project lớn.
   - Cần môi trường build/test ổn định, nhất quán (ci/cd pipeline).

### 4.5.7. Chiến lược áp dụng hiệu quả

1. **Bắt đầu nhỏ**
   - Thử áp dụng mutation testing cho một module hoặc thành phần quan trọng trước, thay vì toàn bộ dự án.
   - Dần dần mở rộng khi đã quen và tối ưu quy trình.
2. **Tích hợp với CI (Continuous Integration)**
   - Có thể thiết lập chạy mutation testing theo lịch (VD: ban đêm) hoặc threshold (điểm mutation score phải ≥ X%).
   - Thông báo kết quả để dev có thời gian cải thiện test.
3. **Kết hợp với Code Coverage**
   - Nếu một số mã không được coverage thì chắc chắn mutant tại những dòng đó sẽ không bị phát hiện.
   - Cần đảm bảo test coverage ở mức chấp nhận được trước khi thực hiện mutation testing.
4. **Chọn lọc loại đột biến**
   - Một số dự án có thể tắt bớt các “operator” ít giá trị để giảm thời gian.
   - Tập trung những đột biến phổ biến (arithmetic, relational) để có hiệu quả cao nhất.
5. **Review thủ công mutant “khó”**
   - Nếu mutant sống sót nhưng dường như không thay đổi hành vi logic, hãy xem liệu đó có phải là “equivalent mutant” không.
   - Nếu là equivalent mutant thì đánh dấu để công cụ bỏ qua, tránh ảnh hưởng đến mutation score.

### 4.5.8. Ví dụ minh họa đơn giản

Giả sử bạn có hàm Java:

```java
public int add(int a, int b) {
    return a + b;
}
```

Bạn có một test:

```java
@Test
public void testAdd() {
    assertEquals(5, add(2, 3));
    // Test duy nhất kiểm tra add(2,3)=5
}
```

- Một **mutant** có thể là thay `+` thành `-`. Khi đó hàm đột biến là:
  ```java
  public int add(int a, int b) {
      return a - b;  // Mutant
  }
  ```
- Chạy test suite, test tính `add(2,3)` = `-1` và so sánh với 5 ⇒ test fail ⇒ mutant bị “kill”.
- Test này ok, vậy là hàm `add` cơ bản đủ chắc chắn cho logic “+” và “-” đơn giản.

Nhưng nếu test của bạn chỉ gọi `add(0,0) = 0`, thì với mutant `return a - b;` hàm vẫn trả về 0 ⇒ test pass ⇒ mutant sống sót ⇒ test yếu.

### 4.5.9. Kết luận

**Mutation Testing** cung cấp một cách tiếp cận “chủ động” và **rất chi tiết** để đo lường và nâng cao chất lượng bộ test. Thay vì chỉ nhìn con số coverage, nó kiểm chứng khả năng phát hiện lỗi thực tế của test:

- **Tạo độ tin cậy**: Khi test suite “kill” đa số mutant, nghĩa là bạn có thể tự tin rằng các thay đổi logic thông thường sẽ không lọt qua.
- **Phát hiện điểm mù**: Mutant “sống sót” hé lộ nơi test đang thiếu hoặc chỉ kiểm tra số ít trường hợp.
- **Tối ưu hoá kiểm thử**: Nhờ báo cáo mutation, dev/ tester có thể điều chỉnh kịch bản test một cách chính xác, tránh lãng phí tài nguyên.

Dù chi phí vận hành có thể cao, nhất là với các dự án lớn, **lợi ích dài hạn** về khả năng phát hiện lỗi sớm và nâng cao chất lượng phần mềm rất đáng để xem xét. Việc áp dụng chiến lược hợp lý (chạy song song, chọn lọc mutant, tích hợp CI) sẽ giúp **Mutation Testing** trở thành một **vũ khí quan trọng** trong bộ công cụ QA, đảm bảo phần mềm không chỉ được kiểm tra “bề ngoài” mà còn được thử thách sâu sắc đến từng dòng code.

# 5. Tài liệu liên quan

### Công cụ & Frameworks
Xem chi tiết các công cụ hỗ trợ kiểm thử tại:
- [[Tools/Testing Tools|Testing Tools & Utilities]]
- [[Testing & Automation|AI Testing & Automation]]

### Usecases & Ví dụ thực tế
- [[Post Score Algorithm|Kiểm thử thuật toán xếp hạng]]
