---
area: technology
domain: ai-ml
type: resource
---
# 1. Viết hướng dẫn một cách rõ ràng

- Chứa các thông tin chi tiết vào trong query để câu trả lời liên quan hơn.
  - Câu hỏi cần rõ ràng, cụ thể để ChatGPT hiểu.
  - Ví dụ: Thay vì "Viết đoạn code tính dãy Fibonacci", hãy yêu cầu "Hãy viết cho tôi một đoạn mã Python tính dãy Fibonacci, đồng thời hãy thêm các comment để giải thích chức năng theo từng phần".
- Yêu cầu model chấp nhận một nhân cách nào đó.
  - Có thể yêu cầu ChatGPT trả lời một cách hài hước, vui tươi thay vì nghiêm túc, dập khuôn.
  - Chiến lược này phù hợp khi yêu cầu gợi ý bài phát biểu hay đoạn văn.
- Sử dụng các dấu phân cách để phân tách rõ các phần trong input.
  - Việc phân cách trong prompt rất quan trọng.
  - Nên sử dụng các dấu như ngoặc kép ba ("""like this"""), thẻ XML, tiêu đề phần, ... để phân định rõ ràng các phần cần xử lý.
  - Ví dụ cấu trúc: 1. Instruction ... 2. Rules ... 3. Input """Input here""" 4. Output format ....
  - Chiến lược này đặc biệt hiệu quả với các task phức tạp (ví dụ: trả lời từ tài liệu, phân loại hội thoại).
- Xác định được các bước cụ thể cần có để thực thi yêu cầu.
  - Đối với nhiệm vụ khó/phức tạp, nên định hình một chuỗi các bước để hướng dẫn ChatGPT.
  - Hãy coi ChatGPT như một đứa trẻ thông minh cần hướng dẫn.
  - Ví dụ: Thay vì "Phân loại cho tôi đoạn hội thoại sau", hãy hướng dẫn: "Vui lòng làm theo các bước sau... Bước 1: Xác định ngôn ngữ... Bước 2: Xác định các keywords... Bước 3: Đánh giá sự liên quan... Bước 4: Xếp hạng và lấy nhóm liên quan cao nhất".
- Cung cấp thêm các ví dụ.
  - Khi lý thuyết kèm ví dụ, người nghe/model sẽ hiểu rất nhanh.
  - Truyền thêm ví dụ rõ ràng giúp độ chính xác trong câu trả lời của ChatGPT tăng lên nhiều.
  - Cần đánh giá task xem ví dụ có phù hợp hay không.
- Chỉ định format/đặc điểm mong muốn của output answer.
  - Nên xác định rõ đầu ra mong muốn (ví dụ: tóm tắt chỉ 2 câu, output chỉ gồm nhãn dự đoán không giải thích).
  - Quan trọng cho việc đồng bộ hóa đầu ra trong các dự án.
  - Nên sử dụng định dạng Json output format vì đa năng, được hỗ trợ tốt từ bản 3.5 và 4.0.

# 2. Cung cấp văn bản liên quan

- Hướng dẫn model trả lời sử dụng văn bản liên quan.
  - ChatGPT có thể tìm kiếm thông tin trong tài liệu cho trước.
  - Nếu có tài liệu đáng tin cậy, hãy đưa cho ChatGPT và yêu cầu nó sử dụng thông tin đó để trả lời. Câu hỏi sẽ sát với tài liệu và ChatGPT "biết phải trả lời thế nào".
  - Thách thức: Nội dung quá dài, nhiều nội dung không liên quan, vượt quá giới hạn token.
  - Giải pháp linh hoạt: Phân nhỏ tài liệu, sử dụng embedding để tìm các đoạn liên quan, sau đó mới dùng ChatGPT để tìm câu trả lời.
- Hướng dẫn model trả lời với việc trích dẫn từ các văn bản liên quan.
  - Yêu cầu ChatGPT trích dẫn văn bản/đoạn văn bản mà nó sử dụng để trả lời.
  - Giúp kiểm tra xem câu trả lời có đúng không.
  - Giúp quản lý tốt hơn câu trả lời và điều chỉnh prompt khi cần.

