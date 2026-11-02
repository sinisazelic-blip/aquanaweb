"use client";
import { Lang, tr } from "@/lib/translations";

import React, { useState, useEffect } from "react";
import { Palette, Trophy, Upload, Sparkles, Heart, CheckCircle2, ArrowRight, X, Eye, Star } from "lucide-react";
import { getKidsDrawings, saveKidsDrawing, voteKidsDrawing, KidsDrawingSubmission } from "@/lib/submissionsData";

interface KidsContestBannerProps {
  currentLang?: Lang;
}

export default function KidsContestBanner({ currentLang = 'lat' }: KidsContestBannerProps) {
  const txt = (s: string) => tr(s, currentLang);
  const [submitted, setSubmitted] = useState(false);
  const [childName, setChildName] = useState("");
  const [childAge, setChildAge] = useState("8");
  const [drawingTitle, setDrawingTitle] = useState("");
  const [parentPhone, setParentPhone] = useState("");
  const [drawings, setDrawings] = useState<KidsDrawingSubmission[]>([]);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [votedIds, setVotedIds] = useState<string[]>([]);
  const [filterMode, setFilterMode] = useState<"all" | "top">("all");

  useEffect(() => {
    setDrawings(getKidsDrawings());
    try {
      const saved = localStorage.getItem("aquana_voted_drawings");
      if (saved) setVotedIds(JSON.parse(saved));
    } catch {}
  }, []);

  const handleVote = (id: string) => {
    if (votedIds.includes(id)) return;
    const updated = voteKidsDrawing(id);
    setDrawings(updated);
    const newVoted = [...votedIds, id];
    setVotedIds(newVoted);
    try {
      localStorage.setItem("aquana_voted_drawings", JSON.stringify(newVoted));
    } catch {}
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!childName.trim() || !parentPhone.trim()) return;
    const newEntry = saveKidsDrawing({
      childName: childName.trim(),
      age: parseInt(childAge) || 8,
      title: drawingTitle.trim() || "Moj omiljeni trenutak na bazenu",
      parentPhone: parentPhone.trim()
    });
    setDrawings((prev) => [newEntry, ...prev]);
    setSubmitted(true);
  };

  const displayedDrawings = filterMode === "top"
    ? [...drawings].sort((a, b) => b.votes - a.votes)
    : drawings;

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-10">
      <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-sky-950 rounded-3xl p-6 sm:p-10 border border-purple-500/40 text-white relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          {/* Left Column: Heading, info, and Open Gallery button */}
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/25 border border-purple-400/40 text-purple-300 text-xs font-black uppercase tracking-wider">
              <Palette className="w-4 h-4 text-purple-400" />
              <span>DJEČIJI KREATIVNI KUTAK • NAGRADNI KONKURS</span>
            </div>

            <h3 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight">
              „Nacrtaj Aquanu ili GOB“ — Osvoji paket od 10 besplatnih ulazaka!
            </h3>

            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              Pozivamo sve mališane i osnovce da nacrtaju svoj omiljeni trenutak sa Gradskog olimpijskog bazena ili Vodenog parka. Najljepši crtež mjeseca osvaja <strong>sezonsku kartu od 10 ulaza</strong>, a svi radovi se izlažu u holu bazena!
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                type="button"
                onClick={() => setGalleryOpen(true)}
                className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600 hover:from-rose-600 hover:to-purple-700 text-white font-black text-xs uppercase tracking-wider flex items-center gap-2.5 shadow-xl shadow-rose-500/30 transition hover:scale-105 cursor-pointer"
              >
                <Heart className="w-4 h-4 fill-white animate-pulse" />
                <span>Pogledaj radove i glasaj (Galerija radova)</span>
              </button>
              <span className="text-xs text-purple-200/80 font-semibold">
                • {drawings.length} pristiglih radova
              </span>
            </div>

            {/* Submissions Mini Carousel / Preview */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              {drawings.slice(0, 3).map((d) => (
                <div
                  key={d.id}
                  onClick={() => setGalleryOpen(true)}
                  className="p-3 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/15 flex items-center gap-3 cursor-pointer transition hover:scale-102"
                >
                  <span className="text-2xl">🎨</span>
                  <div className="overflow-hidden">
                    <strong className="text-xs text-white block truncate">{d.childName} ({d.age} god)</strong>
                    <span className="text-[10px] text-purple-300 block truncate">{d.title}</span>
                    <span className="text-[10px] text-amber-300 font-bold flex items-center gap-1 mt-0.5">
                      <Heart className="w-3 h-3 fill-amber-300" /> {d.votes} glasova
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Submission Form */}
          <div className="lg:col-span-5 bg-slate-900/90 rounded-2xl p-6 border border-purple-400/30 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-xs font-black uppercase text-purple-300 flex items-center gap-1.5">
                <Trophy className="w-4 h-4 text-amber-400" />
                <span>POŠALJI CRTEŽ ONLINE</span>
              </span>
              <span className="text-[10px] text-slate-400">Rok: do 30.11.2026.</span>
            </div>

            {submitted ? (
              <div className="text-center py-6 space-y-3">
                <div className="w-12 h-12 mx-auto rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-white">Crtež je uspješno poslat!</h4>
                <p className="text-xs text-slate-300">
                  Hvala vam! Crtež je zabilježen u bazi JP Aquana i biće izložen u galeriji nakon pregleda administratora.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setChildName("");
                    setDrawingTitle("");
                    setParentPhone("");
                  }}
                  className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition cursor-pointer"
                >
                  Pošalji još jedan rad
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-300 uppercase mb-1">
                    Ime i prezime djeteta:
                  </label>
                  <input
                    type="text"
                    required
                    value={childName}
                    onChange={(e) => setChildName(e.target.value)}
                    placeholder="npr. Ana Jovanović"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-700 bg-slate-800 text-white focus:outline-purple-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-300 uppercase mb-1">
                      Uzrast (godine):
                    </label>
                    <input
                      type="number"
                      min={4}
                      max={15}
                      value={childAge}
                      onChange={(e) => setChildAge(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-700 bg-slate-800 text-white focus:outline-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-300 uppercase mb-1">
                      Telefon roditelja:
                    </label>
                    <input
                      type="tel"
                      required
                      value={parentPhone}
                      onChange={(e) => setParentPhone(e.target.value)}
                      placeholder="065..."
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-700 bg-slate-800 text-white focus:outline-purple-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-300 uppercase mb-1">
                    Naziv crteža:
                  </label>
                  <input
                    type="text"
                    value={drawingTitle}
                    onChange={(e) => setDrawingTitle(e.target.value)}
                    placeholder="npr. Skok u bazen / Ljetni tobogan"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-700 bg-slate-800 text-white focus:outline-purple-500"
                  />
                </div>

                <div className="p-3 rounded-xl border-2 border-dashed border-purple-500/40 bg-purple-950/30 text-center">
                  <Upload className="w-5 h-5 text-purple-400 mx-auto mb-1" />
                  <p className="text-[11px] text-slate-300 font-bold">Fotografija ili sken crteža</p>
                  <p className="text-[10px] text-slate-500">Ili donesite original na recepciju GOB-a</p>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-400 hover:to-indigo-500 text-white font-black text-xs uppercase tracking-wider transition shadow-lg shadow-purple-600/30 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Prijavi rad na konkurs</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* POPUP MODAL: GALERIJA RADOVA I GLASANJE GRAĐANA (SRCE) */}
      {galleryOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-4xl w-full p-6 sm:p-8 shadow-2xl border border-slate-100 max-h-[90vh] flex flex-col text-slate-900">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center font-bold">
                  <Heart className="w-5 h-5 fill-rose-500" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-slate-900">
                    Galerija dječijih radova — Glasanje građana
                  </h3>
                  <p className="text-xs text-slate-500">
                    Pregledajte pristigle crteže i kliknite na srce ❤️ da podržite svoje favorite!
                  </p>
                </div>
              </div>

              <button
                onClick={() => setGalleryOpen(false)}
                className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 flex items-center justify-center transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-2 py-3 border-b border-slate-100 shrink-0">
              <button
                onClick={() => setFilterMode("all")}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                  filterMode === "all" ? "bg-purple-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                Svi pristigli radovi ({drawings.length})
              </button>
              <button
                onClick={() => setFilterMode("top")}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1 ${
                  filterMode === "top" ? "bg-amber-500 text-slate-950" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                <Star className="w-3.5 h-3.5 fill-current" />
                <span>Najviše glasova</span>
              </button>
            </div>

            {/* Gallery Grid */}
            <div className="overflow-y-auto py-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 flex-1 pr-1">
              {displayedDrawings.map((d) => {
                const voted = votedIds.includes(d.id);
                return (
                  <div
                    key={d.id}
                    className="bg-slate-50 rounded-2xl p-4 border border-slate-200 flex flex-col justify-between space-y-3 hover:shadow-md transition group"
                  >
                    {/* Simulated Artistic Canvas */}
                    <div className="h-36 rounded-xl bg-gradient-to-br from-indigo-100 via-sky-100 to-purple-100 border border-slate-200 flex flex-col items-center justify-center text-center p-3 relative overflow-hidden group-hover:scale-[1.02] transition-transform">
                      <span className="text-4xl mb-1 select-none">🎨</span>
                      <strong className="text-xs font-black text-slate-800 line-clamp-1">{d.title}</strong>
                      <span className="text-[10px] text-slate-500">Crtež #{d.id}</span>
                      <div className="absolute top-2 right-2 bg-white/80 backdrop-blur-xs px-2 py-0.5 rounded text-[10px] font-mono font-bold text-purple-700">
                        {d.age} god
                      </div>
                    </div>

                    {/* Metadata */}
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">{d.childName}</h4>
                      <p className="text-[11px] text-slate-500">Objavljeno: {d.date}</p>
                    </div>

                    {/* Voting Button */}
                    <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => handleVote(d.id)}
                        disabled={voted}
                        className={`w-full py-2 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition cursor-pointer ${
                          voted
                            ? "bg-rose-500 text-white shadow-md shadow-rose-500/25 cursor-default"
                            : "bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 hover:scale-102"
                        }`}
                      >
                        <Heart className={`w-4 h-4 ${voted ? "fill-white" : "fill-rose-500"}`} />
                        <span>{voted ? `Glasano (${d.votes})` : `Glasaj (${d.votes} ❤️)`}</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Modal Footer */}
            <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500 shrink-0">
              <span>* Glasanje je otvoreno do 30.11.2026.</span>
              <button
                onClick={() => setGalleryOpen(false)}
                className="px-4 py-1.5 rounded-xl bg-slate-900 text-white font-bold hover:bg-slate-800 transition cursor-pointer"
              >
                Zatvori
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
