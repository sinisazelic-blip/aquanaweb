"use client";

import React, { useState, useEffect } from "react";
import { Lang } from "@/lib/translations";
import { ChevronLeft, ChevronRight, Waves, Sun, Award, ArrowRight, HeartHandshake, Droplet, Phone } from "lucide-react";
import Link from "next/link";

interface HeroSliderProps {
  currentLang: Lang;
}

export default function HeroSlider({ currentLang }: HeroSliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      image: "/images/GOB-20.jpg",
      badge: "FINA OLIMPIJSKI STANDARD • 50 × 25M",
      title_lat: "Gradski olimpijski bazen",
      title_cir: "Градски олимпијски базен",
      title_en: "City Olympic Pool (GOB)",
      desc_lat: "Jedan od tri najbolja olimpijska bazena u Evropi. Najsavremeniji startni blokovi, vrhunska filtracija i svakodnevni rekreativni termini za građanstvo od 06:00 do 22:00h.",
      desc_cir: "Један од три најбоља олимпијска базена у Европи. Најсавременији стартни блокови, врхунска филтрација и свакодневни рекреативни термини за грађанство од 06:00 до 22:00h.",
      desc_en: "One of the top three Olympic pools in Europe. Modern starting blocks, superior filtration, and daily recreation lanes open for all citizens from 06:00 to 22:00.",
      ctaPrimaryText: "Stvarni raspored staza",
      ctaPrimaryLink: "#raspored",
      ctaSecondaryText: "Zvanični cjenovnik",
      ctaSecondaryLink: "/cjenovnik",
    },
    {
      id: 2,
      image: "/images/Plivacki-Meeting-10.jpg",
      badge: "ŠKOLA PLIVANJA & MEĐUNARODNA TAKMIČENJA",
      title_lat: "Vrhunski sport & Obuka neplivača",
      title_cir: "Врхунски спорт & Обука непливача",
      title_en: "Top Athletics & Swimming Academy",
      desc_lat: "Svakodnevni upis u školu plivanja uz profesore sporta (065 72 50 50) i besplatna obuka za sve banjalučke osnovce koju finansira Grad Banja Luka.",
      desc_cir: "Свакодневни упис у школу пливања уз професоре спорта (065 72 50 50) и бесплатна обука за све бањалучке основце коју финансира Град Бања Лука.",
      desc_en: "Commercial swim lessons for all ages with certified sports professors (phone: 065 72 50 50) plus free school swim programs funded by the City of Banja Luka.",
      ctaPrimaryText: "Prijave: 065 72 50 50",
      ctaPrimaryLink: "tel:065725050",
      ctaSecondaryText: "Sve o školi plivanja",
      ctaSecondaryLink: "/gob",
    },
    {
      id: 3,
      image: "/images/mobilni-lift-akcija.jpg",
      badge: "DRUŠTVENA ODGOVORNOST & INKLUZIJA",
      title_lat: "Pristup za lica sa posebnim potrebama",
      title_cir: "Приступ за лица са посебним потребама",
      title_en: "Accessibility for Persons with Disabilities",
      desc_lat: "Gradski olimpijski bazen posjeduje specijalizovanu mobilnu rampu i hidraulični lift koji korisnike u kolicima bezbjedno spušta direktno u vodu i vraća nazad.",
      desc_cir: "Градски олимпијски базен посједује специјализовану мобилну рампу и хидраулични лифт који кориснике у колицима безбједно спушта директно у воду и враћа назад.",
      desc_en: "Equipped with a specialized mobile lift providing safe, dignified water access and return directly from wheelchairs for persons with special needs.",
      ctaPrimaryText: "Inkluzivni sadržaji",
      ctaPrimaryLink: "/gob",
      ctaSecondaryText: "Pregledajte propise",
      ctaSecondaryLink: "/dokumenti",
    },
    {
      id: 4,
      image: "/images/GOB-14.jpg",
      badge: "ZDRAVSTVENA ISPRAVNOST & ČISTOĆA",
      title_lat: "Stroga kontrola kvaliteta vode",
      title_cir: "Строга контрола квалитета воде",
      title_en: "Strict Water Hygiene Control",
      desc_lat: "Redovna mikrobiološka i fizičko-hemijska ispitivanja bazenske vode i higijene prostora koje provodi Institut za javno zdravstvo RS. Nalazi su javno dostupni.",
      desc_cir: "Редовна микробиолошка и физичко-хемијска испитивања базенске воде и хигијене простора које проводи Институт за јавно здравство РС. Налази су јавно доступни.",
      desc_en: "Continuous sanitary and chemical testing of pool water and facilities conducted by the Public Health Institute of RS. Reports publicly available.",
      ctaPrimaryText: "Zvanični nalazi vode",
      ctaPrimaryLink: "/dokumenti",
      ctaSecondaryText: "Tehnički detalji GOB-a",
      ctaSecondaryLink: "/gob",
    },
    {
      id: 5,
      image: "/images/aquana-slider.png",
      badge: "38.000 M² LJETNE OAZA U NASELJU BORIK",
      title_lat: "Vodeni park Aquana",
      title_cir: "Водени парк Aquana",
      title_en: "Aquana Water Park",
      desc_lat: "Najveći otvoreni vodeni kompleks u regiji: tri velika bazena, 100-metarski tobogan, prostrane travnate površine i prirodni hlad u srcu Banjaluke.",
      desc_cir: "Највећи отворени водени комплекс у регији: три велика базена, 100-метарски тобоган, простране травнате површине и природни хлад у срцу Бањалуке.",
      desc_en: "Largest outdoor aquatic center in the region: 3 large swimming pools, 100m water slide, lush green park shade in the heart of Banja Luka.",
      ctaPrimaryText: "Istraži vodeni park",
      ctaPrimaryLink: "/vodeni-park",
      ctaSecondaryText: "Sezonski cjenovnik",
      ctaSecondaryLink: "/cjenovnik",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6500);
    return () => clearInterval(timer);
  }, [slides.length]);

  const slide = slides[currentSlide];

  return (
    <div className="relative w-full h-[620px] lg:h-[700px] overflow-hidden bg-slate-950">
      {/* Background Images with smooth fade */}
      {slides.map((s, idx) => (
        <div
          key={s.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            idx === currentSlide ? "opacity-100 z-10 scale-100" : "opacity-0 z-0 scale-105 pointer-events-none"
          }`}
          style={{ transition: "opacity 1s ease-in-out, transform 8s ease-out" }}
        >
          <img
            src={s.image}
            alt={s.title_lat}
            className="w-full h-full object-cover object-center filter brightness-[1.04] saturate-[1.14] contrast-[1.02]"
          />
          {/* Subtle optimistic vignette gradient: protects text readability without darkening the pool & swimmers */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/25 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/65 via-transparent to-transparent" />
        </div>
      ))}

      {/* Slide Content Overlay */}
      <div className="relative z-20 w-full h-full max-w-7xl mx-auto px-4 sm:px-8 flex flex-col justify-end pb-16 lg:pb-24">
        <div className="max-w-3xl space-y-5">
          {/* Glowing Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/25 border border-sky-400/40 text-sky-200 text-xs font-black tracking-wider uppercase backdrop-blur-md shadow-lg">
            <span className="w-2 h-2 rounded-full bg-sky-400 animate-ping"></span>
            <span>{slide.badge}</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.08] drop-shadow-md">
            {currentLang === "cir"
              ? slide.title_cir
              : currentLang === "en"
              ? slide.title_en
              : slide.title_lat}
          </h1>

          {/* Description */}
          <p className="text-slate-200 text-base sm:text-lg lg:text-xl font-normal leading-relaxed drop-shadow max-w-2xl">
            {currentLang === "cir"
              ? slide.desc_cir
              : currentLang === "en"
              ? slide.desc_en
              : slide.desc_lat}
          </p>

          {/* Call to Actions */}
          <div className="flex flex-wrap items-center gap-4 pt-3">
            <a
              href={slide.ctaPrimaryLink}
              className="px-7 py-3.5 rounded-2xl bg-gradient-to-r from-sky-500 to-cyan-400 hover:from-sky-400 hover:to-cyan-300 text-slate-950 font-black text-sm tracking-wide shadow-xl shadow-sky-500/30 transition transform hover:-translate-y-0.5 flex items-center gap-2"
            >
              <span>{slide.ctaPrimaryText}</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href={slide.ctaSecondaryLink}
              className="px-6 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm tracking-wide border border-white/25 backdrop-blur-md transition hover:border-white/40 flex items-center gap-2"
            >
              <span>{slide.ctaSecondaryText}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-slate-900/60 hover:bg-sky-600 text-white flex items-center justify-center backdrop-blur-md border border-white/20 transition hover:scale-110"
        aria-label="Prethodni slajd"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-slate-900/60 hover:bg-sky-600 text-white flex items-center justify-center backdrop-blur-md border border-white/20 transition hover:scale-110"
        aria-label="Sljedeći slajd"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Indicators Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2.5 bg-slate-950/60 px-4 py-2 rounded-full border border-white/15 backdrop-blur-md">
        {slides.map((s, idx) => (
          <button
            key={s.id}
            onClick={() => setCurrentSlide(idx)}
            className={`transition-all duration-300 rounded-full ${
              idx === currentSlide
                ? "w-8 h-2.5 bg-sky-400 shadow-md shadow-sky-400/50"
                : "w-2.5 h-2.5 bg-white/40 hover:bg-white/70"
            }`}
            aria-label={`Slajd ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
