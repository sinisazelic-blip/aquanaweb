import os
os.chdir(r"D:\Dev\AquanaWEB")

def patch_file(path, replacements):
    with open(path, 'r', encoding='utf-8') as f:
        c = f.read()
    for o, n in replacements:
        if o in c:
            c = c.replace(o, n)
        else:
            print(f"WARN: not found in {path}: {o[:40]}")
    with open(path, 'w', encoding='utf-8') as f:
        f.write(c)
    print(f"Done: {path}")

# 1. SocialStream
patch_file('src/components/SocialStream.tsx', [
    ('import { Lang } from "@/lib/translations";', 'import { Lang, tr } from "@/lib/translations";'),
    ('export default function SocialStream({ currentLang }: SocialStreamProps) {', 'export default function SocialStream({ currentLang }: SocialStreamProps) {\n  const t = (s: string) => tr(s, currentLang);'),
    ('<span>DRUŠTVENE MREŽE UŽIVO</span>', '<span>{t("DRUŠTVENE MREŽE UŽIVO")}</span>'),
    ('Pratite puls bazena na mrežama', '{t("Pratite puls bazena na mrežama")}'),
    ('Direktne objave, atmosferu sa takmičenja i najnovije fotografije pratite na našim zvaničnim profilima.', '{t("Direktne objave, atmosferu sa takmičenja i najnovije fotografije pratite na našim zvaničnim profilima.")}'),
    ('<span>Facebook stranica</span>', '<span>{t("Facebook stranica")}</span>'),
    ('<span>Instagram profil</span>', '<span>{t("Instagram profil")}</span>'),
    ('{post.time}', '{t(post.time)}'),
    ('{post.text}', '{t(post.text)}'),
    ('<span>Pogledaj na mreži</span>', '<span>{t("Pogledaj na mreži")}</span>'),
])

# 2. NewsSection
patch_file('src/components/NewsSection.tsx', [
    ('import { Lang } from "@/lib/translations";', 'import { Lang, tr } from "@/lib/translations";'),
    ('export default function NewsSection({ currentLang }: NewsSectionProps) {', 'export default function NewsSection({ currentLang }: NewsSectionProps) {\n  const t = (s: string) => tr(s, currentLang);'),
    ('АКТУЕЛНОСТИ И САОПШТЕЊА', '{t("Aktuelnosti i saopštenja")}'),
    ('Vijesti iz Akvane i GOB-a', '{t("Vijesti iz Akvane i GOB-a")}'),
    ('<span>Sve vijesti i arhiva</span>', '<span>{t("Sve vijesti i arhiva")}</span>'),
    ('<span>Zvanični Facebook</span>', '<span>{t("Zvanični Facebook")}</span>'),
    ('<span>Pročitaj više</span>', '<span>{t("Pročitaj više")}</span>'),
    ('{item.title}', '{t(item.title)}'),
    ('{item.summary}', '{t(item.summary)}'),
    ('{item.category}', '{t(item.category)}'),
])
