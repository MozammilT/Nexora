"use client";
import { Hash, Sparkles } from "lucide-react";
import { PlaceholdersAndVanishInput } from "../components/ui/placeholders-and-vanish-input.jsx";
import { useState } from "react";

function BlogTitle() {
  const [selected, setSetected] = useState(null);
  const placeholders = [
    "What's the first rule of Fight Club?",
    "How chemistry became the coolest subject ever?",
    "Write a Javascript method to reverse a string",
    "How to assemble your own PC?",
    "The psychology of identity in Fight Club",
  ];
  const category = [
    "General",
    "Technology",
    "Business",
    "Health",
    "Lifestyle",
    "Education",
    "Travel",
    "Food",
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
      <form className="bg-[#262626] w-full max-w-lg p-4 rounded-lg shadow-[0_4px_20px_rgba(80,68,229,0.3)]">
        <div className="flex gap-5">
          <Sparkles className="size-6 text-[#8E37EB]" />
          <h1 className="text-xl font-semibold tracking-tighter text-balance">
            AI Title Generation
          </h1>
        </div>
        <p className="mt-8 mb-4 text-base">Keyword</p>
        <PlaceholdersAndVanishInput
          placeholders={placeholders}
          onChange={handleChange}
          onSubmit={onSubmit}
        />
        <p className="mt-8 mb-4 text-base">Category</p>
        <div className="grid grid-cols-4 gap-3">
          {category.map((item, idx) => (
            <span
              onClick={() => setSetected(idx)}
              key={idx}
              className={`text-xs text-center px-4 py-2 rounded-full cursor-pointer transition-colors duration-200
        ${
          selected === idx
            ? "bg-purple-500 text-white border border-purple-400"
            : "bg-purple-800/20 text-purple-200 border border-purple-700 hover:bg-purple-700/30"
        }`}
            >
              {item}
            </span>
          ))}
        </div>
        <div className="flex gap-3 mt-10 items-center justify-center bg-gradient-to-r from-[#C341F6] to-[#8E37EB] text-white text-sm rounded-lg cursor-pointer px-4 py-2">
          <Hash className="size-5" />
          <button>Generate Title</button>
        </div>
      </form>

      {/* Right Col  */}
      <div className="w-full max-w-lg p-4 bg-[#262626] rounded-lg flex flex-col shadow-[0_4px_20px_rgba(80,68,229,0.3)] min-h-[405px] max-h-[600px]">
        <div className="flex gap-5">
          <Hash className="size-5 text-[#8E37EB]" />
          <h1 className="text-xl font-semibold tracking-tighter text-balance">
            Generated Title
          </h1>
        </div>
        <div className="flex-1 flex justify-center items-center">
          <div className="items-center">
            <Hash className="size-10 mx-auto mb-4" />
            <p className="text-sm font-light text-balance">
              Enter a topic and click "Generate Title” to get started
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogTitle;
