'use client'
import ScrollOpacity from "@/components/global/scroll-opacity";
import HeroSection from "../components/static/heroSection";
import CategoryGrid from "@/components/static/categoryGrid";
import Slider from "@/components/static/slider";
import SpeakersSlider from "@/components/static/sliderHuman";
import ProjectsCard from "@/components/global/project-card";
import ProductGrid from "@/components/global/product-grid";
import { useEventTracker } from "@/hooks/useEventTracker";

const Home = () => {
  useEventTracker();
  return (
    <div className="relative">
      <div className="relative z-10">
        <HeroSection />
      </div>
      <div className="relative z-20">
        <ScrollOpacity />
      </div>
      <CategoryGrid />
      <Slider />
      <div>
        <ProductGrid limit={4} />
      </div>
      <div className="relative ">
        <SpeakersSlider />
      </div>
      <div>
        <ProjectsCard />
      </div>
    </div>
  );
};
export default Home;
