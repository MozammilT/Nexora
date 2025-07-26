import Title from "./Title";

function Partners() {
  const companyLogos = [
    "slack",
    "framer",
    "netflix",
    "google",
    "linkedin",
    "instagram",
    "facebook",
    "github",
  ];

  return (
    <>
      <style>{`
        @keyframes marqueeScroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marqueeScroll 15s linear infinite;
          will-change: transform;
        }
        @media (max-width: 640px) {
          .animate-marquee {
            animation: none;
          }
        }
      `}</style>

      <Title title="Trusted by world's leading companies" />

      <div className="relative overflow-hidden w-full max-w-7xl mx-auto select-none my-10 hidden sm:block">
        <div className="pointer-events-none absolute left-0 top-0 h-full w-20 z-10 bg-gradient-to-r from-black to-transparent" />

        <div className="animate-marquee flex w-[200%]">
          {[...Array(2)].map((_, i) => (
            <div
              key={i}
              className="flex w-1/2 shrink-0 items-center justify-around"
              aria-hidden={i === 1}
            >
              {companyLogos.map((company, index) => (
                <div
                  key={index}
                  className="px-6 flex items-center justify-center"
                >
                  <img
                    src={`/${company}.svg`}
                    alt={company}
                    className="h-8 sm:h-10 w-auto"
                    draggable={false}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className="pointer-events-none absolute right-0 top-0 h-full w-20 md:w-40 z-10 bg-gradient-to-l from-black to-transparent" />
      </div>

      <div className="grid grid-cols-4 gap-6 px-4 sm:hidden mt-8">
        {companyLogos.map((company, index) => (
          <div key={index} className="flex items-center justify-center">
            <img
              src={`/${company}.svg`}
              alt={company}
              className="h-8 w-auto opacity-80 hover:opacity-100 transition"
              draggable={false}
            />
          </div>
        ))}
      </div>
    </>
  );
}

export default Partners;
