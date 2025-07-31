---
tags:
  - configuration
  - definitions
  - editor
  - enhancing
  - experience
  - fields
  - general
  - improved
  - quick-reference
  - scenario
  - setting
  - settings
  - user
  - viclass
  - vietnamese
---

To improve the user experience in the Geo Editor, we will introduce the ability to configure settings for multiple selected objects simultaneously, eliminating the need to adjust them individually. Additionally, this update will address the issue of selecting a shape not automatically selecting the appropriate number of sides, ensuring a smoother and more intuitive interaction.

# 1. Definitions & Improved Flow

## 1.1. Definitions

1. Render Element (Đối tượng hiển thị) - A visual object that can be selected.
2. Selected Render Element (Các đối tượng hiển thị được lựa chọn) - The render elements that have been selected by the user.
3. Setting Field (Trường cài đặt) - A configurable property of a render element.
4. Setting Group (Nhóm cài đặt) - A way to categorize setting fields into different groups. Setting groups can include categories such as:
    - Border (Viền) - Stroke width, color.
    - Shape (Hình) - Type (circle, square, polygon), dimensions.
    - Corners (Góc) - Radius, rounding style.
    - Points (Điểm) - Number of points for polygons, distribution, and visibility.
5. Configuration of a Setting Field

Each setting field has the following properties:

- Field Name (Tên trường) - The name of the setting field.
- Conditional (Điều kiện) - Defines whether the field can be displayed in multiple setting groups simultaneously.
- Setting Group Name (Tên nhóm cài đặt) - Specifies the setting groups in which the field can be displayed.

### 1.1.1. Configuration Scenario:

- Render element - Line Segment
    - Nhóm cài đặt: Viền
    - Setting Fields:
        - Màu viền
        - Độ dày
        - Kiểu hiển thị
        - Kích thước
        - Nội dung hiển thị
- Render element - Rectangle
    - Nhóm cài đặt: Hình
    - Setting fields:
        - Màu nền
        - Hiển thị nền
- Render element - Point
- Render element - Corner

### 1.1.2. Setting Fields

- Color (Màu sắc)
    - Groups: [Shape (Hình), Point (Điểm)]
    - MultiGroup: `true`
    - MultipleItem: `true`
- Line Color (Màu viền)
    - Groups: [Line (Đường thẳng)]
    - MultiGroup: `true`
    - MultipleItem: `true`
- Stroke Style (Kiểu nét)
    - Groups: [Line (Đường thẳng)]
    - MultiGroup: `true`
    - MultipleItem: `true`
- Line Weight (Độ dày đường)
    - Groups: [Line (Đường thẳng)]
    - MultiGroup: `true`
    - MultipleItem: `true`
- Label Type (Loại nhãn)
    - Groups: [Line (Đường thẳng)]
    - MultiGroup: `false`
    - MultipleItem: `false`
- Show Label (Hiển thị nhãn)
    - Groups: [Line (Đường thẳng), Point (Điểm)]
    - MultiGroup: `true`
    - MultipleItem: `true`
- Swap Label Position (Đổi vị trí nhãn)
    - Groups: [Line (Đường thẳng)]
    - MultiGroup: `true`
    - MultipleItem: `true`
- Enable Equal Segment Sign (Kích hoạt ký hiệu đoạn thẳng bằng nhau)
    - Groups: [Line (Đường thẳng), Angle (Góc)]
    - MultiGroup: `true`
    - MultipleItem: `true`
- Equal Segment Sign (Ký hiệu đoạn thẳng bằng nhau)
    - Groups: [Line (Đường thẳng), Angle (Góc)]
    - MultiGroup: `true`
    - MultipleItem: `true`
- Space From Arc To Corner (Khoảng cách từ cung đến góc)
    - Groups: [Angle (Góc)]
    - MultiGroup: `true`
    - MultipleItem: `true`
- Show Angle Types (Hiển thị loại góc)
    - Groups: [Angle (Góc)]
    - MultiGroup: `true`
    - MultipleItem: `true`
- Angle Arc (Cung góc)
    - Groups: [Angle (Góc)]
    - MultiGroup: `true`
    - MultipleItem: `true`
- Show Arc Label (Hiển thị nhãn cung)
    - Groups: [Angle (Góc)]
    - MultiGroup: `true`
    - MultipleItem: `true`
- Arc Label Type (Loại nhãn cung)
    - Groups: [Angle (Góc)]
    - MultiGroup: `true`
    - MultipleItem: `true`
- Arc Label Content (Nội dung nhãn cung)
    - Groups: [Angle (Góc)]
    - MultiGroup: `true`
    - MultipleItem: `true`
- Is Show Angle Size (Hiển thị kích thước góc)
    - Groups: [Angle (Góc)]
    - MultiGroup: `true`
    - MultipleItem: `true`
- Hidden (Ẩn)
    - Groups: [Shape (Hình), Line (Đường thẳng), Point (Điểm), Angle (Góc)]
    - MultiGroup: `true`
    - MultipleItem: `true`