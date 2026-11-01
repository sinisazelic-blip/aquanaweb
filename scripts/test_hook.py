import urllib.request
import zipfile
import io

zip_buffer = io.BytesIO()
with zipfile.ZipFile(zip_buffer, 'w') as z:
    z.writestr('test_cicd.txt', 'CI/CD automation is WORKING 100%!')

data = zip_buffer.getvalue()
boundary = '----WebKitFormBoundary7MA4YWxkTrZu0gW'
body = (
    f'--{boundary}\r\n'
    f'Content-Disposition: form-data; name="token"\r\n\r\n'
    f'aquana_secure_deploy_2026_blip_99\r\n'
    f'--{boundary}\r\n'
    f'Content-Disposition: form-data; name="package"; filename="test_cicd.zip"\r\n'
    f'Content-Type: application/zip\r\n\r\n'
).encode('utf-8') + data + f'\r\n--{boundary}--\r\n'.encode('utf-8')

req = urllib.request.Request(
    'http://desavanja-aquana.com/api-deploy-hook.php',
    data=body,
    headers={'Content-Type': f'multipart/form-data; boundary={boundary}'}
)
try:
    with urllib.request.urlopen(req) as resp:
        print("Status:", resp.status)
        print("Body:", resp.read().decode())
except Exception as e:
    print("Error:", e)
