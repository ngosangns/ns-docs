---
tags:
  - cac
  - cau
  - concise
  - frontend
  - frontend-development
  - hoi
  - javascript
  - phong
  - quick-reference
  - van
  - vietnamese
  - vue
  - vuejs
  - web-development
---

1. `KeepAlive` tag là gì?
    
    `<KeepAlive>` is a built-in component that allows us to conditionally cache component instances when dynamically switching between multiple components (`KeepAlive` tag sử dụng để giữ trạng thái hiện có của component và tránh việc render lại component quá nhiều lần. Các đối tượng được đóng ở trong `KeepAlive` tag sẽ được giữ instances).
    
    `KeepAlive` component đặc biệt hữu ích ở các component stepper. Một khi đã lưu các thông tin ở step này, back lại sẽ có ngay, không phải render.
    
    Ngoài việc không phải render lại (về perfomance), sử dụng `KeepAlive` tag còn tránh việc sử dụng store vô tội vạ để lưu trữ khi back đi back lại.