import { Terminal, Code } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-surface-container-low w-full border-t border-outline-variant/10 grid grid-cols-1 md:grid-cols-2 gap-8 px-12 py-16">
      <div className="space-y-6">
        <div className="text-lg font-bold text-on-surface-variant font-headline uppercase">SOLUTION<span className="text-primary">X</span> TERMINAL</div>
        <p className="text-[10px] tracking-widest text-on-surface-variant/40 uppercase max-w-xs">
          © 2024 DIMROID TERMINAL. ALL RIGHTS RESERVED.
        </p>
        <div className="flex gap-4">
          <a href="#" className="w-10 h-10 flex items-center justify-center bg-surface-container rounded-full hover:text-primary transition-colors border border-outline-variant/20">
            <Terminal size={16} />
          </a>
          <a href="#" className="w-10 h-10 flex items-center justify-center bg-surface-container rounded-full hover:text-primary transition-colors border border-outline-variant/20">
            <Code size={16} />
          </a>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="font-headline text-[10px] tracking-[0.2em] uppercase text-on-surface-variant/30 mb-4">Ecosystem</div>
          <ul className="space-y-2">
            {["Documentation", "Github", "System Status"].map(link => (
              <li key={link}>
                <a href="#" className="font-headline text-xs tracking-widest uppercase text-on-surface-variant/60 hover:text-primary transition-colors">
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="space-y-4">
          <div className="font-headline text-[10px] tracking-[0.2em] uppercase text-on-surface-variant/30 mb-4">Company</div>
          <ul className="space-y-2">
            {["Privacy Policy", "Terms of Service", "Contact"].map(link => (
              <li key={link}>
                <a href="#" className="font-headline text-xs tracking-widest uppercase text-on-surface-variant/60 hover:text-primary transition-colors">
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
