"use client";
import MultiImageDropzoneUsage from "@/components/static/adminComponent/FileUploadForm";
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FiUploadCloud, FiPlusCircle, FiX } from "react-icons/fi";
import { toast } from "react-toastify";

export interface Category {
  _id: string;
  title: string;
  children: string[];
}

export interface CategoryResponse {
  success: boolean;
  data: Category[];
}

interface UploadedFile {
  name: string;
  url: string;
  type: string;
  _id: string;
  __v: number;
  createdAt: string;
  updatedAt: string;
}



interface ProductFormData {
  title: string;
  price: string;
  description: string;
  image: string;
  imageAlt: string;
  categoryId: string;
  categoryChildren: string;
  properties: Record<string, string>;
  colors: Record<string, string>;
  videoes: string[];
  thumbnails: string[];
  thumbnailAlts: string[];
}

export default function AddProductPage() {
  const [formData, setFormData] = useState<ProductFormData>({
    title: "",
    price: "",
    description: "",
    image: "",
    imageAlt: "",
    categoryId: "",
    categoryChildren: "",
    properties: {},
    colors: {},
    videoes: [],
    thumbnails: [],
    thumbnailAlts: [],
  });

  const [currentProperty, setCurrentProperty] = useState({
    key: "",
    value: "",
  });
  const [currentColor, setCurrentColor] = useState({ name: "", code: "" });
  const [currentVideo, setCurrentVideo] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  
  const [showFileUploader, setShowFileUploader] = useState(false);
  const [uploadType, setUploadType] = useState<"main" | "thumbnail">("main");

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

  const handleFileUploadComplete = (files: UploadedFile[]) => {
    if (files.length > 0) {
      if (uploadType === "main") {
        // Use the first uploaded file for the main product image
        setFormData(prev => ({
          ...prev,
          image: files[0].url,
          imageAlt: files[0].name
        }));
      } else if (uploadType === "thumbnail") {
        // Add all uploaded files as thumbnails
        const newThumbnails = files.map(file => file.url);
        const newThumbnailAlts = files.map(file => file.name);
        
        setFormData(prev => ({
          ...prev,
          thumbnails: [...prev.thumbnails, ...newThumbnails],
          thumbnailAlts: [...prev.thumbnailAlts, ...newThumbnailAlts]
        }));
      }
      
      setShowFileUploader(false);
      toast.success("تصاویر با موفقیت آپلود شدند");
    }
  };

  const removeThumbnail = (index: number) => {
    setFormData(prev => ({
      ...prev,
      thumbnails: prev.thumbnails.filter((_, i) => i !== index),
      thumbnailAlts: prev.thumbnailAlts.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate required fields
    if (!formData.image) {
      toast.error("لطفا تصویر اصلی محصول را انتخاب کنید");
      return;
    }

    const submitFormData = new FormData();

    // Add all required fields from the model
    submitFormData.append("title", formData.title);
    submitFormData.append("price", formData.price);
    submitFormData.append("description", formData.description);
    submitFormData.append("image", formData.image);
    submitFormData.append("categoryId", formData.categoryId);
    submitFormData.append("categoryChildren", formData.categoryChildren);

    // Convert complex objects to JSON strings as expected by the endpoint
    submitFormData.append("properties", JSON.stringify(formData.properties));
    submitFormData.append("colors", JSON.stringify(formData.colors));
    submitFormData.append("videoes", JSON.stringify(formData.videoes));
    submitFormData.append("thumbnails", JSON.stringify(formData.thumbnails));

    console.log("Submitting product with image URL:", formData.image);
    console.log("Thumbnails:", formData.thumbnails);

    try {
      const response = await fetch("/api/products", {
        method: "POST",
        body: submitFormData,
      });

      if (response.ok) {
        const result = await response.json();
        toast.success("محصول با موفقیت ایجاد شد");
        console.log("Product created successfully:", result);
        
        // Reset form after successful submission
        setFormData({
          title: "",
          price: "",
          description: "",
          image: "",
          imageAlt: "",
          categoryId: "",
          categoryChildren: "",
          properties: {},
          colors: {},
          videoes: [],
          thumbnails: [],
          thumbnailAlts: [],
        });
      } else {
        toast.error("Failed to create product");
      }
    } catch (error) {
      console.error("Error creating product:", error);
      toast.error("خطا در ایجاد محصول");
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

  const openFileUploader = (type: "main" | "thumbnail") => {
    setUploadType(type);
    setShowFileUploader(true);
  };

  useEffect(() => {
    fetchCategories();
  }, []);
  
  return (
    <div
      className="max-w-4xl mx-auto mt-36 p-8 rounded-xl shadow-lg"
      dir="rtl"
    >
      <h1 className="text-2xl font-bold mb-6 text-white">افزودن محصول جدید</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-2 text-[#fff]">عنوان محصول</label>
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
            <label className="block mb-2 text-[#fff]">قیمت</label>
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
            <label className="block mb-2 text-[#fff]">تصویر اصلی</label>
            {formData.image ? (
              <div className="mb-2">
                <div className="flex items-center space-x-2">
                  <Image 
                    src={formData.image} 
                    alt={formData.imageAlt} 
                    className="w-20 h-20 object-cover rounded"
                    width={200}
                    height={80}
                  />
                  <div className="text-sm">
                    <p className="text-white">{formData.imageAlt}</p>
                    <button 
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, image: "", imageAlt: "" }))}
                      className="text-red-400 hover:text-red-500"
                    >
                      حذف
                    </button>
                  </div>
                </div>
              </div>
            ) : null}
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => openFileUploader("main")}
              type="button"
              className="bg-[#eff1f2] text-black px-4 py-3 rounded-lg flex items-center space-x-2 w-full"
            >
              <FiUploadCloud />
              <span>آپلود تصویر اصلی</span>
            </motion.button>
          </div>

          <div>
            <label className="block mb-2 text-[#fff]">دسته‌بندی</label>

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
          <label className="block mb-2 text-[#fff]">توضیحات</label>
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
          <label className="block mb-2 text-[#fff]">ویژگی‌ها</label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              placeholder="نام ویژگی"
              value={currentProperty.key}
              onChange={(e) =>
                setCurrentProperty({ ...currentProperty, key: e.target.value })
              }
              className=" p-2 border border-[#a37462]/30 rounded text-black placeholder:text-white/60 bg-white/50 focus:outline-none focus:border-[#a37462] focus:ring-[#a37462] transition-colors duration-200"
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
              className=" p-2 border border-[#a37462]/30 rounded text-black placeholder:text-white/60 bg-white/50 focus:outline-none focus:border-[#a37462] focus:ring-[#a37462] transition-colors duration-200"
            />
            <button
              type="button"
              onClick={addProperty}
              className="px-4 py-2 bg-green-400 text-white rounded hover:bg-green-500"
            >
              افزودن ویژگی
            </button>
          </div>
          <div className="mt-2">
            {Object.entries(formData.properties).map(([key, value]) => (
              <div
              key={key}
              className="inline-block bg-[#4ade80]/30 text-[#fff]/80 rounded px-3 py-1 m-1"
            >
              {key}: {value}
              <button
                type="button"
                onClick={() => {
                  setFormData(prev => {
                    const newProperties = { ...prev.properties };
                    delete newProperties[key];
                    return { ...prev, properties: newProperties };
                  });
                }}
                className="ml-2 text-red-300 hover:text-red-500"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>

      <div>
        <label className="block mb-2 text-[#fff]">رنگ‌ها</label>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="نام رنگ"
            value={currentColor.name}
            onChange={(e) =>
              setCurrentColor({ ...currentColor, name: e.target.value })
            }
            className=" p-2 border border-[#a37462]/30 rounded text-black bg-white/50 placeholder:text-white/60 focus:outline-none focus:border-[#a37462] focus:ring-[#a37462] transition-colors duration-200"
          />
          <input
            type="text"
            placeholder="کد رنگ"
            value={currentColor.code}
            onChange={(e) =>
              setCurrentColor({ ...currentColor, code: e.target.value })
            }
            className=" p-2 border border-[#a37462]/30 rounded text-black bg-white/50 placeholder:text-white/60 focus:outline-none focus:border-[#a37462] focus:ring-[#a37462] transition-colors duration-200"
          />
          <button
            type="button"
            onClick={addColor}
            className="px-4 py-2 bg-green-400 text-white rounded hover:bg-green-500"
          >
            افزودن رنگ
          </button>
        </div>
        <div className="mt-2">
          {Object.entries(formData.colors).map(([name, code]) => (
            <div
              key={name}
              className="inline-block bg-[#4ade80]/30 text-[#fff]/80 rounded px-3 py-1 m-1"
            >
              {name}: {code}
              <button
                type="button"
                onClick={() => {
                  setFormData(prev => {
                    const newColors = { ...prev.colors };
                    delete newColors[name];
                    return { ...prev, colors: newColors };
                  });
                }}
                className="ml-2 text-red-300 hover:text-red-500"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>

      <div>
        <label className="block mb-2 text-[#fff]">ویدیوها</label>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="لینک ویدیو"
            value={currentVideo}
            onChange={(e) => setCurrentVideo(e.target.value)}
            className=" p-2 border border-[#a37462]/30 rounded text-black placeholder:text-white/60 bg-white/50 focus:outline-none focus:border-[#a37462] focus:ring-[#a37462] transition-colors duration-200"
          />
          <button
            type="button"
            onClick={addVideo}
            className="px-4 py-2 bg-green-400 text-white rounded hover:bg-green-500"
          >
            افزودن ویدیو
          </button>
        </div>
        <div className="mt-2">
          {formData.videoes.map((video, index) => (
            <div
              key={index}
              className="inline-block bg-[#4ade80]/30 text-[#fff]/80 rounded px-3 py-1 m-1"
            >
              {video}
              <button
                type="button"
                onClick={() => {
                  setFormData(prev => ({
                    ...prev,
                    videoes: prev.videoes.filter((_, i) => i !== index)
                  }));
                }}
                className="ml-2 text-red-300 hover:text-red-500"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>

      <div>
        <label className="block mb-2 text-[#fff]">تصاویر بندانگشتی</label>
        <div className="mb-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => openFileUploader("thumbnail")}
            type="button"
            className="bg-[#eff1f2] text-black px-4 py-3 rounded-lg flex items-center space-x-2 w-full"
          >
                         <FiPlusCircle />
              <span>افزودن تصاویر بندانگشتی</span>
            </motion.button>
          </div>
          
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {formData.thumbnails.map((thumbnail, index) => (
              <div key={index} className="relative group">
                <Image 
                  src={thumbnail} 
                  alt={formData.thumbnailAlts[index] || `thumbnail-${index}`} 
                  className="w-full h-24 object-cover rounded"
                  width={200}
                  height={200}
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200 flex items-center justify-center">
                  <button
                    type="button"
                    onClick={() => removeThumbnail(index)}
                    className="bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <FiX />
                  </button>
                </div>
                <p className="text-xs text-white mt-1 truncate">
                  {formData.thumbnailAlts[index] || `تصویر ${index + 1}`}
                </p>
              </div>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-transparent text-[#fff] border rounded hover:bg-gray-700 transition-colors duration-200 shadow-md"
        >
          ثبت محصول
        </button>
      </form>

      {/* File Upload Modal */}
      {showFileUploader && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-2xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">
                {uploadType === "main" ? "آپلود تصویر اصلی" : "آپلود تصاویر بندانگشتی"}
              </h2>
              <button 
                onClick={() => setShowFileUploader(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>
            
            <div className="custom-file-uploader">
              <MultiImageDropzoneUsage 
                onUploadComplete={handleFileUploadComplete}
              />
            </div>
            
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setShowFileUploader(false)}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
              >
                بستن
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

