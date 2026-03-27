import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import BusinessCard from "../components/BusinessCard";
import SEO from "../components/SEO";
import FAQ from "../components/FAQ";
import "./contact.css";

gsap.registerPlugin(ScrollTrigger);

const contactFaqs = [
  { category: "Execution", q: "What is your project deployment cycle?", a: "Standard deployment cycles take 4-10 weeks. We provide a real-time 'Phase Progress' dashboard for every mission, ensuring transparency from Discovery to Alpha/Beta release." },
  { category: "Maintenance", q: "Do you offer 'Active Care' support?", a: "Our Care Protocol includes: 24/7 endpoint monitoring, weekly performance audits, core security patches, and direct access to our engineering 'Hot-Signal' for urgent issues." },
  { category: "Framework", q: "What's in the RollDeck standard stack?", a: "We build on a logic-first foundation using React, Next.js, and high-performance Tailwind/Framer motion systems, coupled with robust server-side architecture (Node/Python) and custom GraphQL/REST APIs." },
  { category: "Strategy", q: "Can we start with a Proof of Concept (PoC)?", a: "Yes. We offer a 'Rapid Logic Discovery' week where we build a high-fidelity prototype or UX blueprint to validate your core architecture before full-scale development." }
];

const projectTypes = [
  { label: "Architecture", icon: "🏢" },
  { label: "Web Signal", icon: "🌐" },
  { label: "Mobile Node", icon: "📱" },
  { label: "Brand Logic", icon: "◇" },
  { label: "Tech Audit", icon: "🔍" },
  { label: "Other", icon: "✦" }
];

