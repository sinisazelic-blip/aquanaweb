import sqlite3
import json
import os

db_path = r'X:\PoolManager\dev.db'
out_ts = r'd:\Dev\AquanaWEB\src\lib\realPoolData.ts'

conn = sqlite3.connect(db_path)
c = conn.cursor()

c.execute('SELECT id, name, shortName, type, emblemBg FROM Club ORDER BY type, name')
clubs_raw = c.fetchall()

clubs = []
for cl in clubs_raw:
    cid, name, shortName, ctype, bg = cl
    type_label = "Plivački klub"
    if ctype == "WATER_POLO":
        type_label = "Vaterpolo klub"
    elif ctype == "LIFEGUARD_SERVICE":
        type_label = "Ronilački klub i Spasilačka služba"
    elif ctype == "RECREATION":
        type_label = "Rekreacija"
        
    clubs.append({
        "id": cid,
        "name": name,
        "shortName": shortName,
        "type": ctype,
        "typeLabel": type_label,
    })

c.execute('SELECT id, name, length, totalLanes FROM Pool ORDER BY length DESC')
pools_raw = c.fetchall()

pools = []
for p in pools_raw:
    pid, name, length, totalLanes = p
    pools.append({
        "id": pid,
        "name": name,
        "length": length,
        "totalLanes": totalLanes
    })

conn.close()

content = "// REAL DATA FROM X:\\PoolManager\\dev.db\n"
content += "export interface ClubItem {\n"
content += "  id: string;\n"
content += "  name: string;\n"
content += "  shortName: string;\n"
content += "  type: string;\n"
content += "  typeLabel: string;\n"
content += "}\n\n"
content += "export interface PoolItem {\n"
content += "  id: string;\n"
content += "  name: string;\n"
content += "  length: number;\n"
content += "  totalLanes: number;\n"
content += "}\n\n"
content += "export const realClubs: ClubItem[] = " + json.dumps(clubs, indent=2, ensure_ascii=False) + ";\n\n"
content += "export const realPools: PoolItem[] = " + json.dumps(pools, indent=2, ensure_ascii=False) + ";\n"

with open(out_ts, 'w', encoding='utf-8') as f:
    f.write(content)

print(f"Extracted {len(clubs)} real clubs and {len(pools)} real pools into realPoolData.ts")
