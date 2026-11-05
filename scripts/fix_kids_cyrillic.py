import re

path = "D:/Dev/AquanaWEB/src/components/KidsContestBanner.tsx"
with open(path, "r", encoding="utf-8") as f:
    c = f.read()

repls = [
    ('<span>DJEČIJI KREATIVNI KUTAK • NAGRADNI KONKURS</span>', '<span>{txt("DJEČIJI KREATIVNI KUTAK • NAGRADNI KONKURS")}</span>'),
    ('„Nacrtaj Aquanu ili GOB“ — Osvoji paket od 10 besplatnih ulazaka!', '{txt("„Nacrtaj Aquanu ili GOB“ — Osvoji paket od 10 besplatnih ulazaka!")}'),
    ('Pozivamo sve mališane i osnovce da nacrtaju svoj omiljeni trenutak sa Gradskog olimpijskog bazena ili Vodenog parka. Najljepši crtež mjeseca osvaja', '{txt("Pozivamo sve mališane i osnovce da nacrtaju svoj omiljeni trenutak sa Gradskog olimpijskog bazena ili Vodenog parka. Najljepši crtež mjeseca osvaja")}'),
    ('sezonsku kartu od 10 ulaza', '{txt("sezonsku kartu od 10 ulaza")}'),
    ('a svi radovi se izlažu u holu bazena!', '{txt("a svi radovi se izlažu u holu bazena!")}'),
    ('<span>Pogledaj radove i glasaj (Galerija radova)</span>', '<span>{txt("Pogledaj radove i glasaj (Galerija radova)")}</span>'),
    ('pristiglih radova', '{txt("pristiglih radova")}'),
    ('glasova', '{txt("glasova")}'),
    ('<span>POŠALJI CRTEŽ ONLINE</span>', '<span>{txt("POŠALJI CRTEŽ ONLINE")}</span>'),
    ('Rok: do 30.11.2026.', '{txt("Rok: do 30.11.2026.")}'),
    ('Crtež je uspješno poslat!', '{txt("Crtež je uspješno poslat!")}'),
    ('Hvala vam! Crtež je zabilježen u bazi JP Aquana i biće izložen u galeriji nakon pregleda administratora.', '{txt("Hvala vam! Crtež je zabilježen u bazi JP Aquana i biće izložen u galeriji nakon pregleda administratora.")}'),
    ('Pošalji još jedan rad', '{txt("Pošalji još jedan rad")}'),
    ('Ime i prezime djeteta:', '{txt("Ime i prezime djeteta:")}'),
    ('Uzrast (godine):', '{txt("Uzrast (godine):")}'),
    ('Telefon roditelja:', '{txt("Telefon roditelja:")}'),
    ('Naziv crteža:', '{txt("Naziv crteža:")}'),
    ('Fotografija ili sken crteža', '{txt("Fotografija ili sken crteža")}'),
    ('Ili donesite original na recepciju GOB-a', '{txt("Ili donesite original na recepciju GOB-a")}'),
    ('PRIJAVI RAD NA KONKURS', '{txt("PRIJAVI RAD NA KONKURS")}'),
    ('Galerija pristiglih dječijih crteža', '{txt("Galerija pristiglih dječijih crteža")}'),
    ('Pregledajte pristigle crteže i kliknite na srce ❤️ da podržite svoje favorite!', '{txt("Pregledajte pristigle crteže i kliknite na srce ❤️ da podržite svoje favorite!")}'),
    ('Svi pristigli radovi', '{txt("Svi pristigli radovi")}'),
    ('Najviše glasova', '{txt("Najviše glasova")}'),
    ('Glasano', '{txt("Glasano")}'),
    ('Glasaj', '{txt("Glasaj")}'),
    ('Zatvori', '{txt("Zatvori")}'),
]

for o, n in repls:
    if o in c and f'txt("{o}")' not in c:
        c = c.replace(o, n)

with open(path, "w", encoding="utf-8") as f:
    f.write(c)

print("KidsContestBanner fully transliterated!")
