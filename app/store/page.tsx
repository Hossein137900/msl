"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiEye } from "react-icons/fi";
import { JsonValue } from "@prisma/client/runtime/library";

interface ProductProps {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  image: string | null;
  description: string;
  price: string;
  categoryId: string;
  properties: JsonValue;
  videoes: string[];
  colors: JsonValue;
  thumbnails: string[];
}
interface StoreProps {
  limit?: number;
}

const Store = ({ limit }: StoreProps) => {
  const [products, setProducts] = useState<ProductProps[]>([]);
  const displayedProducts = limit ? products.slice(0, limit) : products;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        setProducts(data.products);
      } catch (error) {
        console.log("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);
  return (
    <div className="px-4 py-8 " dir="rtl">
      <h2 className="md:text-3xl text-xl border-b pb-4 w-fit mx-auto border-[#a37462] mt-24 font-bold text-center text-black/70 mb-8">
        {limit ? "محصولات پرفروش" : "محصولات ما"}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {displayedProducts.map((product) => (
          <motion.div
            key={product._id}
            className="group bg-white rounded-lg shadow-lg hover:shadow-2xl transition transform hover:scale-105 duration-300 overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="relative h-64 w-full overflow-hidden">
              <Image
                // src={product.image}
                src="https://images.pexels.com/photos/1005644/pexels-photo-1005644.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
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
                <Link href={`/store/${product._id}:${product.title}`}>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    aria-label="View product"
                    className="flex items-center gap-2 bg-[#e5d8d0] rounded-lg hover:bg-[#a37462] text-[#a37462] hover:text-white px-6 py-3 font-medium transition-colors duration-200"
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
