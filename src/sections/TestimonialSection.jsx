
import { cards } from "../constants";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const TestimonialSection = () => {
  

    useGSAP(() => {
    gsap.set(".testimonials-section", {
      marginTop: "-140vh",
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".testimonials-section",
        start: "top bottom",
        end: "200% top",
        scrub: true,
      },
    });

    tl.to(".testimonials-section .first-title", {
      xPercent: 70,
    })
      .to(
        ".testimonials-section .sec-title",
        {
          xPercent: 25,
        },
        "<"
      )
      .to(
        ".testimonials-section .third-title",
        {
          xPercent: -50,
        },
        "<"
      );

    const pinTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".testimonials-section",
        start: "10% top",
        end: "200% top",
        scrub: 1.5,
        pin: true,
      },
    });

    pinTl.from(".vd-card", {
      yPercent: 150,
      stagger: 0.2,
      ease: "power1.inOut",
    });
  });

  return (
    <section className="testimonials-section">
      <div className="absolute size-full flex flex-col items-center pt-[5vw]">
        <h1 className="text-red first-title" style={{textShadow: '0 0 30px rgba(255, 0, 0, 0.8)'}}>Meet</h1>
        <h1 className="text-milk sec-title" style={{textShadow: '0 0 20px rgba(255, 255, 255, 0.6)'}}>The</h1>
        <h1 className="text-red third-title" style={{textShadow: '0 0 30px rgba(255, 0, 0, 0.8)'}}>Team</h1>
      </div>

      <div className="pin-box">
        {cards.map((card, index) => (
          <div
            key={index}
            className={`vd-card ${card.translation} ${card.rotation}`}
          >
            <img
              src={card.img}
              alt={card.name}
              className="size-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white text-center bg-black bg-opacity-50">
              {card.name}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TestimonialSection;
