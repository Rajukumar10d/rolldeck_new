import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import frontImg from "../assets/rolldeck-card-front.png";
import backImg from "../assets/rolldeck-card-back.png";

export default function BusinessCard() {
  const [isFlipped, setIsFlipped] = useState(false);
  const containerRef = useRef(null);
  const cardRef = useRef(null);
  const shineRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    const shine = shineRef.current;
    if (!card || !shine) return;

    // Entrance Animation
    gsap.fromTo(card, { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.2, ease: "back.out(1.7)" });

    const onMove = (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (centerY - y) / 10;
      const rotateY = (x - centerX) / 10;

      gsap.to(card, {
        rotationX: rotateX,
        rotationY: isFlipped ? 180 + rotateY : rotateY,
        duration: 0.4,
        ease: "power2.out",
        transformPerspective: 1200
      });

      // Shimmer effect
      gsap.to(shine, {
        opacity: 0.8,
        background: `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.4) 0%, transparent 80%)`,
        duration: 0.1
      });
    };

    const onLeave = () => {
      gsap.to(card, {
        rotationX: 0,
        rotationY: isFlipped ? 180 : 0,
        duration: 1,
        ease: "elastic.out(1, 0.3)"
      });
      gsap.to(shine, { opacity: 0, duration: 0.5 });
    };

    window.addEventListener("mousemove", onMove);
    card.addEventListener("mouseleave", onLeave);

    return () => {
      window.removeEventListener("mousemove", onMove);
      card.removeEventListener("mouseleave", onLeave);
    };
  }, [isFlipped]);

  return (
    <div 
      ref={containerRef}
      className="relative w-[340px] h-[200px] perspective-[1500px] interactive group"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      {/* Dynamic Glow Background */}
      <div className="absolute inset-[-20px] bg-orange-600/10 blur-[40px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      
      <div
        ref={cardRef}
        className="relative w-full h-full cursor-pointer preserve-3d shadow-[0_30px_60px_-12px_rgba(0,0,0,0.8)] border border-white/10 rounded-2xl transition-shadow duration-500 hover:shadow-[0_45px_100px_-20px_rgba(255,85,0,0.2)]"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Holographic Shine Overlay */}
        <div 
          ref={shineRef}
          className="absolute inset-0 z-10 pointer-events-none opacity-0 rounded-2xl"
        />

        {/* Premium Border Highlight */}
        <div className="absolute inset-0 z-20 border-[0.5px] border-white/20 rounded-2xl pointer-events-none group-hover:border-orange-500/40 transition-colors duration-500" />

        {/* Front Side */}
        <div
          className="absolute inset-0 backface-hidden z-[2] rounded-2xl overflow-hidden"
          style={{ backfaceVisibility: "hidden" }}
        >
          <img 
            src={frontImg} 
            alt="Business Card Front" 
            className="w-full h-full object-cover select-none"
          />
        </div>

        {/* Back Side */}
        <div
          className="absolute inset-0 backface-hidden bg-[#0a0a0a] rounded-2xl overflow-hidden"
          style={{ 
            backfaceVisibility: "hidden", 
            transform: "rotateY(180deg)" 
          }}
        >
          <img 
            src={backImg} 
            alt="Business Card Back" 
            className="w-full h-full object-cover select-none"
          />
        </div>
      </div>

      {/* Control Hint */}
      <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-2 opacity-0 group-hover:opacity-50 transition-all duration-700">
        <span className="text-[9px] uppercase tracking-[0.3em] font-medium text-white/40">Click to flip card</span>
        <span className="text-orange-500 text-xs animate-bounce">↺</span>
      </div>
    </div>
  );
}
