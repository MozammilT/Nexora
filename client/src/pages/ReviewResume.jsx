import { useState } from "react";
import { FileText, Sparkles, BrushCleaning } from "lucide-react";
import { FileUpload } from "@/components/ui/file-upload";
import { useAuth } from "@clerk/clerk-react";
import axios from "axios";
import { toast } from "react-hot-toast";
import Markdown from "react-markdown";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

function ReviewResume() {
  const { getToken } = useAuth();
  const [loading, setLoading] = useState(null);
  const [files, setFiles] = useState([]);
  const [content, setContent] = useState("");

  const handleFileUpload = (newFiles) => {
    setFiles(newFiles);
    console.log(newFiles);
  };
  const handleClear = () => {
    setFiles([]);
    setContent("");
  };

  const formData = new FormData();
  formData.append("resume", files[0]);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (files.length === 0) {
      toast.error("Documnent is required", {
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
      const { data } = await axios.post("/ai/resume-review", formData, {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
          "Content-Type": "multipart/form-data",
        },
      });
      data.success
        ? setContent(data.content)
        : toast.error("Error reviewing this resume", {
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

  return (
    <div className="h-full overflow-y-scroll p-6 flex items-start flex-wrap gap-5 text-neutral-200 md:mt-6">
      {/* Left Col */}
      <form className="bg-[#262626] w-full max-w-lg p-4 rounded-lg shadow-[0_4px_20px_rgba(80,68,229,0.3)]">
        <div className="flex gap-5">
          <Sparkles className="size-6 text-[#00DA83]" />
          <h1 className="text-xl font-semibold tracking-tighter text-balance">
            Resume Review
          </h1>
        </div>
        <p className="mt-8 mb-4 text-base">Upload Resume</p>

        <div className="w-full max-w-4xl mx-auto min-h-60 border border-dashed bg-black border-neutral-800 rounded-lg">
          <FileUpload
            files={files}
            onChange={handleFileUpload}
            accept="application/pdf"
            message={"Supports PDF resume only."}
          />
        </div>

        <div
          onClick={onSubmit}
          className="flex gap-3 mt-10 items-center justify-center bg-gradient-to-r from-[#00DA83] to-[#009BB3] text-white text-sm rounded-lg cursor-pointer px-4 py-2"
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin cursor-pointer" />
          ) : (
            <FileText className="size-5" />
          )}
          <button>Review Resume</button>
        </div>
      </form>

      {/* Right Col  */}
      <div className="w-full max-w-lg p-4 bg-[#262626] rounded-lg flex flex-col shadow-[0_4px_20px_rgba(80,68,229,0.3)] min-h-[446px] max-h-[600px]">
        <div className="flex gap-5">
          <FileText className="size-6 text-[#00DA83]" />
          <h1 className="text-xl font-semibold tracking-tighter text-balance">
            Analysis Results
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
              <FileText className="size-10 mx-auto mb-4" />
              <p className="text-xs md:text-sm font-light text-balance">
                Enter a topic and click "Review Resume” to get started
              </p>
            </div>
          </div>
        )}
        {(files.length > 0 || content !== "") && (
          <button
            onClick={handleClear}
            disabled={loading}
            className="w-full flex gap-3 mt-10 items-center justify-center bg-gradient-to-r from-[#00DA83] to-[#009BB3] text-white text-sm rounded-lg px-4 py-2 cursor-pointer"
          >
            Start Over
          </button>
        )}
      </div>
    </div>
  );
}

export default ReviewResume;
