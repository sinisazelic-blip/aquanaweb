"use client";

import React, { useState, useMemo } from "react";
import { Lang, translations } from "@/lib/translations";
import { initialTenders, TenderItem } from "@/lib/tendersData";
import { Search, FileText, Download, Filter, Calendar, ShieldCheck } from "lucide-react";

interface TendersTableProps {
  currentLang: Lang;
}

export default function TendersTable({ currentLang }: TendersTableProps) {
  const t = translations[currentLang].tenders;

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
        return "bg-amber-100 text-amber-800 border-amber-200";
      case "Dodijeljen ugovor":
        return "bg-emerald-100 text-emerald-800 border-emerald-200";
      case "Poništeno":
        return "bg-rose-100 text-rose-800 border-rose-200";
      default:
        return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };

  return (
    <section id="nabavke" className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-100 text-sky-800 text-xs font-bold uppercase tracking-wider mb-2">
              <ShieldCheck className="w-3.5 h-3.5 text-sky-600" />
              {currentLang === "cir" ? "Службена евиденција јавних набавки" : currentLang === "en" ? "Official Procurement Registry" : "Službena evidencija javnih nabavki"}
            </div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">{t.title}</h2>
            <p className="text-slate-600 text-sm mt-1">{t.subtitle}</p>
          </div>

          <div className="text-xs text-slate-500 font-medium">
            {currentLang === "cir" ? "Укупно објављених аката: " : currentLang === "en" ? "Total published acts: " : "Ukupno objavljenih akata: "}
            <span className="font-bold text-slate-900">{initialTenders.length}</span>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-slate-200/80 mb-6 flex flex-col md:flex-row gap-4">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition"
            />
          </div>

          {/* Year Filter */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-500 whitespace-nowrap">{t.filterYear}:</span>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="px-3 py-2.5 rounded-xl border border-slate-200 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 bg-white"
            >
              <option value="all">{t.allYears}</option>
              {years.map((y) => (
                <option key={y} value={y}>
                  {y}.
                </option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-500 whitespace-nowrap">{t.filterStatus}:</span>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2.5 rounded-xl border border-slate-200 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 bg-white"
            >
              <option value="all">{t.allStatuses}</option>
              <option value="Aktivno">Aktivno</option>
              <option value="Dodijeljen ugovor">Dodijeljen ugovor</option>
              <option value="Završeno">Završeno</option>
              <option value="Poništeno">Poništeno</option>
            </select>
          </div>
        </div>

        {/* Tenders Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  <th className="py-3.5 px-4 w-16">{t.thNumber}</th>
                  <th className="py-3.5 px-4">{t.thTitle}</th>
                  <th className="py-3.5 px-4 w-32">{t.thDate}</th>
                  <th className="py-3.5 px-4 w-36">{t.thStatus}</th>
                  <th className="py-3.5 px-4 w-40 text-right">{t.thAction}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {filtered.length > 0 ? (
                  filtered.slice(0, 30).map((item, idx) => (
                    <tr key={item.id} className="hover:bg-sky-50/50 transition">
                      <td className="py-3.5 px-4 text-xs font-bold text-slate-400">
                        #{item.id}
                      </td>
                      <td className="py-3.5 px-4 font-semibold text-slate-800">
                        <div className="flex items-start gap-2.5">
                          <FileText className="w-4 h-4 text-sky-600 mt-0.5 shrink-0" />
                          <span className="line-clamp-2">{item.title}</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-xs text-slate-600 font-medium whitespace-nowrap">
                        {item.date}
                      </td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`inline-block px-2.5 py-1 rounded-full text-[11px] font-bold border ${getStatusBadge(
                            item.status
                          )}`}
                        >
                          {item.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        {item.file ? (
                          <a
                            href={`/dokumenti/${encodeURIComponent(item.file)}`}
                            download
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-50 hover:bg-sky-600 text-sky-700 hover:text-white text-xs font-bold transition shadow-sm"
                          >
                            <Download className="w-3.5 h-3.5" />
                            <span>PDF</span>
                          </a>
                        ) : (
                          <span className="text-xs text-slate-400 italic">Arhiva</span>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="py-12 text-center text-slate-500 text-sm">
                      {t.noResults}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {filtered.length > 30 && (
            <div className="bg-slate-50 px-4 py-3 border-t border-slate-200 text-center text-xs text-slate-500 font-medium">
              {currentLang === "cir"
                ? `Приказано је првих 30 од укупно ${filtered.length} докумената. Користите претрагу за прецизнији избор.`
                : currentLang === "en"
                ? `Displaying first 30 of ${filtered.length} matching documents. Use search filter above for specific results.`
                : `Prikazano je prvih 30 od ukupno ${filtered.length} dokumenata. Koristite pretragu za precizniji izbor.`}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
