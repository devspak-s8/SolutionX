import { motion } from "motion/react";

export default function ProductPreview() {
  return (
    <section className="py-32 px-8 md:px-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="relative"
        >
          <div className="absolute inset-0 bg-primary/20 blur-[80px] rounded-full scale-75" />
          <div className="bg-surface-container-highest p-2 rounded-xl relative overflow-hidden shadow-2xl border border-outline-variant/20">
            <img 
              src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop" 
              alt="Dimroid OS Dashboard" 
              className="w-full h-auto rounded-lg opacity-80"
              referrerPolicy="no-referrer"
            />
          </div>
        </motion.div>

        <div className="space-y-8">
          <div className="space-y-4">
            <span className="font-headline text-primary tracking-[0.4em] uppercase text-xs">The Interface</span>
            <h2 className="font-headline text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none">
              Command <br /> Your World.
            </h2>
          </div>
          
          <p className="text-on-surface-variant text-xl font-light">
            Dimroid OS isn't just software; it's a structural framework for your digital life. Organize, execute, and monitor everything from a single, unified pane of glass.
          </p>

          <div className="space-y-4">
            {[
              "Unified Global Search",
              "Multi-Cluster Orchestration",
              "Real-Time Threat Detection"
            ].map((feature) => (
              <div key={feature} className="flex items-center gap-4 group">
                <div className="w-8 h-px bg-outline-variant group-hover:w-16 group-hover:bg-primary transition-all duration-500" />
                <span className="font-headline uppercase text-sm tracking-widest text-on-surface-variant group-hover:text-white transition-colors">
                  {feature}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