# 3. Chia task phức tạp thành các task con đơn giản hơn

- Sử dụng phân loại mục đích (intent classification) để xác định các hướng dẫn phù hợp nhất đối với truy vấn đầu vào.
  - Chiến lược này sử dụng phân loại ý định (ý đồ/mục đích người dùng) để xác định hướng dẫn quan trọng nhất cho truy vấn.
  - Bằng cách phân loại ý định, có thể xác định danh sách các hướng dẫn phù hợp đã chuẩn bị trước để giúp model hiểu và đáp ứng mục tiêu người dùng.
  - Ví dụ: Truy vấn "Làm thế nào để đặt lịch hẹn?" -> Ý định là yêu cầu đặt lịch hẹn -> Áp dụng hướng dẫn về quy trình đặt lịch hẹn.
  - Giúp trả lời chính xác và hữu ích hơn.
  - Bản chất là phân rã nhiệm vụ thành chuỗi các giai đoạn, mỗi truy vấn theo một luồng duy nhất, giúp trả lời ít mơ hồ và dễ kiểm soát hơn.
  - Tăng cường khả năng hiểu và tương tác của model, giúp model tập trung vào hướng dẫn cụ thể, giảm thông tin không liên quan.
- Đối với các ứng dụng liên quan đến hội thoại thường có hội thoại rất dài, tóm tắt hoặc lọc các hội thoại trước đó.
  - Hội thoại dài là đặc điểm chung, nhưng giới hạn token của ChatGPT có hạn. Nội dung cũ có thể bị mất khi hội thoại dài.
  - Cách giải quyết: Tóm tắt hoặc lọc các cuộc trò chuyện trước đó.
  - Tóm tắt: Tạo bản tóm tắt ngắn gọn nội dung quan trọng để có cái nhìn tổng quan.
  - Lọc: Loại bỏ các phần không cần thiết/không quan trọng để giữ lại thông tin quan trọng, liên quan đến mục tiêu hiện tại.
- Tóm tắt các văn bản dài thành từng phần và xây dựng một bản tóm tắt đầy đủ theo cách đệ quy.
  - Áp dụng khi văn bản cần tóm tắt vượt quá giới hạn token của ChatGPT.
  - Cách thực hiện:
    - Chia nhỏ văn bản thành từng phần.
    - Tóm tắt từng phần đó bằng prompt ChatGPT.
    - Ghép kết quả tóm tắt từng phần lại thành một bản tóm tắt đầy đủ.
    - Nếu bản tóm tắt đầy đủ vẫn quá dài, lặp lại quá trình (chia nhỏ, tóm tắt từng phần) cho đến khi đạt yêu cầu. Đây là lý do gọi là đệ quy.

# 4. Cho Mô Hình Thêm Thời Gian để "Nghĩ"

- Ý tưởng cốt lõi: Buộc mô hình thực hiện quy trình suy luận từng bước một cách nội bộ trước khi đưa ra kết luận cuối cùng, tránh việc mô hình vội vàng kết luận.
- Vấn đề giải quyết:
  - Lỗi suy luận vội vàng: LLMs dễ mắc lỗi khi cố gắng trả lời ngay lập tức các câu hỏi hoặc bài toán phức tạp cần nhiều bước.
  - Ảnh hưởng bởi thông tin sai lệch: Giúp mô hình không bị "lệch hướng" bởi thông tin sai (như lời giải sai trong prompt) bằng cách yêu cầu nó tự giải quyết độc lập trước.
- Cách thức hoạt động: Thay đổi chỉ dẫn trong prompt (ví dụ: SYSTEM prompt). Thay vì hỏi trực tiếp kết quả, yêu cầu mô hình thực hiện các bước cụ thể theo trình tự:
  1. Tự giải bài toán.
  2. So sánh lời giải của mô hình với lời giải được cung cấp (ví dụ: của học sinh).
  3. Đánh giá tính đúng sai của lời giải được cung cấp.
     - Nhấn mạnh việc mô hình không được đưa ra kết luận cuối cùng cho đến khi hoàn thành các bước suy luận nội bộ.

