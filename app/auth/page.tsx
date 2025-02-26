"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BiUser,
  BiPhone,
  BiLock,
  BiLockAlt,
  BiLogIn,
  BiUserPlus,
} from "react-icons/bi";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!isLogin && formData.name.length < 3) {
      newErrors.name = "نام باید حداقل ۳ حرف باشد";
    }

    if (formData.phone.length !== 11) {
      newErrors.phone = "شماره موبایل باید ۱۱ رقم باشد";
    }

    if (formData.password.length < 6) {
      newErrors.password = "رمز عبور باید حداقل ۶ کاراکتر باشد";
    }

    if (!isLogin && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "رمز عبور مطابقت ندارد";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted:", formData);
      // Handle authentication logic here
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-l from-[#16222A] to-[#3A6073]  flex items-center justify-center p-4"
      dir="rtl"
    >
      <motion.div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 w-full max-w-md mt-24">
        <AnimatePresence mode="wait">
          <motion.div key={isLogin ? "login" : "signup"}>
            <h2 className="text-3xl font-bold text-white text-center flex items-center justify-center gap-2">
              {isLogin ? "ورود به حساب کاربری" : "ثبت نام"}
              {/* {isLogin ? (
                <BiLogIn className="text-yellow-400" size={30} />
              ) : (
                <BiUserPlus className="text-yellow-400" size={30} />
              )} */}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4 mt-6">
              {!isLogin && (
                <div className="relative">
                  <BiUser
                    className="absolute right-3 top-3.5 text-gray-400"
                    size={20}
                  />
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 pr-10 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-yellow-400"
                    placeholder="نام و نام خانوادگی"
                  />
                  {errors.name && (
                    <span className="text-red-400 text-sm block mt-1">
                      {errors.name}
                    </span>
                  )}
                </div>
              )}

              <div className="relative">
                <BiPhone
                  className="absolute right-3 top-3.5 text-gray-400"
                  size={20}
                />
                <input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 pr-10 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-yellow-400"
                  placeholder="شماره موبایل"
                />
                {errors.phone && (
                  <span className="text-red-400 text-sm block mt-1">
                    {errors.phone}
                  </span>
                )}
              </div>

              <div className="relative">
                <BiLock
                  className="absolute right-3 top-3.5 text-gray-400"
                  size={20}
                />
                <input
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 pr-10 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-yellow-400"
                  placeholder="رمز عبور"
                />
                {errors.password && (
                  <span className="text-red-400 text-sm block mt-1">
                    {errors.password}
                  </span>
                )}
              </div>

              {!isLogin && (
                <div className="relative">
                  <BiLockAlt
                    className="absolute right-3 top-3.5 text-gray-400"
                    size={20}
                  />
                  <input
                    name="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full px-4 py-3 pr-10 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-yellow-400"
                    placeholder="تکرار رمز عبور"
                  />
                  {errors.confirmPassword && (
                    <span className="text-red-400 text-sm block mt-1">
                      {errors.confirmPassword}
                    </span>
                  )}
                </div>
              )}

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 rounded-xl bg-yellow-400 text-black font-bold hover:bg-yellow-300 transition-colors flex items-center justify-center gap-2"
                type="submit"
              >
                {isLogin ? <BiLogIn size={20} /> : <BiUserPlus size={20} />}
                {isLogin ? "ورود" : "ثبت نام"}
              </motion.button>
            </form>

            <div className="text-center mt-6">
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-yellow-400 hover:text-yellow-300 transition-colors flex items-center justify-center gap-2 mx-auto"
              >
                {isLogin ? "ثبت نام نکرده‌اید؟" : "قبلاً ثبت نام کرده‌اید؟"}
                {isLogin ? <BiUserPlus size={20} /> : <BiLogIn size={20} />}
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default AuthPage;
