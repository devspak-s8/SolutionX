import { motion } from "motion/react";
import { Search } from "lucide-react";

export default function Navbar({ currentPage }: { currentPage: string }) {
  const navItems = [
    { name: "Home", path: "#home" },
    { name: "Services", path: "#services" },
    { name: "Projects", path: "#projects" },
    { name: "Scripts", path: "#scripts" },
    { name: "Pricing", path: "#pricing" },
    { name: "Contact", path: "#contact" },
  ];

  return (
    <div className="fixed top-6 w-full z-50 px-4 flex justify-center pointer-events-none">
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="bg-surface/60 backdrop-blur-xl border border-outline-variant/10 flex justify-between items-center px-8 py-3 rounded-full w-full max-w-5xl pointer-events-auto shadow-2xl"
      >
        <div className="text-xl font-black tracking-tighter text-white font-headline">
          <a href="#home">SOLUTION<span className="text-primary">X</span></a>
        </div>
        
        <div className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <a 
              key={item.name}
              href={item.path} 
              className={`font-headline uppercase tracking-widest text-[10px] transition-colors ${
                currentPage === item.name.toLowerCase() ? "text-primary font-bold" : "text-on-surface-variant hover:text-white"
              }`}
            >
              {item.name}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <button className="text-on-surface-variant hover:text-primary transition-colors hidden sm:block">
            <Search size={18} />
          </button>
          <a href="#contact" className="kinetic-gradient text-surface font-headline uppercase tracking-widest text-[10px] px-5 py-2 rounded-full scale-95 active:scale-90 transition-all duration-300 font-bold">
            Connect
          </a>
        </div>
      </motion.nav>
    </div>
  );
}
