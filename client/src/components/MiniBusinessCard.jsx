import { useState, useEffect, useRef } from "react";
import gsap from "gsap";

export default function MiniBusinessCard() {
  const [isFlipped, setIsFlipped] = useState(false);
  const cardRef = useRef(null);

  const frontImage = "/card-front.png";
  const backImage = "/card-back.png";

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    // Auto-flip every 5 seconds
    const flipInterval = setInterval(() => {
      setIsFlipped((prev) => !prev);
    }, 5000);

    return () => clearInterval(flipInterval);
  }, []);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    // GSAP flip animation
    gsap.to(card, {
      rotationY: isFlipped ? 180 : 0,
      duration: 0.6,
      ease: "power2.inOut",
    });

    // Subtle mouse tilt for header card
    const onMouseMove = (e) => {
      const rect = card.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const x = (e.clientX - centerX) / (rect.width / 2);
      const y = (e.clientY - centerY) / (rect.height / 2);

      gsap.to(card, {
        rotationY: isFlipped ? 180 + x * 6 : x * 6,
        rotationX: -y * 6,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const onMouseLeave = () => {
      gsap.to(card, {
        rotationY: isFlipped ? 180 : 0,
        rotationX: 0,
        duration: 0.4,
        ease: "power2.out",
      });
    };

    card.addEventListener("mousemove", onMouseMove);
    card.addEventListener("mouseleave", onMouseLeave);

    return () => {
      card.removeEventListener("mousemove", onMouseMove);
      card.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [isFlipped]);

  return (
    <div
      ref={cardRef}
      onClick={() => setIsFlipped(!isFlipped)}
      className="w-16 h-10 cursor-pointer shadow-lg rounded-sm"
      style={{
        transformStyle: "preserve-3d",
        perspective: "1000px",
      }}
    >
      {/* Front */}
      <div
        className="absolute inset-0 bg-cover bg-center rounded-md"
        style={{
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
        }}
      >
        <img
          src={frontImage}
          alt="ROLLDECK Card Front"
          className="w-full h-full object-cover rounded-md"
        />
      </div>

      {/* Back */}
      <div
        className="absolute inset-0 bg-cover bg-center rounded-md"
        style={{
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
          transform: "rotateY(180deg)",
        }}
      >
        <img
          src={backImage}
          alt="ROLLDECK Card Back"
          className="w-full h-full object-cover rounded-md"
        />
      </div>
    </div>
  );
}
