#!/bin/bash

# Next Batch Automation Script for Language Tags
# Targeted approach for remaining files

echo "🚀 Starting targeted batch automation for language tags..."

# Process Technology files (largest group remaining)
echo "📋 Processing Technology files..."
find /Users/ngosangns/Github/ngosangns-obsidian/Technology -name "*.md" -type f | while read file; do
    if grep -q "^tags:" "$file" && ! grep -q "lang/" "$file"; then
        echo "Processing: $(basename "$file")"
        
        # Quick language detection
        if head -5 "$file" | grep -q "[àáảãạâầấẩẫậăằắẳẵặèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵ]"; then
            sed -i '/^tags:/a\  - lang/vi' "$file"
            echo "  ✅ Added lang/vi"
        else
            sed -i '/^tags:/a\  - lang/en' "$file"
            echo "  ✅ Added lang/en"
        fi
    fi
done

# Process Business files
echo "📋 Processing Business files..."
find /Users/ngosangns/Github/ngosangns-obsidian/Business -name "*.md" -type f | while read file; do
    if grep -q "^tags:" "$file" && ! grep -q "lang/" "$file"; then
        echo "Processing: $(basename "$file")"
        
        if head -5 "$file" | grep -q "[àáảãạâầấẩẫậăằắẳẵặèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵ]"; then
            sed -i '/^tags:/a\  - lang/vi' "$file"
            echo "  ✅ Added lang/vi"
        else
            sed -i '/^tags:/a\  - lang/en' "$file"
            echo "  ✅ Added lang/en"
        fi
    fi
done

echo "✅ Batch automation complete!"
echo ""
echo "Next steps:"
echo "1. Run: grep -r '^tags:' /Users/ngosangns/Github/ngosangns-obsidian --include='*.md' | grep -v 'lang/' | wc -l"
echo "2. Review any edge cases manually"
echo "3. Test Quality Control dashboard"