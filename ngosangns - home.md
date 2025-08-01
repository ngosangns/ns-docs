---
tags:
  - general
  - golang
  - home
  - inceptionlabs
  - money
  - ngosangns
  - nhamayquangphu
  - personal
  - vietnamese
  - vocab
---

- Nên giữ kỉ luật tốt.
- Làm đúng yêu cầu của khách hàng.
- Đừng quên nỗi đau / nỗi hận của chính mình.
- Không sợ chai mặt.

# 1. Inceptionlabs

- Tìm hiểu edx-platform: https://github.com/openedx/edx-platform

# 2. Quick notes

- Luyện tập debate.
- Viết tool quét source và parse AST + comment của class sang react diagram có khả năng expand và group theo module, export ra json file và hiển thị bằng ERD Editor - VS Code extensiosns hoặc https://tsdiagram.com. Tham khảo: https://github.com/demike/TsUML2

## 2.1. NS Order

- Làm dự án kết nối provider với customer thông qua đơn hàng, đơn hàng có thể là bất cứ thứ gì, làm flexible nhưng cũng có thể có một số định nghĩa đơn hàng như kiểu enum để áp dụng.

## 2.2. Vocab

- PhoTranscriptor - Ứng dụng transcribe ngôn ngữ tiếng Việt dành cho nhà nghiên cứu: https://www.facebook.com/meousensei/posts/pfbid0sKSPNQkduSiAY2TX9CjZJ795Z6ACBjkNtqy7QJVc1ZhMhevtarjeUNKKHi17WJXFl

## 2.3. nhamayquangphu

- Làm trang quảng cáo
- Làm trang tạo mẫu áo dựa vào AI và có thể upload hình để tạo mẫu áo
- Ý tưởng mới: Sản phẩm quét hình ảnh đồ vật và con người để dung ra vật thể 3D, từ đó phát công cụ thử đồ online
- Hậu cần có thể sử dụng https://burgerprints.com
- https://docs.medusajs.com

## 2.4. NS Money

- Làm widget app.
- React native.
- Thông báo theo giờ cài đặt (ngày 3 lần mặc định).
- thêm tính năng đặt mục tiêu cho money.
- Tạo thêm bot telegram.

## 2.5. Web đa năng

- Tạo trang web chứa kiến thức muốn lưu trữ lâu dài và sẽ hiển thị ra theo thời gian đường cong trí nhớ. Khi đã tiếp thu xong sẽ nhấn nút check và kiến thức đó sẽ hiển thị trong lần đường cong tri nhớ tiếp theo
- Tạo trang web để thảo luận nơi mà một bài văn dài có thể tách ra thành các luận điểm nhỏ hơn, mỗi luận điểm là một sub thread. Các sub thread được liên kết với nhau theo dạng graph.
	- Hiển thị tree trên góc màn hình.
	- Có thể tạo thread để bàn luận.
	- Tạo subthread một cách trực quan.
	- Support ẩn danh.

## 2.6. IoT

### 2.6.1. Camera

- https://hshop.vn/kit-rf-thu-phat-wifi-ble-esp32-cam
- Làm camera phát hiện di chuyển và stream video
- https://www.youtube.com/watch?v=HK57H3mzQ_c
- Setup mô phỏng ESP32 và setup VSCode cho IoT
	- https://www.facebook.com/watch/?ref=saved&v=1372564440378160

### 2.6.2. Kính

- https://www.facebook.com/reel/1664889724380657
- https://www.facebook.com/reel/533452956179734
- Setup mô phỏng ESP32 và setup VSCode cho IoT
	- https://www.facebook.com/watch/?ref=saved&v=1372564440378160
- Nghiên cứu về pin: https://cafef.vn/dot-pha-vo-song-trung-quoc-tim-ra-cong-nghe-phuc-hoi-pin-lithium-ion-da-bi-chai-khong-can-thao-roi-van-dua-duoc-pin-ve-trang-thai-nhu-moi-xuat-xuong-co-the-dat-tuoi-tho-60000-chu-ky-sac-xa-trong-164-nam-188250216112303946.chn

### 2.6.3. Drone

## 2.7. Sóng âm

- https://www.facebook.com/reel/560138376963731
- LeviPrint
- Levitation by sound
- Biến WiFi Router thành “Camera” dùng AI
	- Ý tưởng chính
	    - Dùng AI kết hợp sóng WiFi để theo dõi chuyển động con người xuyên tường
	    - Biến WiFi router thành "camera ảo" không cần hình ảnh trực quan
	- Nguyên lý hoạt động
	    - Sóng WiFi có thể xuyên qua tường và phản xạ từ cơ thể người
	    - AI phân tích tín hiệu phản xạ để tái tạo hình dáng và chuyển động
	        - Dùng mô hình học sâu (deep learning)
	        - Ánh xạ tín hiệu WiFi thành khung xương người 3D
	- Kết quả
	    - Nhận diện tư thế và hành động người chính xác
	    - Không cần gắn thiết bị lên người
	    - Hoạt động được qua vật cản như tường
	- Ứng dụng tiềm năng
	    - An ninh và giám sát
	        - Theo dõi người trong phòng kín
	        - Không cần camera truyền thống
	    - Hỗ trợ y tế và chăm sóc người già
	        - Phát hiện té ngã hoặc chuyển động bất thường
	    - Ứng dụng trong thực tế ảo (VR) / tăng cường thực tế (AR)
	        - Theo dõi cơ thể người dùng mà không cần cảm biến đeo
	    - Tìm kiếm và cứu hộ
	        - Xác định vị trí người trong các khu vực bị sập, cháy nổ
	- Rủi ro và vấn đề đạo đức
	    - Xâm phạm quyền riêng tư
	        - Có thể theo dõi người mà họ không biết
	    - Nguy cơ bị lạm dụng
	        - Dùng cho mục đích giám sát trái phép
	    - Cần quy định pháp luật rõ ràng
	        - Giới hạn ứng dụng và giám sát chặt chẽ
