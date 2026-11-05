path = "D:/Dev/AquanaWEB/src/components/Header.tsx"
with open(path, "r", encoding="utf-8") as f:
    c = f.read()

# Make sure imports include Users, Building2, ShoppingCart
if "Users" not in c:
    c = c.replace(
        'import { Search, Menu, X, ShieldCheck, Phone, Facebook, Instagram, Youtube, FileText, Droplet, Tag, Newspaper, Mail } from "lucide-react";',
        'import { Search, Menu, X, ShieldCheck, Phone, Facebook, Instagram, Youtube, FileText, Droplet, Tag, Newspaper, Mail, Users, Building2, ShoppingCart } from "lucide-react";'
    )

# Normalize line endings for replacement
is_crlf = "\r\n" in c
c_norm = c.replace("\r\n", "\n")

desk_old = """        <div className="hidden lg:flex items-center gap-3">
          <a
            href="https://klubovi.aquana.ba"
            target="_blank"
            rel="noopener noreferrer"
            title="B2B portal za sportske klubove"
            className="flex items-center gap-2 bg-gradient-to-r from-sky-700 to-blue-800 hover:from-sky-800 hover:to-blue-900 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-md transition hover:scale-105"
          >
            <ShieldCheck className="w-4 h-4 text-cyan-300" />
            <span>{t.nav.b2b}</span>
          </a>
        </div>"""

desk_new = """        <div className="hidden lg:flex items-center gap-2">
          {/* 1. Klub (Plavi tunel: klubovi.aquana.ba) */}
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

          {/* 2. B2B (Plavi tunel: b2b.aquana.ba) */}
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

          {/* 3. WebShop / Karte (Narandžasto, veće dugme: shop.aquana.ba) */}
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
        </div>"""

mob_old = """          <a
            href="https://klubovi.aquana.ba"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileMenuOpen(false)}
            className="block font-bold text-blue-700 py-1"
          >
            {t.nav.b2b}
          </a>"""

mob_new = """          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
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
          </div>"""

if desk_old in c_norm:
    c_norm = c_norm.replace(desk_old, desk_new)
    print("Desk replaced successfully")
else:
    print("Desk NOT matched")

if mob_old in c_norm:
    c_norm = c_norm.replace(mob_old, mob_new)
    print("Mob replaced successfully")
else:
    print("Mob NOT matched")

if is_crlf:
    c_norm = c_norm.replace("\n", "\r\n")

with open(path, "w", encoding="utf-8") as f:
    f.write(c_norm)

print("HEADER_PATCH_DONE")
