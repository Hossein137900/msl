"use client";
import React, { useState, ChangeEvent, FormEvent, JSX } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaShoppingCart,
  FaHistory,
  FaUserEdit,
  FaChartBar,
} from "react-icons/fa";

type SidebarItem = "orders" | "payments" | "profile" | "report";

const sidebarVariants = {
  hidden: { x: "100%", opacity: 0 },
  visible: { x: "0%", opacity: 1 },
};

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 0.5 },
};

const Sidebar: React.FC<{
  selected: SidebarItem;
  onSelect: (item: SidebarItem) => void;
  onClose: () => void;
}> = ({ selected, onSelect, onClose }) => {
  const items: { key: SidebarItem; label: string; icon: JSX.Element }[] = [
    { key: "report", label: "گزارشات", icon: <FaChartBar size={18} /> },
    { key: "orders", label: "سفارشات", icon: <FaShoppingCart size={18} /> },
    { key: "payments", label: "تاریخچه پرداخت", icon: <FaHistory size={18} /> },
    {
      key: "profile",
      label: "بروزرسانی پروفایل",
      icon: <FaUserEdit size={18} />,
    },
  ];

  return (
    <motion.div
      variants={sidebarVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      transition={{ type: "spring", stiffness: 300, damping: 50 }}
      className="w-64 bg-gray-800 text-white h-screen p-4 fixed overflow-x-hidden right-0 top-0 z-50"
    >
      <h2 className="text-xl font-bold mb-6">داشبورد</h2>
      <ul>
        {items.map((item) => (
          <li key={item.key}>
            <button
              onClick={() => {
                onSelect(item.key);
                onClose();
              }}
              className={`w-full text-left flex items-center px-4 py-2 rounded mb-2 transition-colors duration-200 ${
                selected === item.key ? "bg-gray-600" : "hover:bg-gray-700"
              }`}
            >
              <span className="ml-2 text-yellow-400">{item.icon}</span>
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
  const formatDateToPersian = (dateStr: string) => {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat("fa-IR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">سفارشات شما</h2>
      <table className="w-full table-auto bg-white shadow rounded">
        <thead>
          <tr className="bg-gray-200 text-black ">
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
              <td className="px-4 py-2">{formatDateToPersian(order.date)}</td>
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
  const formatDateToPersian = (dateStr: string) => {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat("fa-IR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">تاریخچه پرداخت</h2>
      <table className="w-full table-auto bg-white shadow rounded">
        <thead>
          <tr className="bg-gray-200 text-black ">
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
              <td className="px-4 py-2">{formatDateToPersian(payment.date)}</td>
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
        className="md:mx-24 bg-white p-6 shadow rounded"
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
            className="w-full border px-3 py-2 text-black/70 rounded focus:outline-none focus:ring focus:border-blue-300"
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
            className="w-full border px-3 py-2 rounded text-black/70 focus:outline-none focus:ring focus:border-blue-300"
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
const DashboardReport: React.FC = () => {
  // Fake report data which could later be fetched from an API
  const reports = [
    {
      id: 1,
      title: "تعداد سفارشات",
      value: 120,
      icon: <FaShoppingCart size={24} />,
    },
    {
      id: 2,
      title: "کل پرداختی ها",
      value: "$2500.00",
      icon: <FaHistory size={24} />,
    },
    {
      id: 3,
      title: "بروزرسانی پروفایل‌ها",
      value: 5,
      icon: <FaUserEdit size={24} />,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="p-6"
    >
      <h2 className="text-2xl font-semibold mb-4">گزارش کلی</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {reports.map((report) => (
          <motion.div
            key={report.id}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="bg-white/20 rounded shadow p-4 flex flex-col items-center"
          >
            <div className="mb-2 text-yellow-50">{report.icon}</div>
            <h3 className="text-lg text-slate-100 font-medium">
              {report.title}
            </h3>
            <p className="text-2xl text-yellow-300 font-bold mt-2">
              {report.value}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
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
    case "report":
      return <DashboardReport />;
  }
};
const DashboardPage: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<SidebarItem>("report");
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  return (
    <div
      className="min-h-screen overflow-x-hidden bg-gradient-to-l from-[#16222A] to-[#3A6073] text-yellow-500"
      dir="rtl"
    >
      <div className="flex">
        <AnimatePresence>
          {sidebarOpen && (
            <>
              <motion.div
                key="overlay"
                variants={overlayVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                transition={{ duration: 0.3 }}
                className="fixed inset-0 bg-black z-40"
                onClick={toggleSidebar}
              />
              <Sidebar
                key="sidebar"
                selected={selectedItem}
                onSelect={setSelectedItem}
                onClose={toggleSidebar}
              />
            </>
          )}
        </AnimatePresence>
        <div className="flex-1">
          <div className="flex items-center justify-between p-4 bg-white/70 shadow">
            <button
              onClick={toggleSidebar}
              className="text-2xl text-gray-700 focus:outline-none"
            >
              {sidebarOpen ? "✖" : "☰"}
            </button>
            <Link
              href="/"
              className="text-black bg-yellow-400 px-4 py-2 rounded-md shadow-md"
            >
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
