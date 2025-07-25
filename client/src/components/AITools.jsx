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
      description:
        "Generate high-quality, engaging articles on any topic with our AI writing technology.",
      //   link: "https://stripe.com",
    },
    {
      image: Hash,
      from: "#B153EA",
      to: "#E549A3",
      title: "Blog Title Generator",
      description:
        "Find the perfect, catchy title for your blog posts with our AI-powered generator.",
      //   link: "https://netflix.com",
    },
    {
      image: Image,
      from: "#20C363",
      to: "#11B97E",
      title: "AI Image Generation",
      description:
        "Create stunning visuals with our AI image generation tool, Experience the power of AI.",
      //   link: "https://google.com",
    },
    {
      image: Eraser,
      from: "#F76C1C",
      to: "#F04A3C",
      title: "Background Removal",
      description:
        "Effortlessly remove backgrounds from your images with our AI-driven tool.",
      //   link: "https://meta.com",
    },
    {
      image: Scissors,
      from: "#5C6AF1",
      to: "#427DF5",
      title: "Object Removal",
      description:
        "Remove unwanted objects from your images seamlessly with our AI object removal tool.",
      //   link: "https://amazon.com",
    },
    {
      image: FileText,
      from: "#12B7AC",
      to: "#08B6CE",
      title: "Resume Reviewer",
      description:
        "Get your resume reviewed by AI to improve your chances of landing your dream job.",
      //   link: "https://microsoft.com",
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
