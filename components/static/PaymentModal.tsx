import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaCreditCard, FaTelegram } from "react-icons/fa";
import { toast } from "react-toastify";

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
interface PaymentFormData {
  token: string;
  items: {
    productId: string;
    quantity: number;
  }[];
  paymentMethod: "card" | "telegram";
  totalPrice: number;
  receiptImage?: File;
}

const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  totalPrice,
}) => {
  const [activeTab, setActiveTab] = useState("");
  const [receipt, setReceipt] = useState<File | null>(null);

  const [formData, setFormData] = useState<PaymentFormData>({
    token: localStorage.getItem("token") || "",
    items: cartItems.map((item) => ({
      productId: item.id,
      quantity: item.quantity,
    })),
    paymentMethod: "card",
    totalPrice: totalPrice,
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setReceipt(e.target.files[0]);
    }
  };

  const handleSubmitReceipt = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!receipt) {
      toast.error("لطفا تصویر رسید را انتخاب کنید");
      return;
    }

    const submitFormData = new FormData();
    const token = localStorage.getItem("token") || "";

    // Send items as a single JSON string
    submitFormData.append(
      "items",
      JSON.stringify(
        cartItems.map((item) => ({
          productId: item.id,
          quantity: item.quantity,
        }))
      )
    );

    submitFormData.append("paymentMethod", "card");
    submitFormData.append("totalPrice", totalPrice.toString());
    submitFormData.append("receiptImage", receipt.name);

    try {
      const result = await addToCart(submitFormData, token);
      if (result) {
        toast.success("رسید با موفقیت ارسال شد");
        onClose();
      }
    } catch (error) {
      toast.error("خطا در ارسال اطلاعات");
    }
  };

  // const handleTelegramSubmit = async () => {
  //   setFormData((prev) => ({
  //     ...prev,
  //     paymentMethod: "telegram",
  //   }));

  //   const submitFormData = new FormData();
  //   Object.keys(formData).forEach((key) => {
  //     if (key === "items") {
  //       submitFormData.append(
  //         key,
  //         JSON.stringify(formData[key as keyof PaymentFormData])
  //       );
  //     } else if (key !== "receiptImage") {
  //       submitFormData.append(
  //         key,
  //         String(formData[key as keyof PaymentFormData])
  //       );
  //     }
  //   });

  //   try {
  //     const response = await fetch("/api/orders/create", {
  //       method: "POST",
  //       headers: {
  //         Authorization: `Bearer ${formData.token}`,
  //       },
  //       body: submitFormData,
  //     });

  //     if (response.ok) {
  //       toast.success("سفارش شما با موفقیت ثبت شد");
  //       // clearCart();
  //       onClose();
  //     } else {
  //       const data = await response.json();
  //       toast.error(data.error || "خطا در ثبت سفارش");
  //     }
  //   } catch (error) {
  //     toast.error("خطا در ارسال اطلاعات");
  //   }
  // };

  

  const CARD_NUMBER = "6037-9974-1234-5678";

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
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
              <form className="space-y-8" onSubmit={handleSubmitReceipt}>
                <div className="bg-gradient-to-r flex justify-between items-center  w-full from-emerald-500 to-green-500 p-4 rounded-2xl text-white shadow-xl">
                  <p className="text-lg">شماره کارت:</p>
                  <p className="font-mono text-sm  mr-auto md:text-xl text-center tracking-wider">
                    {CARD_NUMBER}
                  </p>
                </div>
                <div className="space-y-4">
                  <p className="text-gray-700 text-lg">
                    لطفا رسید پرداخت را آپلود کنید:
                  </p>
                  <div className="relative">
                    <input
                      type="file"
                      name="receiptImage"
                      required
                      accept="image/*"
                      onChange={handleFileChange}
                      className="opacity-0 absolute inset-0 w-full h-full cursor-pointer z-10"
                    />
                    <div className="w-full flex items-center gap-2 border rounded-lg p-2">
                      <button
                        aria-label="choose file"
                        className="bg-blue-50 text-gray-700 px-4 py-2 rounded-full text-sm hover:bg-violet-100"
                      >
                        انتخاب فایل
                      </button>
                      <span className="text-green-500 text-sm">
                        {receipt ? receipt.name : "فایلی انتخاب نشده"}
                      </span>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    aria-label="send-receipt"
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full bg-emerald-600 text-white py-4 rounded-xl hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-200"
                  >
                    ارسال رسید
                  </motion.button>
                </div>
              </form>
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
                  // onClick={handleTelegramSubmit}
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
