"use client";
import { Lang, tr } from "@/lib/translations";
import { useLanguage } from "@/context/LanguageContext";

import React, { useState, useEffect } from "react";
import { MessageSquare, ThumbsUp, Send, CheckCircle2, Star, Sparkles, User, AlertCircle, Quote } from "lucide-react";
import { getVisitorComments, saveVisitorComment, VisitorComment } from "@/lib/submissionsData";

interface VisitorCommentsSectionProps {
  currentLang?: Lang;
}

export default function VisitorCommentsSection({ currentLang: propLang }: VisitorCommentsSectionProps) {
  const langCtx = useLanguage();
  const currentLang = propLang || langCtx.currentLang;
  const txt = (s: string) => tr(s, currentLang);
  const [comments, setComments] = useState<VisitorComment[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [author, setAuthor] = useState("");
  const [text, setText] = useState("");
  const [category, setCategory] = useState<VisitorComment["category"]>("Prijedlog");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setComments(getVisitorComments());
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;

    const newComment = saveVisitorComment({
      author: author.trim() || "Posjetilac",
      text: text.trim(),
      category
    });

    const updated = [newComment, ...comments];
    setComments(updated);
    setSubmitted(true);
    setAuthor("");
    setText("");
    setTimeout(() => {
      setSubmitted(false);
      setShowForm(false);
    }, 2500);
  };

  // Only show approved comments, at most 5
  const approvedComments = comments.filter((c) => c.status === "approved").slice(0, 5);

  const getCategoryBadge = (cat: VisitorComment["category"]) => {
    switch (cat) {
      case "Pohvala":
        return "bg-emerald-100 text-emerald-800 border-emerald-200";
      case "Kritika":
        return "bg-amber-100 text-amber-800 border-amber-200";
      case "Prijedlog":
      default:
        return "bg-sky-100 text-sky-800 border-sky-200";
    }
  };

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-10">
      <div className="bg-gradient-to-b from-slate-50 to-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-6">
          <div>
            <div className="flex items-center gap-2 text-sky-600 text-xs font-black uppercase tracking-wider mb-1">
              <MessageSquare className="w-4 h-4 text-sky-600" />
              <span>Glas posjetilaca</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {txt("Zid utisaka & Prijedlozi građana")}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
              {txt("Vaše mišljenje nam je dragocjeno. Ovdje možete ostaviti pohvalu, prijedlog ili skrenuti pažnju upravi na stvari koje možemo poboljšati.")}
            </p>
          </div>

          <button
            onClick={() => setShowForm(!showForm)}
            className="px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs uppercase tracking-wider transition shadow-sm hover:scale-105 shrink-0 cursor-pointer"
          >
            {showForm ? "Zatvori formu" : "✍️ Ostavi svoj utisak ili prijedlog"}
          </button>
        </div>

        {/* Comment Submission Form */}
        {showForm && (
          <form onSubmit={handleSubmit} className="bg-sky-50/70 border border-sky-200 rounded-2xl p-5 sm:p-6 space-y-4 animate-in fade-in duration-200">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-sky-900 uppercase tracking-wide">
                Novi komentar ili prijedlog:
              </span>
              <span className="text-[11px] text-slate-500">
                Svaki utisak se pregleda u CMS administraciji
              </span>
            </div>

            {submitted ? (
              <div className="p-4 rounded-xl bg-emerald-100 border border-emerald-300 text-emerald-800 text-xs font-bold flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 shrink-0" />
                <span>Hvala Vam! Vaš komentar je uspješno zabilježen i biće prikazan na zidu utisaka.</span>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-bold text-slate-700 uppercase block mb-1">
                      Vaše ime ili nadimak:
                    </label>
                    <input
                      type="text"
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                      placeholder="npr. Goran M. (rekreativac)"
                      className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 bg-white font-semibold focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-700 uppercase block mb-1">
                      Kategorija utiska:
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value as VisitorComment["category"])}
                      className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 bg-white font-semibold"
                    >
                      <option value="Prijedlog">Prijedlog za poboljšanje</option>
                      <option value="Pohvala">Pohvala osoblju ili bazenu</option>
                      <option value="Kritika">Primjedba / Šta treba popraviti</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-700 uppercase block mb-1">
                    Vaš komentar / prijedlog:
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Napišite Vaš iskreni utisak, npr. 'Super ste, ali je parking pun oko 17h' ili 'Popravite fen u svlačionici'..."
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 bg-white font-semibold focus:outline-none focus:ring-2 focus:ring-sky-500/20 resize-none"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-xs uppercase"
                  >
                    Odustani
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-black text-xs uppercase shadow-md flex items-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Objavi utisak</span>
                  </button>
                </div>
              </>
            )}
          </form>
        )}

        {/* Top 5 Approved Comments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {approvedComments.map((com, idx) => (
            <div
              key={com.id}
              className={`p-5 rounded-2xl border bg-white shadow-sm flex flex-col justify-between space-y-3 relative overflow-hidden transition hover:shadow-md ${
                idx === 0 ? "border-sky-300 ring-1 ring-sky-200" : "border-slate-200"
              }`}
            >
              <Quote className="w-10 h-10 text-slate-100 absolute -right-2 -bottom-2 pointer-events-none" />

              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase border ${getCategoryBadge(com.category)}`}>
                    {com.category}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">{com.date}</span>
                </div>

                <p className="text-xs sm:text-[13px] text-slate-800 leading-relaxed italic">
                  „{com.text}“
                </p>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span className="font-bold text-slate-900 flex items-center gap-1">
                  <User className="w-3 h-3 text-slate-400" />
                  <span>{com.author}</span>
                </span>
                <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-0.5">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Verifikovano</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
