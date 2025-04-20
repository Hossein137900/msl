"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiEye } from "react-icons/fi";
import { JsonValue } from "@prisma/client/runtime/library";
import { useEffect, useState } from "react";

interface ProductProps {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  image: string | null;
  description: string;
  slug: string;
  price: string;
  categoryId: string;
  properties: JsonValue;
  videoes: string[];
  colors: JsonValue;
  thumbnails: string[];
}

interface ProductGridProps {
  limit?: number;
}

function generateSlug(title: string) {
  return title
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\u0600-\u06FF\uFB8A\u067E\u0686\u06AF\u200C\u200Fa-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const ProductGrid = ({ limit }: ProductGridProps) => {
  const [products, setProducts] = useState<ProductProps[]>([]);

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
  const displayedProducts = limit ? products.slice(0, limit) : products;

  return (
    <div className="px-4 py-8" dir="rtl">
      <div className="flex justify-between md:justify-center items-center mt-24 mb-8 relative">
        <h2 className="md:text-3xl text-xl border-b pb-4 w-fit border-[#a37462] font-bold text-center text-black/70">
          {limit ? "محصولات پرفروش" : "محصولات ما"}
        </h2>

        {/* Show All Products Button - positioned to the left of the heading */}
        {limit && (
          <div className="absolute left-0 md:left-2/5">
            <Link href="/store">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-[#a37462] border-2 text-[#a37462] hover:text-white px-4 py-2 rounded-lg hover:bg-[#8a6253] transition-colors duration-200 text-sm font-medium flex items-center gap-2"
              >
                <span>مشاهده همه</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 rotate-180 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 5l7 7-7 7M5 5l7 7-7 7"
                  />
                </svg>
              </motion.button>
            </Link>
          </div>
        )}
      </div>

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
                src={product.image||""} 
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
                <Link
                  href={`/store/${product._id}:${generateSlug(product.title)}`}
                >
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

export default ProductGrid;
