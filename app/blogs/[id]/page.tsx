'use client';

import { useEffect, useState } from 'react';
import BlogPost from '@/components/global/blog-post';
import { getBlogById } from '@/lib/blogActions';

export default function BlogDetailPage() {
  const [blog, setBlog] = useState<any>(null);

  useEffect(() => {
    const fetchBlog = async () => {
      const urlParts = window.location.pathname.split('/');
      const id = urlParts[urlParts.length - 1];
      const data = await getBlogById(id);
      setBlog(data);
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
    author: blog.author?.name || 'Admin',
    date: blog.createdAt,
    readTime: 5,
    image: blog.image || '/assets/images/fade3.jpg',
    tags: blog.tags || ['لوستر', 'دکوراسیون']
  };

  return <BlogPost {...blogPostData} />;
}
