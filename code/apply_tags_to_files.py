#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import json
import re
from pathlib import Path

class TagApplicator:
    def __init__(self):
        self.processed_files = 0
        self.skipped_files = 0
        self.error_files = 0
        
    def load_improved_data(self):
        """Tải dữ liệu từ file báo cáo cải tiến"""
        with open('improved_tagging_report.json', 'r', encoding='utf-8') as f:
            return json.load(f)
    
    def format_tags_for_obsidian(self, tags):
        """Format tags cho Obsidian (sử dụng #tag)"""
        return ' '.join([f'#{tag}' for tag in tags])
    
    def format_tags_for_yaml(self, tags):
        """Format tags cho YAML frontmatter"""
        if not tags:
            return ""
        
        yaml_tags = "---\n"
        yaml_tags += "tags:\n"
        for tag in tags:
            yaml_tags += f"  - {tag}\n"
        yaml_tags += "---\n\n"
        return yaml_tags
    
    def has_existing_tags(self, content):
        """Kiểm tra xem file đã có tags chưa"""
        # Kiểm tra YAML frontmatter
        if content.startswith('---'):
            return True
        
        # Kiểm tra Obsidian tags
        if re.search(r'#\w+', content):
            return True
            
        return False
    
    def apply_tags_to_file(self, file_info, tag_format='yaml'):
        """Áp dụng tags vào một file"""
        file_path = Path(file_info['file_path'])
        
        if not file_path.exists():
            print(f"❌ File không tồn tại: {file_path}")
            self.error_files += 1
            return False
        
        try:
            # Đọc nội dung hiện tại
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Kiểm tra xem đã có tags chưa
            if self.has_existing_tags(content):
                print(f"⏭️  Bỏ qua (đã có tags): {file_path.name}")
                self.skipped_files += 1
                return True
            
            # Lấy tags cải tiến
            improved_tags = file_info.get('improved_tags', [])
            if not improved_tags:
                print(f"⚠️  Không có tags: {file_path.name}")
                self.skipped_files += 1
                return True
            
            # Tạo nội dung mới với tags
            if tag_format == 'yaml':
                tag_header = self.format_tags_for_yaml(improved_tags)
                new_content = tag_header + content
            else:  # obsidian format
                tag_header = self.format_tags_for_obsidian(improved_tags)
                new_content = tag_header + "\n\n" + content
            
            # Ghi lại file
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(new_content)
            
            print(f"✅ Đã thêm {len(improved_tags)} tags vào: {file_path.name}")
            self.processed_files += 1
            return True
            
        except Exception as e:
            print(f"❌ Lỗi xử lý {file_path}: {e}")
            self.error_files += 1
            return False
    
    def create_tag_index(self, data):
        """Tạo file index cho các tags"""
        tag_stats = data['improved_tag_stats']
        categories = data['categories']
        
        index_content = "# 📋 Tag Index - Chỉ mục Tags\n\n"
        index_content += "Đây là chỉ mục tất cả các tags được sử dụng trong workspace.\n\n"
        
        # Thống kê tổng quan
        index_content += "## 📊 Thống kê tổng quan\n\n"
        index_content += f"- **Tổng số file**: {len(data['files'])}\n"
        index_content += f"- **Tổng số tags**: {len(tag_stats)}\n"
        index_content += f"- **Tổng số danh mục**: {len(categories)}\n\n"
        
        # Top tags
        index_content += "## 🏷️ Top 30 Tags phổ biến\n\n"
        index_content += "| Rank | Tag | Số file | Tỷ lệ |\n"
        index_content += "|------|-----|---------|-------|\n"
        
        total_files = len(data['files'])
        for i, (tag, count) in enumerate(list(tag_stats.items())[:30], 1):
            percentage = (count / total_files) * 100
            index_content += f"| {i:2d} | `{tag}` | {count} | {percentage:.1f}% |\n"
        
        # Tags theo danh mục
        index_content += "\n## 📂 Tags theo danh mục\n\n"
        
        for category, info in sorted(categories.items(), key=lambda x: x[1]['count'], reverse=True):
            index_content += f"### {category} ({info['count']} files)\n\n"
            
            # Lấy các tags phổ biến trong danh mục này
            category_files = [f for f in data['files'] if f['category'] == category]
            category_tags = {}
            
            for file_info in category_files:
                for tag in file_info.get('improved_tags', []):
                    category_tags[tag] = category_tags.get(tag, 0) + 1
            
            # Hiển thị top 10 tags của danh mục
            top_category_tags = sorted(category_tags.items(), key=lambda x: x[1], reverse=True)[:10]
            
            if top_category_tags:
                index_content += "**Tags phổ biến**: "
                tag_list = [f"`{tag}` ({count})" for tag, count in top_category_tags]
                index_content += ", ".join(tag_list) + "\n\n"
            
            # Liệt kê một số file tiêu biểu
            index_content += "**Files tiêu biểu**:\n"
            for file_name in info['files'][:5]:
                index_content += f"- [[{file_name.replace('.md', '')}]]\n"
            
            if len(info['files']) > 5:
                index_content += f"- ... và {len(info['files']) - 5} file khác\n"
            
            index_content += "\n"
        
        # Hướng dẫn sử dụng
        index_content += "## 📖 Hướng dẫn sử dụng Tags\n\n"
        index_content += "### Tìm kiếm theo tag\n"
        index_content += "- Trong Obsidian: Sử dụng `tag:#tên-tag` trong search\n"
        index_content += "- Hoặc click vào tag trong file để xem tất cả file có tag đó\n\n"
        
        index_content += "### Các loại tag chính\n"
        index_content += "- **Technology tags**: `python`, `javascript`, `react`, `aws`, etc.\n"
        index_content += "- **Content type tags**: `tutorial`, `notes`, `cheatsheet`, `interview`\n"
        index_content += "- **Language tags**: `vietnamese`, `english`\n"
        index_content += "- **Complexity tags**: `beginner`, `intermediate`, `advanced`\n"
        index_content += "- **Size tags**: `quick-reference`, `comprehensive`, `detailed`\n\n"
        
        index_content += "---\n"
        index_content += "*Được tạo tự động bởi hệ thống phân tích Markdown*\n"
        
        # Lưu file index
        with open('Tag_Index.md', 'w', encoding='utf-8') as f:
            f.write(index_content)
        
        print("✅ Đã tạo file Tag_Index.md")
    
    def create_category_index(self, data):
        """Tạo file index cho các danh mục"""
        categories = data['categories']
        
        index_content = "# 📁 Category Index - Chỉ mục Danh mục\n\n"
        index_content += "Đây là chỉ mục tất cả các danh mục trong workspace.\n\n"
        
        # Thống kê
        index_content += "## 📊 Thống kê danh mục\n\n"
        index_content += "| Danh mục | Số file | Tỷ lệ |\n"
        index_content += "|----------|---------|-------|\n"
        
        total_files = len(data['files'])
        for category, info in sorted(categories.items(), key=lambda x: x[1]['count'], reverse=True):
            percentage = (info['count'] / total_files) * 100
            index_content += f"| {category} | {info['count']} | {percentage:.1f}% |\n"
        
        # Chi tiết từng danh mục
        index_content += "\n## 📂 Chi tiết từng danh mục\n\n"
        
        for category, info in sorted(categories.items(), key=lambda x: x[1]['count'], reverse=True):
            index_content += f"### {category}\n\n"
            index_content += f"**Số lượng**: {info['count']} files\n\n"
            
            # Danh sách files
            index_content += "**Danh sách files**:\n"
            for file_name in sorted(info['files']):
                index_content += f"- [[{file_name.replace('.md', '')}]]\n"
            
            index_content += "\n"
        
        # Lưu file
        with open('Category_Index.md', 'w', encoding='utf-8') as f:
            f.write(index_content)
        
        print("✅ Đã tạo file Category_Index.md")
    
    def process_all_files(self, tag_format='yaml', apply_tags=True):
        """Xử lý tất cả files"""
        data = self.load_improved_data()
        
        print("="*60)
        print("ÁP DỤNG TAGS CHO TẤT CẢ FILE MARKDOWN")
        print("="*60)
        
        if apply_tags:
            print(f"\n🏷️  Bắt đầu áp dụng tags (format: {tag_format})...")
            
            for file_info in data['files']:
                self.apply_tags_to_file(file_info, tag_format)
            
            print(f"\n📊 Kết quả:")
            print(f"   ✅ Đã xử lý: {self.processed_files} files")
            print(f"   ⏭️  Bỏ qua: {self.skipped_files} files")
            print(f"   ❌ Lỗi: {self.error_files} files")
        
        # Tạo các file index
        print(f"\n📋 Tạo file index...")
        self.create_tag_index(data)
        self.create_category_index(data)
        
        print(f"\n✅ Hoàn thành!")

if __name__ == "__main__":
    applicator = TagApplicator()
    
    # Hỏi người dùng có muốn áp dụng tags không
    print("Bạn có muốn áp dụng tags trực tiếp vào các file không?")
    print("1. Có - áp dụng tags (YAML format)")
    print("2. Có - áp dụng tags (Obsidian format)")
    print("3. Không - chỉ tạo file index")
    
    choice = input("Lựa chọn (1/2/3): ").strip()
    
    if choice == "1":
        applicator.process_all_files(tag_format='yaml', apply_tags=True)
    elif choice == "2":
        applicator.process_all_files(tag_format='obsidian', apply_tags=True)
    else:
        applicator.process_all_files(apply_tags=False)
