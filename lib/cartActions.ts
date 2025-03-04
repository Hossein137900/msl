'use server';
import { prisma } from "./prisma";
import * as jwt from 'jsonwebtoken';

export async function addToCart(formData: FormData, token: string) {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        console.log('JWT_SECRET is not defined in environment variables');
    }

    try {
        const decodedToken = await jwt.verify(token, 'msl') as { userId: string };
        const userId = decodedToken?.userId;
        
        if (!userId) {
            throw new Error('User ID not found in token');
        }

        const productId = formData.get('productId') as string;
        const quantity = parseInt(formData.get('quantity') as string);
        const path = formData.get('path') as string;
        const image = formData.get('image') as string;
        const totalPrice = parseInt(formData.get('totalPrice') as string);

        // First, find or create a cart for the user
        let cart = await prisma.cart.findFirst({
            where: { userId }
        });

        if (!cart) {
            cart = await prisma.cart.create({
                data: {
                    userId,
                    path,
                    image,
                    totalPrice,
                }
            });
        }

        // Create a cart item and associate it with the cart
        const cartItem = await prisma.cartItem.create({
            data: {
                cartId: cart.id,
                productId,
                quantity,
            }
        });

        return cartItem;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
}
