import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import frontImg from "../assets/rolldeck-card-front.png";
import backImg from "../assets/rolldeck-card-back.png";

export default function MiniBusinessCard() {
  const [isFlipped, setIsFlipped] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const flipInterval = setInterval(() => {
      setIsFlipped((prev) => !prev);
    }, 5000);

    return () => clearInterval(flipInterval);
  }, []);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    gsap.to(wrapper, {
      rotationY: isFlipped ? 180 : 0,
      duration: 0.8,
      ease: "power2.inOut",
      transformPerspective: 1000
    });

    const onMouseMove = (e) => {
      const rect = wrapper.getBoundingClientRect();
      const x = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
      const y = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);

      gsap.to(wrapper, {
        rotationY: isFlipped ? 180 + x * 10 : x * 10,
        rotationX: -y * 10,
        duration: 0.4,
        ease: "power2.out",
      });
    };

    const onMouseLeave = () => {
      gsap.to(wrapper, {
        rotationY: isFlipped ? 180 : 0,
        rotationX: 0,
        duration: 0.6,
        ease: "power2.out",
      });
    };

    wrapper.addEventListener("mousemove", onMouseMove);
    wrapper.addEventListener("mouseleave", onMouseLeave);

    return () => {
      wrapper.removeEventListener("mousemove", onMouseMove);
      wrapper.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [isFlipped]);

  return (
    <div
      className="relative w-[100px] h-[60px] cursor-pointer interactive group"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div
        ref={wrapperRef}
        className="relative w-full h-full rounded-md shadow-2xl border border-white/10"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Shine Layer */}
        <div className="absolute inset-0 z-10 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

        {/* Front */}
        <div
          className="absolute inset-0 backface-hidden z-[2] rounded-md overflow-hidden"
          style={{ backfaceVisibility: "hidden" }}
        >
          <img
            src={frontImg}
            alt="Business Card Front"
            className="w-full h-full object-cover select-none"
          />
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 backface-hidden bg-[#050505] rounded-md overflow-hidden"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <img
            src={backImg}
            alt="Business Card Back"
            className="w-full h-full object-cover select-none"
          />
        </div>
      </div>
    </div>
  );
}