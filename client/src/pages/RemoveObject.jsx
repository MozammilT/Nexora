import { useState } from "react";
import { FileUpload } from "@/components/ui/file-upload";
import { Scissors, Sparkles, BrushCleaning } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@clerk/clerk-react";
import axios from "axios";
import { toast } from "react-hot-toast";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

function RemoveObject() {
  const { getToken } = useAuth();
  const [loading, setLoading] = useState(null);
  const [files, setFiles] = useState([]);
  const [content, setContent] = useState("");
  const [input, setInput] = useState("");

  const handleFileUpload = (newFiles) => {
    setFiles(newFiles);
    console.log(newFiles);
  };
  const handleChange = (e) => {
    setInput(e.target.value);
  };
  const handleClear = () => {
    setFiles([]);
    setContent("");
    setInput("");
  };

  const formData = new FormData();
  formData.append("image", files[0]);
  formData.append("object", input);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (files.length === 0 || input === "") {
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
      const { data } = await axios.post(
        "/ai/remove-object",
        formData,
        { headers: { Authorization: `Bearer ${await getToken()}` } }
        // { object: input }
      );
      data.success && setContent(data.content);
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
          <Sparkles className="size-6 text-[#6769f2]" />
          <h1 className="text-xl font-semibold tracking-tighter text-balance">
            Object Removal
          </h1>
        </div>
        <p className="mt-8 mb-4 text-base">Upload image</p>

        <div className="w-full max-w-4xl mx-auto min-h-60 border border-dashed bg-black border-neutral-800 rounded-lg">
          <FileUpload
            files={files}
            onChange={handleFileUpload}
            message={"Supports JPG, PNG, and other image formats"}
          />
        </div>
        <p className="mt-8 mb-4 text-base">Describe object to remove</p>
        <Textarea
          value={input}
          onChange={handleChange}
          placeholder="e.g., watch or spoon , Only single object name."
        />

        <div
          onClick={onSubmit}
          className="flex gap-3 mt-10 items-center justify-center bg-gradient-to-r from-[#417DF6] to-[#8E37EB] text-white text-sm rounded-lg cursor-pointer px-4 py-2"
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin cursor-pointer" />
          ) : (
            <Scissors className="size-5" />
          )}
          <button>Remove Object</button>
        </div>
      </form>

      {/* Right Col  */}
      <div className="w-full max-w-lg p-4 bg-[#262626] rounded-lg flex flex-col shadow-[0_4px_20px_rgba(80,68,229,0.3)] min-h-[583px] max-h-[650px]">
        <div className="flex gap-5">
          <Scissors className="size-6 text-[#6769f2]" />
          <h1 className="text-xl font-semibold tracking-tighter text-balance">
            Processed Image
          </h1>
        </div>
        {content ? (
          <div className="mt-3 flex-1 overflow-y-auto flex justify-center items-center">
            <img src={content} className="rounded-lg max-h-full object-contain" />
          </div>
        ) : (
          <div className="flex-1 flex justify-center items-center">
            <div className="items-center">
              <Scissors className="size-10 mx-auto mb-4" />
              <p className="text-sm font-light text-balance">
                Enter a topic and click "Remove Object” to get started
              </p>
            </div>
          </div>
        )}
        {(files.length > 0 || content !== "") && (
          <button
            onClick={handleClear}
            disabled={loading}
            className="w-full flex gap-3 mt-10 items-center justify-center bg-gradient-to-r from-[#417DF6] to-[#8E37EB] text-white text-sm rounded-lg px-4 py-2 cursor-pointer"
          >
            <BrushCleaning className="size-5" />
            Start Over
          </button>
        )}
      </div>
    </div>
  );
}

export default RemoveObject;
