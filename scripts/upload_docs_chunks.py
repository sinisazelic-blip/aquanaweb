import os
import zipfile
import urllib.request

docs_dir = r"D:\Dev\AquanaWEB\public\dokumenti"
all_files = [f for f in os.listdir(docs_dir) if os.path.isfile(os.path.join(docs_dir, f))]
print(f"Total documents to upload: {len(all_files)}")

# Divide files into 3 chunks
chunk_size = (len(all_files) + 2) // 3
chunks = [all_files[i:i + chunk_size] for i in range(0, len(all_files), chunk_size)]

for idx, chunk in enumerate(chunks, 1):
    zip_filename = f"docs_chunk_{idx}.zip"
    zip_path = os.path.join(r"D:\Dev\AquanaWEB", zip_filename)
    
    with zipfile.ZipFile(zip_path, "w", zipfile.ZIP_DEFLATED, compresslevel=6) as z:
        for f in chunk:
            full = os.path.join(docs_dir, f)
            # archive path under dokumenti/
            arcname = os.path.join("dokumenti", f)
            z.write(full, arcname)
            
    size_mb = os.path.getsize(zip_path) / (1024 * 1024)
    print(f"Chunk {idx}: {len(chunk)} files, {size_mb:.2f} MB -> uploading...")
    
    boundary = "----WebKitFormBoundary7MA4YWxkTrZu0gW"
    with open(zip_path, "rb") as zf:
        data = zf.read()
        
    part1 = (
        f"--{boundary}\r\n"
        f'Content-Disposition: form-data; name="token"\r\n\r\n'
        f"aquana_secure_deploy_2026_blip_99\r\n"
        f"--{boundary}\r\n"
        f'Content-Disposition: form-data; name="package"; filename="{zip_filename}"\r\n'
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
        with urllib.request.urlopen(req, timeout=90) as resp:
            print(f"Chunk {idx} Success! Response:", resp.read().decode("utf-8"))
    except Exception as e:
        print(f"Chunk {idx} Error:", e)
        
print("All chunks processed!")
