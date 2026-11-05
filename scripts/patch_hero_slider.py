# -*- coding: utf-8 -*-
with open("src/components/HeroSlider.tsx", "r", encoding="utf-8") as f:
    text = f.read()

text = text.replace('import { Lang } from "@/lib/translations";', 'import { Lang, tr } from "@/lib/translations";')
text = text.replace('<span>{slide.badge}</span>', '<span>{tr(slide.badge, currentLang)}</span>')
text = text.replace('<span>{slide.ctaPrimaryText}</span>', '<span>{tr(slide.ctaPrimaryText, currentLang)}</span>')
text = text.replace('<span>{slide.ctaSecondaryText}</span>', '<span>{tr(slide.ctaSecondaryText, currentLang)}</span>')

with open("src/components/HeroSlider.tsx", "w", encoding="utf-8") as f:
    f.write(text)

print("HeroSlider patched!")
