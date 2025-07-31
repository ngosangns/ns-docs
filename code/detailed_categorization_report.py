#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import json
from collections import defaultdict, Counter

def create_detailed_report():
    # Đọc dữ liệu từ file JSON
    with open('markdown_analysis_report.json', 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    print("="*80)
    print("BÁO CÁO CHI TIẾT VỀ PHÂN LOẠI VÀ ĐÁNH TAG CÁC FILE MARKDOWN")
    print("="*80)
    
    # Tóm tắt tổng quan
    summary = data['summary']
    print(f"\n📊 TỔNG QUAN:")
    print(f"   • Tổng số file được phân tích: {summary['total_files']}")
    print(f"   • Tổng số danh mục: {summary['total_categories']}")
    print(f"   • Tổng số tag unique: {summary['total_tags']}")
    print(f"   • Tổng dung lượng: {summary['total_size']:,} bytes ({summary['total_size']/1024/1024:.2f} MB)")
    print(f"   • Tổng số dòng: {summary['total_lines']:,}")
    
    # Phân tích theo danh mục
    print(f"\n📂 PHÂN TÍCH THEO DANH MỤC:")
    categories = data['categories']
    sorted_categories = sorted(categories.items(), key=lambda x: x[1]['count'], reverse=True)
    
    for category, info in sorted_categories:
        percentage = (info['count'] / summary['total_files']) * 100
        print(f"\n   🏷️  {category}")
        print(f"      • Số lượng: {info['count']} file ({percentage:.1f}%)")
        print(f"      • Một số file tiêu biểu:")
        for file in info['files'][:5]:  # Hiển thị 5 file đầu
            print(f"        - {file}")
        if len(info['files']) > 5:
            print(f"        ... và {len(info['files']) - 5} file khác")
    
    # Top tags phổ biến
    print(f"\n🏷️  TOP 20 TAG PHỔ BIẾN NHẤT:")
    top_tags = data['top_tags']
    for i, (tag, count) in enumerate(list(top_tags.items())[:20], 1):
        percentage = (count / summary['total_files']) * 100
        print(f"   {i:2d}. {tag:<25} : {count:3d} file ({percentage:.1f}%)")
    
    # Phân tích ngôn ngữ
    print(f"\n🌐 PHÂN TÍCH NGÔN NGỮ:")
    language_stats = defaultdict(int)
    content_type_stats = defaultdict(int)
    
    for file_info in data['files']:
        language_stats[file_info['language']] += 1
        content_type_stats[file_info['content_type']] += 1
    
    for lang, count in language_stats.items():
        percentage = (count / summary['total_files']) * 100
        print(f"   • {lang}: {count} file ({percentage:.1f}%)")
    
    # Phân tích loại nội dung
    print(f"\n📄 PHÂN TÍCH LOẠI NỘI DUNG:")
    for content_type, count in sorted(content_type_stats.items(), key=lambda x: x[1], reverse=True):
        percentage = (count / summary['total_files']) * 100
        print(f"   • {content_type}: {count} file ({percentage:.1f}%)")
    
    # Thống kê kích thước file
    print(f"\n📏 THỐNG KÊ KÍCH THƯỚC FILE:")
    file_sizes = [f['file_size'] for f in data['files']]
    file_sizes.sort()
    
    print(f"   • File nhỏ nhất: {min(file_sizes):,} bytes")
    print(f"   • File lớn nhất: {max(file_sizes):,} bytes")
    print(f"   • Kích thước trung bình: {sum(file_sizes)/len(file_sizes):,.0f} bytes")
    print(f"   • Kích thước trung vị: {file_sizes[len(file_sizes)//2]:,} bytes")
    
    # Top 10 file lớn nhất
    print(f"\n📈 TOP 10 FILE LỚN NHẤT:")
    largest_files = sorted(data['files'], key=lambda x: x['file_size'], reverse=True)[:10]
    for i, file_info in enumerate(largest_files, 1):
        size_kb = file_info['file_size'] / 1024
        print(f"   {i:2d}. {file_info['file_name']:<50} : {size_kb:6.1f} KB ({file_info['category']})")
    
    # Phân tích độ phức tạp (dựa trên số dòng và headers)
    print(f"\n🔍 PHÂN TÍCH ĐỘ PHỨC TẠP:")
    line_counts = [f['line_count'] for f in data['files']]
    
    simple_files = [f for f in data['files'] if f['line_count'] <= 50]
    medium_files = [f for f in data['files'] if 50 < f['line_count'] <= 200]
    complex_files = [f for f in data['files'] if f['line_count'] > 200]
    
    print(f"   • File đơn giản (≤50 dòng): {len(simple_files)} file ({len(simple_files)/summary['total_files']*100:.1f}%)")
    print(f"   • File trung bình (51-200 dòng): {len(medium_files)} file ({len(medium_files)/summary['total_files']*100:.1f}%)")
    print(f"   • File phức tạp (>200 dòng): {len(complex_files)} file ({len(complex_files)/summary['total_files']*100:.1f}%)")
    
    # Gợi ý cải thiện
    print(f"\n💡 GỢI Ý CẢI THIỆN:")
    print(f"   • Có {categories['General']['count']} file trong danh mục 'General' - nên xem xét phân loại chi tiết hơn")
    print(f"   • Có thể tạo thêm các danh mục con cho các chủ đề lớn")
    print(f"   • Xem xét việc tạo index file cho từng danh mục để dễ tìm kiếm")
    print(f"   • Có thể sử dụng tag để tạo liên kết giữa các file liên quan")
    
    print(f"\n" + "="*80)
    print("KẾT THÚC BÁO CÁO")
    print("="*80)

if __name__ == "__main__":
    create_detailed_report()
