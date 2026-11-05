import re

path = "src/app/dokumenti/page.tsx"
with open(path, "r", encoding="utf-8") as f:
    content = f.read()

# Check if useLanguage is used
print("Has useLanguage:", "useLanguage" in content)
print("Has SZZP:", "szzp@aquana.ba" in content)
