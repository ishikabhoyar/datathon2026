import { useMediaQuery } from "react-responsive";
import { nutrientLists } from "../constants";
import { useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/all";
import gsap from "gsap";

const NutritionSection = () => {
  const isMobile = useMediaQuery({
    query: "(max-width: 768px)",
  });

  const [lists, setLists] = useState(nutrientLists);

  useEffect(() => {
    if (isMobile) {
      setLists(nutrientLists.slice(0, 3));
    } else {
      setLists(nutrientLists);
    }
  }, [isMobile]);

  useGSAP(() => {
    const titleSplit = SplitText.create(".nutrition-title", {
      type: "chars",
    });

    const paragraphSplit = SplitText.create(".nutrition-section p", {
      type: "words, lines",
      linesClass: "paragraph-line",
    });

    const contentTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".nutrition-section",
        start: "top center",
      },
    });

    contentTl
      .from(titleSplit.chars, {
        yPercent: 100,
        stagger: 0.02,
        ease: "power2.out",
      })
      .from(paragraphSplit.words, {
        yPercent: 300,
        rotate: 3,
        ease: "power1.inOut",
        duration: 1,
        stagger: 0.01,
      });

    const titleTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".nutrition-section",
        start: "top 80%",
      },
    });

    titleTl.to(".nutrition-text-scroll", {
      duration: 1,
      opacity: 1,
      clipPath: "polygon(100% 0, 0 0, 0 100%, 100% 100%)",
      ease: "power1.inOut",
    });
  });

  return (
    <section className="nutrition-section relative overflow-hidden hidden md:block">

      {/* Stranger Things Upside Down Background */}
      <img
        src="/images/lbg.png"
        alt="Upside Down Background"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/60 z-[1]" />

      {/* Accent SVGs */}
      <img
        src="/images/red-bg.svg"
        className="absolute top-0 right-0 w-64 h-64 opacity-10 mix-blend-overlay z-[2]"
        alt="accent"
      />
      <img
        src="/images/white-bg.svg"
        className="absolute bottom-0 left-0 w-64 h-64 opacity-10 mix-blend-overlay rotate-180 z-[2]"
        alt="accent"
      />

      <div className="relative z-10 flex flex-col md:px-10 px-5 mt-14 md:mt-0">

        {/* LEFT TITLE */}
        <div className="relative inline-block md:translate-y-20">
          <div className="general-title relative flex flex-col justify-center items-center gap-24">

            <div className="overflow-hidden place-self-start">
              <h1 className="nutrition-title text-5xl md:text-[8rem] text-white relative z-20 -mb-px flicker-text">Skills that</h1>
            </div>

            <div
              className="nutrition-text-scroll place-self-start opacity-0"
            >
              <h2
                className="
                text-5xl md:text-[6rem]
                text-red-500
                drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]
                drop-shadow-[0_0_16px_rgba(255,0,0,0.6)]
              "
              >
                Drive Innovation
              </h2>
            </div>


          </div>
        </div>

        {/* RIGHT TEXT */}
        <div className="flex md:justify-end items-center -translate-y-14">
          <div className="md:max-w-sm max-w-lg">
            <p className="text-xl md:text-2xl md:text-right text-balance font-heading font-semibold text-white leading-relaxed tracking-wide">
              Master cutting-edge technologies like <span className="text-red-500">Generative AI</span>,
              <span className="text-red-500"> Core ML</span>, <span className="text-red-500">RAG Fusion</span>,
              and advanced <span className="text-red-500">model optimization</span> techniques.
            </p>
          </div>
        </div>



        {/* STATS BOX */}
        <div className="relative mt-24 mx-auto w-fit">

          {/* GLOW LAYER (only glow, behind) */}
          <div className="absolute inset-0 rounded-full blur-xl bg-red-500/50" />

          {/* ACTUAL PILL */}
          <div
            className="
              relative z-10
              bg-black/70 backdrop-blur-md
              rounded-full
              border border-red-300
              overflow-hidden
              shadow-[0_0_20px_rgba(255,0,0,0.5),0_0_40px_rgba(255,0,0,0.35)]
            "
          >
            <div className="list-wrapper flex items-center gap-10 px-14 py-8">
              {lists.map((nutrient, index) => (
                <div
                  key={index}
                  className="relative w-[190px] col-center text-center"
                >
                  <p className="md:text-lg font-paragraph">
                    {nutrient.label}
                  </p>

                  <p className="font-paragraph text-sm mt-2">up to</p>

                  <p className="text-2xl md:text-4xl tracking-tighter font-bold text-white">
                    {nutrient.amount}
                  </p>

                  {index !== lists.length - 1 && (
                    <div className="absolute right-[-20px] top-1/2 -translate-y-1/2 h-12 w-px bg-red-500/40" />
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>


      </div>
    </section>
  );
};

export default NutritionSection;
