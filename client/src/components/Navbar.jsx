import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
import { Link, animateScroll as scroll } from "react-scroll";

function Navbar() {
  const { user } = useUser();
  const { openSignIn } = useClerk();

  return (
    <nav
      id="top"
      className={`navbar fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center border border-slate-700 px-6 py-4 rounded-full text-white text-sm w-full max-sm:w-[calc(100%-2rem)] max-sm:mx-auto backdrop-blur-sm transition-all ${
        user ? "max-w-md" : "max-w-2xl"
      }`}
    >
      <div onClick={() => scroll.scrollToTop({ duration: 1000, smooth: true })}>
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="4.706" cy="16" r="4.706" fill="#D9D9D9" />
          <circle cx="16.001" cy="4.706" r="4.706" fill="#D9D9D9" />
          <circle cx="16.001" cy="27.294" r="4.706" fill="#D9D9D9" />
          <circle cx="27.294" cy="16" r="4.706" fill="#D9D9D9" />
        </svg>
      </div>

      <div className="flex items-center gap-6 ml-7 max-sm:ml-5">
        <div className="relative overflow-hidden h-6 group cursor-pointer">
          <Link to="Ai-tools" smooth={true} duration={1000} offset={-80}>
            <span className="block group-hover:-translate-y-full transition-transform duration-300">
              AI Tools
            </span>
          </Link>
          <Link to="Ai-tools" smooth={true} duration={1000} offset={-80}>
            <span className="block absolute top-full left-0 group-hover:translate-y-[-100%] transition-transform duration-300">
              AI Tools
            </span>
          </Link>
        </div>
        <div
          href="#"
          className="relative overflow-hidden h-6 group cursor-pointer"
        >
          <Link to="testimonials" smooth={true} duration={1000} offset={-135}>
            <span className="block group-hover:-translate-y-full transition-transform duration-300">
              Reviews
            </span>
          </Link>
          <Link to="testimonials" smooth={true} duration={1000} offset={-135}>
            <span className="block absolute top-full left-0 group-hover:translate-y-[-100%] transition-transform duration-300">
              Reviews
            </span>
          </Link>
        </div>
        <div
          href="#"
          className="relative overflow-hidden h-6 group cursor-pointer"
        >
          <Link to="pricing" smooth={true} offset={-110} duration={1000}>
            <span className="block group-hover:-translate-y-full transition-transform duration-300">
              Pricing
            </span>
          </Link>
          <Link to="pricing" smooth={true} offset={-110} duration={1000}>
            <span className="block absolute top-full left-0 group-hover:translate-y-[-100%] transition-transform duration-300">
              Pricing
            </span>
          </Link>
        </div>
        <div
          href="#"
          className="relative overflow-hidden h-6 group max-sm:hidden cursor-pointer"
        >
          <span className="block group-hover:-translate-y-full transition-transform duration-300">
            About
          </span>
          <Link to="about" smooth={true} offset={-210} duration={1000}>
            <span className="block absolute top-full left-0 group-hover:translate-y-[-100%] transition-transform duration-300">
              About
            </span>
          </Link>
        </div>
      </div>

      {user ? (
        <div className="ml-10 mx-auto">
          <UserButton
            appearance={{
              elements: {
                avatarBox: "border border-white rounded-full transition",
              },
            }}
          />
        </div>
      ) : (
        <button
          onClick={openSignIn}
          className="ml-auto bg-white relative z-10 hover:shadow-[0px_0px_30px_14px] shadow-[0px_0px_30px_7px] hover:shadow-white/50 shadow-white/50 text-black px-4 py-2 rounded-full text-sm max-sm:text-xs font-medium hover:bg-slate-100 transition duration-300"
        >
          Get Started
        </button>
      )}
    </nav>
  );
}

export default Navbar;
