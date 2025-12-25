import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { useMediaQuery } from "react-responsive";

const GallerySlider = () => {
    const sliderRef = useRef();

    const isTablet = useMediaQuery({
        query: "(max-width: 1024px)",
    });

    useGSAP(() => {
        const scrollAmount = sliderRef.current.scrollWidth - window.innerWidth;

        if (!isTablet) {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: ".gallery-section",
                    start: "2% top",
                    end: `+=${scrollAmount + 1500}px`,
                    scrub: true,
                    pin: true,
                },
            });

            tl.to(".gallery-section", {
                x: `-${scrollAmount + 1500}px`,
                ease: "power1.inOut",
            })
                .to(".flavors .relative", {
                    yPercent: -150,
                    opacity: 0,
                    stagger: 0.05,
                    duration: 0.5,
                    ease: "power1.in",
                }, ">-0.5");
        }

        const titleTl = gsap.timeline({
            scrollTrigger: {
                trigger: ".gallery-section",
                start: "top top",
                end: "bottom 80%",
                scrub: true,
            },
        });

        titleTl
            .to(".gallery-first-text", {
                xPercent: -30,
                ease: "power1.inOut",
            })
            .to(
                ".gallery-text-scroll",
                {
                    xPercent: -22,
                    ease: "power1.inOut",
                },
                "<"
            )
            .to(
                ".gallery-second-text",
                {
                    xPercent: -10,
                    ease: "power1.inOut",
                },
                "<"
            );
    });

    const galleryImages = Array.from({ length: 12 }, (_, i) => ({
        src: `/images/gallery/img${i + 1}.JPG`,
        rotation: i % 2 === 0 ? "md:rotate-[-8deg] rotate-0" : "md:rotate-[8deg] rotate-0"
    }));

    return (
        <div ref={sliderRef} className="slider-wrapper">
            <div className="flavors">
                {galleryImages.map((img, index) => (
                    <div
                        key={index}
                        className={`relative z-30 lg:w-[50vw] w-96 lg:h-[70vh] md:w-[90vw] md:h-[50vh] h-80 flex-none ${img.rotation} border-[.5vw] border-red md:rounded-[2vw] rounded-3xl overflow-hidden`}
                    >
                        <img
                            src={img.src}
                            alt={`Gallery Image ${index + 1}`}
                            className="drinks object-cover w-full h-full"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GallerySlider;
