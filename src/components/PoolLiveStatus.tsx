"use client";

import React, { useState } from "react";
import { Lang, tr } from "@/lib/translations";
import { realClubs } from "@/lib/realPoolData";
import { getPortalSettings, PortalSettings } from "@/lib/submissionsData";
import { useEffect } from "react";
import { Droplets, Thermometer, Clock, Activity, ShieldCheck, Users, Award, Radio } from "lucide-react";

interface PoolLiveStatusProps {
  currentLang: Lang;
}

export default function PoolLiveStatus({ currentLang }: PoolLiveStatusProps) {
  const [activeRadar, setActiveRadar] = useState<"gob" | "vp">("gob");
  const [portalSettings, setPortalSettings] = useState<PortalSettings | null>(null);
  useEffect(() => {
    setPortalSettings(getPortalSettings());
    fetch("/api-telemetry.php")
      .then(r => r.json())
      .then(data => {
        if (data && data.waterTemp) {
          setPortalSettings(prev => ({
            ...(prev || getPortalSettings()),
            telemetry: {
              ...(prev?.telemetry || getPortalSettings().telemetry),
              ...data
            }
          }));
        }
      })
      .catch(() => {});
  }, []);
  const waterTemp = portalSettings?.telemetry?.waterTemp || "26.8";
  const airTemp = portalSettings?.telemetry?.airTemp || "28.5";
  const waterStatus = portalSettings?.telemetry?.waterStatus || "FINA takmičarska norma";
  const airStatus = portalSettings?.telemetry?.airStatus || "Klimatizovana dvorana";
  const t = (s: string) => tr(s, currentLang);

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl shadow-sky-900/5 border border-sky-100 relative overflow-hidden">
      {/* Background aquatic subtle glow */}
      <div className="absolute -right-20 -bottom-20 w-72 h-72 bg-sky-100/60 rounded-full blur-3xl pointer-events-none" />

      {/* Top Banner: Real Operational Regime */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-slate-100 pb-6 mb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold mb-2 border border-emerald-200/60">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>{t("UŽIVO POPUNJENOST & TELEMETRIJA")}</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <Activity className="w-7 h-7 text-sky-500" />
            <span>{t("Radar popunjenosti bazena u realnom vremenu")}</span>
          </h3>
          <p className="text-slate-500 text-sm mt-1">
            {t("Zvanični podaci direktno sa elektronske kontrole prolaza i tripoda na ulazima.")}
          </p>
        </div>

        {/* Radar Facility Selector Toggle */}
        <div className="flex items-center bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
          <button
            onClick={() => setActiveRadar("gob")}
            className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition ${
              activeRadar === "gob"
                ? "bg-sky-600 text-white shadow-md shadow-sky-600/30"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            {t("GOB (Plivači u vodi)")}
          </button>
          <button
            onClick={() => setActiveRadar("vp")}
            className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition ${
              activeRadar === "vp"
                ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/30"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            {t("Vodeni park (Sezona)")}
          </button>
        </div>
      </div>

      {/* Main Grid: Radar Widget on Left + Metrics & Schedule on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-8">
        {/* Left Column: Official Live Radar Widget Frame (Vibrant & Aquatic Light Theme) */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 bg-gradient-to-br from-sky-50 via-cyan-50 to-blue-100/60 rounded-3xl border-2 border-sky-200/90 shadow-xl shadow-sky-900/5 relative overflow-hidden text-slate-800">
          <div className="w-full flex items-center justify-between pb-3 border-b border-sky-200 text-xs">
            <span className="flex items-center gap-1.5 font-extrabold text-sky-900">
              <Radio className="w-4 h-4 animate-pulse text-sky-600" />
              <span>{activeRadar === "gob" ? t("Radar GOB: Broj plivača u vodi") : t("Radar VP: Posjećenost (Ljetna sezona)")}</span>
            </span>
            <span className="text-[11px] text-sky-700 font-mono font-bold bg-sky-100/80 px-2 py-0.5 rounded-md border border-sky-200">ulazi.aquana.ba</span>
          </div>

          {/* Iframe widget for GOB radar */}
          {activeRadar === "gob" ? (
            <div className="w-full flex items-center justify-center py-2">
              <iframe
                src="https://ulazi.aquana.ba/widget/occupancy"
                title={t("Trenutna popunjenost - JP Aquana")}
                width="360"
                height="360"
                scrolling="no"
                className="rounded-3xl max-w-none bg-transparent border-0 drop-shadow-md transform scale-[0.82] sm:scale-[0.86] origin-center -my-5"
              />
            </div>
          ) : (
            <div className="w-full h-[340px] flex flex-col items-center justify-center text-center p-6 space-y-3">
              <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center shadow-inner">
                <Clock className="w-8 h-8" />
              </div>
              <h4 className="text-lg font-black text-slate-900">{t("Vodeni park – Van sezone")}</h4>
              <p className="text-xs text-slate-600 max-w-xs font-medium">
                {t("Tripodi i radar vodenog parka na kapijama Borik se automatski aktiviraju sa početkom ljetne kupališne sezone 2026.")}
              </p>
            </div>
          )}

          <div className="w-full text-center pt-2 border-t border-sky-200 text-[11px] text-sky-800 font-semibold flex items-center justify-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
            <span>{t("Automatsko osvježavanje sa sistema tripoda GOB-a")}</span>
          </div>
        </div>

        {/* Right Column: 4 Real Technical Metrics & Operational Context */}
        <div className="lg:col-span-7 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {/* Metric 1: FINA Water Temp */}
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                <Droplets className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[11px] text-slate-500 font-bold uppercase">{t("Temperatura vode")}</p>
                <p className="text-2xl font-black text-slate-900">{waterTemp} °C</p>
                <span className="text-[10px] text-emerald-600 font-bold">{t(waterStatus)}</span>
              </div>
            </div>

            {/* Metric 2: Ambient Air Temp */}
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
                <Thermometer className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[11px] text-slate-500 font-bold uppercase">{t("Temperatura dvorane")}</p>
                <p className="text-2xl font-black text-slate-900">{airTemp} °C</p>
                <span className="text-[10px] text-sky-600 font-bold">{t(airStatus)}</span>
              </div>
            </div>

            {/* Metric 3: Real Dimensions */}
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[11px] text-slate-500 font-bold uppercase">{t("Olimpijski bazen")}</p>
                <p className="text-2xl font-black text-slate-900">50 × 25 m</p>
                <span className="text-[10px] text-slate-500 font-semibold">{t("10 takmičarskih staza")}</span>
              </div>
            </div>

            {/* Metric 4: Real Working Hours */}
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[11px] text-slate-500 font-bold uppercase">{t("Radno vrijeme")}</p>
                <p className="text-xl font-black text-slate-900">06:00 – 22:00h</p>
                <span className="text-[10px] text-slate-500 font-semibold">{t("Vikendom od 07:00h")}</span>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-sky-50 border border-sky-200/80 flex items-start gap-3">
            <Users className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
            <div className="text-xs text-slate-700">
              <strong className="text-slate-900 block font-bold">{t("Kako radi brojač kupača:")}</strong>
              <span>{t("Tripodi na ulazima 1 i 2 automatski bilježe svaki ulazak i izlazak kupača sa bazena. Podaci se u realnom vremenu prenose na ovaj radar, omogućavajući građanima da prije dolaska provjere trenutnu zauzetost staza.")}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Real Registered Clubs Bar (from database dev.db) */}
      <div className="pt-6 border-t border-slate-100">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
          <span className="text-xs font-black text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
            <Award className="w-4 h-4 text-sky-600" />
            <span>{t("Zvanični klubovi korisnici GOB-a (Plivanje, Vaterpolo, Ronjenje):")}</span>
          </span>
          <span className="text-xs text-slate-400 font-semibold">{t("10 registrovanih klubova u sistemu")}</span>
        </div>

        <div className="flex flex-wrap gap-2">
          {realClubs.map((club) => (
            <span
              key={club.id}
              className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-sky-100 text-slate-800 hover:text-sky-900 text-xs font-bold border border-slate-200 transition"
              title={`${t(club.name)} (${t(club.typeLabel)})`}
            >
              {t(club.shortName)}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

