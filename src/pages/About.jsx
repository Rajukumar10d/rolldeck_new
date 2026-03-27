import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SEO from "../components/SEO";
import Process from "../components/Process";
import ClientStories from "../components/ClientStories";
import StudioPhilosophy from "../components/StudioPhilosophy";
import StudioDNA from "../components/StudioDNA";
import StudioManifesto from "../components/StudioManifesto";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    title: "Web Design & Development",
    desc: "We build high-performance, SEO-optimized digital interfaces using Next.js and React. From immersive storytelling to complex e-commerce, we focus on speed, accessibility, and 'wow' factor interactions.",
    icon: "⬡"
  },
  {
    title: "Data Analytics & Insights",
    desc: "We don't just track clicks; we decode behavior. By implementing advanced tracking (GA4, GTM) and heatmaps, we turn raw traffic into actionable user-journey insights.",
    icon: "◈"
  },
  {
    title: "Data Visualization",
    desc: "Turning complexity into clarity. We design custom interactive dashboards and D3.js-powered visual stories that allow stakeholders to see patterns and trends at a glance.",
    icon: "◉"
  },
  {
    title: "App Development",
    desc: "Specializing in cross-platform mobile solutions (React Native) that feel native. We build apps that scale, prioritizing fluid UX and robust backend integration.",
    icon: "◎"
  },
  {
    title: "Brand Strategy & Identity",
    desc: "Positioning is everything. We define your brand's visual language—from logos to typography systems—ensuring you stand out in a saturated digital landscape.",
    icon: "◇"
  },
  {
    title: "UI/UX Audit & Strategy",
    desc: "We identify friction points in your current product. Through heuristic evaluation and user testing, we provide a roadmap to increase conversion and retention.",
    icon: "◆"
  }
];

import ceoImg from "../assets/ceo.jpg";
import ctoImg from "../assets/cto_final.jpg";
import cmoImg from "../assets/cmo.png";

const founders = [
  {
    name: "Raju Kumar",
    role: "Chief Executive Officer",
    bio: "Driving the strategic vision and creative core of RollDeck. Raju bridges the gap between high-level ambition and impeccable studio execution.",
    image: ceoImg,
    gradient: "from-orange-600 via-orange-500 to-red-600",
    orbitColor: "#ff5500",
    orbitColor2: "#ff7733",
    tag: "CEO",
    linkedin: "https://linkedin.com/in/this-is-vatsal",
    twitter: "https://x.com/this-is-vatsal"
  },
  {
    name: "Vatsal Koriya",
    role: "Chief Technology Officer",
    bio: "The architect behind our technical excellence and data logic. Vatsal ensures every product is engineered for high performance at scale.",
    image: ctoImg,
    gradient: "from-orange-500 via-red-500 to-orange-700",
    orbitColor: "#ff7733",
    orbitColor2: "#ff4400",
    tag: "CTO",
    linkedin: "https://linkedin.com/in/vatsalkoriya",
    twitter: "https://x.com/vatsalkoriya"
  },
  {
    name: "Satwik Singh",
    role: "Chief Marketing Officer",
    bio: "Architecting brand growth and compelling narratives. Satwik transforms strategy into powerful stories that captivate and convert digital audiences.",
    image: cmoImg,
    gradient: "from-orange-500 via-orange-400 to-red-500",
    orbitColor: "#ff5500",
    orbitColor2: "#ff9900",
    tag: "CMO",
    linkedin: "https://linkedin.com/in/this-is-vatsal",
    twitter: "https://x.com/this-is-vatsal"
  }
];

const coreValues = [
  { title: "Obsessive Craftsmanship", desc: "We treat every pixel, every line of code, and every interaction as an opportunity to create something extraordinary.", icon: "🎯" },
  { title: "Radical Transparency", desc: "No hidden costs, no vague timelines. We share progress, challenges, and decisions openly with every client.", icon: "🔍" },
  { title: "Continuous Learning", desc: "We dedicate 20% of our studio time to exploring emerging technologies, frameworks, and design paradigms.", icon: "📚" },
  { title: "Client Partnership", desc: "We don't work for clients — we work with them. Every project is a collaborative journey toward shared goals.", icon: "🤝" }
];

