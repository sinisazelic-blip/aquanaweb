"use client";

import React, { useState, useEffect } from "react";
import {
  ShieldCheck,
  UserCheck,
  FileText,
  Newspaper,
  Tag,
  CheckCircle2, Printer,
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
  Filter,
  Edit,
  KeyRound,
  ExternalLink,
  Info,
  Mail,
  Check,
  X,
  Send,
  CheckSquare
} from "lucide-react";
import Link from "next/link";
import { allNewsArticles, NewsItem } from "@/lib/newsData";
import { initialTenders, TenderItem, getStoredTenders, saveStoredTenders } from "@/lib/tendersData";
import {
  getSurveys,
  getCoupons,
  getKidsDrawings,
  SurveySubmission,
  CouponClaim,
  KidsDrawingSubmission,
  UserRole,
  AdminUser,
  getAdminUsers,
  saveAdminUsers,
  CommercialBanner,
  BANNER_SLOTS,
  BannerPosition,
  getCommercialBanners,
  saveCommercialBanners,
  VisitorComment,
  getVisitorComments,
  saveAllVisitorComments,
  ContactInquiry,
  getContactInquiries,
  saveAllContactInquiries,
  PortalSettings,
  getPortalSettings,
  savePortalSettings
} from "@/lib/submissionsData";

