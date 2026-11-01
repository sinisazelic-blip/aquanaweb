import ftplib

host = 'desavanja-aquana.com'
passwords = ['Aquana01+']
users = ['deploy@desavanja-aquana.com', 'deploy']

success = False
for u in users:
    for p in passwords:
        try:
            print(f"Trying FTP {u}@{host} ...")
            ftp = ftplib.FTP(timeout=10)
            ftp.connect(host, 21)
            ftp.login(u, p)
            print(f"[SUCCESS] Logged in as {u}")
            print("Current dir:", ftp.pwd())
            lines = []
            ftp.dir(lines.append)
            print("Files count:", len(lines))
            for l in lines[:10]:
                print(" ", l)
            ftp.quit()
            success = True
            break
        except Exception as e:
            print(f"[FAIL] {u}: {e}")
    if success:
        break
