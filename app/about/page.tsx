"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { GiCrystalGrowth, GiCrystalize } from "react-icons/gi";
import { MdDesignServices, MdSupportAgent } from "react-icons/md";

interface CardProps {
  title: string;
  description: string;
  icon: React.ComponentType<{ className: string }>;
}

const CardWithMouseBorder = ({
  card,
  index,
}: {
  card: CardProps;
  index: number;
}) => {
  const cardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const card = cardRef.current;

    const handleMouseMove = (e: MouseEvent) => {
      if (!card) return;
      const rect = card.getBoundingClientRect();
      const distance = 50; // Detection distance in pixels

      // Calculate distance from mouse to card edges
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      const cardCenterX = rect.left + rect.width / 2;
      const cardCenterY = rect.top + rect.height / 2;

      const deltaX = mouseX - cardCenterX;
      const deltaY = mouseY - cardCenterY;

      const distanceFromCenter = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

      if (distanceFromCenter < rect.width / 2 + distance) {
        const x = mouseX - rect.left;
        const y = mouseY - rect.top;

        card.style.setProperty("--mouse-x", `${x}px`);
        card.style.setProperty("--mouse-y", `${y}px`);
        card.classList.add("near-mouse");
      } else {
        card.classList.remove("near-mouse");
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.2 }}
      className="card-wrapper"
    >
      <div className="card-content">
        <div className="icon-container">
          <card.icon className="w-12 h-12 text-yellow-400" />
        </div>
        <h3 className="text-xl font-semibold mb-3 text-white">{card.title}</h3>
        <p className="text-gray-400">{card.description}</p>
      </div>
    </motion.div>
  );
};
const AboutPage = () => {
  const storyCards = [
    {
      title: "صنایع دستی هنری",
      description: "هر قطعه با دقت و ظرافت دست‌ساز",
      icon: GiCrystalGrowth,
    },
    {
      title: "طراحی منحصر به فرد",
      description: "خلق آثار هنری متناسب با سلیقه شما",
      icon: MdDesignServices,
    },
    {
      title: "کیفیت برتر",
      description: "استفاده از مرغوب‌ترین مواد اولیه در ساخت",
      icon: GiCrystalize,
    },
    {
      title: "خدمات حرفه‌ای",
      description: "پشتیبانی و نصب تخصصی توسط کارشناسان ما",
      icon: MdSupportAgent,
    },
  ];

  const timelineEvents = [
    {
      year: "۱۳۷۰",
      title: "آغاز راه ما",
      description: "شروع کار با یک کارگاه کوچک در تهران",
    },
    {
      year: "۱۳۸۰",
      title: "گسترش فعالیت",
      description: "افتتاح اولین نمایشگاه تخصصی لوستر",
    },
    {
      year: "۱۳۹۰",
      title: "نوآوری در طراحی",
      description: "معرفی مجموعه طرح‌های مدرن و کلاسیک",
    },
    {
      year: "۱۴۰۲",
      title: "رهبر بازار",
      description: "تبدیل شدن به برند برتر در صنعت روشنایی لوکس",
    },
  ];

  const teamMembers = [
    {
      name: "استاد محمد احمدی",
      role: "استادکار ارشد",
      bio: "۳۰ سال تجربه در طراحی و ساخت لوستر",
      image: "/assets/images/fade1.jpg",
    },
    {
      name: "مهندس سارا کریمی",
      role: "طراح ارشد",
      bio: "متخصص در طراحی‌های مدرن و تلفیقی",
      image: "/assets/images/fade1.jpg",
    },
    {
      name: "استاد رضا محمدی",
      role: "مدیر تولید",
      bio: "کارشناس ارشد در فرآیند ساخت و کنترل کیفیت",
      image: "/assets/images/fade1.jpg",
    },
  ];

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
