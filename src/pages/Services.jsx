import { useEffect, useRef, useState } from "react";
import gsap from "gsap";


import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import WhyChooseUs from "../components/WhyChooseUs";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    id: "web-design",
    icon: "⬡",
    category: "Engineering",
    title: "Web Design & Development",
    tagline: "High-performance digital engines",
    desc: "We engineer immersive digital ecosystems using Next.js and React. Our focus is on zero-latency interactions, sub-second load times, and SEO-optimized architecture that commands authority in any market.",
    features: ["Next.js/React Ecosystems", "Server-Side Rendering (SSR)", "Motion Engineering (GSAP)", "API Architecture & Webhooks", "Headless CMS Integration", "Core Web Vitals Optimization"],
    gradient: "from-orange-600 to-red-600",
    accentColor: "#ff5500",
    outcome: "Conversion Focus"
  },
  {
    id: "app-dev",
    icon: "◎",
    category: "Software",
    title: "App Development",
    tagline: "Scalable mobile experiences",
    desc: "Architecture-first mobile development using React Native. We build cross-platform applications that deliver native performance, prioritize fluid user journeys, and integrate seamlessly with complex cloud infrastructures.",
    features: ["React Native Cross-Platform", "Real-Time Sync Engines", "Secure Auth Protocols", "Push Notification Logic", "Local DB Persistence", "Edge Function Integration"],
    gradient: "from-orange-500 to-orange-700",
    accentColor: "#ff7733",
    outcome: "Fluid Scalability"
  },
  {
    id: "branding",
    icon: "◇",
    category: "Design",
    title: "Brand Strategy & Identity",
    tagline: "Visual logic and positioning",
    desc: "Defining the visual language of category-leading brands. We develop comprehensive design systems, typography hierarchies, and brand guidelines that ensure total consistency across every digital touchpoint.",
    features: ["Systemic Design Language", "Logotype & Iconography", "Brand Psychology Audit", "Motion Identity Systems", "Typography Architectures", "Strategic Positioning"],
    gradient: "from-orange-400 to-red-500",
    accentColor: "#ffaa00",
    outcome: "Market Authority"
  },
  {
    id: "analytics",
    icon: "◈",
    category: "Data",
    title: "Data Analytics & Insights",
    tagline: "Behavioral logic & reporting",
    desc: "We don't just track data; we decode user intent. By implementing advanced behavioral tracking and heatmapping, we convert raw traffic streams into actionable business intelligence and growth roadmaps.",
    features: ["GA4/GTM Measurement Plans", "User Attribution Modeling", "Retention & Churn Analysis", "Heatmap & Session Replay", "Custom Event Architectures", "Strategic Growth Audits"],
    gradient: "from-red-600 to-orange-800",
    accentColor: "#ff3300",
    outcome: "Actionable Intel"
  },
  {
    id: "data-viz",
    icon: "◉",
    category: "Data",
    title: "Data Visualization",
    tagline: "Complex data simplified",
    desc: "Transforming complex datasets into high-authority interactive stories. We build custom data dashboards and D3.js-powered visualizations that reveal hidden patterns and facilitate rapid decision-making.",
    features: ["D3.js Custom Engines", "Interactive KPI Dashboards", "B2B Analytic Interfaces", "Real-Time Data Streams", "Visual Storytelling", "Vector Map Analysis"],
    gradient: "from-orange-600 to-orange-400",
    accentColor: "#ff9900",
    outcome: "Visual Clarity"
  },
  {
    id: "uiux-audit",
    icon: "◆",
    category: "Design",
    title: "UI/UX Audit & Strategy",
    tagline: "Total interface optimization",
    desc: "Scientific evaluation of digital experiences. We identify friction points using heuristic frameworks and user-behavior testing, providing a technical roadmap to erase mediocrity and maximize user retention.",
    features: ["Heuristic Evaluations", "Friction Point Detection", "UX Technical Audits", "Accessibility Protocols", "A/B Testing Strategies", "User Flow Mapping"],
    gradient: "from-red-500 to-orange-600",
    accentColor: "#ff5500",
    outcome: "Erased Friction"
  }
];


