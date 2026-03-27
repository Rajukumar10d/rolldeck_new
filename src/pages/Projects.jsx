import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProjectCard from "../components/ProjectCard";
import SEO from "../components/SEO";
import Process from "../components/Process";

// Assets
import toothworld from "../assets/tooth-world.png";
import krishna from "../assets/krishna-juice.jpg";
import burgersignature from "../assets/burger-signature.png";

gsap.registerPlugin(ScrollTrigger);

const projectsIndex = [
  {
    index: 1,
    tag: "Medical Excellence",
    title: "Tooth World Clinic",
    image: toothworld,
    description: "Architecting a high-authority digital presence for a premier dental clinic. Focused on appointment-driven growth and patient trust.",
    category: "Web & Branding",
    stats: "200% Booking Growth",
    year: "2023",
    tech: ["Next.js", "GSAP", "Framer"],
    challenge: "Low-trust legacy website.",
    link: "/projects/tooth-world",
    discipline: "Product"
  },
  {
    index: 2,
    tag: "Retail Automation",
    title: "Krishna Juice",
    image: krishna,
    description: "Bridging traditional retail with modern efficiency. Developed a custom E-commerce engine and menu system for local order automation.",
    category: "E-Commerce",
    stats: "15k+ Monthly Orders",
    year: "2023",
    tech: ["React", "Firebase", "WhatsApp API"],
    challenge: "Manual order bottlenecks.",
    link: "/projects/krishna-juice",
    discipline: "Growth"
  },
  {
    index: 3,
    tag: "Luxury F&B",
    title: "BURGER SIGNATURE",
    image: burgersignature,
    description: "Defining the visual language of a premium burger franchise. A dark, bold aesthetic combined with a standardized menu ecosystem.",
    category: "Brand Identity",
    stats: "100% Brand Cohesion",
    year: "2024",
    tech: ["Branding", "UI/UX", "Strategic Motion"],
    challenge: "Inconsistent franchise identity.",
    link: "/projects/burger-signature",
    discipline: "Brand"
  },
  {
    index: 4,
    tag: "Fintech Interface",
    title: "OmniTrade AI",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2564",
    description: "High-latency data visualizer for institutional traders. Integrating real-time market prediction models into a lightning-fast B2B trading dashboard.",
    category: "Web Application",
    stats: "90ms Data Latency",
    year: "2025",
    tech: ["Next.js", "D3.js", "WebSockets"],
    challenge: "Data visualization lag.",
    link: "/projects/omnitrade",
    discipline: "Product"
  },
  {
    index: 5,
    tag: "SaaS Ecosystem",
    title: "WeGlow Performance",
    image: "https://images.unsplash.com/photo-1576267423445-b2e0078d68bc?q=80&w=2564",
    description: "End-to-end mobile design and development for a fitness coaching platform with real-time data tracking and member engagement modules.",
    category: "App Development",
    stats: "Engagement +88%",
    year: "2024",
    tech: ["React Native", "Node.js", "Redux"],
    challenge: "High churn rate.",
    link: "/projects/weglow",
    discipline: "Product"
  },
  {
    index: 6,
    tag: "Enterprise Tech",
    title: "NexTech Solutions",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=2564",
    description: "A comprehensive digital overhaul for a B2B tech giant, focused on lead generation, authority-building content, and scalable architecture.",
    category: "Strategic Branding",
    stats: "Qualified Leads +45%",
    year: "2026",
    tech: ["Branding", "Vercel", "Tailwind"],
    challenge: "Fragmented B2B messaging.",
    link: "/projects/nextech",
    discipline: "Brand"
  }
];

const categories = ["All", "Brand", "Product", "Growth"];

const projectMetrics = [
  { value: "50+", label: "Index Entries" },
  { value: "30+", label: "Studio Partners" },
  { value: "100%", label: "Deployment Success" },
  { value: "5/5", label: "Industry Rating" }
];

