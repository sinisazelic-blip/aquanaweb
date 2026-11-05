with open('D:/Dev/AquanaWEB/src/app/admin/page.tsx', 'r', encoding='utf-8') as f:
    text = f.read()

pos = text.find('bg-sky-50 text-sky-900 border-sky-300')
print(text[pos:pos+2500])