const pricingTiers = [
  {
    name: "Strategic Launch",
    subtitle: "For Emerging Brands",
    price: "₹45K",
    period: "avg investment",
    desc: "Engineered for startups requiring a high-authority digital presence without complexity.",
    features: [
      "5-7 Precision Sections",
      "Core SEO Matrix Integration",
      "Advanced Interaction Design (GSAP)",
      "Standard Conversion Tracking",
      "72h Initial Asset Delivery",
      "14-Day Full Deployment"
    ],
    cta: "Inquire Now",
    value: "Rapid Market Entry",
    popular: false
  },
  {
    name: "Market Dominance",
    subtitle: "High-Growth Scale",
    price: "₹1.2L",
    period: "avg investment",
    desc: "Designed for industry leaders focused on total digital authority and maximum ROI.",
    features: [
      "Unlimited Architecture Sections",
      "Immersive Visual Storytelling",
      "Advanced Web Core Vitals Audit",
      "Custom Micro-Interactions",
      "CMS & API Integration",
      "30-Day Hyper-Care Support"
    ],
    cta: "Initiate Project",
    value: "Maximum Conversion",
    popular: true
  },
  {
    name: "Enterprise Ecosystem",
    subtitle: "Complex Solutions",
    price: "Custom",
    period: "strategic partnership",
    desc: "Comprehensive digital transformation for enterprise-scale platforms and SaaS products.",
    features: [
      "Custom Logic & Application Engines",
      "Enterprise Branding System",
      "Scalable Infrastructure Setup",
      "Priority Beta Testing Access",
      "Dedicated Technical Architect",
      "Ongoing Strategic Advisory"
    ],
    cta: "Strategic Consultation",
    value: "Scalable Excellence",
    popular: false
  }
];


