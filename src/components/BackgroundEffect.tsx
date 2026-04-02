import { motion } from "motion/react";
import { useEffect, useState } from "react";

export default function BackgroundEffect() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 -z-20 overflow-hidden pointer-events-none bg-surface">
      {/* Grid Base */}
      <div className="absolute inset-0 data-scrim opacity-10" />
      
      {/* Interactive Glow */}
      <motion.div
        animate={{
          x: mousePos.x - 300,
          y: mousePos.y - 300,
        }}
        transition={{ type: "spring", damping: 30, stiffness: 100, mass: 0.5 }}
        className="absolute w-[600px] h-[600px] bg-primary/5 blur-[120px] rounded-full opacity-50"
      />

      {/* Electric Circuit Lines */}
      <svg className="absolute inset-0 w-full h-full opacity-30">
        <defs>
          <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="50%" stopColor="var(--color-primary)" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
          
          <pattern id="circuit-grid" x="0" y="0" width="400" height="400" patternUnits="userSpaceOnUse">
            {/* Static Grid Lines */}
            <path d="M 0 200 L 400 200 M 200 0 L 200 400" fill="none" stroke="currentColor" strokeWidth="0.1" className="text-primary/10" />
            
            {/* Circuit Paths */}
            <path d="M 50 50 L 100 50 L 120 70 L 120 120 L 170 120 L 190 140" fill="none" stroke="currentColor" strokeWidth="0.3" className="text-primary/20" />
            <path d="M 350 350 L 300 350 L 280 330 L 280 280 L 230 280 L 210 260" fill="none" stroke="currentColor" strokeWidth="0.3" className="text-secondary/20" />
            <path d="M 50 350 L 100 350 L 120 330 L 120 280 L 170 280 L 190 260" fill="none" stroke="currentColor" strokeWidth="0.2" className="text-primary/10" />
            
            {/* Animated Connecting Pulses */}
            <motion.path
              d="M 50 50 L 100 50 L 120 70 L 120 120 L 170 120 L 190 140"
              fill="none"
              stroke="url(#line-gradient)"
              strokeWidth="1.5"
              strokeDasharray="20, 180"
              animate={{ strokeDashoffset: [200, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
            
            <motion.path
              d="M 350 350 L 300 350 L 280 330 L 280 280 L 230 280 L 210 260"
              fill="none"
              stroke="url(#line-gradient)"
              strokeWidth="1.5"
              strokeDasharray="20, 180"
              animate={{ strokeDashoffset: [0, 200] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            />

            {/* Connection Nodes */}
            <circle cx="50" cy="50" r="2" className="fill-primary/40" />
            <circle cx="190" cy="140" r="2" className="fill-primary/40" />
            <circle cx="350" cy="350" r="2" className="fill-secondary/40" />
            <circle cx="210" cy="260" r="2" className="fill-secondary/40" />
            
            <motion.circle
              cx="120" cy="70" r="3"
              className="fill-primary"
              animate={{ opacity: [0, 1, 0], scale: [0.5, 1.5, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#circuit-grid)" />
      </svg>

      {/* Floating Data Particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              x: Math.random() * 100 + "%", 
              y: Math.random() * 100 + "%",
              opacity: 0 
            }}
            animate={{ 
              y: [null, (Math.random() * 100 - 50) + "%"],
              opacity: [0, 0.2, 0],
            }}
            transition={{
              duration: 5 + Math.random() * 10,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 5
            }}
            className="absolute w-1 h-1 bg-primary rounded-full"
          />
        ))}
      </div>

      {/* Large Ambient Pulses */}
      <div className="absolute inset-0">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: [0, 0.05, 0],
              scale: [0.8, 1.2, 0.8],
              x: Math.random() * 100 + "%",
              y: Math.random() * 100 + "%"
            }}
            transition={{
              duration: 10 + i * 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 3
            }}
            className="absolute w-[800px] h-[800px] bg-primary/10 blur-[180px] rounded-full"
          />
        ))}
      </div>
    </div>
  );
}
