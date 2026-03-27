import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Cursor() {
  const cursorRef = useRef(null);
  const followerRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;

    const onMouseMove = (e) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1
      });
      gsap.to(follower, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.3
      });
    };

    const onMouseEnter = (e) => {
      if (e.target.classList.contains('interactive')) {
        gsap.to(cursor, { scale: 3, backgroundColor: '#ff5500', opacity: 0.15, duration: 0.3 });
        gsap.to(follower, { scale: 1.5, borderColor: '#ff5500', duration: 0.3 });
      }
    };

    const onMouseLeave = () => {
      gsap.to(cursor, { scale: 1, backgroundColor: '#fff', opacity: 1, duration: 0.3 });
      gsap.to(follower, { scale: 1, borderColor: 'rgba(255,255,255,0.2)', duration: 0.3 });
    };

    window.addEventListener('mousemove', onMouseMove);
    document.querySelectorAll('.interactive').forEach(el => {
      el.addEventListener('mouseenter', onMouseEnter);
      el.addEventListener('mouseleave', onMouseLeave);
    });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return (
    <>
      <div 
        ref={cursorRef} 
        className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference hidden lg:block"
        style={{ transform: 'translate(-50%, -50%)' }}
      />
      <div 
        ref={followerRef} 
        className="fixed top-0 left-0 w-8 h-8 border border-white/20 rounded-full pointer-events-none z-[9998] hidden lg:block"
        style={{ transform: 'translate(-50%, -50%)' }}
      />
    </>
  );
}
