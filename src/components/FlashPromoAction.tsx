"use client";

import React, { useState, useEffect } from "react";
import { Coffee, Flame, Sparkles, Clock, Ticket, ArrowRight, Gift, Trophy, Gamepad2 } from "lucide-react";

interface FlashPromoActionProps {
  onOpenGame: () => void;
}

export default function FlashPromoAction({ onOpenGame }: FlashPromoActionProps) {
  // Countdown timer: 03h 48m 22s
  const [timeLeft, setTimeLeft] = useState({ hours: 3, minutes: 48, seconds: 22 });
  const [claimed, setClaimed] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-6">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-amber-500 via-orange-500 to-rose-600 p-1 shadow-[0_10px_40px_rgba(245,158,11,0.3)]">
        <div className="bg-slate-950 rounded-[22px] p-6 sm:p-8 relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Ambient decorative circles */}
          <div className="absolute -left-12 -top-12 w-64 h-64 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-rose-500/15 rounded-full blur-3xl pointer-events-none" />

          {/* Left Column: Graphics + Action Offer */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left z-10">
            {/* Visual Graphic Badge: Swimmer 50 + Coffee */}
            <div className="relative shrink-0">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-gradient-to-tr from-amber-400 to-rose-500 p-0.5 shadow-2xl flex items-center justify-center">
                <div className="w-full h-full bg-slate-950 rounded-[22px] flex flex-col items-center justify-center p-2 text-center">
                  <div className="flex items-center gap-1 text-amber-400">
                    <span className="text-3xl font-black tracking-tight">50</span>
                    <span className="text-[10px] font-black uppercase leading-tight">ULAZA</span>
                  </div>
                  <div className="w-full border-t border-amber-500/30 my-1" />
                  <div className="flex items-center gap-1 text-rose-400">
                    <Coffee className="w-4 h-4 text-amber-300" />
                    <span className="text-[11px] font-black tracking-wide">+ 5 KAFA</span>
                  </div>
                </div>
              </div>

              {/* Blinking Flame Badge */}
              <div className="absolute -top-2 -right-2 bg-gradient-to-r from-rose-600 to-red-600 text-white text-[10px] font-black px-2 py-0.5 rounded-full border border-rose-300 flex items-center gap-1 animate-pulse shadow-md">
                <Flame className="w-3 h-3 fill-amber-300 text-amber-300" />
                <span>FLASH AKCIJA</span>
              </div>
            </div>

            {/* Offer Text Details */}
            <div className="space-y-2 max-w-xl">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <span className="px-3 py-0.5 rounded-full bg-amber-500/20 text-amber-400 text-[11px] font-black tracking-wider uppercase border border-amber-500/30 flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-amber-300" />
                  <span>DANAŠNJI ZEC IZ ŠEŠIRA</span>
                </span>
                <span className="text-[11px] text-slate-400 font-medium">
                  • Caffe Bar GOB & Recepcija
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-snug">
                Uz sezonsku kartu od 50 ulazaka dobijate <span className="text-amber-400">5 besplatnih kafa</span> u Caffe Baru GOB!
              </h3>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Aktivirajte akciju odmah na sajtu i preuzmite digitalni bar-kod kupon koji važi na biletarnici i u našem caffe baru.
              </p>
            </div>
          </div>

          {/* Right Column: Countdown + Action Buttons */}
          <div className="flex flex-col items-center sm:items-end justify-center gap-4 shrink-0 z-10 w-full sm:w-auto">
            {/* Live Countdown Box */}
            <div className="bg-slate-900 border border-amber-500/40 rounded-2xl p-3 flex items-center gap-3 shadow-inner">
              <Clock className="w-4 h-4 text-amber-400 animate-spin" />
              <div className="text-xs text-slate-400">
                <span className="block text-[10px] uppercase font-bold text-slate-400">Akcija ističe za:</span>
                <div className="text-base font-black font-mono text-white tracking-widest">
                  {String(timeLeft.hours).padStart(2, "0")}h : {String(timeLeft.minutes).padStart(2, "0")}m : {String(timeLeft.seconds).padStart(2, "0")}s
                </div>
              </div>
            </div>

            {/* Buttons Row */}
            <div className="flex flex-wrap items-center justify-center gap-3 w-full sm:w-auto">
              {/* Button A: Preuzmi kupon */}
              <button
                onClick={() => setClaimed(true)}
                className={`px-5 py-3 rounded-xl font-black text-xs uppercase tracking-wider transition shadow-lg flex items-center gap-2 ${
                  claimed
                    ? "bg-emerald-500 text-slate-950"
                    : "bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-300 hover:to-orange-400 text-slate-950 hover:scale-105"
                }`}
              >
                <Ticket className="w-4 h-4" />
                <span>{claimed ? "KUPON REZERVISAN (#50K-26)" : "REZERVIŠI KUPON ODMAH"}</span>
              </button>

              {/* Button B: Pokreni igru uhvati ribicu */}
              <button
                onClick={onOpenGame}
                className="px-4 py-3 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 hover:text-white border border-cyan-400/40 font-black text-xs uppercase tracking-wider transition flex items-center gap-2 hover:scale-105"
              >
                <Gamepad2 className="w-4 h-4 text-cyan-300" />
                <span>IGRAJ „UHVATI RIBICU“ (NAGRADA KARTA)</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
