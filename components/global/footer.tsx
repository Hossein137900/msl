"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { contactInfo, quickLinks, socialLinks } from "../../lib/footerData";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export interface Category {
  id: string;
  title: string;
  children: string[];
}

const Footer = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const fetchCategories = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/category", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();

      if (data) {
        setCategories(data.categories);
      }
    } catch (error) {
      console.log("Error fetching categories:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);
  const pathname = usePathname();
  if (pathname === "/dashboard") {
    return null;
  }
  return (
    <footer
      className="bg-gradient-to-b from-[#a37462] via-[#a37462] to-[#a37462] border-t border-[#a37462] text-white"
      dir="rtl"
    >
      <div className="container mx-auto px-4 pt-16 pb-8">
        {/* Categories Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold mb-8 relative text-[#e5d8d0] text-center">
            دسته‌بندی محصولات
            <span className="absolute bottom-0 right-1/2 transform translate-x-1/2 top-10 w-20 h-0.5 bg-[#e5d8d0]"></span>
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 justify-center gap-8">
            {!isLoading &&
              categories.map((category, idx) => (
                <div
                  key={idx}
                  className="bg-[#252525]/5 p-6 border border-white/50 rounded-lg hover:bg-[#2a2a2a]/10 transition-all duration-300"
                >
                  <Link
                    aria-label={`Browse ${category.title} category`}
                    href={`/category/${category.id}`}
                    className="text-[#e5d8d0] hover:text-[#fff] font-bold text-lg mb-4 block border-b border-[#fff]/50 pb-2"
                  >
                    {category.title}
                  </Link>
                  <div className="space-y-2 mt-3">
                    {category.children.map((child, index) => (
                      <Link
                        key={index}
                        aria-label={`View ${child} in ${category.title}`}
                         href={`/store?category=${child}`} 
                        className="text-gray-200 hover:text-[#e5d8d0] text-sm block transition-all duration-300 hover:translate-x-2"
                      >
                        {child}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
          </div>
        </motion.div>

        {/* Other Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 border-t border-[#fff]/50 pt-8">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <Link href="/" aria-label="Return to homepage">
              <Image
                src="/assets/images/logo.png"
                alt="MSL Logo - Luxury Lighting Solutions"
                width={60}
                height={60}
                className="mb-4"
              />
            </Link>
            <p className="text-[#e5d8d0] leading-relaxed">
              برترین تولید کننده لوستر و چراغ‌های تزئینی با بیش از ۳۰ سال تجربه
              در ارائه محصولات لوکس و سفارشی
            </p>
            <div className="flex space-x-4 rtl:space-x-reverse">
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  aria-label={`Visit our ${social.name} page`}
                  className="hover:text-[#e5d8d0] transform hover:scale-110 transition-all duration-300"
                >
                  <social.icon className="w-6 h-6" />
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <h3 className="text-xl font-bold mb-6 relative text-[#e5d8d0]">
              دسترسی سریع
              <span className="absolute bottom-0 top-8 right-0 w-12 h-0.5 bg-[#e5d8d0]"></span>
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-[#e5d8d0] hover:text-[#fff] transition-colors duration-300 flex items-center group"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-[#e5d8d0] ml-2 transition-all duration-300"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <h3 className="text-xl font-bold mb-6 relative text-[#e5d8d0]">
              اطلاعات تماس
              <span className="absolute bottom-0 top-8 right-0 w-12 h-0.5 bg-[#e5d8d0]"></span>
            </h3>
            <div className="space-y-6">
              {contactInfo.map((info) => (
                <div
                  key={info.label}
                  className="flex items-start space-x-3 rtl:space-x-reverse group"
                >
                  <span className="w-6 h-6 text-[#fff] group-hover:text-[#e5d8d0] transition-colors duration-300">
                    <info.icon />
                  </span>

                  <div>
                    <p className="text-sm text-[#e5d8d0] font-medium">
                      {info.label}
                    </p>
                    <div className="text-gray-300 hover:text-[#e5d8d0] transition-colors duration-300 mt-1">
                      {info.isLink ? (
                        <Link
                          aria-label={`Contact us via ${info.label}: ${info.value}`}
                          href={info.href || "#"}
                        >
                          {info.value}
                        </Link>
                      ) : (
                        <p>{info.value}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Map Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="relative w-full h-[250px] rounded-lg overflow-hidden shadow-lg group"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#1a1a1a]/20 group-hover:opacity-0 transition-opacity duration-300 z-10"></div>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3239.9627430847677!2d51.3847814!3d35.7007389!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzXCsDQyJzAyLjYiTiA1McKwMjMnMDUuMiJF!5e0!3m2!1sen!2s!4v1635000000000!5m2!1sen!2s"
              width="100%"
              title="Google Map"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="hover:scale-105 transition-transform duration-500"
            />
          </motion.div>
        </div>
      </div>

      <button
        onClick={scrollToTop}
        aria-label="Scroll to top"
        className={`fixed bottom-12 right-2 md:bottom-8 md:right-4 z-[9999] p-3 rounded-full bg-[#a37462] text-white shadow-xl transition-all duration-300 hover:bg-[#a37462]/80 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 10l7-7m0 0l7 7m-7-7v18"
          />
        </svg>
      </button>
    </footer>
  );
};

export default Footer;
