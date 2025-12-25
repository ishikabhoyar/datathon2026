import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/all";
import { useMediaQuery } from "react-responsive";

const HeroSection = () => {
  const isMobile = useMediaQuery({
    query: "(max-width: 768px)",
  });

  const isTablet = useMediaQuery({
    query: "(max-width: 1024px)",
  });

  useGSAP(() => {
    // Smooth fade-in animation on page load
    gsap.from(".hero-image", {
      opacity: 0,
      scale: 1.1,
      duration: 1.5,
      ease: "power2.out",
      delay: 0.3,
    });

    // Parallax scroll effect
    gsap.to(".hero-image", {
      scrollTrigger: {
        trigger: ".hero-container",
        start: "top top",
        end: "bottom top",
        scrub: 1,
      },
      yPercent: 30,
      ease: "none",
    });

    // Smooth container animation on scroll
    gsap.to(".hero-container", {
      scrollTrigger: {
        trigger: ".hero-container",
        start: "top top",
        end: "bottom top",
        scrub: 1.5,
      },
      scale: 0.85,
      borderRadius: "24px",
      ease: "power1.inOut",
    });
  });

  return (
    <section className="bg-main-bg">
      <div className="hero-container">
        {/* Hero Background Image */}
        <img
          src="/Decoding the Data-upside Down..png"
          className="hero-image absolute inset-0 w-full h-full object-cover"
          alt="Decoding the Data - Upside Down"
        />
      </div>
    </section>
  );
};

export default HeroSection;
