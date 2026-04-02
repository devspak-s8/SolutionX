import { motion } from "motion/react";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote: "SolutionX transformed our infrastructure from a bottleneck into a competitive advantage. Their kinetic architecture is unmatched.",
    author: "Sarah Chen",
    role: "CTO, NexaCorp",
    avatar: "https://i.pravatar.cc/150?u=sarah",
    size: "large"
  },
  {
    quote: "The level of observability and intuitive control we now have over our global nodes is staggering. It's like seeing the matrix.",
    author: "Marcus Thorne",
    role: "Lead Architect, Void Systems",
    avatar: "https://i.pravatar.cc/150?u=marcus",
    size: "medium"
  },
  {
    quote: "Precision, speed, and reliability. SolutionX doesn't just build software; they build the future of digital command.",
    author: "Elena Rodriguez",
    role: "Director of Ops, Quantum Labs",
    avatar: "https://i.pravatar.cc/150?u=elena",
    size: "small"
  },
  {
    quote: "Their multi-agent AI systems have completely redefined how we handle data processing. A true force multiplier.",
    author: "David Park",
    role: "Founder, Synapse AI",
    avatar: "https://i.pravatar.cc/150?u=david",
    size: "medium"
  },
  {
    quote: "The most robust automation engine we've ever integrated. Flawless execution.",
    author: "Lisa Wu",
    role: "VP Engineering, CloudScale",
    avatar: "https://i.pravatar.cc/150?u=lisa",
    size: "small"
  }
];

export default function Testimonials() {
  return (
    <section className="py-32 px-8 md:px-24 bg-surface relative overflow-hidden">
      <div className="absolute inset-0 data-scrim opacity-5 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-24 space-y-4 text-center">
          <span className="font-headline text-primary tracking-[0.4em] uppercase text-xs">Verified Client Feedback</span>
          <h2 className="font-headline text-4xl md:text-7xl font-black uppercase tracking-tighter">Trusted by leading teams.</h2>
        </div>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`break-inside-avoid p-10 bg-surface-container-low border border-outline-variant/10 relative group hover:border-primary/30 transition-all duration-500 flex flex-col ${
                t.size === 'large' ? 'min-h-[400px]' : t.size === 'medium' ? 'min-h-[300px]' : 'min-h-[250px]'
              }`}
            >
              <Quote className="absolute top-8 right-8 text-primary/5 group-hover:text-primary/10 transition-colors" size={60} />
              
              <div className="flex-grow">
                <p className={`text-on-surface font-light leading-relaxed mb-12 relative z-10 ${
                  t.size === 'large' ? 'text-2xl' : 'text-lg'
                }`}>
                  "{t.quote}"
                </p>
              </div>

              <div className="flex items-center gap-4 mt-auto pt-8 border-t border-outline-variant/5">
                <img 
                  src={t.avatar} 
                  alt={t.author} 
                  className="w-12 h-12 rounded-full border border-outline-variant/20 grayscale group-hover:grayscale-0 transition-all duration-500" 
                  referrerPolicy="no-referrer" 
                />
                <div>
                  <div className="font-headline font-bold uppercase text-xs tracking-tight">{t.author}</div>
                  <div className="text-[9px] font-headline uppercase tracking-widest text-on-surface-variant/40">{t.role}</div>
                </div>
              </div>
              
              {/* Decorative corner accent */}
              <div className="absolute bottom-0 right-0 w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute bottom-2 right-2 w-[1px] h-4 bg-primary" />
                <div className="absolute bottom-2 right-2 w-4 h-[1px] bg-primary" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
