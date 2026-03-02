import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import rolldeckback from "../assets/rolldeck-back.png";
import rolldeckfront from "../assets/rolldeck-front.png";

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
      duration: 0.6,
      ease: "power2.inOut",
    });

    const onMouseMove = (e) => {
      const rect = wrapper.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const x = (e.clientX - centerX) / (rect.width / 2);
      const y = (e.clientY - centerY) / (rect.height / 2);

      gsap.to(wrapper, {
        rotationY: isFlipped ? 180 + x * 6 : x * 6,
        rotationX: -y * 6,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const onMouseLeave = () => {
      gsap.to(wrapper, {
        rotationY: isFlipped ? 180 : 0,
        rotationX: 0,
        duration: 0.4,
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
      className="relative w-16 h-10 cursor-pointer"
      style={{ perspective: "1000px" }}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div
        ref={wrapperRef}
        className="relative w-full h-full rounded-sm shadow-lg"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front */}
        <div
          className="absolute inset-0"
          style={{ backfaceVisibility: "hidden" }}
        >
          <img
            src={rolldeckfront}
            alt="ROLLDECK Card Front"
            className="w-full h-full object-cover rounded-sm"
          />
        </div>

        {/* Back */}
        <div
          className="absolute inset-0"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <img
            src={rolldeckback}
            alt="ROLLDECK Card Back"
            className="w-full h-full object-cover rounded-sm"
          />
        </div>
      </div>
    </div>
  );
}