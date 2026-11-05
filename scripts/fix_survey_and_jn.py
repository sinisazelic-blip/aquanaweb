import os, re

# ==========================================
# 1. SurveyModal.tsx
# ==========================================
path_survey = "D:/Dev/AquanaWEB/src/components/SurveyModal.tsx"
if os.path.exists(path_survey):
    with open(path_survey, "r", encoding="utf-8") as f:
        s = f.read()
    
    if "useLanguage" not in s:
        s = s.replace(
            'import { Lang } from "@/lib/translations";',
            'import { Lang, tr } from "@/lib/translations";\nimport { useLanguage } from "@/context/LanguageContext";'
        )
        s = s.replace(
            'interface SurveyModalProps {\n  isOpen: boolean;\n  onClose: () => void;\n  currentLang: Lang;\n}',
            'interface SurveyModalProps {\n  isOpen: boolean;\n  onClose: () => void;\n  currentLang?: Lang;\n}'
        )
        s = s.replace(
            'export default function SurveyModal({ isOpen, onClose, currentLang }: SurveyModalProps) {',
            'export default function SurveyModal({ isOpen, onClose, currentLang: propLang }: SurveyModalProps) {\n  const langCtx = useLanguage();\n  const currentLang = propLang || langCtx.currentLang;\n  const txt = (str: string) => tr(str, currentLang);'
        )
    
    survey_repls = [
        ('UČESTALOST VAŠIH POSJETA:', '{txt("UČESTALOST VAŠIH POSJETA:")}'),
        ('Nekoliko puta mjesečno', '{txt("Nekoliko puta mjesečno")}'),
        ('Svakodnevno / Više puta sedmično', '{txt("Svakodnevno / Više puta sedmično")}'),
        ('Nekoliko puta godišnje', '{txt("Nekoliko puta godišnje")}'),
        ('Prvi put sam ovdje', '{txt("Prvi put sam ovdje")}'),
        ('OCJENE KVALITETA (1 – 5 ZVJEZDICA):', '{txt("OCJENE KVALITETA (1 – 5 ZVJEZDICA):")}'),
        ('Čistoća prostora, tuševa i svlačionica', '{txt("Čistoća prostora, tuševa i svlačionica")}'),
        ('Bistrina i hemijsko-biološki kvalitet vode', '{txt("Bistrina i hemijsko-biološki kvalitet vode")}'),
        ('Temperatura vode (26.8°C) i vazduha', '{txt("Temperatura vode (26.8°C) i vazduha")}'),
        ('Ljubaznost i profesionalnost osoblja', '{txt("Ljubaznost i profesionalnost osoblja")}'),
        ('Dostupnost termina za građanstvo', '{txt("Dostupnost termina za građanstvo")}'),
        ('VAŠA PORUKA, PRIJEDLOG ILI SUGESTIJA:', '{txt("VAŠA PORUKA, PRIJEDLOG ILI SUGESTIJA:")}'),
        ('Napišite šta bismo mogli još bolje uraditi...', '{txt("Napišite šta bismo mogli još bolje uraditi...")}'),
        ('KONTAKT TELEFON ILI E-MAIL (OPCIONO):', '{txt("KONTAKT TELEFON ILI E-MAIL (OPCIONO):")}'),
        ('POŠALJI ODGOVORE U BAZU', '{txt("POŠALJI ODGOVORE U BAZU")}'),
        ('Hvala vam na učešću u anketi!', '{txt("Hvala vam na učešću u anketi!")}'),
        ('Vaši odgovori i ocjene su uspješno zabilježeni.', '{txt("Vaši odgovori i ocjene su uspješno zabilježeni.")}')
    ]
    for o, n in survey_repls:
        if o in s and f'txt("{o}")' not in s:
            s = s.replace(o, n)
            
    with open(path_survey, "w", encoding="utf-8") as f:
        f.write(s)
    print("Fixed SurveyModal.tsx")

# ==========================================
# 2. javne-nabavke/page.tsx
# ==========================================
path_jn = "D:/Dev/AquanaWEB/src/app/javne-nabavke/page.tsx"
if os.path.exists(path_jn):
    with open(path_jn, "r", encoding="utf-8") as f:
        jn = f.read()
    
    if "useLanguage" not in jn:
        jn = jn.replace(
            'import Link from "next/link";',
            'import Link from "next/link";\nimport { useLanguage } from "@/context/LanguageContext";\nimport { tr } from "@/lib/translations";'
        )
        jn = jn.replace(
            'export default function JavneNabavkePage() {',
            'export default function JavneNabavkePage() {\n  const { currentLang } = useLanguage();\n  const txt = (s: string) => tr(s, currentLang);'
        )
    
    jn_repls = [
        ('NAZAD NA PORTAL', '{txt("NAZAD NA PORTAL")}'),
        ('Registar javnih nabavki i akata', '{txt("Registar javnih nabavki i akata")}'),
        ('Zakon o javnim nabavkama BiH', '{txt("Zakon o javnim nabavkama BiH")}'),
        ('Ažurirano:', '{txt("Ažurirano:")}'),
        ('JP „AQUANA“ d.o.o. Banja Luka • Službena zakonska evidencija', '{txt("JP „AQUANA“ d.o.o. Banja Luka • Službena zakonska evidencija")}'),
        ('placeholder="Pretraži po nazivu, predmetu ili datumu..."', 'placeholder={txt("Pretraži po nazivu, predmetu ili datumu...")}'),
        ('GODINA:', '{txt("GODINA:")}'),
        ('STATUS:', '{txt("STATUS:")}'),
        ('Sve godine', '{txt("Sve godine")}'),
        ('Svi statusi', '{txt("Svi statusi")}'),
        ('Prikazano:', '{txt("Prikazano:")}'),
        ('dokumenata', '{txt("dokumenata")}'),
        ('Klikom na PDF preuzimate zvaničnu dokumentaciju', '{txt("Klikom na PDF preuzimate zvaničnu dokumentaciju")}'),
        ('PREDMET NABAVKE / NAZIV AKTA', '{txt("PREDMET NABAVKE / NAZIV AKTA")}'),
        ('DATUM OBJAVE', '{txt("DATUM OBJAVE")}'),
        ('STATUS POSTUPKA', '{txt("STATUS POSTUPKA")}'),
        ('DOKUMENT', '{txt("DOKUMENT")}'),
        ('Preuzmi PDF', '{txt("Preuzmi PDF")}'),
        ('Dodijeljen ugovor', '{txt("Dodijeljen ugovor")}'),
        ('U toku', '{txt("U toku")}'),
        ('Poništeno', '{txt("Poništeno")}'),
        ('Nema pronađenih javnih nabavki za zadate kriterijume.', '{txt("Nema pronađenih javnih nabavki za zadate kriterijume.")}')
    ]
    for o, n in jn_repls:
        if o in jn and f'txt("{o}")' not in jn and f'placeholder={n}' not in jn:
            jn = jn.replace(o, n)
            
    # Also translate table items title & status: {item.title} -> {txt(item.title)}
    jn = jn.replace('{item.title}', '{txt(item.title)}')
    jn = jn.replace('{item.status}', '{txt(item.status)}')
    
    with open(path_jn, "w", encoding="utf-8") as f:
        f.write(jn)
    print("Fixed javne-nabavke/page.tsx")

