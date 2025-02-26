"use client";
import CardWithMouseBorder from "@/components/global/card-hover-border";
import { motion } from "framer-motion";
import Image from "next/image";
import { storyCards, teamMembers, timelineEvents } from "../../lib/aboutData";

const AboutPage = () => {
  return (
    <div
      className="min-h-screen bg-gradient-to-l from-[#16222A] to-[#3A6073]"
      dir="rtl"
    >
      {/* Hero Section with Parallax */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="h-[100vh] relative overflow-hidden"
      >
        <Image
          src="/assets/images/fade4.jpg"
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
            روشنایی بخش فضای شما از سال ۱۳۷۰{" "}
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

      {/* Interactive Timeline */}
      <section className="bg-transparent text-white py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="space-y-8"
          >
            <h2 className="text-3xl font-bold text-center mb-12">تاریخچه ما</h2>
            <div className="flex flex-col md:flex-row gap-8">
              {timelineEvents.map((event, index) => (
                <motion.div
                  key={event.year}
                  transition={{ delay: index * 0.3 }}
                  className="flex-1 relative"
                >
                  <div className="border-l-4 border-yellow-300 pl-4">
                    <span className="text-yellow-400 text-xl">
                      {event.year}
                    </span>
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

      {/* Team Showcase */}
      <section className="py-16 container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold">آشنایی با هنرمندان ما</h2>
          <p className="text-gray-300 mt-4">
            استادکاران خبره، سازندگان آثار بی‌نظیر{" "}
          </p>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-lg overflow-hidden shadow-lg"
            >
              <Image
                src={member.image}
                alt={member.name}
                width={400}
                height={400}
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-black">
                  {member.name}
                </h3>
                <p className="text-yellow-500">{member.role}</p>
                <p className="text-gray-400 mt-2">{member.bio}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact CTA */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="bg-yellow-500 text-white py-16"
      >
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-serif mb-6">
            بیایید با هم چیزی زیبا خلق کنیم{" "}
          </h2>
          <p className="mb-8 max-w-2xl mx-auto">
            فضای خود را با طراحی‌های منحصر به فرد ما متحول کنید{" "}
          </p>
          <button className="bg-white text-yellow-400 px-8 py-3 rounded-full font-semibold hover:bg-yellow-50 transition-colors">
            تماس با ما{" "}
          </button>
        </div>
      </motion.section>
    </div>
  );
};

export default AboutPage;
