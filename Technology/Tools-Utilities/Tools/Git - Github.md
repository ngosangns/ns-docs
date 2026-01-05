---
tags:
  - area/technology
  - domain/tools
  - type/resource
  - lang/vi
---

# 1. Resources

- [[Git Workflows]]: Các mô hình workflow trong Git (Trunk Flow, Forking Flow)

# 2. Tools

- jj - A Git-compatible VCS that is both simple and powerful: https://github.com/jj-vcs/jj
- Git FTP: https://github.com/git-ftp/git-ftp

# 3. Self-hosted git server

- https://github.com/charmbracelet/soft-serve
- https://github.com/gogs/gogs

# 4. Git hooks

- https://github.com/evilmartians/lefthook

# 5. Git for data

- dolt: https://github.com/dolthub/dolt

# 6. GitHub Actions

- [github-local-actions](https://github.com/SanjulaGanepola/github-local-actions): Tool to run GitHub Actions workflows locally for testing and debugging. #GitHubActions #CI/CD

# 7. Commands

## 7.1. Git filter-repo

`git filter-repo` là một công cụ mạnh mẽ được dùng để **thay thế `git filter-branch` và BFG Repo-Cleaner**, giúp **thao tác, chỉnh sửa lịch sử của Git repository một cách an toàn và hiệu quả hơn**.

### 6.1.1. Công dụng chính của `git filter-repo`

- **Xóa file/thư mục khỏi toàn bộ lịch sử Git.**
- **Thay đổi tên người dùng và email trong commit history.**
- **Di chuyển nội dung từ một thư mục vào thư mục khác trong toàn bộ lịch sử.**
- **Lọc commit theo điều kiện nhất định (theo nội dung, thời gian, tác giả, v.v.).**
- **Tách một thư mục con thành một repository riêng biệt.**

### 6.1.2. **Vì sao nên dùng `git filter-repo` thay vì `git filter-branch` hay BFG?**

| Công cụ               | Hiệu suất     | Dễ dùng | Tính năng linh hoạt |
| --------------------- | ------------- | ------- | ------------------- |
| `git filter-branch`   | Chậm          | Khó     | Cao                 |
| BFG Repo-Cleaner      | Nhanh         | Dễ      | Hạn chế             |
| **`git filter-repo`** | **Rất nhanh** | **Dễ**  | **Rất linh hoạt**   |

### 6.1.3. 📦 **Cài đặt `git filter-repo`**

```bash
# Trên hệ thống có pip:
pip install git-filter-repo

# Hoặc từ source:
git clone https://github.com/newren/git-filter-repo.git
cd git-filter-repo
make prefix=/usr/local install
```

> **Lưu ý**: Bạn nên backup repository của mình trước khi dùng, vì thao tác này **sẽ thay đổi lịch sử commit vĩnh viễn**.

### 6.1.4. 🔧 **Ví dụ thực tế**

1. **Xóa toàn bộ thư mục `secrets/` khỏi mọi commit:**

```bash
git filter-repo --path secrets/ --invert-paths
```

2. **Thay đổi tên tác giả và email:**

```bash
git filter-repo --mailmap my-mailmap.txt
```

Với nội dung `my-mailmap.txt`:

```
Old Name <old@email.com> <==> New Name <new@email.com>
```

3. **Tách thư mục `src/projectA` thành repo riêng:**

```bash
git filter-repo --subdirectory-filter src/projectA
```