const stats = [
  { value: "EST", label: "Founded 2026" },
  { value: "15+", label: "Projects Delivered" },
  { value: "10+", label: "Happy Clients" },
  { value: "100%", label: "Client Satisfaction" }
];

export default function About() {
  const mainRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Hero Animation
      gsap.from(".about-hero-heading", {
        y: 100,
        opacity: 0,
        duration: 1.4,
        ease: "expo.out"
      });
      gsap.from(".about-hero-sub", {
        y: 60,
        opacity: 0,
        duration: 1.2,
        delay: 0.3,
        ease: "expo.out"
      });
      gsap.from(".about-hero-kicker", {
        y: 30,
        opacity: 0,
        duration: 1,
        delay: 0.1,
        ease: "expo.out"
      });

      // Founder cards entrance
      gsap.from(".founder-card", {
        scrollTrigger: {
          trigger: ".founders-grid",
          start: "top 80%",
        },
        y: 80,
        opacity: 0,
        stagger: 0.2,
        duration: 1.2,
        ease: "expo.out"
      });

      // Stats counter animation
      gsap.from(".stat-item", {
        scrollTrigger: {
          trigger: ".stats-section",
          start: "top 80%",
        },
        y: 40,
        opacity: 0,
        stagger: 0.12,
        duration: 0.9,
        ease: "power3.out"
      });

      // Service items
      gsap.from(".service-item", {
        scrollTrigger: {
          trigger: ".services-list",
          start: "top 75%",
        },
        y: 100,
        opacity: 0,
        stagger: 0.1,
        duration: 1,
        ease: "power3.out"
      });

      // Founder card hover tilt
      gsap.utils.toArray(".founder-card").forEach((card) => {
        card.addEventListener("mousemove", (e) => {
          const rect = card.getBoundingClientRect();
          const x = (e.clientX - rect.left) / rect.width - 0.5;
          const y = (e.clientY - rect.top) / rect.height - 0.5;
          gsap.to(card, {
            rotationY: x * 10,
            rotationX: -y * 10,
            transformPerspective: 1200,
            duration: 0.5,
            ease: "power2.out"
          });
        });
        card.addEventListener("mouseleave", () => {
          gsap.to(card, { rotationY: 0, rotationX: 0, duration: 1.2, ease: "elastic.out(1,0.4)" });
        });
      });
    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <main className="about-page" ref={mainRef}>
      <SEO title="About Us" description="We are three friends forming one technical creative powerhouse. RollDeck operates at the intersection of aesthetic excellence and data-driven rigor." />

      {/* ── HERO SECTION ── */}
      <section className="about-hero-section group">
        <div className="about-hero-noise" />
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none overflow-hidden">
          <div className="text-[30vw] font-black text-white absolute -top-1/4 -right-1/4 select-none leading-none rotate-12">STUDIO</div>
        </div>
        
        {/* Animated Particles */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-orange-500/10 blur-[100px] animate-pulse pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-red-600/10 blur-[120px] animate-pulse pointer-events-none" />

        <div className="container relative z-10">
          <div className="about-hero-inner">
            <div className="about-hero-left">
              <span className="about-hero-kicker text-orange-500 font-black tracking-[0.6em] mb-10 block">01 / The Studio Index</span>
              <h1 className="about-hero-heading text-6xl md:text-9xl font-black uppercase tracking-tighter leading-[0.8] mb-12 text-white">
                Engineering <br />
                The <span className="italic text-transparent stroke-text" style={{ WebkitTextStroke: "1.5px white" }}>Aesthetic</span><br />
                Experience.
              </h1>
              <p className="about-hero-sub text-white/50 text-xl max-w-2xl leading-relaxed mb-16 font-bold italic">
                "Three founders. One technical creative powerhouse. RollDeck Studio bridges the gap between high-level ambition and impeccable studio execution."
              </p>
              <div className="hero-cta-row flex gap-6 flex-wrap">
                <a href="#founders" className="hero-btn-premium border-orange-600/30 bg-orange-600 shadow-xl shadow-orange-600/20">Team Index</a>
                <a href="#services" className="hero-btn-premium !bg-transparent !border-white/20 hover:!bg-white/10 hover:!text-white">Capabilites</a>
              </div>
            </div>
            
            {/* Immersive Center Element */}
            <div className="about-hero-right hidden lg:flex justify-end pr-10">
               <div className="relative group/orbit">
                  <div className="w-[450px] h-[450px] border border-white/5 rounded-full animate-spin-slow opacity-20" />
                  <div className="w-[350px] h-[350px] border-2 border-dashed border-orange-500/20 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-spin-slow duration-[30s]" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                    <span className="text-8xl font-black italic tracking-tighter text-white/5 group-hover/orbit:text-white/20 transition-all duration-1000">EST.</span>
                    <span className="block text-4xl font-black text-orange-500 mt-2">2026</span>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── MARQUEE SECTION ── */}
      <section className="marquee-section overflow-hidden py-14 border-b border-white/10 bg-white/[0.01]">
        <div className="flex whitespace-nowrap marquee-wrapper">
          <div className="marquee-content flex gap-12 text-[5vw] font-black uppercase tracking-tighter text-white/10 italic">
            <span>Precision Design ✦ Digital Strategy ✦ Data Logic ✦ Creative Direction ✦ Brutalist Aesthetics ✦ </span>
            <span>Precision Design ✦ Digital Strategy ✦ Data Logic ✦ Creative Direction ✦ Brutalist Aesthetics ✦ </span>
          </div>
        </div>
      </section>

      {/* ── STATS SECTION ── */}
      <section className="stats-section py-24 border-b border-white/5 bg-white/[0.01]">
        <div className="container">
          <div className="stats-grid grid grid-cols-2 lg:grid-cols-4 gap-12">
            {stats.map((s, i) => (
              <div key={i} className="stat-item interactive group text-center lg:text-left border-l border-white/5 pl-8 hover:border-orange-500 transition-all duration-500">
                <span className="stat-value text-5xl lg:text-7xl font-black text-white group-hover:text-orange-500 transition-colors duration-500 block mb-2">{s.value}</span>
                <span className="stat-label text-[10px] uppercase tracking-[0.4em] text-white/30 group-hover:text-white transition-colors">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STUDIO DNA ── */}
      <StudioDNA />

      {/* ── STUDIO PHILOSOPHY ── */}
      <StudioPhilosophy />

      {/* ── PROCESS SECTION ── */}
      <section className="process-section py-32 border-b border-white/5 bg-white/[0.01]">
        <div className="container">
          <Process />
        </div>
      </section>

      {/* ── MANIFESTO ── */}
      <StudioManifesto />

      {/* ── FOUNDERS SECTION ── */}
      <section className="founders-section py-32" id="founders">
        <div className="container">
          <div className="section-header mb-24 max-w-3xl">
            <span className="section-kicker text-orange-500 text-[10px] font-black uppercase tracking-[0.5em] mb-6 block">Our Leadership</span>
            <h2 className="section-title text-5xl lg:text-7xl font-black uppercase tracking-tighter text-white mb-8">The Minds Behind <span className="italic">RollDeck.</span></h2>
            <p className="section-sub text-white/40 text-lg lg:text-xl leading-relaxed font-bold italic">Three specialist founders, one unified vision — to craft digital experiences that redefine the modern web standard.</p>
          </div>

          <div className="founders-grid grid grid-cols-1 md:grid-cols-3 gap-8">
            {founders.map((founder, i) => (
              <div key={i} className="founder-card group interactive perspective-1000 bg-white/[0.02] border border-white/5 p-12 rounded-[3.5rem] hover:bg-white/[0.05] transition-all duration-700 hover:border-orange-500/20 relative overflow-hidden h-full">
                <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-700 bg-gradient-to-br from-orange-500/20 to-transparent pointer-events-none" />
                
                {/* Circular Avatar with Orbiting Ring */}
                <div className="founder-avatar-container relative mx-auto mb-12 w-56 h-56 flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full border-2 border-dotted animate-spin-slow opacity-20" style={{ borderColor: founder.orbitColor, animationDuration: '25s' }} />
                  <div className="orbit-ring absolute inset-[-15px] rounded-full opacity-30 animate-spin-slow" style={{ border: `1px solid ${founder.orbitColor}33`, animationDuration: '12s' }} />
                  <div className="avatar-glow absolute inset-0 rounded-full blur-[100px] opacity-0 group-hover:opacity-40 transition-opacity duration-1000" style={{ background: `radial-gradient(circle, ${founder.orbitColor} 0%, transparent 70%)` }} />
                  
                  <div className={`founder-avatar relative z-10 w-48 h-48 rounded-full overflow-hidden border-2 border-white/10 group-hover:border-orange-500/40 transition-all duration-1000 bg-gradient-to-br ${founder.gradient} flex items-center justify-center p-1`}>
                    <div className="w-full h-full rounded-full overflow-hidden bg-bg-dark flex items-center justify-center">
                       {founder.image ? (
                         <img src={founder.image} alt={founder.name} loading="lazy" className="w-full h-full object-cover group-hover:scale-115 transition-transform duration-1000 grayscale group-hover:grayscale-0 opacity-80 group-hover:opacity-100" />
                       ) : (
                         <span className="founder-initials text-6xl font-black text-white italic group-hover:scale-125 transition-transform duration-1000">{founder.initials}</span>
                       )}
                    </div>
                  </div>
                  <div className="founder-tag-badge absolute bottom-0 left-12 px-6 py-2 rounded-full border bg-black/90 backdrop-blur-xl text-[9px] font-black uppercase tracking-[0.3em] z-20 group-hover:border-orange-500/50 group-hover:text-orange-500 transition-colors" style={{ color: founder.orbitColor, borderColor: `${founder.orbitColor}33` }}>
                    {founder.tag}
                  </div>
                </div>

                <div className="founder-info text-center relative z-10">
                  <span className="founder-role text-[10px] uppercase tracking-[0.4em] text-white/40 block mb-3 font-bold">{founder.role}</span>
                  <h3 className="founder-name text-2xl lg:text-3xl font-black uppercase text-white mb-6 group-hover:text-orange-500 transition-colors tracking-tighter">{founder.name}</h3>
                  <p className="founder-bio text-sm lg:text-base text-white/50 leading-relaxed max-w-xs mx-auto mb-10 group-hover:text-white/70 transition-colors italic font-bold">
                    "{founder.bio}"
                  </p>
                  <div className="founder-links flex justify-center gap-6">
                    <a href={founder.linkedin} target="_blank" rel="noopener noreferrer" className="founder-link interactive text-white/20 hover:text-white transition-all transform hover:scale-125">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                    </a>
                    <a href={founder.twitter} target="_blank" rel="noopener noreferrer" className="founder-link interactive text-white/20 hover:text-white transition-all transform hover:scale-125">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES LIST ── */}
      <section className="services-section py-32 border-b border-white/5 bg-white/[0.01]" id="services">
        <div className="container">
          <div className="services-top mb-24 grid grid-cols-1 md:grid-cols-2 gap-10 items-end">
            <div>
              <span className="section-kicker text-white/30 text-[10px] font-black uppercase tracking-[0.5em] mb-4 block">Capabilites Index</span>
              <h2 className="section-title text-4xl lg:text-7xl font-black uppercase tracking-tighter text-white leading-none">What We Do.</h2>
            </div>
            <p className="services-top-sub text-white/40 text-lg font-bold italic leading-relaxed">
              End‑to‑end digital transformations engineered for speed and designed for absolute commercial impact.
            </p>
          </div>
          <div className="services-list divide-y divide-white/10">
            {services.map((s, i) => (
              <div key={i} className="service-item interactive flex flex-col lg:flex-row items-baseline lg:items-center py-12 group hover:px-8 transition-all duration-700">
                <div className="service-item-left flex items-center gap-12 lg:w-1/2">
                  <span className="service-index text-4xl font-black text-white/5 group-hover:text-orange-500 transition-colors uppercase italic font-mono tracking-tighter">{String(i + 1).padStart(2, "0")}</span>
                  <span className="service-icon text-3xl group-hover:scale-150 transition-transform origin-left">{s.icon}</span>
                  <h3 className="service-title text-2xl lg:text-3xl font-black uppercase text-white/80 group-hover:text-white transition-colors tracking-tighter">{s.title}</h3>
                </div>
                <p className="service-desc lg:w-1/3 text-white/40 font-bold my-8 lg:my-0 group-hover:text-white/60 transition-colors italic leading-relaxed">"{s.desc}"</p>
                <div className="flex-grow"></div>
                <span className="service-arrow text-3xl text-white/10 group-hover:text-orange-500 group-hover:translate-x-4 transition-all duration-700">→</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TIMELINE ── */}
      <section className="py-40 bg-zinc-950">
        <div className="container">
          <div className="text-center mb-32">
            <span className="section-kicker text-orange-500 text-[10px] font-black uppercase tracking-[0.6em] mb-6 block">Our Trajectory</span>
            <h2 className="section-title text-5xl lg:text-8xl font-black uppercase tracking-tighter text-white mb-8">The Future <span className="italic">Protocol.</span></h2>
            <p className="section-sub text-white/30 text-lg lg:text-xl font-bold italic">From 2026 initialization to a new decade of technical creative mastery.</p>
          </div>

          <div className="relative max-w-5xl mx-auto pl-10 md:pl-0">
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-[1px] bg-white/10 -translate-x-1/2" />
            {[
              { year: "2026", title: "The Initialization", desc: "RollDeck Studio is founded in Jaipur. A technical collective of three friends obsessive about technical precision and design logic.", side: "left" },
              { year: "2027", title: "Neural Synthesis", desc: "Projected integration of AI-driven logic foundations, merging human-centric design with machine-learned efficiency.", side: "right" },
              { year: "2028", title: "Industrial Scale", desc: "Expansion into global enterprise infrastructure, setting the industrial benchmark for high-performance digital assets.", side: "left" },
              { year: "2029", title: "Protocol Mastery", desc: "Establishing the R-D Protocol: a proprietary methodology for absolute digital sovereignty and commercial impact.", side: "right" },
              { year: "2030", title: "Next-Gen Legacy", desc: "Defining the next decade of digital interaction. From interfaces to immersive ecosystems that think and scale.", side: "left" },
            ].map((item, i) => (
              <div key={i} className={`timeline-item relative flex flex-col md:flex-row mb-32 last:mb-0 ${item.side === "right" ? "md:flex-row-reverse" : ""}`}>
                <div className={`md:w-1/2 ${item.side === "right" ? "md:pl-20" : "md:pr-20 md:text-right"}`}>
                   <div className="inline-block px-4 py-1 rounded bg-orange-600/10 border border-orange-500/20 text-orange-500 font-black text-xl mb-6">{item.year}</div>
                   <h3 className="text-2xl lg:text-4xl font-black uppercase text-white mb-4 italic tracking-tighter">{item.title}</h3>
                   <p className="text-white/40 text-base md:text-lg leading-relaxed font-bold italic">"{item.desc}"</p>
                </div>
                <div className="absolute left-[-40px] md:left-1/2 -translate-x-1/2 top-8 w-6 h-6 rounded-full bg-bg-dark border-4 border-orange-600/50 z-10 shadow-[0_0_20px_rgba(255,85,0,0.5)]" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CLIENT STORIES ── */}
      <ClientStories />

      {/* ── TECH STACK ── */}
      <section className="py-32 border-b border-white/5 bg-zinc-950 relative overflow-hidden">
        <div className="absolute top-1/2 right-[-10vw] text-[20vw] font-black text-white/[0.02] -translate-y-1/2 pointer-events-none select-none italic">STACK</div>
        <div className="container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start mb-24">
            <div>
              <span className="section-kicker text-orange-500 text-[10px] font-black uppercase tracking-[0.5em] mb-6 block">Our Arsenal</span>
              <h2 className="section-title text-4xl lg:text-7xl font-black uppercase tracking-tighter text-white leading-none">Technology Ecosystem.</h2>
            </div>
            <p className="section-sub text-white/40 text-lg leading-relaxed font-bold italic">We selectively deploy the world's most robust digital frameworks to ensure your product is built on an unshakeable foundation.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
            {[
              { name: "React", category: "Core Library" },
              { name: "Next.js", category: "Framework" },
              { name: "Node.js", category: "Runtime" },
              { name: "GSAP", category: "Motion Engine" },
              { name: "Figma", category: "UI/UX Index" },
              { name: "D3.js", category: "Data Logic" },
              { name: "Tailwind", category: "Utility CSS" },
              { name: "Firebase", category: "Cloud DB" },
              { name: "GA4", category: "Analytics" },
              { name: "React Native", category: "Mobile iOS/Android" },
              { name: "Vercel", category: "Edge Hosting" },
              { name: "Git", category: "VC & CI/CD" },
            ].map((tech, i) => (
              <div key={i} className="tech-card interactive group bg-white/[0.02] border border-white/5 rounded-3xl p-8 text-center hover:bg-white/[0.05] transition-all duration-500 hover:border-orange-500/20">
                <p className="font-black text-xl uppercase text-white/70 group-hover:text-white transition-colors mb-2 tracking-tighter">{tech.name}</p>
                <div className="h-[1px] w-8 mx-auto bg-white/10 group-hover:w-12 group-hover:bg-orange-500 transition-all duration-500 mb-3" />
                <span className="text-[9px] uppercase tracking-widest text-white/20 group-hover:text-orange-500 transition-colors block font-bold">{tech.category}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CULTURE ── */}
      <section className="py-32 border-b border-white/5 bg-zinc-950">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-end mb-24">
            <div>
              <span className="section-kicker text-orange-500 text-[10px] font-black uppercase tracking-[0.5em] mb-6 block">Operating Values</span>
              <h2 className="section-title text-4xl lg:text-7xl font-black uppercase tracking-tighter text-white leading-none">Studio Culture.</h2>
            </div>
            <p className="text-white/40 text-lg leading-relaxed font-bold italic">How we think determines what we build. These are the four pillars of the RollDeck mindset.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {coreValues.map((v, i) => (
              <div key={i} className="group interactive bg-white/[0.02] border border-white/5 rounded-[2.5rem] p-12 hover:bg-white/[0.05] transition-all duration-500 hover:border-orange-500/10">
                <div className="flex items-start gap-8 mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-center text-4xl group-hover:scale-110 transition-transform duration-500">
                    {v.icon}
                  </div>
                  <h3 className="text-2xl lg:text-3xl font-black uppercase text-white/80 group-hover:text-white transition-colors mt-2 tracking-tighter">{v.title}</h3>
                </div>
                <p className="text-white/40 text-base md:text-lg leading-relaxed pl-24 group-hover:text-white/70 transition-colors font-bold italic">"{v.desc}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── JOIN US ── */}
      <section className="py-40 bg-white/[0.01]">
        <div className="container">
          <div className="bg-white/[0.02] border border-white/5 rounded-[4rem] p-12 md:p-32 text-center relative overflow-hidden group">
            <div className="absolute inset-0 opacity-[0.05] group-hover:opacity-[0.1] transition-opacity duration-1000" style={{ backgroundImage: "radial-gradient(circle at 30% 50%, #ff5500, transparent 40%), radial-gradient(circle at 70% 50%, #ff2200, transparent 40%)" }} />
            <div className="relative z-10">
              <span className="text-[10px] uppercase tracking-[1em] text-white/30 block mb-12 font-black pl-4 overflow-hidden h-4 text-white">Future Partners</span>
              <h2 className="text-4xl md:text-8xl font-black uppercase tracking-tighter mb-10 leading-[0.8] italic text-white">
                Seeking the <br />
                <span className="text-transparent stroke-text" style={{ WebkitTextStroke: "2px white" }}>Relentless.</span>
              </h2>
              <p className="text-white/30 text-lg md:text-2xl max-w-3xl mx-auto mb-16 leading-relaxed font-bold italic">
                If you are a specialist who values absolute precision over mediocrity, we should talk. RollDeck is always seeking elite technical talent.
              </p>
              <div className="flex flex-wrap gap-8 justify-center items-center">
                <a href="mailto:rolldeckinfo@gmail.com?subject=Strategic%20Inquiry" className="group/btn relative px-12 py-6 rounded-full bg-white text-black font-black uppercase tracking-widest text-sm overflow-hidden interactive flex items-center gap-4">
                  <span className="relative z-10 transition-transform group-hover/btn:-translate-x-2">Index Portfolio</span>
                  <span className="text-2xl transition-transform group-hover/btn:translate-x-2 relative z-10">→</span>
                  <div className="absolute inset-0 bg-orange-500 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500"></div>
                </a>
                <Link to="/contact" className="hero-btn-premium !bg-transparent !border-white/20 hover:!bg-white/10 hover:!text-white border-2 px-12 py-6">Consultation</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}