import { motion, AnimatePresence } from "motion/react";
import { 
  ArrowLeft, 
  Terminal, 
  Zap, 
  Shield, 
  Download, 
  Search, 
  ChevronDown, 
  ChevronUp, 
  History, 
  Package, 
  Terminal as TerminalIcon, 
  Star, 
  MessageSquare, 
  User, 
  Send, 
  CheckCircle2, 
  Settings, 
  LogOut, 
  BookOpen, 
  Cpu, 
  Globe, 
  Lock, 
  AlertCircle,
  Mail,
  Loader2
} from "lucide-react";
import React, { useState, useEffect, useMemo } from "react";

interface Review {
  id: string;
  user: string;
  rating: number;
  comment: string;
  date: string;
}

interface Script {
  id: string;
  name: string;
  category: string;
  price: string;
  description: string;
  tech: string;
  installation: string;
  dependencies: string[];
  history: { version: string; date: string; note: string }[];
  reviews: Review[];
  setupCommands?: {
    env: string;
    deps: string;
    run: string;
  };
}

interface UserProfile {
  id: number;
  email: string;
}

interface UserLicense {
  key: string;
  status: string;
  id: string;
  name: string;
  description: string;
  price: string;
}

const initialScripts: Script[] = [
  {
    id: "S-01",
    name: "Google Maps Lead Scraper",
    category: "LEAD GEN",
    price: "30",
    description: "Extract business name, email, phone, and website from Google Maps. Export directly to CSV/Excel for your sales team.",
    tech: "Python / Selenium",
    installation: "pip install solutionx-maps-scraper\npython -m maps_scraper.setup",
    dependencies: ["selenium", "pandas", "webdriver-manager"],
    history: [
      { version: "v1.0.0", date: "2026-04-01", note: "Initial release" }
    ],
    reviews: [
      { id: "r1", user: "SalesNinja", rating: 5, comment: "Best lead gen tool I've used. Simple and effective.", date: "2026-04-05" }
    ],
    setupCommands: {
      env: "python -m venv venv && source venv/bin/activate",
      deps: "pip install solutionx-maps-scraper pandas selenium webdriver-manager",
      run: "python -m maps_scraper.run --output leads.csv"
    }
  },
  {
    id: "S-02",
    name: "Bulk Cold Email Sender",
    category: "MARKETING",
    price: "40",
    description: "Send 100–1000 personalized emails with auto-insertion of names and companies. Includes basic SMTP setup guide.",
    tech: "Node.js / Nodemailer",
    installation: "npm install @solutionx/email-sender\nnpx email-sender init",
    dependencies: ["nodemailer", "csv-parser", "dotenv"],
    history: [
      { version: "v1.2.0", date: "2026-03-20", note: "Added personalization tags" }
    ],
    reviews: [
      { id: "r2", user: "GrowthHacker", rating: 5, comment: "Direct revenue tool. My conversion rates went up 20%.", date: "2026-03-25" }
    ],
    setupCommands: {
      env: "node -v # Ensure Node.js 18+",
      deps: "npm install @solutionx/email-sender nodemailer csv-parser dotenv",
      run: "npm start -- --template welcome.html --list leads.csv"
    }
  },
  {
    id: "S-03",
    name: "WhatsApp Auto-Reply Bot",
    category: "AUTOMATION",
    price: "35",
    description: "Automate replies to incoming WhatsApp messages based on custom keyword rules. Perfect for small businesses.",
    tech: "Python / Twilio",
    installation: "pip install solutionx-wa-bot\npython -m wa_bot.configure",
    dependencies: ["twilio", "flask", "requests"],
    history: [
      { version: "v2.0.1", date: "2026-03-15", note: "Improved keyword matching" }
    ],
    reviews: [
      { id: "r3", user: "BizOwner", rating: 4, comment: "Saves me so much time replying to basic questions.", date: "2026-03-18" }
    ],
    setupCommands: {
      env: "python -m venv venv && source venv/bin/activate",
      deps: "pip install twilio flask requests solutionx-wa-bot",
      run: "python -m wa_bot.serve --port 5000"
    }
  },
  {
    id: "S-04",
    name: "Social Media Auto Poster",
    category: "MARKETING",
    price: "50",
    description: "Schedule and automate posts for Twitter/X, Instagram, and LinkedIn. Upload content via CSV or a simple dashboard.",
    tech: "Python / Selenium",
    installation: "pip install solutionx-social-poster\nsetup-social-keys",
    dependencies: ["selenium", "pillow", "schedule"],
    history: [
      { version: "v3.1.0", date: "2026-04-02", note: "Added LinkedIn support" }
    ],
    reviews: [
      { id: "r4", user: "ContentCreator", rating: 5, comment: "Consistency is key, and this script makes it easy.", date: "2026-04-04" }
    ],
    setupCommands: {
      env: "python -m venv venv && source venv/bin/activate",
      deps: "pip install selenium pillow schedule solutionx-social-poster",
      run: "python -m social_poster.scheduler --config schedule.json"
    }
  },
  {
    id: "S-05",
    name: "Daily Business Report Generator",
    category: "BUSINESS",
    price: "25",
    description: "Automatically pull data from your sources and send a daily email summary of sales, traffic, and orders.",
    tech: "Python / Pandas",
    installation: "pip install solutionx-reports\npython -m reports.init",
    dependencies: ["pandas", "matplotlib", "smtplib"],
    history: [
      { version: "v1.0.5", date: "2026-02-10", note: "Added chart generation" }
    ],
    reviews: [
      { id: "r5", user: "DataLover", rating: 5, comment: "Love the quick insights every morning.", date: "2026-02-15" }
    ],
    setupCommands: {
      env: "python -m venv venv && source venv/bin/activate",
      deps: "pip install pandas matplotlib solutionx-reports",
      run: "python -m reports.generate --date today --email ceo@company.com"
    }
  },
  {
    id: "S-06",
    name: "AI Content Generator",
    category: "AI",
    price: "30",
    description: "Generate high-quality captions, ads, and product descriptions using AI. Simple input-to-output interface.",
    tech: "Node.js / OpenAI",
    installation: "npm install @solutionx/ai-gen\nexport OPENAI_API_KEY=your_key",
    dependencies: ["openai", "express", "cors"],
    history: [
      { version: "v1.1.0", date: "2026-03-01", note: "Added GPT-4 support" }
    ],
    reviews: [
      { id: "r6", user: "AdAgency", rating: 5, comment: "High perceived value and great results.", date: "2026-03-05" }
    ],
    setupCommands: {
      env: "node -v # Ensure Node.js 18+",
      deps: "npm install @solutionx/ai-gen openai express cors",
      run: "node server.js --port 8080"
    }
  },
  {
    id: "S-07",
    name: "Invoice Generator Script",
    category: "FINANCE",
    price: "20",
    description: "Create and export professional PDF invoices. Easily add your logo and customer information.",
    tech: "Python / ReportLab",
    installation: "pip install solutionx-invoices\npython -m invoices.create",
    dependencies: ["reportlab", "pypdf2"],
    history: [
      { version: "v2.0.0", date: "2026-01-20", note: "Major UI update for PDFs" }
    ],
    reviews: [
      { id: "r7", user: "Freelancer", rating: 4, comment: "Simple but exactly what I needed.", date: "2026-01-25" }
    ],
    setupCommands: {
      env: "python -m venv venv && source venv/bin/activate",
      deps: "pip install reportlab pypdf2 solutionx-invoices",
      run: "python -m invoices.generate --data client_data.json"
    }
  },
  {
    id: "S-08",
    name: "Form to Google Sheets + Automation",
    category: "AUTOMATION",
    price: "25",
    description: "Save form submissions directly to Google Sheets and trigger automated email notifications.",
    tech: "Google Apps Script",
    installation: "Copy-paste script to Apps Script editor\nSet up triggers",
    dependencies: ["Google Sheets API", "Gmail API"],
    history: [
      { version: "v1.0.0", date: "2025-12-01", note: "Initial release" }
    ],
    reviews: [
      { id: "r8", user: "WebDev", rating: 5, comment: "Simple but VERY useful for client sites.", date: "2025-12-10" }
    ],
    setupCommands: {
      env: "Open script.google.com",
      deps: "Enable 'Google Sheets API' and 'Gmail API' in Services",
      run: "Click 'Deploy' -> 'New Deployment' -> 'Web App'"
    }
  },
  {
    id: "S-09",
    name: "Website Contact Scraper",
    category: "LEAD GEN",
    price: "30",
    description: "Extract emails and contact info from any website. Crawl multiple pages automatically.",
    tech: "Node.js / Puppeteer",
    installation: "npm install @solutionx/contact-scraper\nnpx contact-scraper run",
    dependencies: ["puppeteer", "cheerio", "axios"],
    history: [
      { version: "v2.1.2", date: "2026-03-28", note: "Improved email detection" }
    ],
    reviews: [
      { id: "r9", user: "LeadGenPro", rating: 5, comment: "Great for building outreach lists.", date: "2026-03-30" }
    ],
    setupCommands: {
      env: "node -v # Ensure Node.js 18+",
      deps: "npm install puppeteer cheerio axios @solutionx/contact-scraper",
      run: "npx contact-scraper --url https://example.com --depth 3"
    }
  },
  {
    id: "S-10",
    name: "Auto Follow-Up System",
    category: "MARKETING",
    price: "35",
    description: "Automatically send follow-up emails after a set number of days. Works with your existing leads list.",
    tech: "Node.js / Nodemailer",
    installation: "npm install @solutionx/follow-up\nnpx follow-up start",
    dependencies: ["nodemailer", "node-cron", "sqlite3"],
    history: [
      { version: "v1.0.0", date: "2026-04-05", note: "Initial release" }
    ],
    reviews: [
      { id: "r10", user: "SalesManager", rating: 5, comment: "Increases conversions automatically. A must-have.", date: "2026-04-06" }
    ],
    setupCommands: {
      env: "node -v # Ensure Node.js 18+",
      deps: "npm install nodemailer node-cron sqlite3 @solutionx/follow-up",
      run: "npm start -- --db leads.db --interval 24h"
    }
  },
  {
    id: "B-01",
    name: "Lead Generation Pack",
    category: "BUNDLE",
    price: "49",
    description: "The ultimate lead gen bundle: Maps Scraper + Email Scraper + Contact Extractor. Save over 40%!",
    tech: "Python / Node.js",
    installation: "Download bundle ZIP\nFollow individual READMEs",
    dependencies: ["selenium", "puppeteer", "pandas"],
    history: [
      { version: "v1.0.0", date: "2026-04-06", note: "Bundle launch" }
    ],
    reviews: [
      { id: "r11", user: "AgencyOwner", rating: 5, comment: "Incredible value for money.", date: "2026-04-06" }
    ],
    setupCommands: {
      env: "Install Python 3.10+ and Node.js 18+",
      deps: "sh install_all.sh # Included in bundle",
      run: "python main_dashboard.py"
    }
  },
  {
    id: "B-02",
    name: "Marketing Automation Pack",
    category: "BUNDLE",
    price: "59",
    description: "Supercharge your marketing: Email Sender + Follow-up System + Social Poster. Total automation.",
    tech: "Python / Node.js",
    installation: "Download bundle ZIP\nFollow individual READMEs",
    dependencies: ["nodemailer", "selenium", "node-cron"],
    history: [
      { version: "v1.0.0", date: "2026-04-06", note: "Bundle launch" }
    ],
    reviews: [
      { id: "r12", user: "Marketer", rating: 5, comment: "Everything I need to run my campaigns.", date: "2026-04-06" }
    ],
    setupCommands: {
      env: "Install Python 3.10+ and Node.js 18+",
      deps: "npm run setup-marketing # Included in bundle",
      run: "npm run start-automation"
    }
  },
  {
    id: "B-03",
    name: "Business Starter Pack",
    category: "BUNDLE",
    price: "39",
    description: "Essential tools for any business: Invoice Generator + Report Generator + Form Automation.",
    tech: "Python / Apps Script",
    installation: "Download bundle ZIP\nFollow individual READMEs",
    dependencies: ["reportlab", "pandas", "Google Sheets API"],
    history: [
      { version: "v1.0.0", date: "2026-04-06", note: "Bundle launch" }
    ],
    reviews: [
      { id: "r13", user: "StartupFounder", rating: 5, comment: "Perfect for getting started quickly.", date: "2026-04-06" }
    ],
    setupCommands: {
      env: "Install Python 3.10+ and setup Google Cloud Project",
      deps: "pip install -r requirements.txt",
      run: "python business_suite.py"
    }
  }
];

