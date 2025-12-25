import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/all";

const GalleryTitle = () => {
    useGSAP(() => {
        const firstTextSplit = SplitText.create(".gallery-first-text h1", {
            type: "chars",
        });
        const secondTextSplit = SplitText.create(".gallery-second-text h1", {
            type: "chars",
        });

        gsap.from(firstTextSplit.chars, {
            yPercent: 200,
            stagger: 0.02,
            ease: "power1.inOut",
            scrollTrigger: {
                trigger: ".gallery-section",
                start: "top 30%",
            },
        });

        gsap.to(".gallery-text-scroll", {
            duration: 1,
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            scrollTrigger: {
                trigger: ".gallery-section",
                start: "top 10%",
            },
        });

        gsap.from(secondTextSplit.chars, {
            yPercent: 200,
            stagger: 0.02,
            ease: "power1.inOut",
            scrollTrigger: {
                trigger: ".gallery-section",
                start: "top 1%",
            },
        });
    });

    return (
        <div className="general-title col-center h-full 2xl:gap-32 xl:gap-24 gap-16">
            <div className="overflow-hidden 2xl:py-0 py-3 gallery-first-text">
                <h1>Explore</h1>
            </div>

            <div
                style={{
                    clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)",
                }}
                className="gallery-text-scroll"
            >
                <div className="bg-red pb-5 2xl:pt-0 pt-3 2xl:px-5 px-3">
                    <h2 className="text-black">Our</h2>
                </div>
            </div>

            <div className="overflow-hidden 2xl:py-0 py-3 gallery-second-text">
                <h1>Gallery</h1>
            </div>
        </div>
    );
};

export default GalleryTitle;
