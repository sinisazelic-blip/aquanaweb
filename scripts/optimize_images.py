import os, glob
from PIL import Image

folder = r'D:\Dev\AquanaWEB\public\images'
for f in os.listdir(folder):
    if f.lower().endswith(('.jpg', '.jpeg', '.png')) and not f.startswith('.'):
        path = os.path.join(folder, f)
        sz = os.path.getsize(path)
        if sz > 1_000_000: # larger than 1MB
            print(f"Optimizing {f} ({sz / 1024 / 1024:.1f} MB)...")
            try:
                with Image.open(path) as img:
                    # Convert RGBA to RGB if saving as JPEG
                    if img.mode in ('RGBA', 'P') and f.lower().endswith(('.jpg', '.jpeg')):
                        img = img.convert('RGB')
                    
                    # Resize if width > 2000
                    w, h = img.size
                    if w > 2000:
                        new_h = int(h * (2000 / w))
                        img = img.resize((2000, new_h), Image.Resampling.LANCZOS)
                    
                    if f.lower().endswith('.png'):
                        img.save(path, optimize=True)
                    else:
                        img.save(path, 'JPEG', quality=85, optimize=True)
                new_sz = os.path.getsize(path)
                print(f" -> Done: {new_sz / 1024:.1f} KB")
            except Exception as e:
                print(f" -> Error {f}: {e}")
