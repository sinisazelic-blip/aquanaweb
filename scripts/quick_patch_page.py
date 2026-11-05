path = r"D:\Dev\AquanaWEB\src\app\page.tsx"
with open(path, "r", encoding="utf-8") as f:
    text = f.read()

# Add imports
text = text.replace(
    'import { Lang, translations } from "@/lib/translations";',
    'import { Lang, translations, getSavedLang, saveLang, toCyrillic } from "@/lib/translations";\nimport { getPortalSettings, PortalSettings } from "@/lib/submissionsData";'
)

# Replace currentLang useState with useEffect initialization
old_lang_state = '  const [currentLang, setCurrentLang] = useState<Lang>("lat");'
new_lang_state = '''  const [currentLang, setCurrentLang] = useState<Lang>("lat");
  const [portalSettings, setPortalSettings] = useState<PortalSettings | null>(null);

  useEffect(() => {
    setCurrentLang(getSavedLang());
    setPortalSettings(getPortalSettings());
  }, []);

  const handleLangChange = (l: Lang) => {
    setCurrentLang(l);
    saveLang(l);
  };'''

text = text.replace(old_lang_state, new_lang_state)
text = text.replace('setLang={setCurrentLang}', 'setLang={handleLangChange}')

# Hook up topNews with portalSettings
old_top_news = '''        {topNews.isActive && (
          <TopNewsSpotlight
            currentLang={currentLang}
            news={topNews}
            onDismiss={() => setTopNews((prev) => ({ ...prev, isActive: false }))}
          />
        )}'''

new_top_news = '''        {((portalSettings ? portalSettings.topBanner.isActive : topNews.isActive)) && (
          <TopNewsSpotlight
            currentLang={currentLang}
            news={{
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
            }}
            onDismiss={() => {
              if (portalSettings) {
                setPortalSettings({
                  ...portalSettings,
                  topBanner: { ...portalSettings.topBanner, isActive: false }
                });
              } else {
                setTopNews((prev) => ({ ...prev, isActive: false }));
              }
            }}
          />
        )}'''

text = text.replace(old_top_news, new_top_news)

with open(path, "w", encoding="utf-8") as f:
    f.write(text)
print("page.tsx updated!")
