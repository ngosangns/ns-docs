#!/usr/bin/env python3
"""
Markdown Workspace Broken Links Checker
Checks for broken internal links in a Markdown workspace

Usage:
    python check_broken_links.py [--root-path PATH] [--fix] [--output FORMAT]

Options:
    --root-path PATH    Path to Markdown workspace (default: current directory)
    --fix               Attempt to fix broken links automatically
    --output FORMAT     Output format: text, json, markdown (default: text)
    --verbose           Show detailed information
"""

import os
import re
import sys
import json
import argparse
from pathlib import Path
from collections import defaultdict
from typing import Dict, List, Tuple, Set
from datetime import datetime

class MarkdownLinkChecker:
    def __init__(self, root_path: str):
        self.root_path = Path(root_path).resolve()
        self.broken_links: List[Dict] = []
        self.files_checked = 0
        self.total_links = 0
        self.broken_count = 0
        
        # File index: lowercase filename -> list of paths
        self.file_index: Dict[str, List[Path]] = {}
        # Slug index: slugified name -> list of paths  
        self.slug_index: Dict[str, List[Path]] = {}
        
    def slugify(self, text: str) -> str:
        """Convert text to kebab-case slug"""
        import unicodedata
        # Remove accents
        text = unicodedata.normalize('NFKD', text).encode('ASCII', 'ignore').decode('ASCII')
        text = text.lower()
        # Remove special chars except alphanumeric, spaces, hyphens
        text = re.sub(r'[^\w\s-]', '', text)
        # Replace spaces with hyphens
        text = re.sub(r'[\s]+', '-', text)
        # Remove consecutive hyphens
        text = re.sub(r'-+', '-', text)
        return text.strip('-')
    
    def build_file_index(self):
        """Build index of all markdown files in the workspace"""
        print(f"🔍 Scanning workspace: {self.root_path}")
        
        md_files = []
        for file_path in self.root_path.rglob("*.md"):
            # Skip hidden directories and common non-content dirs
            if any(part.startswith('.') or part in ['venv', 'node_modules'] 
                   for part in file_path.parts):
                continue
            md_files.append(file_path)
        
        for file_path in md_files:
            rel_path = file_path.relative_to(self.root_path)
            rel_path_str = str(rel_path)
            filename = file_path.stem
            slug = self.slugify(filename)
            
            # Index by lowercase filename
            key = filename.lower()
            if key not in self.file_index:
                self.file_index[key] = []
            self.file_index[key].append(rel_path)
            
            # Index by slug
            if slug not in self.slug_index:
                self.slug_index[slug] = []
            self.slug_index[slug].append(rel_path)
            
            # Also index by relative path (for full path links)
            path_key = rel_path_str.lower().replace('.md', '')
            if path_key not in self.file_index:
                self.file_index[path_key] = []
            if rel_path not in self.file_index[path_key]:
                self.file_index[path_key].append(rel_path)
            
            # Index by path slug
            path_slug = self.slugify(rel_path_str.replace('.md', ''))
            if path_slug not in self.slug_index:
                self.slug_index[path_slug] = []
            if rel_path not in self.slug_index[path_slug]:
                self.slug_index[path_slug].append(rel_path)
        
        print(f"📚 Found {len(md_files)} markdown files")
    
    def parse_wiki_links(self, content: str) -> List[Tuple[str, int]]:
        """Extract wiki links [[...]] from content with line numbers"""
        links = []
        # Pattern for [[Link]] or [[Link|alias]] or [[Link#heading]]
        pattern = r'\[\[([^\]|]+)(?:\|[^\]]+)?\]\]'
        
        # File extensions to ignore (not markdown notes)
        ignore_extensions = {'.png', '.jpg', '.jpeg', '.gif', '.pdf', '.mp4', '.mov', '.webp'}
        
        # Track code blocks
        in_code_block = False
        code_block_fence = None
        
        lines = content.split('\n')
        for line_num, line in enumerate(lines, 1):
            # Check for code block fences
            stripped = line.strip()
            if stripped.startswith('```') or stripped.startswith('~~~'):
                if not in_code_block:
                    in_code_block = True
                    code_block_fence = stripped[:3]
                elif stripped.startswith(code_block_fence):
                    in_code_block = False
                    code_block_fence = None
                continue
            
            # Skip code blocks
            if in_code_block:
                continue
            
            # Skip inline code
            # Remove inline code blocks `...` before matching
            line_without_inline = re.sub(r'`[^`]*`', '', line)
            
            for match in re.finditer(pattern, line_without_inline):
                link_text = match.group(1).strip()
                # Remove heading anchor if present
                if '#' in link_text:
                    link_text = link_text.split('#')[0]
                
                # Skip if it's a non-markdown file
                lower_link = link_text.lower()
                if any(lower_link.endswith(ext) for ext in ignore_extensions):
                    continue
                
                links.append((link_text, line_num))
        
        return links
    
    def check_link_exists(self, link_text: str, source_file: Path) -> Tuple[bool, Path]:
        """
        Check if a linked file exists
        Returns: (exists, suggested_path)
        """
        # Try different variations of the link
        checks = [
            link_text,  # Original
            link_text.lower(),  # Lowercase
            self.slugify(link_text),  # Slugified
        ]
        
        # Check if it's a relative path
        if link_text.startswith('./') or link_text.startswith('../'):
            # Resolve relative to source file
            source_dir = source_file.parent
            linked_path = source_dir / link_text.replace('./', '')
            if linked_path.exists():
                return True, linked_path.relative_to(self.root_path)
        
        # Check in indexes
        for check in checks:
            if check in self.file_index:
                return True, self.file_index[check][0]
            if check in self.slug_index:
                return True, self.slug_index[check][0]
        
        # Try to find similar files (fuzzy match)
        best_match = None
        best_score = 0
        link_slug = self.slugify(link_text)
        
        for slug, paths in self.slug_index.items():
            # Simple similarity: common substring length
            common = sum(1 for a, b in zip(link_slug, slug) if a == b)
            score = common / max(len(link_slug), len(slug))
            if score > best_score and score > 0.6:  # 60% similarity threshold
                best_score = score
                best_match = paths[0]
        
        return False, best_match
    
    def check_file(self, file_path: Path):
        """Check all links in a single file"""
        try:
            content = file_path.read_text(encoding='utf-8')
        except Exception as e:
            print(f"⚠️  Error reading {file_path}: {e}")
            return
        
        links = self.parse_wiki_links(content)
        rel_path = file_path.relative_to(self.root_path)
        
        for link_text, line_num in links:
            self.total_links += 1
            exists, suggestion = self.check_link_exists(link_text, file_path)
            
            if not exists:
                self.broken_count += 1
                self.broken_links.append({
                    'file': str(rel_path),
                    'line': line_num,
                    'link': link_text,
                    'suggestion': str(suggestion) if suggestion else None,
                    'type': 'wiki'
                })
    
    def scan_workspace(self):
        """Scan entire workspace for broken links"""
        print("🔎 Checking for broken links...\n")
        
        md_files = list(self.root_path.rglob("*.md"))
        
        for file_path in md_files:
            # Skip hidden directories
            if any(part.startswith('.') or part in ['venv', 'node_modules'] 
                   for part in file_path.parts):
                continue
            
            self.files_checked += 1
            self.check_file(file_path)
        
        print(f"✅ Scan complete!")
        print(f"   Files checked: {self.files_checked}")
        print(f"   Total links: {self.total_links}")
        print(f"   Broken links: {self.broken_count}")
    
    def print_text_report(self):
        """Print text format report"""
        if not self.broken_links:
            print("\n🎉 No broken links found!")
            return
        
        print(f"\n🚨 Found {self.broken_count} broken links:\n")
        
        # Group by file
        by_file = defaultdict(list)
        for link in self.broken_links:
            by_file[link['file']].append(link)
        
        for file_path, links in sorted(by_file.items()):
            print(f"📄 {file_path}")
            for link in links:
                print(f"   Line {link['line']}: [[{link['link']}]]")
                if link['suggestion']:
                    print(f"   💡 Suggestion: [[{link['suggestion']}]]")
            print()
    
    def print_json_report(self):
        """Print JSON format report"""
        report = {
            'scan_date': datetime.now().isoformat(),
            'root_path': str(self.root_path),
            'summary': {
                'files_checked': self.files_checked,
                'total_links': self.total_links,
                'broken_links': self.broken_count
            },
            'broken_links': self.broken_links
        }
        print(json.dumps(report, indent=2))
    
    def print_markdown_report(self):
        """Print markdown format report"""
        print("# Broken Links Report\n")
        print(f"**Scan Date:** {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n")
        print("## Summary\n")
        print(f"- Files checked: {self.files_checked}")
        print(f"- Total links: {self.total_links}")
        print(f"- Broken links: {self.broken_count}\n")
        
        if not self.broken_links:
            print("✅ No broken links found!")
            return
        
        print("## Broken Links\n")
        
        # Group by file
        by_file = defaultdict(list)
        for link in self.broken_links:
            by_file[link['file']].append(link)
        
        for file_path, links in sorted(by_file.items()):
            print(f"### {file_path}\n")
            for link in links:
                print(f"- Line {link['line']}: `[[{link['link']}]]`")
                if link['suggestion']:
                    print(f"  - 💡 Suggestion: `[[{link['suggestion']}]]`")
            print()
    
    def fix_broken_links(self):
        """Attempt to fix broken links automatically"""
        if not self.broken_links:
            print("\n🎉 No broken links to fix!")
            return
        
        fixed_count = 0
        
        for broken in self.broken_links:
            if not broken['suggestion']:
                continue
            
            file_path = self.root_path / broken['file']
            try:
                content = file_path.read_text(encoding='utf-8')
                original_content = content
                
                # Replace the broken link with the suggestion
                old_link = f"[[{broken['link']}]]"
                new_link = f"[[{broken['suggestion']}]]"
                content = content.replace(old_link, new_link)
                
                if content != original_content:
                    file_path.write_text(content, encoding='utf-8')
                    fixed_count += 1
                    print(f"✅ Fixed: {broken['file']} - [[{broken['link']}]] -> [[{broken['suggestion']}]]")
            except Exception as e:
                print(f"⚠️  Error fixing {file_path}: {e}")
        
        print(f"\n🎉 Fixed {fixed_count} links")

