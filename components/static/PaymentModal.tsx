import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaCreditCard, FaTelegram } from "react-icons/fa";

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
}

const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  totalPrice,
}) => {
  const [activeTab, setActiveTab] = useState("card");
  const [receipt, setReceipt] = useState<File | null>(null);

  const CARD_NUMBER = "6037-9974-1234-5678"; // Your card number here

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setReceipt(e.target.files[0]);
    }
  };

  const handleSubmitReceipt = async () => {
    if (!receipt) return;

    const formData = new FormData();
    formData.append("receipt", receipt);
    formData.append("cartItems", JSON.stringify(cartItems));
    formData.append("totalPrice", totalPrice.toString());

    // Submit to your API endpoint
    try {
      const response = await fetch("/api/submit-payment", {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        // Handle success
        onClose();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const sendToTelegram = async () => {
    const invoiceData = {
      items: cartItems,
      totalPrice,
      date: new Date().toISOString(),
      invoiceNumber: `INV-${Date.now()}`,
    };

    try {
      const response = await fetch("/api/send-telegram", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(invoiceData),
      });
      if (response.ok) {
        // Handle success
        onClose();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-2xl p-6 w-full max-w-2xl m-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex gap-4 mb-6">
              <button
                className={`flex-1 py-3 rounded-xl flex items-center justify-center gap-2 ${
                  activeTab === "card"
                    ? "bg-green-600 text-white"
                    : "bg-[#e5d8d0]"
                }`}
                onClick={() => setActiveTab("card")}
              >
                <FaCreditCard />
                پرداخت با کارت
              </button>
              <button
                className={`flex-1 py-3 rounded-xl flex items-center justify-center gap-2 ${
                  activeTab === "telegram"
                    ? "bg-blue-600 text-white"
                    : "bg-[#e5d8d0]"
                }`}
                onClick={() => setActiveTab("telegram")}
              >
                <FaTelegram />
                پرداخت با تلگرام
              </button>
            </div>

            {activeTab === "card" && (
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-[#a37462]/30 to-[#8a6352] p-6 rounded-xl text-white">
                  <p className="text-lg mb-4">شماره کارت:</p>
                  <p className="font-mono text-2xl text-center">
                    {CARD_NUMBER}
                  </p>
                </div>
                <div className="space-y-4">
                  <p className="text-[#a37462]">
                    لطفا رسید پرداخت را آپلود کنید:
                  </p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="w-full"
                  />
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-[#a37462] text-white py-3 rounded-xl"
                    onClick={handleSubmitReceipt}
                  >
                    ارسال رسید
                  </motion.button>
                </div>
              </div>
            )}

            {activeTab === "telegram" && (
              <div className="space-y-6">
                <div className="bg-[#e5d8d0] p-6 rounded-xl">
                  <h3 className="text-xl font-bold mb-4">صورتحساب شما</h3>
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex justify-between mb-2">
                      <span>{item.title}</span>
                      <span>
                        {(item.price * item.quantity).toLocaleString()} تومان
                      </span>
                    </div>
                  ))}
                  <div className="border-t border-[#a37462] mt-4 pt-4">
                    <div className="flex justify-between font-bold">
                      <span>جمع کل:</span>
                      <span>{totalPrice.toLocaleString()} تومان</span>
                    </div>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-[#a37462] text-white py-3 rounded-xl flex items-center justify-center gap-2"
                  onClick={sendToTelegram}
                >
                  <FaTelegram />
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
