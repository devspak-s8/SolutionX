import { motion } from "motion/react";
import { Search, PenTool, Code, Rocket } from "lucide-react";

const steps = [
  {
    icon: <Search size={24} />,
    title: "Discovery",
    description: "We dive deep into your business logic to identify automation opportunities and technical bottlenecks.",
    color: "primary"
  },
  {
    icon: <PenTool size={24} />,
    title: "Architecture",
    description: "Our engineers design a custom blueprint, selecting the optimal tech stack for your specific needs.",
    color: "secondary"
  },
  {
    icon: <Code size={24} />,
    title: "Development",
    description: "We build your solution using production-grade code, with continuous testing and refinement.",
    color: "primary"
  },
  {
    icon: <Rocket size={24} />,
    title: "Deployment",
    description: "Seamless integration into your existing systems with full documentation and team onboarding.",
    color: "secondary"
  }
];

export default function Process() {
  return (
    <section id="process" className="py-32 px-8 md:px-24 bg-surface">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24 space-y-4">
          <span className="font-headline text-primary tracking-[0.4em] uppercase text-xs">Our Workflow</span>
          <h2 className="font-headline text-4xl md:text-6xl font-black uppercase tracking-tighter">The Protocol.</h2>
          <p className="text-on-surface-variant max-w-2xl mx-auto font-light">
            A systematic approach to engineering impact. We don't just build; we architect solutions that scale.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Connecting Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 w-full h-[1px] bg-outline-variant/20 -translate-y-1/2 z-0" />
          
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="relative z-10 bg-surface-container border border-outline-variant/10 p-8 rounded-2xl group hover:border-primary/30 transition-all duration-500"
            >
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-all duration-500 ${
                step.color === 'primary' ? 'bg-primary/10 text-primary group-hover:bg-primary group-hover:text-surface' : 'bg-secondary/10 text-secondary group-hover:bg-secondary group-hover:text-surface'
              }`}>
                {step.icon}
              </div>
              <div className="absolute -top-4 -right-4 text-6xl font-headline font-black text-white/5 group-hover:text-white/10 transition-colors">
                0{index + 1}
              </div>
              <h3 className="font-headline font-bold uppercase tracking-widest mb-4">{step.title}</h3>
              <p className="text-on-surface-variant text-sm leading-relaxed font-light">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
