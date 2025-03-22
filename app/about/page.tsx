"use client";
import CardWithMouseBorder from "@/components/global/card-hover-border";
import { motion } from "framer-motion";
import Image from "next/image";
import { storyCards } from "../../lib/aboutData";
import Marquee from "@/components/global/marque";
import { useEffect } from "react";
import { useEventTracker } from "@/hooks/useEventTracker";

const AboutPage = () => {
  useEventTracker();

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
            <div className="max-w-4xl mx-auto p-8 bg-[#a37462]/10 rounded-md text-justify">
              <section className="mb-8">
                <p className="leading-7 mb-4">
                  <span className="font-bold text-[#a37462]">
                    شرکت سینا مدرن لایت
                  </span>
                  ، پیشگام در صنعت روشنایی لوکس ایران، با افتخار از سال ۱۳۹۵ به
                  عنوان مرجع تخصصی واردات محصولات روشنایی مدرن و دکوراتیو فعالیت
                  می‌کند. ما به عنوان نماینده انحصاری برندهای معتبر جهانی،
                  مجموعه‌ای بی‌نظیر از لوسترهای مدرن، نئوکلاسیک، چراغ‌های
                  نورپردازی هوشمند و محصولات دکوراتیو را به بازار ایران عرضه
                  می‌کنیم.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-[#a37462] mt-8 mb-4">
                  تعهد ما
                </h2>
                <p className="leading-7 mb-4">
                  ما با بهره‌گیری از پیشرفته‌ترین تکنولوژی‌های روز دنیا و تحلیل
                  مداوم نیازهای بازار، همواره در تلاشیم تا:
                </p>
                <ul className="list-disc pr-6 mb-6 space-y-3">
                  <li>
                    محصولاتی با طراحی منحصربه‌فرد و کارکرد بی‌عیب ارائه دهیم
                  </li>
                  <li>
                    مشاوره تخصصی در انتخاب بهترین گزینه‌های روشنایی متناسب با
                    فضای شما ارائه کنیم
                  </li>
                  <li>
                    خدمات پس از فروش حرفه‌ای و پشتیبانی مادام‌العمر از محصولات
                    را تضمین کنیم
                  </li>
                </ul>
              </section>

              <section className="mb-8">
                <p className="leading-7 font-medium mt-8 mb-4">
                  افتخار ما، روشن کردن فضای زندگی و کار شماست. با انتخاب{" "}
                  <span className="font-bold text-[#a37462]">
                    سینا مدرن لایت
                  </span>
                  ، تنها به یک محصول دست نمی‌یابید، بلکه به یک تجربه منحصربه‌فرد
                  از زیبایی، کیفیت و نوآوری می‌پیوندید.
                </p>
                <p className="leading-7 italic mt-6">
                  با سپاس از اعتماد و همراهی شما، مشتاقانه منتظر خلق فضاهای
                  درخشان‌تر در کنار شما هستیم.
                </p>
              </section>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact CTA */}
    </div>
  );
};

export default AboutPage;
