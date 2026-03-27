import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import MiniBusinessCard from "./MiniBusinessCard";
import { useRef, useEffect } from "react";
import gsap from "gsap";

export default function Header() {
  const headerRef = useRef(null);
  const innerRef = useRef(null);

  useEffect(() => {
    const header = headerRef.current;
    const inner = innerRef.current;
    if (!header || !inner) return;

    // Entrance
    gsap.fromTo(header, { y: -100, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'expo.out' });

    // 3D Perspective Tilt on mouse move
    const onMove = (e) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const x = (clientX / innerWidth - 0.5) * 10;
      const y = (clientY / innerHeight - 0.5) * 10;
      
      gsap.to(inner, {
        rotationY: x,
        rotationX: -y,
        x: x * 5,
        y: y * 5,
        transformPerspective: 1000,
        duration: 0.6,
        ease: 'power3.out'
      });
    };

    const resetTilt = () => {
      gsap.to(inner, { rotationY: 0, rotationX: 0, x: 0, y: 0, duration: 1, ease: 'elastic.out(1, 0.4)' });
    };

    window.addEventListener('mousemove', onMove);
    header.addEventListener('mouseleave', resetTilt);

    return () => {
      window.removeEventListener('mousemove', onMove);
      header.removeEventListener('mouseleave', resetTilt);
    };
  }, []);

  return (
    <header 
      ref={headerRef} 
      className="fixed top-0 left-0 w-full z-50 px-5 py-6 pointer-events-none"
    >
      <div 
        ref={innerRef}
        className="max-w-7xl mx-auto px-10 py-5 flex items-center justify-between gap-4 pointer-events-auto bg-white/[0.03] backdrop-blur-3xl border border-white/10 rounded-[2rem] shadow-[0_20px_40px_rgba(0,0,0,0.3)] transform-style-3d"
      >
        <div className="flex items-center gap-6">
          <Link to="/" className="text-white font-black leading-[0.85] uppercase text-xl group interactive flex items-center gap-3">
            <span className="flex flex-col">
              <span>ROLL</span>
              <span className="text-transparent stroke-text" style={{ WebkitTextStroke: "1px #ff5500" }}>DECK</span>
            </span>
          </Link>
          <div className="h-6 w-[1px] bg-white/10 hidden md:block"></div>
          <div className="hidden md:block">
             <MiniBusinessCard />
          </div>
        </div>
        
        <div className="flex items-center gap-10">
           <Navbar />
           <Link to="/contact" className="hidden lg:flex px-8 py-3 bg-white text-black text-[10px] font-black uppercase tracking-widest rounded-full transition-all duration-300 hover:scale-105 active:scale-95 group/btn interactive">
              <span>Hire Studio</span>
              <span className="text-lg group-hover/btn:translate-x-1 transition-transform origin-center">→</span>
           </Link>
        </div>
      </div>
    </header>
  );
}
