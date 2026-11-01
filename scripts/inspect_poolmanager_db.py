import sqlite3

db_path = r'X:\PoolManager\dev.db'
conn = sqlite3.connect(db_path)
c = conn.cursor()

tables = [r[0] for r in c.execute("SELECT name FROM sqlite_master WHERE type='table'").fetchall()]
print("Tables in dev.db:", tables)

for t in ['Pool', 'Lane', 'Club', 'Coach', 'Session', 'SessionLane', 'ClubRequest']:
    if t in tables:
        count = c.execute(f"SELECT count(*) FROM {t}").fetchone()[0]
        print(f"Table {t}: {count} records")

# Show sample sessions
if 'Session' in tables:
    c.execute("SELECT id, poolId, clubId, dayOfWeek, startTime, endTime, category, isJi FROM Session LIMIT 10")
    sessions = c.fetchall()
    print("\nSample Sessions:")
    for s in sessions:
        print(" ", s)

# Show clubs
if 'Club' in tables:
    c.execute("SELECT id, shortName, name, type, jiQuotaHoursMonth FROM Club")
    clubs = c.fetchall()
    print("\nClubs:")
    for cl in clubs:
        print(" ", cl)
