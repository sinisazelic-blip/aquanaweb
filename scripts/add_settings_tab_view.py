import os

admin_path = r"D:\Dev\AquanaWEB\src\app\admin\page.tsx"
with open(admin_path, "r", encoding="utf-8") as f:
    code = f.read()

# 1. Add tab button
tab_btn = '''          {/* PORTAL SETTINGS & REGIME TAB (Superadmin & Webadmin) */}
          {(currentUser?.role === "superadmin" || currentUser?.role === "webadmin") && (
            <button
              onClick={() => setActiveTab("settings")}
              className={`px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-2 transition ${
                activeTab === "settings"
                  ? "bg-slate-900 text-white shadow-md shadow-slate-900/30"
                  : "text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-300"
              }`}
            >
              <Settings className="w-4 h-4 text-amber-500" />
              <span>Podešavanja & Režimi rada</span>
            </button>
          )}
'''

if "Podešavanja & Režimi rada" not in code:
    code = code.replace(
        '{/* SUPERADMIN USER MANAGEMENT TAB */}',
        tab_btn + '\n          {/* SUPERADMIN USER MANAGEMENT TAB */}'
    )

# 2. Add Settings Tab Content View
settings_view = '''
        {/* TAB 8: PORTAL SETTINGS (ZIMSKI/LJETNI REŽIM & FLASH AKCIJA) */}
        {activeTab === "settings" && portalSettings && (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-black text-slate-900">Podešavanja portala, sezonski režimi i Flash akcije</h3>
                <p className="text-xs text-slate-500">
                  Upravljajte gornjim vanrednim banerom (Zimski/Ljetni režim), tekstovima i trajanjem promotivnih akcija u realnom vremenu.
                </p>
              </div>
              {settingsSuccess && (
                <div className="px-4 py-2 rounded-xl bg-emerald-100 border border-emerald-300 text-emerald-800 text-xs font-bold flex items-center gap-2 animate-in fade-in">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Podešavanja su uspješno sačuvana i odmah aktivna na portalu!</span>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* CARD 1: TOP VANREDNO OBAVJEŠTENJE / SEZONSKI REŽIM */}
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-amber-500 animate-pulse" />
                    <h4 className="font-black text-slate-900 text-base">Gornji vanredni baner (Režim rada)</h4>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const updated = {
                        ...portalSettings,
                        topBanner: { ...portalSettings.topBanner, isActive: !portalSettings.topBanner.isActive }
                      };
                      setPortalSettings(updated);
                      savePortalSettings(updated);
                      setSettingsSuccess(true);
                      setTimeout(() => setSettingsSuccess(false), 3000);
                    }}
                    className={`px-3 py-1 rounded-full text-xs font-bold transition cursor-pointer ${
                      portalSettings.topBanner.isActive
                        ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                        : "bg-slate-200 text-slate-700"
                    }`}
                  >
                    ● {portalSettings.topBanner.isActive ? "Baner Aktivan na sajtu" : "Baner Isključen"}
                  </button>
                </div>

                {/* Quick Regime Presets */}
                <div>
                  <label className="text-[11px] font-bold text-slate-600 uppercase block mb-1.5">
                    Brzi izbor šablona režima:
                  </label>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <button
                      type="button"
                      onClick={() => {
                        const updated = {
                          ...portalSettings,
                          topBanner: {
                            ...portalSettings.topBanner,
                            tag: "ZIMSKI REŽIM",
                            title: "Zimski režim na Gradskom olimpijskom bazenu i raspored staza za građanstvo",
                            text: "Produženi rekreativni večernji termini, besprijekorno zagrijavanje vode i vazduha, te otvorene prijave za nove grupe škole plivanja."
                          }
                        };
                        setPortalSettings(updated);
                      }}
                      className="p-2 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-800 font-bold border border-sky-200 text-left transition"
                    >
                      ❄️ Zimski režim GOB
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        const updated = {
                          ...portalSettings,
                          topBanner: {
                            ...portalSettings.topBanner,
                            tag: "LJETNA SEZONA",
                            title: "Otvorena ljetna kupališna sezona na Vodenom parku Aquana!",
                            text: "Radno vrijeme otvorenih bazena od 10:00 do 19:00h. Tri bazena, tobogan, ležaljke i ugostiteljski sadržaji za sve generacije."
                          }
                        };
                        setPortalSettings(updated);
                      }}
                      className="p-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 font-bold border border-amber-200 text-left transition"
                    >
                      ☀️ Ljetna sezona Aquana
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        const updated = {
                          ...portalSettings,
                          topBanner: {
                            ...portalSettings.topBanner,
                            tag: "TEHNIČKI REMONT",
                            title: "Redovni godišnji remont i sanitarno održavanje Gradskog olimpijskog bazena",
                            text: "Kompletno pražnjenje bazena, dezinfekcija školjke i servisiranje filterskih postrojenja u cilju očuvanja najvišeg kvaliteta vode."
                          }
                        };
                        setPortalSettings(updated);
                      }}
                      className="p-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-800 font-bold border border-rose-200 text-left transition"
                    >
                      🔧 Tehnički remont bazena
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        const updated = {
                          ...portalSettings,
                          topBanner: {
                            ...portalSettings.topBanner,
                            tag: "VANREDNO OBAVJEŠTENJE",
                            title: "Važno obavještenje za građane i sportske klubove",
                            text: "Zbog održavanja međunarodnog plivačkog mitinga bazen će u subotu i nedjelju raditi po izmijenjenom rasporedu."
                          }
                        };
                        setPortalSettings(updated);
                      }}
                      className="p-2 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-800 font-bold border border-purple-200 text-left transition"
                    >
                      📢 Vanredno obavještenje
                    </button>
                  </div>
                </div>

                <div className="space-y-3 pt-1">
                  <div>
                    <label className="text-xs font-bold text-slate-700 uppercase block mb-1">Oznaka (Tag):</label>
                    <input
                      type="text"
                      value={portalSettings.topBanner.tag}
                      onChange={(e) =>
                        setPortalSettings({
                          ...portalSettings,
                          topBanner: { ...portalSettings.topBanner, tag: e.target.value }
                        })
                      }
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 bg-slate-50 font-bold"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 uppercase block mb-1">Glavni naslov:</label>
                    <input
                      type="text"
                      value={portalSettings.topBanner.title}
                      onChange={(e) =>
                        setPortalSettings({
                          ...portalSettings,
                          topBanner: { ...portalSettings.topBanner, title: e.target.value }
                        })
                      }
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 bg-slate-50 font-bold"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 uppercase block mb-1">Podnaslov / Opis teksta:</label>
                    <textarea
                      rows={2}
                      value={portalSettings.topBanner.text}
                      onChange={(e) =>
                        setPortalSettings({
                          ...portalSettings,
                          topBanner: { ...portalSettings.topBanner, text: e.target.value }
                        })
                      }
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 bg-slate-50 resize-none font-medium"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-xs font-bold text-slate-700 uppercase block mb-1">Tekst dugmeta:</label>
                      <input
                        type="text"
                        value={portalSettings.topBanner.buttonText}
                        onChange={(e) =>
                          setPortalSettings({
                            ...portalSettings,
                            topBanner: { ...portalSettings.topBanner, buttonText: e.target.value }
                          })
                        }
                        className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 bg-slate-50"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-700 uppercase block mb-1">Link dugmeta (URL):</label>
                      <input
                        type="text"
                        value={portalSettings.topBanner.buttonLink}
                        onChange={(e) =>
                          setPortalSettings({
                            ...portalSettings,
                            topBanner: { ...portalSettings.topBanner, buttonLink: e.target.value }
                          })
                        }
                        className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 bg-slate-50"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* CARD 2: FLASH PROMO AKCIJA & ODBROJAVANJE */}
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-rose-500 animate-pulse" />
                    <h4 className="font-black text-slate-900 text-base">Flash Promo Akcija & Odbrojavanje</h4>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const updated = {
                        ...portalSettings,
                        flashPromo: { ...portalSettings.flashPromo, isActive: !portalSettings.flashPromo.isActive }
                      };
                      setPortalSettings(updated);
                      savePortalSettings(updated);
                      setSettingsSuccess(true);
                      setTimeout(() => setSettingsSuccess(false), 3000);
                    }}
                    className={`px-3 py-1 rounded-full text-xs font-bold transition cursor-pointer ${
                      portalSettings.flashPromo.isActive
                        ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                        : "bg-slate-200 text-slate-700"
                    }`}
                  >
                    ● {portalSettings.flashPromo.isActive ? "Akcija Aktivna" : "Akcija Isključena"}
                  </button>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="text-xs font-bold text-slate-700 uppercase block mb-1">Glavna pogodnost (bedž):</label>
                    <input
                      type="text"
                      value={portalSettings.flashPromo.benefitBadge}
                      onChange={(e) =>
                        setPortalSettings({
                          ...portalSettings,
                          flashPromo: { ...portalSettings.flashPromo, benefitBadge: e.target.value }
                        })
                      }
                      placeholder="npr. 50 ULAZA + 5 KAFA"
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 bg-slate-50 font-bold text-amber-700"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 uppercase block mb-1">Naslov Flash ponude:</label>
                    <input
                      type="text"
                      value={portalSettings.flashPromo.title}
                      onChange={(e) =>
                        setPortalSettings({
                          ...portalSettings,
                          flashPromo: { ...portalSettings.flashPromo, title: e.target.value }
                        })
                      }
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 bg-slate-50 font-bold"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 uppercase block mb-1">Opis teksta za posjetioce:</label>
                    <textarea
                      rows={2}
                      value={portalSettings.flashPromo.description}
                      onChange={(e) =>
                        setPortalSettings({
                          ...portalSettings,
                          flashPromo: { ...portalSettings.flashPromo, description: e.target.value }
                        })
                      }
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 bg-slate-50 resize-none font-medium"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 uppercase block mb-1">
                      Datum i vrijeme do kada akcija važi (istek tajmera):
                    </label>
                    <input
                      type="text"
                      value={portalSettings.flashPromo.targetExpiry}
                      onChange={(e) =>
                        setPortalSettings({
                          ...portalSettings,
                          flashPromo: { ...portalSettings.flashPromo, targetExpiry: e.target.value }
                        })
                      }
                      placeholder="npr. 2026-11-30T23:59:59"
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 bg-slate-50 font-mono font-bold"
                    />
                    <span className="text-[10px] text-slate-500 mt-1 block">
                      Sat na sajtu u sekundi precizno odbrojava do unesenog datuma i vremena.
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* SAVE ALL SETTINGS BUTTON */}
            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={() => {
                  savePortalSettings(portalSettings);
                  setSettingsSuccess(true);
                  setTimeout(() => setSettingsSuccess(false), 4000);
                }}
                className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-sky-600 to-blue-700 hover:from-sky-500 hover:to-blue-600 text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-sky-600/30 transition hover:scale-[1.01] flex items-center gap-2 cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Sačuvaj sva podešavanja portala</span>
              </button>
            </div>
          </div>
        )}
'''

if "TAB 8: PORTAL SETTINGS" not in code:
    code = code.replace(
        '{/* MODAL 1: ADD USER (Superadmin only) */}',
        settings_view + '\n      {/* MODAL 1: ADD USER (Superadmin only) */}'
    )

with open(admin_path, "w", encoding="utf-8") as f:
    f.write(code)

print("Settings tab and content successfully added to admin page.tsx!")
