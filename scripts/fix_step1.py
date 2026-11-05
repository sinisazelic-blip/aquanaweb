import os
import re

print("Starting complete fix implementation...")

# ----------------------------------------------------
# 1. Update translations.ts
# ----------------------------------------------------
translations_path = r"D:\Dev\AquanaWEB\src\lib\translations.ts"
with open(translations_path, "r", encoding="utf-8") as f:
    tr_content = f.read()

if "getSavedLang" not in tr_content:
    helpers = '''

export function getSavedLang(): Lang {
  if (typeof window === "undefined") return "lat";
  try {
    const saved = localStorage.getItem("aquana_lang");
    if (saved === "cir" || saved === "lat" || saved === "en") return saved as Lang;
  } catch {}
  return "lat";
}

export function saveLang(lang: Lang) {
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem("aquana_lang", lang);
    } catch {}
  }
}

export function toCyrillic(text: string): string {
  if (!text) return "";
  const digraphs: [string, string][] = [
    ["Dž", "Џ"], ["DŽ", "Џ"], ["dž", "џ"],
    ["Lj", "Љ"], ["LJ", "Љ"], ["lj", "љ"],
    ["Nj", "Њ"], ["NJ", "Њ"], ["nj", "њ"],
  ];
  let res = text;
  for (const [lat, cyr] of digraphs) {
    res = res.replaceAll(lat, cyr);
  }
  const singleMap: Record<string, string> = {
    a: "а", b: "б", v: "в", g: "г", d: "д", đ: "ђ", e: "е", ž: "ж", z: "з", i: "и",
    j: "ј", k: "к", l: "л", m: "м", n: "н", o: "о", p: "п", r: "р", s: "с", t: "т",
    ć: "ћ", u: "у", f: "ф", h: "х", c: "ц", č: "ч", š: "ш",
    A: "А", B: "Б", V: "В", G: "Г", D: "Д", Đ: "Ђ", E: "Е", Ž: "Ж", Z: "З", I: "И",
    J: "Ј", K: "К", L: "Л", M: "М", N: "Н", O: "О", P: "П", R: "Р", S: "С", T: "Т",
    Ć: "Ћ", U: "У", F: "Ф", H: "Х", C: "Ц", Č: "Ч", Š: "Ш",
  };
  return res.replace(/[a-zA-ZčćžšđČĆŽŠĐ]/g, (ch) => singleMap[ch] || ch);
}
'''
    tr_content = tr_content.strip() + helpers
    with open(translations_path, "w", encoding="utf-8") as f:
        f.write(tr_content)
    print("translations.ts updated successfully.")

print("Fix 1 completed.")
