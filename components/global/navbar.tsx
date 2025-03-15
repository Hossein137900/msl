"use client";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BsCart3 } from "react-icons/bs";
import { BiSearch, BiMenu, BiX, BiChevronDown } from "react-icons/bi";
import { FaUserCircle, FaSignOutAlt, FaUserPlus } from "react-icons/fa";
import { RiLoginBoxLine, RiUserSettingsLine } from "react-icons/ri";

import Link from "next/link";
import Image from "next/image";
import { navItems } from "@/lib/navbarData";
import { usePathname, useRouter } from "next/navigation";

export interface Category {
  _id: string;
  title: string;
  children: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}
interface User {
  username: string;
  role: string;
}

export interface CategoryResponse {
  success: boolean;
  data: Category[];
}

const Navbar = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileDropdown, setMobileDropdown] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobileAuthOpen, setIsMobileAuthOpen] = useState(false);
  const [userData, setUserData] = useState<User | null>(null);
  const [isAuthDropdownOpen, setIsAuthDropdownOpen] = useState(false);
  const pathname = usePathname();

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
      console.log(data);

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
  // Add this useEffect after other useEffects
  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");

      if (token) {
        try {
          const response = await fetch("/api/auth/id", {
            method: "GET",
            cache: "default",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              token: token,
            },
          });

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const contentType = response.headers.get("content-type");
          if (!contentType || !contentType.includes("application/json")) {
            throw new TypeError("Response was not JSON");
          }

          const data = await response.json();
          console.log(data);
          setUserData(data);
        } catch (error) {
          console.error("Error fetching user data:", error);
          localStorage.removeItem("token");
          setUserData(null);
        }
      }
    };

    fetchUserData();
  }, []);
  const handleProfileClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (userData?.role === "admin") {
      router.push("/admin");
    } else {
      router.push("/dashboard");
    }
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    setUserData(null);
    setIsAuthDropdownOpen(false);
  };

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 40);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Toggle functions
  const toggleMobileMenu = () => {
    setIsOpen((prev) => !prev);
  };
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

  const handleCategoryHover = useCallback((_id: string) => {
    setActiveCategory(_id); // Use _id instead of id
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
      className={`fixed z-[9999] top-4 right-2 left-2  lg:right-20 lg:left-20 rounded-lg px-6 py-4 transition-all duration-300 ${
        isScrolled ? "bg-[#a37462]/80" : "bg-transparent"
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
          ${isScrolled ? "text-[#e5d8d0]" : "text-[#e5d8d0]"}
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
                <>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{
                      opacity: activeDropdown === "محصولات" ? 1 : 0,
                      y: activeDropdown === "محصولات" ? 0 : 30,
                    }}
                    transition={{ duration: 0.3 }}
                    className="absolute top-12 -right-10 w-[800px] bg-[#fff]/10 backdrop-blur-md z-[9999] border border-[#a37462] rounded-lg shadow-2xl"
                    style={{
                      pointerEvents:
                        activeDropdown === "محصولات" ? "auto" : "none",
                    }}
                  >
                    <div className="flex h-[400px]">
                      <div className="w-1/3 border-l border-white/20 bg-white/5">
                        {!isLoading &&
                          categories.map((category, idx) => (
                            <motion.div
                              key={idx}
                              onMouseEnter={() =>
                                handleCategoryHover(category._id)
                              }
                              whileHover={{
                                backgroundColor: "rgba(255,255,255,0.15)",
                              }}
                              className={`px-6 py-4 cursor-pointer transition-all duration-300
      ${
        activeCategory === category._id
          ? "bg-white/10 border-r-4 border-[#a37462]"
          : ""
      }`}
                            >
                              <h3 className="text-[#a37462] font-bold text-lg">
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
                                      (c) => c._id === activeCategory
                                    )?.title
                                  }
                                </h4>
                                <div className="space-y-3">
                                  {!isLoading &&
                                    categories
                                      .find((c) => c._id === activeCategory)
                                      ?.children.map((child, idx) => (
                                        <Link
                                          href={`/store?category=${child}`}
                                          key={idx}
                                        >
                                          <motion.div
                                            key={idx}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: idx * 0.1 }}
                                            className="text-gray-50 hover:text-white 
                                            cursor-pointer py-1 px-2 rounded
                                            hover:bg-white/10 transition-all duration-200"
                                          >
                                            {child}
                                          </motion.div>
                                        </Link>
                                      ))}
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
                </>
              )}
            </motion.div>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-6">
          <div className="relative group">
            <input
              type="text"
              placeholder="جستجو ..."
              className="w-64 px-4 py-2.5 rounded-lg
        backdrop-blur-sm placeholder:text-[#e5d8d0]
        border-2 border-[#a37462]/30 
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
        text-[#e5d8d0]/70 hover:bg-[#a37462] 
        hover:text-white transition-all duration-300
        hover:shadow-lg"
            >
              <BsCart3 size={24} />
            </motion.div>
          </Link>
          {/* User Auth Section - Desktop */}
          <div className="relative">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 cursor-pointer p-2 rounded-lg hover:bg-white/10"
              onClick={() => setIsAuthDropdownOpen(!isAuthDropdownOpen)}
            >
              <FaUserCircle className="text-[#e5d8d0] text-2xl" />
              <span className="text-[#e5d8d0]">
                {userData?.username ? userData?.username : "ورود"}
              </span>
            </motion.div>

            <AnimatePresence>
              {isAuthDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-12 right-0 w-48 bg-white/10 backdrop-blur-md 
        border border-[#a37462] rounded-lg shadow-xl overflow-hidden"
                >
                  {userData ? (
                    <>
                      <Link href="/dashboard">
                        <motion.div
                          whileHover={{
                            backgroundColor: "rgba(255,255,255,0.1)",
                          }}
                          onClick={handleProfileClick}
                          className="px-4 py-3 text-[#e5d8d0] hover:text-white flex items-center gap-2"
                        >
                          <RiUserSettingsLine />
                          پروفایل
                        </motion.div>
                      </Link>
                      <motion.div
                        whileHover={{
                          backgroundColor: "rgba(255,255,255,0.1)",
                        }}
                        className="px-4 py-3 text-[#e5d8d0] hover:text-white cursor-pointer flex items-center gap-2"
                        onClick={handleLogout}
                      >
                        <FaSignOutAlt />
                        خروج
                      </motion.div>
                    </>
                  ) : (
                    <>
                      <Link href="/auth">
                        <motion.div
                          whileHover={{
                            backgroundColor: "rgba(255,255,255,0.1)",
                          }}
                          className="px-4 py-3 text-[#e5d8d0] hover:text-white flex items-center gap-2"
                        >
                          <RiLoginBoxLine />
                          ورود
                        </motion.div>
                      </Link>
                      <Link href="/auth">
                        <motion.div
                          whileHover={{
                            backgroundColor: "rgba(255,255,255,0.1)",
                          }}
                          className="px-4 py-3 text-[#e5d8d0] hover:text-white flex items-center gap-2"
                        >
                          <FaUserPlus />
                          ثبت نام
                        </motion.div>
                      </Link>
                    </>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
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
            {/* User Auth Section - Mobile */}
            <motion.div className="border-t border-[#a37462]/30 mt-2 pt-2">
              <div
                className="p-4 flex items-center gap-3 cursor-pointer"
                onClick={() => setIsMobileAuthOpen(!isMobileAuthOpen)}
              >
                <FaUserCircle className="text-[#e5d8d0] text-2xl" />
                <span className="text-[#e5d8d0]">
                  {userData?.username ? userData.username : "حساب کاربری"}
                </span>
              </div>

              <AnimatePresence>
                {isMobileAuthOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="px-4 pb-4 space-y-2 overflow-hidden"
                  >
                    {/* Your existing auth content */}
                    {userData ? (
                      <>
                        <Link href="/profile">
                          <motion.div
                            whileHover={{
                              backgroundColor: "rgba(255,255,255,0.1)",
                            }}
                            onClick={handleProfileClick}
                            className="px-4 py-2 rounded-lg text-[#e5d8d0] hover:text-white text-sm flex items-center gap-2"
                          >
                            <RiUserSettingsLine />
                            پروفایل
                          </motion.div>
                        </Link>
                        <motion.div
                          whileHover={{
                            backgroundColor: "rgba(255,255,255,0.1)",
                          }}
                          className="px-4 py-2 rounded-lg text-[#e5d8d0] hover:text-white text-sm cursor-pointer flex items-center gap-2"
                          onClick={handleLogout}
                        >
                          <FaSignOutAlt />
                          خروج
                        </motion.div>
                      </>
                    ) : (
                      <>
                        <Link href="/login">
                          <motion.div
                            whileHover={{
                              backgroundColor: "rgba(255,255,255,0.1)",
                            }}
                            className="px-4 py-2 rounded-lg text-[#e5d8d0] hover:text-white text-sm flex items-center gap-2"
                          >
                            <RiLoginBoxLine />
                            ورود
                          </motion.div>
                        </Link>
                        <Link href="/register">
                          <motion.div
                            whileHover={{
                              backgroundColor: "rgba(255,255,255,0.1)",
                            }}
                            className="px-4 py-2 rounded-lg text-[#e5d8d0] hover:text-white text-sm flex items-center gap-2"
                          >
                            <FaUserPlus />
                            ثبت نام
                          </motion.div>
                        </Link>
                      </>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

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
                      <Link href={item.href} className="block text-[#e5d8d0]  ">
                        {item.title}
                      </Link>
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
                          {!isLoading &&
                            categories.map((category, idx) => (
                              <div key={idx}>
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
