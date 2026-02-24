import { NavLink } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const base = "px-4 py-2 text-sm uppercase tracking-widest block";

  return (
    <div className="relative">
      <button
        aria-expanded={open}
        aria-label="Toggle menu"
        onClick={() => setOpen(v => !v)}
        className="md:hidden text-white/80 focus:outline-none p-2"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <nav className="hidden md:flex items-center gap-2">
        <NavLink to="/" className={({isActive}) => `${base} ${isActive ? 'text-white' : 'text-white/70 hover:text-white'}`}>Home</NavLink>
        <NavLink to="/about" className={({isActive}) => `${base} ${isActive ? 'text-white' : 'text-white/70 hover:text-white'}`}>About</NavLink>
        <NavLink to="/projects" className={({isActive}) => `${base} ${isActive ? 'text-white' : 'text-white/70 hover:text-white'}`}>Work</NavLink>
        <NavLink to="/contact" className={({isActive}) => `${base} ${isActive ? 'text-white' : 'text-white/70 hover:text-white'}`}>Contact</NavLink>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden absolute right-0 mt-2 w-56 bg-bg-dark/90 backdrop-blur-sm border border-white/6 rounded-md shadow-lg">
          <div className="py-2">
            <NavLink onClick={() => setOpen(false)} to="/" className={({isActive}) => `${base} ${isActive ? 'text-white' : 'text-white/80 hover:text-white'}`}>Home</NavLink>
            <NavLink onClick={() => setOpen(false)} to="/about" className={({isActive}) => `${base} ${isActive ? 'text-white' : 'text-white/80 hover:text-white'}`}>About</NavLink>
            <NavLink onClick={() => setOpen(false)} to="/projects" className={({isActive}) => `${base} ${isActive ? 'text-white' : 'text-white/80 hover:text-white'}`}>Work</NavLink>
            <NavLink onClick={() => setOpen(false)} to="/contact" className={({isActive}) => `${base} ${isActive ? 'text-white' : 'text-white/80 hover:text-white'}`}>Contact</NavLink>
          </div>
        </div>
      )}
    </div>
  );
}
