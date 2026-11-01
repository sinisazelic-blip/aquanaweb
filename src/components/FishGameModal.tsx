"use client";

import React, { useState, useEffect } from "react";
import { Sparkles, Trophy, Play, CheckCircle2, X, Clock, Flame, Ticket, RefreshCw, Send } from "lucide-react";

interface FishGameModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function FishGameModal({ isOpen, onClose }: FishGameModalProps) {
  const [gameState, setGameState] = useState<"intro" | "playing" | "won" | "lost">("intro");
  const [timeLeft, setTimeLeft] = useState(10);
  const [score, setScore] = useState(0);
  const targetScore = 5; // Catch 5 fish in 10s

  const [fishPosition, setFishPosition] = useState({ top: 40, left: 50 });
  const [phone, setPhone] = useState("");
  const [voucherCode, setVoucherCode] = useState("");

  // Game timer
  useEffect(() => {
    let timer: any;
    if (gameState === "playing" && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (gameState === "playing" && timeLeft === 0) {
      if (score >= targetScore) {
        setGameState("won");
        setVoucherCode(`AQUANA-WIN-${Math.floor(1000 + Math.random() * 9000)}`);
      } else {
        setGameState("lost");
      }
    }
    return () => clearInterval(timer);
  }, [gameState, timeLeft, score]);

  // Fish swimming randomizer
  useEffect(() => {
    let fishInterval: any;
    if (gameState === "playing") {
      fishInterval = setInterval(() => {
        // Random position between 15% and 80%
        const top = Math.floor(Math.random() * 65) + 15;
        const left = Math.floor(Math.random() * 75) + 10;
        setFishPosition({ top, left });
      }, 900); // changes every 0.9s
    }
    return () => clearInterval(fishInterval);
  }, [gameState]);

  const startGame = () => {
    setScore(0);
    setTimeLeft(10);
    setGameState("playing");
  };

  const catchFish = () => {
    const newScore = score + 1;
    setScore(newScore);
    if (newScore >= targetScore) {
      setGameState("won");
      setVoucherCode(`AQUANA-WIN-${Math.floor(1000 + Math.random() * 9000)}`);
    } else {
      // jump immediately
      const top = Math.floor(Math.random() * 65) + 15;
      const left = Math.floor(Math.random() * 75) + 10;
      setFishPosition({ top, left });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-gradient-to-b from-sky-900 to-slate-950 border-2 border-cyan-400 text-white rounded-3xl max-w-lg w-full p-6 sm:p-8 relative shadow-[0_0_50px_rgba(6,182,212,0.4)] overflow-hidden">
        {/* Background glow & bubbles */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* INTRO SCREEN */}
        {gameState === "intro" && (
          <div className="text-center space-y-6 py-4">
            <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-tr from-amber-400 to-cyan-400 p-0.5 shadow-xl shadow-cyan-500/30">
              <div className="w-full h-full bg-slate-950 rounded-[22px] flex items-center justify-center text-4xl">
                🐟
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-black uppercase tracking-widest text-cyan-300">
                AQUANA FLASH IGRA IZAZOVA
              </span>
              <h3 className="text-3xl font-black text-white tracking-tight">
                Uhvati 5 ribica za 10 sekundi!
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-sm mx-auto leading-relaxed">
                Testirajte brzinu svojih prstiju. Ako ulovite ribicu 5 puta prije isteka vremena, osvajate **digitalni vaučer za besplatan ulaz na GOB ili Vodeni park!**
              </p>
            </div>

            <button
              onClick={startGame}
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-400 via-cyan-400 to-sky-400 text-slate-950 font-black text-sm uppercase tracking-wider shadow-2xl transition hover:scale-105 flex items-center justify-center gap-2 mx-auto"
            >
              <Play className="w-5 h-5 fill-slate-950" />
              <span>ZAPOČNI IGRU ODMAH!</span>
            </button>
          </div>
        )}

        {/* PLAYING SCREEN */}
        {gameState === "playing" && (
          <div className="space-y-4">
            {/* Top Bar: Time & Score */}
            <div className="flex items-center justify-between bg-white/10 px-4 py-2.5 rounded-2xl border border-white/15">
              <div className="flex items-center gap-2 text-xs font-black">
                <Clock className="w-4 h-4 text-amber-400 animate-spin" />
                <span>Preostalo: <strong className="text-amber-400 text-base">{timeLeft}s</strong></span>
              </div>
              <div className="flex items-center gap-2 text-xs font-black">
                <Trophy className="w-4 h-4 text-cyan-400" />
                <span>Ulovljeno: <strong className="text-cyan-400 text-base">{score} / {targetScore}</strong></span>
              </div>
            </div>

            {/* Aquatic Playing Field (Aquarium) */}
            <div className="relative w-full h-72 bg-gradient-to-b from-sky-800/60 to-blue-950/80 rounded-2xl border border-cyan-500/40 overflow-hidden shadow-inner cursor-crosshair">
              {/* Swimming Fish Target */}
              <button
                onClick={catchFish}
                style={{
                  top: `${fishPosition.top}%`,
                  left: `${fishPosition.left}%`,
                }}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 text-4xl hover:scale-125 active:scale-95 select-none focus:outline-none"
                aria-label="Uhvati ribicu"
              >
                🐠
              </button>

              <div className="absolute bottom-2 left-3 text-[10px] text-cyan-300/70 font-mono">
                Klikni brže na ribu dok bježi!
              </div>
            </div>
          </div>
        )}

        {/* WON SCREEN */}
        {gameState === "won" && (
          <div className="text-center space-y-6 py-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-3xl shadow-lg border border-emerald-400/40">
              🎉
            </div>

            <div className="space-y-2">
              <span className="text-xs font-black uppercase tracking-widest text-emerald-400">
                ČESTITAMO! MAJSTORSKI REFLEKSI!
              </span>
              <h3 className="text-3xl font-black text-white">
                Osvojili ste BESPLATAN ulaz!
              </h3>
              <p className="text-xs text-slate-300 max-w-sm mx-auto">
                Vaš jedinstveni vaučer kod je generisan. Pokažite ga na recepciji GOB-a ili blagajni Vodenog parka.
              </p>
            </div>

            {/* Voucher Box */}
            <div className="p-4 rounded-2xl bg-white/10 border-2 border-dashed border-emerald-400 text-center space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">JEDNOKRATNI KOD KUPONA:</span>
              <span className="text-2xl font-black tracking-widest text-emerald-300 font-mono block">
                {voucherCode}
              </span>
              <span className="text-[10px] text-slate-300 block">Važi narednih 48 sati</span>
            </div>

            <div className="space-y-3">
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Unesite broj telefona za SMS potvrdu..."
                className="w-full px-4 py-2.5 text-sm rounded-xl bg-slate-900 border border-cyan-400/40 text-white text-center placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              />
              <button
                onClick={() => {
                  alert(`Vaučer ${voucherCode} je zabilježen za broj ${phone || 'gost'}!`);
                  onClose();
                }}
                className="w-full py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs uppercase tracking-wider transition shadow-lg"
              >
                Sačuvaj i preuzmi vaučer
              </button>
            </div>
          </div>
        )}

        {/* LOST SCREEN */}
        {gameState === "lost" && (
          <div className="text-center space-y-6 py-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center text-3xl border border-rose-400/40">
              ⏱️
            </div>

            <div className="space-y-2">
              <span className="text-xs font-black uppercase tracking-widest text-rose-400">
                ISTEKLO JE VRIJEME!
              </span>
              <h3 className="text-2xl font-black text-white">
                Ribica je bila malo brža!
              </h3>
              <p className="text-xs text-slate-300 max-w-sm mx-auto">
                Ulovili ste {score} od potrebnih {targetScore} ribica. Ne odustajte, pokušajte ponovo odmah!
              </p>
            </div>

            <button
              onClick={startGame}
              className="px-6 py-3.5 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs uppercase tracking-wider transition shadow-lg flex items-center justify-center gap-2 mx-auto"
            >
              <RefreshCw className="w-4 h-4" />
              <span>POKUŠAJ PONOVO!</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
