import re

with open(r'd:\Dev\AquanaWEB\src\app\page.tsx', 'r', encoding='utf-8') as f:
    text = f.read()

# Add imports
imports_to_add = """import FlashPromoAction from "@/components/FlashPromoAction";
import FishGameModal from "@/components/FishGameModal";
import KidsContestBanner from "@/components/KidsContestBanner";
"""

if "import FlashPromoAction" not in text:
    text = text.replace('import SurveyModal from "@/components/SurveyModal";', 'import SurveyModal from "@/components/SurveyModal";\n' + imports_to_add)

# Add state
state_to_add = """  const [fishGameOpen, setFishGameOpen] = useState(false);"""
if "const [fishGameOpen" not in text:
    text = text.replace('const [searchQuery, setSearchQuery] = useState("");', 'const [searchQuery, setSearchQuery] = useState("");\n' + state_to_add)

# Add FlashPromoAction below TopNewsSpotlight
flash_block = """
        {/* FLASH PROMO AKCIJA: ZEC IZ ŠEŠIRA (50 ulaza + 5 kafa & mini igra) */}
        <FlashPromoAction onOpenGame={() => setFishGameOpen(true)} />
"""

if "<FlashPromoAction" not in text:
    text = text.replace('{/* 5. POOL TELEMETRY & LIVE STATUS', flash_block + '\n        {/* 5. POOL TELEMETRY & LIVE STATUS')

# Add KidsContestBanner before Survey banner
contest_block = """
        {/* NAGRADNI KONKURS: NACRTAJ AQUANU ILI GOB (Karta od 10 ulaza) */}
        <KidsContestBanner />
"""

if "<KidsContestBanner" not in text:
    text = text.replace('{/* 12. CITIZEN FEEDBACK / SURVEY BANNER */}', contest_block + '\n        {/* 12. CITIZEN FEEDBACK / SURVEY BANNER */}')

# Add FishGameModal before footer
game_modal = """
      {/* INTERAKTIVNA MINI IGRA: UHVATI RIBICU ZA 10 SEKUNDI */}
      <FishGameModal
        isOpen={fishGameOpen}
        onClose={() => setFishGameOpen(false)}
      />
"""

if "<FishGameModal" not in text:
    text = text.replace('<SurveyModal', game_modal + '\n      <SurveyModal')

with open(r'd:\Dev\AquanaWEB\src\app\page.tsx', 'w', encoding='utf-8') as f:
    f.write(text)

print("Updated page.tsx with FlashPromoAction, FishGameModal, and KidsContestBanner successfully!")
