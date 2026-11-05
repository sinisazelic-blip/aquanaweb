import os
os.chdir(r"D:\Dev\AquanaWEB")

with open("src/app/page.tsx", "r", encoding="utf-8") as f:
    c = f.read()

# Import tr
c = c.replace('import { Lang, translations, getSavedLang, saveLang, toCyrillic } from "@/lib/translations";', 'import { Lang, translations, getSavedLang, saveLang, toCyrillic, tr } from "@/lib/translations";')

# Add txt helper
if 'const txt = (s: string) => tr(s, currentLang);' not in c:
    c = c.replace('const t = translations[currentLang];', 'const t = translations[currentLang];\n  const txt = (s: string) => tr(s, currentLang);')

replacements = [
    # Obuka neplivaca
    ('PRIJEM I UPIS NOVIH POLAZNIKA TOKOM ČITAVE GODINE', '{txt("PRIJEM I UPIS NOVIH POLAZNIKA TOKOM ČITAVE GODINE")}'),
    ('Obuka neplivača na Gradskom olimpijskom bazenu', '{txt("Obuka neplivača na Gradskom olimpijskom bazenu")}'),
    ('Komercijalni kursevi za djecu i odrasle • Besplatna obuka za banjalučke osnovce (pokrovitelj Grad Banja Luka)', '{txt("Komercijalni kursevi za djecu i odrasle • Besplatna obuka za banjalučke osnovce (pokrovitelj Grad Banja Luka)")}'),
    ('<span>Prijave: 065 72 50 50</span>', '<span>{txt("Prijave: 065 72 50 50")}</span>'),
    ('Cjenovnik obuke', '{txt("Cjenovnik obuke")}'),
    
    # 3 value pillars
    ('Društvena odgovornost i jednakost', '{txt("Društvena odgovornost i jednakost")}'),
    ('Mobilni lift za lica sa posebnim potrebama', '{txt("Mobilni lift za lica sa posebnim potrebama")}'),
    ('Gradski olimpijski bazen opremljen je specijalizovanom rampom i hidrauličnim liftom koji osobe sa invaliditetom direktno iz invalidskih kolica spušta u vodu i vraća nazad. Pristup objektu je u potpunosti prilagođen.', '{txt("Gradski olimpijski bazen opremljen je specijalizovanom rampom i hidrauličnim liftom koji osobe sa invaliditetom direktno iz invalidskih kolica spušta u vodu i vraća nazad. Pristup objektu je u potpunosti prilagođen.")}'),
    ('Zdravstveni standard i sigurnost', '{txt("Zdravstveni standard i sigurnost")}'),
    ('Stroga kontrola vode Instituta', '{txt("Stroga kontrola vode Instituta")}'),
    ('Institut za javno zdravstvo Republike Srpske redovno vrši mikrobiološku i fizičko-hemijsku analizu vode i kontrolu filter stanice. Svi nalazi su javni i transparentno dostupni na uvid građanima.', '{txt("Institut za javno zdravstvo Republike Srpske redovno vrši mikrobiološku i fizičko-hemijsku analizu vode i kontrolu filter stanice. Svi nalazi su javni i transparentno dostupni na uvid građanima.")}'),
    ('<span>Otvori registar sanitarnih nalaza</span>', '<span>{txt("Otvori registar sanitarnih nalaza")}</span>'),
    ('Sadržaji u sklopu GOB-a', '{txt("Sadržaji u sklopu GOB-a")}'),
    ('Teretana, Caffe bar i Parking', '{txt("Teretana, Caffe bar i Parking")}'),
    ('<span><strong>Moderna teretana:</strong> Vrhunski fitness centar u sklopu objekta (zakupac).</span>', '<span><strong>{txt("Moderna teretana:")}</strong> {txt("Vrhunski fitness centar u sklopu objekta (zakupac).")}</span>'),
    ('<span><strong>Besplatan parking:</strong> Obezbijeđen za sve korisnike bazena.</span>', '<span><strong>{txt("Besplatan parking:")}</strong> {txt("Obezbijeđen za sve korisnike bazena.")}</span>'),
    ('<span><strong>Caffe bar:</strong> Ugodan ambijent u holu bazena za roditelje i posjetioce.</span>', '<span><strong>{txt("Caffe bar:")}</strong> {txt("Ugodan ambijent u holu bazena za roditelje i posjetioce.")}</span>'),

    # GOB pillar
    ('Olimpijski bazen', '{txt("Olimpijski bazen")}'),
    ('50 × 25 metara • FINA Standard', '{txt("50 × 25 metara • FINA Standard")}'),
    ('Banja Luka • Veljka Mlađenovića b.b.', '{txt("Banja Luka • Veljka Mlađenovića b.b.")}'),
    ('Jedan od najmodernijih vodenih kompleksa u Evropi. Izgrađen po standardima Svjetske plivačke federacije (FINA), otvoren svakog dana za građane, plivačke i vaterpolo klubove, te takmičenja najvišeg međunarodnog nivoa.', '{txt("Jedan od najmodernijih vodenih kompleksa u Evropi. Izgrađen po standardima Svjetske plivačke federacije (FINA), otvoren svakog dana za građane, plivačke i vaterpolo klubove, te takmičenja najvišeg međunarodnog nivoa.")}'),
    ('<strong className="text-sm text-slate-900 block">Rekreacija za građanstvo</strong>', '<strong className="text-sm text-slate-900 block">{txt("Rekreacija za građanstvo")}</strong>'),
    ('<span className="text-xs text-slate-500">Svaki dan od 06:00 do 22:00h (vikendom od 07:00h).</span>', '<span className="text-xs text-slate-500">{txt("Svaki dan od 06:00 do 22:00h (vikendom od 07:00h).")}</span>'),
    ('<strong className="text-sm text-slate-900 block">Škola plivanja za djecu i odrasle</strong>', '<strong className="text-sm text-slate-900 block">{txt("Škola plivanja za djecu i odrasle")}</strong>'),
    ('<span className="text-xs text-slate-500">Stručni rad sa profesorima sporta i licenciranim trenerima.</span>', '<span className="text-xs text-slate-500">{txt("Stručni rad sa profesorima sporta i licenciranim trenerima.")}</span>'),
    ('<strong className="text-sm text-slate-900 block">Dostupnost i inkluzija</strong>', '<strong className="text-sm text-slate-900 block">{txt("Dostupnost i inkluzija")}</strong>'),
    ('<span className="text-xs text-slate-500">Mobilni hidraulični lift za spuštanje osoba sa invaliditetom u vodu.</span>', '<span className="text-xs text-slate-500">{txt("Mobilni hidraulični lift za spuštanje osoba sa invaliditetom u vodu.")}</span>'),
    ('<span>Provjeri cjenovnik i termine</span>', '<span>{txt("Provjeri cjenovnik i termine")}</span>'),

    # Vodeni park pillar
    ('Naselje Borik • Aleja Svetog Save 80', '{txt("Naselje Borik • Aleja Svetog Save 80")}'),
    ('Najveća ljetna vodena atrakcija Banjaluke. Prostire se na 38.000 m² uređenih zelenih površina sa prirodnim hladom, tri velika otvorena bazena ukupne vodene površine 1.500 m², toboganom dužine 100 metara, sunčalištem i ljetnim manifestacijama na otvorenom.', '{txt("Najveća ljetna vodena atrakcija Banjaluke. Prostire se na 38.000 m² uređenih zelenih površina sa prirodnim hladom, tri velika otvorena bazena ukupne vodene površine 1.500 m², toboganom dužine 100 metara, sunčalištem i ljetnim manifestacijama na otvorenom.")}'),
    ('<p className="text-[11px] text-slate-500 font-medium">Zeleni park</p>', '<p className="text-[11px] text-slate-500 font-medium">{txt("Zeleni park")}</p>'),
    ('<p className="text-[11px] text-slate-500 font-medium">Vodeni tobogan</p>', '<p className="text-[11px] text-slate-500 font-medium">{txt("Vodeni tobogan")}</p>'),
    ('<p className="text-[11px] text-slate-500 font-medium">Vodeni sadržaji</p>', '<p className="text-[11px] text-slate-500 font-medium">{txt("Vodeni sadržaji")}</p>'),
    ('<span>Cjenovnik sezonskih ulaznica</span>', '<span>{txt("Cjenovnik sezonskih ulaznica")}</span>'),
]

for o, n in replacements:
    if o in c:
        c = c.replace(o, n)
    else:
        print(f"WARN: not found in page.tsx: {o[:40]}")

with open("src/app/page.tsx", "w", encoding="utf-8") as f:
    f.write(c)

print("page.tsx Cyrillic transliteration applied successfully!")
