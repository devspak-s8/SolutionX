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
      {[...Array(15)].map((_, i) => {
        const yStart = 50 + i * 70;
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
                duration: 4 + i * 1.2,
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
                dur={`${3 + i * 1.5}s`}
                repeatCount="indefinite"
                path={pathD}
              />
            </motion.circle>

            {/* Branching paths */}
            {i % 4 === 0 && (
              <motion.path
                d={`M ${400 + i * 40} ${200 + i * 80} L ${500 + i * 40} ${100 + i * 80}`}
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
                className="text-primary/20"
                strokeDasharray="5, 5"
              />
            )}
            
            {/* Interconnecting vertical lines */}
            {i % 3 === 0 && (
              <motion.path
                d={`M ${300 + i * 50} ${50 + i * 80} L ${300 + i * 50} ${50 + (i + 2) * 80}`}
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
                className="text-primary/10"
              />
            )}
          </g>
        );
      })}
    </svg>
  </div>
);

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center items-start px-8 md:px-24 pt-20 overflow-hidden">
      <div className="absolute inset-0 data-scrim -z-10 opacity-40" />
      <HeroDataFlow />
      
      {/* Background Glows - Reduced */}
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/5 blur-[80px] rounded-full" />
      <div className="absolute bottom-24 -left-24 w-48 h-48 bg-secondary/5 blur-[60px] rounded-full" />

      <div className="max-w-5xl space-y-6 relative z-10">
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
          className="font-headline text-6xl md:text-8xl lg:text-[10rem] leading-[0.85] font-black tracking-tighter uppercase"
        >
          ENGINEERING <br />
          <span className="text-kinetic">THE IMPACT</span>
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end w-full">
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="md:col-span-6 text-on-surface-variant text-lg md:text-xl font-light leading-relaxed max-w-xl"
          >
            We build high-performance software, mobile automations, and AI systems tailored precisely for your business. SolutionX bridges the gap between raw complexity and human impact.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="md:col-span-6 flex flex-wrap gap-4 md:justify-end"
          >
            <button className="px-8 py-4 bg-primary text-surface font-headline uppercase tracking-widest text-xs hover:opacity-90 transition-all duration-300 flex items-center gap-3 group font-bold">
              Quick Call
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-8 py-4 bg-surface-container-highest font-headline uppercase tracking-widest text-xs hover:bg-white/5 transition-all duration-300 flex items-center gap-3 group">
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
