"use client";
import { Suspense } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Breadcrumbs from "@/components/global/breadCrumbs";

export default function NotFound() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Breadcrumbs />
      </Suspense>
      <div className="min-h-screen bg-gradient-to-b from-[#2c1810] to-[#a37462] flex items-center justify-center px-4">
        <div className="text-center">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1 }}
            className="w-36 h-36 md:w-64 md:h-64 mx-auto my-8"
          >
            <svg
              viewBox="0 0 200 200"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 20 L100 50 M60 70 L140 70 M80 70 L80 120 M120 70 L120 120 M100 70 L100 140"
                stroke="#FFD700"
                strokeWidth="4"
              />
              <circle cx="100" cy="140" r="15" fill="#FFD700">
                <animate
                  attributeName="fillOpacity"
                  values="1;0.2;1"
                  dur="2s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx="80" cy="120" r="12" fill="#FFD700">
                <animate
                  attributeName="fillOpacity"
                  values="1;0.2;1"
                  dur="1.5s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx="120" cy="120" r="12" fill="#FFD700">
                <animate
                  attributeName="fillOpacity"
                  values="1;0.2;1"
                  dur="1.8s"
                  repeatCount="indefinite"
                />
              </circle>
            </svg>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h1 className="text-3xl md:text-6xl font-bold text-yellow-400 mb-4">
              404
            </h1>
            <h2 className="text-lg md:text-4xl text-white mb-6">
              صفحه مورد نظر یافت نشد
            </h2>
            <p className="text-gray-300 text-xs md:text-lg animate-pulse mb-8">
              ! متاسفانه نور این صفحه خاموش است
            </p>

            <Link href="/">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-yellow-500 text-[#2c1810] rounded-lg font-bold hover:bg-yellow-400 transition-colors"
              >
                بازگشت به صفحه اصلی
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