export default function Contact() {
  const containerRef = useRef(null);
  const formCardRef = useRef(null);
  const magneticBtnRef = useRef(null);
  const [formState, setFormState] = useState({ name: "", email: "", message: "", budget: "", projectType: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [currentTime, setCurrentTime] = useState("");
  const [formProgress, setFormProgress] = useState(0);

  // Update Jaipur Time
  useEffect(() => {
    const updateTime = () => {
      const options = { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
      setCurrentTime(new Intl.DateTimeFormat('en-GB', options).format(new Date()));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Track Form Progress
  useEffect(() => {
    const fields = ['name', 'email', 'message', 'budget', 'projectType'];
    const filledFields = fields.filter(field => formState[field].length > 0);
    setFormProgress((filledFields.length / fields.length) * 100);
  }, [formState]);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Magnetic Contact Button
      const btn = magneticBtnRef.current;
      if (btn) {
        const handleMagnetic = (e) => {
          const rect = btn.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;
          gsap.to(btn, { x: x * 0.4, y: y * 0.4, duration: 1, ease: "power4.out" });
        };
        const resetMagnetic = () => gsap.to(btn, { x: 0, y: 0, duration: 2, ease: "elastic.out(1, 0.3)" });
        btn.addEventListener("mousemove", handleMagnetic);
        btn.addEventListener("mouseleave", resetMagnetic);
      }

      // Split Text - Character Animation Simulation
      const heroLines = document.querySelectorAll(".hero-line");
      heroLines.forEach((line) => {
        const chars = line.textContent.split("");
        line.textContent = "";
        chars.forEach((char) => {
          const span = document.createElement("span");
          span.textContent = char === " " ? "\u00A0" : char;
          span.className = "inline-block char-item";
          line.appendChild(span);
        });
      });

      gsap.from(".char-item", {
        y: 100, opacity: 0, rotateX: -90, stagger: 0.02, duration: 1.2, ease: "expo.out"
      });

      // Info Cards Stagger
      gsap.from(".contact-info-card", {
        scrollTrigger: { trigger: ".contact-left", start: "top 80%" },
        y: 30, opacity: 0, stagger: 0.1, duration: 1.6, ease: "power4.out"
      });

      // Hub Stats Count-up Simulation
      gsap.from(".hub-stat-val", {
        scrollTrigger: { trigger: ".hub-content", start: "top 80%" },
        opacity: 0, y: 20, stagger: 0.1, duration: 1, ease: "power4.out"
      });

      // 3D Glass Logic with Light Follow
      const handleMouseMove = (e) => {
        const rect = formCardRef.current?.getBoundingClientRect();
        if (!rect) return;
        const xPos = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
        const yPos = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);

        gsap.to(formCardRef.current, {
          rotationY: xPos * 8, rotationX: -yPos * 6,
          transformPerspective: 1800, ease: "power2.out", duration: 0.8
        });

        gsap.to(".contact-glow", { x: xPos * 60, y: yPos * 60, duration: 1.2 });
      };

      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: "cd6a9e00-d376-489b-907e-b0fe231f8adf",
          ...formState,
          subject: `MISSION INITIALIZED: ${formState.projectType} from ${formState.name} [RD-NET]`
        }),
      });
      const result = await response.json();
      if (result.success) {
        setIsSuccess(true);
        setFormState({ name: "", email: "", message: "", budget: "", projectType: "" });
      }
    } catch (e) { alert("Core Signal Breach."); } finally { setIsSubmitting(false); }
  };

  return (
    <main
      className="min-h-screen bg-[#020202] text-white flex flex-col pt-32 selection:bg-orange-500 selection:text-white"
      ref={containerRef}
    >
      <SEO title="Mission Control" description="Industrial-grade communication protocol for RollDeck Studio missions." />
      
      {/* Global Scroll Progress */}
      <div className="fixed top-0 left-0 w-full h-[2px] bg-white/5 z-[100]">
         <div className="h-full bg-orange-600 transition-all duration-300 shadow-[0_0_20px_rgba(255,85,0,0.8)]" style={{ width: `${formProgress}%` }} />
      </div>

      <div className="container relative z-10 flex-1 flex flex-col justify-center pb-16 lg:pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-start">

          {/* ── LEFT: MISSION PARAMETERS ── */}
          <div className="contact-left space-y-24">
            <div className="space-y-10">
              <div className="flex items-center gap-6 group interactive">
                 <span className="w-16 h-[2px] bg-orange-600 group-hover:w-24 transition-all duration-700"></span>
                 <span className="text-[10px] uppercase tracking-[0.8em] text-white/40 font-black animate-pulse">Core Connection</span>
              </div>
              <h1 className="text-5xl md:text-7xl lg:text-[11.5rem] font-black uppercase leading-[0.8] tracking-tighter">
                <span className="block hero-line">Initialize</span>
                <span className="block italic text-transparent stroke-text hero-line" style={{ WebkitTextStroke: "1.5px #ff5500" }}>Mission.</span>
              </h1>
              <div className="relative pl-10 border-l-2 border-orange-600/30 py-4 max-w-sm reveal">
                 <p className="text-white/40 text-xl font-medium leading-relaxed italic">
                   "We don't just build websites. We deploy digital assets that scale with your vision."
                 </p>
                 <div className="absolute top-0 right-0 text-[8px] text-white/10 font-mono">CODE: RD-024</div>
              </div>
            </div>

            <div className="space-y-4">
              {[
                { label: "Hot-Signal (Mail)", value: "rolldeckinfo@gmail.com", link: "mailto:rolldeckinfo@gmail.com" },
                { label: "Comm-Link (Call)", value: "+91 99394 29446", link: "tel:+919939429446" },
                { label: "Cycle Clock", value: `${currentTime} IST`, link: "#", isTime: true },
              ].map((item, i) => (
                <div key={i} className="contact-info-card group relative overflow-hidden p-8 bg-white/[0.01] hover:bg-white/[0.03] transition-all border border-transparent hover:border-white/5">
                  <div className="absolute inset-y-0 left-0 w-[2px] bg-orange-600/0 group-hover:bg-orange-600 transition-all" />
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-[9px] uppercase tracking-[0.5em] text-white/20 mb-3 block font-bold">{item.label}</span>
                      <a href={item.link} className={`text-2xl font-black uppercase tracking-tight group-hover:text-orange-500 transition-colors ${item.isTime ? 'font-mono' : ''}`}>
                         {item.value}
                      </a>
                    </div>
                    <div className="w-10 h-10 rounded-full border border-white/5 flex items-center justify-center group-hover:bg-orange-600 group-hover:border-orange-600 transition-all duration-500">
                      <span className="text-xs">↗</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-12">
               <div className="scale-90 origin-left"><BusinessCard /></div>
               <div className="hidden lg:block space-y-4">
                  <div className="flex items-center gap-2">
                     <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                     <span className="text-[10px] font-black uppercase tracking-widest text-white/30">Active in Jaipur</span>
                  </div>
                  <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl">
                     <span className="block text-[8px] text-white/20 uppercase font-black mb-1">Signal Strength</span>
                     <div className="flex gap-1">
                        {[1,1,1,1,0.5].map((op, i) => <div key={i} className="w-1 h-3 bg-orange-600" style={{ opacity: op }} />)}
                     </div>
                  </div>
               </div>
            </div>
          </div>

          {/* ── RIGHT: MISSION FORM ── */}
          <div className="contact-right relative perspective-1800">
            <div className="contact-glow absolute -top-40 -left-40 w-[600px] h-[600px] bg-orange-600/[0.03] blur-[180px] -z-10 rounded-full" />
            
            <div ref={formCardRef} className="contact-form-wrapper glass-panel p-12 lg:p-20 relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-8">
                  <span className="text-[10px] font-mono text-white/10">PROTOCOL: RD-INIT-V2</span>
               </div>
               
               {isSuccess ? (
                 <div className="py-40 text-center space-y-12 reveal">
                   <div className="text-8xl animate-bounce">⌬</div>
                   <h2 className="text-5xl font-black uppercase tracking-tight">Mission Initialized</h2>
                   <p className="text-white/40 uppercase tracking-[.4em] text-[10px] font-bold">Signal lock confirmed. Stand by for response.</p>
                   <button onClick={() => setIsSuccess(false)} className="px-16 py-5 bg-white text-black font-black uppercase text-[10px] tracking-[0.5em] rounded-full interactive hover:scale-105 transition-all">Reset Sync</button>
                 </div>
               ) : (
                <form className="space-y-16" onSubmit={handleSubmit}>
                   <div className="space-y-10">
                      {[
                        { id: "name", label: "01. Protocol.ID", type: "text", pl: "Full Legal Name" },
                        { id: "email", label: "02. Signal.Point", type: "email", pl: "rolldeckinfo@gmail.com" }
                      ].map(field => (
                        <div key={field.id} className="premium-input-group">
                           <label className="text-[10px] uppercase tracking-[0.4em] text-white/30 block mb-6 font-black">{field.label}</label>
                           <input 
                             required 
                             type={field.type} 
                             value={formState[field.id]} 
                             onChange={e => setFormState({...formState, [field.id]: e.target.value})}
                             placeholder={field.pl}
                             className="w-full bg-transparent border-b border-white/5 py-4 focus:outline-none focus:border-white transition-all text-2xl font-black uppercase tracking-tighter placeholder:text-white/5"
                           />
                           <div className="input-indicator" />
                        </div>
                      ))}

                      <div className="space-y-8">
                         <label className="text-[10px] uppercase tracking-[0.4em] text-white/30 block font-black">03. Logic.Architecture</label>
                         <div className="flex flex-wrap gap-4">
                            {projectTypes.map(t => (
                              <button 
                                key={t.label} 
                                type="button" 
                                onClick={() => setFormState({...formState, projectType: t.label})}
                                className={`px-8 py-4 border rounded-full text-[10px] font-black uppercase tracking-widest transition-all duration-700 interactive ${formState.projectType === t.label ? 'bg-orange-600 border-orange-600 shadow-[0_15px_40px_rgba(255,85,0,0.4)] scale-105' : 'border-white/10 text-white/20 hover:border-white/40'}`}
                              >
                                {t.label}
                              </button>
                            ))}
                         </div>
                      </div>

                      <div className="premium-input-group">
                         <label className="text-[10px] uppercase tracking-[0.4em] text-white/30 block mb-6 font-black">04. Mission.Objective</label>
                         <textarea 
                           required 
                           rows={3} 
                           value={formState.message} 
                           onChange={e => setFormState({...formState, message: e.target.value})}
                           placeholder="Define the digital scope and desired impact..."
                           className="w-full bg-transparent border-b border-white/5 py-4 focus:outline-none focus:border-white transition-all text-xl font-medium resize-none placeholder:text-white/5"
                         />
                         <div className="input-indicator" />
                      </div>
                   </div>

                   <div ref={magneticBtnRef} className="w-full">
                      <button type="submit" className="w-full py-8 bg-orange-600 text-white font-black uppercase tracking-[0.6em] text-[10px] rounded-2xl interactive hover:bg-orange-700 transition-all duration-700 shadow-[0_40px_80px_rgba(255,85,0,0.25)] flex items-center justify-center gap-6 overflow-hidden group">
                         {isSubmitting ? "TRANSMITTING..." : "EXECUTE MISSION"}
                         <span className="text-xl group-hover:translate-x-2 transition-transform duration-500">»</span>
                      </button>
                   </div>
                </form>
               )}
            </div>
          </div>
        </div>
      </div>

      {/* ── HUB DATA VISUAL ── */}
      <section className="py-56 border-y border-white/5 bg-[#030303] relative overflow-hidden">
         <div className="contact-hub-grid absolute inset-0 -z-10 opacity-20" />
         <div className="container hub-content relative">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-center">
               <div className="space-y-16 relative">
                  <div className="absolute -top-20 -left-10 w-40 h-40 bg-orange-600/10 blur-[60px] rounded-full" />
                  <div className="inline-flex items-center gap-8 px-8 py-4 bg-white/[0.03] border border-white/10 rounded-full backdrop-blur-3xl reveal">
                     <div className="flex gap-1.5 h-3 items-end">
                        {[1,2,3,4,5].map(i => <div key={i} className="w-1 bg-orange-600 animate-pulse" style={{ height: `${Math.random()*100}%` }} />)}
                     </div>
                     <span className="text-[10px] uppercase tracking-[0.5em] font-black text-white/60">Node Location: Jaipur Sector</span>
                  </div>
                  <h2 className="text-5xl md:text-6xl lg:text-9xl font-black uppercase tracking-tighter leading-tight reveal">
                     Studio <br />
                     <span className="text-orange-600">Hub.</span>
                  </h2>
                  <p className="text-white/40 text-xl md:text-2xl max-w-lg leading-relaxed reveal">
                     Operating from the Pink City. Scaling globally through distributed logic and remote-first excellence.
                  </p>
               </div>

               <div className="grid grid-cols-2 gap-4 md:gap-8 reveal">
                  {[
                    { l: "Time Sync", v: currentTime, sub: "IST Active" },
                    { l: "Mission Rate", v: "24h Avg", sub: "Core Sync" },
                    { l: "Deployment", v: "Global", sub: "Cloud Infrastructure" },
                    { l: "Status", v: "Connected", sub: "Operational 24/7" }
                  ].map((s, i) => (
                    <div key={i} className="p-12 bg-white/[0.01] border border-white/5 hover:border-white/10 transition-all group interactive overflow-hidden relative">
                       <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-20 transition-opacity">
                          <span className="text-5xl font-black">⌬</span>
                       </div>
                       <span className="block text-[9px] uppercase tracking-[0.5em] text-white/20 mb-8 font-black">{s.l}</span>
                       <span className="text-4xl font-black block group-hover:text-orange-500 transition-colors uppercase hub-stat-val tracking-tight">{s.v}</span>
                       <span className="block text-[11px] uppercase tracking-widest text-white/10 mt-3 font-bold">{s.sub}</span>
                    </div>
                  ))}
               </div>
            </div>
         </div>
      </section>

      {/* ── FAQ INITIALIZATION ── */}
      <section className="py-40 bg-bg-dark">
         <div className="container">
            <div className="mb-24 space-y-4">
               <span className="text-[10px] uppercase tracking-[0.8em] text-orange-600 font-black pl-4 border-l-2 border-orange-600">Documentation</span>
               <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tight">Mission FAQ.</h2>
            </div>
            <FAQ faqs={contactFaqs} title="" subtitle="" hideTitle />
         </div>
      </section>

      {/* ── FOOTER SIGNALS ── */}
      <section className="py-32 border-t border-white/5">
         <div className="container text-center space-y-16">
            <div className="flex items-center justify-center gap-4">
               <div className="w-20 h-[1px] bg-white/10" />
               <span className="text-[10px] uppercase tracking-[1.2em] text-white/20 font-black">Digital Signals</span>
               <div className="w-20 h-[1px] bg-white/10" />
            </div>
            <div className="flex flex-wrap justify-center gap-10">
               {["Instagram", "LinkedIn", "Twitter", "GitHub"].map(s => (
                 <a key={s} href="#" className="text-3xl font-black uppercase tracking-tighter text-white/10 hover:text-orange-600 transition-all duration-700 hover:tracking-[0.15em] interactive group flex items-center gap-3">
                    <span className="text-[10px] group-hover:rotate-45 transition-transform">↗</span>
                    {s}
                 </a>
               ))}
            </div>
         </div>
      </section>
    </main>
  );
}