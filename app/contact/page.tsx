"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { contactMethods } from "../../lib/contactData";
import FAQSection from "@/components/global/faq";
import CardWithMouseBorder from "@/components/global/card-hover-border";

const ContactPage = () => {
  return (
    <div className="min-h-screen " dir="rtl">
      {/* Hero Section with Parallax */}
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
            تماس با ما
          </motion.h1>
          <motion.p
            initial={{ y: 50 }}
            animate={{ y: 0 }}
            className="text-gray-300 text-center text-lg mt-4"
          >
            ما مشتاق شنیدن از شما هستیم
          </motion.p>
        </div>
      </motion.section>

      {/* Contact Info Cards */}

      <section className="container mx-auto py-16 px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {contactMethods.map((card, index) => (
            <CardWithMouseBorder key={card.title} card={card} index={index} />
          ))}
        </div>
      </section>

      {/* Contact Form & Map Section */}
      <section className="py-16 px-4 bg-transparent">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div className="bg-transparentp-8 rounded-2xl">
              <h2 className="text-3xl font-bold mb-6  text-[#a37462]">
                ارسال پیام
              </h2>
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <motion.div>
                    <input
                      type="text"
                      placeholder="نام و نام خانوادگی"
                      className="w-full px-4 py-3 rounded-lg text-black border border-gray-200  focus:ring-2 focus:outline-none transition-all"
                    />
                  </motion.div>
                  <motion.div>
                    <input
                      type="email"
                      placeholder="ایمیل"
                      className="w-full px-4 py-3 rounded-lg border text-black border-gray-200  focus:ring-2 focus:outline-none transition-all"
                    />
                  </motion.div>
                </div>
                <motion.div>
                  <input
                    type="text"
                    placeholder="موضوع"
                    className="w-full px-4 py-3 rounded-lg border text-black border-gray-200  focus:ring-2 focus:outline-none transition-all"
                  />
                </motion.div>
                <motion.div>
                  <textarea
                    rows={6}
                    placeholder="پیام شما"
                    className="w-full px-4 py-3 rounded-lg border text-black border-gray-200  focus:ring-2 focus:outline-none transition-all resize-none"
                  />
                </motion.div>
                <motion.button
                  whileHover={{ scale: 0.99 }}
                  whileTap={{ scale: 0.95 }}
                  className="hover:bg-[#a37462] font-bold hover:text-[#ffffff] border-b border-[#a37462] text-[#a37462]  px-8 py-3 transition-all duration-300 w-full md:w-full"
                >
                  ارسال پیام
                </motion.button>
              </form>
            </motion.div>

            {/* Map */}
            <motion.div className="rounded-2xl overflow-hidden shadow-lg h-[500px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=YOUR_MAP_EMBED_URL"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="py-16 px-4"
      >
        <div className="container mx-auto">
          <FAQSection />
        </div>
      </motion.section>
    </div>
  );
};

export default ContactPage;
