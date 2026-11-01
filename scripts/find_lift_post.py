with open(r'd:\Dev\AquanaWEB\desavanjaaquanac_7.sql', 'r', encoding='utf-8', errors='ignore') as f:
    for line in f:
        if 'mobilni lift za osobe sa invaliditetom' in line.lower() or 'мобилни лифт' in line.lower():
            print("LINE LEN:", len(line))
            import re
            print("TITLE/URLS:", re.findall(r'http[^\s\"\'<>]+', line)[:10])
            break
