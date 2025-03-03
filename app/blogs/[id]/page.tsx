import BlogPost from "@/components/global/blog-post";
import { getBlogById } from "@/lib/blogActions";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // Await params to get an object that includes "id"
  const { id } = await params;
  const blogId= id.split(":")[0];
  console.log(blogId);
  
  const blog = await getBlogById(id);
  if (!blog || !blog.title || !blog.content || !blog.createdAt) {
    return {
      title: "Blog Not Found",
      description: "The requested blog post could not be found.",
    };
  }
  return {
    title: blog.seoTitle,
    description: blog.description,
  };
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // Await params to safely access "id"
  const { id } = await params;
  const blog = await getBlogById(id);

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

  return <BlogPost {...blogPostData} />;
}
