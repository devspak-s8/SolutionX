import { motion } from "motion/react";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { services } from "./Services";

interface ServiceDetailProps {
  slug: string;
  onBack: () => void;
}

export default function ServiceDetail({ slug, onBack }: ServiceDetailProps) {
  const service = services.find(s => s.slug === slug);

  if (!service) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="min-h-screen pt-32 pb-20 px-8 md:px-24 bg-surface relative"
    >
      <div className="max-w-4xl mx-auto">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors mb-12 font-headline text-[10px] uppercase tracking-widest"
        >
          <ArrowLeft size={16} />
          Back to Services
        </button>

        <div className="space-y-12">
          <div className="space-y-6">
            <div className="w-16 h-16 flex items-center justify-center bg-surface-container-high border border-outline-variant/20">
              {service.icon}
            </div>
            <h1 className="font-headline text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none">
              {service.title}
            </h1>
            <div className="h-1 w-32 kinetic-gradient" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <p className="text-xl font-light text-on-surface leading-relaxed">
                {service.description}
              </p>
              <p className="text-on-surface-variant leading-relaxed">
                {service.details}
              </p>
            </div>

            <div className="bg-surface-container-low p-8 border border-outline-variant/10 space-y-6">
              <h3 className="font-headline text-xs font-bold uppercase tracking-widest text-primary">Core Capabilities</h3>
              <div className="space-y-4">
                {[
                  "Scalable Architecture",
                  "Real-time Monitoring",
                  "Security First Design",
                  "Custom Integration"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm font-light text-on-surface-variant">
                    <CheckCircle2 size={16} className="text-primary" />
                    {item}
                  </div>
                ))}
              </div>
              <button className="w-full py-4 kinetic-gradient text-surface font-headline uppercase tracking-widest text-[10px] font-bold mt-8">
                Request Architecture
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
