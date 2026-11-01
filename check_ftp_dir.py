import ftplib

ftp = ftplib.FTP('91.234.46.76')
ftp.login('deploy@desavanja-aquana.com', 'Aquana01+')
print("Current dir:", ftp.pwd())
lines = []
ftp.dir(lines.append)
for l in lines:
    print(l)

# Let's try to see if we can go to public_html or if we are already in public_html
try:
    ftp.cwd('wp-content')
    print("Successfully entered wp-content!")
    ftp.cwd('..')
except Exception as e:
    print("Cannot cd wp-content:", e)

try:
    ftp.cwd('..')
    print("Parent dir:", ftp.pwd())
    lines2 = []
    ftp.dir(lines2.append)
    for l in lines2:
        print(l)
except Exception as e:
    print("Cannot cd ..:", e)

ftp.quit()
