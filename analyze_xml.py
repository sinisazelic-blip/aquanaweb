import re
from collections import Counter

xml_file = r'd:\Dev\AquanaWEB\desavanjaaquanac_7.xml'

post_types = Counter()
post_statuses = Counter()
categories = set()

# Let's parse XML or read with regex
import xml.etree.ElementTree as ET

print("Analyzing XML export...")
try:
    tree = ET.parse(xml_file)
    root = tree.getroot()
    channel = root.find('channel')
    
    # namespaces
    ns = {
        'wp': 'http://wordpress.org/export/1.2/',
        'content': 'http://purl.org/rss/1.0/modules/content/'
    }
    
    items = channel.findall('item')
    print(f"Total items in XML: {len(items)}")
    
    for item in items:
        pt = item.find('wp:post_type', ns)
        ps = item.find('wp:status', ns)
        pt_val = pt.text if pt is not None else 'unknown'
        ps_val = ps.text if ps is not None else 'unknown'
        
        post_types[pt_val] += 1
        post_statuses[ps_val] += 1
        
        for cat in item.findall('category'):
            if cat.text:
                categories.add(cat.text)
                
    print("\nPost Types:")
    for pt, count in post_types.most_common():
        print(f"  {pt}: {count}")
        
    print("\nPost Statuses:")
    for ps, count in post_statuses.most_common():
        print(f"  {ps}: {count}")
        
    print(f"\nTotal unique categories: {len(categories)}")
    for c in sorted(categories)[:30]:
        print(f"  - {c}")
    if len(categories) > 30:
        print(f"  ... and {len(categories)-30} more")

except Exception as e:
    print("XML parse error:", e)
