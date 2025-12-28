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

# 1. Làm lều

- Sức chứa: 3-4 người.
- Trọng lượng: 3kg.
- Loại vải: Dyneema Composite (Cuben Fiber), Polyester phủ silicone, Oxford polyester.

## 1.1. May đáy

- Kích thước đáy sau khi may: 2x2m.
- Chuẩn bị vải chống nước có kích thước 2.5x2.5m.
- Gấp vải thành hình hồ bơi sao cho mặt đáy có kích thước 2x2m.
- Kẹp miếng cố định khung lều vào mặt ngoài của đoạn mép vải đã gấp.
- May đoạn mép vải đã gấp để cố định.

## 1.2. Khung

- Chiều cao lều: 1.2m.
- Khung lều: Hợp kim nhôm, 2 thanh, mỗi thanh 4.11m (nửa chu vi của hình ellipse có bán kính nhỏ bằng sqrt(2) và bán kính lớn là 1.2).
- Móc khung vào các miếng cố định của đáy, đan chéo nhau, cố định bằng dây thừng.

## 1.3. Màn chống côn trùng

- Dùng miếng kẹp để treo màn vào khung và đáy.

## 1.4. May áo chống mưa cho lều

- Chuẩn bị vải chống nước có kích thước 3x3m (do độ dài đường chéo phải dài bằng độ dài khung => độ dài cạnh = 2.9 => cộng thêm 0.1 thành 3 dể trừ hao).
- Phủ áo chống mưa ngoài lều.
- Cố định áo chống mưa vào 4 góc của lều.
- Phần thừa có thể để nguyên hoặc dùng kẹp kẹp lại (áp dụng cho cả cửa).

# 2. Code tool giao dịch, quản lý tài chính

## 2.1. Tài liệu tham khảo

- https://academy.openai.com/public/clubs/work-users-ynjqu/resources/use-cases-finance
- https://www.facebook.com/permalink.php?story_fbid=pfbid02W4ebZqJeLktqGA6e1iyq6c6tmoQEnViFe1NgFVgzytXYyNMLtYy5bAWxbdbNTSCzl&id=100074305494707

# 3. Vocab

- PhoTranscriptor - Ứng dụng transcribe ngôn ngữ tiếng Việt dành cho nhà nghiên cứu: https://www.facebook.com/meousensei/posts/pfbid0sKSPNQkduSiAY2TX9CjZJ795Z6ACBjkNtqy7QJVc1ZhMhevtarjeUNKKHi17WJXFl
- Text 2 speech: https://github.com/KittenML/KittenTTS

# 4. NS Store

- Làm trang quảng cáo
- Làm trang tạo mẫu áo dựa vào AI và có thể upload hình để tạo mẫu áo
- Ý tưởng mới: Sản phẩm quét hình ảnh đồ vật và con người để dung ra vật thể 3D, từ đó phát công cụ thử đồ online
- Hậu cần có thể sử dụng https://burgerprints.com

# 5. NS Money

- Làm widget app.
- React native.
- Thông báo theo giờ cài đặt (ngày 3 lần mặc định).
- thêm tính năng đặt mục tiêu cho money.
- Tạo thêm bot telegram.

# 6. IoT

## 6.1. Camera

- https://hshop.vn/kit-rf-thu-phat-wifi-ble-esp32-cam
- Làm camera phát hiện di chuyển và stream video
- https://www.youtube.com/watch?v=HK57H3mzQ_c
- Setup mô phỏng ESP32 và setup VSCode cho IoT
  - https://www.facebook.com/watch/?ref=saved&v=1372564440378160
- https://www.jeffgeerling.com/blog/2025/how-i-monitor-and-control-all-my-powered-devices-zigbee-ha

## 6.2. Kính

- https://www.facebook.com/reel/1664889724380657
- https://www.facebook.com/reel/533452956179734
- Setup mô phỏng ESP32 và setup VSCode cho IoT
  - https://www.facebook.com/watch/?ref=saved&v=1372564440378160
- Nghiên cứu về pin: https://cafef.vn/dot-pha-vo-song-trung-quoc-tim-ra-cong-nghe-phuc-hoi-pin-lithium-ion-da-bi-chai-khong-can-thao-roi-van-dua-duoc-pin-ve-trang-thai-nhu-moi-xuat-xuong-co-the-dat-tuoi-tho-60000-chu-ky-sac-xa-trong-164-nam-188250216112303946.chn

## 6.3. Drone

# 7. Sóng âm

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