def main():
    parser = argparse.ArgumentParser(
        description='Check for broken links in a Markdown workspace',
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  python check_broken_links.py
  python check_broken_links.py --root-path ~/Notes
  python check_broken_links.py --output markdown > report.md
  python check_broken_links.py --fix
        """
    )
    
    parser.add_argument(
        '--root-path',
        default='.',
        help='Path to Markdown workspace (default: current directory)'
    )
    
    parser.add_argument(
        '--fix',
        action='store_true',
        help='Attempt to fix broken links automatically'
    )
    
    parser.add_argument(
        '--output',
        choices=['text', 'json', 'markdown'],
        default='text',
        help='Output format (default: text)'
    )
    
    parser.add_argument(
        '--verbose',
        action='store_true',
        help='Show detailed information'
    )
    
    args = parser.parse_args()
    
    # Initialize checker
    checker = MarkdownLinkChecker(args.root_path)
    
    # Build file index
    checker.build_file_index()
    
    # Scan workspace
    checker.scan_workspace()
    
    # Print report
    if args.output == 'json':
        checker.print_json_report()
    elif args.output == 'markdown':
        checker.print_markdown_report()
    else:
        checker.print_text_report()
    
    # Fix broken links if requested
    if args.fix:
        print("\n🔧 Attempting to fix broken links...")
        checker.fix_broken_links()
    
    # Exit with error code if broken links found
    if checker.broken_count > 0:
        sys.exit(1)
    else:
        sys.exit(0)

if __name__ == '__main__':
    main()
