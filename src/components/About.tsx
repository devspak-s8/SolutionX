import { motion } from "motion/react";

export default function About() {
  return (
    <section id="about" className="py-32 px-8 md:px-24 bg-surface-container-low/50">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <div className="space-y-8">
          <div className="space-y-4">
            <span className="font-headline text-primary tracking-[0.4em] uppercase text-xs">Our Story</span>
            <h2 className="font-headline text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none">
              Engineering <br /> The Future.
            </h2>
          </div>
          
          <div className="space-y-6 text-on-surface-variant text-lg font-light leading-relaxed">
            <p>
              SolutionX was born from a simple realization: the tools we use to manage our digital lives are outdated. We build interfaces that don't just display data, but understand it.
            </p>
            <p>
              Our team of architects, engineers, and designers is dedicated to creating the next generation of kinetic interfaces. We believe in speed, precision, and the power of human intuition.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 pt-8 border-t border-outline-variant/10">
            <div>
              <div className="text-4xl font-headline font-black text-primary">12+</div>
              <div className="text-xs font-headline uppercase tracking-widest text-on-surface-variant/40 mt-1">Global Nodes</div>
            </div>
            <div>
              <div className="text-4xl font-headline font-black text-primary">99.9%</div>
              <div className="text-xs font-headline uppercase tracking-widest text-on-surface-variant/40 mt-1">System Uptime</div>
            </div>
          </div>
        </div>

        <div className="relative aspect-square">
          <div className="absolute inset-0 kinetic-gradient opacity-10 blur-[100px] rounded-full animate-pulse" />
          <div className="relative h-full w-full border border-outline-variant/20 p-8 flex items-center justify-center">
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-primary" />
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-primary" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-primary" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-primary" />
            
            <div className="text-center space-y-4">
              <div className="text-8xl font-headline font-black text-white/5">X</div>
              <p className="font-headline uppercase tracking-[0.5em] text-xs text-primary">Core Protocol v4.2</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
