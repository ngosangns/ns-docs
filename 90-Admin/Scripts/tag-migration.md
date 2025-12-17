---
title: Tag Migration Script
tags: ["type/script", "lang/vi"]
created: 2025-12-17
---

## Mục tiêu

Script để migrate tags từ format cũ sang format mới theo chuẩn đã định

## Migration Rules

### 1. Business Folder → Project Tags

```javascript
// Business/Troodonlabs/* → add tag "project/troodonlabs"
// Business/Viclass/* → add tag "project/viclass"
// Business/Freelance/* → add tag "project/freelance"
// Business/Vietop/* → add tag "project/vietop"
```

### 2. Technology Folder → Area + Domain Tags

```javascript
// Technology/AI-ML/* → add tags ["area/technology", "domain/ai-ml"]
// Technology/Backend-Database/* → add tags ["area/technology", "domain/backend"]
// Technology/Frontend/* → add tags ["area/technology", "domain/frontend"]
// Technology/Cloud-DevOps/* → add tags ["area/technology", "domain/devops"]
// Technology/System-Design/* → add tags ["area/technology", "domain/system-design"]
// Technology/Security/* → add tags ["area/technology", "domain/security"]
// Technology/Computer-Science/* → add tags ["area/technology", "domain/cs"]
// Technology/Programming-Languages/* → add tags ["area/technology", "domain/programming"]
// Technology/Interview-Preparation/* → add tags ["area/technology", "domain/interview"]
// Technology/Tools-Utilities/* → add tags ["area/technology", "domain/tools"]
// Technology/Documentation/* → add tags ["area/technology", "domain/docs"]
```

### 3. English Folder → Area Tags

```javascript
// English/* → add tag "area/english"
// Nếu là howto → add tag "type/howto"
// Nếu là resource → add tag "type/resource"
// Nếu là plan → add tag "type/plan"
```

### 4. Fashion Folder → Area Tags

```javascript
// Fashion/* → add tag "area/fashion"
```

### 5. Travel Folder → Area + Type Tags

```javascript
// Travel/* → add tag "area/travel"
// Nếu là plan → add tag "type/plan"
// Nếu là resource → add tag "type/resource"
```

### 6. Personal Development Folder → Area Tags

```javascript
// Personal Development/* → add tag "area/personal-dev"
```

### 7. Media Tags Standardization

```javascript
// "excalidraw" → "media/excalidraw"
// "Excalidraw" → "media/excalidraw"
// "pdf" → "media/pdf"
// "img" → "media/img"
// "canvas" → "media/canvas"
```

### 8. Language Detection & Tagging

```javascript
// Nếu content chứa tiếng Việt → add tag "lang/vi"
// Nếu content chứa tiếng Anh → add tag "lang/en"
// Nếu cả hai → add cả hai tags
```

### 9. Topic Standardization

```javascript
// "js" → "topic/javascript"
// "ai" → "topic/ai-ml"
// "ml" → "topic/ai-ml"
// "react" → "topic/react"
// "vue
```
" → "topic/vue"
// "aws" → "topic/aws"
// "docker" → "topic/docker"
// "k8s" → "topic/kubernetes"
// "mysql" → "topic/mysql"
// "postgres" → "topic/postgresql"
```

## Manual Migration Steps

### Step 1: Backup
1. Tạo backup toàn bộ vault
2. Commit hiện tại vào git (nếu có)

### Step 2: Business Folder Migration
```bash
# Di chuyển và cập nhật tags cho từng project
# Thực hiện thủ công từng file hoặc dùng find & replace
```

### Step 3: Technology Folder Migration
```bash
# Thêm area/technology + domain tương ứng
# Cập nhật type nếu chưa có
# Thêm lang tag nếu chưa có
```

### Step 4: Media Tags Update
```bash
# Find & replace trong toàn bộ vault
find . -name "*.md" -exec sed -i 's/\"excalidraw\"/\"media\/excalidraw\"/g' {} \;
find . -name "*.md" -exec sed -i 's/\"Excalidraw\"/\"media\/excalidraw\"/g' {} \;
```

### Step 5: Language Tagging
```bash
# Review từng file và thêm lang tag phù hợp
# Có thể dùng regex để detect ngôn ngữ
```

## Validation Queries

### Kiểm tra migration hoàn tất
- Kiểm tra `Business/*` đã có `project/*` bằng VS Code `Search`

### Kiểm tra technology tags
- Kiểm tra `Technology/*` đã có `area/technology` bằng VS Code `Search`

### Kiểm tra media tags
- Tìm `excalidraw` chưa chuyển sang `media/excalidraw` và cập nhật

## Lưu ý Quan Trọng

1. **Luôn backup trước khi migrate**
2. **Test trên 1-2 files trước**
3. **Kiểm tra kết quả sau mỗi bước**
4. **Có thể rollback nếu cần**
5. **Document những thay đổi đặc biệt**

## Post-Migration Tasks

- [ ] Kiểm tra tất cả MOCs hoạt động đúng
- [ ] Verify liên kết và tags bằng VS Code `Search`
- [ ] Test templates mới
- [ ] Update workflow documentation
- [ ] Training nếu có người dùng khác
