---
area: technology
domain: system-design
topic: system-design
type: note
title: Kafka DLQ Va Retry
description: "DLQ và retry cho Kafka consumer: lỗi nào được retry, delay nằm ở đâu, khi nào replay, khi nào bỏ"
timestamp: "2026-09-22T00:00:00.000Z"
tags:
  - technology
  - system-design
  - kafka
  - dlq
  - retry
resource: https://www.facebook.com/groups/golang.org.vn/posts/4197137210508787/
---

# Kafka DLQ và retry

> **Nguồn**: [Golang Vietnam, 10/04/2026](https://www.facebook.com/groups/golang.org.vn/posts/4197137210508787/). Người hỏi đăng ẩn danh. Thread có 29 comment; phần dưới chỉ giữ comment kỹ thuật. Comment khen và comment chỉ ghi "chấm" được bỏ.
>
> Cùng mạch backoff với [Retry và circuit breaker](/Technology/System-Design/Practices/Retry Va Circuit Breaker).

Kafka không có DLQ sẵn cho consumer thường. Ứng dụng tự **copy** record sang một topic khác (cộng đồng Kafka hay gọi dead letter topic, DLT), rồi commit offset ở topic gốc. Record không bị "chuyển đi". Nếu publish sang DLQ thất bại mà offset đã commit, record biến mất. Commit đứng sau lần ghi bền sang DLQ hoặc sang chỗ cất.

## Câu hỏi trong thread

Consumer gặp message không xử lý được thì đẩy vào DLQ. Sau đó làm gì? Retry bao nhiêu lần, backoff thế nào, dùng retry topic hay cách khác?

Người hỏi bổ sung hệ thống của họ: lỗi chủ yếu là mất kết nối database, lỗi registry, và hết connection pool. Họ retry trong memory một số lần, rồi đẩy DLQ, và chưa có gì đọc DLQ. Đây là event tracking, khoảng 100.000 message/giờ (trung bình khoảng 28 message/giây). Event cũ có thể hết giá trị. Họ còn kẹt thứ tự message.

## Lỗi nào được retry

Tách trước khi đếm lần thử:

- Lỗi tạm: timeout, connection refused, pool cạn, registry chớp nhoáng. Những cái này hết khi downstream hồi. Retry có ngân sách.
- Lỗi đứng yên: sai schema, sai validation, sai nghiệp vụ (số tiền không hợp lệ, payload không parse được vì bug). Retry nguyên văn sẽ fail cùng một cách.

Tùng Nguyễn gọi nhóm thứ hai là skip queue: bỏ khỏi đường chính, để lại để xem vì sao lỗi. Bytes của message phải còn. Xóa luôn thì hôm sau sửa parser cũng không có gì để chạy lại.

Cong Nguyen dán một câu trả lời ghi rõ "opus trả lời". Phần đứng được của bản đó: deserialization và validation đi DLQ ngay; timeout và connection refused mới retry; header của record DLQ giữ topic gốc, partition, offset, lý do lỗi, số lần retry, timestamp. Con số "3–5 lần, exponential backoff kèm jitter" là một ngân sách hay dùng, không phải hằng số của Kafka. Bản đó cũng kể tên client Go (Sarama, kafka-go, confluent-kafka-go) phải tự viết đường này; Spring Kafka có sẵn retry topic và dead-letter publisher.

## Delay không nằm trong vòng poll của consumer chính

Kafka không hẹn giờ từng message. Muốn chờ 1s, 30s, 5 phút thì publish sang retry topic (một topic cho mỗi bậc, hoặc một topic kèm thời điểm được xử lý) và commit offset gốc để consumer chính đi tiếp.

Bản Opus bảo retry consumer kiểm tra timestamp rồi `pause`/`sleep` đến giờ. `sleep` trong vòng poll giữ cả partition: mọi record phía sau trên partition đó đứng theo, kể cả record khỏe. Với thứ tự theo key (ordered → shipped → delivered), một message kẹt chặn các bước sau của đúng key đó. Cách giữ delay mà không chặn đường chính là consumer của retry topic, hoặc một scheduler, đọc đúng bậc delay của nó.

Ba lần retry ngay trong process (Nguyễn Trung với callback loa báo tiền; Phúc Mars sau khi nhặt message vào queue nội bộ) chỉ sống đến khi process còn. Process chết sau khi đã commit offset thì lần retry trong RAM mất. Ngân sách đó hợp lệ cho lỗi chớp trong một lần xử lý; lần thử sau restart phải đọc lại từ Kafka hoặc từ DLQ.

## Replay là một quyết định

Nguyễn Trung (ngân hàng, callback loa đọc số tiền): fail 3 lần trên luồng chính thì vào DLQ. Job 15 phút healthcheck callback, khỏe thì consume hết DLQ và bắn tiếp. Healthcheck chỉ đúng với lớp "callback đang chết". 4xx, payload quá to, field sai sẽ fail lại y nguyên. Gắn lớp lỗi vào header rồi chỉ tự replay lớp outage.

Cùng ví dụ loa: callback chết ban ngày, sống lại ban đêm, job xả DLQ thì loa réo giữa đêm. Side effect người dùng nhìn thấy thì replay trễ là một bug sản phẩm. Với case đó, ghi lại và đưa người vận hành một màn hình. Event tracking hết hạn thì bỏ event cũ, không replay đến cùng.

Tự động đẩy DLQ về topic chính rồi fail lại thành DLQ là retry storm. Nguyễn Trung mô tả giả định "chỉ khoảng 5% lỗi" đổ vào ngày tỷ lệ lên 90%: mỗi vòng replay nhân tải lên đúng thứ đang chết. Hết ngân sách thì dừng. Nhiều message trong DLQ là dấu hệ thống phát lỗi đang bệnh, không phải dấu hiệu consumer DLQ cần chạy nhanh hơn.

Phúc Mars: admin quyết định có retry hay không, và nếu có thì sang một retry topic riêng. Đường của họ là consume xong đẩy vào channel trong process, gom batch, retry 3 lần, rồi DLQ. Điểm cần chốt trong thiết kế đó là thời điểm commit offset: commit sau khi batch đã nằm ở chỗ bền.

## Thứ tự

Trạng thái một đơn (ordered, shipped, delivered) đi chung key. Bỏ một message ở giữa và cho message sau đi tiếp thì trạng thái sai. Tùng Nguyễn nói có thể skip message trong DLQ khi cần đúng thứ tự. Cái giá là mất một bước chuyển trạng thái. Hai cách còn message: giữ đúng key đó cho đến khi vá được lỗ hổng, hoặc đưa riêng key đó sang đường chờ. Giữ cả partition chỉ đáng khi một partition là một key.

## Backpressure và semantics

Duc Anh Nguyen, reply dưới bản Opus: khi app hoặc database nghẽn thì giảm batch, hệ thống ổn thì tăng lại. Việc này che downstream chậm (đúng với pool cạn và database chết mà người hỏi đang gặp). Nó không phân loại poison message. Circuit dừng consume cho đến khi pool hồi còn đỡ hơn là bắn 100.000 message/giờ vào một pool đã hết.

Cùng reply nhắc at-least-once và exactly-once. Consumer Kafka mặc định là at-least-once: xử lý xong mới commit, crash giữa chừng thì đọc lại. Exactly-once là producer transactional cộng consumer `read_committed` trên đường consume-transform-produce, không phải một cờ tên "exactly one". Replay callback loa có thể báo hai lần. Replay event đếm có thể đếm hai lần. Handler và đường replay phải idempotent theo đúng nghiệp vụ đó.

## Khi chưa có đề bài

Nguyễn Trung: chưa có quy tắc nghiệp vụ thì cất vào một DB tra theo key, giữ vài ngày, chưa cần retention dài và chưa cần logic replay. Đó là chỗ đậu, chưa phải thiết kế retry. DLQ vẫn là một kho: retention, ACL, và một envelope chung (tên service, protocol, mã lỗi, id) để nhiều team đọc được. Payload lớn hoặc nhạy cảm nằm ở DLQ có kiểm soát hơn là trải nguyên body ra log.

## Việc làm với case của người hỏi

Lỗi database, registry, pool: retry có backoff và có trần, giảm batch khi pool cạn, commit chỉ sau khi đã xử lý xong hoặc đã ghi DLQ bền. Event tracking hết hạn: bỏ, không đưa vào vòng replay. Message lệch thứ tự theo key: cô lập key, không skip rồi xử lý bước sau. DLQ cần một chỗ đọc (cảnh báo độ sâu, xem header, replay tay hoặc bỏ), nếu không thì đó chỉ là chỗ record rơi xuống và nằm im.
