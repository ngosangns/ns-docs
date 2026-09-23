---
area: technology
domain: backend
type: resource
title: Distributed Cache Ket Luan Va QA
description: "Distributed In-Memory Cache cho Heavy-Read APIs: Tổng hợp và Best Practices"
timestamp: "2026-06-19T13:43:26.149Z"
tags:
  - technology
  - backend
resource: https://github.com/huykn/distributed-cache
---

# Distributed In-Memory Cache cho Heavy-Read APIs: Tổng hợp và Best Practices

> **Xem thêm:** [Distributed In-Memory Cache Best Practices](/Technology/Backend-Database/Practices/Distributed In Memory Cache Best Practices)

## 8. Kết luận và Recommendations

### 8.1. Khi nào nên dùng

✅ **Phù hợp:**

- Heavy-Read APIs với tương quan Write/Read lớn
- Use case chấp nhận Eventual Consistency
- Cần ultra-low latency
- Budget hạn chế (cần cost-effective scaling)

❌ **Không phù hợp:**

- Financial transactions
- Real-time data yêu cầu 100% accuracy
- Use case yêu cầu strong consistency
- Data size quá lớn không fit vào memory

### 8.2. Best Practices Summary

1. **Serialization:** Serialize ở Write Service, cache bytes ở Read Service
2. **HTTP:** Dùng native `net/http` cho performance-critical endpoints
3. **Caching:** HTTP 304 với ETag computed ở Write Service
4. **Memory:** Set max items, dùng LFU/LRU, smart warm-up
5. **Sync:** Redis Pub/Sub với multiple channels, monitor health
6. **Race condition:** TTL + CQRS + versioning
7. **Lifecycle:** Health check, smart warm-up, singleflight pattern
8. **Monitoring:** Track hit rate, memory usage, Redis health

### 8.3. Implementation Checklist

- [ ] Implement serialization optimization (bytes caching)
- [ ] Switch to native `net/http` cho Read Service
- [ ] Implement HTTP 304 caching với ETag
- [ ] Set up Redis Pub/Sub với multiple channels
- [ ] Implement LFU/LRU eviction policy
- [ ] Set max items cho cache
- [ ] Implement health check endpoint
- [ ] Implement smart warm-up strategy
- [ ] Implement singleflight pattern cho cache miss
- [ ] Set up monitoring (hit rate, memory, Redis health)
- [ ] Implement fallback mechanism (Redis direct call)
- [ ] Handle connection loss (flush cache, retry)
- [ ] Test race condition scenarios
- [ ] Load test với expected traffic

## 9. Tài liệu tham khảo

