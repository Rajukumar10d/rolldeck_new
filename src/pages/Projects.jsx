import { useEffect, useRef, useState } from "react";
import ProjectCard from "../components/ProjectCard";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// 1. IMPORT ALL MISSING ASSETS
import burger from "../assets/burger.jpg";
import dental from "../assets/dental-clinic.jpg";
import krishna from "../assets/krishna-juice.jpg";   // Added
// import stride from "../assets/stride.jpg";   // Added
// import sideplus from "../assets/sideplus.jpg"; // Added

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    index: 1,
    tag: "Brand & Web",
    title: "Burger Signature",
    image: burger,
    description: "Premium burger brand website with bold visuals, online ordering.",
    category: "Brand",
    stats: "Conversion +28%",
  },
  {
    index: 2,
    tag: "Product & Web",
    title: "Dental clinic",    image: dental,
    description: "Modern dental clinic website with appointments and patient information.",
    category: "Product",
    stats: "Retention +12%",
  },
  {
    index: 3,
    tag: "Product & Growth",
    title: "Krishna Juice shop",
    image: krishna, // Now defined
    description: "Fresh juice shop website showcasing menu, offers, location.",
    category: "Growth",
    stats: "MAU +40%",
  },
];

const categories = ["All", "Brand", "Product", "Growth", "Web"];

export default function Projects() {
  const [filter, setFilter] = useState("All");
  const mainRef = useRef(null);

  const filteredProjects =
    filter === "All"
      ? projects
      : projects.filter((p) => p.category === filter);

  useEffect(() => {
    // 2. REFRESH SCROLLTRIGGER ON FILTER
    // When elements are removed/added from the DOM via filtering,
    // ScrollTrigger needs to recalculate its positions.
    let ctx = gsap.context(() => {
      // Intro Animation
      gsap.fromTo(
        ".project-row",
        { opacity: 0, y: 80, rotationX: -12, rotationY: 6 },
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          rotationY: 0,
          stagger: 0.12,
          duration: 1.1,
          ease: "expo.out",
          transformOrigin: "50% 50% -200px",
        }
      );

      // Scroll Animations
      gsap.utils.toArray(".project-row").forEach((row, i) => {
        const media = row.querySelector(".project-media");

        if (media) {
          gsap.to(media, {
            z: -120,
            rotationX: 6,
            ease: "none",
            transformPerspective: 900,
            scrollTrigger: {
              trigger: row,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.8,
            },
          });
        }

        gsap.to(row, {
          rotationY: i % 2 === 0 ? 6 : -6,
          ease: "none",
          scrollTrigger: {
            trigger: row,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.9,
          },
        });
      });
    }, mainRef);

    // Refresh ScrollTrigger specifically for the new layout
    ScrollTrigger.refresh();

    return () => ctx.revert();
  }, [filter]); // Re-runs animations when filter changes

  return (
    <main
      className="bg-[#080808] text-white min-h-screen pt-[20vh] selection:bg-white selection:text-black"
      ref={mainRef}
    >
      <section className="px-[5%] mb-24">
        <div className="flex flex-col lg:flex-row justify-between items-baseline lg:items-end gap-12">
          <div className="flex-1">
            <span className="text-[10px] uppercase tracking-[0.4em] text-white/40 block mb-6">
              Index 2026
            </span>
            <h1 className="text-[clamp(4rem,15vw,15rem)] font-black leading-[0.8] uppercase tracking-tighter italic">
              Case<br />Studies.
            </h1>
          </div>

          <div className="lg:text-right">
            <p className="text-[10px] uppercase tracking-[0.2em] text-white/30 mb-6">
              Filter by Discipline
            </p>
            <div className="flex flex-wrap lg:justify-end gap-3">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-6 py-3 rounded-full border text-xs uppercase tracking-widest transition-all duration-500
                    ${
                      filter === cat
                        ? "bg-white text-black border-white"
                        : "bg-white/5 border-white/10 text-white hover:border-white/40"
                    }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10">
        {filteredProjects.map((p) => (
          <div
            key={p.index}
            className="project-row group relative border-b border-white/10 hover:bg-white/[0.02] transition-colors duration-700"
          >
            <ProjectCard project={p} />
          </div>
        ))}
      </section>

      <section className="py-[30vh] px-[5%] overflow-hidden">
        <div className="max-w-7xl">
          <h2 className="text-[10px] uppercase tracking-[0.5em] text-white/30 mb-12">
            Next Phase
          </h2>
          <a href="/contact" className="group block">
            <div className="text-[clamp(2.5rem,10vw,10rem)] font-black uppercase leading-none tracking-tighter transition-transform duration-700 group-hover:italic">
              Let's build <br />
              <span className="text-transparent stroke-text" style={{ WebkitTextStroke: "1px white" }}>Together</span>
            </div>
          </a>
        </div>
      </section>
    </main>
  );
}