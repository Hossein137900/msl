"use server";
import { prisma } from "./prisma";

export async function addCategory(formData: FormData) {
  try {
    const title = formData.get("title") as string;
    const childrenValue = formData.get("children");
    const children = childrenValue
      ? (JSON.parse(childrenValue.toString()) as string[])
      : [];

    const newCategory = await prisma.category.create({
      data: {
        title,
        children,
      },
    });
    return { success: true, data: newCategory };
  } catch (error) {
    return { success: false, error: error };
  }
}
export async function getCategories() {
  try {
    const categories = await prisma.category.findMany();
    return { success: true, data: categories };
  } catch (error) {
    return { success: false, error: error };
  }
}