- Lợi ích:
  - Tăng độ chính xác: Giảm lỗi suy luận, đặc biệt với các tác vụ tính toán, logic, đánh giá phức tạp.
  - Giảm thiên vị: Tránh bị ảnh hưởng tiêu cực bởi thông tin không chính xác trong ngữ cảnh prompt.
  - Minh bạch hơn: Quá trình suy luận nội bộ rõ ràng hơn.
- Trường hợp sử dụng: Đánh giá bài làm (toán, lập trình, viết luận), kiểm tra tính đúng đắn của thông tin/quy trình, giải quyết vấn đề phức tạp cần bước trung gian, các tình huống câu trả lời nhanh chóng có thể không đáng tin cậy.
- Đây là cách áp dụng có cấu trúc cho kỹ thuật Chain-of-Thought.

# 5. Sử Dụng "Độc Thoại Nội Tâm" hoặc Chuỗi Truy Vấn để Ẩn Quá Trình Suy Luận

- Ý tưởng cốt lõi: Tách biệt phần suy luận chi tiết nội bộ của mô hình khỏi kết quả cuối cùng hiển thị cho người dùng.
- Vấn đề giải quyết: Việc hiển thị toàn bộ quá trình suy luận có thể không phù hợp hoặc gây bối rối (ví dụ: trong ứng dụng dạy học, tiết lộ logic nghiệp vụ).
- Cách thức hoạt động: Có hai cách tiếp cận:
  - Độc thoại Nội tâm (Inner Monologue): Chỉ dẫn mô hình đặt toàn bộ suy luận, tính toán vào một cấu trúc định dạng cụ thể (ví dụ: """ """ , thẻ ). Phần trả lời cho người dùng nằm ngoài cấu trúc đó. Ứng dụng (backend) sẽ phân tích và chỉ hiển thị phần cho người dùng. Ví dụ: Thực hiện các bước giải, so sánh bên trong """ """, bước đưa ra gợi ý bên ngoài.
  - Chuỗi Truy vấn (Sequence of Queries): Chia nhiệm vụ thành nhiều lệnh gọi LLM riêng biệt. Lệnh gọi 1: Tự giải bài toán (ẩn). Lệnh gọi 2: So sánh và phân tích lỗi (ẩn). Lệnh gọi 3: Đóng vai trò gia sư, dựa trên phân tích (từ lệnh gọi 2), đưa ra gợi ý không lộ đáp án (hiển thị).
- Lợi ích:
  - Kiểm soát đầu ra: Suy luận chi tiết nhưng không lộ thông tin không cần thiết.
  - Trải nghiệm người dùng tốt: Phản hồi ngắn gọn, đúng trọng tâm.
  - Hỗ trợ vai trò cụ thể: Ví dụ: Vai trò gia sư chỉ đưa gợi ý.
  - Giảm thiên vị: Cách ly hoàn toàn bước tự giải của mô hình khỏi lời giải có thể sai của học sinh (với chuỗi truy vấn).
- Trường hợp sử dụng: Ứng dụng dạy học, trợ giúp làm bài tập, hệ thống cần che giấu sự phức tạp xử lý nội bộ, khi cần định dạng đầu ra theo vai trò cụ thể, quy trình cần tạo cả phân tích nội bộ và phản hồi khách hàng.
- Chiến lược này xây dựng dựa trên Chiến thuật 1 và có liên quan chặt chẽ đến Prompt Chaining.

# 6. Hỏi Mô Hình xem nó có Bỏ lỡ Gì không

