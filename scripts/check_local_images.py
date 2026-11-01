from PIL import Image, ImageStat
import os

images = [
    'GOB-1.jpg', 'GOB-2.jpg', 'GOB-10.jpg', 'GOB-11.jpg', 'GOB-12.jpg',
    'GOB-14.jpg', 'GOB-18.jpg', 'GOB-20.jpg', 'Plivacki-Meeting-1.jpg',
    'Plivacki-Meeting-10.jpg', 'aquana-slider.png', 'rodjendan-1.jpg', 'rodjendan-10.jpg'
]

for f in images:
    path = os.path.join('D:/Dev/AquanaWEB/public/images', f)
    if os.path.exists(path):
        with Image.open(path) as im:
            stat = ImageStat.Stat(im)
            b = sum(stat.mean) / 3
            print(f"{f}: brightness={b:.1f}, rgb={[round(x,1) for x in stat.mean]}")
