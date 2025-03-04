"use server";
import { prisma } from "./prisma";
import * as jwt from "jsonwebtoken";

export async function addToCart(formData: FormData, token: string) {
  const JWT_SECRET = process.env.JWT_SECRET || "msl";

  const decodedToken = jwt.verify(token, JWT_SECRET) as { userId: string };
  const userId = decodedToken.userId;

  // Get the file name instead of the File object
  const receiptImage = formData.get("receiptImage") as File;
  const imageName =
    receiptImage instanceof File ? receiptImage.name : String(receiptImage);

  const items = JSON.parse(formData.get("items") as string);
  console.log(items);
  const path = formData.get("paymentMethod") as string;
  const totalPrice = parseInt(formData.get("totalPrice") as string);

  // Create the cart with proper data types
  try {
    const cart = await prisma.cart.create({
      data: {
        userId,
        path,
        image: imageName,
        totalPrice,
        items: {
          create: items.map(
            (item: { productId: string; quantity: number }) => ({
              productId: item.productId,
              quantity: item.quantity,
            })
          ),
        },
      },
    });

    return cart;
  } catch (error) {
    console.error("Cart creation error:", {
      name: error,
      message: error,
      cause: error,
    });
    throw new Error("Failed to create cart: " + error);
  }
}

export async function getUserCart(token: string) {
  const JWT_SECRET = process.env.JWT_SECRET || "msl";
  const decodedToken = jwt.verify(token, JWT_SECRET) as { userId: string };
  const userId = decodedToken.userId;

  const cart = await prisma.cart.findFirst({
    where: {
      userId: userId,
    },
    include: {
      products: true,
    },
  });

  return cart;
}

export async function getAllCarts() {
  const cart = await prisma.cart.findMany({
    include: {
      user: true,
      products: true,
    },
  });
  return cart;
}
