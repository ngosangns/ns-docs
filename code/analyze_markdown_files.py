#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import os
import re
import json
from pathlib import Path
from collections import defaultdict, Counter
import hashlib

class MarkdownAnalyzer:
    def __init__(self, root_dir="."):
        self.root_dir = Path(root_dir)
        self.files_data = []
        self.categories = defaultdict(list)
        self.all_tags = set()
        
    def find_markdown_files(self):
        """Tìm tất cả file markdown trong thư mục"""
        md_files = []
        for file_path in self.root_dir.rglob("*.md"):
            if file_path.is_file():
                md_files.append(file_path)
        return sorted(md_files)
    
    def extract_content_info(self, file_path):
        """Trích xuất thông tin từ file markdown"""
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
        except Exception as e:
            print(f"Lỗi đọc file {file_path}: {e}")
            return None
            
        # Thông tin cơ bản
        info = {
            'file_path': str(file_path.relative_to(self.root_dir)),
            'file_name': file_path.name,
            'file_size': file_path.stat().st_size,
            'content_length': len(content),
            'line_count': len(content.splitlines()),
        }
        
        # Trích xuất tiêu đề
        headers = re.findall(r'^#+\s+(.+)$', content, re.MULTILINE)
        info['headers'] = headers[:10]  # Lấy 10 tiêu đề đầu
        
        # Trích xuất từ khóa từ tên file và nội dung
        keywords = self.extract_keywords(file_path.name, content)
        info['keywords'] = keywords
        
        # Phân loại dựa trên tên file và nội dung
        category = self.categorize_file(file_path.name, content, headers)
        info['category'] = category
        
        # Tạo tags
        tags = self.generate_tags(file_path.name, content, headers, category)
        info['tags'] = tags
        
        # Ngôn ngữ chính
        info['language'] = self.detect_language(content)
        
        # Loại nội dung
        info['content_type'] = self.detect_content_type(content, file_path.name)
        
        return info
    
    def extract_keywords(self, filename, content):
        """Trích xuất từ khóa quan trọng"""
        keywords = set()
        
        # Từ tên file
        filename_words = re.findall(r'\b[A-Za-z]+\b', filename.replace('.md', ''))
        keywords.update([w.lower() for w in filename_words if len(w) > 2])
        
        # Từ nội dung (các từ xuất hiện nhiều)
        words = re.findall(r'\b[A-Za-zÀ-ỹ]+\b', content.lower())
        word_freq = Counter(words)
        
        # Lấy các từ xuất hiện >= 3 lần và dài >= 4 ký tự
        for word, freq in word_freq.items():
            if freq >= 3 and len(word) >= 4:
                keywords.add(word)
        
        return list(keywords)[:20]  # Giới hạn 20 từ khóa
    
    def categorize_file(self, filename, content, headers):
        """Phân loại file dựa trên tên và nội dung"""
        filename_lower = filename.lower()
        content_lower = content.lower()
        
        # Danh mục dựa trên tên file
        if any(tech in filename_lower for tech in ['java', 'python', 'golang', 'javascript', 'php', 'kotlin', 'rust', 'c++', 'c#']):
            return 'Programming Languages'
        elif any(tech in filename_lower for tech in ['react', 'vue', 'angular', 'frontend', 'css', 'html']):
            return 'Frontend Development'
        elif any(tech in filename_lower for tech in ['backend', 'api', 'database', 'mysql', 'mongodb', 'postgresql']):
            return 'Backend Development'
        elif any(tech in filename_lower for tech in ['aws', 'azure', 'gcp', 'docker', 'kubernetes', 'devops']):
            return 'Cloud & DevOps'
        elif any(word in filename_lower for word in ['interview', 'phỏng vấn', 'câu hỏi']):
            return 'Interview Preparation'
        elif any(word in filename_lower for word in ['english', 'tiếng anh', 'toeic', 'ielts']):
            return 'English Learning'
        elif any(word in filename_lower for word in ['algorithm', 'thuật toán', 'data structure']):
            return 'Algorithms & Data Structures'
        elif any(word in filename_lower for word in ['ai', 'machine learning', 'llm', 'chatgpt']):
            return 'AI & Machine Learning'
        elif any(word in filename_lower for word in ['fashion', 'tủ đồ', 'quần áo', 'skincare']):
            return 'Lifestyle & Fashion'
        elif any(word in filename_lower for word in ['du lịch', 'travel', 'phượt']):
            return 'Travel'
        elif any(word in filename_lower for word in ['business', 'management', 'freelance']):
            return 'Business & Management'
        elif any(word in filename_lower for word in ['life', 'softskill', 'kỹ năng']):
            return 'Personal Development'
        else:
            return 'General'
    
    def generate_tags(self, filename, content, headers, category):
        """Tạo tags cho file"""
        tags = set()
        
        # Tag từ category
        tags.add(category.lower().replace(' ', '-'))
        
        # Tag từ tên file
        filename_parts = re.split(r'[-_\s]+', filename.replace('.md', ''))
        for part in filename_parts:
            if len(part) > 2:
                tags.add(part.lower())
        
        # Tag từ headers
        for header in headers[:5]:
            header_words = re.findall(r'\b[A-Za-z]+\b', header)
            for word in header_words:
                if len(word) > 3:
                    tags.add(word.lower())
        
        # Tag đặc biệt dựa trên nội dung
        content_lower = content.lower()
        if 'tutorial' in content_lower or 'hướng dẫn' in content_lower:
            tags.add('tutorial')
        if 'note' in content_lower or 'ghi chú' in content_lower:
            tags.add('notes')
        if 'tips' in content_lower or 'mẹo' in content_lower:
            tags.add('tips')
        if 'cheatsheet' in content_lower:
            tags.add('cheatsheet')
        
        return list(tags)[:15]  # Giới hạn 15 tags
    
    def detect_language(self, content):
        """Phát hiện ngôn ngữ chính của nội dung"""
        vietnamese_chars = len(re.findall(r'[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]', content.lower()))
        english_words = len(re.findall(r'\b[a-zA-Z]+\b', content))
        
        if vietnamese_chars > english_words * 0.1:
            return 'Vietnamese'
        else:
            return 'English'
    
    def detect_content_type(self, content, filename):
        """Phát hiện loại nội dung"""
        if 'interview' in filename.lower() or 'phỏng vấn' in filename.lower():
            return 'Interview Guide'
        elif 'note' in filename.lower() or 'ghi chú' in filename.lower():
            return 'Notes'
        elif 'tutorial' in content.lower() or 'hướng dẫn' in content.lower():
            return 'Tutorial'
        elif 'cheatsheet' in filename.lower():
            return 'Cheatsheet'
        elif len(re.findall(r'```', content)) > 2:
            return 'Technical Documentation'
        else:
            return 'General Documentation'
    
    def analyze_all_files(self):
        """Phân tích tất cả file markdown"""
        md_files = self.find_markdown_files()
        print(f"Tìm thấy {len(md_files)} file Markdown")
        
        for i, file_path in enumerate(md_files, 1):
            print(f"Đang xử lý ({i}/{len(md_files)}): {file_path.name}")
            
            file_info = self.extract_content_info(file_path)
            if file_info:
                self.files_data.append(file_info)
                self.categories[file_info['category']].append(file_info)
                self.all_tags.update(file_info['tags'])
        
        print(f"Hoàn thành phân tích {len(self.files_data)} file")
    
    def generate_report(self):
        """Tạo báo cáo tổng hợp"""
        report = {
            'summary': {
                'total_files': len(self.files_data),
                'total_categories': len(self.categories),
                'total_tags': len(self.all_tags),
                'total_size': sum(f['file_size'] for f in self.files_data),
                'total_lines': sum(f['line_count'] for f in self.files_data)
            },
            'categories': {},
            'top_tags': dict(Counter([tag for f in self.files_data for tag in f['tags']]).most_common(30)),
            'files': self.files_data
        }
        
        # Thống kê theo category
        for category, files in self.categories.items():
            report['categories'][category] = {
                'count': len(files),
                'files': [f['file_name'] for f in files]
            }
        
        return report
    
    def save_report(self, output_file='markdown_analysis_report.json'):
        """Lưu báo cáo ra file JSON"""
        report = self.generate_report()
        with open(output_file, 'w', encoding='utf-8') as f:
            json.dump(report, f, ensure_ascii=False, indent=2)
        print(f"Đã lưu báo cáo vào {output_file}")
        return report

if __name__ == "__main__":
    analyzer = MarkdownAnalyzer()
    analyzer.analyze_all_files()
    report = analyzer.save_report()
    
    # In tóm tắt
    print("\n" + "="*50)
    print("TÓM TẮT PHÂN TÍCH")
    print("="*50)
    print(f"Tổng số file: {report['summary']['total_files']}")
    print(f"Tổng số danh mục: {report['summary']['total_categories']}")
    print(f"Tổng số tag: {report['summary']['total_tags']}")
    print(f"Tổng dung lượng: {report['summary']['total_size']:,} bytes")
    print(f"Tổng số dòng: {report['summary']['total_lines']:,}")
    
    print("\nDANH MỤC:")
    for category, info in report['categories'].items():
        print(f"  {category}: {info['count']} file(s)")
    
    print("\nTOP 10 TAG PHỔ BIẾN:")
    for tag, count in list(report['top_tags'].items())[:10]:
        print(f"  {tag}: {count}")
