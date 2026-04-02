import { motion } from "motion/react";

const layers = [
  {
    id: "UI",
    label: "UI Interface Layer",
    title: "Interface Layer",
    description: "The final glass projection mapped to the user viewport.",
    color: "primary"
  },
  {
    id: "L4",
    label: "L4 — Logic",
    title: "Application Services",
    description: "API routing, service orchestration, and integration handling.",
    color: "secondary"
  },
  {
    id: "L3",
    label: "L3 — Core",
    title: "Domain Core",
    description: "Business logic, validation, workflows, and intelligent decisions.",
    color: "primary"
  },
  {
    id: "L2",
    label: "L2 — Data",
    title: "Data Fabric",
    description: "Data modelling, persistence, and analytics-ready structures.",
    color: "secondary"
  },
  {
    id: "L1",
    label: "L1 — Infra",
    title: "Infrastructure",
    description: "Cloud-native orchestration, security protocols, and global scaling.",
    color: "primary"
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
      {[...Array(12)].map((_, i) => (
        <motion.line
          key={`link-${i}`}
          x1={`${Math.random() * 100}%`}
          y1={`${Math.random() * 100}%`}
          x2={`${Math.random() * 100}%`}
          y2={`${Math.random() * 100}%`}
          stroke="currentColor"
          strokeWidth="0.5"
          className="text-primary/10"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: [0, 1, 0] }}
          transition={{
            duration: 7 + Math.random() * 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </svg>
  </div>
);

const IsometricLayers = () => (
  <div className="relative w-full h-[600px] flex items-center justify-center perspective-[1200px]">
    <div className="relative w-[400px] h-[280px] transform-style-3d rotate-x-[55deg] rotate-z-[-35deg] -translate-y-16">
      {layers.map((layer, i) => (
        <motion.div
          key={layer.id}
          initial={{ opacity: 0, z: -200 }}
          whileInView={{ opacity: 1, z: i * 50 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: i * 0.15 }}
          className="absolute inset-0 bg-surface-container-high/20 border border-white/5 backdrop-blur-md rounded-xl shadow-[0_0_50px_rgba(0,0,0,0.4)] flex flex-col p-8 group overflow-hidden"
          style={{ transform: `translateZ(${i * 50}px)` }}
        >
          {/* Subtle Glass Highlight */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/[0.07] via-transparent to-transparent pointer-events-none" />
          
          {/* Layer Label */}
          <div className="relative z-10 flex justify-between items-start">
            <div className={`font-mono text-[9px] tracking-[0.3em] uppercase transition-colors duration-500 ${
              i === 4 ? "text-primary font-bold" : "text-white/30"
            }`}>
              {layer.label}
            </div>
            {i === 4 && (
              <div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_12px_rgba(177,197,255,1)] animate-pulse" />
            )}
          </div>
          
          {/* Top Layer Mock UI */}
          {i === 4 && (
            <div className="mt-12 space-y-4 opacity-40">
              <div className="flex gap-2">
                <div className="h-1.5 w-12 bg-primary/40 rounded-full" />
                <div className="h-1.5 w-24 bg-white/10 rounded-full" />
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div className="h-16 bg-white/5 rounded-lg border border-white/5" />
                <div className="h-16 bg-white/5 rounded-lg border border-white/5" />
                <div className="h-16 bg-white/5 rounded-lg border border-white/5" />
              </div>
              <div className="h-1.5 w-full bg-white/5 rounded-full" />
            </div>
          )}

          {/* Deeper Layers Content (Faint) */}
          {i < 4 && (
            <div className="mt-auto opacity-10">
              <div className="h-[1px] w-full bg-white/20 mb-2" />
              <div className="flex justify-between text-[6px] font-mono tracking-widest uppercase">
                <span>System_Node_0{i+1}</span>
                <span>Active</span>
              </div>
            </div>
          )}

          {/* Animated Scan Line */}
          <motion.div
            animate={{ y: ["-100%", "300%"] }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear", delay: i * 0.8 }}
            className="absolute inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent pointer-events-none"
          />
        </motion.div>
      ))}
      
      {/* Vertical Data Connectors */}
      <div className="absolute inset-0 transform-style-3d pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-[0.5px] bg-gradient-to-b from-primary/0 via-primary/20 to-primary/0"
            style={{
              height: '250px',
              left: `${15 + Math.random() * 70}%`,
              top: `${15 + Math.random() * 70}%`,
              transform: 'rotateX(-90deg)',
              transformOrigin: 'top'
            }}
          />
        ))}
      </div>
    </div>
  </div>
);

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
