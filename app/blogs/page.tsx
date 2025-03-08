"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { BsArrowLeft } from "react-icons/bs";

interface BlogPost {
  slug: any;
  _id: string;
  title: string;
  description: string;
  image: string;
  userId: {
    _id: string;
    username: string;
  };
  user: string;
  content: string;
  seoTitle: string;
  tags: string[];
  readTime: number;
  createdAt: string;
  updatedAt: string;
}

export default function BlogGrid() {
  const [isblog, setBlogs] = useState<BlogPost[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  function generateSlug(title: string) {
    return title
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(
        /[^\u0600-\u06FF\uFB8A\u067E\u0686\u06AF\u200C\u200Fa-z0-9-]/g,
        ""
      )
      .replace(/-+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  useEffect(() => {
    async function fetchBlogs() {
      const fetchedBlogs = await fetch("/api/blog", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await fetchedBlogs.json();
      const mappedBlogs = data.blogs.map((blog: BlogPost) => ({
        _id: blog._id,
        title: blog.title,
        slug: generateSlug(blog.title),
        description: blog.description,
        coverImage: "/assets/images/fade3.jpg",
        user: blog.userId.username,
        date: new Date(blog.createdAt),
        readTime: blog.readTime,
        tags: blog.tags,
        seoTitle: blog.seoTitle,
      }));

      setBlogs(mappedBlogs);
    }
    fetchBlogs();
  }, []);
  const filteredBlogs = isblog.filter((blog) => {
    return (
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div
      className="min-h-screen bg-gradient-to-b from-[#e5d8d0]  to-white py-8"
      dir="rtl"
    >
      {/* Store Banner */}
      <div className="max-w-4xl mx-auto mt-24   pb-12 px-4">
        <div className="bg-[#a37462] rounded-lg shadow-xl overflow-hidden relative">
          <Image
            src="/assets/images/fade3.jpg"
            alt="بنر بلاگ"
            fill
            className="object-cover opacity-30"
          />
          <div className="relative z-10 p-8 text-center">
            <h1 className="text-2xl md:text-5xl font-extrabold text-white mb-4">
              وبلاگ ما
            </h1>
            <p className="text-base md:text-lg text-[#e5d8d0]">
              مقالات و دنیای روشنایی و سیستم های انرژی
            </p>
          </div>
        </div>
      </div>

      {/* Search Section */}
      <div className="max-w-xl mx-auto mb-12 px-4">
        <div className="relative">
          <input
            type="text"
            placeholder="جستجو در وبلاگ..."
            className="w-full px-4 py-3 rounded-lg border border-[#a37462] focus:outline-none focus:ring-2 focus:ring-[#a37462] text-[#a37462] placeholder-[#a37462]/80 bg-white"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <svg
            className="absolute left-3 top-3.5 h-5 w-5 text-[#a37462]/70"
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

      {/* Product (Blog) Grid */}
      <div className="max-w-7xl mx-auto  px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredBlogs.map((blog) => (
          <Link
            target="_blank"
            href={`/blogs/${blog._id}:${blog.slug}`}
            key={blog._id}
          >
            <article className="bg-white/30 rounded-lg  overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="relative h-48 group overflow-hidden">
                <Image
                  src={"/assets/images/fade3.jpg"}
                  alt={blog.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/60 flex items-end justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-[#e5d8d0] my-auto  bg-[#a37462]/10 px-4 py-2 rounded-t-lg text-lg font-bold flex items-center gap-2 transform translate-y-full group-hover:translate-y-0 transition-all duration-300">
                    مشاهده وبلاگ
                    <BsArrowLeft className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform duration-300" />
                  </span>
                </div>
              </div>
              <div className="p-4 flex flex-col flex-grow">
                <h2 className="text-2xl font-bold text-[#a37462] mb-2 line-clamp-2">
                  {blog.title}
                </h2>
                <p className="text-stone-600 flex-grow line-clamp-3 mb-4">
                  {blog.description.slice(0, 30)} ...
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {blog.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-[#a37462] text-white px-2 py-1 rounded-lg text-xs"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-[#e5d8d0] flex items-center justify-center text-[#a37462] font-bold">
                      {blog?.user.slice(0, 1)}
                    </div>
                    <span className="text-[#a37462]">{blog?.user}</span>
                  </div>
                  <span className="text-stone-500">
                    {blog.readTime} دقیقه مطالعه
                  </span>
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>

      {/* Empty State */}
      {filteredBlogs.length === 0 && (
        <div className="max-w-xl mx-auto text-center py-12">
          <div className="text-[#a37462] text-6xl mb-4">🔍</div>
          <h3 className="text-2xl font-bold mb-2 text-[#a37462]">
            محصولی یافت نشد
          </h3>
          <p className="text-stone-600">لطفا با کلمات کلیدی دیگری جستجو کنید</p>
        </div>
      )}
    </div>
  );
}