const currencies = [
  { code: "USD", symbol: "$", rate: 1 },
  { code: "EUR", symbol: "€", rate: 0.92 },
  { code: "GBP", symbol: "£", rate: 0.79 },
  { code: "NGN", symbol: "₦", rate: 1500 },
];

const StarRating = ({ rating, size = 12, interactive = false, onRate }: { rating: number, size?: number, interactive?: boolean, onRate?: (rate: number) => void }) => {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={size}
          className={`${star <= rating ? "fill-primary text-primary" : "text-white/10"} ${interactive ? "cursor-pointer hover:scale-110 transition-transform" : ""}`}
          onClick={() => interactive && onRate?.(star)}
        />
      ))}
    </div>
  );
};

export default function ScriptMarketplace({ onBack }: { onBack: () => void }) {
  const [scripts, setScripts] = useState<Script[]>(initialScripts);
  const [search, setSearch] = useState("");
  const [selectedTech, setSelectedTech] = useState("All");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200]);
  const [currency, setCurrency] = useState(currencies[0]);
  const [selectedScript, setSelectedScript] = useState<Script | null>(null);
  const [checkoutScript, setCheckoutScript] = useState<Script | null>(null);
  const [checkoutStep, setCheckoutStep] = useState<"summary" | "payment" | "processing" | "success">("summary");
  const [paymentMethod, setPaymentMethod] = useState<"card" | "crypto" | "paypal" | null>(null);
  const [activeTab, setActiveTab] = useState<"marketplace" | "library" | "profile" | "login">("marketplace");
  
  // Auth State
  const [user, setUser] = useState<UserProfile | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem("sx_token"));
  const [authLoading, setAuthLoading] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [magicLinkSent, setMagicLinkSent] = useState(false);
  const [demoMagicLink, setDemoMagicLink] = useState<string | null>(null);
  
  // Data State
  const [userLicenses, setUserLicenses] = useState<UserLicense[]>([]);
  const [purchasedScripts, setPurchasedScripts] = useState<Set<string>>(new Set());
  const [installedVersions, setInstalledVersions] = useState<Record<string, string>>({});
  const [wizardStep, setWizardStep] = useState(1);

  // --- Effects ---
  useEffect(() => {
    const hash = window.location.hash;
    if (hash.startsWith("#login-token/")) {
      const tokenFromUrl = hash.replace("#login-token/", "");
      handleLoginWithToken(tokenFromUrl);
    }
  }, []);

  useEffect(() => {
    if (token) {
      fetchUserProducts();
    } else {
      setUser(null);
      setUserLicenses([]);
      setPurchasedScripts(new Set());
    }
  }, [token]);

  const handleLoginWithToken = async (loginToken: string) => {
    setAuthLoading(true);
    try {
      const response = await fetch(`/api/auth/login-with-token/${loginToken}`);
      const data = await response.json();
      if (data.token) {
        localStorage.setItem("sx_token", data.token);
        setToken(data.token);
        setUser(data.user);
        setActiveTab("marketplace");
        window.location.hash = "";
      } else {
        alert(data.error || "Login failed");
      }
    } catch (err) {
      console.error("Login error:", err);
    } finally {
      setAuthLoading(false);
    }
  };

  const requestMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    try {
      const response = await fetch("/api/auth/request-magic-link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: loginEmail }),
      });
      const data = await response.json();
      if (response.ok) {
        setMagicLinkSent(true);
        if (data.demoLink) setDemoMagicLink(data.demoLink);
      } else {
        alert(data.error || "Failed to send magic link");
      }
    } catch (err) {
      console.error("Auth error:", err);
    } finally {
      setAuthLoading(false);
    }
  };

  const fetchUserProducts = async () => {
    try {
      const response = await fetch("/api/user/products", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        setUserLicenses(data);
        const ids = new Set(data.map((l: UserLicense) => l.id));
        setPurchasedScripts(ids);
        
        // Mock installed versions for demo
        const versions: Record<string, string> = {};
        data.forEach((l: UserLicense) => {
          versions[l.id] = "v1.0.0";
        });
        setInstalledVersions(versions);
      } else if (response.status === 401) {
        handleLogout();
      }
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("sx_token");
    setToken(null);
    setUser(null);
    setActiveTab("marketplace");
  };

  const handlePurchase = async (script: Script) => {
    if (!token) {
      setActiveTab("login");
      setCheckoutScript(null);
      return;
    }

    setCheckoutStep("processing");
    
    try {
      const response = await fetch("/api/purchase", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ productId: script.id }),
      });

      if (response.ok) {
        setTimeout(() => {
          setCheckoutStep("success");
          fetchUserProducts();
        }, 2000);
      } else {
        const data = await response.json();
        alert(data.error || "Purchase failed");
        setCheckoutStep("summary");
      }
    } catch (err) {
      console.error("Purchase error:", err);
      setCheckoutStep("summary");
    }
  };

  const handleDownload = async (productId: string, fileName: string) => {
    try {
      const response = await fetch(`/api/download/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      } else {
        const data = await response.json();
        alert(data.error || "Download failed");
      }
    } catch (err) {
      console.error("Download error:", err);
    }
  };

  // Review state
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewComment, setNewReviewComment] = useState("");
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);

  useEffect(() => {
    const detectCurrency = async () => {
      try {
        const locale = navigator.language || "en-US";
        let detectedCode = "USD";
        if (locale.includes("GB")) detectedCode = "GBP";
        else if (locale.includes("NG")) detectedCode = "NGN";
        else if (locale.includes("DE") || locale.includes("FR") || locale.includes("IT") || locale.includes("ES")) detectedCode = "EUR";
        const detectedCurrency = currencies.find(c => c.code === detectedCode) || currencies[0];
        setCurrency(detectedCurrency);
      } catch (e) {
        setCurrency(currencies[0]);
      }
    };
    detectCurrency();
  }, []);

  const allTechs = useMemo(() => ["All", ...new Set(scripts.flatMap(s => s.tech.split(" / ")))], [scripts]);

  const filteredScripts = scripts.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase()) || 
                         s.category.toLowerCase().includes(search.toLowerCase());
    const matchesTech = selectedTech === "All" || s.tech.includes(selectedTech);
    const price = parseInt(s.price);
    const matchesPrice = price >= priceRange[0] && price <= priceRange[1];
    return matchesSearch && matchesTech && matchesPrice;
  });

  const convertPrice = (price: string) => {
    return Math.round(parseInt(price) * currency.rate).toLocaleString();
  };

  const calculateAverageRating = (reviews: Review[]) => {
    if (reviews.length === 0) return "0.0";
    const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
    return (sum / reviews.length).toFixed(1);
  };

  const handleAddReview = (scriptId: string) => {
    if (!newReviewComment.trim()) return;

    setIsSubmittingReview(true);
    
    // Simulate API delay
    setTimeout(() => {
      const newReview: Review = {
        id: `r-${Date.now()}`,
        user: "Current_User",
        rating: newReviewRating,
        comment: newReviewComment,
        date: new Date().toISOString().split('T')[0]
      };

      setScripts(prev => prev.map(s => 
        s.id === scriptId ? { ...s, reviews: [newReview, ...s.reviews] } : s
      ));

      // Update selected script if it's the one being reviewed
      if (selectedScript?.id === scriptId) {
        setSelectedScript(prev => prev ? { ...prev, reviews: [newReview, ...prev.reviews] } : null);
      }

      setNewReviewComment("");
      setNewReviewRating(5);
      setIsSubmittingReview(false);
    }, 600);
  };

  const handleCloseCheckout = () => {
    setCheckoutScript(null);
    setCheckoutStep("summary");
  };

  const handleRollback = (scriptId: string, version: string) => {
    setInstalledVersions(prev => ({ ...prev, [scriptId]: version }));
    alert(`System rolled back to version ${version} for script ${scriptId}.`);
  };

  const InstallationWizard = ({ script }: { script: Script }) => {
    const steps = [
      { title: "Environment", icon: <Globe size={16} />, content: `Ensure you have ${script.tech.split(' / ')[0]} installed on your system. Run 'node -v' or 'python --version' to verify.` },
      { title: "Dependencies", icon: <Package size={16} />, content: `Install required packages: ${script.dependencies.join(', ')}. Use the provided installation command.` },
      { title: "Configuration", icon: <Settings size={16} />, content: "Set up your environment variables (.env) with your API keys and preferred settings." },
      { title: "Execution", icon: <Zap size={16} />, content: "Run the script using the start command. Monitor logs for initial connection success." }
    ];

    return (
      <div className="space-y-6 bg-white/[0.02] border border-white/5 rounded-3xl p-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-headline font-bold uppercase tracking-widest text-sm flex items-center gap-2">
            <TerminalIcon size={18} className="text-primary" />
            Installation Wizard
          </h3>
          <div className="flex gap-1">
            {steps.map((_, i) => (
              <div key={i} className={`w-8 h-1 rounded-full transition-colors ${wizardStep > i ? "bg-primary" : "bg-white/10"}`} />
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={wizardStep}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            className="space-y-4 min-h-[120px]"
          >
            <div className="flex items-center gap-3 text-primary">
              {steps[wizardStep - 1].icon}
              <span className="text-[10px] font-headline uppercase tracking-widest font-bold">Step {wizardStep}: {steps[wizardStep - 1].title}</span>
            </div>
            <p className="text-sm text-white/60 font-light leading-relaxed">
              {steps[wizardStep - 1].content}
            </p>
            {wizardStep === 2 && (
              <div className="bg-black/40 rounded-xl p-4 border border-white/5 font-mono text-xs text-primary/80">
                {script.installation}
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-between pt-4 border-t border-white/5">
          <button 
            disabled={wizardStep === 1}
            onClick={() => setWizardStep(prev => prev - 1)}
            className="px-4 py-2 text-[10px] font-headline uppercase tracking-widest text-white/40 hover:text-white disabled:opacity-0 transition-all"
          >
            Previous
          </button>
          <button 
            onClick={() => wizardStep < 4 ? setWizardStep(prev => prev + 1) : setWizardStep(1)}
            className="px-6 py-2 bg-primary text-black text-[10px] font-headline uppercase tracking-widest font-bold hover:opacity-90 transition-all rounded-lg"
          >
            {wizardStep === 4 ? "Restart Guide" : "Next Step"}
          </button>
        </div>
      </div>
    );
  };

  const CollapsibleInstallation = ({ script }: { script: Script }) => {
    const [isOpen, setIsOpen] = useState(true);
    
    if (!script.setupCommands) return null;

    return (
      <div className="bg-white/[0.02] border border-white/5 rounded-3xl overflow-hidden">
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="w-full p-6 flex items-center justify-between hover:bg-white/[0.02] transition-colors"
        >
          <div className="flex items-center gap-3 text-primary">
            <TerminalIcon size={20} />
            <h3 className="font-headline font-bold uppercase tracking-widest text-sm">Quick Start Guide</h3>
          </div>
          {isOpen ? <ChevronUp size={20} className="text-white/20" /> : <ChevronDown size={20} className="text-white/20" />}
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="p-8 pt-0 space-y-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-[10px] font-headline uppercase tracking-widest text-white/40">
                    <div className="w-1 h-1 rounded-full bg-primary" />
                    1. Environment Setup
                  </div>
                  <div className="bg-black/40 rounded-xl p-4 border border-white/5 font-mono text-xs text-primary/80 relative group">
                    {script.setupCommands.env}
                    <button 
                      onClick={() => navigator.clipboard.writeText(script.setupCommands?.env || "")}
                      className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-white/5 rounded"
                    >
                      <Download size={12} />
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-[10px] font-headline uppercase tracking-widest text-white/40">
                    <div className="w-1 h-1 rounded-full bg-primary" />
                    2. Install Dependencies
                  </div>
                  <div className="bg-black/40 rounded-xl p-4 border border-white/5 font-mono text-xs text-primary/80 relative group">
                    {script.setupCommands.deps}
                    <button 
                      onClick={() => navigator.clipboard.writeText(script.setupCommands?.deps || "")}
                      className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-white/5 rounded"
                    >
                      <Download size={12} />
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-[10px] font-headline uppercase tracking-widest text-white/40">
                    <div className="w-1 h-1 rounded-full bg-primary" />
                    3. Run Script
                  </div>
                  <div className="bg-black/40 rounded-xl p-4 border border-white/5 font-mono text-xs text-primary/80 relative group">
                    {script.setupCommands.run}
                    <button 
                      onClick={() => navigator.clipboard.writeText(script.setupCommands?.run || "")}
                      className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-white/5 rounded"
                    >
                      <Download size={12} />
                    </button>
                  </div>
                </div>

                <div className="p-4 bg-primary/5 border border-primary/20 rounded-xl flex items-start gap-3">
                  <AlertCircle size={16} className="text-primary shrink-0 mt-0.5" />
                  <p className="text-[10px] text-white/60 leading-relaxed">
                    Make sure you have the correct permissions and API keys configured in your environment before running the script.
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  if (selectedScript && !checkoutScript) {
    const isPurchased = purchasedScripts.has(selectedScript.id);
    const currentVersion = installedVersions[selectedScript.id];

    return (
      <div className="min-h-screen bg-[#050505] text-white selection:bg-primary/30">
        <nav className="border-b border-white/5 bg-black/50 backdrop-blur-xl sticky top-0 z-50 px-8 md:px-24 py-4 flex justify-between items-center">
          <button onClick={() => setSelectedScript(null)} className="flex items-center gap-2 text-white/40 hover:text-primary transition-colors text-[10px] font-headline uppercase tracking-widest">
            <ArrowLeft size={16} /> Back to {activeTab === 'library' ? 'Library' : 'Marketplace'}
          </button>
          <div className="flex items-center gap-2">
            <Terminal className="text-primary" size={20} />
            <span className="font-headline font-black uppercase tracking-tighter text-lg">ScriptX</span>
          </div>
        </nav>

        <main className="py-20 px-8 md:px-24 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-8 space-y-12">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <span className="text-[10px] font-headline text-primary tracking-widest uppercase bg-primary/5 px-3 py-1 rounded border border-primary/20">
                  {selectedScript.category}
                </span>
                <div className="flex items-center gap-2">
                  <StarRating rating={Math.round(parseFloat(calculateAverageRating(selectedScript.reviews)))} size={14} />
                  <span className="text-sm font-headline text-primary font-bold">{calculateAverageRating(selectedScript.reviews)}</span>
                  <span className="text-sm font-headline text-white/20">({selectedScript.reviews.length} reviews)</span>
                </div>
                {isPurchased && (
                  <span className="text-[10px] font-headline text-green-500 tracking-widest uppercase bg-green-500/5 px-3 py-1 rounded border border-green-500/20 flex items-center gap-2">
                    <CheckCircle2 size={12} /> Owned
                  </span>
                )}
              </div>
              <h1 className="text-5xl md:text-7xl font-headline font-black uppercase tracking-tighter leading-none">
                {selectedScript.name}
              </h1>
              <p className="text-xl text-white/60 font-light leading-relaxed max-w-3xl">
                {selectedScript.description}
              </p>
            </div>

            {isPurchased ? (
              <div className="space-y-8">
                <InstallationWizard script={selectedScript} />
                <CollapsibleInstallation script={selectedScript} />
              </div>
            ) : (
              <div className="p-8 bg-white/[0.02] border border-white/5 rounded-3xl space-y-4">
                <div className="flex items-center gap-3 text-primary">
                  <Package size={20} />
                  <h3 className="font-headline font-bold uppercase tracking-widest text-sm">Technical Stack</h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <div className="text-[10px] font-headline text-white/20 uppercase tracking-widest mb-1">Core Environment</div>
                    <div className="text-lg font-headline text-white">{selectedScript.tech}</div>
                  </div>
                  <div>
                    <div className="text-[10px] font-headline text-white/20 uppercase tracking-widest mb-2">Dependencies</div>
                    <div className="flex flex-wrap gap-2">
                      {selectedScript.dependencies.map(dep => (
                        <span key={dep} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-headline text-white/40">
                          {dep}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 gap-8">
              <div className="p-8 bg-white/[0.02] border border-white/5 rounded-3xl space-y-4">
                <div className="flex items-center gap-3 text-primary">
                  <History size={20} />
                  <h3 className="font-headline font-bold uppercase tracking-widest text-sm">Version Management</h3>
                </div>
                <div className="space-y-6">
                  {selectedScript.history.map((entry, idx) => (
                    <div key={idx} className={`flex justify-between items-center p-4 rounded-2xl transition-all ${currentVersion === entry.version ? "bg-primary/5 border border-primary/20" : "bg-white/[0.01] border border-transparent"}`}>
                      <div className="flex gap-4 items-start">
                        <div className="text-[10px] font-headline text-primary font-bold whitespace-nowrap bg-primary/5 px-2 py-0.5 rounded">{entry.version}</div>
                        <div>
                          <div className="text-[10px] font-headline text-white/20 uppercase tracking-widest mb-1">{entry.date}</div>
                          <div className="text-xs text-white/60 font-light">{entry.note}</div>
                        </div>
                      </div>
                      {isPurchased && (
                        currentVersion === entry.version ? (
                          <span className="text-[8px] font-headline text-primary uppercase tracking-widest font-bold flex items-center gap-1">
                            <CheckCircle2 size={10} /> Active
                          </span>
                        ) : (
                          <button 
                            onClick={() => handleRollback(selectedScript.id, entry.version)}
                            className="px-3 py-1 bg-white/5 hover:bg-white/10 rounded-lg text-[8px] font-headline uppercase tracking-widest transition-all"
                          >
                            Rollback
                          </button>
                        )
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-8 pt-12 border-t border-white/5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-primary">
                  <MessageSquare size={20} />
                  <h3 className="font-headline font-bold uppercase tracking-widest text-sm">Community Feedback</h3>
                </div>
              </div>

              {isPurchased && (
                <div className="bg-white/[0.03] border border-white/5 rounded-3xl p-8 space-y-6">
                  <div className="flex items-center justify-between">
                    <h4 className="text-[10px] font-headline uppercase tracking-widest font-bold text-white/60">Submit Your Review</h4>
                    <StarRating rating={newReviewRating} size={16} interactive onRate={setNewReviewRating} />
                  </div>
                  <div className="relative">
                    <textarea
                      value={newReviewComment}
                      onChange={(e) => setNewReviewComment(e.target.value)}
                      placeholder="Share your experience with this script..."
                      className="w-full bg-black/40 border border-white/10 rounded-2xl p-6 text-sm outline-none focus:border-primary transition-colors min-h-[120px] resize-none"
                    />
                    <button
                      onClick={() => handleAddReview(selectedScript.id)}
                      disabled={isSubmittingReview || !newReviewComment.trim()}
                      className="absolute bottom-4 right-4 px-6 py-3 bg-primary text-black rounded-xl font-headline font-bold uppercase tracking-widest text-[10px] hover:opacity-90 transition-all disabled:opacity-50"
                    >
                      {isSubmittingReview ? "Submitting..." : "Post Review"}
                    </button>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {selectedScript.reviews.map((review) => (
                  <div key={review.id} className="p-6 bg-white/[0.02] border border-white/5 rounded-2xl space-y-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <User size={14} className="text-primary" />
                        </div>
                        <div>
                          <div className="text-xs font-headline font-bold text-white/80">{review.user}</div>
                          <div className="text-[8px] font-headline text-white/20 uppercase tracking-widest">{review.date}</div>
                        </div>
                      </div>
                      <StarRating rating={review.rating} size={10} />
                    </div>
                    <p className="text-sm text-white/40 font-light leading-relaxed italic">
                      "{review.comment}"
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="sticky top-32 space-y-6">
              {!isPurchased ? (
                <div className="p-8 bg-white/[0.03] border border-white/10 rounded-3xl space-y-8 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-8 opacity-5 -rotate-12">
                    <Zap size={120} />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="text-[10px] font-headline text-white/40 uppercase tracking-widest">License Price</div>
                    <div className="text-5xl font-headline font-black text-primary">
                      {currency.symbol}{convertPrice(selectedScript.price)}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-xs text-white/60">
                      <Shield size={16} className="text-primary" />
                      <span>Verified Security Audit</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-white/60">
                      <Download size={16} className="text-primary" />
                      <span>Instant Source Access</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-white/60">
                      <History size={16} className="text-primary" />
                      <span>Lifetime Free Updates</span>
                    </div>
                  </div>

                  <button 
                    onClick={() => {
                      if (!token) {
                        setActiveTab("login");
                        setSelectedScript(null);
                        return;
                      }
                      setCheckoutScript(selectedScript);
                      setCheckoutStep("summary");
                    }}
                    className="w-full py-5 bg-primary text-black font-headline font-black uppercase tracking-[0.2em] text-xs hover:opacity-90 transition-all rounded-xl shadow-[0_0_30px_rgba(var(--primary-rgb),0.2)]"
                  >
                    {token ? "Purchase License" : "Login to Purchase"}
                  </button>

                  <p className="text-center text-[8px] font-headline text-white/20 uppercase tracking-widest leading-relaxed">
                    Includes full documentation and <br /> 12 months of technical support.
                  </p>
                </div>
              ) : (
                <div className="p-8 bg-primary/5 border border-primary/20 rounded-3xl space-y-6">
                  <div className="flex items-center gap-3 text-primary">
                    <Download size={20} />
                    <h3 className="font-headline font-bold uppercase tracking-widest text-sm">Download Source</h3>
                  </div>
                  <p className="text-xs text-white/40 font-light leading-relaxed">
                    You own this script. You can download the latest source code or any previous version from the management panel.
                  </p>
                  <button 
                    onClick={() => handleDownload(selectedScript.id, `${selectedScript.name.toLowerCase().replace(/ /g, "_")}.py`)}
                    className="w-full py-4 bg-white text-black font-headline font-black uppercase tracking-widest text-[10px] rounded-xl hover:bg-primary transition-all flex items-center justify-center gap-2"
                  >
                    <Package size={14} /> Download Script File
                  </button>
                  <div className="pt-4 border-t border-white/10">
                    <div className="text-[8px] font-headline text-white/20 uppercase tracking-widest mb-2">License Key</div>
                    <div className="bg-black/40 p-3 rounded-lg font-mono text-[10px] text-primary break-all flex justify-between items-center">
                      <span>{userLicenses.find(l => l.id === selectedScript.id)?.key || "SX-XXXX-XXXX-XXXX"}</span>
                      <button 
                        onClick={() => navigator.clipboard.writeText(userLicenses.find(l => l.id === selectedScript.id)?.key || "")}
                        className="p-1 hover:bg-white/10 rounded transition-colors"
                      >
                        <CheckCircle2 size={12} className="text-white/20" />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              <div className="p-6 bg-white/[0.01] border border-white/5 rounded-2xl">
                <h4 className="text-[10px] font-headline text-white/40 uppercase tracking-widest mb-4">Need Customization?</h4>
                <p className="text-xs text-white/40 font-light mb-4 leading-relaxed">
                  Our engineering team can tailor this script to your specific infrastructure requirements.
                </p>
                <button className="text-primary text-[10px] font-headline uppercase tracking-widest font-bold hover:underline">
                  Contact Support
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (checkoutScript) {
    return (
      <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center p-8">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-white/[0.02] border border-white/10 rounded-3xl p-8 space-y-8 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <Shield size={120} />
          </div>
          
          <div className="space-y-2">
            {checkoutStep !== "success" && checkoutStep !== "processing" && (
              <button 
                onClick={handleCloseCheckout}
                className="flex items-center gap-2 text-white/40 hover:text-primary transition-colors text-[10px] font-headline uppercase tracking-widest mb-4"
              >
                <ArrowLeft size={14} /> Cancel Order
              </button>
            )}
            <h2 className="text-3xl font-headline font-black uppercase tracking-tighter">
              {checkoutStep === "summary" && "Order Summary"}
              {checkoutStep === "payment" && "Payment Method"}
              {checkoutStep === "processing" && "Securing Funds"}
              {checkoutStep === "success" && "Purchase Complete"}
            </h2>
            <p className="text-white/40 text-xs font-light">
              {checkoutStep === "summary" && "Review your script license details."}
              {checkoutStep === "payment" && "Select your preferred payment gateway."}
              {checkoutStep === "processing" && "Validating transaction on the blockchain..."}
              {checkoutStep === "success" && "Your license has been activated."}
            </p>
          </div>

          <AnimatePresence mode="wait">
            {checkoutStep === "summary" && (
              <motion.div 
                key="summary"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="bg-white/5 rounded-2xl p-6 space-y-4 border border-white/5">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-headline font-bold uppercase text-sm">{checkoutScript.name}</h3>
                      <p className="text-[10px] text-white/40 uppercase tracking-widest">{checkoutScript.category}</p>
                    </div>
                    <span className="text-primary font-headline font-black text-lg">
                      {currency.symbol}{convertPrice(checkoutScript.price)}
                    </span>
                  </div>
                  <div className="pt-4 border-t border-white/10 flex justify-between items-center">
                    <span className="text-[10px] font-headline text-white/40 uppercase tracking-widest">Total Amount</span>
                    <span className="text-2xl font-headline font-black">
                      {currency.symbol}{convertPrice(checkoutScript.price)}
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-4 bg-primary/5 border border-primary/20 rounded-xl">
                    <Shield className="text-primary" size={20} />
                    <div className="text-[10px] font-headline uppercase tracking-widest leading-tight">
                      <div className="text-primary font-bold">Encrypted Transaction</div>
                      <div className="text-white/40">AES-256 Bit Security Enabled</div>
                    </div>
                  </div>
                  
                  <button 
                    className="w-full py-5 bg-primary text-black font-headline font-black uppercase tracking-[0.2em] text-xs hover:opacity-90 transition-all rounded-xl shadow-[0_0_30px_rgba(var(--primary-rgb),0.2)]"
                    onClick={() => setCheckoutStep("payment")}
                  >
                    Proceed to Payment
                  </button>
                </div>
              </motion.div>
            )}

            {checkoutStep === "payment" && (
              <motion.div 
                key="payment"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 gap-3">
                  {[
                    { id: "card", label: "Credit / Debit Card", icon: <Lock size={16} /> },
                    { id: "crypto", label: "Cryptocurrency (BTC/ETH)", icon: <Zap size={16} /> },
                    { id: "paypal", label: "PayPal Express", icon: <Globe size={16} /> }
                  ].map((method) => (
                    <button
                      key={method.id}
                      onClick={() => setPaymentMethod(method.id as any)}
                      className={`flex items-center justify-between p-4 rounded-xl border transition-all ${
                        paymentMethod === method.id 
                          ? "bg-primary/10 border-primary text-primary" 
                          : "bg-white/5 border-white/10 text-white/40 hover:border-white/20"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {method.icon}
                        <span className="text-[10px] font-headline uppercase tracking-widest font-bold">{method.label}</span>
                      </div>
                      {paymentMethod === method.id && <CheckCircle2 size={16} />}
                    </button>
                  ))}
                </div>

                <div className="pt-4 border-t border-white/10">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-[10px] font-headline text-white/40 uppercase tracking-widest">Payable in {currency.code}</span>
                    <span className="text-xl font-headline font-black text-primary">
                      {currency.symbol}{convertPrice(checkoutScript.price)}
                    </span>
                  </div>

                  <button 
                    className="w-full py-5 bg-primary text-black font-headline font-black uppercase tracking-[0.2em] text-xs hover:opacity-90 transition-all rounded-xl shadow-[0_0_30px_rgba(var(--primary-rgb),0.2)]"
                    onClick={() => handlePurchase(checkoutScript)}
                  >
                    Complete Purchase
                  </button>
                  
                  <button 
                    onClick={() => setCheckoutStep("summary")}
                    className="w-full py-3 text-[10px] font-headline uppercase tracking-widest text-white/20 hover:text-white transition-colors mt-2"
                  >
                    Go Back
                  </button>
                </div>
              </motion.div>
            )}

            {checkoutStep === "processing" && (
              <motion.div 
                key="processing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="py-12 flex flex-col items-center justify-center space-y-8"
              >
                <div className="relative">
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="w-24 h-24 border-4 border-primary/20 border-t-primary rounded-full"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Shield className="text-primary animate-pulse" size={32} />
                  </div>
                </div>
                <div className="text-center space-y-2">
                  <div className="text-primary font-headline font-black uppercase tracking-widest text-sm animate-pulse">Processing Payment</div>
                  <div className="text-[10px] font-headline text-white/20 uppercase tracking-widest">Do not refresh this page</div>
                </div>
              </motion.div>
            )}

            {checkoutStep === "success" && (
              <motion.div 
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-8 text-center space-y-8"
              >
                <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto border border-green-500/30">
                  <CheckCircle2 className="text-green-500" size={40} />
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-2xl font-headline font-black uppercase tracking-tighter">Success!</h3>
                  <p className="text-white/40 text-xs font-light leading-relaxed">
                    Transaction confirmed. Your license for <span className="text-white font-bold">{checkoutScript.name}</span> is now active.
                  </p>
                </div>

                <div className="bg-white/5 p-4 rounded-xl border border-white/10 font-mono text-[10px] text-primary space-y-2">
                  <div className="flex justify-between">
                    <span className="text-white/20 uppercase">TXID:</span>
                    <span>{Math.random().toString(36).substring(2, 15).toUpperCase()}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-white/5">
                    <span className="text-white/20 uppercase">License:</span>
                    <span>{userLicenses.find(l => l.id === checkoutScript.id)?.key || "ACTIVATING..."}</span>
                  </div>
                </div>

                <button 
                  onClick={() => {
                    setCheckoutScript(null);
                    setSelectedScript(null);
                    setActiveTab("library");
                  }}
                  className="w-full py-5 bg-primary text-black font-headline font-black uppercase tracking-[0.2em] text-xs hover:opacity-90 transition-all rounded-xl shadow-[0_0_30px_rgba(var(--primary-rgb),0.2)]"
                >
                  Go to My Library
                </button>
              </motion.div>
            )}
          </AnimatePresence>
          
          {checkoutStep !== "success" && checkoutStep !== "processing" && (
            <p className="text-center text-[8px] font-headline text-white/20 uppercase tracking-widest">
              Secure payment powered by SolutionX Gateway. <br />
              All transactions are audited and insured.
            </p>
          )}
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-primary/30">
      <nav className="border-b border-white/5 bg-black/50 backdrop-blur-xl sticky top-0 z-50 px-8 md:px-24 py-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 hover:bg-white/5 rounded-full transition-colors">
            <ArrowLeft size={20} />
          </button>
          <div className="flex items-center gap-2">
            <Terminal className="text-primary" size={24} />
            <span className="font-headline font-black uppercase tracking-tighter text-xl">ScriptX</span>
          </div>
        </div>
        
          <div className="hidden md:flex items-center gap-8">
          <div className="flex items-center gap-1 p-1 bg-white/5 rounded-full border border-white/10">
            {[
              { id: "marketplace", label: "Market", icon: <Globe size={12} /> },
              { id: "library", label: "Library", icon: <BookOpen size={12} /> },
              { id: "profile", label: "Profile", icon: <User size={12} /> },
              ...(!token ? [{ id: "login", label: "Login", icon: <Lock size={12} /> }] : [])
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 rounded-full text-[9px] font-headline uppercase tracking-widest transition-all flex items-center gap-2 ${
                  activeTab === tab.id ? "bg-primary text-black font-bold" : "text-white/40 hover:text-white"
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 p-1 bg-white/5 rounded-full border border-white/10">
            {currencies.map((c) => (
              <button
                key={c.code}
                onClick={() => setCurrency(c)}
                className={`px-3 py-1 rounded-full text-[8px] font-headline uppercase tracking-widest transition-all ${
                  currency.code === c.code ? "bg-primary text-black font-bold" : "text-white/40 hover:text-white"
                }`}
              >
                {c.code}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <main className="py-20 px-8 md:px-24 max-w-7xl mx-auto">
        <AnimatePresence mode="wait">
          {activeTab === "marketplace" && (
            <motion.div
              key="marketplace"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              {/* Hero Section */}
              <div className="mb-20 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full">
                  <Zap size={12} className="text-primary" />
                  <span className="text-[8px] font-headline uppercase tracking-[0.2em] text-primary">Automation Hub</span>
                </div>
                <h1 className="text-5xl md:text-7xl font-headline font-black uppercase tracking-tighter leading-none">
                  Boost Your <br /> <span className="text-primary">Productivity.</span>
                </h1>
              </div>

              {/* Advanced Filters */}
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-12">
                <div className="lg:col-span-2 space-y-4">
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                    <input 
                      type="text" 
                      placeholder="Search scripts..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-lg py-4 pl-12 pr-4 text-sm outline-none focus:border-primary transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-headline uppercase tracking-widest text-white/40 ml-1">Tech Stack</label>
                  <select 
                    value={selectedTech}
                    onChange={(e) => setSelectedTech(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-xs outline-none focus:border-primary transition-colors appearance-none"
                  >
                    {allTechs.map(tech => (
                      <option key={tech} value={tech} className="bg-[#050505]">{tech}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-headline uppercase tracking-widest text-white/40 ml-1">Max Price: ${priceRange[1]}</label>
                  <input 
                    type="range" 
                    min="0" 
                    max="200" 
                    step="10"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                    className="w-full accent-primary h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
              </div>

              {/* Script Grid */}
              <div className="grid grid-cols-1 gap-6">
                {filteredScripts.map((script, i) => (
                  <motion.div
                    key={script.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="bg-white/[0.02] border border-white/5 rounded-2xl transition-all group relative overflow-hidden hover:border-primary/30"
                  >
                    <div 
                      className="p-8 cursor-pointer"
                      onClick={() => setSelectedScript(script)}
                    >
                      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Terminal size={80} />
                      </div>

                      <div className="relative z-10 space-y-6">
                        <div className="flex justify-between items-start">
                          <div className="flex items-center gap-4">
                            <span className={`text-[9px] font-headline tracking-widest uppercase px-2 py-1 rounded ${
                              script.category === "BUNDLE" 
                                ? "bg-secondary/20 text-secondary border border-secondary/30 font-bold animate-pulse" 
                                : "bg-primary/5 text-primary border border-primary/20"
                            }`}>
                              {script.category}
                            </span>
                            <span className="text-[9px] font-headline text-white/40 tracking-widest uppercase">
                              ID: {script.id}
                            </span>
                            <div className="flex items-center gap-2 bg-white/5 px-2 py-1 rounded">
                              <StarRating rating={Math.round(parseFloat(calculateAverageRating(script.reviews)))} size={10} />
                              <span className="text-[10px] font-headline text-primary font-bold">{calculateAverageRating(script.reviews)}</span>
                              <span className="text-[10px] font-headline text-white/20">({script.reviews.length})</span>
                            </div>
                            {purchasedScripts.has(script.id) && (
                              <span className="text-[8px] font-headline text-green-500 tracking-widest uppercase bg-green-500/5 px-2 py-1 rounded border border-green-500/20">Owned</span>
                            )}
                          </div>
                          <div className="flex items-center gap-4">
                            <span className="text-xl font-headline font-black">
                              {currency.symbol}{convertPrice(script.price)}
                            </span>
                          </div>
                        </div>

                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div>
                            <h3 className="text-2xl font-headline font-bold uppercase mb-2">{script.name}</h3>
                            <p className="text-white/40 text-sm font-light leading-relaxed max-w-2xl">
                              {script.description}
                            </p>
                          </div>
                          <div className="flex items-center gap-6">
                            <div className="text-right">
                              <div className="text-[10px] font-headline text-white/40 uppercase tracking-widest mb-1">Tech Stack</div>
                              <div className="text-xs font-headline text-white">{script.tech}</div>
                            </div>
                            <button className="p-3 bg-white text-black rounded-lg hover:bg-primary transition-colors">
                              <Zap size={18} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === "library" && (
            <motion.div
              key="library"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-12"
            >
              <div className="space-y-4">
                <h2 className="text-4xl font-headline font-black uppercase tracking-tighter">My Library</h2>
                <p className="text-white/40 text-sm font-light">Manage your purchased scripts and active versions.</p>
              </div>

              <div className="grid grid-cols-1 gap-6">
                {scripts.filter(s => purchasedScripts.has(s.id)).map((script) => (
                  <div 
                    key={script.id}
                    onClick={() => setSelectedScript(script)}
                    className="bg-white/[0.02] border border-white/5 rounded-2xl p-8 hover:border-primary/30 transition-all cursor-pointer group"
                  >
                    <div className="flex flex-col md:flex-row justify-between gap-8">
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <span className="text-[9px] font-headline text-primary tracking-widest uppercase bg-primary/5 px-2 py-1 rounded">{script.category}</span>
                          <span className="text-[10px] font-headline text-white/20 uppercase tracking-widest">Active: {installedVersions[script.id]}</span>
                        </div>
                        <h3 className="text-2xl font-headline font-bold uppercase">{script.name}</h3>
                        <p className="text-white/40 text-sm font-light max-w-xl">{script.description}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <button className="px-6 py-3 bg-white/5 hover:bg-white/10 rounded-xl text-[10px] font-headline uppercase tracking-widest transition-all">Manage</button>
                        <button className="px-6 py-3 bg-primary text-black font-headline font-black uppercase tracking-widest text-[10px] rounded-xl hover:opacity-90 transition-all">Launch</button>
                      </div>
                    </div>
                  </div>
                ))}
                {purchasedScripts.size === 0 && (
                  <div className="text-center py-20 border border-dashed border-white/10 rounded-3xl">
                    <BookOpen size={40} className="text-white/10 mx-auto mb-4" />
                    <p className="text-white/20 font-headline uppercase tracking-widest text-xs">Your library is empty</p>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {activeTab === "login" && (
            <motion.div
              key="login"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="max-w-md mx-auto py-20"
            >
              <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-10 space-y-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-5">
                  <Shield size={120} />
                </div>

                <div className="space-y-2 relative z-10">
                  <h2 className="text-4xl font-headline font-black uppercase tracking-tighter">Magic Login</h2>
                  <p className="text-white/40 text-xs font-light">No passwords. Just a secure link to your inbox.</p>
                </div>

                {magicLinkSent ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="space-y-6 text-center py-8"
                  >
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto border border-primary/20">
                      <Mail className="text-primary" size={32} />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-headline font-bold uppercase">Check Your Email</h3>
                      <p className="text-white/40 text-xs leading-relaxed">
                        We've sent a magic login link to <span className="text-white font-bold">{loginEmail}</span>.
                        The link will expire in 15 minutes.
                      </p>
                    </div>

                    {demoMagicLink && (
                      <div className="space-y-4">
                        <div className="p-4 bg-primary/5 border border-primary/20 rounded-xl space-y-2">
                          <div className="text-[8px] font-headline text-primary uppercase tracking-widest font-bold">Demo Mode: Magic Link</div>
                          <div className="bg-black/40 p-3 rounded-lg font-mono text-[10px] text-primary break-all">
                            {demoMagicLink}
                          </div>
                        </div>
                        <button 
                          onClick={() => window.location.href = demoMagicLink}
                          className="w-full py-4 bg-white text-black font-headline font-black uppercase tracking-widest text-[10px] rounded-xl hover:bg-primary transition-all"
                        >
                          Login Now (Demo)
                        </button>
                      </div>
                    )}

                    <button 
                      onClick={() => {
                        setMagicLinkSent(false);
                        setDemoMagicLink(null);
                      }}
                      className="text-primary text-[10px] font-headline uppercase tracking-widest font-bold hover:underline"
                    >
                      Use a different email
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={requestMagicLink} className="space-y-6 relative z-10">
                    <div className="space-y-2">
                      <label className="text-[10px] font-headline uppercase tracking-widest text-white/40 ml-1">Email Address</label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                        <input 
                          type="email" 
                          required
                          placeholder="name@company.com"
                          value={loginEmail}
                          onChange={(e) => setLoginEmail(e.target.value)}
                          className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-sm outline-none focus:border-primary transition-colors"
                        />
                      </div>
                    </div>

                    <button 
                      type="submit"
                      disabled={authLoading}
                      className="w-full py-5 bg-primary text-black font-headline font-black uppercase tracking-[0.2em] text-xs hover:opacity-90 transition-all rounded-xl shadow-[0_0_30px_rgba(var(--primary-rgb),0.2)] flex items-center justify-center gap-3"
                    >
                      {authLoading ? <Loader2 className="animate-spin" size={18} /> : "Send Magic Link"}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          )}

          {activeTab === "profile" && (
            <motion.div
              key="profile"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="max-w-2xl mx-auto space-y-12"
            >
              <div className="flex items-center gap-8 p-8 bg-white/[0.02] border border-white/5 rounded-3xl">
                <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center border-2 border-primary/20">
                  <User size={40} className="text-primary" />
                </div>
                <div className="space-y-2">
                  <h2 className="text-3xl font-headline font-black uppercase tracking-tighter">
                    {user ? user.email.split("@")[0] : "Guest User"}
                  </h2>
                  <p className="text-white/40 text-xs font-headline uppercase tracking-widest">{user?.email || "Sign in to access your profile"}</p>
                  <div className="flex items-center gap-4 pt-2">
                    <div className="text-center">
                      <div className="text-primary font-headline font-black text-xl">{purchasedScripts.size}</div>
                      <div className="text-[8px] font-headline text-white/20 uppercase tracking-widest">Scripts</div>
                    </div>
                    <div className="w-[1px] h-8 bg-white/10" />
                    <div className="text-center">
                      <div className="text-primary font-headline font-black text-xl">{userLicenses.length}</div>
                      <div className="text-[8px] font-headline text-white/20 uppercase tracking-widest">Licenses</div>
                    </div>
                  </div>
                </div>
              </div>

              {token ? (
                <div className="grid grid-cols-1 gap-4">
                  {[
                    { icon: <Settings size={18} />, label: "Account Settings", desc: "Manage your email and security preferences" },
                    { icon: <Shield size={18} />, label: "API Access", desc: "Generate and manage your secret API keys" },
                    { icon: <History size={18} />, label: "Billing History", desc: "View and download your purchase invoices" },
                    { icon: <AlertCircle size={18} />, label: "Support Tickets", desc: "Get help from our engineering team" }
                  ].map((item, i) => (
                    <button key={i} className="flex items-center justify-between p-6 bg-white/[0.01] border border-white/5 rounded-2xl hover:bg-white/[0.03] transition-all group">
                      <div className="flex items-center gap-6">
                        <div className="text-white/20 group-hover:text-primary transition-colors">{item.icon}</div>
                        <div className="text-left">
                          <div className="text-sm font-headline font-bold uppercase tracking-widest">{item.label}</div>
                          <div className="text-[10px] text-white/40 font-light">{item.desc}</div>
                        </div>
                      </div>
                      <ChevronDown size={16} className="text-white/10 -rotate-90" />
                    </button>
                  ))}
                  <button 
                    onClick={handleLogout}
                    className="flex items-center justify-center gap-2 p-6 text-red-500/60 hover:text-red-500 transition-colors text-[10px] font-headline uppercase tracking-widest font-bold"
                  >
                    <LogOut size={16} /> Sign Out
                  </button>
                </div>
              ) : (
                <div className="p-10 bg-primary/5 border border-primary/20 rounded-3xl text-center space-y-6">
                  <Lock className="text-primary mx-auto" size={40} />
                  <div className="space-y-2">
                    <h3 className="text-xl font-headline font-bold uppercase">Authentication Required</h3>
                    <p className="text-white/40 text-xs max-w-sm mx-auto">
                      Please sign in with your email to view your purchase history, manage licenses, and update your profile settings.
                    </p>
                  </div>
                  <button 
                    onClick={() => setActiveTab("login")}
                    className="px-8 py-4 bg-primary text-black font-headline font-black uppercase tracking-widest text-[10px] rounded-xl hover:opacity-90 transition-all"
                  >
                    Go to Login
                  </button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {activeTab === "marketplace" && (
          /* Trust Section */
          <div className="mt-32 p-12 bg-primary/5 border border-primary/10 rounded-3xl text-center space-y-6">
            <h2 className="text-3xl font-headline font-black uppercase tracking-tighter">Enterprise Grade Security</h2>
            <p className="text-white/40 max-w-2xl mx-auto font-light">
              Every script in our marketplace undergoes rigorous security auditing and performance testing. 
              We ensure zero vulnerabilities and maximum efficiency for your production environments.
            </p>
            <div className="flex justify-center gap-12 pt-8 opacity-40 grayscale">
              <div className="font-headline font-bold uppercase tracking-widest">AES-256</div>
              <div className="font-headline font-bold uppercase tracking-widest">SSL SECURE</div>
              <div className="font-headline font-bold uppercase tracking-widest">AUDITED</div>
            </div>
          </div>
        )}
      </main>

      <footer className="py-20 border-t border-white/5 px-8 md:px-24 text-center">
        <div className="flex items-center justify-center gap-2 mb-8">
          <Terminal className="text-primary" size={20} />
          <span className="font-headline font-black uppercase tracking-tighter text-lg">ScriptX</span>
        </div>
        <p className="text-white/20 text-[10px] font-headline uppercase tracking-widest">
          &copy; 2026 SolutionX Engineering. All Rights Reserved.
        </p>
      </footer>
    </div>
  );
}
