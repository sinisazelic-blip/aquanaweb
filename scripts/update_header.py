with open(r'D:\Dev\AquanaWEB\src\components\Header.tsx', 'r', encoding='utf-8') as f:
    text = f.read()

# Replace desktop nav
desktop_old = '''        <nav className="hidden xl:flex items-center gap-6 font-bold text-xs tracking-wider text-slate-800 uppercase">
          <Link href="/gob" className="hover:text-sky-600 transition flex items-center gap-1">
            Gradski bazen (GOB)
          </Link>
          <Link href="/vodeni-park" className="hover:text-sky-600 transition flex items-center gap-1">
            Vodeni park
          </Link>
          <Link href="/cjenovnik" className="hover:text-sky-600 transition flex items-center gap-1">
            <Tag className="w-3.5 h-3.5 text-amber-500" />
            <span>Cjenovnik</span>
          </Link>
          <Link href="/vijesti" className="hover:text-sky-600 transition flex items-center gap-1">
            <Newspaper className="w-3.5 h-3.5 text-sky-500" />
            <span>Vijesti</span>
          </Link>
          <Link
            href="/dokumenti"
            className="text-slate-700 hover:text-cyan-700 font-extrabold flex items-center gap-1 bg-slate-50 hover:bg-cyan-50 px-3 py-1.5 rounded-xl border border-slate-200 transition"
          >
            <FileText className="w-3.5 h-3.5 text-cyan-600" />
            <span>Dokumenti i nalazi</span>
          </Link>
          <Link
            href="/javne-nabavke"
            className="text-sky-800 hover:text-sky-950 font-extrabold flex items-center gap-1 bg-sky-50 px-3 py-1.5 rounded-xl border border-sky-200 transition"
          >
            <ShieldCheck className="w-4 h-4 text-sky-600" />
            <span>Javne nabavke</span>
          </Link>
          <button
            onClick={onOpenSurvey}
            className="text-amber-600 hover:text-amber-700 font-extrabold flex items-center gap-1 tracking-wide"
          >
            ★ {t.nav.survey}
          </button>
          <a href="#kontakt" className="hover:text-sky-600 transition">
            {t.nav.contact}
          </a>
        </nav>'''

desktop_new = '''        <nav className="hidden xl:flex items-center gap-5 font-bold text-xs tracking-wider text-slate-800 uppercase">
          <Link href="/gob" className="hover:text-sky-600 transition flex items-center gap-1">
            {t.nav.gob}
          </Link>
          <Link href="/vodeni-park" className="hover:text-sky-600 transition flex items-center gap-1">
            {t.nav.aquana}
          </Link>
          <Link href="/cjenovnik" className="hover:text-sky-600 transition flex items-center gap-1">
            <Tag className="w-3.5 h-3.5 text-amber-500" />
            <span>{t.nav.pricing}</span>
          </Link>
          <Link href="/vijesti" className="hover:text-sky-600 transition flex items-center gap-1">
            <Newspaper className="w-3.5 h-3.5 text-sky-500" />
            <span>{t.nav.news}</span>
          </Link>
          <Link
            href="/dokumenti"
            className="text-slate-700 hover:text-cyan-700 font-extrabold flex items-center gap-1 bg-slate-50 hover:bg-cyan-50 px-3 py-1.5 rounded-xl border border-slate-200 transition"
          >
            <FileText className="w-3.5 h-3.5 text-cyan-600" />
            <span>{t.nav.documents}</span>
          </Link>
          <Link
            href="/javne-nabavke"
            className="text-sky-800 hover:text-sky-950 font-extrabold flex items-center gap-1 bg-sky-50 px-3 py-1.5 rounded-xl border border-sky-200 transition"
          >
            <ShieldCheck className="w-4 h-4 text-sky-600" />
            <span>{t.nav.tenders}</span>
          </Link>
          <button
            onClick={onOpenSurvey}
            className="text-amber-600 hover:text-amber-700 font-extrabold flex items-center gap-1 tracking-wide cursor-pointer"
          >
            ★ {t.nav.survey}
          </button>
          <a href="#kontakt" className="hover:text-sky-600 transition">
            {t.nav.contact}
          </a>
        </nav>'''

# Replace B2B button
b2b_old = '''        <div className="hidden lg:flex items-center gap-3">
          <a
            href="#portal"
            className="flex items-center gap-2 bg-gradient-to-r from-sky-700 to-blue-800 hover:from-sky-800 hover:to-blue-900 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-md transition hover:scale-105"
          >
            <ShieldCheck className="w-4 h-4 text-cyan-300" />
            <span>B2B / Klubovi</span>
          </a>
        </div>'''

