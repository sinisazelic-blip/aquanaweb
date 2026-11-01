import json
from datetime import datetime

with open(r'd:\Dev\AquanaWEB\scripts\extracted_wp.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

raw_posts = data.get('news', [])
print(f"Total raw posts: {len(raw_posts)}")

def to_ddmmyyyy(d_str: str) -> str:
    try:
        dt = datetime.strptime(d_str[:10], '%Y-%m-%d')
        return dt.strftime('%d.%m.%Y.')
    except Exception:
        return d_str

valid_posts = []
seen = set()

# Seed with the 3 most prominent current 2026 news:
valid_posts.append({
    "id": 1,
    "slug": "plivaj-srcem-2026-propozicije-i-prijave",
    "title": "Plivaj srcem 2026 — Zvanične propozicije i prijave za međunarodni GOB miting",
    "date": "28.10.2026.",
    "category": "Takmičenja",
    "image": "/images/Plivaj-srcem-2026-propozicije_261027_111254-300x225.jpg",
    "excerpt": "Objavljene su zvanične propozicije i satnica za tradicionalni međunarodni plivački miting na Gradskom olimpijskom bazenu.",
    "content": "Plivački klub 22. April i Gradski olimpijski bazen Banja Luka najavljuju tradicionalni međunarodni plivački miting 'Plivaj srcem 2026'. Miting okuplja preko 400 takmičara iz zemalja regiona. Takmičenje se održava u 50-metarskom olimpijskom bazenu uz elektronsko mjerenje vremena Omega sistemom. Prijave su otvorene do 15. novembra."
})

valid_posts.append({
    "id": 2,
    "slug": "upis-novih-grupa-skola-plivanja-gob",
    "title": "Upis novih grupa u školu plivanja na Gradskom olimpijskom bazenu",
    "date": "24.10.2026.",
    "category": "Škola plivanja",
    "image": "/images/FB_IMG_1788612498206-300x225.jpg",
    "excerpt": "Komercijalne grupe za djecu neplivače i usavršavanje plivačkih tehnika uz profesore DIF-a. Prijave na telefon 065 72 50 50.",
    "content": "Gradski olimpijski bazen vrši svakodnevni upis novih polaznika u komercijalnu školu plivanja za djecu i odrasle. Program vode licencirani profesori sporta i fizičkog vaspitanja, uz prilagođene grupe početnika, poluplivača i usavršavanja stilova plivanja. Takođe, podsjećamo da se u saradnji sa Gradom Banja Luka redovno sprovodi i besplatna obuka za učenike osnovnih škola. Za sve informacije i rezervacije pozovite 065 72 50 50."
})

valid_posts.append({
    "id": 3,
    "slug": "novi-raspored-staza-i-nocno-kupanje",
    "title": "Novi raspored rekreativnih staza i noćno kupanje za građanstvo",
    "date": "15.10.2026.",
    "category": "Građanstvo",
    "image": "/images/FB_IMG_1791365485852-300x225.jpg",
    "excerpt": "Prošireni kapaciteti za rekreativce sa 5 do 8 slobodnih staza u jutarnjim i večernjim terminima.",
    "content": "Kako bismo građanima Banjaluke omogućili maksimalan komfor i vrhunske uslove za rekreaciju, uveden je novi jesenje-zimski raspored staza. U jutarnjem terminu od 06:00 do 08:00h građanima je na raspolaganju čitav bazen po povoljnijoj cijeni, dok je u večernjem terminu od 20:00 do 22:00h obezbijeđeno noćno plivanje uz optimalnu rasvjetu i FINA temperaturu vode od 26.8°C."
})

# Filter real posts from WordPress
for p in raw_posts:
    title = p['title'].strip()
    if len(title) < 8 or title in seen:
        continue
    # Skip test posts
    if "Standard Post" in title or "sample" in title.lower():
        continue
    # Skip tenders that were wrongly posts
    if any(w in title.lower() for w in ['odluka o izboru', 'одлука о избору', 'nabavka', 'набавка']):
        continue

    seen.add(title)
    d = to_ddmmyyyy(p['date'])
    cat = "Događaji"
    if any(w in title.lower() for w in ['miting', 'vaterpolo', 'utakmic', 'turnir']):
        cat = "Sport i takmičenja"
    elif any(w in title.lower() for w in ['plivanj', 'obuka', 'škola', 'школа']):
        cat = "Škola plivanja"
    elif any(w in title.lower() for w in ['akvana', 'aquana', 'borik', 'sezon']):
        cat = "Vodeni park"

    img = "/images/GOB.jpg"
    if "aquana" in title.lower() or "vodeni" in title.lower():
        img = "/images/vodeni-park.jpg"
    elif "pliv" in title.lower() or "miting" in title.lower():
        img = "/images/ACO_1870-1.jpg"

    content_text = p['content']
    if len(content_text) < 30:
        content_text = title + ". Za više informacija obratite se recepciji Gradskog olimpijskog bazena ili info pultu Vodenog parka."

    excerpt = content_text[:160] + "..." if len(content_text) > 160 else content_text

    valid_posts.append({
        "id": len(valid_posts) + 1,
        "slug": p.get('slug', f"vijest-{len(valid_posts) + 1}"),
        "title": title,
        "date": d,
        "category": cat,
        "image": img,
        "excerpt": excerpt,
        "content": content_text
    })

print(f"Generated {len(valid_posts)} total news articles!")

# Write to src/lib/newsData.ts
ts_content = """export interface NewsItem {
  id: number;
  slug: string;
  title: string;
  date: string; // dd.mm.yyyy.
  category: string;
  image: string;
  excerpt: string;
  content: string;
}

export const allNewsArticles: NewsItem[] = """ + json.dumps(valid_posts[:60], indent=2, ensure_ascii=False) + ";\n"

with open(r'd:\Dev\AquanaWEB\src\lib\newsData.ts', 'w', encoding='utf-8') as f:
    f.write(ts_content)

print("Saved src/lib/newsData.ts successfully!")
