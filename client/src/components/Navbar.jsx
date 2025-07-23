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
    <nav
      className={`h-[70px] relative w-full px-6 max-sm:pl-2 md:px-16 lg:px-24 xl:px-32 flex items-center justify-between z-20 text-gray-700 shadow-[0px_4px_25px_0px_#0000000D] transition-all ${
        darkMode ? "bg-[#000000]" : "bg-white"
      }`}
    >
      <img
        src={`${darkMode ? "/logo3_dark_crop.png" : "/logo3_light_crop.png"}`}
        className="h-12 sm:h-16 w-auto cursor-pointer"
        onClick={() => navigate("/")}
      />
      <div className="flex justify-center items-center gap-10 max-sm:gap-4">
        <button
          className={`size-8 flex items-center justify-center transition border rounded-md cursor-pointer ${
            darkMode
              ? "bg-gray-800 border-gray-600 hover:bg-gray-700"
              : "bg-white border-gray-300 hover:bg-gray-100"
          }`}
          onClick={toggleTheme}
        >
          <svg
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`${darkMode ? "stroke-white" : "stroke-gray-800"}`}
          >
            <path
              d="M7.5 10.39a2.889 2.889 0 1 0 0-5.779 2.889 2.889 0 0 0 0 5.778M7.5 1v.722m0 11.556V14M1 7.5h.722m11.556 0h.723m-1.904-4.596-.511.51m-8.172 8.171-.51.511m-.001-9.192.51.51m8.173 8.171.51.511"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {user ? (
          <UserButton />
        ) : (
          <button
            type="button"
            onClick={openSignIn}
            className="bg-primary text-white md:inline text-sm hover:bg-[#0369a1] active:scale-95 transition-all w-40 max-sm:w-25 h-11 max-sm:h-8 rounded-full cursor-pointer"
          >
            Get started
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
