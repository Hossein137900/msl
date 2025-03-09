"use client";
import { motion } from "framer-motion";
import { doranthin } from "@/next-persian-fonts/doran";
import { useEffect, useRef } from "react";

const HeroSection = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Optimize video loading
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
    }
  }, []);

  // Overlay animation variants
  // const overlayVariants = {
  //   hidden: { opacity: 0 },
  //   visible: { opacity: 0.6 },
  // };

  return (
    <div className=" h-screen w-full ">
      {/* Video Background */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src="/assets/video/video.mp4" type="video/mp4" />
      </video>

      {/* Content Overlay */}
      <div className="relative h-full flex w-full flex-col items-center mr-24 md:justify-center md:items-center justify-center  text-center px-4 z-50">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-80 sm:w-full"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className={`text-2xl mb-8 mt-12 md:text-nowrap sm:text-4xl lg:text-7xl border-b border-[#a37462] sm:border-none text-right sm:text-center pb-2 md:pb-0 text-white ${doranthin.className}`}
          >
            . نوری که آرامش می بخشد
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="sm:flex flex-col hidden md:flex-row gap-4 md:justify-center md:mr-8 md:items-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 border-b w-fit mx-auto border-[#a37462] text-[#e5d8d0]  hover:border hover:bg-[#a37462] font-bold text-lg  transition-colors duration-300"
            >
              مشاهده محصولات
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        {/* <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 1 }}
          className="absolute bottom-8"
        >
          <div className="w-8 h-12 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2" />
          </div>
        </motion.div> */}
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t brightness-50 from-black via-[#e5d8d0]/10 to-black z-10" />
    </div>
  );
};

export default HeroSection;
