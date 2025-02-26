"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BiSearch, BiSun, BiMoon, BiMenu, BiX } from "react-icons/bi";
import Link from "next/link";
import Image from "next/image";
import { BiChevronDown } from "react-icons/bi";
import { megaMenuCategories, navItems } from "@/lib/navbarData";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileDropdown, setMobileDropdown] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<number | null>(null);

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
            <motion.div
              key={item.title}
              className="relative group"
              onMouseEnter={() =>
                item.title === "محصولات" && setActiveDropdown(item.title)
              }
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link href={item.href}>
                <span className="text-gray-200 hover:text-gray-50 relative pb-2 transition-colors duration-300 flex items-center gap-1">
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
              {item.title === "محصولات" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{
                    opacity: activeDropdown === "محصولات" ? 1 : 0,
                    y: activeDropdown === "محصولات" ? 0 : 10,
                  }}
                  transition={{ duration: 0.3 }}
                  className="absolute top-full -right-10 mt-2 w-[800px] bg-white/10 backdrop-blur-md shadow-2xl border border-gray-200/20 overflow-hidden rounded-2xl"
                  style={{
                    pointerEvents:
                      activeDropdown === "محصولات" ? "auto" : "none",
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    backdropFilter: "blur(12px)",
                  }}
                >
                  <div className="flex h-[400px]">
                    <div className="w-1/3 border-l border-gray-200/20">
                      {megaMenuCategories.map((category) => (
                        <motion.div
                          key={category.id}
                          onMouseEnter={() => setActiveCategory(category.id)}
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
          aria-label="Toggle Theme"
        >
          {isDark ? <BiSun size={24} /> : <BiMoon size={24} />}
        </motion.button>

        {/* Mobile Menu Button */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 "
          aria-label="Toggle navbar"
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
                aria-label="Toggle Theme"
              >
                {isDark ? <BiSun size={24} /> : <BiMoon size={24} />}
              </motion.button>
            </div>
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white/30 backdrop-blur-md border border-gray-500 mt-4 rounded-2xl overflow-y-auto max-h-[70vh]"
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
                        item.title === "محصولات"
                          ? setMobileDropdown(
                              mobileDropdown === "محصولات" ? null : "محصولات"
                            )
                          : null
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
                                    transition={{ delay: idx * 0.1 }}
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
