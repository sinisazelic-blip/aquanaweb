import os
os.chdir(r"D:\Dev\AquanaWEB")

with open("src/app/admin/page.tsx", "r", encoding="utf-8") as f:
    c = f.read()

telemetry_card = """            {/* 0. DNEVNE TEMPERATURE BAZENA (UNOS RECEPCIJA & ADMIN) */}
            <div className="bg-white rounded-3xl p-6 border-2 border-cyan-500/40 shadow-sm space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-100 text-cyan-700 flex items-center justify-center font-bold text-lg">
                    🌡️
                  </div>
                  <div>
                    <h3 className="font-black text-slate-900 text-base">
                      Dnevne temperature bazena (Telemetrija za posjetioce)
                    </h3>
                    <p className="text-xs text-slate-500">
                      Ručni unos temperatura vode i dvorane koji se u realnom vremenu prikazuje na početnoj stranici
                    </p>
                  </div>
                </div>
                <span className="text-xs font-mono font-bold text-cyan-700 bg-cyan-50 px-3 py-1 rounded-full border border-cyan-200 self-start sm:self-auto">
                  {portalSettings?.telemetry?.lastUpdated || "Danas u 07:00h"}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Temperatura vode */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <label className="text-xs font-bold text-slate-700 block uppercase">
                    💧 Temperatura vode (°C)
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="text"
                      value={portalSettings?.telemetry?.waterTemp || "26.8"}
                      onChange={(e) => {
                        if (!portalSettings) return;
                        const updated = {
                          ...portalSettings,
                          telemetry: {
                            ...(portalSettings.telemetry || {
                              airTemp: "28.5",
                              waterStatus: "FINA takmičarska norma",
                              airStatus: "Klimatizovana dvorana",
                              updatedBy: "Recepcija"
                            }),
                            waterTemp: e.target.value,
                            lastUpdated: `Danas u ${new Date().toLocaleTimeString("sr-RS", { hour: "2-digit", minute: "2-digit" })}h`,
                            updatedBy: currentUser.name || "Recepcija"
                          }
                        };
                        setPortalSettings(updated);
                        savePortalSettings(updated);
                      }}
                      className="w-32 px-3 py-2 rounded-xl bg-white border border-slate-300 font-black text-xl text-cyan-700 focus:outline-cyan-500"
                    />
                    <div className="text-xs text-slate-500">
                      <p className="font-bold text-slate-700">FINA takmičarska norma</p>
                      <p>Preporučeno: 26.5 – 27.2 °C</p>
                    </div>
                  </div>
                </div>

                {/* Temperatura vazduha / dvorane */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <label className="text-xs font-bold text-slate-700 block uppercase">
                    🌡️ Temperatura dvorane / vazduha (°C)
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="text"
                      value={portalSettings?.telemetry?.airTemp || "28.5"}
                      onChange={(e) => {
                        if (!portalSettings) return;
                        const updated = {
                          ...portalSettings,
                          telemetry: {
                            ...(portalSettings.telemetry || {
                              waterTemp: "26.8",
                              waterStatus: "FINA takmičarska norma",
                              airStatus: "Klimatizovana dvorana",
                              updatedBy: "Recepcija"
                            }),
                            airTemp: e.target.value,
                            lastUpdated: `Danas u ${new Date().toLocaleTimeString("sr-RS", { hour: "2-digit", minute: "2-digit" })}h`,
                            updatedBy: currentUser.name || "Recepcija"
                          }
                        };
                        setPortalSettings(updated);
                        savePortalSettings(updated);
                      }}
                      className="w-32 px-3 py-2 rounded-xl bg-white border border-slate-300 font-black text-xl text-amber-600 focus:outline-amber-500"
                    />
                    <div className="text-xs text-slate-500">
                      <p className="font-bold text-slate-700">Klimatizovana dvorana</p>
                      <p>Preporučeno: 28.0 – 29.0 °C</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
"""

# Insert inside activeTab === "settings"
target_settings = '{activeTab === "settings" && portalSettings && (\n          <div className="space-y-6">'
if target_settings in c:
    c = c.replace(target_settings, target_settings + "\n" + telemetry_card)
    print("Telemetry card added to settings tab!")

# Also insert inside activeTab === "reception"
target_reception = '{activeTab === "reception" && (\n          <div className="space-y-6">'
if target_reception in c:
    c = c.replace(target_reception, target_reception + "\n" + telemetry_card)
    print("Telemetry card added to reception tab!")

with open("src/app/admin/page.tsx", "w", encoding="utf-8") as f:
    f.write(c)
