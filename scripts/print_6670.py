with open(r'd:\Dev\AquanaWEB\desavanjaaquanac_7.sql', 'r', encoding='utf-8', errors='ignore') as f:
    for line in f:
        if '(6670,' in line:
            print("FOUND 6670:")
            print(line[:1000])
            break
