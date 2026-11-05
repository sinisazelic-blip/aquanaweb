path = 'D:/Dev/AquanaWEB/src/components/InteractiveSchedule.tsx'
with open(path, 'r', encoding='utf-8') as f:
    c = f.read()

# Replace any dirty slot strings
import re
c = re.sub(r'06:00 [–-] 08:00h[^\"]*', '06:00 – 08:00h (Jutarnji termin)', c)
c = re.sub(r'08:00 [–-] 10:00h[^\"]*', '08:00 – 10:00h (Prijepodnevni termin)', c)
c = re.sub(r'12:00 [–-] 14:00h[^\"]*', '12:00 – 14:00h (Dnevni termin)', c)

with open(path, 'w', encoding='utf-8') as f:
    f.write(c)

print('SLOTS_CLEANED')
