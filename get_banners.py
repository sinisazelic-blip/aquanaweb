import urllib.request, re, os

req = urllib.request.Request('https://aquana.ba', headers={'User-Agent': 'Mozilla/5.0'})
with urllib.request.urlopen(req, timeout=10) as r:
    html = r.read().decode('utf-8', errors='ignore')

# look for all images in uploads/202*
imgs = re.findall(r'https?://aquana\.ba/wp-content/uploads/[^\s"\'<>]+\.(?:jpg|png|jpeg|webp)', html, re.I)
print("All uploads on homepage:")
for i in set(imgs):
    fn = os.path.basename(i)
    print(" -", fn)
    dest = os.path.join(r'd:\Dev\AquanaWEB\public\images', fn)
    if not os.path.exists(dest):
        try:
            with urllib.request.urlopen(i, timeout=8) as br:
                with open(dest, 'wb') as out:
                    out.write(br.read())
            print("  [SAVED]", fn)
        except Exception as e:
            print("  [FAIL]", fn, e)
