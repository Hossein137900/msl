"use server";
import { prisma } from "./prisma";

export async function addProduct(formData: FormData) {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const price = formData.get("price") as string;
  const image = formData.get("image") as string;
  const properties = JSON.parse(formData.get("properties")?.toString() || "{}");
  const colors = JSON.parse(formData.get("colors")?.toString() || "{}");
  const videoes = JSON.parse(
    formData.get("videoes")?.toString() || "[]"
  ) as string[];
  const thumbnails = JSON.parse(
    formData.get("thumbnails")?.toString() || "[]"
  ) as string[];
  const categoryId = formData.get("categoryId") as string;
  const categoryChildren = formData.get("categoryChildren")?.toString() || "";

  const newProduct = await prisma.product.create({
    data: {
      title,
      description,
      price,
      image,
      properties,
      colors,
      videoes,
      thumbnails,
      categoryId,
      categoryChildren,
    },
  });
  return newProduct;
}
export async function getProduct(Id: string) {
    const id = decodeURIComponent(Id).split(':')[0];
    const product = await prisma.product.findUnique({
        where: {
           id ,
        },
    });
    return product;
   
}

export async function getProducts() {
  const products = await prisma.product.findMany();
  return products;
}
