import os
os.chdir(r"D:\Dev\AquanaWEB")

with open("src/components/Header.tsx", "r", encoding="utf-8") as f:
    h = f.read()

h = h.replace('<span>Uprava: +387 (0) 51 456 230</span>', '<span>{currentLang === "cir" ? "Управа:" : currentLang === "en" ? "Administration:" : "Uprava:"} +387 (0) 51 456 230</span>')
h = h.replace('<span>Recepcija GOB: +387 (0) 51 456 450</span>', '<span>{currentLang === "cir" ? "Рецепција ГОБ:" : currentLang === "en" ? "Reception:" : "Recepcija GOB:"} +387 (0) 51 456 450</span>')
h = h.replace('• Obuka neplivača: 065 72 50 50 • info@aquana.ba', '• {currentLang === "cir" ? "Обука непливача:" : currentLang === "en" ? "Swim school:" : "Obuka neplivača:"} 065 72 50 50 • info@aquana.ba')

with open("src/components/Header.tsx", "w", encoding="utf-8") as f:
    f.write(h)

print("Header.tsx patched!")
