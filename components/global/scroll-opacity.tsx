"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { IoArrowForward, IoArrowBack } from "react-icons/io5";

const sliderData = [
  {
    image: "/assets/images/fade3.jpg",
    title: "روشنایی که با شما به اوج می‌رسد",
    description: "طراحی مدرن، کیفیت برتر",
  },
  {
    image: "/assets/images/fade4.jpg",
    title: "هنر نور در فضای شما",
    description: "زیبایی در هر لحظه",
  },
  {
    image: "/assets/images/fade3.jpg",
    title: "لوکس‌ترین طراحی‌های روز",
    description: "برای سلیقه‌های خاص",
  },
];

const ScrollOpacity = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const componentRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: componentRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    const handleScroll = () => {
      if (!componentRef.current) return;

      const rect = componentRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const elementTop = rect.top;
      const elementHeight = rect.height;

      // Calculate progress within the component
      const scrollProgress =
        (viewportHeight - elementTop) / (viewportHeight + elementHeight);
      const clampedProgress = Math.max(0, Math.min(1, scrollProgress));

      // Calculate which slide to show based on scroll progress
      const slideIndex = Math.floor(clampedProgress * sliderData.length);
      if (slideIndex !== currentIndex && slideIndex < sliderData.length) {
        setCurrentIndex(slideIndex);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [currentIndex]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % sliderData.length);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + sliderData.length) % sliderData.length
    );
  };

  const opacity = useTransform(scrollYProgress, [0, 0.3, 1], [0.3, 1, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 1.05]);

  return (
    <div ref={componentRef} className="h-[300vh]  w-full relative">
      
      <h2 className="text-yellow-400 text-3xl font-bold text-center my-8">
      ... حرکت کنید تا اسلایدر کار کند 
      </h2>
      <div className="sticky top-0 h-screen overflow-hidden bg-black rounded-2xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0"
          >
            <Image
              src={sliderData[currentIndex].image}
              alt="Luxury Chandelier"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/5" />
          </motion.div>
        </AnimatePresence>

        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          style={{ opacity, scale }}
        >
          <div className="text-center space-y-6 text-white px-4">
            <motion.h2
              key={`title-${currentIndex}`}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="text-5xl md:text-7xl font-bold"
            >
              {sliderData[currentIndex].title}
            </motion.h2>
            <motion.p
              key={`desc-${currentIndex}`}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -30, opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl md:text-2xl text-gray-50"
            >
              {sliderData[currentIndex].description}
            </motion.p>
          </div>
        </motion.div>

        {/* Navigation Controls */}
        <div className="absolute bottom-10 left-0 right-0 flex justify-center gap-8">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handlePrev}
            className="bg-white/20 backdrop-blur-sm p-4 rounded-full text-white hover:bg-white/30 transition-all cursor-pointer"
          >
            <IoArrowBack size={24} />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleNext}
            className="bg-white/20 backdrop-blur-sm p-4 rounded-full text-white hover:bg-white/30 transition-all cursor-pointer"
          >
            <IoArrowForward size={24} />
          </motion.button>
        </div>

        {/* Progress Indicators */}
        <div className="absolute bottom-32 left-0 right-0 flex justify-center gap-3 ">
          {sliderData.map((_, index) => (
            <motion.div
              key={index}
              className={`w-3 h-3 rounded-full ${
                index === currentIndex ? "bg-white" : "bg-white/30"
              }`}
              whileHover={{ scale: 1.2 }}
              onClick={() => setCurrentIndex(index)}
              style={{ cursor: "pointer" }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScrollOpacity;
