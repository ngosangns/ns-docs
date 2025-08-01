---
relates:
  - "[[Golang]]"
  - "[[Solutions & System Designs & Design Patterns]]"
tags:
  - golang
  - solutions-system-designs-design-patterns
  - layered-design
  - requirements
  - avoiding-circular-dependencies
---
Thiết Kế Phân Lớp (Layered Design) trong Go

- Cách tác giả thiết kế chương trình Go, dựa trên các nguyên tắc và hạn chế của ngôn ngữ.
- Tìm kiếm các phương pháp thiết kế hiện có nhưng không thấy cái nào hoàn toàn phù hợp với cách làm của tác giả.

Các Yêu Cầu Cơ Bản (Requirements)

- Go có một quy tắc quan trọng và thường bị đánh giá thấp: Các package không được phép tham chiếu vòng lẫn nhau. Đây là điều bị cấm nghiêm ngặt và gây lỗi biên dịch (compile error).
- Package là cơ chế chính để ẩn thông tin trong Go, thông qua các trường (fields) và định danh (identifiers) được xuất (exported) và không xuất (unexported).
- Việc đặt mọi thứ vào một package duy nhất là có thể. Tuy nhiên, điều này hy sinh khả năng sử dụng ẩn thông tin để duy trì tính bất biến (invariants). Với quy mô lớn hơn, cần có kỷ luật khác để thay thế. Vì vậy, cách tiếp cận "một package lớn" bị loại bỏ trong thảo luận này.
- Go sử dụng package `main` chứa hàm `main` làm điểm vào (entry point) cho một chương trình thực thi.
- Cấu trúc import package trong Go là một đồ thị có hướng không chu trình (DAG), trong đó package là các nút và import là các cạnh có hướng. Có một "nút trên cùng" (top node) đặc biệt cho mỗi chương trình thực thi.

Thiết Kế Phân Lớp trong Go

- Dựa trên quy tắc cấm tham chiếu vòng, luôn tồn tại các package không import package nào khác trong ứng dụng.
- Các package này được đặt ở lớp dưới cùng (bottom).
- Sau đó, các package chỉ import các package ở lớp dưới cùng được đặt ở lớp tiếp theo.
- Quá trình này được lặp lại cho đến khi tất cả các package được phân lớp theo độ sâu của chồng import (import stack).
- Kết quả là tất cả các import package đều chỉ xuống dưới (point downwards) trong đồ thị lớp này.
- Các lớp dưới cùng thường chứa những thứ rất cơ bản như package cung cấp metrics, package tinh chỉnh logging, hoặc cấu trúc dữ liệu (data structure).
- Những package cơ bản này được kết hợp (composed) lên thành các chức năng cấp cao hơn, ví dụ: chức năng header, thông tin về người dùng (quyền hạn, metadata).
- Những thứ này tiếp tục được kết hợp thành các đối tượng (objects) ở lớp cao hơn nữa, cho đến khi đạt được chức năng ứng dụng mong muốn.
- Trong ngữ cảnh này, "package cấp cao hơn" (higher level packages) nghĩa đen là package xuất hiện "cao hơn" trên đồ thị so với các package nó import. Điều này khác với định nghĩa "cấp cao hơn" thường dùng để chỉ "mức độ trừu tượng cao hơn" (higher level of abstraction). Mặc dù package cung cấp mức độ trừu tượng cao hơn thường là package cấp cao hơn trong đồ thị, một package cấp cao hơn đơn giản có thể chỉ là package sử dụng package cấp dưới mà không trừu tượng hóa nó (ví dụ: một crawler sử dụng `net/http`).

Đây là Mô Tả, Không phải Quy Định (Descriptive, Not Prescriptive)

