export interface SurveySubmission {
  id: string;
  date: string;
  frequency: string;
  ratings: {
    cistoca: number;
    kvalitetVode: number;
    temperatura: number;
    osoblje: number;
    raspored: number;
  };
  comment: string;
  contact?: string;
}

export interface CouponClaim {
  id: string;
  code: string;
  phone: string;
  date: string;
  facility: string;
  status: "Iskorišten" | "Aktivan";
}

export interface KidsDrawingSubmission {
  id: string;
  childName: string;
  age: number;
  title: string;
  parentPhone: string;
  date: string;
  votes: number;
  status: "Odobreno" | "Na čekanju";
}

// Initial realistic seed data so admin dashboard shows immediate insights
export const initialSurveys: SurveySubmission[] = [
  {
    id: "SRV-2026-081",
    date: "01.11.2026. 14:20",
    frequency: "Nekoliko puta sedmično",
    ratings: { cistoca: 5, kvalitetVode: 5, temperatura: 5, osoblje: 4, raspored: 4 },
    comment: "Bazen i voda su besprijekorno čisti. Jutarnji termin od 06:00h je pun pogodak za nas rekreativce prije posla!",
    contact: "milos.p@gmail.com"
  },
  {
    id: "SRV-2026-080",
    date: "31.10.2026. 19:45",
    frequency: "Nekoliko puta mjesečno",
    ratings: { cistoca: 5, kvalitetVode: 5, temperatura: 4, osoblje: 5, raspored: 4 },
    comment: "Pohvala za ljubaznost djevojaka na recepciji i trenere škole plivanja. Bilo bi odlično ako se može ubaciti još jedan termin subotom popodne.",
    contact: "jelena.k@blic.net"
  },
  {
    id: "SRV-2026-079",
    date: "30.10.2026. 11:15",
    frequency: "Svaki dan",
    ratings: { cistoca: 4, kvalitetVode: 5, temperatura: 5, osoblje: 4, raspored: 5 },
    comment: "Temperatura vode je idealna za treninge (26.8°C). Mobilni lift za osobe sa invaliditetom je velika stvar za grad.",
    contact: ""
  },
  {
    id: "SRV-2026-078",
    date: "28.10.2026. 17:30",
    frequency: "Vikendom",
    ratings: { cistoca: 5, kvalitetVode: 4, temperatura: 4, osoblje: 4, raspored: 4 },
    comment: "Porodični popusti i kafa u caffe baru su odličan dodatak. Sve preporuke za novu upravu!",
    contact: "dragan.bl@gmail.com"
  }
];

export const initialCoupons: CouponClaim[] = [
  { id: "CPN-101", code: "#50K-26-9812", phone: "+387 65 412 889", date: "01.11.2026. 15:42", facility: "Caffe Bar GOB", status: "Aktivan" },
  { id: "CPN-102", code: "#50K-26-4431", phone: "+387 66 820 114", date: "01.11.2026. 12:10", facility: "Caffe Bar GOB", status: "Iskorišten" },
  { id: "CPN-103", code: "#50K-26-5590", phone: "+387 65 993 421", date: "31.10.2026. 18:05", facility: "Caffe Bar GOB", status: "Iskorišten" },
  { id: "CPN-104", code: "#50K-26-1207", phone: "+387 66 115 902", date: "31.10.2026. 10:22", facility: "Caffe Bar GOB", status: "Aktivan" },
  { id: "CPN-105", code: "#50K-26-3398", phone: "+387 65 334 771", date: "30.10.2026. 16:55", facility: "Caffe Bar GOB", status: "Iskorišten" }
];

export const initialKidsDrawings: KidsDrawingSubmission[] = [
  { id: "KID-1", childName: "Luka", age: 8, title: "Moj skok sa velikog tobogana u Boriku", parentPhone: "+387 65 889 001", date: "29.10.2026.", votes: 42, status: "Odobreno" },
  { id: "KID-2", childName: "Sara", age: 6, title: "Olimpijski bazen i zlatna ribica", parentPhone: "+387 66 450 123", date: "30.10.2026.", votes: 58, status: "Odobreno" },
  { id: "KID-3", childName: "Stefan", age: 10, title: "Vaterpolo utakmica na GOB-u", parentPhone: "+387 65 220 981", date: "31.10.2026.", votes: 35, status: "Odobreno" },
  { id: "KID-4", childName: "Milica", age: 7, title: "Plivanje sa mamom i tatom nedjeljom", parentPhone: "+387 66 771 445", date: "01.11.2026.", votes: 19, status: "Odobreno" }
];

