import os
import re
import urllib.request
import urllib.parse

sql_file = r'd:\Dev\AquanaWEB\desavanjaaquanac_7.sql'
out_dir = r'd:\Dev\AquanaWEB\dokumenti'
os.makedirs(out_dir, exist_ok=True)

media_urls = set()
with open(sql_file, 'r', encoding='utf-8', errors='ignore') as f:
    for line in f:
        for u in re.findall(r'https?://(?:localhost/wordpress|aquana\.ba)/wp-content/uploads/([^\s\'"]+\.pdf)', line, re.IGNORECASE):
            media_urls.add(u)

print(f"Total unique PDF paths found: {len(media_urls)}")

downloaded = 0
failed = 0

for rel_path in sorted(media_urls):
    filename = os.path.basename(rel_path)
    # decode URL encoding in filename
    clean_name = urllib.parse.unquote(filename)
    dest_path = os.path.join(out_dir, clean_name)
    
    if os.path.exists(dest_path) and os.path.getsize(dest_path) > 0:
        downloaded += 1
        continue
        
    # download from https://aquana.ba/wp-content/uploads/...
    # quoted url path
    parts = rel_path.split('/')
    quoted_parts = [urllib.parse.quote(urllib.parse.unquote(p)) for p in parts]
    remote_url = "https://aquana.ba/wp-content/uploads/" + "/".join(quoted_parts)
    
    req = urllib.request.Request(remote_url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
    try:
        with urllib.request.urlopen(req, timeout=12) as resp:
            content = resp.read()
            if len(content) > 500:
                with open(dest_path, 'wb') as out_f:
                    out_f.write(content)
                downloaded += 1
                print(f"[OK] {clean_name} ({len(content)} bytes)")
            else:
                failed += 1
    except Exception as e:
        # print error but continue
        print(f"[FAIL] {clean_name}: {e}")
        failed += 1

print(f"\nDone! Downloaded/Existing: {downloaded}, Failed: {failed}")