- Phần mô tả về việc phân lớp package dựa trên import không phải là quy định (prescriptive).
- Nó là điều bắt buộc (required).
- Bạn có thể vẽ đồ thị và phân lớp tất cả các module Go theo cách này. Đây là hệ quả toán học của các quy tắc về cách package được phép import lẫn nhau. Nó mô tả thực tế trong Go.
- Điều này có nghĩa là bất kỳ thiết kế quy định (prescriptive design) nào khác cho chương trình Go phải nằm trên cấu trúc phân lớp này. Nó không có lựa chọn khác.
- Ví dụ: Bạn có thể làm theo kiến trúc MVC hoặc kiến trúc Hexagonal, nhưng bạn phải làm điều đó trên nền tảng của phân lớp Go (MVC on top of Go layering, hexagonal architecture on top of Go layering).
- Việc đặt tất cả các thành phần của một kiến trúc (ví dụ: MVC) vào một package duy nhất để tiện lợi hoặc để chúng hoạt động làm tăng khả năng tạo ra các vòng lặp tham chiếu giữa các package khác.
- Các phương pháp thiết kế khác nhau không tương thích tốt như nhau khi áp dụng trên hạn chế phân lớp này. Phương pháp thiết kế ngụ ý khả năng có import vòng có xu hướng mở rộng kém trong Go.

Vậy Quy Định Tốt Nhất Là Gì? (What’s The Best Prescription?)

- Quan điểm cá nhân của tác giả là "không có cái nào" là tốt nhất. Thiết kế phân lớp mô tả ở trên đã là một phương pháp thiết kế hoàn toàn hợp lý và đầy đủ.
- Nó hài hòa tốt với các khái niệm trong Lập trình hàm (Functional Programming), đặc biệt là các thành phần có thể "làm sạch" (purifiable subcomponents) và khả năng kết hợp việc "làm sạch" của nhiều thành phần. Điều này hỗ trợ việc kiểm thử (testing) mà không cần phụ thuộc vào trạng thái bên ngoài (external state).
- Ưu điểm yêu thích của phương pháp này là đối với bất kỳ package nào, chỉ có một số lượng giới hạn và được định nghĩa rõ ràng các package cần hiểu để hiểu package đó, kể cả khi xem xét closure bắc cầu (transitive closure) của các import.
- Không thể viết mã yêu cầu hiểu toàn bộ codebase để hiểu nó, vì không thể vô tình tạo vòng lặp tham chiếu tới toàn bộ mã quan trọng.
- Khi mã mở rộng, cách tiếp cận này khuyến khích mạnh mẽ các package chỉ sử dụng và chỉ import những gì chúng thực sự cần, vì nếu không, chúng rất dễ tham gia vào một vòng import ở một thời điểm nào đó.
- Các thiết kế cấp cao hơn (local prescriptions) có thể hữu ích ở các phần cụ thể của codebase (ví dụ: web handlers, ứng dụng heavy-database, kiến trúc plugin). Nên cô lập chúng ở những phần có ý nghĩa, không nên cố gắng áp đặt chúng ở cấp cao nhất cho toàn bộ chương trình Go.

Tránh Các Phụ Thuộc Vòng (Avoiding Circular Dependencies)

