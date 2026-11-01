import re
from collections import Counter

xml_file = r'd:\Dev\AquanaWEB\desavanjaaquanac_7.xml'

post_types = Counter()
post_statuses = Counter()
categories = set()
attachments_urls = []
tenders = []

with open(xml_file, 'r', encoding='utf-8', errors='ignore') as f:
    content = f.read()

items = re.findall(r'<item>(.*?)</item>', content, re.DOTALL)
print(f"Total <item> entries found: {len(items)}")

for it in items:
    pt = re.search(r'<wp:post_type><!\[CDATA\[(.*?)\]\]></wp:post_type>', it)
    if not pt:
        pt = re.search(r'<wp:post_type>(.*?)</wp:post_type>', it)
    pt_val = pt.group(1) if pt else 'unknown'
    post_types[pt_val] += 1
    
    ps = re.search(r'<wp:status><!\[CDATA\[(.*?)\]\]></wp:status>', it)
    if not ps:
        ps = re.search(r'<wp:status>(.*?)</wp:status>', it)
    ps_val = ps.group(1) if ps else 'unknown'
    post_statuses[ps_val] += 1
    
    title_m = re.search(r'<title><!\[CDATA\[(.*?)\]\]></title>', it)
    if not title_m:
        title_m = re.search(r'<title>(.*?)</title>', it)
    title = title_m.group(1) if title_m else ''
    
    cats = re.findall(r'<category domain="category"[^>]*><!\[CDATA\[(.*?)\]\]></category>', it)
    for c in cats:
        categories.add(c)
        if any(w in c.lower() or w in title.lower() for w in ['nabavk', 'tender', 'javn']):
            tenders.append((title, c))
            
    if pt_val == 'attachment':
        url_m = re.search(r'<wp:attachment_url><!\[CDATA\[(.*?)\]\]></wp:attachment_url>', it)
        if not url_m:
            url_m = re.search(r'<wp:attachment_url>(.*?)</wp:attachment_url>', it)
        if url_m:
            attachments_urls.append(url_m.group(1))

print("\n--- Post Types ---")
for pt, c in post_types.most_common():
    print(f"  {pt}: {c}")

print("\n--- Statuses ---")
for ps, c in post_statuses.most_common():
    print(f"  {ps}: {c}")

print(f"\n--- Total Categories ({len(categories)}) ---")
for c in sorted(categories):
    print(f"  - {c}")

print(f"\n--- Attachments count: {len(attachments_urls)} ---")
pdf_urls = [u for u in attachments_urls if u.lower().endswith('.pdf')]
print(f"PDF attachments count: {len(pdf_urls)}")
print("Sample PDF URLs:")
for u in pdf_urls[:10]:
    print("  ", u)

print(f"\n--- Tender/Nabavke items found: {len(tenders)} ---")
for t in tenders[:15]:
    print(f"  [{t[1]}] {t[0]}")
