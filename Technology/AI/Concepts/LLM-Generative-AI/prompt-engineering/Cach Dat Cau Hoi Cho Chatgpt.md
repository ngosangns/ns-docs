---
area: technology
domain: ai-ml
type: resource
---
Chỉ trong vài tháng qua, ChatGPT đã trở thành trợ lý, thành partner, thành mentor cho rất nhiều người. Nhưng không phải ai cũng nắm được cách sử dụng ChatGPT làm sao cho thật sự hiệu quả và áp dụng vào trong đời sống và công việc hàng ngày. Bài viết này dành cho những bạn đã từng sử dụng ChatGPT nhưng vẫn chưa cảm thấy nó thực sự hữu ích và phục vụ được đúng mục đích mình mong muốn. Cũng chỉ là trải nghiệm của thằng lớp 2 đi chia sẻ lại cho thằng 1 nên hi vọng các anh em lớp 5 lớp 6 chém nhẹ tay và góp ý thêm.

## 0.1. **1. CONTEXT IS KING**

Cũng như nói chuyện với bất kỳ ai, bạn muốn người khác hiểu mình thì bạn cần phải đưa thông tin một cách rõ ràng, rành mạch. ChatGPT được xây dựng để nói chuyện với bạn như người thật, vậy nên để có được sự hiệu quả khi sử dụng, hãy giao tiếp với ChatGPT như người thật vậy.

Khi giao nhiệm vụ cho ChatGPT, hình dung bạn đang giao việc cho một nhân viên mới, chưa biết gì về công ty, chưa được giao chức vụ gì. Hãy nói cho ChatGPT biết:

- **Vai trò của ChatGPT ở đây là gì**: là một E-commerce Product Manager, là một senior Python developer, là HR expert, là chuyên gia tư vấn tâm lý, là người bạn tâm sự. ChatGPT có thể đóng vai gần như bất kể vai trò gì bạn có thể nghĩ ra, nhưng nếu bạn không nói rõ, câu trả lời bạn nhận được sẽ rất chung chung. Nói ra vai trò sẽ giúp ChatGPT roleplay một cách hiệu quả hơn, đưa ra được những câu trả lời có ngôn ngữ phù hợp hơn, nội dung có chiều sâu hơn.

Act as a `{role}`In the role of a `{role}`Imagine yourself as a `{role}`

- **Bối cảnh của nhiệm vụ**: Đây là lúc để bạn cung cấp cho ChatGPT về hiện trạng bây giờ, thứ bạn mong muốn đạt được và hình thức để làm điều đó. Thay vì bảo ChatGPT `Write me a proposal email for a partnership`, hãy cung cấp thêm thông tin về công ty của bạn, về đối tác mà bạn đang muốn gửi mail, về proposal của bạn. Kết hợp với việc cung cấp vai trò ở bước trước, một prompt cung cấp bối cảnh tốt sẽ có dạng thế này:

Act as a Business Development expert. Please write me a partnership proposal email **to LarkSuite, a giant in building a Digital Workplace platform. Our company is KD Digital, an outsourcing company that focuses on digitalization. We want to partner with LarkSuite to sell their solution at a better price for Vietnam while expanding their appearance and coverage.**

- **Hình thức câu trả lời:** Câu trả lời bạn nhận được với prompt trên đôi khi vẫn sẽ bị quá dài hoặc quá ngắn, hoặc không theo format bạn mong muốn. Giải pháp là hay đưa thêm các reference về writing format (`use AIDA/ PAS/ FAB writing format`), độ dài mong muốn (`100 words`, `3 paragraphs`, `5 minutes script`), ngôn từ (`simple language`, `explain like i'm five`, `use jargons`) hoặc nếu có sẵn một ví dụ, hãy đưa luôn ví dụ đó cho ChatGPT (`following the style of this email`, `you can use the following email for reference`, `here is a sample that you can follow`)

Act as a Business Development expert. Please write me a partnership proposal email to LarkSuite, a giant in building a Digital Workplace platform. Our company is KD Digital, an outsourcing company that focuses on digitalization. We want to partner with LarkSuite to sell their solution at a better price for Vietnam while expanding their appearance and coverage. **This email should be written in AIDA format and is under 300 words. Please use simple language, without any jargon.**

## 0.2. **2. ORGANIZE WITH VARIABLE**

Tất cả những yếu tố ở bước trên có thể được sắp xếp lại để prompt của bạn trông ngắn gọn hơn bằng việc sử dụng biến. Và đây là cách tốt nhất để bạn tận dụng lại những prompt đã có để xây thành công thức. Thực tế là những bộ sưu tập 500, 1000 prompts ChatGPT rao bán hàng ngày ở trên thị trường toàn là bê công thức ra thay từ vào để mass production.

