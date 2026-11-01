with open(r'D:\Dev\AquanaWEB\src\lib\translations.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace cir nav
cir_old = '''    nav: {
      gob: "Градски базен (ГОБ)",
      aquana: "Водени парк",
      tenders: "Јавне набавке",
      documents: "Документи",
      survey: "Анкета грађана",
      contact: "Контакт",
      portal: "Aquana Портал",
      b2b: "B2B Клубови",
    },'''

cir_new = '''    nav: {
      gob: "Градски базен (ГОБ)",
      aquana: "Водени парк",
      pricing: "Цјеновник",
      news: "Вијести",
      documents: "Документи и налази",
      tenders: "Јавне набавке",
      survey: "Анкета грађана",
      contact: "Контакт",
      portal: "Aquana Портал",
      b2b: "B2B / Клубови",
    },'''

lat_old = '''    nav: {
      gob: "Gradski bazen (GOB)",
      aquana: "Vodeni park",
      tenders: "Javne nabavke",
      documents: "Dokumenti",
      survey: "Anketa građana",
      contact: "Kontakt",
      portal: "Aquana Portal",
      b2b: "B2B Klubovi",
    },'''

lat_new = '''    nav: {
      gob: "Gradski bazen (GOB)",
      aquana: "Vodeni park",
      pricing: "Cjenovnik",
      news: "Vijesti",
      documents: "Dokumenti i nalazi",
      tenders: "Javne nabavke",
      survey: "Anketa građana",
      contact: "Kontakt",
      portal: "Aquana Portal",
      b2b: "B2B / Klubovi",
    },'''

en_old = '''    nav: {
      gob: "Olympic Pool (GOB)",
      aquana: "Water Park",
      tenders: "Public Tenders",
      documents: "Documents",
      survey: "Citizen Survey",
      contact: "Contact",
      portal: "Aquana Portal",
      b2b: "B2B Clubs",
    },'''

en_new = '''    nav: {
      gob: "City Olympic Pool (GOB)",
      aquana: "Water Park",
      pricing: "Price List",
      news: "News & Media",
      documents: "Official Documents",
      tenders: "Public Tenders",
      survey: "Citizens Survey",
      contact: "Contact",
      portal: "Aquana Portal",
      b2b: "B2B / Clubs",
    },'''

# Normalize newlines
content = content.replace('\r\n', '\n')
cir_old = cir_old.replace('\r\n', '\n')
cir_new = cir_new.replace('\r\n', '\n')
lat_old = lat_old.replace('\r\n', '\n')
lat_new = lat_new.replace('\r\n', '\n')
en_old = en_old.replace('\r\n', '\n')
en_new = en_new.replace('\r\n', '\n')

content = content.replace(cir_old, cir_new).replace(lat_old, lat_new).replace(en_old, en_new)

with open(r'D:\Dev\AquanaWEB\src\lib\translations.ts', 'w', encoding='utf-8') as f:
    f.write(content)

print("translations.ts updated successfully!")
