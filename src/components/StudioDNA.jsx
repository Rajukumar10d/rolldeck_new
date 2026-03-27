import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const dnaStrands = [
  {
    code: "001-RG",
    trait: "Digital Rigour",
    logic: "Precision > Preference. Every micro-interaction is engineered for conversion latency and psychological trust.",
    impact: "98.9% Product Uptime",
    icon: "◈"
  },
  {
    code: "002-AS",
    trait: "Technical Aesthetic",
    logic: "Design is not furniture; it is the interface of authority. We build products that look as robust as they perform.",
    impact: "Brand Equity +40%",
    icon: "⬡"
  },
  {
    code: "003-OT",
    trait: "Outcome Obsession",
    logic: "We do not ship code; we ship commercial outcomes. Our success is indexed to your business growth metrics.",
    impact: "Avg ROI 3.4x",
    icon: "◉"
  },
  {
    code: "004-LS",
    trait: "Logic Sustainability",
    logic: "Scalability as a first-class citizen. Codebases that endure market shifts and technical evolution.",
    impact: "Future-Proof Index 100%",
    icon: "◎"
  }
];

export default function StudioDNA() {
  const sectionRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(".dna-header", {
        scrollTrigger: { trigger: ".dna-header", start: "top 85%" },
        y: 60,
        opacity: 0,
        duration: 1.2,
        ease: "expo.out"
      });

      gsap.from(".dna-card", {
        scrollTrigger: { trigger: ".dna-grid", start: "top 80%" },
        y: 80,
        opacity: 0,
        stagger: 0.2,
        duration: 1.4,
        ease: "power4.out"
      });

      // Background lines animation
      gsap.to(".dna-bg-line", {
        strokeDashoffset: 0,
        duration: 2,
        stagger: 0.1,
        ease: "power2.inOut",
        scrollTrigger: { trigger: ".dna-grid", start: "top 90%" }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="studio-dna-section py-40 bg-zinc-950 relative overflow-hidden" ref={sectionRef}>
      
      {/* Schematic Background */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <svg width="100%" height="100%" className="dna-bg-lines">
          <line x1="10%" y1="0" x2="10%" y2="100%" stroke="white" strokeWidth="1" className="dna-bg-line" strokeDasharray="1000" style={{strokeDashoffset: 1000}} />
          <line x1="90%" y1="0" x2="90%" y2="100%" stroke="white" strokeWidth="1" className="dna-bg-line" strokeDasharray="1000" style={{strokeDashoffset: 1000}} />
          <line x1="0" y1="20%" x2="100%" y2="20%" stroke="white" strokeWidth="1" className="dna-bg-line" strokeDasharray="1000" style={{strokeDashoffset: 1000}} />
          <line x1="0" y1="80%" x2="100%" y2="80%" stroke="white" strokeWidth="1" className="dna-bg-line" strokeDasharray="1000" style={{strokeDashoffset: 1000}} />
        </svg>
      </div>

      <div className="container relative z-10">
        <div className="dna-header mb-32 grid grid-cols-1 lg:grid-cols-2 gap-16 items-end">
          <div>
            <span className="text-[10px] uppercase tracking-[0.6em] text-orange-500 font-black block mb-8">Internal Protocol</span>
            <h2 className="text-6xl lg:text-[10vw] font-black uppercase tracking-tighter leading-[0.8] text-white">
              The Studio<br />
              <span className="italic text-transparent stroke-text" style={{ WebkitTextStroke: "1px #ff5500" }}>DNA.</span>
            </h2>
          </div>
          <p className="text-white/30 text-xl lg:text-2xl font-bold italic leading-relaxed max-w-xl">
            "Our DNA is not a mission statement; it is a technical blueprint for everything we build."
          </p>
        </div>

        <div className="dna-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {dnaStrands.map((strand, i) => (
            <div key={i} className="dna-card group interactive p-10 bg-white/[0.02] border border-white/5 rounded-[2rem] hover:bg-white/[0.05] transition-all duration-700 hover:border-orange-500/20 flex flex-col items-start relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 font-mono text-[8px] text-white/10 group-hover:text-orange-500 transition-colors uppercase font-bold">
                 LOG-{strand.code}
              </div>
              
              <div className="w-14 h-14 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-center text-3xl mb-12 group-hover:scale-110 group-hover:bg-orange-600/10 transition-all duration-500">
                {strand.icon}
              </div>

              <h3 className="text-2xl font-black uppercase text-white mb-6 tracking-tighter group-hover:text-orange-500 transition-colors">
                {strand.trait}
              </h3>

              <div className="h-[1px] w-12 bg-white/10 mb-8 group-hover:w-full group-hover:bg-orange-600 transition-all duration-700" />

              <p className="text-sm text-white/40 leading-relaxed font-bold italic mb-12 flex-grow">
                "{strand.logic}"
              </p>

              <div className="mt-auto pt-8 border-t border-white/5 w-full">
                 <span className="text-[9px] uppercase tracking-widest text-white/20 block mb-2">Validated Impact</span>
                 <span className="text-lg font-black text-orange-500">{strand.impact}</span>
              </div>
              
              {/* Scanline Effect */}
              <div className="absolute bottom-0 left-0 w-full h-[2px] bg-orange-600/30 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
            </div>
          ))}
        </div>

        <div className="mt-32 pt-20 border-t border-white/5 flex flex-col lg:flex-row justify-between items-center gap-12">
            <div className="flex items-center gap-8">
               <div className="text-center">
                  <span className="block text-3xl font-black text-white">100%</span>
                  <span className="text-[8px] uppercase tracking-widest text-white/20">Logic Adherence</span>
               </div>
               <div className="h-12 w-[1px] bg-white/5" />
               <div className="text-center">
                  <span className="block text-3xl font-black text-white">v2.4</span>
                  <span className="text-[8px] uppercase tracking-widest text-white/20">Studio Core</span>
               </div>
            </div>
            
            <p className="text-[10px] uppercase tracking-[0.3em] text-white/20 font-bold max-w-sm text-center lg:text-right">
              All digital products processed through RollDeck Studio must adhere to these four fundamental strands of operational DNA.
            </p>
        </div>
      </div>
    </section>
  );
}
