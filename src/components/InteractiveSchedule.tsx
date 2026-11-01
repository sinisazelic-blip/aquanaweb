"use client";

import React, { useState, useMemo } from "react";
import { Lang } from "@/lib/translations";
import liveData from "@/lib/livePoolManagerSchedule.json";
import { Clock, Calendar, CheckCircle2, Users, Sparkles, Waves, ShieldCheck, Database, Award, ArrowRight, ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";

interface InteractiveScheduleProps {
  currentLang: Lang;
}

export default function InteractiveSchedule({ currentLang }: InteractiveScheduleProps) {
  // Days of week 0 = Ponedjeljak ... 6 = Nedjelja
  const [selectedDay, setSelectedDay] = useState<number>(0);
  const [selectedPoolName, setSelectedPoolName] = useState<string>("Veliki"); // "Veliki" or "Mali"
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const dayNames = [
    { id: 0, lat: "Ponedjeljak", cir: "Понедјељак", en: "Monday" },
    { id: 1, lat: "Utorak", cir: "Уторак", en: "Tuesday" },
    { id: 2, lat: "Srijeda", cir: "Сриједа", en: "Wednesday" },
    { id: 3, lat: "Četvrtak", cir: "Четвртак", en: "Thursday" },
    { id: 4, lat: "Petak", cir: "Петак", en: "Friday" },
    { id: 5, lat: "Subota", cir: "Субота", en: "Saturday" },
    { id: 6, lat: "Nedjelja", cir: "Недјеља", en: "Sunday" },
  ];

  // Get raw items for selected day
  const dayItems = useMemo(() => {
    const raw = (liveData.schedule as any)[selectedDay] || [];
    return raw.filter((item: any) => {
      if (selectedPoolName === "Veliki") {
        return item.pool.includes("Veliki") || item.pool.includes("50m");
      } else {
        return item.pool.includes("Mali") || item.pool.includes("rasplivavanje") || item.pool.includes("25m");
      }
    });
  }, [selectedDay, selectedPoolName]);

  // Unique time slots
  const timeSlots = [
    { start: "06:00", end: "08:00", label: "06:00 – 08:00h (Jutarnji termin)" },
    { start: "08:00", end: "10:00", label: "08:00 – 10:00h (Prijepodnevni termin)" },
    { start: "10:00", end: "12:00", label: "10:00 – 12:00h" },
    { start: "12:00", end: "14:00", label: "12:00 – 14:00h (Dnevni termin)" },
    { start: "14:00", end: "16:00", label: "14:00 – 16:00h" },
    { start: "16:00", end: "18:00", label: "16:00 – 18:00h (Vršni klupski termin)" },
    { start: "18:00", end: "20:00", label: "18:00 – 20:00h (Trenažni termin)" },
    { start: "20:00", end: "22:00", label: "20:00 – 22:00h (Noćno rekreativno kupanje)" },
  ];

  // Available lanes for selected pool
  const maxLanes = selectedPoolName === "Veliki" ? 10 : 5;

  // Display only first 2 slots by default unless expanded by user
  const visibleSlots = isExpanded ? timeSlots : timeSlots.slice(0, 2);

  return (
    <section
      id="raspored"
      className="py-20 w-full text-white relative overflow-hidden bg-slate-950"
      style={{
        backgroundImage: "linear-gradient(180deg, rgba(8, 32, 60, 0.88) 0%, rgba(10, 48, 80, 0.84) 50%, rgba(8, 24, 44, 0.94) 100%), url('/images/GOB-11.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Background aquatic ambient glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-sky-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 space-y-8 relative z-10">
        {/* Section Header with live DB sync badge */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-slate-800 pb-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/20 text-sky-300 text-xs font-bold border border-sky-400/30">
              <Database className="w-3.5 h-3.5 text-cyan-400" />
              <span>DIREKTNA SINHRONIZACIJA SA BAZOM POOL MANAGERA GOB-a</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
              Stvarni raspored i popunjenost bazenskih staza
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm max-w-2xl leading-relaxed">
              Zvanična matrica zauzeća staza za 10 plivačkih i vaterpolo klubova. Prije polaska na bazen provjerite u kojim terminima je slobodno rekreativno plivanje za građanstvo.
            </p>
          </div>

          {/* Pool Facility Switcher */}
          <div className="flex items-center gap-2 bg-slate-800 p-1.5 rounded-2xl border border-slate-700 self-start lg:self-auto">
            <button
              onClick={() => setSelectedPoolName("Veliki")}
              className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition ${
                selectedPoolName === "Veliki"
                  ? "bg-sky-500 text-slate-950 shadow-md shadow-sky-500/30"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              Veliki olimpijski (50m • 10 staza)
            </button>
            <button
              onClick={() => setSelectedPoolName("Mali")}
              className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition ${
                selectedPoolName === "Mali"
                  ? "bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              Mali bazen (25m • 5 staza)
            </button>
          </div>
        </div>

        {/* Days of Week Selector */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {dayNames.map((d) => (
            <button
              key={d.id}
              onClick={() => setSelectedDay(d.id)}
              className={`px-5 py-3 rounded-2xl text-xs font-black uppercase tracking-wider transition shrink-0 flex items-center gap-2 ${
                selectedDay === d.id
                  ? "bg-white text-slate-950 shadow-lg shadow-white/10 scale-105"
                  : "bg-slate-800/80 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-700/60"
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>{d.lat}</span>
            </button>
          ))}
        </div>

        {/* Real Live Lane Matrix Grid */}
        <div className="space-y-4">
          {visibleSlots.map((slot, sIdx) => {
            // Find allocations in this time window
            // If item start <= slot.start and end >= slot.end
            const matchedInSlot = dayItems.filter((item: any) => {
              return item.start <= slot.start && item.end >= slot.end;
            });

            // Map which lanes are taken by clubs
            const occupiedMap = new Map<number, any>();
            matchedInSlot.forEach((item: any) => {
              occupiedMap.set(item.laneNumber, item);
            });

            const freeLanesCount = maxLanes - occupiedMap.size;

            return (
              <div
                key={sIdx}
                className="bg-slate-900/80 backdrop-blur-md rounded-3xl p-5 border border-sky-500/20 hover:border-sky-400/40 shadow-xl transition space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-700/60 pb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center shrink-0">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-black text-white text-base">{slot.label}</h4>
                      <span className="text-[11px] text-slate-400">
                        {freeLanesCount > 0
                          ? `Dostupno ${freeLanesCount} slobodnih staza za građane i rekreativce`
                          : "Sve staze zauzete trenažnim procesom klubova"}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${
                        freeLanesCount > 0
                          ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                          : "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                      }`}
                    >
                      {freeLanesCount > 0 ? `Slobodno: ${freeLanesCount}/${maxLanes} staza` : "Klupski termin"}
                    </span>
                  </div>
                </div>

                {/* Lanes Visual Grid (Staza 0 do Staza 9) */}
                <div className={`grid grid-cols-2 sm:grid-cols-5 ${maxLanes === 10 ? "lg:grid-cols-10" : "lg:grid-cols-5"} gap-2.5`}>
                  {Array.from({ length: maxLanes }, (_, lIdx) => {
                    const laneNum = selectedPoolName === "Veliki" ? lIdx : lIdx + 1;
                    const allocation = occupiedMap.get(laneNum);

                    return (
                      <div
                        key={lIdx}
                        className={`p-3 rounded-2xl border text-center flex flex-col justify-between min-h-[90px] transition ${
                          allocation
                            ? "bg-slate-900/90 border-sky-800 text-white shadow-sm"
                            : "bg-emerald-950/30 border-emerald-500/40 text-emerald-300 hover:bg-emerald-900/30"
                        }`}
                      >
                        <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mb-1">
                          <span>S{laneNum}</span>
                          <Waves className={`w-3 h-3 ${allocation ? "text-sky-500" : "text-emerald-400"}`} />
                        </div>

                        {allocation ? (
                          <div className="space-y-0.5">
                            <strong className="text-xs font-black text-sky-300 block truncate" title={allocation.clubFull}>
                              {allocation.club}
                            </strong>
                            <span className="text-[9px] text-slate-400 block font-semibold">
                              {allocation.billing === "JI" ? "Javni interes" : "Komercijalno"}
                            </span>
                          </div>
                        ) : (
                          <div className="space-y-0.5">
                            <span className="text-[10px] font-black text-emerald-400 block uppercase tracking-wider">
                              GRAĐANSTVO
                            </span>
                            <span className="text-[9px] text-emerald-300/80 block">Rekreacija</span>
                          </div>
                        )}

                        <span className="text-[9px] font-mono text-slate-500 mt-1 block">
                          {allocation ? "Zauzeto" : "Slobodno"}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Dynamic Accordion Toggle Button ("Ponjava" skupljena po defaultu) */}
        <div className="pt-2">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-sky-500/25 via-sky-600/30 to-blue-600/25 hover:from-sky-500/40 hover:to-blue-600/40 border-2 border-sky-400/40 hover:border-sky-400 text-white font-black text-sm uppercase tracking-wider flex items-center justify-center gap-3 transition-all duration-300 shadow-xl group backdrop-blur-md cursor-pointer"
          >
            <span>
              {isExpanded
                ? "▲ Skupi raspored (prikaži samo aktuelne termine)"
                : `▼ Prikaži kompletan cjelodnevni raspored za ${dayNames[selectedDay].lat} (još ${timeSlots.length - 2} termina do 22:00h)`}
            </span>
            <ChevronDown
              className={`w-5 h-5 text-sky-300 transition-transform duration-300 ${
                isExpanded ? "rotate-180" : "group-hover:translate-y-0.5"
              }`}
            />
          </button>
        </div>

        {/* Legend and Real System Info Footer */}
        <div className="p-6 rounded-3xl bg-slate-800/80 border border-slate-700 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs text-slate-300">
          <div className="flex flex-wrap items-center gap-6">
            <span className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-md bg-emerald-500"></span>
              <strong>Zeleno:</strong> Slobodne staze za rekreativno plivanje građana
            </span>
            <span className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-md bg-sky-500"></span>
              <strong>Plavo:</strong> Trenažni termini licenciranih klubova (APK 22. April, PK Olymp, PK Borac...)
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/cjenovnik"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-400 hover:text-sky-300 transition"
            >
              <span>Pregledaj cijene ulaznica</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
