import os
import zipfile
import urllib.request

out_dir = r"D:\Dev\AquanaWEB\out"
zip_path = r"D:\Dev\AquanaWEB\deploy-package.zip"

print("Packaging out/...")
with zipfile.ZipFile(zip_path, "w", zipfile.ZIP_DEFLATED, compresslevel=6) as z:
    for root, dirs, files in os.walk(out_dir):
        for f in files:
            full = os.path.join(root, f)
            rel = os.path.relpath(full, out_dir)
            if rel.startswith("dokumenti") and f.endswith(".pdf"):
                continue
            z.write(full, rel)

size_mb = os.path.getsize(zip_path) / (1024 * 1024)
print(f"deploy-package.zip created: {size_mb:.2f} MB -> uploading...")

boundary = "----WebKitFormBoundary7MA4YWxkTrZu0gW"
with open(zip_path, "rb") as zf:
    data = zf.read()

part1 = (
    f"--{boundary}\r\n"
    f'Content-Disposition: form-data; name="token"\r\n\r\n'
    f"aquana_secure_deploy_2026_blip_99\r\n"
    f"--{boundary}\r\n"
    f'Content-Disposition: form-data; name="package"; filename="deploy-package.zip"\r\n'
    f"Content-Type: application/zip\r\n\r\n"
).encode("utf-8")
part2 = f"\r\n--{boundary}--\r\n".encode("utf-8")
body = part1 + data + part2

req = urllib.request.Request(
    "http://desavanja-aquana.com/api-deploy-hook.php",
    data=body,
    headers={"Content-Type": f"multipart/form-data; boundary={boundary}"}
)

with urllib.request.urlopen(req, timeout=90) as resp:
    print("Deploy Response:", resp.read().decode("utf-8"))
