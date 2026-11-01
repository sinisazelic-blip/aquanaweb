import json
import re
from datetime import datetime

with open(r'd:\Dev\AquanaWEB\src\lib\tendersData.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Extract json array
m = re.search(r'export const initialTenders:\s*TenderItem\[\]\s*=\s*(\[.*?\]);', content, re.DOTALL)
if not m:
    print("Could not find json array!")
    exit(1)

raw_items = json.loads(m.group(1))
print(f"Loaded {len(raw_items)} items from tendersData.ts")

def to_ddmmyyyy(d_str: str) -> str:
    # If already dd.mm.yyyy. or dd.mm.yyyy
    if re.match(r'^\d{2}\.\d{2}\.\d{4}', d_str):
        if not d_str.endswith('.'):
            return d_str + '.'
        return d_str
    # If YYYY-MM-DD
    if re.match(r'^\d{4}-\d{2}-\d{2}', d_str):
        parts = d_str[:10].split('-')
        return f"{parts[2]}.{parts[1]}.{parts[0]}."
    return d_str

tenders = []
documents = []

# Pre-populate official documents requested by user:
documents.append({
    "id": 1,
    "title": "Zvanični cjenovnik Gradskog olimpijskog bazena (GOB)",
    "category": "Cjenovnik",
    "date": "01.01.2026.",
    "year": "2026",
    "file": "cjenovnik-gob.pdf"
})
documents.append({
    "id": 2,
    "title": "Cjenovnik ulaznica i sezonskih propusnica - Vodeni park Aquana 2026",
    "category": "Cjenovnik",
    "date": "15.05.2026.",
    "year": "2026",
    "file": "cjenovnik-vodeni-park-2026.pdf"
})
documents.append({
    "id": 3,
    "title": "Institut za javno zdravstvo RS - Mikrobiološki i fizičko-hemijski nalaz vode bazena GOB",
    "category": "Sanitarni nalazi vode",
    "date": "24.10.2026.",
    "year": "2026",
    "file": "sanitarni-nalaz-vode-institut-oktobar-2026.pdf"
})
documents.append({
    "id": 4,
    "title": "Institut za javno zdravstvo RS - Sanitarni pregled bazenskih prostora i filter stanice",
    "category": "Sanitarni nalazi vode",
    "date": "10.10.2026.",
    "year": "2026",
    "file": "sanitarni-pregled-prostora-institut.pdf"
})
documents.append({
    "id": 5,
    "title": "Pravna identifikacija i registracija preduzeća (JIB: 4402636750000, PIB: 402636750000)",
    "category": "Pravna dokumentacija",
    "date": "15.01.2026.",
    "year": "2026",
    "file": "pravna-identifikacija-aquana-jib-pib.pdf"
})
documents.append({
    "id": 6,
    "title": "Pravilnik o kućnom redu i bezbjednosti kupača na Gradskom olimpijskom bazenu",
    "category": "Pravilnici",
    "date": "01.02.2026.",
    "year": "2026",
    "file": "pravilnik-kucni-red-gob.pdf"
})

doc_keywords = ['cjenovnik', 'цјеновник', 'dokumentacija', 'документација', 'besplatan ulaz', 'mobilni lift', 'statut', 'pravilnik']

for item in raw_items:
    title = item['title'].strip()
    title_lower = title.lower()
    date_formatted = to_ddmmyyyy(item['date'])
    year = item.get('year', '2026')
    file_name = item.get('file', '')

    if any(k in title_lower for k in doc_keywords):
        # Move to documents
        cat = "Cjenovnik" if "cjenovnik" in title_lower or "цјеновник" in title_lower else "Opšti akti i odluke"
        documents.append({
            "id": len(documents) + 1,
            "title": title,
            "category": cat,
            "date": date_formatted,
            "year": year,
            "file": file_name
        })
    else:
        # Strictly public procurement tender
        tenders.append({
            "id": len(tenders) + 1,
            "title": title,
            "date": date_formatted,
            "year": year,
            "status": item['status'],
            "file": file_name
        })

print(f"Divided into {len(tenders)} tenders and {len(documents)} documents.")

# Write tendersData.ts
ts_tenders = """export interface TenderItem {
  id: number;
  title: string;
  date: string; // dd.mm.yyyy.
  year: string;
  status: 'Aktivno' | 'Završeno' | 'Poništeno' | 'Dodijeljen ugovor';
  file: string;
}

export const initialTenders: TenderItem[] = """ + json.dumps(tenders, indent=2, ensure_ascii=False) + ";\n"

with open(r'd:\Dev\AquanaWEB\src\lib\tendersData.ts', 'w', encoding='utf-8') as f:
    f.write(ts_tenders)

# Write documentsData.ts
ts_docs = """export interface DocumentItem {
  id: number;
  title: string;
  category: string;
  date: string; // dd.mm.yyyy.
  year: string;
  file: string;
}

export const officialDocuments: DocumentItem[] = """ + json.dumps(documents, indent=2, ensure_ascii=False) + ";\n"

with open(r'd:\Dev\AquanaWEB\src\lib\documentsData.ts', 'w', encoding='utf-8') as f:
    f.write(ts_docs)

print("Saved tendersData.ts and documentsData.ts!")