export const getSurveys = (): SurveySubmission[] => {
  if (typeof window === "undefined") return initialSurveys;
  try {
    const raw = localStorage.getItem("aquana_surveys");
    if (!raw) return initialSurveys;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : initialSurveys;
  } catch {
    return initialSurveys;
  }
};

export const saveSurvey = (submission: Omit<SurveySubmission, "id" | "date">) => {
  if (typeof window === "undefined") return;
  const current = getSurveys();
  const newEntry: SurveySubmission = {
    ...submission,
    id: `SRV-${Date.now().toString().slice(-4)}`,
    date: new Date().toLocaleString("sr-BA", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    })
  };
  const updated = [newEntry, ...current];
  localStorage.setItem("aquana_surveys", JSON.stringify(updated));
  return newEntry;
};

export const getCoupons = (): CouponClaim[] => {
  if (typeof window === "undefined") return initialCoupons;
  try {
    const raw = localStorage.getItem("aquana_coupons");
    if (!raw) return initialCoupons;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : initialCoupons;
  } catch {
    return initialCoupons;
  }
};

export const saveCoupon = (phone: string): CouponClaim => {
  const code = `#50K-26-${Math.floor(1000 + Math.random() * 9000)}`;
  const newEntry: CouponClaim = {
    id: `CPN-${Date.now().toString().slice(-4)}`,
    code,
    phone,
    date: new Date().toLocaleString("sr-BA", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    }),
    facility: "Caffe Bar GOB",
    status: "Aktivan"
  };
  if (typeof window !== "undefined") {
    const current = getCoupons();
    const updated = [newEntry, ...current];
    localStorage.setItem("aquana_coupons", JSON.stringify(updated));
  }
  return newEntry;
};

export const getKidsDrawings = (): KidsDrawingSubmission[] => {
  if (typeof window === "undefined") return initialKidsDrawings;
  try {
    const raw = localStorage.getItem("aquana_drawings");
    if (!raw) return initialKidsDrawings;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : initialKidsDrawings;
  } catch {
    return initialKidsDrawings;
  }
};

export const saveKidsDrawing = (drawing: { childName: string; age: number; title: string; parentPhone: string }): KidsDrawingSubmission => {
  const newEntry: KidsDrawingSubmission = {
    id: `KID-${Date.now().toString().slice(-4)}`,
    ...drawing,
    date: new Date().toLocaleDateString("sr-BA"),
    votes: 1,
    status: "Odobreno"
  };
  if (typeof window !== "undefined") {
    const current = getKidsDrawings();
    const updated = [newEntry, ...current];
    localStorage.setItem("aquana_drawings", JSON.stringify(updated));
  }
  return newEntry;
};

// --- ADMIN USERS & ROLES ---
export type UserRole = "superadmin" | "webadmin" | "referent_nabavke" | "referent_pr" | "recepcija";

export interface AdminUser {
  id: string;
  username: string;
  password: string;
  name: string;
  title: string;
  role: UserRole;
  status: "Aktivan" | "Blokiran";
  createdAt: string;
}

export const initialAdminUsers: AdminUser[] = [
  {
    id: "usr-1",
    username: "sinisa",
    password: "turtle1964",
    name: "Siniša Zelić",
    title: "Glavni Administrator / Superadmin",
    role: "superadmin",
    status: "Aktivan",
    createdAt: "01.11.2026."
  },
  {
    id: "usr-2",
    username: "webadmin",
    password: "web2026!",
    name: "Web Urednik",
    title: "Urednik web portala i vijesti",
    role: "webadmin",
    status: "Aktivan",
    createdAt: "01.11.2026."
  },
  {
    id: "usr-3",
    username: "nabavke",
    password: "tender2026!",
    name: "Referent za javne nabavke",
    title: "Služba tendera i ugovora",
    role: "referent_nabavke",
    status: "Aktivan",
    createdAt: "01.11.2026."
  },
  {
    id: "usr-4",
    username: "pr",
    password: "marketing2026!",
    name: "PR Referent",
    title: "Odnosi s javnošću i marketing",
    role: "referent_pr",
    status: "Aktivan",
    createdAt: "01.11.2026."
  },
  {
    id: "usr-5",
    username: "recepcija",
    password: "gob2026!",
    name: "Recepcija GOB",
    title: "Biletarnica i recepcija bazena",
    role: "recepcija",
    status: "Aktivan",
    createdAt: "02.11.2026."
  }
];

