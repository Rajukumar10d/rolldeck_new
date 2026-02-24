import { useEffect, useRef } from "react";
import gsap from "gsap";
import BusinessCard from "../components/BusinessCard";
import Footer from "../components/Footer";
import "./contact.css"

export default function Contact() {
  const formRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // 1. Entrance Animation
      gsap.from(".contact-content", {
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: "expo.out",
        stagger: 0.1
      });

      // 2. 3D Tilt Effect on Mouse Move
      const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        const xPos = (clientX / innerWidth - 0.5) * 20;
        const yPos = (clientY / innerHeight - 0.5) * 20;

        gsap.to(".contact-card", {
          rotationY: xPos,
          rotationX: -yPos,
          transformPerspective: 1000,
          ease: "power2.out",
          duration: 0.6
        });
      };

      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <main 
      className="min-h-screen bg-bg-dark text-white flex flex-col"
      ref={containerRef}
    >
      {/* Background Grain/Noise Overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

      {/* Contact Section */}
      <section className="flex-1 w-full flex items-center justify-center py-20 px-5">
        <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        
          {/* Left Side: Editorial Content */}
          <div className="contact-content space-y-8">
            <div>
              <span className="text-[10px] uppercase tracking-[0.5em] text-white/40 block mb-4">Inquiries</span>
              <h1 className="text-5xl md:text-7xl font-black uppercase leading-[0.9] tracking-tighter">
                Start a <br/>
                <span className="text-transparent stroke-text italic">Project.</span>
              </h1>
            </div>
            
            <div className="space-y-6 max-w-md">
              <p className="text-base md:text-lg text-white/60 leading-relaxed">
                Whether you're looking for a high-end web experience or deep-dive data visualization, we're ready to build the next phase of your brand.
              </p>
              <div className="flex flex-col gap-2 pt-4">
                <span className="text-[10px] uppercase tracking-widest text-white/30">Direct contact</span>
                <a href="mailto:rajukumar.dev2028@gmail.com" className="text-lg md:text-xl hover:italic transition-all">rajukumar.dev2028@gmail.com</a>
                <a href="tel:+919939429446" className="text-lg md:text-xl hover:italic transition-all">+91 9939429446</a>
              </div>
            </div>

            {/* Business Card */}
            <div className="pt-8 border-t border-white/10">
              <p className="text-[10px] uppercase tracking-widest text-white/40 mb-4">Our Card</p>
              <div className="flex justify-start">
                <BusinessCard />
              </div>
              <p className="text-xs text-white/50 mt-3 italic">Click or hover to flip</p>
            </div>
          </div>

          {/* Right Side: The Interactive Form */}
          <div className="contact-card relative w-full">
            <div className="bg-white/[0.05] backdrop-blur-xl rounded-2xl p-6 md:p-10 border border-white/10 shadow-2xl">
              <h2 className="text-2xl font-bold mb-6">Send us a message</h2>
              <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                <div className="group relative">
                  <input 
                    type="text" 
                    placeholder="Your Name" 
                    className="w-full bg-transparent border-b border-white/10 py-3 focus:outline-none focus:border-white transition-colors peer placeholder:text-white/20 text-white"
                  />
                  <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-white transition-all duration-500 peer-focus:w-full"></div>
                </div>

                <div className="group relative">
                  <input 
                    type="email" 
                    placeholder="Email Address" 
                    className="w-full bg-transparent border-b border-white/10 py-3 focus:outline-none focus:border-white transition-colors peer placeholder:text-white/20 text-white"
                  />
                  <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-white transition-all duration-500 peer-focus:w-full"></div>
                </div>

                <div className="group relative">
                  <textarea 
                    placeholder="Tell us about the project" 
                    rows={4} 
                    className="w-full bg-transparent border-b border-white/10 py-3 focus:outline-none focus:border-white transition-colors peer resize-none placeholder:text-white/20 text-white"
                  />
                  <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-white transition-all duration-500 peer-focus:w-full"></div>
                </div>

                <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <button 
                    type="submit" 
                    className="px-8 py-3 bg-white text-black text-xs font-black uppercase tracking-wider rounded-full hover:bg-white/90 hover:scale-105 active:scale-95 transition-all duration-300"
                  >
                    Send Inquiry
                  </button>
                  <p className="text-[10px] uppercase tracking-widest text-white/40 italic">
                    Average reply: 24h
                  </p>
                </div>
              </form>
            </div>
          </div>

        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
}