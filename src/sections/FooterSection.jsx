import { useMediaQuery } from "react-responsive";

const FooterSection = () => {
  const isMobile = useMediaQuery({
    query: "(max-width: 768px)",
  });

  return (
    <section className="footer-section">
      <div className="2xl:h-[110dvh] relative md:pt-[20vh] pt-[10vh]">
        <div className="mt-40 overflow-hidden z-10">
          <h1 className="general-title text-center text-milk py-5">
            #DATATHON2026
          </h1>
        </div>

        <div className="mt-10 md:px-10 px-5 flex gap-10 md:flex-row flex-col justify-center text-milk font-paragraph md:text-lg font-medium">
          <div className="flex items-center gap-7">
            <p>
              Register Now! Get Updates on Problem Statements, Event Details, and More!
            </p>
          </div>
        </div>

        <div className="mt-50 copyright-box">
          {/* The final row with copyright and legal links. */}
          <p>Copyright © 2025-26 DataZen - All Rights Reserved</p>
          <div className="flex items-center gap-7">
            {/* <p>Privacy Policy</p>
            <p>Terms of Sеrvice</p> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FooterSection;
