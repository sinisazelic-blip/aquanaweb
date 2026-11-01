import urllib.request
import re
import os

out_dir = r'd:\Dev\AquanaWEB\public\images'
os.makedirs(out_dir, exist_ok=True)
headers = {'User-Agent': 'Mozilla/5.0'}

req = urllib.request.Request('https://aquana.ba', headers=headers)
try:
    with urllib.request.urlopen(req, timeout=12) as resp:
        html = resp.read().decode('utf-8', errors='ignore')
except Exception as e:
    html = ""
    print("Fetch error:", e)

# extract all img src
urls = set(re.findall(r'src=["\'](https?://[^"\'\s<>]+\.(?:png|jpg|jpeg|webp))["\']', html, re.I))

# add slider photos
slider_urls = [
    'https://aquana.ba/wp-content/uploads/2024/09/ACO_1870-1.jpg',
    'https://aquana.ba/wp-content/uploads/2024/09/ACO_1879.jpg',
    'https://aquana.ba/wp-content/uploads/2024/09/ACO_1911-1.jpg',
    'https://aquana.ba/wp-content/uploads/2024/09/1.jpg',
    'https://aquana.ba/wp-content/uploads/2024/09/2.jpg',
    'https://aquana.ba/wp-content/uploads/2024/09/3.jpg',
    'https://aquana.ba/wp-content/uploads/2024/09/4.jpg',
    'https://aquana.ba/wp-content/uploads/2024/09/5.jpg',
    'https://aquana.ba/wp-content/uploads/2024/09/6.jpg',
    'https://aquana.ba/wp-content/uploads/2024/08/aquana-slider.png',
]
urls.update(slider_urls)

for u in sorted(urls):
    fn = os.path.basename(u.split('?')[0])
    dest = os.path.join(out_dir, fn)
    try:
        with urllib.request.urlopen(urllib.request.Request(u, headers=headers), timeout=10) as r:
            with open(dest, 'wb') as f:
                f.write(r.read())
            print('[OK]', fn)
    except Exception as e:
        print('[FAIL]', fn, e)

print('Done!')
