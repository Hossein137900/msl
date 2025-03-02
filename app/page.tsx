import ScrollOpacity from "@/components/global/scroll-opacity";
import HeroSection from "../components/static/heroSection";
import GalleryGrid from "@/components/global/gallery";

const Home = () => {
 
  return (
    <div className="relative bg-gradient-to-l from-[#16222A] to-[#3A6073] ">
      <div className="relative z-10">
        <HeroSection />
      </div>
      <div className="relative z-20">
        <ScrollOpacity />
        <GalleryGrid />
      </div>
    </div>
  );
};
export default Home;
