import { useState, useRef } from "react";
import gsap from "gsap";

const defaultFaqs = [
  {
    category: "Services",
    q: "What services does RollDeck Studio offer?",
    a: "We specialize in end-to-end digital transformation, including high-performance web development (React/Next.js), brand identity design, UI/UX strategy, mobile app development, and data visualization. Our focus is on engineering digital ecosystems that drive commercial results."
  },
  {
    category: "Process",
    q: "How long does a typical project take?",
    a: "Timelines vary depending on complexity. A premium brand website typically takes 4-6 weeks, while more complex web applications or custom platforms can range from 8-16 weeks. We provide a comprehensive milestone roadmap during the discovery phase."
  },
  {
    category: "Pricing",
    q: "What is your pricing structure?",
    a: "We operate on a project-based pricing model tailored to your specific requirements, scope, and technical complexity. We don't believe in one-size-fits-all solutions; instead, we provide transparent, value-driven quotes after an initial consultation."
  },
  {
    category: "Philosophy",
    q: "Do you work with early-stage startups?",
    a: "Absolutely. We particularly enjoy partnering with ambitious founders who value design-led engineering. We help startups establish a high-authority digital presence early on, ensuring their product is ready to scale from day one."
  },
  {
    category: "Technical",
    q: "What technologies do you use?",
    a: "Our core tech stack is built for performance and scalability. We primarily use React, Next.js, and Node.js for development, GSAP for high-end animations, and Figma for design. We selectively choose the best technologies based on each project's unique needs."
  },
  {
    category: "Support",
    q: "Do you provide post-launch support?",
    a: "Yes, we offer ongoing maintenance and optimization partnerships. This includes performance monitoring, security updates, feature enhancements, and continuous SEO adjustments to ensure your digital asset remains at peak performance."
  }
];

export default function FAQ({ faqs = defaultFaqs, title = "Frequently Asked Questions", subtitle = "Common Questions" }) {
  const [openIndex, setOpenIndex] = useState(null);
  const contentRefs = useRef([]);

  const toggleFaq = (index) => {
    const isOpening = openIndex !== index;
    const tl = gsap.timeline({ defaults: { duration: 0.5, ease: "power3.inOut" } });

    // Close previous if any
    if (openIndex !== null && openIndex !== index) {
      tl.to(contentRefs.current[openIndex], { height: 0, opacity: 0, marginTop: 0 }, 0);
    }

    // Toggle current
    if (isOpening) {
      setOpenIndex(index);
      tl.to(contentRefs.current[index], { height: "auto", opacity: 1, marginTop: 24 }, 0);
    } else {
      setOpenIndex(null);
      tl.to(contentRefs.current[index], { height: 0, opacity: 0, marginTop: 0 }, 0);
    }
  };

  return (
    <div className="faq-component w-full">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
        {/* Header Section */}
        <div className="lg:col-span-5">
          <div className="sticky top-32">
            <span className="text-[10px] uppercase tracking-[0.5em] text-orange-500 font-bold block mb-6 px-1 border-l-2 border-orange-500/30">
              {subtitle}
            </span>
            <h2 className="text-4xl lg:text-7xl font-black uppercase tracking-tighter leading-[0.9] text-white">
              {title.split(' ').slice(0, -1).join(' ')}<br />
              <span className="italic text-transparent stroke-text" style={{ WebkitTextStroke: "1px #ff5500" }}>
                {title.split(' ').slice(-1)}
              </span>
            </h2>
            <p className="mt-8 text-white/40 leading-relaxed max-w-sm text-sm lg:text-base">
              Explore our most common inquiries. If you have a specific technical or business question not covered here, 
              <a href="/contact" className="text-white border-b border-white/20 hover:border-white transition-colors ml-1">reach out directly</a>.
            </p>

            <div className="mt-12 hidden lg:flex flex-col gap-4">
               {/* Decorative Element */}
               <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-orange-600/10 blur-3xl -mr-10 -mt-10 group-hover:bg-orange-600/20 transition-colors" />
                  <span className="text-2xl mb-4 block">✦</span>
                  <h4 className="text-lg font-bold uppercase mb-2">Need a Custom Solution?</h4>
                  <p className="text-xs text-white/40 leading-relaxed">Schedule a discovery call to discuss your project specifics and technical requirements.</p>
                  <a href="/contact" className="mt-6 inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-orange-500 group-hover:gap-4 transition-all">
                    Book Call <span>→</span>
                  </a>
               </div>
            </div>
          </div>
        </div>

        {/* Accordion Section */}
        <div className="lg:col-span-7 space-y-4">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className={`faq-item-container transition-all duration-500 rounded-3xl border overflow-hidden group ${
                openIndex === i 
                  ? "bg-white/[0.04] border-white/10" 
                  : "bg-white/[0.02] border-white/5 hover:border-white/10"
              }`}
            >
              <button
                onClick={() => toggleFaq(i)}
                className="w-full flex items-start justify-between p-8 text-left interactive group"
              >
                <div className="flex gap-6 items-start">
                  <span className={`text-[10px] font-black w-6 h-6 rounded-full flex items-center justify-center border transition-colors ${
                    openIndex === i ? "bg-orange-500 border-orange-500 text-white" : "border-white/10 text-white/20 group-hover:border-white/30"
                  }`}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="flex flex-col gap-2">
                    <span className="text-[9px] uppercase tracking-widest text-white/20 font-bold group-hover:text-orange-500/50 transition-colors">
                      {faq.category}
                    </span>
                    <span className={`font-bold uppercase text-base lg:text-lg tracking-tight transition-colors ${
                      openIndex === i ? "text-white" : "text-white/70 group-hover:text-white"
                    }`}>
                      {faq.q}
                    </span>
                  </div>
                </div>
                <div className={`mt-1.5 flex-shrink-0 w-6 h-6 rounded-full border border-white/10 flex items-center justify-center transition-all duration-500 ${
                  openIndex === i ? "rotate-45 border-orange-500/50 bg-orange-500/10" : "group-hover:border-white/30"
                }`}>
                  <span className={`text-xl font-light transition-colors ${openIndex === i ? "text-orange-500" : "text-white/30"}`}>+</span>
                </div>
              </button>
              
              <div
                ref={(el) => (contentRefs.current[i] = el)}
                className="px-8 h-0 opacity-0 overflow-hidden"
              >
                <div className="pb-8 pl-12 border-t border-white/5 pt-6">
                  <p className="text-white/50 text-base leading-relaxed max-w-2xl">
                    {faq.a}
                  </p>
                  
                  {/* Decorative line */}
                  <div className="mt-8 w-12 h-1 bg-gradient-to-r from-orange-500 to-transparent rounded-full opacity-30" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
