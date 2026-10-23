---
area: technology
domain: devops
type: tool
title: Bugsink
description: Bugsink (bugsink/bugsink, Python/Django) là error tracker tự host nhận sự kiện lỗi từ Sentry SDK. Repo tạo 21/08/2024, bản 2.6.2 ngày 22/10/2026, 2145 sao lúc kiểm tra 23/10/2026. Giấy phép phần chính là PolyForm Shield 1.0.0, PolyForm tự mô tả không phải open source, và GitHub API ghi SPDX NOASSERTION.
timestamp: "2026-10-23T00:00:00.000Z"
tags:
  - technology
  - devops
  - error-tracking
  - self-hosted
  - sentry
resource: https://github.com/bugsink/bugsink
---

# Bugsink

[Bugsink](https://github.com/bugsink/bugsink) ([bugsink.com](https://www.bugsink.com/)) là error tracker tự host. Mô tả repo trên GitHub API và dòng đầu README là "Self-hosted Error Tracking". Ứng dụng là Django. `pyproject.toml` ghi tác giả Bugsink B.V., `info@bugsink.com`. Hồ sơ GitHub của `vanschelven` ghi tên Klaas van Schelven, bio "bugsink.com founder", location Utrecht, The Netherlands. Org GitHub `bugsink` tạo 2023-11-13T20:14:38Z.

Đối chiếu ngày 23/10/2026. Đã đọc README, `LICENSE`, `ee/LICENSE`, `sentry/LICENSE`, `CHANGELOG.md` (đầu bản 2.6.2 và đuôi file), `SECURITY.md`, `AGENTS.md`, `CONTRIBUTING.md`, `CLA.md`, `pyproject.toml`, `requirements.txt`, `Dockerfile`, `docker-compose-sample.yaml`, `bugsink/app_settings.py`, template Docker, `bsmain/management/commands/prestart.py`, `phonehome/tasks.py`, `phonehome/models.py`, `phonehome/utils.py`, `snappea/settings.py`, và đầu `ee/tenants/base.py`. Đã gọi GitHub API (repo, license, release, ngôn ngữ, contributor, search issue), JSON PyPI, API Docker Hub, và các trang bugsink.com liệt kê ở dưới. Clone nông `main` tại `2cb581ee50d873751c10d2ee31718ae091c32ed6` (2026-10-22 21:08:32 +0200) để đọc mã. Không cài package, không chạy Docker, không gửi event, không đo tải.

|             |                                                                                                                                                                                                                                                      |
| ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Tạo repo    | 2024-08-21T06:19:56Z. Push cuối 2026-10-22T19:08:33Z                                                                                                                                                                                                 |
| GitHub      | 2145 sao, 144 fork. `open_issues_count` là 133. Search API cùng lúc: 116 issue mở, 17 pull request mở                                                                                                                                                |
| Ngôn ngữ    | Python theo GitHub API. Byte: Python 2.408.136, HTML 397.939, JavaScript 18.468, CSS 18.041, Shell 6.606, Dockerfile 3.516                                                                                                                           |
| Contributor | `vanschelven` 2386 trên trang contributor API. `AGENTS.md` nói một người bảo trì                                                                                                                                                                     |
| Release     | 2.6.2, đăng 2026-10-22T12:09:01Z. Trước đó 2.6.1 ngày 25/09/2026                                                                                                                                                                                     |
| PyPI        | `bugsink` 2.6.2, `requires_python` `>=3.11`, wheel tải lên 2026-10-22T12:08:17Z. Classifier 3.11, 3.12, 3.13, 3.14. File 0.0.1 trên registry là 2024-02-21, summary "Dead Simple Error Monitoring", `requires_python` `>=3.7`. Mình chưa mở sdist đó |
| Docker Hub  | `bugsink/bugsink`, `pull_count` 563095, đăng ký 2024-10-02. Tag `2.6.2`, `2.6`, `2` và `latest` cập nhật 2026-10-22 khoảng 12:31 UTC. `full_size` của `2.6.2` là 82259456                                                                            |
| License API | `Other`, SPDX `NOASSERTION`, path `LICENSE`                                                                                                                                                                                                          |
| Trang       | https://www.bugsink.com/ . Docs: https://www.bugsink.com/docs/                                                                                                                                                                                       |

## Tự host

README và [installation](https://www.bugsink.com/docs/installation/) đưa Docker làm lối thử nhanh: `docker pull bugsink/bugsink:latest` rồi `docker run` với `SECRET_KEY`, `CREATE_SUPERUSER` và `PORT`. Trang đó còn bốn lối: Docker, Docker Compose, virtualenv, và [single server](https://www.bugsink.com/docs/single-server-production/) (Ubuntu 24.04 trong hướng dẫn, Nginx, Gunicorn, Snappea). Cùng trang liệt kê manifest Kubernetes và Helm do người dùng đóng góp, kèm one-click trên Coolify, CapRover, Dokploy, Dokku, Railway, Kubero, PikaPods, Octabyte, Kamal, Sliplane. Mình không mở các template đó. Vault đã có Coolify và Dokploy trong [DevOps Tools](/Technology/Cloud And DevOps/Tools/DevOps Tools).

`Dockerfile` trên `main` đặt `ARG PYTHON_VERSION=3.12`, cài `mysqlclient` và `psycopg[binary]`, user `bugsink` uid 14237, healthcheck `GET /health/ready`. `CMD` chạy `monofy` để giữ cùng một container: `bugsink-manage check --deploy --fail-level WARNING`, migrate database `snappea`, migrate database chính, `prestart`, Gunicorn, và `bugsink-runsnappea`. Changelog 2.6.2 nói người dùng Docker không cần Python trên máy host.

Python của package và của docs không cùng một câu:

- `pyproject.toml` và PyPI 2.6.2: `>=3.11`. Changelog 2.6.2: Python 3.10 không còn được hỗ trợ.
- `AGENTS.md`: môi trường chuẩn là Python 3.12. `CONTRIBUTING.md`: 3.11, 3.12, 3.13 hoặc 3.14.
- Trang single server, đoạn mình đọc ngày 23/10/2026, vẫn ghi "Python 3.8 or later". Trang virtualenv không ghi số phiên bản.

Database, theo [settings](https://www.bugsink.com/docs/settings/) và [built to self-host](https://www.bugsink.com/built-to-self-host/): SQLite là mặc định và được gọi là production-ready. MySQL và PostgreSQL là lựa chọn khi đã có sẵn, cấu hình bằng `DATABASE_URL` (`mysql://` hoặc `postgresql://`). Snappea dùng database riêng. Template Docker để file hàng đợi ở `/tmp/snappea.sqlite3`, và SQLite của app ở `DATABASE_PATH` hoặc `/data/db.sqlite3` khi không có `DATABASE_URL`.

Ba chỗ nói PostgreSQL khác nhau. Trang [PostgreSQL](https://www.bugsink.com/docs/postgresql/) mô tả URL và `psycopg` bản 3 trở lên. Trang [Docker install](https://www.bugsink.com/docs/docker-install/) nói có thể dùng PostgreSQL, setup chưa được test nhiều, và trỏ một issue GitHub. Mình chưa mở issue đó. Trang [Docker Compose](https://www.bugsink.com/docs/docker-compose-install/) nói Compose để chạy kèm MySQL. `docker-compose-sample.yaml` trên `main` lại dùng image `postgres:17-alpine`.

Trang Docker install khuyên SQLite trong container chỉ cho bản thử rồi xóa: volume Docker không đủ bảo đảm cho SQLite ở WAL, là mode Bugsink dùng. Settings nói SQLite là database production-ready khi không container hóa. Mình không chạy cả hai kiểu.

Snappea là tiến trình nền. Bài rút gọn self-host nói họ bỏ Celery, Redis và RabbitMQ. `CONTRIBUTING.md` nói viết task bằng `@shared_task`, gọi `.delay()`, và `delay_on_commit` khi task cần dữ liệu đã commit. Bài [Snappea](https://www.bugsink.com/blog/snappea-design/) của tác giả nói hàng đợi là bảng SQLite, một Foreman tách khỏi Gunicorn, WAL, và Foreman phải cùng máy với process enqueue vì database không để trên network filesystem. Bài [rút gọn self-host](https://www.bugsink.com/installation-simplification-journey/) nói không retry: lỗi thì ghi log và không chạy lại task đó. Mình đọc `snappea/settings.py`, chưa đọc hết `foreman.py`. Trong file settings, `TASK_ALWAYS_EAGER` mặc định false, `NUM_WORKERS` mặc định 4, Docker template ghim eager false, `WORKAHOLIC` true, `SNAPPEA_NUM_WORKERS` mặc định 2. Comment trong settings giải thích workaholic: container một image, hàng đợi SQLite nằm trong container, nên khi nhận TERM thì Foreman cố xử lý hết task đang có trước khi bị kill.

Bài [kiến trúc một writer](https://www.bugsink.com/blog/database-transactions/) nói model giao dịch bám SQLite: một writer, đọc theo snapshot, WAL bật từ migration đầu. `AGENTS.md` nhắc lại: không có write concurrency.

Số máy là chữ của tác giả. Trang [scalable](https://www.bugsink.com/scalable-and-reliable/) nói một VPS 5 đô la một tháng, 2 vCPU, 4 GB RAM, chịu 18 event mỗi giây, mỗi event 50 KB, tương đương 1,5 triệu event một ngày và 46 triệu một tháng. Mình không đo. Hướng dẫn single server đặt Gunicorn `--workers=10` và nói mỗi worker xa dưới 100 MiB nên vừa máy 2 GiB, và khuyên giữ dưới 50% RAM. Đó cũng là chữ của hướng dẫn.

Code có trần nhận event, tách khỏi câu "volume based on hardware" ở mục self-hosted trên trang chủ. `bugsink/app_settings.py` và template Docker mặc định, mỗi project và cả site: 1.000 event mỗi 5 phút, 5.000 mỗi giờ, 1.000.000 mỗi tháng. Biến môi trường cùng tên ghi đè được. Comment trong file nói các số đó là khoảng 6%, 2,7% và 0,8% của 50 event mỗi giây mà tác giả đo trên phần cứng thấp. `development.py` nâng các trần này lên rất cao. Mình không gửi traffic nên không thấy HTTP 429. Trang [rate limits](https://www.bugsink.com/docs/ingestion-rate-limits-and-retention/) nói trần theo project, vượt thì 429, client thường lùi 60 giây. Trần retention theo số event và theo tuổi (`MAX_EVENT_AGE_DAYS` và các `MAX_RETENTION_*`) mặc định `None`, comment ghi là không giới hạn.

## Sentry SDK

Trang [Sentry-SDK compatible](https://www.bugsink.com/sentry-sdk-compatible/) nói SDK chính thức và SDK cộng đồng của Sentry, giấy phép MIT, gửi JSON mà Bugsink nhận. Việc chuyển, theo trang đó, là đổi DSN. Trang gọi đây là tương thích với SDK, và nói đã thấy chạy ổn với JavaScript, Python và PHP. Cùng trang nói vẫn có edge case, và trỏ [issue 205](https://github.com/bugsink/bugsink/issues/205) cho chỗ source context khác nhau theo ngôn ngữ. Mình chưa đọc issue 205 và chưa gửi event từ SDK nào.

Giới hạn mà docs tự ghi, trang [SDK recommendations](https://www.bugsink.com/docs/sdk-recommendations/): Bugsink chỉ nhận error event, không nhận metrics, traces hay loại event khác. `traces_sample_rate=0` là mặc định họ khuyên. `send_default_pii=True` là khuyến nghị của họ cho bản tự host, vì dữ liệu ở máy mình. Trang đó nói UI Bugsink khi cấu hình SDK đã đặt các giá trị này. Mình không mở một project trên UI.

API, trang [API guide](https://www.bugsink.com/docs/api/): tích hợp mới dùng `/api/canonical/0/`. `/api/0/` và `/api/<project-id>/` là mặt tương thích Sentry, gồm ingest và upload debug file. Token từ 2.6.0 có capability. Event từ SDK vẫn dùng DSN. Changelog 2.6.2 nói minidump vẫn experimental và cần `FEATURE_MINIDUMPS`. Template Docker và `app_settings.py` mặc định cờ này false. Comment trong settings gọi minidump là dễ bị dùng để làm đầy bộ nhớ.

`requirements.txt` ghim `sentry-sdk==2.*` cho chính Bugsink, `Django==5.2.*`, `gunicorn==26.2.*`, `symbolic==8.7.2` với comment "the last version to support ProcessState".

## Bảo mật lúc cài

`SECRET_KEY` trên docs phải là chuỗi ngẫu nhiên, ít nhất 50 ký tự. README để placeholder và cũng nói ít nhất 50 ký tự. Template Docker ghi check này nằm trong `bugsink-manage check --deploy`. `CMD` của image chạy check đó với `--fail-level WARNING`. `SILENCED_SYSTEM_CHECKS` trong settings mặc định tắt `security.W003`, `W004`, `W008`. Khi không đứng sau HTTPS, template Docker tắt thêm `W012` và `W016`. `security.W009` không nằm trong danh sách tắt. `docker-compose-sample.yaml` để một `SECRET_KEY` có tiền tố `django-insecure-` và comment bảo đổi, bỏ tiền tố đó. Mình không chạy container nên không thấy process có dừng vì warning này hay không. Các trang docs công khai còn nhúng sẵn một `SECRET_KEY` ví dụ. Không chép các chuỗi đó vào đây.

`CREATE_SUPERUSER` có dạng `email:password`. `prestart.py` chỉ tạo user khi database chưa có user nào, cắt ở dấu `:` đầu tiên, bắt phần trước là email hợp lệ, rồi dùng chuỗi đó làm cả `username` và `email`. README, trang installation, trang Docker và trang self-host vẫn viết username và password mặc định là `admin`, trong khi ví dụ env ngay phía trên là `admin@example.org:admin`. Quickstart nói nếu không khai gì thì vào bằng `admin` / `admin`. Nhánh code khi biến này rỗng thì không tạo user. `AGENTS.md` nói môi trường dev của người bảo trì đăng nhập `admin@example.org` / `admin`. Mình không mở màn hình login.

Phone-home mặc định bật. `app_settings.py` đặt `PHONEHOME` true. Template Docker đọc env `PHONEHOME`, mặc định chuỗi `"true"`. `development.py` đặt false. `prestart` luôn gọi `send_if_due.delay()`, kể cả bản Docker vừa khởi động. Decorator trong `phonehome/utils.py` còn gắn vào các view trang chủ, project và event, nhiều nhất một lần một giờ. `tasks.py` POST JSON tới `https://www.bugsink.com/phonehome/v1/` khi cờ còn bật. Body mình đọc trong `_make_message_body`: `installation_id`, `version`, `python_version`, các setting `BASE_URL`, `SITE_TITLE`, `DEFAULT_FROM_EMAIL`, `SINGLE_USER`, `SINGLE_TEAM`, `EMAIL_BACKEND`, `TASK_ALWAYS_EAGER`, `IS_DOCKER`, `DATABASE_ENGINE`, rồi vendor và version database, `platform.machine()`, số user, user active, project và team. Comment trong hàm nói đếm event là việc có thể thêm sau, và hàm hiện không đếm. Tắt bằng `PHONEHOME=false` hoặc `0` hoặc `no` trên Docker.

[Privacy policy](https://www.bugsink.com/privacy-policy/), mục self-hosted, nói phone-home gửi thống kê gồm số user, project, team và event, kèm setting `LICENSE_…`, và Bugsink lưu IP của request. Trong cây Python ở commit trên, `rg LICENSE_` không ra dòng nào. Danh sách trên policy rộng hơn body hàm đang build. Docs settings cũng nói mặc định true và trỏ privacy policy.

`SECURITY.md` nhận báo lỗ hổng qua GitHub advisory riêng tư hoặc `security@bugsink.com`. Changelog 2.6.2 ghi ba advisory đã vá trong bản đó, mức medium trên API: [GHSA-f8c4-h8vr-rh5v](https://github.com/bugsink/bugsink/security/advisories/GHSA-f8c4-h8vr-rh5v) (ghép artifact nạp chunk trước khi kiểm kích thước), [GHSA-mcpx-frgv-p228](https://github.com/bugsink/bugsink/security/advisories/GHSA-mcpx-frgv-p228) (ZIP manifest giải nén ngốn bộ nhớ), [GHSA-2r4m-8qhq-j364](https://github.com/bugsink/bugsink/security/advisories/GHSA-2r4m-8qhq-j364) (trust store Docker dính sự cố CA eMudhra, cần `certifi>=2026.10.19` và image mới). Mình không đọc diff vá và không thử lại. Trang advisory còn các mục cũ hơn, từ tháng 5/2026, trên trang API đầu tiên.

Webhook đi ra, template Docker: `ALERTS_WEBHOOK_OUTBOUND_MODE` mặc định `open`, `ALERTS_WEBHOOK_DENY_NON_GLOBAL` mặc định true. Mình không gửi webhook.

## Giấy phép

`LICENSE` trên `main`: copyright 2023-present Bugsink B.V. Phần ngoài các ngoại lệ dưới đây là [PolyForm Shield 1.0.0](https://polyformproject.org/licenses/shield/1.0.0). Điều Noncompete trong văn bản đó: mục đích nào cũng được, trừ việc cung cấp sản phẩm cạnh tranh với phần mềm này hoặc với sản phẩm mà licensor hay affiliate đang cung cấp bằng phần mềm này. Cạnh tranh tính cả khi miễn phí, và cả khi giao diện hay nền tảng khác. Trang [PolyForm about](https://polyformproject.org/about/) ghi "PolyForm is not… Open source or free software" và gọi đây là giấy phép source với quyền bị giới hạn. Trang [licenses](https://polyformproject.org/licenses/) xếp Shield ở cột "No Competition with Provider". GitHub API vẫn trả SPDX `NOASSERTION`.

Bài [đổi license](https://www.bugsink.com/blog/new-license-new-pricing/) ngày 15/01/2025 của Klaas van Schelven nói họ chuyển sang Shield để tự host miễn phí cho việc không cạnh tranh, và để chặn đối thủ fork rồi bán sản phẩm cạnh tranh. Đó là lời của tác giả về lý do.

`ee/LICENSE` có năm dòng: chưa có giấy phép "ee" công khai. Dùng code trong `ee/` khi Bugsink B.V. cấp license riêng. Không có license đó thì không được dùng. Thư mục có `ee/tenants/` (subdomain theo thread). Mình đọc đầu `base.py`, không chạy.

`LICENSE` gốc nói cả thư mục `sentry/` là BSD 3-Clause, copyright 2019 Sentry. `sentry/LICENSE` nói hẹp hơn: file vendored cũ lấy từ nguồn BSD của Sentry, file mới hơn lấy từ nguồn FSL-1.1-Apache-2.0 sau ngày future-license đã qua, và file đó tự ghi commit nguồn. Hai văn bản không cùng một câu. Trong cây có `sentry/at_597d25951d00/` (comment trỏ commit Sentry `597d25951d00`) và `sentry/at_glitchtip_af9a700a8706/` (helper stacktrace). Nhiều file `.py` chỉ có comment "copied from", không có header giấy phép riêng. Mình không đối từng file với upstream.

Cùng `LICENSE` gốc: icon SVG trong template là Heroicons, MIT, của Tailwind Labs. `bsmain/future_python.py` theo Python Software Foundation License. Phần phụ thuộc pip và image Docker theo giấy phép của từng gói.

`CLA.md` là individual contributor exclusive license agreement gửi Bugsink B.V. Luật Hà Lan, không gồm private international law. Người góp được license-back không độc quyền, chỉ trên phần contribution của họ, không trên cả Material.

## Giá hosted

`https://www.bugsink.com/pricing/` trả 404 ngày 23/10/2026. Bảng giá nằm ở `https://www.bugsink.com/#pricing` và được lặp trên [managed](https://www.bugsink.com/managed/). Các mức mình đọc trên cả hai trang, đơn vị euro:

| Sự kiện / tháng    | Giá                | Ghi trên trang                                                                   |
| ------------------ | ------------------ | -------------------------------------------------------------------------------- |
| 15K                | miễn phí           | Trang chủ: 1 user, giữ 5K event, alert chat/email. Trang managed: 1 user, 1 team |
| 75K                | €16 / tháng        | User không giới hạn. Trang chủ ghi giữ 75K event                                 |
| 600K               | €50 / tháng        | User không giới hạn                                                              |
| 3M                 | €158 / tháng       | User không giới hạn                                                              |
| 15M                | €568 / tháng       |                                                                                  |
| 50M                | €1,288 / tháng     | Cao hơn thì liên hệ                                                              |
| Self-hosted        | miễn phí           | Trang chủ: user không giới hạn, mọi feature, "volume based on hardware"          |
| Premium support    | €15 / user / tháng | Email ưu tiên, 1 giờ onboarding                                                  |
| Enterprise support | custom             |                                                                                  |

Trang managed nói nhà cung cấp là Bugsink B.V. tại Hà Lan, host ở EU, mỗi khách một database và vùng file riêng, trial gói trả phí 28 ngày, và DPA ghi giữ raw event 60 ngày. Đó là chữ trên trang.

Bài [Bugsink vs GlitchTip](https://www.bugsink.com/blog/bugsink-vs-glitchtip/), dòng "Updated September 2026", so giá bằng đô la và gọi là "published monthly US prices as of September 2026". Bảng trong bài đặt Bugsink 75K ở $16, 600K ở $50, 3M ở $158, 15M ở $568, 50M ở $1.288, rồi đặt GlitchTip và Sentry cạnh đó, gồm câu Sentry khoảng $6.441 một tháng ở 50 triệu event. Mình không mở trang giá của Sentry hay GlitchTip trong lần này, nên các cột đó là chữ của bài. Trang Bugsink mình mở ngày 23/10/2026 ghi euro, cùng các con số, cho chính gói của Bugsink. Bài còn nói GlitchTip gồm performance, uptime và log, còn Bugsink chỉ error, và GlitchTip self-host cần PostgreSQL cùng Redis. Phần đó cũng là chữ của bài.

## Chưa làm

- Không cài pip, không `docker pull`, không `docker compose`, không tạo user, không bắn event SDK.
- Chưa đọc hết `foreman.py`, chưa mở issue PostgreSQL mà trang Docker install trỏ, chưa đọc issue 205.
- Chưa đối file trong `sentry/` với commit upstream, chưa đọc sdist PyPI 0.0.1.
- Chưa mở trang giá Sentry và GlitchTip. Số so sánh ở mục trên lấy từ bài của Bugsink.

Xem thêm [DevOps Tools](/Technology/Cloud And DevOps/Tools/DevOps Tools).
