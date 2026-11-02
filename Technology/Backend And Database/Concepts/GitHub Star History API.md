---
area: technology
domain: api-design
type: case-study
title: GitHub Star History API
description: GitHub thay endpoint liệt kê stargazers bằng endpoint trả tối đa 30 tuần đếm sao theo ngày, lọc dải created_at trước khi group; bài học chính là response nhỏ hơn không có nghĩa query rẻ hơn.
timestamp: "2026-11-02T00:00:00.000Z"
tags:
  - technology
  - api-design
  - database
  - privacy
  - github
resource: https://x.com/github/status/2110490847905272314
---

# GitHub Star History API

Bài của GitHub trên X ngày 02/11/2026, [From 2,500 requests to 24: Rebuilding star history without the stargazers](https://x.com/github/status/2110490847905272314) (7 phút đọc, Taylor Cuilty & Sarita Iyer), kể lại việc thay API stargazers bằng một endpoint aggregate. Đối chiếu với [REST docs — starring](https://docs.github.com/en/rest/activity/starring#get-repository-star-history) và [changelog 30/06/2026](https://github.blog/changelog/2026-06-30-upcoming-access-restrictions-to-public-api-endpoints-and-ui-views/); gọi thử endpoint công khai trên `superdesigndev/treg` lúc 02/11/2026 07:07 UTC. Không đọc được source GitHub (closed source), không tái lập các số đo hiệu năng.

## Vấn đề

Công cụ vẽ star history (Star History, star-history.com) cần **đường cong** sao theo thời gian, nhưng API cũ `GET /repos/{owner}/{repo}/stargazers` chỉ trả danh sách người đã star, tối đa 100 người/trang, kèm `starred_at` nếu xin media type `application/vnd.github.star+json`. Muốn dựng đường cong thì phải lật hết các trang, giữ timestamp và bỏ identity. Với `react/react` (~251.000 sao) việc đó tốn khoảng **2.511 request** — đủ để đụng rate limit hoặc phải sample.

Hai vấn đề đi kèm:

- **Privacy:** danh sách stargazers công khai cho phép gom hàng loạt identity để spam/phishing.
- **Database:** do một lỗi trong pagination, mỗi request không chỉ lấy một trang mà còn **đếm toàn bộ sao hiện có** để tính số trang. Tuần trước khi chặn quyền truy cập có gần **37.000 count query chậm** được ghi log, trung bình gần **3 giây**, hơn **1.000** bị safeguard kill, góp phần gây timeout. Sau khi chặn, request stargazer giảm khoảng **60%** và tổng thời gian chạy count query giảm khoảng **80%**.

## Thay đổi

Changelog 30/06/2026 báo trước việc siết quyền; từ tháng 7/2026 danh sách stargazers/watchers chỉ còn admin và collaborator, người khác nhận mảng rỗng hoặc 403. Để không mất use case chính đáng, GitHub thêm endpoint aggregate:

```
GET /repos/{owner}/{repo}/stargazers/history
```

- Trả tối đa **30 tuần** mỗi request (`per_page` max 30, `page` max 100), **không có identity**.
- Mỗi phần tử: `week` (Unix timestamp đầu tuần, Chủ nhật), `total` (số sao trong tuần), `days` (7 số nguyên, bắt đầu từ Chủ nhật).
- Tuần mới nhất trước; tăng `page` là lùi về quá khứ; tuần không có sao vẫn xuất hiện với count 0. Docs ghi rõ biên tuần/ngày **không bảo đảm trùng UTC**.
- Với `page` tối đa 100 và 30 tuần/trang, trần lý thuyết là 3.000 tuần (~57 năm), quá đủ cho repo GitHub.

Response thật, `per_page=2` trên `superdesigndev/treg`, HTTP 200 không cần auth:

```json
[
  { "week": 1793491200, "total": 85, "days": [85, 0, 0, 0, 0, 0, 0] },
  { "week": 1792886400, "total": 865, "days": [29, 227, 124, 47, 37, 253, 148] }
]
```

`1793491200` = 2026-11-01T00:00:00Z, `1792886400` = 2026-10-25T00:00:00Z; `total` đúng bằng tổng `days`. Header có `Link` tới `page=2` và `page=9` (repo tạo 15/07/2026 nên ~9 trang với 2 tuần/trang), `Cache-Control: public, max-age=60`; rate limit ẩn danh 60 request/giờ.

## Cách làm

Điểm cốt lõi: **lọc theo thời gian trước, group sau**. Mỗi request dịch `page`/`per_page` thành một dải `created_at` có index, lọc sao trong đúng các tuần đó rồi mới group thành count theo ngày.

```
indexed date range -> group rows in range -> daily buckets -> response
```

Ngược với kiểu aggregate ngây thơ:

```
all matching stars -> bucket every row -> sort every bucket -> OFFSET/LIMIT -> response
```

## Hai hướng đã cân nhắc và loại

1. **Giữ event, bỏ identity** — trả `starred_at` mà không trả user. Ít thay đổi serialization/authorization nhất, nhưng consumer vẫn phải phân trang và xử lý hàng nghìn record, và vẫn dính vào endpoint thiết kế để liệt kê người.
2. **Aggregate rồi mới phân trang** — group theo ngày/tuần rồi `LIMIT`/`OFFSET`. Nhưng SQL group và sort **toàn bộ** sao trước khi áp `LIMIT`; response nhỏ hơn nhưng công việc database đã làm không giảm. Với `react/react`, đọc full history kiểu này là khoảng **6 triệu row** vì cả 24 request đều quét lại toàn bộ sao.

## Đánh đổi còn lại

- Trong một tuần, số sao không bị giới hạn, nên tuần đặc biệt dày vẫn có thể chậm/đắt; đây là giới hạn scale còn lại.
- Mô hình `star` là **tập người đang star**, không phải event log: ai bỏ star thì record biến mất, nên lịch sử không phản ánh các star đã bị gỡ.
- Biên tuần/ngày theo lịch, không cam kết UTC; tuần trống trả 0.
- Nhân dịp này GitHub sửa luôn trang stargazers trên github.com sang dùng count cache: query chậm từ mức hàng trăm/tuần xuống 0, và áp dụng tương tự cho các endpoint stargazer khác.

## Bài học

1. **Response nhỏ hơn không có nghĩa query rẻ hơn.** `LIMIT`/`OFFSET` giảm số kết quả trả về, không giảm group/sort mà database đã làm; phải nhìn thứ tự công việc.
2. **Bắt đầu từ việc người dùng thực sự muốn làm.** Maintainer cần so sánh xu hướng; danh sách identity chỉ là cách endpoint cũ vô tình cung cấp dữ liệu.
3. **Chỉ trả đúng thứ use case cần.** Phần dư ra là dữ liệu có thể bị lạm dụng; bỏ identity không làm mất thông tin maintainer cần.
4. **Nói rõ đánh đổi còn lại.** Biên lịch, star bị gỡ, tuần quá dày — tất cả là một phần của API contract.

## Chưa kiểm

Không tái lập 2.511 request, 6 triệu row, 37.000 query chậm, 3 giây, 1.000 query bị kill, mức giảm 60%/80%. Chỉ gọi endpoint history một lần với repo nhỏ; chưa thử repo rất lớn, repo private, org, hay hành vi rate limit khi có token. Chưa đọc toàn văn changelog, chỉ đọc phần được bài viết và docs dẫn lại.

> **See also:** [SQL Optimization](/Technology/Backend And Database/Concepts/Core Concepts/SQL Optimization) · [Caching](/Technology/Backend And Database/Concepts/Caching)
