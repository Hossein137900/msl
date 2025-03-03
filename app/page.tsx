import ScrollOpacity from "@/components/global/scroll-opacity";
import HeroSection from "../components/static/heroSection";
import GalleryGrid from "@/components/global/gallery";

const Home = () => {
  return (
    <div className="relative bg-[#e5d8d0]/50  ">
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
