import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProjectCard from "../components/ProjectCard";
import BusinessCard from "../components/BusinessCard";
import SEO from "../components/SEO";
import FAQ from "../components/FAQ";
import Process from "../components/Process";
import WhyChooseUs from "../components/WhyChooseUs";
import ClientStories from "../components/ClientStories";

// Assets
import toothworld from "../assets/tooth-world.png";
import krishna from "../assets/krishna-juice.jpg";
import burgersignature from "../assets/burger-signature.png";

gsap.registerPlugin(ScrollTrigger);

const projectsData = [
  {
    index: 1,
    tag: "Clinic",
    title: "Tooth World Clinic",
    image: toothworld,
    description: "Architecting a high-authority digital presence for a premier dental clinic. Focused on appointment-driven growth and patient trust through premium aesthetic execution.",
    stats: "200% Booking Growth",
    year: "2023",
    tech: ["Next.js", "GSAP", "Framer"],
    challenge: "Low-trust legacy website.",
    link: "/projects/tooth-world"
  },
  {
    index: 2,
    tag: "Scale",
    title: "Krishna Juice",
    image: krishna,
    description: "Bridging traditional retail with modern efficiency. Developed a custom E-commerce engine and menu system designed for high-volume local order automation.",
    stats: "15k+ Monthly Orders",
    year: "2023",
    tech: ["React", "Firebase", "WhatsApp API"],
    challenge: "Manual order management bottlenecks.",
    link: "/projects/krishna-juice"
  },
  {
    index: 3,
    tag: "Branding",
    title: "BURGER SIGNATURE",
    image: burgersignature,
    description: "Defining the visual language of a premium burger franchise. A dark, bold aesthetic combined with a standardized menu ecosystem for national scaling.",
    stats: "Brand Cohesion 100%",
    year: "2024",
    tech: ["Branding", "UI/UX", "Strategic Motion"],
    challenge: "Inconsistent franchise identity.",
    link: "/projects/burger-signature"
  },
  {
    index: 4,
    tag: "Fintech",
    title: "OmniTrade AI",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2564",
    description: "High-latency data visualizer for institutional traders. Integrating real-time market prediction models into a clean, lightning-fast B2B trading dashboard.",
    stats: "90ms Data Latency",
    year: "2025",
    tech: ["Next.js", "D3.js", "WebSockets"],
    challenge: "Data overload and visualization lag.",
    link: "/projects/omnitrade"
  },
];

const homeServices = [
  { title: "Design", icon: "✦", desc: "User-centric interfaces that communicate brand values." },
  { title: "Development", icon: "◈", desc: "Robust, scalable, and high-performance digital products." },
  { title: "Strategy", icon: "◉", desc: "Data-driven roadmaps to navigate complex markets." },
  { title: "Branding", icon: "◇", desc: "Visual identities that stand out from the noise." }
];

const clientLogos = [
  "Tooth World", "Krishna Juice", "Burger Signature", "FoundAI",
  "WeGlow", "Dental Clinic", "SidePlus", "NexTech"
];

const homeFaqs = [
  { category: "Capabilities", q: "What services does RollDeck Studio offer?", a: "We specialize in end-to-end digital transformation, including high-performance web development (React/Next.js), brand identity design, UI/UX strategy, and data visualization. Our focus is on engineering digital ecosystems that drive commercial results." },
  { category: "Timeline", q: "How long does a typical project take?", a: "Timelines vary depending on complexity. A premium brand website typically takes 4-6 weeks, while more complex web applications or custom platforms can range from 8-16 weeks." },
  { category: "Finance", q: "What is your pricing structure?", a: "We operate on a project-based pricing model tailored to your specific requirements, scope, and technical complexity. We provide transparent, value-driven quotes after an initial consultation." },
  { category: "Technical", q: "What technologies do you use?", a: "Our core tech stack includes React, Next.js, Node.js, GSAP for high-end animations, and Figma for design. We selectively choose the best technologies based on each project's unique needs." },
  { category: "Partnership", q: "Do you work with early-stage startups?", a: "Absolutely. We enjoy partnering with ambitious founders who value design-led engineering. We help startups establish a high-authority digital presence early on." }
];

