import os
import re

dir_path = r"D:\Dev\AquanaWEB\public\dokumenti"
tenders_path = r"D:\Dev\AquanaWEB\src\lib\tendersData.ts"

cyr_to_lat = {
    "А":"A", "Б":"B", "В":"V", "Г":"G", "Д":"D", "Ђ":"Dj", "Е":"E", "Ж":"Z", "З":"Z", "И":"I",
    "Ј":"J", "К":"K", "Л":"L", "Љ":"Lj", "М":"M", "Н":"N", "Њ":"Nj", "О":"O", "П":"P", "Р":"R",
    "С":"S", "Т":"T", "Ћ":"C", "У":"U", "Ф":"F", "Х":"H", "Ц":"C", "Ч":"C", "Џ":"Dz", "Ш":"S",
    "а":"a", "б":"b", "в":"v", "г":"g", "д":"d", "ђ":"dj", "е":"e", "ж":"z", "з":"z", "и":"i",
    "ј":"j", "к":"k", "л":"l", "љ":"lj", "м":"m", "н":"n", "њ":"nj", "о":"o", "п":"p", "р":"r",
    "с":"s", "т":"t", "ћ":"c", "у":"u", "ф":"f", "х":"h", "ц":"c", "ч":"c", "џ":"dz", "ш":"s"
}

def to_latin(text):
    return "".join(cyr_to_lat.get(c, c) for c in text)

with open(tenders_path, "r", encoding="utf-8") as f:
    tenders_data = f.read()

count = 0
for fname in os.listdir(dir_path):
    if re.search(r"[\u0400-\u04FF]", fname):
        lat_name = to_latin(fname)
        src = os.path.join(dir_path, fname)
        dst = os.path.join(dir_path, lat_name)
        with open(src, "rb") as sf, open(dst, "wb") as df:
            df.write(sf.read())
        tenders_data = tenders_data.replace(f'"{fname}"', f'"{lat_name}"')
        count += 1
        print(f"Mapped: {fname} -> {lat_name}")

with open(tenders_path, "w", encoding="utf-8") as f:
    f.write(tenders_data)

print(f"Total mapped: {count}")