- Khi phụ thuộc vòng xảy ra, điều đầu tiên cần làm là phân tích sâu để tìm ra chính xác nơi phụ thuộc vòng bắt nguồn.
- Nên giảm thiểu các vòng lặp import trong bất kỳ ngôn ngữ nào, vì chúng làm cho việc hiểu codebase trở nên khó khăn hơn.
- Không chỉ dừng lại ở việc package A phụ thuộc vòng vào package B, cần truy vết xuống các phần nhỏ nhất của cấu trúc, chức năng cụ thể gây ra vòng lặp. Cần làm điều này thật chi tiết vì quá trình sửa lỗi có thể liên quan đến việc chia nhỏ mã theo các đường ranh giới được phát hiện.
- Thông thường, lỗi import vòng xuất hiện khi thêm mã mới tạo ra dependency mới gây ra vòng lặp. Mã mới này được gọi là "new circular code". Phần mã dễ thay đổi nhất gây ra vòng lặp được gọi là "breakable link".
- Vòng lặp thường gây ra bởi một phần nhỏ hơn nhiều so với toàn bộ package.
- Thực hiện các kỹ thuật tái cấu trúc (refactorings) dưới đây thường giúp tăng sự rõ ràng về khái niệm và có thiết kế mạnh mẽ hơn. Nó cũng thường làm giảm kích thước interface công khai (exported public interface) của package.
- Các giải pháp được liệt kê theo thứ tự ưu tiên:
    1. Di chuyển chức năng (Move The Functionality):
        - Đây là giải pháp quan trọng nhất khi có thể áp dụng, dù không phải phổ biến nhất.
        - Sau khi phân tích, có thể thấy phần gây ra vòng lặp đơn giản là đang ở sai vị trí. Nó có thể thuộc về cùng vị trí với mã mới gây vòng lặp.
        - Việc này có thể liên quan đến chia nhỏ một khối chức năng (conglomeration of functionality) hiện có.
        - Không chỉ di chuyển toàn bộ kiểu dữ liệu (types), mà có thể là cắt nhỏ các đoạn mã, một trường (field) ở đây, một trường ở kia. Thậm chí có thể cần tách đôi một trường tưởng chừng là nguyên tử (atomic), dù hiếm. Cần phân tích rất granular (chi tiết).
        - Đây là giải pháp tốt nhất không chỉ vì nó phá vỡ vòng lặp mà còn vì nó mang lại kết quả mạnh mẽ nhất cho sự rõ ràng khái niệm của package. Di chuyển hoàn toàn khái niệm không thuộc về "breakable link" đến đúng vị trí của nó là một thắng lợi lớn về lâu dài.
    2. Tạo một package thứ ba cho phần dùng chung (Create A Third Package For The Shared Bit):
        - Nếu một package cần thứ gì đó nằm trong package khác gây ra phụ thuộc vòng, hãy cân nhắc di chuyển thứ đó vào một package thứ ba mới mà cả hai package ban đầu đều có thể import.
        - Ví dụ phổ biến: Một kiểu dữ liệu đơn giản như `Username` ban đầu được đặt vào package cần nó. Khi chương trình phát triển, package khác cũng cần tham chiếu đến `Username` gây ra vòng lặp. `Username` (thường là chuỗi đã được xác thực) gần như chắc chắn có thể được chuyển vào package riêng.
        - Sự lưỡng lự khi làm điều này thường là do cảm giác việc có cả một package cho một kiểu dữ liệu duy nhất là thiết kế tồi.
        - Tuy nhiên, tác giả khuyên bạn nên làm điều đó. Theo kinh nghiệm, phần lớn thời gian, package mới này sẽ không chỉ có một kiểu dữ liệu duy nhất mãi mãi và sẽ nhanh chóng phát triển thêm. Hãy nghĩ về package không chỉ là ảnh chụp nhanh tại một thời điểm mà theo sự tiến hóa của chúng. Thường thì, package mới này là ví dụ đầu tiên của một khái niệm mới, phi tầm thường mà package đó sẽ sớm thể hiện một cách phức tạp và đầy đủ hơn.
    3. Một package thứ ba mới kết hợp các package bị vòng lặp (A New Third Package That Composes The Circular Packages):
        - Tương tự như trường hợp trước, nhưng theo hướng ngược lại.
        - Nếu hai package phụ thuộc vòng lẫn nhau cho một mục đích nào đó, có thể trích xuất (extract) sự phụ thuộc đó và biến nó thành một cái gì đó sử dụng hai package đó để hoàn thành tác vụ yêu cầu vòng lặp.
        - Cách này ít được sử dụng hơn khi đã quen thiết kế kiến trúc gốc trong Go. Các kiến trúc dựa trên kế thừa OO thường dễ dẫn đến sự phụ thuộc sâu vào vòng lặp.
        - Ví dụ ORM: Có `Category` và `BlogPost` trong các package khác nhau, có quan hệ nhiều-nhiều. Thao tác `.Save()` cho mỗi loại kết thúc bằng việc phụ thuộc vào loại kia, tạo vòng lặp.
        - Giải pháp: Làm cho `Category` và `BlogPost` "ngu hơn". Tách bỏ ý tưởng rằng chúng biết cách "tự lưu" (save themselves). Tạo `Category` và `BlogPost` chỉ là cấu trúc dữ liệu. Một package cao hơn sẽ kết nối chúng qua quan hệ nhiều-nhiều. Một package cao hơn nữa sẽ "biết" cách tải chúng từ DB và lưu các thay đổi.
        - (Điều này không hoạt động tốt với ORM, đây là một trong nhiều lý do tác giả tránh ORM. ORM làm mỗi đối tượng phải "biết" về DB, gây ra vấn đề "bạn muốn một quả chuối nhưng lại nhận được một con gorilla cầm quả chuối và toàn bộ khu rừng" - the want-banana-get-jungle problem. Thiết kế phân lớp trong Go khó chịu với cách tiếp cận này vì càng có nhiều "khu rừng", càng dễ xảy ra phụ thuộc vòng. Go gần như buộc bạn phải có `Banana` và `Gorilla` có thể tồn tại độc lập, và thể hiện các mối quan hệ trong các package cấp cao hơn. Dù không hoàn toàn ép buộc, việc chống lại điều này sẽ gặp khó khăn.)
    4. Sử dụng Interface để phá vỡ sự phụ thuộc (Interface To Break The Dependency):
        - Nếu vòng lặp do tham chiếu đến kiểu cụ thể (concrete type) mà mã gây vòng lặp sẽ gọi phương thức (methods) trên đó, có thể phá vỡ vòng lặp bằng cách cho một bên tham chiếu vòng nhận một interface thay vì kiểu cụ thể.
        - Ví dụ: Thay vì hàm nhận `users.DBList` (là kiểu cụ thể), hãy định nghĩa một interface `UserList` với phương thức `Exists` và cho hàm nhận `UserList`.
        - Đây không phải luôn là giải pháp đầy đủ. Nếu interface cần các giá trị từ package gây vòng lặp làm đối số (arguments) hoặc trả về chúng làm tham số (parameters), điều này có thể vẫn để lại tham chiếu vòng. Tuy nhiên, ngay cả trong những trường hợp này, interface vẫn có thể là một phần của giải pháp.
        - Có thể cần tạo một phương thức mới mà interface có thể triển khai. Ví dụ: Nếu tham chiếu vòng cố gắng truy cập một trường được xuất (exported field) của một struct khác, có thể làm trường đó không xuất (unexport) và bọc nó sau một phương thức, chỉ để có thể sử dụng interface phá vỡ chuỗi tham chiếu vòng.
        - Giải pháp này ở vị trí thấp hơn trong danh sách vì nó vẫn tạo ra một mối quan hệ giữa hai package, dù ít chặt chẽ hơn. Việc này có thể gợi ý sự trộn lẫn không phù hợp về khái niệm (ví dụ: "user" và "admin" trong ví dụ). Việc chia nhỏ package thành các phần rõ ràng, không trộn lẫn khái niệm vẫn mang lại kết quả vượt trội hơn.
        - Đôi khi giải pháp interface là cần thiết khi dự án đã trưởng thành và cần kết nối những thứ tưởng chừng đã tách biệt.
    5. Sao chép sự phụ thuộc (Copy The Dependency):
        - Áp dụng câu châm ngôn Go: "Một chút sao chép tốt hơn một chút phụ thuộc" (A little copying is better than a little dependency). Thường được dùng khi không muốn import thư viện lớn chỉ để dùng vài dòng code.
        - Cũng có thể áp dụng cho codebase của chính bạn. Nếu bạn import toàn bộ package riêng biệt chỉ để dùng một đoạn code rất nhỏ, và đoạn code đó thực sự thuộc về package đó, có lẽ chỉ cần sao chép các dòng code đó vào package đang bị vòng lặp.
        - Giải pháp này cũng ở vị trí thấp hơn. Lạm dụng nó sẽ dẫn đến vấn đề "Đừng lặp lại chính mình" (Don't Repeat Yourself - DRY).
        - Tuy nhiên, theo kinh nghiệm, khoảng một nửa số lần buộc phải dùng giải pháp này, mã code sao chép cuối cùng cũng khác biệt đáng kể (và đúng đắn), cho thấy chúng không thực sự là cùng một thứ ngay từ đầu.
    6. Có lẽ chúng không nên là hai package riêng biệt (Maybe They Shouldn’t Be Two Separate Packages):
        - Cuối cùng, nếu không giải pháp nào ở trên khả thi (dù đã nỗ lực), có thể do vòng lặp quá lớn, câu trả lời là mã đang cho thấy đây thực ra chỉ nên là một package.
        - Tác giả thích chia nhỏ mọi thứ thành nhiều package, nhưng đôi khi lại quá "nhiệt tình" và cố gắng tách ra những thứ lẽ ra không nên.
        - Nếu điều này xảy ra thường xuyên, có thể bạn cần luyện tập thêm. Nhưng nó nên xảy ra ít nhất đôi khi, nếu không, có thể bạn chưa đủ cố gắng chia nhỏ mọi thứ.
        - Package kết hợp càng lớn, càng nên cố gắng tìm giải pháp khác để phá vỡ phụ thuộc vòng. Tuy nhiên, cuối cùng vẫn là quyết định cân nhắc chi phí/lợi ích (cost/benefits decision).

Sự Khác Biệt Với Các Phương Pháp Khác

- Tác giả gặp khó khăn trong việc mô tả sự khác biệt chính xác, do đã làm quá lâu và các phương pháp thiết kế tốt dần hòa lẫn vào nhau.
- Tuy nhiên, cách tiếp cận này tạo ra ít nhất một điểm khác biệt rõ ràng: mỗi package kết thúc bằng việc trở thành một thứ gì đó hữu ích theo đúng nghĩa của nó (something useful on its own terms).
- Nó tránh được vấn đề "muốn chuối, nhận rừng" (want-banana-get-jungle).
- Ngay cả các kiến trúc nặng về Dependency Injection (DI) cũng có thể khiến mỗi service cần mọi dependency có thể, do đó dù về nguyên tắc có thể "làm sạch" (purifiable), không có gì thực sự sử dụng được một cách độc lập (in isolation). Nếu việc cung cấp dependencies vẫn đòi hỏi cung cấp mọi service trong hệ thống, thì nó không thực sự "cắt đứt" (severable).
- Kiến trúc này có xu hướng buộc bạn phải thu hẹp mọi thứ xuống chỉ còn những gì chúng cần và không gì khác.
- Ví dụ: Một hệ thống phân loại email sẽ chỉ cần email và các dịch vụ phân loại liên quan; nó sẽ không cần thông tin người dùng, quyền admin của họ, các diễn đàn họ quản lý, hay các bài viết hàng đầu trên diễn đàn đó. Nếu cần thông tin đó, nó sẽ được cô lập thành các interface có thể mock hoặc stub. Nếu chỉ cần tên người dùng, thường sẽ buộc phải làm điều đó qua một interface cho việc "cung cấp tên" (yielding a name) thay vì kéo toàn bộ package người dùng và các dependencies của nó.
- Nhiều phương pháp khác có thể nói mục đích của họ là tạo ra những thứ hữu ích đứng độc lập, nhưng trên thực tế (in practice), chúng vẫn dễ đòi hỏi "rừng" để có "chuối". Phương pháp này có xu hướng tạo ra những thứ thực tế (practically) hữu ích một cách độc lập.
- Khi cần tách các phần thành microservice từ monolith, quá trình này gần như tự động, chỉ cần đi theo các dependencies và cung cấp chúng. Hệ thống đã được đẩy mạnh theo hướng này nên việc tách không gây sốc cho codebase. Đây là cách tuyệt vời để thiết kế codebase "monolithic microservice".

Thực Hành Tốt Chung cho Package Go

- Ngoài phương pháp thiết kế này, một điều tốt cho bất kỳ package Go nào là cố gắng giảm thiểu số lượng thứ được xuất (exported stuff) từ package.
- Sử dụng `godoc` để xem những gì đang được xuất.
- Kiểm tra lại từng ký hiệu được xuất để xem liệu có thực sự cần xuất nó không.
- Interface càng mỏng (thinner), phương pháp này càng hoạt động tốt.
- Thà quá nhiệt tình giữ mọi thứ không xuất (unexported), vì việc xuất lại thứ cần xuất sau này rất dễ dàng (chỉ cần đổi tên). Việc không xuất thứ đã xuất trước đó thì khó hơn (IDE có thể cảnh báo nếu nó còn được sử dụng).

Thử Phương Pháp Này

- Có một mức độ không thể giảm bớt mà bạn cần tự mình thử phương pháp này để hiểu rõ, dù ở ngôn ngữ khác Go.
- Nếu thử ở ngôn ngữ khác Go, bạn cần có quy tắc cấm import vòng gây lỗi biên dịch hoặc build.
- Nên thử trên một dự án mới (greenfield project). Việc tái cấu trúc hệ thống hiện có theo phương pháp khác để chuyển sang cách này rất tẻ nhạt và khó khăn, nhưng đó là sự thật chung của việc tái cấu trúc, không riêng gì phương pháp này.