- Ý tưởng cốt lõi: Sử dụng các truy vấn lặp đi lặp lại để yêu cầu mô hình xem xét lại kết quả và kiểm tra các thiếu sót, đặc biệt khi xử lý lượng lớn dữ liệu.
- Vấn đề giải quyết: LLMs có thể "dừng lại quá sớm" hoặc không bao quát hết thông tin liên quan khi xử lý tài liệu dài hoặc tác vụ trích xuất toàn diện, giống như "sự chú ý" bị giới hạn.
- Cách thức hoạt động: Sau khi mô hình đưa ra phản hồi ban đầu, gửi một prompt tiếp theo. Prompt này yêu cầu tìm kiếm _thêm_ các mục liên quan, đồng thời nhấn mạnh _không lặp lại_ các mục đã có. Có thể nhắc lại các tiêu chí liên quan hoặc định dạng. Ví dụ: Sau khi nhận danh sách JSON, hỏi tiếp "Còn trích đoạn nào liên quan nữa không? Lưu ý không lặp lại...".
- Lợi ích:
  - Cải thiện độ đầy đủ (Recall): Thu thập được nhiều thông tin liên quan hơn.
  - Khắc phục giới hạn: Vượt qua giới hạn xử lý hoặc sự chú ý của mô hình với đầu vào dài.
  - Đơn giản: Dễ thực hiện bằng một hoặc nhiều lệnh gọi tiếp theo.
- Trường hợp sử dụng: Trích xuất Entity và Relationship trong hệ thống GraphRAG, trích xuất toàn bộ thông tin từ tài liệu dài, lên ý tưởng (brainstorming) cần tính toàn diện, tổng quan tài liệu, các tác vụ mà việc bỏ sót thông tin quan trọng là thất bại lớn.
- Đây là một dạng tinh chỉnh lặp đi lặp lại (iterative refinement) hoặc prompting tự sửa lỗi (self-correction prompting).

# 7. Sử Dụng Thêm Các External Tools (Công cụ Bên Ngoài)

- Ý tưởng cốt lõi: Nhận thức rằng LLMs có những hạn chế cố hữu. Thay vì ép LLM làm việc nó không giỏi, hãy tận dụng các công cụ bên ngoài chuyên biệt (truy xuất thông tin, tính toán, chạy mã, gọi API) và tích hợp kết quả. Kết hợp điểm mạnh của cả LLM và công cụ chuyên dụng. "Giao đúng việc cho đúng công cụ.".
- Lợi ích:
  - Mở rộng đáng kể phạm vi khả năng của ứng dụng dựa trên LLM.
  - Cải thiện độ chính xác và độ tin cậy cho các tác vụ cụ thể (tính toán, lấy dữ liệu thực tế).
  - Cho phép LLM tương tác với dữ liệu thời gian thực hoặc thực hiện hành động trên hệ thống khác.
- Các cơ chế cụ thể:
  - Sử dụng tìm kiếm dựa trên Embeddings để truy xuất kiến thức (RAG):
    - Cơ chế: Nền tảng của Retrieval Augmented Generation (RAG).
      - _Chuẩn bị (Offline):_ Kho kiến thức chia nhỏ (chunks), tạo vector embedding cho mỗi chunk, lưu cặp (vector, nội dung chunk) vào Vector Database.
      - _Truy xuất (Online):_ Truy vấn người dùng được chuyển thành vector embedding. Tìm kiếm vector gần nhất trong database. Nội dung của các chunk tương ứng được thêm vào prompt cùng với câu hỏi gốc làm ngữ cảnh cho LLM.
    - Lợi ích: Cho phép LLM truy cập thông tin bên ngoài một cách động tại thời điểm chạy, giúp tạo phản hồi cập nhật, đầy đủ và giảm thiểu việc bịa đặt (hallucination). Ví dụ: Trả lời câu hỏi về phim bằng cách truy xuất thông tin diễn viên/đạo diễn.
  - Sử dụng mã thực thi (Executable Code) để tính toán chính xác hoặc gọi API:
    - Cơ chế: Hướng dẫn LLM viết và yêu cầu thực thi mã (ví dụ: Python) bằng cách đặt mã trong định dạng cụ thể (ví dụ: ). Backend nhận diện, trích xuất, và thực thi mã trong môi trường sandbox an toàn, được kiểm soát chặt chẽ. Kết quả thực thi có thể được đưa lại làm đầu vào cho LLM.
    - Lợi ích: Cung cấp khả năng tính toán chính xác, tương tác với bất kỳ API nào qua thư viện mã nguồn. Ví dụ: Tìm nghiệm đa thức, gọi hàm tùy chỉnh. Cảnh báo: Bảo mật rất quan trọng, cần môi trường sandbox đáng tin cậy..
  - Cung cấp cho mô hình quyền truy cập vào các hàm cụ thể (Function Calling):
    - Cơ chế: (Cụ thể cho OpenAI Chat Completions API). Ứng dụng cung cấp danh sách các "hàm" mà LLM được phép yêu cầu thực thi, kèm mô tả và cấu trúc tham số (schema). Dựa trên truy vấn người dùng và mô tả hàm, LLM tạo đối tượng JSON chứa tên hàm và đối số cần gọi. API trả về JSON này cho ứng dụng. Ứng dụng thực thi lời gọi hàm/API thực tế. Sau khi hàm chạy xong, ứng dụng gửi yêu cầu mới đến LLM bao gồm cả kết quả trả về từ hàm. LLM tổng hợp kết quả và tạo phản hồi cuối cùng cho người dùng.
    - Lợi ích: Là cách OpenAI khuyến nghị để LLM tương tác với hàm/API bên ngoài. Cấu trúc rõ ràng, đáng tin cậy và an toàn hơn so với thực thi mã tùy ý. Ví dụ: Lấy thông tin thời tiết, tra cứu sản phẩm, đặt lịch hẹn qua API.

