'use client';
import { addCategory } from '@/lib/category';
import { useState } from 'react';
import { toast } from 'react-toastify';

export default function AddCategory() {
  const [title, setTitle] = useState("");
  const [children, setChildren] = useState<string[]>([]);
  const [currentChild, setCurrentChild] = useState("");

  const handleAddChild = () => {
    if (currentChild.trim()) {
      setChildren([...children, currentChild.trim()]);
      setCurrentChild("");
    }
  };

  const handleRemoveChild = (index: number) => {
    setChildren(children.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const formData = new FormData()
    formData.append('title', title)
    formData.append('children', JSON.stringify(children))

    const response = await addCategory(formData)
    if (response.success) {
      toast.success('دسته‌بندی با موفقیت افزوده شد')
    } else {
      console.error('Failed to add category:', response.error)
      toast.error('خطا در افزودن دسته‌بندی')
    }
}

  return (
    <div className="min-h-screen py-12 pt-28 px-4 sm:px-6 lg:px-8" dir="rtl">
      <div className="max-w-md mx-auto mt-12 md:mt-24 bg-[#a37462]/20 rounded-xl shadow-lg p-8 border border-[#a37462]/30">
        <h2 className="text-2xl font-bold text-center text-[#a37462] mb-8">
          افزودن دسته‌بندی جدید
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-[#a37462]"
            >
              عنوان دسته‌بندی
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 py-2 block w-full rounded-md border-[#a37462] focus:outline-none shadow-sm focus:border-[#a37462] focus:ring-[#a37462] bg-white/10 text-[#a37462]"
              required
            />
          </div>

          <div>
            <label
              htmlFor="children"
              className="block text-sm font-medium text-[#a37462]"
            >
              زیر دسته‌ها
            </label>
            <div className="flex gap-2 mt-1">
              <input
                type="text"
                id="children"
                value={currentChild}
                onChange={(e) => setCurrentChild(e.target.value)}
                className="block w-full focus:outline-none rounded-md border-[#a37462] shadow-sm focus:border-[#a37462] focus:ring-[#a37462] bg-white/10 text-[#a37462]"
              />
              <button
                type="button"
                onClick={handleAddChild}
                className="px-4 py-2 bg-[#a37462] text-[#e5d8d0] rounded-md hover:bg-[#a37462]/80 transition-colors duration-200"
              >
                +
              </button>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {children.map((child, index) => (
              <div
                key={index}
                className="flex items-center bg-[#a37462]/30 rounded-full px-3 py-1"
              >
                <span className="text-[#a37462]">{child}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveChild(index)}
                  className="mr-2 text-gray-900 text-lg hover:text-[#a37462]/70"
                >
                  ×
                </button>
              </div>
            ))}
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-[#a37462] rounded-md shadow-sm text-sm font-medium text-[#e5d8d0] bg-[#a37462] hover:bg-[#a37462]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#a37462] transition-colors duration-200"
          >
            ثبت دسته‌بندی
          </button>
        </form>
      </div>
    </div>
  );
}
