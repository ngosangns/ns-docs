---
area: technology
domain: system-design
type: resource
title: Benchmark Request Body Limit Va Load Shedding
description: Benchmark Request Body Limit và Load Shedding
timestamp: "2026-06-19T13:43:26.102Z"
tags:
  - technology
  - system-design
resource: https://devops.vn/posts/benchmark-gioi-han-request-body-pha-p99-he-thong
---

# Benchmark Request Body Limit và Load Shedding

## Mục lục

1. [Benchmark thực tế: chỉ 5% request to cũng đủ phá p99 toàn hệ thống](#1-benchmark-thực-tế-chỉ-5-request-to-cũng-đủ-phá-p99-toàn-hệ-thống)
2. [Load Shedding - Kỹ thuật bảo vệ hệ thống khỏi quá tải](#2-load-shedding---kỹ-thuật-bảo-vệ-hệ-thống-khỏi-quá-tải)
3. [Hotspot - Vấn đề phân phối tải không đều trong hệ thống phân tán](#3-hotspot---vấn-đề-phân-phối-tải-không-đều-trong-hệ-thống-phân-tán)

---

## 1. Benchmark thực tế: chỉ 5% request to cũng đủ phá p99 toàn hệ thống

**Nguồn:** [devops.vn](https://devops.vn/posts/benchmark-gioi-han-request-body-pha-p99-he-thong)  
**Tác giả:** Long Bùi  
**Ngày đăng:** 29/12/2025

### 1.1. Bài toán thực tế

Trong môi trường doanh nghiệp với nhiều hệ thống khác nhau, có một vấn đề phổ biến xảy ra: hệ thống bị bất ổn không phải do DDoS với hàng triệu RPS, mà do một số client gửi request có **body cực lớn** lặp đi lặp lại.

**Triệu chứng:**

- RPS không cao
- CPU gateway tăng
- Memory lên xuống mạnh
- Upstream bắt đầu timeout vì phải đọc body lớn
- **p99 của toàn hệ thống xấu đi** dù đa số người dùng gửi request bình thường

Hệ thống thường có 3 loại endpoint:

1. **API JSON bình thường** (body vài KB)
2. **Upload file** (ảnh/PDF) qua API (một số endpoint vẫn nhận multipart)
3. Một vài endpoint nội bộ có body lớn hơn (batch)

Vấn đề là nếu đặt **limit XMB cho mọi thứ** (ví dụ X=1) nghe có vẻ an toàn nhưng có thể phá use case upload, làm ảnh hưởng không ít hệ thống.

**Hai câu hỏi cần trả lời:**

1. Nếu để gateway **limit thấp** (1MB) thì hệ thống có **khỏe** hơn rõ rệt không?
2. Nếu để gateway **limit cao** (10MB/50MB) thì liệu abuse vẫn đủ làm hệ thống **mệt** không?

### 1.2. Setup benchmark

**Kiến trúc test:**

- **Loadgen**: Server bắn request
- **Gateway**: Nginx (có thể thay bằng Envoy/HAProxy)
- **Upstream**: Service backend đơn giản (nhận body và trả HTTP 200)

**Cấu hình server:**

- 4 vCPU / 8GB RAM
- Cùng LAN (latency thấp)

**Upstream có 2 mode:**

- **Mode 1 (Full Body Processing)**: Mô phỏng logic ứng dụng thực tế (thực hiện Parse JSON, xử lý Multipart…)
- **Mode 2 (Early Response/Short-circuiting)**: Upstream phản hồi ngay lập tức mà không xử lý Body, để đo lường chính xác hiệu quả bảo vệ và khả năng Request Filtering của Gateway

**Traffic Mix (tổ hợp lưu lượng):**

- **Traffic tốt**: 95% request body ~ 2-10KB
- **Traffic xấu**: 5% request body lớn: **5MB/20MB/80MB** (tuỳ test)

RPS tổng chỉ khoảng 1k-3k rps. Vì câu chuyện này **không cần rps cao**, nó cần **body to**.

### 1.3. Các ngưỡng limit đem ra test

**Profile A: Strict**

- Limit **1MB**
- Dùng cho API JSON thông thường

**Profile B: Balanced**

- Limit **10MB**
- Đủ cho ảnh/PDF nhỏ

**Profile C: Loose**

- Limit **50MB**
- Dành riêng cho các endpoint hỗ trợ multipart upload hoặc file lớn

### 1.4. Kết quả benchmark

**Khi không có limit:**

- Với 5% request 5MB, p99 tăng đáng kể
- Với 5% request 20MB, p99 tăng mạnh hơn
- Với 5% request 80MB, p99 tăng rất mạnh, hệ thống gần như không thể xử lý

**Khi có limit:**

- **Profile A (1MB)**: Chặn được hầu hết abuse, p99 giảm rõ rệt
- **Profile B (10MB)**: Vẫn chặn được phần lớn abuse, p99 cải thiện đáng kể
- **Profile C (50MB)**: Vẫn có tác động nhưng ít hơn

**Kết luận quan trọng:**

- Chỉ cần **5% request body lớn** cũng đủ làm **p99 toàn hệ thống xấu đi**
- Gateway limit body size có tác dụng rõ rệt trong việc bảo vệ upstream
- Limit càng thấp (trong phạm vi hợp lý) thì bảo vệ càng tốt

### 1.5. Những điều ẩn làm limit hiệu quả hoặc vô nghĩa

1. **Client_max_body_size chỉ là một phần**: Nếu gateway vẫn buffer body lớn xuống disk/mem trước khi chặn, bạn vẫn bị ăn I/O.

2. **Timeout phải đi cùng limit**: Request body to mà client gửi chậm thì phải có `client_body_timeout`/request timeout để cắt.

3. **Rate limit theo IP/route**: Body lớn mà bắn liên tục từ vài IP thì rate limit + body limit đi cùng mới **đủ combo**.

### 1.6. Khuyến nghị thực tế

**3 thứ nên làm:**

1. Set body limit **theo từng route** (không phải global)
2. Set timeout cho **client body send** (để chặn slow upload abuse)
3. Theo dõi metric 413/4xx + distribution body size (để biết limit đang đúng chưa)

**Chốt ngưỡng:**
Nếu hệ thống của bạn giống tác giả (đa số JSON nhỏ, có vài upload):

- **Default API: 1MB**
- **Upload endpoint: 10MB** (nếu sản phẩm chỉ cần ảnh/PDF vừa)
- **Nếu thật sự cần upload lớn**: Đừng để đi qua app, chuyển sang presigned URL

**Tóm lại:** Body limit không phải để hạn chế user, mà để **bảo vệ p99 của user tốt khỏi vài request xấu**.

---

## 2. Load Shedding - Kỹ thuật bảo vệ hệ thống khỏi quá tải

**Nguồn:** [quanghoang.substack.com](https://quanghoang.substack.com/p/50-days-of-sd-load-shedding)  
**Tác giả:** Quang Hoàng  
**Ngày đăng:** 27/03/2025

### 2.1. Câu chuyện thực tế: Một triệu lon bia

Vào một ngày hè năm 2021, trước trận đấu giữa Việt Nam - UAE, Budweiser quyết định gửi tặng người hâm mộ Việt Nam **một triệu lon bia** để cùng hòa nhịp với niềm hân hoan chiến thắng. Đối tác phân phối là Shopee.

**Sự cố xảy ra:**

- Hôm đầu tiên của chiến dịch, alert bắn loạn xạ
- Latency tăng đột biến
- **Database sập!**
- Nguyên nhân: Một lượng lớn fan hâm mộ đổ bộ "lấy" bia khiến server quá tải, một phần của Shopee tê liệt

### 2.2. Overload là gì?

**Overload hay "quá tải"** là hiện tượng xảy ra khi lượng truy cập tăng đột biến, server nhận được nhiều request hơn khả năng chịu đựng thông thường của nó.

**Nguyên nhân:**

1. **Số lượng người dùng tăng quá nhanh** trong 1 khoảng thời gian ngắn (ví dụ flash sale)
2. **Server bị hacker tấn công bão hòa** (DDoS attack)
3. **Hiệu ứng Domino**: 1 server trong cluster gặp sự cố, lưu lượng truy cập từ server bị lỗi sẽ được load balancer chuyển hướng sang các server còn lại. Điều này dẫn đến sự gia tăng đột ngột về tải cho các server này; và tới lượt chúng, quá tải.

**Triệu chứng ban đầu:**

- CPU và/hoặc memory utilization tăng cao
- Latency tăng đột ngột

**2 thứ khiến overload thường khuếch đại chính nó:**

1. **Timeout waste work**: Khi latency vượt quá một giới hạn, client bắt đầu nhận được lỗi timeout. Mọi tài nguyên được sử dụng để xử lý những request bị timeout này đều đổ sông đổ bể. Như một câu nói nổi tiếng: "the last thing a system should do in an overload situation, where resource is constrained, is waste work."

2. **Retry storm**: Khi nhận được lỗi timeout, client thường sẽ retry. Giả sử một service retry 3 lần mỗi khi timeout, một chuỗi 4 service gọi nhau có thể dẫn đến service cuối cùng nhận một lượng request gấp **64 lần** (hiện tượng retry storm).

**Ba phương pháp phổ biến để giảm thiểu tác động của Overload:**

1. Auto-scaling
2. **Load shedding**
3. Circuit breaker

### 2.3. Load Shedding là gì?

**Ý tưởng của Load shedding rất tự nhiên:** Khi server "sắp" quá tải, chúng ta sẽ bắt đầu **từ chối xử lý các request mới** từ client. Mục đích là để server tập trung resource xử lý các request nó đã chấp nhận trước đó.

Với những request bị từ chối, client sẽ nhận được lỗi **service unavailable (503)**.

**Nói cách khác:** Với Load shedding, chúng ta chấp nhận đánh đổi một phần **availability** để duy trì hiệu năng và bảo vệ server khỏi crash.

### 2.4. Các phương pháp phát hiện quá tải

#### 2.4.1. CPU utilization

Phương pháp phổ biến để phát hiện tình trạng "sắp" quá tải của server là liên tục giám sát **CPU utilization** - mức độ tiêu thụ CPU. Trong Linux, mọi thứ đều là file, chúng ta có thể đọc chỉ số này từ file `/proc/stat`.

**Điểm yếu:**

- Khó mà chọn được một ngưỡng CPU utilization hoàn hảo để quyết định khi nào nên từ chối xử lý request mới. Nó có thể là 30%, 50% hay 70%, và thường ngưỡng này sẽ thay đổi theo thời gian.
- Chọn ngưỡng quá thấp sẽ ảnh hưởng đến availability.
- Chọn ngưỡng quá cao có thể làm tăng latency, giảm throughput.

Để chọn được một ngưỡng hợp lý, thường cần tiến hành **stress testing** hệ thống nhiều lần. Brendan Gregg, tác giả của cuốn sách "Systems Performance", có một bài viết chi tiết về những hạn chế của chỉ số CPU, với tiêu đề "CPU Utilization is Wrong".

#### 2.4.2. Throughput (QPS)

Một cách load shedding phổ biến khác là dựa vào **throughput - QPS (query per second)**. Cách này phù hợp với các service có latency tương đối ổn định và đồng đều.

Tương tự như cách dùng CPU utilization, chúng ta cần chạy stress test cẩn thận để xác định được mức QPS cao nhất hệ thống chịu được mà không làm tăng latency quá nhiều.

#### 2.4.3. In-flight request

Với các hệ thống có latency không ổn định, ví dụ khi latency phụ thuộc vào request hoặc kích thước payload của response, việc chỉ dựa vào QPS để load shedding không còn chính xác. Chúng ta cần 1 chỉ số kết hợp được cả throughput và latency.

**Little's Law** trong queuing theory phát biểu rằng: **độ dài trung bình của một hàng đợi bằng arrival rate nhân với thời gian xếp hàng trung bình.**

Với bài toán load shedding:

- **L** chính là trung bình số lượng request đang được xử lý ở server (in-flight request)
- **λ** là throughput
- **W** là latency

Biết được **λ** và **W**, ta có thể ước lượng được số lượng in-flight request trung bình. Ví dụ: nếu latency trung bình của hệ thống là 100 (ms), throughput trung bình là 1000 (qps), thì số lượng in-flight request trung bình sẽ là **0.1 (s) x 1000 (qps) = 100**.

Khi số lượng in-flight request thực tế lớn hơn 100 rất nhiều, ta biết rằng hệ thống đang bị overload và cần được load shed.

**Nhược điểm:**

- Latency trung bình có xu hướng thay đổi theo thời gian, đòi hỏi ta phải tính lại in-flight request limit thường xuyên.
- Không phù hợp với các service phụ thuộc nhiều vào I/O (I/O bound), ví dụ các service cần gọi nhiều tới API của bên thứ 3, hoặc dành nhiều thời gian access database hoặc file system. Những service kiểu này dành phần lớn thời gian để chờ đợi response từ network, nên số lượng in-flight request thường không phản ánh chính xác CPU utilization.

#### 2.4.4. Runnable process queue length

**Ôn lại kiến thức hệ điều hành:** Các process (tiến trình) của OS có 5 trạng thái: new, ready, running, waiting, terminated.

- Khi server đọc/ghi dữ liệu từ disk hoặc network, process sẽ chuyển trạng thái từ **running** sang **waiting**. Ở trạng thái này, process tạm dừng và không sử dụng CPU.
- Khi quá trình đọc/ghi hoàn thành, process sẽ "tỉnh dậy" và chuyển sang trạng thái **ready**. Các process ready này được lưu trữ trong 1 hàng đợi có tên là ready queue, sẵn sàng để được thực thi.
- CPU scheduler lựa chọn process từ ready queue để thực thi dựa theo một thuật toán nào đó (ví dụ Completely Fair Scheduler).

**Sự chuyển đổi trạng thái của process trong OS cho ta một chỉ số hoàn hảo để dự đoán hiện tượng overload:**

**runnable process number = ready process number + running process number**

Số lượng runnable process này không bao gồm các process đang chờ I/O nên đã khắc phục được nhược điểm của phương pháp đếm in-flight request.

Ví dụ: giả sử server có 16 CPU core, nếu số lượng runnable process **trung bình** lớn hơn 16, ta có thể kết luận server đang bị overload, và cần được load shed. Tương tự như CPU utilization, ta có thể tính số lượng runnable process đơn giản bằng cách đọc file `/proc/stat`.

### 2.5. Prioritizing request

**"Tất cả mọi người sinh ra đều có quyền bình đẳng, request tới server thì không."**

Khi server quá tải và bắt đầu load shedding, nó có cơ hội để lựa chọn request nào để từ chối xử lý. Ví dụ:

1. Request **/health-check** từ load balancer là request mà (bằng mọi giá) server phải ưu tiên xử lý: nếu server không phản hồi kịp thời, load balancer sẽ dừng gửi request mới tới nó.

2. Tùy thuộc vào business model, một vài loại request sẽ được ưu tiên xử lý. Ví dụ, với một sàn thương mại điện tử, đó là những request liên quan đến authentication, catalog listing và order. Tương tự, Netflix phân loại request thành 3 nhóm: NON_CRITICAL, DEGRADED_EXPERIENCE và CRITICAL dựa vào mức độ ảnh hưởng tới trải nghiệm người dùng.

### 2.6. Kết luận

Hành trình đọc và tìm hiểu về Load shedding khiến tác giả càng thấm thía tầm quan trọng của việc hiểu và vận dụng **những kiến thức cơ bản** của khoa học máy tính.

Load shedding là một công cụ quan trọng trong việc quản lý hệ thống phân tán, giúp duy trì hiệu suất và độ tin cậy bằng cách ưu tiên các yêu cầu quan trọng và giảm tải khi cần thiết. Tuy nhiên, nó là "hạ sách" vì đánh đổi availability, và thường đóng vai trò như **lớp phòng thủ cuối cùng**.

---

## 3. Hotspot - Vấn đề phân phối tải không đều trong hệ thống phân tán

**Nguồn:** [quanghoang.substack.com](https://quanghoang.substack.com/p/50-days-of-sd-hotspot)  
**Tác giả:** Quang Hoàng  
**Ngày đăng:** 13/04/2025

### 3.1. Hotspot là gì?

Khi lượng dữ liệu tăng lên quá lớn, cách phổ biến nhất để mở rộng hệ thống là **partitioning**: chia nhỏ tập dữ liệu thành nhiều phần nhỏ, mỗi phần (gọi là 1 partition hay shard) được lưu trữ và quản lý trên một server riêng biệt (shard server).

Tuy nhiên, partitioning thường gặp phải vấn đề **hotspot**. Vấn đề này xảy ra khi traffic bị phân phối không đều, dẫn đến một số shard nhận được quá nhiều request từ client. Hậu quả là các shard này bị quá tải, thậm chí là crash.

**Ví dụ cụ thể:**
1 hệ thống database gồm n shard, mỗi shard chứa tối đa 10000 key, mỗi key nhận trung bình 1 QPS. Nếu một key nào đó đột nhiên trở nên cực kỳ phổ biến với QPS = 1000 (ví dụ, sếp Sơn Tùng ra bản hit mới, đội Sky đổ xô vào cày view), shard chứa key đó sẽ trở nên chậm chạp, latency và error rate tăng cao, và cuối cùng có thể bị crash.

### 3.2. Mối quan hệ với Load Shedding

Trong bài viết #5, tác giả đã giới thiệu kỹ thuật **Load Shedding** để đề phòng server bị sập bằng cách từ chối xử lý request mới khi server có dấu hiệu quá tải. Kỹ thuật này tuy hiệu quả nhưng lại là "hạ sách" vì nó đánh đổi một phần availability để duy trì hiệu năng và bảo vệ server. Thực tế, Load Shedding thường đóng vai trò như **lớp phòng thủ cuối cùng**.

Trong bài viết này, tác giả muốn chia sẻ 2 kỹ thuật thú vị khác để xử lý vấn đề hotspot, đó là **Small Cache - Big Effect** và **Request Collapsing**.

### 3.3. Small Cache - Big Effect

#### 3.3.1. Ý tưởng

Ý tưởng của kỹ thuật này xuất phát từ một nhận xét rất "tự nhiên":

> "the worst case for load balance - a highly imbalanced query workload - is simultaneously the best case for caching, and vice-versa."

**Tạm dịch:** Trường hợp xấu nhất của load balance - xảy ra khi traffic bị phân phối cực mất cân bằng - lại là trường hợp tốt nhất của caching, và ngược lại.

Dựa trên nhận xét này, ta sử dụng 1 **cache server** để lưu lại kết quả của những **hot key**. Nhờ đó, phần lớn traffic của các hot key sẽ được xử lý bởi cache server (vốn có throughput cao hơn shard server nhiều lần).

#### 3.3.2. Câu hỏi quan trọng

**Cache server cần có kích thước bao nhiêu để đảm bảo không có shard server nào bị quá tải, kể cả trong trường hợp tệ nhất?**

#### 3.3.3. Kết quả nghiên cứu

Thật may, các nhà nghiên cứu tại đại học CMU và Intel đã giúp chúng ta trả lời câu hỏi này trong một paper xuất bản năm 2011: **Small Cache, Big Effect**.

**Tính toán của họ chỉ ra rằng:** Ta cần lưu **O(nlogn) key** ở cache server, với **n là số lượng shard server**.

**Điều kỳ diệu:** Số lượng key cần cache **không phụ thuộc vào số key được lưu trong database cluster** mà **chỉ phụ thuộc vào số lượng shard server**!!!

**Ví dụ cụ thể:**
Giả sử database cluster lưu 1,000,000 key sử dụng n=100 shard, mỗi shard chứa 10,000 keys, cache server chỉ cần lưu vỏn vẹn **8\*nlogn+1 ~ 3,600 keys** là đủ đảm bảo rằng không có shard server nào bị hotspot (lưu ý logn ở đây là ln(n)).

**Tác giả đã shock khi đọc kết quả này vì nó quá kỳ diệu!**

Kết quả nghiên cứu này hiện đang được áp dụng trong nhiều service tại công ty tác giả và chứng minh sự hiệu quả.

### 3.4. Request Collapsing

#### 3.4.1. Ý tưởng

Kỹ thuật thứ 2 là **Request Collapsing** (hay còn được gọi là request gating, request deduplication hay singleflight).

Ý tưởng của kỹ thuật này xuất phát từ nhận xét: **hotspot thường xảy ra khi có quá nhiều request trùng lặp được gửi đến cùng 1 shard.**

Vì vậy, thay vì gửi đi gửi lại cùng một request, ta chỉ gửi **một request đại diện duy nhất**, và sử dụng kết quả để phản hồi cho các request trùng lặp còn lại. Điều này đảm bảo tại một thời điểm bất kỳ, với một key A bất kỳ, **chỉ có tối đa một request được gửi tới shard server**.

#### 3.4.2. Cách triển khai

Implementation của kỹ thuật Request Collapsing khá đơn giản: khi nhận được request đọc key A từ client, API server sẽ **acquire 1 mutex lock cho key A**:

- **Nếu có thể acquire lock thành công**: API server sẽ gửi request đọc key A xuống Shard server, chờ phản hồi, và sau đó unlock key.
- **Nếu không thể acquire lock** (nghĩa là lock đang được giữ bởi một process khác): API server sẽ đợi cho đến khi có phản hồi từ Shard server cho key A.

**Mutex Lock ở đây có thể là:**

- 1 **distributed lock** (ví dụ Redis Redlock)
- Một **local mutex lock** (ví dụ thư viện built-in singleflight của Golang)

#### 3.4.3. Lưu ý về consistency

Cách cài đặt trên **không đảm bảo tính chất "strong consistency"**: trong thời gian Req 2 chờ đợi Res 1 ở API server, giá trị của key A có thể đã bị thay đổi. Nói cách khác, nếu Req 2 không chờ đợi mà được API server gửi ngay lập tức tới Shard server, chúng ta có thể sẽ nhận được một giá trị Res 2 mới hơn.

Trong nhiều hệ thống thực tế, "strong consistency" không phải là yêu cầu bắt buộc. Để đạt được "strong consistency", cần một chút thay đổi trong thuật toán trên.

### 3.5. Kết luận

Để giải quyết vấn đề hotspot trong partitioning, hai kỹ thuật **Small Cache** và **Request Collapsing** thường được **kết hợp sử dụng**. Đặc biệt, Request Collapsing đóng vai trò bổ trợ hoàn hảo cho Small Cache, giúp ngăn chặn hiệu ứng **Thundering Herd** - một chủ đề sẽ được phân tích sâu hơn trong các bài viết tiếp theo.

---

## Tổng kết

Ba bài viết này đều xoay quanh vấn đề **bảo vệ hệ thống khỏi quá tải** và **duy trì hiệu suất ổn định**:

1. **Request Body Limit**: Bảo vệ hệ thống khỏi các request có body quá lớn, ngay cả khi chỉ chiếm 5% traffic cũng đủ làm p99 toàn hệ thống xấu đi.

2. **Load Shedding**: Kỹ thuật từ chối request mới khi hệ thống sắp quá tải, đánh đổi availability để bảo vệ hiệu năng. Đây là lớp phòng thủ cuối cùng.

3. **Hotspot**: Vấn đề phân phối tải không đều trong hệ thống phân tán, được giải quyết bằng Small Cache (O(nlogn) keys) và Request Collapsing (deduplication).

Tất cả đều nhấn mạnh tầm quan trọng của:

- **Giám sát (monitoring)** để phát hiện sớm vấn đề
- **Benchmark và stress testing** để xác định ngưỡng phù hợp
- **Hiểu sâu kiến thức cơ bản** (queuing theory, OS concepts) để áp dụng đúng