export default function Services() {
  const mainRef = useRef(null);
  const [activeService, setActiveService] = useState(0);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(".services-page-title span", {
        y: 100, opacity: 0, stagger: 0.1, duration: 1.2, ease: "expo.out"
      });

      gsap.from(".services-page-sub", {
        y: 40, opacity: 0, duration: 1, delay: 0.4, ease: "power3.out"
      });

      gsap.from(".service-detail-card", {
        scrollTrigger: { trigger: ".services-detail-section", start: "top 80%" },
        y: 60, opacity: 0, stagger: 0.15, duration: 1, ease: "expo.out"
      });

      gsap.from(".pricing-card", {
        scrollTrigger: { trigger: ".pricing-section", start: "top 80%" },
        y: 60, opacity: 0, stagger: 0.15, duration: 1, ease: "expo.out"
      });

      gsap.from(".service-nav-item", {
        scrollTrigger: { trigger: ".service-nav-section", start: "top 85%" },
        x: -30, opacity: 0, stagger: 0.08, duration: 0.8, ease: "power3.out"
      });
    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <main className="bg-[#050505] text-white min-h-screen pt-[20vh] selection:bg-white selection:text-black overflow-hidden" ref={mainRef}>
      <SEO title="Our Services" description="From concept to deployment, RollDeck delivers end-to-end digital solutions engineered for performance and designed for impact." />

      {/* ── HERO ── */}
      <section className="container mb-16 relative overflow-hidden">
        <div className="flex flex-col lg:flex-row justify-between items-baseline lg:items-end gap-12 relative z-10">
          <div className="flex-1">
            <span className="text-[10px] uppercase tracking-[0.4em] text-white/30 block mb-6 px-1 border-l-2 border-white/20">What We Do</span>
            <h1 className="services-page-title text-6xl md:text-8xl font-black uppercase leading-[0.85] tracking-tighter">
              <span className="block">Our </span>
              <span className="block text-transparent stroke-text" style={{ WebkitTextStroke: "1px #ff5500" }}>Expertise.</span>
            </h1>
          </div>
          <p className="services-page-sub text-white/40 text-lg max-w-md leading-relaxed lg:text-right">
            From concept to deployment, we deliver end-to-end digital solutions engineered for performance, designed for impact.
          </p>
        </div>
        <div className="absolute top-0 right-0 text-[35vw] font-black text-white/[0.02] -translate-y-1/2 select-none pointer-events-none italic">SRV</div>
      </section>

      {/* ── SERVICE NAVIGATION ── */}
      <section className="service-nav-section mb-20">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {services.map((s, i) => (
              <button
                key={s.id}
                onClick={() => setActiveService(i)}
                className={`service-nav-item interactive py-5 px-4 rounded-2xl border text-center transition-all duration-500 group ${activeService === i
                    ? "bg-orange-600 text-white border-orange-600 shadow-[0_10px_30px_rgba(255,85,0,0.3)]"
                    : "bg-white/[0.02] border-white/5 hover:border-white/20 hover:bg-white/[0.05]"
                  }`}
              >
                <span className="text-2xl block mb-2">{s.icon}</span>
                <span className="text-[10px] uppercase tracking-widest font-bold block">{s.title.split(' ')[0]}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── ACTIVE SERVICE DETAIL ── */}
      <section className="mb-32">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start bg-white/[0.02] border border-white/5 rounded-[2rem] p-10 md:p-16 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[150px] pointer-events-none" style={{
              background: `radial-gradient(circle, ${services[activeService].accentColor}15, transparent 70%)`
            }} />

            <div className="relative z-10">
              <span className="text-5xl block mb-6">{services[activeService].icon}</span>
              <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight mb-4">{services[activeService].title}</h2>
              <p className="text-white/50 text-lg italic mb-8">{services[activeService].tagline}</p>
              <p className="text-white/40 leading-relaxed">{services[activeService].desc}</p>
              <div className="mt-10">
                <Link to="/contact" className="hero-btn-premium text-xs">
                  <span>Get a Quote</span>
                  <span className="text-xl group-hover:translate-x-2 transition-transform">→</span>
                </Link>
              </div>
            </div>

            <div className="relative z-10">
              <span className="text-[10px] uppercase tracking-[0.5em] text-white/30 block mb-8">What's Included</span>
              <div className="space-y-4">
                {services[activeService].features.map((f, i) => (
                  <div key={i} className="flex items-center gap-4 py-3 border-b border-white/5 group hover:border-white/15 transition-colors">
                    <span className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-xs font-bold text-white/40 group-hover:bg-white group-hover:text-black transition-all flex-shrink-0">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="text-white/70 group-hover:text-white transition-colors">{f}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ALL SERVICES GRID ── */}
      <section className="services-detail-section py-32 border-y border-white/5 bg-white/[0.01] relative overflow-hidden">
        {/* Background Grid Accent */}
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: "radial-gradient(circle at 20% 50%, rgba(255,85,0,0.1), transparent 50%), radial-gradient(circle at 80% 50%, rgba(255,0,0,0.1), transparent 50%)" }} />
        
        <div className="container relative z-10">
          <div className="text-center mb-24">
            <span className="text-[10px] uppercase tracking-[0.6em] text-white/20 block mb-6 font-black pl-4">The Capability Index</span>
            <h2 className="text-5xl lg:text-7xl font-black uppercase tracking-tight text-white italic">Technical Arsenal.</h2>
          </div>
 
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((s, i) => (
              <div
                key={s.id}
                className="service-detail-card group interactive bg-white/[0.02] border border-white/5 rounded-[2rem] p-10 lg:p-12 hover:bg-white/[0.04] transition-all duration-700 hover:-translate-y-3 relative overflow-hidden"
              >
                {/* Accent glow on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" style={{
                  background: `radial-gradient(circle at 50% 100%, ${s.accentColor}10, transparent 70%)`
                }} />
                
                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex justify-between items-start mb-10">
                    <span className="text-4xl group-hover:scale-110 transition-transform origin-left">{s.icon}</span>
                    <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-white/20 group-hover:text-orange-500 transition-colors">[{String(i+1).padStart(2,'0')}]</span>
                  </div>
 
                  <div className="mb-6">
                    <span className="text-[9px] uppercase tracking-widest text-orange-500 font-black mb-3 block">{s.category}</span>
                    <h3 className="text-2xl font-black uppercase tracking-tight mb-3 text-white">{s.title}</h3>
                    <p className="text-white/40 text-sm italic font-bold">"{s.tagline}"</p>
                  </div>
 
                  <p className="text-sm text-white/35 leading-relaxed mb-10 group-hover:text-white/50 transition-colors">
                    {s.desc}
                  </p>
 
                  <div className="mt-auto space-y-4 pt-8 border-t border-white/5">
                     <div className="flex items-center justify-between">
                        <span className="text-[8px] uppercase tracking-widest text-white/20 font-bold">Key Focus</span>
                        <span className="text-[8px] uppercase tracking-widest text-white/50 font-black">{s.outcome}</span>
                     </div>
                     <Link to="/contact" className="flex items-center gap-3 text-white/30 group-hover:text-orange-500 transition-all text-[10px] uppercase font-black tracking-widest">
                       <span>Explore Logic</span>
                       <span className="group-hover:translate-x-2 transition-transform">→</span>
                     </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ── INVESTMENT SECTION ── */}
      <section className="pricing-section py-32 relative overflow-hidden">
        {/* Background Accents */}
        <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-orange-600/[0.03] blur-[150px] rounded-full pointer-events-none -translate-x-1/2" />
        
        <div className="container relative z-10">
          <div className="text-center mb-24 max-w-3xl mx-auto">
            <span className="text-[10px] uppercase tracking-[1em] text-white/30 block mb-8 pl-4">Investment Structures</span>
            <h2 className="text-5xl lg:text-7xl font-black uppercase tracking-tight mb-8">
              Strategic <span className="italic text-transparent stroke-text" style={{ WebkitTextStroke: "1px #ff5500" }}>Capital.</span>
            </h2>
            <p className="text-white/40 text-lg lg:text-xl font-bold italic leading-relaxed">
              "We don't sell websites; we engineer commercial outcomes. Every investment is calibrated for absolute market impact."
            </p>
          </div>
 
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            {pricingTiers.map((tier, i) => (
              <div
                key={i}
                className={`pricing-card interactive group relative bg-white/[0.02] border rounded-[2.5rem] p-10 lg:p-14 transition-all duration-700 hover:-translate-y-4 ${
                  tier.popular 
                  ? "border-orange-500/30 bg-orange-500/[0.05] shadow-[0_40px_100px_rgba(255,85,0,0.1)] z-10 scale-105" 
                  : "border-white/5"
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2 px-8 py-2 bg-orange-500 text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-[0_10px_30px_rgba(255,85,0,0.4)]">
                    Market Standard
                  </div>
                )}
                
                <div className="mb-12">
                   <div className="flex justify-between items-start mb-6">
                      <div>
                        <span className="text-[10px] uppercase tracking-[0.3em] text-white/40 block mb-2 font-black">{tier.subtitle}</span>
                        <h3 className="text-2xl lg:text-3xl font-black uppercase tracking-tighter text-white">{tier.name}</h3>
                      </div>
                      <span className="px-3 py-1 rounded bg-white/5 border border-white/10 text-[8px] uppercase font-black text-orange-500">{tier.value}</span>
                   </div>
                   
                   <div className="flex items-baseline gap-2 mb-6">
                      <span className="text-5xl font-black tracking-tighter text-white">{tier.price}</span>
                      <span className="text-[10px] uppercase font-bold tracking-widest text-white/20 whitespace-nowrap">{tier.period}</span>
                   </div>
                   
                   <p className="text-white/40 text-sm leading-relaxed font-bold italic border-l-2 border-white/5 pl-4">
                     "{tier.desc}"
                   </p>
                </div>
                
                <div className="space-y-4 mb-14">
                  {tier.features.map((f, j) => (
                    <div key={j} className="flex items-center gap-4 group/item">
                      <span className="w-5 h-5 flex items-center justify-center rounded bg-white/5 border border-white/10 text-orange-500 text-[10px] group-hover/item:bg-orange-500 group-hover/item:text-white transition-all">✓</span>
                      <span className="text-sm text-white/60 group-hover/item:text-white transition-colors">{f}</span>
                    </div>
                  ))}
                </div>
                
                <Link 
                  to="/contact" 
                  className={`block text-center py-6 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-500 interactive ${
                    tier.popular
                    ? "bg-white text-black hover:bg-orange-500 hover:text-white hover:scale-105"
                    : "bg-white/5 border border-white/10 text-white/60 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {tier.cta}
                </Link>
                
                {/* Subtle Decorative Backdrop */}
                <div className="absolute -bottom-10 -right-10 text-[12rem] font-black text-white/[0.012] select-none pointer-events-none group-hover:text-orange-500/[0.015] transition-colors">{i+1}</div>
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-24">
             {[
                { title: "Avg ROI Timeline", value: "3-6 Months", desc: "Our interventions typically pay for themselves within two fiscal quarters through increased conversion." },
                { title: "Technical Durability", value: "5+ Years", desc: "By using vanilla logic and robust frameworks, we ensure your tech debt remains at zero for years." },
                { title: "Deployment Velocity", value: "14-30 Days", desc: "Speed is a high-authority brand feature. We ship complex systems with military-grade precision." },
                { title: "Post-Launch Care", value: "30 Days", desc: "Included hyper-care monitoring to ensure your product survives real-world market collision." }
             ].map((item, i) => (
                <div key={i} className="p-8 rounded-3xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-all group">
                   <span className="text-[9px] uppercase tracking-widest text-orange-500 font-black block mb-4">{item.title}</span>
                   <span className="text-3xl font-black text-white block mb-4 group-hover:italic transition-all">{item.value}</span>
                   <p className="text-xs text-white/30 leading-relaxed font-bold">"{item.desc}"</p>
                </div>
             ))}
          </div>

          <div className="mt-32 p-12 lg:p-20 border border-white/5 bg-white/[0.01] rounded-[3rem] relative overflow-hidden flex flex-col items-center text-center">
             <div className="absolute inset-0 bg-gradient-to-br from-orange-600/[0.03] to-transparent" />
             <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)", backgroundSize: "30px 30px" }} />
             <span className="text-[10px] uppercase tracking-[0.6em] text-white/20 mb-8 font-black">Strategic Retention</span>
             <h3 className="text-3xl md:text-5xl font-black uppercase text-white mb-8 mb-max-w-3xl leading-tight">
               Need <span className="italic text-transparent stroke-text" style={{ WebkitTextStroke: "1px white" }}>Continuous</span> Innovation?
             </h3>
             <p className="text-white/40 text-lg max-w-2xl mb-12 italic leading-relaxed">
               For high-velocity startups requiring ongoing creative and technical intervention, we offer strategic studio retainers. Fixed monthly logic for infinite scaling.
             </p>
             <Link to="/contact" className="hero-btn-premium !inline-flex !scale-110 shadow-2xl shadow-orange-500/20">Inquire About Retainers</Link>
          </div>
        </div>
      </section>


      {/* ── WHY CHOOSE US ── */}
      <WhyChooseUs />

    </main>

  );
}
