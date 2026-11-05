with open('D:/Dev/AquanaWEB/src/app/admin/page.tsx', 'r', encoding='utf-8') as f:
    text = f.read()

idx = 0
while True:
    pos = text.find('reception', idx)
    if pos == -1: break
    print(f'Match at {pos}:', repr(text[max(0, pos-40):pos+60]))
    idx = pos + 1
