import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, Terminal, Zap, Shield, Download, Search, ChevronDown, ChevronUp, History, Package, Terminal as TerminalIcon, Star, MessageSquare, User, Send } from "lucide-react";
import { useState, useEffect, useMemo } from "react";

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
}

const initialScripts: Script[] = [
  {
    id: "S-01",
    name: "Auto-Invoicer Pro",
    category: "FINANCE",
    price: "49",
    description: "Automated PDF generation and email dispatch for recurring billing cycles.",
    tech: "Python / Jinja2",
    installation: "pip install solutionx-invoicer\npython -m invoicer.setup",
    dependencies: ["reportlab", "jinja2", "boto3"],
    history: [
      { version: "v2.1.0", date: "2026-03-15", note: "Added multi-currency support" },
      { version: "v2.0.4", date: "2026-02-10", note: "Security patch for PDF generation" }
    ],
    reviews: [
      { id: "r1", user: "DevOps_Guru", rating: 5, comment: "Saved us hours of manual work every month. The Jinja2 templates are very flexible.", date: "2026-03-20" },
      { id: "r2", user: "FinanceLead", rating: 4, comment: "Great tool, but setup took a bit longer than expected on Windows.", date: "2026-03-22" }
    ]
  },
  {
    id: "S-02",
    name: "Market Scraper X",
    category: "INTELLIGENCE",
    price: "89",
    description: "High-performance multi-threaded scraper for e-commerce price monitoring.",
    tech: "Node.js / Puppeteer",
    installation: "npm install @solutionx/scraper-x\nnpx scraper-x init",
    dependencies: ["puppeteer-core", "axios", "cheerio"],
    history: [
      { version: "v4.2.1", date: "2026-03-20", note: "Improved anti-bot bypass" },
      { version: "v4.1.0", date: "2026-01-05", note: "Added headless mode optimization" }
    ],
    reviews: [
      { id: "r3", user: "DataMiner", rating: 5, comment: "The anti-bot bypass is incredible. Worth every penny.", date: "2026-03-25" }
    ]
  },
  {
    id: "S-03",
    name: "Cloud Backup Sync",
    category: "INFRA",
    price: "29",
    description: "Encrypted incremental backup script for AWS S3 and Google Cloud Storage.",
    tech: "Bash / OpenSSL",
    installation: "curl -sSL https://get.solutionx.io/backup | bash",
    dependencies: ["aws-cli", "gsutil", "openssl"],
    history: [
      { version: "v1.5.0", date: "2026-03-01", note: "Added Azure Blob support" },
      { version: "v1.4.2", date: "2025-12-12", note: "Fixed symlink recursion bug" }
    ],
    reviews: [
      { id: "r4", user: "SysAdmin_Joe", rating: 5, comment: "Simple, effective, and secure. Exactly what I needed for our small cluster.", date: "2026-03-10" },
      { id: "r5", user: "CloudArchitect", rating: 5, comment: "The incremental logic is solid. Minimal bandwidth usage.", date: "2026-03-15" }
    ]
  },
  {
    id: "S-04",
    name: "Social Media Bot",
    category: "MARKETING",
    price: "59",
    description: "Automated posting and engagement scheduler for multi-platform campaigns.",
    tech: "Python / Selenium",
    installation: "pip install solutionx-social-bot\nsetup-social-keys",
    dependencies: ["selenium", "webdriver-manager", "pillow"],
    history: [
      { version: "v3.0.0", date: "2026-02-28", note: "Major UI overhaul and API integration" },
      { version: "v2.8.5", date: "2026-01-15", note: "Fixed Instagram login flow" }
    ],
    reviews: [
      { id: "r6", user: "MarketingPro", rating: 4, comment: "Very powerful, but requires some Python knowledge to customize the engagement logic.", date: "2026-03-05" }
    ]
  },
  {
    id: "S-05",
    name: "Log Analyzer",
    category: "DEV OPS",
    price: "19",
    description: "Real-time log parsing and anomaly detection with Slack notifications.",
    tech: "Go / Regex",
    installation: "go install github.com/solutionx/log-analyzer@latest",
    dependencies: ["slack-go", "prometheus-client"],
    history: [
      { version: "v1.2.4", date: "2026-03-10", note: "Added JSON log support" },
      { version: "v1.1.0", date: "2025-11-20", note: "Initial public release" }
    ],
    reviews: [
      { id: "r7", user: "SRE_Team", rating: 5, comment: "Blazing fast. The Slack integration is a lifesaver for on-call rotations.", date: "2026-03-18" }
    ]
  },
  {
    id: "S-06",
    name: "Database Migrator",
    category: "DATABASE",
    price: "79",
    description: "Zero-downtime schema migration tool for PostgreSQL and MySQL.",
    tech: "Rust / SQLx",
    installation: "cargo install solutionx-migrator",
    dependencies: ["sqlx", "tokio", "serde"],
    history: [
      { version: "v0.9.2", date: "2026-03-25", note: "Added dry-run mode" },
      { version: "v0.8.0", date: "2026-02-05", note: "Performance optimization for large schemas" }
    ],
    reviews: [
      { id: "r8", user: "DBA_Expert", rating: 5, comment: "The dry-run mode is essential. Rust's safety really shines here.", date: "2026-03-28" }
    ]
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
  const [expandedId, setExpandedId] = useState<string | null>(null);

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

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
    // Reset review form when changing expansion
    setNewReviewRating(5);
    setNewReviewComment("");
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

      setNewReviewComment("");
      setNewReviewRating(5);
      setIsSubmittingReview(false);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-primary/30">
      {/* Marketplace Header */}
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
        
        <div className="hidden md:flex items-center gap-6">
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
          <div className="w-[1px] h-4 bg-white/10" />
          <div className="flex items-center gap-6 text-[10px] font-headline uppercase tracking-widest text-white/40">
            <a href="#" className="hover:text-primary transition-colors">Library</a>
            <button className="bg-primary text-black px-4 py-2 font-bold hover:opacity-90 transition-opacity">
              My Account
            </button>
          </div>
        </div>
      </nav>

      <main className="py-20 px-8 md:px-24 max-w-7xl mx-auto">
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
              className={`bg-white/[0.02] border border-white/5 rounded-2xl transition-all group relative overflow-hidden ${
                expandedId === script.id ? "border-primary/50 ring-1 ring-primary/20" : "hover:border-primary/30"
              }`}
            >
              <div 
                className="p-8 cursor-pointer"
                onClick={() => toggleExpand(script.id)}
              >
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Terminal size={80} />
                </div>

                <div className="relative z-10 space-y-6">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-4">
                      <span className="text-[9px] font-headline text-primary tracking-widest uppercase bg-primary/5 px-2 py-1 rounded">
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
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-xl font-headline font-black">
                        {currency.symbol}{convertPrice(script.price)}
                      </span>
                      {expandedId === script.id ? <ChevronUp size={20} className="text-primary" /> : <ChevronDown size={20} className="text-white/20" />}
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
                        <Download size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <AnimatePresence>
                {expandedId === script.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden border-t border-white/5 bg-white/[0.01]"
                  >
                    <div className="p-8 grid grid-cols-1 lg:grid-cols-4 gap-12">
                      {/* Installation */}
                      <div className="space-y-4">
                        <div className="flex items-center gap-2 text-primary">
                          <TerminalIcon size={16} />
                          <h4 className="text-[10px] font-headline uppercase tracking-[0.2em] font-bold">Installation</h4>
                        </div>
                        <div className="bg-black/40 rounded-xl p-4 border border-white/5 font-mono text-xs text-white/60 leading-relaxed">
                          <pre className="whitespace-pre-wrap">{script.installation}</pre>
                        </div>
                      </div>

                      {/* Dependencies */}
                      <div className="space-y-4">
                        <div className="flex items-center gap-2 text-primary">
                          <Package size={16} />
                          <h4 className="text-[10px] font-headline uppercase tracking-[0.2em] font-bold">Dependencies</h4>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {script.dependencies?.map(dep => (
                            <span key={dep} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-headline text-white/40">
                              {dep}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* History */}
                      <div className="space-y-4">
                        <div className="flex items-center gap-2 text-primary">
                          <History size={16} />
                          <h4 className="text-[10px] font-headline uppercase tracking-[0.2em] font-bold">Update History</h4>
                        </div>
                        <div className="space-y-4">
                          {script.history?.map((entry, idx) => (
                            <div key={idx} className="flex gap-4 items-start">
                              <div className="text-[10px] font-headline text-primary font-bold whitespace-nowrap">{entry.version}</div>
                              <div>
                                <div className="text-[10px] font-headline text-white/20 uppercase tracking-widest mb-1">{entry.date}</div>
                                <div className="text-xs text-white/40 font-light">{entry.note}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Reviews */}
                      <div className="space-y-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-primary">
                            <MessageSquare size={16} />
                            <h4 className="text-[10px] font-headline uppercase tracking-[0.2em] font-bold">User Reviews</h4>
                          </div>
                          <span className="text-[10px] font-headline text-white/20 uppercase tracking-widest">{script.reviews.length} total</span>
                        </div>

                        {/* Review Form */}
                        <div className="bg-white/[0.03] border border-white/5 rounded-xl p-4 space-y-4">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-headline text-white/40 uppercase tracking-widest">Rate this script</span>
                            <StarRating 
                              rating={newReviewRating} 
                              size={14} 
                              interactive 
                              onRate={setNewReviewRating} 
                            />
                          </div>
                          <div className="relative">
                            <textarea
                              value={newReviewComment}
                              onChange={(e) => setNewReviewComment(e.target.value)}
                              placeholder="Write your review..."
                              className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-xs outline-none focus:border-primary transition-colors min-h-[80px] resize-none"
                            />
                            <button
                              onClick={() => handleAddReview(script.id)}
                              disabled={isSubmittingReview || !newReviewComment.trim()}
                              className="absolute bottom-3 right-3 p-2 bg-primary text-black rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              {isSubmittingReview ? <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" /> : <Send size={14} />}
                            </button>
                          </div>
                        </div>

                        {/* Review List */}
                        <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                          {script.reviews.map((review) => (
                            <div key={review.id} className="space-y-2 border-b border-white/5 pb-4 last:border-0">
                              <div className="flex justify-between items-center">
                                <div className="flex items-center gap-2">
                                  <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center">
                                    <User size={10} className="text-white/40" />
                                  </div>
                                  <span className="text-[10px] font-headline font-bold text-white/60">{review.user}</span>
                                </div>
                                <span className="text-[8px] font-headline text-white/20 uppercase tracking-widest">{review.date}</span>
                              </div>
                              <StarRating rating={review.rating} size={10} />
                              <p className="text-xs text-white/40 font-light leading-relaxed italic">
                                "{review.comment}"
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Trust Section */}
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
