import re

with open(r'd:\Dev\AquanaWEB\desavanjaaquanac_7.sql', 'r', encoding='utf-8', errors='ignore') as f:
    for line in f:
        if '6670' in line and ('.jpg' in line.lower() or '.png' in line.lower()):
            imgs = re.findall(r'https?://[^\s\"\'<>]+\.(?:jpg|png|jpeg)', line)
            print("ATTACHMENTS FOR 6670:", imgs)
