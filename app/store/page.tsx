"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiEye } from "react-icons/fi";
import { JsonValue } from "@prisma/client/runtime/library";
import {
  BiSearch,
  BiCategory,
  BiSort,
  BiReset,
  BiFilterAlt,
} from "react-icons/bi";
import { BiPackage } from "react-icons/bi";
interface ProductProps {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  image: string | null;
  description: string;
  slug: string;
  price: string;
  categoryId: {
    _id: string;
    title: string;
  };
  properties: JsonValue;
  videoes: string[];
  colors: JsonValue;
  thumbnails: string[];
  categoryChildren: string;
}
interface Category {
  _id: string;
  title: string;
  children: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}
const EmptyProducts = () => (
  <div className="flex flex-col items-center justify-center py-12 px-4">
    <BiPackage className="w-24 h-24 text-[#a37462] mb-4" />
    <h3 className="text-xl font-semibold text-gray-800 mb-2">
      محصولی یافت نشد
    </h3>
    <p className="text-gray-500 text-center">
      با معیارهای فیلتر انتخاب شده هیچ محصولی موجود نیست
    </p>
  </div>
);
function generateSlug(title: string) {
  return title
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\u0600-\u06FF\uFB8A\u067E\u0686\u06AF\u200C\u200Fa-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const Store = () => {
  const [products, setProducts] = useState<ProductProps[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductProps[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  const [filters, setFilters] = useState({
    search: "",
    category: "",
    minPrice: "",
    maxPrice: "",
    sort: "newest",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsRes, categoriesRes] = await Promise.all([
          fetch("/api/products"),
          fetch("/api/category"),
        ]);

        const productsData = await productsRes.json();
        const categoriesData = await categoriesRes.json();

        setProducts(productsData.products);
        setFilteredProducts(productsData.products);
        setCategories(categoriesData.categories);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleFilterChange = (name: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  // Apply filters whenever filter criteria changes
  const applyFilters = () => {
    let result = [...products];

    // Only apply filters if they have values
    if (filters.search) {
      result = result.filter((product) =>
        product.title.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    if (filters.category) {
      result = result.filter(
        (product) => product.categoryId._id === filters.category
      );
    }

    if (filters.minPrice) {
      result = result.filter(
        (product) => parseInt(product.price) >= parseInt(filters.minPrice)
      );
    }

    if (filters.maxPrice) {
      result = result.filter(
        (product) => parseInt(product.price) <= parseInt(filters.maxPrice)
      );
    }

    // Sorting
    switch (filters.sort) {
      case "price-low":
        result.sort((a, b) => parseInt(a.price) - parseInt(b.price));
        break;
      case "price-high":
        result.sort((a, b) => parseInt(b.price) - parseInt(a.price));
        break;
      case "newest":
        result.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
    }

    setFilteredProducts(result);
  };

  // Apply filters only when filter values change
  useEffect(() => {
    applyFilters();
  }, [filters]);

  return (
    <div
      className="px-4 py-8 bg-gradient-to-t from-[#e5d8d0] to-[#a37462] "
      dir="rtl"
    >
      <h2 className="md:text-3xl text-xl border-b pb-4 w-fit mx-auto border-[#e4e4e4] mt-24 font-bold text-center text-white/90 mb-8">
        محصولات ما
      </h2>
      {/* Filter Button for Mobile/Tablet */}
      <button
        onClick={() => setIsFilterModalOpen(true)}
        aria-label="Filter"
        className="absolute top-36 right-4 lg:hidden z-50 bg-[#a37462] text-white p-3 rounded-full shadow-lg hover:bg-[#8b6351] transition-colors duration-200"
      >
        <BiFilterAlt className="w-6 h-6" />
      </button>

      {/* Filter Section Desktop */}

      <div className="hidden lg:block bg-white p-2 rounded-lg shadow-sm mb-4">
        <div className="flex flex-col lg:flex-row items-center gap-2">
          {/* Search Input */}
          <div className="relative min-w-[200px] flex-1">
            <BiSearch className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
            <input
              type="text"
              placeholder="جستجوی محصول..."
              value={filters.search}
              onChange={(e) => handleFilterChange("search", e.target.value)}
              className="w-full pl-2 pr-8 py-2 text-sm border border-gray-100 rounded-md focus:ring-1 text-black focus:ring-[#a37462] focus:border-transparent outline-none transition-all"
            />
          </div>

          {/* Category Select */}
          <div className="relative min-w-[150px]">
            <BiCategory className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
            <select
              value={selectedCategory}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                setSelectedCategory(e.target.value);
                const filteredProducts = products.filter(
                  (product: ProductProps) =>
                    product.categoryChildren === e.target.value
                );
                setFilteredProducts(filteredProducts);
              }}
              className="w-full appearance-none pl-2 text-black text-sm pr-8 py-2 border border-gray-100 rounded-md focus:border-transparent outline-none transition-all bg-white"
            >
              <option value="">دسته‌بندی‌ها</option>
              {categories.map((category: Category) =>
                category.children.map((child: string, index: number) => (
                  <option key={`${category._id}-${index}`} value={child}>
                    {child}
                  </option>
                ))
              )}
            </select>
          </div>

          {/* Price Range Group */}

          {/* Sort Select */}
          <div className="relative min-w-[120px]">
            <BiSort className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
            <select
              value={filters.sort}
              onChange={(e) => handleFilterChange("sort", e.target.value)}
              className="w-full appearance-none pl-2 pr-8 text-black py-2 text-sm border border-gray-100 rounded-md focus:border-transparent outline-none transition-all bg-white"
            >
              <option value="newest">جدیدترین</option>
              <option value="price-low">ارزان‌ترین</option>
              <option value="price-high">گران‌ترین</option>
            </select>
          </div>
          <div className="flex  gap-2">
            <div className="relative flex-1">
              <input
                type="range"
                min={0}
                max={20000000000}
                value={filters.minPrice}
                onChange={(e) => handleFilterChange("minPrice", e.target.value)}
                className=" h-1 bg-gray-200 rounded appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-[#a37462] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer"
              />
              <div className="text-xs text-gray-500 mt-1 text-center">
                {Number(filters.minPrice).toLocaleString("fa-IR")} تومان
              </div>
            </div>
            <span className="text-gray-300">|</span>

            <div className="relative flex-1">
              <input
                type="range"
                min={0}
                max={100000000}
                value={filters.maxPrice}
                onChange={(e) => handleFilterChange("maxPrice", e.target.value)}
                className=" h-1 bg-gray-200 rounded appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-[#a37462] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer"
              />
              <div className="text-xs text-gray-500 mt-1 text-center">
                {Number(filters.maxPrice).toLocaleString("fa-IR")} تومان
              </div>
            </div>
            <div className="relative group">
              <button
                onClick={() => {
                  handleFilterChange("search", "");
                  handleFilterChange("category", "");
                  handleFilterChange("minPrice", "0");
                  handleFilterChange("maxPrice", "20000000000");
                  handleFilterChange("sort", "newest");
                  setSelectedCategory("");
                  setFilteredProducts(products);
                }}
                className="px-2 py-3.5 text-xs flex items-center gap-1 text-[#a37462] hover:text-white bg-transparent hover:bg-[#a37462] rounded-md transition-colors duration-200 border border-[#a37462]"
              >
                <BiReset className="w-4 h-4" />
              </button>
              <span className="absolute -top-8 right-1/2 transform translate-x-1/2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                بازنشانی
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Section mobile */}
      {isFilterModalOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setIsFilterModalOpen(false)}
          />
          <div className="absolute inset-x-0 bottom-0 bg-[#a37462]/50 backdrop-blur-sm rounded-t-2xl p-4 animate-slide-up">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-100">
                فیلتر محصولات
              </h3>
              <button
                onClick={() => setIsFilterModalOpen(false)}
                className="text-gray-50 text-center   rounded-full hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              {/* Copy your existing filter content here */}
              <div className="flex flex-col gap-4">
                {/* Search Input */}
                <div className="relative">
                  <BiSearch className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                  <input
                    type="text"
                    placeholder="جستجوی محصول..."
                    value={filters.search}
                    onChange={(e) =>
                      handleFilterChange("search", e.target.value)
                    }
                    className="w-full pl-2 pr-8 py-2 text-sm border border-gray-100 rounded-md focus:ring-1 text-black focus:ring-[#a37462] focus:border-transparent outline-none transition-all"
                  />
                </div>

                {/* Category Select */}
                <div className="relative">
                  <BiCategory className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                  <select
                    value={selectedCategory}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                      setSelectedCategory(e.target.value);
                      const filteredProducts = products.filter(
                        (product: ProductProps) =>
                          product.categoryChildren === e.target.value
                      );
                      setFilteredProducts(filteredProducts);
                    }}
                    className="w-full appearance-none pl-2 text-black text-sm pr-8 py-2 border border-gray-100 rounded-md focus:border-transparent outline-none transition-all bg-white"
                  >
                    <option value="">دسته‌بندی‌ها</option>
                    {categories.map((category: Category) =>
                      category.children.map((child: string, index: number) => (
                        <option key={`${category._id}-${index}`} value={child}>
                          {child}
                        </option>
                      ))
                    )}
                  </select>
                </div>

                <div className="relative min-w-[120px]">
                  <BiSort className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                  <select
                    value={filters.sort}
                    onChange={(e) => handleFilterChange("sort", e.target.value)}
                    className="w-full appearance-none pl-2 pr-8 text-black py-2 text-sm border border-gray-100 rounded-md focus:border-transparent outline-none transition-all bg-white"
                  >
                    <option value="newest">جدیدترین</option>
                    <option value="price-low">ارزان‌ترین</option>
                    <option value="price-high">گران‌ترین</option>
                  </select>
                </div>

                {/* Price Range and Reset */}
                <div className="flex  gap-2">
                  <div className="relative flex-1">
                    <input
                      type="range"
                      min={0}
                      max={20000000000}
                      value={filters.minPrice}
                      onChange={(e) =>
                        handleFilterChange("minPrice", e.target.value)
                      }
                      className=" h-1 bg-gray-200 rounded appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-[#a37462] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer"
                    />
                    <div className="text-xs text-gray-50 mt-1 text-center">
                      {Number(filters.minPrice).toLocaleString("fa-IR")} تومان
                    </div>
                  </div>

                  <div className="relative flex-1">
                    <input
                      type="range"
                      min={0}
                      max={100000000}
                      value={filters.maxPrice}
                      onChange={(e) =>
                        handleFilterChange("maxPrice", e.target.value)
                      }
                      className=" h-1 bg-gray-200 rounded appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-[#a37462] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer"
                    />
                    <div className="text-xs text-gray-50 mt-1 text-center">
                      {Number(filters.maxPrice).toLocaleString("fa-IR")} تومان
                    </div>
                  </div>
                  <div className="relative group">
                    <button
                      onClick={() => {
                        handleFilterChange("search", "");
                        handleFilterChange("category", "");
                        handleFilterChange("minPrice", "0");
                        handleFilterChange("maxPrice", "20000000000");
                        handleFilterChange("sort", "newest");
                        setSelectedCategory("");
                        setFilteredProducts(products);
                      }}
                      className="px-2 py-3.5 text-xs flex items-center gap-1 text-[#fff] hover:text-white bg-transparent hover:bg-[#a37462] rounded-md transition-colors duration-200 border border-[#fff]"
                    >
                      <BiReset className="w-4 h-4" />
                    </button>
                    <span className="absolute -top-8 right-1/2 transform translate-x-1/2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                      بازنشانی
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Product List */}

      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <motion.div
              key={product._id}
              className="group bg-white rounded-lg shadow-lg hover:shadow-2xl transition transform hover:scale-105 duration-300 overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="relative h-64 w-full overflow-hidden">
                <Image
                  // src={product.image}
                  src={"/assets/images/products/prod10.jpg"}
                  alt={product.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="p-6 flex flex-col">
                <h3 className="text-2xl font-bold text-[#a37462] mb-2 line-clamp-1">
                  {product.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {product.description.slice(0, 50)}...
                </p>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-xs text-gray-500">قیمت محصول</p>
                    <span className="text-sm font-bold text-[#a37462]">
                      {Number(product.price).toLocaleString("fa-IR")} تومان
                    </span>
                  </div>
                  <Link
                    href={`/store/${product._id}:${generateSlug(
                      product.title
                    )}`}
                  >
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      aria-label="View product"
                      className="flex items-center gap-2 bg-[#e5d8d0] rounded-lg hover:bg-[#a37462] text-[#a37462] hover:text-white px-6 py-3 font-medium transition-colors duration-200"
                    >
                      <span className="text-xs font-semibold">
                        مشاهده محصول
                      </span>
                      <FiEye className="w-4 h-4" />
                    </motion.button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <EmptyProducts />
      )}
    </div>
  );
};

export default Store;
