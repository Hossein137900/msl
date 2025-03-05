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

export interface CategoryResponse {
  success: boolean;
  data: Category[];
}
const Footer = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  // Fetch categories on component mount
  // const fetchCategories = async () => {
  //   // const data = await getCategories();

  //   setIsLoading(true);

  //   if (data.success && data.data) {
  //     setIsLoading(false);
  //     setCategories(data.data);
  //   }
  // };

  // useEffect(() => {
  //   fetchCategories();
  // }, []);
  const pathname = usePathname();
  if (pathname === "/dashboard") {
    return null;
  }
  return (
    <footer
      className="bg-gradient-to-b from-transparent via-black/70 to-black border-t border-[#a37462] text-white"
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
              categories.map((category) => (
                <div
                  key={category.id}
                  className="bg-[#252525]/5 p-6 rounded-lg hover:bg-[#2a2a2a]/50 transition-all duration-300"
                >
                  <Link
                    href={`/category/${category.id}`}
                    className="text-[#e5d8d0] hover:text-[#a37462] font-bold text-lg mb-4 block border-b border-[#a37462]/50 pb-2"
                  >
                    {category.title}
                  </Link>
                  <div className="space-y-2 mt-3">
                    {category.children.map((child, index) => (
                      <Link
                        key={index}
                        href={`/category/${category.id}/${child}`}
                        className="text-gray-300 hover:text-[#e5d8d0] text-sm block transition-all duration-300 hover:translate-x-2"
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
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 border-t border-[#333] pt-8">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <Image
              src="/assets/images/logo.png"
              alt="MSL Logo"
              width={60}
              height={60}
              className="mb-4"
            />
            <p className="text-[#e5d8d0] leading-relaxed">
              برترین تولید کننده لوستر و چراغ‌های تزئینی با بیش از ۳۰ سال تجربه
              در ارائه محصولات لوکس و سفارشی
            </p>
            <div className="flex space-x-4 rtl:space-x-reverse">
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
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
                    className="text-[#e5d8d0] hover:text-[#a37462] transition-colors duration-300 flex items-center group"
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
                  <span className="w-6 h-6 text-[#a37462] group-hover:text-[#e5d8d0] transition-colors duration-300">
                    <info.icon />
                  </span>

                  <div>
                    <p className="text-sm text-[#e5d8d0] font-medium">
                      {info.label}
                    </p>
                    <div className="text-gray-300 hover:text-[#e5d8d0] transition-colors duration-300 mt-1">
                      {info.isLink ? (
                        <Link href={info.href || "#"}>{info.value}</Link>
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

      {/* Keep existing bottom bar */}
    </footer>
  );
};

export default Footer;
