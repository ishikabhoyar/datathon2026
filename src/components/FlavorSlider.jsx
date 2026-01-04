import { useGSAP } from "@gsap/react";
import { flavorlists } from "../constants";
import gsap from "gsap";
import { useRef } from "react";


const FlavorSlider = () => {
  const sliderRef = useRef();

  useGSAP(() => {
    let mm = gsap.matchMedia();

    // Desktop logic: min-width 768px (matching md breakpoint)
    mm.add("(min-width: 768px)", () => {
      const scrollAmount = sliderRef.current.scrollWidth - window.innerWidth;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".flavor-section",
          start: "2% top",
          end: `+=${scrollAmount + 1500}px`,
          scrub: true,
          pin: true,
        },
      });

      tl.to(".flavor-section", {
        x: `-${scrollAmount + 1500}px`,
        ease: "power1.inOut",
      });

      const titleTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".flavor-section",
          start: "top top",
          end: "bottom 80%",
          scrub: true,
        },
      });

      titleTl
        .to(".first-text-split", {
          xPercent: -30,
          ease: "power1.inOut",
        })
        .to(
          ".flavor-text-scroll",
          {
            xPercent: -22,
            ease: "power1.inOut",
          },
          "<"
        )
        .to(
          ".second-text-split",
          {
            xPercent: -10,
            ease: "power1.inOut",
          },
          "<"
        );
    });

    // Mobile logic: can be explicit or just default fallback (no animations)
    // mm.add("(max-width: 767px)", () => {
    //   // Clean up or simple vertical scroll logic if needed
    // });

  });

  return (
    <div ref={sliderRef} className="slider-wrapper">
      <div className="flavors">
        {flavorlists.map((flavor, index) => {
          const techImages = [
            "/images/geniai.jpeg", // Generative AI
            "/images/coreml.jpeg", // Core ML
            "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=600&h=800&fit=crop", // Pre-trained
            "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=600&h=800&fit=crop", // RAG Fusion
            "https://images.unsplash.com/photo-1555255707-c07966088b7b?w=600&h=800&fit=crop", // Optimization
            "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=600&h=800&fit=crop"  // Data Science
          ];

          return (
            <div
              key={flavor.name}
              className={`relative z-30 md:w-[50vw] w-96 md:h-[70vh] md:w-[90vw] md:h-[50vh] h-80 flex-none ${flavor.rotation}`}
            >
              <img
                src={techImages[index]}
                alt="AI Technology"
                className="drinks object-cover"
              />

              <h1>{flavor.name}</h1>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FlavorSlider;
