import { useEffect, useState } from "react";

const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = () => setIsMenuOpen(false);

  const navLinks = ["Home", "Domains", "Timeline", "Gallery"];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 border-b ${
        scrolled
          ? "bg-black/90 backdrop-blur-md border-[#ff0909]/30 py-3"
          : "bg-transparent border-transparent py-6"
      }`}
    >
      <div className="w-full px-6 md:px-16 flex justify-between items-center">
        
        {/* Logo Image */}
        <div
          className="z-50 relative cursor-pointer transition-transform duration-300 hover:scale-105"
          onClick={() => window.location.reload()}
        >
          <img 
            src="/dzlogo.png" 
            alt="DataZen Logo" 
            className="h-12 md:h-16 w-auto object-contain drop-shadow-[0_0_8px_rgba(255,0,0,0.6)] hover:drop-shadow-[0_0_15px_rgba(255,0,0,0.9)] transition-all duration-300"
          />
        </div>

        {/* Desktop Links - Enhanced Hover Effect */}
        <div className="hidden md:flex gap-6 items-center">
          {navLinks.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="
                relative px-5 py-2 rounded-lg border border-transparent
                text-gray-300 font-sans uppercase tracking-widest text-sm font-bold
                transition-all duration-300 ease-out
                
                /* Hover State: Red Fade & Glow */
                hover:text-[#ff0909]
                hover:bg-[#ff0909]/10
                hover:border-[#ff0909]/30
                hover:shadow-[0_0_20px_rgba(255,9,9,0.4)]
                hover:scale-105
                hover:backdrop-blur-sm
              "
              style={{
                textShadow: "0 0 0px rgba(0,0,0,0)", 
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.textShadow = "0 0 10px rgba(255, 9, 9, 0.8)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.textShadow = "none";
              }}
            >
              {link}
            </a>
          ))}
        </div>

        {/* Mobile Menu Button (Hamburger) */}
        <div
          className="md:hidden z-50 relative cursor-pointer text-[#ff0909] p-2 hover:drop-shadow-[0_0_8px_rgba(255,0,0,0.8)] transition-all"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <div className={`w-8 h-0.5 bg-[#ff0909] mb-1.5 transition-all duration-300 shadow-[0_0_5px_red] ${isMenuOpen ? "rotate-45 translate-y-2" : ""}`}></div>
          <div className={`w-8 h-0.5 bg-[#ff0909] mb-1.5 transition-all duration-300 shadow-[0_0_5px_red] ${isMenuOpen ? "opacity-0" : ""}`}></div>
          <div className={`w-8 h-0.5 bg-[#ff0909] transition-all duration-300 shadow-[0_0_5px_red] ${isMenuOpen ? "-rotate-45 -translate-y-2" : ""}`}></div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-black z-40 flex flex-col items-center justify-center gap-8 transition-transform duration-500 ease-in-out md:hidden ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`}>
        {/* Background Atmosphere */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-red-900/20 via-black to-black pointer-events-none"></div>

        {navLinks.map((link) => (
          <a
            key={link}
            href={`#${link.toLowerCase()}`}
            onClick={handleLinkClick}
            className="relative z-10 text-3xl text-gray-300 font-stranger uppercase tracking-widest hover:text-[#ff0909] hover:scale-110 hover:drop-shadow-[0_0_25px_rgba(255,9,9,1)] transition-all duration-300"
          >
            {link}
          </a>
        ))}
      </div>
    </nav>
  );
};

export default NavBar;