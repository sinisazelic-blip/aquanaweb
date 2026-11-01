sql_file = r'd:\Dev\AquanaWEB\desavanjaaquanac_7.sql'

tables_inserted = set()
with open(sql_file, 'r', encoding='utf-8', errors='ignore') as f:
    for line in f:
        idx = line.find('INSERT INTO')
        if idx != -1:
            snippet = line[idx:idx+80]
            parts = snippet.split('`')
            if len(parts) > 1:
                tables_inserted.add(parts[1])

print(f"Total tables with INSERT: {len(tables_inserted)}")
for t in sorted(tables_inserted):
    print(" -", t)