export const getAdminUsers = (): AdminUser[] => {
  if (typeof window === "undefined") return initialAdminUsers;
  try {
    const raw = localStorage.getItem("aquana_admin_users");
    if (!raw) return initialAdminUsers;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : initialAdminUsers;
  } catch {
    return initialAdminUsers;
  }
};

export const saveAdminUsers = (users: AdminUser[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("aquana_admin_users", JSON.stringify(users));
  }
};

// --- COMMERCIAL BANNERS SPECIFICATION & STORAGE ---
export type BannerPosition = "top_spotlight" | "inter_section" | "sidebar" | "footer_strip";

export interface CommercialBanner {
  id: string;
  client: string;
  position: BannerPosition;
  dimensions: string;
  image: string;
  link: string;
  validFrom: string;
  validTo: string;
  priceNote?: string;
  status: "Aktivan" | "Pasivan";
}

export const BANNER_SLOTS: Record<BannerPosition, { title: string; dimensions: string; description: string; recommendedPrice: string }> = {
  top_spotlight: {
    title: "Pozicija A: Header / Top Spotlight Billboard",
    dimensions: "1200 x 160 px",
    description: "Najviša vidljivost na vrhu sajta, iznad glavnog menija i radara. Prikazuje se svim posjetiocima.",
    recommendedPrice: "400 KM / mjesečno"
  },
  inter_section: {
    title: "Pozicija B: Panorama Banner između sekcija",
    dimensions: "1280 x 240 px",
    description: "Dominantni panoramski baner između radara popunjenosti i rasporeda bazena. Idealan za fitnes centre i sponzore mitinga.",
    recommendedPrice: "350 KM / mjesečno"
  },
  sidebar: {
    title: "Pozicija C: Skyscraper baner uz raspored / vijesti",
    dimensions: "360 x 500 px",
    description: "Vertikalni format u desnom stupcu uz raspored termina za rekreativce ili arhivu vijesti.",
    recommendedPrice: "250 KM / mjesečno"
  },
  footer_strip: {
    title: "Pozicija D: Institucionalni / Korporativni strip u dnu",
    dimensions: "1200 x 100 px",
    description: "Stalna traka partnera i generalnih sponzora neposredno iznad footera.",
    recommendedPrice: "200 KM / mjesečno"
  }
};

export const initialBanners: CommercialBanner[] = [
  {
    id: "ban-1",
    client: "Fitness Centar GOB (Zakupac prostora)",
    position: "inter_section",
    dimensions: "1280 x 240 px",
    image: "/images/GOB-14.jpg",
    link: "https://aquana.ba",
    validFrom: "01.01.2026.",
    validTo: "31.12.2026.",
    priceNote: "350 KM/mjesec",
    status: "Aktivan"
  },
  {
    id: "ban-2",
    client: "m:tel – Zvanični partner i sponzor plivačkog mitinga",
    position: "top_spotlight",
    dimensions: "1200 x 160 px",
    image: "/images/Plivacki-Meeting-1.jpg",
    link: "https://mtel.ba",
    validFrom: "15.10.2026.",
    validTo: "30.11.2026.",
    priceNote: "400 KM/mjesec",
    status: "Aktivan"
  }
];

export const getCommercialBanners = (): CommercialBanner[] => {
  if (typeof window === "undefined") return initialBanners;
  try {
    const raw = localStorage.getItem("aquana_commercial_banners");
    if (!raw) return initialBanners;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : initialBanners;
  } catch {
    return initialBanners;
  }
};

export const saveCommercialBanners = (banners: CommercialBanner[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("aquana_commercial_banners", JSON.stringify(banners));
  }
};

// --- VISITOR COMMENTS / WALL OF IMPRESSIONS (ZID UTISAKA) ---
export interface VisitorComment {
  id: string;
  author: string;
  text: string;
  date: string;
  category: "Pohvala" | "Kritika" | "Prijedlog";
  status: "approved" | "hidden";
}

