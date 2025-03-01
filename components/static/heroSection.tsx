"use client";
import { motion } from "framer-motion";
import { doranthin } from "@/next-persian-fonts/doran";

const HeroSection = () => {
  return (
    <div className=" h-screen w-full ">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src="/assets/video/vid.mp4" type="video/mp4" />
      </video>

      {/* Content Overlay */}
      <div className="relative h-full flex w-full flex-col items-end mr-24 md:justify-center justify-end  text-center px-4 z-50">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className=""
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className={`text-2xl mb-24 md:text-7xl text-right text-white ${doranthin.className}`}
          >
            . نوری که آرامش می بخشد
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="lg:flex flex-col hidden md:flex-row gap-4 md:justify-end md:mr-8 md:items-end"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4  text-gray-100 rounded-full font-bold text-lg hover:bg-yellow-500 transition-colors duration-300"
            >
              مشاهده محصولات
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-full font-bold text-lg hover:bg-white/10 transition-colors duration-300"
            >
              مشاوره رایگان
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
      <div className="absolute inset-0 bg-gradient-to-b from-transparent  to-black z-10" />
    </div>
  );
};

export default HeroSection;
