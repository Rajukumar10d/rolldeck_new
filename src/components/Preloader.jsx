import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Preloader() {
  const [done, setDone] = useState(false);
  const preloaderRef = useRef(null);
  const counterRef = useRef(null);
  const barRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(preloaderRef.current, {
          yPercent: -100,
          duration: 1.2,
          ease: "expo.inOut",
          onComplete: () => setDone(true)
        });
      }
    });

    // Counter animation 0 → 100
    tl.to(counterRef.current, {
      innerText: 100,
      snap: { innerText: 1 },
      duration: 2.5,
      ease: "power2.inOut",
      onUpdate: function () {
        if (counterRef.current) {
          counterRef.current.textContent = Math.round(
            gsap.getProperty(counterRef.current, "innerText")
          );
        }
      }
    });

    // Progress bar
    tl.to(barRef.current, {
      width: "100%",
      duration: 2.5,
      ease: "power2.inOut"
    }, "<");

    // Stagger text reveal
    tl.from(".preloader-word", {
      y: 40,
      opacity: 0,
      stagger: 0.15,
      duration: 0.6,
      ease: "power3.out"
    }, 0.2);

    return () => tl.kill();
  }, []);

  if (done) return null;

  return (
    <div
      ref={preloaderRef}
      className="fixed inset-0 z-[99999] bg-[#050505] flex flex-col items-center justify-center text-white"
    >
      <div className="relative text-center space-y-8">
        {/* Studio Name */}
        <div className="flex gap-4 text-[clamp(2rem,8vw,7rem)] font-black uppercase tracking-tighter leading-none">
          <span className="preloader-word">Roll</span>
           <span className="preloader-word italic text-transparent" style={{ WebkitTextStroke: "1px #ff5500" }}>Deck</span>
        </div>

        {/* Tagline */}
        <div className="flex gap-3 text-[10px] uppercase tracking-[0.5em] text-white/30 font-bold justify-center">
          <span className="preloader-word">Design</span>
          <span className="preloader-word">·</span>
          <span className="preloader-word">Development</span>
          <span className="preloader-word">·</span>
          <span className="preloader-word">Strategy</span>
        </div>

        {/* Progress */}
        <div className="w-[300px] mx-auto mt-12">
          <div className="flex justify-between text-[10px] uppercase tracking-widest text-white/40 mb-3">
            <span>Loading</span>
            <span ref={counterRef}>0</span>
          </div>
          <div className="w-full h-[2px] bg-white/10 rounded-full overflow-hidden">
            <div ref={barRef} className="h-full bg-[#ff5500] rounded-full" style={{ width: "0%" }} />
          </div>
        </div>
      </div>
    </div>
  );
}
