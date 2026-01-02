import FlavorTitle from "../components/FlavorTitle";
import FlavorSlider from "../components/FlavorSlider";

const FlavorSection = () => {
  return (
    <section className="flavor-section relative" id="domains">
      {/* Upside Down SVG Background */}
      <img
        src="/images/black-bg.svg"
        className="absolute inset-0 w-full h-full object-cover opacity-10 mix-blend-overlay"
        alt="background texture"
      />
      <div className="h-full flex md:flex-row flex-col items-center relative z-10">
        <div className="md:w-[57%] flex-none h-80 md:h-full md:mt-20 xl:mt-0">
          <FlavorTitle />
        </div>
        <div className="h-full">
          <FlavorSlider />
        </div>
      </div>
    </section>
  );
};

export default FlavorSection;
