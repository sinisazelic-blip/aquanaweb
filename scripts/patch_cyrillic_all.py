# -*- coding: utf-8 -*-
import sys

print("=== Starting comprehensive Cyrillic & SZZP updates ===")

# --- 1. InteractiveSchedule.tsx ---
sched_path = "src/components/InteractiveSchedule.tsx"
with open(sched_path, "r", encoding="utf-8") as f:
    sched = f.read()

if "import { Lang, tr }" not in sched:
    sched = sched.replace('import { Lang }', 'import { Lang, tr }')

sched_map = [
    ("(Jutarnji termin)", "({tr('Jutarnji termin', currentLang)})"),
    ("(Prijepodnevni termin)", "({tr('Prijepodnevni termin', currentLang)})"),
    ("(Dnevni termin)", "({tr('Dnevni termin', currentLang)})"),
    ("(Popodnevni termin)", "({tr('Popodnevni termin', currentLang)})"),
    ("(Večernji termin)", "({tr('Večernji termin', currentLang)})"),
    ("KLUPSKI TERMIN", "{tr('KLUPSKI TERMIN', currentLang)}"),
    ("SLOBODNO: 10/10 STAZA", "{tr('SLOBODNO: 10/10 STAZA', currentLang)}"),
    ("Sve staze zauzete trenažnim procesom klubova", "{tr('Sve staze zauzete trenažnim procesom klubova', currentLang)}"),
    ("Dostupno 10 slobodnih staza za građane i rekreativce", "{tr('Dostupno 10 slobodnih staza za građane i rekreativce', currentLang)}"),
    ('lane.occupant || "GRAĐANSTVO"', 'tr(lane.occupant || "GRAĐANSTVO", currentLang)'),
    ('lane.purpose || "Rekreacija"', 'tr(lane.purpose || "Rekreacija", currentLang)'),
    ('lane.purpose || "Javni interes"', 'tr(lane.purpose || "Javni interes", currentLang)'),
    ('"Komercijalno"', 'tr("Komercijalno", currentLang)'),
    ('"Zauzeto"', 'tr("Zauzeto", currentLang)'),
    ('"Slobodno"', 'tr("Slobodno", currentLang)'),
    ('Zeleno: Slobodne staze za rekreativno plivanje građana', '{tr("Zeleno: Slobodne staze za rekreativno plivanje građana", currentLang)}'),
    ('Pregledaj cijene ulaznica', '{tr("Pregledaj cijene ulaznica", currentLang)}'),
]

for old, new in sched_map:
    sched = sched.replace(old, new)

with open(sched_path, "w", encoding="utf-8") as f:
    f.write(sched)
print("[OK] InteractiveSchedule.tsx updated")

# --- 2. KidsContestBanner.tsx ---
kids_path = "src/components/KidsContestBanner.tsx"
with open(kids_path, "r", encoding="utf-8") as f:
    kids = f.read()

if "import { Lang, tr }" not in kids:
    kids = 'import { Lang, tr } from "@/lib/translations";\n' + kids

if "interface KidsContestBannerProps" not in kids:
    kids = kids.replace(
        "export default function KidsContestBanner() {",
        "interface KidsContestBannerProps {\n  currentLang?: Lang;\n}\n\nexport default function KidsContestBanner({ currentLang = 'lat' }: KidsContestBannerProps) {\n  const txt = (s: string) => tr(s, currentLang);"
    )

kids_map = [
    ("DJECIJI LIKOVNI KUTAK", '{txt("DJECIJI LIKOVNI KUTAK")}'),
    ("Dječiji likovni konkurs: „Moje ljeto na Aquani i GOB-u“", '{txt("Dječiji likovni konkurs: „Moje ljeto na Aquani i GOB-u“")}'),
    ("Pošaljite crtež vašeg mališana i osvojite porodične sezonske ulaznice!", '{txt("Pošaljite crtež vašeg mališana i osvojite porodične sezonske ulaznice!")}'),
    ("POGLEDAJ SVE PRISTIGLE RADOVE I GLASAJ", '{txt("POGLEDAJ SVE PRISTIGLE RADOVE I GLASAJ")}'),
    ("IME I UZRAST DJETETA", '{txt("IME I UZRAST DJETETA")}'),
    ("BROJ TELEFONA RODITELJA", '{txt("BROJ TELEFONA RODITELJA")}'),
    ("FOTOGRAFIJA CRTEŽA (JPG / PNG)", '{txt("FOTOGRAFIJA CRTEŽA (JPG / PNG)")}'),
    ("POŠALJI CRTEŽ NA KONKURS", '{txt("POŠALJI CRTEŽ NA KONKURS")}'),
    ("Klikni za odabir fotografije crteža sa telefona ili računara", '{txt("Klikni za odabir fotografije crteža sa telefona ili računara")}'),
]

