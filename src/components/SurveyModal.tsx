"use client";
import React, { useState } from "react";
import { Lang } from "@/lib/translations";
import { X, Star, CheckCircle, Send, MessageSquare } from "lucide-react";
import { saveSurvey } from "@/lib/submissionsData";

interface SurveyModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLang: Lang;
}

export default function SurveyModal({ isOpen, onClose, currentLang }: SurveyModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [q1, setQ1] = useState("nekoliko_puta_mjesecno");
  const [comment, setComment] = useState("");
  const [contact, setContact] = useState("");
  const [ratings, setRatings] = useState({
    cistoca: 5,
    kvalitetVode: 5,
    temperatura: 5,
    osoblje: 4,
    raspored: 4,
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveSurvey({
      frequency: q1 === "vise_puta_sedmicno" ? "Više puta sedmično" : q1 === "jednom_sedmicno" ? "Jednom sedmično" : q1 === "nekoliko_puta_mjesecno" ? "Nekoliko puta mjesečno" : "Rijetko / Prvi put",
      ratings,
      comment: comment.trim() || "Korisnik nije ostavio dodatni komentar.",
      contact: contact.trim()
    });
    setSubmitted(true);
    setTimeout(() => {
      setTimeout(() => {
        setSubmitted(false);
        onClose();
      }, 2500);
    }, 500);
  };

  const handleRating = (key: keyof typeof ratings, val: number) => {
    setRatings((prev) => ({ ...prev, [key]: val }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto relative animate-in fade-in zoom-in-95 duration-200">
        <button onClick={onClose} className="absolute right-5 top-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition">
          <X className="w-5 h-5" />
        </button>
        {submitted ? (
          <div className="py-12 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-black text-slate-900">
              {currentLang === "cir" ? "Хвала вам на оцјени!" : currentLang === "en" ? "Thank you for your feedback!" : "Hvala vam na ocjeni!"}
            </h3>
            <p className="text-sm text-slate-600 max-w-sm mx-auto">
              Vaši odgovori su uspješno zabilježeni u sistemu analize kvaliteta JP „Aquana“. Uprava svakodnevno prati ocjene građana!
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <span className="inline-block px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold uppercase tracking-wider mb-2 border border-amber-200">
                ★ {currentLang === "cir" ? "Анкета задовољства грађана" : currentLang === "en" ? "Citizen Satisfaction Survey" : "Anketa zadovoljstva građana"}
              </span>
              <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                {currentLang === "cir" ? "Оцијените квалитет услуга на ГОБ-у и Аквани" : currentLang === "en" ? "Rate service quality at GOB & Aquana" : "Ocijenite kvalitet usluga na GOB-u i Akvani"}
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Vaš glas nam pomaže da održavamo najviši standard higijene, temperature i termina.
              </p>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase">Učestalost Vaših posjeta:</label>
              <select value={q1} onChange={(e) => setQ1(e.target.value)} className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm font-medium bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20">
                <option value="vise_puta_sedmicno">Više puta sedmično (redovan rekreativac/član)</option>
                <option value="jednom_sedmicno">Jednom sedmično</option>
                <option value="nekoliko_puta_mjesecno">Nekoliko puta mjesečno</option>
                <option value="rijetko">Rijetko / Prvi put</option>
              </select>
            </div>

            <div className="space-y-2.5 bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
              <label className="text-xs font-bold text-slate-700 uppercase block">Ocjene kvaliteta (1 – 5 zvjezdica):</label>
              {[
                { key: "cistoca", label: "Čistoća prostora, tuševa i svlačionica" },
                { key: "kvalitetVode", label: "Bistrina i hemijsko-biološki kvalitet vode" },
                { key: "temperatura", label: "Temperatura vode (26.8°C) i vazduha" },
                { key: "osoblje", label: "Ljubaznost i profesionalnost osoblja" },
                { key: "raspored", label: "Dostupnost termina za građanstvo" },
              ].map(({ key, label }) => (
                <div key={key} className="flex items-center justify-between py-1 border-b border-slate-200/60 last:border-none">
                  <span className="text-xs text-slate-700 font-semibold">{label}</span>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button type="button" key={star} onClick={() => handleRating(key as keyof typeof ratings, star)} className="p-1 hover:scale-110 transition">
                        <Star className={`w-4 h-4 ${star <= ratings[key as keyof typeof ratings] ? "text-amber-400 fill-amber-400" : "text-slate-300"}`} />
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-sky-600" />
                <span>Vaša poruka, prijedlog ili sugestija:</span>
              </label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={2}
                placeholder="Napišite šta bismo mogli još bolje uraditi..."
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase">Kontakt telefon ili e-mail (opciono):</label>
              <input
                type="text"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                placeholder="npr. 065 123 456 ili ime@gmail.com"
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20"
              />
            </div>

            <button type="submit" className="w-full py-3.5 rounded-xl bg-gradient-to-r from-sky-600 to-cyan-600 hover:from-sky-500 hover:to-cyan-500 text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-sky-600/25 flex items-center justify-center gap-2 transition hover:scale-[1.01]">
              <Send className="w-4 h-4" />
              <span>{currentLang === "cir" ? "Пошаљи одговоре у базу" : currentLang === "en" ? "Submit Survey" : "Pošalji odgovore u bazu"}</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