Act as a [role] of [company]. Please write me a partnership proposal email in [format] to [partner].[role]: Business Development Expert[company]: KD Digital, an outsourcing company that focuses on digitalization[format]: AIDA format with under 300 words, using simple language, without any jargon.[partner]: LarkSuite, a giant in building a Digital Workplace platform.

Bạn có thể viết biến theo dạng `[variable]` như mình viết ở trên, hay `{variable}`, `{{variable}}`, `$variable` gì đó đều được cả, không bắt buộc. Miễn sao cho ChatGPT hiểu đấy là biến là được. Việc sử dụng biến cho phép bạn tách biệt nhiệm vụ cần làm với context. Giúp việc đọc nhiệm vụ của ChatGPT cũng trở nên dễ hiểu hơn mà có được nhiều context hơn. Ví dụ, bạn có thể viết cả 1 đoạn văn dài về công ty của bạn, tone of voice bạn muốn, target audiences là ai vào phần `[company]`. Nhưng nếu viết hết chỗ đó vào trong prompt như lúc trước thì chắc chắn đọc sẽ rất rối, lan man và khó hiểu.

## 0.3. **3. GRAMMAR POLICE**

Bản chất của ChatGPT cũng là dự đoán từ tiếp theo hiển thị. Training data càng lớn thì việc dự đoán từ càng hiệu quả. Mà đa phần training data của ChatGPT là tiếng Anh. Nên mặc dù ChatGPT có hỗ trợ tiếng Việt, nhưng nếu được, mình vẫn khuyên các bạn sử dụng tiếng Anh để có câu trả lời chất lượng nhất.

Nhưng tiếng Anh không phải thế mạnh của nhiều người, nên việc sai chính tả, ngữ pháp, từ ngữ là khó tránh khỏi. Nhưng cũng như người miền Nam mà ra miền Bắc xin cái chén thôi, thứ bạn nhận được khả năng cao sẽ không như bạn mong muốn. Dù rằng ChatGPT giờ đủ thông minh để nhận diện các lỗi vặt như chia sai động từ, thì, nhưng nếu câu cú lủng củng thì cũng khó cho ChatGPT quá. Mình gợi ý vẫn nên dùng Grammarly để sửa lại câu từ nếu cần thiết. Hoặc thêm một câu thần chú ở cuối

If you understand your assignment, please execute the prompt. In case there is anything you are unsure of, please give me some questions so I can clarify it.

hoặc

If you understand your assignment, please summarize it in simple language before continuing.

Cách này sẽ giúp bạn kiểm tra được ChatGPT có thực sự hiểu nhiệm vụ được giao hay không.

## 0.4. **4. DIVIDE AND CONQUER**

Để đạt hiệu quả câu nhất, hãy chia nhỏ việc ra trước khi yêu cầu ChatGPT thực hiện. Nếu một công việc có 5 bước. Hãy bảo ChatGPT thực hiện bước 1, sau khi nhận được câu trả lời hẵng bảo làm tiếp bước 2 và tiếp tục. Như vậy, ChatGPT có thể cung cấp được câu trả lời chính xác và chi tiết hơn cho từng phần. Ví dụ, thay vì bảo ChatGPT viết nội dung cho toàn bộ trang landing page trong 1 prompt, hãy chia ra bảo viết phần Hero trước, rồi đến phần Features, About Us.

Khi chia nhỏ việc ra, một thủ thuật khác bạn có thể áp dụng đó là yêu cầu ChatGPT đưa ra một vài các kết quả khác nhau cho prompt để bạn có thể lựa chọn, chỉnh sửa, kết hợp ý. Sau đó có thể hỏi tiếp ChatGPT đánh giá các kết quả trả về xem câu trả lời nào tốt nhất và tại sao.

Act as a Business Development expert. Please write me **3 possible variants** of a partnership proposal email to LarkSuite, a giant in building a Digital Workplace platform. Our company is KD Digital, an outsourcing company that focuses on digitalization. We want to partner with LarkSuite to sell their solution at a better price for Vietnam while expanding their appearance and coverage. This email should be written in AIDA format and is under 300 words. Please use simple language, without any jargon.

## 0.5. **5. EVIDENCE**

Trả tiền cho GPT-4 hay ChatGPT Plus sẽ giúp bạn bớt đi nhiều những câu trả lời bịa đặt nhận được từ phía ChatGPT. Nhưng có một cách khác tốt hơn, và rẻ hơn, đó là yêu cầu ChatGPT đưa thêm dẫn chứng, nguồn, ví dụ minh hoạ cho câu trả lời của mình.

