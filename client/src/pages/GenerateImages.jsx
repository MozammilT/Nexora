import { useState } from "react";
import { Sparkles, Image, ImageIcon } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

function GenerateImages() {
  const [selected, setSetected] = useState(null);
  const [publish, setPublish] = useState("");
  const [loading, setLoading] = useState(null);
  const category = [
    "Realistic",
    "Ghibli",
    "Anime",
    "Cartoon",
    "Fantasy",
    "Realistic",
    "3D style",
    "Portrait",
  ];
  const onSubmit = (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      console.log("submitted");
    } catch (err) {
    } finally {
      setLoading(true);
    }
  };

  return (
    <div className="h-full overflow-y-scroll p-6 flex items-start flex-wrap gap-5 text-neutral-200 md:mt-6">
      {/* Left Col */}
      <form className="bg-[#262626] w-full max-w-lg p-4 rounded-lg shadow-[0_4px_20px_rgba(80,68,229,0.3)]">
        <div className="flex gap-5">
          <Sparkles className="size-6 text-[#0e952b]" />
          <h1 className="text-xl font-semibold tracking-tight text-balance">
            AI Image Generation
          </h1>
        </div>
        <p className="mt-8 mb-4 text-base">Describe Your Image</p>
        <Textarea placeholder="Describe what you want to see in the image." />

        <p className="mt-8 mb-4 text-base">Style</p>
        <div className="grid grid-cols-4 gap-3">
          {category.map((item, idx) => (
            <span
              onClick={() => setSetected(idx)}
              key={idx}
              className={`text-xs text-center px-4 py-2 rounded-full cursor-pointer transition-colors duration-200
        ${
          selected === idx
            ? "bg-green-500 text-white border border-green-400"
            : "bg-green-800/20 text-purple-200 border border-green-700 hover:bg-green-700/30"
        }`}
            >
              {item}
            </span>
          ))}
        </div>
        <div className="my-6 flex items-center gap-2">
          <label className="relative cursor-pointer">
            <input
              type="checkbox"
              checked={publish}
              className="sr-only peer"
              onClick={(e) => setPublish(e.target.value)}
            />
            <div className="w-9 h-5 bg-zinc-600 rounded-full peer-checked:bg-green-600 transition" />
            <span className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition peer-checked:translate-x-4"></span>
          </label>
          <p className="text-balance text-sm">Make this image Public</p>
        </div>
        <div
          onClick={onSubmit}
          className="flex gap-3 mt-10 items-center justify-center bg-gradient-to-r from-[#00AD25] to-[#04d743] text-white text-sm rounded-lg cursor-pointer px-4 py-2"
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin cursor-pointer" />
          ) : (
            <ImageIcon className="size-5" />
          )}
          <button className="cursor-pointer">Generate Image</button>
        </div>
      </form>

      {/* Right Col  */}
      <div className="w-full max-w-lg p-4 bg-[#262626] rounded-lg flex flex-col shadow-[0_4px_20px_rgba(80,68,229,0.3)] min-h-[467px] max-h-[600px]">
        <div className="flex gap-5">
          <Image className="size-5 text-[#0e952b]" />
          <h1 className="text-xl font-semibold tracking-tight text-balance">
            Generated Image
          </h1>
        </div>
        <div className="flex-1 flex justify-center items-center">
          <div className="items-center">
            <Image className="size-10 mx-auto mb-4" />
            <p className="text-sm font-light text-balance">
              Enter a topic and click "Generate Image” to get started
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GenerateImages;
