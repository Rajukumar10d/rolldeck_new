import { NavLink } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const base = "px-6 py-3 text-[11px] font-black uppercase tracking-[0.3em] block relative transition-all duration-300 interactive";

  return (
    <div className="relative">
      <button
        aria-expanded={open}
        aria-label="Toggle menu"
        onClick={() => setOpen(v => !v)}
        className="md:hidden text-white/80 focus:outline-none p-4 hover:scale-110 active:scale-95 transition-all interactive"
      >
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 8h16M4 16h16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      </button>

      <nav className="hidden md:flex items-center gap-2">
        {[
          { to: "/", label: "Home" },
          { to: "/about", label: "Studio" },
          { to: "/services", label: "Services" },
          { to: "/projects", label: "Work" },
          { to: "/contact", label: "Contact" }
        ].map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) => 
              `${base} group ${isActive ? 'text-orange-500 translate-z-10 bg-orange-600/10 rounded-full' : 'text-white/40 hover:text-white'}`
            }
          >
            <span className="relative z-10">{link.label}</span>
            <div className="absolute inset-0 bg-orange-600/0 group-hover:bg-orange-600/5 rounded-full transition-all duration-500 scale-90 group-hover:scale-100 opacity-0 group-hover:opacity-100 blur-sm group-hover:blur-none" />
          </NavLink>
        ))}
      </nav>

      {/* Mobile menu - 3D Sliding Overlay */}
      {open && (
        <div className="md:hidden fixed top-0 right-0 w-full h-screen z-50 bg-bg-dark/95 backdrop-blur-3xl p-10 flex flex-col items-center justify-center gap-10">
          <button 
            onClick={() => setOpen(false)}
            className="absolute top-10 right-10 text-white/40 hover:text-white transition-colors"
          >
             <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
          
          <div className="flex flex-col gap-6 text-center">
            {[
              { to: "/", label: "Home" },
              { to: "/about", label: "Studio" },
              { to: "/services", label: "Services" },
              { to: "/projects", label: "Work" },
              { to: "/contact", label: "Contact" }
            ].map((link) => (
              <NavLink 
                key={link.to}
                onClick={() => setOpen(false)} 
                to={link.to} 
                className={({isActive}) => `text-4xl font-black uppercase tracking-tighter ${isActive ? 'text-white' : 'text-white/30'}`}
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
