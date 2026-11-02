"use client";

import React, { useState } from "react";
import { Mail, Phone, Send, CheckCircle2, X, Building2, User, MessageSquare } from "lucide-react";
import { saveContactInquiry } from "@/lib/submissionsData";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [fullName, setFullName] = useState("");
  const [contact, setContact] = useState("");
  const [department, setDepartment] = useState("Opšta uprava i direktor");
  const [message, setMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !contact.trim() || !message.trim()) return;

    saveContactInquiry({
      fullName: fullName.trim(),
      contact: contact.trim(),
      department,
      message: message.trim()
    });

    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setFullName("");
    setContact("");
    setMessage("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-100 relative">
        <button
          onClick={handleReset}
          className="absolute right-4 top-4 p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {isSubmitted ? (
          <div className="text-center space-y-4 py-6">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <h3 className="text-2xl font-black text-slate-900">Poruka uspješno poslata!</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-sm mx-auto">
              Vaš upit je evidentiran u protokolu JP „Aquana“ d.o.o. i proslijeđen na službenu adresu <strong className="text-slate-800">info@aquana.ba</strong>.
              Nadležna služba će Vam odgovoriti u najkraćem roku.
            </p>

            <button
              onClick={handleReset}
              className="mt-4 px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider cursor-pointer"
            >
              U redu, zatvori prozor
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center gap-2 text-sky-600 text-xs font-black uppercase tracking-wider">
              <Mail className="w-4 h-4" />
              <span>Direktan kontakt prema upravi</span>
            </div>

            <div>
              <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                Kontaktirajte JP „Aquana“ Banja Luka
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Imate pitanje, prijedlog ili poslovni upit? Pošaljite poruku direktno našoj upravi (<span className="text-sky-700 font-semibold font-mono">info@aquana.ba</span>).
              </p>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-700 uppercase flex items-center gap-1.5 mb-1">
                  <User className="w-3.5 h-3.5 text-slate-400" />
                  <span>Ime i Prezime / Naziv organizacije:</span>
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="npr. Marko Marković"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-slate-50 focus:bg-white text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 uppercase flex items-center gap-1.5 mb-1">
                    <Phone className="w-3.5 h-3.5 text-slate-400" />
                    <span>Kontakt (Telefon ili Email):</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    placeholder="npr. 065 123 456 ili mail@..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-slate-50 focus:bg-white text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 uppercase flex items-center gap-1.5 mb-1">
                    <Building2 className="w-3.5 h-3.5 text-slate-400" />
                    <span>Služba / Svrha upita:</span>
                  </label>
                  <select
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-slate-50 focus:bg-white text-xs font-semibold"
                  >
                    <option value="Opšta uprava i direktor">Opšta uprava i direktor</option>
                    <option value="Zakup staza i saradnja (B2B)">Zakup staza i saradnja (B2B)</option>
                    <option value="Marketing i promocije">Marketing i promocije</option>
                    <option value="Caffe bar & Restoran">Caffe bar & Restoran</option>
                    <option value="Tehnička služba i održavanje">Tehnička služba i održavanje</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 uppercase flex items-center gap-1.5 mb-1">
                  <MessageSquare className="w-3.5 h-3.5 text-slate-400" />
                  <span>Vaša poruka:</span>
                </label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Napišite Vaš upit, pitanje ili prijedlog..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-slate-50 focus:bg-white text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 resize-none"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-sky-600 to-blue-700 hover:from-sky-500 hover:to-blue-600 text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-sky-600/30 transition hover:scale-[1.01] flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Pošalji poruku upravi (info@aquana.ba)</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
