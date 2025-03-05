"use client";
import { useState } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useTransform,
  AnimatePresence,
} from "framer-motion";

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
  const opacity = useTransform(x, [-300, 0, 300], [0.1, 1, 0.1]);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0.1,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0.1,
    }),
  };

  function handleDragEnd(
    _: MouseEvent | TouchEvent | PointerEvent,
    info: { offset: { x: number } }
  ) {
    const threshold = 100;
    if (info.offset.x < -threshold) {
      setIndex((prev: number) => (prev + 1) % slides.length);
    } else if (info.offset.x > threshold) {
      setIndex((prev: number) => (prev - 1 + slides.length) % slides.length);
    }
  }

  return (
    <motion.div
      className="absolute w-full h-[600px]"
      style={{ x, opacity }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={1}
      onDragEnd={handleDragEnd}
      custom={direction}
      variants={slideVariants}
      initial="enter"
      animate="center"
      //   exit="exit"
      transition={{
        x: { type: "spring", stiffness: 150, damping: 30 },
        opacity: { duration: 0.4 },
      }}
    >
      <div className="flex flex-col lg:flex-row h-full ">
        <div className="lg:w-1/2 w-full relative h-full">
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            className="object-cover h-full w-full px-2 md:px-0 rounded-lg"
            priority
          />
        </div>
        <div
          className="lg:w-1/2 w-full flex flex-col justify-center items-center md:items-start p-12 cursor-move"
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
            className=" hover:bg-transparent/5 transition-all transform hover:scale-105 text-[#a37462] px-4 md:px-8 py-3 rounded-lg md:text-lg text-sm font-medium shadow-md"
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

      <button
        onClick={handlePrev}
        aria-label="prev"
        className="absolute left-4 top-1/2 text-gray-50 -translate-y-1/2 bg-white/20 p-3 rounded-full shadow-lg z-10"
      >
        ←
      </button>
      <button
        aria-label="next"
        onClick={handleNext}
        className="absolute right-4 top-1/2 md:text-gray-500 -translate-y-1/2 bg-white/20 p-3 rounded-full shadow-lg z-10"
      >
        →
      </button>
    </div>
  );
}
