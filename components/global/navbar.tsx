"use client";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BsCart3 } from "react-icons/bs";
import { BiSearch, BiMenu, BiX, BiChevronDown } from "react-icons/bi";
import Link from "next/link";
import Image from "next/image";
import { navItems } from "@/lib/navbarData";
import { usePathname } from "next/navigation";
import { getCategories } from "@/lib/category";

export interface Category {
  id: string;
  title: string;
  children: string[];
}

export interface CategoryResponse {
  success: boolean;
  data: Category[];
}

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileDropdown, setMobileDropdown] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();

  // Fetch categories on component mount
  const fetchCategories = async () => {
    const data = await getCategories();

    setIsLoading(true);

    if (data.success && data.data) {
      setIsLoading(false);
      setCategories(data.data);
    }
  };

  console.log(categories);

  useEffect(() => {
    fetchCategories();
  }, []);

  // Optimize scroll handler with useCallback
  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 40);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Toggle functions
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

  const handleCategoryHover = useCallback((id: string) => {
    setActiveCategory(id);
  }, []);

  if (pathname === "/dashboard") {
    return null;
  }

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
        isScrolled
          ? "bg-white/10 backdrop-blur-md shadow-lg"
          : "bg-[#a37462]/40 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Image
          src="/assets/images/logo.png"
          alt="Logo"
          width={50}
          height={50}
          className="my-auto"
        />

        {/* Desktop Nav Items */}
        <div className="hidden md:flex items-center space-x-10 rtl:space-x-reverse">
          {navItems.map((item) => (
            <motion.div
              key={item.title}
              className="relative group"
              onMouseEnter={() => handleMouseEnter(item.title)}
              onMouseLeave={handleMouseLeave}
            >
              <Link href={item.href}>
                <span
                  className={`
          relative py-2 px-3 rounded-lg
          ${isScrolled ? "text-[#a37462]" : "text-[#e5d8d0]"}
          hover:bg-white/10 hover:text-white
          transition-all duration-300 
          flex items-center gap-2
          before:absolute before:bottom-0 before:left-0 before:w-0 
          before:h-0.5 before:bg-[#a37462] 
          before:transition-all before:duration-300
          group-hover:before:w-full
        `}
                >
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
                    y: activeDropdown === "محصولات" ? 0 : 30,
                  }}
                  transition={{ duration: 0.3 }}
                  className="absolute top-12 -right-10 w-[800px]
                  shadow-2xl
                  bg-[#a37462]/80
                  border border-white/10 rounded-2xl
                  overflow-hidden z-50"
                  style={{
                    pointerEvents:
                      activeDropdown === "محصولات" ? "auto" : "none",
                  }}
                >
                  <div className="flex h-[400px]">
                    <div className="w-1/3 border-l border-white/20 bg-white/5">
                      {categories.map((category) => (
                        <motion.div
                          key={category.id}
                          onMouseEnter={() => handleCategoryHover(category.id)}
                          whileHover={{
                            backgroundColor: "rgba(255,255,255,0.15)",
                          }}
                          className={`px-6 py-4 cursor-pointer transition-all duration-300
        ${
          activeCategory === category.id
            ? "bg-white/20 border-r-4 border-[#a37462]"
            : ""
        }`}
                        >
                          <h3 className="text-[#fff] font-medium text-lg">
                            {category.title}
                          </h3>
                        </motion.div>
                      ))}
                    </div>

                    <div className="w-2/3 p-8">
                      <AnimatePresence mode="wait">
                        {activeCategory && (
                          <motion.div
                            key={activeCategory}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.2 }}
                            className="flex h-full gap-8"
                          >
                            <div className="w-1/2">
                              <h4 className="text-[#fff] text-xl font-bold mb-6">
                                {
                                  categories.find(
                                    (c) => c.id === activeCategory
                                  )?.title
                                }
                              </h4>
                              <div className="space-y-3">
                                {categories
                                  .find((c) => c.id === activeCategory)
                                  ?.children.map(
                                    (child, idx) => (
                                      console.log(child, "ccccccccccccccccc"),
                                      (
                                        <motion.div
                                          key={idx}
                                          initial={{ opacity: 0, x: -10 }}
                                          animate={{ opacity: 1, x: 0 }}
                                          transition={{ delay: idx * 0.1 }}
                                          className="text-gray-900 hover:text-white 
                                cursor-pointer py-1 px-2 rounded
                                hover:bg-white/10 transition-all duration-200"
                                        >
                                          {child}
                                        </motion.div>
                                      )
                                    )
                                  )}
                              </div>
                            </div>

                            <div className="w-1/2">
                              <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="relative h-48 w-full rounded-xl overflow-hidden
                          shadow-lg transform hover:scale-105 transition-transform duration-300"
                              >
                                <Image
                                  src="/assets/images/fade3.jpg"
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

        <div className="hidden lg:flex items-center gap-6">
          <div className="relative group">
            <input
              type="text"
              placeholder="جستجو ..."
              className="w-64 px-4 py-2.5 rounded-full
        backdrop-blur-sm placeholder:text-[#e5d8d0]/70
        border-2 border-[#e5d8d0]/30 
        bg-white/5 text-[#e5d8d0]
        focus:outline-none focus:border-[#a37462]
        transition-all duration-300"
            />
            <BiSearch
              className="absolute text-[#e5d8d0] left-3 top-1/2 
        transform -translate-y-1/2 group-hover:scale-110
        transition-transform duration-200"
              size={20}
            />
          </div>

          <Link href="/cart">
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2.5 rounded-full bg-white/10
        text-[#e5d8d0] hover:bg-[#a37462] 
        hover:text-white transition-all duration-300
        hover:shadow-lg"
            >
              <BsCart3 size={24} />
            </motion.div>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={toggleMobileMenu}
          className="md:hidden p-2 rounded-lg text-[#e5d8d0] bg-white/10 backdrop-blur-sm"
          aria-label="Toggle navbar"
        >
          {isOpen ? <BiX size={24} /> : <BiMenu size={24} />}
        </motion.button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Mobile Nav Items */}
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-[#a37462]/10 backdrop-blur-md border border-[#a37462] mt-4 rounded-2xl overflow-y-auto max-h-[70vh]"
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
                      <span className="block text-[#e5d8d0]  ">
                        {item.title}
                      </span>
                      {item.title === "محصولات" && (
                        <motion.div
                          animate={{
                            rotate: mobileDropdown === "محصولات" ? 180 : 0,
                          }}
                          transition={{ duration: 0.2 }}
                        >
                          <BiChevronDown className="text-xl text-[#e5d8d0]" />
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
                        <div className="mt-2 space-y-1 border-r-2 border-[#a37462] touch-pan-y">
                          {categories.map((category) => (
                            <div key={category.id}>
                              <motion.div
                                whileHover={{
                                  backgroundColor: "rgba(255,255,255,0.1)",
                                }}
                                className="pr-4 py-3 text-[#a37462] text-sm hover:text-white font-semibold"
                              >
                                {category.title}
                              </motion.div>
                              <div className="pr-8 space-y-2">
                                {category.children.map((child, idx) => (
                                  <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.05 }}
                                    className="text-[#e5d8d0] text-xs hover:text-white cursor-pointer py-1"
                                  >
                                    {child}
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
