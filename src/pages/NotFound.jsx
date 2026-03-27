import { Link } from "react-router-dom";
import SEO from "../components/SEO";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#050505] text-white flex items-center justify-center relative overflow-hidden selection:bg-white selection:text-black">
      <SEO title="404 - Page Not Found" description="The page you're looking for doesn't exist. Return to RollDeck Studio." />
      {/* Background Decorative */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
        backgroundSize: "60px 60px"
      }} />
      
      <div className="container text-center relative z-10">
        <div className="mb-8">
          <span className="text-[clamp(8rem,30vw,25rem)] font-black leading-none tracking-tighter text-transparent block" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.08)" }}>
            404
          </span>
        </div>

        <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight mb-6">
          Page Not <span className="italic text-transparent" style={{ WebkitTextStroke: "1px white" }}>Found.</span>
        </h1>

        <p className="text-white/40 max-w-md mx-auto mb-12 leading-relaxed">
          The page you're looking for doesn't exist or has been moved. Let's get you back on track.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="px-10 py-4 bg-white text-black font-black uppercase tracking-widest text-xs rounded-full interactive hover:scale-105 transition-transform"
          >
            Back to Home
          </Link>
          <Link
            to="/contact"
            className="px-10 py-4 border border-white/20 text-white/60 font-bold uppercase tracking-widest text-xs rounded-full interactive hover:border-white/50 hover:text-white transition-all"
          >
            Contact Us
          </Link>
        </div>
      </div>

      {/* Decorative Element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[40vw] font-black text-white/[0.01] select-none pointer-events-none">✦</div>
    </main>
  );
}
