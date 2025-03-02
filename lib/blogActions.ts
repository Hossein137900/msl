'use server'
import { prisma } from "./prisma";

export async function getBlogs() {
  const blogs = await prisma.blog.findMany();
  return blogs;
}
export async function getBlogById(id: string) {
  const blog = await prisma.blog.findUnique({
    where: {
      id,
    },
  });
  return blog;
}