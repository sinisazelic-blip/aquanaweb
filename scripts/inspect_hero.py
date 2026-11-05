# -*- coding: utf-8 -*-
with open("src/components/HeroSlider.tsx", "r", encoding="utf-8") as f:
    text = f.read()

print("Length of HeroSlider.tsx:", len(text))
print("Has tr:", "tr(" in text)
print("Has useLanguage:", "useLanguage" in text)
