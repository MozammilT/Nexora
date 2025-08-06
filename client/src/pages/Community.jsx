import { Sparkles } from "lucide-react";
import { useState, useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import { FocusCards } from "@/components/ui/focus-cards";
import { useAuth } from "@clerk/clerk-react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Loader } from "@/components/ui/loader";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

function Community() {
  const { getToken } = useAuth();
  const { user } = useUser();
  const [creations, setCreations] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCreations = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get("/user/published-creation", {
        headers: { Authorization: `Bearer ${await getToken()}` },
      });

      data.success
        ? setCreations(data.result)
        : toast.error("Error fetching creations", {
            position: "top-center",
            style: {
              borderRadius: "50px",
              background: "#3b3b3b",
              color: "#fff",
            },
          });
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

  const toggleLike = async (id) => {
    const currentUserId = user.id.toString();
    if (!currentUserId) {
      toast.error("User id nt found");
      return;
    }

    //Update the UI immediately
    setCreations((prevCreations) =>
      prevCreations.map((creation) => {
        if (creation.id === id) {
          const currentLikes = creation.likes || [];
          const isLiked = currentLikes.includes(currentUserId);

          return {
            ...creation,
            likes: isLiked
              ? currentLikes.filter((userId) => userId !== currentUserId)
              : [...currentLikes, currentUserId],
          };
        }

        return creation;
      })
    );

    try {
      const { data } = await axios.post(
        "/user/toggle-like",
        { id },
        {
          headers: { Authorization: `Bearer ${await getToken()}` },
        }
      );
      if (!data.success) {
        //Revert update if API call fails
        setCreations((prevCreations) =>
          prevCreations.map((creation) => {
            if (creation.id === id) {
              const currentLikes = creation.likes || [];
              const isLiked = currentLikes.includes(currentUserId);

              return {
                ...creation,
                likes: isLiked
                  ? currentLikes.filter((userId) => userId !== currentUserId)
                  : [...currentLikes, currentUserId],
              };
            }
            return creation;
          })
        );
        toast.error(data.message);
      }
    } catch (err) {
      // Revert the optimistic update on error
      setCreations((prevCreations) =>
        prevCreations.map((creation) => {
          if (creation.id === id) {
            const currentLikes = creation.likes || [];
            const isLiked = currentLikes.includes(currentUserId);

            return {
              ...creation,
              likes: isLiked
                ? currentLikes.filter((userId) => userId !== currentUserId)
                : [...currentLikes, currentUserId],
            };
          }
          return creation;
        })
      );

      toast.error(err.message, {
        position: "top-center",
        style: {
          borderRadius: "50px",
          background: "#3b3b3b",
          color: "#fff",
        },
      });
    }
  };

  useEffect(() => {
    if (user) {
      fetchCreations();
    }
  }, []);

  return (
    <div className="h-full flex flex-col p-6">
      <div className="bg-[#262626] rounded-lg shadow-[0_4px_20px_rgba(80,68,229,0.3)] min-h-[95vh] overflow-y-auto">
        <div className="flex gap-3 mx-auto justify-center mt-5">
          <Sparkles className="size-8 text-[#75198c]" />
          <h1 className="text-3xl tracking-tighter text-balance text-white">
            Creations
          </h1>
        </div>
        {loading ? (
          <div className="flex justify-center items-center min-h-[80vh]">
            <Loader text="Loading..." />
          </div>
        ) : (
          <FocusCards cards={creations} toggleLike={toggleLike} />
        )}
      </div>
    </div>
  );
}

export default Community;
