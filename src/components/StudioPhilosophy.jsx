import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const comparisons = [
  {
    topic: "Approach",
    traditional: "Linear, template-driven designs that lack brand soul.",
    rolldeck: "Digital Rigour. Every pixel is a calculated strategic move to drive conversion.",
    icon: "🎯"
  },
  {
    topic: "Technology",
    traditional: "Heavy, slow WordPress themes or generic site builders.",
    rolldeck: "React & Next.js Ecosystems. Sub-second load times and 100% Lighthouse scores.",
    icon: "⚡"
  },
  {
    topic: "Partnership",
    traditional: "Transactional vendors who wait for your instructions.",
    rolldeck: "Studio Partners. We dive into your business logic to act as your outsourced CTO.",
    icon: "🧠"
  },
  {
    topic: "Outcome",
    traditional: "A 'pretty' website that sits idle in search rankings.",
    rolldeck: "A high-authority digital engine that delivers measurable commercial growth.",
    icon: "🚀"
  }
];

export default function StudioPhilosophy() {
  const sectionRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(".philosophy-header", {
        scrollTrigger: { trigger: ".philosophy-header", start: "top 85%" },
        y: 60,
        opacity: 0,
        duration: 1.2,
        ease: "expo.out"
      });

      gsap.from(".comparison-row", {
        scrollTrigger: { trigger: ".philosophy-grid", start: "top 80%" },
        y: 40,
        opacity: 0,
        stagger: 0.15,
        duration: 1,
        ease: "power3.out"
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="philosophy-section py-32 border-b border-white/5 bg-white/[0.01] relative overflow-hidden" ref={sectionRef}>
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-600/[0.02] blur-[150px] rounded-full pointer-events-none" />
      
      <div className="container relative z-10">
        <div className="philosophy-header text-center mb-24">
          <span className="text-[10px] uppercase tracking-[0.5em] text-orange-500 font-bold block mb-6">Our DNA</span>
          <h2 className="text-4xl lg:text-7xl font-black uppercase tracking-tight text-white">
            The RollDeck <span className="italic text-transparent stroke-text" style={{ WebkitTextStroke: "1px #ff5500" }}>Difference.</span>
          </h2>
          <p className="text-white/40 max-w-2xl mx-auto mt-8 text-lg leading-relaxed">
            We don't follow industry standards; we set them. Here is how we redefine the agency-client partnership.
          </p>
        </div>

        <div className="philosophy-grid space-y-4">
          {comparisons.map((c, i) => (
            <div key={i} className="comparison-row group grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-8 lg:p-12 bg-white/[0.02] border border-white/5 rounded-[2rem] hover:bg-white/[0.04] transition-all duration-500">
              
              <div className="lg:col-span-2 flex items-center gap-6">
                <span className="text-3xl grayscale group-hover:grayscale-0 transition-all duration-500">{c.icon}</span>
                <span className="text-xs font-black uppercase tracking-widest text-white/30">{c.topic}</span>
              </div>

              <div className="lg:col-span-4 p-6 rounded-2xl bg-white/[0.01] border border-white/[0.02]">
                <span className="text-[8px] uppercase tracking-widest text-white/20 block mb-3 font-bold">Traditional Agency</span>
                <p className="text-sm text-white/30 leading-relaxed font-medium">
                  {c.traditional}
                </p>
              </div>

              <div className="lg:col-span-1 flex justify-center text-white/10 text-2xl font-black italic">VS</div>

              <div className="lg:col-span-5 p-6 rounded-2xl bg-orange-600/[0.03] border border-orange-500/10 relative overflow-hidden group-hover:bg-orange-600/[0.05] transition-all duration-500">
                <div className="absolute top-0 right-0 w-24 h-24 bg-orange-600/10 blur-3xl" />
                <span className="text-[8px] uppercase tracking-widest text-orange-500 block mb-3 font-black">RollDeck Studio</span>
                <p className="text-sm md:text-base text-white/80 leading-relaxed font-bold">
                  {c.rolldeck}
                </p>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
