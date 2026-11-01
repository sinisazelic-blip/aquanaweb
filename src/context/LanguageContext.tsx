"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Lang, translations } from "@/lib/translations";

export const toCyrillic = (text: string): string => {
  if (!text) return "";
  const map: Record<string, string> = {
    "DŽ": "Џ", "Dž": "Џ", "dž": "џ",
    "LJ": "Љ", "Lj": "Љ", "lj": "љ",
    "NJ": "Њ", "Nj": "Њ", "nj": "њ",
    "A": "А", "B": "Б", "V": "В", "G": "Г", "D": "Д", "Đ": "Ђ", "E": "Е",
    "Ž": "Ж", "Z": "З", "I": "И", "J": "Ј", "K": "К", "L": "Л", "M": "М",
    "N": "Н", "O": "О", "P": "П", "R": "Р", "S": "С", "T": "Т", "Ć": "Ћ",
    "U": "У", "F": "Ф", "H": "Х", "C": "Ц", "Č": "Ч", "Š": "Ш",
    "a": "а", "b": "б", "v": "в", "g": "г", "d": "д", "đ": "ђ", "e": "е",
    "ž": "ж", "z": "з", "i": "и", "j": "ј", "k": "к", "l": "л", "m": "м",
    "n": "н", "o": "о", "p": "п", "r": "р", "s": "с", "t": "т", "ć": "ћ",
    "u": "у", "f": "ф", "h": "х", "c": "ц", "č": "ч", "š": "ш"
  };

  let res = text;
  // Replace digraphs first
  for (const dig of ["DŽ", "Dž", "dž", "LJ", "Lj", "lj", "NJ", "Nj", "nj"]) {
    res = res.split(dig).join(map[dig]);
  }
  // Replace single characters
  let out = "";
  for (let i = 0; i < res.length; i++) {
    const ch = res[i];
    out += map[ch] !== undefined ? map[ch] : ch;
  }
  return out;
};

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
