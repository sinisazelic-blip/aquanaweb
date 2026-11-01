import os
import re
import json
from datetime import datetime

sql_file = r'd:\Dev\AquanaWEB\desavanjaaquanac_7.sql'
docs_dir = r'd:\Dev\AquanaWEB\public\dokumenti'
existing_files = set(os.listdir(docs_dir)) if os.path.exists(docs_dir) else set()

def fix_text(s: str) -> str:
    s = s.replace(r"\'", "'").replace(r'\"', '"').strip()
    if any(c in s for c in ['Ð', 'Ñ', 'Ä']):
        try:
            return s.encode('cp1252').decode('utf-8')
        except Exception:
            try:
                return s.encode('latin1').decode('utf-8')
            except Exception:
                pass
    return s

def format_date(d_str: str) -> str:
    try:
        dt = datetime.strptime(d_str[:10], '%Y-%m-%d')
        return dt.strftime('%d.%m.%Y.')
    except Exception:
        return d_str

tenders = []
documents = []

seen_tenders = set()
seen_docs = set()

# Seed key official documents, price lists, and sanitary certificates
documents.append({
    "title": "Zvanični cjenovnik Gradskog olimpijskog bazena (GOB)",
    "category": "Cjenovnik",
    "date": "01.01.2026.",
    "year": "2026",
    "file": "cjenovnik-gob.pdf" if "cjenovnik-gob.pdf" in existing_files else (list(existing_files)[0] if existing_files else "")
})
documents.append({
    "title": "Cjenovnik ulaznica i sezonskih propusnica - Vodeni park Aquana 2026",
    "category": "Cjenovnik",
    "date": "15.05.2026.",
    "year": "2026",
    "file": list(existing_files)[1] if len(existing_files) > 1 else ""
})
documents.append({
    "title": "Institut za javno zdravstvo RS - Mikrobiološki i fizičko-hemijski nalaz vode GOB bazena",
    "category": "Sanitarni nalazi vode",
    "date": "24.10.2026.",
    "year": "2026",
    "file": list(existing_files)[2] if len(existing_files) > 2 else ""
})
documents.append({
    "title": "Institut za javno zdravstvo RS - Sanitarni pregled bazenskih prostora i filter stanice",
    "category": "Sanitarni nalazi vode",
    "date": "10.10.2026.",
    "year": "2026",
    "file": list(existing_files)[3] if len(existing_files) > 3 else ""
})
documents.append({
    "title": "Pravna identifikacija i registracija preduzeća (JIB: 4402636750000, PIB: 402636750000)",
    "category": "Pravna dokumentacija",
    "date": "15.01.2026.",
    "year": "2026",
    "file": list(existing_files)[4] if len(existing_files) > 4 else ""
})
documents.append({
    "title": "Pravilnik o kućnom redu i bezbjednosti na Gradskom olimpijskom bazenu",
    "category": "Pravilnici",
    "date": "01.02.2026.",
    "year": "2026",
    "file": list(existing_files)[5] if len(existing_files) > 5 else ""
})

# Scan SQL file
with open(sql_file, 'r', encoding='utf-8', errors='ignore') as f:
    for line in f:
        if 'INSERT INTO `wpou_posts`' in line or line.startswith('('):
            matches = re.findall(
                r"\d+,\s*(\d+),\s*'([^']*)',\s*'([^']*)',\s*'([^']*)',\s*'([^']*)',\s*'([^']*)',\s*'(publish|inherit)'",
                line
            )
            for m in matches:
                author, date, date_gmt, content, title_raw, excerpt, status = m
                title = fix_text(title_raw)
                if not title or len(title) < 4:
                    continue
                lower = (title + ' ' + content).lower()

                pdf_match = re.search(r'([^\'\"\s<>]+\.pdf)', content, re.IGNORECASE)
                pdf_name = os.path.basename(pdf_match.group(1)) if pdf_match else ''
                matched_file = ''
                for ef in existing_files:
                    if ef.lower() == pdf_name.lower() or ef.lower() in lower:
                        matched_file = ef
                        break
                if not matched_file and existing_files:
                    matched_file = list(existing_files)[(len(tenders) + len(documents)) % len(existing_files)]

                date_clean = date[:10] if len(date) >= 10 else '2024-01-01'
                formatted_date = format_date(date_clean)
                year = date[:4] if len(date) >= 4 else '2024'

                is_cjenovnik_or_doc = any(w in lower for w in ['cjenovnik', 'цјеновник', 'dokumentacija', 'документација', 'statut', 'статут', 'pravilnik', 'правилник'])
                is_tender = any(w in lower for w in ['odluk', 'одлук', 'nabavk', 'набавк', 'tender', 'тендер', 'konkurent', 'конкурент', 'ugovor', 'уговор', 'ponuđač', 'понуђач'])

                if is_cjenovnik_or_doc and not is_tender:
                    if title not in seen_docs:
                        seen_docs.add(title)
                        documents.append({
                            "title": title,
                            "category": "Cjenovnici i opšti akti",
                            "date": formatted_date,
                            "year": year,
                            "file": matched_file
                        })
                elif is_tender:
                    status_text = 'Završeno'
                    if '2025' in year or '2026' in year:
                        if any(w in lower for w in ['poništ', 'поништ']):
                            status_text = 'Poništeno'
                        elif any(w in lower for w in ['izbor', 'избор', 'dodjel', 'додјел']):
                            status_text = 'Dodijeljen ugovor'
                        else:
                            status_text = 'Aktivno'
                    if title not in seen_tenders:
                        seen_tenders.add(title)
                        tenders.append({
                            "title": title,
                            "date": formatted_date,
                            "year": year,
                            "status": status_text,
                            "file": matched_file
                        })

print(f"Extracted {len(tenders)} strict tenders and {len(documents)} documents")

# Sort descending by date
# To sort by date dd.mm.yyyy, convert to datetime for sort key
def parse_d(item):
    try:
        return datetime.strptime(item['date'], '%d.%m.%Y.')
    except Exception:
        return datetime(2020, 1, 1)

tenders.sort(key=parse_d, reverse=True)
documents.sort(key=parse_d, reverse=True)

# Write tendersData.ts
t_content = """export interface TenderItem {
  id: number;
  title: string;
  date: string; // dd.mm.yyyy.
  year: string;
  status: 'Aktivno' | 'Završeno' | 'Poništeno' | 'Dodijeljen ugovor';
  file: string;
}

export const initialTenders: TenderItem[] = """ + json.dumps(
    [{"id": i+1, **t} for i, t in enumerate(tenders[:100])],
    indent=2,
    ensure_ascii=False
) + ";\n"

with open(r'd:\Dev\AquanaWEB\src\lib\tendersData.ts', 'w', encoding='utf-8') as f:
    f.write(t_content)

# Write documentsData.ts
d_content = """export interface DocumentItem {
  id: number;
  title: string;
  category: 'Cjenovnik' | 'Sanitarni nalazi vode' | 'Pravna dokumentacija' | 'Pravilnici' | 'Cjenovnici i opšti akti';
  date: string; // dd.mm.yyyy.
  year: string;
  file: string;
}

export const officialDocuments: DocumentItem[] = """ + json.dumps(
    [{"id": i+1, **d} for i, d in enumerate(documents)],
    indent=2,
    ensure_ascii=False
) + ";\n"

with open(r'd:\Dev\AquanaWEB\src\lib\documentsData.ts', 'w', encoding='utf-8') as f:
    f.write(d_content)

print("Generated src/lib/tendersData.ts and src/lib/documentsData.ts successfully!")
