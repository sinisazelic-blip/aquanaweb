import urllib.request
import re
import os

url = "https://aquana.ba/gradski-olimpijski-bazen-u-banjaluci-dobio-mobilni-lift-za-osobe-sa-invaliditetom/"
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
try:
    html = urllib.request.urlopen(req, timeout=10).read().decode('utf-8')
    # Find all gallery items
    links = re.findall(r'href=[\'\"](https://aquana\.ba/wp-content/uploads/2026/07/FB_IMG_[^\'\"]+\.jpg)[\'\"]', html)
    print("Found links:", len(links))
    for i, l in enumerate(links):
        print(f"pid={i+1}: {l}")
        # Download pid=3 specifically
        if i + 1 == 3 or "pid=3" in str(i+1):
            dest = r"d:\Dev\AquanaWEB\public\images\mobilni-lift-akcija.jpg"
            urllib.request.urlretrieve(l, dest)
            print(f"DOWNLOADED pid={i+1} as mobilni-lift-akcija.jpg: {l}")
except Exception as e:
    print("Error:", e)
