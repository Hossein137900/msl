"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BiSearch, BiSun, BiMoon, BiMenu, BiX } from "react-icons/bi";
import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navItems = [
    { title: "صفحه اصلی", href: "/" },
    { title: "محصولات", href: "/products" },
    { title: "پروژه ها", href: "/projects" },
    { title: "مشاوره", href: "/consultation" },
    { title: "درباره ما", href: "/about" },
    { title: "تماس با ما", href: "/contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{
        opacity: 1,
        y: 0,
        borderColor: isScrolled
          ? "rgba(255, 255, 255, 0.2)"
          : "rgba(255, 255, 255, 0)",
        borderWidth: isScrolled ? "1px" : "0px",
      }}
      transition={{
        duration: 0.4,
        ease: "easeInOut",
        borderColor: { duration: 0.3 },
        borderWidth: { duration: 0.3 },
      }}
      dir="rtl"
      className={`fixed z-[9999] top-4 right-2 left-2 lg:right-20 lg:left-20 rounded-3xl px-6 py-4 transition-all duration-300 ${
        isScrolled ? "bg-white/10 backdrop-blur-md shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* right Side - Theme Toggle */}

        <Image
          src="/assets/images/logo.png"
          alt="Logo"
          width={50}
          height={50}
        />

        {/* Center - Nav Items */}
        <div className="hidden md:flex items-center space-x-8 rtl:space-x-reverse">
          {navItems.map((item) => (
            <motion.div key={item.title} className="relative group">
              <Link href={item.href}>
                <span className="text-gray-200 hover:text-gray-50 relative pb-2 transition-colors duration-300 after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-white after:transform after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left">
                  {item.title}
                </span>
              </Link>
              <motion.div
                className="absolute bottom-0 left-0 w-full h-0.5"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
              />
            </motion.div>
          ))}
        </div>

        {/* left Side - Search */}
        <div className="relative hidden lg:block">
          <input
            type="text"
            placeholder="جستجو ..."
            className="w-64 px-4 py-2 rounded-full backdrop-blur-sm placeholder:text-gray-50 border border-gray-400 bg-transparent text-gray-50  focus:outline-none"
          />
          <BiSearch
            className="absolute text-gray-100 left-3 top-1/2 transform -translate-y-1/2"
            size={20}
          />
        </div>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsDark(!isDark)}
          className="p-2 rounded-full hidden text-white hover:bg-gray-700 lg:block  bg-gray-600 "
        >
          {isDark ? <BiSun size={24} /> : <BiMoon size={24} />}
        </motion.button>

        {/* Mobile Menu Button */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 "
        >
          {isOpen ? <BiX size={24} /> : <BiMenu size={24} />}
        </motion.button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            <div className="flex items-center justify-between lg:hidden">
              <div className="relative  block lg:hidden ">
                <input
                  type="text"
                  placeholder="جستجو..."
                  className="w-64 px-4 py-2 rounded-full bg-gray-100  focus:outline-none focus:ring-2 "
                />
                <BiSearch
                  className="absolute text-gray-800 left-3 top-1/2 transform -translate-y-1/2"
                  size={20}
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsDark(!isDark)}
                className="p-2 rounded-full block lg:hidden  bg-gray-800 "
              >
                {isDark ? <BiSun size={24} /> : <BiMoon size={24} />}
              </motion.button>
            </div>
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white/30 backdrop-blur-md border border-gray-500  mt-4 rounded-2xl overflow-hidden"
            >
              {navItems.map((item) => (
                <motion.div
                  key={item.title}
                  whileHover={{ backgroundColor: "rgba(0,0,0,0.05)" }}
                  className="p-4"
                >
                  <Link href={item.href}>
                    <span className="block text-gray-50 ">{item.title}</span>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
