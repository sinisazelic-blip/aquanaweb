"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  Waves,
  ShieldCheck,
  Award,
  Clock,
  Phone,
  Droplet,
  HeartHandshake,
  CheckCircle2,
  Calendar,
  Sparkles,
  Dumbbell,
  Coffee,
  Car,
  Download,
  FileText,
  ArrowRight,
  Users,
  Eye
} from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { tr } from "@/lib/translations";
import { realClubs } from "@/lib/realPoolData";

export default function GobDetailedPage() {
  const { currentLang, setLang } = useLanguage();
  const txt = (s: string) => tr(s, currentLang);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      <Header
        currentLang={currentLang}
        setLang={setLang}
        onOpenSurvey={() => {}}
      />

      {/* Hero Header - Positioned Bottom-Left over natural darker aquatic background */}
      <section className="relative text-white min-h-[580px] lg:min-h-[640px] pt-32 pb-12 sm:pb-16 px-4 sm:px-8 overflow-hidden flex items-end bg-blue-950">
        {/* Crisp Olympic pool photo without dark gloom */}
        <div className="absolute inset-0">
          <img
            src="/images/GOB-20.jpg"
            alt="Gradski olimpijski bazen Banja Luka"
            className="w-full h-full object-cover object-center brightness-105 saturate-[1.2]"
          />
        </div>
        {/* Olympic Blue Gradient - Stronger in bottom-left for crisp effortless reading */}
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-950/95 via-blue-950/55 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-blue-950/90 via-blue-950/20 to-transparent" />

        <div className="relative max-w-7xl w-full mx-auto space-y-5 text-left">
          <div className="flex flex-wrap items-center gap-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/30 border border-sky-400/40 text-sky-200 text-xs font-black uppercase tracking-wider backdrop-blur-md">
              <Award className="w-4 h-4 text-cyan-300" />
              <span>FINA Olimpijski standard • Banja Luka</span>
            </div>
            {/* Official GOB Emblem */}
            <div className="inline-flex items-center gap-2 bg-white/95 px-3 py-1.5 rounded-2xl shadow-lg border border-white">
              <img src="/firma/gob-logo.png" alt="GOB Logo" className="h-6 w-auto object-contain" />
              <span className="text-[11px] font-black text-blue-950 uppercase tracking-wider">Zvanični sportski centar</span>
            </div>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight max-w-4xl drop-shadow-md">
            {txt("Gradski olimpijski bazen (GOB)")}
          </h1>

          <p className="text-slate-100 text-base sm:text-xl max-w-3xl leading-relaxed drop-shadow">
            Jedan od tri najsavremenija olimpijska bazena u Evropi. Izgrađen po strogim standardima Svjetske plivačke federacije, dom plivačkih i vaterpolo klubova, te omiljeno mjesto za rekreaciju i obuku neplivača svih generacija.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-4">
            <a
              href="#cjenovnik"
              className="px-7 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-400 to-sky-500 hover:from-cyan-300 hover:to-sky-400 text-blue-950 font-black text-sm tracking-wide transition shadow-xl shadow-cyan-500/25 flex items-center gap-2"
            >
              <span>{txt("Zvanični cjenovnik GOB-a")}</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href="tel:065725050"
              className="px-6 py-3.5 rounded-2xl bg-white/15 hover:bg-white/25 text-white font-bold text-sm border border-white/30 backdrop-blur-md transition flex items-center gap-2 shadow-md"
            >
              <Phone className="w-4 h-4 text-amber-300" />
              <span>{txt("Obuka neplivača: 065 72 50 50")}</span>
            </a>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-8 py-14 space-y-16">
        {/* Technical Highlights Grid */}
        <section className="space-y-6">
          <div className="border-b border-slate-200 pb-4">
            <span className="text-xs font-bold text-sky-600 uppercase tracking-widest block">INFRASTRUKTURA & PARAMETRI</span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {txt("Tehničke specifikacije objekta")}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-2">
              <span className="text-3xl font-black text-sky-600 block">50 × 25 m</span>
              <h3 className="font-bold text-slate-900 text-sm">{txt("Veliki olimpijski bazen")}</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Dubina 2.20 m ravnomjerno, 10 takmičarskih staza sa razdjelnicima talasa i 2.500 m³ FINA vode.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-2">
              <span className="text-3xl font-black text-cyan-600 block">25 × 10 m</span>
              <h3 className="font-bold text-slate-900 text-sm">{txt("Mali bazen za obuku")}</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Dubina 1.40 m ravnomjerno, prilagođena za školu plivanja, rasplivavanje i rad sa djecom i početnicima.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-2">
              <span className="text-3xl font-black text-blue-600 block">OMEGA</span>
              <h3 className="font-bold text-slate-900 text-sm">{txt("Mjerenje vremena")}</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Najsavremeniji startni blokovi sa touch-panel senzorima i elektronskim semaforom najviše klase.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-2">
              <span className="text-3xl font-black text-emerald-600 block">532</span>
              <h3 className="font-bold text-slate-900 text-sm">{txt("Gledalište & Tribine")}</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Sjedeća mjesta za publiku na tribinama, klimatizovan prostor i moderna ozvučenja za mitinge.
              </p>
            </div>
          </div>
        </section>

        {/* Detailed Description & Obuka neplivača */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-bold text-amber-600 uppercase tracking-widest block">KOMERCIJALNI PROGRAM & GRADSKI INTERES</span>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight leading-tight">
              Škola plivanja i obuka neplivača
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Obuka neplivača predstavlja ključni program i direktan fokus našeg rada. Na Gradskom olimpijskom bazenu vrši se svakodnevni upis u komercijalnu školu plivanja pod nadzorom licenciranih profesora sporta i fizičkog vaspitanja.
            </p>

            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-white border border-slate-200 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-sm text-slate-900 block">Komercijalna obuka za građanstvo</strong>
                  <span className="text-xs text-slate-600">Prilagođeni termini za djecu, omladinu i odrasle, rad u malim grupama ili individualno. Prijave na telefon: <strong>065 72 50 50</strong>.</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-slate-200 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-sky-500 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-sm text-slate-900 block">Besplatna obuka za banjalučke osnovce (Gradski javni interes)</strong>
                  <span className="text-xs text-slate-600">Projekat koji u cijelosti finansira Grad Banja Luka, a kroz koji učenici osnovnih škola prolaze organizovanu obuku plivanja.</span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 relative rounded-3xl overflow-hidden shadow-2xl">
            <img
              src="/images/ACO_1911-1.jpg"
              alt="Obuka neplivača na GOB"
              className="w-full h-[400px] object-cover"
            />
          </div>
        </section>

        {/* Social Responsibility & Amenities */}
        <section className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm space-y-8">
          <div className="max-w-3xl space-y-2">
            <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest block">DRUŠTVENA ODGOVORNOST & SADRŽAJI</span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Inkluzivni pristup i prateći sadržaji GOB-a
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              Kao društveno odgovorno javno preduzeće, obezbijedili smo maksimalne uslove jednakosti za sve naše sugrađane.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 text-base">Mobilni hidraulični lift</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Specijalizovani lift i rampa omogućavaju osobama sa invaliditetom i posebnim potrebama bezbjedan ulazak direktno iz kolica u vodu bazena i povratak u kolica.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
                <Dumbbell className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 text-base">Moderna teretana (zakupac)</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                U sklopu objekta GOB-a posjetiocima je na raspolaganju vrhunski opremljen fitnes centar za kondicionu pripremu i trening sportista i rekreativaca.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center">
                <Car className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 text-base">Besplatan parking i Caffe</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Obezbijeđen parking prostor za sve korisnike bazena, kao i ugodan Caffe bar u holu bazena sa pogledom na olimpijski bazen.
              </p>
            </div>
          </div>
        </section>

        {/* Real Registered Clubs Section */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-blue-600 uppercase tracking-widest block">SPORTSKI KORISNICI</span>
              <h3 className="text-xl font-black text-slate-900">Registrovani klubovi na GOB-u</h3>
            </div>
            <span className="text-xs text-slate-500 font-semibold">10 zvaničnih klubova</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {realClubs.map((club) => (
              <div key={club.id} className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm text-center space-y-1">
                <span className="text-xs font-black text-sky-700 block">{club.shortName}</span>
                <p className="text-[11px] text-slate-500">{club.name}</p>
                <span className="inline-block px-2 py-0.5 rounded-full bg-slate-100 text-[10px] font-bold text-slate-600">
                  {club.typeLabel}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* FULL OFFICIAL GOB PRICE LIST TABLE */}
        <section id="cjenovnik" className="space-y-6 pt-6">
          {/* Zvanični cjenovnik propisan Odlukom Gradonačelnika Grada Banja Luka */}
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-blue-950 via-sky-950 to-slate-950 text-white shadow-xl border border-sky-400/40 flex flex-col lg:flex-row items-center justify-between gap-6 relative overflow-hidden">
            <div className="space-y-2 text-center lg:text-left z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-400/20 text-sky-300 text-xs font-bold border border-sky-400/30 uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4 text-cyan-300" />
                <span>ODLUKA GRADONAČELNIKA GRADA BANJA LUKA</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white">
                Zvanični cjenovnik usluga GOB-a propisan od strane Grada Banja Luka
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                Kao vlasnik sportskog objekta Gradskog olimpijskog bazena, Grad Banja Luka i Gradonačelnik zvanično donose i propisuju tarifu za sve kategorije građana, klubova, rekreativaca i povlaštenih lica.
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
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 pb-4">
            <div>
              <span className="text-xs font-bold text-sky-600 uppercase tracking-widest block">SLUŽBENI CJENOVNIK</span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Zvanični cjenovnik usluga GOB-a (Sezona 2026)
              </h2>
            </div>
            <Link
              href="/dokumenti"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition shrink-0"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Preuzmi ovjeren PDF cjenovnik</span>
            </Link>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-100 border-b border-slate-200 text-xs font-black text-slate-700 uppercase tracking-wider">
                    <th className="py-4 px-6">Vrsta ulaznice / Usluga</th>
                    <th className="py-4 px-6 w-48">Vremenski period</th>
                    <th className="py-4 px-6 w-36 text-right">Cijena (sa PDV)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-sm">
                  <tr className="hover:bg-sky-50/50 transition">
                    <td className="py-4 px-6">
                      <strong className="text-slate-900 block">Jutarnje rekreativno plivanje (Happy Hour)</strong>
                      <span className="text-xs text-slate-500">Pojedinačna ulaznica za jutarnji termin</span>
                    </td>
                    <td className="py-4 px-6 text-xs text-slate-600 font-semibold">06:00 – 08:00h</td>
                    <td className="py-4 px-6 text-right font-black text-sky-700 text-base">3.50 KM</td>
                  </tr>

                  <tr className="hover:bg-sky-50/50 transition">
                    <td className="py-4 px-6">
                      <strong className="text-slate-900 block">Dnevna rekreativna ulaznica za građanstvo</strong>
                      <span className="text-xs text-slate-500">Redovni rekreativni termini tokom dana</span>
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
                      <strong className="text-slate-900 block">Obuka neplivača – Osnovni kurs (12 časova)</strong>
                      <span className="text-xs text-slate-500">Stručni rad sa licenciranim profesorima DIF-a</span>
                    </td>
                    <td className="py-4 px-6 text-xs text-slate-600 font-semibold">Termini po dogovoru</td>
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
        </section>
      </main>

      <Footer currentLang={currentLang} />
    </div>
  );
}



