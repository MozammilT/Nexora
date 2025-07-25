import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import AITools from "@/components/AiTools";
import Testimonials from "@/components/Testimonials";

function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <AITools />
      <Testimonials />
    </div>
  );
}

export default Home;
