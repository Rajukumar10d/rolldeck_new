import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stories = [
  {
    id: 1,
    author: "Dr. Pradeep Kumari",
    role: "CEO, Tooth World Dental Clinic",
    content: "RollDeck transformed our online presence completely. Their attention to detail and technical execution exceeded every expectation we had. Our patient trust is at an all-time high.",
    project: "Tooth World Clinic",
    stats: "+200% Booking Growth",
    category: "Web & Branding",
    initials: "PK",
    rating: 5
  },
  {
    id: 2,
    author: "Rahul Verma",
    role: "Founder, Krishna Juice Shop",
    content: "Working with RollDeck felt like a true partnership. They deeply understood our operational bottlenecks and delivered a custom automation engine that transformed our efficiency.",
    project: "Krishna Juice",
    stats: "15k+ Monthly Orders",
    category: "Custom Automation",
    initials: "RV",
    rating: 5
  },
  {
    id: 3,
    author: "Nisha Agarwal",
    role: "Marketing Head, Burger Signature",
    content: "The level of technical expertise combined with stunning design is rare. RollDeck delivered a unified branding ecosystem that allowed us to scale our franchises with confidence.",
    project: "Burger Signature",
    stats: "100% Brand Cohesion",
    category: "Enterprise Branding",
    initials: "NA",
    rating: 5
  }
];

export default function ClientStories() {
  const [active, setActive] = useState(0);
  const containerRef = useRef(null);
  const cardRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Header entrance
      gsap.from(".story-header", {
        scrollTrigger: { trigger: ".story-header", start: "top 85%" },
        y: 60,
        opacity: 0,
        duration: 1.2,
        ease: "expo.out"
      });

      // Split layout entrance
      gsap.from(".story-split-visual", {
        scrollTrigger: { trigger: ".story-split-visual", start: "top 80%" },
        x: -40,
        opacity: 0,
        duration: 1.4,
        ease: "power4.out"
      });

      gsap.from(".story-card-stack", {
        scrollTrigger: { trigger: ".story-card-stack", start: "top 80%" },
        x: 40,
        opacity: 0,
        duration: 1.4,
        ease: "power4.out"
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Animate card change
  useEffect(() => {
    gsap.fromTo(cardRef.current, 
      { opacity: 0, y: 30, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "power3.out" }
    );
  }, [active]);

  return (
    <section className="client-stories-section py-32 relative overflow-hidden bg-white/[0.01]" ref={containerRef}>
      {/* Background Accents */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-orange-600/[0.03] blur-[180px] rounded-full pointer-events-none z-0" />
      
      <div className="container relative z-10">
        <div className="story-header mb-24 max-w-4xl">
          <span className="text-[10px] uppercase tracking-[0.5em] text-orange-500 font-black block mb-6">Social Proof</span>
          <h2 className="text-5xl lg:text-8xl font-black uppercase tracking-tighter leading-[0.85] text-white">
            Partners in <span className="italic text-transparent stroke-text" style={{ WebkitTextStroke: "1px #ff5500" }}>Performance</span><br />Digital Logic.
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Side: Visual/Kicker (4 cols) */}
          <div className="lg:col-span-5 story-split-visual sticky top-32">
            <div className="relative p-10 lg:p-14 bg-white/[0.02] border border-white/5 rounded-[3rem] overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-orange-600/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              
              <div className="relative z-10 flex flex-col h-full">
                <span className="text-[10px] uppercase tracking-widest text-white/30 font-black mb-8 block">Studio Reputation</span>
                <p className="text-2xl lg:text-3xl font-black uppercase italic leading-tight text-white/80 mb-12">
                  We measure our success by the <span className="text-orange-500">commercial outcomes</span> of our client partners.
                </p>
                
                <div className="mt-auto space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="flex text-orange-500 text-xs">★★★★★</div>
                    <span className="text-xs font-bold uppercase tracking-widest text-white/40">Verified Industry Authority</span>
                  </div>
                  <div className="h-[1px] w-full bg-white/5" />
                  <div className="flex justify-between items-center">
                    <div className="text-center">
                      <span className="block text-2xl font-black text-white">100%</span>
                      <span className="text-[9px] uppercase tracking-widest text-white/20">Satisfaction</span>
                    </div>
                    <div className="text-center">
                      <span className="block text-2xl font-black text-white">50+</span>
                      <span className="text-[9px] uppercase tracking-widest text-white/20">Partnerships</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Active Testimonial Card (7 cols) */}
          <div className="lg:col-span-1 lg:col-start-6 hidden lg:block h-full relative">
            <div className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-white/5 -translate-x-1/2" />
          </div>

          <div className="lg:col-span-6 story-card-stack flex flex-col gap-10">
            <div 
              ref={cardRef}
              className="relative p-10 lg:p-16 bg-white/[0.03] border border-white/10 rounded-[3rem] shadow-[0_40px_100px_-30px_rgba(0,0,0,0.5)]"
            >
              <div className="absolute top-10 right-10">
                <span className="text-8xl font-serif text-white/[0.05] leading-none">“</span>
              </div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-10">
                   <div className="px-3 py-1 rounded-full border border-orange-500/20 bg-orange-500/5 text-[9px] uppercase tracking-widest text-orange-500 font-black">
                     {stories[active].category}
                   </div>
                   <div className="h-[1px] w-8 bg-white/10"></div>
                   <div className="text-[9px] uppercase tracking-widest text-white/30 font-bold">
                     {stories[active].project}
                   </div>
                </div>

                <blockquote className="text-xl lg:text-3xl font-bold leading-relaxed mb-12 text-white/80">
                  {stories[active].content}
                </blockquote>

                <div className="flex items-center gap-6 py-10 border-t border-white/5">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-600 to-red-600 flex items-center justify-center text-xl font-black text-white shadow-lg shadow-orange-600/20">
                    {stories[active].initials}
                  </div>
                  <div>
                    <h4 className="text-xl font-black uppercase text-white tracking-tight">{stories[active].author}</h4>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-white/30 font-bold mt-1">{stories[active].role}</p>
                  </div>
                  <div className="flex-grow"></div>
                  <div className="text-right hidden sm:block">
                     <span className="block text-2xl font-black text-orange-500">{stories[active].stats.split(' ')[0]}</span>
                     <span className="text-[8px] uppercase tracking-widest text-white/20 whitespace-nowrap">{stories[active].stats.split(' ').slice(1).join(' ')}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Dots */}
            <div className="flex justify-center lg:justify-start gap-4 px-4">
              {stories.map((story, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`relative group interactive h-12 flex items-center gap-4 transition-all duration-500 ${active === i ? "flex-grow" : "w-12"}`}
                  aria-label={`View story ${i + 1}`}
                >
                  <div className={`h-1 rounded-full transition-all duration-500 ${active === i ? "bg-orange-500 w-full" : "bg-white/10 w-full group-hover:bg-white/30"}`} />
                  {active === i && (
                    <span className="text-[10px] font-black uppercase tracking-widest text-white/50 absolute -top-6 left-0 animate-fade-in-down">
                      0{story.id} / 0{stories.length}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{
        backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
        backgroundSize: "60px 60px"
      }} />
    </section>
  );
}
