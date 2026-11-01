with open(r'd:\Dev\AquanaWEB\desavanjaaquanac_7.sql', 'r', encoding='utf-8', errors='ignore') as f:
    for line in f:
        if 'brojac' in line.lower() or 'radar' in line.lower():
            if 'vodeni' in line.lower() or 'kupa' in line.lower() or 'plivac' in line.lower():
                print("LINE:", line[:300])
