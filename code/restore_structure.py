#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import json
import shutil
from pathlib import Path
import glob

class StructureRestorer:
    def __init__(self, root_dir="."):
        self.root_dir = Path(root_dir)
        self.restored_files = 0
        self.error_files = 0
    
    def list_backup_files(self):
        """Liệt kê các file backup có sẵn"""
        backup_files = list(self.root_dir.glob("backup_structure_*.json"))
        return sorted(backup_files, reverse=True)  # Mới nhất trước
    
    def restore_from_backup(self, backup_file):
        """Khôi phục cấu trúc từ file backup"""
        try:
            with open(backup_file, 'r', encoding='utf-8') as f:
                backup_data = json.load(f)
        except Exception as e:
            print(f"❌ Lỗi đọc file backup: {e}")
            return False
        
        print(f"📅 Khôi phục từ backup: {backup_data['timestamp']}")
        print(f"📁 Số files cần khôi phục: {len(backup_data['files_location'])}")
        
        for file_path, original_folder in backup_data['files_location'].items():
            current_path = self.root_dir / file_path
            target_folder = self.root_dir / original_folder
            target_path = target_folder / Path(file_path).name
            
            # Tìm file hiện tại (có thể đã được di chuyển)
            if not current_path.exists():
                # Tìm file trong toàn bộ workspace
                found_files = list(self.root_dir.rglob(Path(file_path).name))
                if found_files:
                    current_path = found_files[0]  # Lấy file đầu tiên tìm thấy
                else:
                    print(f"❌ Không tìm thấy file: {file_path}")
                    self.error_files += 1
                    continue
            
            # Kiểm tra xem file đã ở đúng vị trí chưa
            if current_path.parent == target_folder:
                continue  # Đã ở đúng vị trí
            
            try:
                # Tạo thư mục đích nếu chưa có
                target_folder.mkdir(parents=True, exist_ok=True)
                
                # Di chuyển file
                shutil.move(str(current_path), str(target_path))
                print(f"✅ Khôi phục: {Path(file_path).name} → {original_folder}")
                self.restored_files += 1
                
            except Exception as e:
                print(f"❌ Lỗi khôi phục {file_path}: {e}")
                self.error_files += 1
        
        print(f"\n📊 Kết quả khôi phục:")
        print(f"   ✅ Files đã khôi phục: {self.restored_files}")
        print(f"   ❌ Files lỗi: {self.error_files}")
        
        return True
    
    def flatten_structure(self):
        """Đưa tất cả files về thư mục gốc"""
        print("📁 Đưa tất cả files về thư mục gốc...")
        
        moved_count = 0
        for md_file in self.root_dir.rglob("*.md"):
            if md_file.parent == self.root_dir:
                continue  # Đã ở thư mục gốc
            
            # Tránh di chuyển các file hệ thống
            if md_file.name in ['README.md', 'Master_Index.md', 'Tag_Index.md', 'Category_Index.md']:
                continue
            
            target_path = self.root_dir / md_file.name
            
            # Xử lý trùng tên
            if target_path.exists():
                counter = 1
                while target_path.exists():
                    name_parts = md_file.stem, counter, md_file.suffix
                    new_name = f"{name_parts[0]}_{name_parts[1]}{name_parts[2]}"
                    target_path = self.root_dir / new_name
                    counter += 1
            
            try:
                shutil.move(str(md_file), str(target_path))
                print(f"✅ Di chuyển: {md_file.name} → root")
                moved_count += 1
            except Exception as e:
                print(f"❌ Lỗi di chuyển {md_file.name}: {e}")
        
        print(f"📊 Đã di chuyển {moved_count} files về thư mục gốc")
        return moved_count > 0
    
    def clean_empty_folders(self):
        """Xóa các thư mục trống"""
        print("🧹 Dọn dẹp thư mục trống...")
        
        removed_count = 0
        # Lấy tất cả thư mục, sắp xếp theo độ sâu (sâu nhất trước)
        all_dirs = [d for d in self.root_dir.rglob("*") if d.is_dir()]
        all_dirs.sort(key=lambda x: len(x.parts), reverse=True)
        
        for folder in all_dirs:
            try:
                # Kiểm tra thư mục có trống không (không có file, chỉ có thư mục con trống)
                contents = list(folder.iterdir())
                if not contents:
                    folder.rmdir()
                    print(f"🗑️  Xóa thư mục trống: {folder.relative_to(self.root_dir)}")
                    removed_count += 1
            except OSError:
                # Thư mục không trống hoặc không thể xóa
                continue
        
        print(f"📊 Đã xóa {removed_count} thư mục trống")
        return removed_count > 0

def main():
    restorer = StructureRestorer()
    
    print("🔄 STRUCTURE RESTORER - Khôi phục cấu trúc")
    print("="*50)
    print("1. Khôi phục từ backup")
    print("2. Đưa tất cả files về thư mục gốc")
    print("3. Dọn dẹp thư mục trống")
    print("4. Reset hoàn toàn (flatten + clean)")
    
    choice = input("\nLựa chọn (1-4): ").strip()
    
    if choice == "1":
        backup_files = restorer.list_backup_files()
        if not backup_files:
            print("❌ Không tìm thấy file backup nào")
            return
        
        print("\n📋 Danh sách backup có sẵn:")
        for i, backup_file in enumerate(backup_files, 1):
            print(f"   {i}. {backup_file.name}")
        
        try:
            backup_choice = int(input(f"\nChọn backup (1-{len(backup_files)}): ")) - 1
            if 0 <= backup_choice < len(backup_files):
                selected_backup = backup_files[backup_choice]
                confirm = input(f"⚠️  Khôi phục từ {selected_backup.name}? (y/N): ").strip().lower()
                if confirm == 'y':
                    restorer.restore_from_backup(selected_backup)
                else:
                    print("❌ Đã hủy")
            else:
                print("❌ Lựa chọn không hợp lệ")
        except ValueError:
            print("❌ Vui lòng nhập số")
    
    elif choice == "2":
        confirm = input("⚠️  Đưa tất cả files về thư mục gốc? (y/N): ").strip().lower()
        if confirm == 'y':
            restorer.flatten_structure()
        else:
            print("❌ Đã hủy")
    
    elif choice == "3":
        restorer.clean_empty_folders()
    
    elif choice == "4":
        confirm = input("⚠️  Reset hoàn toàn cấu trúc? (y/N): ").strip().lower()
        if confirm == 'y':
            restorer.flatten_structure()
            restorer.clean_empty_folders()
            print("✅ Đã reset hoàn toàn cấu trúc")
        else:
            print("❌ Đã hủy")
    
    else:
        print("❌ Lựa chọn không hợp lệ")

if __name__ == "__main__":
    main()
