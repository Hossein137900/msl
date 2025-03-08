"use client";
import { useState } from "react";
import Image from "next/image";
import { motion, useMotionValue, AnimatePresence } from "framer-motion";

interface Slide {
  image: string;
  title: string;
  text: string;
  buttonText: string;
}

const slides: Slide[] = [
  {
    image: "/assets/images/fade1.jpg",
    title: "مشاوره نورپردازی | شرکت نوران",
    text: "علم و هنر نورپردازی با ایجاد نور و سایه...",
    buttonText: "درخواست مشاوره",
  },
  {
    image: "/assets/images/fade4.jpg",
    title: "طراحی داخلی | دکوراسیون مدرن",
    text: "استفاده از متریال‌های خاص برای زیبایی بیشتر...",
    buttonText: "مشاهده نمونه کارها",
  },
];

function SlideCard({
  slide,
  direction,
  setIndex,
}: {
  slide: Slide;
  direction: number;
  setIndex: (index: number | ((prev: number) => number)) => void;
}) {
  const x = useMotionValue(0);
  // const opacity = useTransform(x, [-300, 0, 300], [0.1, 1, 0.1]);
  console.log(setIndex);

  const slideVariants = {
    enter: (direction: number) => ({
      scale: 1.4,
      y: direction > 0 ? 1000 : -1000,
      opacity: 0,
      filter: "blur(20px)",
      rotateZ: direction > 0 ? 10 : -10,
    }),
    center: {
      zIndex: 1,
      y: 0,
      scale: 1,
      opacity: 1,
      filter: "blur(0px)",
      rotateZ: 0,
    },
    exit: (direction: number) => ({
      scale: 0.8,
      y: direction < 0 ? 1000 : -1000,
      opacity: 0,
      filter: "blur(20px)",
      rotateZ: direction < 0 ? -10 : 10,
    }),
  };

  return (
    <motion.div
      className="absolute w-full h-[600px]"
      style={{
        y: useMotionValue(0),
        filter: useMotionValue("blur(0px)"),
      }}
      drag="y"
      dragConstraints={{ top: 0, bottom: 0 }}
      dragElastic={0.7}
      custom={direction}
      variants={slideVariants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{
        type: "spring",
        mass: 0.8,
        stiffness: 80,
        damping: 15,
        filter: { duration: 0.4 },
        opacity: { duration: 0.6 },
      }}
    >
      <div className="flex flex-col lg:flex-row h-full ">
        <div className="lg:w-1/2 w-full relative h-full">
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            className="object-cover h-full w-full px-2  md:px-0 rounded-lg"
            priority
          />
        </div>
        <div
          className="lg:w-1/2 w-full bg-white/40 lg:h-2/3 lg:border-t lg:border-b lg:border-[#a37462] my-auto flex flex-col justify-center items-center md:items-start p-12 cursor-move"
          dir="rtl"
        >
          <h2 className="md:text-3xl text-lg font-bold text-gray-800 mb-2 md:mb-6">
            {slide.title}
          </h2>
          <p className="text-gray-600 md:text-lg text-sm leading-relaxed mb-2 md:mb-8">
            {slide.text}
          </p>
          <button
            aria-label="button"
            className=" hover:bg-transparent/5 transition-all transform hover:scale-105 text-[#a37462] px-4 md:px-8 py-3 rounded-lg md:text-lg text-sm font-medium shadow-md border border-[#a37462] hover:border-transparent"
          >
            {slide.buttonText}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
export default function Slider() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  function handleNext() {
    setDirection(1);
    setIndex((prev) => (prev + 1) % slides.length);
  }

  function handlePrev() {
    setDirection(-1);
    setIndex((prev) => (prev - 1 + slides.length) % slides.length);
  }

  return (
    <div className="relative w-full mx-auto py-10 ">
      <div className="relative h-[700px] md:h-[600px] w-full overflow-hidden">
        <AnimatePresence initial={false} custom={direction}>
          <SlideCard
            key={index}
            slide={slides[index]}
            direction={direction}
            setIndex={setIndex}
          />
        </AnimatePresence>
      </div>

      <div className="absolute top-2/3 md:bottom-1/4 md:translate-y-1/2 w-full flex items-center justify-between px-4 z-20">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={handlePrev}
          aria-label="prev"
          className="w-10 h-10 sm:w-12 sm:h-12 flex  items-center justify-center rounded-full 
                 bg-gradient-to-br from-white/30 to-white/10 backdrop-blur 
                 border border-[#a37462] shadow-lg hover:shadow-xl 
                 transition-all duration-300"
        >
          <svg
            className="w-5 h-5 sm:w-6 rotate-180 sm:h-6 text-[#a37462] "
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleNext}
          aria-label="next"
          className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full 
                 bg-gradient-to-br from-white/30 to-white/10 backdrop-blur 
                 border border-[#a37462] shadow-lg hover:shadow-xl 
                 transition-all duration-300"
        >
          <svg
            className="w-5 h-5 sm:w-6 sm:h-6 text-[#a37462] "
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </motion.button>
      </div>
    </div>
  );
}
