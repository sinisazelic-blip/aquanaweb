"use client";

import React, { useState, useEffect } from "react";
import { Lang, tr } from "@/lib/translations";
import {
  Coffee,
  Flame,
  Sparkles,
  Clock,
  Ticket,
  ArrowRight,
  Gift,
  Trophy,
  Gamepad2,
  CheckCircle2,
  Phone,
  X,
  Download,
  Share2,
  QrCode,
  Zap
} from "lucide-react";
import {
  saveCoupon,
  getSpeedContestState,
  claimSpeedTicket,
  SpeedContestState,
  getPortalSettings,
  PortalSettings
} from "@/lib/submissionsData";

interface FlashPromoActionProps {
  onOpenGame: () => void;
  currentLang?: Lang;
}

export default function FlashPromoAction({ onOpenGame, currentLang = "lat" }: FlashPromoActionProps) {
  const t = (s: string) => tr(s, currentLang);
  // Active promo mode: 'flash_coffee' or 'speed_waterpolo'
  const [activePromo, setActivePromo] = useState<"flash_coffee" | "speed_waterpolo">("flash_coffee");

  const [portalSettings, setPortalSettings] = useState<PortalSettings | null>(null);
  const [timeLeft, setTimeLeft] = useState({ hours: 18, minutes: 0, seconds: 0 });
  
  // Speed contest state
  const [speedState, setSpeedState] = useState<SpeedContestState>({
    title: "BRZOPRSTICA: Prvih 5 posjetilaca dobijaju BESPLATNU KARTU!",
    description: "Za predstojeću prvenstvenu vaterpolo utakmicu na Gradskom olimpijskom bazenu.",
    totalQuota: 5,
    remainingQuota: 3,
    matchInfo: "VK Banja Luka vs VK Borac • Subota 18:00h • Veliki olimpijski bazen",
    isActive: true
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [phone, setPhone] = useState("");
  const [claimedCoupon, setClaimedCoupon] = useState<{
    code: string;
    phone: string;
    type: "coffee" | "waterpolo";
    title: string;
  } | null>(null);

  useEffect(() => {
    const settings = getPortalSettings();
    setPortalSettings(settings);
    setSpeedState(getSpeedContestState());

    const targetDate = settings?.flashPromo?.targetExpiry 
      ? new Date(settings.flashPromo.targetExpiry).getTime()
      : (Date.now() + 18 * 3600 * 1000);

    const updateTimer = () => {
      const now = Date.now();
      const diff = Math.max(0, targetDate - now);
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      setTimeLeft({ hours, minutes, seconds });
    };

    updateTimer();
    const timer = setInterval(updateTimer, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleClaimSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone.trim()) return;

    if (activePromo === "speed_waterpolo") {
      const res = claimSpeedTicket(phone.trim());
      if (res.success && res.code) {
        setSpeedState(getSpeedContestState());
        setClaimedCoupon({
          code: res.code,
          phone: phone.trim(),
          type: "waterpolo",
          title: "Ulaznica: Vaterpolo derbi VK Banja Luka vs VK Borac"
        });
      } else {
        alert("Nažalost, svih 5 besplatnih karata za ovu utakmicu je već preuzeto!");
      }
    } else {
      const newCoupon = saveCoupon(phone.trim());
      setClaimedCoupon({
        code: newCoupon.code,
        phone: newCoupon.phone,
        type: "coffee",
        title: "Kupon za 5 besplatnih kafa uz paket od 50 ulazaka"
      });
    }
  };

  const handleDownloadTicket = () => {
    if (!claimedCoupon) return;
    const ticketText = `=====================================================
JP „AQUANA“ d.o.o. Banja Luka
Zvanični digitalni vaučer / karta
=====================================================
VRSTA: ${claimedCoupon.title}
KOD VAUČERA: ${claimedCoupon.code}
KORISNIK: ${claimedCoupon.phone}
LOKACIJA: Gradski olimpijski bazen (GOB), Banja Luka
STATUS: Validiran u sistemu Aquana CMS
=====================================================
Molimo pokažite ovaj kod na biletarnici GOB-a.
Dobrodošli u JP Aquana!
=====================================================`;
    const element = document.createElement("a");
    const file = new Blob([ticketText], { type: "text/plain;charset=utf-8" });
    element.href = URL.createObjectURL(file);
    element.download = `Aquana-Vaucer-${claimedCoupon.code.replace(/[^a-zA-Z0-9]/g, "_")}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-6">
      {/* Promo Switcher Tabs */}
      <div className="flex items-center gap-2 mb-3">
        <button
          onClick={() => setActivePromo("flash_coffee")}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-1.5 transition ${
            activePromo === "flash_coffee"
              ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20"
              : "bg-slate-200 hover:bg-slate-300 text-slate-700"
          }`}
        >
          <Flame className="w-3.5 h-3.5 fill-current" />
          <span>Flash Akcija: 50 ulazaka + 5 kafa</span>
        </button>

        <button
          onClick={() => setActivePromo("speed_waterpolo")}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-1.5 transition ${
            activePromo === "speed_waterpolo"
              ? "bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-md shadow-sky-500/20"
              : "bg-slate-200 hover:bg-slate-300 text-slate-700"
          }`}
        >
          <Zap className="w-3.5 h-3.5 fill-current text-amber-300" />
          <span>Brzoprstica: Vaterpolo karta ({speedState.remainingQuota}/{speedState.totalQuota} preostalo)</span>
        </button>
      </div>

      <div className={`relative overflow-hidden rounded-3xl p-1 shadow-2xl transition-all duration-300 ${
        activePromo === "flash_coffee"
          ? "bg-gradient-to-r from-amber-500 via-orange-500 to-rose-600 shadow-[0_10px_40px_rgba(245,158,11,0.3)]"
          : "bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-700 shadow-[0_10px_40px_rgba(14,165,233,0.3)]"
      }`}>
        <div className="bg-slate-950 rounded-[22px] p-6 sm:p-8 relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Ambient decorative circles */}
          <div className="absolute -left-12 -top-12 w-64 h-64 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />

          {/* Left Column: Graphics + Action Offer */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left z-10">
            {activePromo === "flash_coffee" ? (
              /* Graphic Badge 1: {t('50 ULAZA + 5 KAFA')} */
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

                <div className="absolute -top-2 -right-2 bg-gradient-to-r from-rose-600 to-red-600 text-white text-[10px] font-black px-2 py-0.5 rounded-full border border-rose-300 flex items-center gap-1 animate-pulse shadow-md">
                  <Flame className="w-3 h-3 fill-amber-300 text-amber-300" />
                  <span>{t("FLASH AKCIJA")}</span>
                </div>
              </div>
            ) : (
              /* Graphic Badge 2: BRZOPRSTICA (5 VATERPOLO KARATA) */
              <div className="relative shrink-0">
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-gradient-to-tr from-sky-400 to-blue-600 p-0.5 shadow-2xl flex items-center justify-center">
                  <div className="w-full h-full bg-slate-950 rounded-[22px] flex flex-col items-center justify-center p-2 text-center">
                    <span className="text-[10px] font-black text-sky-400 uppercase tracking-wider">PREOSTALO</span>
                    <div className="text-3xl font-black text-amber-400 font-mono tracking-tight my-0.5">
                      {speedState.remainingQuota} / {speedState.totalQuota}
                    </div>
                    <span className="text-[9px] font-bold text-slate-300 uppercase">BESPLATNE KARTE</span>
                  </div>
                </div>

                <div className="absolute -top-2 -right-2 bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded-full border border-amber-300 flex items-center gap-1 shadow-md animate-bounce">
                  <Zap className="w-3 h-3 fill-current" />
                  <span>BRZOPRSTICA</span>
                </div>
              </div>
            )}

            {/* Offer Text Details */}
            <div className="space-y-2 max-w-xl">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <span className={`px-3 py-0.5 rounded-full text-[11px] font-black tracking-wider uppercase border flex items-center gap-1.5 ${
                  activePromo === "flash_coffee"
                    ? "bg-amber-500/20 text-amber-400 border-amber-500/30"
                    : "bg-sky-500/20 text-sky-400 border-sky-500/30"
                }`}>
                  <Sparkles className="w-3 h-3 text-amber-300" />
                  <span>{activePromo === "flash_coffee" ? t("DANAŠNJI ZEC IZ ŠEŠIRA") : t("BRZA NAGRADNA AKCIJA")}</span>
                </span>
                <span className="text-[11px] text-slate-400 font-medium">
                  • {t('Caffe Bar GOB & Recepcija')}
                </span>
              </div>

              {activePromo === "flash_coffee" ? (
                <>
                  <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-snug">
                    {t(portalSettings?.flashPromo?.title || "Uz sezonsku kartu od 50 ulazaka dobijate 5 besplatnih kafa u Caffe Baru GOB!")}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {portalSettings?.flashPromo?.description || "Aktivirajte akciju odmah na sajtu i preuzmite digitalni bar-kod kupon koji važi na biletarnici i u našem caffe baru."}
                  </p>
                </>
              ) : (
                <>
                  <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-snug">
                    Prvih 5 posjetilaca dobijaju <span className="text-amber-300">BESPLATNU KARTU</span> za vaterpolo derbi!
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
                    {speedState.matchInfo}. Unesite broj telefona i preuzmite digitalnu ulaznicu direktno na telefon!
                  </p>
                </>
              )}
            </div>
          </div>

          {/* Right Column: Countdown / Quota + Action Buttons */}
          <div className="flex flex-col items-center sm:items-end justify-center gap-4 shrink-0 z-10 w-full sm:w-auto">
            {/* Live Indicator Box */}
            {activePromo === "flash_coffee" ? (
              <div className="bg-slate-900 border border-amber-500/40 rounded-2xl p-3 flex items-center gap-3 shadow-inner">
                <Clock className="w-4 h-4 text-amber-400 animate-spin" />
                <div className="text-xs text-slate-400">
                  <span className="block text-[10px] uppercase font-bold text-slate-400">Akcija ističe za:</span>
                  <div className="text-base font-black font-mono text-white tracking-widest">
                    {String(timeLeft.hours).padStart(2, "0")}h : {String(timeLeft.minutes).padStart(2, "0")}m : {String(timeLeft.seconds).padStart(2, "0")}s
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-slate-900 border border-sky-500/40 rounded-2xl p-3 flex items-center gap-3 shadow-inner">
                <Ticket className="w-4 h-4 text-amber-400 animate-pulse" />
                <div className="text-xs text-slate-400">
                  <span className="block text-[10px] uppercase font-bold text-slate-400">Preostalo slobodnih karata:</span>
                  <div className="text-base font-black font-mono text-amber-400 tracking-wider">
                    {speedState.remainingQuota} od {speedState.totalQuota} karata
                  </div>
                </div>
              </div>
            )}

            {/* Buttons Row */}
            <div className="flex flex-wrap items-center justify-center gap-3 w-full sm:w-auto">
              <button
                onClick={() => setModalOpen(true)}
                className={`px-5 py-3 rounded-xl font-black text-xs uppercase tracking-wider transition shadow-lg flex items-center gap-2 cursor-pointer ${
                  claimedCoupon
                    ? "bg-emerald-500 text-slate-950 shadow-emerald-500/30"
                    : activePromo === "flash_coffee"
                    ? "bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-300 hover:to-orange-400 text-slate-950 hover:scale-105"
                    : "bg-gradient-to-r from-sky-400 to-cyan-300 hover:from-sky-300 hover:to-cyan-200 text-slate-950 hover:scale-105"
                }`}
              >
                <Ticket className="w-4 h-4" />
                <span>
                  {claimedCoupon
                    ? `VAUČER SAČUVAN (${claimedCoupon.code})`
                    : activePromo === "flash_coffee"
                    ? t("REZERVIŠI KUPON ODMAH")
                    : "PREUZMI KARTU (BRZOPRSTICA)"}
                </span>
              </button>

              <button
                onClick={onOpenGame}
                className="px-4 py-3 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 hover:text-white border border-cyan-400/40 font-black text-xs uppercase tracking-wider transition flex items-center gap-2 hover:scale-105 cursor-pointer"
              >
                <Gamepad2 className="w-4 h-4 text-cyan-300" />
                <span>{t("IGRAJ „UHVATI RIBICU“")}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Claim Coupon / Ticket Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-100 relative">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute right-4 top-4 p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {claimedCoupon ? (
              <div className="text-center space-y-4 py-2">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                  <CheckCircle2 className="w-9 h-9" />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-slate-900">Uspješno evidentirano!</h3>
                  <p className="text-xs text-slate-600 mt-1">
                    {claimedCoupon.type === "waterpolo"
                      ? "Osvojili ste besplatnu kartu za vaterpolo utakmicu na GOB-u!"
                      : "Pokažite ovaj digitalni kod na biletarnici GOB-a prilikom kupovine paketa:"}
                  </p>
                </div>

                {/* Digital Ticket Badge Card */}
                <div className="bg-slate-950 text-white rounded-2xl p-5 border-2 border-amber-400/60 shadow-xl space-y-2 relative overflow-hidden">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <span className="text-[10px] font-black uppercase text-amber-400 tracking-wider">JP AQUANA • BANJA LUKA</span>
                    <span className="text-[10px] font-mono text-slate-400">VALIDATED CMS</span>
                  </div>

                  <div className="py-1">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">{claimedCoupon.title}</span>
                    <div className="text-3xl font-black font-mono text-amber-400 tracking-widest my-1">
                      {claimedCoupon.code}
                    </div>
                    <span className="text-xs font-mono text-slate-300 block">Telefon: {claimedCoupon.phone}</span>
                  </div>

                  <div className="border-t border-slate-800 pt-2 flex items-center justify-between text-[10px] text-slate-400">
                    <span>Gradski olimpijski bazen</span>
                    <span className="text-emerald-400 font-bold">● Validno na biletarnici</span>
                  </div>
                </div>

                {/* Download and Share Button */}
                <div className="flex gap-2">
                  <button
                    onClick={handleDownloadTicket}
                    className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md transition cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    <span>Preuzmi digitalnu kartu na telefon</span>
                  </button>
                </div>

                <button
                  onClick={() => setModalOpen(false)}
                  className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs uppercase tracking-wider cursor-pointer"
                >
                  Zatvori prozor
                </button>
              </div>
            ) : (
              <form onSubmit={handleClaimSubmit} className="space-y-4">
                <div className="flex items-center gap-2 text-amber-600 text-xs font-black uppercase tracking-wider">
                  {activePromo === "speed_waterpolo" ? (
                    <>
                      <Zap className="w-4 h-4 text-sky-500 fill-current" />
                      <span className="text-sky-700">Brzoprstica – Vaterpolo karta</span>
                    </>
                  ) : (
                    <>
                      <Flame className="w-4 h-4 fill-amber-500" />
                      <span>Brza registracija kupona</span>
                    </>
                  )}
                </div>

                <h3 className="text-xl font-black text-slate-900">
                  {activePromo === "speed_waterpolo"
                    ? "Osvojite besplatnu kartu za utakmicu"
                    : "Preuzmite kupon za 5 besplatnih kafa"}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {activePromo === "speed_waterpolo"
                    ? `Preostalo je još ${speedState.remainingQuota} od ${speedState.totalQuota} besplatnih karata. Unesite broj telefona kako bi ulaznica bila odmah registrovana na biletarnici.`
                    : "Unesite broj telefona kako bi Vaš jedinstveni kupon bio evidentiran na biletarnici i u Caffe Baru GOB."}
                </p>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-amber-500" />
                    <span>Broj mobilnog telefona:</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="npr. 065 123 456"
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-slate-50 focus:bg-white text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-sky-600 to-blue-700 hover:from-sky-500 hover:to-blue-600 text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-sky-600/25 transition hover:scale-[1.01] cursor-pointer"
                >
                  {activePromo === "speed_waterpolo" ? "Potvrdi i preuzmi kartu" : "Potvrdi i generiši kod kupona"}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
