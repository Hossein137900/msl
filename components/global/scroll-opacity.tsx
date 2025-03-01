"use client";
import Image from "next/image";
import { useRef, useEffect } from "react";
import { motion, useInView, useAnimation } from "framer-motion";

const ScrollOpacity = () => {
  const controls = useAnimation();
  const componentRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(componentRef, {
    margin: "-100px 0px",
    once: false,
  });

  useEffect(() => {
    if (isInView) {
      controls.start({
        opacity: 1,
        filter: "brightness(1.5)",
        transition: {
          duration: 1.5,
          ease: [0.4, 0, 0.2, 1],
        },
      });
    } else {
      controls.start({
        opacity: 0,
        filter: "brightness(0.3)",
        transition: {
          duration: 0.8,
          ease: "easeOut",
        },
      });
    }
  }, [isInView, controls]);

  return (
    <div className="relative bg-black overflow-hidden">
      <div className="fixed bg-gradient-to-b from-black via-black/80 to-transparent z-[-1]" />

      <motion.div
        ref={componentRef}
        initial={{ opacity: 0, filter: "brightness(0.3)" }}
        animate={controls}
        className="min-h-screen w-full relative flex items-center justify-center"
      >
        <div className="w-full h-[1000px] relative">
          <Image
            src="/assets/images/fade3.jpg"
            alt="Luxury Chandelier"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0  bg-gradient-to-b from-black to-transparent" />
          {/* Light Glow Effect */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={
              isInView
                ? {
                    opacity: [0, 0.8, 0.4],
                    scale: [1, 1.2, 1],
                  }
                : { opacity: 0 }
            }
            transition={{
              duration: 2,
              times: [0, 0.5, 1],
              ease: "easeOut",
            }}
            className="absolute inset-0 bg-yellow-400/20 mix-blend-soft-light pointer-events-none"
          />

          {/* Radial Gradient Light Effect */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 0.6 } : { opacity: 0 }}
            transition={{ duration: 1.5, delay: 0.3 }}
            className="absolute inset-0 bg-radial-light pointer-events-none"
            style={{
              background:
                "radial-gradient(circle at center, rgba(255,255,255,0.3) 0%, transparent 70%)",
            }}
          />

          <div className="absolute inset-0 flex items-center mt-56 mr-10 justify-end">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={controls}
              transition={{ delay: 0.5 }}
              className="text-center space-y-8 text-white px-4 max-w-4xl"
            >
              <h2 className="text-5xl md:text-7xl font-bold tracking-tight">
                روشنایی که با شما به اوج می‌رسد
              </h2>
              <p className="text-xl md:text-2xl text-gray-200">
                طراحی مدرن، کیفیت برتر
              </p>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ScrollOpacity;
