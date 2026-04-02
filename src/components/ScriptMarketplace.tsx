import { motion } from "motion/react";
import { ArrowLeft, Terminal, Zap, Shield, Download, Search, Filter } from "lucide-react";
import { useState, useEffect } from "react";

const scripts = [
  {
    id: "S-01",
    name: "Auto-Invoicer Pro",
    category: "FINANCE",
    price: "49",
    description: "Automated PDF generation and email dispatch for recurring billing cycles.",
    tech: "Python / Jinja2",
    rating: 4.9
  },
  {
    id: "S-02",
    name: "Market Scraper X",
    category: "INTELLIGENCE",
    price: "89",
    description: "High-performance multi-threaded scraper for e-commerce price monitoring.",
    tech: "Node.js / Puppeteer",
    rating: 4.8
  },
  {
    id: "S-03",
    name: "Cloud Backup Sync",
    category: "INFRA",
    price: "29",
    description: "Encrypted incremental backup script for AWS S3 and Google Cloud Storage.",
    tech: "Bash / OpenSSL",
    rating: 5.0
  },
  {
    id: "S-04",
    name: "Social Media Bot",
    category: "MARKETING",
    price: "59",
    description: "Automated posting and engagement scheduler for multi-platform campaigns.",
    tech: "Python / Selenium",
    rating: 4.7
  },
  {
    id: "S-05",
    name: "Log Analyzer",
    category: "DEV OPS",
    price: "19",
    description: "Real-time log parsing and anomaly detection with Slack notifications.",
    tech: "Go / Regex",
    rating: 4.9
  },
  {
    id: "S-06",
    name: "Database Migrator",
    category: "DATABASE",
    price: "79",
    description: "Zero-downtime schema migration tool for PostgreSQL and MySQL.",
    tech: "Rust / SQLx",
    rating: 5.0
  },
  {
    id: "S-07",
    name: "API Stress Tester",
    category: "DEV OPS",
    price: "39",
    description: "Distributed load testing tool for benchmarking high-concurrency REST APIs.",
    tech: "Go / Fasthttp",
    rating: 4.8
  },
  {
    id: "S-08",
    name: "SEO Audit Crawler",
    category: "MARKETING",
    price: "69",
    description: "Automated SEO analysis and technical audit generator for large domains.",
    tech: "Python / Scrapy",
    rating: 4.9
  },
  {
    id: "S-09",
    name: "Kubernetes Watcher",
    category: "INFRA",
    price: "99",
    description: "Real-time cluster monitoring and auto-scaling trigger for K8s deployments.",
    tech: "Go / Client-go",
    rating: 5.0
  }
];

const currencies = [
  { code: "USD", symbol: "$", rate: 1 },
  { code: "EUR", symbol: "€", rate: 0.92 },
  { code: "GBP", symbol: "£", rate: 0.79 },
  { code: "NGN", symbol: "₦", rate: 1500 },
];

export default function ScriptMarketplace({ onBack }: { onBack: () => void }) {
  const [search, setSearch] = useState("");
  const [selectedTech, setSelectedTech] = useState("All");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200]);
  const [currency, setCurrency] = useState(currencies[0]);

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

  const allTechs = ["All", ...new Set(scripts.flatMap(s => s.tech.split(" / ")))];

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredScripts.map((script, i) => (
            <motion.div
              key={script.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white/[0.02] border border-white/5 p-8 rounded-2xl hover:border-primary/30 transition-all group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Terminal size={80} />
              </div>

              <div className="relative z-10 space-y-6">
                <div className="flex justify-between items-start">
                  <span className="text-[9px] font-headline text-primary tracking-widest uppercase bg-primary/5 px-2 py-1 rounded">
                    {script.category}
                  </span>
                  <span className="text-xl font-headline font-black">
                    {currency.symbol}{convertPrice(script.price)}
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-headline font-bold uppercase mb-2">{script.name}</h3>
                  <p className="text-white/40 text-sm font-light leading-relaxed line-clamp-2">
                    {script.description}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                  <div className="flex items-center gap-2 text-[10px] font-headline text-white/40">
                    <Shield size={12} className="text-green-500" />
                    Verified
                  </div>
                  <div className="text-[10px] font-headline text-white/40">
                    {script.tech}
                  </div>
                </div>

                <button className="w-full py-3 bg-white text-black font-headline font-bold uppercase tracking-widest text-[10px] flex items-center justify-center gap-2 hover:bg-primary transition-colors">
                  <Download size={14} />
                  Download Script
                </button>
              </div>
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
