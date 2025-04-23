import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaCreditCard, FaTelegram } from "react-icons/fa";
import { toast } from "react-toastify";
import MultiImageDropzoneUsage from "@/components/static/adminComponent/FileUploadForm";
import Image from "next/image";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  totalPrice: number;
}
interface CartItem {
  id: string;
  title: string;
  price: number;
  images: string[];
  quantity: number;
  image?: string; // Add optional image property
}

interface UploadedFile {
  name: string;
  url: string;
  type: string;
  _id: string;
  __v: number;
  createdAt: string;
  updatedAt: string;
}

const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  totalPrice,
}) => {
  const [activeTab, setActiveTab] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);

  const handleUploadComplete = (files: UploadedFile[]) => {
    setUploadedFiles(files);
    toast.success("تصویر رسید با موفقیت آپلود شد");
  };

  const handleSubmitReceipt = async () => {
    if (uploadedFiles.length === 0) {
      toast.error("لطفا تصویر رسید را آپلود کنید");
      return;
    }
  
    const token = localStorage.getItem("token") || "";
    
    // Create the data object to match the Cart model
    const cartData = {
      userId: "", // This will be extracted from the token on the server
      items: cartItems.map(item => ({
        productId: item.id,
        quantity: item.quantity,
        image: item.image || (item.images && item.images.length > 0 ? item.images[0] : null)
      })),
      path: "card",
      receiptImageUrl: uploadedFiles[0].url, // Use the correct field name
      totalPrice: totalPrice
    };
  
    try {
      const response = await fetch('/api/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'token': token
        },
        body: JSON.stringify(cartData)
      });
  
      if (response.ok) {
        toast.success("سفارش با موفقیت ثبت شد");
        onClose();
      } else {
        const errorData = await response.json();
        toast.error(`خطا در ثبت سفارش: ${errorData.message || 'خطای نامشخص'}`);
      }
    } catch (error) {
      console.error("خطا در ارتباط با سرور", error);
      toast.error("خطا در ارسال اطلاعات");
    }
  };
  

  const CARD_NUMBER = "6037-9974-1234-5678";

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 "
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-3xl p-8 w-full max-w-2xl m-4 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex gap-4 mb-8">
              <button
                className={`flex-1 py-4 rounded-2xl flex items-center justify-center gap-2 transition-all duration-300 ${
                  activeTab === "card"
                    ? "bg-emerald-600 text-white shadow-lg shadow-emerald-200"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
                onClick={() => setActiveTab("card")}
              >
                <FaCreditCard />
                پرداخت با کارت
              </button>
              <button
                className={`flex-1 py-4 rounded-2xl flex items-center justify-center gap-2 transition-all duration-300 ${
                  activeTab === "telegram"
                    ? "bg-[#229ED9] text-white shadow-lg shadow-blue-200"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
                onClick={() => setActiveTab("telegram")}
              >
                <FaTelegram />
                پرداخت با تلگرام
              </button>
            </div>

            {activeTab === "card" && (
              <div className="space-y-8 max-h-[90vh] overflow-y-auto">
                <div className="bg-gradient-to-r flex justify-between items-center w-full from-emerald-500 to-green-500 p-4 rounded-2xl text-white shadow-xl">
                  <p className="text-lg">شماره کارت:</p>
                  <p className="font-mono text-sm mr-auto md:text-xl text-center tracking-wider">
                    {CARD_NUMBER}
                  </p>
                </div>
                <div className="space-y-4">
                  <p className="text-gray-700 text-lg">
                    لطفا رسید پرداخت را آپلود کنید:
                  </p>
                  
                  <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                    <MultiImageDropzoneUsage onUploadComplete={handleUploadComplete} />
                  </div>

                  {uploadedFiles.length > 0 && (
                    <div className="mt-4 p-3 bg-green-50 border border-green-100 rounded-lg">
                      <p className="text-green-600 font-medium">تصویر رسید با موفقیت آپلود شد:</p>
                      <div className="flex items-center mt-2">
                        <div className="w-16 h-16 relative rounded overflow-hidden mr-3">
                          <Image 
                            src={uploadedFiles[0].url} 
                            alt="Receipt" 
                            className="object-cover w-full h-full"
                            fill
                          />
                        </div>
                        <div className="flex-1 truncate">
                          <p className="text-sm text-gray-600 truncate">{uploadedFiles[0].name}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    aria-label="send-receipt"
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-emerald-600 text-white py-4 rounded-xl hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-200"
                    disabled={uploadedFiles.length === 0}
                    onClick={handleSubmitReceipt}
                  >
                    ارسال رسید
                  </motion.button>
                </div>
              </div>
            )}

            {activeTab === "telegram" && (
              <div className="space-y-6">
                <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                  <h3 className="text-xl font-bold mb-6 text-gray-800">
                    صورتحساب شما
                  </h3>
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between mb-3 text-gray-600"
                    >
                      <span>{item.title}</span>
                      <span>
                        {(item.price * item.quantity).toLocaleString()} تومان
                      </span>
                    </div>
                  ))}
                  <div className="border-t border-gray-200 mt-4 pt-4">
                    <div className="flex justify-between font-bold text-gray-800">
                      <span>جمع کل:</span>
                      <span>{totalPrice.toLocaleString()} تومان</span>
                    </div>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  aria-label="send-telegram"
                  className="w-full bg-[#229ED9] text-white py-4 rounded-xl hover:bg-[#1e8dc2] transition-colors shadow-lg shadow-blue-200 flex items-center justify-center gap-2"

                >
                  <FaTelegram className="text-xl" />
                  ارسال به تلگرام
                </motion.button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

};
export default PaymentModal;
