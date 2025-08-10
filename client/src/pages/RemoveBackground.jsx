import { useState } from "react";
import { Eraser, Sparkles, BrushCleaning, Download } from "lucide-react";
import { FileUpload } from "@/components/ui/file-upload";
import { useAuth } from "@clerk/clerk-react";
import axios from "axios";
import { toast } from "react-hot-toast";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

function RemoveBackground() {
  const { getToken } = useAuth();
  const [loading, setLoading] = useState(null);
  const [files, setFiles] = useState([]);
  const [content, setContent] = useState("");

  const handleFileUpload = (newFiles) => {
    setFiles(newFiles);
    console.log(newFiles);
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

  const formData = new FormData();
  formData.append("image", files[0]);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!files.length) {
      toast.error("Image is required", {
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
      const { data } = await axios.post("/ai/remove-background", formData, {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      });
      data.success
        ? setContent(data.content)
        : toast.error(data.message, {
            position: "top-center",
            style: {
              borderRadius: "50px",
              background: "#3b3b3b",
              color: "#fff",
            },
          });
      console.log("submitted");
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

  const handleClear = () => {
    setFiles([]);
    setContent("");
  };

  return (
    <div className="h-full overflow-y-scroll p-6 flex items-start flex-wrap gap-5 text-neutral-200 md:mt-6">
      {/* Left Col */}
      <form className="bg-[#262626] w-full max-w-lg p-4 rounded-lg shadow-[0_4px_20px_rgba(80,68,229,0.3)]">
        <div className="flex gap-5">
          <Sparkles className="size-6 text-orange-600" />
          <h1 className="text-xl font-semibold tracking-tighter text-balance">
            Background Removal
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
        <button
          type="submit"
          onClick={onSubmit}
          disabled={loading}
          className={`w-full flex gap-3 mt-10 items-center justify-center bg-gradient-to-r from-[#F6AB41] to-[#FF4938] text-white text-sm rounded-lg px-4 py-2 ${
            loading ? "cursor-not-allowed" : "cursor-pointer"
          }`}
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <Eraser className="size-5" />
          )}
          Remove Background
        </button>
      </form>

      {/* Right Col  */}
      <div className="w-full max-w-lg p-4 bg-[#262626] rounded-lg flex flex-col shadow-[0_4px_20px_rgba(80,68,229,0.3)] min-h-[446px] max-h-[650px]">
        <div className="flex gap-5">
          <Eraser className="size-6 text-orange-600" />
          <h1 className="text-xl font-semibold tracking-tighter text-balance">
            Processed Image
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
              <Eraser className="size-10 mx-auto mb-4" />
              <p className="text-sm font-light text-balance">
                Enter a topic and click "Remove Background” to get started
              </p>
            </div>
          </div>
        )}
        <div className="flex gap-3">
          {(files.length > 0 || content !== "") && (
            <button
              onClick={handleClear}
              disabled={loading}
              className="w-full flex gap-3 mt-10 items-center justify-center bg-gradient-to-r from-[#F6AB41] to-[#FF4938] text-white text-sm rounded-lg px-4 py-2 cursor-pointer"
            >
              <BrushCleaning className="size-5" />
              Start Over
            </button>
          )}
          {content !== "" && (
            <button
              onClick={handleDownload}
              disabled={loading}
              className="w-full flex gap-3 mt-10 items-center justify-center bg-gradient-to-r from-[#F6AB41] to-[#FF4938] text-white text-sm rounded-lg px-4 py-2 cursor-pointer"
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

export default RemoveBackground;
