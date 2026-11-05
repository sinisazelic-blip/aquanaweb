"use client";

import React from "react";
import { Lang, translations, tr } from "@/lib/translations";
import { useLanguage } from "@/context/LanguageContext";
import { Waves, MapPin, Phone, Mail, Clock, ExternalLink, ShieldCheck, FileText, Droplet, Settings } from "lucide-react";
import Link from "next/link";

interface FooterProps {
  currentLang: Lang;
}

export default function Footer({ currentLang: propLang }: { currentLang?: Lang }) {
  const langCtx = useLanguage();
  const currentLang = propLang || langCtx.currentLang;
  const txt = (s: string) => tr(s, currentLang);
  const t = translations[currentLang].footer;

  return (
    <footer id="kontakt" className="bg-slate-950 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-800/80">
          {/* Col 1: Brand */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-sky-600 flex items-center justify-center text-white">
                <Waves className="w-6 h-6" />
              </div>
              <span className="font-black text-xl text-white tracking-tight">AQUANA</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              {currentLang === "cir"
                ? "Јавно предузеће „Аквана“ д.о.о. Бања Лука. Управљање воденим парком и Градским олимпијским базеном."
                : currentLang === "en"
                ? "Public Enterprise „Aquana“ Ltd. Banja Luka. Managing the municipal water park and FINA Olympic pool."
                : "Javno preduzeće „Aquana“ d.o.o. Banja Luka. Upravljanje vodenim parkom i Gradskim olimpijskim bazenom."}
            </p>
            <div className="text-[11px] text-slate-400 space-y-1.5 pt-2 border-t border-slate-800/80">
              <div>
                <p className="font-bold text-slate-300">{txt("JP „AQUANA“ d.o.o. Banja Luka")}</p>
                <p className="text-slate-500 font-mono">JIB: 4402636750000 • PIB: 402636750000</p>
              </div>
              <div>
                <p className="font-bold text-slate-300">{txt("Gradski olimpijski bazen (GOB)")}</p>
                <p className="text-slate-500">{txt("Objekat u javnom vlasništvu Grada Banja Luka (Upravlja JP „Aquana“)")}</p>
              </div>
            </div>
          </div>

          {/* Col 2: Locations */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              {currentLang === "cir" ? "Локације" : currentLang === "en" ? "Locations" : "Lokacije"}
            </h4>
            <div className="space-y-2.5 text-xs text-slate-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-sky-400 mt-0.5 shrink-0" />
                <div>
                  <strong className="text-slate-200 block">{txt("Gradski olimpijski bazen (GOB)")}</strong>
                  <span>{txt("Veljka Mlađenovića b.b, Banja Luka")}</span>
                  <span className="block text-slate-500 text-[11px] mt-0.5">{txt("Obezbijeđen besplatan parking za korisnike")}</span>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                <div>
                  <strong className="text-slate-200 block">{txt("Vodeni park Aquana")}</strong>
                  <span>{txt("Aleja Svetog Save 80, Banja Luka")}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Col 3: Contact */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              {currentLang === "cir" ? "Контакт и инфо" : currentLang === "en" ? "Contact & Info" : "Kontakt i info"}
            </h4>
            <div className="space-y-2 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-sky-400" />
                <span>{txt("Uprava / Centrala:")} +387 (0) 51 456 230</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-cyan-400" />
                <span>{txt("Recepcija GOB:")} +387 (0) 51 456 450</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-400" />
                <span>{txt("Obuka neplivača:")} +387 (0) 65 72 50 50</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-sky-400" />
                <span>info@aquana.ba</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-sky-400" />
                <span>{txt("06:00 – 22:00h (Svaki dan)")}</span>
              </div>
            </div>
          </div>

          {/* Col 4: Official & B2B */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              {currentLang === "cir" ? "Званични документи" : currentLang === "en" ? "Official Documents" : "Zvanični dokumenti"}
            </h4>
            <div className="space-y-2 text-xs text-slate-400">
              <Link href="/dokumenti" className="flex items-center gap-1.5 hover:text-white transition">
                <FileText className="w-3.5 h-3.5 text-cyan-400" />
                <span>Cjenovnici, nalazi vode i akti</span>
              </Link>
              <Link href="/javne-nabavke" className="flex items-center gap-1.5 hover:text-white transition">
                <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />
                <span>Javne nabavke (Tenderi)</span>
              </Link>
              
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4 border-t border-slate-800/60 mt-8">
          <p>© {new Date().getFullYear()} JP „Aquana“ d.o.o. Banja Luka. Sva prava zadržana.</p>
          
          {/* Powered by Fluxa - Discreet & Subtle */}
          <div className="flex items-center gap-1.5 text-slate-500">
            <span className="text-[10px] text-slate-500 font-normal">Powered by</span>
            <a
              href="https://fluxa.ba/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center transition opacity-45 hover:opacity-90"
              title="Fluxa IT - https://fluxa.ba/"
            >
              <img src="/firma/logo-light.png" alt="Fluxa" className="h-3 w-auto object-contain" />
            </a>
          </div>

          <p className="flex items-center gap-2">
            <span>JP Aquana • Grad Banja Luka</span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 font-bold text-[10px] border border-emerald-500/30">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              Sistem aktivan
            </span>
            <Link
              href="/admin"
              className="p-1.5 rounded-lg text-slate-500 hover:text-slate-200 hover:bg-slate-900 transition"
              title="Admin CMS Portal"
            >
              <Settings className="w-3.5 h-3.5" />
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}




