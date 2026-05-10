---
area: technology
domain: system-design
type: note
---
# Mẫu thiết kế Cache-Aside (Nạp bộ nhớ đệm theo yêu cầu)

Mẫu này nạp dữ liệu vào bộ nhớ đệm theo yêu cầu từ một kho dữ liệu. Sử dụng mẫu này để cải thiện hiệu suất và duy trì tính nhất quán giữa dữ liệu trong cache và dữ liệu trong kho dữ liệu bên dưới.

## 1. Ngữ cảnh và Vấn đề
Các ứng dụng sử dụng bộ nhớ đệm để cải thiện hiệu suất khi truy cập thông tin lặp lại. Tuy nhiên, dữ liệu trong cache không phải lúc nào cũng nhất quán với kho dữ liệu gốc. Cần có chiến lược để:
- Giữ dữ liệu trong cache luôn mới nhất có thể.
- Phát hiện khi dữ liệu trong cache trở nên cũ (stale) và xử lý phù hợp.

## 2. Giải pháp
Mẫu Cache-Aside nạp dữ liệu vào cache khi cần thiết. Quy trình như sau:
1.  **Đọc:** Ứng dụng kiểm tra xem mục dữ liệu có trong cache không.
2.  **Cache Miss:** Nếu không có, ứng dụng đọc dữ liệu từ kho gốc (Database).
3.  **Lưu:** Ứng dụng lưu dữ liệu vừa đọc vào cache và trả về cho người gọi.

Khi cập nhật thông tin, ứng dụng thực hiện cập nhật vào kho lưu trữ gốc và xóa (invalidate) mục tương ứng trong cache để đảm bảo tính nhất quán.

## 3. Các vấn đề và Cân nhắc
- **Thời gian sống (TTL):** Đừng đặt quá ngắn (gây tải cho DB) hoặc quá dài (dữ liệu bị cũ).
- **Chính sách xóa (Eviction policy):** Cache có kích thước giới hạn, cần chính sách như LRU (Least Recently Used) để giải phóng không gian.
- **Tính nhất quán:** Mẫu này không đảm bảo tính nhất quán ngay lập tức nếu dữ liệu trong DB bị thay đổi bởi một tiến trình bên ngoài.
- **Thứ tự cập nhật:** Quan trọng là phải cập nhật kho dữ liệu gốc *trước* khi xóa mục trong cache để tránh tình trạng nạp lại dữ liệu cũ vào cache.

## 4. Khi nào nên sử dụng
- Khi hệ thống cache không cung cấp các thao tác read-through/write-through tự động.
- Khi nhu cầu về tài nguyên không thể dự đoán trước.

## 5. Khi nào KHÔNG nên sử dụng
- Khi dữ liệu nhạy cảm hoặc liên quan đến bảo mật (nên truy cập trực tiếp từ nguồn chính).
- Khi tập dữ liệu là tĩnh (nên nạp sẵn hoàn toàn khi khởi động).
- Khi hầu hết các yêu cầu đều không trúng cache (overhead của việc kiểm tra cache sẽ làm giảm hiệu suất).

## 6. Ví dụ triển khai (.NET)

```csharp
public async Task<MyEntity> GetMyEntityAsync(int id)
{
    var key = $"MyEntity:{id}";
    var cache = Connection.GetDatabase();

    // 1. Thử lấy dữ liệu từ cache
    var json = await cache.StringGetAsync(key);
    if (!string.IsNullOrWhiteSpace(json))
    {
        return JsonConvert.DeserializeObject<MyEntity>(json);
    }

    // 2. Cache miss: Lấy từ DB gốc
    var value = await _db.MyEntities.FindAsync(id);

    if (value != null)
    {
        // 3. Lưu vào cache với thời gian hết hạn (ví dụ 5 phút)
        await cache.StringSetAsync(key, JsonConvert.SerializeObject(value), TimeSpan.FromMinutes(5));
    }

    return value;
}

public async Task UpdateEntityAsync(MyEntity entity)
{
    // 1. Cập nhật DB trước
    await _db.UpdateAsync(entity);

    // 2. Xóa cache sau
    var key = $"MyEntity:{entity.Id}";
    var cache = Connection.GetDatabase();
    await cache.KeyDeleteAsync(key);
}
```

---
*Nguồn: [Azure Architecture Center - Cache-Aside pattern](https://learn.microsoft.com/en-us/azure/architecture/patterns/cache-aside)*