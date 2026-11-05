with open('D:/Dev/AquanaWEB/src/app/admin/page.tsx', 'r', encoding='utf-8') as f:
    text = f.read()

pos = text.find('activeTab === "reception"')
print(text[pos:pos+3500])
