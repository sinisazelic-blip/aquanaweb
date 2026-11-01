import re

sql_file = r'd:\Dev\AquanaWEB\desavanjaaquanac_7.sql'

terms = {}
in_terms = False

with open(sql_file, 'r', encoding='utf-8', errors='ignore') as f:
    for line in f:
        if 'INSERT INTO `wpou_terms`' in line:
            in_terms = True
            continue
        if in_terms:
            # line looks like: (1, 'Uncategorized', 'uncategorized', 0),
            m = re.search(r"\((\d+),\s*'((?:\\'|[^'])*)',\s*'((?:\\'|[^'])*)',\s*(\d+)\)", line)
            if m:
                terms[m.group(1)] = (m.group(2).encode('utf-8').decode('unicode_escape', errors='ignore'), m.group(3))
            if line.strip().endswith(';'):
                in_terms = False

print(f"Total Terms: {len(terms)}")
for tid, (name, slug) in sorted(terms.items(), key=lambda x: int(x[0])):
    print(f"  [{tid}] {name} (slug: {slug})")
