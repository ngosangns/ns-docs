---
area: technology
domain: backend
type: note
title: Heavy Write Voucher 1M Req S
description: 'Phát voucher 1M req/s: pre-distribute vào RAM, và Q&A comment về fraud, HA Redis, history'
timestamp: '2026-09-22T00:00:00.000Z'
tags:
  - technology
  - backend
  - system-design
  - distributed-cache
  - voucher
resource: https://www.facebook.com/groups/sydexa/posts/2257228024767400/
---

# Phát voucher 1M req/s: biến write trên hot path thành đọc RAM

> **Nguồn**: [1M Write/s: Kiến Trúc 5$/h deploy aws@sing](https://www.facebook.com/groups/sydexa/posts/2257228024767400/) — Khúc Ngọc Huy, Cộng Đồng System Design Việt Nam, 22/02/2026. POC: [heavy-write-api](https://github.com/huykn/distributed-cache/tree/main/examples/heavy-write-api/poc).
>
> Cùng mạch với [distributed cache cho heavy-read](/Technology/Backend-Database/Practices/Distributed Cache Tong Quan Va Kien Truc). Phần Q&A lấy từ toàn bộ comment đã bung (sort Newest, kể cả reply). Facebook đếm 45 comment; phần khen đã bỏ.

## Bài toán

Đêm giao thừa 2017–2018, phát voucher cho một sự kiện marketing. Ràng buộc tác giả đặt ra:

- 1M req/s trên 20 pod (50k req/s mỗi pod), khoảng 50 triệu user active
- `/spin` P99 dưới 5ms
- Mỗi voucher chỉ phát một lần
- Pod restart không mất state; pod chết được phát hiện và pod khác nhận range trong khoảng một phút
- Có lịch sử spin theo user

Báo giá Redis Cluster / DynamoDB / serverless mà team được nghe là khoảng 100k USD/tháng. Bản tác giả làm cho đêm đó được kể là khoảng 5 USD/giờ cho phần thêm: 20 pod + 1 worker trên Kubernetes, 1 Redis, 1 MySQL, region Singapore. Tác giả nói đây là bản “trẩu”, làm vì bị bỏ qua trong buổi sizing, và hôm nay sẽ chịu chi nhiều hơn để an toàn hơn. Code public là port từ Java sang Go, tác giả nói còn bug.

Số 5 USD/giờ là chi phí tác giả tự kê cho đúng cụm đó trong vài giờ sự kiện, không phải hóa đơn production đầy đủ (control plane, NAT, egress, multi-AZ, người trực).

## Ý đứng vững

Hot path không được phép ghi database. 1M lần ghi bền mỗi giây, mỗi lần một voucher, không phải bài toán của một Redis hay một MySQL. Cách làm là đảo workload trước giờ cao điểm:

1. Worker (một instance, không nằm trên hot path) đọc voucher từ MySQL, encode sẵn thành bytes, đóng gói, đẩy vào Redis, rồi phát từng pack vào channel riêng của từng pod.
2. Mỗi pod chỉ giữ một dải ID không giao nhau. Pod 0 giữ `[1, 500k]`, pod 1 giữ `[500001, 1M]`, các pod sau tính tiếp theo `podIndex`. Với 500k ID mỗi pod và 20 pod thì kho là 10M dòng, khớp README của POC. Không cần distributed lock để tránh hai pod phát cùng một mã, vì dải không chồng.
3. `/spin` chỉ làm `atomic.AddInt64` để lấy index kế tiếp rồi đọc `atomic.Value` đã nằm trong RAM. Index khác nhau nên hai goroutine không nhận cùng một slot. Hết dải của phút đó thì trả rỗng; client hiểu là chờ phút sau, không nhận 429.
4. Ghi lịch sử spin được gom trong RAM rồi flush hàng loạt. Áp lực Redis rơi từ một write mỗi spin xuống khoảng vài trăm write mỗi giây mỗi pod. Bài viết nói batch 1000; README nói flush mỗi giây hoặc mỗi 100 phần tử. Cả hai đều mô tả cùng một ý: không write-per-spin.
5. Redeem tách khỏi spin. `/spin` trả mã. Nếu mã được đánh dấu trúng, client gọi `/claim`. `/claim` mới kiểm tra Redis xem mã đã bị nhận chưa rồi ghi nhận. Đây là điểm eventual consistency, không phải bằng chứng mạnh ngay lúc spin.
6. Sống sót khi mất pod: pod ghi heartbeat khoảng mỗi 2 giây vào slot Redis cố định. Im lặng 10 giây thì worker đánh dấu chết. Pod mới nhận cùng index, đọc checkpoint (index phút, fragment, số đếm) từ Redis rồi phục vụ tiếp. Shutdown chủ động phải xả queue claim rồi mới lưu state. Comment của Dũng Nguyễn mô tả đúng flow này; comment của Sơn Hoàng đúng phần Redis: sentinel hoặc cluster cho HA của Redis, và sập cả một DC là bài toán khác.

Load balancer round-robin vẫn ổn nếu voucher là hàng fungible: user nào cũng có thể trúng mã của pod nào. Lịch sử theo user nằm ở Redis, không nằm ở pod.

## Cơ chế đáng giữ

**Pack ID, không phải Snowflake.** Tác giả gọi layout này là Snowflake vì liên tưởng tới bài Instagram Snowflake (2017). Layout thực tế là một số 64-bit tự đóng gói, encode Base36:

- bit 63: cờ trúng
- bit 31–62: voucher id, 32 bit, trỏ về khóa MySQL
- bit 0–30: PIN ngẫu nhiên, 31 bit

`DecodeBase36` rồi dịch bit cho biết mã có được sinh ra như một mã trúng hay không, không cần đọc MySQL cho riêng bước đó. Phép `(id >> 31) & 0xFFFFFFFF` lấy đúng 32 bit id và không kéo bit 63 vào, vì bit 63 sau khi dịch rơi ra ngoài mask 32 bit.

Cờ này không chứng minh mã chưa được claim, và không chống giả mạo. Ai sửa được bit 63 là tạo được một mã “trúng” về mặt bit. PIN 31 bit (khoảng 2 tỷ giá trị) không phải chữ ký. Ở 1M req/s, không gian này brute-force được nếu `/claim` không có giới hạn theo user và không đối chiếu mã với tập đã phát. Tính duy nhất thật sự nằm ở hai chỗ khác: dải ID không chồng cộng index atomic lúc phát, và bản ghi claim trên Redis lúc đổi thưởng.

**Mảng 60 phút thay cho map có TTL.** `MinuteStores[time.Now().Minute()]` tránh hash và allocation của `map`. Phút 59 quay về phút 0. Việc khó mà tác giả xác nhận đã tốn nhiều thời gian là chuyển voucher chưa phát của phút `now-1` sang phút tương lai và ghi lại các đoạn ID bị đứt (fragment) để còn restore. NTP lệch giữa các pod làm lệch bucket phút.

**Mutex không phải là thứ làm 50k req/s trở nên bất khả thi.** Critical section nếu chỉ là tăng một số thì mutex cũng chịu được 50k lần mỗi giây. Atomic vẫn đúng cho hot path này vì không có convoy và không giữ lock trong lúc trả HTTP. Câu “mutex khiến chỉ một goroutine được phục vụ tại một thời điểm” chỉ đúng trong lúc đang giữ lock, không đúng cho cả request.

## Chỗ không nên lấy nguyên

- Tiêu đề “1M write/s” là bài toán kinh doanh. Implementation cố ý không write trên `/spin`. So với đỉnh thanh toán khoảng 544k TPS của Alibaba 11.11 (OceanBase, giao dịch bền, có số dư) là so hai workload khác nhau. Comment nêu kỷ lục đó là lời nhắc đúng hướng: pop trong RAM không chứng minh một hệ thanh toán. Xem [OceanBase & Alibaba Single Day](/Technology/Backend-Database/Practices/Oceanbase Alibaba Single Day).
- “Zero I/O, zero serialization, GC gần như zero, CPU dưới 1ms” là mục tiêu của đoạn pop. HTTP vẫn allocate và vẫn có I/O mạng. README của POC ghi CPU phần atomic cộng parse khoảng 100ns, trong khi bài viết ghi CPU mỗi spin dưới 1ms và P99 dưới 5ms. Các số này là số tác giả đo trên POC, không phải biên bản tải của đêm giao thừa. Bài cũng nói production 2017–2018 chạy không downtime; đó là lời kể, code public là bản port sau này.
- Trần 1M req/s là trần của protocol: quá thì trả rỗng, client quay lại phút sau. README nói `/spin` scale tuyến tính theo số pod (50k mỗi pod) nếu chia lại dải và ngân sách. Thêm pod mà không chia lại kho và không nâng trần thì không tăng số mã phát ra. Hai câu này không mâu thuẫn nếu đọc trần 1M là quyết định sản phẩm, không phải giới hạn của `atomic.AddInt64`.
- Bộ nhớ. 10 phút × 1M req/s = 600M lượt spin; bài viết nói chỉ khoảng 1M mã là mã trúng, nên phải sinh khoảng 600M mã để pha loãng. README lại nói bảng MySQL 10M dòng và RAM hoạt động khoảng 1–6MB mỗi pod. 50k mã × 20 byte mới ra 1MB; 50k req/s trong một phút là 3 triệu mã, cỡ chục MB mỗi phút mỗi pod nếu giữ nguyên bytes. Không giữ 600M mã trong RAM cùng lúc: worker nhồi theo từng phút. Con số 6MB trong README không khớp với 50k req/s nếu giữ cả phút.
- Cửa sổ mất dữ liệu khi pod chết giữa chừng. Index và lịch sử chỉ bền theo nhịp checkpoint và bulk flush, không bền theo từng spin. Tác giả chốt mức mất: graceful shutdown thì pod mới đọc state đã backup, không đọc MySQL; nếu chết trước khi kịp save thì mất tối đa range worker đã giao mà pod chưa tiêu thụ hết, tức khoảng 1 phút, 50k item. `/claim` chỉ vá được mã đã tới Redis.
- Redis chết là hệ thống chết. POC công khai là một Redis. Bản 2018 tác giả kể với sếp không dùng sentinel: tách nhiều worker, mỗi worker một instance Redis, chết instance nào mất range đó, instance khác vẫn phát. Sentinel/cluster là góp ý của Sơn Hoàng, không phải thiết kế đã chạy.
- Gọi thiết kế này là AP trong CAP chỉ đúng một phần. `/spin` ưu tiên trả lời hơn là bền. `/claim` bám Redis. Không dùng mẫu này cho trừ tiền, giữ chỗ một suất duy nhất, hay bất kỳ sổ nào cần đúng một lần ngay lúc request.

## Q&A từ comment

### Một user lấy được nhiều mã

Nguyễn Anh Bình và Ngô Toàn hỏi cùng một lỗ: `/spin` chỉ `atomic.AddInt64` để pop, không đọc lại lịch sử, không biết user này đã spin chưa. Một user (hoặc một đống user giả) gọi liên tục sẽ hút hết khoảng 50k mã trúng mỗi phút của một pod. Qua round-robin, cùng một user chạm 20 pod thì nhận tới 20 mã.

Tác giả xác nhận hot path không chặn việc này. Rate limit kiểu sliding window đấm vào Redis ở 1M req/s buộc phải phóng hạ tầng. Cách đã dùng: coi request trên hot path không phải attacker, giữ counter trong RAM từng pod, gom batch đẩy Kafka, Apache Flink xử lý fraud, rồi thu voucher về pool để phát lại hoặc bỏ. Đây là trade-off, không phải cơ chế cho mọi kịch bản. Mã `/spin` đã trả mà chưa ghi được Redis thì client gọi `/claim` để kiểm lại.

Ngô Toàn hỏi tiếp: thu hồi theo batch vẫn để người khác bị rút mất mã, và sau khi recall thì index có phải lùi cho khớp số đã thu không. Tác giả không lùi index. Data và quyết định thuộc về phía phát: có thể bỏ phần thu hồi, hoặc gen pool mới không bị fragment rồi mở một đợt extended.

Hung Pham gợi ý dán user vào một pod ở load balancer bằng IP và HMAC. Tác giả không nhận cách này; ông trỏ về pipeline fraud ở comment của Bình.

### `CurrentIdx` khi traffic vượt 50k/pod

Bình chỉ ra `atomic.AddInt64` tăng index cả khi spin không phát được mã. 80k req/s trong 60 giây đẩy index lên 4.8M trong khi Total chỉ 3M, và lo counter trôi qua các phút làm pod mất voucher đến lúc restart.

Tác giả trả lời theo vận hành, không theo biến: số item pop được mỗi phút là cố định, request vượt thì trả rỗng để client thử phút sau, và nếu muốn an toàn thì tăng số pod lên 20+n chứ không giữ 20. Trong model của POC, mỗi phút một `MinuteStore` với `CurrentIdx` riêng; migration sang phút sau reset index của store đích. Index của phút này không đốt kho của phút sau. Điều Bình lo chỉ xảy ra nếu dùng một counter chung cho mọi phút. Bài và comment không nói production 2018 đã tách store theo phút theo đúng POC.

### Redis hoặc pod chết

GenuinePanda4255: đây là allocate trước rồi đọc RAM, đổi HA lấy tốc độ, và recovery mới là chỗ cần nói.

Tác giả: backbone là Redis, Redis sập thì hệ thống sập. Năm 2018 ông nói vậy, và nói hôm nay sẽ làm chắc hơn, tốn hơn. Ông từng thấy Redis chậm và timeout, chưa thấy Redis trên AWS chết hẳn; mất điện thì không còn gì để bàn. Với tải đã tính trong bài, ông cho rằng Redis không chết. Pod mới không vào MySQL lấy data: nó nhận state đã backup. Graceful shutdown giải quyết case thường. Đen nhất là freeze trước khi save, mất tối đa một phút đã deliver, khoảng 50k item. Lịch sử user có thể chậm; ông không đồng ý cách nói là history mất data.

Panda phản biện đúng giới hạn của cách đó: mỗi pod một range, pod chết thì range đó ngỏm đến khi pod mới lên, lâu hơn là đọc DB rồi ghi Redis; bật active-active cho 20 pod thì đỡ nhưng tốn tiền; history không bao giờ có integrity. Dũng Nguyễn mô tả đúng POC: checkpoint Redis, worker healthcheck, mark dead, pod mới load state. Sơn Hoàng: HA Redis thì sentinel hoặc cluster, vẫn đổi độ bền lấy tốc độ, sập cả một datacenter là chuyện khác. Tác giả nhắc lại câu trả lời năm 2018 cho sếp: không sentinel, mà nhiều worker mỗi con một Redis. Chết một instance chỉ mất range của instance đó.

### Lịch sử user làm P99

Sơn Hoàng: latency trung bình giảm, nhưng P99 dính Redis và dễ burst khi flush đồng loạt theo nhịp thời gian. Phát token không khó; lấy lịch sử mới khó vì số key theo user rất lớn.

Tác giả chấp nhận history bị trễ. Hot path là spin, history ít request. Các event cố kéo dài kịch bản để throttle client. Key history là một `MSET` theo user; cần thứ tự thì dùng sorted set.

### Preload nằm ở RAM của pod, không phải Redis

Joseph Nguyen hỏi preload có phải vào Redis trước không, warm-up mất bao lâu, và pod chết thì sao.

Tác giả: giải pháp là nhiều phần cộng lại, preload là vào RAM trên từng pod. Pod chết thì map về phút đó trong không quá 60 giây. Ông không đưa số phút warm-up.

### Auth và phần thưởng tính trước

ThrillingSeahorse5597 hỏi auth có phải scale theo tải này không, và reward có được tính sẵn để user chỉ lấy kết quả không.

Tác giả: cả hai đều có. Auth ở tầng này là một bài toán riêng, ông không giải trong post. Reward thì đúng là tính trước, user chỉ nhận kết quả đã nằm sẵn.

### 544k TPS và số liệu

Một comment đem đỉnh khoảng 544k TPS của Alipay/Alibaba 11.11 ra so. Tác giả chỉ nói bản chất hai bên khác nhau. Xem [OceanBase và Alibaba Single Day](/Technology/Backend-Database/Practices/Oceanbase Alibaba Single Day): 544k đó là giao dịch bền có số dư, không phải một lần pop trong RAM.

Vo Minh Luan đòi trace theo URI, req theo thời gian, p95/p99 thì mới tin. Tác giả nói ông đang chia sẻ, không chứng minh; code POC là public. Số 1M req/s và P99 trong bài vì vậy vẫn là số của tác giả, không có dashboard kèm theo.

Câu hỏi “race condition ở đoạn nào” thì tác giả không giải thích. Chỗ đua thật sự không nằm ở `atomic.AddInt64` (mỗi goroutine một index). Nó nằm ở khoảng giữa lúc đã trả mã và lúc batch tới Redis, và ở việc không có khóa theo user trên hot path.

## Khi nào mang ra dùng

Dùng khi hàng phát ra được sinh trước, từng mã phát đúng một lần, trả lời trong vài mili-giây quan trọng hơn việc sổ cái cập nhật trong cùng request, và client chịu được “hết hàng, thử phút sau”.

Không dùng khi mỗi request là một giao dịch không thể phát lại, khi mã phải không đoán được, hoặc khi mất một pod không được phép phát lại mã đã đưa cho user. Những case đó cần conditional write bền trên đường claim (một `SET` chỉ thành công nếu chưa có), và hot path chỉ được phép trả mã sau khi bản ghi đó tồn tại. Bản 5 USD/giờ cố ý không làm bước đó trên `/spin`.
