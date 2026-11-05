base = "D:/Dev/AquanaWEB"

# 1. Header.tsx: fix onOpenSurvey?.() and onOpenContact?.()
p_h = f"{base}/src/components/Header.tsx"
with open(p_h, "r", encoding="utf-8") as f:
    h = f.read()
h = h.replace("onOpenSurvey()", "onOpenSurvey?.()")
h = h.replace("onOpenContact()", "onOpenContact?.()")
with open(p_h, "w", encoding="utf-8") as f:
    f.write(h)

# 2. Fix Header props in cjenovnik, gob, vodeni-park
for p in [f"{base}/src/app/cjenovnik/page.tsx", f"{base}/src/app/gob/page.tsx", f"{base}/src/app/vodeni-park/page.tsx"]:
    with open(p, "r", encoding="utf-8") as f:
        c = f.read()
    c = c.replace("setLang={setCurrentLang}", "setLang={setLang}")
    with open(p, "w", encoding="utf-8") as f:
        f.write(c)

print("TS_ERRORS_FIXED")
