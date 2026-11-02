"use client";

import React, { useState, useMemo } from "react";
import { initialTenders } from "@/lib/tendersData";
import { Search, FileText, Download, ShieldCheck, ArrowLeft, Filter, Calendar } from "lucide-react";
import Link from "next/link";

import { useLanguage } from "@/context/LanguageContext";
import { tr } from "@/lib/translations";

export default function JavneNabavkePage() {
  const { currentLang } = useLanguage();
  const txt = (s: string) => tr(s, currentLang);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedYear, setSelectedYear] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");

  const years = useMemo(() => {
    const set = new Set(initialTenders.map((i) => i.year));
    return Array.from(set).sort().reverse();
  }, []);

  const filtered = useMemo(() => {
    return initialTenders.filter((item) => {
      const matchSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.date.includes(searchQuery);
      const matchYear = selectedYear === "all" || item.year === selectedYear;
      const matchStatus =
        selectedStatus === "all" || item.status === selectedStatus;
      return matchSearch && matchYear && matchStatus;
    });
  }, [searchQuery, selectedYear, selectedStatus]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Aktivno":
        return "bg-amber-100 text-amber-900 border-amber-300 font-bold";
      case "Dodijeljen ugovor":
        return "bg-emerald-100 text-emerald-900 border-emerald-300 font-bold";
      case "Poništeno":
        return "bg-rose-100 text-rose-900 border-rose-300 font-bold";
      default:
        return "bg-slate-100 text-slate-800 border-slate-300 font-medium";
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 flex flex-col font-sans">
      {/* Official Sober Legal Header */}
      <header className="bg-slate-900 text-white border-b-4 border-sky-600 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white transition flex items-center gap-2 text-xs font-bold uppercase tracking-wider"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{txt("Nazad na portal")}</span>
            </Link>

            <div className="border-l border-slate-700 pl-4">
              <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white flex items-center gap-2">
                <ShieldCheck className="w-6 h-6 text-sky-400" />
                <span>{txt("Registar javnih nabavki i akata")}</span>
              </h1>
              <p className="text-xs text-slate-400 font-medium">
                JP „AQUANA“ d.o.o. Banja Luka • Službena zakonska evidencija
              </p>
            </div>
          </div>

          <div className="text-right text-xs text-slate-400 hidden sm:block">
            <span className="block text-slate-200 font-bold">{txt("Zakon o javnim nabavkama BiH")}</span>
            <span>Ažurirano: {new Date().toLocaleDateString('sr-BA')}</span>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-8 py-8 space-y-6">
        {/* Sober Filter Toolbar */}
        <div className="bg-white rounded-2xl p-5 border border-slate-300 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Search Box */}
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={txt("Pretraži po nazivu, predmetu ili datumu...")}
              className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
            />
          </div>

          {/* Filters */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-600 uppercase">Godina:</span>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="px-3 py-2 text-sm font-semibold rounded-xl border border-slate-300 bg-white"
              >
                <option value="all">Sve godine</option>
                {years.map((y) => (
                  <option key={y} value={y}>
                    {y}.
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-600 uppercase">Status:</span>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-3 py-2 text-sm font-semibold rounded-xl border border-slate-300 bg-white"
              >
                <option value="all">Svi statusi</option>
                <option value="Aktivno">Aktivno</option>
                <option value="Dodijeljen ugovor">Dodijeljen ugovor</option>
                <option value="Završeno">Završeno</option>
                <option value="Poništeno">Poništeno</option>
              </select>
            </div>
          </div>
        </div>

        {/* Count Bar */}
        <div className="flex items-center justify-between text-xs text-slate-600 font-semibold px-1">
          <span>{txt("Prikazano:")} <strong className="text-slate-900">{filtered.length}</strong> dokumenata</span>
          <span>{txt("Klikom na PDF preuzimate zvaničnu dokumentaciju")}</span>
        </div>

        {/* High-Contrast, Clean, Highly Legible Table */}
        <div className="bg-white rounded-2xl border border-slate-300 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-200/80 border-b border-slate-300 text-xs font-black text-slate-700 uppercase tracking-wider">
                  <th className="py-4 px-4 w-16 text-center">R.br</th>
                  <th className="py-4 px-5">Predmet nabavke / Naziv akta</th>
                  <th className="py-4 px-5 w-32">Datum objave</th>
                  <th className="py-4 px-5 w-40">Status postupka</th>
                  <th className="py-4 px-5 w-36 text-right">Dokument</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-sm">
                {filtered.length > 0 ? (
                  filtered.map((item, idx) => (
                    <tr key={item.id} className="hover:bg-sky-50/60 transition">
                      <td className="py-4 px-4 text-xs font-bold text-slate-500 text-center">
                        #{idx + 1}
                      </td>
                      <td className="py-4 px-5">
                        <div className="flex items-start gap-3">
                          <FileText className="w-5 h-5 text-sky-700 shrink-0 mt-0.5" />
                          <span className="font-semibold text-slate-900 text-base leading-snug">
                            {txt(item.title)}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-5 text-sm text-slate-700 font-medium whitespace-nowrap">
                        {item.date}
                      </td>
                      <td className="py-4 px-5">
                        <span
                          className={`inline-block px-3 py-1 rounded-md text-xs border ${getStatusBadge(
                            item.status
                          )}`}
                        >
                          {txt(item.status)}
                        </span>
                      </td>
                      <td className="py-4 px-5 text-right">
                        {item.file ? (
                          <a
                            href={`/dokumenti/${encodeURIComponent(item.file)}`}
                            download
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs transition shadow-sm"
                          >
                            <Download className="w-3.5 h-3.5" />
                            <span>{txt("Preuzmi PDF")}</span>
                          </a>
                        ) : (
                          <span className="text-xs text-slate-400 italic">Arhiva</span>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="py-12 text-center text-slate-500 text-base">
                      Nema pronađenih dokumenata za zadati kriterijum pretrage.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Legal Footer */}
      <footer className="bg-slate-900 text-slate-400 py-6 text-xs text-center border-t border-slate-800">
        <p>© {new Date().getFullYear()} JP „AQUANA“ d.o.o. Banja Luka • Služba javnih nabavki i opštih poslova</p>
      </footer>
    </div>
  );
}
