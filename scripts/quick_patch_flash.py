path = r"D:\Dev\AquanaWEB\src\components\FlashPromoAction.tsx"
with open(path, "r", encoding="utf-8") as f:
    code = f.read()

# Import getPortalSettings, PortalSettings
code = code.replace(
    '  SpeedContestState\n} from "@/lib/submissionsData";',
    '  SpeedContestState,\n  getPortalSettings,\n  PortalSettings\n} from "@/lib/submissionsData";'
)

# Replace hardcoded state and timer with real targetExpiry calculation
old_timer_block = '''  // Countdown timer for flash action
  const [timeLeft, setTimeLeft] = useState({ hours: 3, minutes: 48, seconds: 22 });
  
  // Speed contest state
  const [speedState, setSpeedState] = useState<SpeedContestState>({
    title: "BRZOPRSTICA: Prvih 5 posjetilaca dobijaju BESPLATNU KARTU!",
    description: "Za predstojeću prvenstvenu vaterpolo utakmicu na Gradskom olimpijskom bazenu.",
    totalQuota: 5,
    remainingQuota: 3,
    matchInfo: "VK Banja Luka vs VK Borac • Subota 18:00h • Veliki olimpijski bazen",
    isActive: true
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [phone, setPhone] = useState("");
  const [claimedCoupon, setClaimedCoupon] = useState<{
    code: string;
    phone: string;
    type: "coffee" | "waterpolo";
    title: string;
  } | null>(null);

  useEffect(() => {
    setSpeedState(getSpeedContestState());

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);'''

new_timer_block = '''  const [portalSettings, setPortalSettings] = useState<PortalSettings | null>(null);
  const [timeLeft, setTimeLeft] = useState({ hours: 18, minutes: 0, seconds: 0 });
  
  // Speed contest state
  const [speedState, setSpeedState] = useState<SpeedContestState>({
    title: "BRZOPRSTICA: Prvih 5 posjetilaca dobijaju BESPLATNU KARTU!",
    description: "Za predstojeću prvenstvenu vaterpolo utakmicu na Gradskom olimpijskom bazenu.",
    totalQuota: 5,
    remainingQuota: 3,
    matchInfo: "VK Banja Luka vs VK Borac • Subota 18:00h • Veliki olimpijski bazen",
    isActive: true
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [phone, setPhone] = useState("");
  const [claimedCoupon, setClaimedCoupon] = useState<{
    code: string;
    phone: string;
    type: "coffee" | "waterpolo";
    title: string;
  } | null>(null);

  useEffect(() => {
    const settings = getPortalSettings();
    setPortalSettings(settings);
    setSpeedState(getSpeedContestState());

    const targetDate = settings?.flashPromo?.targetExpiry 
      ? new Date(settings.flashPromo.targetExpiry).getTime()
      : (Date.now() + 18 * 3600 * 1000);

    const updateTimer = () => {
      const now = Date.now();
      const diff = Math.max(0, targetDate - now);
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      setTimeLeft({ hours, minutes, seconds });
    };

    updateTimer();
    const timer = setInterval(updateTimer, 1000);
    return () => clearInterval(timer);
  }, []);'''

code = code.replace(old_timer_block, new_timer_block)

# Replace hardcoded text in card with portalSettings values
code = code.replace(
    'Uz sezonsku kartu od 50 ulazaka dobijate <span className="text-amber-400">5 besplatnih kafa</span> u Caffe Baru GOB!',
    '{portalSettings?.flashPromo?.title || "Uz sezonsku kartu od 50 ulazaka dobijate 5 besplatnih kafa u Caffe Baru GOB!"}'
)
code = code.replace(
    'Aktivirajte akciju odmah na sajtu i preuzmite digitalni bar-kod kupon koji važi na biletarnici i u našem caffe baru.',
    '{portalSettings?.flashPromo?.description || "Aktivirajte akciju odmah na sajtu i preuzmite digitalni bar-kod kupon koji važi na biletarnici i u našem caffe baru."}'
)

with open(path, "w", encoding="utf-8") as f:
    f.write(code)

print("FlashPromoAction.tsx updated with real expiry timer and settings!")
