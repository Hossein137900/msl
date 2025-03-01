import ScrollOpacity from "@/components/global/scroll-opacity";
import HeroSection from "../components/static/heroSection";
import GalleryGrid from "@/components/global/gallery";
import ProductList from "@/components/global/product-list";
import BlogPost from "@/components/global/blog-post";

const Home = () => {
  const products = [
    {
      id: "1",
      title: "محصول 1",
      description:
        "در کادر زیر هر متنی را که دوست دارید تایپ کنید تا ما آن را برایتان نگه داریم و همیشه در دسترس شما قرار دهیم؛ ",
      price: 100000,
      image: "/assets/images/fade3.jpg",
    },
    {
      id: "2",
      title: "محصول 2",
      description:
        "در کادر زیر هر متنی را که دوست دارید تایپ کنید تا ما آن را برایتان نگه داریم و همیشه در دسترس شما قرار دهیم؛ ",
      price: 100000,
      image: "/assets/images/fade4.jpg",
    },
    {
      id: "3",
      title: "محصول 2",
      description:
        "در کادر زیر هر متنی را که دوست دارید تایپ کنید تا ما آن را برایتان نگه داریم و همیشه در دسترس شما قرار دهیم؛ ",
      price: 100000,
      image: "/assets/images/fade3.jpg",
    },
  ];
  return (
    <div className="relative bg-gradient-to-l from-[#16222A] to-[#3A6073] ">
      <div className="relative z-10">
        <HeroSection />
      </div>
      <div className="relative z-20">
        <ScrollOpacity />
        <GalleryGrid />
        <ProductList products={products} />
        <BlogPost />
      </div>
    </div>
  );
};
export default Home;
