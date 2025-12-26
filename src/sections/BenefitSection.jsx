import { useGSAP } from "@gsap/react";
import ClipPathTitle from "../components/ClipPathTitle";
import gsap from "gsap";
import VideoPinSection from "../components/VideoPinSection";

const BenefitSection = () => {
  useGSAP(() => {
    const revealTl = gsap.timeline({
      delay: 1,
      scrollTrigger: {
        trigger: ".benefit-section",
        start: "top 60%",
        end: "top top",
        scrub: 1.5,
      },
    });

    revealTl
      .to(".benefit-section .first-title", {
        duration: 1,
        opacity: 1,
        clipPath: "polygon(0% 0%, 100% 0, 100% 100%, 0% 100%)",
        ease: "circ.out",
      })
      .to(".benefit-section .second-title", {
        duration: 1,
        opacity: 1,
        clipPath: "polygon(0% 0%, 100% 0, 100% 100%, 0% 100%)",
        ease: "circ.out",
      })
      .to(".benefit-section .third-title", {
        duration: 1,
        opacity: 1,
        clipPath: "polygon(0% 0%, 100% 0, 100% 100%, 0% 100%)",
        ease: "circ.out",
      })
      .to(".benefit-section .fourth-title", {
        duration: 1,
        opacity: 1,
        clipPath: "polygon(0% 0%, 100% 0, 100% 100%, 0% 100%)",
        ease: "circ.out",
      });
  });

  return (
    <section className="benefit-section" id="prizes">
      {/* Upside Down SVG Pattern */}
      <img 
        src="/images/blue-bg.svg" 
        className="absolute top-0 left-0 w-1/2 h-1/2 object-cover opacity-5 mix-blend-screen"
        alt="pattern"
      />
      <img 
        src="/images/orange-bg.svg" 
        className="absolute bottom-0 right-0 w-1/2 h-1/2 object-cover opacity-5 mix-blend-screen rotate-180"
        alt="pattern"
      />
      <div className="container mx-auto pt-20 relative z-10">
        <div className="col-center">
          <p>
            Event Highlights: <br />
            Explore What Makes Datathon 2025 Special
          </p>

          <div className="mt-20 col-center">
            <ClipPathTitle
              title={"24-HOUR HACKATHON"}
              color={"#F5F5F5"}
              bg={"#0A0A0C"}
              className={"first-title"}
              borderColor={"#ff003383"}
            />

            <ClipPathTitle
              title={"₹1.4L PRIZE POOL"}
              color={"#F5F5F5"}
              bg={"#16161C"}
              className={"second-title"}
              borderColor={"#ff003383"}
            />

            <ClipPathTitle
              title={"TWO POWER DOMAINS"}
              color={"#E50914"}
              bg={"#0F0F14"}
              className={"third-title"}
              borderColor={"#ff003383"}
            />

            <ClipPathTitle
              title={"REAL-WORLD CHALLENGES"}
              color={"#F5F5F5"}
              bg={"#0F0F14"}
              className={"fourth-title"}
              borderColor={"#ff003383"}
            />
          </div>


          <div className="md:mt-0 mt-10">
            <p>And much more ...</p>
          </div>
        </div>
      </div>

      <div className="relative overlay-box">
        <VideoPinSection />
      </div>
    </section>
  );
};

export default BenefitSection;
