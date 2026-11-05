import re

header_path = r"D:\Dev\AquanaWEB\src\components\Header.tsx"
with open(header_path, "r", encoding="utf-8") as f:
    h = f.read()

# 1. Desktop Nav: remove pills, uniform typography, black font, uppercase
new_nav = '''<nav className="hidden xl:flex items-center gap-5 font-bold text-xs tracking-wider text-slate-800 uppercase">
          <Link href="/gob" className="hover:text-sky-600 transition flex items-center gap-1.5">
            {t.nav.gob}
          </Link>
          <Link href="/vodeni-park" className="hover:text-sky-600 transition flex items-center gap-1.5">
            {t.nav.aquana}
          </Link>
          <Link href="/cjenovnik" className="hover:text-sky-600 transition flex items-center gap-1.5">
            <Tag className="w-3.5 h-3.5 text-amber-500" />
            <span>{t.nav.pricing}</span>
          </Link>
          <Link href="/vijesti" className="hover:text-sky-600 transition flex items-center gap-1.5">
            <Newspaper className="w-3.5 h-3.5 text-sky-500" />
            <span>{t.nav.news}</span>
          </Link>
          <Link href="/dokumenti" className="hover:text-sky-600 transition flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5 text-cyan-600" />
            <span>{t.nav.documents}</span>
          </Link>
          <Link href="/javne-nabavke" className="hover:text-sky-600 transition flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-sky-600" />
            <span>{t.nav.tenders}</span>
          </Link>
          <button
            onClick={onOpenSurvey}
            className="hover:text-sky-600 transition flex items-center gap-1.5 cursor-pointer uppercase font-bold text-xs tracking-wider text-slate-800"
          >
            <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            <span>{currentLang === "cir" ? "?????? ???????" : "ANKETA GRA?ANA"}</span>
          </button>
          <button
            onClick={onOpenContact}
            className="hover:text-sky-600 transition flex items-center gap-1.5 cursor-pointer uppercase font-bold text-xs tracking-wider text-slate-800"
          >
            {t.nav.contact}
          </button>
        </nav>'''

h = re.sub(r'<nav className="hidden xl:flex items-center gap-5[^"]*">[\s\S]*?</nav>', new_nav, h)

# 2. Right tunnel buttons
old_buttons_regex = r'<div className="hidden lg:flex items-center gap-2">[\s\S]*?</div>(\s*<button\s+onClick=\{\(\) => setMobileMenuOpen)'

def replace_buttons(m):
    tail = m.group(1)
    return '''<div className="hidden lg:flex items-center gap-2">
          {/* 1. Klub (Plavi tunel: klubovi.aquana.ba) */}
          <a
            href="https://klubovi.aquana.ba"
            target="_blank"
            rel="noopener noreferrer"
            title="Portal za pliva?ke i vaterpolo klubove"
            className="h-10 w-28 justify-center flex items-center gap-1.5 bg-blue-800 hover:bg-blue-900 text-white text-xs font-bold rounded-xl shadow-sm transition hover:scale-105 border border-blue-700/60"
          >
            <Users className="w-3.5 h-3.5 text-blue-200" />
            <span>{currentLang === "cir" ? "????" : "Klub"}</span>
          </a>

          {/* 2. B2B (Plavi tunel: b2b.aquana.ba - IDENTI?NE ?IRINE, VISINE I BOJE KAO KLUB) */}
          <a
            href="https://b2b.aquana.ba"
            target="_blank"
            rel="noopener noreferrer"
            title="B2B portal za pravna lica i sindikalna kori?tenja"
            className="h-10 w-28 justify-center flex items-center gap-1.5 bg-blue-800 hover:bg-blue-900 text-white text-xs font-bold rounded-xl shadow-sm transition hover:scale-105 border border-blue-700/60"
          >
            <Building2 className="w-3.5 h-3.5 text-blue-200" />
            <span>B2B</span>
          </a>

          {/* 3. WebShop / Karte (Narand?asto, ?IRE dugme, IDENTI?NE VISINE h-10: shop.aquana.ba) */}
          <a
            href="https://karte.aquana.ba"
            target="_blank"
            rel="noopener noreferrer"
            title="Online kupovina karata i sezonskih propusnica"
            className="h-10 w-44 justify-center flex items-center gap-2 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-black text-xs sm:text-sm rounded-xl shadow-md shadow-orange-500/25 transition transform hover:scale-105 border border-amber-300/50"
          >
            <ShoppingCart className="w-4 h-4 text-slate-950 fill-current" />
            <span>{currentLang === "cir" ? "WebShop / ?????" : "WebShop / Karte"}</span>
          </a>
        </div>''' + tail

h = re.sub(old_buttons_regex, replace_buttons, h)

# 3. Mobile menu: rename "???????" / "Klubovi" -> "????" / "Klub"
h = h.replace('currentLang === "cir" ? "???????" : "Klubovi"', 'currentLang === "cir" ? "????" : "Klub"')
h = h.replace('bg-sky-700 text-white font-bold text-xs py-2 px-3 rounded-xl shadow-sm', 'bg-blue-800 text-white font-bold text-xs py-2 px-3 rounded-xl shadow-sm')

with open(header_path, "w", encoding="utf-8") as f:
    f.write(h)

print("Header.tsx written successfully")

# 4. Footer: remove B2B Portal za klubove
footer_path = r"D:\Dev\AquanaWEB\src\components\Footer.tsx"
with open(footer_path, "r", encoding="utf-8") as f:
    foot = f.read()

foot = re.sub(r'<a\s+href="#portal"\s+className="[^"]*">\s*<ShieldCheck[^>]*/>\s*<span>B2B Portal za klubove</span>\s*<ExternalLink[^>]*/>\s*</a>', '', foot)

with open(footer_path, "w", encoding="utf-8") as f:
    f.write(foot)

print("Footer.tsx written successfully")
