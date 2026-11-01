"use client";

import React from "react";
import { Lang, translations } from "@/lib/translations";
import { Waves, MapPin, Phone, Mail, Clock, ExternalLink, ShieldCheck, FileText, Droplet } from "lucide-react";
import Link from "next/link";

interface FooterProps {
  currentLang: Lang;
}

export default function Footer({ currentLang }: FooterProps) {
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
            <div className="text-[11px] text-slate-500 space-y-0.5">
              <p>JIB: 4402636750000</p>
              <p>PIB: 402636750000</p>
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
                  <strong className="text-slate-200 block">Gradski olimpijski bazen (GOB)</strong>
                  <span>Veljka Mlađenovića b.b, Banja Luka</span>
                  <span className="block text-slate-500 text-[11px] mt-0.5">Obezbijeđen besplatan parking za korisnike</span>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                <div>
                  <strong className="text-slate-200 block">Vodeni park Aquana</strong>
                  <span>Aleja Svetog Save 80, Banja Luka</span>
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
                <span>Uprava / Centrala: +387 (0) 51 456 230</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-cyan-400" />
                <span>Recepcija GOB: +387 (0) 51 456 450</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-400" />
                <span>Obuka neplivača: +387 (0) 65 72 50 50</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-sky-400" />
                <span>info@aquana.ba</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-sky-400" />
                <span>06:00 – 22:00h (Svaki dan)</span>
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
              <a href="#portal" className="flex items-center gap-1.5 hover:text-cyan-300 transition text-sky-400 font-bold pt-2">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>B2B Portal za klubove</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} JP „Aquana“ d.o.o. Banja Luka. Sva prava zadržana.</p>
          <p className="flex items-center gap-2">
            <span>JP Aquana • Grad Banja Luka</span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 font-bold text-[10px] border border-emerald-500/30">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              Sistem aktivan
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
