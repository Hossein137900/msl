"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiMinus, FiPlus, FiTrash2, FiShoppingBag } from "react-icons/fi";
import { toast } from "react-hot-toast";

interface CartItem {
  id: string;
  title: string;
  price: number;
  images: string[];
  quantity: number;
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCartItems();
  }, []);

  const loadCartItems = () => {
    const request = indexedDB.open("CartDB", 1);
    
    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains("cart")) {
        db.createObjectStore("cart", { keyPath: "id" });
      }
    };
  
    request.onerror = () => {
      setCartItems([]);
      setLoading(false);
    };
  
    request.onsuccess = (event) => {
      try {
        const db = (event.target as IDBOpenDBRequest).result;
        const transaction = db.transaction(["cart"], "readonly");
        const store = transaction.objectStore("cart");
        const getAllRequest = store.getAll();
  
        getAllRequest.onsuccess = () => {
          setCartItems(getAllRequest.result || []);
          setLoading(false);
        };
  
        getAllRequest.onerror = () => {
          setCartItems([]);
          setLoading(false);
        };
      } catch {
        setCartItems([]);
        setLoading(false);
      }
    };
  };
  
  

  const updateQuantity = (itemId: string, action: "increase" | "decrease" | "remove") => {
    const request = indexedDB.open("CartDB", 1);
    request.onsuccess = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      const transaction = db.transaction(["cart"], "readwrite");
      const store = transaction.objectStore("cart");

      const item = cartItems.find((item) => item.id === itemId);
      if (!item) return;

      if (action === "remove" || (action === "decrease" && item.quantity === 1)) {
        store.delete(itemId);
        setCartItems(cartItems.filter((item) => item.id !== itemId));
        toast.success("محصول از سبد خرید حذف شد");
        return;
      }

      const newQuantity = action === "increase" ? item.quantity + 1 : item.quantity - 1;
      const updatedItem = { ...item, quantity: newQuantity };
      store.put(updatedItem);
      setCartItems(
        cartItems.map((item) => (item.id === itemId ? updatedItem : item))
      );
      toast.success(
        action === "increase" ? "تعداد محصول افزایش یافت" : "تعداد محصول کاهش یافت"
      );
    };
  };

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-l from-[#16222A] to-[#3A6073] flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-yellow-500"></div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-l from-[#16222A] to-[#3A6073] flex flex-col items-center justify-center p-4">
        <FiShoppingBag className="w-24 h-24 text-yellow-500 mb-4" />
        <h2 className="text-2xl text-white mb-4">سبد خرید شما خالی است</h2>
        <Link href="/store">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-yellow-500 text-white px-6 py-3 rounded-xl hover:bg-yellow-600 transition-colors"
          >
            مشاهده محصولات
          </motion.button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-l from-[#16222A] to-[#3A6073] p-4 md:p-8" dir="rtl">
      <div className="max-w-7xl mx-auto mt-24">
        <h1 className="text-3xl font-bold text-yellow-500 mb-8">سبد خرید</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/10 rounded-xl p-4 backdrop-blur-sm"
              >
                <div className="flex items-center gap-4">
                  <div className="relative w-24 h-24 rounded-lg overflow-hidden">
                    <Image
                      src={item.images[0]}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl text-white font-bold">{item.title}</h3>
                    <p className="text-yellow-500">
                      {item.price.toLocaleString()} تومان
                    </p>
                  </div>
                  <div className="flex items-center gap-2 bg-yellow-500 rounded-xl p-2">
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={() => updateQuantity(item.id, "increase")}
                      className="p-1 hover:bg-yellow-600 rounded-lg"
                    >
                      <FiPlus className="text-white w-5 h-5" />
                    </motion.button>
                    <span className="text-white font-bold px-2">
                      {item.quantity}
                    </span>
                    {item.quantity === 1 ? (
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => updateQuantity(item.id, "remove")}
                        className="p-1 hover:bg-yellow-600 rounded-lg"
                      >
                        <FiTrash2 className="text-white w-5 h-5" />
                      </motion.button>
                    ) : (
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => updateQuantity(item.id, "decrease")}
                        className="p-1 hover:bg-yellow-600 rounded-lg"
                      >
                        <FiMinus className="text-white w-5 h-5" />
                      </motion.button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 h-fit">
            <h2 className="text-2xl font-bold text-white mb-4">خلاصه سفارش</h2>
            <div className="space-y-2 mb-6">
              <div className="flex justify-between text-gray-300">
                <span>تعداد اقلام:</span>
                <span>{cartItems.length} عدد</span>
              </div>
              <div className="flex justify-between text-white font-bold">
                <span>مجموع:</span>
                <span>{totalPrice.toLocaleString()} تومان</span>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-yellow-500 text-white py-3 rounded-xl hover:bg-yellow-600 transition-colors font-bold"
            >
              ادامه فرآیند خرید
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}
