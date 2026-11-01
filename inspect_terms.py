sql_file = r'd:\Dev\AquanaWEB\desavanjaaquanac_7.sql'

import re

# Let's inspect wpou_terms
terms = {}
with open(sql_file, 'r', encoding='utf-8', errors='ignore') as f:
    for line in f:
        if 'INSERT INTO `wpou_terms`' in line:
            # Format: INSERT INTO `wpou_terms` (`term_id`, `name`, `slug`, `term_group`) VALUES ...
            vals = line[line.find('VALUES')+6:].strip()
            # extract tuples
            matches = re.findall(r"\((\d+),\s*'([^']*)',\s*'([^']*)',\s*(\d+)\)", vals)
            for m in matches:
                terms[m[0]] = (m[1], m[2])

print(f"Total Categories/Terms: {len(terms)}")
for tid, (name, slug) in sorted(terms.items(), key=lambda x: int(x[0])):
    print(f"  [{tid}] {name} ({slug})")
