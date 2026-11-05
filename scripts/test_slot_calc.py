import json

path = r'D:\Dev\AquanaWEB\src\lib\livePoolManagerSchedule.json'
with open(path, 'r', encoding='utf-8') as f:
    d = json.load(f)

raw = d['schedule'].get('0', [])
veliki = [i for i in raw if 'Veliki' in i['pool'] or '50m' in i['pool']]

slots = [
    {'start': '06:00', 'end': '08:00', 'label': '06:00 - 08:00h'},
    {'start': '08:00', 'end': '10:00', 'label': '08:00 - 10:00h'},
    {'start': '10:00', 'end': '12:00', 'label': '10:00 - 12:00h'},
    {'start': '12:00', 'end': '14:00', 'label': '12:00 - 14:00h'},
    {'start': '14:00', 'end': '16:00', 'label': '14:00 - 16:00h'},
    {'start': '16:00', 'end': '18:00', 'label': '16:00 - 18:00h'},
    {'start': '18:00', 'end': '20:00', 'label': '18:00 - 20:00h'},
    {'start': '20:00', 'end': '22:00', 'label': '20:00 - 22:00h'}
]

for s in slots:
    matched = [i for i in veliki if i['start'] < s['end'] and i['end'] > s['start']]
    lanes = set(i['laneNumber'] for i in matched)
    free = 10 - len(lanes)
    print(f"{s['label']}: {len(lanes)}/10 zauzeto (Slobodno: {free}/10 staza)")
    for l in sorted(list(lanes)):
        # print club
        cl = next(i['club'] for i in matched if i['laneNumber'] == l)
        st = next(i['start'] for i in matched if i['laneNumber'] == l)
        et = next(i['end'] for i in matched if i['laneNumber'] == l)
        print(f"   Staza {l}: {cl} ({st} - {et})")
