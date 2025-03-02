"use client";

import { useEffect, useState } from "react";
import BlogPost from "@/components/global/blog-post";
import { getBlogById } from "@/lib/blogActions";

interface BlogPost {
  title: string;
  content: string;
  readTime: number;
  image: string | null;
  tags: string[];
  id: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  description: string;
  seoTitle: string;
  user: {
    name: string;
  };
}

export default function BlogDetailPage() {
  const [blog, setBlog] = useState<BlogPost | null>(null);

  useEffect(() => {
    const fetchBlog = async () => {
      const urlParts = window.location.pathname.split("/");
      const id = urlParts[urlParts.length - 1];
      const data = (await getBlogById(id)) as BlogPost;
      console.log(data);
      if (data) {
        setBlog(data);
      }
    };
    fetchBlog();
  }, []);

  if (!blog) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-yellow-500"></div>
      </div>
    );
  }

  const blogPostData = {
    title: blog.title,
    content: blog.content,
    author: blog.user?.name || "Admin",
    date: blog.createdAt,
    readTime: 5,
    image: blog.image || "/assets/images/fade3.jpg",
    tags: blog.tags || ["لوستر", "دکوراسیون"],
  };

 if(blog){ return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <BlogPost {...blogPostData} />
    </div>
  );}
  if(!blog){
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-yellow-500"></div>
      </div>
    );
  }

}
