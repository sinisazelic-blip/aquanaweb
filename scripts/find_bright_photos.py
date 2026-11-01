import os, glob, shutil
from PIL import Image, ImageStat

gob_photos = glob.glob('E:/!! Radni/Aquana/Photo/basti obrađene slike/GOB photo shoot 1/*.jpg')
rodjendan_photos = glob.glob('E:/!! Radni/Aquana/Photo/basti obrađene slike/Rođendan Aquana/*.jpg')
swim_photos = glob.glob('E:/!! Radni/Aquana/Photo/basti obrađene slike/Plivacki meeting Swim Wars/Plivacki meeting Swim Wars/*.jpg')

print("--- TOP BRIGHT GOB PHOTOS ---")
gob_scores = []
for p in gob_photos:
    try:
        with Image.open(p) as im:
            stat = ImageStat.Stat(im)
            brightness = sum(stat.mean) / 3
            gob_scores.append((brightness, p, im.size))
    except Exception as e:
        pass

gob_scores.sort(key=lambda x: x[0], reverse=True)
for b, p, sz in gob_scores[:10]:
    print(f"Bright: {b:.1f} | {os.path.basename(p)} | {sz}")

print("\n--- TOP BRIGHT ROĐENDAN PHOTOS ---")
rodj_scores = []
for p in rodjendan_photos:
    try:
        with Image.open(p) as im:
            stat = ImageStat.Stat(im)
            brightness = sum(stat.mean) / 3
            rodj_scores.append((brightness, p, im.size))
    except Exception as e:
        pass

rodj_scores.sort(key=lambda x: x[0], reverse=True)
for b, p, sz in rodj_scores[:10]:
    print(f"Bright: {b:.1f} | {os.path.basename(p)} | {sz}")
