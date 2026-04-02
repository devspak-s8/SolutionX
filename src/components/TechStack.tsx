import { motion } from "motion/react";
import { 
  Code2, 
  Cpu, 
  Database, 
  Globe, 
  Layers, 
  Layout, 
  Server, 
  Settings, 
  ShieldCheck, 
  Terminal, 
  Wind,
  Zap
} from "lucide-react";

const techStack = [
  { name: "Copilot SDK", icon: <Cpu size={20} />, detail: "AI-driven code generation and intelligent pair programming integration." },
  { name: "AJAX", icon: <Zap size={20} />, detail: "Asynchronous data fetching for seamless, no-reload user experiences." },
  { name: "Linux", icon: <Terminal size={20} />, detail: "Robust, secure, and scalable server environments for mission-critical apps." },
  { name: "Python", icon: <Code2 size={20} />, detail: "The backbone of our automation and data science pipelines." },
  { name: "Django", icon: <ShieldCheck size={20} />, detail: "Secure, batteries-included web framework for enterprise-grade backends." },
  { name: "FastAPI", icon: <Zap size={20} />, detail: "High-performance, modern API development with asynchronous support." },
  { name: "React", icon: <Layout size={20} />, detail: "Building fluid, component-based interfaces with high reactivity." },
  { name: "PostgreSQL", icon: <Database size={20} />, detail: "Advanced relational database for complex data modeling and integrity." },
  { name: "Azure", icon: <Globe size={20} />, detail: "Enterprise cloud infrastructure for global scaling and hybrid solutions." },
  { name: "Selenium", icon: <Settings size={20} />, detail: "Automated browser interaction for testing and complex web scraping." },
  { name: "LangGraph", icon: <Layers size={20} />, detail: "Orchestrating multi-agent AI workflows with stateful reasoning." },
  { name: "Docker", icon: <Server size={20} />, detail: "Containerization for consistent deployment across any environment." },
  { name: "JavaScript", icon: <Code2 size={20} />, detail: "Dynamic client-side logic and full-stack Node.js development." },
  { name: "REST APIs", icon: <Globe size={20} />, detail: "Standardized, scalable communication between distributed systems." },
  { name: "Tailwind", icon: <Wind size={20} />, detail: "Utility-first CSS for rapid, precise, and responsive UI design." },
];

export default function TechStack() {
  return (
    <section className="py-24 bg-surface-container-low/50 border-y border-outline-variant/10 overflow-hidden">
      <div className="px-8 md:px-24 max-w-7xl mx-auto mb-12">
        <div className="space-y-4">
          <span className="font-headline text-primary tracking-[0.4em] uppercase text-xs">Our Arsenal</span>
          <h2 className="font-headline text-3xl md:text-5xl font-black uppercase tracking-tighter">Technological Core.</h2>
        </div>
      </div>

      <div className="relative flex overflow-x-hidden">
        <div className="flex animate-marquee whitespace-nowrap py-4">
          {[...techStack, ...techStack].map((tech, i) => (
            <motion.div
              key={`${tech.name}-${i}`}
              whileHover={{ y: -5, borderColor: "rgba(var(--color-primary-rgb), 0.3)" }}
              className="inline-block w-[280px] mx-4 p-6 bg-surface-container border border-outline-variant/10 rounded-xl transition-all group whitespace-normal"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-surface-container-high rounded-lg text-primary group-hover:text-white transition-colors">
                  {tech.icon}
                </div>
                <h3 className="font-headline font-bold uppercase text-xs tracking-widest">{tech.name}</h3>
              </div>
              <p className="text-[10px] text-on-surface-variant leading-relaxed font-light opacity-60 group-hover:opacity-100 transition-opacity">
                {tech.detail}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