export default function Projects() {
  const [filter, setFilter] = useState("All");
  const [viewMode, setViewMode] = useState("list"); // list or grid
  const mainRef = useRef(null);

  const filteredProjects =
    filter === "All"
      ? projectsIndex
      : projectsIndex.filter((p) => p.discipline === filter);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(".projects-hero-title span", {
        y: 100, opacity: 0, stagger: 0.1, duration: 1.2, ease: "expo.out"
      });

      gsap.from(".filter-btn-container", {
        y: 20, opacity: 0, duration: 0.8, ease: "power3.out", delay: 0.5
      });

      gsap.from(".projects-metric", {
        scrollTrigger: { trigger: ".projects-metrics-bar", start: "top 85%" },
        y: 30, opacity: 0, stagger: 0.1, duration: 0.8, ease: "power3.out"
      });
      
      // Initial card entrance
      gsap.from(".project-row, .project-grid-item", {
        y: 60, opacity: 0, stagger: 0.1, duration: 1, ease: "expo.out", delay: 0.8
      });

    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <main className="projects-index-page bg-bg-dark text-white min-h-screen pt-32 lg:pt-48" ref={mainRef}>
      <SEO title="Studio Index" description="The documented history of RollDeck Studio's technical creative interventions. Explore our full project index." />

      {/* ── HERO SECTION ── */}
      <section className="container mb-32 relative overflow-hidden">
        <div className="flex flex-col lg:flex-row justify-between items-baseline lg:items-end gap-16 relative z-10">
          <div className="flex-1">
            <span className="text-[10px] uppercase font-black tracking-[0.5em] text-orange-500 block mb-8">System Repository</span>
            <h1 className="projects-hero-title text-5xl md:text-8xl lg:text-[10vw] font-black uppercase leading-[0.8] tracking-tighter italic text-white flex flex-col">
              <span className="block border-l-8 border-orange-600 pl-4 mb-4">Studio</span>
              <span className="block text-transparent stroke-text" style={{ WebkitTextStroke: "1px white" }}>Index.</span>
            </h1>
          </div>

          <div className="lg:text-right w-full lg:w-auto">
             <div className="flex justify-between lg:justify-end items-center mb-6">
                <p className="text-[9px] uppercase tracking-widest text-white/30 font-bold">Discipline Sort</p>
                {/* View Mode Toggle */}
                <div className="flex gap-2 bg-white/[0.03] border border-white/5 p-1 rounded-full ml-4">
                  <button onClick={() => setViewMode("list")} className={`px-3 py-1 text-[8px] uppercase tracking-widest rounded-full transition-all ${viewMode === "list" ? "bg-white text-black" : "text-white/40"}`}>List</button>
                  <button onClick={() => setViewMode("grid")} className={`px-3 py-1 text-[8px] uppercase tracking-widest rounded-full transition-all ${viewMode === "grid" ? "bg-white text-black" : "text-white/40"}`}>Grid</button>
                </div>
             </div>
            
            <div className="filter-btn-container flex flex-wrap lg:justify-end gap-3">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-6 py-3 rounded-full border text-[10px] font-black uppercase tracking-widest transition-all duration-500 interactive
                  ${
                    filter === cat
                      ? "bg-orange-600 text-white border-orange-600 shadow-[0_10px_30px_rgba(255,85,0,0.3)]"
                      : "bg-white/5 border-white/10 text-white/50 hover:border-white/40 hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        <div className="absolute top-0 right-0 text-[40vw] font-black text-white/[0.01] -translate-y-1/2 select-none pointer-events-none italic">RDST</div>
      </section>

      {/* ── METRICS BAR ── */}
      <section className="projects-metrics-bar mb-32 border-y border-white/5 bg-white/[0.01]">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/5">
            {projectMetrics.map((m, i) => (
              <div key={i} className="projects-metric py-12 px-6 flex flex-col items-center justify-center hover:bg-white/[0.02] transition-colors interactive">
                <span className="block text-4xl lg:text-5xl font-black tracking-tighter text-white mb-2">{m.value}</span>
                <span className="text-[8px] uppercase tracking-[0.4em] text-white/30 font-black">{m.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROJECT FEED ── */}
      <section className="projects-feed border-t border-white/5">
        
        {viewMode === "list" ? (
          <div className="divide-y divide-white/5">
            {filteredProjects.map((p, i) => (
              <div
                key={p.index}
                className="project-row group relative hover:bg-white/[0.02] transition-colors duration-700"
              >
                <div className="container py-24 lg:py-32 relative">
                  <div className="absolute top-12 left-6 lg:left-0 text-[10vw] font-black text-white/[0.02] pointer-events-none group-hover:text-orange-500/[0.05] transition-colors duration-700">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <ProjectCard project={p} />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="container py-32">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {filteredProjects.map((p) => (
                <Link to={p.link} key={p.index} className="project-grid-item group interactive flex flex-col h-full">
                   <div className="aspect-[4/5] overflow-hidden rounded-3xl border border-white/5 mb-8 relative">
                      <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 grayscale group-hover:grayscale-0 opacity-80 group-hover:opacity-100" />
                      <div className="absolute top-6 left-6 px-3 py-1 rounded bg-black/60 backdrop-blur-md border border-white/10 text-[9px] uppercase tracking-widest font-black text-orange-500">
                         {p.tag}
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                      <div className="absolute bottom-6 left-6 right-6">
                         <span className="block text-3xl font-black uppercase text-white tracking-tighter leading-none mb-2">{p.title}</span>
                         <span className="text-[10px] uppercase tracking-widest text-white/40 font-bold">{p.category}</span>
                      </div>
                   </div>
                </Link>
              ))}
            </div>
          </div>
        )}

      </section>

      {/* ── RECENT LOGOS ── */}
      <section className="py-24 border-y border-white/5 bg-white/[0.01]">
        <div className="container flex flex-wrap justify-center gap-12 opacity-30 grayscale group">
           {["Tooth World", "Krishna Juice", "Signature", "FoundAI", "WeGlow", "NexTech"].map((name, i) => (
              <span key={i} className="text-xl lg:text-3xl font-black uppercase tracking-tighter italic hover:text-white hover:opacity-100 transition-all duration-500 cursor-default">{name}</span>
           ))}
        </div>
      </section>

      {/* ── PROCESS STRIP ── */}
      <section className="process-strip-index py-32 bg-bg-dark">
        <div className="container">
          <Process />
        </div>
      </section>

      {/* ── SYSTEM ADVISORY ── */}
      <section className="py-40 border-t border-white/5 bg-white/[0.01]">
         <div className="container">
            <div className="max-w-4xl mx-auto p-12 lg:p-20 border border-white/5 bg-white/[0.02] rounded-[3rem] text-center relative overflow-hidden group">
               <div className="absolute inset-0 bg-gradient-to-br from-orange-600/[0.05] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
               <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white mb-8 relative z-10 italic">
                 Don't see your niche?<br />
                 <span className="text-orange-500">Let's build a new one.</span>
               </h2>
               <p className="text-white/40 text-lg md:text-xl font-bold italic leading-relaxed mb-12 relative z-10">
                 "Our methodology is vertical-agnostic. We don't just work in industries; we dominate them through superior digital logic."
               </p>
               <div className="relative z-10">
                  <Link to="/contact" className="hero-btn-premium !inline-flex !scale-110">Initialize Consultation</Link>
               </div>
            </div>
         </div>
      </section>

      {/* ── TABLE VIEW (TECHNICAL INDEX) ── */}
      <section className="technical-table-index py-32 container hidden lg:block">
         <div className="mb-16">
            <span className="text-[10px] uppercase font-black tracking-[0.5em] text-white/20 block mb-6 px-1">Repository Data</span>
            <h2 className="text-4xl font-black uppercase tracking-tight text-white italic">The Full Archive.</h2>
         </div>
         <div className="w-full border-t border-white/10 uppercase font-mono text-[10px] tracking-widest text-white/30">
            {projectsIndex.map((p) => (
              <div key={p.index} className="grid grid-cols-12 py-8 border-b border-white/5 items-center hover:bg-white/[0.02] hover:text-white transition-all group">
                <div className="col-span-1 text-white/10 group-hover:text-orange-500 transition-colors">[{String(p.index).padStart(2, "0")}]</div>
                <div className="col-span-3 font-black text-sm text-white/60 group-hover:text-white uppercase">{p.title}</div>
                <div className="col-span-2">{p.discipline}</div>
                <div className="col-span-2 italic">{p.stats}</div>
                <div className="col-span-3 flex gap-2">
                  {p.tech.slice(0, 2).map((t, i) => (
                    <span key={i} className="px-2 py-0.5 border border-white/10 rounded">{t}</span>
                  ))}
                </div>
                <div className="col-span-1 text-right opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all duration-500">
                  <Link to={p.link} className="text-orange-500 font-black">VIEW</Link>
                </div>
              </div>
            ))}
         </div>
      </section>

    </main>
  );
}