# 8. Kiểm Tra Các Thay Đổi Một Cách Hệ Thống (Sử Dụng Evals)

- Ý tưởng cốt lõi: Để cải thiện hiệu suất hệ thống LLM một cách đáng tin cậy, cần đo lường hiệu quả thay đổi bằng cách sử dụng các bộ kiểm thử toàn diện ("evals"). Không chỉ dựa vào xem xét vài ví dụ đơn lẻ.
- Vấn đề giải quyết:
  - Đánh giá chủ quan/không đáng tin cậy: Một thay đổi có thể tốt trên vài ví dụ nhưng giảm hiệu suất tổng thể.
  - Khó xác định cải tiến thực sự: Không có cơ sở dữ liệu khách quan để khẳng định.
- Cách thức hoạt động: Xây dựng bộ kiểm thử ("eval") đại diện, đủ lớn để có ý nghĩa thống kê, và dễ tự động hóa/lặp lại. Thực hiện đánh giá trước và sau khi áp dụng thay đổi để so sánh hiệu suất khách quan.
- Lợi ích:
  - Tối ưu hóa dựa trên dữ liệu.
  - Cung cấp bằng chứng khách quan về hiệu quả.
  - Giúp phát hiện các vấn đề hồi quy (regressions).
  - Tăng sự tự tin khi triển khai cải tiến.
