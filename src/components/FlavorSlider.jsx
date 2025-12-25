import { useGSAP } from "@gsap/react";
import { flavorlists } from "../constants";
import gsap from "gsap";
import { useRef } from "react";
import { useMediaQuery } from "react-responsive";

const FlavorSlider = () => {
  const sliderRef = useRef();

  const isTablet = useMediaQuery({
    query: "(max-width: 1024px)",
  });

  useGSAP(() => {
    const scrollAmount = sliderRef.current.scrollWidth - window.innerWidth;

    if (!isTablet) {
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
    }

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
              className={`relative z-30 lg:w-[50vw] w-96 lg:h-[70vh] md:w-[90vw] md:h-[50vh] h-80 flex-none ${flavor.rotation}`}
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
