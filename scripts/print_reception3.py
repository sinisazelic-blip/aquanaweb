with open('D:/Dev/AquanaWEB/src/app/admin/page.tsx', 'r', encoding='utf-8') as f:
    text = f.read()

pos = text.find('receptionSearch', text.find('{activeTab === "reception" && ('))
print(text[pos-200:pos+2500])
