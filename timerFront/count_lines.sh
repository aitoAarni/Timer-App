#!/bin/bash

# Directories to scan
CODE_DIRS=("app" "components" "contexts" "hooks" "redux" "services" "storage" "utils" "__tests__")

# File extensions to count
FILE_EXTENSIONS=("*.ts" "*.tsx" "*.js" "*.jsx")

# Exclude list
EXCLUDE_DIRS=("node_modules" "package.json" "package-lock.json" "yarn.lock" "dist" "build")

total_lines=0

for dir in "${CODE_DIRS[@]}"; do
    for ext in "${FILE_EXTENSIONS[@]}"; do
        while IFS= read -r file; do
            if [[ ! " ${EXCLUDE_DIRS[@]} " =~ " ${file} " ]]; then
                file_lines=$(wc -l < "$file")
                echo "$file: $file_lines"
                total_lines=$((total_lines + file_lines))
            fi
        done < <(find "$dir" -type f -name "$ext")
    done
done

echo "----------------------------"
echo "Total lines of code: $total_lines"
