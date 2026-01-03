---
tags:
  - area/technology
  - domain/algorithms
  - topic/golang
  - type/resource
  - lang/vi
---

# Recursion (Đệ quy)

## Khái niệm

- Một hàm là đệ quy khi đầu ra phụ thuộc vào lời gọi chính nó với input khác trước đó
- Mỗi lần gọi lại phải tiến gần tới điều kiện dừng, nếu không sẽ không bao giờ dừng

## Ví dụ

```go
func recursive(a int) {
	// TODO: implement break conditions
	return recursive(a + 1)
}
```
