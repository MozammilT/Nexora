"use client";
import { Sparkles, SquarePen, BrushCleaning } from "lucide-react";
import { useState } from "react";
import { PlaceholdersAndVanishInput } from "../components/ui/placeholders-and-vanish-input.jsx";
import { useAuth } from "@clerk/clerk-react";
import axios from "axios";
import { toast } from "react-hot-toast";
import Markdown from "react-markdown";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

function WriteArticle() {
  const articleLength = [
    { length: 800, text: "Short (500-800 words)" },
    { length: 1200, text: "Medium (800-1200 words)" },
    { length: 1600, text: "Long (1200+ words)" },
  ];
  const placeholders = [
    "What's the first rule of Fight Club?",
    "How chemistry became the coolest subject ever?",
    "Write a Javascript method to reverse a string",
    "How to assemble your own PC?",
    "The psychology of identity in Fight Club",
  ];

  const { getToken } = useAuth();
  const [selected, setSelected] = useState(articleLength[0]);
  const [content, setContent] = useState("");
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setInput(e.target.value);
  };
  const handleClear = () => {
    setContent("");
    setInput("");
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (input === "") {
      toast.error("Article topic is required", {
        position: "top-center",
        style: {
          borderRadius: "50px",
          background: "#3b3b3b",
          color: "#fff",
        },
      });
      return;
    }
    try {
      setLoading(true);
      const prompt = `Write an article about ${input} in ${selected.length} words`;
      const { data } = await axios.post(
        "/ai/generate-article",
        {
          prompt,
          length: selected.length,
        },
        { headers: { Authorization: `Bearer ${await getToken()}` } }
      );

      if (data.success) {
        setContent(data.content);
      } else {
        toast.error(data.message, {
          position: "top-center",
          style: {
            borderRadius: "50px",
            background: "#3b3b3b",
            color: "#fff",
          },
        });
      }
    } catch (err) {
      toast.error(err.message, {
        position: "top-center",
        style: {
          borderRadius: "50px",
          background: "#3b3b3b",
          color: "#fff",
        },
      });
      console.log("Error in WriteArticle page: ", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full overflow-y-scroll p-6 flex items-start flex-wrap gap-5 text-neutral-200 md:mt-6">
      {/* Left Col */}
      <form className="bg-[#262626] w-full max-w-lg p-4 rounded-lg shadow-[0_4px_20px_rgba(80,68,229,0.3)]">
        <div className="flex gap-5">
          <Sparkles className="text-blue-400 size-6" />
          <h1 className="text-xl font-semibold tracking-tighter text-balance">
            Article Configuration
          </h1>
        </div>
        <p className="mt-8 mb-4 text-base">Article Topic</p>
        <PlaceholdersAndVanishInput
          value={input}
          onChange={handleChange}
          placeholders={placeholders}
        />
        <p className="mt-8 mb-4 text-base">Article Length</p>
        <div className="flex flex-wrap gap-4 text-neutral-300">
          {articleLength.map((item, idx) => (
            <div onClick={() => setSelected(item)} key={idx}>
              <div
                className={`border rounded-full w-fit font-light cursor-pointer transition-colors duration-200 ${
                  selected.length === item.length
                    ? "border-[#226BFF] bg-[#226BFF] text-white"
                    : "border-[#5a8aff] bg-[#5a8aff]/10 text-[#b2ccff] hover:bg-[#226BFF]/20"
                }`}
              >
                <p className="px-3 py-1.5 text-xs">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
        <button
          type="submit"
          onClick={submitHandler}
          disabled={loading}
          className={`w-full flex gap-3 mt-10 items-center justify-center bg-gradient-to-r from-[#226BFF] to-[#65ADFF] text-white text-sm rounded-lg px-4 py-2 ${
            loading ? "cursor-not-allowed" : "cursor-pointer"
          }`}
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <SquarePen className="size-5" />
          )}
          Generate Article
        </button>
      </form>

      {/* Right Col  */}
      <div className="w-full max-w-lg p-4 bg-[#262626] rounded-lg flex flex-col shadow-[0_4px_20px_rgba(80,68,229,0.3)] min-h-[357px] max-h-[600px]">
        <div className="flex gap-5">
          <SquarePen className="text-[#2e79ff]" />
          <h1 className="text-xl font-semibold tracking-tighter text-balance">
            Generated Article
          </h1>
        </div>
        {content ? (
          <div className="mt-3 h-full overflow-y-scroll text-sm text-zinc-200">
            <div className="reset-tw">
              <Markdown>{content}</Markdown>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex justify-center items-center">
            <div className="items-center">
              <SquarePen className="size-10 mx-auto mb-4" />
              <p className="text-sm font-light text-balance">
                Enter a topic and click “Generate article ” to get started
              </p>
            </div>
          </div>
        )}
        {(input !== "" || content !== "") && (
          <button
            onClick={handleClear}
            disabled={loading}
            className="w-full flex gap-3 mt-10 items-center justify-center bg-gradient-to-r from-[#226BFF] to-[#65ADFF] text-white text-sm rounded-lg px-4 py-2 cursor-pointer"
          >
            <BrushCleaning className="size-5" />
            Start Over
          </button>
        )}
      </div>
    </div>
  );
}

export default WriteArticle;
