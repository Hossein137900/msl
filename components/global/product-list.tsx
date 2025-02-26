"use client";
import Image from "next/image";
import { FC } from "react";
import { motion } from "framer-motion";
import { FiShoppingCart, FiHeart } from "react-icons/fi";

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

const ProductList: FC<ProductListProps> = ({ products }) => {
  return (
    <div className="container mx-auto px-4 py-8" dir="rtl">
      <h2 className="text-4xl font-bold text-center text-yellow-500 mb-8">
        محصولات ما
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <motion.div
            key={product.id}
            className="group bg-white/20 rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="relative h-64 w-full overflow-hidden">
              <Image
                src={product.image}
                alt={product.title}
                fill
                className="object-cover transform group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute top-4 right-4 space-y-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  className="bg-white p-2 rounded-full shadow-md hover:bg-red-400 relative"
                  whileTap={{ scale: 0.9 }}
                  aria-label="Add to favorites"
                >
                  <FiHeart className="text-gray-600 w-5 hover:text-white h-5 peer" />
                  <div className="absolute -left-20 -bottom-6 hidden peer-hover:block">
                    <div className="bg-black text-white text-xs py-1 px-2 rounded-md whitespace-nowrap">
                      افزودن به علاقه‌مندی‌ها
                    </div>
                    <div className="absolute -bottom-1 right-0 w-2 h-2 bg-black transform rotate-45"></div>
                  </div>
                </motion.button>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-50 mb-2 line-clamp-1">
                {product.title}
              </h3>

              <p className="text-gray-200 text-sm mb-4 line-clamp-2">
                {product.description.slice(0, 50)}...
              </p>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-xs text-gray-300">قیمت محصول</p>
                  <span className="text-xl font-bold text-yellow-600">
                    {product.price} تومان
                  </span>
                </div>

                <motion.button
                  whileTap={{ scale: 0.95 }}
                  aria-label="Add to cart"
                  className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-xl font-medium transition-colors duration-200"
                >
                  <FiShoppingCart className="w-5 h-5" />
                  <span className="text-sm text-nowrap font-semibold">
                    افزودن به سبد خرید
                  </span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
