import Title from "./Title";
import { HoverEffect } from "./ui/card-hover-effect.jsx";
import {
  SquarePen,
  Hash,
  Image,
  Eraser,
  Scissors,
  FileText,
} from "lucide-react";

function AITools() {
  const projects = [
    {
      image: SquarePen,
      from: "#3588F2",
      to: "#0BB0D7",
      title: "AI Article Writer",
      navigate: "/ai/write-article",
      description:
        "Generate high-quality, engaging articles on any topic with our AI writing technology.",
    },
    {
      image: Hash,
      from: "#B153EA",
      to: "#E549A3",
      title: "Blog Title Generator",
      navigate: "/ai/blog-title",
      description:
        "Find the perfect, catchy title for your blog posts with our AI-powered generator.",
    },
    {
      image: Image,
      from: "#20C363",
      to: "#11B97E",
      title: "AI Image Generation",
      navigate: "/ai/generate-images",
      description:
        "Create stunning visuals with our AI image generation tool, Experience the power of AI.",
    },
    {
      image: Eraser,
      from: "#F76C1C",
      to: "#F04A3C",
      title: "Background Removal",
      navigate: "/ai/remove-background",
      description:
        "Effortlessly remove backgrounds from your images with our AI-driven tool.",
    },
    {
      image: Scissors,
      from: "#5C6AF1",
      to: "#427DF5",
      title: "Object Removal",
      navigate: "/ai/remove-object",
      description:
        "Remove unwanted objects from your images seamlessly with our AI object removal tool.",
    },
    {
      image: FileText,
      from: "#12B7AC",
      to: "#08B6CE",
      title: "Resume Reviewer",
      navigate: "/ai/review-resume",
      description:
        "Get your resume reviewed by AI to improve your chances of landing your dream job.",
    },
  ];

  return (
    <div className="Ai-tools px-4 sm:px-20 xl:px-32">
      <Title
        title={"Powerful AI Tools"}
        subtitle={
          "Everything you need to create, enhance, and optimize your content with cutting-edge AI technology."
        }
      />
      <div className="mb-20">
        <div className="max-w-5xl mx-auto px-8">
          <HoverEffect items={projects} />
        </div>
      </div>
    </div>
  );
}

export default AITools;
