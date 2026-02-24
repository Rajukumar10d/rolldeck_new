import { useState, useEffect, useRef } from "react";
import gsap from "gsap";

export default function BusinessCard() {
  const [isFlipped, setIsFlipped] = useState(false);
  const cardRef = useRef(null);

  // Update these paths to match where you place your card images
  const frontImage = "dist/card-front.png";
  const backImage = "dist/card-back.png";

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    // Continuous auto-flip animation
    const flipInterval = setInterval(() => {
      setIsFlipped((prev) => !prev);
    }, 4000);

    return () => clearInterval(flipInterval);
  }, []);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    // Animate flip with GSAP
    gsap.to(card, {
      rotationY: isFlipped ? 180 : 0,
      duration: 0.8,
      ease: "power2.inOut",
      transformPerspective: 1000,
    });

    // Mouse tilt interaction
    const onMouseMove = (e) => {
      const rect = card.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const x = (e.clientX - centerX) / (rect.width / 2);
      const y = (e.clientY - centerY) / (rect.height / 2);

      gsap.to(card, {
        rotationY: isFlipped ? 180 + x * 8 : x * 8,
        rotationX: -y * 8,
        duration: 0.4,
        ease: "power2.out",
      });
    };

    const onMouseLeave = () => {
      gsap.to(card, {
        rotationY: isFlipped ? 180 : 0,
        rotationX: 0,
        duration: 0.6,
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
      className="w-80 h-48 cursor-pointer shadow-2xl rounded-lg"
      style={{ 
        transformStyle: "preserve-3d",
        perspective: "1000px"
      }}
    >
      {/* Front of card */}
      <div
        className="absolute inset-0 bg-cover bg-center rounded-lg"
        style={{ 
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden"
        }}
      >
        <img 
          src={frontImage} 
          alt="ROLLDECK Business Card Front" 
          className="w-full h-full object-cover rounded-lg"
        />
      </div>

      {/* Back of card - rotated 180 degrees visually */}
      <div
        className="absolute inset-0 bg-cover bg-center rounded-lg"
        style={{ 
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
          transform: "rotateY(180deg)"
        }}
      >
        <img 
          src={backImage} 
          alt="ROLLDECK Business Card Back" 
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
    </div>
  );
}