b2b_new = '''        <div className="hidden lg:flex items-center gap-3">
          <a
            href="https://klubovi.aquana.ba"
            target="_blank"
            rel="noopener noreferrer"
            title="EnterSYS B2B portal za sportske klubove"
            className="flex items-center gap-2 bg-gradient-to-r from-sky-700 to-blue-800 hover:from-sky-800 hover:to-blue-900 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-md transition hover:scale-105"
          >
            <ShieldCheck className="w-4 h-4 text-cyan-300" />
            <span>{t.nav.b2b}</span>
          </a>
        </div>'''

# Mobile menu
mobile_old = '''          <Link
            href="/gob"
            onClick={() => setMobileMenuOpen(false)}
            className="block font-bold text-slate-800 hover:text-sky-600 py-1"
          >
            Gradski olimpijski bazen (GOB)
          </Link>
          <Link
            href="/vodeni-park"
            onClick={() => setMobileMenuOpen(false)}
            className="block font-bold text-slate-800 hover:text-sky-600 py-1"
          >
            Vodeni park Aquana
          </Link>
          <Link
            href="/cjenovnik"
            onClick={() => setMobileMenuOpen(false)}
            className="block font-bold text-amber-600 hover:text-amber-700 py-1"
          >
            ★ Cjenovnik usluga i ulaznica
          </Link>
          <Link
            href="/vijesti"
            onClick={() => setMobileMenuOpen(false)}
            className="block font-bold text-slate-800 hover:text-sky-600 py-1"
          >
            Arhiva vijesti
          </Link>
          <Link
            href="/dokumenti"
            onClick={() => setMobileMenuOpen(false)}
            className="block font-extrabold text-cyan-800 hover:text-cyan-950 py-1"
          >
            ★ Dokumenti, cjenovnici i nalazi vode
          </Link>
          <Link
            href="/javne-nabavke"
            onClick={() => setMobileMenuOpen(false)}
            className="block font-extrabold text-sky-700 hover:text-sky-900 py-1"
          >
            ★ Javne nabavke (Tenderi)
          </Link>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenSurvey();
            }}
            className="block w-full text-left font-bold text-amber-600 py-1"
          >
            ★ {t.nav.survey}
          </button>
          <a
            href="#portal"
            onClick={() => setMobileMenuOpen(false)}
            className="block font-bold text-blue-700 py-1"
          >
            B2B / Klubovi
          </a>'''

mobile_new = '''          <Link
            href="/gob"
            onClick={() => setMobileMenuOpen(false)}
            className="block font-bold text-slate-800 hover:text-sky-600 py-1"
          >
            {t.nav.gob}
          </Link>
          <Link
            href="/vodeni-park"
            onClick={() => setMobileMenuOpen(false)}
            className="block font-bold text-slate-800 hover:text-sky-600 py-1"
          >
            {t.nav.aquana}
          </Link>
          <Link
            href="/cjenovnik"
            onClick={() => setMobileMenuOpen(false)}
            className="block font-bold text-amber-600 hover:text-amber-700 py-1"
          >
            ★ {t.nav.pricing}
          </Link>
          <Link
            href="/vijesti"
            onClick={() => setMobileMenuOpen(false)}
            className="block font-bold text-slate-800 hover:text-sky-600 py-1"
          >
            {t.nav.news}
          </Link>
          <Link
            href="/dokumenti"
            onClick={() => setMobileMenuOpen(false)}
            className="block font-extrabold text-cyan-800 hover:text-cyan-950 py-1"
          >
            ★ {t.nav.documents}
          </Link>
          <Link
            href="/javne-nabavke"
            onClick={() => setMobileMenuOpen(false)}
            className="block font-extrabold text-sky-700 hover:text-sky-900 py-1"
          >
            ★ {t.nav.tenders}
          </Link>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenSurvey();
            }}
            className="block w-full text-left font-bold text-amber-600 py-1 cursor-pointer"
          >
            ★ {t.nav.survey}
          </button>
          <a
            href="https://klubovi.aquana.ba"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileMenuOpen(false)}
            className="block font-bold text-blue-700 py-1"
          >
            {t.nav.b2b}
          </a>'''

text = text.replace('\r\n', '\n')
desktop_old = desktop_old.replace('\r\n', '\n')
desktop_new = desktop_new.replace('\r\n', '\n')
b2b_old = b2b_old.replace('\r\n', '\n')
b2b_new = b2b_new.replace('\r\n', '\n')
mobile_old = mobile_old.replace('\r\n', '\n')
mobile_new = mobile_new.replace('\r\n', '\n')

text = text.replace(desktop_old, desktop_new).replace(b2b_old, b2b_new).replace(mobile_old, mobile_new)

with open(r'D:\Dev\AquanaWEB\src\components\Header.tsx', 'w', encoding='utf-8') as f:
    f.write(text)

print("Header.tsx updated with full multilingual and B2B tunnel link!")
