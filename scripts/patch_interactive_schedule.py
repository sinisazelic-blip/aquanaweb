# Patch InteractiveSchedule.tsx for Cyrillic
with open("src/components/InteractiveSchedule.tsx", "r", encoding="utf-8") as f:
    content = f.read()

# 1. Import tr
content = content.replace('import { Lang } from "@/lib/translations";', 'import { Lang, tr } from "@/lib/translations";')

# 2. Add t helper and getDayLabel
old_fn = 'export default function InteractiveSchedule({ currentLang }: InteractiveScheduleProps) {'
new_fn = '''export default function InteractiveSchedule({ currentLang }: InteractiveScheduleProps) {
  const t = (s: string) => tr(s, currentLang);
  const getDayName = (d: { lat: string; cir: string; en: string }) => {
    if (currentLang === "cir") return d.cir;
    if (currentLang === "en") return d.en;
    return d.lat;
  };'''
content = content.replace(old_fn, new_fn)

# 3. Replace day label display
content = content.replace('<span>{d.lat}</span>', '<span>{getDayName(d)}</span>')

# 4. Replace badges and headers
content = content.replace('<span>DIREKTNA SINHRONIZACIJA SA BAZOM POOL MANAGERA GOB-a</span>', '<span>{t("DIREKTNA SINHRONIZACIJA SA BAZOM POOL MANAGERA GOB-a")}</span>')
content = content.replace('Stvarni raspored i popunjenost bazenskih staza', '{t("Stvarni raspored i popunjenost bazenskih staza")}')
content = content.replace('Zvanična matrica zauzeća staza za 10 plivačkih i vaterpolo klubova. Prije polaska na bazen provjerite u kojim terminima je slobodno rekreativno plivanje za građanstvo.', '{t("Zvanična matrica zauzeća staza za 10 plivačkih i vaterpolo klubova. Prije polaska na bazen provjerite u kojim terminima je slobodno rekreativno plivanje za građanstvo.")}')

content = content.replace('Veliki olimpijski (50m • 10 staza)', '{t("Veliki olimpijski (50m • 10 staza)")}')
content = content.replace('Mali bazen (25m • 5 staza)', '{t("Mali bazen (25m • 5 staza)")}')

# 5. Slot labels and free lanes
content = content.replace('`Dostupno ${freeLanesCount} slobodnih staza za građane i rekreativce`', 't(`Dostupno ${freeLanesCount} slobodnih staza za građane i rekreativce`)')
content = content.replace('"Sve staze zauzete trenažnim procesom klubova"', 't("Sve staze zauzete trenažnim procesom klubova")')
content = content.replace('`Slobodno: ${freeLanesCount}/${maxLanes} staza`', 't(`Slobodno: ${freeLanesCount}/${maxLanes} staza`)')
content = content.replace('"Klupski termin"', 't("Klupski termin")')

# 6. Lane labels
content = content.replace('<span>GRAĐANSTVO</span>', '<span>{t("GRAĐANSTVO")}</span>')
content = content.replace('<span>Rekreacija</span>', '<span>{t("Rekreacija")}</span>')
content = content.replace('{allocation ? "Zauzeto" : "Slobodno"}', '{t(allocation ? "Zauzeto" : "Slobodno")}')
content = content.replace('{allocation.billing === "JI" ? "Javni interes" : "Komercijalno"}', '{t(allocation.billing === "JI" ? "Javni interes" : "Komercijalno")}')

# 7. Accordion button
content = content.replace('? "▲ Skupi raspored (prikaži samo aktuelne termine)"', '? t("▲ Skupi raspored (prikaži samo aktuelne termine)")')
content = content.replace(': `▼ Prikaži kompletan cjelodnevni raspored za ${dayNames[selectedDay].lat} (još ${timeSlots.length - 2} termina do 22:00h)`}', ': t(`▼ Prikaži kompletan cjelodnevni raspored za ${getDayName(dayNames[selectedDay])} (još ${timeSlots.length - 2} termina do 22:00h)`)}')

# 8. Legend
content = content.replace('<strong>Zeleno:</strong> Slobodne staze za rekreativno plivanje građana', '<strong>{t("Zeleno:")}</strong> {t("Slobodne staze za rekreativno plivanje građana")}')
content = content.replace('<strong>Plavo:</strong> Trenažni termini licenciranih klubova (APK 22. April, PK Olymp, PK Borac...)', '<strong>{t("Plavo:")}</strong> {t("Trenažni termini licenciranih klubova (APK 22. April, PK Olymp, PK Borac...)")}')
content = content.replace('<span>Pregledaj cijene ulaznica</span>', '<span>{t("Pregledaj cijene ulaznica")}</span>')

with open("src/components/InteractiveSchedule.tsx", "w", encoding="utf-8") as f:
    f.write(content)

print("InteractiveSchedule.tsx patched successfully!")
