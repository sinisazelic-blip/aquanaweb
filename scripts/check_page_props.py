with open('D:/Dev/AquanaWEB/src/app/page.tsx', 'r', encoding='utf-8') as f:
    text = f.read()

for comp in ['KidsContestBanner', 'VisitorCommentsSection', 'FlashPromoAction', 'InteractiveSchedule']:
    idx = text.find(f'<{comp}')
    if idx != -1:
        print(comp, 'usage:', repr(text[idx:idx+150]))
    else:
        print(comp, 'NOT FOUND')
