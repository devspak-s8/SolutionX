import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageSquare, X, Send, Bot } from "lucide-react";

export default function AIChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1); // 1: Intro, 2: Form

  return (
    <div className="fixed bottom-8 right-8 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="absolute bottom-20 right-0 w-[350px] bg-surface-container-highest border border-outline-variant/20 shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="bg-surface-container-high p-4 flex justify-between items-center border-b border-outline-variant/10">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <Bot size={18} />
                </div>
                <div>
                  <div className="text-xs font-headline font-bold uppercase">SolutionX Assistant</div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-[8px] font-headline uppercase tracking-widest text-on-surface-variant/60">System Online</span>
                  </div>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-on-surface-variant hover:text-white transition-colors">
                <X size={18} />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6 max-h-[400px] overflow-y-auto">
              {step === 1 ? (
                <div className="space-y-4">
                  <div className="bg-surface-container-low p-4 text-sm font-light leading-relaxed border-l-2 border-primary">
                    Greetings. I am the SolutionX interface. We engineer high-impact software architectures, automate workflows, and build custom AI systems.
                  </div>
                  <div className="bg-surface-container-low p-4 text-sm font-light leading-relaxed border-l-2 border-primary">
                    How can we assist in architecting your next digital solution?
                  </div>
                  <button 
                    onClick={() => setStep(2)}
                    className="w-full py-3 bg-primary text-surface font-headline uppercase tracking-widest text-[10px] font-bold hover:opacity-90 transition-opacity"
                  >
                    Initiate Project Request
                  </button>
                </div>
              ) : (
                <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                  <div className="space-y-1">
                    <label className="text-[8px] font-headline uppercase tracking-widest text-on-surface-variant">What do you want to build?</label>
                    <textarea 
                      className="w-full bg-surface-container-low border border-outline-variant/20 p-3 text-xs font-light outline-none focus:border-primary transition-colors resize-none"
                      rows={3}
                      placeholder="Describe your vision..."
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[8px] font-headline uppercase tracking-widest text-on-surface-variant">Identity (Email)</label>
                    <input 
                      type="email"
                      className="w-full bg-surface-container-low border border-outline-variant/20 p-3 text-xs font-light outline-none focus:border-primary transition-colors"
                      placeholder="protocol@domain.com"
                    />
                  </div>
                  <button className="w-full py-3 kinetic-gradient text-surface font-headline uppercase tracking-widest text-[10px] font-bold flex items-center justify-center gap-2">
                    Send Transmission
                    <Send size={12} />
                  </button>
                  <button 
                    type="button"
                    onClick={() => setStep(1)}
                    className="w-full text-[8px] font-headline uppercase tracking-widest text-on-surface-variant/40 hover:text-on-surface-variant transition-colors"
                  >
                    Back to Intro
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 kinetic-gradient rounded-full flex items-center justify-center text-surface shadow-2xl relative group"
      >
        <div className="absolute inset-0 rounded-full bg-primary blur-lg opacity-0 group-hover:opacity-40 transition-opacity" />
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </motion.button>
    </div>
  );
}