- [GitHub Repository](https://github.com/huykn/distributed-cache)
- [Example: Heavy-Read API](https://github.com/huykn/distributed-cache/tree/main/examples/heavy-read-api)
- [Phát voucher 1M req/s](/Technology/Backend-Database/Practices/Heavy Write Voucher 1M Req S) — biến write trên hot path thành đọc RAM
- [Example: Stale Data Prevention](https://github.com/huykn/distributed-cache/tree/develop/examples/stale-data-prevention)
- [Redis Client-Side Caching](https://redis.io/docs/latest/develop/reference/client-side-caching/)
- [Memproxy Library](https://github.com/QuangTung97/memproxy)

---

**Lưu ý:** Đây là tổng hợp từ thảo luận thực tế về kiến trúc Distributed In-Memory Cache. Các best practices nên được áp dụng phù hợp với context và requirements cụ thể của từng hệ thống.

---

## 10. Thảo luận và Q&A từ cộng đồng

### 10.1. So sánh với Redis Client-Side Caching

**Q:** Cái này cảm giác tương tự như cơ chế local cache của redis client phải không?  
**Ref:** [Redisson Cache API](https://redisson.pro/docs/cache-api-implementations/)

**A:** Đúng, nhưng có điểm khác biệt:

- Demo có pub/sub theo channel tùy chọn
- Ở môi trường thực tế còn dùng nhiều channel cho các việc khác nhau:
  - Invalidate theo tag
  - Invalidate theo group user
  - Các use case khác tùy business logic

**Q:** Xài pubsub này cần quan tâm đến vấn đề message bị mất khi broadcast không? Redis không đảm bảo delivery, giả sử có nhiều instance, có thể có vài instance không nhận được message từ pubsub.

**A:**

- Phải monitor các thứ
- Có healthcheck trên chính pod: nếu pod đã down thì sẽ không lái traffic vào nữa
- Hệ thống thuộc AP trong CAP theorem
- Ở trạng thái 1m rqs/s thì không quan tâm lệch sóng 0.5-1s

**Q:** Mình chưa xem chi tiết nhưng đọc sơ qua thì khá giống với client-side caching của redis, cụ thể hơn là broadcasting mode. [Redis Client-Side Caching](https://redis.io/docs/latest/develop/reference/client-side-caching/)

**A:**

1. Phần cache của redis đúng. Tuy nhiên demo có pub/sub theo channel tùy chọn, ở môi trường thực tế còn dùng cho nhiều channel làm các việc khác nhau (ví dụ: invalid theo tag, theo group user...)
2. Trong demo cần demo ở 3 trường hợp nên tồn tại phần unmarshal data. Ở post trước cũng chia sẻ về việc tracking toàn bộ lifecycle của 1 request từ user đến hệ thống -> insight (metrics) trong các endpoints rất rõ ràng -> có thể trả lời được hash hay không hash etag từ write service
3. Bên mình benchmark rất nhiều nên việc có thêm framework (vd như fiber) sẽ chạy qua các middleware của framework sẽ có overhead. Để đạt đến trạng thái optimize như hiện tại thì áp dụng CQRS rất nhiều: phần write service vẫn dùng framework, còn phần read thì sẽ tối ưu tùy theo bài toán của nó. Framework không xấu, không cổ xúy bỏ framework mà ra chiêu đúng lúc đúng chỗ thôi.

### 10.2. Warm-up và Seeding Data

**Q:** Khi start service thì sẽ cần seeding data vào in-mem cache như thế nào (load hết db/redis lên)? Có khi nào data cần seed của prod quá lớn đến mức không fit vừa mem của pod không (ví dụ như danh mục sp của shoppe)? Nếu như load 1 phần thì cơ chế invalidate như thế nào?

**A:**

- Thực tế thì không cache toàn bộ data vào mem của 1 service cả
- Ví dụ: bài post này được đưa notification cho bạn thì trước đó nó đã build cache cho bạn xem trước rồi
- Có rất nhiều cách để làm nhưng nó tùy thuộc các trường hợp cụ thể
- Một cách smart hơn là build 1 cái zhash scoring để xác định thứ cần thêm vào cache lúc start pod/service mới

**Q:** Không thấy chủ thớt đề cập đến total keys + size, và warm up khi bootstrap 1 pod nhỉ?

**A:** Cái này tùy chiến lược của mỗi service thôi. Ví dụ: build 1 cái zhash scoring để xác định thứ cần thêm vào cache lúc start pod/service mới.

### 10.3. Redis vs Memcached cho Scale Lớn

**Q:** Tổng data size và số lượng key trên cache là bao nhiêu? Vì mình thấy Redis dùng cho ít data nó còn chạy ổn. Chứ dùng cho từ 16GB trở lên thì nó cực kì bất ổn định. Và phần lớn hệ thống to trên thế giới mà lưu trên cache đều dùng Memcached hoặc cái tương tự memcached chứ không dùng Redis. Ví dụ twitter không dùng Redis cho key-value caching mà vẫn dùng Twemcache (fork của memcached).

**A:**

- Cấu hình cho redis này dùng cấu hình thấp M7i.large
- Ví dụ: bài post này trên facebook không được đưa đi đến tất cả user trên fb -> nó chỉ đẩy lên cache của những người quan tâm thôi -> mà cũng không đẩy đến hết cả group này luôn
- Cache ở đây sẽ là kiểu "dọn cỗ sẵn chờ người đến ăn" thôi -> nên không có việc cache toàn bộ hệ thống lên redis hay ram trên pod
- Việc cache như thế nào cho tối ưu, lúc nào cần sharding redis thì cũng dựa trên nhiều biến số
- Con số 16G cũng sẽ phụ thuộc tùy hoàn cảnh thôi
- Ví dụ khác: tạo 1 cái map ra xong insert vào 10m records sau đó get ra thì sẽ thấy nó chậm -> bản chất là do hash collision thôi -> vậy chia 100 cái map để lưu thì nó lại ngon

**Q:** Thế bạn chưa tìm hiểu những hệ thống như FB rồi. Bên đó cache của nó lưu phải đến 1000 tỉ key trên memcached cluster. Và hit rate trung bình cực kì cao, tầm 99% => 99.5%.

**Lý do cần hit rate cao:**

- Một màn hình facebook phải check rất nhiều thứ và get rất nhiều key từ cache (trung bình khéo phải 1000 key get cho một screen)
- Nếu thực hiện multiget batch 100 key mà mỗi key xác suất 99%, thì hit rate của cả batch chỉ có ~64% thôi
- Facebook phải làm 10 lần như thế
- Video tham khảo: [Facebook Caching](https://youtu.be/m4_7W4XzRgk?si=ydshs8240cPyaEso)
- Thư viện đạt được hit rate như thế: [memproxy](https://github.com/QuangTung97/memproxy)

**Ví dụ Facebook:**

- Một màn hình show full thông tin cũng lấy tầm khoảng 500-1000 key từ memcached mới render được
- 16GB trên memcached là bình thường, số lượng những hệ thống lớn có thể lên đến Petabyte RAM
- Trung bình một key-value của FB chỉ có size là 200 byte
- Ví dụ trong post: sẽ có một cache key cho mỗi:
  - Số like ở mỗi comment
  - Số like ở bài post
  - Thông tin của một comment
  - Danh sách những người like ở comment
  - Danh sách những người like ở bài post
  - Mỗi user lại có những thông tin đi kèm như tên, id, avatar...
  - Check bạn có đang bị block bởi người comment và ngược lại không
- => Vậy nên nó mới phải multiget nhiều key cho một màn hình như vậy
- Không hề có khái niệm "dọn sẵn" đâu
- Mỗi lần truy cập lên FB là mỗi API đều phải load data và tính lại hết
- Caching systems của nó chịu được chục tỉ operation trên cache trong một giây

**Lý do Redis không tốt với RAM nhiều:**

- Không áp dụng slab allocator để quản lý fragmentation => Dễ OOM ở kích thước memory lớn
- Không support multithreading cho luồng access vào memory => Rất khó để dùng hết bandwidth của CPU cache và RAM
- Server CPU hiện tại càng ngày càng xu hướng là nhiều core hơn, nhưng mỗi core lại chậm đi

**A:** Cảm ơn sự tâm huyết. Thực tế thì cũng chưa phải vận hành 1 service nào có cache size trên redis tới 16G cả, thường thì nó sẽ phải sharding trước khi quá to rồi.

**Q:** Sharding để scale thì buộc phải làm với hệ thống lớn rồi. Nhưng mà trên một node thì nên dùng multithreading hơn là phải tách riêng từng instance redis cho mỗi core.

**Lý do:**

- Khi sharding thì mỗi lần multiget phải connect đến càng nhiều server để lấy thông tin
- Ví dụ: multiget 100 key và có 10 shard thì phải connect đến 10 server để lấy hết 100 key
- Nếu chỉ cần connect đến 1 server dùng 10 thread để handle thì số lượng connection chỉ có 1 thôi
- Overhead như TCP, ethernet header sẽ càng ngày càng nặng nếu số lượng cache server lớn
- => Scale lớn người ta thích memcached hơn

**Ở scale của FB:**

- Vấn đề về connection rất nặng => Phải dùng UDP thay cho TCP để giảm overhead cho mỗi connection
- Tuy nhiên overhead của một packet vẫn lớn
- => Scale bằng sharding ở FB còn đạt đến giới hạn nữa: chia nhỏ thành nhiều shard hơn thì hệ thống càng chậm, vì phải get từ nhiều server cùng lúc quá
- Cách FB giải quyết: dùng replication kết hợp sharding

**A:**

- Chiêu thức là để dùng đúng lúc đúng chỗ. Redis single thread ở 1 số bài toán nó lại là tính năng
- Tất cả mọi thứ đều có trade-off, việc vận dụng đúng chiêu đánh đúng chỗ mới là điều quan trọng
- Không có tuyệt chiêu nào phù hợp cho tất cả
- Bài post này đang muốn nói đến việc handle 1m rqs/s mà chỉ có 20 pods chạy trên k8s và 1 node redis cùi thôi -> đây là bài toán thực tế
- Nếu phải đẩy 20 pods vào call memcache thì memcache sẽ phải scale lên để chịu được 1m đấm/s thì chi phí là bao nhiêu? + chắc phải 40 pods mới đủ hứng traffic -> tất cả mọi thứ hạ tầng sẽ phải gánh tăng lên thêm nhiều

**Q:** Đây là một node memcached mà Instagram từng dùng để handle traffic nhé. [Instagram Memcached](https://x.com/rbranson/status/430914617909317633) - Từ thời ông này còn làm infra bên đó. Chỉ cần 8 core thôi đã handle được đống đó rồi. Thư viện của mình trước từng benchmark lên đến tầm 5 triệu get/s trên một node nhỏ nhỏ.

### 10.4. Race Condition và Cache Aside Pattern

**Q:** Bác đã dùng thư viện bản thân làm vào production thực tế chưa? Và peak traffic số operation/s là bao nhiêu? Mình thắc mắc vì cái thư viện của bạn khả năng dính nhiều lỗi race condition hay lost event là rất cao. Không biết phía business có chấp nhận sai lệch như thế không?

**A:**

- Thư viện được build lại từ java mình dùng từ 2018, còn bản go này mình cũng dùng logic tương tự cho prod đang hứng 1m+ rqs/s
- Bản thân mình quản lý service này chưa có hiện tượng mất event
- Việc mất event mình biết là có thể, nó là tradeoff mà. Nên mình ý thức việc đó để đảm bảo nó không xảy ra
- Lib này mình sẽ dùng cho prod của mình trong phase tiếp theo. Hứa sẽ maintain đầy đủ

**Q:** Dùng Redis Stream mà không mất event mình thấy rất khó tin. Có vẻ bạn làm về chứng khoán? Hoặc nếu service bạn không yêu cầu cao về consistency cao thì chắc không sao. Vì cách làm caching thông thường mà không dùng lease thì sẽ luôn có race condition với cache aside pattern. Chứ bên mình trước chỉ cần sai stock value trong vài chục phút thôi là bên khách hàng kêu rồi.

**A:**

- Redis cơ bản nếu mất event thì khi mất mạng hoặc có update gì đó liên quan đến nó
- Thực tế uptime của nó bên mình monitor thường xuyên và có cả bắn cảnh báo nếu có vấn đề
- Phương án: mất kết nối thì cho down pod/node luôn thì trả 503, hay là sẽ retry khi redis khi có connect lại, hoặc 1 con monitor đứng riêng gọi lệnh client list của redis chẳng hạn
- Tùy vào kịch bản của mỗi service mỗi hệ thống thôi
- Về việc race condition thì có cách phòng chống: ví dụ như time_update của cái nào > cũ thì update
- Chủ yếu là cần phải biết vấn đề là gì để lường trước và phòng tránh
- Nếu chứng khoán bị đứng giá chẳng hạn thì set thêm ttl hoặc gọi fallback chẳng hạn? Gọi vào redis như code demo

**Q:** Bạn không làm theo kiểu transactional outbox thì retry bao nhiêu cũng có thể mất thôi chứ. Mà cái lease thì bạn dùng versioning hay last_update_at cũng không giải quyết được đâu. Vì là vấn đề khác hoàn toàn.

**Q:** Bên mình trước làm caching không dùng TTL nhé. Và hit rate đạt trên 99.5%. Nên mỗi khi sai lệch do thiếu event là client biết ngay.

**A:** Thế bác host ở đâu chứ AWS thì mình không nghĩ uptime của nó tệ thế. Và đây là local cache nếu dữ liệu có update thì nên có ttl. Và nếu mà để hiển thị kiểu chứng khoán thì mình sẽ không serving API mà sẽ dùng event, ví dụ như MQTT chẳng hạn.

**Q:** Bạn có dùng cache aside pattern ở đây không?

**Logic:**

1. Get từ cache
2. Nếu found thì dùng luôn
3. Nếu không found thì get ở DB hoặc đâu đó
4. Rồi set ngược lại giá trị vừa get

Nếu làm kiểu này thôi thì sẽ có race condition nhé. Kể cả trên memory hay dùng memcached/redis. Kể cả khi replication stream của bạn chạy ổn định (ví dụ như dùng CDC). Thì race condition sẽ chưa hết hoàn toàn. Nếu không có TTL thì stale data có thể ở đó vĩnh viễn.

**Race condition như sau:**

1. Bạn get vào cache, cache trả về not found
2. Bạn vào DB lấy data, DB trả về giá trị cũ v1
3. Giá trị trong DB được update lên giá trị mới v2
4. Replication stream của bạn set giá trị mới lên cache = v2
5. Tuy nhiên sau đó giá trị trên cache bị set ngược về v1 từ giá trị ở bước 2
   => Cache bạn stuck ở giá trị v1, trong khi DB ở v2

**A:** Bác nói đúng về vấn đề race condition. Tuy nhiên, trong implement thực tế của demo này, mình xử lý vấn đề đó dựa trên các yếu tố sau:

**Chấp nhận trade-off (CAP Theorem):**

- Hệ thống thiên về AP, chấp nhận Eventual Consistency
- Việc data bị lệch trong một khoảng thời gian ngắn là rủi ro đã được cân nhắc tới

**Cơ chế giảm thiểu:**

1. Dùng TTL ngắn cho các dữ liệu hay thay đổi -> không có chuyện "vĩnh viễn"
2. Kết hợp CQRS: Write Service hoặc các worker warm-up cache chịu trách nhiệm chính trong việc đẩy data mới nhất (v2) ra, giảm thiểu tần suất Read service phải tự đi vã cache -> từ đó giảm xác suất xuất hiện stale data

**Giải pháp:**

- Để triệt tiêu hoàn toàn 100% race condition này thì cần các kỹ thuật phức tạp hơn như versioning
- Với scope của bài toán hiện tại, đánh giá việc dùng TTL + CQRS là đủ để cân bằng giữa độ phức tạp và hiệu năng
- Redis còn có cơ chế SET NX -> cũng sẽ giảm thiểu stale data

**Q:** Mình đang nói cái phần in-memory của bạn cơ. Cái phần mà bạn wrap cache library của bên khác. Mình không thấy phần đó có truyền TTL vào? Mà mình nói rồi là versioning đơn giản không giải quyết được case race condition này đâu. Còn cái cách mà dùng TTL để tránh stale. Thì nó không được coi là eventual consistency. Với mình thì nó gọi là bounded staleness. Vì hệ thống dừng không có update mới và không có event mới mà vẫn bị sai data thì không coi là eventual consistency được.

**A:**

- Có thể là vì cái lib đó nó support cho nhiều loại quá nên chắc bác cũng không để ý hết được
- Phần implement local cache là gì thì có thể custom qua interface được
- Build-in thì có thể dùng LRU, LFU trong /examples có đủ đó
- TTL thì tùy theo case sẽ dùng -> như mình nói cache update thường xuyên thì sẽ dùng
- Ngoài ra bên write service sẽ có phần bắn invalidate event nếu có thay đổi -> trade-off sẽ là chấp nhận evict liên tục
- Versioning có xử lý được không thì mình sẽ code demo tại đây: [stale-data-prevention](https://github.com/huykn/distributed-cache/tree/develop/examples/stale-data-prevention) -> đây là phòng chống thôi chứ mình hiểu là nó vẫn có khả năng bị -> và nếu xác định thế thì có thể đẩy thêm TTL
- Tech stack và core concept này đã dùng cho prod thật 50m+ users, 1m+ rqs/s

### 10.5. Sharding và Routing

**Q:** Không thấy chủ thớt share đoạn routing để các request về đúng service chứa local cache thêm nhờ.

**A:** Mình thấy có vẻ như là không có sharding, pod nào cũng giữ tất.

**Q:** Vừa explore thử thấy như vậy. Do các bên khác khi volume data họ tăng lên bắt buộc phải thêm bài sharding + fine grain routing theo key-id nữa, chỗ này deploy cũng hóc phết.

**Q:** Điểm mạnh nhất của phương án này là local-first, có vẻ tác giả đã chấp nhận cái cost đi kèm khi chọn triển khai như vậy. Và nếu traffic rải đều ra nhiều key thì eviction (LFU/LRU) sẽ xảy ra liên tục -> local miss nhiều. Nếu làm routing nữa thì cũng phức tạp thêm kha khá, từ key distribution đến rebalancing.

**A:**

- Thấy đoạn sharding + routing + rebalance là khó nhất luôn. Cả về implement lẫn deployment
- Các bên khác họ vẫn xài cache bình thường, nếu muốn state of art caching có thể dùng memcached
- Latency không bao giờ bằng được search on-mem nhưng memcached đã được stress test trên nhiều system khác
- Tradeoff lớn nhất là tốn băng thông mạng nội bộ

**Q:** Tại sao phải local cache hở Xếp?

**A:** Cut down network latency từ service => cache luôn sir.

**Q:** Cách này đơn giản quá, không Excellent Engineering chút nào Xếp ơi.

### 10.6. API Gateway (APISIX)

**Q:** Bạn dùng APISIX à, có thể cho mình vài đánh giá cá nhân khi dùng nó không? So với nginx thì thế nào nhỉ?

**A:**

- APISIX bên mình dùng sẽ nhanh hơn thực tế 30% so với NGINX
- 304 thì phải tự quản lý

**Q:** Ah mình có google nhưng muốn nghe từ người thật việc thật á mà. Cám ơn feedback của bạn. APISIX viết trên java mà nhanh hơn nginx viết bằng C nhiều vậy cũng bất ngờ.

**A:**

- Chắc bác nhầm APISIX không phải bằng java đâu
- Java không phải lúc nào cũng chậm đâu, cỡ enterprise họ dùng java nhiều lắm
- Mà làm cái docker compose là cũng có thể benchmark được rồi

**Q:** Đúng rồi mình nhầm ngôn ngữ của APISIX.

### 10.7. Memory Management

**Q:** Tóm lại mọi request GET trả thẳng từ memory, chỉ fallback Redis lúc cache miss. Vậy memory phải lớn và kiểm soát được memory. Câu hỏi là hệ thống của bạn đang dùng chiến lược gì để quản lý memory?

**A:**

- Như demo thì sẽ set được limit số lượng item có trên RAM của pod/service
- Chiến lược thì tùy service sẽ có lựa chọn là LRU hay LFU
- Hoặc nếu đơn giản là cache 1 cái category nào đó thì chắc 100k items thì thôi dùng map build-in cũng được
- Code demo cho phép thích dùng loại nào cũng được

**Q:** Cuối cùng là cốt lõi vẫn là tận dụng Redis Pub/Sub cập nhật cache memory phải không shop?

**A:** Cơ bản thì đúng là vậy.

### 10.8. Pod Lifecycle và Thundering Herd

**Q:** Cho mình hỏi xíu là setup thế này thì khi pod read mới được scale up hay restart, local cache lúc này rỗng mà vô tình gặp bão request xong miss cache hàng loạt thì toang đúng không ạ? Bác có apply cơ chế nào để biết pod ready trước khi nhận traffic từ load balancer không? Với lại trong lúc đang pull Redis để sync cache mà lỡ có event update bắn lên thì thứ tự ưu tiên được xử lý như thế nào để không bị stale data ạ?

**A:**

- Thực tế triển khai có nhiều cách lắm
- Như bạn nói thì nó là thundering herd (tạm dịch: tiếng sét ái tình) thì golang nó có support cơ chế gọi là singleflight, các language khác cũng có ví dụ như synchronized func của java
- Khi 1 pod lên mà muốn đẩy cache vào thì bên mình sẽ chờ healthcheck của nó đến khi build xong thì mới đẩy traffic vào
- Một cách khác smart hơn là build 1 cái zhash scoring để xác định thứ cần thêm vào cache lúc start pod mới

**Q:** Này thì bên bạn dùng 1 redis hay 1 cụm redis? Redis không thực sự an toàn cho việc pub/sub, nó chỉ nên dùng khi dữ liệu của bạn không quá critical. Nếu dùng Redis kiểu này sao bạn không dùng mô hình Master - Slave của redis? Dữ liệu từ gateway có thể ghi trực tiếp vào Master, hoặc đẩy vào Kafka, sau đó Writer ghi vào Master và được Sync về Slave, các Reader chỉ cần đọc từ Slave, cũng không cần tự triển khai local cache trên nó.

**A:** Bác nói cũng đúng -> nhưng mà để nhanh được như demo thì không. Cái đang demo ở đây là ít tiền nhưng vẫn hit được 1m rqs/s.

**Q:** Dùng redis làm pubsub nếu traffic write tăng lên sẽ là bottleneck của hệ thống. Hai là chưa thấy nói tới cơ chế warmup cache khi init pod mới, với thời điểm peak có thể phải scale up đồng loạt thì sao? Tiếp nữa là data size của cache, nếu data size lớn keep toàn bộ trong các pod sẽ làm tăng cost lên nhiều khi scale, có warmup cũng mất thời gian, còn không sẽ đẩy ngược traffic về backup store là Redis, bản thân Redis cũng không hiệu quả với data size rất lớn cần phải sharding.

**A:**

- Bác nói đúng. Như post demo đang dùng cấu hình cho redis thấp single instance thôi
- Việc build cache smart sẽ phụ thuộc rất nhiều vào bài toán của mỗi service và không ai cache toàn bộ data lên cache đâu
- Ví dụ: bài post này được đưa đến bác thì ngay khi có notification thì cache của nó đã có sẵn để phục vụ bác rồi

### 10.9. IO-bound Reduction

**Q:** Mục số 2 loại bỏ cpu-bound, io-bound. Đại ca cho em hỏi là chỗ này giảm io bound nó ra sao ấy ạ?

**A:**

- Ví dụ đơn giản: bây giờ bạn tạo 1 API gọi vào redis xong trả về luôn thì nó cỡ <5ms đúng không?
- Nhưng khi benchmark khoảng 1k CCU chẳng hạn thì p99 của nó sẽ là ~50ms
- Tại sao lại có khác biệt này? Câu trả lời là do 1 phần IO-bound đấy
- Khi mà có quá nhiều request đang phải đợi response của redis mà cái luồng để xử lý của 1 con pod (instance node run API) lại bị hạn chế, ví dụ là chỉ xử lý được 200 còn 800 thì phải chờ
- Lưu ý: Redis vẫn rất nhanh, còn tài nguyên của pod thì lại hạn chế

### 10.10. Redis Pub/Sub Failure Handling

**Q:** Mình có 1 question là khi dùng cơ chế pub/sub của redis, trong trường hợp nếu redis có issue không thể pub event lên được, dẫn đến mất data và các pods khác không thể listen. Có cách nào khắc phục không?

**A:**

- Đầu producer không send được thì đâu có gì để nói
- Cái đáng nói là message đã send lên rồi mà lúc đó consumer pods nào đó không sẵn sàng để listen thì coi như bị loss message đó
- Để giải quyết thì có thể tham khảo Redis Stream

**Q:** Mình nghĩ là đã mất kết nối vs redis rồi thì cách nào cũng oẳng thôi. Nên fallback của nó là gì thì mình phải chuẩn bị sẽ hợp lý hơn. Ví dụ như trong demo của mình thì mình lại gọi ngược lại redis để lấy chẳng hạn.

**A:**

- Để mà nói thực tế khi chạy trên AWS thì bên mình cắm monitor uptime + cảnh báo nhưng rất ít bị
- Nó như mạng LAN rồi, nếu mà oẳng thì cái instance chứa redis đó nó oẳng thì:
  1. Nó bị đấm quá kinh
  2. Cái OS chứa nó bị auto restart update
- Tuy nhiên mình phải hiểu điểm yếu (trade-off) của nó là gì để chuẩn bị phương án:
  - Redis down thì pod/node chứa service API của bác cũng down theo thì không serving client nữa
  - Hoặc nếu vẫn serving thì sẽ retry connect lại redis sau 1s chẳng hạn
  - Hoặc nếu cache local không có thì gọi thêm vào redis để lấy ra

**Q:** Fallback của bạn cũng là 1 cách. Nhưng trong trường hợp redis không tèo hoàn toàn, mà đang ngáp ngáp thì sẽ sinh ra nhiều case khó hơn nhiều.

**A:**

- Nó là trade-off thôi, nếu bác không muốn nó ngáp ngáp thì lại phải chơi nhiều node rồi thì nó sẽ backup cho nhau
- Đánh đổi chỗ này là tiền bạc thôi
- Tuy nhiên hệ thống mình đang chạy 1m+ đấm/s và chạy trên AWS không có hiện tượng ngáp ngáp như bác nói nhé

### 10.11. Kiến trúc Tổng quan

**Flow:**

```
Người bán đăng sản phẩm
↓
Write Service
(chuyển data thành bytes)
↓
Redis Pub/Sub
(phát sóng cho tất cả)
↓
┌─────┬─────┬─────┐
│Pod 1│Pod 2│Pod 3│ ← Mỗi pod tự lưu vào RAM
└─────┴─────┴─────┘
↓
Người mua xem sản phẩm
(lấy thẳng từ RAM, không qua DB/Redis)
```

**Giải thích:**

- **Write Service:** Khi người bán đăng sản phẩm, Write Service sẽ serialize object thành bytes và publish event vào Redis Pub/Sub
- **Redis Pub/Sub:** Phát sóng event đến tất cả các Reader Pods
- **Reader Pods:** Mỗi pod nhận event và cập nhật local cache trong RAM của chính nó
- **Read Request:** Khi người mua xem sản phẩm, request được xử lý bởi Reader Pod, lấy data trực tiếp từ RAM (không qua DB/Redis)

**Fallback Mechanism:**

- Nếu trong RAM không có data (cache miss), fallback sẽ gọi vào Redis để lấy data
- Fallback này có khả năng dính **thundering herd** (nhiều request cùng miss cache và cùng gọi Redis)
- Giải pháp: Sử dụng **singleflight pattern** (trong Go) hoặc tương đương trong các ngôn ngữ khác (ví dụ: synchronized func trong Java) để đảm bảo chỉ có một request thực sự gọi Redis, các request khác sẽ chờ kết quả
