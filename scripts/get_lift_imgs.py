import urllib.request
import re
import os

url = "https://aquana.ba/?p=6670"
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
try:
    html = urllib.request.urlopen(req, timeout=10).read().decode('utf-8')
    # Find images
    imgs = set(re.findall(r'https://aquana\.ba/wp-content/uploads/[^\s\"\'<>]+\.(?:jpg|png|jpeg)', html))
    print(f"Found {len(imgs)} images:")
    for img in sorted(imgs):
        print(img)
        fname = os.path.basename(img)
        dest = os.path.join(r"d:\Dev\AquanaWEB\public\images", fname)
        if not os.path.exists(dest):
            try:
                urllib.request.urlretrieve(img, dest)
                print("Downloaded:", fname)
            except Exception as e:
                print("Failed:", e)
except Exception as e:
    print("Error:", e)
