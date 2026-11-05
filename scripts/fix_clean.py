import re

# 1. Fix Header.tsx
with open(r"D:\Dev\AquanaWEB\src\components\Header.tsx", "r", encoding="utf-8") as f:
    h = f.read()

# Add Star to lucide-react import
h = h.replace("Newspaper, Mail,", "Newspaper, Mail, Star,")

# Navigation block
old_nav = re.search(r'<nav className="hidden xl:flex items-center gap-5[^"]*">[\s\S]*?</nav>', h).group(0)
new_nav = '''<nav className="hidden xl:flex items-center gap-5 text-xs tracking-wider text-slate-800 uppercase font-semibold">
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
            className="hover:text-sky-600 transition flex items-center gap-1.5 cursor-pointer uppercase text-xs tracking-wider text-slate-800 font-semibold"
          >
            <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            <span>{currentLang === "cir" ? "\u0410\u041d\u041a\u0415\u0422\u0410 \u0413\u0420\u0410\u0402\u0410\u041d\u0410" : "ANKETA GRA\u0110ANA"}</span>
          </button>
          <button
            onClick={onOpenContact}
            className="hover:text-sky-600 transition flex items-center gap-1.5 cursor-pointer uppercase text-xs tracking-wider text-slate-800 font-semibold"
          >
            {t.nav.contact}
          </button>
        </nav>'''

h = h.replace(old_nav, new_nav)

# Buttons block
old_btns = re.search(r'<div className="hidden lg:flex items-center gap-2">[\s\S]*?</div>(\s*<button\s+onClick=\{\(\) => setMobileMenuOpen)', h).group(0)
new_btns = '''<div className="hidden lg:flex items-center gap-2">
          {/* 1. Klub (Plavi tunel: klubovi.aquana.ba - IDENTI?NE VISINE h-10 I ?IRINE w-28 KAO B2B) */}
          <a
            href="https://klubovi.aquana.ba"
            target="_blank"
            rel="noopener noreferrer"
            title="Portal za pliva?ke i vaterpolo klubove"
            className="h-10 w-28 justify-center flex items-center gap-1.5 bg-blue-800 hover:bg-blue-900 text-white text-xs font-bold rounded-xl shadow-sm transition hover:scale-105 border border-blue-700/60"
          >
            <Users className="w-3.5 h-3.5 text-blue-200" />
            <span>{currentLang === "cir" ? "\u041a\u043b\u0443\u0431" : "Klub"}</span>
          </a>

          {/* 2. B2B (Plavi tunel: b2b.aquana.ba - IDENTI?NE VISINE h-10 I ?IRINE w-28 KAO KLUB) */}
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

          {/* 3. WebShop / Karte (Narand?asto, IDENTI?NE VISINE h-10, ?IRE w-44) */}
          <a
            href="https://karte.aquana.ba"
            target="_blank"
            rel="noopener noreferrer"
            title="Online kupovina karata i sezonskih propusnica"
            className="h-10 w-44 justify-center flex items-center gap-2 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-black text-xs sm:text-sm rounded-xl shadow-md shadow-orange-500/25 transition transform hover:scale-105 border border-amber-300/50"
          >
            <ShoppingCart className="w-4 h-4 text-slate-950 fill-current" />
            <span>{currentLang === "cir" ? "WebShop / \u041a\u0430\u0440\u0442\u0435" : "WebShop / Karte"}</span>
          </a>
        </div>
        <button
          onClick={() => setMobileMenuOpen'''

h = h.replace(old_btns, new_btns)

# Mobile menu: Klubovi -> Klub
h = h.replace('currentLang === "cir" ? "???????" : "Klubovi"', 'currentLang === "cir" ? "\u041a\u043b\u0443\u0431" : "Klub"')
h = h.replace('currentLang === "cir" ? "????" : "Klub"', 'currentLang === "cir" ? "\u041a\u043b\u0443\u0431" : "Klub"')
h = h.replace('bg-sky-700 text-white font-bold text-xs py-2 px-3 rounded-xl shadow-sm', 'bg-blue-800 text-white font-bold text-xs py-2 px-3 rounded-xl shadow-sm')

with open(r"D:\Dev\AquanaWEB\src\components\Header.tsx", "w", encoding="utf-8") as f:
    f.write(h)

print("Header.tsx clean!")

# 2. Fix Footer.tsx: connect link to https://klubovi.aquana.ba
with open(r"D:\Dev\AquanaWEB\src\components\Footer.tsx", "r", encoding="utf-8") as f:
    foot = f.read()

foot = re.sub(
    r'<a\s+href="[^"]*"\s+className="[^"]*">\s*<ShieldCheck[^>]*/>\s*<span>B2B Portal za klubove</span>\s*<ExternalLink[^>]*/>\s*</a>',
    '<a href="https://klubovi.aquana.ba" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-cyan-300 transition text-sky-400 font-bold pt-2">\n                <ShieldCheck className="w-3.5 h-3.5" />\n                <span>Portal za klubove</span>\n                <ExternalLink className="w-3 h-3" />\n              </a>',
    foot
)

with open(r"D:\Dev\AquanaWEB\src\components\Footer.tsx", "w", encoding="utf-8") as f:
    f.write(foot)

print("Footer.tsx clean!")
