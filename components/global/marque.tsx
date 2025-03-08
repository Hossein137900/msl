import Image from "next/image";
import Marquee from "react-fast-marquee";

const brands = [
  "/assets/images/logo.png",
  "/assets/images/logo.png",
  "/assets/images/logo.png",
  "/assets/images/logo.png",
  "/assets/images/logo.png",
  "/assets/images/logo.png",
];

const MarqueSlider = () => {
  return (
    <>
      <h2 className="text-2xl font-bold text-center mb-8 text-[#a37462]">
        همراهان همیشگی ما
      </h2>
      <div className=" border border-[#a37462] py-12">
        <Marquee
          speed={50}
          loop={0}
          pauseOnHover={true}
          className="flex items-center"
        >
          {brands.map((brand, index) => (
            <div key={index} className="mx-8 w-24 h-24 relative">
              <Image
                src={brand}
                alt={`Brand ${index + 1}`}
                fill
                className="object-contain hover:scale-110 transition-transform duration-300"
              />
            </div>
          ))}
        </Marquee>
      </div>
    </>
  );
};

export default MarqueSlider;
