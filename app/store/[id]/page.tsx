"use client";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiAlertCircle,
  FiMinus,
  FiPlus,
  FiTrash2,
  FiInfo,
  FiMessageSquare,
  FiVideo,
  FiZoomIn,
} from "react-icons/fi";
import { toast } from "react-hot-toast";
import DynamicTable from "@/components/global/Table";

interface ProductProps {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  image: string | null;
  description: string;
  price: string;
  categoryId: { title: string };
  categoryChildren: string;
  properties: Record<string, string>;
  videoes: string[];
  colors: Record<string, string>;
  thumbnails: string[];
}

export default function ProductDetailPage() {
  const params = usePathname();
  const [tempImage, setTempImage] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(0);
  const [loading, setLoading] = useState(true);
  const [hoveredThumbnail, setHoveredThumbnail] = useState<number | null>(null);
  const id = params.split(":")[0].split("/")[2];

  // Tab state: details, comments, video
  const [activeTab, setActiveTab] = useState<"details" | "comments" | "video">(
    "details"
  );
  const [product, setProduct] = useState<ProductProps | null>(null);

  useEffect(() => {
    if (product) {
      document.title = product.title || "محصول";
      const metaDescription = document.querySelector(
        'meta[name="description"]'
      );
      if (metaDescription) {
        metaDescription.setAttribute(
          "content",
          product.description.slice(0, 160)
        );
      }
    }
  }, [product]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        setProduct(data.product);
        console.log(data.product, "product");
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product:", error);
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  useEffect(() => {
    if (!product) return;
    const request = indexedDB.open("CartDB", 1);
    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains("cart")) {
        db.createObjectStore("cart", { keyPath: "id" });
      }
    };
    request.onsuccess = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      try {
        const transaction = db.transaction(["cart"], "readonly");
        const store = transaction.objectStore("cart");
        const getRequest = store.get(product._id);
        getRequest.onsuccess = () => {
          if (getRequest.result) {
            setQuantity(getRequest.result.quantity);
          }
        };
      } catch (error) {
        console.log("Store access error:", error);
      }
    };
  }, [product]);

  const handleQuantityChange = async (
    action: "increase" | "decrease" | "remove"
  ) => {
    const request = indexedDB.open("CartDB", 1);
    request.onsuccess = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      const transaction = db.transaction(["cart"], "readwrite");
      const store = transaction.objectStore("cart");

      if (!product) return;

      if (action === "remove" || (action === "decrease" && quantity === 1)) {
        store.delete(product._id);
        setQuantity(0);
        toast.success("محصول از سبد خرید حذف شد");
        return;
      }

      const newQuantity = action === "increase" ? quantity + 1 : quantity - 1;
      setQuantity(newQuantity);
      store.put({
        id: product._id, // Explicitly include the id
        ...product,
        quantity: newQuantity,
      });

      toast.success(
        action === "increase"
          ? "محصول به سبد خرید اضافه شد"
          : "تعداد محصول کاهش یافت"
      );
    };
  };

  // Handlers for thumbnail hover
  const handleThumbnailMouseEnter = (thumbnailSrc: string, index: number) => {
    setTempImage(thumbnailSrc);
    setHoveredThumbnail(index);
  };

  const handleThumbnailMouseLeave = () => {
    setTempImage(null);
    setHoveredThumbnail(null);
  };

  // Get the current image to display (either temp hover image or product image)
  const displayImage = tempImage || (product?.image || "");

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-l from-[#e5d8d0] to-[#a37462]">
        <motion.div
          className="flex space-x-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="w-4 h-4 bg-white rounded-full"
            animate={{
              y: [-10, 0, -10],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: 0,
            }}
          />
          <motion.div
            className="w-4 h-4 bg-white rounded-full"
            animate={{
              y: [-10, 0, -10],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: 0.2,
            }}
          />
          <motion.div
            className="w-4 h-4 bg-white rounded-full"
            animate={{
              y: [-10, 0, -10],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: 0.4,
            }}
          />
        </motion.div>
        <motion.p
          className="text-xl text-white mt-4 font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          در حال بارگذاری...
        </motion.p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-l from-[#e5d8d0] to-[#a37462]">
        <FiAlertCircle className="w-16 h-16 text-red-500 mb-4" />
        <p className="text-xl text-white">محصولی یافت نشد</p>
      </div>
    );
  }

  const tableRows = [
    { property: "دسته بندی", value: product.categoryChildren },
    ...Object.entries(product.properties || {}).map(([key, value]) => ({
      property: key,
      value: value,
    })),
    {
      property: "رنگ ها",
      value: Object.values(product.colors || {}).join(", "),
    },
  ];

  return (
    <div
      className="min-h-screen px-4 py-8 bg-gradient-to-t from-[#e5d8d0] to-[#a37462]"
      dir="rtl"
    >
      <div className="max-w-7xl mx-auto bg-white mt-24 rounded-2xl shadow-xl p-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Image Section */}
          <div className="flex-1">
            <div className="relative w-full h-96 rounded-lg overflow-hidden group">
              <AnimatePresence mode="wait">
                <motion.div
                  key={displayImage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={displayImage}
                    alt={product.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                  />
                </motion.div>
              </AnimatePresence>
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
              <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-lg">
                  <FiZoomIn className="w-5 h-5 text-[#a37462]" />
                </div>
              </div>
            </div>
            <div className="mt-6 mx-2 flex gap-4 overflow-x-auto p-2">
              {product.thumbnails.map((img, index) => (
                <motion.div
                  key={index}
                  onMouseEnter={() => handleThumbnailMouseEnter(img, index)}
                  onMouseLeave={handleThumbnailMouseLeave}
                  className={`relative w-24 h-24 rounded-lg overflow-hidden cursor-pointer shadow-md transition-all duration-300 ${
                    hoveredThumbnail === index
                      ? "ring-2 ring-[#a37462] scale-105"
                      : "hover:ring-2 hover:ring-[#a37462]/50"
                  }`}
                  whileHover={{ y: -5 }}
                >
                  <Image
                    src={img}
                    alt={`${product.title} - تصویر ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="96px"
                  />
                  <div 
                    className={`absolute inset-0 bg-[#a37462]/10 transition-opacity duration-300 ${
                      hoveredThumbnail === index ? 'opacity-0' : 'opacity-0 hover:opacity-100'
                    }`}
                  />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Details & Tabs Section */}
          <div className="flex-1 flex flex-col mt-4 justify-between">
            <div>
              <h2 className="text-3xl font-bold mb-4 text-[#a37462]">
                {product.title}
              </h2>
              <p className="mb-4 text-gray-900">{product.description}</p>
              <p className="text-xl mb-4 text-[#a37462]">
                قیمت: {product.price} تومان
              </p>

              {/* Tab Component */}

              <div className="mt-6">
                <div className="flex border-b border-gray-200">
                  <button
                    onClick={() => setActiveTab("details")}
                    className={`flex items-center px-4 py-2 relative font-bold transition-colors duration-300 ${
                      activeTab === "details"
                        ? "text-[#a37462]"
                        : "text-gray-500 hover:text-[#a37462]"
                    }`}
                  >
                    <FiInfo className="ml-1 text-base" />
                    جزئیات
                    {activeTab === "details" && (
                      <motion.div
                        layoutId="underline"
                        className="absolute -bottom-px left-0 right-0 h-1 bg-[#a37462]"
                      />
                    )}
                  </button>
                  <button
                    onClick={() => setActiveTab("comments")}
                    className={`flex items-center px-4 py-2 relative font-bold transition-colors duration-300 ${
                      activeTab === "comments"
                        ? "text-[#a37462]"
                        : "text-gray-500 hover:text-[#a37462]"
                    }`}
                  >
                    <FiMessageSquare className="ml-1 text-base" />
                    کامنت ها
                    {activeTab === "comments" && (
                      <motion.div
                        layoutId="underline"
                        className="absolute -bottom-px left-0 right-0 h-1 bg-[#a37462]"
                      />
                    )}
                  </button>
                  <button
                    onClick={() => setActiveTab("video")}
                    className={`flex items-center px-4 py-2 relative font-bold transition-colors duration-300 ${
                      activeTab === "video"
                        ? "text-[#a37462]"
                        : "text-gray-500 hover:text-[#a37462]"
                    }`}
                  >
                    <FiVideo className="ml-1 text-base" />
                    ویدیو
                    {activeTab === "video" && (
                      <motion.div
                        layoutId="underline"
                        className="absolute -bottom-px left-0 right-0 h-1 bg-[#a37462]"
                      />
                    )}
                  </button>
                </div>
                <div className="mt-4">
                  <AnimatePresence mode="wait">
                    {activeTab === "details" && (
                      <motion.div
                        key="details"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                      >
                        <DynamicTable rows={tableRows} />
                      </motion.div>
                    )}
                    {activeTab === "comments" && (
                                           <motion.div
                                           key="comments"
                                           initial={{ opacity: 0, y: 10 }}
                                           animate={{ opacity: 1, y: 0 }}
                                           exit={{ opacity: 0, y: -10 }}
                                           transition={{ duration: 0.3 }}
                                         >
                                           <div className="space-y-4">
                                             <p className="text-gray-700">
                                               کامنتی یافت نشد. منتظر کامنت کاربران باشید...
                                             </p>
                                             {/* Integration point for a comments API or comments form */}
                                           </div>
                                         </motion.div>
                                       )}
                                       {activeTab === "video" && (
                                         <motion.div
                                           key="video"
                                           initial={{ opacity: 0, y: 10 }}
                                           animate={{ opacity: 1, y: 0 }}
                                           exit={{ opacity: 0, y: -10 }}
                                           transition={{ duration: 0.3 }}
                                         >
                                           <div className="relative pb-[56.25%]">
                                             <iframe
                                               className="absolute inset-0 w-full h-full rounded-lg shadow-md"
                                               src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                                               title="Video"
                                               frameBorder="0"
                                               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                               allowFullScreen
                                             ></iframe>
                                           </div>
                                         </motion.div>
                                       )}
                                     </AnimatePresence>
                                   </div>
                                 </div>
                               </div>
                   
                               {/* Cart Controls */}
                               <div className="flex flex-col gap-6 mt-10">
                                 {quantity === 0 ? (
                                   <motion.button
                                     whileTap={{ scale: 0.95 }}
                                     onClick={() => handleQuantityChange("increase")}
                                     className="w-full flex items-center justify-center bg-[#a37462] hover:bg-[#8a5a50] text-white px-8 py-4 rounded-xl font-bold shadow-md transition-all duration-200"
                                   >
                                     افزودن به سبد خرید
                                   </motion.button>
                                 ) : (
                                   <div className="flex items-center justify-between bg-[#a37462] rounded-xl p-3 shadow-inner">
                                     <motion.button
                                       whileTap={{ scale: 0.95 }}
                                       onClick={() => handleQuantityChange("increase")}
                                       className="p-3 hover:bg-[#8a5a50] rounded-full transition-all duration-200"
                                     >
                                       <FiPlus className="text-white w-6 h-6" />
                                     </motion.button>
                                     <span className="text-white font-extrabold text-2xl mx-4">
                                       {quantity}
                                     </span>
                                     {quantity === 1 ? (
                                       <motion.button
                                         whileTap={{ scale: 0.95 }}
                                         onClick={() => handleQuantityChange("remove")}
                                         className="p-3 hover:bg-[#8a5a50] rounded-full transition-all duration-200"
                                       >
                                         <FiTrash2 className="text-white w-6 h-6" />
                                       </motion.button>
                                     ) : (
                                       <motion.button
                                         whileTap={{ scale: 0.95 }}
                                         onClick={() => handleQuantityChange("decrease")}
                                         className="p-3 hover:bg-[#8a5a50] rounded-full transition-all duration-200"
                                       >
                                         <FiMinus className="text-white w-6 h-6" />
                                       </motion.button>
                                     )}
                                   </div>
                                 )}
                                 <Link href="/cart">
                                   <motion.button
                                     whileTap={{ scale: 0.95 }}
                                     className="w-full flex items-center justify-center border-2 border-[#a37462] hover:bg-[#a37462] hover:text-white text-[#a37462] px-8 py-4 rounded-xl font-bold shadow-md transition-all duration-200"
                                   >
                                     مشاهده سبد خرید
                                   </motion.button>
                                 </Link>
                               </div>
                             </div>
                           </div>
                         </div>
                       </div>
                     );
                   }
                   