Với việc yêu cầu thêm dẫn chứng, không những bạn nhận được câu trả lời có độ uy tín cao hơn từ ChatGPT. Đây cũng sẽ là 1 input cho ChatGPT trong suốt thread nói chuyện đó rằng ChatGPT cần ưu tiên đưa cho bạn những thông tin chính xác và đã được kiểm chứng.

ChatGPT Plus hiện đã có thêm tính năng web browsing, việc yêu cầu ChatGPT đưa ra evidence lại càng hữu ích hơn khi nó giúp bạn có thêm nguồn tài liệu để xem và tham khảo thêm trước khi đưa ra yêu cầu tiếp theo cho ChatGPT. (Hoặc bảo ChatGPT tìm thêm tài liệu tương tự, đọc hết chỗ đấy và tạo ra một bài mới cho bạn...)

## 0.6. **6. FLOW IS BETTER THAN PROMPT**

Perfect prompt là điều mà rất nhiều người tìm kiếm. Nhiều người không dùng ChatGPT hàng ngày nói với mình rằng lý do là khi định hỏi thì lại không biết hỏi như thế nào cho tốt, để có được kết quả tốt nhất. Đấy cũng là insight giúp cho những người bán các pack 500-1000 prompts build sẵn hay những extension như AIPRM, các chợ prompt như PromptHunt kiếm được tiền. Gần nhất chúng ta còn có Prompt Perfect, một ứng dụng tự động viết lại prompt của bạn để tối ưu kết quả bạn nhận được. Prompt Perfect giờ cũng trở thành 1 plugins trong ChatGPT Plus.

Tuy nhiên, điều mình muốn nói ở đây là sức mạnh của ChatGPT nằm ở việc giao tiếp qua lại, trao đổi. Có những lúc bạn có thể có được câu trả lời mong muốn từ ChatGPT chỉ với 1 prompt, nhưng cũng có những lúc, đó là cả một quá trình. Như ở trên mình có nói, để bảo ChatGPT viết content cho landing page hiệu quả, cần tách việc ra. Và đương nhiên không phải bạn tạo 5 cái thread khác nhau, mỗi thread bảo ChatGPT viết một phần, và lại phải đưa lại hết context mỗi lần. Điều bạn cần làm khi đó là:

Bước 1: Cung cấp context, yêu cầu ChatGPT tạo ra khung sườnBước 2: Review, đưa ra feedback về khung sườn đó xem có cần chỉnh sửa gì khôngBước 3: Bắt đầu lần lượt bảo ChatGPT viết từng phần của landing page và review từng phần đó

Mình cũng thường xuyên brainstorming với ChatGPT khi lên một idea gì đó. Giả sử như muốn lên ý tưởng cho một business mới, đây là cách mình sẽ làm:

Bước 1: Nói về ý tưởng với ChatGPT, nhờ ChatGPT đưa ra outline về những việc cần làmBước 2: Cùng nhau giải quyết từng phần, bảo ChatGPT đặt câu hỏi, câu nào khó quá không trả lời được hoàn toàn có thể bảo ChatGPT trả lời hộ luôn xem có ổn không.Bước 3: Sau khi có một bức tranh khá toàn diện xong. Mình sẽ bảo ChatGPT summary tất cả lại để mình có thể dùng đoạn summary này làm context cho lần sau nói chuyện.Bước 4: Tạo mới các thread detailed về việc build sản phẩm, marketing và lấy cái summary ở trên để đưa vào biến làm context cho các thread mới này

Việc tách thread riêng rẽ sẽ giúp cho ChatGPT tập trung vào nhiệm vụ khi đó, summary giúp ChatGPT vẫn có được bức tranh tổng quan về business. Có thể hiểu là lúc này bạn vừa tạo ra 3 business partner/employee: 1 Co-founder ngồi nghĩ idea cùng bạn, 1 developer chuyên lo build sản phẩm và 1 marketer làm marketing. Mình khá chắc chắn sẽ không có cách nào để bạn làm được những điều vừa rồi với chỉ prompt. Và đấy cũng là điều mình thích nhất ở ChatGPT so với việc dùng Bard (context windows hẹp) và Bing (giới hạn số câu chat trong 1 thread)

## 0.7. **7. PRACTICE MAKES PERFECT**

Mục này để đây thôi. Ai cũng hiểu nó có ý nghĩa gì rồi.

Cảm ơn mọi người đã đọc hết bài. Nếu thấy bài viết helpful, đừng quên share tới bạn bè của mình để ChatGPT được lan toả rộng rãi hơn.
