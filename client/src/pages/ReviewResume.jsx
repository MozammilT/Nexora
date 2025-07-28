import { useState } from "react";
import { FileText, Sparkles } from "lucide-react";
import { FileUpload } from "@/components/ui/file-upload";

function ReviewResume() {
  const [loading, setLoading] = useState(null);
  const [files, setFiles] = useState([]);

  const handleFileUpload = () => {
    setFiles(files);
    console.log(files);
  };

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
          <Sparkles className="size-6 text-[#00DA83]" />
          <h1 className="text-xl font-semibold tracking-tighter text-balance">
            Resume Review
          </h1>
        </div>
        <p className="mt-8 mb-4 text-base">Upload Resume</p>

        <div className="w-full max-w-4xl mx-auto min-h-60 border border-dashed bg-black border-neutral-800 rounded-lg">
          <FileUpload
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
        <div className="flex-1 flex justify-center items-center">
          <div className="items-center">
            <FileText className="size-10 mx-auto mb-4" />
            <p className="text-sm font-light text-balance">
              Enter a topic and click "Review Resume” to get started
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReviewResume;
