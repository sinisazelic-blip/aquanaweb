import os

paths = [
    'D:/Dev/AquanaWEB/src/components/KidsContestBanner.tsx',
    'D:/Dev/AquanaWEB/src/components/VisitorCommentsSection.tsx'
]

for p in paths:
    with open(p, 'r', encoding='utf-8') as f:
        lines = f.readlines()
    
    # Check if line 0 is "use client" and line 2 is also "use client"
    if len(lines) > 3:
        if 'use client' in lines[0] and 'use client' in lines[2]:
            lines.pop(2)
            with open(p, 'w', encoding='utf-8') as f:
                f.writelines(lines)
            print("Removed duplicate use client from", p)
        else:
            print("No duplicate at line 2 for", p)
