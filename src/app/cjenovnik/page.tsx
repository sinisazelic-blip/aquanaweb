"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  Tag,
  Download,
  ShieldCheck,
  FileText,
  Clock,
  Sparkles,
  Waves,
  Sun,
  CheckCircle2,
  ArrowRight,
  Info,
  Eye
} from "lucide-react";
import Link from "next/link";

export default function CjenovnikPage() {
  const [currentLang, setCurrentLang] = useState<any>("lat");
  const [activeTab, setActiveTab] = useState<"gob" | "aquana">("gob");

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      <Header
        currentLang={currentLang}
        setLang={setCurrentLang}
        onOpenSurvey={() => {}}
      />

      {/* Hero Bar */}
      <section className="bg-slate-900 text-white py-12 px-4 sm:px-8 border-b-4 border-sky-600">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-sky-400 uppercase tracking-widest">
              <Tag className="w-4 h-4" />
              <span>ZVANIČNE TARIFE I CJENOVNICI</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
              Cjenovnik usluga i ulaznica
            </h1>
            <p className="text-slate-400 text-sm max-w-xl">
              Transparentan prikaz svih tarifa za Gradski olimpijski bazen i Vodeni park Aquana. Sve cijene su izražene u KM sa uračunatim PDV-om.
            </p>
          </div>

          <Link
            href="/dokumenti"
            className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-bold flex items-center gap-2 transition"
          >
            <Download className="w-4 h-4 text-cyan-400" />
            <span>Preuzmi ovjeren PDF cjenovnik</span>
          </Link>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-8 py-10 space-y-8">
        {/* Tab Selection */}
        <div className="flex border-b border-slate-200">
          <button
            onClick={() => setActiveTab("gob")}
            className={`pb-4 px-6 text-sm font-black uppercase tracking-wider flex items-center gap-2 border-b-2 transition ${
              activeTab === "gob"
                ? "border-sky-600 text-sky-700"
                : "border-transparent text-slate-500 hover:text-slate-900"
            }`}
          >
            <Waves className="w-4 h-4" />
            <span>Gradski olimpijski bazen (GOB)</span>
          </button>

          <button
            onClick={() => setActiveTab("aquana")}
            className={`pb-4 px-6 text-sm font-black uppercase tracking-wider flex items-center gap-2 border-b-2 transition ${
              activeTab === "aquana"
                ? "border-amber-500 text-amber-700"
                : "border-transparent text-slate-500 hover:text-slate-900"
            }`}
          >
            <Sun className="w-4 h-4" />
            <span>Vodeni park Aquana (Ljetna sezona)</span>
          </button>
        </div>

        {/* Tab Content: GOB */}
        {activeTab === "gob" && (
          <div className="space-y-6">
            <div className="p-4 rounded-2xl bg-sky-50 border border-sky-200 text-xs text-slate-700 flex items-start gap-3">
              <Info className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900 block font-bold">Informacije o radnom vremenu:</strong>
                <span>Gradski olimpijski bazen radi svakog radnog dana od 06:00 do 22:00h, a vikendom od 07:00 do 22:00h. Kupovina karata se vrši na recepciji GOB-a ili putem elektronske evidencije.</span>
              </div>
            </div>

            {/* Zvanični cjenovnik propisan Odlukom Gradonačelnika Grada Banja Luka */}
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-blue-950 via-sky-950 to-slate-950 text-white shadow-xl border border-sky-400/40 flex flex-col lg:flex-row items-center justify-between gap-6 relative overflow-hidden">
              <div className="absolute -right-10 -bottom-10 w-60 h-60 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
              
              <div className="space-y-2 text-center lg:text-left z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-400/20 text-sky-300 text-xs font-bold border border-sky-400/30 uppercase tracking-wider">
                  <ShieldCheck className="w-4 h-4 text-cyan-300" />
                  <span>ODLUKA GRADONAČELNIKA GRADA BANJA LUKA</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white">
                  Zvanični cjenovnik usluga GOB-a propisan od strane Grada Banja Luka
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                  Kao vlasnik sportskog objekta Gradskog olimpijskog bazena, Grad Banja Luka i Gradonačelnik zvanično propisuju tarifu za rekreativce, plivačke i vaterpolo klubove, te povlaštene kategorije građana.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 z-10 w-full sm:w-auto justify-center">
                <a
                  href="/dokumenti/Zvanicni-cjenovnik-usluga-GOB-2024.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-gradient-to-r from-cyan-400 to-sky-500 hover:from-cyan-300 hover:to-sky-400 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition hover:scale-105"
                >
                  <Eye className="w-4 h-4" />
                  <span>Pogledaj potpisani cjenovnik (PDF)</span>
                </a>
                <a
                  href="/dokumenti/Zvanicni-cjenovnik-usluga-GOB-2024.pdf"
                  download="Zvanicni-cjenovnik-usluga-GOB-2024.pdf"
                  className="w-full sm:w-auto px-4 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition"
                >
                  <Download className="w-4 h-4" />
                  <span>Preuzmi</span>
                </a>
              </div>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-100 border-b border-slate-200 text-xs font-black text-slate-700 uppercase tracking-wider">
                    <th className="py-4 px-6">Usluga / Kategorija ulaznice</th>
                    <th className="py-4 px-6 w-48">Vrijeme / Uslov</th>
                    <th className="py-4 px-6 w-40 text-right">Cijena (sa PDV)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-sm">
                  <tr className="hover:bg-sky-50/50 transition">
                    <td className="py-4 px-6">
                      <strong className="text-slate-900 block">Jutarnji termin (Happy Hour)</strong>
                      <span className="text-xs text-slate-500">Pojedinačna ulaznica za jutarnje plivanje</span>
                    </td>
                    <td className="py-4 px-6 text-xs text-slate-600 font-semibold">06:00 – 08:00h</td>
                    <td className="py-4 px-6 text-right font-black text-sky-700 text-base">3.50 KM</td>
                  </tr>
                  <tr className="hover:bg-sky-50/50 transition">
                    <td className="py-4 px-6">
                      <strong className="text-slate-900 block">Dnevna rekreativna ulaznica za građanstvo</strong>
                      <span className="text-xs text-slate-500">Redovni rekreativni termini za odrasle</span>
                    </td>
                    <td className="py-4 px-6 text-xs text-slate-600 font-semibold">08:00 – 22:00h</td>
                    <td className="py-4 px-6 text-right font-black text-sky-700 text-base">5.00 KM</td>
                  </tr>
                  <tr className="hover:bg-sky-50/50 transition">
                    <td className="py-4 px-6">
                      <strong className="text-slate-900 block">Povlaštena ulaznica (Djeca do 7 god, penzioneri, invalidna lica)</strong>
                      <span className="text-xs text-slate-500">Uz predočenje odgovarajućeg dokumenta</span>
                    </td>
                    <td className="py-4 px-6 text-xs text-slate-600 font-semibold">Svi termini</td>
                    <td className="py-4 px-6 text-right font-black text-emerald-700 text-base">3.00 KM</td>
                  </tr>
                  <tr className="hover:bg-sky-50/50 transition">
                    <td className="py-4 px-6">
                      <strong className="text-slate-900 block">Mjesečna karta – Paket 10 ulazaka</strong>
                      <span className="text-xs text-slate-500">Važi 30 dana od dana aktivacije</span>
                    </td>
                    <td className="py-4 px-6 text-xs text-slate-600 font-semibold">Mjesec dana</td>
                    <td className="py-4 px-6 text-right font-black text-slate-900 text-base">40.00 KM</td>
                  </tr>
                  <tr className="hover:bg-sky-50/50 transition">
                    <td className="py-4 px-6">
                      <strong className="text-slate-900 block">Mjesečna karta – Paket 20 ulazaka</strong>
                      <span className="text-xs text-slate-500">Važi 30 dana od dana aktivacije</span>
                    </td>
                    <td className="py-4 px-6 text-xs text-slate-600 font-semibold">Mjesec dana</td>
                    <td className="py-4 px-6 text-right font-black text-slate-900 text-base">70.00 KM</td>
                  </tr>
                  <tr className="hover:bg-sky-50/50 transition">
                    <td className="py-4 px-6">
                      <strong className="text-slate-900 block">Mjesečna neograničena propusnica</strong>
                      <span className="text-xs text-slate-500">Neograničen broj ulazaka u radno vrijeme za građanstvo</span>
                    </td>
                    <td className="py-4 px-6 text-xs text-slate-600 font-semibold">30 dana</td>
                    <td className="py-4 px-6 text-right font-black text-slate-900 text-base">90.00 KM</td>
                  </tr>
                  <tr className="hover:bg-sky-50/50 transition">
                    <td className="py-4 px-6">
                      <strong className="text-slate-900 block">Polugodišnja propusnica za građanstvo</strong>
                      <span className="text-xs text-slate-500">Važi 6 mjeseci od dana izdavanja</span>
                    </td>
                    <td className="py-4 px-6 text-xs text-slate-600 font-semibold">6 mjeseci</td>
                    <td className="py-4 px-6 text-right font-black text-slate-900 text-base">450.00 KM</td>
                  </tr>
                  <tr className="hover:bg-sky-50/50 transition">
                    <td className="py-4 px-6">
                      <strong className="text-slate-900 block">Godišnja propusnica za građanstvo</strong>
                      <span className="text-xs text-slate-500">Važi 12 mjeseci od dana izdavanja</span>
                    </td>
                    <td className="py-4 px-6 text-xs text-slate-600 font-semibold">12 mjeseci</td>
                    <td className="py-4 px-6 text-right font-black text-slate-900 text-base">800.00 KM</td>
                  </tr>
                  <tr className="hover:bg-sky-50/50 transition">
                    <td className="py-4 px-6">
                      <strong className="text-slate-900 block">Škola plivanja – Osnovni kurs (12 časova)</strong>
                      <span className="text-xs text-slate-500">Obuka neplivača uz profesore sporta (065 72 50 50)</span>
                    </td>
                    <td className="py-4 px-6 text-xs text-slate-600 font-semibold">12 časova</td>
                    <td className="py-4 px-6 text-right font-black text-amber-700 text-base">70.00 KM</td>
                  </tr>
                  <tr className="hover:bg-sky-50/50 transition">
                    <td className="py-4 px-6">
                      <strong className="text-slate-900 block">Zakup staze za plivačke klubove i pravna lica</strong>
                      <span className="text-xs text-slate-500">Olimpijski bazen 50m (po stazi / sat vremena)</span>
                    </td>
                    <td className="py-4 px-6 text-xs text-slate-600 font-semibold">1 sat / 1 staza</td>
                    <td className="py-4 px-6 text-right font-black text-slate-900 text-base">40.00 KM</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab Content: VODENI PARK */}
        {activeTab === "aquana" && (
          <div className="space-y-6">
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-slate-700 flex items-start gap-3">
              <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900 block font-bold">Ljetna sezona – Radno vrijeme:</strong>
                <span>Vodeni park Aquana tokom sezone radi svakog dana od 10:00 do 19:00 časova. Ulaznice se kupuju na biletarnicama na ulazu ili putem B2B narudžbenica.</span>
              </div>
            </div>

            {/* Zvanični cjenovnik propisan Odlukom Gradonačelnika Grada Banja Luka */}
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-blue-950 via-sky-950 to-slate-950 text-white shadow-xl border border-sky-400/40 flex flex-col lg:flex-row items-center justify-between gap-6 relative overflow-hidden">
              <div className="absolute -right-10 -bottom-10 w-60 h-60 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
              
              <div className="space-y-2 text-center lg:text-left z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-400/20 text-sky-300 text-xs font-bold border border-sky-400/30 uppercase tracking-wider">
                  <ShieldCheck className="w-4 h-4 text-cyan-300" />
                  <span>ODLUKA GRADONAČELNIKA GRADA BANJA LUKA</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white">
                  Zvanični cjenovnik usluga GOB-a propisan od strane Grada Banja Luka
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                  Kao vlasnik sportskog objekta Gradskog olimpijskog bazena, Grad Banja Luka i Gradonačelnik zvanično propisuju tarifu za rekreativce, plivačke i vaterpolo klubove, te povlaštene kategorije građana.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 z-10 w-full sm:w-auto justify-center">
                <a
                  href="/dokumenti/Zvanicni-cjenovnik-usluga-GOB-2024.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-gradient-to-r from-cyan-400 to-sky-500 hover:from-cyan-300 hover:to-sky-400 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition hover:scale-105"
                >
                  <Eye className="w-4 h-4" />
                  <span>Pogledaj potpisani cjenovnik (PDF)</span>
                </a>
                <a
                  href="/dokumenti/Zvanicni-cjenovnik-usluga-GOB-2024.pdf"
                  download="Zvanicni-cjenovnik-usluga-GOB-2024.pdf"
                  className="w-full sm:w-auto px-4 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition"
                >
                  <Download className="w-4 h-4" />
                  <span>Preuzmi</span>
                </a>
              </div>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-100 border-b border-slate-200 text-xs font-black text-slate-700 uppercase tracking-wider">
                    <th className="py-4 px-6">Kategorija ulaznice / Paket</th>
                    <th className="py-4 px-6 w-48">Vrijeme ulaska</th>
                    <th className="py-4 px-6 w-40 text-right">Cijena (sa PDV)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-sm">
                  <tr className="hover:bg-amber-50/50 transition">
                    <td className="py-4 px-6">
                      <strong className="text-slate-900 block">Cjelodnevna ulaznica – Odrasli</strong>
                      <span className="text-xs text-slate-500">Cjelodnevni boravak i neograničeno korištenje svih bazena i tobogana</span>
                    </td>
                    <td className="py-4 px-6 text-xs text-slate-600 font-semibold">Od 10:00 do 19:00h</td>
                    <td className="py-4 px-6 text-right font-black text-slate-900 text-base">7.00 KM</td>
                  </tr>
                  <tr className="hover:bg-amber-50/50 transition">
                    <td className="py-4 px-6">
                      <strong className="text-slate-900 block">Poludnevna ulaznica (poslije 12:00h)</strong>
                      <span className="text-xs text-slate-500">Povoljnija popodnevna tarifa</span>
                    </td>
                    <td className="py-4 px-6 text-xs text-slate-600 font-semibold">Od 12:00 do 19:00h</td>
                    <td className="py-4 px-6 text-right font-black text-amber-600 text-base">5.50 KM</td>
                  </tr>
                  <tr className="hover:bg-amber-50/50 transition">
                    <td className="py-4 px-6">
                      <strong className="text-slate-900 block">Poslijepodnevna ulaznica (poslije 16:00h)</strong>
                      <span className="text-xs text-slate-500">Ekspres kupanje nakon radnog vremena</span>
                    </td>
                    <td className="py-4 px-6 text-xs text-slate-600 font-semibold">Od 16:00 do 19:00h</td>
                    <td className="py-4 px-6 text-right font-black text-amber-700 text-base">4.00 KM</td>
                  </tr>
                  <tr className="hover:bg-amber-50/50 transition">
                    <td className="py-4 px-6">
                      <strong className="text-slate-900 block">Dječija ulaznica (Djeca do 7 godina)</strong>
                      <span className="text-xs text-slate-500">U pratnji roditelja ili staratelja</span>
                    </td>
                    <td className="py-4 px-6 text-xs text-slate-600 font-semibold">Cijeli dan</td>
                    <td className="py-4 px-6 text-right font-black text-emerald-600 text-base">BESPLATNO</td>
                  </tr>
                  <tr className="hover:bg-amber-50/50 transition">
                    <td className="py-4 px-6">
                      <strong className="text-slate-900 block">Školarci, studenti i penzioneri</strong>
                      <span className="text-xs text-slate-500">Uz važeći đački, studentski ili penzioni dokument</span>
                    </td>
                    <td className="py-4 px-6 text-xs text-slate-600 font-semibold">Cijeli dan</td>
                    <td className="py-4 px-6 text-right font-black text-sky-700 text-base">5.00 KM</td>
                  </tr>
                  <tr className="hover:bg-amber-50/50 transition">
                    <td className="py-4 px-6">
                      <strong className="text-slate-900 block">Sezonska karta – Paket 10 ulazaka</strong>
                      <span className="text-xs text-slate-500">Mogućnost korištenja tokom čitave sezone</span>
                    </td>
                    <td className="py-4 px-6 text-xs text-slate-600 font-semibold">Čitava sezona</td>
                    <td className="py-4 px-6 text-right font-black text-slate-900 text-base">55.00 KM</td>
                  </tr>
                  <tr className="hover:bg-amber-50/50 transition">
                    <td className="py-4 px-6">
                      <strong className="text-slate-900 block">Sezonska karta – Paket 20 ulazaka</strong>
                      <span className="text-xs text-slate-500">Paket sa popustom za redovne posjetioce</span>
                    </td>
                    <td className="py-4 px-6 text-xs text-slate-600 font-semibold">Čitava sezona</td>
                    <td className="py-4 px-6 text-right font-black text-slate-900 text-base">95.00 KM</td>
                  </tr>
                  <tr className="hover:bg-amber-50/50 transition">
                    <td className="py-4 px-6">
                      <strong className="text-slate-900 block">Sezonska neograničena propusnica (Personalizovana)</strong>
                      <span className="text-xs text-slate-500">Neograničen broj ulazaka tokom čitave ljetne sezone</span>
                    </td>
                    <td className="py-4 px-6 text-xs text-slate-600 font-semibold">Čitava sezona</td>
                    <td className="py-4 px-6 text-right font-black text-indigo-700 text-base">160.00 KM</td>
                  </tr>
                  <tr className="hover:bg-amber-50/50 transition">
                    <td className="py-4 px-6">
                      <strong className="text-slate-900 block">Dnevni najam ležaljke / suncobrana</strong>
                      <span className="text-xs text-slate-500">Do zatvaranja bazena</span>
                    </td>
                    <td className="py-4 px-6 text-xs text-slate-600 font-semibold">Dnevni najam</td>
                    <td className="py-4 px-6 text-right font-black text-slate-900 text-base">3.00 KM</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      <Footer currentLang={currentLang} />
    </div>
  );
}

