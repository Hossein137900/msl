"use client";
import Image from "next/image";
import Link from "next/link";
import { BsArrowLeft } from "react-icons/bs";
import { prisma } from "@/lib/prisma";
import { useState } from "react";
interface BlogPost {
  id: string;
  title: string;
  content: string;
  description: string;
  image: string | null;
  seoTitle: string;
  tags: string[];
  userId: string;
  readTime: number;
  createdAt: Date;
  updatedAt: Date;
  excerpt: string;
  coverImage: string;
  author: string;
  date: string;
}

// const sampleBlogs: BlogPost[] = [
//   {
//     id: "1",
//     title: "جدیدترین مدل‌های لوستر مدرن ۱۴۰۳",
//     excerpt:
//       "معرفی برترین لوسترهای مدرن با طراحی خاص و نورپردازی منحصر به فرد برای دکوراسیون داخلی منزل",
//     coverImage: "/assets/images/fade3.jpg",
//     author: "سارا احمدی",
//     date: new Date(),
//     readTime: 6,
//     tags: ["لوستر", "دکوراسیون", "روشنایی مدرن"],
//   },
//   {
//     id: "2",
//     title: "راهنمای خرید چراغ‌های دیواری",
//     excerpt:
//       "بررسی کامل نکات مهم در انتخاب و خرید انواع چراغ‌های دیواری برای فضاهای مختلف منزل و محل کار",
//     coverImage: "/assets/images/fade3.jpg",
//     author: "رضا کریمی",
//     date: new Date(),
//     readTime: 5,
//     tags: ["چراغ دیواری", "نورپردازی", "دکوراسیون داخلی"],
//   },
// ];

export default async function BlogGrid() {
  const blogs = await prisma.blog.findMany({});
  const sampleBlogs = blogs.map((blog) => ({
    ...blog,
    excerpt: blog.content.slice(0, 100),
    coverImage: blog.image || "/default-cover.jpg",
    author: "Unknown Author",
    date: new Date().toLocaleDateString(),
  }));
  const [searchQuery, setSearchQuery] = useState("");

  const filteredBlogs = sampleBlogs.filter((blog: BlogPost) => {
    return (
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div
      className=" px-4 py-12 bg-gradient-to-l from-[#16222A] to-[#3A6073]"
      dir="rtl"
    >
      {/* Header Section */}
      <div className="text-center mt-24 mb-4">
        <h1 className="text-4xl font-bold mb-4">وبلاگ ما</h1>
        <p className="text-gray-300">آخرین مقالات و اخبار دنیای روشنایی</p>
      </div>

      {/* Search Section */}
      <div className="mb-12">
        <div className="relative w-full max-w-xl mx-auto">
          <input
            type="text"
            placeholder="جستجو در مقالات..."
            className="w-full px-4 py-3 text-black rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-500 "
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <svg
            className="absolute left-3 top-3.5 h-5 w-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      {/* Blog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {filteredBlogs.map((blog: BlogPost) => (
          <Link target="_blank" href={`/blog/${blog.id}`} key={blog.id}>
            <article className="bg-white/30 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="relative h-48 group overflow-hidden">
                <Image
                  src={blog.coverImage}
                  alt={blog.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-white text-lg font-bold translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex items-center gap-2">
                    مشاهده وبلاگ
                    <BsArrowLeft className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" />
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h2 className="text-xl text-white font-semibold mb-3 line-clamp-2">
                  {blog.title}
                </h2>
                <p className="text-gray-300 mb-4 line-clamp-3">
                  {blog.excerpt.slice(0, 50)}...
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {blog.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-yellow-300 text-gray-600 px-2 py-1 rounded-full text-xs"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between text-sm text-gray-200">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center">
                      {blog.author[0]}
                    </div>
                    <span>{blog.author}</span>
                  </div>
                  <span>{blog.readTime} دقیقه مطالعه</span>
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>

      {/* Empty State */}
      {filteredBlogs.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-bold mb-2">مقاله‌ای یافت نشد</h3>
          <p className="text-gray-400">لطفا با کلمات کلیدی دیگری جستجو کنید</p>
        </div>
      )}
    </div>
  );
}
