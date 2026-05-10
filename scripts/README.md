# Markdown Workspace Broken Links Checker

A Python script to check for broken internal wiki-style links in a Markdown workspace.

## Features

- ✅ Scans all markdown files for wiki-style links such as `double-bracket links`
- ✅ Ignores non-markdown files (images, PDFs, etc.)
- ✅ Supports path-based links
- ✅ Suggests similar files for broken links
- ✅ Multiple output formats: text, JSON, markdown
- ✅ Optional auto-fix mode

## Installation

No external dependencies required. Uses only Python standard library.

## Usage

### Basic check

```bash
python scripts/check_broken_links.py
```

### Check specific workspace path

```bash
python scripts/check_broken_links.py --root-path /path/to/your/workspace
```

### Generate markdown report

```bash
python scripts/check_broken_links.py --output markdown > broken_links_report.md
```

### Auto-fix broken links

```bash
python scripts/check_broken_links.py --fix
```

### JSON output (for CI/CD)

```bash
python scripts/check_broken_links.py --output json
```

## Command Line Options

| Option             | Description                               | Default           |
| ------------------ | ----------------------------------------- | ----------------- |
| `--root-path PATH` | Path to Markdown workspace                | Current directory |
| `--fix`            | Attempt to fix broken links automatically | False             |
| `--output FORMAT`  | Output format: text, json, markdown       | text              |
| `--verbose`        | Show detailed information                 | False             |
| `--help`           | Show help message                         | -                 |

## Exit Codes

- `0`: No broken links found
- `1`: Broken links found (useful for CI/CD pipelines)

## How It Works

1. **Build Index**: Scans all `.md` files and builds an index by:
   - Filename (lowercase)
   - Slugified filename (kebab-case)
   - Full relative path (lowercase)
   - Full relative path slug

2. **Parse Links**: Extracts double-bracket wiki links from each file, ignoring:
   - Heading anchors
   - Non-markdown files (images, PDFs, etc.)

3. **Check Existence**: For each link, checks if the file exists by:
   - Exact filename match
   - Case-insensitive match
   - Slugified match
   - Full path match

4. **Suggest Fixes**: For broken links, suggests similar files based on:
   - String similarity (60% threshold)
   - Slug comparison

## Output Examples

### Text Output

```
🚨 Found 3 broken links:

📄 folder/note.md
   Line 10: double-bracket broken-link
   Suggestion: folder/broken-link.md
```

### Markdown Report

```markdown
# Broken Links Report

**Scan Date:** 2026-04-13 12:00:00

## Summary

- Files checked: 302
- Total links: 78
- Broken links: 3

## Broken Links

### folder/note.md

- Line 10: `double-bracket broken-link`
  - Suggestion: `folder/broken-link.md`
```

### JSON Output

```json
{
  "scan_date": "2026-04-13T12:00:00",
  "root_path": "/path/to/workspace",
  "summary": {
    "files_checked": 302,
    "total_links": 78,
    "broken_links": 3
  },
  "broken_links": [
    {
      "file": "folder/note.md",
      "line": 10,
      "link": "broken-link",
      "suggestion": "folder/broken-link.md",
      "type": "wiki"
    }
  ]
}
```

## Integration with Git Hooks

You can add this to your pre-commit hook to prevent commits with broken links:

```bash
#!/bin/bash
# .git/hooks/pre-commit

python scripts/check_broken_links.py --output json
if [ $? -ne 0 ]; then
    echo "❌ Broken links found! Please fix them before committing."
    exit 1
fi
```

## License

MIT License - Feel free to use and modify as needed.
