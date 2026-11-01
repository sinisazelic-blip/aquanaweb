"use client";

import React, { useState, useMemo } from "react";
import { officialDocuments } from "@/lib/documentsData";
import { Search, FileText, Download, ShieldCheck, ArrowLeft, Droplet, FileCheck2, Scale, BookOpen } from "lucide-react";
import Link from "next/link";

export default function DokumentiPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = useMemo(() => {
    const set = new Set(officialDocuments.map((d) => d.category));
    return ["all", ...Array.from(set)];
  }, []);

  const filtered = useMemo(() => {
    return officialDocuments.filter((item) => {
      const matchSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.date.includes(searchQuery) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchCategory =
        selectedCategory === "all" || item.category === selectedCategory;
      return matchSearch && matchCategory;
    });
  }, [searchQuery, selectedCategory]);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Sanitarni nalazi vode":
        return <Droplet className="w-5 h-5 text-cyan-600 shrink-0" />;
      case "Cjenovnik":
        return <FileCheck2 className="w-5 h-5 text-amber-600 shrink-0" />;
      case "Pravna dokumentacija":
        return <Scale className="w-5 h-5 text-sky-700 shrink-0" />;
      case "Pravilnici":
        return <BookOpen className="w-5 h-5 text-indigo-600 shrink-0" />;
      default:
        return <FileText className="w-5 h-5 text-slate-600 shrink-0" />;
    }
  };

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case "Sanitarni nalazi vode":
        return "bg-cyan-100 text-cyan-900 border-cyan-300 font-bold";
      case "Cjenovnik":
        return "bg-amber-100 text-amber-900 border-amber-300 font-bold";
      case "Pravna dokumentacija":
        return "bg-sky-100 text-sky-900 border-sky-300 font-bold";
      case "Pravilnici":
        return "bg-indigo-100 text-indigo-900 border-indigo-300 font-bold";
      default:
        return "bg-slate-100 text-slate-800 border-slate-300 font-medium";
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 flex flex-col font-sans">
      {/* Official Header */}
      <header className="bg-slate-900 text-white border-b-4 border-cyan-500 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white transition flex items-center gap-2 text-xs font-bold uppercase tracking-wider"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Nazad na portal</span>
            </Link>

            <div className="border-l border-slate-700 pl-4">
              <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white flex items-center gap-2">
                <ShieldCheck className="w-6 h-6 text-cyan-400" />
                <span>Zvanični dokumenti, cjenovnici i nalazi</span>
              </h1>
              <p className="text-xs text-slate-400 font-medium">
                JP „AQUANA“ d.o.o. Banja Luka • Cjenovnici, nalazi higijene Instituta i opšta akta
              </p>
            </div>
          </div>

          <div className="text-right text-xs text-slate-400 hidden sm:block">
            <span className="block text-slate-200 font-bold">JIB: 4402636750000 | PIB: 402636750000</span>
            <span>Ažurirano: {new Date().toLocaleDateString('sr-BA')}</span>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-8 py-8 space-y-6">
        {/* Info Highlights Card */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-300 shadow-sm flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-cyan-100 flex items-center justify-center shrink-0">
              <Droplet className="w-6 h-6 text-cyan-700" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Sanitarni nadzor Instituta</h3>
              <p className="text-xs text-slate-600 mt-1">
                Redovna fizičko-hemijska i mikrobiološka kontrola vode i površina od strane Instituta za javno zdravstvo RS.
              </p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-300 shadow-sm flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center shrink-0">
              <FileCheck2 className="w-6 h-6 text-amber-700" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Zvanični cjenovnici 2026</h3>
              <p className="text-xs text-slate-600 mt-1">
                Transparentne tarife za rekreativno plivanje, obuku neplivača, ulaznice i sezonske propusnice.
              </p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-300 shadow-sm flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-sky-100 flex items-center justify-center shrink-0">
              <Scale className="w-6 h-6 text-sky-700" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Pravna identifikacija</h3>
              <p className="text-xs text-slate-600 mt-1">
                Službeni identifikacioni podaci, pravilnici o radu, bezbjednosti i kućnom redu na bazenima.
              </p>
            </div>
          </div>
        </div>

        {/* Filter Toolbar */}
        <div className="bg-white rounded-2xl p-5 border border-slate-300 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Search Box */}
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Pretraži dokumente, nalaze ili cjenovnike..."
              className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500"
            />
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                  selectedCategory === cat
                    ? "bg-slate-900 text-white shadow-sm"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {cat === "all" ? "Svi dokumenti" : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Count Bar */}
        <div className="flex items-center justify-between text-xs text-slate-600 font-semibold px-1">
          <span>Prikazano: <strong className="text-slate-900">{filtered.length}</strong> dokumenata</span>
          <span>Svi dokumenti su u zvaničnom PDF formatu sa elektronskim preuzimanjem</span>
        </div>

        {/* Clean, Legible Table */}
        <div className="bg-white rounded-2xl border border-slate-300 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-200/80 border-b border-slate-300 text-xs font-black text-slate-700 uppercase tracking-wider">
                  <th className="py-4 px-4 w-16 text-center">R.br</th>
                  <th className="py-4 px-5">Naziv dokumenta / akta</th>
                  <th className="py-4 px-5 w-48">Kategorija</th>
                  <th className="py-4 px-5 w-32">Datum</th>
                  <th className="py-4 px-5 w-36 text-right">Preuzimanje</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-sm">
                {filtered.length > 0 ? (
                  filtered.map((item, idx) => (
                    <tr key={item.id} className="hover:bg-cyan-50/50 transition">
                      <td className="py-4 px-4 text-xs font-bold text-slate-500 text-center">
                        #{idx + 1}
                      </td>
                      <td className="py-4 px-5">
                        <div className="flex items-start gap-3">
                          {getCategoryIcon(item.category)}
                          <span className="font-semibold text-slate-900 text-base leading-snug">
                            {item.title}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-5">
                        <span
                          className={`inline-block px-3 py-1 rounded-md text-xs border ${getCategoryBadge(
                            item.category
                          )}`}
                        >
                          {item.category}
                        </span>
                      </td>
                      <td className="py-4 px-5 text-sm text-slate-700 font-medium whitespace-nowrap">
                        {item.date}
                      </td>
                      <td className="py-4 px-5 text-right">
                        {item.file ? (
                          <a
                            href={`/dokumenti/${encodeURIComponent(item.file)}`}
                            download
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-cyan-700 hover:bg-cyan-800 text-white font-bold text-xs transition shadow-sm"
                          >
                            <Download className="w-3.5 h-3.5" />
                            <span>PDF Preuzmi</span>
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
                      Nema pronađenih dokumenata za zadati kriterijum.
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
        <p>© {new Date().getFullYear()} JP „AQUANA“ d.o.o. Banja Luka • Sva prava zadržana</p>
      </footer>
    </div>
  );
}
