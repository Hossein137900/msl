'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { FaShoppingCart, FaTimes } from 'react-icons/fa';

interface CartItem {
  productId: {
    title: string;
    image: string;
  };
  quantity: number;
}

interface Cart {
  _id: string;
  userId: {
    username: string;
  };
  status: 'pending' | 'accepte' | 'denied';
  items: CartItem[];
  totalPrice: number;
  createdAt: string;
  image: string;
}

const ItemsModal = ({ isOpen, onClose, items }: { isOpen: boolean; onClose: () => void; items: CartItem[] }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className=" bg-black/50 z-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.75 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.75 }}
            className=" absolute  bg-gray-800 p-6 rounded-lg shadow-xl z-50 w-full max-w-lg"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-yellow-400">جزئیات سفارش</h3>
              <button onClick={onClose} className="text-gray-400 hover:text-white">
                <FaTimes size={24} />
              </button>
            </div>
            <div className="space-y-4 max-h-[60vh] overflow-y-auto">
              {items.map((item, index) => (
                <div key={index} className="bg-gray-700 p-4 rounded-lg flex items-center gap-4">
                  <img
                    src='https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=1600'
                    alt={item.productId.title}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div>
                    <h4 className="text-white font-medium">{item.productId.title}</h4>
                    <p className="text-gray-300">تعداد: {item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export const Carts = () => {
  const [carts, setCarts] = useState<Cart[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedItems, setSelectedItems] = useState<CartItem[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchCarts = async () => {
    try {
      const response = await fetch('/api/cart');
      const data = await response.json();
      setCarts(data.carts);
      setLoading(false);
    } catch (error) {
      toast.error('خطا در دریافت سفارشات');
      setLoading(false);
    }
  };

  const handleStatusChange = async (cartId: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/cart/${cartId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        toast.success('وضعیت سفارش با موفقیت بروزرسانی شد');
        fetchCarts(); // Refresh the carts list
      }
    } catch (error) {
      toast.error('خطا در بروزرسانی وضعیت سفارش');
    }
  };

  const handleShowItems = (items: CartItem[]) => {
    setSelectedItems(items);
    setIsModalOpen(true);
  };

  useEffect(() => {
    fetchCarts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-yellow-400 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="p-6" dir="rtl">
      <h2 className="text-2xl font-bold mb-6 text-yellow-400">مدیریت سفارشات</h2>
      <div className="overflow-x-auto">
        <table className="w-full bg-white/10 rounded-lg overflow-hidden">
          <thead className="bg-gray-800 text-yellow-400">
            <tr>
              <th className="px-6 py-3 text-right">کاربر</th>
              <th className="px-6 py-3 text-right">مبلغ کل</th>
              <th className="px-6 py-3 text-right">تاریخ</th>
              <th className="px-6 py-3 text-right">وضعیت</th>
              <th className="px-6 py-3 text-right">تصویر رسید</th>
              <th className="px-6 py-3 text-right">اقلام</th>
            </tr>
          </thead>
          <tbody>
            {carts.map((cart) => (
              <motion.tr
                key={cart._id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="border-b border-gray-700 hover:bg-white/5"
              >
                <td className="px-6 py-4">{cart.userId.username}</td>
                <td className="px-6 py-4">
                  {new Intl.NumberFormat('fa-IR').format(cart.totalPrice)} تومان
                </td>
                <td className="px-6 py-4">
                  {new Date(cart.createdAt).toLocaleDateString('fa-IR')}
                </td>
                <td className="px-6 py-4">
                  <select
                    value={cart.status}
                    onChange={(e) => handleStatusChange(cart._id, e.target.value)}
                    className="bg-transparent border border-gray-600 rounded px-2 py-1 text-white"
                  >
                    <option value="pending">در انتظار</option>
                    <option value="accepte">تایید شده</option>
                    <option value="denied">رد شده</option>
                  </select>
                </td>
                <td className="px-6 py-4">
                  <img
                    src={cart.image}
                    alt="receipt"
                    className="w-16 h-16 object-cover rounded"
                  />
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleShowItems(cart.items)}
                    className="flex items-center gap-2 bg-yellow-400 text-gray-900 px-3 py-1 rounded hover:bg-yellow-500"
                  >
                    <FaShoppingCart />
                    نمایش اقلام
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
      <ItemsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        items={selectedItems}
      />
    </div>
  );
};
