#!/bin/bash

# Technology folder language tagging script
echo "🔧 Processing Technology folder language tags..."

# Process Technology files that need lang tags
count=0

# Find Technology files with tags but no lang tags
find /Users/ngosangns/Github/ngosangns-obsidian/Technology -name "*.md" -type f | while read file; do
    if grep -q "^tags:" "$file" && ! grep -q "lang/" "$file"; then
        count=$((count + 1))
        echo "Processing: $(basename "$file")"
        
        # Check first 10 lines for Vietnamese content
        if head -10 "$file" | grep -q "[àáảãạâầấẩẫậăằắẳẵặèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵ]"; then
            echo "  → Vietnamese detected"
            # Add lang/vi after the tags: line
            sed -i '/^tags:/a\  - lang/vi' "$file"
        else
            echo "  → English/Other detected"
            # Add lang/en after the tags: line
            sed -i '/^tags:/a\  - lang/en' "$file"
        fi
    fi
done

echo "✅ Technology folder processing complete!"