"use client";

import React, { useState, useMemo } from "react";
import { allNewsArticles, NewsItem } from "@/lib/newsData";
import { Search, Calendar, Tag, ArrowRight, ArrowLeft, ChevronLeft, ChevronRight, Newspaper } from "lucide-react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const ITEMS_PER_PAGE = 9;

export default function VijestiArchivePage() {
  const [currentLang, setCurrentLang] = useState<any>("lat");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState<number>(1);

  const categories = useMemo(() => {
    const set = new Set(allNewsArticles.map((a) => a.category));
    return ["all", ...Array.from(set)];
  }, []);

  const filtered = useMemo(() => {
    return allNewsArticles.filter((item) => {
      const matchSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.date.includes(searchQuery);
      const matchCategory =
        selectedCategory === "all" || item.category === selectedCategory;
      return matchSearch && matchCategory;
    });
  }, [searchQuery, selectedCategory]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE) || 1;
  const paginated = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filtered.slice(start, start + ITEMS_PER_PAGE);
  }, [filtered, currentPage]);

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    setCurrentPage(1);
  };

  const handleSearchChange = (q: string) => {
    setSearchQuery(q);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      <Header
        currentLang={currentLang}
        setLang={setCurrentLang}
        onOpenSurvey={() => {}}
      />

      {/* Page Hero Bar */}
      <section className="bg-slate-900 text-white py-12 px-4 sm:px-8 border-b-4 border-sky-600">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-sky-400 uppercase tracking-widest">
              <Newspaper className="w-4 h-4" />
              <span>Arhiva vijesti i saopštenja</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
              Sve vijesti iz Akvane i GOB-a
            </h1>
            <p className="text-slate-400 text-sm max-w-xl">
              Pratite aktuelna dešavanja, rasporede, sportska takmičenja, obuku neplivača i najave manifestacija.
            </p>
          </div>

          <Link
            href="/"
            className="self-start sm:self-auto px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-bold flex items-center gap-2 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Nazad na početnu</span>
          </Link>
        </div>
      </section>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-8 py-10 space-y-8">
        {/* Filter & Search Toolbar */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Pretraži arhivu vijesti..."
              className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                  selectedCategory === cat
                    ? "bg-sky-600 text-white shadow-sm"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {cat === "all" ? "Sve kategorije" : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Count Bar */}
        <div className="flex items-center justify-between text-xs text-slate-500 font-semibold px-1">
          <span>Prikazano: <strong className="text-slate-900">{filtered.length}</strong> objavljenih članaka</span>
          <span>Stranica {currentPage} od {totalPages}</span>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {paginated.length > 0 ? (
            paginated.map((item) => (
              <article
                key={item.id}
                className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group hover:-translate-y-1"
              >
                <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-slate-950/70 backdrop-blur-md px-3 py-1 rounded-full text-white text-[11px] font-bold border border-white/20">
                    {item.category}
                  </div>
                  <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-md px-2.5 py-0.5 rounded-md text-white text-[11px] font-medium flex items-center gap-1.5">
                    <Calendar className="w-3 h-3 text-sky-400" />
                    <span>{item.date}</span>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-black text-slate-900 text-lg leading-snug group-hover:text-sky-600 transition">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                      {item.excerpt}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] text-slate-400 font-medium">JP Aquana</span>
                    <Link
                      href={`/vijesti/${item.id}`}
                      className="inline-flex items-center gap-1 text-xs font-bold text-sky-600 hover:text-sky-800 transition"
                    >
                      <span>Pročitaj vijest</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </article>
            ))
          ) : (
            <div className="col-span-3 py-16 text-center text-slate-500 bg-white rounded-3xl border border-slate-200">
              Nema objavljenih vijesti koje odgovaraju unesenom pojmu.
            </div>
          )}
        </div>

        {/* Pagination Bar */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 pt-6">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-2.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
              aria-label="Prethodna stranica"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => {
              // Only show nearby pages
              if (num === 1 || num === totalPages || (num >= currentPage - 2 && num <= currentPage + 2)) {
                return (
                  <button
                    key={num}
                    onClick={() => setCurrentPage(num)}
                    className={`w-10 h-10 rounded-xl text-xs font-bold transition ${
                      currentPage === num
                        ? "bg-sky-600 text-white shadow-md shadow-sky-600/30"
                        : "bg-white border border-slate-300 hover:bg-slate-50 text-slate-700"
                    }`}
                  >
                    {num}
                  </button>
                );
              } else if (num === currentPage - 3 || num === currentPage + 3) {
                return <span key={num} className="px-1 text-slate-400 font-bold">...</span>;
              }
              return null;
            })}

            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-2.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
              aria-label="Sljedeća stranica"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </main>

      <Footer currentLang={currentLang} />
    </div>
  );
}
