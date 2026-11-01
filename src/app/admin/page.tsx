"use client";

import React, { useState } from "react";
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
  Image,
  Upload,
  ArrowLeft,
  Search,
  Lock,
  Layers,
  Sparkles,
  ToggleLeft,
  ToggleRight,
  TrendingUp,
  History
} from "lucide-react";
import Link from "next/link";
import { allNewsArticles, NewsItem } from "@/lib/newsData";
import { initialTenders, TenderItem } from "@/lib/tendersData";

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

export default function AdminPortalPage() {
  const [currentRole, setCurrentRole] = useState<UserRole>("superadmin");
  const [activeTab, setActiveTab] = useState<"news" | "banners" | "tenders" | "pricing" | "audit">("news");

  // State: News
  const [newsList, setNewsList] = useState<NewsItem[]>(allNewsArticles);
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState("Sport i takmičenja");
  const [newExcerpt, setNewExcerpt] = useState("");
  const [newContent, setNewContent] = useState("");
  const [showAddNewsModal, setShowAddNewsModal] = useState(false);

  // State: Banners & Commercial Slots
  const [topNewsActive, setTopNewsActive] = useState(true);
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
    },
    {
      id: 3,
      client: "Sportska oprema Speedo Banja Luka",
      position: "sidebar",
      image: "/images/ACO_1870-1.jpg",
      link: "https://aquana.ba",
      validFrom: "01.06.2026.",
      validTo: "31.08.2026.",
      isActive: false, // Expired / Inactive
    },
  ]);

  // State: Tenders
  const [tenders, setTenders] = useState<TenderItem[]>(initialTenders);
  const [newTenderTitle, setNewTenderTitle] = useState("");
  const [newTenderStatus, setNewTenderStatus] = useState<any>("Dodijeljen ugovor");
  const [showAddTenderModal, setShowAddTenderModal] = useState(false);

  // Audit Log State
  const [auditLogs, setAuditLogs] = useState([
    { id: 1, time: "Danas, 06:14h", user: "Zamjenik direktora (Superadmin)", action: "Odobrena i objavljena vijest: 'Zimski režim na GOB-u'" },
    { id: 2, time: "Juče, 14:30h", user: "Referent javnih nabavki", action: "Unesena nova 'Odluka o nabavci hemikalija za vodu' (Zahtijeva odobrenje)" },
    { id: 3, time: "30.10.2026.", user: "Web Administrator", action: "Ažuriran sanitarni nalaz Instituta za javno zdravstvo RS" },
    { id: 4, time: "28.10.2026.", user: "PR Referent", action: "Kreiran nacrt za 'Plivaj srcem 2026 miting'" },
  ]);

  // Helper: Role Badges
  const roleLabels = {
    superadmin: { title: "Superadmin (Zamjenik direktora / Uprava)", badge: "bg-purple-100 text-purple-900 border-purple-300", desc: "Puna kontrola, odobravanje zakonskih objava, upravljanje banerima i finansijskim prostorom." },
    webadmin: { title: "Web Administrator (IT Sektor)", badge: "bg-blue-100 text-blue-900 border-blue-300", desc: "Tehnička administracija, Cloudflare tunel, struktura stranica i anketni formulari." },
    referent_nabavke: { title: "Referent za javne nabavke", badge: "bg-amber-100 text-amber-900 border-amber-300", desc: "Ograničen pristup: Može samo unositi tenderska akta i PDF dokumente (nema pristup vijestima ni dizajnu)." },
    referent_pr: { title: "PR / Marketing Referent", badge: "bg-emerald-100 text-emerald-900 border-emerald-300", desc: "Ograničen pristup: Priprema vijesti i saopštenja u status 'Nacrt' (čeka odobrenje Superadmina prije objave)." }
  };

  // Add News Handler
  const handleCreateNews = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newItem: NewsItem = {
      id: Date.now(),
      slug: newTitle.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      title: newTitle,
      date: new Date().toLocaleDateString("sr-BA") + ".",
      category: newCategory,
      image: "/images/GOB-1.jpg",
      excerpt: newExcerpt || newTitle,
      content: newContent || newTitle,
    };

    setNewsList([newItem, ...newsList]);
    setAuditLogs([
      { id: Date.now(), time: "Upravo", user: roleLabels[currentRole].title.split(" (")[0], action: `Kreirana vijest: '${newTitle}'` },
      ...auditLogs
    ]);
    setShowAddNewsModal(false);
    setNewTitle("");
    setNewExcerpt("");
    setNewContent("");
  };

  // Toggle Banner Active
  const handleToggleBanner = (id: number) => {
    setCommercialBanners(commercialBanners.map(b => b.id === id ? { ...b, isActive: !b.isActive } : b));
  };

  // Can perform actions?
  const canManageBanners = currentRole === "superadmin" || currentRole === "webadmin";
  const canManageTenders = currentRole === "superadmin" || currentRole === "referent_nabavke";
  const canManageNews = currentRole === "superadmin" || currentRole === "webadmin" || currentRole === "referent_pr";

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 font-sans flex flex-col">
      {/* Top Admin Control Bar */}
      <header className="bg-slate-950 text-white border-b-4 border-sky-600 shadow-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white transition flex items-center gap-2 text-xs font-bold uppercase tracking-wider"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Javni Portal</span>
            </Link>

            <div className="border-l border-slate-800 pl-4">
              <h1 className="text-xl font-black text-white flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-sky-400" />
                <span>JP AQUANA — Centralni Upravljački CMS</span>
              </h1>
              <p className="text-[11px] text-slate-400">
                Strogo kontrolisano uređivanje bez mogućnosti kvarenja dizajna i koda
              </p>
            </div>
          </div>

          {/* Role Simulator Switcher */}
          <div className="flex items-center gap-2 bg-slate-900 p-1.5 rounded-2xl border border-slate-800">
            <span className="text-[11px] text-slate-400 font-bold px-2 uppercase">Aktivna Uloga:</span>
            <select
              value={currentRole}
              onChange={(e) => setCurrentRole(e.target.value as UserRole)}
              className="bg-slate-800 text-white text-xs font-bold px-3 py-1.5 rounded-xl border border-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500"
            >
              <option value="superadmin">👑 Superadmin (Uprava / Zamjenik direktora)</option>
              <option value="webadmin">💻 Web Administrator (IT Sektor)</option>
              <option value="referent_nabavke">⚖️ Referent za javne nabavke</option>
              <option value="referent_pr">📢 PR / Marketing Referent</option>
            </select>
          </div>
        </div>
      </header>

      {/* Role Context Bar */}
      <div className="w-full bg-slate-200/90 border-b border-slate-300 py-2.5 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className={`px-2.5 py-0.5 rounded-md font-black border text-[11px] ${roleLabels[currentRole].badge}`}>
              {roleLabels[currentRole].title}
            </span>
            <span className="text-slate-600 hidden md:inline">{roleLabels[currentRole].desc}</span>
          </div>
          <span className="text-slate-500 font-mono text-[11px]">Sistem: EnterSYS Cloudflare Isolated Tunnel</span>
        </div>
      </div>

      {/* Main Admin Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-8 py-8 space-y-6">
        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-300 gap-2 overflow-x-auto pb-1">
          <button
            onClick={() => setActiveTab("news")}
            disabled={!canManageNews}
            className={`px-5 py-3 rounded-t-2xl font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition ${
              activeTab === "news"
                ? "bg-white text-sky-700 border-t-2 border-sky-600 shadow-sm"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 disabled:opacity-40 disabled:cursor-not-allowed"
            }`}
          >
            <Newspaper className="w-4 h-4" />
            <span>Vijesti i Saopštenja</span>
            <span className="px-1.5 py-0.5 bg-slate-200 rounded-full text-[10px]">{newsList.length}</span>
          </button>

          <button
            onClick={() => setActiveTab("banners")}
            disabled={!canManageBanners}
            className={`px-5 py-3 rounded-t-2xl font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition ${
              activeTab === "banners"
                ? "bg-white text-amber-700 border-t-2 border-amber-500 shadow-sm"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 disabled:opacity-40 disabled:cursor-not-allowed"
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Baneri i Komercijalni prostor</span>
            <span className="px-1.5 py-0.5 bg-amber-100 text-amber-800 rounded-full text-[10px]">3 aktivna</span>
          </button>

          <button
            onClick={() => setActiveTab("tenders")}
            disabled={!canManageTenders}
            className={`px-5 py-3 rounded-t-2xl font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition ${
              activeTab === "tenders"
                ? "bg-white text-emerald-700 border-t-2 border-emerald-600 shadow-sm"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 disabled:opacity-40 disabled:cursor-not-allowed"
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Javne nabavke (Tenderi)</span>
            <span className="px-1.5 py-0.5 bg-emerald-100 text-emerald-800 rounded-full text-[10px]">{tenders.length}</span>
          </button>

          <button
            onClick={() => setActiveTab("audit")}
            className={`px-5 py-3 rounded-t-2xl font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition ${
              activeTab === "audit"
                ? "bg-white text-purple-700 border-t-2 border-purple-600 shadow-sm"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/60"
            }`}
          >
            <History className="w-4 h-4" />
            <span>Revizijski Dnevnik (Ko je šta radio)</span>
          </button>
        </div>

        {/* TAB 1: VIJESTI & SAOPŠTENJA */}
        {activeTab === "news" && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-300 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
              <div>
                <h2 className="text-xl font-black text-slate-900">Uređivanje vijesti i članaka</h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Unos novih članaka za sajt, školu plivanja i sportske manifestacije. Formatiranje je zaključano tako da se dizajn nikada ne može pokvariti.
                </p>
              </div>

              <button
                onClick={() => setShowAddNewsModal(true)}
                className="px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs uppercase tracking-wide transition shadow-md flex items-center gap-2 self-start sm:self-auto"
              >
                <Plus className="w-4 h-4" />
                <span>Nova vijest</span>
              </button>
            </div>

            {/* News Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="bg-slate-100 border-b border-slate-200 text-xs font-bold text-slate-600 uppercase">
                    <th className="py-3 px-4 w-16">ID</th>
                    <th className="py-3 px-4">Naslov vijesti</th>
                    <th className="py-3 px-4 w-40">Kategorija</th>
                    <th className="py-3 px-4 w-32">Datum</th>
                    <th className="py-3 px-4 w-32">Status</th>
                    <th className="py-3 px-4 w-32 text-right">Akcija</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {newsList.slice(0, 8).map((item, idx) => (
                    <tr key={item.id} className="hover:bg-slate-50 transition">
                      <td className="py-3.5 px-4 text-xs font-mono text-slate-400">#{idx + 1}</td>
                      <td className="py-3.5 px-4 font-semibold text-slate-900">
                        {item.title}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="px-2.5 py-1 rounded-md bg-sky-50 text-sky-800 text-xs font-bold border border-sky-200">
                          {item.category}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-xs text-slate-600 font-medium">{item.date}</td>
                      <td className="py-3.5 px-4">
                        <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Objavljeno</span>
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <Link
                          href={`/vijesti/${item.id}`}
                          target="_blank"
                          className="p-1.5 rounded-lg text-slate-500 hover:text-sky-600 hover:bg-sky-50 inline-flex transition"
                          title="Pregledaj na sajtu"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: BANERI & KOMERCIJALNI PROSTOR */}
        {activeTab === "banners" && (
          <div className="space-y-6">
            {/* Spotlight Banner Toggle */}
            <div className="bg-white rounded-3xl p-6 border border-slate-300 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="text-[11px] font-black text-amber-600 uppercase tracking-widest block">
                  HITNA OBAVJEŠTENJA
                </span>
                <h3 className="text-lg font-black text-slate-900 mt-0.5">
                  Top News / Vanredna kartica na naslovnoj strani
                </h3>
                <p className="text-xs text-slate-600 max-w-2xl">
                  Istaknuta tamna kartica ispod trake za obuku. Koristi se za najave remonta, promjenu termina ili hitna obavještenja.
                </p>
              </div>

              <button
                onClick={() => setTopNewsActive(!topNewsActive)}
                className={`px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition shadow-sm ${
                  topNewsActive
                    ? "bg-emerald-600 text-white hover:bg-emerald-700"
                    : "bg-slate-200 text-slate-700 hover:bg-slate-300"
                }`}
              >
                {topNewsActive ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>AKTIVNO NA SAJTU</span>
                  </>
                ) : (
                  <>
                    <Clock className="w-4 h-4" />
                    <span>PASIVNO (ISKLJUČENO)</span>
                  </>
                )}
              </button>
            </div>

            {/* Commercial Banners (Prodat prostor zakupcima) */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-300 shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
                <div>
                  <h3 className="text-xl font-black text-slate-900">
                    Komercijalni baneri i sponzorski prostor
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Definisanje zakupljenog oglasnog prostora. Sistem sam isključuje banere čim istekne ugovoreni datum zakupa.
                  </p>
                </div>

                <button
                  onClick={() => alert("Otvara se forma za upload banera i unos klijenta")}
                  className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider transition shadow-sm flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Dodaj novi oglas</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {commercialBanners.map((banner) => (
                  <div
                    key={banner.id}
                    className={`rounded-2xl border p-5 space-y-4 transition ${
                      banner.isActive
                        ? "bg-white border-slate-300 shadow-sm"
                        : "bg-slate-50 border-slate-200 opacity-60"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-slate-500 uppercase">
                        {banner.position === "inter_section" ? "Međusekcijski prostor" : banner.position === "top_bar" ? "Top-bar traka" : "Bočna kolona"}
                      </span>
                      <button
                        onClick={() => handleToggleBanner(banner.id)}
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider transition ${
                          banner.isActive ? "bg-emerald-100 text-emerald-800" : "bg-slate-200 text-slate-700"
                        }`}
                      >
                        {banner.isActive ? "Aktivno" : "Pasivno"}
                      </button>
                    </div>

                    <div className="h-28 rounded-xl overflow-hidden bg-slate-100 relative">
                      <img src={banner.image} alt={banner.client} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent flex items-end p-2.5">
                        <span className="text-xs font-bold text-white truncate">{banner.client}</span>
                      </div>
                    </div>

                    <div className="space-y-1 text-xs text-slate-600">
                      <p><strong>Ugovor važi od:</strong> {banner.validFrom}</p>
                      <p><strong>Ugovor važi do:</strong> {banner.validTo}</p>
                    </div>

                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                      <span className="text-slate-400 font-mono">ID: #{banner.id}</span>
                      <button
                        onClick={() => handleToggleBanner(banner.id)}
                        className="text-xs font-bold text-sky-700 hover:text-sky-900"
                      >
                        {banner.isActive ? "Isključi oglas" : "Uključi oglas"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: JAVNE NABAVKE */}
        {activeTab === "tenders" && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-300 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
              <div>
                <h3 className="text-xl font-black text-slate-900">
                  Registar javnih nabavki (Zakonska obaveza)
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Referent za nabavke ovdje unosi odluke o izboru, ugovore i tendersku dokumentaciju. Sve se automatski objavljuje na stranici /javne-nabavke.
                </p>
              </div>

              <button
                onClick={() => alert("Forma za upload PDF tenderske odluke")}
                className="px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs uppercase tracking-wider transition shadow-md flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>Novi tender / odluka</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="bg-slate-100 border-b border-slate-200 text-xs font-bold text-slate-600 uppercase">
                    <th className="py-3 px-4 w-16">R.br</th>
                    <th className="py-3 px-4">Predmet nabavke</th>
                    <th className="py-3 px-4 w-32">Datum</th>
                    <th className="py-3 px-4 w-40">Status</th>
                    <th className="py-3 px-4 w-32 text-right">PDF Fajl</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {tenders.slice(0, 8).map((item, idx) => (
                    <tr key={item.id} className="hover:bg-slate-50 transition">
                      <td className="py-3 px-4 text-xs font-mono text-slate-400">#{idx + 1}</td>
                      <td className="py-3 px-4 font-semibold text-slate-900">{item.title}</td>
                      <td className="py-3 px-4 text-xs text-slate-600">{item.date}</td>
                      <td className="py-3 px-4">
                        <span className="px-2.5 py-0.5 rounded-md text-xs font-bold bg-slate-100 border border-slate-200">
                          {item.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <span className="text-xs text-sky-700 font-bold">PDF priložen</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 4: AUDIT LOG (KONTROLA & REVIZIJA) */}
        {activeTab === "audit" && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-300 shadow-sm space-y-6">
            <div>
              <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
                <History className="w-5 h-5 text-purple-600" />
                <span>Revizijski dnevnik aktivnosti (Audit Log)</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Tačna evidencija o tome koji je zaposleni i u kojoj ulozi unio, izmijenio ili objavio bilo koji podatak na portalu.
              </p>
            </div>

            <div className="space-y-3">
              {auditLogs.map((log) => (
                <div key={log.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-4">
                  <div className="space-y-1">
                    <p className="font-semibold text-slate-900 text-sm">{log.action}</p>
                    <p className="text-xs text-slate-500">
                      Izvršilac: <strong className="text-slate-800">{log.user}</strong>
                    </p>
                  </div>
                  <span className="text-xs font-mono text-slate-500 bg-white px-2.5 py-1 rounded-md border border-slate-200 shrink-0">
                    {log.time}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Modal: Add News */}
      {showAddNewsModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h3 className="text-lg font-black text-slate-900">Kreiranje nove vijesti</h3>
              <button onClick={() => setShowAddNewsModal(false)} className="text-slate-400 hover:text-slate-700 font-bold">✕</button>
            </div>

            <form onSubmit={handleCreateNews} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Naslov članka:</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Unesite zvaničan naslov..."
                  className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Kategorija:</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500 bg-white"
                >
                  <option value="Sport i takmičenja">Sport i takmičenja</option>
                  <option value="Škola plivanja">Škola plivanja</option>
                  <option value="Vodeni park">Vodeni park</option>
                  <option value="Događaji">Događaji</option>
                  <option value="Građanstvo">Građanstvo</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Kratki uvod (prikaz na kartici):</label>
                <textarea
                  rows={2}
                  value={newExcerpt}
                  onChange={(e) => setNewExcerpt(e.target.value)}
                  placeholder="Dvije do tri rečenice koje privlače pažnju..."
                  className="w-full px-4 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Puni tekst vijesti:</label>
                <textarea
                  rows={4}
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  placeholder="Kompletan tekst saopštenja..."
                  className="w-full px-4 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddNewsModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
                >
                  Odustani
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs uppercase tracking-wider shadow-md"
                >
                  Objavi na sajtu
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
