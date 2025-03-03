"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { BsArrowLeft } from "react-icons/bs";
import { getBlogs } from "@/lib/blogActions";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  coverImage: string;
  user: {
    name: string;
  };
  slug: string;
  date: Date;
  readTime: number;
  tags: string[];
}

export default function BlogGrid() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  useEffect(() => {
    async function fetchBlogs() {
      const fetchedBlogs = await getBlogs();
      const mappedBlogs = fetchedBlogs.map((blog) => ({
        id: blog.id,
        title: blog.title,
        slug: generateSlug(blog.title),
        excerpt: blog.description,
        coverImage: blog.image || "/assets/images/fade3.jpg",
        user: {
          name: blog.user.name || "Admin",
        },
        date: blog.createdAt,
        readTime: blog.readTime || 5,
        tags: blog.tags || [],
      }));
      

      setBlogs(mappedBlogs);
    }
    fetchBlogs();
  }, []);
  const filteredBlogs = blogs.filter((blog) => {
    return (
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });
  function generateSlug(title: string) {
    return title
      .trim()
      .replace(/\s+/g, '-')        // Replace spaces with hyphens
      .replace(/[^آ-یa-z0-9\-]/g, '')  // Keep Persian and English letters, numbers, and hyphens
      .replace(/\-\-+/g, '-')      // Replace multiple hyphens with single hyphen
      .replace(/^-+/, '')          // Trim hyphens from start
      .replace(/-+$/, '');         // Trim hyphens from end
  }
  
  
  
  

  return (
    <div
      className=" px-4 py-12 bg-gradient-to-l from-[#16222A] to-[#3A6073]"
      dir="rtl"
    >
      {/* Header Section */}
      <div className="text-center mt-20 mb-4">
        <h1 className="text-4xl font-bold  mb-4">وبلاگ ما</h1>
        <p className="text-gray-300">آخرین مقالات و اخبار دنیای روشنایی</p>
      </div>

      {/* Search Section */}
      <div className="mb-12">
        <div className="relative w-full max-w-xl mx-auto">
          <input
            type="text"
            placeholder="جستجو در مقالات..."
            className="w-full px-4 py-3 bg-white/10 focus:bg-white/20 text-white rounded-lg border placeholder:text-white/70 border-gray-400 focus:outline-none focus:ring-1 focus:ring-yellow-50 "
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
      <div className="grid grid-cols-1 items-center justify-center md:grid-cols-2 lg:grid-cols-4 gap-8">
        {filteredBlogs.map((blog) => (
          <Link target="_blank" href={`/blogs/${blog.id}:${blog.slug}`} key={blog.id}>
            <article className="bg-white/30 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="relative h-48 group overflow-hidden">
                <Image
                  src="/assets/images/fade3.jpg"
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
                  {blog.excerpt.slice(0, 30)}...
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
                      {blog.user.name.slice(0, 1)}
                    </div>
                    <span>{blog.user.name}</span>
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
