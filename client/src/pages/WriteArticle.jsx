"use client";
import { Sparkles, SquarePen, PencilLine } from "lucide-react";
import { useState } from "react";
import { PlaceholdersAndVanishInput } from "../components/ui/placeholders-and-vanish-input.jsx";

function WriteArticle() {
  const [selected, setSetected] = useState(null);
  const placeholders = [
    "What's the first rule of Fight Club?",
    "How chemistry became the coolest subject ever?",
    "Write a Javascript method to reverse a string",
    "How to assemble your own PC?",
    "The psychology of identity in Fight Club",
  ];
  const articleLength = [
    { length: 800, text: "Short (500-800 words)" },
    { length: 1200, text: "Medium (800-1200 words)" },
    { length: 1600, text: "Long (1200+ words)" },
  ];
  const handleChange = (e) => {
    console.log(e.target.value);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    console.log("submitted");
  };

  return (
    <div className="h-full overflow-y-scroll p-6 flex items-start flex-wrap gap-5 text-neutral-200 md:mt-6">
      {/* Left Col */}
      <form className="bg-[#262626] w-full max-w-lg p-4 rounded-lg border border-[#5d5d5d] shadow-[0_4px_20px_rgba(80,68,229,0.3)]">
        <div className="flex gap-5">
          <Sparkles className="text-blue-400 size-6" />
          <h1 className="text-xl font-semibold tracking-tighter text-balance">
            Article Configuration
          </h1>
        </div>
        <p className="mt-8 mb-4 text-base">Article Topic</p>
        <PlaceholdersAndVanishInput
          placeholders={placeholders}
          onChange={handleChange}
          onSubmit={onSubmit}
        />
        <p className="mt-8 mb-4 text-base">Article Length</p>
        <div className="flex flex-wrap gap-4 text-neutral-300">
          {articleLength.map((item, idx) => (
            <div onClick={() => setSetected(idx)} key={idx}>
              <div
                className={`border rounded-full w-fit font-light cursor-pointer transition-colors duration-200 ${
                  selected === idx
                    ? "border-[#226BFF] bg-[#226BFF]/50 text-white"
                    : "border-[#5a8aff] bg-[#5a8aff]/10 text-[#b2ccff] hover:bg-[#226BFF]/20"
                }`}
              >
                <p className="px-3 py-1.5 text-xs">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex gap-3 mt-10 items-center justify-center bg-gradient-to-r from-[#226BFF] to-[#65ADFF] text-white text-sm rounded-lg cursor-pointer px-4 py-2">
          <SquarePen className="size-5" />
          <button>Generate Article</button>
        </div>
      </form>

      {/* Right Col  */}
      <div className="w-full max-w-lg p-4 bg-[#262626] rounded-lg flex flex-col border border-[#5d5d5d] shadow-[0_4px_20px_rgba(80,68,229,0.3)] min-h-[360px] max-h-[600px]">
        <div className="flex gap-5">
          <SquarePen className="text-[#2e79ff]" />
          <h1 className="text-xl font-semibold tracking-tighter text-balance">
            Generated Article
          </h1>
        </div>
        <div className="flex-1 flex justify-center items-center">
          <div className="items-center">
            <PencilLine className="size-10 mx-auto mb-4" />
            <p className="text-sm font-light text-balance">
              Enter a topic and click “Generate article ” to get started
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WriteArticle;
