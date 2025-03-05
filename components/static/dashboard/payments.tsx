import { getAllCarts } from "@/lib/cartActions";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CartItem {
  create: {
    quantity: number;
    productId: string;
  }[];
}

interface Cart {
  id: string;
  userId: string;
  items: CartItem; // Changed from CartItem[]
  path: string;
  image: string;
  totalPrice: number;
  createdAt: string;
  updatedAt: string;
  user: User;
  products: any[];
}

interface User {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  phoneNumber: string;
  password: string;
  role: string;
}

const DetailModal = ({
  cart,
  onClose,
}: {
  cart: Cart;
  onClose: () => void;
}) => {
  const formatDateToPersian = (dateStr: string) => {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat("fa-IR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  };
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("fa-IR", {
      style: "currency",
      currency: "IRR",
    }).format(price);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.8 }}
        className="bg-white p-6 rounded-lg max-w-lg mb-auto mt-28 md:mb-0 md:mt-0 w-full mx-4 space-y-4"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-xl font-bold text-gray-800">جزئیات سفارش</h3>
        <div className="space-y-2 text-gray-700">
          <p>شناسه سفارش: {cart.id}</p>
          <p>نام مشتری: {cart.user.name}</p>
          <p>شماره تماس: {cart.user.phoneNumber}</p>
          <p>روش پرداخت: {cart.path === "card" ? "کارت به کارت" : "تلگرام"}</p>
          <p>تعداد اقلام: {cart.items.create[0].quantity}</p>

          <p>مبلغ کل: {formatPrice(cart.totalPrice)}</p>
          <p>تاریخ: {formatDateToPersian(cart.createdAt)}</p>
        </div>
        <button
          onClick={onClose}
          className="mt-4 bg-rose-600 text-white px-4 py-2 rounded hover:bg-rose-700"
        >
          بستن
        </button>
      </motion.div>
    </motion.div>
  );
};

const Payments: React.FC = () => {
  const [cartData, setCartData] = useState<Cart[]>([]);
  const [selectedCart, setSelectedCart] = useState<Cart | null>(null);

  const fetch = async () => {
    const token = localStorage.getItem("token") || "";
    if (token) {
      try {
        const data = await getAllCarts();
        console.log(data);
        setCartData(
          data.map((cart) => ({
            ...cart,
            items: {
              create: cart?.items?.create || [],
            },
            user: {
              ...cart.user,
              createdAt: cart.user.createdAt.toString(),
              updatedAt: cart.user.updatedAt.toString(),
            },
            createdAt: cart.createdAt.toString(),
            updatedAt: cart.updatedAt.toString(),
          }))
        );
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  const formatDateToPersian = (dateStr: string) => {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat("fa-IR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  };
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("fa-IR", {
      style: "currency",
      currency: "IRR",
    }).format(price);
  };

  return (
    <>
      <div className="shadow-md sm:rounded-lg">
        <h2 className="text-2xl p-2 font-semibold my-4">لیست سفارشات</h2>
        <div className="overflow-x-auto">
          <table className="w-full table-auto bg-white shadow rounded min-w-[800px]">
            <thead>
              <tr className="bg-gray-200 text-black">
                <th className="px-4 py-2 text-right">شناسه سفارش</th>
                <th className="px-4 py-2 text-right">نام کاربر</th>
                <th className="px-4 py-2 text-right"> محصول</th>
                <th className="px-4 py-2 text-right"> نوع پرداخت</th>
                <th className="px-4 py-2 text-right">تعداد اقلام</th>
                <th className="px-4 py-2 text-right">مبلغ کل</th>
                <th className="px-4 py-2 text-right">تاریخ ثبت</th>
              </tr>
            </thead>
            <tbody>
              {cartData.map((cart: Cart) => (
                <tr
                  key={cart.id}
                  className="border-b text-black hover:bg-gray-50 cursor-pointer transition-colors"
                  onClick={() => setSelectedCart(cart)}
                >
                  <td className="px-4 py-2">{cart.id}</td>
                  <td className="px-4 py-2">{cart.user.name}</td>
                  <td className="px-4 py-2">{cart.products}</td>
                  <td className="px-4 py-2">
                    {cart.path === "card" ? "کارت به کارت" : "تلگرام"}
                  </td>
                  <td className="px-4 py-2">{cart.items.create[0].quantity}</td>

                  <td className="px-4 py-2">{formatPrice(cart.totalPrice)}</td>
                  <td className="px-4 py-2">
                    {formatDateToPersian(cart.createdAt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <AnimatePresence>
          {selectedCart && (
            <DetailModal
              cart={selectedCart}
              onClose={() => setSelectedCart(null)}
            />
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default Payments;
