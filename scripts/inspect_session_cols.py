import sqlite3

db_path = r'X:\PoolManager\dev.db'
conn = sqlite3.connect(db_path)
c = conn.cursor()

c.execute("PRAGMA table_info(Session)")
cols = [r[1] for r in c.fetchall()]
print("Session columns:", cols)

c.execute("PRAGMA table_info(SessionLane)")
cols_sl = [r[1] for r in c.fetchall()]
print("SessionLane columns:", cols_sl)

# Sample rows from Session
c.execute(f"SELECT * FROM Session LIMIT 5")
rows = c.fetchall()
print("\nSample Session rows:")
for r in rows:
    print(" ", r)

# Sample join Session + SessionLane + Club + Pool
c.execute("""
    SELECT s.id, p.name, c.shortName, s.startTime, s.endTime, l.name
    FROM Session s
    JOIN Pool p ON s.poolId = p.id
    JOIN Club c ON s.clubId = c.id
    JOIN SessionLane sl ON sl.sessionId = s.id
    JOIN Lane l ON sl.laneId = l.id
    LIMIT 10
""")
sample_join = c.fetchall()
print("\nSample Join (Real live allocation):")
for j in sample_join:
    print(" ", j)
