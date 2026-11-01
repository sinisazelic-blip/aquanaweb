"use client";

import React, { useState, useEffect } from "react";
import {
  ShieldCheck,
  UserCheck,
  FileText,
  Newspaper,
  Tag,
  CheckCircle2,
  Clock,
  AlertCircle,
  Plus,
  Trash2,
  Eye,
  Settings,
  Calendar,
  Image as ImageIcon,
  Upload,
  ArrowLeft,
  Search,
  Lock,
  Layers,
  Sparkles,
  ToggleLeft,
  ToggleRight,
  TrendingUp,
  History,
  LogOut,
  Users,
  Ticket,
  Palette,
  Star,
  MessageSquare,
  Phone,
  Filter
} from "lucide-react";
import Link from "next/link";
import { allNewsArticles, NewsItem } from "@/lib/newsData";
import { initialTenders, TenderItem } from "@/lib/tendersData";
import {
  getSurveys,
  getCoupons,
  getKidsDrawings,
  SurveySubmission,
  CouponClaim,
  KidsDrawingSubmission
} from "@/lib/submissionsData";

type UserRole = "superadmin" | "webadmin" | "referent_nabavke" | "referent_pr";

interface CommercialBanner {
  id: number;
  client: string;
  position: "top_bar" | "inter_section" | "sidebar";
  image: string;
  link: string;
  validFrom: string;
  validTo: string;
  isActive: boolean;
}

const ROLE_CREDENTIALS: Record<string, { role: UserRole; name: string; title: string }> = {
  superadmin: { role: "superadmin", name: "Siniša Zelić", title: "Glavni Administrator (Superadmin)" },
  webadmin: { role: "webadmin", name: "Web Administrator", title: "Urednik web portala" },
  nabavke: { role: "referent_nabavke", name: "Referent za javne nabavke", title: "Služba nabavki i ugovora" },
  pr: { role: "referent_pr", name: "PR & Marketing referent", title: "Odnosi s javnošću i marketing" }
};

