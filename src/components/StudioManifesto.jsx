import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const manifestoPoints = [
  {
    kicker: "01 / The Eradication",
    title: "We erase <span class='text-orange-500'>Mediocrity</span>",
    desc: "Industry standards are the floor, not the ceiling. We reject the 'good enough' to engineer the exceptional."
  },
  {
    kicker: "02 / The Logic",
    title: "Aesthetics are <span class='text-orange-500'>Calculated</span>",
    desc: "Design is not a coat of paint; it is the visual architecture of trust, power, and conversion."
  },
  {
    kicker: "03 / The Rigour",
    title: "Performance is <span class='text-orange-500'>Authority</span>",
    desc: "A product that lags is a brand that fails. Sub-second latency is our non-negotiable studio baseline."
  },
  {
    kicker: "04 / The Outcome",
    title: "We build <span class='text-orange-500'>Future Equity</span>",
    desc: "Every interaction we design is a long-term investment in your brand's commercial trajectory."
  }
];

export default function StudioManifesto() {
  const containerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Main title parallax
      gsap.to(".manifesto-bg-text", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1
        },
        x: -500,
        ease: "none"
      });

      // Points reveal
      gsap.utils.toArray(".manifesto-point-box").forEach((box) => {
        gsap.from(box, {
          scrollTrigger: {
            trigger: box,
            start: "top 85%",
            toggleActions: "play none none reverse"
          },
          y: 100,
          opacity: 0,
          duration: 1.5,
          ease: "expo.out"
        });
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="studio-manifesto-section py-64 bg-bg-dark relative overflow-hidden" ref={containerRef}>
      
      {/* Background Kinetic Text */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 whitespace-nowrap select-none pointer-events-none z-0">
        <span className="manifesto-bg-text text-[30vw] font-black text-white/[0.01] uppercase italic tracking-tighter block">
          DIGITAL RIGOUR ✦ ERASE MEDIOCRITY ✦ TECHNICAL CRAFT ✦ 
        </span>
      </div>

      <div className="container relative z-10">
        
        {/* Header */}
        <div className="manifesto-intro mb-48 max-w-4xl">
          <span className="text-[10px] uppercase tracking-[0.6em] text-white/30 block mb-10 font-black pl-2 border-l-2 border-orange-500">Manifesto 26.1</span>
          <h2 className="text-6xl md:text-9xl font-black uppercase tracking-tighter leading-[0.8] text-white">
            Engineering the <br />
            <span className="italic text-transparent stroke-text" style={{ WebkitTextStroke: "1px #ff5500" }}>Standard.</span>
          </h2>
        </div>

        {/* Manifesto Content */}
        <div className="manifesto-grid space-y-32">
          {manifestoPoints.map((p, i) => (
            <div key={i} className="manifesto-point-box flex flex-col lg:flex-row gap-12 lg:gap-32 items-baseline lg:items-center py-20 border-t border-white/5 group">
              
              <div className="lg:w-1/3">
                 <span className="text-orange-500 font-black text-xl italic mb-4 block group-hover:translate-x-4 transition-transform duration-700">
                   {p.kicker}
                 </span>
                 <div className="h-1 w-12 bg-white/10 group-hover:w-full group-hover:bg-orange-600 transition-all duration-1000" />
              </div>

              <div className="lg:w-2/3">
                 <h3 
                   className="text-4xl md:text-7xl font-black uppercase tracking-tighter text-white leading-none mb-10 group-hover:italic transition-all duration-500"
                   dangerouslySetInnerHTML={{ __html: p.title }}
                 />
                 <p className="text-white/40 text-xl md:text-3xl font-bold italic leading-relaxed max-w-2xl group-hover:text-white/70 transition-colors">
                   "{p.desc}"
                 </p>
              </div>

            </div>
          ))}
        </div>

        {/* Closing Signature */}
        <div className="mt-48 text-center pt-24 border-t border-white/10">
           <div className="text-[10vw] font-black text-white italic opacity-5 leading-none select-none">ROLLDECK-ST</div>
           <p className="text-[10px] uppercase tracking-[0.5em] text-white/20 mt-12 font-black">
             Signed by the Founders / Jaipur, India / Cycle 2026.
           </p>
        </div>

      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{
        backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
        backgroundSize: "80px 80px"
      }} />
    </section>
  );
}