const heroStats = [
  { value: 15, suffix: "+", label: "Projects Delivered" },
  { value: 10, suffix: "+", label: "Happy Clients" },
  { value: 1, suffix: "", label: "Year of Excellence" },
  { value: 100, suffix: "%", label: "Client Satisfaction" }
];

export default function Home() {
  const mainRef = useRef(null);
  const [counters, setCounters] = useState(heroStats.map(() => 0));

  // GSAP Animations
  useEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tl.from(".home-hero-kicker", { y: 20, opacity: 0, duration: 0.8, ease: "power3.out" })
        .from(".home-hero-title span", { y: 100, opacity: 0, stagger: 0.1, duration: 1.2, ease: "expo.out" }, "-=0.6")
        .from(".hero-card-container", { scale: 0.8, opacity: 0, duration: 1.2, ease: "power4.out" }, "-=1");

      gsap.from(".hero-stat-item", {
        y: 30, opacity: 0, stagger: 0.1, duration: 0.8, ease: "power3.out", delay: 1.5
      });

      gsap.to(".hero-particle", {
        y: "random(-40, 40)", x: "random(-20, 20)", rotation: "random(-45, 45)",
        duration: "random(2, 4)", repeat: -1, yoyo: true, ease: "sine.inOut"
      });

      gsap.from(".home-service-card", {
        scrollTrigger: { trigger: ".home-services-grid", start: "top 80%" },
        y: 60, opacity: 0, stagger: 0.15, duration: 1, ease: "expo.out"
      });

      gsap.from(".client-marquee-section", {
        scrollTrigger: { trigger: ".client-marquee-section", start: "top 85%" },
        y: 30, opacity: 0, duration: 0.7, ease: "power3.out"
      });

      gsap.from(".faq-section-wrapper", {
        scrollTrigger: { trigger: ".faq-section-wrapper", start: "top 80%" },
        y: 40, opacity: 0, duration: 1.2, ease: "expo.out"
      });

      gsap.utils.toArray(".home-project-card-wrapper").forEach((card) => {
        gsap.to(card, {
          scrollTrigger: { trigger: card, scrub: true, start: "top bottom", end: "bottom top" },
          y: -40, rotationX: 10, ease: "none"
        });
      });

      // Projects Header Animations
      gsap.from(".projects-header h2", {
        scrollTrigger: { trigger: ".projects-header", start: "top 85%" },
        y: 80, opacity: 0, duration: 1.2, ease: "expo.out"
      });

      gsap.from(".projects-header p", {
        scrollTrigger: { trigger: ".projects-header", start: "top 85%" },
        y: 40, opacity: 0, delay: 0.2, duration: 1, ease: "power3.out"
      });

    }, mainRef);

    return () => ctx.revert();
  }, []);

  // Animated counter for stats
  useEffect(() => {
    const timeout = setTimeout(() => {
      const duration = 2000;
      const steps = 60;
      const interval = duration / steps;
      let step = 0;
      const timer = setInterval(() => {
        step++;
        const progress = Math.min(step / steps, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setCounters(heroStats.map(stat => Math.round(stat.value * eased)));
        if (step >= steps) clearInterval(timer);
      }, interval);
    }, 2000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <main className="home-page bg-bg-dark text-white overflow-hidden" ref={mainRef}>
      <SEO title="Home" description="RollDeck Studio engineers high-performance digital experiences that combine aesthetic rigor with technical excellence." />

      {/* ── HERO ── */}
      <section className="home-hero min-h-screen flex items-center relative py-32">
        <div className="absolute inset-0 z-0 opacity-[0.05]" style={{
          backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          transform: "perspective(1000px) rotateX(60deg) translateY(-200px) scale(2)",
          transformOrigin: "top"
        }} />

        <div className="container relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="home-hero-left">
            <span className="home-hero-kicker text-white/40 uppercase tracking-[0.4em] text-[10px] font-bold block mb-6 px-1 border-l-2 border-white/20">Creative Agency</span>
            <h1 className="home-hero-title text-6xl lg:text-[7vw] font-black uppercase leading-[0.9] tracking-tighter">
              <span className="block">Digital</span>
              <span className="block italic text-transparent stroke-text" style={{ WebkitTextStroke: "1px #ff5500" }}>Rigour</span>
              <span className="block">Agency.</span>
            </h1>
            <p className="mt-10 text-lg text-white/50 max-w-md leading-relaxed">
              Based in Jaipur, India. We engineer high-performance digital ecosystems that bridge the gap between aesthetic excellence and commercial results.
            </p>
            <div className="mt-10 flex flex-wrap gap-4 items-center">
              <Link to="/projects" className="hero-btn-premium">See Work</Link>
              <Link to="/contact" className="hero-btn-premium !bg-transparent !border-white/20 hover:!bg-white/10 hover:!text-white">Get Quote</Link>
              <a href="https://wa.me/919939429446" target="_blank" rel="noopener noreferrer" className="hero-btn-premium !bg-orange-600/5 !border-orange-600/30 !text-orange-500 hover:!bg-orange-600/10 hover:!text-orange-400">
                <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
                WhatsApp
              </a>
            </div>

            {/* Hero Stats Counter */}
            <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-6 pt-10 border-t border-white/5">
              {heroStats.map((stat, i) => (
                <div key={i} className="hero-stat-item">
                  <span className="text-2xl md:text-3xl font-black tracking-tight block">{counters[i]}{stat.suffix}</span>
                  <span className="text-[9px] uppercase tracking-widest text-white/30 mt-1 block">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="home-hero-right flex justify-center lg:justify-end relative">
            <div className="hero-card-container relative z-10 interactive">
              <BusinessCard />
            </div>
            <div className="hero-particle absolute -top-10 -right-10 w-12 h-12 bg-white/5 border border-white/10 backdrop-blur-xl rounded-xl z-0" />
            <div className="hero-particle absolute bottom-20 -left-10 w-16 h-16 bg-white/10 border border-white/10 backdrop-blur-xl rounded-full z-0" />
            <div className="hero-particle absolute top-1/2 left-1/4 w-8 h-8 bg-orange-500/20 blur-xl z-0" />
          </div>
        </div>
      </section>

      {/* ── CLIENT LOGOS MARQUEE ── */}
      <section className="client-marquee-section py-14 border-y border-white/5 bg-white/[0.01] overflow-hidden">
        <div className="container ">
          <p className="text-[10px] uppercase tracking-[0.5em] text-white/20 text-center mb-8 font-bold">Trusted by brands across industries</p>
        </div>
        <div className="relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#050505] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#050505] to-transparent z-10 pointer-events-none" />
          <div className="flex gap-6 animate-scroll-logos">
            {[...clientLogos, ...clientLogos, ...clientLogos].map((name, i) => (
              <div key={i} className="flex-shrink-0 px-8 py-5 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.06] transition-all duration-400 group interactive whitespace-nowrap">
                <span className="text-white/20 group-hover:text-white/60 font-bold text-sm uppercase tracking-wider transition-colors">{name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <section className="home-marquee py-12 border-b border-white/5 bg-white/[0.02]">
        <div className="marquee-wrapper overflow-hidden whitespace-nowrap flex">
          <div className="marquee-content flex gap-12 text-[4vw] font-black uppercase tracking-tighter text-white/10 italic">
            <span>Engineering Excellence ✦ User Experience ✦ Brand Identity ✦ Digital Strategy ✦ </span>
            <span>Engineering Excellence ✦ User Experience ✦ Brand Identity ✦ Digital Strategy ✦ </span>
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="home-services-section py-32 border-b border-white/5 relative overflow-hidden">
        {/* Service Accents */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[150px] bg-orange-500/[0.03] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full blur-[100px] bg-red-600/[0.03] pointer-events-none" />
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 mb-24 items-end">
            <div className="lg:col-span-2">
              <span className="text-[10px] uppercase tracking-[0.5em] text-orange-500 block mb-6 font-bold">Expertise</span>
              <h2 className="text-5xl lg:text-7xl font-black uppercase tracking-tight">Capabilities.</h2>
            </div>
            <p className="text-white/40 text-sm leading-relaxed max-w-xs">
              Bridging the gap between conceptual design and robust technical implementation at scale.
            </p>
          </div>

          <div className="home-services-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {homeServices.map((service, i) => (
              <Link to="/services" key={i} className="home-service-card group interactive bg-white/[0.03] p-10 border border-white/5 rounded-3xl hover:bg-white/[0.06] transition-all duration-500 hover:-translate-y-2 block">
                <span className="text-3xl mb-6 block group-hover:scale-125 transition-transform origin-left">{service.icon}</span>
                <h3 className="text-xl font-bold uppercase mb-4">{service.title}</h3>
                <p className="text-sm text-white/40 leading-relaxed mb-6">{service.desc}</p>
                <span className="text-white/20 group-hover:text-white/60 transition-colors text-sm flex items-center gap-2">
                  Learn more <span className="group-hover:translate-x-1 transition-transform">→</span>
                </span>
              </Link>
            ))}
          </div>

          <div className="text-center mt-16">
            <Link to="/services" className="inline-flex items-center gap-4 px-10 py-4 border border-white/10 text-white/50 font-bold uppercase tracking-widest text-xs rounded-full interactive hover:border-white/30 hover:text-white transition-all group">
              <span>View All Services</span>
              <span className="group-hover:translate-x-2 transition-transform">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── HOW WE WORK ── */}
      <section className="process-section-home py-32 border-b border-white/5 bg-white/[0.01]">
        <div className="container overflow-visible lg:overflow-hidden">
          <Process />
        </div>
      </section>

      {/* ── WHY CHOOSE US ── */}
      <WhyChooseUs />

      {/* ── FEATURED PROJECTS ── */}
      <section id="projects" className="home-projects-section py-32 border-b border-white/5 relative">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-orange-600/[0.02] blur-[150px] rounded-full pointer-events-none -translate-y-1/2" />

        <div className="container mb-32 relative z-10">
          <div className="projects-header max-w-4xl">
            <span className="text-[10px] uppercase tracking-[0.5em] text-white/30 block mb-6">Portfolio Portfolio</span>
            <h2 className="text-6xl lg:text-[10vw] font-black uppercase tracking-tighter leading-[0.8] mb-12">
              Featured<br />
              <span className="italic text-transparent stroke-text" style={{ WebkitTextStroke: "1px #ff5500" }}>Case Studies.</span>
            </h2>
            <p className="text-white/40 text-lg lg:text-xl leading-relaxed max-w-2xl">
              We don't just ship code; we ship commercial outcomes. Explore a selection of our recent technical creative interventions.
            </p>
          </div>
        </div>

        <div className="projects-feed container space-y-32 lg:space-y-64">
          {projectsData.map((p) => (
            <div key={p.index} className="home-project-card-wrapper">
              <ProjectCard project={p} />
            </div>
          ))}
        </div>

        <div className="text-center py-40 border-t border-white/5 mt-40">
          <Link to="/projects" className="group text-3xl lg:text-5xl font-black uppercase tracking-tighter interactive inline-flex items-center gap-8">
            <span className="group-hover:translate-x-[-20px] transition-transform">See our Full Index</span>
            <span className="text-[#ff5500] group-hover:scale-150 transition-transform">→</span>
          </Link>
        </div>
      </section>

      {/* ── CLIENT STORIES ── */}
      <ClientStories />

      {/* ── FAQ ── */}
      <section className="faq-section-wrapper py-32 border-b border-white/5 bg-white/[0.01]">
        <div className="container">
          <FAQ faqs={homeFaqs} title="Frequently Asked Questions" subtitle="Deep Dive" />
        </div>
      </section>

      {/* ── MANIFESTO PREVIEW ── */}
      <section className="home-manifesto-preview py-40 relative overflow-hidden bg-bg-dark border-t border-white/5">
        <div className="container relative z-10 text-center">
          <span className="text-[10px] uppercase font-black tracking-[0.6em] text-orange-500 mb-12 block">Studio Manifesto</span>
          <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter text-white mb-10 leading-[0.9]">
            Engineering the erasure of <br />
            <span className="italic text-transparent stroke-text" style={{ WebkitTextStroke: "1.5px white" }}>Mediocrity.</span>
          </h2>
          <p className="text-white/30 text-lg md:text-2xl font-bold italic max-w-3xl mx-auto mb-16 leading-relaxed">
            "Industry standards are the floor, not the ceiling. We reject the 'good enough' to engineer the exceptional."
          </p>
          <Link to="/about" className="hero-btn-premium !inline-flex hover:scale-110">Read Full Manifesto</Link>
        </div>
        {/* Large BG Text */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[40vw] font-black text-white/[0.01] pointer-events-none select-none italic">PROTOCOL</div>
      </section>

    </main>

  );
}
