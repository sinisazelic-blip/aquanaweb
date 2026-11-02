import urllib.request
import os

zip_path = r"D:\Dev\AquanaWEB\deploy-package.zip"
size_mb = os.path.getsize(zip_path) / (1024 * 1024)
print(f"Uploading full package ({size_mb:.2f} MB)...")

boundary = "----WebKitFormBoundary7MA4YWxkTrZu0gW"
with open(zip_path, "rb") as f:
    data = f.read()

part1 = (
    f"--{boundary}\r\n"
    f'Content-Disposition: form-data; name="token"\r\n\r\n'
    f"aquana_secure_deploy_2026_blip_99\r\n"
    f"--{boundary}\r\n"
    f'Content-Disposition: form-data; name="package"; filename="deploy.zip"\r\n'
    f"Content-Type: application/zip\r\n\r\n"
).encode("utf-8")

part2 = f"\r\n--{boundary}--\r\n".encode("utf-8")
body = part1 + data + part2

req = urllib.request.Request(
    "http://desavanja-aquana.com/api-deploy-hook.php",
    data=body,
    headers={"Content-Type": f"multipart/form-data; boundary={boundary}"}
)

try:
    with urllib.request.urlopen(req, timeout=180) as resp:
        print("Success! Response:", resp.read().decode("utf-8"))
except Exception as e:
    print("Upload error:", e)
