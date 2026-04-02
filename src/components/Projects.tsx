import { motion } from "motion/react";
import { ExternalLink, Github } from "lucide-react";

const projects = [
  {
    title: "Neural Core",
    category: "AI INFRASTRUCTURE",
    description: "A distributed neural processing engine designed for real-time inference at the edge.",
    image: "https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=2070&auto=format&fit=crop",
    tags: ["Rust", "Wasm", "TensorFlow"]
  },
  {
    title: "Void Shell",
    category: "SECURITY",
    description: "Zero-trust terminal environment with hardware-level isolation and encrypted telemetry.",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc51?q=80&w=2070&auto=format&fit=crop",
    tags: ["C++", "Kernel", "eBPF"]
  },
  {
    title: "Kinetic UI",
    category: "INTERFACE",
    description: "A design system framework for building high-performance, motion-driven command centers.",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop",
    tags: ["React", "Motion", "WebGL"]
  },
  {
    title: "Script Marketplace",
    category: "AUTOMATION",
    description: "Powerful, ready-to-use scripts and tools to automate your workflow and boost productivity.",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop",
    tags: ["Python", "Node.js", "Bash"],
    slug: "scripts"
  }
];

export default function Projects() {
  return (
    <section id="projects" className="py-32 px-8 md:px-24">
      <div className="max-w-7xl mx-auto">
        <div className="mb-24 space-y-6">
          <div className="inline-flex items-center gap-3 px-3 py-1 bg-surface-container-high border-l-2 border-primary">
            <span className="font-headline text-[10px] tracking-[0.3em] uppercase text-primary">What We Build</span>
          </div>
          <h2 className="font-headline text-5xl md:text-8xl font-black uppercase tracking-tighter leading-[0.9]">
            Software <br /> 
            <span className="text-kinetic">Engineered For Impact.</span>
          </h2>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="space-y-4">
            <span className="font-headline text-primary tracking-[0.4em] uppercase text-xs">Portfolio</span>
            <h3 className="font-headline text-3xl md:text-5xl font-black uppercase tracking-tighter">Selected Works</h3>
          </div>
          <p className="text-on-surface-variant max-w-sm text-lg font-light">
            Pushing the boundaries of what's possible in digital architecture.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onClick={() => project.slug && (window.location.hash = `#${project.slug}`)}
              className={`group bg-surface-container-low border border-outline-variant/10 overflow-hidden hover:border-primary/30 transition-all duration-500 ${project.slug ? 'cursor-pointer' : ''}`}
            >
              <div className="aspect-video overflow-hidden relative">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-60 group-hover:opacity-100"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface-container-low to-transparent opacity-60" />
              </div>
              
              <div className="p-8 space-y-4">
                <div className="flex justify-between items-start">
                  <span className="text-[10px] font-headline text-primary tracking-widest uppercase">{project.category}</span>
                  <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Github size={16} className="text-on-surface-variant hover:text-white cursor-pointer" />
                    <ExternalLink size={16} className="text-on-surface-variant hover:text-white cursor-pointer" />
                  </div>
                </div>
                <h3 className="text-2xl font-headline font-bold uppercase">{project.title}</h3>
                <p className="text-on-surface-variant text-sm leading-relaxed">
                  {project.description}
                </p>
                <div className="flex gap-2 pt-2">
                  {project.tags.map(tag => (
                    <span key={tag} className="text-[9px] font-headline uppercase tracking-tighter text-on-surface-variant/60 bg-surface-container-highest px-2 py-0.5">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
