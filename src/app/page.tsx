"use client";

import React, { useState, useEffect } from "react";
import { Lang, translations, getSavedLang, saveLang, toCyrillic } from "@/lib/translations";
import { getPortalSettings, PortalSettings } from "@/lib/submissionsData";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSlider from "@/components/HeroSlider";
import TopNewsSpotlight, { TopNewsData } from "@/components/TopNewsSpotlight";
import PoolLiveStatus from "@/components/PoolLiveStatus";
import InteractiveSchedule from "@/components/InteractiveSchedule";
import SocialStream from "@/components/SocialStream";
import NewsSection from "@/components/NewsSection";
import SurveyModal from "@/components/SurveyModal";
import FlashPromoAction from "@/components/FlashPromoAction";
import FishGameModal from "@/components/FishGameModal";
import KidsContestBanner from "@/components/KidsContestBanner";
import ContactModal from "@/components/ContactModal";
import VisitorCommentsSection from "@/components/VisitorCommentsSection";

import Link from "next/link";
import {
  Waves,
  Sun,
  Award,
  Users,
  FileText,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Sparkles,
  Phone,
  HeartHandshake,
  Droplet,
  Dumbbell,
  Coffee,
  Car,
  FileCheck2,
  ChevronRight
} from "lucide-react";

export default function HomePage() {
  const [currentLang, setCurrentLang] = useState<Lang>("lat");
  const [portalSettings, setPortalSettings] = useState<PortalSettings | null>(null);

  useEffect(() => {
    setCurrentLang(getSavedLang());
    setPortalSettings(getPortalSettings());
  }, []);

  const handleLangChange = (l: Lang) => {
    setCurrentLang(l);
    saveLang(l);
  };
  const [surveyOpen, setSurveyOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [fishGameOpen, setFishGameOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const t = translations[currentLang];

  // Dynamic TOP NEWS / JUST IN spotlight
  const [topNews, setTopNews] = useState<TopNewsData>({
    isActive: true,
    type: "breaking",
    title_lat: "Zimski režim na Gradskom olimpijskom bazenu i raspored staza za građanstvo",
    title_cir: "Зимски режим на Градском олимпијском базену и распоред стаза за грађанство",
    title_en: "Winter Schedule at City Olympic Pool & Dedicated Public Swimming Lanes",
    summary_lat: "Produženi rekreativni večernji termini, besprijekorno zagrijavanje vode i vazduha, te otvorene prijave za nove grupe škole plivanja.",
    summary_cir: "Продужени рекреативни вечерњи термини, беспријекорно загријавање воде и ваздуха, те отворене пријаве за нове групе школе пливања.",
    summary_en: "Extended evening public swimming sessions, optimal water and air heating, and open enrollment for new swim academy groups.",
    linkText_lat: "Pogledaj raspored",
    linkText_cir: "Погледај распоред",
    linkText_en: "View Schedule",
    linkUrl: "#raspored",
  });

  return (
    <>
      {/* 1. VIBRANT FULL-WIDTH HEADER */}
      <Header
        currentLang={currentLang}
        setLang={handleLangChange}
        onOpenSurvey={() => setSurveyOpen(true)} onOpenContact={() => setContactOpen(true)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <main className="w-full overflow-hidden">
        {/* 2. FULL-WIDTH HERO SHOWCASE SLIDER */}
        <HeroSlider currentLang={currentLang} />

        {/* 3. PROMINENT COMMERCIAL FOCUS BANNER: OBUKA NEPLIVAČA (Stvarni baner sa aquana.ba) */}
        <div id="obuka" className="w-full bg-gradient-to-r from-sky-600 via-blue-700 to-indigo-800 text-white py-5 px-4 sm:px-8 border-y-4 border-amber-400 shadow-xl">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center shrink-0 font-black shadow-lg">
                <Waves className="w-8 h-8" />
              </div>
              <div>
                <span className="text-xs font-black uppercase tracking-widest text-amber-300 block">
                  PRIJEM I UPIS NOVIH POLAZNIKA TOKOM ČITAVE GODINE
                </span>
                <h3 className="text-2xl sm:text-3xl font-black tracking-tight">
                  Obuka neplivača na Gradskom olimpijskom bazenu
                </h3>
                <p className="text-xs sm:text-sm text-sky-100 mt-0.5">
                  Komercijalni kursevi za djecu i odrasle • Besplatna obuka za banjalučke osnovce (pokrovitelj Grad Banja Luka)
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href="tel:065725050"
                className="px-6 py-3.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-sm tracking-wide shadow-lg transition hover:scale-105 flex items-center gap-2"
              >
                <Phone className="w-4 h-4 text-slate-950" />
                <span>Prijave: 065 72 50 50</span>
              </a>
              <Link
                href="/dokumenti"
                className="px-5 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/25 transition"
              >
                Cjenovnik obuke
              </Link>
            </div>
          </div>
        </div>

        {/* 4. TOP NEWS / JUST IN SPOTLIGHT */}
        {((portalSettings ? portalSettings.topBanner.isActive : topNews.isActive)) && (
          <TopNewsSpotlight
            currentLang={currentLang}
            news={{
              isActive: portalSettings ? portalSettings.topBanner.isActive : topNews.isActive,
              type: "breaking",
              title_lat: portalSettings ? portalSettings.topBanner.title : topNews.title_lat,
              title_cir: portalSettings ? toCyrillic(portalSettings.topBanner.title) : topNews.title_cir,
              title_en: topNews.title_en,
              summary_lat: portalSettings ? portalSettings.topBanner.text : topNews.summary_lat,
              summary_cir: portalSettings ? toCyrillic(portalSettings.topBanner.text) : topNews.summary_cir,
              summary_en: topNews.summary_en,
              linkText_lat: portalSettings ? portalSettings.topBanner.buttonText : "Pogledaj raspored",
              linkText_cir: portalSettings ? toCyrillic(portalSettings.topBanner.buttonText) : "Погледај распоред",
              linkText_en: "View Schedule",
              linkUrl: portalSettings ? portalSettings.topBanner.buttonLink : "#raspored"
            }}
            onDismiss={() => {
              if (portalSettings) {
                setPortalSettings({
                  ...portalSettings,
                  topBanner: { ...portalSettings.topBanner, isActive: false }
                });
              } else {
                setTopNews((prev) => ({ ...prev, isActive: false }));
              }
            }}
          />
        )}

        
        {/* FLASH PROMO AKCIJA: ZEC IZ ŠEŠIRA (50 ulaza + 5 kafa & mini igra) */}
        <FlashPromoAction onOpenGame={() => setFishGameOpen(true)} />

        {/* 5. POOL TELEMETRY & LIVE STATUS (Real 100% telemetry, no fake data) */}
        <section id="live-status" className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-8">
          <PoolLiveStatus currentLang={currentLang} />
        </section>

        {/* 6. KEY VALUE PILLARS (Inkluzija, Sanitarni pregled vode, Prateći sadržaji GOB-a) */}
        <section className="py-10 bg-slate-50 border-y border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Card 1: Social Responsibility & Disability Lift */}
              <div id="drustvena-odgovornost" className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <HeartHandshake className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[11px] font-black text-emerald-600 uppercase tracking-wider block">
                    Društvena odgovornost i jednakost
                  </span>
                  <h4 className="text-lg font-black text-slate-900 mt-1">
                    Mobilni lift za lica sa posebnim potrebama
                  </h4>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    Gradski olimpijski bazen opremljen je specijalizovanom rampom i hidrauličnim liftom koji osobe sa invaliditetom direktno iz invalidskih kolica spušta u vodu i vraća nazad. Pristup objektu je u potpunosti prilagođen.
                  </p>
                </div>
              </div>

              {/* Card 2: Institute Water Hygiene Testing */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-cyan-100 text-cyan-700 flex items-center justify-center">
                  <Droplet className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[11px] font-black text-cyan-600 uppercase tracking-wider block">
                    Zdravstveni standard i sigurnost
                  </span>
                  <h4 className="text-lg font-black text-slate-900 mt-1">
                    Stroga kontrola vode Instituta
                  </h4>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    Institut za javno zdravstvo Republike Srpske redovno vrši mikrobiološku i fizičko-hemijsku analizu vode i kontrolu filter stanice. Svi nalazi su javni i transparentno dostupni na uvid građanima.
                  </p>
                </div>
                <Link
                  href="/dokumenti"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-700 hover:text-cyan-900 pt-2"
                >
                  <span>Otvori registar sanitarnih nalaza</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Card 3: GOB Amenities: Gym, Caffe, Parking */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[11px] font-black text-amber-600 uppercase tracking-wider block">
                    Sadržaji u sklopu GOB-a
                  </span>
                  <h4 className="text-lg font-black text-slate-900 mt-1">
                    Teretana, Caffe bar i Parking
                  </h4>
                  <div className="space-y-2 mt-2 text-xs text-slate-600">
                    <p className="flex items-center gap-2">
                      <Dumbbell className="w-4 h-4 text-slate-500 shrink-0" />
                      <span><strong>Moderna teretana:</strong> Vrhunski fitness centar u sklopu objekta (zakupac).</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <Car className="w-4 h-4 text-slate-500 shrink-0" />
                      <span><strong>Besplatan parking:</strong> Obezbijeđen za sve korisnike bazena.</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <Coffee className="w-4 h-4 text-slate-500 shrink-0" />
                      <span><strong>Caffe bar:</strong> Ugodan ambijent u holu bazena za roditelje i posjetioce.</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 7. INTERACTIVE SCHEDULE & PRICING */}
        <InteractiveSchedule currentLang={currentLang} />

        {/* 8. SOCIAL MEDIA LIVE STREAM (Facebook & Instagram Pulse) */}
        <SocialStream currentLang={currentLang} />

        {/* 9. AKTIVNE FOTO VIJESTI (Povezane sa mrežama) */}
        <NewsSection currentLang={currentLang} />

        {/* 10. DUAL PILLARS: GRADSKI BAZEN & VODENI PARK */}
        <section className="py-20 w-full bg-white">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 space-y-20">
            {/* PILLAR A: GRADSKI OLIMPIJSKI BAZEN */}
            <div id="gob" className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-7 relative rounded-3xl overflow-hidden shadow-2xl group">
                <img
                  src="/images/GOB-2.jpg"
                  alt="Gradski olimpijski bazen Banja Luka"
                  className="w-full h-[420px] object-cover group-hover:scale-105 transition duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-8">
                  <div className="text-white space-y-1">
                    <span className="px-3 py-1 rounded-full bg-sky-500 text-slate-950 text-xs font-black uppercase tracking-wider">
                      Olimpijski bazen
                    </span>
                    <h3 className="text-2xl font-black">50 × 25 metara • FINA Standard</h3>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 space-y-5">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-wider">
                  <Award className="w-3.5 h-3.5 text-blue-600" />
                  Banja Luka • Veljka Mlađenovića b.b.
                </div>
                <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
                  {currentLang === "cir"
                    ? "Градски олимпијски базен (ГОБ)"
                    : currentLang === "en"
                    ? "City Olympic Pool (GOB)"
                    : "Gradski olimpijski bazen (GOB)"}
                </h2>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  Jedan od najmodernijih vodenih kompleksa u Evropi. Izgrađen po standardima Svjetske plivačke federacije (FINA), otvoren svakog dana za građane, plivačke i vaterpolo klubove, te takmičenja najvišeg međunarodnog nivoa.
                </p>

                <div className="space-y-3 pt-2">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-sm text-slate-900 block">Rekreacija za građanstvo</strong>
                      <span className="text-xs text-slate-500">Svaki dan od 06:00 do 22:00h (vikendom od 07:00h).</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-sm text-slate-900 block">Škola plivanja za djecu i odrasle</strong>
                      <span className="text-xs text-slate-500">Stručni rad sa profesorima sporta i licenciranim trenerima.</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-sm text-slate-900 block">Dostupnost i inkluzija</strong>
                      <span className="text-xs text-slate-500">Mobilni hidraulični lift za spuštanje osoba sa invaliditetom u vodu.</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3">
                  <a
                    href="#raspored"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wide transition shadow-md"
                  >
                    <FileText className="w-4 h-4 text-sky-400" />
                    <span>Provjeri cjenovnik i termine</span>
                  </a>
                </div>
              </div>
            </div>

            {/* PILLAR B: VODENI PARK AQUANA (No mention of catering since Aquana no longer runs it) */}
            <div id="aquana" className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-5 space-y-5 order-2 lg:order-1">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold uppercase tracking-wider">
                  <Sun className="w-3.5 h-3.5 text-amber-600" />
                  Naselje Borik • Aleja Svetog Save 80
                </div>
                <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
                  {currentLang === "cir"
                    ? "Водени парк Aquana"
                    : currentLang === "en"
                    ? "Aquana Water Park"
                    : "Vodeni park Aquana"}
                </h2>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  Najveća ljetna vodena atrakcija Banjaluke. Prostire se na 38.000 m² uređenih zelenih površina sa prirodnim hladom, tri velika otvorena bazena ukupne vodene površine 1.500 m², toboganom dužine 100 metara, sunčalištem i ljetnim manifestacijama na otvorenom.
                </p>

                <div className="grid grid-cols-3 gap-3 pt-2 text-center">
                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
                    <p className="text-xl font-black text-sky-600">38.000m²</p>
                    <p className="text-[11px] text-slate-500 font-medium">Zeleni park</p>
                  </div>
                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
                    <p className="text-xl font-black text-amber-500">100m</p>
                    <p className="text-[11px] text-slate-500 font-medium">Vodeni tobogan</p>
                  </div>
                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
                    <p className="text-xl font-black text-emerald-500">3 bazena</p>
                    <p className="text-[11px] text-slate-500 font-medium">Vodeni sadržaji</p>
                  </div>
                </div>

                <div className="pt-2">
                  <Link
                    href="/dokumenti"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wide transition shadow-md"
                  >
                    <span>Cjenovnik sezonskih ulaznica</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-7 relative rounded-3xl overflow-hidden shadow-2xl group order-1 lg:order-2">
                <img
                  src="/images/vodeni-park.jpg"
                  alt="Vodeni park Aquana Borik"
                  className="w-full h-[420px] object-cover group-hover:scale-105 transition duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-8">
                  <div className="text-white space-y-1">
                    <span className="px-3 py-1 rounded-full bg-amber-400 text-slate-950 text-xs font-black uppercase tracking-wider">
                      Ljetna Sezona
                    </span>
                    <h3 className="text-2xl font-black">Otvoreni bazeni i sunčalište Borik</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 11. SOBER OFFICIAL CORNER: JAVNE NABAVKE & ZVANIČNI DOKUMENTI */}
        <section className="w-full py-16 bg-slate-900 text-white border-t border-b border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
              {/* Box 1: Javne nabavke (Legal mandate) */}
              <div className="p-8 rounded-3xl bg-slate-800/80 border border-slate-700 flex flex-col justify-between space-y-6">
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-sky-500/20 text-sky-400 flex items-center justify-center">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-bold text-sky-400 uppercase tracking-widest block">
                    ZAKONSKA OBAVEZA BIH
                  </span>
                  <h3 className="text-2xl font-black tracking-tight text-white">
                    Javne nabavke i tenderska evidencija
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Službeni registar tenderskih postupaka, odluka o izboru najpovoljnijeg ponuđača, obavještenja o dodjeli ugovora i poništenja u skladu sa Zakonom o javnim nabavkama BiH.
                  </p>
                </div>
                <Link
                  href="/javne-nabavke"
                  className="inline-flex items-center justify-between px-6 py-3.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs uppercase tracking-wider transition"
                >
                  <span>Pregledaj javne nabavke</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Box 2: Zvanični dokumenti, Cjenovnici i Nalazi vode */}
              <div className="p-8 rounded-3xl bg-slate-800/80 border border-slate-700 flex flex-col justify-between space-y-6">
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
                    <FileCheck2 className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest block">
                    SLUŽBENA DOKUMENTACIJA
                  </span>
                  <h3 className="text-2xl font-black tracking-tight text-white">
                    Dokumenti, cjenovnici i nalazi vode
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Zvanični cjenovnici GOB-a i Vodenog parka, redovni mikrobiološki i sanitarni nalazi Instituta za javno zdravstvo RS, identifikacija preduzeća (JIB, PIB) i pravilnici.
                  </p>
                </div>
                <Link
                  href="/dokumenti"
                  className="inline-flex items-center justify-between px-6 py-3.5 rounded-xl bg-cyan-700 hover:bg-cyan-600 text-white font-bold text-xs uppercase tracking-wider transition"
                >
                  <span>Pregledaj dokumente i nalaze</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        
        {/* NAGRADNI KONKURS: NACRTAJ AQUANU ILI GOB (Karta od 10 ulaza) */}
        <KidsContestBanner />

        {/* 12. CITIZEN FEEDBACK / SURVEY BANNER */}
        <section className="w-full py-16 bg-gradient-to-r from-sky-800 via-sky-700 to-cyan-600 text-white shadow-inner">
          <div className="max-w-7xl mx-auto px-4 sm:px-8 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-2 text-center md:text-left">
              <span className="text-xs font-black tracking-widest text-amber-300 uppercase">
                ★ {t.survey.badge}
              </span>
              <h3 className="text-3xl sm:text-4xl font-black tracking-tight">{t.survey.title}</h3>
              <p className="text-sm sm:text-base text-sky-100 max-w-2xl">{t.survey.desc}</p>
            </div>

            <button
              onClick={() => setSurveyOpen(true)}
              className="px-8 py-4 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-sm tracking-wide uppercase shadow-2xl transition hover:scale-105 shrink-0 flex items-center gap-2"
            >
              <span>{t.survey.btnOpen}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </section>
      </main>

      {/* 12.5 GLAS POSJETILACA - ZID UTISAKA */}
      <VisitorCommentsSection />

      {/* 13. SOBER MODERN FOOTER */}
      <Footer currentLang={currentLang} />

      {/* 14. SURVEY MODAL POPUP */}
      
      {/* INTERAKTIVNA MINI IGRA: UHVATI RIBICU ZA 10 SEKUNDI */}
      <FishGameModal
        isOpen={fishGameOpen}
        onClose={() => setFishGameOpen(false)}
      />

      <ContactModal isOpen={contactOpen} onClose={() => setContactOpen(false)} />

      <SurveyModal
        isOpen={surveyOpen}
        onClose={() => setSurveyOpen(false)}
        currentLang={currentLang}
      />
    </>
  );
}


