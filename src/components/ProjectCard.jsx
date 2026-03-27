import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";

export function useScrollParallax() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const center = rect.top + rect.height / 2;
      const p = (center - vh / 2) / (vh / 2);
      const clamped = Math.max(-1, Math.min(1, p));
      el.style.setProperty("--py", `${-clamped * 120}px`);
      el.style.setProperty("--pr", `${clamped * 3}deg`);
      el.style.setProperty("--scale", `${1.15 + Math.abs(clamped) * 0.1}`);
    };
    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, []);
  return ref;
}

export default function ProjectCard({ project }) {
  const parallaxRef = useScrollParallax();
  const cardRef = useRef(null);
  const mediaRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const onMove = (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      
      gsap.to(card, {
        rotationY: x * 8,
        rotationX: -y * 5,
        transformPerspective: 1200,
        ease: 'power3.out',
        duration: 0.5
      });
      
      gsap.to(mediaRef.current, {
        x: x * 30,
        y: y * 30,
        ease: 'power3.out',
        duration: 0.7
      });
    };

    const onLeave = () => {
      gsap.to(card, { rotationY: 0, rotationX: 0, scale: 1, duration: 1.2, ease: 'elastic.out(1, 0.4)' });
      gsap.to(mediaRef.current, { x: 0, y: 0, duration: 1.2, ease: 'elastic.out(1, 0.4)' });
    };

    card.addEventListener('mousemove', onMove);
    card.addEventListener('mouseleave', onLeave);

    return () => {
      card.removeEventListener('mousemove', onMove);
      card.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <article 
      ref={cardRef} 
      className="project-card-enhanced relative group"
      style={{ transformStyle: 'preserve-3d' }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[70vh] lg:min-h-[80vh] items-stretch border-white/5 border rounded-[2rem] lg:rounded-[3rem] bg-white/[0.01] backdrop-blur-sm transition-all duration-700 hover:bg-white/[0.03] overflow-hidden">
        
        {/* Info Column (7 cols) */}
        <div className="lg:col-span-7 flex flex-col justify-center px-6 md:px-12 lg:px-24 py-16 lg:py-24 z-10" style={{ transform: 'translateZ(60px)' }}>
          <div className="flex items-center gap-6 mb-8 lg:mb-12">
            <span className="text-3xl lg:text-4xl font-black text-orange-500/20 group-hover:text-orange-500 transition-colors uppercase italic font-mono tracking-tighter">
              {String(project.index).padStart(2, '0')}
            </span>
            <div className="h-[1px] w-12 lg:w-24 bg-white/10 group-hover:w-32 group-hover:bg-orange-500/50 transition-all duration-700"></div>
            <span className="text-[9px] lg:text-[12px] uppercase tracking-[0.4em] font-black text-white/30">{project.tag}</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-8xl font-black uppercase leading-[0.85] tracking-tighter mb-8 lg:mb-10 group-hover:text-transparent group-hover:stroke-text transition-all duration-700" style={{ WebkitTextStroke: "1px #fff" }}>
            {project.title}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mb-10 lg:mb-12 border-l border-white/10 pl-6 lg:pl-8">
            <p className="text-white/50 text-base md:text-lg leading-relaxed font-medium">
              {project.description}
            </p>
            <div className="space-y-4 lg:space-y-6">
              <div>
                <span className="text-[9px] uppercase tracking-widest text-orange-500 font-black block mb-2">The Challenge</span>
                <p className="text-xs md:text-sm text-white/40 italic">"{project.challenge}"</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {project.tech?.map((t, i) => (
                  <span key={i} className="px-3 py-1 rounded-full border border-white/10 text-[8px] md:text-[9px] uppercase tracking-widest text-white/30 group-hover:border-orange-500/30 group-hover:text-orange-500/60 transition-colors">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-8 lg:gap-12 pt-8 lg:pt-10 border-t border-white/5 items-center">
            {project.stats && (
              <div>
                <span className="block text-2xl lg:text-3xl font-black text-white group-hover:text-orange-500 transition-colors duration-500">
                  {project.stats.split(' ')[0]} <span className="text-sm lg:text-lg opacity-40 font-bold">{project.stats.split(' ').slice(1).join(' ')}</span>
                </span>
                <span className="text-[8px] lg:text-[9px] uppercase tracking-widest text-white/20 mt-1 block">Outcome Delivered</span>
              </div>
            )}
            {project.year && (
              <div className="hidden sm:block">
                <span className="block text-2xl lg:text-3xl font-black text-white/40">{project.year}</span>
                <span className="text-[8px] lg:text-[9px] uppercase tracking-widest text-white/20 mt-1 block">Project Phase</span>
              </div>
            )}
            <div className="flex-grow"></div>
            <Link to={project.link || `/projects/${project.index}`} className="group/btn relative inline-flex items-center gap-4 lg:gap-6 px-6 lg:px-10 py-4 lg:py-5 rounded-full bg-white text-black font-black uppercase tracking-tighter text-xs lg:text-sm overflow-hidden interactive">
              <span className="relative z-10 transition-transform group-hover/btn:-translate-x-2 whitespace-nowrap">Case Study</span>
              <span className="text-xl lg:text-2xl transition-transform group-hover/btn:translate-x-2 relative z-10">→</span>
              <div className="absolute inset-0 bg-orange-500 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500"></div>
            </Link>
          </div>
        </div>

        {/* Media Column (5 cols) */}
        <div className="lg:col-span-5 relative h-[40vh] md:h-[50vh] lg:h-auto overflow-hidden lg:rounded-r-[3rem]" style={{ transform: 'translateZ(-50px)' }}>
          <div className="absolute inset-0 transition-transform will-change-transform scale-110" ref={mediaRef}>
            <div 
              ref={parallaxRef}
              className="w-full h-full"
              style={{ transform: 'translateY(var(--py)) rotate(var(--pr)) scale(var(--scale))' }}
            >
              <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-all duration-1000 grayscale group-hover:grayscale-0 opacity-40 group-hover:opacity-100" />
            </div>
          </div>
          
          {/* Technical Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-bg-dark via-transparent to-transparent pointer-events-none hidden lg:block"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-bg-dark/80 via-transparent to-transparent pointer-events-none lg:hidden"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-bg-dark/80 via-transparent to-transparent pointer-events-none lg:hidden"></div>
          
          {/* Decorative Large Background Label */}
          <div className="absolute bottom-10 right-10 text-[10vw] font-black text-white/[0.02] uppercase select-none pointer-events-none group-hover:text-white/[0.05] transition-all duration-1000 italic rotate-[-90deg] origin-bottom-right translate-x-12 hidden lg:block">
            {project.title.split(' ')[0]}
          </div>

          {/* Corner Tech Decor */}
          <div className="absolute top-6 lg:top-10 right-6 lg:right-10 flex flex-col items-end opacity-20 group-hover:opacity-50 transition-opacity">
            <span className="text-[8px] lg:text-[9px] font-mono tracking-tighter">LC: {Math.floor(Math.random() * 90000)}ms</span>
            <span className="text-[8px] lg:text-[9px] font-mono tracking-tighter">SEC: PASSED</span>
            <div className="w-8 lg:w-12 h-1 gap-1 flex mt-2">
               {[1,2,3].map(i => <div key={i} className="flex-1 bg-white/40 h-full animate-pulse" style={{animationDelay: `${i*0.2}s`}} />)}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
