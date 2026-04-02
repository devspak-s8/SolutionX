import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Check, Globe } from "lucide-react";

const currencies = [
  { code: "USD", symbol: "$", rate: 1 },
  { code: "EUR", symbol: "€", rate: 0.92 },
  { code: "GBP", symbol: "£", rate: 0.79 },
  { code: "NGN", symbol: "₦", rate: 1500 },
];

const plans = [
  {
    name: "Automation Starter",
    price: 499,
    description: "Perfect for small businesses looking to eliminate repetitive tasks.",
    features: ["Invoicing Automation", "Basic Data Entry Bot", "Weekly Reporting", "Email Support"],
  },
  {
    name: "Enterprise Solution",
    price: 1999,
    description: "Full-scale custom software and AI integration for growing teams.",
    features: ["Custom Web Platform", "AI Agentic Workflows", "Priority Support", "Dedicated Architect", "Unlimited Nodes"],
    popular: true,
  },
  {
    name: "Technical Mentorship",
    price: 299,
    description: "One-on-one guidance to level up your team's technical capabilities.",
    features: ["4 Sessions / Month", "Personalized Curriculum", "Code Reviews", "Slack Access"],
  },
];

export default function Pricing() {
  const [currency, setCurrency] = useState(currencies[0]);

  useEffect(() => {
    const detectCurrency = async () => {
      try {
        // Mocking a fetch to a geolocation service
        // In a real app: const res = await fetch('https://ipapi.co/json/');
        // For this demo, we'll use the browser's locale as a hint
        const locale = navigator.language || "en-US";
        let detectedCode = "USD";
        
        if (locale.includes("GB")) detectedCode = "GBP";
        else if (locale.includes("NG")) detectedCode = "NGN";
        else if (locale.includes("DE") || locale.includes("FR") || locale.includes("IT") || locale.includes("ES")) detectedCode = "EUR";
        
        const detectedCurrency = currencies.find(c => c.code === detectedCode) || currencies[0];
        setCurrency(detectedCurrency);
      } catch (e) {
        console.error("Currency detection failed, defaulting to USD", e);
        setCurrency(currencies[0]);
      }
    };
    detectCurrency();
  }, []);

  const convertPrice = (price: number) => {
    return Math.round(price * currency.rate).toLocaleString();
  };

  return (
    <section id="pricing" className="py-32 px-8 md:px-24 bg-surface relative overflow-hidden">
      <div className="absolute inset-0 data-scrim opacity-10 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="space-y-4">
            <span className="font-headline text-secondary tracking-[0.4em] uppercase text-xs">Investment</span>
            <h2 className="font-headline text-4xl md:text-6xl font-black uppercase tracking-tighter">Transparent Pricing.</h2>
          </div>
          
          <div className="flex items-center gap-4 p-2 bg-surface-container rounded-full border border-outline-variant/10">
            <Globe size={16} className="text-on-surface-variant ml-2" />
            {currencies.map((c) => (
              <button
                key={c.code}
                onClick={() => setCurrency(c)}
                className={`px-4 py-1.5 rounded-full font-headline text-[10px] uppercase tracking-widest transition-all ${
                  currency.code === c.code ? "bg-primary text-surface font-bold" : "text-on-surface-variant hover:text-white"
                }`}
              >
                {c.code}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className={`p-10 border flex flex-col h-full relative group transition-all duration-500 ${
                plan.popular 
                  ? "bg-surface-container-highest border-primary shadow-[0_0_30px_rgba(177,197,255,0.1)]" 
                  : "bg-surface-container-low border-outline-variant/10 hover:border-outline-variant/30"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-surface px-4 py-1 font-headline text-[8px] uppercase tracking-[0.3em] font-bold">
                  Most Impactful
                </div>
              )}

              <div className="mb-8">
                <div className="text-[10px] font-headline uppercase tracking-widest text-on-surface-variant/60 mb-2">{plan.name}</div>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-black font-headline tracking-tighter">
                    {currency.symbol}{convertPrice(plan.price)}
                  </span>
                  <span className="text-xs text-on-surface-variant/40 font-headline uppercase tracking-widest">/ Project</span>
                </div>
              </div>

              <p className="text-on-surface-variant text-sm font-light leading-relaxed mb-8">
                {plan.description}
              </p>

              <div className="space-y-4 mb-12 flex-grow">
                {plan.features.map((feature, j) => (
                  <div key={j} className="flex items-center gap-3 text-xs text-on-surface-variant/80">
                    <Check size={14} className="text-primary shrink-0" />
                    <span className="font-light">{feature}</span>
                  </div>
                ))}
              </div>

              <button className={`w-full py-4 font-headline uppercase tracking-widest text-[10px] font-bold transition-all ${
                plan.popular 
                  ? "kinetic-gradient text-surface hover:opacity-90" 
                  : "bg-surface-container-high text-on-surface hover:bg-surface-container-highest border border-outline-variant/20"
              }`}>
                Initiate Protocol
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
