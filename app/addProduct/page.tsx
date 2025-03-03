'use client'
import { addProduct } from '@/lib/productActions'
import { useState } from 'react'

interface ProductFormData {
  title: string
  price: string
  description: string
  image: string
  categoryId: string
  properties: Record<string, any>
  colors: Record<string, any>
  videoes: string[]
  thumbnails: string[]
}

export default function AddProductPage() {
  const [formData, setFormData] = useState<ProductFormData>({
    title: '',
    price: '',
    description: '',
    image: '',
    categoryId: '',
    properties: {},
    colors: {},
    videoes: [],
    thumbnails: []
  })

  const [currentProperty, setCurrentProperty] = useState({ key: '', value: '' })
  const [currentColor, setCurrentColor] = useState({ name: '', code: '' })
  const [currentVideo, setCurrentVideo] = useState('')
  const [currentThumbnail, setCurrentThumbnail] = useState('')

  const addProperty = () => {
    if (currentProperty.key && currentProperty.value) {
      setFormData(prev => ({
        ...prev,
        properties: {
          ...prev.properties,
          [currentProperty.key]: currentProperty.value
        }
      }))
      setCurrentProperty({ key: '', value: '' })
    }
  }

  const addColor = () => {
    if (currentColor.name && currentColor.code) {
      setFormData(prev => ({
        ...prev,
        colors: {
          ...prev.colors,
          [currentColor.name]: currentColor.code
        }
      }))
      setCurrentColor({ name: '', code: '' })
    }
  }

  const addVideo = () => {
    if (currentVideo) {
      setFormData(prev => ({
        ...prev,
        videoes: [...prev.videoes, currentVideo]
      }))
      setCurrentVideo('')
    }
  }

  const addThumbnail = () => {
    if (currentThumbnail) {
      setFormData(prev => ({
        ...prev,
        thumbnails: [...prev.thumbnails, currentThumbnail]
      }))
      setCurrentThumbnail('')
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    const submitFormData = new FormData()
    
    // Add basic fields
    submitFormData.append('title', formData.title)
    submitFormData.append('price', formData.price)
    submitFormData.append('description', formData.description)
    submitFormData.append('image', formData.image)
    submitFormData.append('categoryId', formData.categoryId)
    
    // Add complex fields as JSON strings
    submitFormData.append('properties', JSON.stringify(formData.properties))
    submitFormData.append('colors', JSON.stringify(formData.colors))
    submitFormData.append('videoes', JSON.stringify(formData.videoes))
    submitFormData.append('thumbnails', JSON.stringify(formData.thumbnails))

    try {
      const result = await addProduct(submitFormData)
      // Handle successful submission (e.g., show success message, redirect)
    } catch (error) {
      // Handle error (e.g., show error message)
      console.error('Error adding product:', error)
    }
  }
  return (
    <div className="max-w-4xl mx-auto p-8" dir="rtl">
      <h1 className="text-2xl font-bold mb-6">افزودن محصول جدید</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-2">عنوان محصول</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block mb-2">قیمت</label>
            <input
              type="text"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block mb-2">تصویر اصلی</label>
            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block mb-2">دسته‌بندی</label>
            <input
              type="text"
              name="categoryId"
              value={formData.categoryId}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
        </div>

        <div>
          <label className="block mb-2">توضیحات</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows={4}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-2">ویژگی‌ها</label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              placeholder="نام ویژگی"
              value={currentProperty.key}
              onChange={(e) => setCurrentProperty({...currentProperty, key: e.target.value})}
              className="p-2 border rounded"
            />
            <input
              type="text"
              placeholder="مقدار ویژگی"
              value={currentProperty.value}
              onChange={(e) => setCurrentProperty({...currentProperty, value: e.target.value})}
              className="p-2 border rounded"
            />
            <button
              type="button"
              onClick={addProperty}
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              افزودن ویژگی
            </button>
          </div>
          <div className="mt-2">
            {Object.entries(formData.properties).map(([key, value]) => (
              <div key={key} className="inline-block bg-gray-100 rounded px-3 py-1 m-1">
                {key}: {value}
              </div>
            ))}
          </div>
        </div>

        <div>
          <label className="block mb-2">رنگ‌ها</label>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="نام رنگ"
              value={currentColor.name}
              onChange={(e) => setCurrentColor({...currentColor, name: e.target.value})}
              className="p-2 border rounded"
            />
            <input
              type="text"
              placeholder="کد رنگ"
              value={currentColor.code}
              onChange={(e) => setCurrentColor({...currentColor, code: e.target.value})}
              className="p-2 border rounded"
            />
            <button
              type="button"
              onClick={addColor}
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              افزودن رنگ
            </button>
          </div>
          <div className="mt-2">
            {Object.entries(formData.colors).map(([name, code]) => (
              <div key={name} className="inline-block bg-gray-100 rounded px-3 py-1 m-1">
                {name}: {code}
              </div>
            ))}
          </div>
        </div>

        <div>
          <label className="block mb-2">ویدیوها</label>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="لینک ویدیو"
              value={currentVideo}
              onChange={(e) => setCurrentVideo(e.target.value)}
              className="p-2 border rounded flex-1"
            />
            <button
              type="button"
              onClick={addVideo}
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              افزودن ویدیو
            </button>
          </div>
          <div className="mt-2">
            {formData.videoes.map((video, index) => (
              <div key={index} className="inline-block bg-gray-100 rounded px-3 py-1 m-1">
                {video}
              </div>
            ))}
          </div>
        </div>

        <div>
          <label className="block mb-2">تصاویر بندانگشتی</label>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="لینک تصویر"
              value={currentThumbnail}
              onChange={(e) => setCurrentThumbnail(e.target.value)}
              className="p-2 border rounded flex-1"
            />
            <button
              type="button"
              onClick={addThumbnail}
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              افزودن تصویر
            </button>
          </div>
          <div className="mt-2">
            {formData.thumbnails.map((thumbnail, index) => (
              <div key={index} className="inline-block bg-gray-100 rounded px-3 py-1 m-1">
                {thumbnail}
              </div>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-green-500 text-white rounded hover:bg-green-600"
        >
          ثبت محصول
        </button>
      </form>
    </div>
  )
}
