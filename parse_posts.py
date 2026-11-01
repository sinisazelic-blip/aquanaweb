import re

sql_file = r'd:\Dev\AquanaWEB\desavanjaaquanac_7.sql'

post_types = {}
statuses = {}
media_urls = []
sample_posts = []

in_posts = False

with open(sql_file, 'r', encoding='utf-8', errors='ignore') as f:
    for line in f:
        if 'INSERT INTO `wpou_posts`' in line:
            in_posts = True
            continue
        if in_posts:
            # Check for post_type and status and guid
            # Typically at end of tuple: ..., 'publish', 'closed', 'closed', '', 'slug', '', '', '...', '...', '', 0, 'http://...', 0, 'post', '', 0)
            m = re.search(r"'(http[^']+)'.*?'(publish|inherit|draft|trash)'.*?'(post|page|attachment|revision|nav_menu_item|wp_block|wp_template)'.*?\)", line)
            if not m:
                # alternative pattern: guid is before post_type
                m_type = re.search(r"'(publish|inherit|draft|trash)'.*?'(post|page|attachment|revision|nav_menu_item|wp_block)'", line)
                if m_type:
                    st, pt = m_type.group(1), m_type.group(2)
                    post_types[pt] = post_types.get(pt, 0) + 1
                    statuses[st] = statuses.get(st, 0) + 1
            else:
                guid, st, pt = m.group(1), m.group(2), m.group(3)
                post_types[pt] = post_types.get(pt, 0) + 1
                statuses[st] = statuses.get(st, 0) + 1
                if pt == 'attachment':
                    media_urls.append(guid)
            
            # also extract any uploads url
            for u in re.findall(r'https?://[^\s\'"]+/wp-content/uploads/[^\s\'"]+', line):
                media_urls.append(u)

            if line.strip().endswith(';'):
                in_posts = False

# deduplicate media URLs
media_urls = list(set(media_urls))
print(f"Sample Post Types: {post_types}")
print(f"Sample Statuses: {statuses}")
print(f"Total Unique Media URLs found: {len(media_urls)}")

pdfs = [u for u in media_urls if u.lower().endswith('.pdf')]
images = [u for u in media_urls if any(u.lower().endswith(ext) for ext in ['.jpg', '.jpeg', '.png', '.webp'])]

print(f"Total PDFs in database: {len(pdfs)}")
print(f"Total Images in database: {len(images)}")

print("\n--- Sample PDFs (First 15) ---")
for p in sorted(pdfs)[:15]:
    print(" ", p)

print("\n--- Sample Images (First 10) ---")
for img in sorted(images)[:10]:
    print(" ", img)
