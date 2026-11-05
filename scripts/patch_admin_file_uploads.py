with open("src/app/admin/page.tsx", "r", encoding="utf-8") as f:
    c = f.read()

# 1. Add states for banner file upload and tender file upload
state_target = 'const [newTenderFile, setNewTenderFile] = useState("");'
state_replacement = '''const [newTenderFile, setNewTenderFile] = useState("");
  const [newTenderFileSize, setNewTenderFileSize] = useState("");
  const [newBannerImageName, setNewBannerImageName] = useState("");
  const [newBannerImagePreview, setNewBannerImagePreview] = useState("");'''

if state_target in c:
    c = c.replace(state_target, state_replacement)
else:
    c = c.replace(state_target.replace('\n', '\r\n'), state_replacement.replace('\n', '\r\n'))

# 2. Upgrade Banner Modal with real Image Upload & Preview
old_banner_fields = """              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Web link klijenta (URL):</label>
                <input
                  type="url"
                  required
                  value={newBannerLink}
                  onChange={(e) => setNewBannerLink(e.target.value)}
                  placeholder="https://..."
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 bg-slate-50 focus:bg-white"
                />
              </div>"""

new_banner_fields = """              {/* UPLOAD BANER SLIKE */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Upload slike banera (JPG, PNG, GIF, WebP):
                </label>
                <div className="p-3.5 rounded-2xl border-2 border-dashed border-indigo-200 bg-indigo-50/50 hover:bg-indigo-50 transition text-center relative group">
                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/gif,image/webp"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setNewBannerImageName(file.name);
                        const reader = new FileReader();
                        reader.onload = (ev) => {
                          setNewBannerImagePreview(ev.target?.result as string);
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10"
                  />
                  {newBannerImagePreview ? (
                    <div className="space-y-2">
                      <img
                        src={newBannerImagePreview}
                        alt="Preview"
                        className="max-h-24 mx-auto rounded-lg shadow-sm border border-slate-200 object-contain"
                      />
                      <p className="text-[11px] font-mono text-indigo-700 font-bold">
                        ✓ {newBannerImageName} (kliknite za zamjenu)
                      </p>
                    </div>
                  ) : (
                    <div className="py-2 space-y-1">
                      <p className="text-xs font-bold text-indigo-900">
                        Kliknite ili prevucite sliku banera ovdje
                      </p>
                      <p className="text-[10px] text-slate-500 font-medium">
                        Preporučene dimenzije: {BANNER_SLOTS[newBannerPosition].dimensions}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Web link klijenta (URL):</label>
                <input
                  type="url"
                  required
                  value={newBannerLink}
                  onChange={(e) => setNewBannerLink(e.target.value)}
                  placeholder="https://..."
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 bg-slate-50 focus:bg-white font-mono"
                />
              </div>"""

if old_banner_fields in c:
    c = c.replace(old_banner_fields, new_banner_fields)
else:
    c = c.replace(old_banner_fields.replace('\n', '\r\n'), new_banner_fields.replace('\n', '\r\n'))

# 3. Upgrade Tender Modal with real PDF Upload
old_tender_file = """              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Naziv PDF dokumenta:</label>
                <input
                  type="text"
                  value={newTenderFile}
                  onChange={(e) => setNewTenderFile(e.target.value)}
                  placeholder="npr. Odluka-o-izboru-2026.pdf"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 bg-slate-50 font-mono"
                />
              </div>"""

new_tender_file = """              {/* UPLOAD PDF DOKUMENTA */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Upload zvaničnog PDF dokumenta:
                </label>
                <div className="p-4 rounded-2xl border-2 border-dashed border-emerald-300 bg-emerald-50/60 hover:bg-emerald-50 transition text-center relative group">
                  <input
                    type="file"
                    accept=".pdf,application/pdf"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setNewTenderFile(file.name);
                        const kb = Math.round(file.size / 1024);
                        setNewTenderFileSize(`${kb} KB`);
                      }
                    }}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10"
                  />
                  {newTenderFile ? (
                    <div className="flex items-center justify-center gap-3 py-1">
                      <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-black text-xs">
                        PDF
                      </div>
                      <div className="text-left">
                        <strong className="text-xs font-mono text-emerald-900 block truncate max-w-xs">
                          {newTenderFile}
                        </strong>
                        <span className="text-[10px] text-emerald-600 font-bold">
                          ✓ Spreman za objavu {newTenderFileSize ? `(${newTenderFileSize})` : ""}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="py-2 space-y-1">
                      <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-1">
                        📄
                      </div>
                      <p className="text-xs font-bold text-emerald-950">
                        Kliknite za odabir PDF dokumenta sa računara
                      </p>
                      <p className="text-[10px] text-slate-500 font-medium">
                        Odluka, tenderska dokumentacija ili obavještenje (.pdf)
                      </p>
                    </div>
                  )}
                </div>
              </div>"""

if old_tender_file in c:
    c = c.replace(old_tender_file, new_tender_file)
else:
    c = c.replace(old_tender_file.replace('\n', '\r\n'), new_tender_file.replace('\n', '\r\n'))

with open("src/app/admin/page.tsx", "w", encoding="utf-8") as f:
    f.write(c)

print("Admin modals for Tenders and Banners upgraded with real file uploads!")
