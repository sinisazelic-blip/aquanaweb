import sqlite3
import json
from datetime import datetime

db_path = r'X:\PoolManager\dev.db'
conn = sqlite3.connect(db_path)
c = conn.cursor()

# Get Pools
pools = c.execute("SELECT id, name, length, totalLanes FROM Pool").fetchall()
pool_dict = {p[0]: {"id": p[0], "name": p[1], "length": p[2], "totalLanes": p[3]} for p in pools}

# Get Lanes
lanes = c.execute("SELECT id, poolId, number, name FROM Lane").fetchall()
lane_dict = {l[0]: {"id": l[0], "poolId": l[1], "number": l[2], "name": l[3]} for l in lanes}

# Get Clubs
clubs = c.execute("SELECT id, name, shortName, type, jiQuotaHoursMonth, president, phone, email FROM Club").fetchall()
club_dict = {cl[0]: {"id": cl[0], "name": cl[1], "shortName": cl[2], "type": cl[3], "quota": cl[4], "phone": cl[6]} for cl in clubs}

# Query all allocations
c.execute("""
    SELECT 
        s.id,
        s.poolId,
        s.clubId,
        s.startTime,
        s.endTime,
        s.activityType,
        s.billingType,
        sl.laneId
    FROM Session s
    JOIN SessionLane sl ON sl.sessionId = s.id
    ORDER BY s.startTime
""")
allocations = c.fetchall()

print(f"Loaded {len(allocations)} total lane-allocation entries from X:\\PoolManager\\dev.db!")

# Group by day of week and hour
# Parse ISO startTime, e.g. 2026-06-01T04:00:00.000+00:00 (which is 06:00 UTC+2)
schedule_by_day = {i: [] for i in range(7)} # 0 = Monday, 6 = Sunday

for a in allocations:
    sid, pool_id, club_id, st_str, et_str, act_type, bill_type, lane_id = a
    club = club_dict.get(club_id, {"shortName": "Nepoznat", "name": "Klub"})
    pool = pool_dict.get(pool_id, {"name": "Veliki bazen"})
    lane = lane_dict.get(lane_id, {"name": "Staza", "number": 1})

    try:
        dt_start = datetime.fromisoformat(st_str.replace('+00:00', ''))
        dt_end = datetime.fromisoformat(et_str.replace('+00:00', ''))
        day_of_week = dt_start.weekday() # 0 = Mon, 6 = Sun
        start_hour = dt_start.strftime("%H:%M")
        end_hour = dt_end.strftime("%H:%M")

        schedule_by_day[day_of_week].append({
            "pool": pool["name"],
            "club": club["shortName"],
            "clubFull": club["name"],
            "clubType": club["type"],
            "lane": lane["name"],
            "laneNumber": lane["number"],
            "start": start_hour,
            "end": end_hour,
            "billing": bill_type
        })
    except Exception as e:
        pass

for day, items in schedule_by_day.items():
    days_names = ['Ponedjeljak', 'Utorak', 'Srijeda', 'Četvrtak', 'Petak', 'Subota', 'Nedjelja']
    print(f"{days_names[day]}: {len(items)} staza/termina dodijeljeno!")

out_file = r'd:\Dev\AquanaWEB\src\lib\livePoolManagerSchedule.json'
with open(out_file, 'w', encoding='utf-8') as f:
    json.dump({
        "syncedAt": datetime.now().strftime("%d.%m.%Y. %H:%M:%S"),
        "pools": list(pool_dict.values()),
        "clubs": list(club_dict.values()),
        "schedule": schedule_by_day
    }, f, indent=2, ensure_ascii=False)

print(f"Successfully generated {out_file} directly from live X:\\PoolManager\\dev.db!")
