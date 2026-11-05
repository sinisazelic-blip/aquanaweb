import re

with open('src/app/page.tsx', 'r', encoding='utf-8') as f:
    c = f.read()

repls = [
    ('LJETNA SEZONA', '{txt("LJETNA SEZONA")}'),
    ('Otvoreni bazeni i sunčalište Borik', '{txt("Otvoreni bazeni i sunčalište Borik")}'),
    ('CJENOVNIK SEZONSKIH ULAZNICA', '{txt("CJENOVNIK SEZONSKIH ULAZNICA")}'),
    ('ZAKONSKA OBAVEZA BIH', '{txt("ZAKONSKA OBAVEZA BIH")}'),
    ('Javne nabavke i tenderska evidencija', '{txt("Javne nabavke i tenderska evidencija")}'),
    ('SLUŽBENA DOKUMENTACIJA', '{txt("SLUŽBENA DOKUMENTACIJA")}'),
    ('Dokumenti, cjenovnici i nalazi vode', '{txt("Dokumenti, cjenovnici i nalazi vode")}'),
    ('Mobilni lift za lica sa posebnim potrebama', '{txt("Mobilni lift za lica sa posebnim potrebama")}'),
    ('Stroga kontrola vode Instituta', '{txt("Stroga kontrola vode Instituta")}'),
    ('Otvori registar sanitarnih nalaza', '{txt("Otvori registar sanitarnih nalaza")}'),
    ('Teretana, Caffe bar i Parking', '{txt("Teretana, Caffe bar i Parking")}'),
    ('Stvarni raspored i popunjenost bazenskih staza', '{txt("Stvarni raspored i popunjenost bazenskih staza")}'),
    ('DIREKTNA SINHRONIZACIJA SA BAZOM POOL MANAGERA GOB-a', '{txt("DIREKTNA SINHRONIZACIJA SA BAZOM POOL MANAGERA GOB-a")}'),
    ('VELIKI OLIMPIJSKI (50M • 10 STAZA)', '{txt("VELIKI OLIMPIJSKI (50M • 10 STAZA)")}'),
    ('MALI BAZEN (25M • 5 STAZA)', '{txt("MALI BAZEN (25M • 5 STAZA)")}')
]

for o, n in repls:
    if o in c and f'txt("{o}")' not in c:
        c = c.replace(o, n)

with open('src/app/page.tsx', 'w', encoding='utf-8') as f:
    f.write(c)

print('page.tsx strings transliterated successfully!')
