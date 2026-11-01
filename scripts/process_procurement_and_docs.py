import os
import re
import json
from datetime import datetime

sql_path = r"d:\Dev\AquanaWEB\desavanjaaquanac_7.sql"
pdf_dir = r"d:\Dev\AquanaWEB\public\dokumenti"
os.makedirs(pdf_dir, exist_ok=True)

existing_pdfs = set(os.listdir(pdf_dir))
print(f"Total PDFs in {pdf_dir}: {len(existing_pdfs)}")

with open(sql_path, "r", encoding="utf-8", errors="ignore") as f:
    sql_text = f.read()

# Let's inspect terms/taxonomies
tax_matches = re.findall(r"INSERT INTO `wp_terms` VALUES \((.*?)\);", sql_text)
terms = {}
for m in tax_matches:
    for row in re.findall(r"\((\d+),'([^']+)','([^']+)',(\d+)\)", m):
        terms[row[0]] = row[1]
print("Terms sample:", list(terms.items())[:15])

# Find posts
post_pattern = re.compile(
    r"\((\d+),(\d+),'([^']*)','([^']*)','([^']*)','([^']*)','([^']*)','([^']*)','([^']*)','([^']*)','([^']*)','([^']*)','([^']*)','([^']*)','([^']*)','([^']*)','([^']*)',(\d+),'([^']*)',(\d+),'([^']*)','([^']*)',(\d+)\)"
)

# Search for attachments or posts with post_type in ('post', 'attachment')
posts_data = []
# Find INSERT INTO `wp_posts`
for m in re.finditer(r"INSERT INTO `wp_posts` VALUES (.*?);", sql_text, re.DOTALL):
    chunk = m.group(1)
    # Parse individual rows
    # Columns in wp_posts: ID, post_author, post_date, post_date_gmt, post_content, post_title, post_excerpt, post_status, comment_status, ping_status, post_password, post_name, to_ping, pinged, post_modified, post_modified_gmt, post_content_filtered, post_parent, guid, menu_order, post_type, post_mime_type, comment_count
    rows = re.findall(r"\((\d+),\d+,'([^']*)','[^']*',(.*?),'publish'", chunk)
    for r in re.finditer(r"\((\d+),\d+,'(\d{4}-\d{2}-\d{2})[^']*','[^']*',(.*?),'([a-z]+)','(?:open|closed)'", chunk):
        pid, pdate, rest, pstatus = r.groups()
        if pstatus == 'publish':
            posts_data.append((pid, pdate, rest))

print(f"Found {len(posts_data)} published posts/attachments")
