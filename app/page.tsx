import ScrollOpacity from "@/components/global/scroll-opacity";
import HeroSection from "../components/static/heroSection";
import CategoryGrid from "@/components/static/categoryGrid";
import Slider from "@/components/static/slider";

const Home = () => {
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
    </div>
  );
};
export default Home;
