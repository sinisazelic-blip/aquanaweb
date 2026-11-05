import os, re

base = "D:/Dev/AquanaWEB"

# --- 1. Header.tsx ---
p_hdr = os.path.join(base, "src/components/Header.tsx")
with open(p_hdr, "r", encoding="utf-8") as f:
    h = f.read()
if "useLanguage" not in h:
    h = h.replace(
        'import { Lang, translations, saveLang } from "@/lib/translations";',
        'import { Lang, translations, saveLang } from "@/lib/translations";\nimport { useLanguage } from "@/context/LanguageContext";'
    )
    h = h.replace(
        'export default function Header({ currentLang, setLang, onOpenSurvey, onOpenContact, searchQuery, setSearchQuery }: HeaderProps) {',
        'export default function Header({ currentLang: propLang, setLang: propSetLang, onOpenSurvey, onOpenContact, searchQuery, setSearchQuery }: Partial<HeaderProps>) {\n  const langCtx = useLanguage();\n  const currentLang = propLang || langCtx.currentLang;\n  const setLang = propSetLang || langCtx.setLang;'
    )
    h = h.replace(
        '  const handleLanguageChange = (lang: Lang) => {\n    setLang(lang);\n    saveLang(lang);\n  };',
        '  const handleLanguageChange = (lang: Lang) => {\n    langCtx.setLang(lang);\n    if (propSetLang) propSetLang(lang);\n    saveLang(lang);\n  };'
    )
    with open(p_hdr, "w", encoding="utf-8") as f:
        f.write(h)

# --- 2. Footer.tsx ---
p_ftr = os.path.join(base, "src/components/Footer.tsx")
with open(p_ftr, "r", encoding="utf-8") as f:
    ft = f.read()
if "useLanguage" not in ft:
    ft = ft.replace(
        'import { Lang, translations } from "@/lib/translations";',
        'import { Lang, translations, tr } from "@/lib/translations";\nimport { useLanguage } from "@/context/LanguageContext";'
    )
    ft = ft.replace(
        'export default function Footer({ currentLang }: FooterProps) {',
        'export default function Footer({ currentLang: propLang }: { currentLang?: Lang }) {\n  const langCtx = useLanguage();\n  const currentLang = propLang || langCtx.currentLang;\n  const txt = (s: string) => tr(s, currentLang);'
    )
for o in [
    'LOKACIJE', 'KONTAKT I INFO', 'ZVANIČNI DOKUMENTI',
    'Veljka Mlađenovića b.b, Banja Luka', 'Obezbijeđen besplatan parking za korisnike',
    'Aleja Svetog Save 80, Banja Luka', 'Uprava / Centrala:', 'Recepcija GOB:',
    'Obuka neplivača:', '06:00 – 22:00h (Svaki dan)',
    'Objekat u javnom vlasništvu Grada Banja Luka (Upravlja JP „Aquana“)',
    'JP „AQUANA“ d.o.o. Banja Luka', 'Gradski olimpijski bazen (GOB)', 'Vodeni park Aquana'
]:
    if o in ft and f'txt("{o}")' not in ft:
        ft = ft.replace(o, f'{{txt("{o}")}}')
with open(p_ftr, "w", encoding="utf-8") as f:
    f.write(ft)

# --- 3. Subpage generic hook ---
def hook_subpage(rel_path):
    p = os.path.join(base, rel_path)
    if not os.path.exists(p): return
    with open(p, "r", encoding="utf-8") as f:
        c = f.read()
    if "useLanguage" not in c:
        c = c.replace('import Link from "next/link";', 'import Link from "next/link";\nimport { useLanguage } from "@/context/LanguageContext";\nimport { tr } from "@/lib/translations";')
        c = re.sub(r'const\s+\[currentLang,\s*setCurrentLang\]\s*=\s*useState<any>\("lat"\);', 'const { currentLang, setLang } = useLanguage();\n  const txt = (s: string) => tr(s, currentLang);', c)
        with open(p, "w", encoding="utf-8") as f:
            f.write(c)

hook_subpage("src/app/cjenovnik/page.tsx")
hook_subpage("src/app/gob/page.tsx")
hook_subpage("src/app/vodeni-park/page.tsx")

# --- 4. Subpage content translation ---
# cjenovnik
p_c = os.path.join(base, "src/app/cjenovnik/page.tsx")
with open(p_c, "r", encoding="utf-8") as f:
    c = f.read()
for s in [
    'Cjenovnik usluga i ulaznica',
    'Transparentan prikaz svih tarifa za Gradski olimpijski bazen i Vodeni park Aquana. Sve cijene su izražene u KM sa uračunatim PDV-om.',
    'Preuzmi ovjeren PDF cjenovnik', 'GRADSKI OLIMPIJSKI BAZEN (GOB)', 'VODENI PARK AQUANA (LJETNA SEZONA)',
    'Informacije o radnom vremenu:',
    'ODLUKA GRADONAČELNIKA GRADA BANJA LUKA',
    'Zvanični cjenovnik usluga GOB-a propisan od strane Grada Banja Luka',
    'POGLEDAJ POTPISANI CJENOVNIK (PDF)', 'PREUZMI',
    'USLUGA / KATEGORIJA ULAZNICE', 'VRIJEME / USLOV', 'CIJENA (SA PDV)'
]:
    if s in c and f'txt("{s}")' not in c:
        c = c.replace(s, f'{{txt("{s}")}}')
