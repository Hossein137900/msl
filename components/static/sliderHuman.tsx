"use client";

import { useState } from "react";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
} from "framer-motion";

const speakers = [
  { name: " حجت", image: "/assets/images/human/1.webp" },
  { name: "افشین ", image: "/assets/images/human/2.webp" },
  { name: " حجت", image: "/assets/images/human/4.webp" },
  { name: "افشین حجت", image: "/assets/images/human/4.webp" },
  { name: "افشین ", image: "/assets/images/human/5.webp" },
];

function SpeakerCard({
  speaker,
  direction,
  setIndex,
}: {
  speaker: (typeof speakers)[0];
  direction: number;
  setIndex: (index: number | ((prev: number) => number)) => void;
}) {
  const x = useMotionValue(0);
  const opacity = useTransform(x, [-300, 0, 300], [0.1, 1, 0.1]);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  function handleDragEnd(_: any, info: { offset: { x: number } }) {
    const threshold = 100;
    if (info.offset.x < -threshold) {
      setIndex((prev: number) => (prev + 1) % speakers.length);
    } else if (info.offset.x > threshold) {
      setIndex(
        (prev: number) => (prev - 1 + speakers.length) % speakers.length
      );
    }
  }

  return (
    <motion.div
      className="absolute w-full"
      style={{ x, opacity }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={1}
      onDragEnd={handleDragEnd}
      custom={direction}
      variants={slideVariants}
      initial="enter"
      animate="center"
      transition={{
        x: { type: "spring", stiffness: 150, damping: 30 },
        opacity: { duration: 0.2 },
      }}
    >
      <div className="flex justify-center items-center gap-8">
        {[
          speaker,
          speakers[(speakers.indexOf(speaker) + 1) % speakers.length],
          speakers[(speakers.indexOf(speaker) + 2) % speakers.length],
        ].map((s, idx) => (
          <motion.div
            key={idx}
            className="flex flex-col items-center"
            initial={{ scale: 0.9 }}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="md:w-40 md:h-40 w-28 h-28 rounded-lg border-2 p-1  border-[#a37462] overflow-hidden">
              <Image
                src={s.image}
                alt={s.name}
                width={160}
                height={160}
                className="w-full h-full object-cover"
              />
            </div>
            <p className="mt-3 text-gray-700 font-medium">{s.name}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default function SpeakersSlider() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  function handleNext() {
    setDirection(1);
    setIndex((prev) => (prev + 1) % speakers.length);
  }

  function handlePrev() {
    setDirection(-1);
    setIndex((prev) => (prev - 1 + speakers.length) % speakers.length);
  }

  return (
    <div className="w-full max-w-4xl mx-auto text-center py-12">
      <h2 className="text-lg font-bold text-gray-800 mb-4">همراهان ما </h2>
      <div className="border-t-2 border-orange-500 w-16 mx-auto mb-6"></div>

      <div className="relative h-64 overflow-hidden">
        <AnimatePresence initial={false} custom={direction}>
          <SpeakerCard
            key={index}
            speaker={speakers[index]}
            direction={direction}
            setIndex={setIndex}
          />
        </AnimatePresence>

        <button
          onClick={handlePrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600  p-3 rounded-full shadow-lg z-10"
          aria-label="Previous"
        >
          ←
        </button>
        <button
          onClick={handleNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600  p-3 rounded-full shadow-lg z-10"
          aria-label="Next"
        >
          →
        </button>
      </div>
    </div>
  );
}
