import { motion } from "motion/react";
import { Settings, Monitor, Radio, Bot, MousePointer2, GraduationCap } from "lucide-react";

export const services = [
  {
    slug: "automation",
    icon: <Settings className="text-primary" size={32} />,
    title: "Business Automation",
    description: "Eliminate repetitive workflows. We automate invoicing, onboarding, data entry, and reporting — saving 20+ hours per week immediately.",
    details: "Our automation solutions leverage Python, Node.js, and custom-built bots to handle the heavy lifting. We integrate with your existing tools (Slack, Google Workspace, CRM) to create seamless, hands-off workflows that grow with your business.",
    id: "01 — AUTOMATION",
    color: "primary"
  },
  {
    slug: "development",
    icon: <Monitor className="text-secondary" size={32} />,
    title: "Custom Software Development",
    description: "Tailored web platforms, REST APIs, dashboards, and workflow systems built precisely for your business — not adapted from generic templates.",
    details: "We build scalable, production-ready software using modern stacks like React, TypeScript, and Go. Whether you need a complex dashboard or a high-performance API, our engineering team delivers impact-driven code that solves real problems.",
    id: "02 — DEVELOPMENT",
    color: "secondary",
    large: true
  },
  {
    slug: "intelligence",
    icon: <Radio className="text-primary" size={32} />,
    title: "Data Scraping & Intelligence",
    description: "Extract competitor pricing, monitor market trends, and aggregate real-time data from across the web — on fully automated schedules.",
    details: "Turn the web into your database. We build robust scrapers that handle dynamic content, proxies, and anti-bot measures to give you a competitive edge with real-time market intelligence.",
    id: "03 — INTELLIGENCE",
    color: "primary"
  },
  {
    slug: "ai-systems",
    icon: <Bot className="text-secondary" size={32} />,
    title: "AI-Assisted Systems",
    description: "Integrate large language models and agentic AI workflows into your operations — from intelligent document processing to multi-agent pipelines.",
    details: "Beyond simple chatbots, we build multi-agent systems that can reason, plan, and execute complex tasks. We specialize in RAG (Retrieval-Augmented Generation) and custom LLM fine-tuning for specific domain expertise.",
    id: "04 — AI_SYSTEMS",
    color: "secondary",
    large: true
  },
  {
    slug: "desktop",
    icon: <MousePointer2 className="text-primary" size={32} />,
    title: "Desktop Applications",
    description: "Custom-built desktop tools with authentication, automation, and enterprise features — replacing expensive SaaS subscriptions with owned software.",
    details: "High-performance desktop software built with Electron or native frameworks. Perfect for internal tools that require deep OS integration, offline capabilities, and high security.",
    id: "05 — DESKTOP",
    color: "primary"
  },
  {
    slug: "mentorship",
    icon: <GraduationCap className="text-secondary" size={32} />,
    title: "Technical Mentorship",
    description: "One-on-one guidance for developers and teams. Python, web development, automation systems — personalized curriculum, measurable outcomes.",
    details: "We don't just build for you; we build with you. Our mentorship programs are designed to bridge the gap between junior and senior engineering, focusing on architecture, best practices, and system design.",
    id: "06 — MENTORSHIP",
    color: "secondary"
  }
];

const KineticFlowVisual = () => (
  <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none">
    <svg className="w-full h-full">
      {[...Array(5)].map((_, i) => (
        <motion.path
          key={i}
          d={`M -20 ${20 + i * 20} Q ${50 + i * 10} ${10 + i * 15}, 220 ${30 + i * 20}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          className="text-primary"
          strokeDasharray="5, 45"
          animate={{ strokeDashoffset: [100, 0] }}
          transition={{
            duration: 2 + i * 0.5,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      ))}
    </svg>
  </div>
);

export default function Services() {
  return (
    <section id="services" className="py-32 px-8 md:px-24 bg-surface-container-low relative">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start mb-24 gap-12">
          <div className="space-y-4 max-w-xl">
            <span className="font-headline text-primary tracking-[0.4em] uppercase text-xs">Our Expertise</span>
            <h2 className="font-headline text-4xl md:text-6xl font-black uppercase tracking-tighter">Agency Solutions</h2>
            <div className="h-1 w-24 kinetic-gradient" />
          </div>
          <p className="text-on-surface-variant font-light text-xl leading-relaxed max-w-md">
            We engineer high-impact digital tools that automate complexity and scale your vision.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`group p-8 bg-surface-container border-l-2 border-transparent transition-all duration-500 flex flex-col justify-between relative overflow-hidden ${
                service.large ? "md:col-span-2" : ""
              } ${service.color === 'primary' ? 'hover:border-primary' : 'hover:border-secondary'}`}
            >
              <KineticFlowVisual />
              
              <div className="relative z-10 space-y-6">
                <div className="w-12 h-12 flex items-center justify-center bg-surface-container-high border border-outline-variant/20">
                  {service.icon}
                </div>
                <h3 className={`font-headline font-bold uppercase tracking-tight ${service.large ? "text-3xl" : "text-2xl"}`}>
                  {service.title}
                </h3>
                <p className="text-on-surface-variant text-sm leading-relaxed max-w-md">
                  {service.description}
                </p>
                <a 
                  href={`#services/${service.slug}`}
                  className={`inline-block text-[10px] font-headline font-bold uppercase tracking-[0.2em] border-b border-current pb-1 transition-opacity hover:opacity-70 ${
                    service.color === 'primary' ? 'text-primary' : 'text-secondary'
                  }`}
                >
                  Explore Architecture
                </a>
              </div>

              <div className={`relative z-10 font-headline text-[10px] tracking-widest text-on-surface-variant/40 mt-8 transition-colors ${
                service.color === 'primary' ? 'group-hover:text-primary' : 'group-hover:text-secondary'
              }`}>
                {service.id}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
