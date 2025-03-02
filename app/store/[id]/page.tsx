"use client";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { FiAlertCircle } from "react-icons/fi";

interface ProductProps {
  id: string;
  title: string;
  description: string;
  price: number;
  images: string[];
}

const fakeProducts: ProductProps[] = [
  {
    id: "1",
    title: "محصول 1",
    description:
      "توضیحات محصول 1 در اینجا قرار می گیرد. این توضیحات می تواند شامل جزئیات بیشتری در مورد محصول باشد.",
    price: 100000,
    images: [
      "/assets/images/fade3.jpg",
      "/assets/images/fade4.jpg",
      "/assets/images/fade3.jpg",
    ],
  },
  {
    id: "2",
    title: "محصول 2",
    description:
      "توضیحات محصول 2 در اینجا قرار می گیرد. این توضیحات می تواند شامل جزئیات بیشتری در مورد محصول باشد.",
    price: 100000,
    images: [
      "/assets/images/fade4.jpg",
      "/assets/images/fade3.jpg",
      "/assets/images/fade4.jpg",
    ],
  },
  {
    id: "3",
    title: "محصول 3",
    description:
      "توضیحات محصول 3 در اینجا قرار می گیرد. این توضیحات می تواند شامل جزئیات بیشتری در مورد محصول باشد.",
    price: 100000,
    images: [
      "/assets/images/fade3.jpg",
      "/assets/images/fade4.jpg",
      "/assets/images/fade3.jpg",
    ],
  },
];

export default function ProductDetailPage() {
  const params = useParams();
  const product = fakeProducts.find((p) => p.id === params.id);
  const [currentImgIndex, setCurrentImgIndex] = useState<number>(0);

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-l from-[#16222A] to-[#3A6073]">
        <FiAlertCircle className="w-16 h-16 text-red-500 mb-4" />
        <p className="text-xl text-gray-200">محصولی یافت نشد</p>
      </div>
    );
  }

  return (
    <div
      className="bg-gradient-to-l from-[#16222A] to-[#3A6073] px-4 py-8"
      dir="rtl"
    >
      <div className="flex mt-24 flex-col md:flex-row gap-8">
        <div className="flex-1">
          <div className="relative w-full h-96 rounded-lg overflow-hidden">
            <Image
              src={product.images[currentImgIndex]}
              alt={`${product.title} - تصویر ${currentImgIndex + 1}`}
              fill
              className="object-cover"
            />
          </div>
          <div className="mt-4 flex gap-4 overflow-x-auto">
            {product.images.map((img, index) => (
              <div
                key={index}
                className={`relative w-24 h-24 rounded-lg overflow-hidden cursor-pointer border-2 ${
                  index === currentImgIndex
                    ? "border-yellow-500"
                    : "border-transparent"
                }`}
                onClick={() => setCurrentImgIndex(index)}
              >
                <Image
                  src={img}
                  alt={`${product.title} - تصویر ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-4">{product.title}</h2>
            <p className="mb-4">{product.description}</p>
            <p className="font-bold text-xl mb-4">
              قیمت: {product.price} تومان
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-xl font-medium transition-colors duration-200"
            >
              افزودن به سبد خرید
            </motion.button>
            <Link href="/cart">
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center border border-yellow-500 hover:bg-yellow-500 hover:text-white px-6 py-3 rounded-xl font-medium transition-colors duration-200"
              >
                مشاهده سبد خرید
              </motion.button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
