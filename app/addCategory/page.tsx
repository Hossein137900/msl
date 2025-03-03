'use client';
import { addCategory } from '@/lib/category';
import { useState } from 'react';
import { toast } from 'react-toastify';

export default function AddCategory() {
  const [title, setTitle] = useState('');
  const [children, setChildren] = useState<string[]>([]);
  const [currentChild, setCurrentChild] = useState('');

  const handleAddChild = () => {
    if (currentChild.trim()) {
      setChildren([...children, currentChild.trim()]);
      setCurrentChild('');
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
    <div className="min-h-screen bg-gradient-to-l from-[#16222A] to-[#3A6073] py-12 pt-28 px-4 sm:px-6 lg:px-8" dir="rtl">
      <div className="max-w-md mx-auto bg-white/20 rounded-xl shadow-md p-8">
        <h2 className="text-2xl font-bold text-center text-yellow-500 mb-8">افزودن دسته‌بندی جدید</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-200">
              عنوان دسته‌بندی
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500 bg-white/10 text-white"
              required
            />
          </div>

          <div>
            <label htmlFor="children" className="block text-sm font-medium text-gray-200">
              زیر دسته‌ها
            </label>
            <div className="flex gap-2 mt-1">
              <input
                type="text"
                id="children"
                value={currentChild}
                onChange={(e) => setCurrentChild(e.target.value)}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500 bg-white/10 text-white"
              />
              <button
                type="button"
                onClick={handleAddChild}
                className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
              >
                +
              </button>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {children.map((child, index) => (
              <div key={index} className="flex items-center bg-white/30 rounded-full px-3 py-1">
                <span className="text-white">{child}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveChild(index)}
                  className="ml-2 text-red-500 hover:text-red-700"
                >
                  ×
                </button>
              </div>
            ))}
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
          >
            ثبت دسته‌بندی
          </button>
        </form>
      </div>
    </div>
  );
}
