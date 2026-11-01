with open(r'd:\Dev\AquanaWEB\src\components\TopNewsSpotlight.tsx', 'r', encoding='utf-8') as f:
    text = f.read()

text = text.replace('-mt-6 sm:-mt-8 mb-10', 'mt-8 sm:mt-10 mb-8')

with open(r'd:\Dev\AquanaWEB\src\components\TopNewsSpotlight.tsx', 'w', encoding='utf-8') as f:
    f.write(text)

print("Updated margin successfully!")
