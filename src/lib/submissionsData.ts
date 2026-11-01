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
