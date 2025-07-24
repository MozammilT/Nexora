import { useTheme } from "../context/ThemeContext.jsx";
import { useNavigate } from "react-router-dom";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";

function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const darkMode = theme === "dark";
  const navigate = useNavigate();
  const { user } = useUser();
  const { openSignIn } = useClerk();

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center border bg-transparent border-slate-700 px-6 py-4 rounded-full text-white text-sm max-w-xl backdrop-blur-xs transition-all">
      <a href="/">
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
      </a>
      <div className="hidden md:flex items-center gap-6 ml-7">
        <a href="#" className="relative overflow-hidden h-6 group">
          <span className="block group-hover:-translate-y-full transition-transform duration-300">
            AI Tools
          </span>
          <span className="block absolute top-full left-0 group-hover:translate-y-[-100%] transition-transform duration-300">
            AI Tools
          </span>
        </a>
        <a href="#" className="relative overflow-hidden h-6 group">
          <span className="block group-hover:-translate-y-full transition-transform duration-300">
            Reviews
          </span>
          <span className="block absolute top-full left-0 group-hover:translate-y-[-100%] transition-transform duration-300">
            Reviews
          </span>
        </a>
        <a href="#" className="relative overflow-hidden h-6 group">
          <span className="block group-hover:-translate-y-full transition-transform duration-300">
            Pricing
          </span>
          <span className="block absolute top-full left-0 group-hover:translate-y-[-100%] transition-transform duration-300">
            Pricing
          </span>
        </a>
        <a href="#" className="relative overflow-hidden h-6 group">
          <span className="block group-hover:-translate-y-full transition-transform duration-300">
            Docs
          </span>
          <span className="block absolute top-full left-0 group-hover:translate-y-[-100%] transition-transform duration-300">
            Docs
          </span>
        </a>
      </div>

      {user ? (
        <div className="ml-10">
          <UserButton
            appearance={{
              elements: {
                avatarBox:
                  "h-8 w-8 border border-white rounded-full transition",
              },
            }}
          />
        </div>
      ) : (
        <button
          onClick={openSignIn}
          className="ml-20 max-sm:hidden bg-white relative z-10 hover:shadow-[0px_0px_30px_14px] shadow-[0px_0px_30px_7px] hover:shadow-white/50 shadow-white/50 text-black px-4 py-2 rounded-full text-sm font-medium hover:bg-slate-100 transition duration-300"
        >
          Get Started
        </button>
      )}

      <button id="menuToggle" className="md:hidden text-gray-600">
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
      <div
        id="mobileMenu"
        className="absolute hidden top-48 text-base left-0 bg-black w-full flex-col items-center gap-4"
      >
        <a className="hover:text-indigo-600" href="#">
          Products
        </a>
        <a className="hover:text-indigo-600" href="#">
          Customer Stories
        </a>
        <a className="hover:text-indigo-600" href="#">
          Pricing
        </a>
        <a className="hover:text-indigo-600" href="#">
          Docs
        </a>
        <button className="border border-slate-600 hover:bg-slate-800 px-4 py-2 rounded-full text-sm font-medium transition">
          Contact
        </button>
        <button className="bg-white hover:shadow-[0px_0px_30px_14px] shadow-[0px_0px_30px_7px] hover:shadow-white/50 shadow-white/50 text-black px-4 py-2 rounded-full text-sm font-medium hover:bg-slate-100 transition duration-300">
          Get Started
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
