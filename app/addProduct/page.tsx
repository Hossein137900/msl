"use client";
import ImageSelectorModal from "@/components/ImageSelectorModal";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FiUploadCloud } from "react-icons/fi";

export interface Category {
  _id: string;
  title: string;
  children: string[];
}

export interface CategoryResponse {
  success: boolean;
  data: Category[];
}
interface StorySettings {
  title: string;
  image: string;
}


interface ProductFormData {
  title: string;
  price: string;
  description: string;
  image: string;
  categoryId: string;
  categoryChildren: string;
  properties: Record<string, string>;
  colors: Record<string, string>;
  videoes: string[];
  thumbnails: string[];
}

export default function AddProductPage() {
  const [formData, setFormData] = useState<ProductFormData>({
    title: "",
    price: "",
    description: "",
    image: "",
    categoryId: "",
    categoryChildren: "",
    properties: {},
    colors: {},
    videoes: [],
    thumbnails: [],
  });

  const [currentProperty, setCurrentProperty] = useState({
    key: "",
    value: "",
  });
  const [currentColor, setCurrentColor] = useState({ name: "", code: "" });
  const [currentVideo, setCurrentVideo] = useState("");
  const [currentThumbnail, setCurrentThumbnail] = useState("");
  const [isImageSelectorOpen, setIsImageSelectorOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [settings, setSettings] = useState<StorySettings>({
    title: "",
    image: "",
  });
  const addProperty = () => {
    if (currentProperty.key && currentProperty.value) {
      setFormData((prev) => ({
        ...prev,
        properties: {
          ...prev.properties,
          [currentProperty.key]: currentProperty.value,
        },
      }));
      setCurrentProperty({ key: "", value: "" });
    }
  };

  const addColor = () => {
    if (currentColor.name && currentColor.code) {
      setFormData((prev) => ({
        ...prev,
        colors: {
          ...prev.colors,
          [currentColor.name]: currentColor.code,
        },
      }));
      setCurrentColor({ name: "", code: "" });
    }
  };

  const addVideo = () => {
    if (currentVideo) {
      setFormData((prev) => ({
        ...prev,
        videoes: [...prev.videoes, currentVideo],
      }));
      setCurrentVideo("");
    }
  };

  const addThumbnail = () => {
    if (currentThumbnail) {
      setFormData((prev) => ({
        ...prev,
        thumbnails: [...prev.thumbnails, currentThumbnail],
      }));
      setCurrentThumbnail("");
    }
  };
  const handleImageSelect = (image: { fileUrl: string }) => {
    setSettings((prev) => ({
      ...prev,
      image: image.fileUrl,
    }));
    setIsImageSelectorOpen(false);
  };


  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const submitFormData = new FormData();

    // Add all required fields from the model
    submitFormData.append("title", formData.title);
    submitFormData.append("price", formData.price);
    submitFormData.append("description", formData.description);
    submitFormData.append("image", settings.image);
    submitFormData.append("categoryId", formData.categoryId);
    submitFormData.append("categoryChildren", formData.categoryChildren);

    // Convert complex objects to JSON strings as expected by the endpoint
    submitFormData.append("properties", JSON.stringify(formData.properties));
    submitFormData.append("colors", JSON.stringify(formData.colors));
    submitFormData.append("videoes", JSON.stringify(formData.videoes));
    submitFormData.append("thumbnails", JSON.stringify(formData.thumbnails));

    try {
      const response = await fetch("/api/products", {
        method: "POST",
        body: submitFormData,
      });

      if (response.ok) {
        const result = await response.json();
        // Handle success - maybe clear form or show success message
        console.log("Product created successfully:", result);
      } else {
        throw new Error("Failed to create product");
      }
    } catch (error) {
      console.error("Error creating product:", error);
      // Handle error - show error message to user
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch("api/category");
      const data = await response.json();

      if (data) {
        setCategories(data.categories);
        console.log(data.categories);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);
  return (
    <div
      className="max-w-4xl mx-auto mt-36 p-8  rounded-xl shadow-lg"
      dir="rtl"
    >
      <h1 className="text-2xl font-bold mb-6">افزودن محصول جدید</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-2 text-[#a37462]">عنوان محصول</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="w-full p-2 border border-[#a37462]/30 rounded text-black bg-white/50 focus:outline-none focus:border-[#a37462] focus:ring-[#a37462] transition-colors duration-200"
              required
            />
          </div>

          <div>
            <label className="block mb-2 text-[#a37462]">قیمت</label>
            <input
              type="text"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              className="w-full p-2 border border-[#a37462]/30 rounded text-black bg-white/50 focus:outline-none focus:border-[#a37462] focus:ring-[#a37462] transition-colors duration-200"
              required
            />
          </div>

          <div>
            <label className="block mb-2 text-[#a37462]">تصویر اصلی</label>
            <ImageSelectorModal
          isOpen={isImageSelectorOpen}
          onClose={() => setIsImageSelectorOpen(false)}
          onSelectImage={handleImageSelect}
        />
            <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsImageSelectorOpen(true)}
                  className="bg-[#eff1f2] text-black px-4 py-3 rounded-lg flex items-center space-x-2 w-full"
                >
                  <FiUploadCloud />
                  <span>انتخاب تصویر</span>
                </motion.button>
          </div>

          <div>
            <label className="block mb-2 text-[#a37462]">دسته‌بندی</label>

            <select
              value={formData.categoryId}
              name="categoryId"
              onChange={handleInputChange}
              className="w-full p-2 mb-2 border border-[#a37462]/30 rounded text-black bg-white/50 focus:outline-none focus:border-[#a37462] focus:ring-[#a37462] transition-colors duration-200"
            >
              <option value="">انتخاب دسته‌بندی اصلی</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.title}
                </option>
              ))}
            </select>

            {formData.categoryId && (
              <select
                value={formData.categoryChildren}
                name="categoryChildren"
                onChange={handleInputChange}
                className="w-full p-2 border border-[#a37462]/30 rounded text-black bg-white/50 focus:outline-none focus:border-[#a37462] focus:ring-[#a37462] transition-colors duration-200"
                required
              >
                <option value="">انتخاب زیر دسته</option>
                {categories
                  .find((cat) => cat._id === formData.categoryId)
                  ?.children.map((child, index) => (
                    <option key={index} value={child}>
                      {child}
                    </option>
                  ))}
              </select>
            )}
          </div>
        </div>

        <div>
          <label className="block mb-2 text-[#a37462]">توضیحات</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows={4}
            className="w-full p-2 border border-[#a37462]/30 rounded text-black bg-white/50 focus:outline-none focus:border-[#a37462] focus:ring-[#a37462] transition-colors duration-200"
            required
          />
        </div>

        <div>
          <label className="block mb-2 text-[#a37462]">ویژگی‌ها</label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              placeholder="نام ویژگی"
              value={currentProperty.key}
              onChange={(e) =>
                setCurrentProperty({ ...currentProperty, key: e.target.value })
              }
              className=" p-2 border border-[#a37462]/30 rounded text-black bg-white/50 focus:outline-none focus:border-[#a37462] focus:ring-[#a37462] transition-colors duration-200"
            />
            <input
              type="text"
              placeholder="مقدار ویژگی"
              value={currentProperty.value}
              onChange={(e) =>
                setCurrentProperty({
                  ...currentProperty,
                  value: e.target.value,
                })
              }
              className=" p-2 border border-[#a37462]/30 rounded text-black bg-white/50 focus:outline-none focus:border-[#a37462] focus:ring-[#a37462] transition-colors duration-200"
            />
            <button
              type="button"
              onClick={addProperty}
              className="px-4 py-2 bg-[#a37462] text-[#e5d8d0] rounded hover:bg-[#a37462]/80 transition-colors duration-200"
            >
              افزودن ویژگی
            </button>
          </div>
          <div className="mt-2">
            {Object.entries(formData.properties).map(([key, value]) => (
              <div
                key={key}
                className="inline-block bg-[#a37462]/10 text-[#a37462] rounded px-3 py-1 m-1"
              >
                {key}: {value}
              </div>
            ))}
          </div>
        </div>

        <div>
          <label className="block mb-2 text-[#a37462]">رنگ‌ها</label>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="نام رنگ"
              value={currentColor.name}
              onChange={(e) =>
                setCurrentColor({ ...currentColor, name: e.target.value })
              }
              className=" p-2 border border-[#a37462]/30 rounded text-black bg-white/50 focus:outline-none focus:border-[#a37462] focus:ring-[#a37462] transition-colors duration-200"
            />
            <input
              type="text"
              placeholder="کد رنگ"
              value={currentColor.code}
              onChange={(e) =>
                setCurrentColor({ ...currentColor, code: e.target.value })
              }
              className=" p-2 border border-[#a37462]/30 rounded text-black bg-white/50 focus:outline-none focus:border-[#a37462] focus:ring-[#a37462] transition-colors duration-200"
            />
            <button
              type="button"
              onClick={addColor}
              className="px-4 py-2 bg-[#a37462] text-[#e5d8d0] rounded hover:bg-[#a37462]/80 transition-colors duration-200"
            >
              افزودن رنگ
            </button>
          </div>
          <div className="mt-2">
            {Object.entries(formData.colors).map(([name, code]) => (
              <div
                key={name}
                className="inline-block bg-[#a37462]/10 text-[#a37462] rounded px-3 py-1 m-1"
              >
                {name}: {code}
              </div>
            ))}
          </div>
        </div>

        <div>
          <label className="block mb-2 text-[#a37462]">ویدیوها</label>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="لینک ویدیو"
              value={currentVideo}
              onChange={(e) => setCurrentVideo(e.target.value)}
              className=" p-2 border border-[#a37462]/30 rounded text-black bg-white/50 focus:outline-none focus:border-[#a37462] focus:ring-[#a37462] transition-colors duration-200"
            />
            <button
              type="button"
              onClick={addVideo}
              className="px-4 py-2 bg-[#a37462] text-[#e5d8d0] rounded hover:bg-[#a37462]/80 transition-colors duration-200"
            >
              افزودن ویدیو
            </button>
          </div>
          <div className="mt-2">
            {formData.videoes.map((video, index) => (
              <div
                key={index}
                className="inline-block bg-gray-100 rounded px-3 py-1 m-1"
              >
                {video}
              </div>
            ))}
          </div>
        </div>

        <div>
          <label className="block mb-2 text-[#a37462]">تصاویر بندانگشتی</label>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="لینک تصویر"
              value={currentThumbnail}
              onChange={(e) => setCurrentThumbnail(e.target.value)}
              className=" p-2 border border-[#a37462]/30 rounded text-black bg-white/50 focus:outline-none focus:border-[#a37462] focus:ring-[#a37462] transition-colors duration-200"
            />
            <button
              type="button"
              onClick={addThumbnail}
              className="px-4 py-2 bg-[#a37462] text-[#e5d8d0] rounded hover:bg-[#a37462]/80 transition-colors duration-200"
            >
              افزودن تصویر
            </button>
          </div>
          <div className="mt-2">
            {formData.thumbnails.map((thumbnail, index) => (
              <div
                key={index}
                className="inline-block bg-gray-100 rounded px-3 py-1 m-1"
              >
                {thumbnail}
              </div>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-[#a37462] text-[#e5d8d0] rounded hover:bg-[#a37462]/90 transition-colors duration-200 shadow-md"
        >
          ثبت محصول
        </button>
      </form>
    </div>
  );
}
