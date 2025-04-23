"use client";
import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { toast } from 'react-hot-toast';

interface Category {
  _id: string;
  title: string;
  children: string[];
  createdAt: string;
  updatedAt: string;
}

export const EditCategory = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<Category | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    children: [] as string[]
  });
  const [newChild, setNewChild] = useState('');

  // Fetch all categories
  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/category');
      if (!response.ok) {
        throw new Error('Failed to fetch categories');
      }
      const data = await response.json();
      setCategories(data.categories || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
      toast.error('خطا در دریافت دسته‌بندی‌ها');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Delete category
  const handleDelete = async (id: string) => {
    if (window.confirm('آیا از حذف این دسته‌بندی اطمینان دارید؟')) {
      try {
        const response = await fetch(`/api/category/id`, {
          method: 'DELETE',
          headers: {
            'id': id
          }
        });

        if (!response.ok) {
          throw new Error('Failed to delete category');
        }

        toast.success('دسته‌بندی با موفقیت حذف شد');
        fetchCategories(); // Refresh the list
      } catch (error) {
        console.error('Error deleting category:', error);
        toast.error('خطا در حذف دسته‌بندی');
      }
    }
  };

  // Edit category
  const handleEdit = (category: Category) => {
    setCurrentCategory(category);
    setFormData({
      title: category.title,
      children: [...category.children]
    });
    setEditMode(true);
  };

  // Add child category
  const handleAddChild = () => {
    if (newChild.trim()) {
      setFormData({
        ...formData,
        children: [...formData.children, newChild.trim()]
      });
      setNewChild('');
    }
  };

  // Remove child category
  const handleRemoveChild = (index: number) => {
    const updatedChildren = [...formData.children];
    updatedChildren.splice(index, 1);
    setFormData({
      ...formData,
      children: updatedChildren
    });
  };

  // Update category
  const handleUpdate = async () => {
    if (!currentCategory) return;

    try {
      const response = await fetch(`/api/category/id`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'id': currentCategory._id
        },
        body: JSON.stringify({
          name: formData.title,
          children: formData.children
        })
      });

      if (!response.ok) {
        throw new Error('Failed to update category');
      }

      toast.success('دسته‌بندی با موفقیت بروزرسانی شد');
      setEditMode(false);
      fetchCategories(); // Refresh the list
    } catch (error) {
      console.error('Error updating category:', error);
      toast.error('خطا در بروزرسانی دسته‌بندی');
    }
  };

  // Format date to Persian
  const formatDateToPersian = (dateStr: string) => {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat("fa-IR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-yellow-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8" dir="rtl">
      <h2 className="text-3xl font-bold text-center text-yellow-500 mb-8">
        مدیریت دسته‌بندی‌ها
      </h2>

      {editMode ? (
        <div className="bg-white/20 rounded-lg p-6 mb-8">
          <h3 className="text-xl font-bold text-white mb-4">ویرایش دسته‌بندی</h3>
          <div className="mb-4">
            <label className="block text-white mb-2">عنوان دسته‌بندی</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full p-2 rounded bg-white/10 text-white border border-gray-600 focus:border-yellow-500 focus:outline-none"
            />
          </div>

          <div className="mb-4">
            <label className="block text-white mb-2">زیر دسته‌ها</label>
            <div className="flex mb-2">
              <input
                type="text"
                value={newChild}
                onChange={(e) => setNewChild(e.target.value)}
                className="flex-grow p-2 rounded-r bg-white/10 text-white border border-gray-600 focus:border-yellow-500 focus:outline-none"
                placeholder="نام زیر دسته جدید"
              />
              <button
                onClick={handleAddChild}
                className="bg-yellow-500 text-white px-4 py-2 rounded-l hover:bg-yellow-600"
              >
                افزودن
              </button>
            </div>

            <div className="mt-3">
              {formData.children.map((child, index) => (
                <div key={index} className="flex items-center bg-white/5 p-2 rounded mb-2">
                  <span className="flex-grow text-white">{child}</span>
                  <button
                    onClick={() => handleRemoveChild(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FiTrash2 />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end space-x-2">
            <button
              onClick={() => setEditMode(false)}
              className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 ml-2"
            >
              انصراف
            </button>
            <button
              onClick={handleUpdate}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              ذخیره تغییرات
            </button>
          </div>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white/10 rounded-lg overflow-hidden">
            <thead className="bg-yellow-500/80 text-white">
              <tr>
                <th className="py-3 px-4 text-right">عنوان</th>
                <th className="py-3 px-4 text-right">زیر دسته‌ها</th>
                <th className="py-3 px-4 text-right">تاریخ ایجاد</th>
                <th className="py-3 px-4 text-right">عملیات</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <motion.tr
                  key={category._id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="border-b border-gray-700 hover:bg-white/5"
                >
                  <td className="py-3 px-4 text-white">{category.title}</td>
                  <td className="py-3 px-4 text-white">
                    <div className="flex flex-wrap gap-1">
                      {category.children.map((child, index) => (
                        <span key={index} className="bg-gray-700 text-xs text-white px-2 py-1 rounded">
                          {child}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-white">{formatDateToPersian(category.createdAt)}</td>
                  <td className="py-3 px-4">
                    <div className="flex space-x-2">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleEdit(category)}
                        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 ml-2"
                        aria-label="Edit category"
                      >
                        <FiEdit className="w-5 h-5" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleDelete(category._id)}
                        className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
                        aria-label="Delete category"
                      >
                        <FiTrash2 className="w-5 h-5" />
                      </motion.button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default EditCategory;
