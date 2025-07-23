import { useTheme } from "../context/ThemeContext.jsx";

function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const darkMode = theme === "dark";

  return (
    <nav
      class={`h-[70px] relative w-full px-6 md:px-16 lg:px-24 xl:px-32 flex items-center justify-between z-20 text-gray-700 shadow-[0px_4px_25px_0px_#0000000D] transition-all ${
        darkMode ? "bg-[#121212]" : "bg-white"
      }`}
    >
      <a href="https://prebuiltui.com" class="text-indigo-600">
        <img src="/logo3_light_crop.png" className="h-18 w-50" />
      </a>
      <div className="flex justify-center items-center gap-10">
        <button
          class="size-8 flex items-center justify-center hover:bg-gray-100 transition border border-slate-300 rounded-md"
          onClick={toggleTheme}
        >
          <svg
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.5 10.39a2.889 2.889 0 1 0 0-5.779 2.889 2.889 0 0 0 0 5.778M7.5 1v.722m0 11.556V14M1 7.5h.722m11.556 0h.723m-1.904-4.596-.511.51m-8.172 8.171-.51.511m-.001-9.192.51.51m8.173 8.171.51.511"
              stroke="#353535"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
        <button
          type="button"
          class="bg-primary text-white border md:inline hidden text-sm hover:bg-[#0369a1] active:scale-95 transition-all w-40 h-11 rounded-full"
        >
          Get started
        </button>
      </div>

      <button
        aria-label="menu-btn"
        type="button"
        class="menu-btn inline-block md:hidden active:scale-90 transition"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          viewBox="0 0 30 30"
          fill="#000"
        >
          <path d="M 3 7 A 1.0001 1.0001 0 1 0 3 9 L 27 9 A 1.0001 1.0001 0 1 0 27 7 L 3 7 z M 3 14 A 1.0001 1.0001 0 1 0 3 16 L 27 16 A 1.0001 1.0001 0 1 0 27 14 L 3 14 z M 3 21 A 1.0001 1.0001 0 1 0 3 23 L 27 23 A 1.0001 1.0001 0 1 0 27 21 L 3 21 z"></path>
        </svg>
      </button>

      <div class="mobile-menu absolute top-[70px] left-0 w-full bg-white p-6 hidden md:hidden">
        <button
          type="button"
          class="bg-primary text-gray-600 border border-gray-300 mt-6 text-sm hover:bg-gray-50 active:scale-95 transition-all w-40 h-11 rounded-full"
        >
          Get started
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
