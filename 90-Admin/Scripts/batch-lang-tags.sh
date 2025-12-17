#!/bin/bash

# Batch Language Tag Detection and Addition Script
# This script detects language in markdown files and adds appropriate lang tags

echo "🔍 Starting batch language tag migration..."

# Counter for statistics
total_files=0
vietnamese_files=0
english_files=0
errors=0

# Find all markdown files with tags but no lang tags
find /Users/ngosangns/Github/ngosangns-obsidian -name "*.md" -type f | while read file; do
    # Check if file has tags but no lang tag
    if grep -q "^tags:" "$file" && ! grep -q "lang/" "$file"; then
        total_files=$((total_files + 1))
        
        echo "Processing: $file"
        
        # Detect Vietnamese content (look for Vietnamese characters)
        if grep -q "[àáảãạâầấẩẫậăằắẳẵặèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵ]" "$file"; then
            echo "  → Vietnamese detected, adding lang/vi"
            vietnamese_files=$((vietnamese_files + 1))
            
            # Add lang/vi tag to the tags section
            sed -i '/^tags:/,/^[[:space:]]*$/ {
                /lang\//! {
                    /^tags:/a\  - lang/vi
                }
            }' "$file"
            
        else
            echo "  → English/Other detected, adding lang/en"
            english_files=$((english_files + 1))
            
            # Add lang/en tag to the tags section
            sed -i '/^tags:/,/^[[:space:]]*$/ {
                /lang\//! {
                    /^tags:/a\  - lang/en
                }
            }' "$file"
        fi
        
        # Verify the change was made
        if grep -q "lang/" "$file"; then
            echo "  ✅ Success"
        else
            echo "  ❌ Failed to add lang tag"
            errors=$((errors + 1))
        fi
    fi
done

echo ""
echo "📊 Migration Statistics:"
echo "Total files processed: $total_files"
echo "Vietnamese files: $vietnamese_files"
echo "English files: $english_files"
echo "Errors: $errors"
echo ""
echo "✅ Batch language tag migration complete!"