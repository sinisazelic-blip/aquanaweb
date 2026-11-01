"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  Sun,
  ShieldCheck,
  Award,
  Clock,
  Phone,
  Droplet,
  CheckCircle2,
  Calendar,
  Sparkles,
  TreePine,
  Download,
  FileText,
  ArrowRight,
  LifeBuoy
} from "lucide-react";
import Link from "next/link";

export default function VodeniParkDetailedPage() {
  const [currentLang, setCurrentLang] = useState<any>("lat");

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      <Header
        currentLang={currentLang}
        setLang={setCurrentLang}
        onOpenSurvey={() => {}}
      />

      {/* Hero Header */}
      {/* Hero Header - Positioned Bottom-Left over natural darker aquatic background */}
      <section className="relative text-white min-h-[580px] lg:min-h-[640px] pt-32 pb-12 sm:pb-16 px-4 sm:px-8 overflow-hidden flex items-end bg-sky-900">
        {/* Full Vibrant Summer Image without Darkening */}
        <div className="absolute inset-0">
          <img
            src="/images/vodeni-park.jpg"
            alt="Vodeni park Aquana Borik"
            className="w-full h-full object-cover object-center brightness-105 saturate-[1.25]"
          />
        </div>
        {/* Sunny Aquatic Sheen - Stronger in bottom-left for crisp effortless reading */}
        <div className="absolute inset-0 bg-gradient-to-tr from-sky-950/95 via-sky-950/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-sky-950/90 via-sky-950/20 to-transparent" />

        <div className="relative max-w-7xl w-full mx-auto space-y-5 text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/25 border border-amber-400/35 text-amber-300 text-xs font-black uppercase tracking-wider backdrop-blur-md">
            <Sun className="w-4 h-4 text-amber-400" />
            <span>38.000 m² Ljetne oaze • Naselje Borik</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight max-w-4xl">
            Vodeni park Aquana
          </h1>

          <p className="text-slate-200 text-base sm:text-xl max-w-3xl leading-relaxed">
            Najveća turistička, vodena i zabavna atrakcija Banjaluke i šireg okruženja. Smješten u neposrednoj blizini centra grada u naselju Borik (Aleja Svetog Save 80), kompleks nudi vrhunski ljetni odmor, kupanje i rekreaciju na 1.500 m² vodene površine.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-4">
            <a
              href="#cjenovnik"
              className="px-7 py-3.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-sm tracking-wide transition shadow-lg shadow-amber-400/20 flex items-center gap-2"
            >
              <span>Sezonski cjenovnik 2026</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <Link
              href="/dokumenti"
              className="px-6 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/25 backdrop-blur-md transition flex items-center gap-2"
            >
              <FileText className="w-4 h-4 text-cyan-300" />
              <span>Zvanični dokumenti</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-8 py-14 space-y-16">
        {/* Atrakcije & Parametri */}
        <section className="space-y-6">
          <div className="border-b border-slate-200 pb-4">
            <span className="text-xs font-bold text-amber-600 uppercase tracking-widest block">KOMPLEKS & ATRAKCIJE</span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Sadržaji vodenog parka
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-2">
              <span className="text-3xl font-black text-amber-500 block">100 m</span>
              <h3 className="font-bold text-slate-900 text-sm">Vodeni tobogan</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Veliki tobogan sa vodenim tokom, vrtlogom, masažnim ležištima i mlazevima za sve uzraste.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-2">
              <span className="text-3xl font-black text-sky-500 block">3 bazena</span>
              <h3 className="font-bold text-slate-900 text-sm">Ukupno 1.500 m² vode</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Plivački bazen za plivače, bazen sa atrakcijama i plitki dječiji bazen sa vodenom pečurkom.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-2">
              <span className="text-3xl font-black text-emerald-600 block">24.000 m²</span>
              <h3 className="font-bold text-slate-900 text-sm">Zelene površine & Hlad</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Prostrane zelene kaskade sa prirodnim drvećem i hladom, idealno za cjelodnevni boravak porodica.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-2">
              <span className="text-3xl font-black text-rose-500 block">Spasioci</span>
              <h3 className="font-bold text-slate-900 text-sm">Licencirana bezbjednost</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Stalna spasilačka služba sa međunarodnim licencama na svim bazenima tokom čitavog radnog vremena.
              </p>
            </div>
          </div>
        </section>

        {/* Detailed Breakdown */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-bold text-sky-600 uppercase tracking-widest block">EKOLOGIJA & TEHNOLOGIJA</span>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight leading-tight">
              Besprijekorna higijena i automatska filtracija
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Vodeni park Aquana koristi najsavremenija automatska postrojenja za kontinuirano prečišćavanje, hlorisanje i cirkulaciju vode. Kvalitet vode se provjerava više puta dnevno na licu mjesta, uz redovnu zvaničnu kontrolu od strane Instituta za javno zdravstvo Republike Srpske.
            </p>

            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <span className="text-sm text-slate-700">Automatska dozirna i filtraciona postrojenja njemačkog standarda.</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <span className="text-sm text-slate-700">Svakodnevna dezinfekcija sunčališta, platoa i pratećih sanitarnih čvorova.</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <span className="text-sm text-slate-700">Ležaljke i suncobrani dostupni posjetiocima uz bazene i na zelenim kaskadama.</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 relative rounded-3xl overflow-hidden shadow-2xl">
            <img
              src="/images/aquana-slider.png"
              alt="Bazeni vodenog parka"
              className="w-full h-[400px] object-cover"
            />
          </div>
        </section>

        {/* FULL OFFICIAL VODENI PARK PRICE LIST */}
        <section id="cjenovnik" className="space-y-6 pt-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 pb-4">
            <div>
              <span className="text-xs font-bold text-amber-600 uppercase tracking-widest block">SLUŽBENI CJENOVNIK</span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Cjenovnik ulaznica – Vodeni park Aquana (Sezona 2026)
              </h2>
            </div>
            <Link
              href="/dokumenti"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition shrink-0"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Preuzmi PDF odluku o cijenama</span>
            </Link>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-100 border-b border-slate-200 text-xs font-black text-slate-700 uppercase tracking-wider">
                    <th className="py-4 px-6">Kategorija ulaznice / Paket</th>
                    <th className="py-4 px-6 w-48">Vrijeme ulaska</th>
                    <th className="py-4 px-6 w-36 text-right">Cijena (sa PDV)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-sm">
                  <tr className="hover:bg-amber-50/50 transition">
                    <td className="py-4 px-6">
                      <strong className="text-slate-900 block">Cjelodnevna ulaznica – Odrasli</strong>
                      <span className="text-xs text-slate-500">Omogućava cjelodnevni boravak i korištenje svih bazena i tobogana</span>
                    </td>
                    <td className="py-4 px-6 text-xs text-slate-600 font-semibold">Od 10:00 do 19:00h</td>
                    <td className="py-4 px-6 text-right font-black text-slate-900 text-base">7.00 KM</td>
                  </tr>

                  <tr className="hover:bg-amber-50/50 transition">
                    <td className="py-4 px-6">
                      <strong className="text-slate-900 block">Poludnevna ulaznica (poslije 12:00h)</strong>
                      <span className="text-xs text-slate-500">Povoljnija tarifa za popodnevni boravak</span>
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
                      <span className="text-xs text-slate-500">Mogućnost prenosa i korištenja za više lica</span>
                    </td>
                    <td className="py-4 px-6 text-xs text-slate-600 font-semibold">Čitava sezona</td>
                    <td className="py-4 px-6 text-right font-black text-slate-900 text-base">55.00 KM</td>
                  </tr>

                  <tr className="hover:bg-amber-50/50 transition">
                    <td className="py-4 px-6">
                      <strong className="text-slate-900 block">Sezonska karta – Paket 20 ulazaka</strong>
                      <span className="text-xs text-slate-500">Paket sa uštedom od preko 30%</span>
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
                      <strong className="text-slate-900 block">Iznajmljivanje ležaljke / suncobrana</strong>
                      <span className="text-xs text-slate-500">Dnevni najam do zatvaranja akvaparka</span>
                    </td>
                    <td className="py-4 px-6 text-xs text-slate-600 font-semibold">Dnevni najam</td>
                    <td className="py-4 px-6 text-right font-black text-slate-900 text-base">3.00 KM</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>

      <Footer currentLang={currentLang} />
    </div>
  );
}


