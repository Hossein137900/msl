import Image from "next/image";
import Link from "next/link";
import { IoArrowBack } from "react-icons/io5";
import { galleryItems } from "../../lib/galleryData";

const GalleryGrid = () => {
  return (
    <div
      className="px-4  py-8 bg-gradient-to-b from-black via-stone-500 to-transparent"
      dir="rtl"
    >
      <h2 className="text-center text-4xl text-[#a37462] font-bold mb-16">
        گالری ساخته شده توسط ما
      </h2>

      {/* New Responsive Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {galleryItems.map((item) => (
          <div
            key={item.id}
            className="group relative aspect-square overflow-hidden rounded-md transition-transform duration-300 hover:-translate-y-2"
          >
            <Image
              src={item.image}
              alt={item.title}
              width={2000}
              height={1000}
              className="object-cover transition-transform h-full duration-700 group-hover:scale-105"
            />

            {/* Improved Overlay Design */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
              <div className="absolute bottom-0 p-6 w-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <h3 className="text-xl font-bold text-white mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-200 text-sm mb-4 line-clamp-2">
                  {item.description}
                </p>
                <Link
                  href={item.link}
                  className="inline-flex items-center gap-2 text-[#e5d8d0] hover:text-[#a37462] transition-colors duration-300"
                >
                  <span>مشاهده محصول</span>
                  <IoArrowBack className="transition-transform group-hover:-translate-x-2" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GalleryGrid;
