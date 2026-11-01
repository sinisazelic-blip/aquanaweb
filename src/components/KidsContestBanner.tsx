"use client";

import React, { useState } from "react";
import { Palette, Trophy, Upload, Sparkles, Heart, CheckCircle2, ArrowRight } from "lucide-react";

export default function KidsContestBanner() {
  const [submitted, setSubmitted] = useState(false);
  const [childName, setChildName] = useState("");
  const [parentPhone, setParentPhone] = useState("");

  const recentDrawings = [
    { id: 1, author: "Luka (8 god)", title: "Moj skok sa tobogana u Boriku", votes: 42, icon: "🎨" },
    { id: 2, author: "Sara (6 god)", title: "Olimpijski bazen i zlatna ribica", votes: 58, icon: "🏊‍♀️" },
    { id: 3, author: "Stefan (10 god)", title: "Vaterpolisti na GOB-u", votes: 35, icon: "🤽‍♂️" },
  ];

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-10">
      <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-sky-950 rounded-3xl p-6 sm:p-10 border border-purple-500/40 text-white relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          {/* Left Column: Heading and info */}
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/25 border border-purple-400/40 text-purple-300 text-xs font-black uppercase tracking-wider">
              <Palette className="w-4 h-4 text-purple-400" />
              <span>DJEČIJI KREATIVNI KUTAK • NAGRADNI KONKURS</span>
            </div>

            <h3 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight">
              „Nacrtaj Aquanu ili GOB“ — Osvoji paket od 10 besplatnih ulazaka!
            </h3>

            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              Pozivamo sve mališane i osnovce da nacrtaju svoj omiljeni trenutak sa Gradskog olimpijskog bazena ili Vodenog parka. Najljepši crtež mjeseca osvaja **sezonsku kartu od 10 ulaza**, a svi radovi se izlažu u holu bazena!
            </p>

            {/* Submissions Mini Gallery */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              {recentDrawings.map((d) => (
                <div key={d.id} className="p-3 rounded-2xl bg-white/10 border border-white/15 flex items-center gap-3">
                  <span className="text-2xl">{d.icon}</span>
                  <div className="overflow-hidden">
                    <strong className="text-xs text-white block truncate">{d.author}</strong>
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
              <span className="text-[10px] text-slate-400">Rok: kraj mjeseca</span>
            </div>

            {submitted ? (
              <div className="text-center py-6 space-y-3">
                <div className="w-12 h-12 mx-auto rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-white">Crtež je uspješno poslat!</h4>
                <p className="text-xs text-slate-300">Hvala vam! Objavljujemo ga u dječijoj galeriji čim ga moderator pregleda.</p>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (childName.trim()) setSubmitted(true);
                }}
                className="space-y-3"
              >
                <div>
                  <label className="block text-[11px] font-bold text-slate-300 uppercase mb-1">Ime i uzrast djeteta:</label>
                  <input
                    type="text"
                    required
                    value={childName}
                    onChange={(e) => setChildName(e.target.value)}
                    placeholder="npr. Marko (7 godina)"
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-purple-400"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-300 uppercase mb-1">Broj telefona roditelja:</label>
                  <input
                    type="tel"
                    required
                    value={parentPhone}
                    onChange={(e) => setParentPhone(e.target.value)}
                    placeholder="Za obavještenje o nagradi..."
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-purple-400"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-300 uppercase mb-1">Fotografija crteža (JPG / PNG):</label>
                  <div className="border border-dashed border-slate-700 rounded-xl p-3 text-center cursor-pointer hover:border-purple-400 transition bg-slate-950/60">
                    <Upload className="w-5 h-5 mx-auto text-slate-400 mb-1" />
                    <span className="text-[11px] text-slate-400 block">Kliknite za odabir uslikanog crteža</span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-400 hover:to-indigo-500 text-white font-black text-xs uppercase tracking-wider transition shadow-lg mt-2"
                >
                  Pošalji crtež na konkurs
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
