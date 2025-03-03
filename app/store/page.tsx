"use client";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import { motion } from "framer-motion";
import { FiHeart, FiEye } from "react-icons/fi";

interface ProductProps {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
}

interface ProductListProps {
  products: ProductProps[];
}

const products: ProductProps[] = [
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
    title: "محصول 3",
    description:
      "در کادر زیر هر متنی را که دوست دارید تایپ کنید تا ما آن را برایتان نگه داریم و همیشه در دسترس شما قرار دهیم؛ ",
    price: 100000,
    image: "/assets/images/fade3.jpg",
  },
];

const Store: FC<ProductListProps> = () => {
  return (
    <div className="px-4 py-8 " dir="rtl">
      <h2 className="text-4xl mt-24 font-bold text-center text-white mb-8">
        محصولات ما
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <motion.div
            key={product.id}
            className="group bg-white  shadow-lg hover:shadow-2xl transition transform hover:scale-105 duration-300 overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="relative h-64 w-full overflow-hidden">
              <Image
                src={product.image}
                alt={product.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <div className="p-6 flex flex-col">
              <h3 className="text-2xl font-bold text-[#a37462] mb-2 line-clamp-1">
                {product.title}
              </h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {product.description.slice(0, 50)}...
              </p>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-xs text-gray-500">قیمت محصول</p>
                  <span className="text-sm font-bold text-[#a37462]">
                    {product.price} تومان
                  </span>
                </div>
                <Link href={`/store/${product.id}`}>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    aria-label="View product"
                    className="flex items-center gap-2 bg-[#e5d8d0] hover:bg-[#a37462] text-[#a37462] hover:text-white px-6 py-3 font-medium transition-colors duration-200"
                  >
                    <span className="text-xs font-semibold">مشاهده محصول</span>
                    <FiEye className="w-4 h-4" />
                  </motion.button>
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Store;
