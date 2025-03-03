'use server'
import { prisma } from "./prisma";

export async function getBlogs() {
  const blogs = await prisma.blog.findMany({
    include: {
      user: true
    }
  });
  return blogs;
}

export async function getBlogById(id: string) {
  const decodedId = decodeURIComponent(id);
  const blogId = decodedId.split(":")[0];
  const blog = await prisma.blog.findUnique({
    where: {
      id: blogId,
    },
    include: {
      user: true
    }
  });
  return blog;
}
