import os

admin_path = r"D:\Dev\AquanaWEB\src\app\admin\page.tsx"
with open(admin_path, "r", encoding="utf-8") as f:
    code = f.read()

# 1. Update AdminTab type
old_tab_type = 'type AdminTab = "surveys" | "coupons" | "drawings" | "news" | "tenders" | "banners" | "users" | "comments" | "inquiries" | "reception";'
new_tab_type = 'type AdminTab = "surveys" | "coupons" | "drawings" | "news" | "tenders" | "banners" | "users" | "comments" | "inquiries" | "reception" | "settings";'

if old_tab_type in code:
    code = code.replace(old_tab_type, new_tab_type)

# 2. Add imports for PortalSettings
if "getPortalSettings" not in code:
    code = code.replace(
        "saveAllContactInquiries\n} from \"@/lib/submissionsData\";",
        "saveAllContactInquiries,\n  PortalSettings,\n  getPortalSettings,\n  savePortalSettings\n} from \"@/lib/submissionsData\";"
    )

# 3. Add state for portalSettings
if "const [portalSettings, setPortalSettings]" not in code:
    code = code.replace(
        "const [receptionSearch, setReceptionSearch] = useState(\"\");",
        "const [receptionSearch, setReceptionSearch] = useState(\"\");\n  const [portalSettings, setPortalSettings] = useState<PortalSettings | null>(null);\n  const [settingsSuccess, setSettingsSuccess] = useState(false);"
    )

# 4. Load portal settings in useEffect
if "setPortalSettings(getPortalSettings());" not in code:
    code = code.replace(
        "setInquiriesList(getContactInquiries());",
        "setInquiriesList(getContactInquiries());\n    setPortalSettings(getPortalSettings());"
    )

# 5. Fix horizontal scrollbar in Tabs bar:
old_tabs_bar = '''      {/* Main Tabs Navigation */}
      <div className="bg-white border-b border-slate-200 px-6 overflow-x-auto shadow-sm">
        <div className="flex items-center gap-2 min-w-max py-2">'''

new_tabs_bar = '''      {/* Main Tabs Navigation - Fully responsive 2 rows, NO horizontal scroll */}
      <div className="bg-white border-b border-slate-200 px-6 py-3 shadow-sm">
        <div className="flex flex-wrap items-center gap-2">'''

if old_tabs_bar in code:
    code = code.replace(old_tabs_bar, new_tabs_bar)
    print("Replaced horizontal scroll wrapper with responsive flex-wrap.")
else:
    print("Old tabs bar not found with exact whitespace, trying regex...")
    import re
    code = re.sub(
        r'<div className="bg-white border-b border-slate-200 px-6 overflow-x-auto shadow-sm">\s*<div className="flex items-center gap-2 min-w-max py-2">',
        new_tabs_bar.strip(),
        code
    )

with open(admin_path, "w", encoding="utf-8") as f:
    f.write(code)

print("Patch applied to admin page.tsx!")
