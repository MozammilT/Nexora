import { useState, useEffect } from "react";
import {
  Sparkles,
  Image,
  ImageIcon,
  BrushCleaning,
  Download,
} from "lucide-react";
import { useAuth } from "@clerk/clerk-react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { motion, transform, useAnimate } from "motion/react";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

function GenerateImages() {
  const category = [
    "Realistic",
    "Ghibli",
    "Anime",
    "Cartoon",
    "Fantasy",
    "Cyberpunk",
    "3D style",
    "Portrait",
  ];
  const { getToken } = useAuth();
  const [style, setStyle] = useState(null);
  const [publish, setPublish] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");
  const maxLength = 100;
  const charactersRemaining = maxLength - input.replace(/\s+/g, "").length;
  const [counterRef, animate] = useAnimate();
  const mapRemainingToColor = transform([2, 6], ["#ff008c", "#ccc"]);

  const handleChange = (e) => {
    setInput(e.target.value);
  };
  const handleClear = () => {
    setContent("");
    setInput("");
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (input === "") {
      toast.error("Description is required", {
        position: "top-center",
        style: {
          borderRadius: "10px",
          background: "#3b3b3b",
          color: "#fff",
        },
      });
      return;
    } else if (input.length > maxLength) {
      toast.error("Description exceeds allowed length", {
        position: "top-center",
        style: {
          borderRadius: "10px",
          background: "#3b3b3b",
          color: "#fff",
        },
      });
      return;
    }
    try {
      setLoading(true);
      const { data } = await axios.post(
        "/ai/generate-image",
        {
          prompt: input,
          publish,
          style,
        },
        { headers: { Authorization: `Bearer ${await getToken()}` } }
      );
      data.success && setContent(data.content);
    } catch (err) {
      toast.error(err.message, {
        position: "top-center",
        style: {
          borderRadius: "10px",
          background: "#3b3b3b",
          color: "#fff",
        },
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    if (!content) return;

    try {
      const response = await fetch(content);
      const blob = await response.blob();

      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `generated-image${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      toast.success("Image downloaded successfully!", {
        position: "top-center",
        style: {
          borderRadius: "10px",
          background: "#3b3b3b",
          color: "#fff",
        },
      });
    } catch (err) {
      console.error("Download failed:", err);
      toast.error("Failed to download image", {
        position: "top-center",
        style: {
          borderRadius: "10px",
          background: "#3b3b3b",
          color: "#fff",
        },
      });
    }
  };

  useEffect(() => {
    if (charactersRemaining > 6) return;

    const mapRemainingToSpringVelocity = transform([0, 5], [50, 0]);

    animate(
      counterRef.current,
      { scale: 1 },
      {
        type: "spring",
        velocity: mapRemainingToSpringVelocity(charactersRemaining),
        stiffness: 700,
        damping: 80,
      }
    );
  }, [animate, charactersRemaining]);

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
        <div className="relative leading-none">
          <textarea
            value={input}
            onChange={handleChange}
            placeholder="Describe what you want to see in the image."
            className="bg-[#0b1011] text-[#f5f5f5] border-2 border-[#1d2628] rounded-lg px-4 py-[15px] pb-[40px] w-[480px] max-sm:w-full max-sm:max-w-[350px] h-[120px] resize-none focus:border-[var(--hue-blue)] focus:outline-none"
          />
          <div className="absolute bottom-[15px] right-[15px] max-sm:right-[25px] text-[#ccc] text-lg pointer-events-none">
            <motion.span
              ref={counterRef}
              style={{
                color: mapRemainingToColor(charactersRemaining),
                willChange: "transform",
              }}
              className="block"
            >
              {charactersRemaining}
            </motion.span>
          </div>
        </div>
        <p className="my-4 text-base">Style</p>
        <div className="grid grid-cols-4 gap-3">
          {category.map((item, idx) => (
            <span
              onClick={() => setStyle(item)}
              key={idx}
              className={`text-xs text-center px-4 py-2 rounded-full cursor-pointer transition-colors duration-200
        ${
          style === item
            ? "bg-green-500/80 text-white border border-green-400"
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
              onChange={(e) => setPublish(e.target.checked)}
            />
            <div className="w-9 h-5 bg-zinc-600 rounded-full peer-checked:bg-green-600 transition" />
            <span className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition peer-checked:translate-x-4"></span>
          </label>
          <p className="text-balance text-sm">Make this image public</p>
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
      <div className="w-full max-w-lg p-4 bg-[#262626] rounded-lg flex flex-col justify-between shadow-[0_4px_20px_rgba(80,68,229,0.3)] min-h-[508px] max-h-[650px] max-sm:mb-10">
        <div className="flex gap-5">
          <Image className="size-5 text-[#0e952b]" />
          <h1 className="text-xl font-semibold tracking-tight text-balance">
            Generated Image
          </h1>
        </div>
        {content ? (
          <div className="mt-3 flex-1 overflow-y-auto flex justify-center items-center">
            <img
              src={content}
              className="rounded-lg max-h-full object-contain"
            />
          </div>
        ) : (
          <div className="flex-1 flex justify-center items-center">
            <div className="items-center">
              <Image className="size-10 mx-auto mb-4" />
              <p className="text-xs md:text-sm font-light text-balance">
                Enter a topic and click "Generate Image” to get started
              </p>
            </div>
          </div>
        )}
        <div className="flex gap-3">
          {input !== "" && (
            <button
              onClick={handleClear}
              disabled={loading}
              className="w-full flex gap-3 mt-10 items-center justify-center bg-gradient-to-r from-[#00AD25] to-[#04d743] text-white text-sm rounded-lg px-4 py-2 cursor-pointer"
            >
              <BrushCleaning className="size-5" />
              Start Over
            </button>
          )}
          {content !== "" && (
            <button
              onClick={handleDownload}
              disabled={loading}
              className="w-full flex gap-3 mt-10 items-center justify-center bg-gradient-to-r from-[#00AD25] to-[#04d743] text-white text-sm rounded-lg px-4 py-2 cursor-pointer"
            >
              <Download className="size-5" />
              Download
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default GenerateImages;
