import re

path = "D:/Dev/AquanaWEB/src/components/Header.tsx"
with open(path, "r", encoding="utf-8") as f:
    c = f.read()

# Desktop buttons replacement
old_desk = re.search(r'<div className="hidden lg:flex items-center gap-3">[\s\S]*?</div>\s*(?=<button)', c)
if old_desk:
    new_desk = """<div className="hidden lg:flex items-center gap-2">
          {/* 1. Klub (Plavi tunel) */}
          <a
            href="https://klubovi.aquana.ba"
            target="_blank"
            rel="noopener noreferrer"
            title="Portal za plivačke i vaterpolo klubove"
            className="flex items-center gap-1.5 bg-sky-700 hover:bg-sky-800 text-white text-xs font-bold px-3 py-2 rounded-xl shadow-sm transition hover:scale-105"
          >
            <Users className="w-3.5 h-3.5 text-sky-200" />
            <span>{currentLang === "cir" ? "Клубови" : "Klubovi"}</span>
          </a>

          {/* 2. B2B (Plavi tunel) */}
          <a
            href="https://b2b.aquana.ba"
            target="_blank"
            rel="noopener noreferrer"
            title="B2B portal za pravna lica i sindikalna korištenja"
            className="flex items-center gap-1.5 bg-blue-900 hover:bg-blue-950 text-white text-xs font-bold px-3 py-2 rounded-xl shadow-sm transition hover:scale-105 border border-blue-700/50"
          >
            <Building2 className="w-3.5 h-3.5 text-blue-200" />
            <span>B2B</span>
          </a>

          {/* 3. WebShop / Karte (Narandžasto, veće dugme) */}
          <a
            href="https://shop.aquana.ba"
            target="_blank"
            rel="noopener noreferrer"
            title="Online kupovina karata i sezonskih propusnica"
            className="flex items-center gap-2 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-black text-xs sm:text-sm px-4 py-2.5 rounded-xl shadow-md shadow-orange-500/25 transition transform hover:scale-105 border border-amber-300/50"
          >
            <ShoppingCart className="w-4 h-4 text-slate-950 fill-current" />
            <span>{currentLang === "cir" ? "WebShop / Карте" : "WebShop / Karte"}</span>
          </a>
        </div>\n\n        """
    c = c[:old_desk.start()] + new_desk + c[old_desk.end():]
    print("Desktop 3 buttons injected")

# Mobile replacement
old_m = re.search(r'<a\s+href="https://klubovi\.aquana\.ba"[\s\S]*?</a>\s*(?=</div>\s*\)\})', c)
if old_m:
    new_m = """<div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
            <a
              href="https://shop.aquana.ba"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black text-xs py-2.5 px-4 rounded-xl shadow"
            >
              <ShoppingCart className="w-4 h-4 fill-current" />
              <span>{currentLang === "cir" ? "WebShop / Карте" : "WebShop / Karte"}</span>
            </a>
            <div className="grid grid-cols-2 gap-2">
              <a
                href="https://klubovi.aquana.ba"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-1.5 bg-sky-700 text-white font-bold text-xs py-2 px-3 rounded-xl shadow-sm"
              >
                <Users className="w-3.5 h-3.5" />
                <span>{currentLang === "cir" ? "Клубови" : "Klubovi"}</span>
              </a>
              <a
                href="https://b2b.aquana.ba"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-1.5 bg-blue-900 text-white font-bold text-xs py-2 px-3 rounded-xl shadow-sm"
              >
                <Building2 className="w-3.5 h-3.5" />
                <span>B2B</span>
              </a>
            </div>
          </div>\n        """
    c = c[:old_m.start()] + new_m + c[old_m.end():]
    print("Mobile 3 buttons injected")

with open(path, "w", encoding="utf-8") as f:
    f.write(c)

print("HEADER_3_BUTTONS_SUCCESS")
