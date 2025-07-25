import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import AITools from "@/components/AiTools";
import Testimonials from "@/components/Testimonials";
import PricePlan from "@/components/PricePlan";
import Partners from "@/components/Partners";
import Footer from "@/components/Footer";

function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <AITools />
      <Testimonials />
      <PricePlan />
      <Partners />
      <Footer />
    </div>
  );
}

export default Home;
