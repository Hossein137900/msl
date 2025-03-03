'use server'
import { prisma } from "./prisma";
import * as jwt from 'jsonwebtoken';

export default async function createNewUser(formData: FormData) {
    const username = formData.get('username') as string;
    const password = formData.get('password') as string;
    const phoneNumber = formData.get('phoneNumber') as string;
    
    const newUser = await prisma.user.create({
        data: {
            name: username,
            password: password,
            phoneNumber: phoneNumber,
        },
    });

    return newUser;
}
export async function addBlog(formData: FormData, token: string) {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
       console.log('JWT_SECRET is not defined in environment variables');
    }

    try {
        const decodedToken = await jwt.verify(token, 'msl') as { userId: string };
        const userId = decodedToken?.userId;
        console.log(decodedToken)

        if (!userId) {
            throw new Error('User ID not found in token');
        }

      if (userId){
        const blog = await prisma.blog.create({
            data: {
                title: formData.get('title') as string,
                description: formData.get('description') as string,
                seoTitle: formData.get('seoTitle') as string,
                content: formData.get('content') as string,
                image: formData.get('image') as string,
                tags: JSON.parse(formData.get('tags') as string),
                readTime: parseInt(formData.get('readTime') as string),
                userId: userId,
            },
        });
        return blog;
      }
    } catch (error) {
        console.error(error);
        throw error;
    }
}

