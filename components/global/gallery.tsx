"use client";
import Image from "next/image";
import Link from "next/link";
import { IoArrowBack } from "react-icons/io5";
const galleryItems = [
  {
    id: 1,
    image: "/assets/images/fade3.jpg",
    title: "لوستر کریستالی مدرن",
    description: "طراحی خاص برای فضاهای لاکچری",
    className: "col-span-2 row-span-2",
    link: "/products/crystal-modern",
  },
  {
    id: 2,
    image: "/assets/images/fade4.jpg",
    title: "چراغ‌های دیواری",
    description: "نورپردازی هنرمندانه",
    className: "col-span-1 row-span-1",
    link: "/products/crystal-modern",
  },
  {
    id: 3,
    image: "/assets/images/fade3.jpg",
    title: "لوستر LED",
    description: "تکنولوژی مدرن در روشنایی",
    className: "col-span-1 row-span-2",
    link: "/products/crystal-modern",
  },
  {
    id: 4,
    image: "/assets/images/fade3.jpg",
    title: "آباژور کلاسیک",
    description: "زیبایی در سادگی",
    className: "col-span-2 row-span-1",
    link: "/products/crystal-modern",
  },
  {
    id: 5,
    image: "/assets/images/fade1.jpg",
    title: "لوستر سقفی",
    description: "طراحی منحصر به فرد",
    className: "col-span-1 row-span-1",
    link: "/products/crystal-modern",
  },
  {
    id: 6,
    image: "/assets/images/fade3.jpg",
    title: "چراغ‌های پایه‌دار",
    description: "ترکیب هنر و نور",
    className: "col-span-1 row-span-2",
    link: "/products/crystal-modern",
  },
  {
    id: 7,
    image: "/assets/images/fade4.jpg",
    title: "لوستر مینیمال",
    description: "سادگی در اوج زیبایی",
    className: "col-span-2 row-span-1",
    link: "/products/crystal-modern",
  },
];

const GalleryGrid = () => {
  return (
    <div className="mt-36 py-4" dir="rtl">
      <h2 className="text-center text-4xl text-[#a37462] font-bold mb-12">
        گالری ساخته شده توسط ما
      </h2>
      <div className="flex flex-col lg:grid lg:grid-cols-4 bg-transparent  gap-4 lg:auto-rows-[200px]">
        {galleryItems.map((item) => (
          <div
            key={item.id}
            className={`relative h-[300px] lg:h-auto overflow-hidden rounded-2xl cursor-pointer group 
          lg:${item.className}`}
          >
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
              <h3 className="text-2xl font-bold text-white mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                {item.title}
              </h3>
              <p className="text-gray-300 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                {item.description}
              </p>
              <Link
                href={item.link}
                className="inline-flex items-center gap-2 text-[#e5d8d0] mt-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-100 hover:text-[#a37462]"
              >
                مشاهده محصول
                <IoArrowBack className="group-hover:-translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GalleryGrid;
