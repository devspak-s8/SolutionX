import { motion } from "motion/react";

export default function BackgroundEffect() {
  return (
    <div className="fixed inset-0 -z-20 overflow-hidden pointer-events-none">
      {/* Grid Base */}
      <div className="absolute inset-0 data-scrim opacity-20" />
      
      {/* Animated Circuit Lines */}
      <svg className="absolute inset-0 w-full h-full opacity-20">
        <defs>
          <pattern id="circuit-pattern" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
            {/* Horizontal and Vertical Lines */}
            <path d="M 0 100 L 200 100 M 100 0 L 100 200" fill="none" stroke="currentColor" strokeWidth="0.2" className="text-primary/30" />
            
            {/* Complex Circuit Paths */}
            <path d="M 20 20 L 60 20 L 80 40 L 80 80 L 120 80 L 140 100" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-primary/40" />
            <path d="M 180 180 L 140 180 L 120 160 L 120 120 L 80 120 L 60 100" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-secondary/40" />
            
            {/* Animated Pulses on Paths */}
            <motion.path
              d="M 20 20 L 60 20 L 80 40 L 80 80 L 120 80 L 140 100"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              className="text-primary"
              strokeDasharray="10, 190"
              animate={{ strokeDashoffset: [200, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            />
            <motion.path
              d="M 180 180 L 140 180 L 120 160 L 120 120 L 80 120 L 60 100"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              className="text-secondary"
              strokeDasharray="10, 190"
              animate={{ strokeDashoffset: [0, 200] }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
            />

            {/* Nodes */}
            <circle cx="20" cy="20" r="1.5" className="fill-primary" />
            <circle cx="180" cy="180" r="1.5" className="fill-secondary" />
            <motion.circle
              cx="80" cy="80" r="2"
              className="fill-primary"
              animate={{ opacity: [0.2, 1, 0.2] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.circle
              cx="120" cy="120" r="2"
              className="fill-secondary"
              animate={{ opacity: [0.2, 1, 0.2] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#circuit-pattern)" />
      </svg>

      {/* Moving Light Pulses */}
      <motion.div
        animate={{
          x: ["-100%", "200%"],
          y: ["-100%", "200%"],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute w-[600px] h-[600px] bg-primary/5 blur-[150px] rounded-full"
      />

      <motion.div
        animate={{
          x: ["200%", "-100%"],
          y: ["200%", "-100%"],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute w-[500px] h-[500px] bg-secondary/5 blur-[120px] rounded-full"
      />
    </div>
  );
}
