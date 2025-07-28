import { Sparkles } from "lucide-react";
import { useState, useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import { dummyPublishedCreationData } from "../assets/assets.js";
import { FocusCards } from "@/components/ui/focus-cards";

function Community() {
  const [creations, setCreations] = useState([]);
  const [fav, setFav] = useState("false");
  const { user } = useUser();

  const fetchCreations = async () => {
    setCreations(dummyPublishedCreationData);
  };

  useEffect(() => {
    if (user) {
      fetchCreations();
    }
  }, []);

  return (
    <div className="h-full flex flex-col gap-4 p-6">
      <div className="bg-[#262626] rounded-lg shadow-[0_4px_20px_rgba(80,68,229,0.3)] max-h-[95vh] overflow-y-auto">
        <div className="flex gap-5 mx-auto justify-center mt-5">
          <Sparkles className="size-8 text-[#75198c]" />
          <h1 className="text-3xl tracking-tighter text-balance text-white">
            Creations
          </h1>
        </div>
        <FocusCards cards={creations} />
      </div>
    </div>
  );
}

export default Community;
