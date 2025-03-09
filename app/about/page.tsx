"use client";
import CardWithMouseBorder from "@/components/global/card-hover-border";
import { motion } from "framer-motion";
import Image from "next/image";
import { storyCards, timelineEvents } from "../../lib/aboutData";
import Marquee from "@/components/global/marque";
import { useEffect } from "react";

const AboutPage = () => {
  useEffect(() => {
    document.title = "درباره ما | مدرن لایت";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "درباره ما - مدرن لایت");
    }
  }, []);
  return (
    <div className="min-h-screen" dir="rtl">
      {/* Hero Section with Parallax */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="h-[100vh] relative overflow-hidden"
      >
        <Image
          src="/assets/images/projects/project8.jpg"
          alt="Chandelier Craftsmanship"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center">
          <motion.h1
            initial={{ y: 50 }}
            animate={{ y: 0 }}
            className="text-5xl font-bold text-center text-white"
          >
            از سال 1370 چراغ خونه هاتونیم
          </motion.h1>
          <motion.p
            initial={{ y: 50 }}
            animate={{ y: 0 }}
            className="text-gray-300 text-center text-lg mt-4"
          >
            شروع کار با یک کارگاه کوچک در تهران
          </motion.p>
        </div>
      </motion.section>

      {/* Story Cards */}
      <section className="container mx-auto py-16 px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {storyCards.map((card, index) => (
            <CardWithMouseBorder key={card.title} card={card} index={index} />
          ))}
        </div>
      </section>
      <Marquee />
      {/* Interactive Timeline */}
      <section className="bg-transparent text-white py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="space-y-8"
          >
            <h2 className="text-3xl font-bold text-center text-[#a37462]  mb-12">
              تاریخچه ما
            </h2>
            <div className="flex flex-col md:flex-row gap-8">
              {timelineEvents.map((event, index) => (
                <motion.div
                  key={event.year}
                  transition={{ delay: index * 0.3 }}
                  className="flex-1 relative"
                >
                  <div className="border-l-4 border-[#a37462] pl-4">
                    <span className="text-[#a37462] text-xl">{event.year}</span>
                    <h3 className="text-lg font-semibold my-2">
                      {event.title}
                    </h3>
                    <p className="text-gray-400">{event.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact CTA */}
    </div>
  );
};

export default AboutPage;
