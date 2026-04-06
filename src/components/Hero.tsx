import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

const HeroDataFlow = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
    <svg className="w-full h-full">
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      {[...Array(8)].map((_, i) => {
        const yStart = 100 + i * 120;
        const pathD = `M ${-100} ${yStart} C ${200 + i * 80} ${yStart}, ${400 + i * 40} ${200 + i * 80}, ${800 + i * 80} ${200 + i * 80} S ${1200 + i * 40} ${400 + i * 70}, 2000 ${400 + i * 70}`;
        
        return (
          <g key={i}>
            {/* Base Path */}
            <motion.path
              d={pathD}
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
              className="text-primary/10"
            />
            {/* Animated Flow Line */}
            <motion.path
              d={pathD}
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
              className="text-primary"
              strokeDasharray="15, 200"
              filter="url(#glow)"
              animate={{ strokeDashoffset: [400, 0] }}
              transition={{
                duration: 6 + i * 2,
                repeat: Infinity,
                ease: "linear"
              }}
            />
            {/* Data Packets (Circles) */}
            <motion.circle
              r="2"
              className="fill-primary"
              filter="url(#glow)"
            >
              <animateMotion
                dur={`${5 + i * 2}s`}
                repeatCount="indefinite"
                path={pathD}
              />
            </motion.circle>
          </g>
        );
      })}
    </svg>
  </div>
);

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center items-start px-6 md:px-24 pt-20 overflow-hidden">
      <div className="absolute inset-0 data-scrim -z-10 opacity-40" />
      <HeroDataFlow />
      
      {/* Background Glows - Reduced */}
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/5 blur-[80px] rounded-full" />
      <div className="absolute bottom-24 -left-24 w-48 h-48 bg-secondary/5 blur-[60px] rounded-full" />

      <div className="max-w-7xl w-full space-y-8 md:space-y-10 relative z-10">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-3 px-3 py-1 bg-surface-container-high border-l-2 border-primary"
        >
          <span className="font-headline text-[10px] tracking-[0.3em] uppercase text-primary">Agency Protocol Active</span>
          <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="font-headline text-5xl sm:text-6xl md:text-8xl lg:text-[12rem] xl:text-[14rem] leading-[0.9] md:leading-[0.8] font-black tracking-tighter uppercase"
        >
          ENGINEERING <br />
          <span className="text-kinetic">THE IMPACT</span>
        </motion.h1>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 md:gap-12 w-full">
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="text-on-surface-variant text-base md:text-2xl font-light leading-relaxed max-w-3xl"
          >
            We build high-performance software, mobile automations, and AI systems tailored precisely for your business. SolutionX bridges the gap between raw complexity and human impact.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="flex flex-col sm:flex-row gap-4 shrink-0"
          >
            <button className="px-8 py-4 md:px-10 md:py-5 bg-primary text-surface font-headline uppercase tracking-widest text-[10px] md:text-xs hover:opacity-90 transition-all duration-300 flex items-center justify-center gap-3 group font-bold w-full sm:w-auto">
              Quick Call
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-8 py-4 md:px-10 md:py-5 bg-surface-container-highest font-headline uppercase tracking-widest text-[10px] md:text-xs hover:bg-white/5 transition-all duration-300 flex items-center justify-center gap-3 group w-full sm:w-auto">
              View Solutions
            </button>
          </motion.div>
        </div>
      </div>

      {/* Kinetic Data Stripes */}
      <div className="absolute right-0 bottom-0 flex gap-1 opacity-20">
        <div className="w-2 h-32 bg-primary/50" />
        <div className="w-2 h-48 bg-primary/30" />
        <div className="w-2 h-24 bg-primary/70" />
      </div>
    </section>
  );
}
