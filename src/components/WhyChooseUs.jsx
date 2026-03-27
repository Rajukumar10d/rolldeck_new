import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const points = [
  {
    id: "01",
    title: "Engineering Rigour",
    desc: "We don't just 'make websites'. We build high-performance digital engines. Every line of code is audited for speed, security, and scalability.",
    icon: "⚙️",
    metrics: [
      { label: "Code Quality", value: "99.9%" },
      { label: "Uptime Focus", value: "High" }
    ],
    details: "Using Next.js and React, we ensure your platform is built on the most robust modern frameworks."
  },
  {
    id: "02",
    title: "Performance First",
    desc: "Speed is a feature, not an afterthought. We obsess over sub-second load times and 90+ Lighthouse scores to ensure your users never wait.",
    icon: "⚡",
    metrics: [
      { label: "Avg Load Time", value: "< 1.2s" },
      { label: "SEO Score", value: "95+" }
    ],
    details: "Zero compromises on asset optimization, server-side rendering, and edge-caching strategies."
  },
  {
    id: "03",
    title: "Strategic Consulting",
    desc: "We operate as your technical partners, not just vendors. We dive deep into your business logic to suggest features that actually drive growth.",
    icon: "🧠",
    metrics: [
      { label: "ROI Focus", value: "100%" },
      { label: "Consultation", value: "Weekly" }
    ],
    details: "From tech stack selection to user-acquisition strategy, we provide 'CTO-as-a-Service' level insights."
  },
  {
    id: "04",
    title: "Design for Conversion",
    desc: "Aesthetic excellence alone isn't enough. We design interfaces that guide users through a psychological journey toward high-value actions.",
    icon: "🎯",
    metrics: [
      { label: "Conv. Uplift", value: "Avg 40%" },
      { label: "UX Audits", value: "Included" }
    ],
    details: "Heuristic evaluations and user-behavior modeling are at the core of every interface we ship."
  }
];

export default function WhyChooseUs() {
  const containerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(".why-header", {
        scrollTrigger: {
          trigger: ".why-header",
          start: "top 80%",
        },
        y: 60,
        opacity: 0,
        duration: 1.2,
        ease: "expo.out"
      });

      gsap.from(".why-card-enhanced", {
        scrollTrigger: {
          trigger: ".why-grid-enhanced",
          start: "top 75%",
        },
        y: 100,
        opacity: 0,
        stagger: 0.15,
        duration: 1.4,
        ease: "power4.out"
      });
      
      // Floating metrics animation
      gsap.to(".metric-dot", {
        y: -10,
        opacity: 0.5,
        duration: 2,
        repeat: -1,
        yoyo: true,
        stagger: 0.5,
        ease: "sine.inOut"
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="why-section-enhanced py-32 relative overflow-hidden" ref={containerRef}>
      {/* Background Technical Elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange-600/[0.02] blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-red-600/[0.02] blur-[100px] rounded-full pointer-events-none" />

      <div className="container relative z-10">
        <div className="why-header grid grid-cols-1 lg:grid-cols-2 gap-20 items-end mb-24">
          <div>
            <span className="text-[10px] uppercase tracking-[0.5em] text-orange-500 font-black block mb-6">Our Competitive Edge</span>
            <h2 className="text-5xl lg:text-8xl font-black uppercase tracking-tighter leading-[0.85] text-white">
              Why <span className="italic text-transparent stroke-text" style={{ WebkitTextStroke: "1px #ff5500" }}>Partner</span><br />With Us.
            </h2>
          </div>
          <p className="text-white/40 text-lg lg:text-xl leading-relaxed max-w-xl">
            We operate at the intersection of technical excellence and creative foresight. We don't just ship products; we ship success stories.
          </p>
        </div>

        <div className="why-grid-enhanced grid grid-cols-1 md:grid-cols-2 gap-10">
          {points.map((point, i) => (
            <div 
              key={i} 
              className="why-card-enhanced group interactive bg-white/[0.02] border border-white/5 rounded-[2.5rem] p-10 lg:p-14 hover:bg-white/[0.05] transition-all duration-700 hover:border-white/10 relative overflow-hidden"
            >
              {/* Card Decoration */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-orange-600/[0.03] blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              
              <div className="flex flex-col h-full relative z-10">
                <div className="flex items-start justify-between mb-10">
                  <div className="w-16 h-16 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform duration-500">
                    {point.icon}
                  </div>
                  <span className="text-5xl font-black text-white/[0.03] group-hover:text-white/[0.08] transition-colors duration-500">
                    {point.id}
                  </span>
                </div>

                <h3 className="text-2xl lg:text-3xl font-black uppercase tracking-tight mb-6 group-hover:text-orange-500 transition-colors duration-500">
                  {point.title}
                </h3>
                
                <p className="text-white/50 text-base lg:text-lg leading-relaxed mb-10">
                  {point.desc}
                </p>

                {/* Metrics Row */}
                <div className="grid grid-cols-2 gap-8 py-8 border-y border-white/5 mb-8">
                  {point.metrics.map((m, j) => (
                    <div key={j} className="relative">
                      <span className="text-[9px] uppercase tracking-widest text-white/30 block mb-2">{m.label}</span>
                      <span className="text-2xl font-black text-white">{m.value}</span>
                      <div className="metric-dot absolute -top-1 -right-2 w-1.5 h-1.5 bg-orange-500 rounded-full blur-[2px]" />
                    </div>
                  ))}
                </div>

                <div className="mt-auto">
                  <span className="text-[10px] uppercase tracking-widest text-orange-500/60 font-black block mb-4">The Logic</span>
                  <p className="text-sm text-white/30 italic">
                    {point.details}
                  </p>
                </div>
              </div>

              {/* Hover Arrow */}
              <div className="absolute bottom-10 right-10 opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all duration-500">
                <span className="text-3xl text-white/20">→</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Decorative Grid Patterns */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{
        backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
        backgroundSize: "60px 60px"
      }} />
    </section>
  );
}
