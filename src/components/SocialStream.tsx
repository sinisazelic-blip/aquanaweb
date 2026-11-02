"use client";

import React from "react";
import { Lang, tr } from "@/lib/translations";
import { Facebook, Instagram, Heart, MessageCircle, Share2, Sparkles, ExternalLink } from "lucide-react";

interface SocialStreamProps {
  currentLang: Lang;
}

export default function SocialStream({ currentLang }: SocialStreamProps) {
  const t = (s: string) => tr(s, currentLang);
  const posts = [
    {
      id: 1,
      source: "facebook",
      author: "JP Aquana - Gradski olimpijski bazen",
      handle: "@rijeka.sport1 / @aquana.ba",
      time: "Prije 2 sata",
      text: "🏊‍♂️ NOVOSTI: Od ove nedjelje termini za građanstvo su produženi! Radimo od 07:00 do 22:00h. Voda je na savršenih 26.8°C, a 5 slobodnih staza čeka rekreativce. Vidimo se na bazenu!",
      image: "/images/GOB-10.jpg",
      likes: 142,
      comments: 19,
    },
    {
      id: 2,
      source: "instagram",
      author: "aquana.banjaluka",
      handle: "#akvana #gob #banjaluka",
      time: "Prije 5 sati",
      text: "Jutarnja energija na Gradskom olimpijskom bazenu! Dok grad još spava, naši plivači osvajaju kilometre. 🌅💧 #plivanje #sport #zdravlje",
      image: "/images/ACO_1911-1.jpg",
      likes: 289,
      comments: 34,
    },
    {
      id: 3,
      source: "facebook",
      author: "JP Aquana Banja Luka",
      handle: "@aquana.ba",
      time: "Juče u 16:30",
      text: "Pripreme za Međunarodni miting 'Plivaj srcem 2026' su u punom jeku! Prijavljeno preko 350 plivača iz 5 država. Dođite da bodrimo naše šampione!",
      image: "/images/Plivaj-srcem-2026-propozicije_261027_111254-300x225.jpg",
      likes: 310,
      comments: 42,
    },
  ];

  return (
    <section className="py-16 w-full bg-slate-900 text-white relative overflow-hidden">
      {/* Background neon glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 space-y-10 relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs font-black uppercase tracking-widest mb-2">
              <Sparkles className="w-3.5 h-3.5 text-rose-400 animate-spin" />
              <span>{t("DRUŠTVENE MREŽE UŽIVO")}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
              {t("Pratite puls bazena na mrežama")}
            </h2>
            <p className="text-slate-400 text-sm mt-1">
              {t("Direktne objave, atmosferu sa takmičenja i najnovije fotografije pratite na našim zvaničnim profilima.")}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-600/30 transition hover:scale-105"
            >
              <Facebook className="w-4 h-4" />
              <span>{t("Facebook stranica")}</span>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 via-rose-600 to-amber-600 hover:opacity-90 text-white font-bold text-xs shadow-lg transition hover:scale-105"
            >
              <Instagram className="w-4 h-4" />
              <span>{t("Instagram profil")}</span>
            </a>
          </div>
        </div>

        {/* Live Social Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post) => (
            <div
              key={post.id}
              className="rounded-3xl bg-slate-800/80 border border-slate-700/80 p-5 flex flex-col justify-between hover:border-sky-400/60 transition-all duration-300 hover:scale-[1.02] shadow-xl group"
            >
              <div className="space-y-4">
                {/* Author row */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-sky-500 to-cyan-400 flex items-center justify-center text-slate-950 font-black text-sm">
                      AQ
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-white group-hover:text-sky-400 transition leading-snug">
                        {post.author}
                      </h4>
                      <p className="text-[11px] text-slate-400">{t(post.time)}</p>
                    </div>
                  </div>

                  {post.source === "facebook" ? (
                    <Facebook className="w-5 h-5 text-blue-400 shrink-0" />
                  ) : (
                    <Instagram className="w-5 h-5 text-rose-400 shrink-0" />
                  )}
                </div>

                {/* Text */}
                <p className="text-xs text-slate-200 leading-relaxed">
                  {t(post.text)}
                </p>

                {/* Photo */}
                <div className="relative h-48 w-full rounded-2xl overflow-hidden bg-slate-950">
                  <img
                    src={post.image}
                    alt="Social objava"
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                </div>
              </div>

              {/* Engagement row */}
              <div className="pt-4 mt-4 border-t border-slate-700/60 flex items-center justify-between text-xs text-slate-400">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1.5 text-rose-400 font-bold">
                    <Heart className="w-4 h-4 fill-rose-500" />
                    <span>{post.likes}</span>
                  </span>
                  <span className="flex items-center gap-1.5 hover:text-white transition">
                    <MessageCircle className="w-4 h-4" />
                    <span>{post.comments}</span>
                  </span>
                </div>

                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] font-bold text-sky-400 hover:text-sky-300"
                >
                  <span>{t("Pogledaj na mreži")}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

