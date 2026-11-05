path = 'D:/Dev/AquanaWEB/src/components/InteractiveSchedule.tsx'
with open(path, 'r', encoding='utf-8') as f:
    c = f.read()

import re
# Fix slot labels
c = re.sub(r'06:00 – 08:00h \(\{tr\([^\)]+\)\}\)', '06:00 – 08:00h (Jutarnji termin)', c)
c = re.sub(r'08:00 – 10:00h \(\{tr\([^\)]+\)\}\)', '08:00 – 10:00h (Prijepodnevni termin)', c)
c = re.sub(r'12:00 – 14:00h \(\{tr\([^\)]+\)\}\)', '12:00 – 14:00h (Dnevni termin)', c)

# Fix subtitle
c = c.replace('t("{tr(\'Sve staze zauzete trenažnim procesom klubova\', currentLang)}")}', 't("Sve staze zauzete trenažnim procesom klubova")}')

# Fix GRAĐANSTVO and Rekreacija
c = c.replace('>GRAĐANSTVO<', '>{t("GRAĐANSTVO")}<')
c = c.replace('>Rekreacija<', '>{t("Rekreacija")}<')

# Fix billing and status
c = c.replace('tr("Komercijalno", currentLang)', '"Komercijalno"')
c = c.replace('tr("Zauzeto", currentLang)', '"Zauzeto"')
c = c.replace('tr("Slobodno", currentLang)', '"Slobodno"')

# Fix slot.label rendering with t()
c = c.replace('{slot.label}', '{t(slot.label)}')

with open(path, 'w', encoding='utf-8') as f:
    f.write(c)

print('SCHEDULE_CLEANED')
