import { motion } from "motion/react";
import { useState } from "react";

const layers = [
  {
    id: "UI",
    label: "UI Interface Layer",
    title: "Interface Layer",
    description: "The final glass projection mapped to the user viewport.",
    color: "primary"
  },
  {
    id: "L3",
    label: "L3 — Logic",
    title: "Application Services",
    description: "API routing, service orchestration, and integration handling.",
    color: "secondary"
  },
  {
    id: "L2",
    label: "L2 — Core",
    title: "Domain Core",
    description: "Business logic, validation, and intelligent decision engines.",
    color: "primary"
  },
  {
    id: "L1",
    label: "L1 — Infra",
    title: "Infrastructure",
    description: "Cloud-native orchestration and global security protocols.",
    color: "secondary"
  }
];

const NeuralNetwork = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
    <svg className="w-full h-full">
      <defs>
        <radialGradient id="node-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.5" />
          <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0" />
        </radialGradient>
      </defs>
      {[...Array(20)].map((_, i) => (
        <motion.circle
          key={`node-${i}`}
          cx={`${Math.random() * 100}%`}
          cy={`${Math.random() * 100}%`}
          r="1.5"
          fill="currentColor"
          className="text-primary"
          animate={{
            opacity: [0.1, 0.6, 0.1],
            scale: [1, 2, 1],
          }}
          transition={{
            duration: 4 + Math.random() * 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </svg>
  </div>
);

const IsometricLayers = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="relative w-full h-[600px] flex items-center justify-center perspective-[1500px]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative w-[450px] h-[320px] transform-style-3d rotate-x-[60deg] rotate-z-[-35deg] -translate-y-12">
        {layers.map((layer, i) => (
          <motion.div
            key={layer.id}
            initial={{ opacity: 0, y: 100, z: -200 }}
            whileInView={{ 
              opacity: 1, 
              y: 0,
              z: i * (isHovered ? 100 : 80) 
            }}
            viewport={{ once: true }}
            transition={{ 
              duration: 1.5, 
              delay: i * 0.2,
              ease: [0.16, 1, 0.3, 1],
              z: { duration: 0.5, ease: "easeOut" }
            }}
            animate={{
              y: [0, -10, 0],
              z: i * (isHovered ? 100 : 80)
            }}
            // @ts-ignore
            transition={{
              y: {
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.5
              },
              z: { duration: 0.5, ease: "easeOut" }
            }}
            className="absolute inset-0 bg-surface-container-high/10 border border-white/10 backdrop-blur-xl rounded-2xl shadow-[0_0_60px_rgba(0,0,0,0.5)] flex flex-col p-10 group overflow-hidden"
            style={{ 
              transformStyle: 'preserve-3d',
              transform: `translateZ(${i * (isHovered ? 100 : 80)}px)` 
            }}
          >
          {/* Subtle Glass Highlight */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/[0.1] via-transparent to-transparent pointer-events-none" />
          
          {/* Layer Label */}
          <div className="relative z-10 flex justify-between items-start">
            <div className={`font-mono text-[10px] tracking-[0.4em] uppercase transition-colors duration-500 ${
              i === 3 ? "text-primary font-bold" : "text-white/40"
            }`}>
              {layer.label}
            </div>
            {i === 3 && (
              <div className="w-2.5 h-2.5 rounded-full bg-primary shadow-[0_0_15px_rgba(177,197,255,1)] animate-pulse" />
            )}
          </div>
          
          {/* Top Layer Mock UI */}
          {i === 3 && (
            <div className="mt-12 space-y-6 opacity-60">
              <div className="flex gap-3">
                <div className="h-2 w-16 bg-primary/40 rounded-full" />
                <div className="h-2 w-32 bg-white/10 rounded-full" />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="h-20 bg-white/5 rounded-xl border border-white/5" />
                <div className="h-20 bg-white/5 rounded-xl border border-white/5" />
                <div className="h-20 bg-white/5 rounded-xl border border-white/5" />
              </div>
              <div className="h-2 w-full bg-white/5 rounded-full" />
            </div>
          )}

          {/* Deeper Layers Content (Faint) */}
          {i < 3 && (
            <div className="mt-auto opacity-20">
              <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-white/20 to-transparent mb-3" />
              <div className="flex justify-between text-[7px] font-mono tracking-widest uppercase">
                <span>Core_Module_v0{i+1}</span>
                <span className="text-primary/60">Optimized</span>
              </div>
            </div>
          )}

          {/* Animated Scan Line */}
          <motion.div
            animate={{ y: ["-100%", "400%"] }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear", delay: i * 1.2 }}
            className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-primary/30 to-transparent pointer-events-none"
          />
        </motion.div>
      ))}
      
      {/* Vertical Data Connectors */}
      <div className="absolute inset-0 transform-style-3d pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ height: 0, opacity: 0 }}
            whileInView={{ height: 320, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2, delay: 1 }}
            className="absolute w-[1px] bg-gradient-to-b from-primary/0 via-primary/40 to-primary/0"
            style={{
              left: `${10 + Math.random() * 80}%`,
              top: `${10 + Math.random() * 80}%`,
              transform: 'rotateX(-90deg)',
              transformOrigin: 'top'
            }}
          />
        ))}
      </div>
      </div>
    </div>
  );
};

export default function ArchitecturalLayers() {
  return (
    <section className="py-32 px-8 md:px-24 bg-surface relative overflow-hidden">
      <NeuralNetwork />
      
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-12 relative z-10">
            <div className="space-y-4">
              <span className="font-headline text-primary tracking-[0.4em] uppercase text-xs">Engineering Stack</span>
              <h2 className="font-headline text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none">
                Architectural <br /> Layers.
              </h2>
              <p className="text-on-surface-variant text-xl font-light leading-relaxed max-w-md">
                Every project is delivered through a coordinated engineering stack — product UX, business logic, robust services, and data architecture designed for long-term scale.
              </p>
            </div>

            <div className="space-y-8">
              {layers.slice().reverse().map((layer, i) => (
                <motion.div
                  key={layer.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-6 group"
                >
                  <div className="font-headline text-2xl font-black text-primary/20 group-hover:text-primary transition-colors">
                    {layer.id}
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-headline font-bold uppercase tracking-tight text-lg">
                      {layer.title}
                    </h3>
                    <p className="text-on-surface-variant text-sm font-light">
                      {layer.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-primary/5 blur-[120px] rounded-full" />
            <IsometricLayers />
          </div>
        </div>
      </div>
    </section>
  );
}
