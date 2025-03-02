"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

type SidebarItem = "orders" | "payments" | "profile";

const sidebarVariants = {
  hidden: { x: 300, opacity: 0 },
  visible: { x: 0, opacity: 1 },
};

const Sidebar: React.FC<{
  selected: SidebarItem;
  onSelect: (item: SidebarItem) => void;
}> = ({ selected, onSelect }) => {
  const items: { key: SidebarItem; label: string }[] = [
    { key: "orders", label: "سفارشات" },
    { key: "payments", label: "تاریخچه پرداخت" },
    { key: "profile", label: "بروزرسانی پروفایل" },
  ];

  return (
    <motion.div
      variants={sidebarVariants}
      //   initial="hidden"
      animate="visible"
      //   exit="hidden"
      transition={{ type: "tween", stiffness: 100, damping: 30 }}
      className="w-64  bg-gray-800 text-white h-screen p-4"
    >
      <h2 className="text-xl font-bold mb-6">داشبورد</h2>
      <ul>
        {items.map((item) => (
          <li key={item.key}>
            <button
              onClick={() => onSelect(item.key)}
              className={`w-full text-right px-4 py-2 rounded mb-2 transition-colors duration-200 
                ${selected === item.key ? "bg-gray-600" : "hover:bg-gray-700"}`}
            >
              {item.label}
            </button>
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

const Orders: React.FC = () => {
  const orders = [
    { id: 1, item: "محصول الف", date: "2023-09-01", status: "تحویل شده" },
    { id: 2, item: "محصول ب", date: "2023-09-10", status: "در انتظار" },
    { id: 3, item: "محصول ج", date: "2023-09-15", status: "ارسال شده" },
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">سفارشات شما</h2>
      <table className="w-full table-auto bg-white shadow rounded">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2 text-right">شناسه سفارش</th>
            <th className="px-4 py-2 text-right">کالا</th>
            <th className="px-4 py-2 text-right">تاریخ</th>
            <th className="px-4 py-2 text-right">وضعیت</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id} className="border-b text-black">
              <td className="px-4 py-2">{order.id}</td>
              <td className="px-4 py-2">{order.item}</td>
              <td className="px-4 py-2">{order.date}</td>
              <td className="px-4 py-2">{order.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const Payments: React.FC = () => {
  const payments = [
    { id: 1, amount: "$100.00", date: "2023-08-20", method: "کارت اعتباری" },
    { id: 2, amount: "$250.50", date: "2023-09-05", method: "پی‌پال" },
    { id: 3, amount: "$75.99", date: "2023-09-12", method: "کارت دبیت" },
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">تاریخچه پرداخت</h2>
      <table className="w-full table-auto bg-white shadow rounded">
        <thead>
          <tr className="bg-gray-200 ">
            <th className="px-4 py-2 text-right">شناسه پرداخت</th>
            <th className="px-4 py-2 text-right">مبلغ</th>
            <th className="px-4 py-2 text-right">تاریخ</th>
            <th className="px-4 py-2 text-right">روش پرداخت</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment) => (
            <tr key={payment.id} className="border-b text-black">
              <td className="px-4 py-2">{payment.id}</td>
              <td className="px-4 py-2">{payment.amount}</td>
              <td className="px-4 py-2">{payment.date}</td>
              <td className="px-4 py-2">{payment.method}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const Profile: React.FC = () => {
  const [username, setUsername] = useState<string>("نام_کاربری_فعلی");
  const [phoneNumber, setPhoneNumber] = useState<string>("123-456-7890");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("اطلاعات به‌روز شده:", { username, phoneNumber });
    alert("پروفایل با موفقیت به‌روز شد!");
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">بروزرسانی پروفایل</h2>
      <form
        onSubmit={handleSubmit}
        className="max-w-md bg-white p-6 shadow rounded"
      >
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="username">
            نام کاربری
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setUsername(e.target.value)
            }
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="phoneNumber">
            شماره تلفن
          </label>
          <input
            type="text"
            id="phoneNumber"
            value={phoneNumber}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setPhoneNumber(e.target.value)
            }
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
        >
          بروزرسانی
        </button>
      </form>
    </div>
  );
};

const DashboardContent: React.FC<{ selected: SidebarItem }> = ({
  selected,
}) => {
  switch (selected) {
    case "orders":
      return <Orders />;
    case "payments":
      return <Payments />;
    case "profile":
      return <Profile />;
    default:
      return <div className="p-6">یک گزینه از منوی کناری انتخاب کنید.</div>;
  }
};

const DashboardPage: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<SidebarItem>("orders");
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  return (
    <div
      className="min-h-screen overflow-hidden bg-gradient-to-l from-[#16222A] to-[#3A6073] text-yellow-500"
      dir="rtl"
    >
      <div className="flex">
        <AnimatePresence>
          {sidebarOpen && (
            <Sidebar
              selected={selectedItem}
              onSelect={setSelectedItem}
              key="sidebar"
            />
          )}
        </AnimatePresence>
        <div className="flex-1">
          <div className="flex items-center justify-between p-4 bg-white shadow">
            <button
              onClick={toggleSidebar}
              className="text-2xl text-gray-700 focus:outline-none"
            >
              {sidebarOpen ? "✖" : "☰"}
            </button>
            <Link href="/" className="text-blue-600 hover:underline">
              بازگشت به صفحه اصلی
            </Link>
          </div>
          <DashboardContent selected={selectedItem} />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
