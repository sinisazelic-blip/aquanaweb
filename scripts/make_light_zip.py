import os, zipfile

out_dir = r'D:\Dev\AquanaWEB\out'
zip_path = r'D:\Dev\AquanaWEB\aquana-web-light.zip'

with zipfile.ZipFile(zip_path, 'w', zipfile.ZIP_DEFLATED) as zf:
    for root, dirs, files in os.walk(out_dir):
        # Skip dokumenti folder
        if 'dokumenti' in root.replace('\\', '/').split('/'):
            continue
        for f in files:
            full_p = os.path.join(root, f)
            rel_p = os.path.relpath(full_p, out_dir)
            zf.write(full_p, rel_p)

sz = os.path.getsize(zip_path) / 1024 / 1024
print(f"aquana-web-light.zip created: {sz:.2f} MB")
