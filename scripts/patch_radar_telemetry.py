import os
os.chdir(r"D:\Dev\AquanaWEB")

# 1. Update src/lib/submissionsData.ts
with open("src/lib/submissionsData.ts", "r", encoding="utf-8") as f:
    s = f.read()

if "PoolTelemetrySettings" not in s:
    s = s.replace("export interface PortalSettings {", "export interface PoolTelemetrySettings {\n  waterTemp: string;\n  airTemp: string;\n  waterStatus: string;\n  airStatus: string;\n  lastUpdated: string;\n  updatedBy: string;\n}\n\nexport interface PortalSettings {\n  telemetry?: PoolTelemetrySettings;")
    s = s.replace("export const initialPortalSettings: PortalSettings = {", 'export const initialPortalSettings: PortalSettings = {\n  telemetry: {\n    waterTemp: "26.8",\n    airTemp: "28.5",\n    waterStatus: "FINA takmičarska norma",\n    airStatus: "Klimatizovana dvorana",\n    lastUpdated: "Danas u 07:00h",\n    updatedBy: "Recepcija GOB"\n  },')
    with open("src/lib/submissionsData.ts", "w", encoding="utf-8") as f:
        f.write(s)
    print("submissionsData.ts patched!")

# 2. Update PoolLiveStatus.tsx
with open("src/components/PoolLiveStatus.tsx", "r", encoding="utf-8") as f:
    p = f.read()

if "getPortalSettings" not in p:
    p = p.replace('import { realClubs } from "@/lib/realPoolData";', 'import { realClubs } from "@/lib/realPoolData";\nimport { getPortalSettings, PortalSettings } from "@/lib/submissionsData";\nimport { useEffect } from "react";')
    p = p.replace('const [activeRadar, setActiveRadar] = useState<"gob" | "vp">("gob");', 'const [activeRadar, setActiveRadar] = useState<"gob" | "vp">("gob");\n  const [portalSettings, setPortalSettings] = useState<PortalSettings | null>(null);\n  useEffect(() => { setPortalSettings(getPortalSettings()); }, []);\n  const waterTemp = portalSettings?.telemetry?.waterTemp || "26.8";\n  const airTemp = portalSettings?.telemetry?.airTemp || "28.5";\n  const waterStatus = portalSettings?.telemetry?.waterStatus || "FINA takmičarska norma";\n  const airStatus = portalSettings?.telemetry?.airStatus || "Klimatizovana dvorana";')

# Scale down radar iframe so background and shadows never clip
p = p.replace('width="340"\n                height="340"\n                scrolling="no"\n                className="rounded-2xl max-w-full bg-transparent border-0"', 'width="360"\n                height="360"\n                scrolling="no"\n                className="rounded-3xl max-w-none bg-transparent border-0 drop-shadow-md transform scale-[0.82] sm:scale-[0.86] origin-center -my-5"')

p = p.replace('<p className="text-2xl font-black text-slate-900">26.8 °C</p>', '<p className="text-2xl font-black text-slate-900">{waterTemp} °C</p>')
p = p.replace('<span className="text-[10px] text-emerald-600 font-bold">{t("FINA takmičarska norma")}</span>', '<span className="text-[10px] text-emerald-600 font-bold">{t(waterStatus)}</span>')
p = p.replace('<p className="text-2xl font-black text-slate-900">28.5 °C</p>', '<p className="text-2xl font-black text-slate-900">{airTemp} °C</p>')
p = p.replace('<span className="text-[10px] text-sky-600 font-bold">{t("Klimatizovana dvorana")}</span>', '<span className="text-[10px] text-sky-600 font-bold">{t(airStatus)}</span>')

with open("src/components/PoolLiveStatus.tsx", "w", encoding="utf-8") as f:
    f.write(p)
print("PoolLiveStatus.tsx patched!")
