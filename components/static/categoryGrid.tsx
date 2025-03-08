"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const luxuryLightingCategories = [
  {
    id: "crystal-chandeliers",
    title: "لوستر کریستالی",
    children: ["سقفی", "آویز", "دیواری", "رومیزی"],
    imageUrl: "/assets/images/products/prod11.png",
  },
  {
    id: "modern-chandeliers",
    title: "لوستر مدرن",
    children: ["LED", "مینیمال", "فلزی", "طرح خاص"],
    imageUrl: "/assets/images/products/prod5.png",
  },
  {
    id: "traditional",
    title: "لوستر کلاسیک",
    children: ["برنزی", "طلایی", "نقره‌ای", "آنتیک"],
    imageUrl: "/assets/images/products/prod3.png",
  },
  {
    id: "wall-lighting",
    title: "آباژور و دیوارکوب",
    children: ["مدرن", "کلاسیک", "LED", "دکوراتیو"],
    imageUrl: "/assets/images/products/prod2.png",
  },
  {
    id: "outdoor",
    title: "نورپردازی محوطه",
    children: ["پارکی", "باغی", "نما", "استخری"],
    imageUrl: "/assets/images/products/prod1.png",
  },
];

const CategoryGrid = () => {
  return (
    <div
      className="grid grid-cols-1 md:grid-cols-3 gap-4 p-16 bg-gradient-to-b from-black via-stone-500 to-transparent"
      dir="rtl"
    >
      {/* First map */}
      {luxuryLightingCategories.slice(1, 3).map((category, index) => (
        <motion.div
          key={category.id}
          className="relative h-[300px] border-2 border-[#fff]/50 rounded-lg overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <Link href={`/category/${category.id}`}>
            <div className="relative h-full group cursor-pointer">
              <Image
                src={category.imageUrl}
                alt={`تصویر دسته‌بندی ${category.title}`}
                fill
                className="object-bottom group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute bottom-4 right-4 text-white">
                <h3 className="text-lg font-bold ">{category.title}</h3>
              </div>
            </div>
          </Link>
        </motion.div>
      ))}

      {/* Center featured image */}
      <motion.div
        className="col-span-1 row-span-1 md:row-span-2 relative rounded-lg overflow-hidden"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Link href={`/category/${luxuryLightingCategories[0].id}`}>
          <div className="relative h-full group cursor-pointer">
            <Image
              src={luxuryLightingCategories[0].imageUrl}
              alt={`تصویر ویژه دسته‌بندی ${luxuryLightingCategories[0].title}`}
              width={2000}
              height={2000}
              className="object-cover border-2 border-[#fff]/50 h-full transition-transform duration-300"
            />
            <div className="absolute bottom-6 right-6 text-white">
              <h2 className="text-lg font-bold mb-2">
                {luxuryLightingCategories[0].title}
              </h2>
            </div>
          </div>
        </Link>
      </motion.div>

      {/* Second map */}
      {luxuryLightingCategories.slice(3, 5).map((category, index) => (
        <motion.div
          key={category.id}
          className="relative h-[300px] rounded-lg border-2 border-[#fff]/50 overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <Link href={`/category/${category.id}`}>
            <div className="relative h-full group cursor-pointer">
              <Image
                src={category.imageUrl}
                alt={`تصویر دسته‌بندی ${category.title}`}
                fill
                className="object-bottom group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute bottom-4 right-4 text-white">
                <h3 className="text-lg font-bold ">{category.title}</h3>
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
};

export default CategoryGrid;