export const initialComments: VisitorComment[] = [
  {
    id: "com-1",
    author: "Goran M. (rekreativac)",
    text: "Bazen i voda su besprijekorno čisti, ali je parking oko bazena uvijek krcat oko 17 časova. Bilo bi dobro označiti dodatna mjesta.",
    date: "01.11.2026.",
    category: "Prijedlog",
    status: "approved"
  },
  {
    id: "com-2",
    author: "Maja K.",
    text: "Sve pohvale za trenere škole plivanja! Jedina molba: možete li popraviti treći fen u ženskoj svlačionici?",
    date: "31.10.2026.",
    category: "Prijedlog",
    status: "approved"
  },
  {
    id: "com-3",
    author: "Nenad S.",
    text: "Jutarnji termin od 06:00 do 08:00h je najbolja stvar koju ste uveli. Mirno, čisto, staze slobodne.",
    date: "30.10.2026.",
    category: "Pohvala",
    status: "approved"
  },
  {
    id: "com-4",
    author: "Jelena D.",
    text: "Kafa u caffe baru GOB je odlična, a pogled na bazen prelijep dok čekam dijete sa treninga.",
    date: "29.10.2026.",
    category: "Pohvala",
    status: "approved"
  },
  {
    id: "com-5",
    author: "Dejan P.",
    text: "Može li se postaviti aparat za vodu ili sokove na tribinama tokom vikend mitinga?",
    date: "28.10.2026.",
    category: "Prijedlog",
    status: "approved"
  }
];

export const getVisitorComments = (): VisitorComment[] => {
  if (typeof window === "undefined") return initialComments;
  try {
    const raw = localStorage.getItem("aquana_visitor_comments");
    if (!raw) return initialComments;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : initialComments;
  } catch {
    return initialComments;
  }
};

export const saveVisitorComment = (comment: { author: string; text: string; category: VisitorComment["category"] }): VisitorComment => {
  const newEntry: VisitorComment = {
    id: `com-${Date.now().toString().slice(-4)}`,
    author: comment.author.trim() || "Posjetilac",
    text: comment.text.trim(),
    date: new Date().toLocaleDateString("sr-BA"),
    category: comment.category,
    status: "approved"
  };
  if (typeof window !== "undefined") {
    const current = getVisitorComments();
    const updated = [newEntry, ...current];
    localStorage.setItem("aquana_visitor_comments", JSON.stringify(updated));
  }
  return newEntry;
};

export const saveAllVisitorComments = (comments: VisitorComment[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("aquana_visitor_comments", JSON.stringify(comments));
  }
};

// --- CONTACT FORM INQUIRIES (UPRAVA) ---
export interface ContactInquiry {
  id: string;
  fullName: string;
  contact: string;
  department: string;
  message: string;
  date: string;
  status: "Novo" | "Odgovoreno" | "Arhivirano";
}

export const initialInquiries: ContactInquiry[] = [
  {
    id: "INQ-201",
    fullName: "Milan Vasić",
    contact: "milan.v@gmail.com",
    department: "Zakup staze i saradnja",
    message: "Poštovani, zanima nas mogućnost zakupa 2 staze za rekreaciju radnika preduzeća u večernjim terminima. Molimo za ponudu.",
    date: "01.11.2026. 11:30",
    status: "Novo"
  }
];

export const getContactInquiries = (): ContactInquiry[] => {
  if (typeof window === "undefined") return initialInquiries;
  try {
    const raw = localStorage.getItem("aquana_contact_inquiries");
    if (!raw) return initialInquiries;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : initialInquiries;
  } catch {
    return initialInquiries;
  }
};

