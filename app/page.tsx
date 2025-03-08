import ScrollOpacity from "@/components/global/scroll-opacity";
import HeroSection from "../components/static/heroSection";
import CategoryGrid from "@/components/static/categoryGrid";
import Slider from "@/components/static/slider";
import SpeakersSlider from "@/components/static/sliderHuman";
import Store from "./store/page";
import ProjectsCard from "@/components/global/project-card";

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
      <div>
        <Store limit={4} />
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
