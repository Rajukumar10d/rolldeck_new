import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Footer from "../components/Footer";

gsap.registerPlugin(ScrollTrigger);

const services = [
  { 
    title: "Web Design & Development", 
    desc: "We build high-performance, SEO-optimized digital interfaces using Next.js and React. From immersive storytelling to complex e-commerce, we focus on speed, accessibility, and 'wow' factor interactions." 
  },
  { 
    title: "Data Analytics & Insights", 
    desc: "We don't just track clicks; we decode behavior. By implementing advanced tracking (GA4, GTM) and heatmaps, we turn raw traffic into actionable user-journey insights." 
  },
  { 
    title: "Data Visualization", 
    desc: "Turning complexity into clarity. We design custom interactive dashboards and D3.js-powered visual stories that allow stakeholders to see patterns and trends at a glance." 
  },
  { 
    title: "App Development", 
    desc: "Specializing in cross-platform mobile solutions (React Native) that feel native. We build apps that scale, prioritizing fluid UX and robust backend integration." 
  },
  { 
    title: "Brand Strategy & Identity", 
    desc: "Positioning is everything. We define your brand’s visual language—from logos to typography systems—ensuring you stand out in a saturated digital landscape." 
  },
  { 
    title: "UI/UX Audit & Strategy", 
    desc: "We identify friction points in your current product. Through heuristic evaluation and user testing, we provide a roadmap to increase conversion and retention." 
  }
];

const founders = [
  { name: "Raju Kumar", role: "Chief Executive Officer", bio: "Leading the creative vision and high-level studio strategy." },
  { name: "Vatsal Koriya", role: "Chief Technology Officer", bio: "Masterminding the technical architecture and data logic." },
  { name: "Satwik Singh", role: "Chief Marketing Officer", bio: "Driving brand growth and market-facing communication." }
];

export default function About() {
  const mainRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Hero Animation
      gsap.from(".about-hero h1", {
        y: 80,
        opacity: 0,
        duration: 1.2,
        ease: "expo.out"
      });

      // Founder Tilt
      gsap.utils.toArray(".founder-card").forEach((card) => {
        const wrapper = card.querySelector(".founder-image-wrapper");
        card.addEventListener("mousemove", (e) => {
          const rect = card.getBoundingClientRect();
          const x = (e.clientX - rect.left) / rect.width - 0.5;
          const y = (e.clientY - rect.top) / rect.height - 0.5;
          gsap.to(wrapper, {
            rotationY: x * 20,
            rotationX: -y * 20,
            transformPerspective: 1000,
            duration: 0.4
          });
        });
        card.addEventListener("mouseleave", () => {
          gsap.to(wrapper, { rotationY: 0, rotationX: 0, duration: 1 });
        });
      });

      // Staggered Service Entrance
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
    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <main className="about-page bg-bg-dark text-white min-h-screen" ref={mainRef}>
      <section className="about-hero py-28">
        <div className="max-w-6xl mx-auto px-5">
          <span className="kicker uppercase tracking-widest text-sm text-white/40">About the studio</span>
          <h1 className="mt-6 text-4xl lg:text-6xl font-black leading-tight">Three friends.<br/>One technical<br/>creative powerhouse.</h1>
          <p className="mt-6 max-w-2xl text-white/70">We operate at the intersection of aesthetic excellence and data-driven rigor. We help ambitious brands navigate the digital landscape with precision.</p>
        </div>
      </section>

      <section className="about-founders py-20">
        <div className="max-w-6xl mx-auto px-5">
          <div className="founders-grid grid grid-cols-1 md:grid-cols-3 gap-8">
            {founders.map((founder, i) => (
              <div key={i} className="founder-card bg-white/2 p-4 rounded-lg overflow-hidden">
                <div className="founder-image-wrapper overflow-hidden rounded-md mb-4 will-change-transform">
                </div>
                <div className="founder-meta">
                  <span className="founder-role text-xs uppercase tracking-widest text-white/50">{founder.role}</span>
                  <h3 className="founder-name mt-2 text-xl font-semibold">{founder.name}</h3>
                  <p className="founder-bio mt-2 text-white/70">{founder.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="about-services py-20">
        <div className="max-w-6xl mx-auto px-5">
          <div className="services-grid grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="services-header lg:col-span-1">
              <h2 className="text-xl font-bold">Capabilities</h2>
              <p className="services-sub mt-3 text-white/70">From concept to deployment, we deliver end-to-end digital solutions.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}