"use client";

import React from "react";
import { Lang, tr } from "@/lib/translations";
import { Calendar, ArrowRight, Facebook, Newspaper, ChevronRight } from "lucide-react";
import Link from "next/link";
import { allNewsArticles } from "@/lib/newsData";

interface NewsSectionProps {
  currentLang: Lang;
}

export default function NewsSection({ currentLang }: NewsSectionProps) {
  const t = (s: string) => tr(s, currentLang);
  // Top 3 featured news
  const newsList = allNewsArticles.slice(0, 3);

  return (
    <section id="vijesti" className="py-16 w-full bg-slate-100/70 border-b border-slate-200">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-xs font-black text-sky-600 uppercase tracking-widest block mb-1">
              {t("AKTUELNOSTI I SAOPŠTENJA")}
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              {t("Vijesti iz Akvane i GOB-a")}
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/vijesti"
              className="inline-flex items-center gap-2 text-xs font-bold text-slate-900 bg-white hover:bg-slate-50 border border-slate-300 px-4 py-2.5 rounded-xl transition shadow-sm"
            >
              <Newspaper className="w-4 h-4 text-sky-600" />
              <span>{t("Sve vijesti i arhiva")}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>

            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-xs font-bold text-sky-700 bg-sky-100 hover:bg-sky-200 px-4 py-2.5 rounded-xl transition"
            >
              <Facebook className="w-4 h-4 text-sky-600" />
              <span className="hidden md:inline">{t("Zvanični Facebook")}</span>
            </a>
          </div>
        </div>

        {/* 3 Active Photo News Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {newsList.map((item) => (
            <article
              key={item.id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group hover:-translate-y-1"
            >
              <div className="relative h-52 w-full overflow-hidden bg-slate-100">
                <img
                  src={item.image}
                  alt={t(item.title)}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="absolute top-3 left-3 bg-slate-950/70 backdrop-blur-md px-3 py-1 rounded-full text-white text-[11px] font-bold border border-white/20">
                  {t(item.category)}
                </div>
                <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-md px-2.5 py-0.5 rounded-md text-white text-[11px] font-medium flex items-center gap-1.5">
                  <Calendar className="w-3 h-3 text-sky-400" />
                  <span>{item.date}</span>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="font-black text-slate-900 text-lg leading-snug group-hover:text-sky-600 transition">
                    {t(item.title)}
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {t(item.excerpt)}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400 font-medium">{t("JP Aquana")}</span>
                  <Link
                    href={`/vijesti/${item.id}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-sky-600 hover:text-sky-800 transition"
                  >
                    <span>{t("Pročitaj više")}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
