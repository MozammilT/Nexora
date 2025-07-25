"use client";
import { useTheme } from "../context/ThemeContext.jsx";
import { motion } from "motion/react";
import { HeroHighlight, Highlight } from "./ui/hero-highlight.jsx";
import { PrimaryButton, SecondaryButton } from "./Button.jsx";

function Hero() {
  const { theme } = useTheme();
  const darkMode = theme === "dark";

  return (
    <HeroHighlight>
      <motion.h1
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: [20, -5, 0],
        }}
        transition={{
          duration: 0.5,
          ease: [0.4, 0.0, 0.2, 1],
        }}
        className={`text-2xl px-4 md:text-4xl lg:text-7xl font-bold text-neutral-700 dark:text-white max-w-4xl leading-relaxed lg:leading-snug text-center mx-auto md:mt-20`}
      >
        Create amazing content <br /> with
        <Highlight
          className={`${darkMode ? "text-white" : "text-black"} ml-2 md:ml-4`}
        >
          AI tools
        </Highlight>
      </motion.h1>
      <p className="text-white mt-4 max-w-xs sm:max-w-sm xl:max-w-2xl m-auto max-sm:text-xs text-xl text-center font-semibold">
        Transform your content creation with our suite of premium AI tools.
        Write articles, generate images, and enhance your workflow.
      </p>
      <div className="flex items-center justify-center mt-6 gap-8">
        <PrimaryButton />
        <SecondaryButton />
      </div>
      <div className="flex items-center justify-center gap-4 mt-8 mx-auto">
        <img src="/user_group.png" className="h-8" />
        <p className="text-white backdrop-blur-xs">Trusted by 10k+ people</p>
      </div>
    </HeroHighlight>
  );
}

export default Hero;
