#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import json
import re
from pathlib import Path
from collections import defaultdict

class ImprovedTaggingSystem:
    def __init__(self):
        # Định nghĩa hệ thống tag cải tiến
        self.tag_hierarchy = {
            # Technology Tags
            'tech': {
                'programming': ['python', 'java', 'golang', 'javascript', 'php', 'kotlin', 'rust', 'cpp', 'csharp'],
                'frontend': ['react', 'vue', 'angular', 'css', 'html', 'ui-ux'],
                'backend': ['api', 'database', 'server', 'microservices'],
                'mobile': ['android', 'ios', 'flutter', 'react-native'],
                'cloud': ['aws', 'azure', 'gcp', 'docker', 'kubernetes'],
                'ai-ml': ['machine-learning', 'deep-learning', 'llm', 'chatgpt', 'prompt-engineering']
            },
            
            # Content Type Tags
            'content': {
                'documentation': ['tutorial', 'guide', 'reference', 'api-docs'],
                'learning': ['notes', 'cheatsheet', 'examples', 'exercises'],
                'interview': ['questions', 'preparation', 'coding-interview'],
                'project': ['implementation', 'architecture', 'design-patterns']
            },
            
            # Domain Tags
            'domain': {
                'business': ['management', 'freelance', 'startup', 'product'],
                'personal': ['lifestyle', 'fashion', 'health', 'travel'],
                'education': ['english', 'language-learning', 'certification'],
                'tools': ['development-tools', 'productivity', 'automation']
            },
            
            # Skill Level Tags
            'level': ['beginner', 'intermediate', 'advanced', 'expert'],
            
            # Language Tags
            'language': ['vietnamese', 'english', 'mixed'],
            
            # Priority Tags
            'priority': ['important', 'reference', 'todo', 'archived']
        }
        
        # Mapping từ khóa đến tag
        self.keyword_to_tag = {
            # Programming languages
            'python': 'python', 'java': 'java', 'golang': 'golang', 'go': 'golang',
            'javascript': 'javascript', 'js': 'javascript', 'typescript': 'javascript',
            'php': 'php', 'kotlin': 'kotlin', 'rust': 'rust',
            'c++': 'cpp', 'cpp': 'cpp', 'c#': 'csharp', 'csharp': 'csharp',
            
            # Frontend
            'react': 'react', 'vue': 'vue', 'angular': 'angular',
            'css': 'css', 'html': 'html', 'frontend': 'frontend',
            
            # Backend
            'backend': 'backend', 'api': 'api', 'database': 'database',
            'mysql': 'database', 'postgresql': 'database', 'mongodb': 'database',
            
            # Cloud & DevOps
            'aws': 'aws', 'azure': 'azure', 'gcp': 'gcp',
            'docker': 'docker', 'kubernetes': 'kubernetes', 'k8s': 'kubernetes',
            'devops': 'cloud',
            
            # AI & ML
            'ai': 'ai-ml', 'machine learning': 'machine-learning', 'ml': 'machine-learning',
            'llm': 'llm', 'chatgpt': 'chatgpt', 'prompt': 'prompt-engineering',
            
            # Content types
            'tutorial': 'tutorial', 'guide': 'guide', 'notes': 'notes',
            'cheatsheet': 'cheatsheet', 'interview': 'interview',
            'phỏng vấn': 'interview', 'câu hỏi': 'questions',
            
            # Languages
            'english': 'english', 'tiếng anh': 'english',
            'vietnamese': 'vietnamese', 'việt nam': 'vietnamese',
            
            # Business
            'business': 'business', 'management': 'management',
            'freelance': 'freelance', 'startup': 'startup',
            
            # Personal
            'fashion': 'fashion', 'lifestyle': 'lifestyle',
            'travel': 'travel', 'du lịch': 'travel',
            'health': 'health', 'skincare': 'health'
        }
    
    def improve_file_tags(self, file_info):
        """Cải thiện tags cho một file"""
        filename = file_info['file_name'].lower()
        category = file_info['category']
        existing_tags = set(file_info.get('tags', []))
        
        # Tags mới được cải thiện
        improved_tags = set()
        
        # 1. Tags từ category
        category_tags = self.get_category_tags(category)
        improved_tags.update(category_tags)
        
        # 2. Tags từ filename
        filename_tags = self.extract_tags_from_text(filename)
        improved_tags.update(filename_tags)
        
        # 3. Tags từ keywords có sẵn
        for keyword in file_info.get('keywords', []):
            keyword_tags = self.extract_tags_from_text(keyword.lower())
            improved_tags.update(keyword_tags)
        
        # 4. Tags đặc biệt dựa trên nội dung
        special_tags = self.get_special_tags(file_info)
        improved_tags.update(special_tags)
        
        # 5. Giữ lại một số tags hữu ích từ hệ thống cũ
        useful_old_tags = self.filter_useful_tags(existing_tags)
        improved_tags.update(useful_old_tags)
        
        # Loại bỏ tags không mong muốn
        improved_tags = self.clean_tags(improved_tags)
        
        return sorted(list(improved_tags))
    
    def get_category_tags(self, category):
        """Lấy tags từ category"""
        category_mapping = {
            'Programming Languages': ['programming', 'coding'],
            'Frontend Development': ['frontend', 'web-development'],
            'Backend Development': ['backend', 'server-side'],
            'AI & Machine Learning': ['ai-ml', 'artificial-intelligence'],
            'Cloud & DevOps': ['cloud', 'devops', 'infrastructure'],
            'English Learning': ['english', 'language-learning'],
            'Interview Preparation': ['interview', 'career'],
            'Business & Management': ['business', 'management'],
            'Algorithms & Data Structures': ['algorithms', 'data-structures', 'computer-science'],
            'Lifestyle & Fashion': ['lifestyle', 'personal'],
            'Travel': ['travel', 'personal'],
            'Personal Development': ['personal-development', 'self-improvement'],
            'General': ['general']
        }
        return category_mapping.get(category, ['general'])
    
    def extract_tags_from_text(self, text):
        """Trích xuất tags từ text"""
        tags = set()
        text_lower = text.lower()
        
        # Tìm kiếm exact matches
        for keyword, tag in self.keyword_to_tag.items():
            if keyword in text_lower:
                tags.add(tag)
        
        # Tìm kiếm pattern matches
        if re.search(r'\b(tutorial|hướng dẫn)\b', text_lower):
            tags.add('tutorial')
        if re.search(r'\b(note|ghi chú)\b', text_lower):
            tags.add('notes')
        if re.search(r'\b(tip|mẹo|tricks)\b', text_lower):
            tags.add('tips')
        if re.search(r'\b(interview|phỏng vấn)\b', text_lower):
            tags.add('interview')
        if re.search(r'\b(cheatsheet|tóm tắt)\b', text_lower):
            tags.add('cheatsheet')
        
        return tags
    
    def get_special_tags(self, file_info):
        """Lấy tags đặc biệt dựa trên thông tin file"""
        tags = set()
        
        # Dựa trên kích thước file
        if file_info['file_size'] > 50000:  # > 50KB
            tags.add('comprehensive')
        elif file_info['file_size'] < 5000:  # < 5KB
            tags.add('quick-reference')
        
        # Dựa trên số dòng
        if file_info['line_count'] > 200:
            tags.add('detailed')
        elif file_info['line_count'] < 50:
            tags.add('concise')
        
        # Dựa trên ngôn ngữ
        if file_info.get('language') == 'Vietnamese':
            tags.add('vietnamese')
        elif file_info.get('language') == 'English':
            tags.add('english')
        
        # Dựa trên loại nội dung
        content_type = file_info.get('content_type', '')
        if 'Tutorial' in content_type:
            tags.add('tutorial')
        elif 'Notes' in content_type:
            tags.add('notes')
        elif 'Cheatsheet' in content_type:
            tags.add('cheatsheet')
        elif 'Interview' in content_type:
            tags.add('interview')
        
        return tags
    
    def filter_useful_tags(self, old_tags):
        """Lọc ra các tags hữu ích từ hệ thống cũ"""
        useful_tags = set()
        
        # Danh sách tags hữu ích cần giữ lại
        keep_tags = {
            'tutorial', 'notes', 'tips', 'cheatsheet', 'interview',
            'beginner', 'intermediate', 'advanced', 'important',
            'reference', 'examples', 'practice', 'theory'
        }
        
        for tag in old_tags:
            if tag in keep_tags or len(tag) > 3:
                useful_tags.add(tag)
        
        return useful_tags
    
    def clean_tags(self, tags):
        """Làm sạch và chuẩn hóa tags"""
        cleaned_tags = set()
        
        # Loại bỏ tags không mong muốn
        unwanted_tags = {
            'with', 'and', 'the', 'for', 'from', 'how', 'what', 'when', 'where',
            'this', 'that', 'these', 'those', 'một', 'các', 'của', 'trong', 'trên'
        }
        
        for tag in tags:
            # Loại bỏ tags quá ngắn hoặc không mong muốn
            if len(tag) >= 3 and tag not in unwanted_tags:
                # Chuẩn hóa tag
                clean_tag = re.sub(r'[^a-z0-9-]', '', tag.lower())
                if clean_tag:
                    cleaned_tags.add(clean_tag)
        
        return cleaned_tags
    
    def process_all_files(self):
        """Xử lý tất cả files với hệ thống tag cải tiến"""
        # Đọc dữ liệu hiện tại
        with open('markdown_analysis_report.json', 'r', encoding='utf-8') as f:
            data = json.load(f)
        
        # Cải thiện tags cho tất cả files
        improved_files = []
        tag_stats = defaultdict(int)
        
        for file_info in data['files']:
            improved_tags = self.improve_file_tags(file_info)
            
            # Cập nhật thông tin file
            file_info['improved_tags'] = improved_tags
            file_info['tag_count'] = len(improved_tags)
            improved_files.append(file_info)
            
            # Thống kê tags
            for tag in improved_tags:
                tag_stats[tag] += 1
        
        # Tạo báo cáo mới
        improved_data = {
            'summary': data['summary'],
            'categories': data['categories'],
            'improved_tag_stats': dict(sorted(tag_stats.items(), key=lambda x: x[1], reverse=True)),
            'tag_hierarchy': self.tag_hierarchy,
            'files': improved_files
        }
        
        # Lưu kết quả
        with open('improved_tagging_report.json', 'w', encoding='utf-8') as f:
            json.dump(improved_data, f, ensure_ascii=False, indent=2)
        
        return improved_data

if __name__ == "__main__":
    tagging_system = ImprovedTaggingSystem()
    improved_data = tagging_system.process_all_files()
    
    print("="*60)
    print("HỆ THỐNG TAG CẢI TIẾN")
    print("="*60)
    
    print(f"\n📊 Thống kê:")
    print(f"   • Tổng số file: {len(improved_data['files'])}")
    print(f"   • Tổng số tag unique: {len(improved_data['improved_tag_stats'])}")
    
    print(f"\n🏷️  Top 20 tag phổ biến:")
    for i, (tag, count) in enumerate(list(improved_data['improved_tag_stats'].items())[:20], 1):
        print(f"   {i:2d}. {tag:<20} : {count:3d} file")
    
    print(f"\n✅ Đã lưu báo cáo cải tiến vào 'improved_tagging_report.json'")
