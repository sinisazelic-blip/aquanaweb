import os

page_path = r"D:\Dev\AquanaWEB\src\app\page.tsx"
with open(page_path, "r", encoding="utf-8") as f:
    page_code = f.read()

# 1. Add getSavedLang, saveLang, toCyrillic, getPortalSettings, PortalSettings imports
if "getSavedLang" not in page_code:
    page_code = page_code.replace(
        'import { Lang, translations } from "@/lib/translations";',
        'import { Lang, translations, getSavedLang, saveLang, toCyrillic } from "@/lib/translations";\nimport { getPortalSettings, PortalSettings } from "@/lib/submissionsData";'
    )

# 2. Add useEffect to load saved language and portal settings
mount_effect = '''  const [currentLang, setCurrentLang] = useState<Lang>("lat");
  const [portalSettings, setPortalSettings] = useState<PortalSettings | null>(null);

  useEffect(() => {
    setCurrentLang(getSavedLang());
    setPortalSettings(getPortalSettings());
  }, []);

  const handleLangChange = (l: Lang) => {
    setCurrentLang(l);
    saveLang(l);
  };
'''

if "handleLangChange" not in page_code:
    page_code = page_code.replace(
        '  const [currentLang, setCurrentLang] = useState<Lang>("lat");',
        mount_effect
    )
    # Replace setLang={setCurrentLang} with setLang={handleLangChange}
    page_code = page_code.replace(
        'setLang={setCurrentLang}',
        'setLang={handleLangChange}'
    )

# 3. Use portalSettings for topNews
top_news_sync = '''  const activeTopNews: TopNewsData = {
    isActive: portalSettings ? portalSettings.topBanner.isActive : topNews.isActive,
    type: "breaking",
    title_lat: portalSettings ? portalSettings.topBanner.title : topNews.title_lat,
    title_cir: portalSettings ? toCyrillic(portalSettings.topBanner.title) : topNews.title_cir,
    title_en: topNews.title_en,
    summary_lat: portalSettings ? portalSettings.topBanner.text : topNews.summary_lat,
    summary_cir: portalSettings ? toCyrillic(portalSettings.topBanner.text) : topNews.summary_cir,
    summary_en: topNews.summary_en,
    linkText_lat: portalSettings ? portalSettings.topBanner.buttonText : "Pogledaj raspored",
    linkText_cir: portalSettings ? toCyrillic(portalSettings.topBanner.buttonText) : "Погледај распоред",
    linkText_en: "View Schedule",
    linkUrl: portalSettings ? portalSettings.topBanner.buttonLink : "#raspored"
  };
'''

if "activeTopNews" not in page_code:
    page_code = page_code.replace(
        '{topNews.isActive && (',
        top_news_sync + '\n        {activeTopNews.isActive && ('
    )
    page_code = page_code.replace(
        'news={topNews}',
        'news={activeTopNews}'
    )

# 4. Transliterate body text for Cyrillic
body_gob_lat = 'Jedan od najmodernijih vodenih kompleksa u Evropi. Izgrađen po standardima Svjetske plivačke federacije (FINA), otvoren svakog dana za građane, plivačke i vaterpolo klubove, te takmičenja najvišeg međunarodnog nivoa.'
body_gob_replace = '{currentLang === "cir" ? toCyrillic("' + body_gob_lat + '") : "' + body_gob_lat + '"}'

if body_gob_lat in page_code and '{currentLang === "cir" ? toCyrillic' not in page_code:
    page_code = page_code.replace(body_gob_lat, body_gob_replace)

body_vp_lat = 'Najveća ljetna vodena atrakcija Banjaluke. Prostire se na 38.000 m² uređenih zelenih površina sa prirodnim hladom, tri velika otvorena bazena ukupne vodene površine 1.500 m², toboganom dužine 100 metara, sunčalištem i ljetnim manifestacijama na otvorenom.'
body_vp_replace = '{currentLang === "cir" ? toCyrillic("' + body_vp_lat + '") : "' + body_vp_lat + '"}'

if body_vp_lat in page_code:
    page_code = page_code.replace(body_vp_lat, body_vp_replace)

with open(page_path, "w", encoding="utf-8") as f:
    f.write(page_code)

print("page.tsx patched successfully!")
