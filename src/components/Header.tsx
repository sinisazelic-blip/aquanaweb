"use client";

import React, { useState } from "react";
import { Lang, translations } from "@/lib/translations";
import { Search, Menu, X, ShieldCheck, Phone, Facebook, Instagram, Youtube, FileText, Droplet, Tag, Newspaper } from "lucide-react";
import Link from "next/link";

interface HeaderProps {
  currentLang: Lang;
  setLang: (l: Lang) => void;
  onOpenSurvey: () => void;
  onOpenContact?: () => void;
  searchQuery?: string;
  setSearchQuery?: (q: string) => void;
}

export default function Header({ currentLang, setLang, onOpenSurvey, onOpenContact, searchQuery, setSearchQuery }: HeaderProps) {
  const t = translations[currentLang];
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="w-full bg-white border-b border-slate-200 sticky top-0 z-50 shadow-md">
      {/* 1. TOP UTILITY BAR (Full Width) */}
      <div className="w-full bg-gradient-to-r from-sky-700 via-sky-600 to-cyan-600 text-white text-xs font-semibold py-2 px-4 sm:px-8">
        <div className="w-full flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-4">
            <span className="flex items-center gap-1.5 bg-black/25 px-3 py-1 rounded-full text-[11px] uppercase tracking-wider backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              {currentLang === 'cir' ? 'ГОБ РАДИ:' : currentLang === 'en' ? 'POOL OPEN:' : 'GOB RADI:'} 06:00 – 22:00h
            </span>
            <span className="inline-flex items-center gap-1.5 text-sky-100">
              <Phone className="w-3.5 h-3.5 text-amber-300" />
              <span>Uprava: +387 (0) 51 456 230</span>
            </span>
            <span className="hidden md:inline-flex items-center gap-1.5 text-sky-100">
              <Phone className="w-3.5 h-3.5 text-cyan-300" />
              <span>Recepcija GOB: +387 (0) 51 456 450</span>
            </span>
            <span className="hidden lg:inline text-sky-100/90 text-xs">
              • Obuka neplivača: 065 72 50 50 • info@aquana.ba
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 pr-3 border-r border-white/20">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-6 h-6 rounded-full bg-white/20 hover:bg-white text-white hover:text-sky-600 flex items-center justify-center transition"
                title="Facebook"
              >
                <Facebook className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-6 h-6 rounded-full bg-white/20 hover:bg-white text-white hover:text-rose-600 flex items-center justify-center transition"
                title="Instagram"
              >
                <Instagram className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-6 h-6 rounded-full bg-white/20 hover:bg-white text-white hover:text-red-600 flex items-center justify-center transition"
                title="YouTube"
              >
                <Youtube className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="flex items-center bg-sky-950/40 rounded-full p-0.5 border border-white/25">
              <button
                onClick={() => setLang('cir')}
                className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold transition ${
                  currentLang === 'cir' ? 'bg-white text-sky-800 shadow-sm' : 'text-white hover:text-sky-100'
                }`}
              >
                ЋИР
              </button>
              <button
                onClick={() => setLang('lat')}
                className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold transition ${
                  currentLang === 'lat' ? 'bg-white text-sky-800 shadow-sm' : 'text-white hover:text-sky-100'
                }`}
              >
                LAT
              </button>
              <button
                onClick={() => setLang('en')}
                className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold transition ${
                  currentLang === 'en' ? 'bg-white text-sky-800 shadow-sm' : 'text-white hover:text-sky-100'
                }`}
              >
                EN
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. MAIN LOGO & NAVIGATION ROW */}
      <div className="w-full px-4 sm:px-8 py-3 flex items-center justify-between gap-6">
        <Link href="/" className="flex items-center gap-4 shrink-0 group">
          <img
            src="/images/logo.png"
            alt="Aquana Banja Luka"
            className="h-12 w-auto object-contain group-hover:scale-105 transition"
          />
        </Link>

        <nav className="hidden xl:flex items-center gap-5 font-bold text-xs tracking-wider text-slate-800 uppercase">
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
        </nav>

        <div className="hidden lg:flex items-center gap-3">
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
        </div>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="xl:hidden p-2 text-slate-700 hover:text-sky-600 rounded-lg"
        >
          {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-slate-200 bg-white px-6 py-4 space-y-3 shadow-2xl">
          <Link
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
          </a>
        </div>
      )}
    </header>
  );
}