c = c.replace('{item.title}', '{txt(item.title)}')
c = c.replace('{item.note}', '{txt(item.note)}')
c = c.replace('{item.time}', '{txt(item.time)}')
with open(p_c, "w", encoding="utf-8") as f:
    f.write(c)

# gob
p_g = os.path.join(base, "src/app/gob/page.tsx")
with open(p_g, "r", encoding="utf-8") as f:
    g = f.read()
for s in [
    'Gradski olimpijski bazen (GOB)',
    'Zvanični cjenovnik GOB-a', 'Obuka neplivača: 065 72 50 50',
    'Tehničke specifikacije objekta', 'FINA OLIMPIJSKI STANDARD • BANJA LUKA',
    'ZVANIČNI SPORTSKI CENTAR', 'Veliki olimpijski bazen', 'Mali bazen za obuku',
    'Mjerenje vremena', 'Gledalište & Tribine'
]:
    if s in g and f'txt("{s}")' not in g:
        g = g.replace(s, f'{{txt("{s}")}}')
with open(p_g, "w", encoding="utf-8") as f:
    f.write(g)

# vodeni-park
p_v = os.path.join(base, "src/app/vodeni-park/page.tsx")
with open(p_v, "r", encoding="utf-8") as f:
    v = f.read()
for s in [
    'Vodeni park Aquana', 'Sezonski cjenovnik 2026', 'Zvanični dokumenti',
    'Sadržaji vodenog parka', 'Vodeni tobogan', 'Ukupno 1.500 m² vode',
    'Zelene površine & Hlad', 'Spasioci', 'Licencirana bezbjednost'
]:
    if s in v and f'txt("{s}")' not in v:
        v = v.replace(s, f'{{txt("{s}")}}')
with open(p_v, "w", encoding="utf-8") as f:
    f.write(v)

# javne-nabavke
p_j = os.path.join(base, "src/app/javne-nabavke/page.tsx")
with open(p_j, "r", encoding="utf-8") as f:
    j = f.read()
for o in [
    '<span>Nazad na portal</span>', '<span>Registar javnih nabavki i akata</span>',
    'Zakon o javnim nabavkama BiH', 'placeholder="Pretraži po nazivu, predmetu ili datumu..."',
    'Prikazano:', 'Klikom na PDF preuzimate zvaničnu dokumentaciju',
    '<span>Preuzmi PDF</span>', '<span>Arhiva</span>'
]:
    clean_o = o.replace('<span>', '').replace('</span>', '')
    if o in j:
        if '<span>' in o:
            j = j.replace(o, f'<span>{{txt("{clean_o}")}}</span>')
        elif 'placeholder' in o:
            j = j.replace(o, f'placeholder={{txt("Pretraži po nazivu, predmetu ili datumu...")}}')
        else:
            j = j.replace(o, f'{{txt("{o}")}}')
j = j.replace('{item.title}', '{txt(item.title)}')
j = j.replace('{item.status}', '{txt(item.status)}')
with open(p_j, "w", encoding="utf-8") as f:
    f.write(j)

# VisitorCommentsSection
p_vc = os.path.join(base, "src/components/VisitorCommentsSection.tsx")
with open(p_vc, "r", encoding="utf-8") as f:
    vc = f.read()
if "useLanguage" not in vc:
    vc = vc.replace('import { Lang, tr } from "@/lib/translations";', 'import { Lang, tr } from "@/lib/translations";\nimport { useLanguage } from "@/context/LanguageContext";')
    vc = vc.replace("export default function VisitorCommentsSection({ currentLang = 'lat' }: VisitorCommentsSectionProps) {\n  const txt = (s: string) => tr(s, currentLang);", "export default function VisitorCommentsSection({ currentLang: propLang }: VisitorCommentsSectionProps) {\n  const langCtx = useLanguage();\n  const currentLang = propLang || langCtx.currentLang;\n  const txt = (s: string) => tr(s, currentLang);")
for o in [
    'Zid utisaka & Prijedlozi građana',
    'Vaše mišljenje nam je dragocjeno. Ovdje možete ostaviti pohvalu, prijedlog ili skrenuti pažnju upravi na stvari koje možemo poboljšati.',
    'OSTAVI SVOJ UTISAK ILI PRIJEDLOG', 'Verifikovan posjetilac'
]:
    if o in vc and f'txt("{o}")' not in vc:
        vc = vc.replace(o, f'{{txt("{o}")}}')
vc = vc.replace('c.category === "pohvala" ? "POHVALA" : "PRIJEDLOG"', 'c.category === "pohvala" ? txt("POHVALA") : txt("PRIJEDLOG")')
vc = vc.replace('{c.author}', '{txt(c.author)}')
vc = vc.replace('„{c.comment}“', '„{txt(c.comment)}“')
with open(p_vc, "w", encoding="utf-8") as f:
    f.write(vc)

print("MASTER_PATCH_COMPLETED_SUCCESSFULLY")
