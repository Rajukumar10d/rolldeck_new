import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const processSteps = [
  {
    id: "01",
    title: "Discovery & Audit",
    subtitle: "Understanding the Core",
    desc: "We dive deep into your brand's DNA, market position, and user behavior. This isn't just a meeting; it's a technical deconstruction to find friction points and growth opportunities.",
    icon: "🔍",
    deliverables: ["Market Analysis", "User Journey Mapping", "Technical Audit", "Project Roadmap"],
    color: "#ff5500"
  },
  {
    id: "02",
    title: "Strategic Architecture",
    subtitle: "Setting the Foundation",
    desc: "Before a single pixel is moved, we define the structural integrity of your product. This stage focuses on information architecture, technical stack selection, and scalability planning.",
    icon: "📐",
    deliverables: ["Sitemap & Logic", "Tech Stack Selection", "UI/UX Strategy", "High-Fidelity Wireframes"],
    color: "#ff3300"
  },
  {
    id: "03",
    title: "Aesthetic Execution",
    subtitle: "Visual Rigour",
    desc: "We translate strategy into stunning, high-performance designs. Our focus is on 'Design Rigour' — achieving a perfect balance between brutalist minimalism and immersive user experience.",
    icon: "✦",
    deliverables: ["Visual Identity", "Interactive Prototypes", "Design System", "Motion Studies"],
    color: "#ff1100"
  },
  {
    id: "04",
    title: "Technical Engineering",
    subtitle: "Building the Engine",
    desc: "Our engineers build with precision. Using React, Next.js, and cutting-edge backend logic, we transform designs into robust, lightning-fast digital ecosystems.",
    icon: "⚡",
    deliverables: ["Clean, Scalable Code", "Responsive Implementation", "Animation Orchestration", "API Integration"],
    color: "#ff7700"
  },
  {
    id: "05",
    title: "Rigorous Deployment",
    subtitle: "Zero-Compromise Launch",
    desc: "Launch is just the beginning. We perform exhaustive stress tests, SEO audits, and performance tuning to ensure your product survives contact with the real world.",
    icon: "🚀",
    deliverables: ["Performance Tuning", "SEO Optimization", "Infrastructure Setup", "30-Day Hyper-Care"],
    color: "#ff4400"
  }
];

export default function Process() {
  const sectionRef = useRef(null);
  const triggerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Background reveal animation
      gsap.from(".process-bg-accent", {
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top 80%",
          end: "bottom 20%",
          scrub: 1
        },
        scale: 0.8,
        opacity: 0,
        rotate: -10
      });

      // Horizontal progress line
      gsap.from(".process-progress-line", {
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top center",
          end: "bottom center",
          scrub: true
        },
        scaleX: 0,
        transformOrigin: "left center"
      });

      // Individual steps animation
      gsap.utils.toArray(".process-card-enhanced").forEach((card, i) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse"
          },
          x: i % 2 === 0 ? -50 : 50,
          opacity: 0,
          duration: 1,
          ease: "expo.out"
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="process-component relative py-20" ref={sectionRef}>
      {/* Decorative Background */}
      <div className="process-bg-accent absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-orange-600/[0.03] blur-[150px] rounded-full pointer-events-none z-0" />
      
      <div className="relative z-10" ref={triggerRef}>
        {/* Header Section */}
        <div className="max-w-4xl mb-24">
          <span className="text-[10px] uppercase tracking-[0.5em] text-orange-500 font-black block mb-6 px-1 border-l-2 border-orange-500/30">
            Methodology
          </span>
          <h2 className="text-5xl lg:text-8xl font-black uppercase tracking-tighter leading-[0.9] text-white">
            Our <span className="italic text-transparent stroke-text" style={{ WebkitTextStroke: "1px #ff5500" }}>Systematic</span><br />Approach.
          </h2>
          <p className="mt-10 text-white/40 text-lg lg:text-xl leading-relaxed max-w-2xl">
            A battle-tested 5-step framework designed to take ambitious ideas from conceptual logic to technical reality.
          </p>
        </div>

        {/* Process Flow */}
        <div className="relative flex flex-col lg:flex-row lg:gap-12 lg:overflow-x-auto lg:pb-20 no-scrollbar space-y-12 lg:space-y-0">
          {/* Progress Line for Desktop */}
          <div className="process-progress-line hidden lg:block absolute top-[110px] left-0 right-0 h-[1px] bg-gradient-to-r from-orange-500 via-white/20 to-transparent z-0" />

          {processSteps.map((step, i) => (
            <div key={i} className="process-card-enhanced relative lg:w-[400px] flex-shrink-0">
              {/* Step Number Circle */}
              <div className="relative z-10 mb-6 lg:mb-10">
                <div className="w-12 h-12 lg:w-16 lg:h-16 rounded-full bg-bg-dark border border-white/10 flex items-center justify-center group-hover:border-orange-500 transition-all duration-500">
                  <span className="text-lg lg:text-xl font-black text-white">{step.id}</span>
                </div>
                {/* Connector dot for the line */}
                <div className="hidden lg:block absolute top-1/2 left-full w-full h-[1px] bg-white/5 -translate-y-1/2" />
              </div>

              {/* Main Content Card */}
              <div className="bg-white/[0.02] border border-white/5 rounded-[2rem] lg:rounded-[2.5rem] p-8 lg:p-10 hover:bg-white/[0.04] hover:border-white/10 transition-all duration-500 group interactive h-full relative overflow-hidden">
                <div className="flex items-center justify-between mb-6 lg:mb-8">
                  <span className="text-3xl lg:text-4xl group-hover:scale-125 transition-transform duration-500 block">{step.icon}</span>
                  <span className="text-[9px] lg:text-[10px] uppercase tracking-widest text-orange-500/50 font-bold">{step.subtitle}</span>
                </div>
                
                <h3 className="text-xl lg:text-2xl font-black uppercase tracking-tight mb-4 group-hover:text-orange-500 transition-colors">
                  {step.title}
                </h3>
                
                <p className="text-white/40 text-sm leading-relaxed mb-6 lg:mb-8">
                  {step.desc}
                </p>

                {/* Deliverables List */}
                <div className="pt-6 lg:pt-8 border-t border-white/5">
                  <span className="text-[9px] uppercase tracking-[0.2em] text-white/20 font-black block mb-4">Core Output</span>
                  <ul className="space-y-2 lg:space-y-3">
                    {step.deliverables.map((item, j) => (
                      <li key={j} className="flex items-center gap-3 text-[10px] lg:text-[11px] font-bold uppercase tracking-wider text-white/60">
                        <span className="w-1 h-1 bg-orange-500 rounded-full" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Corner Accent */}
                <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                  <div className="w-12 h-12 bg-orange-600/20 blur-xl rounded-full" />
                </div>
              </div>
            </div>
          ))}

          {/* End Milestone */}
          <div className="hidden lg:flex flex-shrink-0 items-start pt-[86px]">
            <div className="w-12 h-12 rounded-full border border-dashed border-white/20 flex items-center justify-center opacity-30">
              <span className="text-xl">🚀</span>
            </div>
          </div>
        </div>
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none z-0" style={{
        backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
        backgroundSize: "60px 60px"
      }} />
    </div>
  );
}
