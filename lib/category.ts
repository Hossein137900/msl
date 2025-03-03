import { prisma } from "./prisma";

export async function addCategory(formData: FormData) {
  const title = formData.get("title") as string;
  const childrenValue = formData.get("children");
  const children = childrenValue
    ? (JSON.parse(childrenValue.toString()) as string[])
    : [];
  const newCategory = await prisma.category.create({
    data: {
      title: title,
      children: children,
    },
  });
  return newCategory;
}
