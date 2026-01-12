
import { useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "./HeroSection.css";

const HeroSection = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://apply.devfolio.co/v2/sdk.js";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useGSAP(() => {
    // Logo animations
    gsap.from(".hero-logo-top-left", {
      opacity: 0,
      x: -50,
      duration: 1.2,
      ease: "power3.out",
      delay: 0.3,
    });

    // SVV logo - no animation, stays visible
    // gsap.from(".hero-logo-center", {
    //   opacity: 0,
    //   scale: 0.8,
    //   duration: 1.5,
    //   ease: "power3.out",
    //   delay: 0.5,
    // });

    // Content animations
    gsap.from(".hero-content > *", {
      opacity: 0,
      y: 30,
      duration: 1,
      ease: "power3.out",
      stagger: 0.15,
      delay: 1,
    });

    // Parallax effect on scroll - disabled for SVV logo
    // gsap.to(".hero-logo-center", {
    //   scrollTrigger: {
    //     trigger: ".hero-section",
    //     start: "top top",
    //     end: "bottom top",
    //     scrub: 1,
    //   },
    //   y: 100,
    //   opacity: 0.3,
    //   ease: "none",
    // });

    // Fade out content on scroll
    gsap.to(".hero-content", {
      scrollTrigger: {
        trigger: ".hero-section",
        start: "top top",
        end: "50% top",
        scrub: 1,
      },
      opacity: 0,
      y: -50,
      ease: "none",
    });
  });

  return (
    <section className="hero-section" id="home">
      {/* Original background image */}
      <img
        src="/Decoding the Data-upside Down_1.jpg"
        alt="Background"
        className="hero-bg-image"
      />

      {/* Background grain effect */}
      <div className="hero-bg-grain"></div>

      {/* Top-left logo */}
      <img
      // src="/dzlogo.png"
      // alt="DZ Logo"
      // className="hero-logo-top-left"
      />

      {/* Center logo */}
      <img
        src="/SVV_DZ_logo.png"
        alt="SVV Logo"
        className="hero-logo-center"
      />

      {/* Vertical dashed line with text */}
      <div className="hero-divider-wrapper">
        <div className="hero-divider-line hero-divider-top"></div>
        <p className="hero-divider-text">DATAZEN PRESENTS</p>
        <div className="hero-divider-line hero-divider-bottom"></div>
      </div>

      {/* Content */}
      <div className="hero-content">
        <div className="hero-logo-wrapper">
          <div style={{ position: "relative", marginBottom: "3.5rem" }}>
            <div
              className="apply-button"
              data-hackathon-slug="datathon-9"
              data-button-theme="dark-inverted"
              style={{ height: "44px", width: "312px" }}
            ></div>
            <a
              href="https://datathon-9.devfolio.co/overview"
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 10 }}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="sr-only">Apply with Devfolio</span>
            </a>
          </div>
          <div className="hero-datathon-row">
            <p className="hero-side-text hero-left-text">
              7th & 8th <br />
              February, 2026
            </p>
            <h1 className="hero-datathon-text stranger-things-font">DATATHON</h1>
            <p className="hero-side-text hero-right-text">
              K J Somaiya School<br />
              of Engineering
            </p>
          </div>
          <h1 className="hero-year-text stranger-things-font">2026</h1>
        </div>
        <h2 className="hero-subtitle">Decoding the Data</h2>
      </div>
    </section>
  );
};

export default HeroSection;

