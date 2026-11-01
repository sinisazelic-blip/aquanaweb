import re

sql_file = r'd:\Dev\AquanaWEB\desavanjaaquanac_7.sql'

print("Scanning SQL for post types, terms and attachment files...")

# Let's count post types in INSERT INTO `wpou_posts`
post_type_counts = {}
tenders = []
attachments = []
terms = {}

with open(sql_file, 'r', encoding='utf-8', errors='ignore') as f:
    for line in f:
        if line.startswith("INSERT INTO `wpou_terms`"):
            # extract terms: (term_id, name, slug, term_group)
            matches = re.findall(r"\((\d+),\s*'([^']*)',\s*'([^']*)'", line)
            for m in matches:
                terms[m[0]] = m[1]
                
        if line.startswith("INSERT INTO `wpou_posts`"):
            # In wp_posts, fields typically:
            # (ID, post_author, post_date, post_date_gmt, post_content, post_title, post_excerpt, post_status, comment_status, ping_status, post_password, post_name, to_ping, pinged, post_modified, post_modified_gmt, post_content_filtered, post_parent, guid, menu_order, post_type, post_mime_type, comment_count)
            # Find all guids and post_types:
            rows = re.findall(r"'(http[^']+)'.*?'(post|page|attachment|revision|nav_menu_item|wp_global_styles|wp_template|wp_block|wpgmza_map|custom_css|wpforms)'", line)
            for guid, pt in rows:
                post_type_counts[pt] = post_type_counts.get(pt, 0) + 1
                if pt == 'attachment':
                    attachments.append(guid)

print(f"Terms found: {len(terms)}")
for tid, name in sorted(terms.items(), key=lambda x: int(x[0]))[:30]:
    print(f"  [{tid}] {name}")
if len(terms) > 30:
    print(f"  ... and {len(terms) - 30} more")

print("\nPost Types sampled from SQL:")
for pt, cnt in sorted(post_type_counts.items(), key=lambda x: -x[1]):
    print(f"  {pt}: {cnt}")

print(f"\nTotal attachments identified: {len(attachments)}")
pdfs = [a for a in attachments if a.lower().endswith('.pdf')]
print(f"PDF attachments: {len(pdfs)}")
print("Sample PDFs:")
for p in pdfs[:10]:
    print(" ", p)
