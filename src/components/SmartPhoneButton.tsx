"use client";

import React, { useState } from "react";
import { Phone, Check } from "lucide-react";

interface SmartPhoneButtonProps {
  phoneNumber?: string;
  cleanNumber?: string;
  label?: string;
  className?: string;
  children?: React.ReactNode;
}

export default function SmartPhoneButton({
  phoneNumber = "065 72 50 50",
  cleanNumber = "065725050",
  label,
  className = "",
  children,
}: SmartPhoneButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    const isMobile =
      typeof window !== "undefined" &&
      (window.matchMedia("(pointer: coarse)").matches ||
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));

    if (isMobile) {
      window.location.href = `tel:${cleanNumber}`;
    } else {
      e.preventDefault();
      e.stopPropagation();
      if (typeof navigator !== "undefined" && navigator.clipboard) {
        navigator.clipboard.writeText(phoneNumber);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      }
    }
  };

  const displayText = label || `Prijave: ${phoneNumber}`;

  return (
    <a
      href={`tel:${cleanNumber}`}
      onClick={handleClick}
      title={copied ? "Broj je kopiran!" : "Kliknite da kopirate broj telefona"}
      className={`relative cursor-pointer select-none inline-flex items-center ${className}`}
    >
      {children ? (
        children
      ) : (
        <span className="flex items-center gap-2">
          {copied ? (
            <Check className="w-4 h-4 text-emerald-300 animate-bounce" />
          ) : (
            <Phone className="w-4 h-4" />
          )}
          <span>{copied ? "Broj je kopiran!" : displayText}</span>
        </span>
      )}

      {copied && (
        <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1 bg-slate-900 text-emerald-400 text-xs font-bold rounded-xl shadow-2xl border border-emerald-500/40 whitespace-nowrap z-50 pointer-events-none">
          ? Broj kopiran: {phoneNumber}
        </span>
      )}
    </a>
  );
}
