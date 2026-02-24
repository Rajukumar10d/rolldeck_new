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
      el.style.setProperty("--py", `${-clamped * 100}px`);
      el.style.setProperty("--pr", `${clamped * 2}deg`);
      el.style.setProperty("--scale", `${1.1 + Math.abs(clamped) * 0.1}`);
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

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const wrapper = card.querySelector('.project-media') || card;

    const onMove = (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      gsap.to(card, {
        rotationY: x * 12,
        rotationX: -y * 8,
        scale: 1.01,
        transformPerspective: 800,
        ease: 'power3.out',
        duration: 0.4
      });
      gsap.to(wrapper, {
        x: x * 8,
        y: y * 8,
        ease: 'power3.out',
        duration: 0.6
      });
    };

    const onLeave = () => {
      gsap.to(card, { rotationY: 0, rotationX: 0, scale: 1, duration: 0.8, ease: 'power4.out' });
      gsap.to(wrapper, { x: 0, y: 0, duration: 0.8, ease: 'power4.out' });
    };

    card.addEventListener('mousemove', onMove);
    card.addEventListener('mouseleave', onLeave);

    return () => {
      card.removeEventListener('mousemove', onMove);
      card.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <article ref={cardRef} className="project-card w-full lg:min-h-screen grid grid-cols-1 lg:grid-cols-2 border-b border-white/10 perspective-1000" style={{transformStyle:'preserve-3d'}}>
      <div className="flex flex-col justify-center px-6 lg:px-20 py-12 lg:py-20 bg-bg-dark z-10">
        <div className="flex items-center gap-4 mb-6 text-white/60">
          <span className="text-2xl font-serif italic">{String(project.index).padStart(2, '0')}</span>
          <span className="text-xs uppercase tracking-widest px-3 py-1 border border-white/20 rounded-full">{project.tag}</span>
        </div>
        <h2 className="text-4xl lg:text-6xl font-black uppercase leading-tight mb-6">{project.title}</h2>
        <p className="max-w-md text-white/70 mb-8">{project.description}</p>
        <Link to={`/projects/${project.index}`} className="inline-block px-6 py-3 border border-white/30 text-sm uppercase tracking-wider hover:bg-white hover:text-black transition">View Project</Link>
      </div>

      <div className="relative h-64 lg:h-screen overflow-hidden" ref={parallaxRef} aria-hidden>
        <div className="absolute inset-0 transition-transform will-change-transform" style={{transform: 'translateY(var(--py)) rotate(var(--pr)) scale(var(--scale))'}}>
          <img src={project.image} alt={project.title} className="w-full h-full object-cover rounded-none" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-bg-dark to-transparent pointer-events-none"></div>
      </div>
    </article>
  );
}
