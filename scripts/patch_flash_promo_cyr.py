import os
os.chdir(r"D:\Dev\AquanaWEB")

with open("src/components/FlashPromoAction.tsx", "r", encoding="utf-8") as f:
    c = f.read()

c = c.replace('import { Lang }', '// Lang') # cleanup if present
c = c.replace('import React, { useState, useEffect } from "react";', 'import React, { useState, useEffect } from "react";\nimport { Lang, tr } from "@/lib/translations";')
c = c.replace('interface FlashPromoActionProps {\n  onOpenGame: () => void;\n}', 'interface FlashPromoActionProps {\n  onOpenGame: () => void;\n  currentLang?: Lang;\n}')
c = c.replace('export default function FlashPromoAction({ onOpenGame }: FlashPromoActionProps) {', 'export default function FlashPromoAction({ onOpenGame, currentLang = "lat" }: FlashPromoActionProps) {\n  const t = (s: string) => tr(s, currentLang);')

# Replace texts
c = c.replace('<span>FLASH AKCIJA</span>', '<span>{t("FLASH AKCIJA")}</span>')
c = c.replace('"DANAŠNJI ZEC IZ ŠEŠIRA"', 't("DANAŠNJI ZEC IZ ŠEŠIRA")')
c = c.replace('"BRZA NAGRADNA AKCIJA"', 't("BRZA NAGRADNA AKCIJA")')
c = c.replace('{portalSettings?.flashPromo?.title || "Uz sezonsku kartu od 50 ulazaka dobijate 5 besplatnih kafa u Caffe Baru GOB!"}', '{t(portalSettings?.flashPromo?.title || "Uz sezonsku kartu od 50 ulazaka dobijate 5 besplatnih kafa u Caffe Baru GOB!")}')
c = c.replace('{portalSettings?.flashPromo?.subtitle || "Aktivirajte akciju odmah na sajtu i preuzmite digitalni bar-kod kupon koji važi na biletarnici i u našem caffe baru."}', '{t(portalSettings?.flashPromo?.subtitle || "Aktivirajte akciju odmah na sajtu i preuzmite digitalni bar-kod kupon koji važi na biletarnici i u našem caffe baru.")}')
c = c.replace('<span>REZERVIŠI KUPON ODMAH</span>', '<span>{t("REZERVIŠI KUPON ODMAH")}</span>')
c = c.replace('<span>IGRAJ „UHVATI RIBICU“</span>', '<span>{t("IGRAJ „UHVATI RIBICU“")}</span>')
c = c.replace('AKCIJA ISTIČE ZA:', '{t("AKCIJA ISTIČE ZA:")}')

with open("src/components/FlashPromoAction.tsx", "w", encoding="utf-8") as f:
    f.write(c)

# Update page.tsx to pass currentLang
with open("src/app/page.tsx", "r", encoding="utf-8") as f:
    p = f.read()

p = p.replace('<FlashPromoAction onOpenGame={() => setFishGameOpen(true)} />', '<FlashPromoAction onOpenGame={() => setFishGameOpen(true)} currentLang={currentLang} />')

with open("src/app/page.tsx", "w", encoding="utf-8") as f:
    f.write(p)

print("FlashPromoAction and page.tsx updated with currentLang!")
