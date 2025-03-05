"use server";
import { prisma } from "./prisma";
import * as jwt from "jsonwebtoken";
// import { getProduct, getProducts } from "./productActions";

export async function addToCart(formData: FormData, token: string) {
  const JWT_SECRET =  "msl";

  const decodedToken = jwt.verify(token, 'msl') as { userId: string };
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

// export async function getUserCart(token: string) {
//   try {
//     const JWT_SECRET = "msl";
//     const decodedToken = jwt.verify(token, JWT_SECRET) as { userId: string };
//     const userId = decodedToken.userId;
// console.log(userId);

//     // First get the cart
//     const cart = await prisma.cart.findMany({
//       where: {
//         userId: userId,
//       },
      
//     });

//     if (!cart) {
//       return null;
//     }
//     const allProducts = await getProducts();

//     // Map through each cart and replace productIds with full product details
//     const cartsWithProducts = await Promise.all(carts.map(async (cart) => {
//       const itemsWithProducts = await Promise.all(cart.items.map(async (item) => {
//         const product = allProducts.find(p => p.id === item.productId);
//         return {
//           ...item,
//           product
//         };
//       }));

//       return {
//         ...cart,
//         items: itemsWithProducts
//       };
//     }));

//     return cartsWithProducts;

//   } catch (error) {
//     console.error("Error fetching user cart:", error);
//     throw new Error("Failed to fetch user cart");
//   }
// }



export async function getAllCarts() {
  const cart = await prisma.cart.findMany({
    include: {
      user: true,
      products: true,
    },
  });
  return cart;
}
