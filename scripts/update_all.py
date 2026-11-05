import os

print("Running update script...")

# 1. Update submissionsData.ts with PortalSettings
sub_path = r"D:\Dev\AquanaWEB\src\lib\submissionsData.ts"
with open(sub_path, "r", encoding="utf-8") as f:
    sub_code = f.read()

if "PortalSettings" not in sub_code:
    portal_settings_code = '''

// --- PORTAL CMS SETTINGS (ZIMSKI/LJETNI REŽIM, TOP OBAVJEŠTENJE, FLASH AKCIJA) ---
export interface PortalSettings {
  topBanner: {
    isActive: boolean;
    tag: string;
    title: string;
    text: string;
    buttonText: string;
    buttonLink: string;
  };
  flashPromo: {
    isActive: boolean;
    badge: string;
    title: string;
    description: string;
    benefitBadge: string;
    targetExpiry: string;
  };
}

export const initialPortalSettings: PortalSettings = {
  topBanner: {
    isActive: true,
    tag: "TOP NEWS / VANREDNO",
    title: "Zimski režim na Gradskom olimpijskom bazenu i raspored staza za građanstvo",
    text: "Produženi rekreativni večernji termini, besprijekorno zagrijavanje vode i vazduha, te otvorene prijave za nove grupe škole plivanja.",
    buttonText: "Pogledaj raspored",
    buttonLink: "#raspored"
  },
  flashPromo: {
    isActive: true,
    badge: "DANAŠNJI ZEC IZ ŠEŠIRA",
    title: "Uz sezonsku kartu od 50 ulazaka dobijate 5 besplatnih kafa u Caffe Baru GOB!",
    description: "Aktivirajte akciju odmah na sajtu i preuzmite digitalni bar-kod kupon koji važi na biletarnici i u našem caffe baru.",
    benefitBadge: "50 ULAZA + 5 KAFA",
    targetExpiry: "2026-11-30T23:59:59"
  }
};

export const getPortalSettings = (): PortalSettings => {
  if (typeof window === "undefined") return initialPortalSettings;
  try {
    const raw = localStorage.getItem("aquana_portal_settings");
    if (!raw) return initialPortalSettings;
    return JSON.parse(raw);
  } catch {
    return initialPortalSettings;
  }
};

export const savePortalSettings = (settings: PortalSettings) => {
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem("aquana_portal_settings", JSON.stringify(settings));
    } catch {}
  }
};
'''
    with open(sub_path, "a", encoding="utf-8") as f:
        f.write(portal_settings_code)
    print("Added PortalSettings to submissionsData.ts")
else:
    print("PortalSettings already exists in submissionsData.ts")

# 2. Update InteractiveSchedule.tsx matching logic
sched_path = r"D:\Dev\AquanaWEB\src\components\InteractiveSchedule.tsx"
with open(sched_path, "r", encoding="utf-8") as f:
    sched_code = f.read()

# Replace matching logic with interval overlap
old_filter = "return item.start <= slot.start && item.end >= slot.end;"
new_filter = "return item.start < slot.end && item.end > slot.start;"

if old_filter in sched_code:
    sched_code = sched_code.replace(old_filter, new_filter)
    with open(sched_path, "w", encoding="utf-8") as f:
        f.write(sched_code)
    print("Updated InteractiveSchedule.tsx filter logic to interval overlap")
else:
    print("Filter logic already updated in InteractiveSchedule.tsx")

print("All updates done successfully.")
