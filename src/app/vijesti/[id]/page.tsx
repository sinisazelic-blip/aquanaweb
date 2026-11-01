"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import { allNewsArticles } from "@/lib/newsData";
import { Calendar, Tag, ArrowLeft, Share2, Facebook, Twitter, Phone, ChevronRight } from "lucide-react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function SingleNewsPage() {
  const params = useParams();
  const [currentLang, setCurrentLang] = useState<any>("lat");

  const idNum = Number(params?.id);
  const article = allNewsArticles.find((a) => a.id === idNum) || allNewsArticles[0];

  // Related news
  const related = allNewsArticles
    .filter((a) => a.id !== article.id && a.category === article.category)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      <Header
        currentLang={currentLang}
        setLang={setCurrentLang}
        onOpenSurvey={() => {}}
      />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-8 py-10 space-y-8">
        {/* Breadcrumb & Back */}
        <div className="flex items-center justify-between gap-4">
          <Link
            href="/vijesti"
            className="inline-flex items-center gap-2 text-xs font-bold text-sky-700 hover:text-sky-900 bg-sky-50 hover:bg-sky-100 px-3.5 py-2 rounded-xl transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Sve vijesti</span>
          </Link>

          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span>Početna</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span>Vijesti</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-slate-700 font-semibold truncate max-w-[200px]">{article.title}</span>
          </div>
        </div>

        {/* Article Container */}
        <article className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full bg-sky-100 text-sky-800 text-xs font-black uppercase tracking-wider">
                {article.category}
              </span>
              <span className="text-xs text-slate-500 font-medium flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                {article.date}
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
              {article.title}
            </h1>
          </div>

          {/* Featured Image */}
          {article.image && (
            <div className="relative rounded-2xl overflow-hidden shadow-lg aspect-video bg-slate-100">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Article Text */}
          <div className="prose max-w-none text-slate-700 text-base sm:text-lg leading-relaxed space-y-4 font-normal">
            <p className="font-semibold text-slate-900 text-lg sm:text-xl leading-snug">
              {article.excerpt}
            </p>
            <div className="whitespace-pre-line pt-2 text-slate-700">
              {article.content}
            </div>
          </div>

          {/* Official Callout Box */}
          <div className="p-6 rounded-2xl bg-sky-50 border border-sky-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h4 className="font-black text-slate-900 text-sm">Gradski olimpijski bazen Banja Luka</h4>
              <p className="text-xs text-slate-600 mt-0.5">
                Za više informacija i upise: recepcija <strong>+387 (0) 51 456 450</strong> • obuka neplivača <strong>065 72 50 50</strong>
              </p>
            </div>
            <a
              href="tel:065725050"
              className="px-4 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs uppercase tracking-wider transition shrink-0"
            >
              Pozovi info pult
            </a>
          </div>
        </article>

        {/* Related News */}
        {related.length > 0 && (
          <div className="space-y-4 pt-6">
            <h3 className="text-xl font-black text-slate-900 tracking-tight">Povezane vijesti</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {related.map((r) => (
                <Link
                  key={r.id}
                  href={`/vijesti/${r.id}`}
                  className="bg-white p-4 rounded-2xl border border-slate-200 hover:border-sky-400 hover:shadow-md transition group"
                >
                  <span className="text-[10px] font-bold text-sky-600 uppercase block mb-1">{r.date}</span>
                  <h4 className="font-bold text-xs text-slate-900 group-hover:text-sky-600 transition line-clamp-2">
                    {r.title}
                  </h4>
                </Link>
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer currentLang={currentLang} />
    </div>
  );
}
