import re
import os

sql_file = r'd:\Dev\AquanaWEB\desavanjaaquanac_7.sql'
tables = []
with open(sql_file, 'r', encoding='utf-8', errors='ignore') as f:
    for line in f:
        m = re.match(r'CREATE TABLE\s+[`"]?(\w+)[`"]?', line, re.IGNORECASE)
        if m:
            tables.append(m.group(1))

print(f"Total tables: {len(tables)}")
for t in sorted(tables):
    print(" -", t)