export default function AdminPortalPage() {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [loginError, setLoginError] = useState("");
  const [currentRole, setCurrentRole] = useState<UserRole>("superadmin");
  const [userProfile, setUserProfile] = useState({ name: "Siniša Zelić", title: "Glavni Administrator" });

  // Navigation Tab State
  const [activeTab, setActiveTab] = useState<"surveys" | "coupons" | "drawings" | "news" | "tenders" | "banners">("surveys");

  // Submissions State
  const [surveys, setSurveys] = useState<SurveySubmission[]>([]);
  const [coupons, setCoupons] = useState<CouponClaim[]>([]);
  const [drawings, setDrawings] = useState<KidsDrawingSubmission[]>([]);

  // News State
  const [newsList, setNewsList] = useState<NewsItem[]>(allNewsArticles);
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState("Sport i takmičenja");
  const [newExcerpt, setNewExcerpt] = useState("");
  const [showAddNewsModal, setShowAddNewsModal] = useState(false);

  // Tenders State
  const [tendersList, setTendersList] = useState<TenderItem[]>(initialTenders);

  // Commercial Banners State
  const [commercialBanners, setCommercialBanners] = useState<CommercialBanner[]>([
    {
      id: 1,
      client: "Fitness Centar GOB (Zakupac)",
      position: "inter_section",
      image: "/images/GOB-14.jpg",
      link: "https://aquana.ba",
      validFrom: "01.01.2026.",
      validTo: "31.12.2026.",
      isActive: true,
    },
    {
      id: 2,
      client: "m:tel – Sponzor plivačkog mitinga",
      position: "top_bar",
      image: "/images/Plivacki-Meeting-1.jpg",
      link: "https://mtel.ba",
      validFrom: "15.10.2026.",
      validTo: "30.11.2026.",
      isActive: true,
    }
  ]);

  // Load session & submissions on mount
  useEffect(() => {
    try {
      const savedSession = localStorage.getItem("aquana_admin_auth");
      if (savedSession) {
        const parsed = JSON.parse(savedSession);
        setIsAuthenticated(true);
        setCurrentRole(parsed.role || "superadmin");
        setUserProfile(parsed.profile || { name: "Siniša Zelić", title: "Glavni Administrator" });
      }
    } catch {
      // ignore
    }
    setSurveys(getSurveys());
    setCoupons(getCoupons());
    setDrawings(getKidsDrawings());
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");

    const u = usernameInput.trim().toLowerCase();
    const p = passwordInput.trim();

    if (u === "superadmin" && (p === "aquana2026!" || p === "admin")) {
      completeLogin("superadmin");
    } else if (u === "webadmin" && (p === "web2026!" || p === "web")) {
      completeLogin("webadmin");
    } else if (u === "nabavke" && (p === "tender2026!" || p === "nabavke")) {
      completeLogin("nabavke");
    } else if (u === "pr" && (p === "marketing2026!" || p === "pr")) {
      completeLogin("pr");
    } else {
      setLoginError("Neispravno korisničko ime ili lozinka. Pokušajte ponovo.");
    }
  };

  const completeLogin = (roleKey: string) => {
    const cred = ROLE_CREDENTIALS[roleKey];
    setIsAuthenticated(true);
    setCurrentRole(cred.role);
    setUserProfile({ name: cred.name, title: cred.title });
    try {
      localStorage.setItem("aquana_admin_auth", JSON.stringify({ role: cred.role, profile: { name: cred.name, title: cred.title } }));
    } catch {
      // ignore
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    try {
      localStorage.removeItem("aquana_admin_auth");
    } catch {
      // ignore
    }
  };

  // Quick switch role helper for superadmin testing
  const switchRole = (role: UserRole) => {
    setCurrentRole(role);
    const key = role === "superadmin" ? "superadmin" : role === "webadmin" ? "webadmin" : role === "referent_nabavke" ? "nabavke" : "pr";
    setUserProfile({ name: ROLE_CREDENTIALS[key].name, title: ROLE_CREDENTIALS[key].title });
  };

  // Coupon toggle status
  const toggleCouponStatus = (id: string) => {
    const updated = coupons.map((c) =>
      c.id === id ? { ...c, status: (c.status === "Aktivan" ? "Iskorišten" : "Aktivan") as "Aktivan" | "Iskorišten" } : c
    );
    setCoupons(updated);
    try {
      localStorage.setItem("aquana_coupons", JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  // Calculate survey averages
  const surveyStats = React.useMemo(() => {
    if (surveys.length === 0) return { avg: 4.8, cistoca: 4.8, voda: 4.9, temp: 4.7, osoblje: 4.6, count: 0 };
    const total = surveys.reduce((acc, s) => {
      acc.cistoca += s.ratings.cistoca;
      acc.voda += s.ratings.kvalitetVode;
      acc.temp += s.ratings.temperatura;
      acc.osoblje += s.ratings.osoblje;
      return acc;
    }, { cistoca: 0, voda: 0, temp: 0, osoblje: 0 });

    const count = surveys.length;
    const avg = ((total.cistoca + total.voda + total.temp + total.osoblje) / (count * 4)).toFixed(1);
    return {
      avg,
      cistoca: (total.cistoca / count).toFixed(1),
      voda: (total.voda / count).toFixed(1),
      temp: (total.temp / count).toFixed(1),
      osoblje: (total.osoblje / count).toFixed(1),
      count
    };
  }, [surveys]);

  // LOGIN SCREEN
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 relative overflow-hidden font-sans">
        {/* Ambient background glows */}
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-sky-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="w-full max-w-md bg-white rounded-3xl p-8 shadow-2xl border border-slate-200 relative z-10">
          <div className="text-center space-y-2 mb-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-sky-600 to-cyan-500 text-white flex items-center justify-center mx-auto shadow-lg shadow-sky-600/30">
              <Lock className="w-8 h-8" />
            </div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              Aquana CMS Portal
            </h1>
            <p className="text-xs text-slate-500">
              Autentifikovani pristup za upravu, administratore i referente JP „Aquana“ Banja Luka.
            </p>
          </div>

          {loginError && (
            <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Korisničko ime:
              </label>
              <input
                type="text"
                required
                value={usernameInput}
                onChange={(e) => setUsernameInput(e.target.value)}
                placeholder="superadmin / webadmin / nabavke / pr"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-slate-50 focus:bg-white text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Lozinka:
              </label>
              <input
                type="password"
                required
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-slate-50 focus:bg-white text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-sky-600 to-blue-700 hover:from-sky-500 hover:to-blue-600 text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-sky-600/30 transition hover:scale-[1.01]"
            >
              Prijavi se na sistem
            </button>
          </form>

          {/* Quick-Role Testing Shortcuts for Siniša */}
          <div className="mt-6 pt-5 border-t border-slate-100 text-center">
            <span className="text-[10px] uppercase font-black text-slate-400 block mb-2">
              Brza prijava po ulogama (testni pristup):
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                type="button"
                onClick={() => completeLogin("superadmin")}
                className="p-2 rounded-xl bg-slate-100 hover:bg-sky-50 hover:text-sky-700 text-slate-700 font-bold transition text-left"
              >
                ★ Superadmin
                <span className="block text-[10px] text-slate-400 font-normal">Siniša Zelić</span>
              </button>
              <button
                type="button"
                onClick={() => completeLogin("webadmin")}
                className="p-2 rounded-xl bg-slate-100 hover:bg-sky-50 hover:text-sky-700 text-slate-700 font-bold transition text-left"
              >
                ● Webadmin
                <span className="block text-[10px] text-slate-400 font-normal">Sadržaj & vijesti</span>
              </button>
              <button
                type="button"
                onClick={() => completeLogin("nabavke")}
                className="p-2 rounded-xl bg-slate-100 hover:bg-sky-50 hover:text-sky-700 text-slate-700 font-bold transition text-left"
              >
                ◆ Javne nabavke
                <span className="block text-[10px] text-slate-400 font-normal">Tenderi & akti</span>
              </button>
              <button
                type="button"
                onClick={() => completeLogin("pr")}
                className="p-2 rounded-xl bg-slate-100 hover:bg-sky-50 hover:text-sky-700 text-slate-700 font-bold transition text-left"
              >
                ▲ PR Referent
                <span className="block text-[10px] text-slate-400 font-normal">Marketing & kuponi</span>
              </button>
            </div>
          </div>

          <div className="mt-5 text-center">
            <Link href="/" className="text-xs text-sky-600 hover:text-sky-800 font-bold flex items-center justify-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Povratak na javni sajt</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // AUTHENTICATED ADMIN DASHBOARD
  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 flex flex-col font-sans">
      {/* Top Header */}
      <header className="bg-slate-900 text-white px-6 py-4 border-b border-slate-800 flex flex-wrap items-center justify-between gap-4 sticky top-0 z-40 shadow-lg">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2 group">
            <img src="/firma/logo-light.png" alt="Aquana" className="h-6 w-auto object-contain" />
            <span className="text-xs font-black bg-sky-600 px-2 py-0.5 rounded text-white tracking-widest uppercase">CMS</span>
          </Link>
          <span className="hidden sm:inline text-slate-600">|</span>
          <span className="text-xs font-bold text-slate-300">JP „Aquana“ d.o.o. Banja Luka</span>
        </div>

        {/* User profile & Role switcher */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold text-xs border border-sky-500/40">
              {userProfile.name.slice(0, 2).toUpperCase()}
            </div>
            <div className="hidden md:block text-left text-xs">
              <strong className="block text-white leading-tight">{userProfile.name}</strong>
              <span className="text-[10px] text-slate-400 uppercase font-black tracking-wider text-sky-400">
                {currentRole}
              </span>
            </div>
          </div>

          {/* Superadmin Role Test Switcher */}
          <div className="hidden lg:flex items-center gap-1 bg-slate-800 p-1 rounded-xl border border-slate-700 text-xs">
            <span className="text-[10px] text-slate-400 font-bold px-2">Uloga:</span>
            {(["superadmin", "webadmin", "referent_nabavke", "referent_pr"] as UserRole[]).map((r) => (
              <button
                key={r}
                onClick={() => switchRole(r)}
                className={`px-2 py-1 rounded-lg text-[10px] font-black uppercase transition ${
                  currentRole === r ? "bg-sky-600 text-white shadow-sm" : "text-slate-400 hover:text-white"
                }`}
              >
                {r === "superadmin" ? "Super" : r === "webadmin" ? "Web" : r === "referent_nabavke" ? "Nabavke" : "PR"}
              </button>
            ))}
          </div>

          <button
            onClick={handleLogout}
            className="p-2 rounded-xl bg-slate-800 hover:bg-rose-900/40 text-slate-300 hover:text-rose-400 border border-slate-700 transition"
            title="Odjavi se"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Tabs Navigation */}
      <div className="bg-white border-b border-slate-200 px-6 overflow-x-auto shadow-sm">
        <div className="flex items-center gap-2 min-w-max py-2">
          <button
            onClick={() => setActiveTab("surveys")}
            className={`px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-2 transition ${
              activeTab === "surveys"
                ? "bg-sky-600 text-white shadow-md shadow-sky-600/30"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            }`}
          >
            <Star className="w-4 h-4 text-amber-300" />
            <span>Anketa građana ({surveys.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("coupons")}
            className={`px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-2 transition ${
              activeTab === "coupons"
                ? "bg-sky-600 text-white shadow-md shadow-sky-600/30"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            }`}
          >
            <Ticket className="w-4 h-4 text-amber-400" />
            <span>Flash Kuponi ({coupons.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("drawings")}
            className={`px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-2 transition ${
              activeTab === "drawings"
                ? "bg-sky-600 text-white shadow-md shadow-sky-600/30"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            }`}
          >
            <Palette className="w-4 h-4 text-purple-400" />
            <span>Dječiji konkurs ({drawings.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("news")}
            className={`px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-2 transition ${
              activeTab === "news"
                ? "bg-sky-600 text-white shadow-md shadow-sky-600/30"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            }`}
          >
            <Newspaper className="w-4 h-4 text-sky-400" />
            <span>Vijesti & Obavještenja ({newsList.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("tenders")}
            className={`px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-2 transition ${
              activeTab === "tenders"
                ? "bg-sky-600 text-white shadow-md shadow-sky-600/30"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            }`}
          >
            <FileText className="w-4 h-4 text-emerald-400" />
            <span>Javne nabavke ({tendersList.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("banners")}
            className={`px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-2 transition ${
              activeTab === "banners"
                ? "bg-sky-600 text-white shadow-md shadow-sky-600/30"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            }`}
          >
            <ImageIcon className="w-4 h-4 text-indigo-400" />
            <span>Komercijalni baneri</span>
          </button>
        </div>
      </div>

      {/* Main Dashboard Content Area */}
      <main className="flex-1 p-6 max-w-7xl w-full mx-auto space-y-6">
        {/* TAB 1: SURVEY ANALYTICS */}
        {activeTab === "surveys" && (
          <div className="space-y-6">
            {/* Stats Overview */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                <span className="text-[10px] font-black uppercase text-slate-400 block">Ukupna ocjena</span>
                <div className="text-3xl font-black text-amber-500 mt-1 flex items-center gap-1">
                  <span>{surveyStats.avg}</span>
                  <Star className="w-6 h-6 fill-amber-400" />
                </div>
                <span className="text-[11px] text-slate-500 font-medium">od maksimalnih 5.0</span>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                <span className="text-[10px] font-black uppercase text-slate-400 block">Čistoća prostora</span>
                <div className="text-2xl font-black text-slate-900 mt-1">{surveyStats.cistoca} / 5.0</div>
                <span className="text-[11px] text-emerald-600 font-bold">Odlično ocijenjeno</span>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                <span className="text-[10px] font-black uppercase text-slate-400 block">Kvalitet vode</span>
                <div className="text-2xl font-black text-slate-900 mt-1">{surveyStats.voda} / 5.0</div>
                <span className="text-[11px] text-cyan-600 font-bold">FINA bistrina</span>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                <span className="text-[10px] font-black uppercase text-slate-400 block">Temperatura (26.8°C)</span>
                <div className="text-2xl font-black text-slate-900 mt-1">{surveyStats.temp} / 5.0</div>
                <span className="text-[11px] text-slate-500 font-medium">Optimalno grijanje</span>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                <span className="text-[10px] font-black uppercase text-slate-400 block">Ljubaznost osoblja</span>
                <div className="text-2xl font-black text-slate-900 mt-1">{surveyStats.osoblje} / 5.0</div>
                <span className="text-[11px] text-slate-500 font-medium">Recepcija & treneri</span>
              </div>
            </div>

            {/* Surveys Submissions Table */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-5 border-b border-slate-200 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-black text-slate-900">Zabilježeni odgovori građana i posjetilaca</h3>
                  <p className="text-xs text-slate-500">Direktni komentari i ocjene pristigle putem ankete na web portalu</p>
                </div>
                <span className="px-3 py-1 rounded-full bg-sky-50 text-sky-700 text-xs font-bold border border-sky-200">
                  {surveys.length} zabilježenih anketa
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 font-black text-slate-700 uppercase">
                      <th className="py-3 px-4">Datum & ID</th>
                      <th className="py-3 px-4">Učestalost</th>
                      <th className="py-3 px-4">Ocjene (Čist/Voda/Temp/Osoblje)</th>
                      <th className="py-3 px-4">Komentar / Sugestija građana</th>
                      <th className="py-3 px-4">Kontakt</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {surveys.map((s) => (
                      <tr key={s.id} className="hover:bg-slate-50 transition">
                        <td className="py-3 px-4 font-mono">
                          <strong className="text-slate-900 block">{s.id}</strong>
                          <span className="text-[10px] text-slate-400">{s.date}</span>
                        </td>
                        <td className="py-3 px-4 font-semibold text-slate-700">{s.frequency}</td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-1 font-bold text-slate-900">
                            <span className="bg-amber-100 text-amber-900 px-1.5 py-0.5 rounded text-[11px]">Č: {s.ratings.cistoca}★</span>
                            <span className="bg-sky-100 text-sky-900 px-1.5 py-0.5 rounded text-[11px]">V: {s.ratings.kvalitetVode}★</span>
                            <span className="bg-emerald-100 text-emerald-900 px-1.5 py-0.5 rounded text-[11px]">T: {s.ratings.temperatura}★</span>
                            <span className="bg-purple-100 text-purple-900 px-1.5 py-0.5 rounded text-[11px]">O: {s.ratings.osoblje}★</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 max-w-md text-slate-600 leading-relaxed font-medium">
                          „{s.comment}“
                        </td>
                        <td className="py-3 px-4 text-slate-500 font-mono text-[11px]">
                          {s.contact || "—"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: FLASH COUPONS */}
        {activeTab === "coupons" && (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-5 border-b border-slate-200 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-black text-slate-900">Evidencija rezervisanih flash kupona (50 ulazaka + 5 kafa)</h3>
                  <p className="text-xs text-slate-500">Kupci koji su preuzeli digitalni vaučer i brojevi telefona evidentirani na biletarnici</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
                    Aktivni kuponi: {coupons.filter(c => c.status === "Aktivan").length}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold">
                    Ukupno: {coupons.length}
                  </span>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 font-black text-slate-700 uppercase">
                      <th className="py-3 px-4">Kôd vaučera</th>
                      <th className="py-3 px-4">Broj telefona</th>
                      <th className="py-3 px-4">Datum & Vrijeme</th>
                      <th className="py-3 px-4">Objekat</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-right">Akcija</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {coupons.map((c) => (
                      <tr key={c.id} className="hover:bg-slate-50 transition">
                        <td className="py-3 px-4 font-mono font-black text-slate-900 text-sm">
                          {c.code}
                        </td>
                        <td className="py-3 px-4 font-mono font-bold text-sky-800">
                          {c.phone}
                        </td>
                        <td className="py-3 px-4 text-slate-500 font-medium">
                          {c.date}
                        </td>
                        <td className="py-3 px-4 text-slate-700 font-semibold">
                          {c.facility}
                        </td>
                        <td className="py-3 px-4">
                          <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-bold text-[10px] ${
                            c.status === "Aktivan"
                              ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                              : "bg-slate-200 text-slate-700"
                          }`}>
                            {c.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <button
                            onClick={() => toggleCouponStatus(c.id)}
                            className="px-3 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-[11px] font-bold transition"
                          >
                            Označi kao {c.status === "Aktivan" ? "Iskorišten" : "Aktivan"}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: KIDS DRAWINGS CONTEST */}
        {activeTab === "drawings" && (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-5 border-b border-slate-200 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-black text-slate-900">Prijave za dječiji konkurs „Nacrtaj Aquanu ili GOB“</h3>
                  <p className="text-xs text-slate-500">Radovi pristigli za mjesečnu nagradu od 10 besplatnih ulaza</p>
                </div>
                <span className="px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-xs font-bold border border-purple-200">
                  {drawings.length} pristiglih radova
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 font-black text-slate-700 uppercase">
                      <th className="py-3 px-4">Autor & Uzrast</th>
                      <th className="py-3 px-4">Naziv crteža</th>
                      <th className="py-3 px-4">Telefon roditelja</th>
                      <th className="py-3 px-4">Datum prijave</th>
                      <th className="py-3 px-4">Glasovi</th>
                      <th className="py-3 px-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {drawings.map((d) => (
                      <tr key={d.id} className="hover:bg-slate-50 transition">
                        <td className="py-3 px-4 font-bold text-slate-900">
                          🎨 {d.childName} ({d.age} god)
                        </td>
                        <td className="py-3 px-4 font-semibold text-slate-700">
                          „{d.title}“
                        </td>
                        <td className="py-3 px-4 font-mono font-bold text-sky-800">
                          {d.parentPhone}
                        </td>
                        <td className="py-3 px-4 text-slate-500">
                          {d.date}
                        </td>
                        <td className="py-3 px-4 font-black text-amber-600">
                          ★ {d.votes} glasova
                        </td>
                        <td className="py-3 px-4">
                          <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                            {d.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: NEWS */}
        {activeTab === "news" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-black text-slate-900">Upravljanje vijestima i saopštenjima</h3>
                <p className="text-xs text-slate-500">Objave na naslovnoj strani i u arhivi vijesti</p>
              </div>
              <button
                onClick={() => setShowAddNewsModal(true)}
                className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-black uppercase tracking-wider flex items-center gap-1.5 shadow-md"
              >
                <Plus className="w-4 h-4" />
                <span>Dodaj novu vijest</span>
              </button>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 font-black text-slate-700 uppercase">
                    <th className="py-3 px-4">Naslov vijesti</th>
                    <th className="py-3 px-4">Kategorija</th>
                    <th className="py-3 px-4">Datum</th>
                    <th className="py-3 px-4 text-right">Akcija</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {newsList.slice(0, 10).map((n) => (
                    <tr key={n.id} className="hover:bg-slate-50 transition">
                      <td className="py-3 px-4 font-bold text-slate-900 max-w-md truncate">
                        {n.title}
                      </td>
                      <td className="py-3 px-4 text-slate-600 font-medium">
                        {n.category}
                      </td>
                      <td className="py-3 px-4 text-slate-500 font-mono">
                        {n.date}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <Link
                          href={`/vijesti/${n.id}`}
                          target="_blank"
                          className="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-bold inline-flex items-center gap-1"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Pregledaj</span>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 5: TENDERS */}
        {activeTab === "tenders" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-black text-slate-900">Javne nabavke i tenderska dokumentacija</h3>
                <p className="text-xs text-slate-500">Zvanični registar tendera JP „Aquana“ d.o.o. Banja Luka</p>
              </div>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 font-black text-slate-700 uppercase">
                    <th className="py-3 px-4">Broj nabavke</th>
                    <th className="py-3 px-4">Predmet nabavke</th>
                    <th className="py-3 px-4">Godina</th>
                    <th className="py-3 px-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {tendersList.map((t) => (
                    <tr key={t.id} className="hover:bg-slate-50 transition">
                      <td className="py-3 px-4 font-mono font-bold text-slate-900">JN-{t.id}</td>
                      <td className="py-3 px-4 font-semibold text-slate-800">{t.title}</td>
                      <td className="py-3 px-4 font-mono text-slate-500">{t.year}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          t.status === "Aktivno"
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-slate-200 text-slate-700"
                        }`}>
                          {t.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 6: BANNERS */}
        {activeTab === "banners" && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-black text-slate-900">Komercijalni baneri i sponzorski slotovi</h3>
              <p className="text-xs text-slate-500">Upravljanje zakupljenim oglasnim prostorom na portalu</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {commercialBanners.map((b) => (
                <div key={b.id} className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-3">
                  <div className="flex items-center justify-between">
                    <strong className="text-slate-900 text-sm">{b.client}</strong>
                    <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                      Aktivan
                    </span>
                  </div>
                  <div className="h-28 rounded-xl overflow-hidden bg-slate-100">
                    <img src={b.image} alt={b.client} className="w-full h-full object-cover" />
                  </div>
                  <div className="text-xs text-slate-500 flex justify-between font-mono">
                    <span>Pozicija: {b.position}</span>
                    <span>Do: {b.validTo}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

