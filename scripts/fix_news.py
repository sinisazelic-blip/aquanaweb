import os
os.chdir(r"D:\Dev\AquanaWEB")

with open("src/components/NewsSection.tsx", "r", encoding="utf-8") as f:
    c = f.read()

c = c.replace("{currentLang === 'cir' ? '{t(\"Aktuelnosti i saopštenja\")}' : currentLang === 'en' ? 'LATEST NEWS & UPDATES' : 'AKTUELNOSTI I SAOPŠTENJA'}", '{t("AKTUELNOSTI I SAOPŠTENJA")}')
c = c.replace("{currentLang === 'cir' ? 'Вијести из Акване и ГОБ-а' : currentLang === 'en' ? 'News from Aquana & GOB' : '{t(\"Vijesti iz Akvane i GOB-a\")}'}", '{t("Vijesti iz Akvane i GOB-a")}')
c = c.replace('<span className="hidden md:inline">Zvanični Facebook</span>', '<span className="hidden md:inline">{t("Zvanični Facebook")}</span>')
c = c.replace('{item.excerpt}', '{t(item.excerpt)}')
c = c.replace('<span className="text-[11px] text-slate-400 font-medium">JP Aquana</span>', '<span className="text-[11px] text-slate-400 font-medium">{t("JP Aquana")}</span>')

with open("src/components/NewsSection.tsx", "w", encoding="utf-8") as f:
    f.write(c)

print("NewsSection.tsx fully updated!")
