#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import json
import os
import shutil
from pathlib import Path
from collections import defaultdict

class NotesOrganizer:
    def __init__(self, root_dir="."):
        self.root_dir = Path(root_dir)
        self.moved_files = 0
        self.created_dirs = 0
        self.skipped_files = 0
        self.error_files = 0
        
        # Định nghĩa cấu trúc thư mục
        self.folder_structure = {
            'Programming Languages': '01-Programming-Languages',
            'Frontend Development': '02-Frontend-Development', 
            'Backend Development': '03-Backend-Development',
            'AI & Machine Learning': '04-AI-Machine-Learning',
            'Cloud & DevOps': '05-Cloud-DevOps',
            'Algorithms & Data Structures': '06-Algorithms-Data-Structures',
            'Interview Preparation': '07-Interview-Preparation',
            'English Learning': '08-English-Learning',
            'Business & Management': '09-Business-Management',
            'Personal Development': '10-Personal-Development',
            'Lifestyle & Fashion': '11-Lifestyle-Fashion',
            'Travel': '12-Travel',
            'General': '99-General'
        }
        
        # Thư mục con cho các danh mục lớn
        self.subfolder_mapping = {
            'Programming Languages': {
                'python': 'Python',
                'java': 'Java', 
                'golang': 'Golang',
                'javascript': 'JavaScript',
                'php': 'PHP',
                'kotlin': 'Kotlin',
                'rust': 'Rust',
                'cpp': 'C-CPP',
                'csharp': 'C-Sharp'
            },
            'Frontend Development': {
                'react': 'React',
                'vue': 'Vue',
                'angular': 'Angular',
                'css': 'CSS-HTML'
            },
            'AI & Machine Learning': {
                'llm': 'LLM-ChatGPT',
                'machine-learning': 'Machine-Learning',
                'prompt-engineering': 'Prompt-Engineering'
            },
            'Cloud & DevOps': {
                'aws': 'AWS',
                'azure': 'Azure', 
                'gcp': 'Google-Cloud',
                'docker': 'Docker-Kubernetes',
                'kubernetes': 'Docker-Kubernetes'
            },
            'English Learning': {
                'toeic': 'TOEIC',
                'ielts': 'IELTS',
                'grammar': 'Grammar',
                'vocabulary': 'Vocabulary'
            }
        }
    
    def load_analysis_data(self):
        """Tải dữ liệu phân tích từ file JSON"""
        try:
            with open('improved_tagging_report.json', 'r', encoding='utf-8') as f:
                return json.load(f)
        except FileNotFoundError:
            print("❌ Không tìm thấy file improved_tagging_report.json")
            print("   Vui lòng chạy script phân tích trước!")
            return None
    
    def create_folder_structure(self):
        """Tạo cấu trúc thư mục"""
        print("📁 Tạo cấu trúc thư mục...")
        
        for category, folder_name in self.folder_structure.items():
            folder_path = self.root_dir / folder_name
            
            # Tạo thư mục chính
            if not folder_path.exists():
                folder_path.mkdir(parents=True, exist_ok=True)
                print(f"   ✅ Tạo thư mục: {folder_name}")
                self.created_dirs += 1
            
            # Tạo thư mục con nếu có
            if category in self.subfolder_mapping:
                for tag, subfolder in self.subfolder_mapping[category].items():
                    subfolder_path = folder_path / subfolder
                    if not subfolder_path.exists():
                        subfolder_path.mkdir(parents=True, exist_ok=True)
                        print(f"   ✅ Tạo thư mục con: {folder_name}/{subfolder}")
                        self.created_dirs += 1
    
    def determine_target_folder(self, file_info):
        """Xác định thư mục đích cho file"""
        category = file_info['category']
        tags = file_info.get('improved_tags', [])
        
        # Lấy thư mục chính
        main_folder = self.folder_structure.get(category, self.folder_structure['General'])
        
        # Kiểm tra thư mục con
        if category in self.subfolder_mapping:
            for tag in tags:
                if tag in self.subfolder_mapping[category]:
                    subfolder = self.subfolder_mapping[category][tag]
                    return self.root_dir / main_folder / subfolder
        
        # Trả về thư mục chính nếu không có thư mục con phù hợp
        return self.root_dir / main_folder
    
    def move_file(self, file_info, dry_run=False):
        """Di chuyển file vào thư mục phù hợp"""
        source_path = self.root_dir / file_info['file_path']
        
        # Kiểm tra file có tồn tại không
        if not source_path.exists():
            print(f"❌ File không tồn tại: {source_path}")
            self.error_files += 1
            return False
        
        # Xác định thư mục đích
        target_folder = self.determine_target_folder(file_info)
        target_path = target_folder / source_path.name
        
        # Kiểm tra xem file đã ở đúng vị trí chưa
        if source_path.parent == target_folder:
            print(f"⏭️  Đã đúng vị trí: {source_path.name}")
            self.skipped_files += 1
            return True
        
        # Kiểm tra trung tên file
        if target_path.exists():
            print(f"⚠️  File đã tồn tại tại đích: {target_path}")
            # Tạo tên file mới với suffix
            counter = 1
            while target_path.exists():
                name_parts = source_path.stem, counter, source_path.suffix
                new_name = f"{name_parts[0]}_{name_parts[1]}{name_parts[2]}"
                target_path = target_folder / new_name
                counter += 1
        
        if dry_run:
            print(f"🔍 [DRY RUN] {source_path.name} → {target_folder.name}")
            return True
        
        try:
            # Tạo thư mục đích nếu chưa có
            target_folder.mkdir(parents=True, exist_ok=True)
            
            # Di chuyển file
            shutil.move(str(source_path), str(target_path))
            print(f"✅ Di chuyển: {source_path.name} → {target_folder.name}")
            self.moved_files += 1
            return True
            
        except Exception as e:
            print(f"❌ Lỗi di chuyển {source_path.name}: {e}")
            self.error_files += 1
            return False
    
    def create_category_readme(self, category, folder_path, files_in_category):
        """Tạo file README cho mỗi danh mục"""
        readme_content = f"# {category}\n\n"
        readme_content += f"Danh mục này chứa {len(files_in_category)} files liên quan đến {category.lower()}.\n\n"
        
        # Thống kê tags phổ biến trong danh mục
        tag_count = defaultdict(int)
        for file_info in files_in_category:
            for tag in file_info.get('improved_tags', []):
                tag_count[tag] += 1
        
        if tag_count:
            readme_content += "## 🏷️ Tags phổ biến\n\n"
            top_tags = sorted(tag_count.items(), key=lambda x: x[1], reverse=True)[:10]
            for tag, count in top_tags:
                readme_content += f"- `{tag}` ({count} files)\n"
            readme_content += "\n"
        
        # Danh sách files
        readme_content += "## 📄 Danh sách files\n\n"
        for file_info in sorted(files_in_category, key=lambda x: x['file_name']):
            file_name = file_info['file_name'].replace('.md', '')
            readme_content += f"- [[{file_name}]]\n"
        
        readme_content += f"\n---\n*Được tạo tự động bởi Notes Organizer*\n"
        
        # Lưu file README
        readme_path = folder_path / "README.md"
        with open(readme_path, 'w', encoding='utf-8') as f:
            f.write(readme_content)
        
        print(f"📝 Tạo README: {folder_path.name}/README.md")
    
    def organize_notes(self, dry_run=False, create_readme=True):
        """Tổ chức tất cả notes"""
        data = self.load_analysis_data()
        if not data:
            return False
        
        print("="*60)
        print("🗂️  TỰ ĐỘNG SẮP XẾP NOTES VÀO THỦ MỤC")
        print("="*60)
        
        if dry_run:
            print("🔍 CHẠY THỬ - Không di chuyển file thực tế")
        
        # Tạo cấu trúc thư mục
        if not dry_run:
            self.create_folder_structure()
        
        # Nhóm files theo category
        files_by_category = defaultdict(list)
        for file_info in data['files']:
            files_by_category[file_info['category']].append(file_info)
        
        print(f"\n📦 Bắt đầu di chuyển {len(data['files'])} files...")
        
        # Di chuyển files
        for file_info in data['files']:
            self.move_file(file_info, dry_run)
        
        # Tạo README files
        if create_readme and not dry_run:
            print(f"\n📝 Tạo README files...")
            for category, files_in_category in files_by_category.items():
                folder_name = self.folder_structure.get(category, self.folder_structure['General'])
                folder_path = self.root_dir / folder_name
                self.create_category_readme(category, folder_path, files_in_category)
        
        # Báo cáo kết quả
        print(f"\n📊 KẾT QUẢ:")
        if not dry_run:
            print(f"   📁 Thư mục được tạo: {self.created_dirs}")
            print(f"   ✅ Files đã di chuyển: {self.moved_files}")
        print(f"   ⏭️  Files bỏ qua: {self.skipped_files}")
        print(f"   ❌ Files lỗi: {self.error_files}")
        
        return True
    
    def create_master_index(self):
        """Tạo file index tổng hợp"""
        index_content = "# 📚 Master Index - Chỉ mục Tổng hợp\n\n"
        index_content += "Đây là chỉ mục tổng hợp tất cả các thư mục và nội dung trong workspace.\n\n"

        index_content += "## 📁 Cấu trúc thư mục\n\n"

        for category, folder_name in sorted(self.folder_structure.items()):
            folder_path = self.root_dir / folder_name
            if folder_path.exists():
                # Đếm số files trong thư mục
                md_files = list(folder_path.rglob("*.md"))
                file_count = len([f for f in md_files if f.name != "README.md"])

                index_content += f"### [{category}]({folder_name}/README.md)\n"
                index_content += f"📂 `{folder_name}` - {file_count} files\n\n"

                # Liệt kê thư mục con nếu có
                if category in self.subfolder_mapping:
                    subfolders = []
                    for subfolder_name in self.subfolder_mapping[category].values():
                        subfolder_path = folder_path / subfolder_name
                        if subfolder_path.exists():
                            sub_files = list(subfolder_path.glob("*.md"))
                            if sub_files:
                                subfolders.append(f"`{subfolder_name}` ({len(sub_files)})")

                    if subfolders:
                        index_content += "**Thư mục con**: " + ", ".join(subfolders) + "\n\n"

        index_content += "## 🔍 Hướng dẫn sử dụng\n\n"
        index_content += "1. **Duyệt theo danh mục**: Click vào tên danh mục để xem README\n"
        index_content += "2. **Tìm kiếm**: Sử dụng Obsidian search với folder filter\n"
        index_content += "3. **Tags**: Xem [[Tag_Index]] để tìm theo tags\n"
        index_content += "4. **Categories**: Xem [[Category_Index]] để tìm theo danh mục\n\n"

        index_content += "---\n*Được tạo tự động bởi Notes Organizer*\n"

        # Lưu file
        with open(self.root_dir / "Master_Index.md", 'w', encoding='utf-8') as f:
            f.write(index_content)

        print("📚 Đã tạo Master_Index.md")

    def backup_current_structure(self):
        """Tạo backup của cấu trúc hiện tại"""
        import datetime

        backup_info = {
            'timestamp': datetime.datetime.now().isoformat(),
            'files_location': {}
        }

        # Ghi lại vị trí hiện tại của tất cả files
        for md_file in self.root_dir.rglob("*.md"):
            if md_file.is_file():
                relative_path = md_file.relative_to(self.root_dir)
                backup_info['files_location'][str(relative_path)] = str(md_file.parent.relative_to(self.root_dir))

        # Lưu backup info
        backup_file = self.root_dir / f"backup_structure_{datetime.datetime.now().strftime('%Y%m%d_%H%M%S')}.json"
        with open(backup_file, 'w', encoding='utf-8') as f:
            json.dump(backup_info, f, ensure_ascii=False, indent=2)

        print(f"💾 Đã tạo backup: {backup_file.name}")
        return backup_file

def main():
    organizer = NotesOrganizer()
    
    print("🗂️  NOTES ORGANIZER - Tự động sắp xếp notes")
    print("="*50)
    print("1. Chạy thử (xem trước, không di chuyển)")
    print("2. Thực hiện di chuyển")
    print("3. Chỉ tạo cấu trúc thư mục")
    print("4. Chỉ tạo Master Index")
    
    choice = input("\nLựa chọn (1-4): ").strip()
    
    if choice == "1":
        organizer.organize_notes(dry_run=True)
    elif choice == "2":
        confirm = input("⚠️  Bạn có chắc muốn di chuyển files? (y/N): ").strip().lower()
        if confirm == 'y':
            organizer.organize_notes(dry_run=False)
            organizer.create_master_index()
        else:
            print("❌ Đã hủy")
    elif choice == "3":
        organizer.create_folder_structure()
        print("✅ Đã tạo cấu trúc thư mục")
    elif choice == "4":
        organizer.create_master_index()
    else:
        print("❌ Lựa chọn không hợp lệ")

if __name__ == "__main__":
    main()
