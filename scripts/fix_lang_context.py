# -*- coding: utf-8 -*-
import os

lang_context_code = '''"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Lang, translations, toCyrillic } from "@/lib/translations";

export { toCyrillic };

interface LanguageContextType {
  currentLang: Lang;
  setLang: (lang: Lang) => void;
  t: typeof translations.lat;
  localize: (textLat: string, textCir?: string, textEn?: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  currentLang: "lat",
  setLang: () => {},
  t: translations.lat,
  localize: (lat) => lat,
});

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [currentLang, setCurrentLangState] = useState<Lang>("lat");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("aquana_lang") as Lang;
      if (saved && (saved === "lat" || saved === "cir" || saved === "en")) {
        setCurrentLangState(saved);
      }
    } catch {
      // ignore
    }
  }, []);

  const setLang = (lang: Lang) => {
    setCurrentLangState(lang);
    try {
      localStorage.setItem("aquana_lang", lang);
    } catch {
      // ignore
    }
  };

  const localize = (textLat: string, textCir?: string, textEn?: string): string => {
    if (currentLang === "en") return textEn || textLat;
    if (currentLang === "cir") return textCir || toCyrillic(textLat);
    return textLat;
  };

  const t = translations[currentLang] || translations.lat;

  return (
    <LanguageContext.Provider value={{ currentLang, setLang, t, localize }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
'''

with open("src/context/LanguageContext.tsx", "w", encoding="utf-8") as f:
    f.write(lang_context_code)

print("Updated LanguageContext.tsx!")
