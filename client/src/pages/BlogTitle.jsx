"use client";
import { Hash, Sparkles, BrushCleaning } from "lucide-react";
import { PlaceholdersAndVanishInput } from "../components/ui/placeholders-and-vanish-input.jsx";
import { useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import axios from "axios";
import { toast } from "react-hot-toast";
import Markdown from "react-markdown";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

function BlogTitle() {
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

  const { getToken } = useAuth();
  const [loading, setLoading] = useState(false);
  const [selected, setSetected] = useState(null);
  const [input, setInput] = useState("");
  const [content, setContent] = useState("");

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
      toast.error("Title is required", {
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
      const prompt = `Generate a blog title for the keyword ${input} in the category ${selected}`;
      const { data } = await axios.post(
        "/ai/generate-title",
        { prompt },
        { headers: { Authorization: `Bearer ${await getToken()}` } }
      );
      if (data.success) {
        setContent(data.content);
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full overflow-y-scroll p-6 flex items-start flex-wrap gap-5 text-neutral-200 md:mt-6">
      {/* Left Col */}
      <form className="bg-[#262626] w-full max-w-lg p-4 rounded-lg shadow-[0_4px_20px_rgba(80,68,229,0.3)]">
        <div className="flex gap-5">
          <Sparkles className="size-6 text-[#8E37EB]" />
          <h1 className="text-xl font-semibold tracking-tighter text-balance">
            Title Generation
          </h1>
        </div>
        <p className="mt-8 mb-4 text-base">Keyword</p>
        <PlaceholdersAndVanishInput
          value={input}
          placeholders={placeholders}
          onChange={handleChange}
        />
        <p className="mt-8 mb-4 text-base">Category</p>
        <div className="grid grid-cols-4 gap-3">
          {category.map((item, idx) => (
            <span
              onClick={() => setSetected(item)}
              key={idx}
              className={`text-xs text-center px-4 py-2 rounded-full cursor-pointer transition-colors duration-200
        ${
          selected === item
            ? "bg-purple-500/80 text-white border border-purple-400"
            : "bg-purple-800/20 text-purple-200 border border-purple-700 hover:bg-purple-700/30"
        }`}
            >
              {item}
            </span>
          ))}
        </div>
        <button
          type="submit"
          onClick={submitHandler}
          disabled={loading}
          className={`w-full flex gap-3 mt-10 items-center justify-center bg-gradient-to-r from-[#C341F6] to-[#8E37EB] text-white text-sm rounded-lg px-4 py-2 ${
            loading ? "cursor-not-allowed" : "cursor-pointer"
          }`}
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <Hash className="size-5" />
          )}
          Generate Title
        </button>
      </form>

      {/* Right Col  */}
      <div className="w-full max-w-lg p-4 bg-[#262626] rounded-lg flex flex-col shadow-[0_4px_20px_rgba(80,68,229,0.3)] min-h-[405px] max-h-[600px]">
        <div className="flex gap-5">
          <Hash className="size-5 text-[#8E37EB]" />
          <h1 className="text-xl font-semibold tracking-tighter text-balance">
            Generated Title
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
              <Hash className="size-10 mx-auto mb-4" />
              <p className="text-sm font-light text-balance">
                Enter a topic and click "Generate Title” to get started
              </p>
            </div>
          </div>
        )}
        {(input !== "" || content !== "") && (
          <button
            onClick={handleClear}
            className="w-full flex gap-3 mt-10 items-center justify-center bg-gradient-to-r from-[#C341F6] to-[#8E37EB] text-white text-sm rounded-lg px-4 py-2 cursor-pointer"
          >
            <BrushCleaning className="size-5" />
            Start Over
          </button>
        )}
      </div>
    </div>
  );
}

export default BlogTitle;
