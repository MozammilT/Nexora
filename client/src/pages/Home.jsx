import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import AITools from "@/components/AiTools";
import Testimonials from "@/components/Testimonials";
import PricePlan from "@/components/PricePlan";

function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <AITools />
      <Testimonials />
      <PricePlan />
    </div>
  );
}

export default Home;
