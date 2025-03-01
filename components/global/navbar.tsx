"use client";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BiSearch,
  BiSun,
  BiMoon,
  BiMenu,
  BiX,
  BiChevronDown,
} from "react-icons/bi";
import Link from "next/link";
import Image from "next/image";
import { megaMenuCategories, navItems } from "@/lib/navbarData";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileDropdown, setMobileDropdown] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<number | null>(null);

  // Optimize scroll handler with useCallback
  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 20);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Toggle functions
  const toggleDarkMode = () => setIsDark((prev) => !prev);
  const toggleMobileMenu = () => setIsOpen((prev) => !prev);
  const toggleMobileDropdown = (title: string) => {
    setMobileDropdown((prev) => (prev === title ? null : title));
  };

  // Memoized dropdown handlers
  const handleMouseEnter = useCallback((title: string) => {
    if (title === "محصولات") setActiveDropdown(title);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setActiveDropdown(null);
  }, []);

  const handleCategoryHover = useCallback((id: number) => {
    setActiveCategory(id);
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
        {/* Logo */}
        <Image
          src="/assets/images/logo.png"
          alt="Logo"
          width={50}
          height={50}
          className="my-auto "
        />

        {/* Desktop Nav Items */}
        <div className="hidden md:flex items-center space-x-8 rtl:space-x-reverse">
          {navItems.map((item) => (
            <motion.div
              key={item.title}
              className="relative group"
              onMouseEnter={() => handleMouseEnter(item.title)}
              onMouseLeave={handleMouseLeave}
            >
              <Link href={item.href}>
                <span className="text-gray-200 hover:text-gray-50 relative  transition-colors duration-300 flex items-center gap-1">
                  {item.title}
                  {item.title === "محصولات" && (
                    <motion.div
                      animate={{
                        rotate: activeDropdown === "محصولات" ? 180 : 0,
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      <BiChevronDown className="text-xl" />
                    </motion.div>
                  )}
                </span>
              </Link>

              {/* Mega Menu Dropdown */}
              {item.title === "محصولات" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{
                    opacity: activeDropdown === "محصولات" ? 1 : 0,
                    y: activeDropdown === "محصولات" ? 0 : 10,
                  }}
                  transition={{ duration: 0.3 }}
                  className="absolute top-4 -right-10 mt-2 w-[800px] bg-white/10 backdrop-blur-md shadow-2xl border border-gray-200/20 rounded-2xl"
                  style={{
                    pointerEvents:
                      activeDropdown === "محصولات" ? "auto" : "none",
                    backdropFilter: "blur(12px)",
                  }}
                >
                  <div className="flex h-[400px]">
                    {/* Categories sidebar */}
                    <div className="w-1/3 border-l border-gray-200/20">
                      {megaMenuCategories.map((category) => (
                        <motion.div
                          key={category.id}
                          onMouseEnter={() => handleCategoryHover(category.id)}
                          whileHover={{
                            backgroundColor: "rgba(255,255,255,0.1)",
                          }}
                          className={`px-6 py-4 cursor-pointer transition-colors duration-300 ${
                            activeCategory === category.id ? "bg-white/20" : ""
                          }`}
                        >
                          <h3 className="text-white font-semibold text-lg">
                            {category.title}
                          </h3>
                        </motion.div>
                      ))}
                    </div>

                    {/* Category content */}
                    <div className="w-2/3 p-6">
                      <AnimatePresence mode="wait">
                        {activeCategory && (
                          <motion.div
                            key={activeCategory}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.2 }}
                            className="flex h-full"
                          >
                            <div className="w-1/2">
                              <h4 className="text-yellow-400 font-bold mb-4">
                                {
                                  megaMenuCategories.find(
                                    (c) => c.id === activeCategory
                                  )?.title
                                }
                              </h4>
                              <div className="space-y-2">
                                {megaMenuCategories
                                  .find((c) => c.id === activeCategory)
                                  ?.products.map((product, idx) => (
                                    <motion.div
                                      key={idx}
                                      initial={{ opacity: 0, x: -10 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{ delay: idx * 0.1 }}
                                      className="text-gray-200 hover:text-white cursor-pointer"
                                    >
                                      {product}
                                    </motion.div>
                                  ))}
                              </div>
                            </div>

                            <div className="w-1/2">
                              <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="relative h-48 w-full rounded-xl overflow-hidden"
                              >
                                <Image
                                  src={
                                    megaMenuCategories.find(
                                      (c) => c.id === activeCategory
                                    )?.image || ""
                                  }
                                  alt="Category"
                                  fill
                                  className="object-cover"
                                />
                              </motion.div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Desktop Search & Theme Toggle */}
        <div className="hidden lg:flex items-center gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="جستجو ..."
              className="w-64 px-4 py-2 rounded-full backdrop-blur-sm placeholder:text-gray-50 border border-gray-400 bg-transparent text-gray-50 focus:outline-none"
            />
            <BiSearch
              className="absolute text-gray-100 left-3 top-1/2 transform -translate-y-1/2"
              size={20}
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleDarkMode}
            className="p-2 rounded-full text-white hover:bg-gray-700 bg-gray-600"
            aria-label="Toggle Theme"
          >
            {isDark ? <BiSun size={24} /> : <BiMoon size={24} />}
          </motion.button>
        </div>

        {/* Mobile Menu Button */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={toggleMobileMenu}
          className="md:hidden p-2 rounded-lg text-white bg-white/20 backdrop-blur-sm"
          aria-label="Toggle navbar"
        >
          {isOpen ? <BiX size={24} /> : <BiMenu size={24} />}
        </motion.button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Mobile Search & Theme Toggle */}
            <div className="flex items-center justify-between mt-4 lg:hidden">
              <div className="relative block">
                <input
                  type="text"
                  placeholder="جستجو..."
                  className="w-64 px-4 py-2 rounded-full bg-gray-100 focus:outline-none focus:ring-2"
                />
                <BiSearch
                  className="absolute text-gray-800 left-3 top-1/2 transform -translate-y-1/2"
                  size={20}
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleDarkMode}
                className="p-2 rounded-full bg-gray-800"
                aria-label="Toggle Theme"
              >
                {isDark ? <BiSun size={24} /> : <BiMoon size={24} />}
              </motion.button>
            </div>

            {/* Mobile Nav Items */}
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white/10 backdrop-blur-md border border-gray-500 mt-4 rounded-2xl overflow-y-auto max-h-[70vh]"
            >
              {navItems.map((item) => (
                <motion.div key={item.title}>
                  <motion.div
                    whileHover={{ backgroundColor: "rgba(0,0,0,0.05)" }}
                    className="p-4"
                  >
                    <div
                      className="flex items-center justify-between cursor-pointer"
                      onClick={() =>
                        item.title === "محصولات" &&
                        toggleMobileDropdown("محصولات")
                      }
                    >
                      <span className="block text-gray-50">{item.title}</span>
                      {item.title === "محصولات" && (
                        <motion.div
                          animate={{
                            rotate: mobileDropdown === "محصولات" ? 180 : 0,
                          }}
                          transition={{ duration: 0.2 }}
                        >
                          <BiChevronDown className="text-xl text-gray-50" />
                        </motion.div>
                      )}
                    </div>

                    {/* Mobile Dropdown Content */}
                    {item.title === "محصولات" && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{
                          height: mobileDropdown === "محصولات" ? "auto" : 0,
                          opacity: mobileDropdown === "محصولات" ? 1 : 0,
                        }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="mt-2 space-y-1 border-r-2 border-yellow-500/50 touch-pan-y">
                          {megaMenuCategories.map((category) => (
                            <div key={category.id}>
                              <motion.div
                                whileHover={{
                                  backgroundColor: "rgba(255,255,255,0.1)",
                                }}
                                className="pr-4 py-3 text-gray-200 text-sm hover:text-white font-semibold"
                              >
                                {category.title}
                              </motion.div>
                              <div className="pr-8 space-y-2">
                                {category.products.map((product, idx) => (
                                  <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.05 }}
                                    className="text-gray-300 text-xs hover:text-white cursor-pointer py-1"
                                  >
                                    {product}
                                  </motion.div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
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