- Trường hợp sử dụng: Là phần thiết yếu trong quy trình phát triển và cải tiến ứng dụng LLM, đặc biệt khi đưa vào vận hành thực tế. Dùng để so sánh hiệu quả các prompt, model, cấu hình hệ thống khác nhau (ví dụ: RAG).
- Chiến thuật Eval cụ thể: Đánh giá đầu ra của mô hình dựa trên câu trả lời chuẩn (Sử dụng LLM làm người đánh giá):
  - Ý tưởng cốt lõi: Sử dụng một mô hình LLM đóng vai trò "người đánh giá" để so sánh câu trả lời do hệ thống tạo ra (candidate answer) với câu trả lời chuẩn/đúng (gold-standard answer). Đánh giá các khía cạnh như độ bao phủ thông tin, tính nhất quán.
  - Vấn đề giải quyết: Tự động hóa đánh giá chất lượng đầu ra LLM mà việc so sánh chuỗi ký tự không làm được, đặc biệt khi có nhiều cách diễn đạt đúng.
  - Cách thức hoạt động: Thiết kế prompt rất cụ thể cho mô hình LLM _đánh giá_. Có hai biến thể được mô tả:
    - Biến thể 1: Kiểm tra Sự thật (Fact Checking):
      - Đầu vào cho LLM đánh giá: Câu trả lời ứng viên + Danh sách các sự thật cụ thể mà câu trả lời nên chứa.
      - Prompt: Hướng dẫn các bước: Nêu lại sự thật, tìm trích dẫn gần nhất trong câu trả lời ứng viên, phân tích liệu người đọc có suy ra được sự thật từ trích dẫn không (giải thích lý do), ghi "yes/no", đếm tổng số "yes" và trả về JSON {"count": <số lượng>}.
      - Mục đích: Đo lường định lượng mức độ bao phủ các thông tin thực tế quan trọng.
    - Biến thể 2: Phân tích Mức độ Trùng lặp / Mâu thuẫn:
      - Đầu vào cho LLM đánh giá: Câu hỏi + Câu trả lời ứng viên + Câu trả lời chuẩn/chuyên gia.
      - Prompt: Hướng dẫn các bước suy luận: Phân tích từng bước mối quan hệ thông tin giữa câu trả lời ứng viên và chuẩn (hoàn toàn khác biệt - disjoint, giống hệt - equal, tập con - subset, tập cha - superset, giao nhau một phần - overlapping). Phân tích từng bước xem câu trả lời ứng viên có mâu thuẫn với câu trả lời chuẩn không. Trả về kết quả JSON {"type_of_overlap": "...", "contradiction": true/false}.
      - Mục đích: Đánh giá sâu sắc hơn về mối quan hệ ngữ nghĩa và tính nhất quán, phát hiện mâu thuẫn.
  - Lợi ích: Tự động hóa các khía cạnh đánh giá cần con người, cung cấp phép đo có cấu trúc, nhất quán, khách quan. Đánh giá các sắc thái tinh tế như bao phủ, trùng lặp, mâu thuẫn logic.
  - Trường hợp sử dụng: Hệ thống Hỏi-Đáp, kiểm tra chính xác/đầy đủ bản tóm tắt AI, so sánh chất lượng đầu ra giữa các phiên bản model/prompt.
  - Cân nhắc quan trọng: Hiệu quả phụ thuộc vào năng lực của chính LLM làm "người đánh giá" và chất lượng prompt đánh giá. Đánh giá bởi con người vẫn rất quan trọng với tác vụ phức tạp hoặc chủ quan cao.

# Self-Prompting

## Khái niệm

- **Self-Prompting**: Phương pháp cho phép mô hình tự động viết, đánh giá và tối ưu hóa prompt của chính nó
- Giải quyết vấn đề phụ thuộc vào prompt engineering thủ công, đòi hỏi nhiều thử nghiệm và thiếu tính nhất quán
- Giảm sự phụ thuộc vào con người trong việc thiết kế prompt

## Chain-of-Thought Prompting (CoT)

- Cho phép mô hình giải quyết các nhiệm vụ phức tạp bằng cách phân rã vấn đề thành các bước trung gian
- Giúp mô hình tiếp cận vấn đề một cách hệ thống và hiệu quả hơn
- Cung cấp cái nhìn trực quan về quá trình suy luận của mô hình, giúp phát hiện và sửa lỗi nếu có

## Framework Self-Prompting

### Giai đoạn Preparation (Chuẩn bị)

- Mô hình tạo ra các bộ câu hỏi và câu trả lời giả lập
- Bao gồm các đoạn văn bản nền tảng và giải thích hoàn toàn từ đầu
- Sử dụng các ví dụ này để học trong ngữ cảnh

### Giai đoạn Inference (Suy luận)

- Mô hình sử dụng kiến thức đã học từ giai đoạn Preparation để trả lời các câu hỏi thực tế
- Tự động đánh giá và tối ưu hóa prompt để cải thiện hiệu suất

## Ứng dụng

- Đặc biệt hiệu quả trong các tác vụ **Zero-Shot Open-Domain QA** (Câu hỏi-Đáp mở không có ví dụ)
- Cải thiện độ chính xác của mô hình trong các tác vụ phức tạp mà không cần dữ liệu huấn luyện cụ thể
- Giảm thiểu nhu cầu về dữ liệu được gán nhãn và công sức thiết kế prompt thủ công