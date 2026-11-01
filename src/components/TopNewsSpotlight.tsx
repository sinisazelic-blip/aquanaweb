"use client";

import React from "react";
import { Lang } from "@/lib/translations";
import { Zap, Clock, ArrowRight, X, AlertTriangle, Sparkles } from "lucide-react";

export interface TopNewsData {
  isActive: boolean;
  type: "urgent" | "breaking" | "announcement" | "season";
  title_lat: string;
  title_cir: string;
  title_en: string;
  summary_lat: string;
  summary_cir: string;
  summary_en: string;
  linkText_lat?: string;
  linkText_cir?: string;
  linkText_en?: string;
  linkUrl?: string;
  validUntil?: string; // e.g. "2026-11-03"
}

interface TopNewsProps {
  currentLang: Lang;
  news: TopNewsData;
  onDismiss?: () => void;
}

export default function TopNewsSpotlight({ currentLang, news, onDismiss }: TopNewsProps) {
  if (!news.isActive) return null;

  const title = currentLang === 'cir' ? news.title_cir : currentLang === 'en' ? news.title_en : news.title_lat;
  const summary = currentLang === 'cir' ? news.summary_cir : currentLang === 'en' ? news.summary_en : news.summary_lat;
  const linkText = currentLang === 'cir' ? (news.linkText_cir || "Сазнај више") : currentLang === 'en' ? (news.linkText_en || "Read more") : (news.linkText_lat || "Saznaj više");

  const badgeConfig = {
    urgent: {
      bg: "bg-rose-500",
      border: "border-rose-400/80",
      glow: "shadow-[0_0_40px_rgba(244,63,94,0.35)]",
      badgeText: currentLang === 'cir' ? "ХИТНО ОБАВЈЕШТЕЊЕ" : currentLang === 'en' ? "URGENT NOTICE" : "HITNO OBAVJEŠTENJE",
      icon: AlertTriangle,
      gradient: "from-rose-950/90 via-slate-950 to-slate-900",
    },
    breaking: {
      bg: "bg-amber-500",
      border: "border-amber-400/80",
      glow: "shadow-[0_0_45px_rgba(245,158,11,0.4)]",
      badgeText: currentLang === 'cir' ? "TOP NEWS / ВАНРЕДНО" : currentLang === 'en' ? "BREAKING / TOP NEWS" : "TOP NEWS / VANREDNO",
      icon: Zap,
      gradient: "from-amber-950/90 via-slate-950 to-slate-900",
    },
    announcement: {
      bg: "bg-sky-500",
      border: "border-sky-400/80",
      glow: "shadow-[0_0_40px_rgba(14,165,233,0.35)]",
      badgeText: currentLang === 'cir' ? "ВАЖНА НАЈАВА" : currentLang === 'en' ? "IMPORTANT NOTICE" : "VAŽNA NAJAVA",
      icon: Sparkles,
      gradient: "from-sky-950/90 via-slate-950 to-slate-900",
    },
    season: {
      bg: "bg-emerald-500",
      border: "border-emerald-400/80",
      glow: "shadow-[0_0_40px_rgba(16,185,129,0.35)]",
      badgeText: currentLang === 'cir' ? "ОТВАРАЊЕ СЕЗОНЕ" : currentLang === 'en' ? "SEASON OPENING" : "OTVARANJE SEZONE",
      icon: Sparkles,
      gradient: "from-emerald-950/90 via-slate-950 to-slate-900",
    },
  }[news.type];

  const IconComponent = badgeConfig.icon;

  return (
    <div className="relative z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 sm:mt-10 mb-8">
      <div
        className={`relative overflow-hidden rounded-3xl p-6 sm:p-8 bg-gradient-to-r ${badgeConfig.gradient} text-white border-2 ${badgeConfig.border} ${badgeConfig.glow} transition-all duration-500`}
      >
        {/* Animated Neon Pulser behind the card */}
        <div className="absolute -right-16 -top-16 w-56 h-56 bg-gradient-to-br from-amber-400/20 to-sky-400/20 rounded-full blur-2xl pointer-events-none animate-pulse" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            {/* Blinking Badge */}
            <div className="flex items-center gap-2.5">
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-black tracking-widest text-slate-950 ${badgeConfig.bg} shadow-md`}>
                <IconComponent className="w-3.5 h-3.5 animate-bounce" />
                {badgeConfig.badgeText}
              </span>
              <span className="flex items-center gap-1 text-[11px] font-medium text-slate-400">
                <Clock className="w-3.5 h-3.5" />
                <span>{currentLang === 'cir' ? 'Актуелно данас' : currentLang === 'en' ? 'Featured today' : 'Aktuelno danas'}</span>
              </span>
            </div>

            {/* Glowing Big Title */}
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white drop-shadow-sm leading-tight">
              {title}
            </h3>

            {/* Concise Summary */}
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl font-normal">
              {summary}
            </p>
          </div>

          {/* Action / Dismiss */}
          <div className="flex items-center gap-3 shrink-0 w-full md:w-auto">
            {news.linkUrl && (
              <a
                href={news.linkUrl}
                className="w-full md:w-auto px-6 py-3.5 rounded-2xl bg-white hover:bg-slate-100 text-slate-950 font-black text-sm shadow-xl transition hover:scale-105 flex items-center justify-center gap-2"
              >
                <span>{linkText}</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            )}

            {onDismiss && (
              <button
                onClick={onDismiss}
                className="p-3 rounded-2xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition shrink-0"
                title="Zatvori obavještenje"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