export default function AdminPortalPage() {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [loginError, setLoginError] = useState("");
  const [currentUser, setCurrentUser] = useState<AdminUser | null>(null);

  // Users State (User & Role Management)
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>([]);
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newName, setNewName] = useState("");
  const [newRole, setNewRole] = useState<UserRole>("webadmin");

  // Navigation Tab State
  type AdminTab = "surveys" | "coupons" | "drawings" | "news" | "tenders" | "banners" | "users" | "comments" | "inquiries" | "reception" | "settings";
  const [activeTab, setActiveTab] = useState<AdminTab>("surveys");

  // Submissions State
  const [surveys, setSurveys] = useState<SurveySubmission[]>([]);
  const [coupons, setCoupons] = useState<CouponClaim[]>([]);
  const [drawings, setDrawings] = useState<KidsDrawingSubmission[]>([]);
  const [commentsList, setCommentsList] = useState<VisitorComment[]>([]);
  const [inquiriesList, setInquiriesList] = useState<ContactInquiry[]>([]);
  const [receptionSearch, setReceptionSearch] = useState("");
  const [portalSettings, setPortalSettings] = useState<PortalSettings | null>(null);
  const [settingsSuccess, setSettingsSuccess] = useState(false);

  // News State
  const [newsList, setNewsList] = useState<NewsItem[]>(allNewsArticles);
  const [showAddNewsModal, setShowAddNewsModal] = useState(false);

  // Tenders State
  const [tendersList, setTendersList] = useState<TenderItem[]>([]);
  const [showAddTenderModal, setShowAddTenderModal] = useState(false);
  const [newTenderTitle, setNewTenderTitle] = useState("");
  const [newTenderYear, setNewTenderYear] = useState("2026");
  const [newTenderStatus, setNewTenderStatus] = useState<TenderItem["status"]>("Aktivno");
  const [newTenderFile, setNewTenderFile] = useState("");
  const [newTenderFileSize, setNewTenderFileSize] = useState("");
  const [newBannerImageName, setNewBannerImageName] = useState("");
  const [newBannerImagePreview, setNewBannerImagePreview] = useState("");

  // Commercial Banners State
  const [bannersList, setBannersList] = useState<CommercialBanner[]>([]);
  const [showAddBannerModal, setShowAddBannerModal] = useState(false);
  const [newBannerClient, setNewBannerClient] = useState("");
  const [newBannerPosition, setNewBannerPosition] = useState<BannerPosition>("top_spotlight");
  const [newBannerImage, setNewBannerImage] = useState("/images/GOB-14.jpg");
  const [newBannerLink, setNewBannerLink] = useState("https://aquana.ba");
  const [newBannerValidFrom, setNewBannerValidFrom] = useState("01.11.2026.");
  const [newBannerValidTo, setNewBannerValidTo] = useState("31.12.2026.");
  const [newBannerPrice, setNewBannerPrice] = useState("400 KM/mj");

  // Load session & data on mount
  useEffect(() => {
    const loadedUsers = getAdminUsers();
    setAdminUsers(loadedUsers);

    try {
      const savedAuth = localStorage.getItem("aquana_admin_session");
      if (savedAuth) {
        const parsed = JSON.parse(savedAuth);
        // Find matching live user or fallback
        const match = loadedUsers.find((u) => u.username === parsed.username) || parsed;
        if (match && match.status === "Aktivan") {
          setIsAuthenticated(true);
          setCurrentUser(match);
          if (match.role === "recepcija") {
            setActiveTab("reception");
          }
        }
      }
    } catch {
      // ignore
    }

    setSurveys(getSurveys());
    setCoupons(getCoupons());
    setDrawings(getKidsDrawings());
    setTendersList(getStoredTenders());
    setBannersList(getCommercialBanners());
    setCommentsList(getVisitorComments());
    setInquiriesList(getContactInquiries());
    setPortalSettings(getPortalSettings());
  }, []);

  // Handle Login (Checks against dynamic users list + always sinisa:turtle1964)
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");

    const u = usernameInput.trim().toLowerCase();
    const p = passwordInput.trim();

    // Check hardcoded superadmin first
    if (u === "sinisa" && p === "turtle1964") {
      const superadminUser: AdminUser = {
        id: "usr-sinisa",
        username: "sinisa",
        password: "turtle1964",
        name: "Siniša Zelić",
        title: "Glavni Administrator / Superadmin",
        role: "superadmin",
        status: "Aktivan",
        createdAt: "01.11.2026."
      };
      loginSuccess(superadminUser);
      return;
    }

    // Check against dynamic users list
    const found = adminUsers.find((user) => user.username.toLowerCase() === u && user.password === p);
    if (found) {
      if (found.status === "Blokiran") {
        setLoginError("Ovaj nalog je privremeno blokiran od strane administratora.");
        return;
      }
      loginSuccess(found);
      return;
    }

    setLoginError("Neispravno korisničko ime ili lozinka. Pokušajte ponovo.");
  };

  const loginSuccess = (user: AdminUser) => {
    setIsAuthenticated(true);
    setCurrentUser(user);
    if (user.role === "recepcija") {
      setActiveTab("reception");
    }
    try {
      localStorage.setItem("aquana_admin_session", JSON.stringify(user));
    } catch {
      // ignore
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    try {
      localStorage.removeItem("aquana_admin_session");
    } catch {
      // ignore
    }
  };

  // --- COMMENTS MANAGEMENT (ZID UTISAKA) ---
  const toggleCommentStatus = (id: string) => {
    const updated = commentsList.map((c) =>
      c.id === id ? { ...c, status: (c.status === "approved" ? "hidden" : "approved") as "approved" | "hidden" } : c
    );
    setCommentsList(updated);
    saveAllVisitorComments(updated);
  };

  const deleteComment = (id: string) => {
    if (confirm("Da li ste sigurni da želite trajno obrisati ovaj komentar sa sajta?")) {
      const updated = commentsList.filter((c) => c.id !== id);
      setCommentsList(updated);
      saveAllVisitorComments(updated);
    }
  };

  // --- INQUIRIES MANAGEMENT (UPITI UPRAVI) ---
  const toggleInquiryStatus = (id: string) => {
    const statuses: ContactInquiry["status"][] = ["Novo", "Odgovoreno", "Arhivirano"];
    const updated = inquiriesList.map((inq) => {
      if (inq.id === id) {
        const nextIdx = (statuses.indexOf(inq.status) + 1) % statuses.length;
        return { ...inq, status: statuses[nextIdx] };
      }
      return inq;
    });
    setInquiriesList(updated);
    saveAllContactInquiries(updated);
  };

  // --- USER MANAGEMENT FUNCTIONS (Superadmin only) ---
  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUsername.trim() || !newPassword.trim()) return;

    const titlesMap: Record<UserRole, string> = {
      superadmin: "Glavni Administrator / Superadmin",
      webadmin: "Urednik web portala i vijesti",
      referent_nabavke: "Referent za javne nabavke i ugovore",
      referent_pr: "PR & Marketing referent",
      recepcija: "Biletarnica i recepcija bazena"
    };

    const newUser: AdminUser = {
      id: `usr-${Date.now()}`,
      username: newUsername.trim().toLowerCase(),
      password: newPassword.trim(),
      name: newName.trim() || newUsername.trim(),
      title: titlesMap[newRole],
      role: newRole,
      status: "Aktivan",
      createdAt: new Date().toLocaleDateString("sr-BA")
    };

    const updated = [newUser, ...adminUsers];
    setAdminUsers(updated);
    saveAdminUsers(updated);
    setShowAddUserModal(false);
    setNewUsername("");
    setNewPassword("");
    setNewName("");
  };

  const toggleUserStatus = (id: string) => {
    const updated = adminUsers.map((u) => {
      if (u.id === id) {
        if (u.username === "sinisa") return u; // protected master superadmin
        return { ...u, status: (u.status === "Aktivan" ? "Blokiran" : "Aktivan") as "Aktivan" | "Blokiran" };
      }
      return u;
    });
    setAdminUsers(updated);
    saveAdminUsers(updated);
  };

  const deleteUser = (id: string, username: string) => {
    if (username === "sinisa") {
      alert("Nije moguće obrisati glavnog superadmina (sinisa).");
      return;
    }
    if (confirm(`Da li ste sigurni da želite obrisati korisnika "${username}"?`)) {
      const updated = adminUsers.filter((u) => u.id !== id);
      setAdminUsers(updated);
      saveAdminUsers(updated);
    }
  };

  // --- BANNER MANAGEMENT FUNCTIONS ---
  const handleAddBanner = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBannerClient.trim()) return;

    const slotInfo = BANNER_SLOTS[newBannerPosition];

    const newBanner: CommercialBanner = {
      id: `ban-${Date.now()}`,
      client: newBannerClient.trim(),
      position: newBannerPosition,
      dimensions: slotInfo.dimensions,
      image: newBannerImage.trim() || "/images/GOB-14.jpg",
      link: newBannerLink.trim() || "https://aquana.ba",
      validFrom: newBannerValidFrom.trim(),
      validTo: newBannerValidTo.trim(),
      priceNote: newBannerPrice.trim(),
      status: "Aktivan"
    };

    const updated = [newBanner, ...bannersList];
    setBannersList(updated);
    saveCommercialBanners(updated);
    setShowAddBannerModal(false);
    setNewBannerClient("");
  };

  const toggleBannerStatus = (id: string) => {
    const updated = bannersList.map((b) =>
      b.id === id ? { ...b, status: (b.status === "Aktivan" ? "Pasivan" : "Aktivan") as "Aktivan" | "Pasivan" } : b
    );
    setBannersList(updated);
    saveCommercialBanners(updated);
  };

  const deleteBanner = (id: string) => {
    if (confirm("Da li ste sigurni da želite ukloniti ovaj sponzorski baner?")) {
      const updated = bannersList.filter((b) => b.id !== id);
      setBannersList(updated);
      saveCommercialBanners(updated);
    }
  };

  // --- TENDERS MANAGEMENT FUNCTIONS ---
  const handleAddTender = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTenderTitle.trim()) return;

    const newTender: TenderItem = {
      id: Date.now(),
      title: newTenderTitle.trim(),
      date: new Date().toLocaleDateString("sr-BA"),
      year: newTenderYear,
      status: newTenderStatus,
      file: newTenderFile.trim() || "Zvanicni-dokument.pdf"
    };

    const updated = [newTender, ...tendersList];
    setTendersList(updated);
    saveStoredTenders(updated);
    setShowAddTenderModal(false);
    setNewTenderTitle("");
  };

  const toggleTenderStatus = (id: number) => {
    const statuses: TenderItem["status"][] = ["Aktivno", "Dodijeljen ugovor", "Završeno", "Poništeno"];
    const updated = tendersList.map((t) => {
      if (t.id === id) {
        const nextIdx = (statuses.indexOf(t.status) + 1) % statuses.length;
        return { ...t, status: statuses[nextIdx] };
      }
      return t;
    });
    setTendersList(updated);
    saveStoredTenders(updated);
  };

  const deleteTender = (id: number) => {
    if (currentUser?.role !== "superadmin") {
      alert("Samo Superadmin (Siniša Zelić) ima dozvolu za trajno brisanje javnih nabavki iz arhive.");
      return;
    }
    if (confirm("UPOZORENJE (SUPERADMIN): Da li ste sigurni da želite trajno obrisati ovu javnu nabavku?")) {
      const updated = tendersList.filter((t) => t.id !== id);
      setTendersList(updated);
      saveStoredTenders(updated);
    }
  };


  // POS Thermal Printer Voucher Slip (58mm / 80mm format for Caffe Bar GOB)
  const printPosReceipt = (coupon: CouponClaim) => {
    if (typeof window === "undefined") return;
    const isCoffee = coupon.facility.toLowerCase().includes("kafa") || coupon.code.startsWith("#AQ");
    const printWindow = window.open("", "_blank", "width=380,height=600");
    if (!printWindow) {
      alert("Molimo omogu?ite pop-up prozore u browseru za POS ?tampu.");
      return;
    }
    const receiptHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8" />
          <title>POS Vau?er - ${coupon.code}</title>
          <style>
            @page {
              size: 80mm auto;
              margin: 0;
            }
            body {
              font-family: 'Courier New', Courier, monospace;
              font-size: 13px;
              line-height: 1.35;
              width: 76mm;
              margin: 0 auto;
              padding: 10px 4px;
              color: #000;
              background: #fff;
            }
            .center { text-align: center; }
            .bold { font-weight: bold; }
            .large { font-size: 16px; }
            .xlarge { font-size: 20px; letter-spacing: 1px; }
            .divider { border-top: 1px dashed #000; margin: 8px 0; }
            .double-divider { border-top: 2px solid #000; margin: 8px 0; }
            .box { border: 1.5px solid #000; padding: 6px; margin: 8px 0; text-align: center; }
            .small { font-size: 11px; }
          </style>
        </head>
        <body>
          <div class="center bold large">JP "AQUANA" d.o.o.</div>
          <div class="center bold">GRADSKI OLIMPIJSKI BAZEN</div>
          <div class="center small">Banja Luka ? www.aquana.ba</div>
          
          <div class="double-divider"></div>
          
          <div class="center bold">DOKUMENT PRAVDANJA ?ANKA</div>
          <div class="center small">SLIP ZA CAFFE BAR GOB</div>
          
          <div class="divider"></div>
          
          <div><strong>DATUM:</strong> ${new Date().toLocaleDateString("sr-RS")} ${new Date().toLocaleTimeString("sr-RS")}</div>
          <div><strong>KORISNIK:</strong> ${coupon.phone}</div>
          <div><strong>OPERATER:</strong> Recepcija / Biletarnica GOB</div>
          
          <div class="box">
            <div class="small bold">JEDINSTVENI KOD KUPONA:</div>
            <div class="bold xlarge">${coupon.code}</div>
            <div class="small">${coupon.status === "Iskori?ten" ? "STATUS: ISKORI?TEN / VERIFIKOVAN" : "STATUS: EVIDENTIRAN"}</div>
          </div>
          
          <div class="bold">POGODNOST:</div>
          <div>${coupon.facility}</div>
          
          <div class="divider"></div>
          
          <div class="small bold">PRAVDANJE I OBRA?UN:</div>
          <div class="small">
            ${isCoffee 
              ? "Ovaj slip daje pravo donosiocu na besplatnu kafu u Caffe baru GOB. ?anker / konobar zadr?ava slip i prila?e ga uz dnevni fiskalni obra?un."
              : "Validirana besplatna ulaznica za posjetioca. Zadr?ava kontrola ulaza / biletarnica."}
          </div>
          
          <div class="double-divider"></div>
          
          <div class="center bold small">HVALA NA POVJERENJU!</div>
          <div class="center small">Sistem za digitalne kupone GOB</div>
          
          <script>
            window.onload = function() {
              window.focus();
              window.print();
              setTimeout(function() { window.close(); }, 800);
            };
          </script>
        </body>
      </html>
    `;
    printWindow.document.open();
    printWindow.document.write(receiptHtml);
    printWindow.document.close();
  };

  const handleRedeemAndPrint = (coupon: CouponClaim) => {
    if (coupon.status === "Aktivan") {
      toggleCouponStatus(coupon.id);
    }
    printPosReceipt(coupon);
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
    if (surveys.length === 0) return { avg: "4.8", cistoca: "4.8", voda: "4.9", temp: "4.7", osoblje: "4.6", count: 0 };
    const total = surveys.reduce((acc, s) => {
      acc.cistoca += s.ratings.cistoca;
      acc.voda += s.ratings.kvalitetVode;
      acc.temp += s.ratings.temperatura;
      acc.osoblje += s.ratings.osoblje;
      return acc;
    }, { cistoca: 0, voda: 0, temp: 0, osoblje: 0 });

    const count = surveys.length;
    return {
      avg: ((total.cistoca + total.voda + total.temp + total.osoblje) / (count * 4)).toFixed(1),
      cistoca: (total.cistoca / count).toFixed(1),
      voda: (total.voda / count).toFixed(1),
      temp: (total.temp / count).toFixed(1),
      osoblje: (total.osoblje / count).toFixed(1),
      count
    };
  }, [surveys]);

  // LOGIN SCREEN (No automatic shortcuts, clean & secure)
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 relative overflow-hidden font-sans">
        {/* Ambient background glows */}
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-sky-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="w-full max-w-md bg-white rounded-3xl p-8 shadow-2xl border border-slate-200 relative z-10 animate-in fade-in zoom-in-95 duration-200">
          <div className="text-center space-y-2 mb-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-sky-600 to-cyan-500 text-white flex items-center justify-center mx-auto shadow-lg shadow-sky-600/30">
              <Lock className="w-8 h-8" />
            </div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              Aquana CMS Portal
            </h1>
            <p className="text-xs text-slate-500">
              Zvanični administrativni pristup JP „Aquana“ d.o.o. Banja Luka
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
                placeholder="Unesite korisničko ime..."
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

          <div className="mt-6 pt-5 border-t border-slate-100 text-center">
            <Link href="/" className="text-xs text-sky-600 hover:text-sky-800 font-bold inline-flex items-center gap-1 transition">
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
          <span className="text-xs font-bold text-slate-300 hidden md:inline">JP „Aquana“ d.o.o. Banja Luka</span>

          {/* RETURN TO PUBLIC PORTAL BUTTON */}
          <Link
            href="/"
            className="ml-2 px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-sky-600 text-sky-300 hover:text-white border border-slate-700 hover:border-sky-500 text-xs font-bold transition flex items-center gap-1.5 shadow-sm"
            title="Povratak na javni portal Aquana"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>← Povratak na portal (aquana.ba)</span>
          </Link>
        </div>

        {/* User profile & Role */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold text-xs border border-sky-500/40">
              {currentUser?.name.slice(0, 2).toUpperCase() || "SZ"}
            </div>
            <div className="text-left text-xs">
              <strong className="block text-white leading-tight">{currentUser?.name}</strong>
              <span className="text-[10px] text-amber-400 uppercase font-black tracking-wider flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-amber-400" />
                <span>{currentUser?.role === "superadmin" ? "Superadmin" : currentUser?.role}</span>
              </span>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="p-2 rounded-xl bg-slate-800 hover:bg-rose-900/40 text-slate-300 hover:text-rose-400 border border-slate-700 transition flex items-center gap-1.5 text-xs font-bold"
            title="Odjavi se"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Odjava</span>
          </button>
        </div>
      </header>

      {/* Main Tabs Navigation - Fully responsive 2 rows, NO horizontal scroll */}
      <div className="bg-white border-b border-slate-200 px-6 py-3 shadow-sm">
        <div className="flex flex-wrap items-center gap-2">
          {/* RECEPTION TAB (Very important for front-desk tickets & coupons) */}
          <button
            onClick={() => setActiveTab("reception")}
            className={`px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-2 transition ${
              activeTab === "reception"
                ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/30"
                : "text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200"
            }`}
          >
            <Ticket className="w-4 h-4 text-emerald-500" />
            <span>Recepcija / Biletarnica ({coupons.filter(c => c.status === "Aktivan").length} aktivnih)</span>
          </button>

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
            onClick={() => setActiveTab("comments")}
            className={`px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-2 transition ${
              activeTab === "comments"
                ? "bg-sky-600 text-white shadow-md shadow-sky-600/30"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            }`}
          >
            <MessageSquare className="w-4 h-4 text-pink-400" />
            <span>Zid utisaka ({commentsList.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("inquiries")}
            className={`px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-2 transition ${
              activeTab === "inquiries"
                ? "bg-sky-600 text-white shadow-md shadow-sky-600/30"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            }`}
          >
            <Mail className="w-4 h-4 text-amber-400" />
            <span>Upiti upravi ({inquiriesList.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("coupons")}
            className={`px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-2 transition ${
              activeTab === "coupons"
                ? "bg-sky-600 text-white shadow-md shadow-sky-600/30"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
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
            <span>Javne nabavke i oglasi ({tendersList.length})</span>
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
            <span>Komercijalni baneri ({bannersList.length})</span>
          </button>

                    {/* PORTAL SETTINGS & REGIME TAB (Superadmin & Webadmin) */}
          {(currentUser?.role === "superadmin" || currentUser?.role === "webadmin") && (
            <button
              onClick={() => setActiveTab("settings")}
              className={`px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-2 transition ${
                activeTab === "settings"
                  ? "bg-slate-900 text-white shadow-md shadow-slate-900/30"
                  : "text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-300"
              }`}
            >
              <Settings className="w-4 h-4 text-amber-500" />
              <span>Podešavanja & Režimi rada</span>
            </button>
          )}

          {/* SUPERADMIN USER MANAGEMENT TAB */}
          {currentUser?.role === "superadmin" && (
            <button
              onClick={() => setActiveTab("users")}
              className={`px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-2 transition ${
                activeTab === "users"
                  ? "bg-amber-600 text-white shadow-md shadow-amber-600/30"
                  : "text-amber-800 bg-amber-50 hover:bg-amber-100 border border-amber-200"
              }`}
            >
              <Users className="w-4 h-4 text-amber-500" />
              <span>Korisnici i ovlašćenja ({adminUsers.length})</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Dashboard Content Area */}
      <main className="flex-1 p-6 max-w-7xl w-full mx-auto space-y-6">
        {/* TAB 0: RECEPTION & TICKETING DESK (RECEPTION ROLE & SUPERADMIN) */}
        {activeTab === "reception" && (
          <div className="space-y-6">
            {/* 0. DNEVNE TEMPERATURE BAZENA (UNOS RECEPCIJA & ADMIN) */}
            <div className="bg-white rounded-3xl p-6 border-2 border-cyan-500/40 shadow-sm space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-100 text-cyan-700 flex items-center justify-center font-bold text-lg">
                    🌡️
                  </div>
                  <div>
                    <h3 className="font-black text-slate-900 text-base">
                      Dnevne temperature bazena (Telemetrija za posjetioce)
                    </h3>
                    <p className="text-xs text-slate-500">
                      Ručni unos temperatura vode i dvorane koji se u realnom vremenu prikazuje na početnoj stranici
                    </p>
                  </div>
                </div>
                <span className="text-xs font-mono font-bold text-cyan-700 bg-cyan-50 px-3 py-1 rounded-full border border-cyan-200 self-start sm:self-auto">
                  {portalSettings?.telemetry?.lastUpdated || "Danas u 07:00h"}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Temperatura vode */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <label className="text-xs font-bold text-slate-700 block uppercase">
                    💧 Temperatura vode (°C)
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="text"
                      value={portalSettings?.telemetry?.waterTemp || "26.8"}
                      onChange={(e) => {
                        if (!portalSettings) return;
                        const updated = {
                          ...portalSettings,
                          telemetry: {
                            ...(portalSettings.telemetry || {
                              airTemp: "28.5",
                              waterStatus: "FINA takmičarska norma",
                              airStatus: "Klimatizovana dvorana",
                              updatedBy: "Recepcija"
                            }),
                            waterTemp: e.target.value,
                            lastUpdated: `Danas u ${new Date().toLocaleTimeString("sr-RS", { hour: "2-digit", minute: "2-digit" })}h`,
                            updatedBy: currentUser?.name || "Recepcija"
                          }
                        };
                        setPortalSettings(updated);
                        savePortalSettings(updated);
                      }}
                      className="w-32 px-3 py-2 rounded-xl bg-white border border-slate-300 font-black text-xl text-cyan-700 focus:outline-cyan-500"
                    />
                    <div className="text-xs text-slate-500">
                      <p className="font-bold text-slate-700">FINA takmičarska norma</p>
                      <p>Preporučeno: 26.5 – 27.2 °C</p>
                    </div>
                  </div>
                </div>

                {/* Temperatura vazduha / dvorane */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <label className="text-xs font-bold text-slate-700 block uppercase">
                    🌡️ Temperatura dvorane / vazduha (°C)
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="text"
                      value={portalSettings?.telemetry?.airTemp || "28.5"}
                      onChange={(e) => {
                        if (!portalSettings) return;
                        const updated = {
                          ...portalSettings,
                          telemetry: {
                            ...(portalSettings.telemetry || {
                              waterTemp: "26.8",
                              waterStatus: "FINA takmičarska norma",
                              airStatus: "Klimatizovana dvorana",
                              updatedBy: "Recepcija"
                            }),
                            airTemp: e.target.value,
                            lastUpdated: `Danas u ${new Date().toLocaleTimeString("sr-RS", { hour: "2-digit", minute: "2-digit" })}h`,
                            updatedBy: currentUser?.name || "Recepcija"
                          }
                        };
                        setPortalSettings(updated);
                        savePortalSettings(updated);
                      }}
                      className="w-32 px-3 py-2 rounded-xl bg-white border border-slate-300 font-black text-xl text-amber-600 focus:outline-amber-500"
                    />
                    <div className="text-xs text-slate-500">
                      <p className="font-bold text-slate-700">Klimatizovana dvorana</p>
                      <p>Preporučeno: 28.0 – 29.0 °C</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-emerald-900 to-teal-950 p-6 rounded-3xl text-white shadow-xl border border-emerald-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-emerald-300 text-xs font-black uppercase tracking-wider mb-1">
                  <Ticket className="w-4 h-4 text-emerald-400" />
                  <span>Recepcija & Biletarnica Gradskog olimpijskog bazena</span>
                </div>
                <h2 className="text-2xl font-black text-white">Validacija i izdavanje vaučera / karata</h2>
                <p className="text-xs text-slate-300 mt-1 max-w-xl">
                  Unesite broj telefona posjetioca ili kod kupona/karte (npr. <span className="text-emerald-300 font-mono font-bold">#VP-MEČ</span> ili <span className="text-amber-300 font-mono font-bold">#AQUANA-</span>) i jednim klikom označite status iskorištenja.
                </p>
              </div>

              {/* Status summary */}
              <div className="flex items-center gap-3">
                <div className="bg-slate-900/80 px-4 py-2.5 rounded-2xl border border-emerald-500/30 text-center">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Aktivnih kupona</span>
                  <span className="text-2xl font-black text-emerald-400 font-mono">
                    {coupons.filter((c) => c.status === "Aktivan").length}
                  </span>
                </div>
                <div className="bg-slate-900/80 px-4 py-2.5 rounded-2xl border border-slate-700 text-center">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Iskorištenih</span>
                  <span className="text-2xl font-black text-slate-400 font-mono">
                    {coupons.filter((c) => c.status === "Iskorišten").length}
                  </span>
                </div>
              </div>
            </div>

            {/* Live Search Bar for Receptionist */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-3">
              <Search className="w-5 h-5 text-slate-400 shrink-0 ml-2" />
              <input
                type="text"
                value={receptionSearch}
                onChange={(e) => setReceptionSearch(e.target.value)}
                placeholder="Brza pretraga: unesite broj telefona ili šifru vaučera (npr. 065 123 456 ili VP-MEČ)..."
                className="w-full text-sm font-semibold bg-transparent focus:outline-none placeholder:text-slate-400"
              />
              {receptionSearch && (
                <button
                  onClick={() => setReceptionSearch("")}
                  className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Reception Table */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 font-black text-slate-700 uppercase">
                    <th className="py-3 px-4">Kod kupona / karte</th>
                    <th className="py-3 px-4">Pogodnost / Svrha</th>
                    <th className="py-3 px-4">Telefon posjetioca</th>
                    <th className="py-3 px-4">Datum rezervacije</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Potvrda recepcije</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {coupons
                    .filter((c) => {
                      if (!receptionSearch.trim()) return true;
                      const q = receptionSearch.toLowerCase();
                      return c.code.toLowerCase().includes(q) || c.phone.toLowerCase().includes(q) || c.facility.toLowerCase().includes(q);
                    })
                    .map((c) => {
                      const isSpeedTicket = c.code.startsWith("#VP-MEČ");
                      return (
                        <tr key={c.id} className="hover:bg-slate-50 transition">
                          <td className="py-3.5 px-4">
                            <span className={`font-mono font-black text-sm px-2.5 py-1 rounded-lg border ${
                              isSpeedTicket
                                ? "bg-amber-50 text-amber-900 border-amber-300"
                                : "bg-sky-50 text-sky-900 border-sky-300"
                            }`}>
                              {c.code}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 font-bold text-slate-800">
                            {isSpeedTicket ? "Ulaznica: Vaterpolo prvenstvena utakmica (Tribine)" : c.facility}
                          </td>
                          <td className="py-3.5 px-4 font-mono font-bold text-slate-700">
                            {c.phone}
                          </td>
                          <td className="py-3.5 px-4 text-slate-500 font-mono">
                            {c.date}
                          </td>
                          <td className="py-3.5 px-4">
                            <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase ${
                              c.status === "Aktivan"
                                ? "bg-emerald-100 text-emerald-800 border border-emerald-300 animate-pulse"
                                : "bg-slate-200 text-slate-600"
                            }`}>
                              ● {c.status === "Aktivan" ? "Čeka preuzimanje" : "Iskorišten"}
                            </span>
                          </td>
                                                    <td className="py-3.5 px-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              {c.status === "Aktivan" ? (
                                <button
                                  onClick={() => handleRedeemAndPrint(c)}
                                  className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs uppercase tracking-wider shadow-md shadow-emerald-600/30 transition hover:scale-105 inline-flex items-center gap-1.5 cursor-pointer"
                                  title="Ozna?i kupon kao iskori?ten i od?tampaj POS slip za Caffe bar GOB"
                                >
                                  <Printer className="w-4 h-4" />
                                  <span>Izdaj & ?tampaj POS ra?un</span>
                                </button>
                              ) : (
                                <div className="flex items-center gap-2">
                                  <button
                                    onClick={() => printPosReceipt(c)}
                                    className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs shadow transition hover:scale-105 inline-flex items-center gap-1.5 cursor-pointer"
                                    title="Ponovo od?tampaj POS slip za ?ank"
                                  >
                                    <Printer className="w-3.5 h-3.5 text-amber-400" />
                                    <span>?tampaj slip</span>
                                  </button>
                                  <button
                                    onClick={() => toggleCouponStatus(c.id)}
                                    className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-[11px] transition cursor-pointer"
                                    title="Poni?ti status ako je gre?kom ozna?eno"
                                  >
                                    Poni?ti
                                  </button>
                                </div>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB: VISITOR COMMENTS (ZID UTISAKA) */}
        {activeTab === "comments" && (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-black text-slate-900">Zid utisaka – Komentari posjetilaca</h3>
                <p className="text-xs text-slate-500">
                  Pregled i moderacija komentara. Odobreni komentari se javno prikazuju na naslovnoj strani portala (posljednjih 5).
                </p>
              </div>
              <span className="px-3 py-1 rounded-xl bg-pink-50 text-pink-700 border border-pink-200 text-xs font-bold">
                Ukupno komentara u bazi: {commentsList.length}
              </span>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 font-black text-slate-700 uppercase">
                    <th className="py-3 px-4">Autor</th>
                    <th className="py-3 px-4">Kategorija</th>
                    <th className="py-3 px-4">Komentar / Utisak</th>
                    <th className="py-3 px-4">Datum</th>
                    <th className="py-3 px-4">Status prikaza</th>
                    <th className="py-3 px-4 text-right">Moderacija</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {commentsList.map((c) => (
                    <tr key={c.id} className="hover:bg-slate-50 transition">
                      <td className="py-3.5 px-4 font-bold text-slate-900 whitespace-nowrap">
                        {c.author}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className={`px-2 py-0.5 rounded-md text-[10px] font-black uppercase ${
                          c.category === "Pohvala"
                            ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                            : c.category === "Prijedlog"
                            ? "bg-sky-100 text-sky-800 border border-sky-300"
                            : "bg-amber-100 text-amber-800 border border-amber-300"
                        }`}>
                          {c.category}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-slate-700 max-w-md">
                        {c.text}
                      </td>
                      <td className="py-3.5 px-4 text-slate-500 font-mono whitespace-nowrap">
                        {c.date}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase ${
                          c.status === "approved"
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-slate-200 text-slate-700"
                        }`}>
                          ● {c.status === "approved" ? "Javno vidljiv" : "Sakriven"}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => toggleCommentStatus(c.id)}
                            className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-[11px] font-bold transition cursor-pointer"
                          >
                            {c.status === "approved" ? "Sakrij sa sajta" : "Odobri za prikaz"}
                          </button>
                          <button
                            onClick={() => deleteComment(c.id)}
                            className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 transition cursor-pointer"
                            title="Obriši komentar"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB: CITIZEN INQUIRIES (UPITI UPRAVI) */}
        {activeTab === "inquiries" && (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-black text-slate-900">Upiti posjetilaca i građana (info@aquana.ba)</h3>
                <p className="text-xs text-slate-500">
                  Direktne poruke upućene upravi preduzeća putem kontakt obrasca na portalu.
                </p>
              </div>
              <span className="px-3 py-1 rounded-xl bg-amber-50 text-amber-800 border border-amber-200 text-xs font-bold">
                Ukupno upita: {inquiriesList.length}
              </span>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 font-black text-slate-700 uppercase">
                    <th className="py-3 px-4">Ime i Prezime</th>
                    <th className="py-3 px-4">Kontakt (Email / Tel)</th>
                    <th className="py-3 px-4">Služba</th>
                    <th className="py-3 px-4">Sadržaj poruke</th>
                    <th className="py-3 px-4">Datum i vrijeme</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Akcije</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {inquiriesList.map((inq) => (
                    <tr key={inq.id} className="hover:bg-slate-50 transition">
                      <td className="py-3.5 px-4 font-bold text-slate-900 whitespace-nowrap">
                        {inq.fullName}
                      </td>
                      <td className="py-3.5 px-4 font-mono font-bold text-sky-700 whitespace-nowrap">
                        {inq.contact}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-bold text-[10px]">
                          {inq.department}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-slate-800 max-w-sm">
                        {inq.message}
                      </td>
                      <td className="py-3.5 px-4 text-slate-500 font-mono whitespace-nowrap">
                        {inq.date}
                      </td>
                      <td className="py-3.5 px-4">
                        <button
                          onClick={() => toggleInquiryStatus(inq.id)}
                          className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase cursor-pointer ${
                            inq.status === "Novo"
                              ? "bg-rose-100 text-rose-800 border border-rose-300 animate-pulse"
                              : inq.status === "Odgovoreno"
                              ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                              : "bg-slate-200 text-slate-700"
                          }`}
                          title="Kliknite za promjenu statusa"
                        >
                          ● {inq.status}
                        </button>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <a
                          href={`mailto:${inq.contact}?subject=Odgovor JP Aquana Banja Luka - Upit ${inq.id}`}
                          className="px-2.5 py-1 rounded-lg bg-sky-50 hover:bg-sky-100 text-sky-700 font-bold text-[11px] inline-flex items-center gap-1 border border-sky-200"
                        >
                          <Send className="w-3 h-3" />
                          <span>Odgovori</span>
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 1: SURVEY ANALYTICS */}
        {activeTab === "surveys" && (
          <div className="space-y-6">
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

            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-5 border-b border-slate-200 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-black text-slate-900">Zabilježeni odgovori građana i posjetilaca</h3>
                  <p className="text-xs text-slate-500">Direktni komentari i ocjene pristigle putem ankete na web portalu</p>
                </div>
                <span className="px-3 py-1 rounded-full bg-sky-50 text-sky-700 text-xs font-bold border border-sky-200">
                  {surveys.length} anketa
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
                  <p className="text-xs text-slate-500">Brojevi telefona i vaučeri koji važe na biletarnici i u Caffe Baru GOB</p>
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
                  Aktivni: {coupons.filter(c => c.status === "Aktivan").length} / Ukupno: {coupons.length}
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 font-black text-slate-700 uppercase">
                      <th className="py-3 px-4">Kôd vaučera</th>
                      <th className="py-3 px-4">Broj telefona</th>
                      <th className="py-3 px-4">Datum & Vrijeme</th>
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

        {/* TAB 3: KIDS DRAWINGS */}
        {activeTab === "drawings" && (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-5 border-b border-slate-200 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-black text-slate-900">Prijave za dječiji konkurs „Nacrtaj Aquanu ili GOB“</h3>
                  <p className="text-xs text-slate-500">Radovi pristigli za nagradu od 10 besplatnih ulaza</p>
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
                      <th className="py-3 px-4">Datum</th>
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
                        <td className="py-3 px-4 text-slate-500">{d.date}</td>
                        <td className="py-3 px-4 font-black text-amber-600">★ {d.votes} glasova</td>
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

        {/* TAB 5: TENDERS & PUBLIC ANNOUNCEMENTS */}
        {activeTab === "tenders" && (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-black text-slate-900">Javne nabavke, tenderi i javni oglasi</h3>
                <p className="text-xs text-slate-500">
                  Dodavanje novih tendera, promjena statusa i brisanje (brisanje dozvoljeno samo Superadminu)
                </p>
              </div>
              <button
                onClick={() => setShowAddTenderModal(true)}
                className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black uppercase tracking-wider flex items-center gap-1.5 shadow-md transition"
              >
                <Plus className="w-4 h-4" />
                <span>Objavi novu nabavku / oglas</span>
              </button>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 font-black text-slate-700 uppercase">
                    <th className="py-3 px-4">R.Br / ID</th>
                    <th className="py-3 px-4">Predmet nabavke / Naziv oglasa</th>
                    <th className="py-3 px-4">Godina</th>
                    <th className="py-3 px-4">Datum objave</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Akcije</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {tendersList.map((t) => (
                    <tr key={t.id} className="hover:bg-slate-50 transition">
                      <td className="py-3 px-4 font-mono font-bold text-slate-900">JN-{t.id}</td>
                      <td className="py-3 px-4 font-semibold text-slate-800 max-w-md">
                        {t.title}
                        <span className="block text-[10px] text-slate-400 font-mono mt-0.5">Dokument: {t.file}</span>
                      </td>
                      <td className="py-3 px-4 font-mono text-slate-600">{t.year}</td>
                      <td className="py-3 px-4 text-slate-500">{t.date}</td>
                      <td className="py-3 px-4">
                        <button
                          onClick={() => toggleTenderStatus(t.id)}
                          className={`px-2.5 py-1 rounded-full text-[10px] font-black transition cursor-pointer ${
                            t.status === "Aktivno"
                              ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-200 border border-emerald-300"
                              : t.status === "Dodijeljen ugovor"
                              ? "bg-sky-100 text-sky-800 hover:bg-sky-200 border border-sky-300"
                              : t.status === "Poništeno"
                              ? "bg-rose-100 text-rose-800 hover:bg-rose-200 border border-rose-300"
                              : "bg-slate-200 text-slate-700 hover:bg-slate-300"
                          }`}
                          title="Kliknite za promjenu statusa"
                        >
                          ● {t.status}
                        </button>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <a
                            href={`/dokumenti/${encodeURIComponent(t.file)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-2.5 py-1 rounded-lg bg-sky-50 hover:bg-sky-100 text-sky-700 text-[11px] font-bold inline-flex items-center gap-1 border border-sky-200 transition"
                            title="Otvori i pregledaj PDF u novom prozoru"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>Pregledaj PDF</span>
                          </a>
                          <button
                            onClick={() => toggleTenderStatus(t.id)}
                            className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700"
                            title="Promijeni status"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                          {currentUser?.role === "superadmin" && (
                            <button
                              onClick={() => deleteTender(t.id)}
                              className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 transition"
                              title="Obriši nabavku (samo Superadmin)"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 6: COMMERCIAL BANNERS & SPONSOR SLOTS SPECIFICATION */}
        {activeTab === "banners" && (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-black text-slate-900">Komercijalni baneri i sponzorski slotovi</h3>
                <p className="text-xs text-slate-500">
                  Pregled pozicija, dimenzija, statusa i upravljanje zakupljenim prostorom
                </p>
              </div>
              <button
                onClick={() => setShowAddBannerModal(true)}
                className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-black uppercase tracking-wider flex items-center gap-1.5 shadow-md transition"
              >
                <Plus className="w-4 h-4" />
                <span>Dodaj novi baner</span>
              </button>
            </div>

            {/* BANNER SPECIFICATION CARDS FOR CLIENT PROPOSALS */}
            <div className="bg-gradient-to-r from-slate-900 to-indigo-950 p-6 rounded-3xl text-white space-y-4 shadow-xl border border-indigo-500/30">
              <div className="flex items-center gap-2 text-indigo-300 text-xs font-black uppercase tracking-wider">
                <Info className="w-4 h-4 text-cyan-400" />
                <span>CJENOVNIK I SPECIFIKACIJA OGLASNIH POZICIJA ZA ZAKUPCE</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {(Object.entries(BANNER_SLOTS) as [BannerPosition, typeof BANNER_SLOTS[BannerPosition]][]).map(([key, slot]) => (
                  <div key={key} className="bg-white/10 rounded-2xl p-4 border border-white/10 space-y-2 backdrop-blur-sm">
                    <span className="text-[10px] font-black uppercase text-cyan-300 block">{slot.title.split(":")[0]}</span>
                    <strong className="text-sm font-bold text-white block leading-snug">{slot.title.split(":")[1]}</strong>
                    <div className="bg-black/30 px-2.5 py-1 rounded-lg text-xs font-mono font-bold text-amber-300 inline-block border border-amber-300/30">
                      📐 {slot.dimensions}
                    </div>
                    <p className="text-[11px] text-slate-300 leading-relaxed">{slot.description}</p>
                    <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs font-black text-emerald-400">
                      <span>Preporučena cijena:</span>
                      <span>{slot.recommendedPrice}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* LIVE BANNERS TABLE */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-5 border-b border-slate-200 flex items-center justify-between">
                <h4 className="text-base font-black text-slate-900">Aktivni i arhivirani sponzorski baneri</h4>
                <span className="text-xs text-slate-500 font-semibold">{bannersList.length} banera</span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 font-black text-slate-700 uppercase">
                      <th className="py-3 px-4">Klijent / Zakupac</th>
                      <th className="py-3 px-4">Pozicija & Dimenzije</th>
                      <th className="py-3 px-4">Period zakupa</th>
                      <th className="py-3 px-4">Cijena</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-right">Akcije</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {bannersList.map((b) => (
                      <tr key={b.id} className="hover:bg-slate-50 transition">
                        <td className="py-3 px-4">
                          <strong className="text-slate-900 text-sm block">{b.client}</strong>
                          <a href={b.link} target="_blank" className="text-[11px] text-sky-600 hover:underline flex items-center gap-1 font-mono">
                            <span>{b.link}</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 font-bold text-[10px] block w-fit mb-1 border border-indigo-200">
                            {b.position}
                          </span>
                          <span className="font-mono text-slate-500 text-[11px]">{b.dimensions}</span>
                        </td>
                        <td className="py-3 px-4 font-mono text-slate-600">
                          {b.validFrom} – {b.validTo}
                        </td>
                        <td className="py-3 px-4 font-bold text-emerald-700 font-mono">
                          {b.priceNote || "Ugovor"}
                        </td>
                        <td className="py-3 px-4">
                          <button
                            onClick={() => toggleBannerStatus(b.id)}
                            className={`px-2.5 py-1 rounded-full text-[10px] font-black transition cursor-pointer ${
                              b.status === "Aktivan"
                                ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                                : "bg-slate-200 text-slate-700"
                            }`}
                          >
                            ● {b.status}
                          </button>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => toggleBannerStatus(b.id)}
                              className="px-2 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-[11px] font-bold"
                            >
                              {b.status === "Aktivan" ? "Deaktiviraj" : "Aktiviraj"}
                            </button>
                            <button
                              onClick={() => deleteBanner(b.id)}
                              className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 transition"
                              title="Obriši baner"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 7: USER MANAGEMENT (SUPERADMIN ONLY) */}
        {activeTab === "users" && currentUser?.role === "superadmin" && (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-black text-slate-900">Upravljanje korisnicima i ovlašćenjima (Superadmin)</h3>
                <p className="text-xs text-slate-500">
                  Dodjela pristupa, definisanje korisničkih imena, lozinki i uloga za rad u CMS sistemu
                </p>
              </div>
              <button
                onClick={() => setShowAddUserModal(true)}
                className="px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-black uppercase tracking-wider flex items-center gap-1.5 shadow-md transition"
              >
                <Plus className="w-4 h-4" />
                <span>Dodaj novog korisnika</span>
              </button>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 font-black text-slate-700 uppercase">
                    <th className="py-3 px-4">Korisničko ime</th>
                    <th className="py-3 px-4">Ime i Prezime</th>
                    <th className="py-3 px-4">Lozinka</th>
                    <th className="py-3 px-4">Uloga / Ovlašćenje</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Akcije</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {adminUsers.map((u) => (
                    <tr key={u.id} className="hover:bg-slate-50 transition">
                      <td className="py-3 px-4 font-mono font-bold text-slate-900 text-sm">
                        {u.username}
                        {u.username === "sinisa" && (
                          <span className="ml-2 px-2 py-0.5 rounded bg-amber-100 text-amber-800 text-[9px] font-black">
                            MASTER
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        <strong className="text-slate-900 text-sm block">{u.name}</strong>
                        <span className="text-[11px] text-slate-500">{u.title}</span>
                      </td>
                      <td className="py-3 px-4 font-mono font-bold text-slate-700">
                        {u.password}
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase ${
                          u.role === "superadmin"
                            ? "bg-amber-100 text-amber-900 border border-amber-300"
                            : u.role === "webadmin"
                            ? "bg-sky-100 text-sky-900 border border-sky-300"
                            : u.role === "referent_nabavke"
                            ? "bg-emerald-100 text-emerald-900 border border-emerald-300"
                            : "bg-purple-100 text-purple-900 border border-purple-300"
                        }`}>
                          {u.role}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          u.status === "Aktivan" ? "bg-emerald-100 text-emerald-800" : "bg-rose-100 text-rose-800"
                        }`}>
                          {u.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {u.username !== "sinisa" && (
                            <>
                              <button
                                onClick={() => toggleUserStatus(u.id)}
                                className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-[11px] font-bold"
                              >
                                {u.status === "Aktivan" ? "Blokiraj" : "Aktiviraj"}
                              </button>
                              <button
                                onClick={() => deleteUser(u.id, u.username)}
                                className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 transition"
                                title="Obriši nalog"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      
        {/* TAB 8: PORTAL SETTINGS (ZIMSKI/LJETNI REŽIM & FLASH AKCIJA) */}
        {activeTab === "settings" && portalSettings && (
          <div className="space-y-6">
            {/* 0. DNEVNE TEMPERATURE BAZENA (UNOS RECEPCIJA & ADMIN) */}
            <div className="bg-white rounded-3xl p-6 border-2 border-cyan-500/40 shadow-sm space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-100 text-cyan-700 flex items-center justify-center font-bold text-lg">
                    🌡️
                  </div>
                  <div>
                    <h3 className="font-black text-slate-900 text-base">
                      Dnevne temperature bazena (Telemetrija za posjetioce)
                    </h3>
                    <p className="text-xs text-slate-500">
                      Ručni unos temperatura vode i dvorane koji se u realnom vremenu prikazuje na početnoj stranici
                    </p>
                  </div>
                </div>
                <span className="text-xs font-mono font-bold text-cyan-700 bg-cyan-50 px-3 py-1 rounded-full border border-cyan-200 self-start sm:self-auto">
                  {portalSettings?.telemetry?.lastUpdated || "Danas u 07:00h"}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Temperatura vode */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <label className="text-xs font-bold text-slate-700 block uppercase">
                    💧 Temperatura vode (°C)
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="text"
                      value={portalSettings?.telemetry?.waterTemp || "26.8"}
                      onChange={(e) => {
                        if (!portalSettings) return;
                        const updated = {
                          ...portalSettings,
                          telemetry: {
                            ...(portalSettings.telemetry || {
                              airTemp: "28.5",
                              waterStatus: "FINA takmičarska norma",
                              airStatus: "Klimatizovana dvorana",
                              updatedBy: "Recepcija"
                            }),
                            waterTemp: e.target.value,
                            lastUpdated: `Danas u ${new Date().toLocaleTimeString("sr-RS", { hour: "2-digit", minute: "2-digit" })}h`,
                            updatedBy: currentUser?.name || "Recepcija"
                          }
                        };
                        setPortalSettings(updated);
                        savePortalSettings(updated);
                      }}
                      className="w-32 px-3 py-2 rounded-xl bg-white border border-slate-300 font-black text-xl text-cyan-700 focus:outline-cyan-500"
                    />
                    <div className="text-xs text-slate-500">
                      <p className="font-bold text-slate-700">FINA takmičarska norma</p>
                      <p>Preporučeno: 26.5 – 27.2 °C</p>
                    </div>
                  </div>
                </div>

                {/* Temperatura vazduha / dvorane */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <label className="text-xs font-bold text-slate-700 block uppercase">
                    🌡️ Temperatura dvorane / vazduha (°C)
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="text"
                      value={portalSettings?.telemetry?.airTemp || "28.5"}
                      onChange={(e) => {
                        if (!portalSettings) return;
                        const updated = {
                          ...portalSettings,
                          telemetry: {
                            ...(portalSettings.telemetry || {
                              waterTemp: "26.8",
                              waterStatus: "FINA takmičarska norma",
                              airStatus: "Klimatizovana dvorana",
                              updatedBy: "Recepcija"
                            }),
                            airTemp: e.target.value,
                            lastUpdated: `Danas u ${new Date().toLocaleTimeString("sr-RS", { hour: "2-digit", minute: "2-digit" })}h`,
                            updatedBy: currentUser?.name || "Recepcija"
                          }
                        };
                        setPortalSettings(updated);
                        savePortalSettings(updated);
                      }}
                      className="w-32 px-3 py-2 rounded-xl bg-white border border-slate-300 font-black text-xl text-amber-600 focus:outline-amber-500"
                    />
                    <div className="text-xs text-slate-500">
                      <p className="font-bold text-slate-700">Klimatizovana dvorana</p>
                      <p>Preporučeno: 28.0 – 29.0 °C</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-black text-slate-900">Podešavanja portala, sezonski režimi i Flash akcije</h3>
                <p className="text-xs text-slate-500">
                  Upravljajte gornjim vanrednim banerom (Zimski/Ljetni režim), tekstovima i trajanjem promotivnih akcija u realnom vremenu.
                </p>
              </div>
              {settingsSuccess && (
                <div className="px-4 py-2 rounded-xl bg-emerald-100 border border-emerald-300 text-emerald-800 text-xs font-bold flex items-center gap-2 animate-in fade-in">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Podešavanja su uspješno sačuvana i odmah aktivna na portalu!</span>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* CARD 1: TOP VANREDNO OBAVJEŠTENJE / SEZONSKI REŽIM */}
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-amber-500 animate-pulse" />
                    <h4 className="font-black text-slate-900 text-base">Gornji vanredni baner (Režim rada)</h4>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const updated = {
                        ...portalSettings,
                        topBanner: { ...portalSettings.topBanner, isActive: !portalSettings.topBanner.isActive }
                      };
                      setPortalSettings(updated);
                      savePortalSettings(updated);
                      setSettingsSuccess(true);
                      setTimeout(() => setSettingsSuccess(false), 3000);
                    }}
                    className={`px-3 py-1 rounded-full text-xs font-bold transition cursor-pointer ${
                      portalSettings.topBanner.isActive
                        ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                        : "bg-slate-200 text-slate-700"
                    }`}
                  >
                    ● {portalSettings.topBanner.isActive ? "Baner Aktivan na sajtu" : "Baner Isključen"}
                  </button>
                </div>

                {/* Quick Regime Presets */}
                <div>
                  <label className="text-[11px] font-bold text-slate-600 uppercase block mb-1.5">
                    Brzi izbor šablona režima:
                  </label>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <button
                      type="button"
                      onClick={() => {
                        const updated = {
                          ...portalSettings,
                          topBanner: {
                            ...portalSettings.topBanner,
                            tag: "ZIMSKI REŽIM",
                            title: "Zimski režim na Gradskom olimpijskom bazenu i raspored staza za građanstvo",
                            text: "Produženi rekreativni večernji termini, besprijekorno zagrijavanje vode i vazduha, te otvorene prijave za nove grupe škole plivanja."
                          }
                        };
                        setPortalSettings(updated);
                      }}
                      className="p-2 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-800 font-bold border border-sky-200 text-left transition"
                    >
                      ❄️ Zimski režim GOB
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        const updated = {
                          ...portalSettings,
                          topBanner: {
                            ...portalSettings.topBanner,
                            tag: "LJETNA SEZONA",
                            title: "Otvorena ljetna kupališna sezona na Vodenom parku Aquana!",
                            text: "Radno vrijeme otvorenih bazena od 10:00 do 19:00h. Tri bazena, tobogan, ležaljke i ugostiteljski sadržaji za sve generacije."
                          }
                        };
                        setPortalSettings(updated);
                      }}
                      className="p-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 font-bold border border-amber-200 text-left transition"
                    >
                      ☀️ Ljetna sezona Aquana
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        const updated = {
                          ...portalSettings,
                          topBanner: {
                            ...portalSettings.topBanner,
                            tag: "TEHNIČKI REMONT",
                            title: "Redovni godišnji remont i sanitarno održavanje Gradskog olimpijskog bazena",
                            text: "Kompletno pražnjenje bazena, dezinfekcija školjke i servisiranje filterskih postrojenja u cilju očuvanja najvišeg kvaliteta vode."
                          }
                        };
                        setPortalSettings(updated);
                      }}
                      className="p-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-800 font-bold border border-rose-200 text-left transition"
                    >
                      🔧 Tehnički remont bazena
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        const updated = {
                          ...portalSettings,
                          topBanner: {
                            ...portalSettings.topBanner,
                            tag: "VANREDNO OBAVJEŠTENJE",
                            title: "Važno obavještenje za građane i sportske klubove",
                            text: "Zbog održavanja međunarodnog plivačkog mitinga bazen će u subotu i nedjelju raditi po izmijenjenom rasporedu."
                          }
                        };
                        setPortalSettings(updated);
                      }}
                      className="p-2 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-800 font-bold border border-purple-200 text-left transition"
                    >
                      📢 Vanredno obavještenje
                    </button>
                  </div>
                </div>

                <div className="space-y-3 pt-1">
                  <div>
                    <label className="text-xs font-bold text-slate-700 uppercase block mb-1">Oznaka (Tag):</label>
                    <input
                      type="text"
                      value={portalSettings.topBanner.tag}
                      onChange={(e) =>
                        setPortalSettings({
                          ...portalSettings,
                          topBanner: { ...portalSettings.topBanner, tag: e.target.value }
                        })
                      }
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 bg-slate-50 font-bold"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 uppercase block mb-1">Glavni naslov:</label>
                    <input
                      type="text"
                      value={portalSettings.topBanner.title}
                      onChange={(e) =>
                        setPortalSettings({
                          ...portalSettings,
                          topBanner: { ...portalSettings.topBanner, title: e.target.value }
                        })
                      }
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 bg-slate-50 font-bold"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 uppercase block mb-1">Podnaslov / Opis teksta:</label>
                    <textarea
                      rows={2}
                      value={portalSettings.topBanner.text}
                      onChange={(e) =>
                        setPortalSettings({
                          ...portalSettings,
                          topBanner: { ...portalSettings.topBanner, text: e.target.value }
                        })
                      }
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 bg-slate-50 resize-none font-medium"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-xs font-bold text-slate-700 uppercase block mb-1">Tekst dugmeta:</label>
                      <input
                        type="text"
                        value={portalSettings.topBanner.buttonText}
                        onChange={(e) =>
                          setPortalSettings({
                            ...portalSettings,
                            topBanner: { ...portalSettings.topBanner, buttonText: e.target.value }
                          })
                        }
                        className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 bg-slate-50"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-700 uppercase block mb-1">Link dugmeta (URL):</label>
                      <input
                        type="text"
                        value={portalSettings.topBanner.buttonLink}
                        onChange={(e) =>
                          setPortalSettings({
                            ...portalSettings,
                            topBanner: { ...portalSettings.topBanner, buttonLink: e.target.value }
                          })
                        }
                        className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 bg-slate-50"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* CARD 2: FLASH PROMO AKCIJA & ODBROJAVANJE */}
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-rose-500 animate-pulse" />
                    <h4 className="font-black text-slate-900 text-base">Flash Promo Akcija & Odbrojavanje</h4>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const updated = {
                        ...portalSettings,
                        flashPromo: { ...portalSettings.flashPromo, isActive: !portalSettings.flashPromo.isActive }
                      };
                      setPortalSettings(updated);
                      savePortalSettings(updated);
                      setSettingsSuccess(true);
                      setTimeout(() => setSettingsSuccess(false), 3000);
                    }}
                    className={`px-3 py-1 rounded-full text-xs font-bold transition cursor-pointer ${
                      portalSettings.flashPromo.isActive
                        ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                        : "bg-slate-200 text-slate-700"
                    }`}
                  >
                    ● {portalSettings.flashPromo.isActive ? "Akcija Aktivna" : "Akcija Isključena"}
                  </button>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="text-xs font-bold text-slate-700 uppercase block mb-1">Glavna pogodnost (bedž):</label>
                    <input
                      type="text"
                      value={portalSettings.flashPromo.benefitBadge}
                      onChange={(e) =>
                        setPortalSettings({
                          ...portalSettings,
                          flashPromo: { ...portalSettings.flashPromo, benefitBadge: e.target.value }
                        })
                      }
                      placeholder="npr. 50 ULAZA + 5 KAFA"
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 bg-slate-50 font-bold text-amber-700"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 uppercase block mb-1">Naslov Flash ponude:</label>
                    <input
                      type="text"
                      value={portalSettings.flashPromo.title}
                      onChange={(e) =>
                        setPortalSettings({
                          ...portalSettings,
                          flashPromo: { ...portalSettings.flashPromo, title: e.target.value }
                        })
                      }
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 bg-slate-50 font-bold"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 uppercase block mb-1">Opis teksta za posjetioce:</label>
                    <textarea
                      rows={2}
                      value={portalSettings.flashPromo.description}
                      onChange={(e) =>
                        setPortalSettings({
                          ...portalSettings,
                          flashPromo: { ...portalSettings.flashPromo, description: e.target.value }
                        })
                      }
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 bg-slate-50 resize-none font-medium"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 uppercase block mb-1">
                      Datum i vrijeme do kada akcija važi (istek tajmera):
                    </label>
                    <input
                      type="text"
                      value={portalSettings.flashPromo.targetExpiry}
                      onChange={(e) =>
                        setPortalSettings({
                          ...portalSettings,
                          flashPromo: { ...portalSettings.flashPromo, targetExpiry: e.target.value }
                        })
                      }
                      placeholder="npr. 2026-11-30T23:59:59"
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 bg-slate-50 font-mono font-bold"
                    />
                    <span className="text-[10px] text-slate-500 mt-1 block">
                      Sat na sajtu u sekundi precizno odbrojava do unesenog datuma i vremena.
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* SAVE ALL SETTINGS BUTTON */}
            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={() => {
                  savePortalSettings(portalSettings);
                  setSettingsSuccess(true);
                  setTimeout(() => setSettingsSuccess(false), 4000);
                }}
                className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-sky-600 to-blue-700 hover:from-sky-500 hover:to-blue-600 text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-sky-600/30 transition hover:scale-[1.01] flex items-center gap-2 cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Sačuvaj sva podešavanja portala</span>
              </button>
            </div>
          </div>
        )}

      {/* MODAL 1: ADD USER (Superadmin only) */}
      {showAddUserModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-100 space-y-4">
            <h3 className="text-xl font-black text-slate-900">Dodaj novog korisnika CMS-a</h3>
            <form onSubmit={handleAddUser} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Korisničko ime (username):</label>
                <input
                  type="text"
                  required
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                  placeholder="npr. jovan.p"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 bg-slate-50 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Lozinka (password):</label>
                <input
                  type="text"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Unesite lozinku..."
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 bg-slate-50 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Ime i Prezime zaposlenog:</label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="npr. Jovan Petrović"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 bg-slate-50 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Uloga / Nivo ovlašćenja:</label>
                <select
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value as UserRole)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 bg-slate-50 focus:bg-white font-bold"
                >
                  <option value="webadmin">Webadmin – Urednik sadržaja i vijesti</option>
                  <option value="referent_nabavke">Referent nabavki – Javne nabavke i tenderi</option>
                  <option value="referent_pr">PR Referent – Marketing, kuponi, dječiji konkurs</option>
                  <option value="superadmin">Superadmin – Puni pristup sistemu</option>
                </select>
              </div>

              <div className="flex gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddUserModal(false)}
                  className="w-1/2 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs uppercase"
                >
                  Odustani
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-black text-xs uppercase shadow-md"
                >
                  Kreiraj nalog
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: ADD BANNER */}
      {showAddBannerModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-100 space-y-4">
            <h3 className="text-xl font-black text-slate-900">Dodaj komercijalni / sponzorski baner</h3>
            <form onSubmit={handleAddBanner} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Naziv klijenta / partnera:</label>
                <input
                  type="text"
                  required
                  value={newBannerClient}
                  onChange={(e) => setNewBannerClient(e.target.value)}
                  placeholder="npr. Banjalučka pivara / Nektar"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 bg-slate-50 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Pozicija i format banera:</label>
                <select
                  value={newBannerPosition}
                  onChange={(e) => {
                    const pos = e.target.value as BannerPosition;
                    setNewBannerPosition(pos);
                    setNewBannerPrice(BANNER_SLOTS[pos].recommendedPrice);
                  }}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 bg-slate-50 focus:bg-white font-bold"
                >
                  <option value="top_spotlight">Pozicija A: Header Billboard (1200 x 160 px)</option>
                  <option value="inter_section">Pozicija B: Panorama između sekcija (1280 x 240 px)</option>
                  <option value="sidebar">Pozicija C: Sidebar Skyscraper (360 x 500 px)</option>
                  <option value="footer_strip">Pozicija D: Footer Partner Strip (1200 x 100 px)</option>
                </select>
              </div>

              {/* UPLOAD BANER SLIKE */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Upload slike banera (JPG, PNG, GIF, WebP):
                </label>
                <div className="p-3.5 rounded-2xl border-2 border-dashed border-indigo-200 bg-indigo-50/50 hover:bg-indigo-50 transition text-center relative group">
                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/gif,image/webp"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setNewBannerImageName(file.name);
                        const reader = new FileReader();
                        reader.onload = (ev) => {
                          setNewBannerImagePreview(ev.target?.result as string);
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10"
                  />
                  {newBannerImagePreview ? (
                    <div className="space-y-2">
                      <img
                        src={newBannerImagePreview}
                        alt="Preview"
                        className="max-h-24 mx-auto rounded-lg shadow-sm border border-slate-200 object-contain"
                      />
                      <p className="text-[11px] font-mono text-indigo-700 font-bold">
                        ✓ {newBannerImageName} (kliknite za zamjenu)
                      </p>
                    </div>
                  ) : (
                    <div className="py-2 space-y-1">
                      <p className="text-xs font-bold text-indigo-900">
                        Kliknite ili prevucite sliku banera ovdje
                      </p>
                      <p className="text-[10px] text-slate-500 font-medium">
                        Preporučene dimenzije: {BANNER_SLOTS[newBannerPosition].dimensions}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Web link klijenta (URL):</label>
                <input
                  type="url"
                  required
                  value={newBannerLink}
                  onChange={(e) => setNewBannerLink(e.target.value)}
                  placeholder="https://..."
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 bg-slate-50 focus:bg-white font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Važi od:</label>
                  <input
                    type="text"
                    value={newBannerValidFrom}
                    onChange={(e) => setNewBannerValidFrom(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 bg-slate-50"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Važi do:</label>
                  <input
                    type="text"
                    value={newBannerValidTo}
                    onChange={(e) => setNewBannerValidTo(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 bg-slate-50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Ugovorena naknada:</label>
                <input
                  type="text"
                  value={newBannerPrice}
                  onChange={(e) => setNewBannerPrice(e.target.value)}
                  placeholder="npr. 400 KM/mj"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 bg-slate-50"
                />
              </div>

              <div className="flex gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddBannerModal(false)}
                  className="w-1/2 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs uppercase"
                >
                  Odustani
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-black text-xs uppercase shadow-md"
                >
                  Sačuvaj baner
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: ADD TENDER */}
      {showAddTenderModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-100 space-y-4">
            <h3 className="text-xl font-black text-slate-900">Objavi novu javnu nabavku / oglas</h3>
            <form onSubmit={handleAddTender} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Predmet nabavke / Naziv oglasa:</label>
                <textarea
                  required
                  rows={2}
                  value={newTenderTitle}
                  onChange={(e) => setNewTenderTitle(e.target.value)}
                  placeholder="npr. Nabavka hemijskih sredstava za sanitarni tretman vode 2026..."
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 bg-slate-50 focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Godina:</label>
                  <select
                    value={newTenderYear}
                    onChange={(e) => setNewTenderYear(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 bg-slate-50 font-bold"
                  >
                    <option value="2026">2026</option>
                    <option value="2025">2025</option>
                    <option value="2024">2024</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Status:</label>
                  <select
                    value={newTenderStatus}
                    onChange={(e) => setNewTenderStatus(e.target.value as TenderItem["status"])}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 bg-slate-50 font-bold"
                  >
                    <option value="Aktivno">Aktivno</option>
                    <option value="Dodijeljen ugovor">Dodijeljen ugovor</option>
                    <option value="Završeno">Završeno</option>
                    <option value="Poništeno">Poništeno</option>
                  </select>
                </div>
              </div>

              {/* UPLOAD PDF DOKUMENTA */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Upload zvaničnog PDF dokumenta:
                </label>
                <div className="p-4 rounded-2xl border-2 border-dashed border-emerald-300 bg-emerald-50/60 hover:bg-emerald-50 transition text-center relative group">
                  <input
                    type="file"
                    accept=".pdf,application/pdf"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setNewTenderFile(file.name);
                        const kb = Math.round(file.size / 1024);
                        setNewTenderFileSize(`${kb} KB`);
                      }
                    }}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10"
                  />
                  {newTenderFile ? (
                    <div className="flex items-center justify-center gap-3 py-1">
                      <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-black text-xs">
                        PDF
                      </div>
                      <div className="text-left">
                        <strong className="text-xs font-mono text-emerald-900 block truncate max-w-xs">
                          {newTenderFile}
                        </strong>
                        <span className="text-[10px] text-emerald-600 font-bold">
                          ✓ Spreman za objavu {newTenderFileSize ? `(${newTenderFileSize})` : ""}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="py-2 space-y-1">
                      <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-1">
                        📄
                      </div>
                      <p className="text-xs font-bold text-emerald-950">
                        Kliknite za odabir PDF dokumenta sa računara
                      </p>
                      <p className="text-[10px] text-slate-500 font-medium">
                        Odluka, tenderska dokumentacija ili obavještenje (.pdf)
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddTenderModal(false)}
                  className="w-1/2 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs uppercase"
                >
                  Odustani
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs uppercase shadow-md"
                >
                  Objavi nabavku
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
