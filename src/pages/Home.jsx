import ProjectCard from "../components/ProjectCard";
import BusinessCard from "../components/BusinessCard";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import toothworld from "../assets/tooth-world.png"
import krishna from "../assets/krishna-juice.jpg";   // Added
import burgersignature from "../assets/burger-signature.png"
const projectsData = [
  { index: 1, tag: "Clinic", title: "Tooth World Clinic", image: toothworld, description: "Ongoing creative direction and digital design for leading content creators." },
  { index: 2, tag: "Brand Integration", title: "Krisna Juice", image: krishna, description: "AI office finder experience built around clarity, speed and focus." },
  { index: 3, tag: "Restaurant", title: "BURGER SIGNATURE", image: burgersignature, description: "Design, build and marketing for a female focused fitness app." },
  { index: 4, tag: "Brand & Web", title: "Upcoming Project", image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2564", description: "Streaming platform for exclusive creator content." },
];

export default function Home() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    gsap.fromTo(el.querySelector('h1'), { y: 40, rotationX: -8, opacity: 0 }, { y: 0, rotationX: 0, opacity: 1, duration: 1.2, ease: 'expo.out', transformPerspective: 800 });
    gsap.fromTo(el.querySelectorAll('.project-card'), { y: 50, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.12, duration: 0.9, ease: 'power3.out' });
  }, []);

  return (
    <main className="min-h-screen bg-bg-dark text-white">
      <section className="min-h-screen flex items-center justify-center">
        <div ref={ref} className="w-full max-w-7xl mx-auto px-5 py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <span className="uppercase tracking-widest text-sm text-white/40">Creative Practice</span>
              <h1 className="mt-6 text-5xl lg:text-7xl font-black uppercase leading-tight">Brand development,<br/>product design and<br/>digital experiences.</h1>
            </div>
            <div className="flex justify-center lg:justify-end">
              <BusinessCard />
            </div>
          </div>
        </div>
      </section>

      <section id="projects">
        {projectsData.map((p) => (
          <ProjectCard key={p.index} project={p} />
        ))}
      </section>
    </main>
  );
}
