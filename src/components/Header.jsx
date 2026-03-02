import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import MiniBusinessCard from "./MiniBusinessCard";
import { useRef, useEffect } from "react";
import gsap from "gsap";

export default function Header() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    gsap.fromTo(el, { y: -30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' });

    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      gsap.to(el, { rotationY: x * 6, duration: 0.6, ease: 'power3.out' });
    };

    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', () => gsap.to(el, { rotationY: 0, duration: 0.8 }));

    return () => el.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <header ref={ref} className="fixed top-0 left-0 w-full z-30 bg-transparent backdrop-blur-sm transform-style-preserve-3d">
      <div className="max-w-7xl mx-auto px-5 py-6 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link to="/" className="text-white font-extrabold leading-tight uppercase text-lg">ROLL<br/>DECK</Link>
          <MiniBusinessCard />
        </div>
        <Navbar />
      </div>
    </header>
  );
}