export const saveContactInquiry = (inquiry: { fullName: string; contact: string; department: string; message: string }): ContactInquiry => {
  const newEntry: ContactInquiry = {
    id: `INQ-${Date.now().toString().slice(-4)}`,
    ...inquiry,
    date: new Date().toLocaleString("sr-BA", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" }),
    status: "Novo"
  };
  if (typeof window !== "undefined") {
    const current = getContactInquiries();
    const updated = [newEntry, ...current];
    localStorage.setItem("aquana_contact_inquiries", JSON.stringify(updated));
  }
  return newEntry;
};

export const saveAllContactInquiries = (inquiries: ContactInquiry[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("aquana_contact_inquiries", JSON.stringify(inquiries));
  }
};

// --- SPEED CONTEST (BRZOPRSTICE - LIMITIRANE NAGRADE) ---
export interface SpeedContestState {
  title: string;
  description: string;
  totalQuota: number;
  remainingQuota: number;
  matchInfo: string;
  isActive: boolean;
}

export const initialSpeedContest: SpeedContestState = {
  title: "BRZOPRSTICA: Prvih 5 posjetilaca dobijaju BESPLATNU KARTU!",
  description: "Za predstojeću prvenstvenu vaterpolo utakmicu na Gradskom olimpijskom bazenu u subotu u 18:00h.",
  totalQuota: 5,
  remainingQuota: 3,
  matchInfo: "VK Banja Luka vs VK Borac • Subota 18:00h • Veliki olimpijski bazen",
  isActive: true
};

export const getSpeedContestState = (): SpeedContestState => {
  if (typeof window === "undefined") return initialSpeedContest;
  try {
    const raw = localStorage.getItem("aquana_speed_contest");
    if (!raw) return initialSpeedContest;
    return JSON.parse(raw);
  } catch {
    return initialSpeedContest;
  }
};

export const claimSpeedTicket = (phone: string): { success: boolean; code?: string; remaining?: number } => {
  const state = getSpeedContestState();
  if (state.remainingQuota <= 0) {
    return { success: false, remaining: 0 };
  }
  const newRemaining = state.remainingQuota - 1;
  const updatedState = { ...state, remainingQuota: newRemaining };
  const ticketCode = `#VP-MEČ-${5 - newRemaining}`;
  
  if (typeof window !== "undefined") {
    localStorage.setItem("aquana_speed_contest", JSON.stringify(updatedState));
    // Also save as claimed coupon for reception
    const coupons = JSON.parse(localStorage.getItem("aquana_coupons") || "[]");
    coupons.unshift({
      id: `TKT-${Date.now().toString().slice(-4)}`,
      code: ticketCode,
      phone: phone.trim(),
      date: new Date().toLocaleString("sr-BA"),
      facility: "Utakmica GOB (Tribine)",
      status: "Aktivan"
    });
    localStorage.setItem("aquana_coupons", JSON.stringify(coupons));
  }
  return { success: true, code: ticketCode, remaining: newRemaining };
};


// --- PORTAL CMS SETTINGS (ZIMSKI/LJETNI REŽIM, TOP OBAVJEŠTENJE, FLASH AKCIJA) ---
export interface PortalSettings {
  topBanner: {
    isActive: boolean;
    tag: string;
    title: string;
    text: string;
    buttonText: string;
    buttonLink: string;
  };
  flashPromo: {
    isActive: boolean;
    badge: string;
    title: string;
    description: string;
    benefitBadge: string;
    targetExpiry: string;
  };
}

export const initialPortalSettings: PortalSettings = {
  topBanner: {
    isActive: true,
    tag: "TOP NEWS / VANREDNO",
    title: "Zimski režim na Gradskom olimpijskom bazenu i raspored staza za građanstvo",
    text: "Produženi rekreativni večernji termini, besprijekorno zagrijavanje vode i vazduha, te otvorene prijave za nove grupe škole plivanja.",
    buttonText: "Pogledaj raspored",
    buttonLink: "#raspored"
  },
  flashPromo: {
    isActive: true,
    badge: "DANAŠNJI ZEC IZ ŠEŠIRA",
    title: "Uz sezonsku kartu od 50 ulazaka dobijate 5 besplatnih kafa u Caffe Baru GOB!",
    description: "Aktivirajte akciju odmah na sajtu i preuzmite digitalni bar-kod kupon koji važi na biletarnici i u našem caffe baru.",
    benefitBadge: "50 ULAZA + 5 KAFA",
    targetExpiry: "2026-11-30T23:59:59"
  }
};

export const getPortalSettings = (): PortalSettings => {
  if (typeof window === "undefined") return initialPortalSettings;
  try {
    const raw = localStorage.getItem("aquana_portal_settings");
    if (!raw) return initialPortalSettings;
    return JSON.parse(raw);
  } catch {
    return initialPortalSettings;
  }
};

export const savePortalSettings = (settings: PortalSettings) => {
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem("aquana_portal_settings", JSON.stringify(settings));
    } catch {}
  }
};
