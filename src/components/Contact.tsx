import { motion } from "motion/react";
import { Mail, MessageSquare, Globe, Send } from "lucide-react";

const WorldMap = () => {
  const nodes = [
    { x: 250, y: 150, label: "NA_NORTH" },
    { x: 480, y: 130, label: "EU_WEST" },
    { x: 750, y: 200, label: "AS_EAST" },
    { x: 300, y: 350, label: "SA_SOUTH" },
    { x: 850, y: 400, label: "AU_EAST" },
    { x: 550, y: 320, label: "AF_CENTRAL" },
  ];

  // Define connections between nodes
  const connections = [
    [0, 1], [1, 2], [2, 4], [0, 3], [3, 5], [5, 1], [5, 4]
  ];

  return (
    <div className="relative w-full aspect-[2/1] bg-surface-container-low border border-outline-variant/10 overflow-hidden group">
      <div className="absolute inset-0 opacity-10 data-scrim" />
      
      <svg viewBox="0 0 1000 500" className="w-full h-full">
        {/* World Map Path (More detailed but still stylized) */}
        <path 
          d="M150,120 C180,100 250,100 300,120 S350,180 320,250 S250,320 180,300 S120,250 150,120 Z M450,100 C500,80 580,80 620,120 S650,200 600,250 S500,280 450,250 S400,200 450,100 Z M700,150 C750,130 850,130 900,180 S920,280 850,350 S750,380 700,350 S650,280 700,150 Z M200,350 C250,330 350,330 400,380 S420,480 350,490 S250,480 200,450 S150,400 200,350 Z M500,300 C550,280 650,280 700,330 S720,430 650,450 S550,430 500,400 S450,350 500,300 Z M800,400 C850,380 950,380 980,430 S980,490 900,495 S800,480 800,450 S750,420 800,400 Z" 
          className="fill-on-surface-variant opacity-10"
        />

        {/* Network Connections */}
        {connections.map(([startIdx, endIdx], i) => {
          const start = nodes[startIdx];
          const end = nodes[endIdx];
          return (
            <g key={i}>
              <line 
                x1={start.x} y1={start.y} x2={end.x} y2={end.y} 
                className="stroke-primary/10" 
                strokeWidth="0.5" 
              />
              <motion.line
                x1={start.x} y1={start.y} x2={end.x} y2={end.y}
                className="stroke-primary/40"
                strokeWidth="1"
                strokeDasharray="4, 10"
                animate={{ strokeDashoffset: [20, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              />
            </g>
          );
        })}

        {/* Nodes */}
        {nodes.map((node, i) => (
          <g key={i}>
            <circle cx={node.x} cy={node.y} r="4" className="fill-primary" />
            <circle cx={node.x} cy={node.y} r="8" className="fill-primary/20 animate-pulse" />
            <foreignObject x={node.x - 50} y={node.y + 10} width="100" height="20">
              <div className="text-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <span className="text-[8px] font-headline text-primary tracking-widest">{node.label}</span>
              </div>
            </foreignObject>
          </g>
        ))}
      </svg>

      <div className="absolute bottom-4 left-4 font-headline text-[10px] text-primary/40 tracking-[0.3em]">
        GLOBAL_NODE_NETWORK_ACTIVE
      </div>
    </div>
  );
};

export default function Contact() {
  return (
    <section id="contact" className="py-32 px-8 md:px-24">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div className="space-y-12">
            <div className="space-y-4">
              <span className="font-headline text-primary tracking-[0.4em] uppercase text-xs">Get In Touch</span>
              <h2 className="font-headline text-5xl md:text-7xl font-black uppercase tracking-tighter">Connect.</h2>
              <p className="text-on-surface-variant text-xl font-light max-w-md">
                Ready to initiate the protocol? Reach out to our team for a deep dive into the SolutionX ecosystem.
              </p>
            </div>

            <div className="space-y-8">
              <div className="space-y-6">
                {[
                  { icon: <Mail size={20} />, label: "Email", value: "protocol@solutionx.io" },
                  { icon: <MessageSquare size={20} />, label: "Terminal", value: "irc.solutionx.io" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-6 group">
                    <div className="w-12 h-12 flex items-center justify-center bg-surface-container border border-outline-variant/20 text-primary group-hover:border-primary transition-colors">
                      {item.icon}
                    </div>
                    <div>
                      <div className="text-[10px] font-headline uppercase tracking-widest text-on-surface-variant/40">{item.label}</div>
                      <div className="text-lg font-headline uppercase tracking-tight">{item.value}</div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Globe size={16} className="text-primary" />
                  <span className="text-[10px] font-headline uppercase tracking-widest text-on-surface-variant">Global Node Network</span>
                </div>
                <WorldMap />
              </div>
            </div>
          </div>

          <div className="bg-surface-container-low p-10 border border-outline-variant/10 relative">
            <div className="absolute top-0 right-0 p-4 font-headline text-[10px] text-primary/20 tracking-widest">SECURE_CHANNEL_01</div>
            <form className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-headline uppercase tracking-widest text-on-surface-variant">Identity</label>
                <input 
                  type="text" 
                  placeholder="USER_NAME"
                  className="w-full bg-surface-container-highest border-b border-outline-variant/30 px-4 py-3 font-headline text-sm focus:border-primary outline-none transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-headline uppercase tracking-widest text-on-surface-variant">Access Point</label>
                <input 
                  type="email" 
                  placeholder="EMAIL_ADDRESS"
                  className="w-full bg-surface-container-highest border-b border-outline-variant/30 px-4 py-3 font-headline text-sm focus:border-primary outline-none transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-headline uppercase tracking-widest text-on-surface-variant">Transmission</label>
                <textarea 
                  rows={4}
                  placeholder="MESSAGE_CONTENT"
                  className="w-full bg-surface-container-highest border-b border-outline-variant/30 px-4 py-3 font-headline text-sm focus:border-primary outline-none transition-colors resize-none"
                />
              </div>
              <button className="w-full kinetic-gradient text-surface font-headline uppercase tracking-[0.2em] text-xs py-4 flex items-center justify-center gap-3 hover:opacity-90 transition-opacity font-bold">
                Send Transmission
                <Send size={14} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
