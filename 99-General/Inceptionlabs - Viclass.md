---
relates:
  - "[[Inceptionlabs]]"
---
# 1. Resources

- Diagrams: https://drive.google.com/drive/folders/1-OhyI-SnyOhiU9NUP8_u6dpvKNd_xq9Y
- [[Viclass - 514 - Synchronize mouse position & mouse shape of the presenter]]
- [[viclass - 752 - Make it easier to create account for user to experience the beta system]]
- [[viclass - 757 - Geo editor - Enhancing User Experience in Geo Editor Settings Flow]]
- [[Viclass - Load classroom coordinator states]]
- [[Viclass - editor.geo]]

# 2. Editor

- Word editor: https://docs.google.com/document/d/13huDOra27L_Y23zsEEBlVWGEn6ZgjWzPs2WtOaGyWgY/edit#heading=h.p2kn19pkysf8

# 3. Lưu ý

## 3.1. CCS

- Khi start CCS ở local cần start kèm cái syncer.
- Khi start syncer ở local cần cập nhật peerid trong config bằng cách lấy id của record mới nhất có `peerType` là `SYNCER` trong mongodb.

## 3.2. Bson - Pojo

- Khi define array property nên dùng `List<T>`, dùng loại khác dễ lỗi.

## 3.3. Canvas

- `viewport.currentLookAt` use canvas coord.