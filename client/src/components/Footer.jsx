import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef(null);
  const bigTextRef = useRef(null);
  const [time, setTime] = useState("");

  useEffect(() => {
    // 1. Digital Clock Logic
    const timer = setInterval(() => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }));
    }, 1000);

    let ctx = gsap.context(() => {
      // 2. 3D Unfold Animation on Scroll
      gsap.from(".footer-content", {
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top bottom",
          end: "bottom bottom",
          scrub: 1,
        },
        rotationX: -45,
        transformPerspective: 1000,
        opacity: 0,
        y: 100,
      });

      // 3. Magnetic Hover for the "Studio" text
      bigTextRef.current.addEventListener("mousemove", (e) => {
        const rect = bigTextRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        gsap.to(bigTextRef.current, {
          x: x * 50,
          y: y * 20,
          skewX: x * 10,
          duration: 0.6,
          ease: "power2.out"
        });
      });

      bigTextRef.current.addEventListener("mouseleave", () => {
        gsap.to(bigTextRef.current, { x: 0, y: 0, skewX: 0, duration: 1, ease: "elastic.out(1, 0.3)" });
      });
    }, footerRef);

    return () => {
      ctx.revert();
      clearInterval(timer);
    };
  }, []);

  return (
    <footer 
      ref={footerRef} 
      className="relative bg-[#080808] pt-32 pb-12 overflow-hidden border-t border-white/5 selection:bg-white selection:text-black"
    >
      <div className="footer-content container mx-auto px-[5%]">
        
        {/* Main Footer Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-32 items-start">
          
          {/* Column 1: Links */}
          <div className="space-y-6">
            <span className="text-[10px] uppercase tracking-[0.4em] text-white/30 block">Navigation</span>
            <nav className="flex flex-col gap-4">
              {['Projects', 'About', 'Services', 'Contact'].map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`} className="text-xl hover:italic transition-all duration-300 w-fit">
                  {item}
                </a>
              ))}
            </nav>
          </div>

          {/* Column 2: Social/Connect */}
          <div className="space-y-6">
            <span className="text-[10px] uppercase tracking-[0.4em] text-white/30 block">Connect</span>
            <div className="flex flex-col gap-4 text-xl">
              <a href="#" className="hover:line-through decoration-1 transition-all">Instagram</a>
              <a href="#" className="hover:line-through decoration-1 transition-all">LinkedIn</a>
              <a href="#" className="hover:line-through decoration-1 transition-all">Twitter / X</a>
            </div>
          </div>

          {/* Column 3: Availability & Time */}
          <div className="space-y-6 md:text-right">
            <span className="text-[10px] uppercase tracking-[0.4em] text-white/30 block">Status</span>
            <div className="space-y-2">
              <p className="text-lg">Available for Q3 '26 Projects</p>
              <p className="font-mono text-sm text-white/40 italic">Local Time: {time} GMT+5:30</p>
            </div>
          </div>
        </div>

        {/* Massive Studio Title */}
        <div className="relative mt-20 pointer-events-none select-none">
          <h2 
            ref={bigTextRef}
            className="pointer-events-auto text-[clamp(5rem,20vw,25rem)] font-black leading-[0.7] tracking-tighter uppercase text-white/[0.03] stroke-text-footer transition-colors duration-700 hover:text-white"
          >
            Roll<br/>Deck.
          </h2>
        </div>

        {/* Legal Bottom */}
        <div className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between gap-4 text-[10px] uppercase tracking-widest text-white/20 font-medium">
          <div className="flex gap-8">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
          </div>
          <p>© 2026 Rolldeck Deck Collective — All Rights Reserved</p>
        </div>
      </div>
    </footer>
  );
}