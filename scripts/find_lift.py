import re

with open(r'd:\Dev\AquanaWEB\desavanjaaquanac_7.sql', 'r', encoding='utf-8', errors='ignore') as f:
    for line in f:
        if 'mobilni-lift' in line or 'invaliditet' in line:
            imgs = re.findall(r'https?://[^\s\"\'<>]+\.(?:jpg|png|jpeg)', line)
            if imgs:
                print("FOUND IMGS:", imgs)
