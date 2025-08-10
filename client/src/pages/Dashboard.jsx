import { useState, useEffect, useMemo } from "react";
import { useOutletContext } from "react-router-dom";
import { Gem, Sparkles } from "lucide-react";
import { Protect } from "@clerk/clerk-react";
import Markdown from "react-markdown";
import { useAuth } from "@clerk/clerk-react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Loader } from "@/components/ui/loader";
import { animate, motion, useMotionValue, useTransform } from "motion/react";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

function Dashboard() {
  const { getToken } = useAuth();
  const [expanded, setExpanded] = useState(null);
  const [loading, setLoading] = useState(false);
  const { creations, setCreations, blogCount, setBlogCount } =
    useOutletContext();

  const count = useMotionValue(0);
  const rounded = useTransform(() => Math.round(count.get()));

  const getDashboardData = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get("/user/user-creation", {
        headers: { Authorization: `Bearer ${await getToken()}` },
      });
      if (data.success) {
        setCreations(data.result);
        setBlogCount(data.result.length);
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
    } finally {
      setLoading(false);
    }
  };

  const toggleExpanded = (id) => {
    setExpanded((prev) => (prev === id ? null : id));
  };

  useEffect(() => {
    if (creations.length === 0) getDashboardData();
  }, []);

  useEffect(() => {
    if (blogCount > 0) {
      const controls = animate(count, blogCount, { duration: 3 });
      return () => controls.stop();
    }
  }, [blogCount]);

  return (
    <div className="h-full overflow-y-scroll p-6">
      {loading ? (
        <div className="flex justify-center items-center min-h-[80vh]">
          <Loader text="Loading..." />
        </div>
      ) : (
        <>
          <div className="flex justify-start gap-5 flex-wrap">
            <div className="flex justify-between items-center w-72 p-4 px-6 bg-neutral-700 rounded-xl border border-neutral-600">
              <div>
                <p className="text-[#CECECE] text-xl">Total Creations</p>
                <motion.pre className="text-2xl text-white">
                  {rounded}
                </motion.pre>
              </div>
              <div className="size-10 flex justify-center items-center rounded-md bg-gradient-to-br from-[#3588F2] to-[#0BB0D7]">
                <Sparkles className="size-5 text-white" />
              </div>
            </div>
            <div className="flex justify-between items-center w-72 p-4 px-6 bg-neutral-700 rounded-xl border border-neutral-600">
              <div>
                <p className="text-[#CECECE] text-xl">Active Plan</p>
                <p className="text-[#FFFFFF] text-2xl">
                  <Protect plan="premium" fallback="Free">
                    Premium
                  </Protect>
                </p>
              </div>
              <div className="size-10 flex justify-center items-center rounded-md bg-gradient-to-br from-[#FF61C5] to-[#9E53EE]">
                <Gem className="size-5 text-white" />
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <p className="mt-10 mb-4 text-white text-3xl">Recent Creations</p>
            {creations.map((item, idx) => (
              <div
                key={idx}
                onClick={() => toggleExpanded(item.id)}
                className="p-4 max-w-5xl text-sm bg-[#262626] border border-[#313131] rounded cursor-pointer"
              >
                <div className="flex justify-between items-center gap-4">
                  <div>
                    <h2 className="text-white text-lg">{item.prompt}</h2>
                    <p className="text-[#CECECE] text-base">
                      {item.type} -{" "}
                      {new Date(item.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="bg-[#777777] text-white border border-[#737475] rounded-full px-4 py-2 min-w-24 text-center">
                    {item.type}
                  </div>
                </div>
                {expanded === item.id && (
                  <div>
                    {item.type === "image" ? (
                      <img
                        src={item.content}
                        className="mt-3 w-full max-w-md"
                      />
                    ) : (
                      <div className="mt-3 h-full overflow-y-scroll text-neutral-200">
                        <div className="reset-tw">
                          <Markdown>{item.content}</Markdown>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Dashboard;
