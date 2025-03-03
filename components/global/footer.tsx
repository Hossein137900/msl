"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { contactInfo, quickLinks, socialLinks } from "../../lib/footerData";
import { usePathname } from "next/navigation";
const Footer = () => {
  const pathname = usePathname();
  if (pathname === "/dashboard") {
    return null;
  }
  return (
    <footer
      className="bg-[#1a1a1a]/70 border-t border-[#a37462] text-white"
      dir="rtl"
    >
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
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
            <div className="space-y-4">
              {contactInfo.map((info) => (
                <div
                  key={info.label}
                  className="flex items-start space-x-3 rtl:space-x-reverse"
                >
                  <info.icon className="w-5 h-5 text-[#a37462] mt-1" />
                  <div>
                    <p className="text-sm text-[#e5d8d0]">{info.label}</p>
                    <p className="text-gray-300">{info.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Map Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="w-full h-[200px] rounded-lg overflow-hidden shadow-md"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=YOUR_MAP_EMBED_URL"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="hover:opacity-90 transition-opacity duration-300"
            />
          </motion.div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#333]">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} تمامی حقوق محفوظ است
            </p>
            <div className="flex space-x-4 rtl:space-x-reverse mt-4 md:mt-0">
              <Link
                href="/privacy"
                className="text-gray-400 hover:text-[#e5d8d0] text-sm transition-colors duration-300"
              >
                حریم خصوصی
              </Link>
              <Link
                href="/terms"
                className="text-gray-400 hover:text-[#e5d8d0] text-sm transition-colors duration-300"
              >
                قوانین و مقررات
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