for old, new in kids_map:
    kids = kids.replace(old, new)

with open(kids_path, "w", encoding="utf-8") as f:
    f.write(kids)
print("[OK] KidsContestBanner.tsx updated")

# --- 3. VisitorCommentsSection.tsx ---
vis_path = "src/components/VisitorCommentsSection.tsx"
with open(vis_path, "r", encoding="utf-8") as f:
    vis = f.read()

if "import { Lang, tr }" not in vis:
    vis = 'import { Lang, tr } from "@/lib/translations";\n' + vis

if "interface VisitorCommentsSectionProps" not in vis:
    vis = vis.replace(
        "export default function VisitorCommentsSection() {",
        "interface VisitorCommentsSectionProps {\n  currentLang?: Lang;\n}\n\nexport default function VisitorCommentsSection({ currentLang = 'lat' }: VisitorCommentsSectionProps) {\n  const txt = (s: string) => tr(s, currentLang);"
    )

vis_map = [
    ("GLAS POSJETILACA & UTISCI", '{txt("GLAS POSJETILACA & UTISCI")}'),
    ("Iskustva, prijedlozi i komentari posjetilaca", '{txt("Iskustva, prijedlozi i komentari posjetilaca")}'),
    ("Transparentan prostor za vaše utiske i zapažanja", '{txt("Transparentan prostor za vaše utiske i zapažanja")}'),
    ("OSTAVI SVOJ KOMENTAR ILI PRIJEDLOG", '{txt("OSTAVI SVOJ KOMENTAR ILI PRIJEDLOG")}'),
    ("PRIKAŽI SVE KOMENTARE", '{txt("PRIKAŽI SVE KOMENTARE")}'),
    ("IME ILI NADIMAK", '{txt("IME ILI NADIMAK")}'),
    ("KATEGORIJA UTISKA", '{txt("KATEGORIJA UTISKA")}'),
    ("VAŠ KOMENTAR ILI PRIJEDLOG", '{txt("VAŠ KOMENTAR ILI PRIJEDLOG")}'),
    ("POŠALJI KOMENTAR", '{txt("POŠALJI KOMENTAR")}'),
]

for old, new in vis_map:
    vis = vis.replace(old, new)

with open(vis_path, "w", encoding="utf-8") as f:
    f.write(vis)
print("[OK] VisitorCommentsSection.tsx updated")

# --- 4. FlashPromoAction.tsx ---
flash_path = "src/components/FlashPromoAction.tsx"
with open(flash_path, "r", encoding="utf-8") as f:
    flash = f.read()

flash_map = [
    ("FLASH AKCIJA: 50 ULAZAKA + 5 KAFA", "{t('FLASH AKCIJA: 50 ULAZAKA + 5 KAFA')}"),
    ("BRZOPRSTICA: VATERPOLO KARTA (3/5 PREOSTALO)", "{t('BRZOPRSTICA: VATERPOLO KARTA (3/5 PREOSTALO)')}"),
    ("Caffe Bar GOB & Recepcija", "{t('Caffe Bar GOB & Recepcija')}"),
    ("50 ULAZA + 5 KAFA", "{t('50 ULAZA + 5 KAFA')}"),
    ("AKCIJA ISTIČE ZA:", "{t('AKCIJA ISTIČE ZA:')}"),
    ("REZERVIŠI KUPON ODMAH", "{t('REZERVIŠI KUPON ODMAH')}"),
    ("IGRAJ „UHVATI RIBICU“", "{t('IGRAJ „UHVATI RIBICU“')}"),
    ("DANAŠNJI ZEC IZ ŠEŠIRA", "{t('DANAŠNJI ZEC IZ ŠEŠIRA')}"),
]

for old, new in flash_map:
    flash = flash.replace(old, new)

with open(flash_path, "w", encoding="utf-8") as f:
    f.write(flash)
print("[OK] FlashPromoAction.tsx updated")

# --- 5. Footer.tsx ---
footer_path = "src/components/Footer.tsx"
with open(footer_path, "r", encoding="utf-8") as f:
    footer = f.read()

if "Zaštita ličnih podataka (SZZP)" not in footer:
    footer = footer.replace(
        '<span>{txt("Zvanični dokumenti")}</span>\n                </Link>',
        '<span>{txt("Zvanični dokumenti")}</span>\n                </Link>\n              </li>\n              <li>\n                <Link href="/dokumenti" className="hover:text-cyan-400 transition flex items-center gap-1.5">\n                  <span>{txt("Zaštita ličnih podataka (SZZP)")}</span>\n                </Link>'
    )

with open(footer_path, "w", encoding="utf-8") as f:
    f.write(footer)
print("[OK] Footer.tsx updated")

print("=== All updates completed successfully! ===")
