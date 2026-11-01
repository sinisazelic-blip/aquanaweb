import os
import re
import json
from datetime import datetime

sql_file = r'd:\Dev\AquanaWEB\desavanjaaquanac_7.sql'

def fix_text(s: str) -> str:
    s = s.replace(r"\'", "'").replace(r'\"', '"').strip()
    if any(c in s for c in ['Ð', 'Ñ', 'Ä']):
        try:
            return s.encode('cp1252').decode('utf-8')
        except Exception:
            try:
                return s.encode('latin1').decode('utf-8')
            except Exception:
                pass
    return s

def clean_html(raw_html: str) -> str:
    clean = re.sub(r'<[^>]+>', ' ', raw_html)
    clean = re.sub(r'\[caption[^\]]*\](.*?)\[/caption\]', r'\1', clean)
    clean = re.sub(r'\[[^\]]+\]', '', clean)
    clean = re.sub(r'\s+', ' ', clean).strip()
    return clean

pages = []
news_posts = []

with open(sql_file, 'r', encoding='utf-8', errors='ignore') as f:
    for line in f:
        if 'INSERT INTO `wpou_posts`' in line or line.startswith('('):
            # Parse rows
            # Matches post fields
            matches = re.findall(
                r"\d+,\s*(\d+),\s*'([^']*)',\s*'([^']*)',\s*'([^']*)',\s*'([^']*)',\s*'([^']*)',\s*'(publish)',[^,]+,[^,]+,[^,]+,\s*'([^']*)',[^,]+,[^,]+,[^,]+,[^,]+,[^,]+,\s*\d+,\s*'([^']*)',\s*\d+,\s*'([^']*)'",
                line
            )
            for m in matches:
                author, date, date_gmt, content, title_raw, excerpt, status, slug, guid, post_type = m
                title = fix_text(title_raw)
                if not title or len(title) < 3:
                    continue

                clean_body = fix_text(clean_html(content))
                # Find any image in content or guid
                img_match = re.search(r'([^\'\"\s<>]+\.(?:jpg|png|jpeg))', content, re.IGNORECASE)
                img = img_match.group(1) if img_match else ""

                item = {
                    "title": title,
                    "slug": slug,
                    "date": date[:10],
                    "content": clean_body,
                    "raw_content": content,
                    "image": img,
                    "post_type": post_type
                }

                if post_type == 'page':
                    pages.append(item)
                elif post_type == 'post':
                    news_posts.append(item)

print(f"Extracted {len(pages)} pages and {len(news_posts)} posts.")
for p in pages:
    print(f"PAGE: {p['title']} | slug: {p['slug']} | len: {len(p['content'])}")

with open(r'd:\Dev\AquanaWEB\scripts\extracted_wp.json', 'w', encoding='utf-8') as f:
    json.dump({"pages": pages, "news": news_posts}, f, indent=2, ensure_ascii=False)

print("Saved to scripts/extracted_wp.json")
